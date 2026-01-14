"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

/* ===============================
   TipTap
================================ */
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";

const WritePage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  /* ===============================
     TipTap editor
  ================================ */
  const editor = useEditor({
    extensions: [
      StarterKit,
      
      ImageExtension.configure({
        inline: false,
        
      }),
    ],
    content: "",
     immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.textArea,
      },
    },
  });

  /* ===============================
     Upload image to Firebase
  ================================ */
  useEffect(() => {
    if (!file || !editor) return;

    const storage = getStorage(app);

    const upload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const name =
        Date.now() + "_" + file.name.replace(/\s+/g, "_");
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Upload error:", error);
          alert("Error al subir imagen");
          setIsUploading(false);
        },
        async () => {
          const url = await getDownloadURL(
            uploadTask.snapshot.ref
          );
          setMedia(url);

          // 👉 Insertar imagen en el editor
          editor.chain().focus().setImage({ src: url }).run();

          setIsUploading(false);
          setUploadProgress(0);
        }
      );
    };

    upload();
  }, [file, editor]);

  /* ===============================
     Auth handling
  ================================ */
  if (status === "loading") {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  /* ===============================
     Helpers
  ================================ */
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const validateForm = () => {
    if (!title.trim()) return alert("Ingresa un título");
    if (!editor?.getText().trim())
      return alert("Escribe el contenido");
    if (!catSlug) return alert("Selecciona una categoría");
    return true;
  };

  /* ===============================
     Submit post
  ================================ */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const html = editor.getHTML();

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          desc: html,
          img: media || null,
          slug: slugify(title),
          catSlug,
          userEmail: session?.user?.email,
        }),
      });

      if (!res.ok) throw new Error("Error al crear el post");

      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } catch (err) {
      console.error(err);
      alert("Error al crear el post");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===============================
     File validation
  ================================ */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      return alert("Solo imágenes");
    }

    if (selected.size > 5 * 1024 * 1024) {
      return alert("Máximo 5MB");
    }

    setFile(selected);
  };

  /* ===============================
     Render
  ================================ */
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Título del post"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
      />

      <select
        className={styles.select}
        value={catSlug}
        onChange={(e) => setCatSlug(e.target.value)}
        disabled={isSubmitting}
      >
        <option value="">Selecciona una categoría</option>
        <option value="all-inclusive">All-Inclusive Resorts</option>
        <option value="guided-tours">Guided Tours</option>
        <option value="luxury-travel">Luxury Travel</option>
        <option value="cruise-packages">Cruise Packages</option>
        <option value="adventure-tours">Adventure Tours</option>
        <option value="beach-getaways">Beach Getaways</option>
        <option value="cultural-experiences">
          Cultural Experiences
        </option>
      </select>

      <div className={styles.editor}>
        <button
          className={styles.button}
          onClick={() => setOpen(!open)}
          type="button"
          disabled={isSubmitting}
        >
          <Image src="/plus.png" alt="Añadir" width={16} height={16} />
        </button>

        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading || isSubmitting}
            />
            <button
              className={styles.addButton}
              disabled={isUploading || isSubmitting}
            >
              <label htmlFor="image">
                <Image src="/image.png" alt="Imagen" width={16} height={16} />
              </label>
            </button>
          </div>
        )}

        {isUploading && (
          <div className={styles.uploadProgress}>
            Subiendo imagen... {uploadProgress}%
          </div>
        )}

        <EditorContent editor={editor} />
      </div>

      <button
        className={styles.publish}
        onClick={handleSubmit}
        disabled={isSubmitting || isUploading}
      >
        {isSubmitting ? "Publicando..." : "Publicar"}
      </button>
    </div>
  );
};

export default WritePage;

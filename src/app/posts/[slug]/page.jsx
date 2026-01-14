"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Menu from '@/components/Menu/Menu';
import Comments from '@/components/comments/Comments';
import styles from './singlePage.module.css';

const SinglePage = ({ params }) => {
  const { slug, likes } = params;
  // console.log(slug)
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
          // const res = await fetch(`https://tripytour-blog.vercel.app/api/posts/${slug}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const postData = await res.json();
        setData(postData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [slug]);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Error incrementing likes');
        return;
      }

      // Update local likes count after a successful response
      setData((prevData) => ({
        ...prevData,
        
        likes: prevData.likes + 1,
      }));
      // console.log(prevData)
    } catch (error) {
      console.error('Error incrementing likes:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{data?.createdAt.substring(0, 10)}</span>
              <span>Views: {data?.views}</span>
              <span className={styles.likes}>
                
                <button onClick={handleLike}>Like</button>
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;


// import Menu from "@/components/Menu/Menu";
// import styles from "./singlePage.module.css";
// import Image from "next/image";
// import Comments from "@/components/comments/Comments";

// const getData = async (slug) => {
  
//   const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
//     // const res = await fetch(`https://tripytour-blog.vercel.app/api/posts/${slug}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

// const SinglePage = async ({ params }) => {
//   const { slug } = params;

//   const data = await getData(slug);
//   console.log(data);

//   return (
//     <div className={styles.container}>
//       <div className={styles.infoContainer}>
//         <div className={styles.textContainer}>
//           <h1 className={styles.title}>{data?.title}</h1>
//           <div className={styles.user}>
//             {data?.user?.image && (
//               <div className={styles.userImageContainer}>
//                 <Image
//                   src={data.user.image}
//                   alt=""
//                   fill
//                   className={styles.avatar}
//                 />
//               </div>
//             )}
//             <div className={styles.userTextContainer}>
//               <span className={styles.username}>{data?.user.name}</span>
//               <span className={styles.date}>
//                 {data?.createdAt.substring(0, 10)}
//               </span>
//               <span>Views : {data?.views}</span>
//               <span
//                 className={styles.likes}
//                 // onClick={() => incrementLikes(slug)}
//               >
//                 Likes: {data?.likes}
//               </span>
//             </div>
//           </div>
//         </div>
//         {data?.img && (
//           <div className={styles.imageContainer}>
//             <Image src={data.img} alt="" fill className={styles.image} />
//           </div>
//         )}
//       </div>
//       <div className={styles.content}>
//         <div className={styles.post}>
//           <div
//             className={styles.description}
//             dangerouslySetInnerHTML={{ __html: data?.desc }}
//           />
//           <div className={styles.comment}>
//             <Comments postSlug={slug} />
//           </div>
//         </div>
//         <Menu />
//       </div>
//     </div>
//   );
// };

// export default SinglePage;

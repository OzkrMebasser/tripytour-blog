"use client";

import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <section className="relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* TEXT */}
          <div>
            {/* <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Blog de viajes
            </span> */}

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Descubre joyas ocultas y{" "}
              <span className="accent --tw-text-shadow-color var(--color-red-200)">
                atracciones imprescindibles
              </span>{" "}
              en cada rincón del mundo
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600 softText">
              Guías honestas, consejos prácticos y destinos increíbles para
              viajeros curiosos que buscan experiencias auténticas más allá de
              lo común.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Explorar artículos
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Sobre el blog
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-42 w-full overflow-hidden rounded-2xl shadow-lg sm:h-96 lg:h-full">
            <Image
              src="/portadaBlog.jpeg"
              alt="Destino turístico destacado"
              fill
              priority
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Featured;

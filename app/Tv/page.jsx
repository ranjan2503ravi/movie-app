"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Tv = () => {
  const router = useRouter();
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);

  const fetchTv = async () => {
    try {
      setLoading(true);

      const { data } = await instance.get(
        `/tv/popular?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      setTvShows((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTv();
  }, [page]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white px-6 md:px-16 py-12">

     
      <div className="flex justify-between items-center mb-14">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition"
        >
          <IoArrowBackOutline size={18} />
          Back
        </button>

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Popular TV Shows
        </h1>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">

        {tvShows.map((tv, index) => {
          const isLast = tvShows.length === index + 1;

          return (
            <Link
              href={`/tvs/${tv.id}`}
              key={tv.id}
              ref={isLast ? lastElementRef : null}
              className="group relative block rounded-3xl overflow-hidden 
                         bg-white/5 backdrop-blur-xl 
                         border border-white/10 
                         hover:border-purple-500/40 
                         transition-all duration-500 
                         hover:-translate-y-4 
                         hover:shadow-2xl hover:shadow-purple-500/30"
            >

              <div className="relative overflow-hidden">
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                      : "/images/f9.jpg"
                  }
                  alt={tv.name}
                  className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90" />

                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                  ⭐ {tv.vote_average?.toFixed(1)}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                <h2 className="text-base font-bold truncate group-hover:text-purple-400 transition">
                  {tv.name}
                </h2>

                <p className="text-sm text-zinc-400 mt-1">
                  {tv.first_air_date?.slice(0, 4)}
                </p>
              </div>

            </Link>
          );
        })}

      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

    </div>
  );
};

export default Tv;
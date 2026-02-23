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
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 py-10 flex-1">
      
      <div className="flex items-center gap-10">
        {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
      >
        <IoArrowBackOutline size={18} />
        Back
      </button>

     
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
        Popular TV Shows
      </h1>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {tvShows.map((tv, index) => {
          const isLast = tvShows.length === index + 1;

          return (
           <div
  key={tv.id}
  ref={isLast ? lastElementRef : null}
  className="group relative rounded-2xl overflow-hidden 
             bg-white/5 backdrop-blur-md 
             border border-white/10 
             hover:border-purple-500/40 
             transition-all duration-500 
             hover:-translate-y-2 
             hover:shadow-2xl hover:shadow-purple-500/40"
>
 
  <img
    src={
      tv.poster_path
        ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
        : "/images/f9.jpg"
    }
    alt={tv.name}
    className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
  />

  
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

  
  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
    <h2 className="text-sm md:text-base font-bold truncate group-hover:text-purple-400 transition">
      {tv.name}
    </h2>
    <div className="flex justify-between items-center text-xs text-gray-300">
      <span>{tv.first_air_date?.slice(0, 4)}</span>
      <span>⭐ {tv.vote_average.toFixed(1)}</span>
    </div>
    <Link
      href={`/tvs/${tv.id}`}
      className="mt-2 inline-block text-xs md:text-sm bg-purple-500/80 hover:bg-purple-600 text-white px-3 py-1 rounded-full font-semibold transition"
    >
      View Details
    </Link>
  </div>
</div>
          );
        })}
      </div>

      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Tv;
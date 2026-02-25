"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import instance from "@/app/Utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Popular = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(
        `/movie/popular?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setMovies((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
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
      
      <div className="relative mb-14">

 
  <div className="absolute -top-10 left-0 w-72 h-72 bg-purple-600/30 blur-[120px] rounded-full"></div>

  <div className="relative flex items-center justify-between flex-wrap gap-6">

   
    <div>
      <p className="text-purple-400 uppercase tracking-widest text-sm">
        TMDB Collection
      </p>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Popular Movies
      </h1>

      <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-md">
        Discover trending and most watched movies worldwide.
      </p>
    </div>

    
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-6 py-3 
                 bg-white/10 backdrop-blur-xl 
                 border border-white/20 
                 rounded-full 
                 hover:bg-purple-500/30 
                 hover:border-purple-400/40 
                 transition-all duration-300 
                 shadow-lg"
    >
      <span className="text-lg">←</span>
      <span className="font-medium">Go Back</span>
    </button>

  </div>
</div>
     
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie, index) => {
          const isLast = movies.length === index + 1;

          return (
            <Link
              href={`/Popula/${movie.id}`} // ✅ Use lowercase folder for dynamic route
              key={movie.id}
              ref={isLast ? lastElementRef : null}
              className="group relative rounded-2xl overflow-hidden 
                         bg-white/5 backdrop-blur-md 
                         border border-white/10 
                         hover:border-purple-500/40 
                         transition-all duration-500 
                         hover:-translate-y-2 
                         hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/images/fallback.jpg"
                }
                alt={movie.title}
                className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                <h2 className="text-sm md:text-base font-bold truncate group-hover:text-purple-400 transition">
                  {movie.title}
                </h2>
                <div className="flex justify-between text-xs text-gray-300 mt-1">
                  <span>{movie.release_date?.slice(0, 4)}</span>
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-10 text-zinc-400">
          Loading more movies...
        </div>
      )}
    </div>
  );
};

export default Popular;
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import instance from "@/app/Utils/axios";
import { useRouter } from "next/navigation";

const Movies = () => {
  const router = useRouter(); 
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [timeWindow, setTimeWindow] = useState("day"); 
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  
  const fetchTrending = async () => {
    try {
      setLoading(true);

      const { data } = await instance.get(
        `/trending/movie/${timeWindow}?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      setMovies((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [page, timeWindow]);

  
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [timeWindow]);

  
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
      
      
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-purple-500/40 text-white rounded-lg hover:bg-purple-500/60 transition"
      >
        ← Back
      </button>

      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Trending Movies</h1>

       
        <div className="flex gap-3">
          <button
            onClick={() => setTimeWindow("day")}
            className={`px-5 py-2 rounded-lg transition ${
              timeWindow === "day"
                ? "bg-purple-600"
                : "bg-zinc-700 hover:bg-zinc-600"
            }`}
          >
            Today
          </button>

          <button
            onClick={() => setTimeWindow("week")}
            className={`px-5 py-2 rounded-lg transition ${
              timeWindow === "week"
                ? "bg-purple-600"
                : "bg-zinc-700 hover:bg-zinc-600"
            }`}
          >
            This Week
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie, index) => {
          const isLast = movies.length === index + 1;

          return (
            <div
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

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 " />

             
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1 ">
                <h2 className="text-sm md:text-base font-bold truncate group-hover:text-purple-400 transition">
                  {movie.title}
                </h2>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{movie.release_date?.slice(0, 4)}</span>
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
                <a
                  href={`/movie/${movie.id}`}
                  className="mt-2 inline-block text-xs md:text-sm bg-purple-500/80 hover:bg-purple-600 text-white px-3 py-1 rounded-full font-semibold transition"
                >
                  View Details
                </a>
              </div>
            </div>
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

export default Movies;
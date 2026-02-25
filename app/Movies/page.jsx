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
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 md:px-12 py-12 relative overflow-hidden flex-1">

      <div className="absolute -top-20 left-0 w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full"></div>

      <div className="relative mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        <div>
          <p className="text-purple-400 uppercase tracking-widest text-xs">
            Discover Movies
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Trending Movies
          </h1>
        </div>

        <div className="flex items-center gap-4 flex-wrap">

          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 transition"
          >
            ← Back
          </button>

          <div className="flex bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1">
            <button
              onClick={() => setTimeWindow("day")}
              className={`px-5 py-2 rounded-full text-sm transition ${
                timeWindow === "day"
                  ? "bg-purple-600"
                  : "hover:bg-white/10"
              }`}
            >
              Today
            </button>

            <button
              onClick={() => setTimeWindow("week")}
              className={`px-5 py-2 rounded-full text-sm transition ${
                timeWindow === "week"
                  ? "bg-purple-600"
                  : "hover:bg-white/10"
              }`}
            >
              This Week
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {movies.map((movie, index) => {
          const isLast = movies.length === index + 1;

          return (
            <div
              key={movie.id}
              ref={isLast ? lastElementRef : null}
              className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(168,85,247,0.35)]"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/images/fallback.jpg"
                }
                alt={movie.title}
                className="w-full h-72 object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-[1deg]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4">

                <h2 className="text-sm md:text-base font-semibold truncate group-hover:text-purple-400 transition">
                  {movie.title}
                </h2>

                <div className="flex justify-between text-xs text-gray-300 mt-1">
                  <span>{movie.release_date?.slice(0, 4)}</span>
                  <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-md font-bold">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                </div>

                <button
                  onClick={() => router.push(`/movie/${movie.id}`)}
                  className="mt-3 w-full py-2 text-sm bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all duration-300"
                >
                  View Details
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-12 text-zinc-400">
          Loading more movies...
        </div>
      )}

    </div>
  );
};

export default Movies;
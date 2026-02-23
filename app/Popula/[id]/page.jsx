"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import instance from "@/app/Utils/axios";

const MoviePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      const { data } = await instance.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setMovie(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;

  if (!movie) return <div className="text-white text-center py-20">Movie not found!</div>;

  return (
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 py-10">
      
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-purple-500/40 text-white rounded-lg hover:bg-purple-500/60 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/images/fallback.jpg"}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg"
        />

      
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-2">{movie.release_date}</p>
          <p className="text-gray-300 mb-4">⭐ {movie.vote_average.toFixed(1)}</p>

          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-300">{movie.overview}</p>

          {movie.genres && (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-purple-500/30 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
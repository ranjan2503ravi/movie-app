"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";

const MovieDetail = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

 
  const fetchMovie = async () => {
    try {
      const { data } = await instance.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setMovie(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (!movie) return <div className="text-center py-20 text-white">Movie not found!</div>;

  return (
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 py-10">
     
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-zinc-400 hover:text-white transition"
      >
        <IoArrowBackOutline size={18} />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
       
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/images/f9.jpg"
          }
          alt={movie.title}
          className="w-full md:w-1/3 rounded-2xl object-cover"
        />

        
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="flex items-center gap-4 text-gray-300">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime} min</span>
          </div>

         
          <div className="flex gap-2 flex-wrap">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 bg-purple-500/40 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

         
          <p className="mt-4 text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
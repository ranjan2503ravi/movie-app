"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from "@/app/Components/Partials/Loading";

const TvDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const { data } = await instance.get(
        `/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0C10] text-white flex-1">
      
      <button
        onClick={() => router.back()}
        className="m-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-500 transition-colors duration-300"
      >
        <IoArrowBackOutline size={18} />
        Back
      </button>

     
      <div className="relative h-[65vh] overflow-hidden rounded-b-3xl shadow-2xl">
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt={details.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C10] via-transparent to-black/30" />
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 items-start">
     
        <div className="relative group">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.name}
            className="w-64 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 bg-purple-600 text-xs px-2 py-1 rounded-lg shadow-lg">
            {details.status}
          </span>
        </div>

        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {details.name}
          </h1>

          <p className="text-purple-400 font-semibold mb-4">
            ⭐ {details.vote_average} / 10
          </p>

          <p className="text-zinc-300 leading-relaxed mb-6 text-justify">
            {details.overview}
          </p>

         
          <div className="flex gap-3 flex-wrap mb-6">
            {details.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-1 bg-purple-800/20 border border-purple-700/30 rounded-full text-sm backdrop-blur-md hover:bg-purple-700/30 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {genre.name}
              </span>
            ))}
          </div>

         
          <div className="mt-6 text-sm text-zinc-400 space-y-3">
            <p>📅 <span className="text-white font-medium">{details.first_air_date}</span></p>
            <p>📺 <span className="text-white font-medium">{details.number_of_seasons} Seasons</span></p>
            <p>🎞 <span className="text-white font-medium">{details.number_of_episodes} Episodes</span></p>
            <p>📝 <span className="text-white font-medium">{details.original_language.toUpperCase()}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
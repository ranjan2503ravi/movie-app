"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";

const Page = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getDetails = async () => {
    try {
      setLoading(true); 
     
      const { data } = await instance.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setDetails(data);

      
      const videoRes = await instance.get(
        `/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const trailer = videoRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setVideoKey(trailer.key);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (id) getDetails();
  }, [id]);

  if (!details) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 md:px-16 py-16 relative">

      
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-zinc-800/60 backdrop-blur-md px-4 py-2 rounded-full hover:bg-zinc-700 transition z-50"
      >
        <IoArrowBackOutline size={20} />
        Back
      </button>

      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-14">

        
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/30 to-indigo-500/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-500"></div>

          <img
            src={
              details?.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : details?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${details.backdrop_path}`
                : "/images/f9.jpg"
            }
            alt={details?.title}
            className="relative w-80 rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

      
        <div className="flex-1 space-y-8">

          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-xl">
            {details.title || details.name}
          </h1>

          <div className="flex items-center gap-6 text-zinc-400 text-sm">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full font-semibold">
              ⭐ {details.vote_average?.toFixed(1)}
            </span>
            <span>{details.release_date?.split("-")[0]}</span>
            <span>{details.runtime} min</span>
          </div>

          <p className="text-zinc-300 leading-relaxed max-w-2xl">
            {details.overview}
          </p>

         
          <div className="flex gap-4 pt-4">

            {videoKey && (
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
              >
                ▶ Watch Trailer
              </button>
            )}

            <button className="bg-zinc-700/60 backdrop-blur-md px-8 py-3 rounded-xl hover:bg-zinc-600 transition duration-300">
              + My List
            </button>

          </div>

        </div>
      </div>

      
      {showTrailer && videoKey && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-8 right-8 text-white text-3xl hover:text-purple-400 transition"
          >
            ✕
          </button>

          <div className="w-[95%] md:w-[75%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default Page;
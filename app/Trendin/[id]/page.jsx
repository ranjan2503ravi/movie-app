"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from "@/app/Components/Partials/Loading";

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
    return <div className="w-full h-full flex justify-center items-center">
      <Loading/>
    </div>
  }

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden flex-1">

   
    <div className="relative h-[85vh] w-full">

      <img
        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

     
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>

     
      <button
        onClick={() => window.history.back()}
        className="absolute top-8 left-10 z-50 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full hover:bg-white/20 transition"
      >
        ← Back
      </button>

      
      <div className="relative z-40 h-full flex items-end pb-20 px-10 md:px-20">

        <div className="max-w-3xl space-y-6">

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            {details.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-300">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-md font-bold">
              ⭐ {details.vote_average?.toFixed(1)}
            </span>
            <span>{details.release_date?.split("-")[0]}</span>
            <span>{details.runtime} min</span>
          </div>

          <p className="text-gray-300 max-w-xl leading-relaxed">
            {details.overview}
          </p>

          <div className="flex gap-4 pt-4">

            {videoKey && (
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:scale-105 transition"
              >
                ▶ Play Trailer
              </button>
            )}

            <button className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-md hover:bg-white/30 transition">
              + My List
            </button>

          </div>

        </div>
      </div>
    </div>


    
    {showTrailer && videoKey && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

        <button
          onClick={() => setShowTrailer(false)}
          className="absolute top-10 right-10 text-white text-4xl hover:text-red-500 transition"
        >
          ✕
        </button>

        <div className="w-[95%] md:w-[70%] aspect-video rounded-xl overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
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
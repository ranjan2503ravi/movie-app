"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from "@/app/Components/Partials/Loading";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

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

      if (trailer) setVideoKey(trailer.key);
    } catch (error) {
      console.log("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getDetails();
  }, [id]);

  if (loading || !details) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white flex-1">

    
      <div className="absolute inset-0 -z-10">
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      </div>

      
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <IoArrowBackOutline size={20} />
        Back
      </button>

      
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-40 pb-20 flex flex-col md:flex-row gap-12">

        
        <div className="flex-shrink-0">
          <img
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : "/images/f9.jpg"
            }
            alt={details.title}
            className="w-72 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:scale-105 transition duration-500"
          />
        </div>

        
        <div className="flex-1 space-y-6">

       
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {details.title}
          </h1>

       
          <div className="flex flex-wrap gap-2">
            {details.genres?.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          
          <div className="flex items-center gap-6 text-lg text-zinc-300">
            <span className="bg-yellow-500 text-black px-4 py-1 rounded-full font-semibold">
              ⭐ {details.vote_average?.toFixed(1)}
            </span>

            <span>
              {details.release_date?.split("-")[0]}
            </span>

            <span>
              {details.runtime} min
            </span>
          </div>

         
          <p className="max-w-3xl text-zinc-300 leading-relaxed">
            {details.overview || "No description available."}
          </p>

        
          <div className="flex flex-wrap gap-4 pt-4">
            {videoKey ? (
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
              >
                ▶ Watch Trailer
              </button>
            ) : (
              <button
                disabled
                className="px-8 py-3 bg-zinc-800 rounded-xl cursor-not-allowed"
              >
                Trailer Not Available
              </button>
            )}

            <button className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-xl hover:bg-white/20 transition">
              + My List
            </button>
          </div>
        </div>
      </div>

      
      {showTrailer && videoKey && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-purple-400 transition"
          >
            ✕
          </button>

          <div className="w-full md:w-3/4 h-[60%] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
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
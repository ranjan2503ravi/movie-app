"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import instance from "@/app/Utils/axios";
import Loading from "@/app/Components/Partials/Loading";
import { IoArrowBackOutline } from "react-icons/io5";

const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawType = searchParams.get("type");
  const type = rawType === "tv" ? "tv" : "movie";

  const [details, setDetails] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      setLoading(true);

      const { data } = await instance.get(
        `/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setDetails(data);

      const videoRes = await instance.get(
        `/${type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const trailer = videoRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) setVideoKey(trailer.key);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetails();
  }, [id, type]);

  if (loading || !details) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      
      <div className="absolute inset-0 -z-10">
        <img
          src={
            details.backdrop_path
              ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
              : "/images/fallback.jpg"
          }
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      </div>

    
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <IoArrowBackOutline size={20} />
        Back
      </button>

     
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-44 pb-20 flex flex-col md:flex-row gap-12">

        
        <div className="flex-shrink-0">
          <img
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : "/images/f9.jpg"
            }
            alt={details.title || details.name}
            className="w-72 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] hover:scale-105 transition duration-500"
          />
        </div>

       
        <div className="flex-1 space-y-6">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-2xl">
            {details.title || details.name}
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

          
          <div className="flex flex-wrap items-center gap-6 text-zinc-300 text-lg">
            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold">
              ⭐ {details.vote_average?.toFixed(1)}
            </span>

            <span>
              {details.release_date?.split("-")[0] ||
                details.first_air_date?.split("-")[0]}
            </span>

            <span>
              {details.runtime
                ? `${details.runtime} min`
                : details.episode_run_time?.[0]
                ? `${details.episode_run_time[0]} min`
                : ""}
            </span>
          </div>

          <p className="max-w-3xl text-zinc-300 leading-relaxed">
            {details.overview}
          </p>

         
          <div className="flex flex-wrap gap-4 pt-4">
            {videoKey && (
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-xl"
              >
                ▶ Watch Trailer
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
            className="absolute top-8 right-8 text-white text-3xl hover:text-purple-400"
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
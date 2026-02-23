"use client";

import React, { useState, useEffect } from "react";
import instance from "@/app/Utils/axios";
import Link from "next/link";

const Header = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(null); 
  const [showTrailer, setShowTrailer] = useState(false);

  
  const getTrending = async () => {
    try {
      const { data } = await instance.get(
        `/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setWallpapers(data.results.slice(0, 15) || []);
    } catch (error) {
      console.log("Error fetching trending:", error);
    }
  };

 
  const fetchTrailer = async (id, mediaType) => {
    try {
      const { data } = await instance.get(`/${mediaType}/${id}/videos`);
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setVideoKey(trailer.key);
      } else {
        setVideoKey(null);
      }
    } catch (error) {
      console.log("Error fetching trailer:", error);
      setVideoKey(null);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);

  
  useEffect(() => {
    if (wallpapers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === wallpapers.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [wallpapers]);

  const item = wallpapers[currentIndex];

  
  useEffect(() => {
    if (!item) return;
    const mediaType = item.media_type || "movie";
    fetchTrailer(item.id, mediaType);
  }, [item]);

  return (
    <div className="w-full h-[60vh] overflow-hidden relative">
      {item && (
        <div
          className="relative w-full h-full bg-cover bg-center flex items-end px-10 pb-20 transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
          }}
        >
        
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

         
          <div className="relative z-10 text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {item.title || item.name}
            </h1>

            <p className="text-sm text-gray-300 mb-3">
              ⭐ {item.vote_average} | {item.release_date || item.first_air_date}
            </p>

            <p className="text-sm mb-4 line-clamp-3">
              {item.overview ? item.overview.slice(0, 150) : "No description available"}...
              <Link
                href={`/details/${item.id}`}
                className="text-blue-400 ml-2 hover:underline"
              >
                more
              </Link>
            </p>

            <div className="flex gap-4">
              <Link
                href={`/heade/${item.id}`}
                className="px-5 py-2 bg-[#6556CD] hover:bg-[#5245b5] transition rounded"
              >
                View Details
              </Link>

              {videoKey ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 transition rounded"
                >
                  ▶ Watch Trailer
                </button>
              ) : (
                <button
                  disabled
                  className="px-5 py-2 bg-gray-800 cursor-not-allowed rounded"
                >
                  Trailer Not Available
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      
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

export default Header;
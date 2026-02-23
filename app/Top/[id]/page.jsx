"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import instance from "@/app/Utils/axios";
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from "@/app/Components/Partials/Loading";

const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type") || "movie"; // movie, tv, person

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getDetails = async () => {
    try {
      setLoading(true);

      if (type === "person") {
        const { data } = await instance.get(
          `/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setDetails(data);
      } else {
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
      }
    } catch (error) {
      console.log("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getDetails();
  }, [id, type]);

  if (loading || !details)
    return (
      <div className=" w-full h-full flex items-center justify-center">
        <Loading/>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white px-4 md:px-16 py-10 relative flex-1">
      
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-full hover:bg-zinc-800 transition"
      >
        <IoArrowBackOutline size={20} />
        Back
      </button>

      {type === "person" ? (
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
          <img
            src={
              details.profile_path
                ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                : "/images/fallback.jpg"
            }
            alt={details.name}
            className="w-full md:w-64 rounded-3xl shadow-2xl"
          />
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {details.name}
            </h1>
            <p className="text-zinc-400 mb-3">
              Known For: {details.known_for_department}
            </p>
            <p className="text-zinc-300 leading-relaxed">
              {details.biography || "Biography not available."}
            </p>

            {details.known_for && details.known_for.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Known Works:</h2>
                <div className="flex overflow-x-auto gap-4 py-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                  {details.known_for.map((item) => (
                    <div
                      key={item.id}
                      className="min-w-[120px] flex-shrink-0 hover:scale-105 transition transform duration-300"
                    >
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "/images/fallback.jpg"
                        }
                        alt={item.title || item.name}
                        className="w-full h-44 object-cover rounded-lg shadow-lg"
                      />
                      <p className="text-sm mt-1 truncate">
                        {item.title || item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="relative group md:flex-shrink-0">
            <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/40 to-indigo-500/25 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <img
              src={
                details.poster_path
                  ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                  : details.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${details.backdrop_path}`
                  : "/images/fallback.jpg"
              }
              alt={details.title || details.name}
              className="relative w-full md:w-80 rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-xl">
                {details.title || details.name}
              </h1>

              <div className="flex items-center gap-4 mt-3 flex-wrap text-sm text-zinc-400">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full font-semibold">
                  ⭐ {details.vote_average?.toFixed(1)}
                </span>
                <span>
                  {details.release_date?.split("-")[0] ||
                    details.first_air_date?.split("-")[0]}
                </span>
                <span>
                  {details.runtime ||
                    details.episode_run_time?.[0] ||
                    "-"}{" "}
                  min
                </span>
                {type === "tv" && (
                  <span>{details.number_of_seasons} Season(s)</span>
                )}
              </div>

              <p className="text-zinc-300 mt-4 leading-relaxed max-w-2xl">
                {details.overview || "No description available."}
              </p>
            </div>

          
            <div className="flex flex-wrap gap-4 mt-4">
              {videoKey ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
                >
                  ▶ Watch Trailer
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 bg-zinc-800 cursor-not-allowed rounded-xl"
                >
                  Trailer Not Available
                </button>
              )}

              <button className="bg-zinc-700/60 backdrop-blur-md px-6 py-3 rounded-xl hover:bg-zinc-600 transition duration-300">
                + My List
              </button>
            </div>
          </div>
        </div>
      )}

     
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
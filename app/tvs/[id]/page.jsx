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
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const [detailRes, videoRes] = await Promise.all([
        instance.get(
          `/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        ),
        instance.get(
          `/tv/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        ),
      ]);

      setDetails(detailRes.data);

      const trailerVideo = videoRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailerVideo) {
        setTrailer(trailerVideo.key);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  if (loading || !details) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex-1">
      <div className="relative h-[85vh] w-full overflow-hidden">

        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt={details.name}
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-20 bg-white/10 backdrop-blur-md px-5 py-2 rounded-xl hover:bg-purple-600 transition"
        >
          <IoArrowBackOutline size={18} />
        </button>

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-24">
          <div className="max-w-2xl">

            <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
              {details.name}
            </h1>

            <div className="flex items-center gap-6 mb-6 text-lg">
              <span className="text-green-400 font-bold">
                {Math.round(details.vote_average * 10)}% Match
              </span>
              <span>{details.first_air_date?.slice(0, 4)}</span>
              <span>{details.number_of_seasons} Seasons</span>
            </div>

            <p className="text-zinc-300 mb-8 line-clamp-3">
              {details.overview}
            </p>

            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                ▶ Play Trailer
              </button>
            )}

          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">

        <div className="w-72">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.name}
            className="rounded-2xl shadow-2xl"
          />
        </div>

        <div className="flex-1">

          <h2 className="text-3xl font-bold mb-6">About</h2>

          <div className="grid grid-cols-2 gap-6 text-zinc-300 text-sm">
            <p>Status: {details.status}</p>
            <p>Language: {details.original_language.toUpperCase()}</p>
            <p>Episodes: {details.number_of_episodes}</p>
            <p>Seasons: {details.number_of_seasons}</p>
          </div>

        </div>
      </div>

     
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="relative w-[90%] md:w-[70%] h-[60vh] bg-black rounded-xl overflow-hidden">

            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
            />

          </div>

        </div>
      )}

    </div>
  );
};

export default TvDetails;
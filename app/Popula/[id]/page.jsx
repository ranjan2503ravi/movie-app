"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import instance from "@/app/Utils/axios";
import Loading from "@/app/Components/Partials/Loading";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MoviePage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      const { data } = await instance.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrailer = async () => {
    try {
      const { data } = await instance.get(
        `/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchTrailer();
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );

  if (!movie)
    return (
      <div className="text-white text-center py-20">
        Movie not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white relative flex-1">

     
      <div className="relative h-[90vh] w-full">

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <button
          onClick={() => router.back()}
          className="absolute top-8 left-10 z-50 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full hover:bg-white/20 transition"
        >
          ← Back
        </button>

        <div className="relative z-40 h-full flex items-end pb-20 px-10 md:px-20">
          <div className="max-w-2xl space-y-6">

            <h1 className="text-5xl md:text-6xl font-extrabold">
              {movie.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300 text-sm">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-md font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>{movie.runtime} min</span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {movie.overview}
            </p>

            
            {trailerKey && (
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                <FaPlay />
                Play Trailer
              </button>
            )}
          </div>
        </div>
      </div>

     
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-20">
        <div className="grid md:grid-cols-2 gap-10">

          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-2xl shadow-2xl"
          />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Movie Info</h2>

            <div className="grid grid-cols-1 gap-3 text-gray-300 text-sm">
              <p><span className="text-white font-medium">Original:</span> {movie.original_title}</p>
              <p><span className="text-white font-medium">Language:</span> {movie.original_language?.toUpperCase()}</p>
              <p><span className="text-white font-medium">Popularity:</span> {movie.popularity}</p>
              <p><span className="text-white font-medium">Votes:</span> {movie.vote_count}</p>
            </div>
          </div>

        </div>
      </div>

      
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-10 right-10 text-white text-3xl"
          >
            <IoClose />
          </button>

          <div className="w-full max-w-5xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>

        </div>
      )}

    </div>
  );
};

export default MoviePage;
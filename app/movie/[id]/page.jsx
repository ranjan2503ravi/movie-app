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

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white text-xl">
        Movie not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden flex-1">

      <div className="relative h-[85vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>

        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-50 flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 transition"
        >
          <IoArrowBackOutline size={18} />
          Back
        </button>

        <div className="relative z-40 h-full flex items-end pb-20 px-8 md:px-20">
          <div className="max-w-3xl space-y-6">

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              {movie.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300 text-sm">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-md font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>{movie.runtime} min</span>
            </div>

            <p className="text-gray-300 max-w-xl leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-20 -mt-32 relative z-50 ">

        <div className="flex flex-col md:flex-row gap-12">

          <div className="relative group">
            <div className="absolute -inset-3 bg-purple-600/30 blur-2xl rounded-3xl opacity-60 group-hover:opacity-100 transition"></div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/images/f9.jpg"
              }
              alt={movie.title}
              className="relative w-72 rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>

          <div className="flex-1 space-y-6">

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6">
                Movie Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-sm">
                <p>
                  <span className="text-white font-medium">
                    Original Title:
                  </span>{" "}
                  {movie.original_title}
                </p>
                <p>
                  <span className="text-white font-medium">
                    Language:
                  </span>{" "}
                  {movie.original_language?.toUpperCase()}
                </p>
                <p>
                  <span className="text-white font-medium">
                    Popularity:
                  </span>{" "}
                  {movie.popularity}
                </p>
                <p>
                  <span className="text-white font-medium">
                    Vote Count:
                  </span>{" "}
                  {movie.vote_count}
                </p>
                <p>
                  <span className="text-white font-medium">
                    Status:
                  </span>{" "}
                  {movie.status}
                </p>
                <p>
                  <span className="text-white font-medium">
                    Budget:
                  </span>{" "}
                  ${movie.budget?.toLocaleString()}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default MovieDetail;
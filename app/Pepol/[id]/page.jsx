"use client";

import { useParams, useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react";
import instance from "@/app/Utils/axios";
import Loading from "@/app/Components/Partials/Loading";

const Page = () => {
  const { id } = useParams();
  const router = useRouter(); 
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);

  const fetchData = async () => {
    try {
      const [personRes, creditRes] = await Promise.all([
        instance.get(`/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
        instance.get(`/person/${id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
      ]);

      setPerson(personRes.data);
      setCredits(creditRes.data.cast.slice(0, 15));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (!person) {
    return (
      <div className="w-full h-full  flex items-center justify-center">
       <Loading/>
      </div>
    );
  }

  return (
  <div className="bg-[#0B0B11] text-white min-h-screen flex-1">

    <div className="relative w-full min-h-[90vh] overflow-hidden">

      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 z-30 px-5 py-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-purple-600 transition"
      >
        ← Back
      </button>

     
      <img
        src={
          credits[0]?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${credits[0].backdrop_path}`
            : person.profile_path
            ? `https://image.tmdb.org/t/p/original${person.profile_path}`
            : "/images/f9.jpg"
        }
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-40"
      />

      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B11] via-[#0B0B11]/90 to-black/70" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-end gap-14">

          <div className="relative group">
            <div className="absolute -inset-2 bg-purple-600/30 blur-2xl opacity-60 group-hover:opacity-100 transition rounded-3xl"></div>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "/images/f9.jpg"
              }
              alt={person.name}
              className="relative w-72 rounded-3xl shadow-2xl border border-white/10 transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {person.name}
            </h1>

            <p className="text-purple-400 text-xl font-semibold mb-6">
              {person.known_for_department}
            </p>

            <div className="grid grid-cols-2 gap-6 text-sm text-zinc-300">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                🎂 {person.birthday || "N/A"}
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                📍 {person.place_of_birth || "Unknown"}
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                ⭐ Popularity: {Math.round(person.popularity)}
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                🎬 Known Credits: {credits.length}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-8 tracking-wide">
        Biography
      </h2>

      <p className="text-zinc-400 leading-relaxed text-lg">
        {person.biography || "No biography available."}
      </p>
    </div>

    
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <h2 className="text-4xl font-bold mb-12 tracking-wide">
        🎬 Known For
      </h2>

      <div className="flex gap-10 overflow-x-auto pb-6">
        {credits.map((item) => (
          <div key={item.id} className="min-w-[240px] group">

            <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20">

              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/images/f9.jpg"
                }
                alt={item.title || item.name}
                className="w-full h-96 object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4">
                {item.vote_average && (
                  <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-md font-bold mb-2 inline-block">
                    ⭐ {item.vote_average.toFixed(1)}
                  </span>
                )}

                <p className="text-base font-semibold truncate">
                  {item.title || item.name}
                </p>

                <p className="text-sm text-zinc-300 truncate">
                  {item.character}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>

  </div>
);
};

export default Page;
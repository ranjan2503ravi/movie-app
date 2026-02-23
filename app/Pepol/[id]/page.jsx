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
    <div className="bg-[#0F0F14] text-white min-h-screen flex-1">

      
      <div className="relative w-full h-[80vh] overflow-hidden">

       
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-20 px-4 py-2 bg-purple-500/40 rounded-lg hover:bg-purple-500/60 text-white transition"
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
          alt="background"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-30"
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-[#0F0F14]/80 to-black/50" />

      
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-20">
          <div className="flex flex-col md:flex-row items-end gap-12">

           
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "/images/f9.jpg"
              }
              alt={person.name}
              className="w-64 rounded-3xl shadow-2xl border border-white/10"
            />

           
            <div>
              <h1 className="text-6xl font-extrabold mb-4">{person.name}</h1>
              <p className="text-purple-400 text-lg font-medium mb-4">{person.known_for_department}</p>

              <div className="flex flex-wrap gap-6 text-sm text-zinc-300">
                <span>🎂 {person.birthday || "N/A"}</span>
                <span>📍 {person.place_of_birth || "Unknown"}</span>
                <span>⭐ Popularity: {Math.round(person.popularity)}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      
      <div className="relative z-20 bg-[#0F0F14]">

       
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-6">Biography</h2>
          <p className="text-zinc-400 leading-relaxed max-w-4xl">
            {person.biography || "No biography available."}
          </p>
        </div>

        
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold mb-10 tracking-wide">🎬 Known For</h2>

          <div className="flex gap-10 overflow-x-auto pb-6 scrollbar-hide">
            {credits.map((item) => (
              <div key={item.id} className="relative min-w-[220px] group cursor-pointer">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/images/f9.jpg"
                    }
                    alt={item.title || item.name}
                    className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl flex flex-col justify-end p-5">
                  {item.vote_average && (
                    <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-md w-fit mb-2 font-semibold">
                      ⭐ {item.vote_average.toFixed(1)}
                    </span>
                  )}

                  <span className="bg-purple-600 text-xs px-3 py-1 rounded-md w-fit mb-2 capitalize">
                    {item.media_type}
                  </span>

                  <p className="text-sm font-semibold truncate">{item.title || item.name}</p>
                  <p className="text-xs text-zinc-300 truncate">{item.character}</p>
                </div>

                
                <div className="mt-4">
                  <p className="text-base font-semibold truncate">{item.title || item.name}</p>
                  <p className="text-sm text-zinc-400 truncate">{item.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
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
      <div className="w-full h-screen flex items-center justify-center bg-[#0B0B11]">
        <Loading/>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B11] text-white min-h-screen overflow-x-hidden flex-1">
      
      
      <div className="relative w-full min-h-[70vh] md:min-h-[90vh] overflow-hidden">
        
       
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-4 md:top-8 md:left-8 z-40 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-purple-600 transition text-sm"
        >
          ← Back
        </button>

       
        <img
          src={credits[0]?.backdrop_path ? `https://image.tmdb.org/t/p/original${credits[0].backdrop_path}` : "/images/f9.jpg"}
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
          alt="blur-bg"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B11] via-[#0B0B11]/80 to-transparent" />

        
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-40 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-14">
            
           
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-purple-600/30 blur-xl opacity-60 rounded-3xl"></div>
              <img
                src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : "/images/f9.jpg"}
                alt={person.name}
                className="relative w-48 sm:w-60 md:w-72 rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 transition duration-500 group-hover:scale-105"
              />
            </div>

           
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight mb-3 md:mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
                {person.name}
              </h1>

              <p className="text-purple-400 text-lg md:text-xl font-bold mb-6 tracking-wide">
                {person.known_for_department}
              </p>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl">
                <div className="bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/5 text-xs md:text-sm text-zinc-300">
                  <span className="opacity-50">🎂 Born:</span> {person.birthday || "N/A"}
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/5 text-xs md:text-sm text-zinc-300">
                  <span className="opacity-50">📍 From:</span> {person.place_of_birth || "Unknown"}
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/5 text-xs md:text-sm text-zinc-300">
                  <span className="opacity-50">⭐ Rating:</span> {Math.round(person.popularity)}
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/5 text-xs md:text-sm text-zinc-300">
                  <span className="opacity-50">🎬 Credits:</span> {credits.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20 border-t border-white/5">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-white/90">Biography</h2>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-lg max-w-5xl">
          {person.biography || "No biography available for this person."}
        </p>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">🎬 Known For</h2>
        
        
        <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-6 snap-x">
          {credits.map((item) => (
            <div key={item.id} className="min-w-[160px] md:min-w-[240px] snap-start group">
              <div className="relative overflow-hidden rounded-xl md:rounded-3xl bg-zinc-900 border border-white/5 hover:border-purple-500/40 transition-all duration-500">
                <img
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/images/f9.jpg"}
                  alt=""
                  className="w-full h-56 md:h-96 object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2">
                  <p className="text-xs md:text-base font-bold truncate">{item.title || item.name}</p>
                  <p className="text-[10px] md:text-sm text-zinc-400 truncate">{item.character}</p>
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
"use client";

import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import instance from '@/app/Utils/axios';

const TopNav = () => {
    const [Query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const GetSearch = async () => {
        if (!Query) {
            setSearches([]);
            return;
        }

        try {
            const { data } = await instance.get(
                `/search/multi?query=${Query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            setSearches(data.results || []);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            GetSearch();
        }, 300);
        return () => clearTimeout(timeout);
    }, [Query]);

    return (
        <div className="w-full bg-[#1F1E24] flex justify-center py-6 mx-3">
            <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
                <GoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl pointer-events-none" />

                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={Query}
                    type="text"
                    placeholder="Search movies, TV shows, or actors..."
                    className="w-full pl-12 pr-12 py-3 bg-[#2A2932] text-white placeholder:text-zinc-500 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />

                {Query.length > 0 && (
                    <IoMdClose
                        onClick={() => setQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl cursor-pointer hover:text-white transition"
                    />
                )}

                
                {Query && (
                    <div className="absolute top-full mt-2 left-0 w-full max-h-[50vh] bg-[#1F1E24] rounded-xl shadow-lg shadow-black/30 overflow-y-auto z-[999] scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                        {searches.length > 0 ? (
                            searches.map((item) => {
                                const title = item.title || item.name;
                                const overview = item.overview || item.known_for_department || "";

                                return (
                                    
                                    <Link
  key={item.id}
  href={`/Top/${item.id}?type=${item.media_type}`} 
  className="flex items-start gap-4 p-3 border-b border-zinc-800 hover:bg-[#2A2932] transition-all duration-200 last:border-none rounded-lg"
>
  <img
    src={
      item.poster_path || item.profile_path
        ? `https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`
        : "/images/OIP.jpg"
    }
    alt={item.title || item.name}
    onError={(e) => (e.currentTarget.src = "/images/OIP.jpg")}
    className="w-14 h-20 object-cover rounded-lg bg-zinc-800 flex-shrink-0"
  />
  <div className="flex flex-col flex-1 overflow-hidden">
    <span className="text-white font-medium truncate">
      {item.title || item.name}
    </span>
    <span className="text-zinc-400 text-xs capitalize">
      {item.media_type}
    </span>
    {item.overview && (
      <p className="text-zinc-500 text-xs truncate mt-1">
        {item.overview.length > 50
          ? item.overview.slice(0, 50) + "..."
          : item.overview}
      </p>
    )}
  </div>
</Link>
                                );
                            })
                        ) : (
                            <div className="p-5 text-center text-zinc-400">
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopNav;
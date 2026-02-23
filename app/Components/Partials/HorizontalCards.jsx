"use client";

import React, { useState, useEffect } from "react";
import instance from "@/app/Utils/axios";
import Dropdown from "./Dropdown";
import Link from "next/link";


const SkeletonCard = () => (
  <div className="min-w-[200px] h-[350px] bg-zinc-800 animate-pulse rounded-lg"></div>
);

const HorizontalCards = () => {
  const [trendingNew, setTrendingNew] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    setLoading(true); 
    try {
      const { data } = await instance.get(
        `/trending/${category}/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      setTrendingNew(data.results || []);
    } catch (error) {
      console.log("Error:", error);
      setTrendingNew([]);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [category]);

  return (
    <div className="w-full min-h-[40vh] p-5">
      
      <div className="mb-5 flex justify-between items-center">
        <h1 className="text-xl text-zinc-400 font-semibold">Trending</h1>
        <Dropdown onSelect={(value) => setCategory(value)} />
      </div>

      
      <div className="w-full flex overflow-auto scrollbar-hide gap-5">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, idx) => <SkeletonCard key={idx} />) // 5 skeleton cards
          : trendingNew.map((item) => (
              <Link
                key={item.id}
                href={`/Hori/${item.id}?type=${category}`}
                className="min-w-[200px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300"
              >
                <img
                  className="w-full h-[250px] object-cover"
                  src={
                    item.poster_path || item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`
                      : "/images/OIP.jpg"
                  }
                  alt={item.title || item.name}
                />
                <div className="p-3">
                  <h2 className="text-white text-sm font-semibold truncate">
                    {item.title || item.name}
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">
                    ⭐ {item.vote_average?.toFixed(1)}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import instance from "../Utils/axios";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const category = "all";
  const timeWindow = "day";

  const getTrending = async () => {
    try {
      const { data } = await instance.get(
        `/trending/${category}/${timeWindow}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
      );

      setTrending((prev) => {
        const newData = data.results.filter(
          (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prev, ...newData];
      });

      if (page >= data.total_pages) setHasMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 md:px-16 py-10 relative flex-1">
      
      <div className="flex items-center gap-9">
        
      <button
        onClick={() => window.history.back()}
        className=" flex items-center gap-2 mb-6 text-white bg-zinc-800/60 backdrop-blur-md px-4 py-2 rounded-full hover:bg-zinc-700 transition"
      >
        <IoArrowBackOutline size={20} />
        Back
      </button>

      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-xl">
        Trending Now
      </h1>
     </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={
          <h4 className="text-center py-8 text-zinc-400">Loading more...</h4>
        }
        endMessage={
          <p className="text-center py-8 text-zinc-500">
            You have seen it all 🎬
          </p>
        }
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {trending.map((item) => {
            const title = item.title || item.name;
            const image = item.poster_path || item.profile_path;

            return (
              <Link
                key={`${item.id}-${item.media_type}`}
                href={`/Trendin/${item.id}?type=${item.media_type}`} // type pass kar diya
                className="group relative bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
              >
               
                <img
                  src={
                    image
                      ? `https://image.tmdb.org/t/p/w500${image}`
                      : "/images/OIP.jpg"
                  }
                  alt={title}
                  className="w-full h-72 object-cover rounded-2xl transition duration-500 group-hover:brightness-90"
                />

              
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

               
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h2 className="text-sm font-semibold truncate">{title}</h2>
                  <p className="text-xs text-zinc-400 capitalize">
                    {item.media_type}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Trending;
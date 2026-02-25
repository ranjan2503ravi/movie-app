"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import instance from "@/app/Utils/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const People = () => {
  const router = useRouter();
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);

 
  const fetchPeople = async () => {
    try {
      setLoading(true);

      const { data } = await instance.get(
        `/trending/person/${timeWindow}?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      setPeople((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, [page, timeWindow]);

 
  useEffect(() => {
    setPeople([]);
    setPage(1);
  }, [timeWindow]);


  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#14131A] via-[#1F1E24] to-[#111010] text-white px-6 md:px-16 py-14">

    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-14">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition text-sm"
      >
        <IoArrowBackOutline size={18} />
        Back
      </button>

      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
        Trending People
      </h1>

      <div className="flex gap-4 bg-[#26252C]/70 backdrop-blur-md p-2 rounded-full border border-white/10">
        {["day", "week"].map((type) => (
          <button
            key={type}
            onClick={() => setTimeWindow(type)}
            className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              timeWindow === type
                ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg"
                : "hover:bg-[#34333C]"
            }`}
          >
            {type === "day" ? "Today" : "This Week"}
          </button>
        ))}
      </div>
    </div>

    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
      {people.map((person, index) => {
        const isLast = people.length === index + 1;

        return (
          <div
            key={person.id}
            ref={isLast ? lastElementRef : null}
            className="group"
          >
            <Link
              href={`/Pepol/${person.id}`}
              className="relative block rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              
              <div className="relative overflow-hidden">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "/images/f9.jpg"
                  }
                  alt={person.name}
                  className="w-full h-[320px] object-cover transition duration-700 group-hover:scale-110"
                />

                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              </div>

             
              <div className="absolute bottom-0 p-4 w-full translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                <h2 className="text-base font-bold text-white group-hover:text-purple-400 transition">
                  {person.name}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  {person.known_for_department}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>

    {loading && (
      <div className="flex justify-center items-center py-16">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
  </div>
);
};

export default People;
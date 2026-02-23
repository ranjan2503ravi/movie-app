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
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 py-12 flex-1">

     
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
<button
  onClick={() => router.back()}
  className="mb-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
>
  <IoArrowBackOutline size={18} />
  Back
</button>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          🔥 Trending People
        </h1>

        <div className="flex gap-4 bg-[#26252C] p-1.5 rounded-full">
          {["day", "week"].map((type) => (
            <button
              key={type}
              onClick={() => setTimeWindow(type)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                timeWindow === type
                  ? "bg-purple-600 shadow-lg shadow-purple-500/30"
                  : "bg-transparent hover:bg-[#34333C]"
              }`}
            >
              {type === "day" ? "Today" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
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
                className="relative block bg-[#26252C] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                
                <div className="relative overflow-hidden">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                        : "/images/f9.jpg"
                    }
                    alt={person.name}
                    className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                  />

                 
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                </div>

                
                <div className="p-4">
                  <h2 className="text-sm font-semibold truncate group-hover:text-purple-400 transition">
                    {person.name}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 truncate">
                    {person.known_for_department}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin "></div>
        </div>
      )}
    </div>
  );
};

export default People;
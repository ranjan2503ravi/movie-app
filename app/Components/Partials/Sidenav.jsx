"use client";

import Link from "next/link";
import React from "react";
import { FaFirefox } from "react-icons/fa";
import { GiMagicSwirl, GiTv } from "react-icons/gi";
import { BiMoviePlay } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";

const Sidenav = () => {
  return (
    <div className="w-[20%] min-w-[220px] min-h-screen bg-[#1F1E24] border-r border-zinc-800 p-6 flex flex-col">

     
      <div>
        
        <h1 className="text-2xl font-bold text-white tracking-wide mb-10">
          Cine
          <span className="text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]">
            Scope
          </span>
        </h1>

        <nav className="space-y-8">

         
          <div>
            <h2 className="text-xs uppercase text-zinc-400 mb-4 tracking-widest">
              New Feeds
            </h2>

            <div className="flex flex-col gap-2">

              <Link
                href="/Trending"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <FaFirefox className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                Trending
              </Link>

              <Link
                href="/Popular"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <GiMagicSwirl className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                Popular
              </Link>

              <Link
                href="/Movies"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <BiMoviePlay className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                Movies
              </Link>

              <Link
                href="/Tv"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <GiTv className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                TV Shows
              </Link>

              <Link
                href="/People"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <AiOutlineTeam className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                People
              </Link>

            </div>
          </div>

          <hr className="border-zinc-800" />

          
          <div>
            <h2 className="text-xs uppercase text-zinc-400 mb-4 tracking-widest">
              Website Information
            </h2>

            <div className="flex flex-col gap-2">

              <Link
                href="/About/about"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <IoIosInformationCircle className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                About
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-zinc-300 text-sm font-medium
                transition-all duration-200
                hover:bg-zinc-800 hover:text-white
                hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]
                group"
              >
                <FaSquarePhone className="text-lg transition group-hover:text-yellow-500 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                Contact
              </Link>

            </div>
          </div>

        </nav>
      </div>

      
      <div className="text-xs text-zinc-500  pt-8">
        © 2026 CineScope
      </div>

    </div>
  );
};

export default Sidenav;
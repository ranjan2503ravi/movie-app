"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaFirefox } from "react-icons/fa";
import { GiMagicSwirl, GiTv } from "react-icons/gi";
import { BiMoviePlay } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Sidenav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-8 left-2 z-50 text-white text-2xl"
      >
        <HiMenu />
      </button>

      
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

   
      <div
        className={`
        fixed lg:relative
        top-0 left-0
        h-screen
        w-[260px]
        bg-[#1F1E24]
        border-r border-zinc-800
        p-6 flex flex-col
        transition-transform duration-300
        z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
       
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden text-white text-2xl mb-6 self-end"
        >
          <IoClose />
        </button>

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
                <Link href="/Trending" className="nav-link">
                  <FaFirefox /> Trending
                </Link>

                <Link href="/Popular" className="nav-link">
                  <GiMagicSwirl /> Popular
                </Link>

                <Link href="/Movies" className="nav-link">
                  <BiMoviePlay /> Movies
                </Link>

                <Link href="/Tv" className="nav-link">
                  <GiTv /> TV Shows
                </Link>

                <Link href="/People" className="nav-link">
                  <AiOutlineTeam /> People
                </Link>
              </div>
            </div>

            <hr className="border-zinc-800" />

            <div>
              <h2 className="text-xs uppercase text-zinc-400 mb-4 tracking-widest">
                Website Information
              </h2>

              <div className="flex flex-col gap-2">
                <Link href="/About/about" className="nav-link">
                  <IoIosInformationCircle /> About
                </Link>

                <Link href="/" className="nav-link">
                  <FaSquarePhone /> Contact
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-auto text-xs text-zinc-500 pt-8">
          © 2026 CineScope
        </div>
      </div>
    </>
  );
};

export default Sidenav;
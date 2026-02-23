"use client";

import React from "react";
import { FaFilm, FaSearch, FaStar, FaInfinity } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F1E24] to-[#111010] text-white px-6 py-16 flex-1">

      
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          MovieHub
        </h1>
        <p className="text-lg md:text-xl text-gray-300 tracking-wide">
          Explore, discover, and enjoy trending, popular, and upcoming movies.
        </p>
        <p className="text-gray-400 mt-2">
          Built to give movie lovers a <span className="text-purple-400 font-semibold">premium, professional experience</span>.
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {[
          { icon: <FaFilm />, title: "Browse Movies", desc: "Discover popular and trending movies with ease." },
          { icon: <FaSearch />, title: "Search", desc: "Find movies, actors, and genres in seconds." },
          { icon: <FaStar />, title: "Ratings", desc: "Check ratings, release dates, and detailed movie info." },
          { icon: <FaInfinity />, title: "Infinite Scroll", desc: "Keep exploring movies endlessly without interruptions." }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 shadow-black/20">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full mb-4 text-white text-3xl">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-1 shadow-lg">
          <div className="w-full h-full rounded-full bg-[#1F1E24] flex items-center justify-center text-5xl font-bold text-white">
            RR
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-4xl font-extrabold text-purple-400">Ravi Ranjan Rajput</h2>
          <p className="text-gray-300 text-lg">
            Front end Developer & movie enthusiast. Built this app to practice React, Next.js, Tailwind, and API integrations.
          </p>
          <p className="text-gray-400 text-sm">
            Designed to provide a professional, smooth, and responsive user experience.
          </p>
        </div>
      </div>

      
      <p className="text-center text-gray-500 text-sm mt-24">
        &copy; 2026 MovieHub. All rights reserved.
      </p>
    </div>
  );
};

export default About;
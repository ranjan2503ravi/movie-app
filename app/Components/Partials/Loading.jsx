"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1F1E24] relative overflow-hidden">
      
      
      <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse"></div>

     
      <div className="relative flex flex-col items-center gap-6">

        
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-[#1F1E24]"></div>
        </div>

       
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold tracking-widest text-white animate-pulse">
            CINE<span className="text-purple-500">SCOPE</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2 tracking-wide animate-pulse">
            Loading Experience...
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loading;
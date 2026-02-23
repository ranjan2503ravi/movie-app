"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");

  const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ];

  return (
    <div className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md text-white"
      >
        {selected}
        <FiChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-md">
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                setSelected(item.label);
                setOpen(false);
                onSelect(item.value);   
              }}
              className="px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
"use client";

import React, { useState, useEffect } from "react";
import Sidenav from "./Components/Partials/Sidenav";
import TopNav from "./Components/Partials/TopNav";
import Header from "./Components/Partials/Header";
import HorizontalCards from "./Components/Partials/HorizontalCards";
import Loading from "./Components/Partials/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Sidenav />
<div className="flex-1 h-screen overflow-y-auto scrollbar-hide bg-[#1A1A20]">
        {loading ? (
          <Loading />
        ) : (
          <>
            <TopNav />
            <Header />
            <HorizontalCards />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
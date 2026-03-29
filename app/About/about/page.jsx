"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiPlayCircle, FiGlobe, FiTv } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const router = useRouter();

  
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden flex-1">
      
     
      <div className="relative h-[75vh] w-full flex items-center justify-center">

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#141414]/40 to-[#141414] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2000" 
            className="w-full h-full object-cover opacity-60"
            alt="Cinematic Background"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000"; // Fallback image
            }}
          />
        </div>
        
        
        <div className="fixed top-8 left-8 z-50">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 p-2 pr-5 rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-2xl"
          >
            <div className="bg-white/10 group-hover:bg-white/20 p-2 rounded-full transition">
              <FiArrowLeft size={20} />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">Go Back</span>
          </button>
        </div>

        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-6"
        >
          <motion.span 
            initial={{ letterSpacing: "0.1em", opacity: 0 }}
            animate={{ letterSpacing: "0.5em", opacity: 1 }}
            className="text-red-600 font-bold mb-4 block uppercase text-sm"
          >
            Our Mission
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none">
            STREAM <br/> <span className="text-zinc-500">BEYOND.</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
            We are redefining the digital cinema experience. No ads, no boundaries, just pure storytelling.
          </p>
        </motion.div>
      </div>

     
      <section className="max-w-7xl mx-auto py-32 px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <FiTv />, title: "Everywhere", desc: "Available on Smart TVs, PlayStation, Xbox, Apple TV, and more." },
            { icon: <FiGlobe />, title: "Worldwide", desc: "Access your favorite movies in over 190 countries instantly." },
            { icon: <FiPlayCircle />, title: "Originals", desc: "Watch exclusive content created by world-class directors." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-3xl text-center hover:bg-zinc-900/60 transition-all group"
            >
              <div className="text-red-600 text-5xl mb-6 flex justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full transform -translate-y-1/2" />
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tight text-white/90">Experience the future <br/> of cinema.</h2>
          <button 
            onClick={() => router.push('/signup')}
            className="bg-red-600 text-white px-16 py-5 rounded-full font-black text-xl hover:bg-red-700 transition-all shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] active:scale-95"
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
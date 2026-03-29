"use client"; // Next.js client component
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiMessageCircle, FiPhone, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#141414] min-h-screen text-white pt-10 px-6 md:px-20 pb-10 flex-1 overflow-hidden overflow-scroll"
    >
      <div className="max-w-5xl mx-auto ">
     
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-10 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-medium tracking-wide">BACK TO BROWSE</span>
        </button>

        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tight mb-4">Contact Support</h1>
          <p className="text-zinc-500 text-lg max-w-lg">
            Find solutions to common issues or get in touch with our team of streaming experts.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: <FiMessageCircle />, title: "Live Chat", desc: "Average wait: 1m", color: "bg-blue-600" },
              { icon: <FiPhone />, title: "Call Center", desc: "Available 24/7", color: "bg-green-600" },
              { icon: <FiMail />, title: "Email Support", desc: "Response in 24h", color: "bg-red-600" }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition cursor-pointer flex items-center gap-4">
                <div className={`${item.color} p-3 rounded-lg text-xl`}>{item.icon}</div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          
          <div className="lg:col-span-2 bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-lg focus:border-red-600 outline-none transition" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-lg focus:border-red-600 outline-none transition" placeholder="john@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea rows="5" className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-lg focus:border-red-600 outline-none transition" placeholder="What's on your mind?"></textarea>
              </div>
              <button className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-lg shadow-lg shadow-red-600/20 transition-all active:scale-[0.98]">
                SEND INQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
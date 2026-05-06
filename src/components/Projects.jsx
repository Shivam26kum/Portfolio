import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import project_1 from "../assets/project_1.png"; 

const Projects = () => {
  const projects = [
    { 
      title: "Campus Connect", 
      description: "A comprehensive school management dashboard featuring a secure, role-based access control system utilizing JWT and bcrypt to authenticate Admins, Teachers, and Parents.", 
      tech: ["MongoDB", "Express", "React", "Node.js"],
      image: project_1,
      link: "https://student-performance-dashboard-xi.vercel.app"
    },
    // Add more project objects here as you build them!
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="mb-16 w-full max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center">
          <div className="mr-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
          <span className="text-[var(--accent)] font-mono text-xl mr-3">04.</span> Some Things I've Built
          <div className="ml-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
        </h2>
      </motion.div>

      {/* Swiper Slider Container */}
      <div className="relative w-full pb-20">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          className="pb-12 !overflow-visible"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="h-auto">
              <TiltCard className="h-full bg-[#112233] border border-gray-800 flex flex-col group hover:border-[var(--accent)] transition-all duration-300 relative overflow-hidden p-0 rounded-2xl">
                
                {/* 1. Full Visibility Image Container */}
                <div className="relative h-56 w-full bg-[#0b1622] overflow-hidden border-b border-gray-800 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* 2. Content Area */}
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills (matching your image) */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] md:text-xs font-mono px-3 py-1 rounded-full bg-cyan-900/30 text-[var(--accent)] border border-[var(--accent)]/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Live Demo Button (matching your image) */}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-[#112233] transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <i className="fas fa-external-link-alt text-sm"></i>
                    Live Demo
                  </a>
                </div>
              </TiltCard>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows (centered at the bottom) */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="swiper-button-prev-custom w-12 h-12 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0b1622] transition-all cursor-pointer z-10">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="swiper-button-next-custom w-12 h-12 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0b1622] transition-all cursor-pointer z-10">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
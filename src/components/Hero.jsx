import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import my_pic from "../assets/my_pic.jpeg";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="home" className="bg-[#0b1622] min-h-screen text-white p-6 md:p-12 flex flex-col justify-between font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-smoke-texture opacity-50 z-0 pointer-events-none"></div>

      <main className="grow flex items-center z-10 py-16 md:py-24 pt-24 md:pt-32">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          
          {/* Profile Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center relative aspect-square max-w-md mx-auto w-full order-1 md:order-1"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-full h-full rounded-full border-4 overflow-hidden relative group"
              style={{ borderColor: 'var(--accent)', boxShadow: '0 0 60px var(--accent)' }}
            >
              <img src={my_pic} alt="Shivam Kumar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div 
                className="absolute inset-0 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-500" 
                style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
              ></div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 order-2 md:order-2">
            <motion.p variants={itemVariants} className="text-xl font-mono tracking-wide text-[var(--accent)]">Hello, I'm</motion.p>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">Shivam Kumar</motion.h1>
            
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl text-gray-100 font-bold h-[40px] md:h-[48px]">
              And I'm a <span className="text-[var(--accent)]">
                <TypeAnimation
                  sequence={['Frontend Developer', 2000, 'Web Developer', 2000]}
                  wrapper="span" speed={50} repeat={Infinity} className="inline-block"
                />
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-400 max-w-lg leading-relaxed text-lg">
              Enthusiastic and detail-oriented junior tech professional with a passion for problem-solving and continuous learning. Seeking to contribute to innovative projects and grow in a collaborative team environment.
            </motion.p>
            
            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex space-x-6 pt-4 text-2xl text-gray-400">
              <a href="https://github.com/shivamk2729u" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-all duration-300 hover:text-[var(--accent)]"><i className="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/shivamk2729u" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 transition-all duration-300 hover:text-[var(--accent)]"><i className="fab fa-linkedin"></i></a>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="text-[#0b1622] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105" style={{ backgroundColor: 'var(--accent)' }}>
                View Projects
              </a>
              <a 
                href="mailto:shivamk2729u@gmail.com" 
                className="border-2 font-bold py-3 px-8 rounded-full transition-colors duration-300"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--accent)'; e.target.style.color = '#0b1622'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--accent)'; }}
              >
                Hire Me
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
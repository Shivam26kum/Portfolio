import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Default accent color
  const [accent, setAccent] = useState('#01c9c0');

  const colors = [
    { name: 'Cyan', hex: '#01c9c0' },
    { name: 'Neon Purple', hex: '#a855f7' },
    { name: 'Hot Pink', hex: '#ec4899' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Sunset', hex: '#f97316' }
  ];

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' }
  ];

  // 1. SCROLL LISTENER FOR GLASS EFFECT
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. INTERSECTION OBSERVER FOR ACTIVE SECTION TRACKING
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detects when section is roughly in upper-middle of screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Track all sections that have IDs matching our navLinks
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // 3. CSS VARIABLE UPDATE
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0b1622]/80 backdrop-blur-md border-b py-4' : 'bg-transparent py-6'}`} 
      style={{ borderBottomColor: scrolled ? `${accent}30` : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
        
        {/* LOGO */}
        <motion.a 
          href="#home" 
          className="flex items-center text-3xl font-black tracking-tighter text-white"
          whileHover="hover"
          initial="initial"
        >
          {"Shivam".split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                initial: { y: 0, color: '#ffffff' },
                hover: { y: -5, color: accent, transition: { type: "spring", stiffness: 300, damping: 10 } }
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ color: accent }}
          >
            .
          </motion.span>
        </motion.a>

        {/* DESKTOP LINKS (ACTIVE TRACKING FIXED) */}
        <div className="hidden md:flex items-center space-x-2 bg-[#112233]/50 p-1.5 rounded-full border border-gray-800/50 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative px-5 py-2 text-sm font-mono transition-colors duration-300 ${activeLink === link.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <span className="relative z-10">{link.name}</span>
              {activeLink === link.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full -z-0"
                  style={{ backgroundColor: `${accent}20`, border: `1px solid ${accent}50` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* THEME PICKER & CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <button 
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center"
              style={{ borderColor: accent }}
            >
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: accent }}></div>
            </button>
            
            <AnimatePresence>
              {showColorPicker && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  className="absolute right-0 top-12 bg-[#112233] border border-gray-700 p-3 rounded-2xl flex gap-3 shadow-2xl backdrop-blur-xl"
                >
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => { setAccent(c.hex); setShowColorPicker(false); }}
                      className="w-6 h-6 rounded-full hover:scale-125 transition-transform"
                      style={{ backgroundColor: c.hex, boxShadow: accent === c.hex ? `0 0 10px ${c.hex}` : 'none' }}
                      title={c.name}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a 
            href="#contact" 
            className="border px-6 py-2.5 rounded-full transition-all font-mono text-sm hover:shadow-lg"
            style={{ borderColor: accent, color: accent }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = `${accent}15`;
              e.target.style.boxShadow = `0 0 20px ${accent}30`;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.boxShadow = 'none';
            }}
          >
            Say Hello
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none z-50">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={accent}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0b1622]/98 backdrop-blur-2xl border-b border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-10 space-y-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-mono transition-colors ${activeLink === link.id ? 'text-white' : 'text-gray-400'}`}
                  style={{ color: activeLink === link.id ? accent : '' }}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex justify-center gap-6 pt-6 border-t border-gray-800">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setAccent(c.hex)}
                    className="w-10 h-10 rounded-full border-2 transition-transform active:scale-90"
                    style={{ backgroundColor: c.hex, borderColor: accent === c.hex ? '#ffffff' : 'transparent' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
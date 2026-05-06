import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  const education = [
    {
      degree: "Diploma in Computer Science and Engineering",
      institution: "Government Polytechnic Bhagalpur",
      session: "2023 - 2026",
      result: "Ongoing",
      icon: "fas fa-university"
    }
  ];

  const additionalSkills = [
    { name: "Technical Writing", level: 85 },
    { name: "UI/UX Design", level: 75 },
    { name: "Project Management", level: 80 },
    { name: "Public Speaking", level: 70 }
  ];

  const languages = [
    { name: "English", level: "Professional", progress: 85 },
    { name: "Hindi", level: "Native", progress: 100 }
  ];

  return (
    <section id="education" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-7xl mx-auto text-gray-300">
      
      {/* Section Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="mb-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center">
          <div className="mr-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
          <span className="text-[var(--accent)] font-mono text-xl mr-3">05.</span> Education & Languages
          <div className="ml-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
        </h2>
      </motion.div>

      {/* 1. Education Section (Full Width Style) */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          {/* Rounded box added to header icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#112233] border border-[var(--accent)]/30 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">
            <i className="fas fa-graduation-cap text-[var(--accent)]"></i>
          </div>
          <h3 className="text-2xl font-bold text-white">Education</h3>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#112233] p-8 rounded-2xl border border-gray-800 relative group overflow-hidden"
            >
              {/* Curved Accent Border from Image */}
              <div 
                className="absolute top-0 left-0 w-2 h-full rounded-full" 
                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 15px var(--accent)' }}
              ></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-5">
                  {/* Rounded box added to inner card icon */}
                  <div className="w-12 h-12 rounded-lg bg-gray-800/80 flex items-center justify-center border border-[var(--accent)]/20 text-xl text-[var(--accent)]">
                    <i className={edu.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 leading-tight">{edu.degree}</h4>
                    <p className="text-[var(--accent)] font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500 font-mono mt-2">Session: {edu.session}</p>
                  </div>
                </div>
                <div className="md:text-right">
                  <span className="text-gray-400 font-mono text-sm tracking-wider uppercase">Status: {edu.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Skills & Languages Grid */}
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Additional Skills */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            {/* Rounded box added to header icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#112233] border border-[var(--accent)]/30">
              <i className="fas fa-bolt text-[var(--accent)]"></i>
            </div>
            <h3 className="text-2xl font-bold text-white">Additional Skills</h3>
          </div>
          
          <div className="bg-[#112233] p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-16 bg-[var(--accent)] rounded-full"></div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {additionalSkills.map((skill, index) => (
                <div key={index}>
                  <p className="text-sm font-bold text-gray-200 mb-3">{skill.name}</p>
                  <div className="h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-[var(--accent)]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            {/* Rounded box added to header icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#112233] border border-[var(--accent)]/30">
              <i className="fas fa-language text-[var(--accent)]"></i>
            </div>
            <h3 className="text-2xl font-bold text-white">Languages</h3>
          </div>

          <div className="bg-[#112233] p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-16 bg-[var(--accent)] rounded-full"></div>
            <div className="space-y-8">
              {languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-bold text-gray-200">{lang.name}</p>
                    <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest">{lang.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-[var(--accent)]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
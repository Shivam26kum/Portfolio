import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: "Full StackWeb Developement Intern", 
      company: "NIELIT", 
      date: "Jun 2024",
      // Main summary text
      summary: "Developed a fully responsive website from scratch and designed mobile-friendly layouts, ensuring high-quality UI across all devices. Worked on integrating frontend components with basic backend logic.",
      // Bulleted achievements
      achievements: [
        "Focused on mastering core web technologies, writing clean and organized code.",
        "Developed and structured responsive web layouts using modern standards.",
        "Gained comprehensive hands-on experience utilizing HTML, CSS, JavaScript, and PHP."
      ]
    },
    {
      role: "AI & ML Intern", 
      company: "TechGlaz Labs", 
      date: "Aug 2025",
      summary: "Developing a practical understanding of core AI/ML workflows and data preprocessing. Training and evaluating machine learning models to solve real-world problems.",
      achievements: [
        "Developing a practical understanding of core AI/ML workflows.",
        "Trained foundational machine learning models utilizing Python.",
        "Evaluated model performance to understand predictive accuracy in real-world projects."
      ]
    }
  ];

  return (
    <section id="experience" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-7xl mx-auto text-gray-300 relative overflow-hidden">
      
      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 w-full max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center">
          <div className="mr-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
          <span className="text-[var(--accent)] font-mono text-xl mr-3">03.</span> Experience
          <div className="ml-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
        </h2>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="relative w-full">
        
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gray-800 hidden md:block"></div>

        <div className="space-y-12 md:space-y-0">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-center mb-16">
                
                {/* Timeline Dot (Desktop) */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 hidden md:block"
                  style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}
                ></div>

                {/* Card Container */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`w-full md:w-[45%] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <div className="bg-[#112233] p-8 rounded-2xl border border-gray-800 shadow-xl relative group hover:border-[var(--accent)] transition-all duration-300">
                    
                    {/* Glowing Accent Line (Curved style from image) */}
                    <div 
                      className={`absolute top-0 h-16 w-1 rounded-full hidden md:block ${isEven ? 'right-0' : 'left-0'}`} 
                      style={{ backgroundColor: 'var(--accent)', boxShadow: `0 0 15px var(--accent)` }}
                    ></div>

                    {/* Briefcase Icon and Header Row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800/50"
                        style={{ border: '1px solid var(--accent)30' }}
                      >
                        <i className="fas fa-briefcase text-lg" style={{ color: 'var(--accent)' }}></i>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                          {exp.role}
                        </h3>
                        <span className="text-[var(--accent)] font-medium">{exp.company}</span>
                      </div>
                    </div>

                    {/* Date Row */}
                    <p className="font-mono text-sm text-gray-500 mb-6 flex items-center gap-2">
                      <i className="far fa-calendar-alt"></i> {exp.date}
                    </p>

                    {/* Summary Paragraph */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                      {exp.summary}
                    </p>

                    {/* Key Achievements Section */}
                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">Key Achievements:</h4>
                      <ul className="space-y-3 list-none">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start text-gray-400 gap-3 text-sm leading-relaxed">
                            {/* Circular bullet point from image */}
                            <span 
                              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" 
                              style={{ backgroundColor: 'var(--accent)' }}
                            ></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
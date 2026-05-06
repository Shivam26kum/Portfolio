import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import * as SI from "simple-icons";

const Icon = ({ slug, color }) => {
  const icon = SI[`si${slug}`];
  if (!icon) return null;
  return (
    <svg role="img" viewBox="0 0 24 24" fill={color} className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform duration-300">
      <path d={icon.path} />
    </svg>
  );
};

export default function Skills() {
  const skills = [
    { name: "React.js", slug: "React", color: "#61DAFB" },
    { name: "HTML5", slug: "Html5", color: "#E34F26" },
    { name: "Tailwind CSS", slug: "Tailwindcss", color: "#06B6D4" },
    { name: "Bootstrap", slug: "Bootstrap", color: "#7952B3" },
    { name: "JavaScript", slug: "Javascript", color: "#F7DF1E" },
    { name: "MongoDB", slug: "Mongodb", color: "#47A248" },
    { name: "PHP", slug: "Php", color: "#777BB4" },
    { name: "Git", slug: "Git", color: "#F05032" },
    { name: "GitHub", slug: "Github", color: "#FFFFFF" },
    { name: "Postman", slug: "Postman", color: "#FF6C37" },
    { name: "Vercel", slug: "Vercel", color: "#000000" },
    { name: "Netlify", slug: "Netlify", color: "#00C7B7" },
  ];

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-6xl mx-auto text-gray-300">
      {/* Updated Heading to match the Experience section */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center">
          <div className="mr-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
          <span className="text-[var(--accent)] font-mono text-xl mr-3">02.</span> Skills & Tools
          <div className="ml-6 h-[1px] bg-gray-700 flex-grow hidden md:block"></div>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
            {/* Added group and hover classes here so the borders react to the Theme Color switcher */}
            <TiltCard className="h-full bg-[#112233] group hover:border-[var(--accent)] transition-colors duration-300">
              <div className="flex flex-col items-center justify-center text-center h-full">
                <Icon slug={skill.slug} color={skill.color} />
                <h3 className="text-lg font-bold text-slate-100 mt-2 font-mono">{skill.name}</h3>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
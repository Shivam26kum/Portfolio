import { ReactLenis } from 'lenis/react';
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      <main className="bg-[#0b1622] min-h-screen text-slate-200 selection:bg-[#01c9c0]/30 selection:text-[#01c9c0] overflow-x-hidden">
        <Cursor />
        <Navbar />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </ReactLenis>
  );
}
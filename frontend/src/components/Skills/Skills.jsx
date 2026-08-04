import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiFlutter,
  SiPython,
  SiJavascript,
  SiMysql,
  SiFirebase,
  SiGithub,
  SiDocker,
  SiFastapi,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";
import { FaBrain, FaShieldAlt } from "react-icons/fa";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";
import Reveal from "../Common/Reveal";

const skillsData = [
  { icon: <SiReact />, name: "React 19", level: "90%", category: "frontend" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS", level: "92%", category: "frontend" },
  { icon: <SiThreedotjs />, name: "Three.js / R3F", level: "82%", category: "frontend" },
  { icon: <SiFlutter />, name: "Flutter & Dart", level: "88%", category: "mobile" },
  { icon: <SiFirebase />, name: "Firebase BaaS", level: "84%", category: "mobile" },
  { icon: <SiPython />, name: "Python", level: "94%", category: "backend" },
  { icon: <SiFastapi />, name: "FastAPI & REST", level: "89%", category: "backend" },
  { icon: <SiMysql />, name: "MySQL / SQLite", level: "85%", category: "backend" },
  { icon: <FaBrain />, name: "AI & NLP Models", level: "88%", category: "ai" },
  { icon: <SiDocker />, name: "Cloud Architecture", level: "85%", category: "security" },
  { icon: <SiDocker />, name: "Docker", level: "78%", category: "security" },
  { icon: <SiGithub />, name: "Git & GitHub", level: "91%", category: "security" },
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend & 3D" },
  { id: "backend", label: "Backend & APIs" },
  { id: "mobile", label: "Mobile & Firebase" },
  { id: "ai", label: "AI / ML" },
  { id: "security", label: "DevOps & Cloud" },
];

function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <Reveal delay={0.1}>
        <Container>
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="terminal-label mb-4">SKILLS MATRIX</p>
            <h2 className="section-title">Technology Arsenal</h2>
            <p className="section-subtitle">
              Modern technologies powering intelligent applications, full stack systems, mobile engineering, and cloud backend architectures.
            </p>
          </motion.div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-mono transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-white text-black font-bold shadow-lg shadow-white/20"
                    : "bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill, index) => (
              <GlassCard
                key={index}
                className="p-6 hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="text-4xl mb-5 text-slate-300 group-hover:text-white transition-colors duration-300">
                  {skill.icon}
                </div>

                <h3 className="text-lg font-bold mb-4">{skill.name}</h3>

                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-white font-bold">{skill.level}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

export default Skills;

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Play, Eye } from "lucide-react";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";
import Reveal from "../Common/Reveal";

export function getProjectImage(project) {
  if (project.liveUrl) {
    return `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
  }
  if (project.githubUrl && project.githubUrl.includes("github.com/")) {
    const cleanUrl = project.githubUrl.replace(/\.git$/, "");
    const parts = cleanUrl.split("github.com/");
    if (parts[1]) {
      return `https://opengraph.githubassets.com/1/${parts[1]}`;
    }
  }
  return project.image;
}

export const projectsList = [
  {
    id: "fakenews",
    title: "Fake News Detection System",
    category: "AI & Natural Language Processing",
    tags: ["Python", "NLP", "Scikit-Learn", "FastAPI", "React"],
    description: "An AI classification engine leveraging NLP algorithms to detect misleading, fabricated, or unverified news articles.",
    longDescription: "This NLP solution processes incoming text feeds, calculates linguistic credibility metrics, checks source reputation patterns, and outputs real-time authenticity scores.",
    highlights: [
      "TF-IDF feature extraction and machine learning classification.",
      "Real-time article text credibility scoring.",
      "RESTful API integration for instant browser extension lookups."
    ],
    image: "/project2.png",
    githubUrl: "https://github.com/Sai8143/News-Recommendation-System-App.git",
    liveUrl: "https://news-recommendation-system-app-wxzu.vercel.app/",
    hasSimulator: true,
  },
  {
    id: "accisense",
    title: "Accident-Detection-AcciSense",
    category: "AI & Computer Vision",
    tags: ["React", "Python", "Computer Vision", "GPS Dispatch", "FastAPI"],
    description: "An AI-powered emergency road safety platform detecting vehicular collisions in real time, extracting live GPS coordinates, and alerting nearest emergency networks.",
    longDescription: "AcciSense combines computer vision object-detection pipelines with automated geospatial alerts. When an impact anomaly is flagged by cameras or mobile sensors, the system verifies emergency thresholds and dispatches instant coordinates to emergency networks.",
    highlights: [
      "Real-time object detection & vehicle collision anomaly scoring.",
      "Instant GPS coordinate extraction and automated emergency response dispatch.",
      "Interactive map dashboard tracking active unit responses."
    ],
    image: "/project1.png",
    githubUrl: "https://github.com/Sai8143/Accident-Detection-AcciSense.git",
    hasSimulator: false,
  },
  {
    id: "tambola",
    title: "Online Tambola Game",
    category: "Flutter & Firebase",
    tags: ["Flutter", "Dart", "Firebase", "Real-Time Sync"],
    description: "Real-time multiplayer Tambola platform with automated number calling, room creation, live state synchronization, and ticket validation.",
    longDescription: "Built with Flutter and Firebase, this application supports concurrent multiplayer rooms, instant number calling synchronization, automated ticket generation, and win verification.",
    highlights: [
      "Automated 3x9 bingo ticket generation algorithm.",
      "Real-time socket/Firebase state sync across active players.",
      "Instant claim verification (Early 5, Top Line, Full House)."
    ],
    image: "/project3.png",
    githubUrl: "https://github.com/Sai8143/Tambola_Multiplayer_v1.git",
    hasSimulator: false,
  },
  {
    id: "elearning",
    title: "AI-Based E-Learning Recommendation System",
    category: "AI & Full Stack",
    tags: ["React", "Python", "Recommendation Engine", "YouTube API"],
    description: "Educational platform recommending curated learning resources and YouTube videos tailored to student preferences with interactive quizzes.",
    longDescription: "Analyzes learning goals and quiz performance to generate customized study roadmaps and recommend high-quality educational videos.",
    highlights: [
      "Personalized content recommendation matrix based on user topic affinity.",
      "Interactive topic-wise assessment tests inspired by top ed-tech platforms.",
      "Curated YouTube video indexing and filtering."
    ],
    image: "/project4.png",
    githubUrl: "https://github.com/Sai8143/Ai-E-learning-Recommendation-system.git",
    hasSimulator: false,
  },
];

function Projects({ onSelectProject, onLaunchSimulator }) {
  return (
    <section id="projects" className="section">
      <Reveal delay={0.2}>
        <Container>
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="terminal-label mb-4">PROJECT SHOWCASE</p>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Real-world solutions combining Artificial Intelligence, Computer Vision, Flutter Mobile Apps, and Full Stack Backend Architectures.
            </p>
          </motion.div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projectsList.map((project) => (
              <GlassCard
                key={project.id}
                className="overflow-hidden hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  {/* IMAGE */}
                  <div className="relative h-[260px] overflow-hidden bg-white/5">
                    <img
                      src={getProjectImage(project)}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = project.image;
                      }}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl text-xs font-mono text-white">
                      {project.category}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="p-8 pt-0 flex flex-wrap gap-3 border-t border-white/5">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-white font-medium text-xs transition-all"
                  >
                    <Eye className="w-4 h-4 text-white" /> Case Study
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all shadow-md"
                    >
                      <Play className="w-4 h-4" /> Live Demo
                    </a>
                  ) : project.hasSimulator ? (
                    <button
                      onClick={() => onLaunchSimulator(project.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all shadow-md"
                    >
                      <Play className="w-4 h-4" /> Live Demo
                    </button>
                  ) : null}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
                    title="Source Code"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

export default Projects;
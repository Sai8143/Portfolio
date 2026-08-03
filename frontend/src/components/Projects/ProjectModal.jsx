import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, CheckCircle2, Play } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { getProjectImage } from "./Projects";

export default function ProjectModal({ project, onClose, onLaunchSimulator }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-zinc-900/90 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-2xl text-white font-sans"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-2xl border border-white/10 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LIVE PREVIEW IMAGE BANNER */}
          <div className="relative h-[200px] md:h-[260px] w-full mb-6 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800/40">
            <img
              src={getProjectImage(project)}
              alt={project.title}
              onError={(e) => {
                e.currentTarget.src = project.image;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          </div>

          {/* HEADER */}
          <div className="mb-6">
            <span className="inline-block px-3.5 py-1.5 mb-3 text-xs font-mono rounded-full bg-zinc-800/60 border border-white/10 text-white">
              {project.category || "Featured Case Study"}
            </span>
            <h2 className="text-2xl lg:text-3xl font-black">{project.title}</h2>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-mono bg-zinc-800/40 border border-white/10 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-4 mb-8 text-zinc-300 leading-relaxed">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-white" /> System Architecture & Overview
            </h3>
            <p className="text-zinc-300">{project.longDescription || project.description}</p>
          </div>

          {/* KEY HIGHLIGHTS */}
          {project.highlights && (
            <div className="mb-8 p-6 rounded-2xl bg-zinc-800/40 border border-white/10 backdrop-blur-md">
              <h4 className="terminal-label mb-4">
                CORE INNOVATIONS & CAPABILITIES
              </h4>
              <ul className="space-y-3">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-md text-xs"
              >
                <Play className="w-4 h-4" /> Open Deployed Live App
              </a>
            ) : project.hasSimulator ? (
              <button
                onClick={() => {
                  onClose();
                  onLaunchSimulator(project.id);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-md text-xs"
              >
                <Play className="w-4 h-4" /> Launch Interactive Simulator
              </button>
            ) : null}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-zinc-800/40 hover:bg-zinc-800 text-white font-medium text-xs transition-all"
              >
                <FaGithub className="w-4 h-4" /> Source Repository
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

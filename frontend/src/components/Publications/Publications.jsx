import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Quote, Award, Calendar, Link2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import Container from "../Common/Container";
import GlassCard from "../Common/GlassCard";
import Reveal from "../Common/Reveal";

export const publicationsList = [
  {
    id: "cityadaptai",
    title: "CITYADAPTAI – AI-Driven Smart City Personalization System",
    authors: "Chinni Sai Ganesh, et al.",
    venue: "International Journal of Applied Mathematics (IJAM), Vol. 38, No. 4, 2025",
    year: "2025",
    publisher: "IJAM Journal",
    doi: "https://doi.org/10.12732/ijam.v38i12s.1693",
    paperUrl: "https://doi.org/10.12732/ijam.v38i12s.1693",
    abstract:
      "Assisted in frontend development and AI model integration for an AI-driven smart city personalization system.",
    tags: ["AI Personalization", "Smart City", "AI Model Integration", "Frontend Engineering", "IJAM"],
    citation: `@article{saiganesh2025cityadaptai,
  title={CITYADAPTAI -- AI-Driven Smart City Personalization System},
  author={Chinni Sai Ganesh},
  journal={International Journal of Applied Mathematics (IJAM)},
  volume={38},
  number={4},
  year={2025},
  doi={10.12732/ijam.v38i12s.1693}
}`,
  },
];

export default function Publications() {
  const [activeBibtexId, setActiveBibtexId] = useState(null);

  const toggleBibtex = (id) => {
    setActiveBibtexId(activeBibtexId === id ? null : id);
  };

  return (
    <section id="publications" className="section relative py-20">
      <Reveal delay={0.2}>
        <Container>
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="terminal-label mb-4">RESEARCH & ACADEMIA</p>
            <h2 className="section-title">Publications</h2>
            <p className="section-subtitle">
              Peer-reviewed research articles and journal publications in Artificial Intelligence, Applied Mathematics, and Smart Systems.
            </p>
          </motion.div>

          {/* PUBLICATIONS LIST */}
          <div className="space-y-8 max-w-4xl">
            {publicationsList.map((pub) => (
              <GlassCard
                key={pub.id}
                className="p-8 lg:p-10 border border-white/10 hover:border-white/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* AMBIENT CORNER GLOW */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.04] transition-all duration-500" />

                <div className="relative z-10 space-y-5">
                  {/* METADATA BADGES */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      IJAM Journal
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-white/10 text-zinc-300">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {pub.year}
                    </span>
                    <span className="text-zinc-400 font-sans italic">
                      {pub.venue}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug group-hover:text-zinc-100 transition-colors">
                    {pub.title}
                  </h3>

                  {/* DOI LINK */}
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Link2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="text-zinc-500">DOI:</span>
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:underline truncate"
                    >
                      {pub.doi}
                    </a>
                  </div>

                  {/* ROLE & DESCRIPTION */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      CONTRIBUTION & ROLE:
                    </p>
                    <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                      • {pub.abstract}
                    </p>
                  </div>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {pub.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ACTIONS & CITATION */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    {pub.paperUrl && (
                      <a
                        href={pub.paperUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md"
                      >
                        <BookOpen className="w-4 h-4" /> Open Journal Paper (DOI)
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => toggleBibtex(pub.id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-all ml-auto"
                    >
                      <Quote className="w-3.5 h-3.5" />
                      {activeBibtexId === pub.id ? "Hide BibTeX" : "Cite BibTeX"}
                    </button>
                  </div>

                  {/* BIBTEX EXPANDABLE CODE BLOCK */}
                  {activeBibtexId === pub.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 rounded-xl bg-black/90 border border-white/15 text-xs font-mono text-zinc-300 overflow-x-auto"
                    >
                      <pre>{pub.citation}</pre>
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Search, X, Folder, Code, Mail, FileText, Cpu, Activity } from "lucide-react";

export default function CommandPalette({ isOpen, onClose, onSelectAction }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { id: "projects", title: "View Featured Projects", section: "Navigation", icon: Folder, action: () => scrollTo("projects") },
    { id: "skills", title: "Explore Tech Stack & Skills", section: "Navigation", icon: Code, action: () => scrollTo("skills") },
    { id: "about", title: "About Sai Ganesh", section: "Navigation", icon: Cpu, action: () => scrollTo("about") },
    { id: "contact", title: "Initiate Connection / Contact", section: "Navigation", icon: Mail, action: () => scrollTo("contact") },
    { id: "telemetry", title: "View System Telemetry & Visitor Stats", section: "System", icon: Activity, action: () => scrollTo("visitor-counter") },
    { id: "resume", title: "Open Resume Preview Modal", section: "Document", icon: FileText, action: () => onSelectAction("resume") },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) || cmd.id.includes(query.toLowerCase())
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectAction("open-palette");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-slate-950/90 border border-white/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          {/* INPUT HEADER */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search section (e.g. projects, skills, resume)..."
              className="w-full bg-transparent text-white placeholder-slate-500 outline-none text-base font-mono"
            />
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* LIST OF COMMANDS */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-1 font-sans">
            {filteredCommands.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-500 text-sm font-mono">
                No matching system commands found.
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const IconComponent = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                      idx === selectedIndex
                        ? "bg-white/10 text-white border border-white/15"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{cmd.title}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{cmd.section}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* FOOTER */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Navigation Terminal</span>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Esc</span> to close
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Award, Briefcase } from "lucide-react";

export default function ResumeModal({ isOpen, onClose, onToast }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    onToast({ type: "success", message: "Downloading Resume (Sai_Ganesh_Chinni_Resume.txt)..." });
    const element = document.createElement("a");
    const file = new Blob([getResumeTextContent()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Sai_Ganesh_Chinni_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getResumeTextContent = () => {
    return `SAI GANESH CHINNI
Full Stack Developer | AI & Mobile Systems Engineer
Email: saiganesh0565@gmail.com | Phone: +91 8341296052
Location: Hyderabad, Telangana, India
GitHub: https://github.com/Sai8143

TECHNICAL SKILLS:
- Languages: Python, JavaScript/ES6+, Dart, C/C++, HTML5/CSS3
- Frontend: React 19, Tailwind CSS, Three.js / R3F, Framer Motion
- Mobile: Flutter, Dart, Firebase
- Backend: FastAPI, SQLAlchemy, SQLite, MySQL, REST APIs
- AI/ML: NLP, Computer Vision, Predictive Modeling, Scikit-learn
- Cloud & DevOps: Docker, Git & GitHub, System Architecture

PROJECT HIGHLIGHTS:
1. Accident-Detection-AcciSense: AI Road Safety & GPS Dispatch
2. Fake News Detection System: NLP Text Credibility Evaluator
3. Online Tambola Game: Real-time Flutter & Firebase Multiplayer
4. AI E-Learning Recommendation System: Smart YouTube & Course Classifier

INTERNSHIP:
- AVNL Ordnance Factory Hyderabad: Engineering Training & System Exposure
`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-zinc-900/90 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-2xl text-white font-sans"
        >
          {/* HEADER ACTIONS */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-zinc-800/60 text-white border border-white/10">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Sai Ganesh Chinni — Resume</h2>
                <p className="text-xs font-mono text-zinc-400">Full Stack & AI Engineer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-white/10 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RESUME CONTENT */}
          <div className="space-y-6 text-sm text-zinc-300">
            {/* SUMMARY */}
            <div className="p-6 rounded-2xl bg-zinc-800/40 border border-white/10 backdrop-blur-md">
              <h3 className="terminal-label mb-3">EXECUTIVE OVERVIEW</h3>
              <p className="leading-relaxed text-zinc-300">
                Versatile AI Engineer and Full Stack Developer skilled in building high-performance web applications, mobile platforms with Flutter, and intelligent machine learning models. Dedicated to clean architecture, modern visual aesthetics, and cyber resilience.
              </p>
            </div>

            {/* TECHNICAL STACK */}
            <div className="space-y-3">
              <h3 className="terminal-label flex items-center gap-2">
                <Award className="w-4 h-4 text-white" /> CORE COMPETENCIES & SKILLS
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/10 backdrop-blur-md">
                  <span className="font-bold text-white block mb-1">Frontend & Mobile</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">React 19, Flutter, Dart, Tailwind CSS, Three.js, Framer Motion</p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/10 backdrop-blur-md">
                  <span className="font-bold text-white block mb-1">Backend & AI</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">Python, FastAPI, SQLAlchemy, SQLite, Firebase, NLP, Machine Learning</p>
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="space-y-3">
              <h3 className="terminal-label flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-white" /> INDUSTRIAL EXPOSURE & EXPERIENCE
              </h3>
              <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-white">Engineering Trainee</span>
                  <span className="text-xs font-mono text-zinc-400">AVNL Ordnance Factory</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gained industry exposure to advanced systems engineering, workflow automation, and infrastructure operations in Hyderabad.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { useEffect, useState } from "react";

import Loader from "./components/Loader/Loader";
import ParticleBackground from "./components/Particles/ParticleBackground";
import AnimatedCursor from "./components/AnimatedCursor/AnimatedCursor";
import MagicCursorTrail from "./components/AnimatedCursor/MagicCursorTrail";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";

import Toast from "./components/Common/Toast";
import ProjectModal from "./components/Projects/ProjectModal";
import ProjectSimulators from "./components/Projects/ProjectSimulators";
import ResumeModal from "./components/Resume/ResumeModal";
import AnalyticsModal from "./components/VisitorCounter/AnalyticsModal";

function App() {
  const [loading, setLoading] = useState(true);

  // Global Modals State
  const [toast, setToast] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSimulatorId, setActiveSimulatorId] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(42);

  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => setToast(null), 4000);
  };

  /* =====================================
      FORCE TOP ON APP LOAD
  ===================================== */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /* =====================================
      LOADER
  ===================================== */
  if (loading) {
    return (
      <Loader
        onComplete={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setLoading(false);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-x-hidden">
      {/* BACKGROUND SYSTEM */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-white/[0.04] blur-[220px]" />
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-white/[0.03] blur-[260px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-white/[0.015] blur-[280px]" />
        <div className="absolute top-[10%] left-[5%] w-[700px] h-[700px] rounded-full bg-white/[0.04] blur-[220px] animate-pulse" />
        <div className="absolute bottom-[5%] right-[5%] w-[800px] h-[800px] rounded-full bg-white/[0.03] blur-[260px]" />
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-white/[0.015] blur-[300px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* SYSTEMS */}
      <ParticleBackground />
      <AnimatedCursor />
      <MagicCursorTrail />
      <ScrollProgress />

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="relative z-10">
        <Home
          onSelectProject={(proj) => setSelectedProject(proj)}
          onLaunchSimulator={(simId) => setActiveSimulatorId(simId)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAnalytics={(cnt) => {
            setVisitorCount(cnt || 42);
            setIsAnalyticsOpen(true);
          }}
          onToast={showToast}
        />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL MODALS & TOAST */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunchSimulator={(simId) => setActiveSimulatorId(simId)}
      />

      <ProjectSimulators
        activeSimId={activeSimulatorId}
        onClose={() => setActiveSimulatorId(null)}
        onToast={showToast}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onToast={showToast}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        visitorCount={visitorCount}
      />
    </div>
  );
}

export default App;

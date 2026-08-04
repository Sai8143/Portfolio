import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BlackHoleScene from "./BlackHoleScene";
import LoadingMessages from "./LoadingMessages";
import { preloadWhooshSound } from "../../utils/whooshSound";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const audioCtxRef = useRef(null);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    preloadWhooshSound();
    setWindowHeight(window.innerHeight);

    // Initialize Low Background Music
    if (!bgMusicRef.current) {
      const bgAudio = new Audio("/Low Background music.mp3");
      bgAudio.loop = true;
      bgAudio.volume = 0.55;
      bgMusicRef.current = bgAudio;
    }

    // Pre-instantiate AudioContext
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext && !audioCtxRef.current) {
      try {
        audioCtxRef.current = new AudioContext();
      } catch (e) {}
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Fail-safe audio unlock trigger for Vercel production
    const unlockAudio = () => {
      try {
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().catch(() => {});
        }

        if (bgMusicRef.current && bgMusicRef.current.paused) {
          const promise = bgMusicRef.current.play();
          if (promise !== undefined) {
            promise
              .then(() => {
                setAudioBlocked(false);
              })
              .catch(() => {
                setAudioBlocked(true);
              });
          }
        }
      } catch (e) {}
    };

    // Attempt instant activation on mount
    unlockAudio();

    // Universal multi-gesture event listeners
    const events = ["click", "touchstart", "touchend", "pointerdown", "mousemove", "scroll", "keydown"];
    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true });
      document.addEventListener(evt, unlockAudio, { capture: true, passive: true });
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio, { capture: true });
        document.removeEventListener(evt, unlockAudio, { capture: true });
      });

      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 15000;
    let frame;

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(pct);

      // Attempt background music play if not yet started
      if (bgMusicRef.current && bgMusicRef.current.paused && pct < 85) {
        const promise = bgMusicRef.current.play();
        if (promise !== undefined) {
          promise
            .then(() => setAudioBlocked(false))
            .catch(() => setAudioBlocked(true));
        }
      }

      // 🎵 SMOOTH BACKGROUND MUSIC FADE OUT AS LOADER APPROACHES 100%
      // Ramps volume smoothly down from 0.55 -> 0.00 over the final 30% of loading (progress 70% to 100%)
      if (bgMusicRef.current) {
        if (pct < 70) {
          bgMusicRef.current.volume = 0.55;
        } else {
          const fadeRatio = (100 - pct) / 30; // 1.0 -> 0.0
          const targetVol = Math.max(0, 0.55 * Math.pow(fadeRatio, 1.5));
          bgMusicRef.current.volume = targetVol;
        }
      }

      if (elapsed < duration) {
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(100);

        // Complete smooth fade out of background music
        if (bgMusicRef.current) {
          bgMusicRef.current.volume = 0;
          setTimeout(() => {
            if (bgMusicRef.current) {
              bgMusicRef.current.pause();
            }
          }, 800);
        }

        setTimeout(() => {
          setIsDone(true);
          if (onComplete) {
            onComplete();
          }
        }, 1200);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [onComplete]);

  const factor = Math.max(0, Math.min(1, (progress - 40) / 60));
  const targetY = windowHeight * 0.38;
  const subtitleTargetY = windowHeight * 0.3;

  const nameLetters = Array.from("SAI GANESH");
  const subtitleLetters = Array.from("Code</> Create Innovate");

  const manualUnlock = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().then(() => setAudioBlocked(false)).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 1.2 },
          }}
          onClick={manualUnlock}
          onTouchStart={manualUnlock}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden select-none cursor-pointer"
        >
          <div className="absolute inset-0">
            <BlackHoleScene />
          </div>

          <div
            className="absolute rounded-full pointer-events-none w-[75vw] h-[75vw] max-w-[1200px] max-h-[1200px] bg-white/[0.015] blur-[140px]"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* TAP TO ENABLE AUDIO BADGE (Shows if Vercel browser autoplay is restricted) */}
          {audioBlocked && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  manualUnlock();
                }}
                className="px-5 py-2.5 rounded-full border border-white/30 bg-black/80 backdrop-blur-xl text-white text-xs font-mono tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:bg-white/20 transition-all animate-bounce"
              >
                <span>🔊 Tap Anywhere to Enable Audio</span>
              </button>
            </motion.div>
          )}

          {/* TITLE AREA */}
          <div className="absolute top-[8vh] left-0 right-0 z-20 flex flex-col items-center text-center px-4">
            {/* NAME LETTERS */}
            <div className="flex justify-center text-white text-5xl md:text-7xl font-black tracking-[-0.05em]">
              {nameLetters.map((char, index) => {
                const tiltPhase = Math.max(0, Math.min(1, (progress - 40) / 20));
                const spiralPhase = Math.max(0, Math.min(1, (progress - 60) / 30));
                const absorbPhase = Math.max(0, Math.min(1, (progress - 90) / 10));

                const angle = index * 0.45 - spiralPhase * Math.PI * 6;
                const radius = 220 * Math.pow(1 - spiralPhase, 3);
                const x = progress >= 60 ? Math.cos(angle) * radius : 0;
                const y = progress >= 60 ? targetY + Math.sin(angle) * radius : factor * targetY;

                return (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    animate={{
                      x,
                      y,
                      rotate: tiltPhase * -25 + spiralPhase * -540,
                      skewX: tiltPhase * 12,
                      scale: 1 - absorbPhase,
                      opacity: 1 - absorbPhase,
                      filter: `blur(${absorbPhase * 10}px)`,
                      scaleX: 1 + spiralPhase * 2.5,
                      scaleY: 1 - spiralPhase * 0.4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>

            {/* SUBTITLE */}
            <div className="flex justify-center text-slate-400 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[6px] mt-4">
              {subtitleLetters.map((char, index) => {
                const tiltPhase = Math.max(0, Math.min(1, (progress - 40) / 20));
                const spiralPhase = Math.max(0, Math.min(1, (progress - 60) / 30));
                const absorbPhase = Math.max(0, Math.min(1, (progress - 90) / 10));

                const angle = index * 0.35 - spiralPhase * Math.PI * 6;
                const radius = 180 * Math.pow(1 - spiralPhase, 3);
                const x = progress >= 60 ? Math.cos(angle) * radius : 0;
                const y = progress >= 60 ? subtitleTargetY + Math.sin(angle) * radius : factor * subtitleTargetY;

                return (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    animate={{
                      x,
                      y,
                      rotate: tiltPhase * -15 + spiralPhase * -360,
                      scale: 1 - absorbPhase,
                      opacity: 0.7 - absorbPhase * 0.7,
                      filter: `blur(${absorbPhase * 8}px)`,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          </div>

          {/* LOADING CARD AREA */}
          <div className="absolute bottom-[8vh] left-0 right-0 z-20 flex justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="w-full max-w-md rounded-[30px] border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_0_60px_rgba(255,255,255,0.05)] px-6 py-5 sm:px-8 sm:py-6"
            >
              <LoadingMessages progress={progress} />

              {/* PROGRESS BAR */}
              <div className="relative mt-5 h-[2px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-neutral-500 via-white to-neutral-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* STATUS */}
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-slate-500">
                <span>System Initialization</span>
                <span className="text-white font-bold">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
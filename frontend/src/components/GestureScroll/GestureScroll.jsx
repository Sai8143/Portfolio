import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHandPaper,
  FaVideo,
  FaVideoSlash,
  FaArrowUp,
  FaArrowDown,
  FaTimes,
  FaShieldAlt,
  FaSlidersH,
} from "react-icons/fa";

export default function GestureScroll() {
  const [active, setActive] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [direction, setDirection] = useState("IDLE"); // 'UP', 'DOWN', 'IDLE'
  const [sensitivityMode, setSensitivityMode] = useState("HIGH"); // Default to HIGH for best responsiveness
  const [handDetected, setHandDetected] = useState(false);

  const videoRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastScrollTimeRef = useRef(0);

  // Toggle Gesture Scrolling Camera
  const toggleGestureScroll = async () => {
    if (active) {
      stopCamera();
      setActive(false);
      setDirection("IDLE");
      setHandDetected(false);
    } else {
      setErrorMsg(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 },
            facingMode: "user",
          },
        });
        streamRef.current = stream;
        setPermissionGranted(true);
        setActive(true);
      } catch (err) {
        console.error("Camera access error:", err);
        setErrorMsg("Camera access denied or unavailable. Please allow camera permissions in your browser.");
        setActive(false);
      }
    }
  };

  // Attach camera stream when video element mounts
  useEffect(() => {
    if (active && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Process Video Frames for High-Precision Hand Tracking
  useEffect(() => {
    if (!active || !permissionGranted) return;

    let prevFrameData = null;

    const processFrame = () => {
      const video = videoRef.current;
      const hiddenCanvas = hiddenCanvasRef.current;
      const overlayCanvas = overlayCanvasRef.current;

      if (video && hiddenCanvas && video.readyState >= 2) {
        const hCtx = hiddenCanvas.getContext("2d", { willReadFrequently: true });
        const width = hiddenCanvas.width;
        const height = hiddenCanvas.height;

        hCtx.drawImage(video, 0, 0, width, height);
        const currentFrame = hCtx.getImageData(0, 0, width, height);
        const currentData = currentFrame.data;

        // Draw Bounding Box & Target Overlay on Visible Overlay Canvas
        let oCtx = null;
        if (overlayCanvas) {
          oCtx = overlayCanvas.getContext("2d");
          oCtx.clearRect(0, 0, width, height);

          // Draw horizontal active zone divider lines
          oCtx.strokeStyle = "rgba(16, 185, 129, 0.35)";
          oCtx.setLineDash([4, 4]);
          oCtx.beginPath();
          oCtx.moveTo(0, height * 0.45);
          oCtx.lineTo(width, height * 0.45);
          oCtx.moveTo(0, height * 0.55);
          oCtx.lineTo(width, height * 0.55);
          oCtx.stroke();
          oCtx.setLineDash([]);
        }

        if (prevFrameData) {
          let totalActivePixels = 0;
          let sumX = 0;
          let sumY = 0;

          let minX = width, maxX = 0, minY = height, maxY = 0;

          // Motion threshold based on selected sensitivity mode
          const motionThreshold = sensitivityMode === "HIGH" ? 18 : sensitivityMode === "MEDIUM" ? 28 : 45;
          const minPixelCount = sensitivityMode === "HIGH" ? 12 : sensitivityMode === "MEDIUM" ? 24 : 50;

          // Loop through frame pixels
          for (let i = 0; i < currentData.length; i += 8) {
            const r = currentData[i];
            const g = currentData[i + 1];
            const b = currentData[i + 2];

            const pr = prevFrameData[i];
            const pg = prevFrameData[i + 1];
            const pb = prevFrameData[i + 2];

            const diff = Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb);

            // Skin tone color heuristic (RGB)
            const isSkin = r > 70 && g > 30 && b > 15 && r > g && r > b && (r - g) > 8;

            if (diff > motionThreshold || (isSkin && diff > 10)) {
              const pixelIndex = i / 4;
              const x = pixelIndex % width;
              const y = Math.floor(pixelIndex / width);

              sumX += x;
              sumY += y;
              totalActivePixels++;

              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }

          const now = performance.now();

          if (totalActivePixels > minPixelCount) {
            setHandDetected(true);
            const avgY = sumY / totalActivePixels;
            const normalizedY = avgY / height; // 0.0 (top) to 1.0 (bottom)

            // Draw Hand Bounding Box on Overlay Canvas
            if (oCtx && minX < maxX && minY < maxY) {
              oCtx.strokeStyle = "#10b981"; // Emerald green
              oCtx.lineWidth = 2;
              oCtx.strokeRect(minX, minY, Math.max(20, maxX - minX), Math.max(20, maxY - minY));

              oCtx.fillStyle = "#10b981";
              oCtx.beginPath();
              oCtx.arc(sumX / totalActivePixels, avgY, 6, 0, Math.PI * 2);
              oCtx.fill();
            }

            // Top Region of Video Feed ➔ Scroll Up
            if (normalizedY < 0.45) {
              setDirection("UP");
              if (now - lastScrollTimeRef.current > 100) {
                const scrollStep = sensitivityMode === "HIGH" ? 240 : 180;
                window.scrollBy({ top: -scrollStep, behavior: "smooth" });
                lastScrollTimeRef.current = now;
              }
            }
            // Bottom Region of Video Feed ➔ Scroll Down
            else if (normalizedY > 0.55) {
              setDirection("DOWN");
              if (now - lastScrollTimeRef.current > 100) {
                const scrollStep = sensitivityMode === "HIGH" ? 240 : 180;
                window.scrollBy({ top: scrollStep, behavior: "smooth" });
                lastScrollTimeRef.current = now;
              }
            } else {
              setDirection("IDLE");
            }
          } else {
            setHandDetected(false);
            setDirection("IDLE");
          }
        }

        prevFrameData = currentData;
      }

      animFrameRef.current = requestAnimationFrame(processFrame);
    };

    animFrameRef.current = requestAnimationFrame(processFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [active, permissionGranted, sensitivityMode]);

  return (
    <>
      {/* FLOATING HUD TOGGLE BUTTON (Bottom Right - Clean & Unobtrusive) */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
        <motion.button
          onClick={toggleGestureScroll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`h-12 px-5 rounded-2xl border backdrop-blur-xl flex items-center gap-3 text-xs font-mono tracking-wider shadow-2xl transition-all duration-300 ${
            active
              ? "border-emerald-500/50 bg-emerald-950/80 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
              : "border-white/20 bg-black/70 text-white hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          }`}
          title="Touch-Free Hand Gesture Scrolling"
        >
          <FaHandPaper className={`w-4 h-4 ${active ? "animate-bounce text-emerald-400" : "text-white"}`} />
          <span>{active ? "Touch-Free Active" : "Touch-Free Scroll"}</span>
          <div className={`w-2.5 h-2.5 rounded-full ${active ? (handDetected ? "bg-emerald-400 animate-ping" : "bg-amber-400 animate-pulse") : "bg-zinc-500"}`} />
        </motion.button>
      </div>

      {/* GESTURE HUD MONITOR OVERLAY (Docked Bottom Right above button) */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-22 right-6 z-[999] w-[270px] rounded-3xl border border-white/20 bg-zinc-950/95 backdrop-blur-2xl p-4 shadow-2xl space-y-3"
          >
            {/* HUD HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaVideo className="w-3.5 h-3.5 text-emerald-400" />
                <p className="terminal-label text-[10px]">AI GESTURE SENSOR</p>
              </div>
              <button
                onClick={toggleGestureScroll}
                className="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>

            {/* WEBCAM PREVIEW + BOUNDING BOX OVERLAY */}
            <div className="relative w-full h-[150px] rounded-2xl border border-white/15 bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <canvas ref={hiddenCanvasRef} width="160" height="120" className="hidden" />
              <canvas
                ref={overlayCanvasRef}
                width="160"
                height="120"
                className="absolute inset-0 w-full h-full transform -scale-x-100 pointer-events-none z-10"
              />

              {/* DIRECTION STATUS OVERLAY */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 z-20">
                <div className="flex justify-between items-center text-[9px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-zinc-300 border border-white/10">
                    TOP = UP | BOT = DOWN
                  </span>
                  <span className={`px-2 py-0.5 rounded font-bold border ${handDetected ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-amber-500/20 text-amber-300 border-amber-500/40"}`}>
                    {handDetected ? "HAND DETECTED" : "SEARCHING"}
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  {direction === "UP" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black font-black text-xs flex items-center gap-1.5 shadow-lg"
                    >
                      <FaArrowUp className="w-3.5 h-3.5" /> SCROLLING UP
                    </motion.div>
                  )}
                  {direction === "DOWN" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black font-black text-xs flex items-center gap-1.5 shadow-lg"
                    >
                      <FaArrowDown className="w-3.5 h-3.5" /> SCROLLING DOWN
                    </motion.div>
                  )}
                  {direction === "IDLE" && (
                    <span className="text-[10px] font-mono text-zinc-300 bg-black/70 px-3 py-1 rounded-full border border-white/15">
                      {handDetected ? "Hold in Top/Bottom Half" : "Wave Hand Near Camera"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SENSITIVITY SELECTOR */}
            <div className="flex items-center justify-between bg-white/[0.03] p-2 rounded-xl border border-white/5 text-[10px] font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <FaSlidersH className="w-3 h-3 text-zinc-500" /> Sensitivity:
              </span>
              <div className="flex items-center gap-1">
                {["LOW", "MEDIUM", "HIGH"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSensitivityMode(mode)}
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-all ${
                      sensitivityMode === mode
                        ? "bg-emerald-500 text-black"
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="text-[10px] font-mono text-zinc-400 space-y-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <p className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-emerald-400 font-bold">↑</span> Move hand to TOP half ➔ Scroll Up
              </p>
              <p className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-emerald-400 font-bold">↓</span> Move hand to BOTTOM half ➔ Scroll Down
              </p>
            </div>

            {/* PRIVACY NOTICE */}
            <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 pt-0.5">
              <FaShieldAlt className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>100% Local Browser Sensor (No Storage)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR TOAST */}
      {errorMsg && (
        <div className="fixed bottom-22 right-6 z-[999] max-w-xs p-4 rounded-2xl border border-red-500/40 bg-zinc-950 text-red-300 text-xs font-mono shadow-2xl flex items-start gap-3">
          <FaVideoSlash className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold mb-1">Camera Permission Required</p>
            <p className="text-[11px] text-zinc-400 leading-relaxed">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-zinc-500 hover:text-white">
            <FaTimes className="w-3 h-3" />
          </button>
        </div>
      )}
    </>
  );
}

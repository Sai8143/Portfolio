import { useEffect, useState, useMemo } from "react";

export default function Bot3DCanvas({ className = "", isSpeaking = false }) {
  const [rotation, setRotation] = useState(0);
  const [waveTime, setWaveTime] = useState(0);

  // Animation frame loop — Voice wave movement ONLY activates when isSpeaking === true
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isSpeaking) {
        // Voice active: rotate rings and animate fluid undulating sound wave movement
        setRotation((prev) => (prev + 35 * delta) % 360);
        setWaveTime((prev) => prev + delta * 6.0);
      } else {
        // Idle: slow steady ambient rotation, wave time remains frozen/calm
        setRotation((prev) => (prev + 12 * delta) % 360);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSpeaking]);

  // Generate 120-point SVG wave path — ACTIVATES and MOVES only when isSpeaking === true!
  const outerWavePath = useMemo(() => {
    const points = 120;
    const baseR = 175;
    // Amplitude is 0 when idle (perfect flat circle), 9px when speaking (moving voice wave)
    const amp = isSpeaking ? 9.0 : 0;
    let d = "";

    for (let i = 0; i <= points; i++) {
      const theta = (i / points) * Math.PI * 2;
      const wave = isSpeaking
        ? Math.sin(theta * 6 + waveTime) * amp + Math.cos(theta * 4 - waveTime * 0.8) * (amp * 0.5)
        : 0;
      const r = baseR + wave;
      const x = 200 + r * Math.cos(theta);
      const y = 200 + r * Math.sin(theta);

      if (i === 0) {
        d += `M ${x.toFixed(2)},${y.toFixed(2)}`;
      } else {
        d += ` L ${x.toFixed(2)},${y.toFixed(2)}`;
      }
    }
    return d + " Z";
  }, [waveTime, isSpeaking]);

  // Secondary inner wave path — ACTIVATES only when speaking
  const innerWavePath = useMemo(() => {
    const points = 100;
    const baseR = 145;
    const amp = isSpeaking ? 6.5 : 0;
    let d = "";

    for (let i = 0; i <= points; i++) {
      const theta = (i / points) * Math.PI * 2;
      const wave = isSpeaking
        ? Math.sin(theta * 8 - waveTime * 1.2) * amp + Math.sin(theta * 3 + waveTime * 0.6) * (amp * 0.5)
        : 0;
      const r = baseR + wave;
      const x = 200 + r * Math.cos(theta);
      const y = 200 + r * Math.sin(theta);

      if (i === 0) {
        d += `M ${x.toFixed(2)},${y.toFixed(2)}`;
      } else {
        d += ` L ${x.toFixed(2)},${y.toFixed(2)}`;
      }
    }
    return d + " Z";
  }, [waveTime, isSpeaking]);

  return (
    <div
      className={`relative w-full h-[360px] md:h-[400px] flex flex-col items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* ⚡️ PERFECTLY ALIGNED 2D CONCENTRIC J.A.R.V.I.S. HUD */}
      <div className="w-[290px] h-[290px] md:w-[330px] md:h-[330px] flex items-center justify-center relative">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-[0_0_18px_rgba(255,255,255,0.4)] overflow-visible"
        >
          <defs>
            <radialGradient id="jarvisGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={isSpeaking ? "0.45" : "0.25"} />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* AMBIENT CENTERED RADIAL GLOW */}
          <circle cx="200" cy="200" r="185" fill="url(#jarvisGlow)" />

          {/* 🌊 FLUID UNDULATING OUTER VOICE WAVE RING (r=175) — ACTIVATES ON VOICE */}
          <path
            d={outerWavePath}
            fill="none"
            stroke="#ffffff"
            strokeWidth={isSpeaking ? "2.5" : "1.5"}
            opacity={isSpeaking ? "0.95" : "0.4"}
            className="transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
          />

          {/* 🌊 FLUID UNDULATING SECONDARY INNER WAVE RING (r=145) — ACTIVATES ON VOICE */}
          <path
            d={innerWavePath}
            fill="none"
            stroke="#ffffff"
            strokeWidth={isSpeaking ? "2.0" : "1.0"}
            opacity={isSpeaking ? "0.75" : "0.3"}
            className="transition-all duration-300"
          />

          {/* OUTER DASHED HUD BOUNDARY RING (r=185) */}
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeDasharray="4 14"
            opacity="0.35"
            transform={`rotate(${rotation * 0.3}, 200, 200)`}
          />

          {/* RING 3 — RADIAL HUD TICK RING (r=125, 16 Symmetrical Ticks) */}
          <g transform={`rotate(${-rotation * 0.8}, 200, 200)`}>
            <circle
              cx="200"
              cy="200"
              r="125"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="16 10"
              opacity="0.8"
            />
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + Math.cos(rad) * 112;
              const y1 = 200 + Math.sin(rad) * 112;
              const x2 = 200 + Math.cos(rad) * 122;
              const y2 = 200 + Math.sin(rad) * 122;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.85"
                />
              );
            })}
          </g>

          {/* RING 2 — INNER ACCENT SEGMENTED DISK (r=95 & r=85) */}
          <g transform={`rotate(${rotation * 1.2}, 200, 200)`}>
            <circle
              cx="200"
              cy="200"
              r="95"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="50 25 80 25"
              opacity="0.9"
            />
            <circle
              cx="200"
              cy="200"
              r="85"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeDasharray="3 7"
              opacity="0.55"
            />
          </g>

          {/* RING 1 — INNER SOLID CORE RING (r=65) */}
          <circle
            cx="200"
            cy="200"
            r="65"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            opacity={isSpeaking ? 1 : 0.8}
            className="transition-opacity duration-300"
          />

          {/* CENTRAL SYMMETRICAL DIAMOND NUCLEUS */}
          <g transform={`rotate(${-rotation * 0.4}, 200, 200)`}>
            {/* Outer Diamond Frame */}
            <polygon
              points="200,162 238,200 200,238 162,200"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.9"
            />
            {/* Inner Solid Nucleus Diamond */}
            <polygon
              points="200,175 225,200 200,225 175,200"
              fill="#ffffff"
              opacity={isSpeaking ? 1 : 0.85}
              className={`transition-all duration-300 ${isSpeaking ? "scale-110" : "scale-100"}`}
              style={{ transformOrigin: "200px 200px" }}
            />
            {/* Core Center Dot */}
            <circle cx="200" cy="200" r="4" fill="#000000" />
          </g>

          {/* ORBITING CONSTELLATION NODES (r=155, 8 Symmetrical Nodes) */}
          <g transform={`rotate(${rotation * 0.6}, 200, 200)`}>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const cx = 200 + Math.cos(rad) * 155;
              const cy = 200 + Math.sin(rad) * 155;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="#ffffff"
                  className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* 🗣️ VOICE SPEECH AUDIO INDICATOR — ACTIVATES ONLY WHEN SPEAKING */}
      {isSpeaking && (
        <div className="flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/20 backdrop-blur-md transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono text-white tracking-wider pr-2">
            AI VOICE ACTIVE
          </span>
          <div className="flex items-center gap-1 h-3">
            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-2" />
            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-4" />
            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_150ms] h-2.5" />
            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_250ms] h-3" />
          </div>
        </div>
      )}
    </div>
  );
}

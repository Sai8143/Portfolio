import { useEffect, useRef, useState } from "react";
import {
  Mic,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function VoiceSpectrumCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // UI Controls
  const [streamMode, setStreamMode] = useState("simulate");
  const [amplitude, setAmplitude] = useState(0.85);
  const [pulseSpeed, setPulseSpeed] = useState(1.2);
  const [mistRadiance, setMistRadiance] = useState(0.65);
  const [showMetrics, setShowMetrics] = useState(true);
  const [micError, setMicError] = useState(null);

  // Audio API refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const streamRef = useRef(null);

  // Internal telemetry
  const [dbLevel, setDbLevel] = useState(0);
  const [currentFreq, setCurrentFreq] = useState(0);
    const stopMic = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (
      audioContextRef.current &&
      audioContextRef.current.state !== "closed"
    ) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    dataArrayRef.current = null;
  };

  const startMic = async () => {
    stopMic();
    setMicError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      streamRef.current = stream;

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      source.connect(analyser);

      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      dataArrayRef.current = dataArray;

      setStreamMode("live");
    } catch (err) {
      console.warn("Microphone access blocked/unsupported:", err);

      setMicError(
        err.name === "NotAllowedError"
          ? "Permission denied. Allow microphone access to enable live voice analysis."
          : "Audio interface error. Check your input devices and connection."
      );

      setStreamMode("simulate");
    }
  };

  const handleModeChange = async (mode) => {
    if (mode === "live") {
      await startMic();
    } else {
      stopMic();
      setStreamMode(mode);
    }
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);
    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animFrameId;
    let customTime = 0;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const mistClouds = [];

    for (let i = 0; i < 6; i++) {
      mistClouds.push({
        x: 0,
        y: 0,
        radius: 120 + Math.random() * 80,
        angle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.003,
        alpha: 0.05 + Math.random() * 0.08,
        pulseSpeed: 0.01 + Math.random() * 0.01,
      });
    }

    const maxParticles = 60;

    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      const centerX = w / 2;
      const centerY = h / 2 - 25;
      const baseRadius = 60;

      customTime += 0.015 * pulseSpeed;

      const totalBins = 128;
      const frequencies = new Uint8Array(totalBins);
            if (
        streamMode === "live" &&
        analyserRef.current &&
        dataArrayRef.current
      ) {
        analyserRef.current.getByteFrequencyData(
          dataArrayRef.current
        );

        for (let i = 0; i < totalBins; i++) {
          const index = Math.floor(
            (i / totalBins) * dataArrayRef.current.length
          );

          frequencies[i] = dataArrayRef.current[index];
        }
      } else if (streamMode === "simulate") {
        for (let i = 0; i < totalBins; i++) {
          let value = 0;

          if (i < 20) {
            value =
              Math.max(
                0,
                Math.sin(customTime * 2.5 + Math.sin(customTime)) *
                  0.5 +
                  0.5
              ) * 160;

            value +=
              Math.sin(customTime * 10 + i * 0.4) * 30;
          } else if (i < 80) {
            const speechRhythm =
              Math.sin(customTime * 4.8) *
              Math.cos(customTime * 1.5) *
              Math.sin(customTime * 7.2);

            value =
              (0.35 +
                0.65 * Math.max(0, speechRhythm)) *
              120;

            value +=
              Math.sin(customTime * 18 + i * 0.25) * 35;
          } else {
            const sibilance =
              Math.sin(customTime * 35 + i) *
              Math.cos(customTime * 12);

            value =
              (0.2 +
                0.8 * Math.max(0, sibilance)) *
              65;
          }

          frequencies[i] = Math.max(
            10,
            value * amplitude
          );
        }
      } else {
        for (let i = 0; i < totalBins; i++) {
          frequencies[i] =
            (15 +
              Math.sin(customTime * 3 + i * 0.1) * 6) *
            amplitude;
        }
      }

      let sum = 0;
      let peak = 0;

      for (let i = 0; i < totalBins; i++) {
        sum += frequencies[i];

        if (frequencies[i] > peak) {
          peak = frequencies[i];
        }
      }

      const avg = sum / totalBins;

      setDbLevel(Math.round(avg / 2.55));
      setCurrentFreq(
        Math.round(30 + peak * 18.5)
      );
            ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      if (mistRadiance > 0.05) {
        const glowRadius =
          baseRadius + avg * 0.45 * amplitude;

        const radialBacklight =
          ctx.createRadialGradient(
            centerX,
            centerY,
            glowRadius * 0.5,
            centerX,
            centerY,
            glowRadius * 3.5
          );

        radialBacklight.addColorStop(
          0,
          `rgba(255,255,255,${
            0.12 * mistRadiance
          })`
        );

        radialBacklight.addColorStop(
          0.35,
          `rgba(255,255,255,${
            0.04 * mistRadiance
          })`
        );

        radialBacklight.addColorStop(
          0.8,
          `rgba(120,120,120,${
            0.01 * mistRadiance
          })`
        );

        radialBacklight.addColorStop(
          1,
          "rgba(0,0,0,0)"
        );

        ctx.fillStyle = radialBacklight;
        ctx.fillRect(0, 0, w, h);

        mistClouds.forEach((cloud, index) => {
          cloud.angle += cloud.speed;

          const bounceFactor =
            Math.sin(customTime * 0.8 + index) * 5;

          const px =
            centerX +
            Math.cos(cloud.angle) *
              (15 + bounceFactor);

          const py =
            centerY +
            Math.sin(cloud.angle) *
              (15 + bounceFactor);

          const radiusMultiplier =
            1 +
            Math.sin(
              customTime * cloud.pulseSpeed
            ) *
              0.15;

          const mistGlow =
            ctx.createRadialGradient(
              px,
              py,
              1,
              px,
              py,
              cloud.radius * radiusMultiplier
            );

          mistGlow.addColorStop(
            0,
            `rgba(255,255,255,${
              cloud.alpha * mistRadiance
            })`
          );

          mistGlow.addColorStop(
            0.5,
            `rgba(160,160,160,${
              cloud.alpha *
              0.4 *
              mistRadiance
            })`
          );

          mistGlow.addColorStop(
            1,
            "rgba(0,0,0,0)"
          );

          ctx.fillStyle = mistGlow;

          ctx.beginPath();
          ctx.arc(
            px,
            py,
            cloud.radius * radiusMultiplier,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      }
            const pointsCount = 180;

      const getLineCoords = (
        angle,
        radiusOffset
      ) => {
        const index =
          Math.floor(
            (angle / (Math.PI * 2)) * totalBins
          ) % totalBins;

        const val = frequencies[index] || 0;

        const r =
          baseRadius +
          val * 0.38 * amplitude +
          radiusOffset;

        return {
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
          rValue: r,
        };
      };

      const drawWavePath = (
        radiusOffset,
        noiseMult
      ) => {
        ctx.beginPath();

        for (
          let i = 0;
          i <= pointsCount;
          i++
        ) {
          const angle =
            (i / pointsCount) *
            Math.PI *
            2;

          const offsetMod =
            Math.sin(
              customTime * 4 +
                i * 0.3
            ) * noiseMod;

          const coords = getLineCoords(
            angle,
            radiusOffset + offsetMod
          );

          if (i === 0) {
            ctx.moveTo(
              coords.x,
              coords.y
            );
          } else {
            const prevAngle =
              ((i - 1) /
                pointsCount) *
              Math.PI *
              2;

            const prevCoords =
              getLineCoords(
                prevAngle,
                radiusOffset +
                  Math.sin(
                    customTime * 4 +
                      (i - 1) * 0.3
                  ) *
                    noiseMod
              );

            const midX =
              (prevCoords.x +
                coords.x) /
              2;

            const midY =
              (prevCoords.y +
                coords.y) /
              2;

            ctx.quadraticCurveTo(
              prevCoords.x,
              prevCoords.y,
              midX,
              midY
            );
          }
        }

        ctx.closePath();
      };

      const noiseMod =
        streamMode !== "standby"
          ? 2.2
          : 0.5;
                ctx.strokeStyle =
        "rgba(255,255,255,0.05)";
      ctx.lineWidth = 14;

      drawWavePath(4, 1.5);
      ctx.stroke();

      ctx.shadowBlur = 15;
      ctx.shadowColor =
        "rgba(255,255,255,0.25)";

      ctx.strokeStyle =
        "rgba(255,255,255,0.18)";
      ctx.lineWidth = 4;

      drawWavePath(1, 1.0);
      ctx.stroke();

      ctx.shadowBlur = 0;

      ctx.strokeStyle =
        "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1.75;

      drawWavePath(0, 0);
      ctx.stroke();

      ctx.strokeStyle =
        "rgba(255,255,255,0.28)";
      ctx.lineWidth = 1;

      ctx.setLineDash([2, 5]);

      drawWavePath(-15, -0.6);
      ctx.stroke();

      ctx.setLineDash([]);
            ctx.beginPath();

      for (let i = 0; i < 90; i++) {
        const angle =
          (i / 90) *
          Math.PI *
          2;

        const startRad =
          getLineCoords(
            angle,
            12
          ).rValue;

        const endRad =
          startRad +
          4 +
          (frequencies[
            i % totalBins
          ] || 0) *
            0.06;

        const x1 =
          centerX +
          Math.cos(angle) *
            startRad;

        const y1 =
          centerY +
          Math.sin(angle) *
            startRad;

        const x2 =
          centerX +
          Math.cos(angle) *
            endRad;

        const y2 =
          centerY +
          Math.sin(angle) *
            endRad;

        ctx.strokeStyle = `rgba(
          255,
          255,
          255,
          ${
            0.12 +
            (endRad - startRad) *
              0.08
          }
        )`;

        ctx.lineWidth = 1;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }

      ctx.stroke();

      ctx.beginPath();

      ctx.arc(
        centerX,
        centerY,
        baseRadius - 8,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#000000";
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle =
        "rgba(255,255,255,0.15)";
      ctx.stroke();

      ctx.fillStyle =
        "rgba(255,255,255,0.9)";

      ctx.font =
        "600 9px sans-serif";

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        streamMode === "live"
          ? "VOICE"
          : "SYNTH",
        centerX,
        centerY - 6
      );

      ctx.fillStyle =
        "rgba(160,160,160,0.5)";

      ctx.font =
        "500 7px monospace";

      ctx.fillText(
        streamMode === "standby"
          ? "STDBY"
          : "1.00x",
        centerX,
        centerY + 6
      );
            if (
        particles.length < maxParticles &&
        Math.random() < 0.25
      ) {
        const pAngle =
          Math.random() *
          Math.PI *
          2;

        const startRadius =
          getLineCoords(
            pAngle,
            0
          ).rValue;

        particles.push({
          x:
            centerX +
            Math.cos(pAngle) *
              startRadius,

          y:
            centerY +
            Math.sin(pAngle) *
              startRadius,

          angle:
            pAngle +
            (Math.random() - 0.5) *
              0.4,

          speed:
            0.6 +
            Math.random() * 1.4,

          size:
            1 +
            Math.random() * 2,

          alpha:
            0.6 +
            Math.random() * 0.4,

          life: 0,

          maxLife:
            60 +
            Math.random() * 80,

          decay:
            0.005 +
            Math.random() * 0.015,

          color:
            Math.random() > 0.45
              ? "#ffffff"
              : "#cccccc",
        });
      }

      particles.forEach(
        (p, index) => {
          p.life++;

          p.angle += 0.005;

          p.x +=
            Math.cos(p.angle) *
            p.speed;

          p.y +=
            Math.sin(p.angle) *
            p.speed;

          p.alpha -= p.decay;

          ctx.fillStyle = p.color;

          ctx.globalAlpha =
            Math.max(0, p.alpha);

          ctx.beginPath();

          ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
          );

          ctx.fill();

          ctx.fillStyle =
            "rgba(255,255,255,0.1)";

          ctx.beginPath();

          ctx.arc(
            p.x -
              Math.cos(p.angle) * 3,
            p.y -
              Math.sin(p.angle) * 3,
            p.size * 1.5,
            0,
            Math.PI * 2
          );

          ctx.fill();

          if (
            p.alpha <= 0 ||
            p.life >= p.maxLife
          ) {
            particles.splice(
              index,
              1
            );
          }
        }
      );

      ctx.globalAlpha = 1;
            const mirrorY = h - 60;
      const mirrorHeight = 50;

      ctx.save();

      ctx.translate(
        0,
        mirrorY * 2
      );

      ctx.scale(1, -0.45);

      ctx.beginPath();

      ctx.rect(
        0,
        mirrorY,
        w,
        mirrorHeight * 2.5
      );

      ctx.clip();

      drawWavePath(0, 0);

      ctx.strokeStyle =
        "rgba(255,255,255,0.15)";

      ctx.lineWidth = 1;

      ctx.stroke();

      ctx.beginPath();

      for (
        let i = 0;
        i < 90;
        i += 2
      ) {
        const angle =
          (i / 90) *
          Math.PI *
          2;

        const startRad =
          getLineCoords(
            angle,
            12
          ).rValue;

        const endRad =
          startRad +
          4 +
          (frequencies[
            i % totalBins
          ] || 0) *
            0.06;

        const x1 =
          centerX +
          Math.cos(angle) *
            startRad;

        const y1 =
          centerY +
          Math.sin(angle) *
            startRad;

        const x2 =
          centerX +
          Math.cos(angle) *
            endRad;

        const y2 =
          centerY +
          Math.sin(angle) *
            endRad;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }

      ctx.strokeStyle =
        "rgba(255,255,255,0.05)";

      ctx.stroke();

      ctx.restore();
            const mirrorOverlay =
        ctx.createLinearGradient(
          0,
          mirrorY - 10,
          0,
          h
        );

      mirrorOverlay.addColorStop(
        0,
        "rgba(0,0,0,0.75)"
      );

      mirrorOverlay.addColorStop(
        0.2,
        "rgba(0,0,0,0.88)"
      );

      mirrorOverlay.addColorStop(
        0.5,
        "rgba(0,0,0,0.95)"
      );

      mirrorOverlay.addColorStop(
        1,
        "rgba(0,0,0,1)"
      );

      ctx.fillStyle =
        mirrorOverlay;

      ctx.fillRect(
        0,
        mirrorY - 15,
        w,
        h - mirrorY + 15
      );

      ctx.strokeStyle =
        "rgba(255,255,255,0.08)";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.moveTo(
        w * 0.15,
        mirrorY
      );

      ctx.lineTo(
        w * 0.85,
        mirrorY
      );

      ctx.stroke();
            animFrameId =
        requestAnimationFrame(
          render
        );
    };

    render();

    return () => {
      cancelAnimationFrame(
        animFrameId
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, [
    streamMode,
    amplitude,
    pulseSpeed,
    mistRadiance,
  ]);
  return (
  <div className="flex flex-col h-full bg-black/95 text-white select-none">

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">

      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center gap-1.5 leading-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Core Auditory Array // Node_v6
        </span>

        <span className="text-sm font-bold text-slate-200 mt-1 font-sans">
          Neural Voice Synthesis Waveform
        </span>
      </div>

      <button
        onClick={() =>
          setShowMetrics((prev) => !prev)
        }
        className="text-slate-500 hover:text-white transition-colors p-1.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/5 cursor-pointer"
      >
        {showMetrics ? (
          <Eye className="w-3.5 h-3.5" />
        ) : (
          <EyeOff className="w-3.5 h-3.5" />
        )}
      </button>
    </div>

    {/* Canvas Container */}

    <div
      ref={containerRef}
      className="flex-1 min-h-[220px] max-h-[300px] border border-white/5 rounded-xl bg-black relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />

      {showMetrics && (
        <div className="absolute top-3 inset-x-3 pointer-events-none flex justify-between text-[8px] font-mono font-bold tracking-widest text-[#B4BBE2]/40 select-none uppercase">

          <div className="flex flex-col gap-1 text-left">
            <span>
              SYS_REF : WAVE_MONO_8K
            </span>

            <span>
              MASTER_AMP :
              {Math.round(
                amplitude * 100
              )}
              %
            </span>

            <span>
              GLOW_STAT : ACTIVE
            </span>
          </div>

          <div className="flex flex-col gap-1 text-right">

            <span
              className={
                streamMode === "live"
                  ? "text-white animate-pulse"
                  : ""
              }
            >
              SOURCE :
              {streamMode === "live"
                ? "MIC_PCM"
                : streamMode ===
                  "simulate"
                ? "PROC_SYNTH"
                : "STDBY_HUM"}
            </span>

            <span>
              PEAK_FREQ :
              {currentFreq}
              Hz
            </span>

            <span>
              ENERGY :
              {dbLevel}
              %
            </span>

          </div>
        </div>
      )}
            <div className="absolute bottom-5 inset-x-4 pointer-events-none flex justify-between items-center px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 z-20">

        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />

          <span className="text-[10px] font-mono tracking-wider text-slate-300">

            {streamMode === "live"
              ? "PARSING REAL TIME DECIBEL INPUT..."
              : streamMode ===
                "simulate"
              ? "STUDIO FREQUENCY SYNTHESIZER SIMULATING..."
              : "AMB_SPACE_HUM_TRACE"}

          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
          <span>VOLT_G1</span>
          <span>•</span>
          <span>8K_RES_COMP</span>
        </div>

      </div>
    </div>

    {micError && (
      <div className="mt-3.5 flex items-start gap-2 p-3.5 rounded-lg bg-red-950/45 border border-red-900/35 text-red-100/90 text-[11px] leading-relaxed text-left">

        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />

        <div className="flex-1 font-sans">

          <span className="font-bold block mb-0.5">
            Microphone Lockout
          </span>

          {micError}

        </div>
      </div>
    )}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

      <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-lg">

        <button
          onClick={() =>
            handleModeChange("simulate")
          }
          className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer transition-all ${
            streamMode === "simulate"
              ? "bg-white text-black font-extrabold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Studio Simulator
        </button>

        <button
          onClick={() =>
            handleModeChange("live")
          }
          className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
            streamMode === "live"
              ? "bg-white text-black font-extrabold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Mic className="w-3 h-3" />
          Live Microphone
        </button>

        <button
          onClick={() =>
            handleModeChange("standby")
          }
          className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer transition-all ${
            streamMode === "standby"
              ? "bg-white text-black font-extrabold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Standby
        </button>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-x-5 gap-y-2.5 text-[10px] font-mono leading-none text-slate-400">

        {/* Gain */}

        <div className="flex items-center gap-2 max-w-[125px] flex-1">
          <span className="text-slate-500 uppercase shrink-0">
            W_Gain:
          </span>

          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.05"
            value={amplitude}
            onChange={(e) =>
              setAmplitude(
                parseFloat(
                  e.target.value
                )
              )
            }
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Pitch */}

        <div className="flex items-center gap-2 max-w-[125px] flex-1">
          <span className="text-slate-500 uppercase shrink-0">
            Pitch:
          </span>

          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={pulseSpeed}
            onChange={(e) =>
              setPulseSpeed(
                parseFloat(
                  e.target.value
                )
              )
            }
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Glow */}

        <div className="flex items-center gap-2 max-w-[125px] flex-1">
          <span className="text-slate-500 uppercase shrink-0">
            Glow:
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={mistRadiance}
            onChange={(e) =>
              setMistRadiance(
                parseFloat(
                  e.target.value
                )
              )
            }
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

      </div>
    </div>

  </div>
);
}

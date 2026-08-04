
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BlackHoleScene from "./BlackHoleScene";
import LoadingMessages from "./LoadingMessages";

// Web Audio API High-Fidelity Interstellar Sci-Fi Black Hole Synthesizer
function playSciFiLoaderSound(progress, audioCtxRef, oscRef, gainRef, pannerRef, filterRef) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    const ctx = audioCtxRef.current;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    // Initialize audio nodes as soon as context is active/running
    if (!oscRef.current && (ctx.state === "running" || ctx.state === "interactive")) {
      // 1. Deep Sub-Bass Singularity Drone (Pure Sine, no harsh buzz)
      const subOsc = ctx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

      // 2. Sci-Fi Harmonic Crystal Resonator (Glassy Metallic Shimmer)
      const harmonicOsc1 = ctx.createOscillator();
      harmonicOsc1.type = "sine";
      harmonicOsc1.frequency.setValueAtTime(110, ctx.currentTime);

      const harmonicOsc2 = ctx.createOscillator();
      harmonicOsc2.type = "sine";
      harmonicOsc2.frequency.setValueAtTime(220, ctx.currentTime);

      // 3. Orbital LFO Pitch Modulator (Creates cosmic rotation sweep)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.4, ctx.currentTime); // 0.4 Hz slow rotation
      lfoGain.gain.setValueAtTime(8, ctx.currentTime); // Pitch fluctuation depth
      lfo.connect(harmonicOsc1.frequency);
      lfo.connect(harmonicOsc2.frequency);
      lfo.start();

      // 4. High-Resonance Bandpass Filter (Sweeping Sci-Fi Doppler Effect)
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime); // Sharp, glassy resonance

      // 5. 3D Stereo Orbital Panner
      let panner = null;
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(-0.6, ctx.currentTime);
      }

      // Master Gain Control (Instant smooth ramp)
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.3);

      subOsc.connect(gain);
      harmonicOsc1.connect(filter);
      harmonicOsc2.connect(filter);

      if (panner) {
        filter.connect(panner);
        panner.connect(gain);
      } else {
        filter.connect(gain);
      }
      gain.connect(ctx.destination);

      subOsc.start();
      harmonicOsc1.start();
      harmonicOsc2.start();

      oscRef.current = { subOsc, harmonicOsc1, harmonicOsc2, lfo };
      gainRef.current = gain;
      pannerRef.current = panner;
      filterRef.current = filter;
    }

    if (oscRef.current && gainRef.current && ctx.state === "running") {
      const time = ctx.currentTime;
      const progressRatio = progress / 100;

      // Frequency elevates dynamically as black hole rotation speeds up
      const subFreq = 55 + progressRatio * 45; // 55Hz -> 100Hz
      const h1Freq = 110 + progressRatio * 180; // 110Hz -> 290Hz
      const h2Freq = 220 + progressRatio * 360; // 220Hz -> 580Hz

      oscRef.current.subOsc.frequency.setTargetAtTime(subFreq, time, 0.1);
      oscRef.current.harmonicOsc1.frequency.setTargetAtTime(h1Freq, time, 0.1);
      oscRef.current.harmonicOsc2.frequency.setTargetAtTime(h2Freq, time, 0.1);

      // Resonant filter sweeps upwards creating futuristic energy accumulation
      if (filterRef.current) {
        const filterFreq = 320 + progressRatio * 1600; // 320Hz -> 1920Hz
        filterRef.current.frequency.setTargetAtTime(filterFreq, time, 0.1);
      }

      // Continuous Figure-8 Stereo Orbital Panning
      if (pannerRef.current) {
        const panVal = Math.sin(time * (1.2 + progressRatio * 2.0)) * 0.85;
        pannerRef.current.pan.setTargetAtTime(panVal, time, 0.05);
      }

      // Smooth Orbital Pulse Gain
      const pulseVolume = 0.30 + Math.sin(time * 3.0) * 0.04;
      gainRef.current.gain.setTargetAtTime(pulseVolume, time, 0.05);

      // 100% Interstellar Warp Resolution (Sub-Boom + High Shimmer Discharge)
      if (progress >= 98 && !audioCtxRef.current.chimePlayed) {
        audioCtxRef.current.chimePlayed = true;

        // Sub Impact Boom
        const subBoom = ctx.createOscillator();
        const boomGain = ctx.createGain();
        subBoom.type = "sine";
        subBoom.frequency.setValueAtTime(180, time);
        subBoom.frequency.exponentialRampToValueAtTime(35, time + 1.2);

        boomGain.gain.setValueAtTime(0.50, time);
        boomGain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

        subBoom.connect(boomGain);
        boomGain.connect(ctx.destination);
        subBoom.start();
        subBoom.stop(time + 1.3);

        // High Shimmer Sweep
        const shimmer = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmer.type = "sine";
        shimmer.frequency.setValueAtTime(1200, time);
        shimmer.frequency.exponentialRampToValueAtTime(2400, time + 0.4);
        shimmer.frequency.exponentialRampToValueAtTime(100, time + 1.0);

        shimmerGain.gain.setValueAtTime(0.20, time);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, time + 1.0);

        shimmer.connect(shimmerGain);
        shimmerGain.connect(ctx.destination);
        shimmer.start();
        shimmer.stop(time + 1.1);

        // Fade main synth
        gainRef.current.gain.linearRampToValueAtTime(0.001, time + 0.9);
      }
    }
  } catch {
    // Audio context restriction safety
  }
}

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  const [audioSuspended, setAudioSuspended] = useState(true);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const pannerRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWindowHeight(window.innerHeight);

    // Eagerly pre-instantiate AudioContext so it exists for instant user touch unlock
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext && !audioCtxRef.current) {
      try {
        audioCtxRef.current = new AudioContext();
      } catch (e) {}
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    const unlockAudio = () => {
      try {
        if (!audioCtxRef.current && AudioContext) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().then(() => {
            setAudioSuspended(false);
          }).catch(() => {});
        } else if (audioCtxRef.current && audioCtxRef.current.state === "running") {
          setAudioSuspended(false);
        }
      } catch (e) {}
    };

    // Attempt instant activation
    unlockAudio();

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
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
      playSciFiLoaderSound(pct, audioCtxRef, oscRef, gainRef, pannerRef, filterRef);

      if (elapsed < duration) {
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(100);

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

  /*
    0 - 40
    Normal text

    40 - 60
    Tilt

    60 - 90
    Spiral

    90 - 100
    Absorb
  */

  const factor = Math.max(
    0,
    Math.min(
      1,
      (progress - 40) / 60
    )
  );

  const targetY =
    windowHeight * 0.38;

  const subtitleTargetY =
    windowHeight * 0.3;

  const nameLetters =
    Array.from(
      "SAI GANESH" 
    );

  const subtitleLetters =
    Array.from(
      "Code</> Create Innovate"
    );

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            filter:
              "blur(10px)",
            transition: {
              duration: 1.2,
            },
          }}
          className="
            fixed
            inset-0
            z-[99999]
            bg-black
            overflow-hidden
            select-none
          "
        >
          <div className="absolute inset-0">
            <BlackHoleScene />
          </div>

          <div
            className="
              absolute
              rounded-full
              pointer-events-none

              w-[75vw]
              h-[75vw]

              max-w-[1200px]
              max-h-[1200px]

              bg-white/[0.015]

              blur-[140px]
            "
            style={{
              left: "50%",
              top: "50%",
              transform:
                "translate(-50%, -50%)",
            }}
          />

          {/* TITLE AREA */}
<div
  className="
    absolute
    top-[8vh]

    left-0
    right-0

    z-20

    flex
    flex-col

    items-center
    text-center

    px-4
  "
>
  {/* INITIALIZING LABEL */}
  <motion.p
    animate={{
      opacity:
        progress < 40
          ? 0.55
          : Math.max(
              0,
              0.55 - factor
            ),
    }}
    className="
  text-white text-[10px] md:text-xs uppercase tracking-[9px] font-mono mb-6 display: inline-block;
"
  >
  </motion.p>

  {/* NAME LETTERS */}
  <div
    className="
      flex
      justify-center

      text-white

      text-5xl
      md:text-7xl

      font-black

      tracking-[-0.05em]
    "
  >
    {nameLetters.map(
      (char, index) => {
        const tiltPhase =
          Math.max(
            0,
            Math.min(
              1,
              (progress - 40) /
                20
            )
          );

        const spiralPhase =
          Math.max(
            0,
            Math.min(
              1,
              (progress - 60) /
                30
            )
          );

        const absorbPhase =
          Math.max(
            0,
            Math.min(
              1,
              (progress - 90) /
                10
            )
          );

        const angle =
          index * 0.45 -
          spiralPhase *
            Math.PI *
            6;

        const radius =
          220 *
          Math.pow(
            1 -
              spiralPhase,
            3
          );

        const x =
          progress >= 60
            ? Math.cos(
                angle
              ) * radius
            : 0;

        const y =
          progress >= 60
            ? targetY *
                spiralPhase +
              Math.sin(
                angle
              ) *
                radius *
                0.45
            : 0;

        return (
          <motion.span
            key={index}
            style={{
              display:
                "inline-block",
              whiteSpace:
                "pre",
            }}
            animate={{
              x,
              y,

              rotate:
                tiltPhase *
                  -35 +
                spiralPhase *
                  -720,

              skewX:
                tiltPhase *
                18,

              scale:
                1 -
                absorbPhase *
                  0.98,

              opacity:
                1 -
                absorbPhase,

              filter:
  absorbPhase > 0.6
    ? `brightness(2)
       blur(${absorbPhase * 12}px)`
    : `blur(${absorbPhase * 10}px)`,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {char}
          </motion.span>
        );
      }
    )}
  </div>

  {/* SUBTITLE */}
  <div
    className="
      flex
      flex-wrap

      justify-center

      mt-5

      max-w-xl

      text-xs
      md:text-sm

      uppercase

      tracking-[7px]

      text-neutral-300
    "
  >
    {subtitleLetters.map(
      (char, index) => {
        const tiltPhase =
          Math.max(
            0,
            Math.min(
              1,
              (progress - 40) /
                20
            )
          );

        const spiralPhase =
          Math.max(
            0,
            Math.min(
              1,
              (progress - 60) /
                30
            )
          );

        const absorbPhase =
          Math.max(
            0,
            Math.min(
              1,
              (progress - 90) /
                10
            )
          );

        const angle =
          index * 0.18 -
          spiralPhase *
            Math.PI *
            8;

        const radius =
          260 *
          Math.pow(
            1 -
              spiralPhase,
            1.8
          );

        const x =
          progress >= 60
            ? Math.cos(
                angle
              ) * radius
            : 0;

        const y =
          progress >= 60
            ? subtitleTargetY *
                spiralPhase +
              Math.sin(
                angle
              ) *
                radius *
                0.5
            : 0;

        return (
          <motion.span
            key={index}
            style={{
              display:
                "inline-block",
              whiteSpace:
                "pre",
            }}
            animate={{
              x,
              y,

              rotate:
                tiltPhase *
                  -25 +
                spiralPhase *
                  -540,

              skewX:
                tiltPhase *
                12,

              scale:
                1 -
                absorbPhase *
                  0.98,

              opacity:
                0.7 -
                absorbPhase *
                  0.7,

              filter: `blur(${
                absorbPhase *
                8
              }px)`,
              scaleX:
  1 +
  spiralPhase * 2.5,

scaleY:
  1 -
  spiralPhase * 0.4,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {char}
          </motion.span>
        );
      }
    )}
  </div>
</div>

{/* LOADING CARD AREA */}
<div
  className="
    absolute
    bottom-[8vh]

    left-0
    right-0

    z-20

    flex
    justify-center

    px-4
  "
>

          {/* LOADING CARD AREA */}
          <div
            className="
              absolute
              bottom-[8vh]

              left-0
              right-0

              z-20

              flex
              justify-center

              px-4
            "
          ></div>
                      <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
                delay: 0.3,
              }}
              className="
                w-full
                max-w-md

                rounded-[30px]

                border
                border-white/10

                bg-black/35

                backdrop-blur-xl

                shadow-[0_0_60px_rgba(255,255,255,0.05)]

                px-8
                py-6
              "
            >
              {/* LOADING MESSAGE */}
              <LoadingMessages
                progress={progress}
              />

              {/* PROGRESS BAR */}
              <div
                className="
                  relative

                  mt-5

                  h-[2px]

                  overflow-hidden

                  rounded-full

                  bg-white/10
                "
              >
                <motion.div
                  className="
                    absolute
                    left-0
                    top-0

                    h-full

                    bg-gradient-to-r
                    from-neutral-500
                    via-white
                    to-neutral-500
                  "
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    ease: "linear",
                  }}
                />
              </div>

              {/* STATUS */}
              <div
                className="
                  mt-4

                  flex
                  items-center
                  justify-between

                  text-[10px]

                  uppercase

                  tracking-[2px]

                  font-mono
                "
              >
                <span
                  className="
                    text-neutral-500
                  "
                >
                  System Acquisition
                </span>

                <span
                  className="
                    text-white
                    font-semibold
                  "
                >
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}


// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import BlackHoleScene from "./BlackHoleScene";
// import LoadingMessages from "./LoadingMessages";

// export default function Loader({ onComplete }) {
//   const [progress, setProgress] = useState(0);
//   const [isDone, setIsDone] = useState(false);
//   const [windowHeight, setWindowHeight] =
//     useState(800);

//   useEffect(() => {
//     if (typeof window === "undefined")
//       return;

//     setWindowHeight(
//       window.innerHeight
//     );

//     const handleResize = () => {
//       setWindowHeight(
//         window.innerHeight
//       );
//     };

//     window.addEventListener(
//       "resize",
//       handleResize
//     );

//     return () =>
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );
//   }, []);

//   useEffect(() => {
//     const startTime =
//       performance.now();

//     const duration = 15000;

//     let frame;

//     const animate = () => {
//       const elapsed =
//         performance.now() -
//         startTime;

//       const pct = Math.min(
//         100,
//         Math.floor(
//           (elapsed /
//             duration) *
//             100
//         )
//       );

//       setProgress(pct);

//       if (
//         elapsed < duration
//       ) {
//         frame =
//           requestAnimationFrame(
//             animate
//           );
//       } else {
//         setProgress(100);

//         setTimeout(() => {
//           setIsDone(
//             true
//           );

//           if (
//             onComplete
//           ) {
//             onComplete();
//           }
//         }, 1200);
//       }
//     };

//     frame =
//       requestAnimationFrame(
//         animate
//       );

//     return () =>
//       cancelAnimationFrame(
//         frame
//       );
//   }, [onComplete]);

//   const factor = Math.max(
//     0,
//     Math.min(
//       1,
//       (progress - 40) / 60
//     )
//   );

//   const targetY =
//     windowHeight * 0.38;

//   const subtitleTargetY =
//     windowHeight * 0.30;

//   const nameLetters =
//     Array.from(
//       "SAI GANESH"
//     );

//   const subtitleLetters =
//     Array.from(
//       "Code</> Create Innovate"
//     );

//   return (
//     <AnimatePresence>
//       {!isDone && (
//         <motion.div
//           initial={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//             filter:
//               "blur(10px)",
//             transition: {
//               duration: 1.2,
//             },
//           }}
//           className="
//             fixed
//             inset-0
//             z-[99999]
//             bg-black
//             overflow-hidden
//             select-none
//           "
//         >
//           {/* BLACK HOLE */}
//           <div
//             className="
//               absolute
//               inset-0
//             "
//           >
//             <BlackHoleScene />
//           </div>

//           {/* AMBIENT GLOW */}
//           <div
//             className="
//               absolute

//               rounded-full

//               pointer-events-none

//               w-[75vw]
//               h-[75vw]

//               max-w-[1200px]
//               max-h-[1200px]

//               bg-white/[0.015]

//               blur-[140px]
//             "
//             style={{
//               left: "50%",
//               top: "50%",
//               transform:
//                 "translate(-50%, -50%)",
//             }}
//           />

//           {/* TITLE AREA */}
//           <div
//             className="
//               absolute

//               top-[8vh]

//               left-0
//               right-0

//               z-20

//               flex
//               flex-col

//               items-center
//               text-center

//               px-4
//             "
//           ></div>
//           import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import BlackHoleScene from "./BlackHoleScene";
// import LoadingMessages from "./LoadingMessages";

// export default function Loader({ onComplete }) {
//   const [progress, setProgress] = useState(0);
//   const [isDone, setIsDone] = useState(false);
//   const [windowHeight, setWindowHeight] =
//     useState(800);

//   useEffect(() => {
//     if (typeof window === "undefined")
//       return;

//     setWindowHeight(
//       window.innerHeight
//     );

//     const handleResize = () => {
//       setWindowHeight(
//         window.innerHeight
//       );
//     };

//     window.addEventListener(
//       "resize",
//       handleResize
//     );

//     return () =>
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );
//   }, []);

//   useEffect(() => {
//     const startTime =
//       performance.now();

//     const duration = 15000;

//     let frame;

//     const animate = () => {
//       const elapsed =
//         performance.now() -
//         startTime;

//       const pct = Math.min(
//         100,
//         Math.floor(
//           (elapsed /
//             duration) *
//             100
//         )
//       );

//       setProgress(pct);

//       if (
//         elapsed < duration
//       ) {
//         frame =
//           requestAnimationFrame(
//             animate
//           );
//       } else {
//         setProgress(100);

//         setTimeout(() => {
//           setIsDone(
//             true
//           );

//           if (
//             onComplete
//           ) {
//             onComplete();
//           }
//         }, 1200);
//       }
//     };

//     frame =
//       requestAnimationFrame(
//         animate
//       );

//     return () =>
//       cancelAnimationFrame(
//         frame
//       );
//   }, [onComplete]);

//   const factor = Math.max(
//     0,
//     Math.min(
//       1,
//       (progress - 40) / 60
//     )
//   );

//   const targetY =
//     windowHeight * 0.38;

//   const subtitleTargetY =
//     windowHeight * 0.30;

//   const nameLetters =
//     Array.from(
//       "SAI GANESH"
//     );

//   const subtitleLetters =
//     Array.from(
//       "Code</> Create Innovate"
//     );

//   return (
//     <AnimatePresence>
//       {!isDone && (
//         <motion.div
//           initial={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//             filter:
//               "blur(10px)",
//             transition: {
//               duration: 1.2,
//             },
//           }}
//           className="
//             fixed
//             inset-0
//             z-[99999]
//             bg-black
//             overflow-hidden
//             select-none
//           "
//         >
//           {/* BLACK HOLE */}
//           <div
//             className="
//               absolute
//               inset-0
//             "
//           >
//             <BlackHoleScene />
//           </div>

//           {/* AMBIENT GLOW */}
//           <div
//             className="
//               absolute

//               rounded-full

//               pointer-events-none

//               w-[75vw]
//               h-[75vw]

//               max-w-[1200px]
//               max-h-[1200px]

//               bg-white/[0.015]

//               blur-[140px]
//             "
//             style={{
//               left: "50%",
//               top: "50%",
//               transform:
//                 "translate(-50%, -50%)",
//             }}
//           />

//           {/* TITLE AREA */}
//           <div
//             className="
//               absolute

//               top-[8vh]

//               left-0
//               right-0

//               z-20

//               flex
//               flex-col

//               items-center
//               text-center

//               px-4
//             "
//           ></div>
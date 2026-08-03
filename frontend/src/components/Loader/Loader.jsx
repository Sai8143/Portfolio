
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BlackHoleScene from "./BlackHoleScene";
import LoadingMessages from "./LoadingMessages";

// Web Audio API High-Volume Cinematic Orbital Sound Synthesizer
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

    if (!oscRef.current && ctx.state === "running") {
      // 1. Triple Harmonic Oscillators (Loud, Rich, Cinematic)
      const osc1 = ctx.createOscillator(); // Fundamental Sine
      const osc2 = ctx.createOscillator(); // Octave Shimmer Triangle
      const osc3 = ctx.createOscillator(); // Sub Sawtooth Drone
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(130, ctx.currentTime);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(260, ctx.currentTime);

      osc3.type = "sawtooth";
      osc3.frequency.setValueAtTime(65, ctx.currentTime);

      // 2. Warm Lowpass Filter (Resonant & Crisp)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);

      // 3. Stereo Orbital Panner
      let panner = null;
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(-0.5, ctx.currentTime);
      }

      // Instant Rich Volume Level (0.3 peak gain starting immediately at 0%)
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);

      if (panner) {
        filter.connect(panner);
        panner.connect(gain);
      } else {
        filter.connect(gain);
      }
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      oscRef.current = { osc1, osc2, osc3 };
      gainRef.current = gain;
      pannerRef.current = panner;
      filterRef.current = filter;
    }

    if (oscRef.current && gainRef.current && ctx.state === "running") {
      const time = ctx.currentTime;
      // Frequency swells smoothly with orbital speed (130Hz -> 280Hz)
      const freq1 = 130 + (progress / 100) * 150;
      const freq2 = 260 + (progress / 100) * 300;
      const freq3 = 65 + (progress / 100) * 75;

      oscRef.current.osc1.frequency.setTargetAtTime(freq1, time, 0.1);
      oscRef.current.osc2.frequency.setTargetAtTime(freq2, time, 0.1);
      oscRef.current.osc3.frequency.setTargetAtTime(freq3, time, 0.1);

      // Filter opens up as black hole accumulates energy (500Hz -> 1600Hz)
      if (filterRef.current) {
        const filterFreq = 500 + (progress / 100) * 1100;
        filterRef.current.frequency.setTargetAtTime(filterFreq, time, 0.1);
      }

      // Orbital Stereo Panning & Breathing Tremolo
      const panSpeed = 1.0 + (progress / 100) * 2.5;
      if (pannerRef.current) {
        const panVal = Math.sin(time * panSpeed) * 0.8;
        pannerRef.current.pan.setTargetAtTime(panVal, time, 0.05);
      }

      // Rhythmic orbital pulse volume (0.28 base gain + 0.06 pulse swell)
      const pulseVolume = 0.28 + Math.sin(time * panSpeed * 2) * 0.06;
      gainRef.current.gain.setTargetAtTime(pulseVolume, time, 0.05);

      // 100% Cinematic Impact Boom (Powerful resolution drop)
      if (progress >= 98 && !audioCtxRef.current.chimePlayed) {
        audioCtxRef.current.chimePlayed = true;

        const subBoom = ctx.createOscillator();
        const boomGain = ctx.createGain();

        subBoom.type = "sine";
        subBoom.frequency.setValueAtTime(220, time);
        subBoom.frequency.exponentialRampToValueAtTime(50, time + 0.9);

        boomGain.gain.setValueAtTime(0.45, time);
        boomGain.gain.exponentialRampToValueAtTime(0.001, time + 1.0);

        subBoom.connect(boomGain);
        boomGain.connect(ctx.destination);

        subBoom.start();
        subBoom.stop(time + 1.1);

        // Fade out main orbital drone
        gainRef.current.gain.linearRampToValueAtTime(0.001, time + 0.8);
      }
    }
  } catch {
    // Ignore audio policy restrictions
  }
}

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const pannerRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    const unlockAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("pointerdown", unlockAudio);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
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
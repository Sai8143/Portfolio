// import { useMemo } from "react";
// import {
//   AnimatePresence,
//   motion,
// } from "framer-motion";

// function LoadingMessages({
//   progress = 0,
// }) {
//   const message = useMemo(() => {
//     if (progress < 20) {
//       return "Loading React Components...";
//     }

//     if (progress < 40) {
//       return "Loading AI Systems...";
//     }

//     if (progress < 60) {
//       return "Initializing Innovation...";
//     }

//     if (progress < 80) {
//       return "Building Experiences...";
//     }

//     if (progress < 90) {
//       return "Synchronizing Technologies...";
//     }

//     return "Launching Portfolio...";
//   }, [progress]);

//   return (
//     <div
//       className="
//       h-10

//       flex
//       items-center
//       justify-center
//     "
//     >
//       <AnimatePresence
//         mode="wait"
//       >
//         <motion.div
//           key={message}
//           initial={{
//             opacity: 0,
//             y: 12,
//             filter:
//               "blur(10px)",
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             filter:
//               "blur(0px)",
//           }}
//           exit={{
//             opacity: 0,
//             y: -12,
//             filter:
//               "blur(10px)",
//           }}
//           transition={{
//             duration: 0.5,
//           }}
//           className="
//           flex
//           items-center
//           gap-3
//         "
//         >
//           <motion.div
//             animate={{
//               opacity: [
//                 0.4,
//                 1,
//                 0.4,
//               ],
//             }}
//             transition={{
//               repeat:
//                 Infinity,
//               duration: 1.2,
//             }}
//             className="
//             w-1.5
//             h-1.5

//             rounded-full

//             bg-white

//             shadow-[0_0_12px_rgba(255,255,255,1)]
//           "
//           />

//           <p
//             className="
//             text-[#cfcfcf]

//             text-xs
//             md:text-sm

//             uppercase

//             tracking-[7px]

//             whitespace-nowrap
//           "
//           >
//             {message}
//           </p>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

// export default LoadingMessages;
import {
  AnimatePresence,
  motion,
} from "framer-motion";

export default function LoadingMessages({
  progress = 0,
}) {
  let message =
    "Establishing Deep Space";

  if (progress >= 10) {
    message =
      "Mapping Stellar Environment";
  }

  if (progress >= 25) {
    message =
      "Generating Space Dust";
  }

  if (progress >= 40) {
    message =
      "Rotating Accretion Disk";
  }

  if (progress >= 55) {
    message =
      "Stabilizing Event Horizon";
  }

  if (progress >= 70) {
    message =
      "Absorbing Technology Matrix";
  }

  if (progress >= 85) {
    message =
      "Synchronizing Quantum Systems";
  }

  if (progress >= 95) {
    message =
      "Preparing Experience";
  }

  if (progress >= 100) {
    message =
      "Launch Complete";
  }

  return (
    <div
      className="
        relative
        h-[22px]
        overflow-hidden
      "
    >
      <AnimatePresence
        mode="wait"
      >
        <motion.div
          key={message}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            text-center
            text-[11px]
            md:text-xs
            uppercase
            tracking-[3px]
            text-neutral-400
            font-mono
          "
        >
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedCursor() {

  const [position, setPosition] =
    useState({
      x: -100,
      y: -100,
    });

  useEffect(() => {

    const move = (e) => {

      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        move
      );

    };

  }, []);

  return (
    <>
      {/* OUTER GLOW */}

      <motion.div
        animate={{
          x: position.x - 40,
          y: position.y - 40,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        className="
        fixed

        top-0
        left-0

        w-20
        h-20

        rounded-full

        bg-white/[0.08]

        blur-xl

        pointer-events-none

        z-[9999]
        "
      />

      {/* MIDDLE RING */}

      <motion.div
        animate={{
          x: position.x - 15,
          y: position.y - 15,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
        className="
        fixed

        top-0
        left-0

        w-8
        h-8

        rounded-full

        border
        border-white/20

        bg-white/[0.02]

        backdrop-blur-sm

        pointer-events-none

        z-[9999]
        "
      />

      {/* CORE */}

      <motion.div
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
        }}
        className="
        fixed

        top-0
        left-0

        w-2
        h-2

        rounded-full

        bg-white

        pointer-events-none

        z-[9999]
        "
      />
    </>
  );
}

export default AnimatedCursor;

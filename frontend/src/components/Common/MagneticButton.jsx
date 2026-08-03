
import { motion } from "framer-motion";
import { useState } from "react";

function MagneticButton({
  children,
  className = "",
}) {

  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  const handleMove = (e) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    setPosition({
      x: x * 0.2,
      y: y * 0.2,
    });

  };

  const reset = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;

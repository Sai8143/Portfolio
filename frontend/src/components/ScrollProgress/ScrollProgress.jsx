
import { motion, useScroll } from "framer-motion";

function ScrollProgress() {

  const { scrollYProgress } =
    useScroll();

  return (

    <motion.div

      style={{
        scaleX: scrollYProgress
      }}

      className="
      fixed

      top-0
      left-0

      h-[3px]
      w-full

      origin-left

      bg-white

      z-[99999]
      "
    />

  );

}

export default ScrollProgress;

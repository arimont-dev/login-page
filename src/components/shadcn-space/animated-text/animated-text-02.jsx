"use client";

import { motion } from "motion/react";

const AnimatedTextGradientMotion = ({title}) => {
  return (
    <>
      <motion.p
        className="text-xl sm:text-2xl font-bold text-start bg-gradient-to-r bg-clip-text text-transparent"
        animate={{
          backgroundImage: [
            "linear-gradient(to right, hsl(206, 20%, 50%), hsl(206, 75%, 50%)",
            "linear-gradient(to right, hsl(206, 75%, 50%), hsl(206, 20%, 50%)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}>
        {title}
      </motion.p>
    </>
  );
};


export default AnimatedTextGradientMotion;

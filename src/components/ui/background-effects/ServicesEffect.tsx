"use client";

import React from "react";
import { motion } from "framer-motion";

export const ServicesEffect = (): React.ReactElement => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="h-full bg-gradient-to-br from-orange-50/90 via-gray-100 to-orange-100 dark:from-gray-900/90 dark:via-gray-800 dark:to-orange-900/90">
        {/* Animated circles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-500/10 dark:bg-orange-500/20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

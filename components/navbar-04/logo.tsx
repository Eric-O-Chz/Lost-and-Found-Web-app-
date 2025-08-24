"use client";

import { Compass } from "lucide-react";
import { motion } from "framer-motion";

export const Logo = () => (
  <a href="#" className="flex flex-row items-center ">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
    >
      <Compass className="!h-10 !w-10 text-cyan-800 mt-5" />
    </motion.div>
    <motion.span
      className="font-extrabold font-serif text-3xl ml-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    > 
      LostLink
    </motion.span>
  </a>
);

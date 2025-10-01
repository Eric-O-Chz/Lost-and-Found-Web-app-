"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/shadcn-io/3d-card";
import { BackgroundPattern } from "./hero-06/background-pattern";
import { motion } from "framer-motion";

export default function ThreeDCardInteractiveDemo() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
          <BackgroundPattern />
          <motion.div
   initial={{ opacity: 0, scale: 0 }}
  whileInView={{ opacity: 1, scale: [0, 1.2, 1] }}
  transition={{ duration: 0.6,delay: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
>
        
    <CardContainer className="inter-var " containerClassName="py-8">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold font-serif text-neutral-600 dark:text-white"
        >
          Lost Something? Find It Here
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
        Report lost items, browse found items, and reunite with what matters.
        We help you track, report, and recover your lost belongings quickly and safely.
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={10}
          className="w-full mt-4"
        >
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-70 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-16">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Report now →
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </motion.div>
        
    </div>
  );
}
"use client"

import { Button } from "@/components/ui/button";
import { MessageSquareWarning, Search, Goal,} from "lucide-react";
import { BackgroundPattern } from "./background-pattern";
import { useRouter } from "next/navigation"
import Link from "next/link";
import { motion } from "framer-motion";

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};


const Hero06 =  () => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.h1 
         initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
         className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Find What’s Lost. Return What’s Found.
        </motion.h1>
        <motion.p className="mt-6 text-[17px] md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}>
          Every item has a story — and a chance to be found. Join our community to help return lost items and find your missing things.
          Whether it’s your phone, ID, or umbrella — we help you post lost items or return found ones. Start searching or reporting now!
        </motion.p>
        
        {/* <div className="mt-12 flex items-center justify-center gap-4">
          <div className="grid grid-cols-2 gap-2">
          <Button size="lg" className="rounded-full text-base cursor-pointer" onClick={() => router.push("/report/report-lost")}>
            Report Lost <MessageSquareWarning className="!h-5 !w-5" />
          </Button>
          <Button size="lg" className="rounded-full text-base cursor-pointer" onClick={() => router.push("/report/report-found")}>
            Mark as Found <Goal className="!h-5 !w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none col-span-2"
          >
           <Search className="!h-5 !w-5" /><Link href={"/blog"} >Recent Found Items </Link>
          </Button>
  
          </div>
        </div> */}
   <div className="mt-12 flex items-center justify-center gap-4 ">
  <div className="grid grid-cols-2 gap-2 ">
    {[
      {
        text: "Report Lost",
        icon: <MessageSquareWarning className="!h-5 !w-5" />,
        action: () => router.push("/report/report-lost"),
        colSpan: "col-span-1",
        variant: "default",
      },
      {
        text: "Mark as Found",
        icon: <Goal className="!h-5 !w-5" />,
        action: () => router.push("/report/report-found"),
        colSpan: "col-span-1",
        variant: "default",
      },
      {
        text: "Recent Found Items",
        icon: <Search className="!h-5 !w-5" />,
        action: () => router.push("/blog"),
        colSpan: "col-span-2",
        variant: "ghost",
      },
    ].map((btn, i) => (
      <motion.div
        key={btn.text}
        custom={i}
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={btn.colSpan}
      >
        <Button
          variant="outline"
          size="lg"
          className="rounded-full text-base cursor-pointer w-full"
          onClick={btn.action}
        >
          {btn.icon} {btn.text}
        </Button>
      </motion.div>
    ))}
  </div>
</div>

        
      </div>
    </div>
  );
};

export default Hero06;

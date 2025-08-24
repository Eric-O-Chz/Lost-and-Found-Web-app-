"use client";

import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Button } from "../ui/button";
import { logout } from "@/actions/userController";
import { motion } from "framer-motion";




const Navbar04Page = () => {


  return (
    <div className="bg-muted">
      <motion.nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-2xl z-20"
       initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          {/* Desktop Menu */}
          
            <NavMenu className="hidden md:block" />
          

          <div className="flex items-center gap-3">
            <form action={logout}>
              <Button>Log out</Button>
            </form>
            
            {/* <ModeToggle/> */}
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
          
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar04Page;

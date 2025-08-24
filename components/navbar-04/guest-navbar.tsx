"use client"

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ModeToggle } from "../mode-toggle"
import { useRouter } from "next/navigation";


const GuestNavPage = () => {    
  const router = useRouter();
  return (
    <div className="bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-2xl z-20">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          {/* Desktop Menu */}
          

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-2xl" onClick={() => router.push("/signup")}
            >
              Sign In
            </Button>
            <Button className="rounded-2xl" onClick={() => router.push("/login")}>Login</Button>
            {/* <ModeToggle/> */}
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
          
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default GuestNavPage;

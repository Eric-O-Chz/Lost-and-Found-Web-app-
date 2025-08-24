// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
// import Link from "next/link";

// export const NavMenu = (props: NavigationMenuProps) => (
//   <NavigationMenu {...props}>
//     <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
//       <NavigationMenuItem>
//         <NavigationMenuLink asChild>
//           <Link href={"/"}>Home</Link>
//         </NavigationMenuLink>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <NavigationMenuLink asChild>
//           <Link href={"/blog"}>Found Items</Link>
//         </NavigationMenuLink>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <NavigationMenuLink asChild>
//           <Link href="/report/report-found">Report Found</Link>
//         </NavigationMenuLink>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <NavigationMenuLink asChild>
//           <Link href="/report/report-lost">Report Lost</Link>
//         </NavigationMenuLink>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <NavigationMenuLink asChild>
//           <Link href="/lostPoster">Lost Items</Link>
//         </NavigationMenuLink>
//       </NavigationMenuItem>
//     </NavigationMenuList>
//   </NavigationMenu>
// );

"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Found Items" },
  { href: "/report/report-found", label: "Report Found" },
  { href: "/report/report-lost", label: "Report Lost" },
  { href: "/lostPoster", label: "Lost Items" },
];

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start font-semibold">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, color: "#3b82f6" }}
          whileTap={{ scale: 0.95, }}
        >
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={item.href} >{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </motion.div>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

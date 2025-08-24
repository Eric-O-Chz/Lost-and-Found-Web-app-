"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop ,FileStack, Briefcase, KeySquare, CircleX } from "lucide-react";
import { useState } from "react";

export default function DropdownMenuWithRadioGroup() {
  const [category, setCategories] = useState("Keys & Personal Items");

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Categoires</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={category} onValueChange={setCategories}>
          <DropdownMenuRadioItem value="Electronics & Gadgets">
            <Laptop className="mr-2 h-4 w-4 text-destructive" /> Electronics & Gadgets
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Documents & Cards">
            <FileStack className="mr-2 h-4 w-4 text-orange-500" /> Documents & Cards
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Bags & Accessories & Valuables">
            <Briefcase className="mr-2 h-4 w-4 text-yellow-500" /> Bags & Accessories & Valuables
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Keys & Personal Items">
            <KeySquare className="mr-2 h-4 w-4 text-green-600" />Keys & Personal Items
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Others / Miscellaneous">
            <CircleX className="mr-2 h-4 w-4 text-green-600" />Others / Miscellaneous
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <input type="hidden" name="category" value={category} />
</>
  );
}

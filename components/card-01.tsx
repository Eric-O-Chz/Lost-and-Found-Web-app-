"use client"

import * as React from "react";
import { motion } from "framer-motion"; 
import DropdownMenuWithRadioGroup from "./dropdown-menu-04";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useActionState } from "react";
import { reportFound, editFound } from "@/actions/foundController";
import { error } from "console";
import { ObjectId } from "mongodb";

export default function CardDemo({ action,foundItemId }: { action: "create" | "edit"; 
                                                          foundItemId?:{
                                                            _id?:string;
                                                            item?:string;
                                                            place?:string;
                                                            category?:string;
                                                            author?:string;
                                      };}) {

  // This will decide which action will be used
  let actualAction;
  if (action === "create"){
    actualAction = reportFound;
  }
  else if (action === "edit"){
    actualAction =editFound;
  }else{
    throw new Error(`Invalid action passed ${action}`);
  }


  const [formState, formAction] = useActionState(actualAction, {})

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Card className="w-[550px]">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-600">
              Create Report for Found Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-gray-600">Name of The Item</Label>
                <Input id="name" name="name" defaultValue={foundItemId?.item} placeholder="Item..." />
                 {formState.errors?.item && (
                      <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none mt-0.5">
                          <OctagonAlert className="h-4 w-4 !text-destructive" />
                              <AlertTitle>
                                  <span>{formState.errors?.item}</span>
                              </AlertTitle>
                      </Alert>
                  )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="place" className="text-gray-600">Description</Label>
                <Textarea
                  id="place"
                  name="place"
                  placeholder="Place where you found & conditions of items..."
                  className="h-20"
                  defaultValue={foundItemId?.place}
                />
                {formState.errors?.place && (
                      <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none mt-0.5">
                          <OctagonAlert className="h-4 w-4 !text-destructive" />
                              <AlertTitle>
                                  <span>{formState.errors?.place}</span>
                              </AlertTitle>
                      </Alert>
                  )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="absolute">
                  <DropdownMenuWithRadioGroup />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-8">
            <input type="hidden" name="foundFormId" defaultValue={foundItemId?._id} />
            <Button className="w-26">Submit</Button>
            
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

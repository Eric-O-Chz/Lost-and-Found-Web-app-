"use client";

import * as React from "react";
import DropdownMenuWithRadioGroup from "./dropdown-menu-04";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useActionState } from "react";
import { reportLost } from "@/actions/lostController";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert} from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from "sonner";
import { useState } from "react";


export default function CardDemo() {

  const [formState, formAction] = useActionState(reportLost,{})
  const [signature, setSignature] = useState("");
  const [version, setVersion] = useState("");
  const [public_id, setPublic_id] = useState("");

  return (
    <Card className="w-[550px]">
      <form action={formAction}>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-600 ">Create Report for Lost </CardTitle>
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nameBelong" className="text-gray-600 ">Name</Label>
              <Input id="nameBelong" name="nameBelong" placeholder="Your Name" />
               {formState.errors?.nameBelong && (
                <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none mt-0.5">
                <OctagonAlert className="h-4 w-4 !text-destructive" />
                <AlertTitle>
                  <span>{formState.errors?.nameBelong}</span>
                </AlertTitle>
              </Alert>
            )}
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lostItemName" className="text-gray-600 ">Name of The Item</Label>
              <Input id="lostItemName" name="lostItemName" placeholder="Lost Item..." />
               {formState.errors?.lostItemName && (
                <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none mt-0.5">
                <OctagonAlert className="h-4 w-4 !text-destructive" />
                <AlertTitle>
                  <span>{formState.errors?.lostItemName}</span>
                </AlertTitle>
              </Alert>
            )}
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lostReason" className="text-gray-600">Description</Label>
              <Textarea id="lostReason" name="lostReason" placeholder="What you remember about your Item...." className="h-20" />
               {formState.errors?.lostReason && (
                <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none mt-0.5">
                <OctagonAlert className="h-4 w-4 !text-destructive" />
                <AlertTitle>
                  <span>{formState.errors?.lostReason}</span>
                </AlertTitle>
              </Alert>
            )}
            </div>  

            <div className="flex flex-col space-y-1.5 w-50">
                  <CldUploadWidget 
                  onSuccess={(result, {widget}) => {
                   toast.success("Upload Successful",{
                    description: "Your image has been uploaded successfully.",
                   });
                   setSignature((result?.info as { signature: string }).signature);
                   setPublic_id((result?.info as { public_id: string }).public_id);
                   setVersion((result?.info as { version: number }).version.toString());

                  }}
                  onQueuesEnd={( result, { widget}) => {
                    if (widget) {
                      widget.close();
                    }
                  }}
                  signatureEndpoint="/widget-signature">
                    {({ open }) => {
                        function handleClick(e: React.MouseEvent<HTMLButtonElement>){ // If not work I should Use any 
                          e.preventDefault();
                          open();
                        }


                      return (
                        <Button variant="outline" onClick={handleClick}>
                          Upload an Image
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                  {formState.errors?.photo && (
                      <Alert className="bg-destructive/10 dark:bg-destructive/20 border-none mt-0.5">
                          <OctagonAlert className="h-4 w-4 !text-destructive" />
                              <AlertTitle>
                                  <span>{formState.errors?.photo}</span>
                              </AlertTitle>
                      </Alert>
                  )}
              </div>
              {/* Hidden inputs for image data */}
            <input type="hidden" name="public_id" value={public_id}  />
            <input type="hidden" name="version" value={version} />
            <input type="hidden" name="signature" value={signature} />

            <div className="flex justify-start  ">
           <DropdownMenuWithRadioGroup/>
          </div>

          </div>
        
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* <Button variant="outline" className="w-26">Cancel</Button> */}
        <Button className="w-26 cursor-pointer">Submit</Button>
      </CardFooter>
      </form>
    </Card>
  );
}

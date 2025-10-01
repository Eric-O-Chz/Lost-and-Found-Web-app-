'use client';

import Link from "next/link";
import { deleteFoundForm } from "@/actions/foundController";
import { CldImage } from 'next-cloudinary';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  Calendar,
  ClockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";



export default function BlogForm(props: { foundItem: { _id: string; item: string; place: string; category: string; author: string; photo: string } }){




    return(
        <>
        <Card className="flex flex-col sm:flex-row border rounded-md overflow-hidden shadow-none mt-4">
  {/* Image Section */}
  {/* <CardHeader className="flex-shrink-0 w-full sm:w-48 h-48 sm:h-auto overflow-hidden rounded-t-md sm:rounded-l-md">
    <CldImage
      width={500}
      height={500}
      src={props.foundItem.photo}
      alt={props.foundItem.item}
      className="object-cover w-full h-full rounded-2xl "
    />
  </CardHeader> */}
  {/* This oftern occure in full photo. So I leave two code we can choose as we like */}
  <CardHeader className="flex-shrink-0 w-full sm:w-48 h-48 sm:h-auto overflow-hidden rounded-t-md sm:rounded-l-md">
        <Dialog>
            <DialogTrigger asChild>
            <CldImage
                width={500}
                height={500}
                src={props.foundItem.photo}
                alt={props.foundItem.item}
                className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition rounded-2xl"
            />
            </DialogTrigger>
            <DialogContent className="p-0 max-w-2xl ">
                 <DialogTitle className="m-4">{props.foundItem.item}</DialogTitle>
            <CldImage
                width={500}
                height={500}
                src={props.foundItem.photo}
                alt={props.foundItem.item}
                className="object-contain w-full h-full"
            />
            </DialogContent>
        </Dialog>
        </CardHeader>

  {/* Text Section */}
  <div className="flex flex-col flex-1 justify-between">
    <CardContent className="px-4 py-4 flex flex-col gap-2">
      <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none w-max">
        {props.foundItem.category}
      </Badge>

      <h3 className="text-2xl font-semibold tracking-tight mt-2">
        {props.foundItem.item}
      </h3>

      <p className="text-muted-foreground line-clamp-4 mt-1">
        {props.foundItem.place}
      </p>

      <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium mt-2 justify-center">
        {/* <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" /> 5 min read
        </div> */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Nov 20, 2024
        </div>
      </div>
    </CardContent>

    {/* Footer Section */}
    <CardFooter className="px-4 py-2 flex gap-2 border-gray-200 mt-auto justify-end ">
      <Link href={`/edit-foundItems/${props.foundItem._id.toString()}`}>
        <Button className='transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 w-18' variant="outline">Edit</Button>
      </Link>
      <form action={deleteFoundForm}>
        <input
          name="id"
          type="hidden"
          defaultValue={props.foundItem._id.toString()}
        />
        <Button className='transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95' variant="outline">Delete</Button>
      </form>
    </CardFooter>
  </div>
</Card>

        </>
    )

    // This is original layout. If above is wrong to use.
    // return(
    //     <>
    //         <Card
    //               className="flex flex-col sm:flex-row items-start shadow-none overflow-hidden rounded-md border border-gray-200 mt-4"
    //             >
    //               {/* Image Section */}
    //               <CardHeader className="p-0 w-full sm:w-50 flex-shrink-0 rounded-lg overflow-hidden mt-0">
    //                 <CldImage
    //                           width="500"
    //                           height="500"
    //                           src={props.foundItem.photo}
                              
    //                           alt="Description of my image"
    //                         />
    //               </CardHeader>

    //               {/* Text Section */}
    //               <CardContent className="px-2 sm:px-6 py-4 flex flex-col flex-1 ">
    //                 <div className="flex items-center gap-6">
    //                   <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
    //                     {props.foundItem.category}
    //                   </Badge>
    //                 </div>

    //                 <h3 className="mt-4 text-2xl font-semibold tracking-tight">
    //                   {props.foundItem.item}
    //                 </h3>
    //                 <p className="mt-2 text-muted-foreground line-clamp-4">
    //                   {props.foundItem.place}
    //                 </p>

    //                 <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
    //                   <div className="flex items-center gap-2">
    //                     <ClockIcon className="h-4 w-4" /> 5 min read
    //                   </div>
    //                   <div className="flex items-center gap-2">
    //                     <Calendar className="h-4 w-4" /> Nov 20, 2024
    //                   </div>
    //                 </div>
    //               </CardContent>
    //               <CardFooter className="mt-auto">
    //               <Link href={`/edit-foundItems/${props.foundItem._id.toString()}`} >
    //               <Button variant="outline" className="mr-1">Edit</Button></Link>
    //               <form action={deleteFoundForm}>
    //                 <input name="id" type="hidden" defaultValue={props.foundItem._id.toString()}/>
    //                 <Button variant="outline">Delete</Button>
    //               </form>
    //               </CardFooter>
    //           </Card>

    //     </>
    // );
}
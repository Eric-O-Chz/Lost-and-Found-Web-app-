"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  ShareIcon,
} from "lucide-react";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";





type lostItemType={
    _id:ObjectId;
    nameBelong:string;
    lostItemName: string;
    lostReason: string;
    category: string;
    author: ObjectId;
}

async function getLostItem() {
    const Collection = await getCollection<lostItemType>("lostItems");
    const result = Collection.find({}).sort({_id:-1}).toArray();

    return result;
    
}

export default async function LostPoster() {

    const lostItems = await getLostItem();



  return (
    <div className="flex justify-center mt-25">
      <div className="grid grid-cols-3 gap-6">
         {lostItems.map((lostItem, index) =>(
            <Card key={index} className="w-full max-w-xs shadow-none">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <h6 className="text-2xl leading-none font-medium">{lostItem.nameBelong}</h6>
            <span className="text-xs">@shadcn</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted border-y" />
        <div className="pt-3 pb-4 px-6">
          <h2 className="font-semibold">{lostItem.lostItemName}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lostItem.lostReason}{" "}
            
            <span className="text-blue-500">{lostItem.category}</span>{" "}
            <span className="text-blue-500">#NatureLovers</span>
          </p>
        </div>
      </CardContent>
      <Separator />
      {/* <CardFooter className="flex py-2 px-2">
        <Button variant="ghost" className="w-full text-muted-foreground">
          <HeartIcon /> <span className="hidden sm:inline">Like</span>
        </Button>
        <Button variant="ghost" className="w-ful text-muted-foreground">
          <MessageCircleIcon />
          <span className="hidden sm:inline">Comment</span>
        </Button>
        <Button variant="ghost" className="w-full text-muted-foreground">
          <ShareIcon /> <span className="hidden sm:inline">Share</span>
        </Button>
      </CardFooter> */}
    </Card>))}
      </div>
    </div>
  );
}

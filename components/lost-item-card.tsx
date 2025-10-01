"use client";

import { CldImage } from 'next-cloudinary';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type LostItemType = {
  _id: string;
  nameBelong: string;
  lostItemName: string;
  lostReason: string;
  category: string;
  author: string;
  photo: string;
};

interface LostItemCardProps {
  lostItem: LostItemType;
}

export default function LostItemCard({ lostItem }: LostItemCardProps) {
  return (
    <Card className="w-full max-w-xs shadow-none">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <h6 className="text-2xl leading-none font-medium">{lostItem.nameBelong}</h6>
            
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted border-y">
          {lostItem.photo && (
            <Dialog>
              <DialogTrigger asChild>
                <CldImage
                  width={500}
                  height={500}
                  src={lostItem.photo}
                  alt={lostItem.lostItemName}
                  className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition"
                />
              </DialogTrigger>
              <DialogContent className="p-0 max-w-2xl">
                <DialogTitle className="m-4">{lostItem.lostItemName}</DialogTitle>
                <CldImage
                  width={500}
                  height={500}
                  src={lostItem.photo}
                  alt={lostItem.lostItemName}
                  className="object-contain w-full h-full"
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="pt-3 pb-4 px-6">
          <h2 className="font-semibold">{lostItem.lostItemName}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lostItem.lostReason}{" "}
            
            <span className="text-blue-500">{lostItem.category}</span>{" "}
            
          </p>
        </div>
      </CardContent>
      <Separator />
    </Card>
  );
}

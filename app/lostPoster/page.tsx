"use server";

import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import LostItemCard from "@/components/lost-item-card";





type lostItemType={
    _id:ObjectId;
    nameBelong:string;
    lostItemName: string;
    lostReason: string;
    category: string;
    author: ObjectId;
    photo: string;
}

async function getLostItem() {
    const Collection = await getCollection<lostItemType>("lostItems");
    const result = await Collection.find({}).sort({_id:-1}).toArray();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
      author: item.author.toString(),
    }));
    
}

export default async function LostPoster() {

    const lostItems = await getLostItem();



  return (
    <div className="flex justify-center mt-25">
      <div className="grid grid-cols-3 gap-6">
         {lostItems.map((lostItem, index) =>(
            <LostItemCard key={index} lostItem={lostItem} />
         ))}
      </div>
    </div>
  );
}

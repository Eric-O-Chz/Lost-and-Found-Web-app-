import CardDemo from "@/components/card-01";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/getUser";

type FoundItem = {
 _id: ObjectId;
  item?: string;
  place?: string;
  category?: string;
  author?: ObjectId;
};

type FoundItemPlain = {
  _id: string;
  item?: string;
  place?: string;
  category?: string;
  author?: string;
};

async function getDoc(id: string): Promise<FoundItem | null> {
    const foundCollection = await getCollection("foundItems");
    const result = await foundCollection.findOne({_id: new ObjectId(id)});

    return result as FoundItem | null;  

    
}

export default async function EditingForFoundItems({ params }: { params: Promise<{ id: string }>;}){
    const { id } = await params;
    const doc = (await getDoc(id))!; 
    const user = await getUserFromCookie();

    // Convert ObjectIds to strings
  const plainDoc: FoundItemPlain = {
    _id: doc._id.toString(),
    item: doc.item,
    place: doc.place,
    category: doc.category,
    author: doc.author?.toString(),
  };

    if ((user as any).userId !== plainDoc.author){
      return redirect("/");
    }
    


    return(
        <>
        <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-red-950 to-black -z-10"></div>
         <div className="flex justify-center items-center min-h-screen">
        <CardDemo foundItemId={plainDoc} action="edit"/>
        </div>
        </div>
        </>
    )
}
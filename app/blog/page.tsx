
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { deleteFoundForm } from "@/actions/foundController";

import {
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Calendar,
  ClockIcon,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";


type foundItem = {
  _id: ObjectId;
  item: string;
  place: string;
  category: string;
  author: ObjectId;
}

async function  getFoundItems() {
  const Collection = await getCollection<foundItem>("foundItems");
  const result = await Collection.find({}).sort({_id: -1}).toArray();
  // console.log(result);
                    
  return result;
  
}



const Blog03Page = async () => {

  const foundItems = await getFoundItems();
  const categoryCount = foundItems.reduce<Record<string,number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  },{});

  return (
    
    <div id="FoundItem" className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row items-start gap-12 mt-20">
      <div>

        <h2 className="absolute text-3xl font-bold tracking-tight">Recent Found Items</h2>

        {/* <div className="mt-4 space-y-12"> */}
        <div className="my-10 space-y-8 overflow-y-auto max-h-[75vh] pr-2 ml-10 scroll-smooth pt-5 pb-5">
          {foundItems.map((foundItem,i) => (
            <Card
                  key={i} 
                  className="flex flex-col sm:flex-row items-start shadow-none overflow-hidden rounded-md border border-gray-200 mt-4"
                >
                  {/* Image Section */}
                  <CardHeader className="p-0 w-full sm:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="https://cdn.mos.cms.futurecdn.net/mmcXYQ5VaaQg7cGWovkWB5.jpg"
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>

                  {/* Text Section */}
                  <CardContent className="px-2 sm:px-6 py-4 flex flex-col flex-1 ">
                    <div className="flex items-center gap-6">
                      <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                        {foundItem.category}
                      </Badge>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                      {foundItem.item}
                    </h3>
                    <p className="mt-2 text-muted-foreground line-clamp-4">
                      {foundItem.place}
                    </p>

                    <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" /> 5 min read
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Nov 20, 2024
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                  <Link href={`/edit-foundItems/${foundItem._id.toString()}`} >
                  <Button variant="outline" className="mr-1">Edit</Button></Link>
                  <form action={deleteFoundForm}>
                    <input name="id" type="hidden" defaultValue={foundItem._id.toString()}/>
                    <Button variant="outline">Delete</Button>
                  </form>
                  </CardFooter>
              </Card>

          ))}
        </div>
      </div>
      <aside className="sticky top-22 shrink-0  lg:max-w-sm w-full">
        <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
          {Object.entries(categoryCount).map(([category, count]) => (
            <div
              key={category}
              className={cn(
                "flex items-center justify-between gap-2 p-3 rounded-md bg-teal-800 sm:w-80",
                
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{category}</span>
              </div>
          <span className="font-semibold text-md text-slate-800 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% w-8 h-8 flex items-center justify-center">
                  {count}
                </span> 
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Blog03Page;

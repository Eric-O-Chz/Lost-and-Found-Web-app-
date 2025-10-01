
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { deleteFoundForm } from "@/actions/foundController";
import { CldImage } from 'next-cloudinary';
import { Button } from "@/components/ui/button";
import BlogForm from "@/components/foundFormForBlog";



type foundItem = {
  _id: ObjectId;
  item: string;
  place: string;
  category: string;
  author: ObjectId;
  photo: string;
}

async function  getFoundItems() {
  const Collection = await getCollection<foundItem>("foundItems");
  const result = await Collection.find({}).sort({_id: -1}).toArray();
  // console.log(result);
                    
  return result.map((item) => ({
    ...item,
    _id: item._id.toString(),
    author: item.author.toString(), // if author is also ObjectId
  }));
  
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
        <div className="my-10 space-y-8 overflow-y-auto max-h-[75vh] pr-2 ml-10 scroll-smooth pt-5 pb-5 border border-accent rounded-l-xl p-5">
          {foundItems.map((foundItem,i) => (
        <BlogForm foundItem={foundItem} key={i} />
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
                "flex items-center justify-between gap-2 p-3 rounded-md bg-blue-700 sm:w-80",
                
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

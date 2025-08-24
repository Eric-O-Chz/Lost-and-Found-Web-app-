import { getUserFromCookie } from "@/lib/getUser";
import { Button } from "../ui/button";
import { MessageSquareWarning, Search, Goal,} from "lucide-react";
import Link from "next/link";

export default async function SecurityForAuth() {
    const user = await getUserFromCookie();
 

    return(
        <>
        {user && (
            <div className="mt-12 flex items-center justify-center gap-4">
          <div className="grid grid-cols-2 gap-2">
          <Button size="lg" className="rounded-full text-base cursor-pointer" >
           <Link href={"/report/report-lost"} className="w-full"> Report Lost <MessageSquareWarning className="!h-5 !w-5" /></Link>
          </Button>
          <Button size="lg" className="rounded-full text-base cursor-pointer">
           <Link href={"/report/report-lost"} className="w-full"> Mark as Found <Goal className="!h-5 !w-5" /></Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none col-span-2"
          >
           <Search className="!h-5 !w-5" /><Link href={"/blog"} >Recent Found Items </Link>
          </Button>
  
          </div>
        </div>
        )}
        {!user && (
            <div className="mt-12 flex items-center justify-center gap-4">
          <div className="grid grid-cols-2 gap-2">
          <Button size="lg" className="rounded-full text-base cursor-pointer" >
           <Link href={"/signup"} className="w-full"> Report Lost <MessageSquareWarning className="!h-5 !w-5" /></Link>
          </Button>
          <Button size="lg" className="rounded-full text-base cursor-pointer">
           <Link href={"/signup"} className="w-full"> Mark as Found <Goal className="!h-5 !w-5" /></Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none col-span-2"
          >
           <Search className="!h-5 !w-5" /><Link href={"/signup"} >Recent Found Items </Link>
          </Button>
  
          </div>
        </div>
        )}
         

        
        </>
    )
    
}
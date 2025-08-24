import CardDemo from "@/components/card-lost";
import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";

export default async function LostItemReport(){
    const user = await getUserFromCookie();
    if(!user){
        redirect("/");
    }

    return(
        <>
        
         <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-800  to-black -z-10"></div>

      {/* Content */}
      <div className="flex justify-center items-center min-h-screen">
        <CardDemo />
      </div>
    </div>
        </>
    )
}
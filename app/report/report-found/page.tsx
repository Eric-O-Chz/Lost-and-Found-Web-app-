import CardDemo from "@/components/card-01";
import { Toaster } from "sonner";

export default function LostItemReport(){
    return(
        <>
        <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 to-black -z-10"></div>
         <div className="flex justify-center items-center min-h-screen">
             
        <CardDemo action="create"/>
        </div>
        </div>
        </>
    )
}
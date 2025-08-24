
import Navbar04Page from "@/components/navbar-04/navbar-04";
import GuestNavPage from "@/components/navbar-04/guest-navbar";
import { getUserFromCookie } from "@/lib/getUser";

export default async function PrimaryNavBar(){
    const user = await getUserFromCookie();

    return(
        <>
        {user ? <Navbar04Page /> : <GuestNavPage/>}
      
        </>
    )
}
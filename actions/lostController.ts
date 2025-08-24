"use server";


import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { error } from "console";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";



async function sharedLostLogic(formData:FormData, user:any) {

    type RegisterErrors = {
        nameBelong?:string;
        lostItemName?:string;
        lostReason?:string;
    }

    const errors:RegisterErrors = {};

    const lostItems = {
        nameBelong: formData.get("nameBelong"),
        lostItemName: formData.get("lostItemName"),
        lostReason: formData.get("lostReason"),
        category: formData.get("category"),
        author: ObjectId.createFromHexString(user.userId)
    }

    if (typeof lostItems.nameBelong != "string") lostItems.nameBelong = "";
    if (typeof lostItems.lostItemName != "string") lostItems.lostItemName = "";
    if (typeof lostItems.lostReason != "string") lostItems.lostReason = "";
    
    lostItems.lostItemName = lostItems.lostItemName.replace(/(\r\n|\n|\r)/g," ").trim();
    lostItems.lostReason   = lostItems.lostReason.replace(/(\r\n|\n|\r)/g," ").trim();

    if (lostItems.nameBelong.length < 3) errors.nameBelong = "Please enter more characters";
    if (lostItems.nameBelong.length > 20) errors.nameBelong = "Too Much characters";

    if (lostItems.lostItemName.length < 5) errors.lostItemName = "Please enter more characters";
    if (lostItems.lostItemName.length > 100) errors.lostItemName = "Too Much characters";

    if (lostItems.lostReason.length < 5) errors.lostReason = "Please enter more characters";
    if (lostItems.lostReason.length > 100) errors.lostReason = "Too Much characters";

    if (lostItems.lostItemName.length == 0) errors.lostItemName = "This field is required";
    if (lostItems.lostReason.length == 0) errors.lostReason = "This field is required";


    return {
        errors,
        lostItems,
    }

    
}



export const reportLost = async (prevState:any, formData: FormData): Promise<any> => {
    const user = await getUserFromCookie();

    if(!user){
        return redirect("/");
    }

    const results = await sharedLostLogic(formData, user);

    if (results.errors.lostItemName || results.errors.lostReason || results.errors.nameBelong){
        return{
            errors:results.errors,
        }
    }


    //save to DB
    const lostCollection = await getCollection("lostItems");
    const newLostItems = await lostCollection.insertOne(results.lostItems);

    return redirect("/");

}
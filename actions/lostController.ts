"use server";


import { getCollection } from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUser";
import { error } from "console";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



async function sharedLostLogic(formData:FormData, user:any) {

    type RegisterErrors = {
        nameBelong?:string;
        lostItemName?:string;
        lostReason?:string;
        photo?:string;
    }

    const errors:RegisterErrors = {};

    const lostItems = {
        nameBelong: formData.get("nameBelong"),
        lostItemName: formData.get("lostItemName"),
        lostReason: formData.get("lostReason"),
        category: formData.get("category"),
        author: ObjectId.createFromHexString(user.userId),
        photo: formData.get("public_id"),
    }

    if (typeof lostItems.nameBelong != "string") lostItems.nameBelong = "";
    if (typeof lostItems.lostItemName != "string") lostItems.lostItemName = "";
    if (typeof lostItems.lostReason != "string") lostItems.lostReason = "";
    if (typeof lostItems.photo != "string") lostItems.photo = "";
    
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
    if (lostItems.photo.length == 0) errors.photo = "This field is required";

    //verify signature 
    const expectedSignature = cloudinary.utils.api_sign_request(
        {public_id: formData.get("public_id"),
         version: formData.get("version")
        },cloudinaryConfig.api_secret as string);
    if (expectedSignature === formData.get("signature")){
        lostItems.photo = formData.get("public_id");
    }


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

    if (results.errors.lostItemName || results.errors.lostReason || results.errors.nameBelong || results.errors.photo){
        return{
            errors:results.errors,
        }
    }


    //save to DB
    const lostCollection = await getCollection("lostItems");
    const newLostItems = await lostCollection.insertOne(results.lostItems);

    return redirect("/");

}
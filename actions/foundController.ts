"use server"

import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { error } from "console";


async function sharedFoundLogic(formData: FormData, user: any) {

    type RegisterErrors = {
        item?:string;
        place?:string;
    }
    const errors: RegisterErrors = {}
    
    const foundItem = {
        item: formData.get("name"),
        place: formData.get("place"),
        category:formData.get("category"),
        author: ObjectId.createFromHexString(user.userId),
    }

    if (typeof foundItem.item != "string") foundItem.item = "";
    if (typeof foundItem.place != "string") foundItem.place = "";

    foundItem.item = foundItem.item.replace(/(\r\n|\n|\r)/g," ").trim();
    foundItem.place = foundItem.place.replace(/(\r\n|\n|\r)/g," ").trim();


    if (foundItem.item.length < 5) errors.item = "Please enter more characters";
    if (foundItem.item.length > 250) errors.item = "Too Much characters";

    if (foundItem.place.length < 5) errors.place = "Please enter more characters";
    if (foundItem.place.length > 250) errors.place = "Too Much characters";

    if (foundItem.item.length == 0) errors.item = "This field is required";
    if (foundItem.place.length == 0) errors.place = "This field is required";

    
    return {
        errors,
        foundItem,
    }

}


export const reportFound = async (prevState: any, formData: FormData): Promise<any>  => {
    const user = await getUserFromCookie();

    if (!user){
        return redirect("/");
        // return { error : "operatino is not allowed"} for trying next time
    }

    const results = await sharedFoundLogic(formData, user)

    if (results.errors.item || results.errors.place){
        return {
            errors: results.errors,
        }
    }

    // saved into DB
    const foundCollection = await getCollection("foundItems");
    const newFoundItem = await foundCollection.insertOne(results.foundItem)

    return redirect("/")
   
}

export const editFound = async (prevState: any, formData: FormData): Promise<any>  => {
    const user = await getUserFromCookie();

    if (!user){
        
        return redirect("/");
       
    }

    const results = await sharedFoundLogic(formData, user)

    if (results.errors.item || results.errors.place){
        return {
            errors: results.errors,
        }
    }

    // saved into DB
    const foundCollection = await getCollection("foundItems");
    let foundFormId = formData.get("foundFormId")
    if (typeof foundFormId != 'string') foundFormId = ""

    // make sure this is author of the posts, otherwise have fail the operations..
    const checkingUserIsAuthor = (await foundCollection.findOne({_id: ObjectId.createFromHexString(foundFormId)}))!;
    if ( checkingUserIsAuthor.author.toString() != (user as any).userId){
        return redirect("/");
         // return {error: "Operation is not allowed"};
    }



    await foundCollection.findOneAndUpdate({_id: ObjectId.createFromHexString(foundFormId)},{$set: results.foundItem})

    return redirect("/")
   
}

export const deleteFoundForm = async (formData: FormData) => {
    const user = await getUserFromCookie();

    if (!user){
        
        return redirect("/");
       
    }

     // saved into DB
    const foundCollection = await getCollection("foundItems");
    let foundFormId = formData.get("id");
    if (typeof foundFormId != 'string') foundFormId = "";

    // make sure this is author of the posts, otherwise have fail the operations..
    const checkingUserIsAuthor = (await foundCollection.findOne({_id: ObjectId.createFromHexString(foundFormId)}))!;
    if ( checkingUserIsAuthor.author.toString() != (user as any).userId){
        return redirect("/");
    }



    await foundCollection.deleteOne({_id: ObjectId.createFromHexString(foundFormId)});

    return redirect("/")

}
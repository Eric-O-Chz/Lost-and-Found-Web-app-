"use server"

import { email, string, success } from "zod";
import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

function isAlphaNumeric(password: string): boolean {
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(password);
}

export const logout = async function () {
    const CookieStore = await cookies();
    CookieStore.delete("lostlink");
    redirect("/");
    
}

export const login = async function (prevState:any, formData: FormData) {

    const failObject = {
        success: false,
        message: "Invalid email/password"
    }

     const ourUser = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    if (typeof ourUser.email != "string") ourUser.email = "";
    if (typeof ourUser.password != "string") ourUser.password = "";

    //check from DB 
    const collection = await getCollection("users");
    const user = await collection.findOne({email: ourUser.email})

    if (!user){
        return failObject;
    }

    const matchOrNot = bcrypt.compareSync(ourUser.password, user.password)

    if(!matchOrNot) {
        return failObject;
    }

    // create jwt value
    const ourTokenValue = jwt.sign({userId: user._id},process.env.JWTSECRET!, {expiresIn: '24h'});

    // log the user in by giving them a cookies
    const cookieStores =  await cookies();
    cookieStores.set("lostlink", ourTokenValue, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })

    return redirect("/");

    
}


export const register = async function (prevState:any ,formData: FormData) {
type RegisterErrors = {
        email?:string;
        password?:string;
    }
    const errors: RegisterErrors = {}
    

    const ourUser = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    if (typeof ourUser.email != "string") ourUser.email = "";
    if (typeof ourUser.password != "string") ourUser.password = "";

    ourUser.email = ourUser.email.trim();
    ourUser.password = ourUser.password.trim();

    // email vaildate(for serverside)
    if (!isValidEmail(ourUser.email)) errors.email = "Invalid Email";
    if (ourUser.email == "") errors.email = "You must provide Email";

    // check is email is already used
    const userCollection = await getCollection<User>("users");
    const userEamilCheck = await userCollection.findOne({email: ourUser.email})
    if (userEamilCheck){
        errors.email = "Email is already in use."
    }

    //password vaildate(for serverside)
    if(ourUser.password.length < 8) errors.password = "password must be at least 8 characters";
    if(ourUser.password.length > 30) errors.password = "password must be under 30 characters";
    if(ourUser.password == "" ) errors.password = "You must provide password";

    if(errors.email ||  errors.password){
        return{
            errors: errors,
            success: false,
        }
    }


    //hash the password first
    const salt = bcrypt.genSaltSync(10);
    ourUser.password = bcrypt.hashSync(ourUser.password, salt);
    
    // storing a new  user  in the database
    type User = {
                email: string
                password: string
                }

    const newUser = await userCollection.insertOne(ourUser);
    const userId = newUser.insertedId.toString()

    // create our JWT value
    const ourTokenValue = jwt.sign({userId: userId},process.env.JWTSECRET!, {expiresIn: '24h'});

    // log the user in by giving them a cookies
    const cookieStores =  await cookies();
    cookieStores.set("lostlink", ourTokenValue, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })


    return{
        success:true
    }

    
    
}
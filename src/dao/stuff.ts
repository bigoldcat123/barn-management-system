'use server'
import db from "@/db";
import { Prisma, Shelf } from "@prisma/client";

export async function pageStuff(page:number,size:number = 10) {
    try {
        const res = db.stuff.findMany({
            skip: (page - 1) * size,
            take: size,
        })
        return res
    } catch (e) {
        console.error(e)
        return []
    }
}

export async function createStuff(init:string,formdata:FormData) {
    //parse formdata
    console.log(formdata);
    const data = Object.fromEntries(formdata)
    console.log(data);
    try {
        let x = await db.stuff.count({
            where:{
                row:Number(data.row),
                column:Number(data.column),
                shelfId:Number(data.shelfId)
            }
        })
        if (x > 0) {
            return "alread exists"
        }
        await db.stuff.create({
            data:{
                name:data.name as string,
                column:Number(data.column),
                row:Number(data.row),
                categoryId:Number(data.categoryId),
                shelfId:Number(data.shelfId)
            }
        })
    }catch (e) {
        console.error(e);
        return "error   "
    }
   
    return "success"
}
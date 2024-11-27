import db from '@/db'
import { Prisma } from '@prisma/client';
//page
export async function pageRoom (current:number,size:number = 10) {
    try{
        let res = db.room.findMany({
            skip:(current - 1) * size,
            take:size
        })
        return res
    }catch (e) {
        console.log(e);
    }
    return []
}

export async function getRoomWithShelvesById(id:number) {
    try{
        let res = db.room.findUnique({
            where:{
                id:id
            },
            include:{
                shelves:{
                    include:{
                        stuff:{
                            include:{
                                category:true
                            }
                        },
                        category:true
                    }
                }
            }
        })
        return res 
    }catch (e) {
        console.log(e);
    }
}
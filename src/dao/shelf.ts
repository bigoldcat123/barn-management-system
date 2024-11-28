'use server'
import db from '@/db'
export async function getShelfById(id: number) {
    const shelf = await db.shelf.findUnique({
        where: {
            id: id
        }
    })
    return shelf
}

export async function pageShelf(page: number, pageSize: number = 10) {
    const shelves = await db.shelf.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include:{
            category:true
        }
    })
    return shelves
}

export async function getShelivesByRoomId(roomId:number) {
    try {
        const shelves = await db.shelf.findMany({
            where: {
                roomId: roomId
            },
            include:{
                stuff:true
            }
        })
        return shelves
    } catch(e) {
        console.error(e)
    }
    return []
}
export async function createShelf(init:string,formdata:FormData) {
    let data = Object.fromEntries(formdata)
    try {
        await db.shelf.create({
            data:{
                name:data.name as string,
                x:Number(data.x),
                y:Number(data.y),
                roomId:Number(data.roomId),
                categoryId:Number(data.categoryId)
            }
        })
    }catch(e) {
        console.error(e)
        return 'error'
    }
    return init
}
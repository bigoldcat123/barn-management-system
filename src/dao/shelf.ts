import db from '@/db'
export async function getShelfById(id: number) {
    const shelf = await db.shelf.findUnique({
        where: {
            id: id
        }
    })
    return shelf
}

export async function pageShelf(page: number, pageSize: number) {
    const shelves = await db.shelf.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
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
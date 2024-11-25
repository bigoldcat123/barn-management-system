import db from '@/db'
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
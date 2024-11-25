import { Prisma } from "@prisma/client"

class ShelfOperation  {
    data:Prisma.ShelfGetPayload<{
        include:{
          stuff:true
        }
      }>
    constructor(data:Prisma.ShelfGetPayload<{
        include:{
          stuff:true
        }
      }>){
        this.data = data
    }
    
}
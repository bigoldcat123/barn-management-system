import db from "@/db";
await db.room.create({
    data:{
        name: "room1",
        width: 10,
        length: 10,
        shelves:{
            create:[
                
                    {
                        name: "shelf1",
                        rows: 10,
                        columns: 10,
                        x:1,
                        y:1,
                    },
                    {
                        name: "shelf2",
                        rows: 10,
                        columns: 10,
                        x:1,
                        y:1,
                    },
                    {
                        name: "shelf3",
                        rows: 10,
                        columns: 10,
                        x:1,
                        y:1,
                    },
                    {
                        name: "shelf4",
                        rows: 10,
                        columns: 10,
                        x:1,
                        y:1,
                    },
                    {
                        name: "shelf5",
                        rows: 10,
                        columns: 10,
                        x:1,
                        y:1,
                    },
            ]
        }
    }
})
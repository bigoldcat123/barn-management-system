import db from "@/db";
await db.room.create({
    data:{
        name: "room1",
        shelves:{
            create:[
                
                    {
                        name: "shelf1",
                        rows: 10,
                        columns: 10
                    }, {
                        name: "shelf2",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf3",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf4",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf5",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf6",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf7",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf8",
                        rows: 10,
                        columns: 10
                    },
                    {
                        name: "shelf9",
                        rows: 10,
                        columns: 10
                    }
            ]
        }
    }
})
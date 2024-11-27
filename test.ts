import db from "@/db";


await db.category.create({
    data: {
        scale: 8,
        initX: 0,
        initY: 3,
        initZ: 5,
        model: "/dog.glb",
        name: "dog"
    }
})

await db.shelfCategory.create({
    data: {
        columns:2,
        initX: 7,
        initY: 10,
        initZ: -7,
        leftOffset:0,
        modle:"/shelf.glb",
        rowHeight:11.6,
        rows:4,
        scale:10,
        width:2
    }
})
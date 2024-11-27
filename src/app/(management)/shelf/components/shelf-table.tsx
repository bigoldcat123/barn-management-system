'use client'

import { Prisma, Shelf } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createStuff } from "@/dao/stuff";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ShelfWithCategory = Prisma.ShelfGetPayload<{include:{category:true}}>
export default function ShelfTable({
    data
}: {
    data: ShelfWithCategory[]
}) {
    const [shelves, setShelves] = useState<ShelfWithCategory[]>(data);
    // id: number;
    // name: string;
    // rows: number;
    // columns: number;

    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>rows</TableHead>
                        <TableHead >columns</TableHead>
                        <TableHead >position-x</TableHead>
                        <TableHead >position-y</TableHead>

                        <TableHead >operations</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        shelves.map((shelf) => {
                            return (
                                <TableRow key={shelf.id}>
                                    <TableCell className="font-medium">{shelf.id}</TableCell>
                                    <TableCell>{shelf.name}</TableCell>
                                    <TableCell>{shelf.category.rows}</TableCell>
                                    <TableCell >{shelf.category.columns}</TableCell>
                                    <TableCell>{shelf.x}</TableCell>
                                    <TableCell >{shelf.y}</TableCell>
                                    <TableCell >
                                        <AddButton shelf={shelf} />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>

        </>
    );
}
function AddButton({
    shelf
}: {
    shelf: ShelfWithCategory
}) {
    const [o,setO] = useState(false)
    const [state, action, pending] = useActionState(createStuff, "")
    const maxRow = shelf.category.rows;
    const maxColumn = shelf.category.columns;
    useEffect(() => {
        if (state === "success") {
            // alert(state)
            console.log(state);
            setO(false)
        }else {
            // alert(state)
            console.log(state);
            
        }
    },[state])
    return (
        <>
            <Dialog open={o} onOpenChange={setO}>
                <DialogTrigger asChild>
                    <Button>add stuff</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>add stuff for {shelf.name}</DialogTitle>
                        <DialogDescription>adding </DialogDescription>
                    </DialogHeader>
                    <div>
                        <form action={action}>
                            <Label htmlFor="name">name</Label>
                            <Input id="name" type="text" name="name" />
                            <Label htmlFor="row">row</Label>
                            <Input id="row" type="number" name="row" max={maxRow} />
                            <Label htmlFor="column">column</Label>
                            <Input id="column" type="number" name="column" max={maxColumn} />
                            <Input type="hidden" name="categoryId" defaultValue={1} />
                            <Input type="hidden" name="shelfId" defaultValue={shelf.id} />
                            <Button type="submit" disabled={pending}>add</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
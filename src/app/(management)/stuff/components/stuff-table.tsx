'use client'

import { Shelf, Stuff } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";

export default function StuffTable({
    data
}: {
    data: Stuff[]
}) {
    const [stuffs,setStuff] = useState<Stuff[]>(data);
    // name: string;
    // id: number;
    // row: number;
    // column: number;
    // categoryId: number;
    // shelfId: number;
    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>position-rows</TableHead>
                        <TableHead >position-columns</TableHead>
                        <TableHead >operations</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        stuffs.map((stuff) =>  {
                            return (
                                <TableRow key={stuff.id}>
                                    <TableCell className="font-medium">{stuff.id}</TableCell>
                                    <TableCell>{stuff.name}</TableCell>
                                    <TableCell>{stuff.row}</TableCell>
                                    <TableCell >{stuff.column}</TableCell>
                                    <TableCell >TODO</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>

        </>
    );
}
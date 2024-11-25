'use client'

import { Shelf } from "@prisma/client";
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

export default function ShelfTable({
    data
}: {
    data: Shelf[]
}) {
    const [shelves,setShelves] = useState<Shelf[]>(data);
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
                        <TableHead >operations</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        shelves.map((shelf) =>  {
                            return (
                                <TableRow key={shelf.id}>
                                    <TableCell className="font-medium">{shelf.id}</TableCell>
                                    <TableCell>{shelf.name}</TableCell>
                                    <TableCell>{shelf.rows}</TableCell>
                                    <TableCell >{shelf.columns}</TableCell>
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
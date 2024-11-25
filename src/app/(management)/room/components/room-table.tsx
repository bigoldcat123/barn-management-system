'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Room } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export default function RoomTable({
    data
}: {
    data: Room[]
}) {
    const [rooms, setRooms] = useState<Room[]>(data)
    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead >operations</TableHead>
                        <TableHead >width</TableHead>
                        <TableHead >length</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        rooms.map((room) => {
                            return (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium">{room.id}</TableCell>
                                    <TableCell>{room.name}</TableCell>
                                    <TableCell>{room.width}</TableCell>
                                    <TableCell>{room.length}</TableCell>
                                    <TableCell>
                                        <Link href={'/' + '?roomid=' + room.id}>
                                        <Button>Look up</Button>
                                        </Link>
                                        
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
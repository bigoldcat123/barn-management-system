'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createShelf } from "@/dao/shelf";
import { Room, Shelf } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function RoomTable({
    data
}: {
    data: Room[]
}) {
    const [rooms, setRooms] = useState<Room[]>(data)

    const router = useRouter();
    function lookUp(roomid: number) {
        const p = new URLSearchParams({
            roomid: roomid.toString()
        })
        router.push('/?' + p.toString())
    }
    function addShelf (roomid:number) {

    }
    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead >width</TableHead>
                        <TableHead >length</TableHead>
                        <TableHead >operations</TableHead>
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
                                    <TableCell className=" flex gap-x-1">
                                        {/* <Link href={'/' + '?roomid=' + room.id}> */}
                                        <Button onClick={() => lookUp(room.id)}>Look up</Button>
                                        <AddButton room={room}/>
                                        {/* </Link> */}
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
    room
}: {
    room: Room
}) {
    const [o,setO] = useState(false)
    const [state, action, pending] = useActionState(createShelf, "")
    const maxX = room.width;
    const maxY = room.length;
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
    // name: string;
    // id: number;
    // x: number;
    // y: number;
    // roomId: number;
    // categoryId: number;
    return (
        <>
            <Dialog open={o} onOpenChange={setO}>
                <DialogTrigger asChild>
                    <Button>add shelf</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>add shelf for {room.name}</DialogTitle>
                        <DialogDescription>adding </DialogDescription>
                    </DialogHeader>
                    <div>
                        <form action={action}>
                            <Label htmlFor="name">name</Label>
                            <Input id="name" type="text" name="name" />
                            <Label htmlFor="x">position-x</Label>
                            <Input id="x" type="number" name="x" max={maxX} />
                            <Label htmlFor="column">position-y</Label>
                            <Input id="y" type="number" name="y" max={maxY} />
                            <Input type="hidden" name="categoryId" defaultValue={1} />
                            <Input type="hidden" name="roomId" defaultValue={room.id} />
                            <Separator className="my-1"/>
                            <Button type="submit" disabled={pending}>add</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
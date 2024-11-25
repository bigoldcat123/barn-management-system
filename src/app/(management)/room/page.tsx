import { pageRoom } from "@/dao/room";
import RoomTable from "./components/room-table";

export default async function RoomPage() {
    const rooms = await pageRoom(1);
  return (
    <>
      <RoomTable data={rooms}/>
    </>
  );
}
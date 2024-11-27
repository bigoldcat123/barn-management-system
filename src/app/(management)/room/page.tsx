import { pageRoom } from "@/dao/room";
import RoomTable from "./components/room-table";

export default async function RoomPage({
  searchParams,
}:{
  searchParams: Promise<{
    page?: string;
  }>
}) {
   const params = await searchParams;
    const rooms = await pageRoom(Number(params.page ?? 1));
  return (
    <>
      <RoomTable data={rooms}/>
    </>
  );
}
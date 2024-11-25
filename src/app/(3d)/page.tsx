import { getShelivesByRoomId } from "@/dao/shelf";
import ThreedRoom from "./threed-room";
import { getRoomWithShelvesById } from "@/dao/room";

type SearchParams = Promise<{
  roomid: string
}>
export default async function Home({
  searchParams
}: {
  searchParams: SearchParams
}) {
  let roomid = (await searchParams)['roomid']

  const shelves = await getRoomWithShelvesById(Number.parseInt(roomid))
  return (
    <>
    <ThreedRoom data={shelves}></ThreedRoom>
    </>
  );
}

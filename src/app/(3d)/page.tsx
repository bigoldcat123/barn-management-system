import { getShelivesByRoomId } from "@/dao/shelf";
import ThreedRoom from "./threed-room";

type SearchParams = Promise<{
  roomid: string
}>
export default async function Home({
  searchParams
}: {
  searchParams: SearchParams
}) {
  let roomid = (await searchParams)['roomid']

  const shelves = await getShelivesByRoomId(Number.parseInt(roomid))

  return (
    <>
    <ThreedRoom data={shelves!}></ThreedRoom>
    </>
  );
}

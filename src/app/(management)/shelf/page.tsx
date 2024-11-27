import { pageShelf } from "@/dao/shelf";
import Image from "next/image";
import ShelfTable from "./components/shelf-table";

export default async function Home({
  searchParams,
}:{
  searchParams: Promise<{
    page?: string;
  }>
}) {
  const params = await searchParams;
   const shelfs = await pageShelf(Number(params.page ?? 1));
  return (
   <>
    <div>
        
        <ShelfTable data={shelfs}/>
    </div>
   </>
  );
}

import { pageShelf } from "@/dao/shelf";
import Image from "next/image";
import ShelfTable from "./components/shelf-table";

export default async function Home() {
   const shelfs = await pageShelf(1,10);
  return (
   <>
    <div>
        
        <ShelfTable data={shelfs}/>
    </div>
   </>
  );
}

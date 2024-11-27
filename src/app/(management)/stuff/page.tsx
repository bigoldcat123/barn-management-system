import { pageStuff } from "@/dao/stuff";
import StuffTable from "./components/stuff-table";

export default async function StuffPage(
  {searchParams}: {
    searchParams: Promise<{
      page?: string;
    }>
  }
) {
  const params = await searchParams;
  const stuffs = await pageStuff(Number(params.page?? 1));

  return (
    <>
      <StuffTable data={stuffs} />
    </>
  );
}
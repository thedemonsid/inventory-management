import { fetchParts } from "@/actions/fecthParts";
import { PartsListPageComponent } from "@/components/parts-list-page";

export default async function Home() {
  const parts = await fetchParts();
  return <PartsListPageComponent parts = {parts.parts}></PartsListPageComponent>;
}

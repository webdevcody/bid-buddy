import { Item } from "@/db/schema";
import { getImageUrl } from "@/util/files";
import Image from "next/image";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">starting price: ${item.startingPrice / 100}</p>
    </div>
  );
}

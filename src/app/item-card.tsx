import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { isBidOver } from "@/util/bids";
import { formatToDollar } from "@/util/currency";
import { getImageUrl } from "@/util/files";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

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
      <p className="text-lg">
        starting price: ${formatToDollar(item.startingPrice)}
      </p>

      {isBidOver(item) ? (
        <p className="text-lg">Bidding is Over</p>
      ) : (
        <p className="text-lg">
          Ends On: {format(item.endDate, "eeee M/dd/yy")}
        </p>
      )}

      <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}

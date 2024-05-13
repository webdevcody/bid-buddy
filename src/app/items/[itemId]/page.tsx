import { createBidAction } from "@/app/items/[itemId]/actions";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { pageTitleStyles } from "@/styles";
import { isBidOver } from "@/util/bids";
import { formatToDollar } from "@/util/currency";
import { getImageUrl } from "@/util/files";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const session = await auth();

  const item = await getItem(parseInt(itemId));

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <Image src="/package.svg" width="200" height="200" alt="Package" />

        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className="text-center">
          The item you&apos;re trying to view is invalid.
          <br />
          Please go back and search for a different auction item.
        </p>

        <Button asChild>
          <Link href={`/`}>View Auctions</Link>
        </Button>
      </div>
    );
  }

  const allBids = await getBidsForItem(item.id);

  const hasBids = allBids.length > 0;

  const canPlaceBid =
    session && item.userId !== session.user.id && !isBidOver(item);

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <h1 className={pageTitleStyles}>
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          {isBidOver(item) && (
            <Badge className="w-fit" variant="destructive">
              Bidding Over
            </Badge>
          )}

          <Image
            className="rounded-xl"
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
          />
          <div className="text-xl space-y-4">
            <div>
              Current Bid{" "}
              <span className="font-bold">
                ${formatToDollar(item.currentBid)}
              </span>
            </div>
            <div>
              Starting Price of{" "}
              <span className="font-bold">
                ${formatToDollar(item.startingPrice)}
              </span>
            </div>
            <div>
              Bid Interval{" "}
              <span className="font-bold">
                ${formatToDollar(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Current Bids</h2>
            {canPlaceBid && (
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            )}
          </div>

          {hasBids ? (
            <ul className="space-y-4">
              {allBids.map((bid) => (
                <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-bold">
                        ${formatToDollar(bid.amount)}
                      </span>{" "}
                      by <span className="font-bold">{bid.user.name}</span>
                    </div>
                    <div className="">{formatTimestamp(bid.timestamp)}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
              <Image
                src="/package.svg"
                width="200"
                height="200"
                alt="Package"
              />
              <h2 className="text-2xl font-bold">No bids yet</h2>
              {canPlaceBid && (
                <form action={createBidAction.bind(null, item.id)}>
                  <Button>Place a Bid</Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

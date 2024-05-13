import { Item } from "@/db/schema";

export function isBidOver(item: Item) {
  return item.endDate < new Date();
}

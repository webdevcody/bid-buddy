import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("bb_bids", {
  id: serial("id").primaryKey(),
});

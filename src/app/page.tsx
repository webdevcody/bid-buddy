import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}

      {session?.user?.name}

      <form
        action={async (formData: FormData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>

      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}

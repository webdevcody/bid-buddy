"use client";

import { env } from "@/env";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import { useSession } from "next-auth/react";

import { ReactNode } from "react";

export function AppKnockProviders({ children }: { children: ReactNode }) {
  const session = useSession();

  if (!session?.data?.user?.id) {
    return <div>{children}</div>;
  }

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session.data.user.id}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}

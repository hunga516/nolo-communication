"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return <SignUp fallbackRedirectUrl={redirectTo} />;
}

"use client"

import { SignIn } from '@clerk/nextjs'
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const [redirectTo, setRedirectTo] = useState(searchParams.get("redirectTo"));

    return <SignIn fallbackRedirectUrl={redirectTo} />;
}

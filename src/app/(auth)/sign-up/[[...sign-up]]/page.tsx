"use client"

import {SignUp} from '@clerk/nextjs'
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const [redirectTo, setRedirectTo] = useState(searchParams.get("redirectTo"));

    return <SignUp fallbackRedirectUrl={redirectTo} />;
}

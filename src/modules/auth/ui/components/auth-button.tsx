import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

const AuthButton = () => {
    return (
       <>
           <SignedOut>
               <SignInButton mode="modal"></SignInButton>
           </SignedOut>
           <SignedIn>
               <UserButton />
           </SignedIn>
       </>
)
}

export default AuthButton
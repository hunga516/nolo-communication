import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const AuthButton = () => {
  return (
    <>
      <SignedOut>
         <div className="flex items-center gap-2">
             {/*<SignUpButton mode="modal">*/}
             {/*    <Button variant="outline">Đăng ký</Button>*/}
             {/*</SignUpButton>*/}
             <SignInButton mode="modal">
                 <Button variant="default">Đăng nhập</Button>
             </SignInButton>
         </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default AuthButton;

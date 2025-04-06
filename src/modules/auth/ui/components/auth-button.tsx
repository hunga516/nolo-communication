import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

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
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              href="/studio"
              label="NOLO Studio"
              labelIcon={<Clapperboard className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </>
  );
};

export default AuthButton;

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";

export default function AppBar() {
  return (
    <div className="flex justify-between p-4 border-b">
      <div className="text-xl">nano PhotoAI</div>
      <div>
        <SignedOut>
          <Button variant={"outline"}>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

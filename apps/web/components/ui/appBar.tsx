import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { FlameKindlingIcon } from "lucide-react";

export default function AppBar() {
  return (
    <div className="flex justify-between p-4 border-b mx-10 border my-5 rounded-xl">
      <div className="text-xl"><span className="text-sm">nano</span>PhotoAI</div>
      <div>
        <SignedOut>
          <Button variant="outline" asChild>
            <SignInButton mode="modal">
            </SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

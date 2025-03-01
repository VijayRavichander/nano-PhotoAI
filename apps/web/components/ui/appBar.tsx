"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "./button";
import { FlameKindlingIcon, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL, STRIPE_PAYMENT_LINK } from "@/config";

interface User {
  id: string;
  email: string;
  credits: number;
}

export default function AppBar() {
  const { getToken } = useAuth();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = await getToken();
      if (token) {
        const res = await axios.get(`${BACKEND_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoading(true);
        setUser(res.data.user);
      }
    };

    getUser();
  }, []);

  const handleBuyClick = () => {
    if (user) {
      const url = `${STRIPE_PAYMENT_LINK}?prefilled_email=` + user.email;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex justify-between p-4 border-b mx-10 border my-5 rounded-xl">
      <div className="text-xl">
        <span className="text-sm">nano</span>PhotoAI
      </div>
      <div>
        <SignedOut>
          <Button variant="outline" asChild>
            <SignInButton mode="modal"></SignInButton>
          </Button>
        </SignedOut>
        <div className="flex items-center justify-between gap-6">
          <SignedIn>
            {user ? (
              <Button variant={"outline"} onClick={handleBuyClick}>
                <div className="flex text-sm gap-2 text-center items-center">
                  <PlusCircle className="w-4 h-4" />
                  {user?.credits > 0 ? (
                    <div>{(user.credits / 100).toFixed(2)} credits</div>
                  ) : (
                    <div>Get Credits</div>
                  )}
                </div>
              </Button>
            ) : (
              <div></div>
            )}
            <div>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

import { SignIn, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {EmblaCarousel} from './ImageCarousel'


export const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-center text-white overflow-hidden">
      {/* Top Two Items  */}
      <div className="flex items-center justify-center gap-4 my-6 ">
        <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium flex items-center gap-2 border border-purple-500/20">
          <Sparkles className="w-4 h-4" />
          AI Potrait Generation
        </span>
        <span className="px-4 py-2 rounded-full bg-blue-500/10 text-purple-300 text-sm font-medium flex items-center gap-2 border border-purple-500/20">
          <Zap className="w-4 h-4" />
          Powered by Fal.ai
        </span>
      </div>
      {/* Heading  */}

      <h1 className="text-4xl sm:text-5xl md:text-3xl lg:text-5xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
        Unleash Your Imagination <br></br>
      </h1>
      <span className="text-4xl sm:text-5xl md:text-3xl lg:text-5xl bg-gradient-to-r from-blue-400  to-purple-500 bg-clip-text text-transparent">
        AI Magic
      </span>

      <div className="flex justify-center items-center gap-4 my-8">
        <SignedOut>
          <Button
            asChild
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-900 hover:to-purple-900 text-xl hover:text-2xl hover:px-10 hover:py-8 hover: text-primary"
          >
            <SignInButton mode="modal">
              <span className="text-xl font-bold">
                Start Your's Today <ArrowRight className="ml-2" />
              </span>
            </SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
            className="px-8 py-6 bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-900 hover:to-purple-900 text-xl hover:text-2xl text-primary hover:shadow-xl hover:-translate-y-1"
          >
            Dashboard
            <ArrowRight className="ml-2" />
          </Button>
        </SignedIn>
      </div>
      <div className="">
        <EmblaCarousel />
      </div>
    </div>
  );
};

export default Hero;

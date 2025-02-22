"use client"
import Generate from "@/components/Generate";
import Pack from "@/components/Packs";
import Train from "@/components/Train";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Gallery from "@/components/Gallery";
// const Gallery = dynamic(() => import('../../components/Gallery'), { ssr: false })

export default function Page() {

  const {getToken} = useAuth();
  const router = useRouter();

  useEffect(() => {

    const isAuthenticated = async () => {

      const token = await getToken();
      if(!token){
        router.push("/")
      }
    }
    isAuthenticated()

  }, [])

  return (
    <div className="mx-10 px-4 py-12 min-h-screen">
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 rounded-lg p-2 bg-muted/20">
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span className="hidden sm:inline">Gallery</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="generate"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v3" />
                <path d="M18.5 5.5 16 8" />
                <path d="M21 12h-3" />
                <path d="M18.5 18.5 16 16" />
                <path d="M12 21v-3" />
                <path d="M5.5 18.5 8 16" />
                <path d="M3 12h3" />
                <path d="M5.5 5.5 8 8" />
              </svg>
              <span className="hidden sm:inline">Generate</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="packs"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span className="hidden sm:inline">Packs</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="train"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
              <span className="hidden sm:inline">Train</span>
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>
                All your magic exist here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Gallery />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Generate />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packs">
          <Card>
            <CardHeader>
              <CardTitle>Packs</CardTitle>
              <CardDescription>
                Generate a set of images using existings packs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Pack />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="train">
          <Card>
            <CardHeader>
              <CardTitle>Train your Model</CardTitle>
              <CardDescription>
                Elevate your creative projects by training a personalized AI
                model using your own photos. This tailored model will generate
                unique content that reflects your distinct style and vision,
                ensuring your creations are truly one-of-a-kind.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Train />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

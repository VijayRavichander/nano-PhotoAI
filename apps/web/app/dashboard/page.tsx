import Generate from "@/components/Generate";
import Train from "@/components/Train";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="mx-10 px-4 py-24 min-h-screen">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 rounded-lg p-2 bg-muted/20">
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            Gallery
          </TabsTrigger>
          <TabsTrigger
            value="generate"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            Generate
          </TabsTrigger>
          <TabsTrigger
            value="packs"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            Packs
          </TabsTrigger>
          <TabsTrigger
            value="train"
            className="data-[state=active]:bg-blue-200 data-[state=active]:text-primary-foreground"
          >
            Train
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Generate/>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packs">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
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
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

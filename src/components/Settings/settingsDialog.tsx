import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import { BasicIcons } from "@/utils/BasicIcons";
import BackgroundChange from "./backgroundChange";

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{BasicIcons.settings}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your experience in the studio
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="background">
          <div className="flex gap-4">
            <TabsList className="flex flex-col justify-start bg-transparent items-start">
              <TabsTrigger value="background">Background</TabsTrigger>
              <TabsTrigger value="general">Record</TabsTrigger>
            </TabsList>
            <TabsContent value="general"></TabsContent>
            <TabsContent value="background">
              <BackgroundChange />
            </TabsContent>
          </div>
        </Tabs>
        <DialogFooter>
          <Button type="submit">Save All Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

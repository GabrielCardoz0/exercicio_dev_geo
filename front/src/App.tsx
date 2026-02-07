import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Map as MapIcon } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import Map from "./components/Map";
import SavePointsList from "./components/SavePointsList";
import { useState } from "react";

export default function App() {
  const [savePoints] = useState([]);
  const [selectedSavePointId] = useState<number | null>(null);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar className="border-r border-border flex flex-col" collapsible="offcanvas">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">GeoMap</h2>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 pb-3 flex-1">
            <SavePointsList features={savePoints} onSelect={console.log} onRemove={console.log} selectedId={selectedSavePointId} />
          </SidebarContent>
          <UserAvatar />
        </Sidebar>

        <main className="w-full">
          <SidebarTrigger className="relative z-1 top-2 ml-2" variant={"outline"}/>
          <Map/>
        </main>
      </div>
    </SidebarProvider>
  );
};
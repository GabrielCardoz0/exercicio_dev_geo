import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Map as MapIcon } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import Map from "../components/Map";
import SavePointsList from "../components/SavePointsList";
import { useEffect, useRef, useState } from "react";
import AreaInfo from "../components/AreaInfo";
import type { IMarker, ResourceFeature } from "../assets/interfaces";
import { deleteMarker, getMarkers } from "@/lib/api";
import { Marker } from 'mapbox-gl'
import { toast } from "sonner";
import MarkerInfoPopup from "@/components/MarkerInfoPopup";
import { createMarker, createPopup, createReactDOMContainer } from "@/helpers/map.helpers";

export default function GeoMap() {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [selectedMarkerId] = useState<number | null>(null);
  const [polygonArea, setPolygonArea] = useState<ResourceFeature[]>([]);
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<IMarker[]>([])

  useEffect(() => {
    const fetchMarkers = async () => {
      const data = await getMarkers();
      setMarkers(data)
      markersRef.current = data
    }
    fetchMarkers();
  }, [])

  const handleDeleteMarker = async (markerId: number, marker: Marker) => {
    try {
      await deleteMarker(markerId)
      marker.remove()
      setMarkers(prev => prev.filter(item => item.id !== markerId))
      toast.info('Marcador removido com sucesso!')
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível remover o marcador.')
    }
  }

  const handleAddMarker = async (marker: IMarker, map: mapboxgl.Map) => {
    const popupCustomElement = createReactDOMContainer(
      <MarkerInfoPopup marker={marker} onDelete={() => handleDeleteMarker(marker.id, newMarker)} />
    )
    const popup = createPopup().setDOMContent(popupCustomElement)
    const newMarker = createMarker({ lngLat: [ marker.lon, marker.lat ], map }).setPopup(popup)
  }

  const handleFly = ({ lon, lat }: { lon: number, lat: number }) => {
    mapRef.current!.flyTo({
      center: [lon, lat],
      zoom: 15,
      duration: 800,
    })
  }

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
            <SavePointsList
              markers={markers}
              onSelect={handleFly}
              selectedId={selectedMarkerId}
            />
            <AreaInfo features={polygonArea} />
          </SidebarContent>
          <UserAvatar />
        </Sidebar>

        <main className="w-full">
          <SidebarTrigger className="relative z-1 top-2 ml-2" variant={"outline"}/>
          <Map
            setPolygonArea={setPolygonArea}
            mapRef={mapRef}
            markers={markersRef}
            setMarkers={setMarkers}
            handleAddMarker={handleAddMarker}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};
import { createMarker, getInfoFromOpenStreetMap, getResourcesData } from '@/lib/api'
import { MAPBOX_API_KEY } from '@/variables'
import type { IMarker, ResourceFeature, ResourceFeatureCollection } from '@/assets/interfaces'
import type { DrawCreateEvent, DrawUpdateEvent, DrawDeleteEvent } from '@mapbox/mapbox-gl-draw'
import MapPopup from './MapPopup'
import NewMarkerPopup from './NewMarkerPopup'
import { createRoot } from "react-dom/client"
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Feature, Polygon } from 'geojson'
import { toast } from 'sonner'

interface MapProps {
  //eslint-disable-next-line
  setPolygonArea: (data: any) => void
  mapRef: React.RefObject<mapboxgl.Map | null>
  markers: React.RefObject<IMarker[]>
  handleAddMarker: (marker: IMarker, map: mapboxgl.Map) => Promise<void>
  setMarkers: Dispatch<SetStateAction<IMarker[]>>
}

const createMapPopup = ({ lngLat, map, popupNode }:{ lngLat: [number, number], popupNode: HTMLElement, map: mapboxgl.Map }) => {
  return new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    offset: 10,
    closeOnMove: true
  })
  .setLngLat(lngLat)
  .setDOMContent(popupNode)
  .addTo(map)
}

const addStoreLayer = (map: mapboxgl.Map) => {
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'stores',
    paint: {
      'circle-radius': 3,
      'circle-color': '#0088ff',
      'circle-opacity': 0.4,
    },
  })
}

const addPointerCursor = (map: mapboxgl.Map) => {
  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = ''
  })
}

export default function Map({ setPolygonArea, mapRef, markers, handleAddMarker, setMarkers }: MapProps) {
  const drawRef = useRef<MapboxDraw | null>(null)
  const storesRef = useRef<ResourceFeatureCollection | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  
  const openNewMarkerPopup = async (e: DrawCreateEvent, map: mapboxgl.Map) => {
    const feature = e.features[0]
    if (feature.geometry.type !== 'Point') return
  
    const [lon, lat] = feature.geometry.coordinates as [number, number]
    const osmData = await getInfoFromOpenStreetMap({ lat, lon })
  
    popupRef.current?.remove()
  
    const popupNode = document.createElement('div')
    popupRef.current = createMapPopup({
      lngLat: [lon, lat],
      map,
      popupNode,
    })
  
    const root = createRoot(popupNode)

    const cleanup = () => {
      drawRef.current?.delete(String(feature.id))
      popupRef.current?.remove()
    }

    const onSave = async () => {
      try {
        const payload = {
          lat: lat,
          lon: lon,
          display_name: osmData.display_name,
          place_id: osmData.place_id,
          address: osmData.address
            ? {
                building: osmData.address.building,
                city: osmData.address.city ?? osmData.address.town,
                state: osmData.address.state,
                country: osmData.address.country,
                postcode: osmData.address.postcode,
              }
            : undefined,
        }
    
        const { marker } = await createMarker(payload)

        cleanup()

        handleAddMarker(marker, map)
        setMarkers(prev => prev.concat(marker))
      } catch (error) {
        console.error(error)
        toast.error('Não foi possível adicionar o marcador.')
      }
    }
    
    root.render(<NewMarkerPopup feature={osmData} onCancel={cleanup} onSave={onSave}/>
    )
  }

  const handlePolygonChange = () => {
    if (!drawRef.current || !storesRef.current) return
  
    const { features } = drawRef.current.getAll()
    const polygons = features.filter(
      f => f.geometry.type === 'Polygon'
    )
  
    if (!polygons.length) return setPolygonArea([])
  
    if (polygons.length > 1) {
      drawRef.current.delete(String(polygons[0].id))
    }
  
    const pointsInside = turf.pointsWithinPolygon(
      storesRef.current,
      polygons.at(-1) as Feature<Polygon>
    )
  
    setPolygonArea(pointsInside.features)
  }

  const handleDrawEvent = (e: DrawCreateEvent | DrawUpdateEvent | DrawDeleteEvent, map: mapboxgl.Map) => {
    if (e.type === 'draw.create' && e.features[0].geometry.type === 'Point') {
      return openNewMarkerPopup(e, map)
    }
  
    if (e.type === 'draw.delete') {
      return setPolygonArea([])
    }
  
    handlePolygonChange()
  }

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY
  
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-50.55, -20.27],
      zoom: 15,
    })
  
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        point: true,
      },
    })
  
    mapRef.current = map
    drawRef.current = draw
  
    map.addControl(draw)
  
    map.on('draw.create', e => handleDrawEvent(e, map))
    map.on('draw.update', e => handleDrawEvent(e, map))
    map.on('draw.delete', e => handleDrawEvent(e, map))
  
    map.on('load', async () => {
      storesRef.current = await getResourcesData()
  
      map
      .addSource('stores', {
        type: 'geojson',
        data: storesRef.current,
        cluster: true,
        clusterMaxZoom: 15,
        clusterRadius: 20,
      })
      .on('click', 'unclustered-point', (e) => {
        const feature = e.features?.[0] as ResourceFeature | undefined
        if (!feature) return
        popupRef.current?.remove()
        const popupNode = document.createElement("div")
        popupRef.current = createMapPopup({ lngLat: feature.geometry.coordinates, map: mapRef.current!, popupNode })
        const root = createRoot(popupNode)
        root.render(<MapPopup feature={feature} />)
      })
      addStoreLayer(map)
      addPointerCursor(map)

      markers.current.forEach(marker => handleAddMarker(marker, map));
    })
  
    return () => map.remove()
  }, [])
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  )
}
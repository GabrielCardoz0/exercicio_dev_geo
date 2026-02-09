import { createMarkerApi, getInfoFromOpenStreetMap, getResourcesData } from '@/lib/api'
import type { IMarker, ResourceFeatureCollection } from '@/assets/interfaces'
import type { DrawCreateEvent, DrawUpdateEvent, DrawDeleteEvent } from '@mapbox/mapbox-gl-draw'
import NewMarkerPopup from './NewMarkerPopup'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Feature, Polygon } from 'geojson'
import { toast } from 'sonner'
import { addPointerCursor, addStoreLayer, showPopupOnPointClick } from '@/helpers/map.layers'
import { createMapInstance } from '@/helpers/map.instances'
import { createPopup, createReactDOMContainer } from '@/helpers/map.helpers'

interface MapProps {
  mapRef: React.RefObject<mapboxgl.Map | null>
  markers: React.RefObject<IMarker[]>
  //eslint-disable-next-line
  setPolygonArea: (data: any) => void
  handleAddMarker: (marker: IMarker, map: mapboxgl.Map) => Promise<void>
  setMarkers: Dispatch<SetStateAction<IMarker[]>>
}

export default function Map({ setPolygonArea, mapRef, markers, handleAddMarker, setMarkers }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const drawRef = useRef<MapboxDraw | null>(null)
  const dataRef = useRef<ResourceFeatureCollection | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  
  const handleCleanup = (id: string) => {
    drawRef.current?.delete(id)
    popupRef.current?.remove()
  }

  const handleCreateMarker = async (e: DrawCreateEvent, map: mapboxgl.Map) => {
    const { id, geometry } = e.features[0]

    if (geometry.type !== 'Point') return
  
    const [lon, lat] = geometry.coordinates as [number, number]

    const osmData = await getInfoFromOpenStreetMap({ lat, lon })
  
    popupRef.current?.remove()

    const onSave = async () => {
      try {
        const { marker } = await createMarkerApi({...osmData, lat, lon})
        handleCleanup(String(id))
        handleAddMarker(marker, map)
        setMarkers(prev => prev.concat(marker))
      } catch (error) {
        console.error(error)
        toast.error('Não foi possível adicionar o marcador.')
      }
    }

    popupRef.current = createPopup()
    .setLngLat([lon, lat])
    .setDOMContent(createReactDOMContainer(
      <NewMarkerPopup
        feature={osmData}
        onCancel={() => handleCleanup(String(id))}
        onSave={onSave}
      />
    ))
    .addTo(map)
  }

  const handlePolygonChange = () => {
    if (!drawRef.current || !dataRef.current) return
  
    const { features } = drawRef.current.getAll()
    const polygons = features.filter(
      f => f.geometry.type === 'Polygon'
    )
  
    if (!polygons.length) return setPolygonArea([])
  
    if (polygons.length > 1) {
      drawRef.current.delete(String(polygons[0].id))
    }
  
    const pointsInside = turf.pointsWithinPolygon(
      dataRef.current,
      polygons.at(-1) as Feature<Polygon>
    )
  
    setPolygonArea(pointsInside.features)
  }

  const handleDrawEvent = (e: DrawCreateEvent | DrawUpdateEvent | DrawDeleteEvent, map: mapboxgl.Map) => {
    if (e.type === 'draw.create' && e.features[0].geometry.type === 'Point') {
      return handleCreateMarker(e, map)
    }

    if (e.type === 'draw.delete') {
      return setPolygonArea([])
    }

    handlePolygonChange()
  }

  useEffect(() => {
    const { map, draw } = createMapInstance(mapContainerRef.current!)
  
    mapRef.current = map
    drawRef.current = draw
  
    map
    .on('draw.create', e => handleDrawEvent(e, map))
    .on('draw.update', e => handleDrawEvent(e, map))
    .on('draw.delete', e => handleDrawEvent(e, map))
  
    map.on('load', async () => {
      dataRef.current = await getResourcesData()
  
      map
      .addSource('stores', {
        type: 'geojson',
        data: dataRef.current,
        cluster: true,
        clusterMaxZoom: 15,
        clusterRadius: 20,
      })
      showPopupOnPointClick(map, popupRef)
      addStoreLayer(map)
      addPointerCursor(map)

      markers.current.forEach(marker => handleAddMarker(marker, map))
    })
  
    return () => map.remove()
  }, [])
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  )
}
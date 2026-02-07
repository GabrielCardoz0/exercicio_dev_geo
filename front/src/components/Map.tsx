import { getResourcesData } from '@/lib/api'
import { MAPBOX_API_KEY } from '@/variables'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { ResourceFeature, ResourceFeatureCollection } from '@/assets/interfaces';
import * as turf from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

interface MapProps {
  polygonArea: ResourceFeature[],
  //eslint-disable-next-line
  setPolygonArea: (data: any) => void
}


export default function Map({ setPolygonArea, polygonArea }: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const drawRef = useRef<MapboxDraw | null>(null)
  const storesRef = useRef<ResourceFeatureCollection | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-50.5524199269712, -20.271121926799538],
      zoom: 12.5,
      // style: 'mapbox://styles/mapbox/light-v11'
    })

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        point: true,
      },
      // defaultMode: ''
    })

    const defineArea = (e: { type: 'draw.delete' | 'draw.create' | 'draw.update' }) => {
      if(e.type === 'draw.delete') return setPolygonArea([])

      const drawn = draw.getAll()
      
      if (!storesRef.current) return

      const polygons = drawn.features.filter(feature => feature.geometry.type === 'Polygon')

      if(polygons.length > 1) {
        draw.delete(String(drawn.features[0].id))
      }

      const pointsInside = turf.pointsWithinPolygon(
        storesRef.current,
        // eslint-disable-next-line
        polygons[polygons.length > 1 ? 1 : 0] as any
      )

      setPolygonArea(pointsInside.features)
    }

    mapRef.current = map
    drawRef.current = draw

    mapRef.current
    .addControl(draw)
    .on('draw.create', defineArea)
    .on('draw.delete', defineArea)
    .on('draw.update', defineArea)

    map.on('load', async () => {
      const data = await getResourcesData();
      storesRef.current = data;

      map
      .addSource('stores', {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })
      .addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'stores',
        paint: {
          'circle-radius': 4,
          'circle-color': '#ff0000',
          "circle-opacity": 0.5
        },
      })
      .on('click', 'unclustered-point', (e) => {
        const feature = e.features?.[0] as ResourceFeature | undefined
        
        if (!feature) return
  
        map.flyTo({
          center: feature.geometry.coordinates as [number, number],
          duration: 800,
        })
      })
    })

    return () => map.remove()
  }, [])


  return (

    <div className="absolute top-0 left-0 right-0 bottom-0 flex">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  )
};

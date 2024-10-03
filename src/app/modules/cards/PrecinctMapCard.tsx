'use client'

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import PinDropIcon from '@mui/icons-material/PinDrop';

interface MapProps {
    token: string | undefined;
}

const getAverageLngLat = (coordinates: [number, number][][]) => {
    const areaAverages = coordinates.map(area => {
      const totalLngLat = area.reduce(
        (sum, [lng, lat]) => {
          sum.lng += lng;
          sum.lat += lat;
          return sum;
        },
        { lng: 0, lat: 0 }
      );
      return {
        avgLng: totalLngLat.lng / area.length,
        avgLat: totalLngLat.lat / area.length,
      };
    });
  
    const totalLngLatAverage = areaAverages.reduce(
      (sum, avg) => {
        sum.lng += avg.avgLng;
        sum.lat += avg.avgLat;
        return sum;
      },
      { lng: 0, lat: 0 }
    );
  
    return {
      lng: totalLngLatAverage.lng / areaAverages.length,
      lat: totalLngLatAverage.lat / areaAverages.length,
    };
  };

export default function Map ({ token }: MapProps) {
    const {precinct, coordinates} = useDecisionFlowContext();
    if (!token) {
        alert("Mapbox token is required!");
    }
    const precinctData = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'Polygon',
            coordinates: coordinates,
        }
    } as GeoJSON.Feature<GeoJSON.Polygon>;

    mapboxgl.accessToken = token || '';
    const mapContainer = useRef<HTMLDivElement>(null);
    const { lng, lat } = getAverageLngLat(coordinates);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: 3,
                interactive: false,
                attributionControl: false,
            });
    
            map.on('load', function () {
    
                // Add GeoJSON source
                map.addSource('precinct', {
                    type: 'geojson',
                    data: precinctData,
                });
    
                // Add a new layer to visualize the polygon
                map.addLayer({
                    'id': 'precinct-fill',
                    'type': 'fill',
                    'source': 'precinct',
                    'layout': {},
                    'paint': {
                        'fill-color': '#0080ff', // Blue color
                        'fill-opacity': 0.5
                    }
                });
    
                // Add a black outline around the polygon
                map.addLayer({
                    'id': 'precinct-outline',
                    'type': 'line',
                    'source': 'precinct',
                    'layout': {},
                    'paint': {
                        'line-color': '#000',
                        'line-width': 3
                    }
                });
    
                // Fit the map to the precinct bounds
                const bounds = new mapboxgl.LngLatBounds();
                precinctData.geometry.coordinates[0].forEach((coord) => {
                    bounds.extend(coord as [number, number]);
                });
                map.fitBounds(bounds, { padding: 20 });
            });
    
            return () => map.remove();
        }
    }, [lng, lat, precinct]);

    return (
        <div className="flex flex-col w-full max-w-[750px] md:px-16 px-8">
            <div ref={mapContainer} className="bg-clip-border border mapbox z-[-1] absolute rounded-lg border"></div>
            <div className="flex px-4 py-3 bg-background-white rounded-lg border border-border-primary items-center gap-4">
                <PinDropIcon />
                <div className="flex flex-col gap-1">
                    <p className="text-subtitle">Precinct {precinct}</p>
                    <p className="text-sec text-text-secondary">Washington</p>
                </div>
            </div>
        </div>
    );
}
'use client'

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";

/** Default coordinates: for this really cool university */
const defaultCoords: number[] = [-122.3076595, 47.654538];

interface MapProps {
    token: string | undefined;
}

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
    const searchParams = useSearchParams()!;
    const lng = parseFloat(searchParams.get('lng') || `${defaultCoords[0]}`);
    const lat = parseFloat(searchParams.get('lat') || `${defaultCoords[1]}`);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: 3,
                interactive: false
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
    
                // Add marker at the center (if needed)
                new mapboxgl.Marker({
                    color: "#e95635",
                    draggable: false,
                })
                .setLngLat([lng, lat])
                .addTo(map);
            });
    
            return () => map.remove();
        }
    }, [lng, lat, precinct]);

    return (
        <div>
            <p>Washington State Precinct {precinct}</p>
            <div ref={mapContainer} style={{ }} 
                className="bg-clip-border border mapbox">
            </div>
        </div>
    );
}
'use client'

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useDecisionFlowContext } from "@/context/DecisionFlowContext";
import { useMasterContext } from "@/context/MasterContext";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function Map({ token }: MapProps) {
    const { precinct, coordinates } = useDecisionFlowContext();
    const { isDesktop } = useMasterContext();
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

    if (isDesktop) {
        return (
            <div>
                <div ref={mapContainer} style={{ width: "516px", height: "326px" }}
                    className="bg-clip-border border mapbox rounded-md">
                </div>
                <div className="flex items-center justify-between font-bold text-sm border border-gray-300 rounded-sm px-2 py-3">
                    <div className="flex items-center">
                        <MyLocationIcon style={{ width: "20px", color: "#947FEEE5" }} />&nbsp;
                        &nbsp;Washington State Precinct {precinct}
                    </div>
                    <Link href="/"><Button>Change Location</Button></Link>
                </div>
            </div>
        );

    }

    return (
        <div>
            <div className="flex items-center font-bold text-sm">
                <MyLocationIcon style={{ width: "20px", color: "#947FEEE5" }} />
                &nbsp;Washington State Precinct {precinct}&nbsp;
            </div>
            <div ref={mapContainer} style={{}}
                className="bg-clip-border border mapbox">
            </div>
        </div>
    );
}
'use client'

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, memo } from "react";
import { useMasterContext } from "@/context/MasterContext";
import PlaceIcon from '@mui/icons-material/Place';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocationContext } from "@/context/LocationContext";
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

const PrecinctMapCard: React.FC<MapProps> = memo(({ token }) => {
    const { precinct, coordinates } = useLocationContext();
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
    }, [lng, lat, precinctData]);

    if (isDesktop) {
        return (
            <div style={{ width: '100%' }}>
            <div
                ref={mapContainer}
                style={{ width: '100%', height: '326px' }}
                className="bg-clip-border border mapbox rounded-md"
            ></div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <PlaceIcon style={{ width: '20px', color: '#947FEEE5' }} />
                <p style={{ color: '#4B5563', paddingLeft: '0.25rem' }}>
                Washington State Precinct {precinct}
                </p>
            </div>
            {/* TODO: a little too  confusing for the time being */}
            {/* <Link href="/">
                <Button>Change Location</Button>
            </Link> */}
            </div>
        );

    }

    return (
        <div className="flex flex-col w-full justify-center">
            <div ref={mapContainer} className="bg-clip-border border mapbox z-[-1] absolute border"></div>
            <div className="px-2">
                <div className="flex px-4 py-3 bg-background-white rounded-lg border border-border-primary items-center gap-4">
                    <PinDropIcon />
                    <div className="flex flex-col gap-1">
                        <p className="text-subtitle">Precinct {precinct}</p>
                        <p className="text-sec text-text-secondary">Washington</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

PrecinctMapCard.displayName = 'PrecinctMapCard';
export default PrecinctMapCard;
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  className?: string;
}

export default function Map({ 
  initialCenter = [-0.1276, 51.5074],
  initialZoom = 12,
  className = ''
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
      setTimeout(() => map.current?.resize(), 100);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div 
      className={className}
      style={{ 
        position: 'relative',
        width: '100%', 
        height: '100%',
        minHeight: '400px' // Add minimum height
      }}
    >
      <div 
        ref={mapContainer} 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />

      {!mapLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(246, 241, 235, 0.8)',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '4px solid #353535',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              margin: '0 auto 8px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p>Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
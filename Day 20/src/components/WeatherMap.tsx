import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, Zap } from 'lucide-react';

// Map component - interactive weather map ke liye
// Leaflet use kar rahe hain instead of Google Maps, free hai aur better hai
interface WeatherMapProps {
  center?: [number, number];
  apiKey?: string;
  onLocationSelect?: (lat: number, lon: number, name: string) => void;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ 
  center = [28.6139, 77.2090], // Delhi ke coordinates default main
  apiKey,
  onLocationSelect 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const weatherLayersRef = useRef<{[key: string]: any}>({});

  useEffect(() => {
    // Map initialization - yahan dynamic import kar rahe hain leaflet ka
    // Bundle size kam rakhne ke liye, performance better hai
    const initializeMap = async () => {
      try {
        // Leaflet ko dynamically import kar rahe hain
        // CDN se load karne se better hai, version control bhi hai
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');

        if (!mapContainer.current || mapRef.current) return;

        // Map create kar rahe hain
        const map = L.map(mapContainer.current).setView(center, 10);

        // OpenStreetMap tiles add kar rahe hain
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Weather overlay add karna hai agar API key hai
        if (apiKey) {
          // Clouds layer - initially hidden
          weatherLayersRef.current.clouds = L.tileLayer(
            `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            attribution: '© OpenWeatherMap',
            opacity: 0.6
          });

          // Temperature layer - initially hidden  
          weatherLayersRef.current.temp = L.tileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            attribution: '© OpenWeatherMap',
            opacity: 0.6
          });

          // Precipitation layer - initially hidden
          weatherLayersRef.current.precipitation = L.tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            attribution: '© OpenWeatherMap',
            opacity: 0.6
          });
        }

        // Location marker add kar rahe hain
        const marker = L.marker(center).addTo(map)
          .bindPopup('Current Location')
          .openPopup();

        // Click event handle karna - jahan user click kare wahan weather data fetch karna
        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          
          // Previous marker remove kar rahe hain
          map.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
              map.removeLayer(layer);
            }
          });
          
          // New marker add kar rahe hain
          L.marker([lat, lng]).addTo(map)
            .bindPopup(`Selected: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
          
          // Parent component ko notify kar rahe hain - location name bhi pass kar rahe hain
          onLocationSelect?.(lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        });

        mapRef.current = map;

        // Custom control buttons add karne ke liye - weather layers toggle karne ke liye
        const customControl = L.Control.extend({
          onAdd: function() {
            const container = L.DomUtil.create('div', 'leaflet-control-custom');
            container.innerHTML = `
              <div style="background: white; padding: 8px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Weather Layers</div>
                <button id="clouds-btn" style="margin: 2px; padding: 4px 8px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">☁️ Clouds</button>
                <button id="temp-btn" style="margin: 2px; padding: 4px 8px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">🌡️ Temp</button>
                <button id="rain-btn" style="margin: 2px; padding: 4px 8px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">🌧️ Rain</button>
              </div>
            `;
            
            // Button click handlers add kar rahe hain - ye important part tha jo missing tha
            L.DomEvent.disableClickPropagation(container);
            
            return container;
          }
        });

        // Control add kar rahe hain map main
        new customControl({ position: 'topright' }).addTo(map);

        // Button event listeners add karne ke liye - DOM ready hone ka wait karna
        setTimeout(() => {
          const cloudsBtn = document.getElementById('clouds-btn');
          const tempBtn = document.getElementById('temp-btn');
          const rainBtn = document.getElementById('rain-btn');

          if (cloudsBtn && apiKey) {
            cloudsBtn.addEventListener('click', () => {
              if (map.hasLayer(weatherLayersRef.current.clouds)) {
                map.removeLayer(weatherLayersRef.current.clouds);
                cloudsBtn.style.background = 'white';
                cloudsBtn.style.color = 'black';
              } else {
                weatherLayersRef.current.clouds.addTo(map);
                cloudsBtn.style.background = '#3b82f6';
                cloudsBtn.style.color = 'white';
              }
            });
          }

          if (tempBtn && apiKey) {
            tempBtn.addEventListener('click', () => {
              if (map.hasLayer(weatherLayersRef.current.temp)) {
                map.removeLayer(weatherLayersRef.current.temp);
                tempBtn.style.background = 'white';
                tempBtn.style.color = 'black';
              } else {
                weatherLayersRef.current.temp.addTo(map);
                tempBtn.style.background = '#f59e0b';
                tempBtn.style.color = 'white';
              }
            });
          }

          if (rainBtn && apiKey) {
            rainBtn.addEventListener('click', () => {
              if (map.hasLayer(weatherLayersRef.current.precipitation)) {
                map.removeLayer(weatherLayersRef.current.precipitation);
                rainBtn.style.background = 'white';
                rainBtn.style.color = 'black';
              } else {
                weatherLayersRef.current.precipitation.addTo(map);
                rainBtn.style.background = '#06b6d4';
                rainBtn.style.color = 'white';
              }
            });
          }
        }, 100); // Small delay to ensure DOM is ready

      } catch (error) {
        console.error('Map initialization failed:', error);
      }
    };

    initializeMap();

    // Cleanup function - memory leaks prevent karne ke liye
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      // Weather layers bhi clear kar rahe hain
      weatherLayersRef.current = {};
    };
  }, [center, apiKey, onLocationSelect]);

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Interactive Weather Map</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              Toggle Layers
            </Button>
            <div className="text-xs text-muted-foreground">
              Use buttons on map to toggle weather layers
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Click anywhere on the map to get weather data • Use layer buttons to view clouds, temperature, and precipitation
        </p>
      </div>
      
      {/* Map container - yahan actual map render hoga */}
      <div 
        ref={mapContainer} 
        className="h-[400px] w-full relative"
        style={{ background: '#f0f9ff' }}
      />
      
      {/* Map loading state agar API key nahi hai */}
      {!apiKey && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Weather Map Ready</h4>
            <p className="text-sm text-muted-foreground">
              Add your OpenWeatherMap API key to see weather layers
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default WeatherMap;
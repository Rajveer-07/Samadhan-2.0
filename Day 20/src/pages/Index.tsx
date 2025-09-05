import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import WeatherMap from '@/components/WeatherMap';
import SearchBar from '@/components/SearchBar';
import useWeatherAPI from '@/hooks/useWeatherAPI';
import useGeolocation from '@/hooks/useGeolocation';
import { 
  Cloud, 
  MapPin, 
  Key, 
  AlertCircle, 
  CheckCircle,
  Sun,
  CloudRain
} from 'lucide-react';

// Main page component - yahan sab kuch together aata hai
// Weather card, forecast, map sab yahan handle kar rahe hain
const Index = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number; name: string } | null>(null);
  
  // Custom hooks use kar rahe hain weather data aur geolocation ke liye
  // Clean architecture hai, separation of concerns follow kiya hai
  const { 
    currentWeather, 
    forecast, 
    loading: weatherLoading, 
    error: weatherError, 
    fetchWeatherByCoordinates 
  } = useWeatherAPI(apiKey);
  
  const { 
    latitude, 
    longitude, 
    error: locationError, 
    loading: locationLoading, 
    getCurrentLocation 
  } = useGeolocation();

  // API key localStorage se load karna
  // Security ke liye local storage use kar rahe hain, server pe store nahi kar rahe
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openweather-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  // Geolocation success ke baad weather fetch karna
  // Automatic location detection hai, user ko manually search nahi karna padega
  useEffect(() => {
    if (latitude && longitude && apiKey) {
      fetchWeatherByCoordinates(latitude, longitude);
      setSelectedLocation({ lat: latitude, lon: longitude, name: 'Your Location' });
    }
  }, [latitude, longitude, apiKey, fetchWeatherByCoordinates]);

  // API key save karne ka function
  // Validation bhi kar rahe hain ki empty key save na ho jaye
  const handleApiKeySave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openweather-api-key', apiKey.trim());
      setShowApiKeyInput(false);
      // Agar location already hai to weather fetch kar rahe hain
      if (latitude && longitude) {
        fetchWeatherByCoordinates(latitude, longitude);
      }
    }
  };

  // Location select handler - map ya search se
  // Multiple sources se location aa sakti hai, unified handler banaya hai
  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    setSelectedLocation({ lat, lon, name });
    if (apiKey) {
      fetchWeatherByCoordinates(lat, lon);
    }
  };

  // Current location button handler
  // Error handling bhi hai agar location permission nahi mili
  const handleCurrentLocationClick = () => {
    if (!apiKey) {
      alert('Please add your API key first!'); // Simple alert, toast use kar sakte the but simple rakhа
      return;
    }
    getCurrentLocation();
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header section - app ka naam aur branding */}
      {/* Gradient text use kiya hai, looks professional */}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sun className="h-8 w-8 text-weather-sunny float-animation" />
              <CloudRain className="h-6 w-6 text-weather-rainy absolute -top-1 -right-1 opacity-70" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WeatherVision
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive weather companion with live forecasts, interactive maps, and detailed insights
          </p>
        </header>

        {/* API Key input section - agar user ne API key nahi dali hai */}
        {/* Security note bhi diya hai ki data safe hai */}
        {showApiKeyInput && (
          <Card className="max-w-2xl mx-auto mb-8 bg-card/80 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Setup Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To use live weather data, please add your OpenWeatherMap API key. 
                Get your free API key from{' '}
                <a 
                  href="https://home.openweathermap.org/subscriptions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  OpenWeatherMap
                </a>
              </p>
              
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Enter your OpenWeatherMap API key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApiKeySave} disabled={!apiKey.trim()}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                💡 Your API key is stored locally and never shared with anyone
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search bar - location search karne ke liye */}
        {/* Clean UI hai, autocomplete aur recent searches bhi hai */}
        {!showApiKeyInput && (
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              onLocationSelect={handleLocationSelect}
              onCurrentLocation={handleCurrentLocationClick}
              isLoading={locationLoading}
              apiKey={apiKey}
            />
          </div>
        )}

        {/* Error messages - agar koi error hai to display karna */}
        {/* User-friendly error messages diye hain */}
        {(weatherError || locationError) && (
          <Alert className="max-w-2xl mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {weatherError || locationError}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading state - jab data fetch ho raha hai */}
        {/* Animated loading hai, boring spinner nahi */}
        {(weatherLoading || locationLoading) && (
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <div className="weather-pulse">
              <Cloud className="h-12 w-12 mx-auto text-primary mb-4" />
              <p className="text-muted-foreground">
                {locationLoading ? 'Getting your location...' : 'Fetching weather data...'}
              </p>
            </div>
          </div>
        )}

        {/* Main weather display - current weather aur forecast */}
        {/* Responsive grid use kiya hai, mobile pe bhi looks good */}
        {currentWeather && !showApiKeyInput && (
          <div className="space-y-8">
            {/* Current weather card */}
            {/* Hero section hai ye, sabse important part */}
            <div className="max-w-2xl mx-auto">
              <WeatherCard weather={currentWeather} />
            </div>

            {/* 5-day forecast grid */}
            {/* Cards layout use kiya hai, looks clean */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {forecast.map((day, index) => (
                  <ForecastCard key={index} forecast={day} />
                ))}
              </div>
            </div>

            {/* Interactive weather map */}
            {/* Leaflet map hai, click karke location select kar sakte hain */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
                Interactive Weather Map
              </h2>
              <div className="max-w-6xl mx-auto">
                <WeatherMap
                  center={selectedLocation ? [selectedLocation.lat, selectedLocation.lon] : undefined}
                  apiKey={apiKey}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            </div>

            {/* Current location info - agar location select ki hai */}
            {/* Badge use kiya hai, minimal but informative */}
            {selectedLocation && (
              <div className="text-center">
                <Badge variant="outline" className="bg-card/80 text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  Showing weather for {selectedLocation.name}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Demo state - agar API key nahi hai to demo dikhana */}
        {/* Feature showcase kar rahe hain, marketing bhi ho jaata hai */}
        {showApiKeyInput && (
          <div className="text-center space-y-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="weather-card weather-gradient-clear border-0 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Live Weather Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <Sun className="h-12 w-12 mb-4 float-animation" />
                  <p className="text-white/80">Real-time weather conditions</p>
                </CardContent>
              </Card>
              
              <Card className="weather-card weather-gradient-cloudy border-0 text-white">
                <CardHeader>
                  <CardTitle className="text-white">5-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <Cloud className="h-12 w-12 mb-4 float-animation" />
                  <p className="text-white/80">Detailed weather predictions</p>
                </CardContent>
              </Card>
              
              <Card className="weather-card weather-gradient-rainy border-0 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Interactive Maps</CardTitle>
                </CardHeader>
                <CardContent>
                  <MapPin className="h-12 w-12 mb-4 float-animation" />
                  <p className="text-white/80">Weather visualization layers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        {/* Simple footer hai, branding ke liye */}
        <footer className="text-center mt-16 text-muted-foreground">
          <p className="text-sm">
            Powered by OpenWeatherMap API • Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

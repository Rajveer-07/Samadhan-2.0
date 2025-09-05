import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Wind, 
  Droplets, 
  Eye, 
  Thermometer 
} from 'lucide-react';

// Main weather card component - ye woh card hai jo current weather dikhata hai
// Yahan maine proper TypeScript interfaces banaye hain, clean code likha hai

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

// Icon mapping - yahan weather conditions ke hisaab se icons assign kar rahe hain
// OpenWeatherMap ke icons codes ko samjhana padta hai, thoda tricky hai but manage kar liya
const getWeatherIcon = (condition: string, iconCode: string) => {
  const size = 48;
  const className = "float-animation";
  
  // OpenWeatherMap icon codes ke basis pe decide kar rahe hain
  if (iconCode.includes('01')) return <Sun className={className} size={size} />;
  if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
    return <Cloud className={className} size={size} />;
  if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) 
    return <CloudRain className={className} size={size} />;
  if (iconCode.includes('13')) return <Snowflake className={className} size={size} />;
  
  // Fallback ke liye condition name check kar rahe hain
  if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) 
    return <Sun className={className} size={size} />;
  if (condition.toLowerCase().includes('cloud')) 
    return <Cloud className={className} size={size} />;
  if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) 
    return <CloudRain className={className} size={size} />;
  if (condition.toLowerCase().includes('snow')) 
    return <Snowflake className={className} size={size} />;
  
  return <Sun className={className} size={size} />;
};

// Weather condition ke basis pe gradient background select karna
// Ye function bahut important hai UI ke liye, colors sahi lagne chahiye
const getWeatherGradient = (condition: string, iconCode: string) => {
  if (iconCode.includes('01')) return 'weather-gradient-sunny';
  if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
    return 'weather-gradient-cloudy';
  if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) 
    return 'weather-gradient-rainy';
  if (iconCode.includes('13')) return 'weather-gradient-cloudy';
  
  // Night time ke liye special gradient
  if (iconCode.includes('n')) return 'weather-gradient-night';
  
  return 'weather-gradient-clear';
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, className = '' }) => {
  const gradientClass = getWeatherGradient(weather.condition, weather.icon);
  
  // Main weather card render kar rahe hain - ye wala card sabse important hai
  return (
    <Card className={`weather-card ${gradientClass} border-0 text-white ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            {/* Location name aur description - user ko pata chale ki kahan ka weather hai */}
            <CardTitle className="text-2xl font-bold text-white">
              {weather.location}
            </CardTitle>
            <p className="text-white/80 capitalize">
              {weather.description}
            </p>
          </div>
          <div className="text-white">
            {/* Weather icon - animated hai, looks cool lagta hai */}
            {getWeatherIcon(weather.condition, weather.icon)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main temperature display - yahan bada temperature show kar rahe hain */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold text-white">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-white/80 flex items-center gap-1">
              <Thermometer size={16} />
              Feels like {Math.round(weather.feelsLike)}°C
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {weather.condition}
          </Badge>
        </div>
        
        {/* Weather details grid - additional info dikhane ke liye */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Wind className="mx-auto mb-1 text-white" size={20} />
            <div className="text-sm text-white/80">Wind</div>
            <div className="font-semibold text-white">{weather.windSpeed} km/h</div>
          </div>
          
          <div className="text-center">
            <Droplets className="mx-auto mb-1 text-white" size={20} />
            <div className="text-sm text-white/80">Humidity</div>
            <div className="font-semibold text-white">{weather.humidity}%</div>
          </div>
          
          <div className="text-center">
            <Eye className="mx-auto mb-1 text-white" size={20} />
            <div className="text-sm text-white/80">Visibility</div>
            <div className="font-semibold text-white">{weather.visibility} km</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Snowflake 
} from 'lucide-react';

interface ForecastData {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
}

interface ForecastCardProps {
  forecast: ForecastData;
}

// Weather icon mapping for forecast - chhote icons ke liye
const getForecastIcon = (condition: string, iconCode: string) => {
  const size = 32;
  const className = "text-primary";
  
  if (iconCode.includes('01')) return <Sun className={className} size={size} />;
  if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
    return <Cloud className={className} size={size} />;
  if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) 
    return <CloudRain className={className} size={size} />;
  if (iconCode.includes('13')) return <Snowflake className={className} size={size} />;
  
  return <Sun className={className} size={size} />;
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <Card className="weather-card bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card/90">
      <CardContent className="p-4 text-center">
        {/* Day and date - kya din hai aur date kya hai */}
        <div className="mb-3">
          <div className="font-semibold text-foreground">{forecast.day}</div>
          <div className="text-sm text-muted-foreground">{forecast.date}</div>
        </div>
        
        {/* Weather icon - condition ke hisaab se icon */}
        <div className="mb-3 flex justify-center">
          {getForecastIcon(forecast.condition, forecast.icon)}
        </div>
        
        {/* Temperature range - min aur max temperature */}
        <div className="mb-2">
          <div className="text-lg font-bold text-foreground">
            {Math.round(forecast.high)}°
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round(forecast.low)}°
          </div>
        </div>
        
        {/* Condition and humidity - weather condition aur humidity */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground capitalize">
            {forecast.condition}
          </div>
          <div className="text-xs text-muted-foreground">
            💧 {forecast.humidity}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
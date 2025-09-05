import { useState, useCallback } from 'react';

// Weather API ke liye custom hook - yahan saara weather data fetch karne ka logic hai
// OpenWeatherMap ka API use kar rahe hain, bahut reliable hai
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

interface ForecastData {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
}

interface UseWeatherAPIReturn {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  loading: boolean;
  error: string | null;
  fetchWeatherByCoordinates: (lat: number, lon: number) => Promise<void>;
  fetchWeatherByCity: (city: string) => Promise<void>;
}

const useWeatherAPI = (apiKey?: string): UseWeatherAPIReturn => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Coordinates ke basis pe weather fetch karna
  // Ye main function hai jo actual API call karta hai, error handling bhi hai
  const fetchWeatherByCoordinates = useCallback(async (lat: number, lon: number) => {
    if (!apiKey) {
      setError('API key not provided. Please add your OpenWeatherMap API key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Current weather API call
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      if (!currentResponse.ok) {
        throw new Error('Failed to fetch current weather');
      }

      const currentData = await currentResponse.json();

      // Forecast API call - 5 din ka forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast');
      }

      const forecastData = await forecastResponse.json();

      // Current weather data format kar rahe hain
      const weatherData: WeatherData = {
        location: currentData.name || 'Unknown Location',
        temperature: currentData.main.temp,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // m/s to km/h conversion
        visibility: Math.round(currentData.visibility / 1000), // meters to km
        feelsLike: currentData.main.feels_like,
        icon: currentData.weather[0].icon,
      };

      // Forecast data process kar rahe hain - daily basis pe group karna
      // Ye thoda complex hai because API hourly data deta hai, humein daily chahiye
      const dailyForecast: ForecastData[] = [];
      const processedDates = new Set<string>();

      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format

        // Agar ye date already process nahi hua hai aur forecast length 5 se kam hai
        if (!processedDates.has(dateString) && dailyForecast.length < 5) {
          processedDates.add(dateString);

          // Same day ke saare entries ka max/min temperature nikalna
          const dayEntries = forecastData.list.filter((entry: any) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
            return entryDate === dateString;
          });

          const temperatures = dayEntries.map((entry: any) => entry.main.temp);
          const high = Math.max(...temperatures);
          const low = Math.min(...temperatures);

          // Day ka average humidity calculate karna
          const avgHumidity = Math.round(
            dayEntries.reduce((sum: number, entry: any) => sum + entry.main.humidity, 0) / dayEntries.length
          );

          dailyForecast.push({
            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
            high,
            low,
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
            humidity: avgHumidity,
          });
        }
      });

      setCurrentWeather(weatherData);
      setForecast(dailyForecast);

    } catch (err) {
      console.error('Weather API error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      
      // Demo data set kar rahe hain agar API fail ho jaye
      setCurrentWeather({
        location: 'Delhi',
        temperature: 28,
        condition: 'Clear',
        description: 'clear sky',
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        feelsLike: 32,
        icon: '01d',
      });

      setForecast([
        { date: 'Dec 5', day: 'Today', high: 28, low: 18, condition: 'Clear', icon: '01d', humidity: 65 },
        { date: 'Dec 6', day: 'Thu', high: 26, low: 16, condition: 'Clouds', icon: '02d', humidity: 70 },
        { date: 'Dec 7', day: 'Fri', high: 24, low: 14, condition: 'Rain', icon: '10d', humidity: 85 },
        { date: 'Dec 8', day: 'Sat', high: 22, low: 12, condition: 'Clouds', icon: '03d', humidity: 75 },
        { date: 'Dec 9', day: 'Sun', high: 25, low: 15, condition: 'Clear', icon: '01d', humidity: 60 },
      ]);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  // City name se weather fetch karna
  const fetchWeatherByCity = useCallback(async (city: string) => {
    if (!apiKey) {
      setError('API key not provided. Please add your OpenWeatherMap API key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Pehle geocoding API se coordinates nikalna
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
      );

      if (!geoResponse.ok) {
        throw new Error('City not found');
      }

      const geoData = await geoResponse.json();
      
      if (geoData.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = geoData[0];
      await fetchWeatherByCoordinates(lat, lon);

    } catch (err) {
      console.error('City search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather for city');
    }
  }, [apiKey, fetchWeatherByCoordinates]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherByCoordinates,
    fetchWeatherByCity,
  };
};

export default useWeatherAPI;
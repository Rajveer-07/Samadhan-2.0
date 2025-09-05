import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  MapPin, 
  Loader2, 
  Navigation,
  Clock,
  X
} from 'lucide-react';

// Search bar component - user ko cities search karne ke liye
// Autocomplete, recent searches, geolocation sab kuch hai yahan

interface SearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
  onCurrentLocation: () => void;
  isLoading?: boolean;
  apiKey?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onLocationSelect, 
  onCurrentLocation, 
  isLoading = false,
  apiKey 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Recent searches localStorage se load kar rahe hain
  // User experience better karne ke liye, baar baar search nahi karna padega
  useEffect(() => {
    const saved = localStorage.getItem('weather-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Click outside handler - results hide karne ke liye
  // Ye UX ke liye zaroori hai, warna dropdown khula hi reh jaata hai
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function - OpenWeatherMap Geocoding API use kar rahe hain
  // Free tier main 1000 calls per day milte hain, enough hai testing ke liye
  const searchLocations = async (searchQuery: string) => {
    if (!searchQuery.trim() || !apiKey) return;

    setSearching(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback ke liye kuch popular cities dikhate hain
      setResults([
        { name: 'Delhi', country: 'IN', lat: 28.6139, lon: 77.2090 },
        { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
        { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
        { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
      ]);
      setShowResults(true);
    } finally {
      setSearching(false);
    }
  };

  // Debounced search - har keystroke pe search nahi karna
  // Server pe load kam padega, user experience bhi better hai
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchLocations(value);
      }, 500); // 500ms delay
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Location select handler
  const handleLocationSelect = (result: SearchResult) => {
    const locationName = `${result.name}, ${result.country}`;
    setQuery(locationName);
    setShowResults(false);
    
    // Recent searches main add kar rahe hain
    const updatedRecent = [locationName, ...recentSearches.filter(s => s !== locationName)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('weather-recent-searches', JSON.stringify(updatedRecent));
    
    onLocationSelect(result.lat, result.lon, locationName);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative" ref={resultsRef}>
      <Card className="p-4 bg-card/80 backdrop-blur-sm border border-border/50">
        <div className="flex gap-2">
          {/* Search input field */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for cities... (e.g., Delhi, Mumbai, London)"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                if (results.length > 0 || recentSearches.length > 0) {
                  setShowResults(true);
                }
              }}
              className="pl-10 pr-10 bg-background/50"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {searching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            )}
          </div>
          
          {/* Current location button */}
          <Button 
            onClick={onCurrentLocation}
            disabled={isLoading}
            variant="outline"
            size="default"
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
          </Button>
        </div>
      </Card>

      {/* Search results dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto bg-card/95 backdrop-blur-sm border border-border/50">
          {/* Recent searches section */}
          {recentSearches.length > 0 && query.trim() === '' && (
            <div className="p-3 border-b border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    // Recent search se location extract kar rahe hain
                    const cityName = search.split(',')[0];
                    searchLocations(cityName);
                  }}
                  className="block w-full text-left px-2 py-1 text-sm hover:bg-muted/50 rounded-md text-foreground"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Search results */}
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg text-left transition-colors"
                >
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">
                      {result.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {result.state ? `${result.state}, ` : ''}{result.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            query.trim() && !searching && (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No locations found for "{query}"
              </div>
            )
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
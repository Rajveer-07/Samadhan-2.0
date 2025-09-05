import { useState, useCallback } from 'react';

// Geolocation hook - user ki current location nikalne ke liye
interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

interface UseGeolocationReturn extends GeolocationState {
  getCurrentLocation: () => void;
}

const useGeolocation = (): UseGeolocationReturn => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const getCurrentLocation = useCallback(() => {
    // Check karna ki browser geolocation support karta hai ya nahi
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser. Please search for your city manually.',
        loading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    // Browser se location permission mangna
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success callback - location mil gayi
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        // Error callback - location nahi mili
        let errorMessage = 'Failed to get your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Location access denied by user. Please allow location access or search manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable. Please try again or search manually.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again or search manually.';
            break;
          default:
            errorMessage += 'An unknown error occurred. Please search manually.';
            break;
        }

        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
      },
      {
        // Geolocation options - high accuracy chahiye weather ke liye
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds timeout
        maximumAge: 300000, // 5 minutes cache
      }
    );
  }, []);

  return {
    ...state,
    getCurrentLocation,
  };
};

export default useGeolocation;
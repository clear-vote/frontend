import { useState, useEffect } from 'react';

export function useFetchData<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { latitude, longitude } = getCoordinates();
        
        if (!latitude || !longitude) {
          throw new Error('Missing required query parameters');
        }

        const response = await fetch(`/api/lambda?latitude=${latitude}&longitude=${longitude}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

function getCoordinates() {
  const queryParams = new URLSearchParams(window.location.search);
  return {
    latitude: queryParams.get('latitude'),
    longitude: queryParams.get('longitude')
  };
}
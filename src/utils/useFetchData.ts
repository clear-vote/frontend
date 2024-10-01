// src/utils/useFetchData.ts
import { useState, useEffect } from 'react';

export function useFetchData<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const longitude = queryParams.get('longitude');
        const latitude = queryParams.get('latitude');

        // Call the mock Lambda API route
        const response = await fetch('/api/lambda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(JSON.parse(result.body) as T);
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
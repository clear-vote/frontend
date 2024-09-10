// useFetchData.ts
import { useState, useEffect } from 'react';

export function useFetchData<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const precinctId = queryParams.get('precinct_id');
        const address: string = "5027 brooklyn ave NE Seattle";
        let response;
        if (precinctId) {
          response = await fetch('/data/electionFoo.json'); // TODO:
        } else if (address) {
          response = await fetch('/data/electionFoo.json'); // TODO:
        } else {
          throw new Error("Cannot fetch election data without an address or precinct_id");
        }
        if (!response.ok) throw new Error('Network response was not ok');
        const result: T = await response.json();
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
// useFetchData.ts
import { useState, useEffect } from 'react';

export function useFetchData<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.AWS_API_KEY || '';
    const defaultCoords: number[] = [-122.3076595, 47.654538] 
    const url = `https://4qhxfecz53.execute-api.us-west-2.amazonaws.com/default/?latitude=${defaultCoords[0]}&longitude=${defaultCoords[1]}`;
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const precinctId = queryParams.get('precinct_id');
        const address: string = "5027 brooklyn ave NE Seattle";
        let response;
        if (precinctId) {
          console.log("precinctId: ", precinctId);
          response = await fetch(url, {
            method: 'GET',
            headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json'
            }
          });
        } else if (address) {
          console.log("address: ", address);
          response = await fetch(url, {
            method: 'GET',
            headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json'
            }
          });
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
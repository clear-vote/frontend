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
  
        console.log('Sending request with:', { latitude, longitude });
  
        const response = await fetch('/api/lambda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude: latitude, longitude: longitude }),
        });
  
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
        let responseBody;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseBody = await response.json();
        } else {
          responseBody = await response.text();
        }
  
        console.log('Response body:', responseBody);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(responseBody)}`);
        }
  
        setData(responseBody);
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

// // src/utils/useFetchData.ts
// import { useState, useEffect, useCallback } from 'react';

// interface FetchOptions {
//   latitude?: string | null;
//   longitude?: string | null;
//   // Add other potential parameters here
// }

// export function useFetchData<T>() {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async (options: FetchOptions = {}) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/lambda', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           latitude: options.latitude,
//           longitude: options.longitude,
//           // Add any other parameters you need
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       // Check if result has an error property
//       if (result.error) {
//         throw new Error(result.error);
//       }

//       // Assuming the structure matches your Lambda response
//       const parsedData = typeof result.body === 'string' 
//         ? JSON.parse(result.body) 
//         : result.body;
      
//       setData(parsedData as T);
//       return parsedData;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
//       setError(errorMessage);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchDataFromURL = useCallback(async () => {
//     if (typeof window === 'undefined') return; // Guard for SSR

//     const queryParams = new URLSearchParams(window.location.search);
//     const latitude = queryParams.get('latitude');
//     const longitude = queryParams.get('longitude');

//     return fetchData({ latitude, longitude });
//   }, [fetchData]);

//   useEffect(() => {
//     fetchDataFromURL().catch(console.error);
//   }, [fetchDataFromURL]);

//   return { 
//     data, 
//     loading, 
//     error, 
//     refetch: fetchData,
//     refetchFromURL: fetchDataFromURL
//   };
// }
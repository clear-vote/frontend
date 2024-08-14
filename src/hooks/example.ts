/* Use Context for state or logic that needs to be accessible across many components, avoiding prop drilling.
 * Use Custom Hooks to encapsulate and reuse logic within or across components without global state management.
 * They can be used together: Context to share global state and hooks to manage logic or state within components.
 */

// useFetchData.ts
import { useState, useEffect } from 'react';

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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
  }, [url]);

  return { data, loading, error };
}

import { useEffect, useState } from 'react';

const useFetch = (fetcher, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetcher();
        if (mounted) {
          setData(response);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData, setLoading, setError };
};

export default useFetch;

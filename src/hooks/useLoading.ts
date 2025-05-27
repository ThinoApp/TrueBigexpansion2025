import { useState, useCallback } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(async (callback: () => Promise<any>) => {
    try {
      startLoading();
      await callback();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return { isLoading, startLoading, stopLoading, withLoading };
}; 
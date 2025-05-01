import { useState, useEffect } from "react";

function useSessionStorage(key, initialValue) {
  // Get stored value from sessionStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing sessionStorage:", error);
      return initialValue;
    }
  });

  // Update sessionStorage when value changes
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting sessionStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useSessionStorage;

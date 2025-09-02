import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  // Load from localStorage only on client
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);
    }
  }, [key]);

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key “" + key + "”:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

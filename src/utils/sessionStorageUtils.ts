// Util to get initial value from sessionStorage or fallback to defaultValue
const getSessionItem = <T>(key: string, defaultValue: T = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.warn(`Error reading sessionStorage key “${key}”:`, error);
    return defaultValue;
  }
};

// Update sessionStorage
const setSessionItem = <T>(key: string, value: T) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting sessionStorage key “${key}”:`, error);
  }
};

export { getSessionItem, setSessionItem };

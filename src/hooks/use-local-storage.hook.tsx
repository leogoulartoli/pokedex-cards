export const useLocalStorage = () => {
  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };

  const setItem = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { getItem, setItem };
};

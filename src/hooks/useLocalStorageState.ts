import { useEffect, useState } from 'preact/hooks';

const useLocalStorageState = <T>(key: string, state: T) => {
  const [localState, setLocalState] = useState<T>(() => {
    if (localStorage.getItem(key))
      return JSON.parse(localStorage.getItem(key) ?? '');
    return state;
  });

  useEffect(() => {
    if (localState) {
      localStorage.setItem(key, JSON.stringify(localState));
    }
  }, [localState]);

  return [localState, setLocalState] as const;
};

export default useLocalStorageState;

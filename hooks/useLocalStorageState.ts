import { isMounted } from "helpers/isMounted";
import { useEffect, useState } from "react";

export const useLocalStorageState = <A>(key: string) => {
  const stateHook = useState<A | undefined>(() => {
    if (!isMounted()) return undefined;
    const item = localStorage.getItem(key);
    if (!item) return undefined;
    return JSON.parse(item);
  });

  const [value] = stateHook;

  useEffect(() => {
    if (value !== undefined) {
      localStorage?.setItem(key, JSON.stringify(value));
    } else {
      localStorage?.removeItem(key);
    }
  }, [value]);

  return stateHook;
};

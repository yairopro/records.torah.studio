import useMemo from "./memo";

export default function useCallback(callback, dependencies) {
  return useMemo(() => callback, dependencies);
}

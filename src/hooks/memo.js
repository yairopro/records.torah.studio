import { useRef } from "react";
import { Arrays } from "../utils";

export default function useMemo(factory, dependencies, destructor) {
  if (!dependencies)
    dependencies = [
      /*No dependencies by default*/
    ];

  const memorized = useRef({}).current;

  if (!Arrays.match(dependencies, memorized.dependencies)) {
    let firstTime = !memorized.dependencies;
    memorized.dependencies = dependencies;

    let oldValue = memorized.value;
    memorized.value =
      factory instanceof Function ? factory(...dependencies) : factory;

    if (!firstTime && destructor) destructor(oldValue, memorized.value);
  }

  return memorized.value;
}

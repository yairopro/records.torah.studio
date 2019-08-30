export default {
  match(array1, array2) {
    if (array1 === array2 || (!array1 && !array2)) return true;
    if (!array1 || !array2) return false;

    let match = true;
    let length = Math.max(array1.length, array2.length);
    for (let i = 0; i < length && match; i++)
      match = Object.is(array1[i], array2[i]);

    return match;
  },

  range(range) {
    if (!(range >= 0)) range = 0;

    return new Array(range).fill(null).map((_, index) => index);
  }
};

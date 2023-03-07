declare module 'sorted-paired-zip' {
/**
 * Zips two lists together, matching elements by a sorting function, and putting null if there is a mismatch on either list.
 * @template T
 * @param {Readonly<T[]> | T[]} leftUnsorted - The elements to be zipped in the left-hand position.
 * @param {Readonly<T[]> | T[]} rightUnsorted - The elements to be zipped in the right-hand position.
 * @param {((l: T, r: T) => number)} sorter - The comparison function which sorts the elements.
 * @yields {[T | null, T | null]}
 * @returns {Generator<[T | null, T | null], void, undefined>}
 * @example
 *   const sorter = (x, y) => x.localeCompare(y);
 *   [...sortedPairedZipGenerator(['a', 'b', 'c', 'e'], ['b', 'c', 'd', 'e', 'f'], sorter)]
 *   // => [['a', null], ['b', 'b'], ['c', 'c'], [null, 'd'], ['e', 'e'], [null, 'f']];
 *
 *   const sorter = (x, y) => x - y;
 *   [...sortedPairedZipGenerator([4, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], sorter)]
 *   // => [[null, 1], [null, 2], [null, 3], [4, 4], [null, 5], [null, 6], [7, 7], [8, 8]];
 */
  function* sortedPairedZipGenerator<T>(
    leftUnsorted: Readonly<T[]> | T[],
    rightUnsorted: Readonly<T[]> | T[],
    sorter: (l: T, r: T) => number
  ): Generator<[T | null, T | null], void, undefined>;

/**
 * Zips two lists together, matching elements by a sorting function, and putting null if there is a mismatch on either list.
 * @template T
 * @param {Readonly<T[]> | T[]} leftUnsorted - The elements to be zipped in the left-hand position.
 * @param {Readonly<T[]> | T[]} rightUnsorted - The elements to be zipped in the right-hand position.
 * @param {((l: T, r: T) => number)} sorter - The comparison function which sorts the elements.
 * @returns {[T | null, T | null][]}
 * @example
 * const sorter = (x, y) => x.localeCompare(y);
 * sortedPairedZip(['a', 'b', 'c', 'e'], ['b', 'c', 'd', 'e', 'f'], sorter)
 * // => [['a', null], ['b', 'b'], ['c', 'c'], [null, 'd'], ['e', 'e'], [null, 'f']];
 *
 * const sorter = (x, y) => x - y;
 * sortedPairedZip([4, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], sorter)
 * // => [[null, 1], [null, 2], [null, 3], [4, 4], [null, 5], [null, 6], [7, 7], [8, 8]];
 */
  function sortedPairedZip<T>(
    leftUnsorted: Readonly<T[]> | T[],
    rightUnsorted: Readonly<T[]> | T[],
    sorter: (l: T, r: T) => number
  ): [T | null, T | null][];
}

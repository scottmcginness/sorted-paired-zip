// @ts-check

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
function* sortedPairedZipGenerator(leftUnsorted, rightUnsorted, sorter) {
    const left = [...leftUnsorted].sort(sorter);
    const right = [...rightUnsorted].sort(sorter);

    let i = 0;
    let j = 0;

    while (true) {
        const l = left[i];
        const r = right[j];

        if (l === undefined && r === undefined) {
            break;
        } else if (l === undefined) {
            yield [null, r];
            j += 1;
        } else if (r === undefined) {
            yield [l, null];
            i += 1;
        } else {
            const sort = sorter(l, r);

            if (sort === 0) {
                yield [l, r];
                i += 1;
                j += 1;
            } else if (sort < 0) {
                yield [l, null];
                i += 1;
            } else if (sort > 0) {
                yield [null, r];
                j += 1;
            }
        }
    }
}

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
function sortedPairedZip(leftUnsorted, rightUnsorted, sorter) {
  return [...sortedPairedZipGenerator(leftUnsorted, rightUnsorted, sorter)];
}

module.exports = {
  sortedPairedZipGenerator,
  sortedPairedZip
};
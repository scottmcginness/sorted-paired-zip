// @ts-check
const { sortedPairedZip } = require(".");

/**
 * @param {string[]} left
 * @param {string[]} right
 * @param {[string | null, string | null][]} expected
 * @param {number} n
 * @param {boolean | undefined} debug
 */
const test = (left, right, sorter, expected, n, equality, debug) => {
    if (debug) {
        debugger;
    }

    if (!equality) {
        equality = (x, y) => x === y;
    }

    /** @type {((x: string, y: string) => number)} */
    const defaultSorter = (x, y) => x.localeCompare(y);
    const result = sortedPairedZip(left, right, sorter || defaultSorter);

    if (result.length !== expected.length) {
        throw new Error(`lengths did not match on test #${n}: ${JSON.stringify(result)}`);
    }

    expected.forEach(([l, r], i) => {
        if (!equality(l, result[i][0])) {
            throw new Error(`left side did not match on test #${n} at index ${i}: ${JSON.stringify(l)} != ${JSON.stringify(result[i][0])}`);
        }

        if (!equality(r, result[i][1])) {
            throw new Error(`right side did not match on test #${n} at index ${i}: ${JSON.stringify(r)} != ${JSON.stringify(result[i][1])}`);
        }
    });

    console.log(`test #${n} passed`);
};

/** @type {{ left: any[], right: any[], sorter?: any, expected: [any, any][], equality?: any, debug?: boolean, only?: boolean }[]} */
const suite = [
    {
        left: [],
        right: [],
        expected: []
    },
    {
        left: ['a'],
        right: ['b'],
        expected: [['a', null], [null, 'b']]
    },
    {
        left: ['a', 'b', 'd'],
        right: ['b', 'c', 'd'],
        expected: [['a', null], ['b', 'b'], [null, 'c'], ['d', 'd']]
    },
    {
        left: ['b', 'c', 'd'],
        right: ['a1', 'a2', 'a3', 'b', 'b1', 'b2', 'c', 'd'],
        expected: [[null, 'a1'], [null, 'a2'], [null, 'a3'], ['b', 'b'], [null, 'b1'], [null, 'b2'], ['c', 'c'], ['d', 'd']]
    },
    {
        left: ['b', 'c', 'd'],
        right: ['a1', 'a2', 'a3', 'b', 'b1', 'b2', 'd'],
        expected: [[null, 'a1'], [null, 'a2'], [null, 'a3'], ['b', 'b'], [null, 'b1'], [null, 'b2'], ['c', null], ['d', 'd']]
    },
    {
        // only: true,
        left: ['b', 'c', 'd'],
        right: ['a1', 'a2', 'a3', 'b', 'b1', 'b2', 'b3'],
        expected: [[null, 'a1'], [null, 'a2'], [null, 'a3'], ['b', 'b'], [null, 'b1'], [null, 'b2'], [null, 'b3'], ['c', null], ['d', null]]
    },
    {
        left: ['b', 'c', 'd'],
        right: ['a1', 'a2', 'a3'],
        expected: [[null, 'a1'], [null, 'a2'], [null, 'a3'], ['b', null], ['c', null], ['d', null]]
    },
    {
        left: ['b', 'c', 'd'],
        right: ['a'],
        expected: [[null, 'a'], ['b', null], ['c', null], ['d', null]]
    },
    {
        left: ['b', 'c', 'd'],
        right: ['a', 'e'],
        expected: [[null, 'a'], ['b', null], ['c', null], ['d', null], [null, 'e']]
    },
    {
        left: ['b', 'c', 'd'],
        right: ['a', 'e', 'f'],
        expected: [[null, 'a'], ['b', null], ['c', null], ['d', null], [null, 'e'], [null, 'f']]
    },
    {
        left: ['b', 'c', 'd', 'g'],
        right: ['a', 'e', 'f', 'g'],
        expected: [[null, 'a'], ['b', null], ['c', null], ['d', null], [null, 'e'], [null, 'f'], ['g', 'g']]
    },
    {
        left: ['b', 'c', 'd', 'd'],
        right: ['a', 'e', 'f', 'g'],
        expected: [[null, 'a'], ['b', null], ['c', null], ['d', null], ['d', null], [null, 'e'], [null, 'f'], [null, 'g']]
    },
    {
        left: ['a', 'a', 'b'],
        right: ['a', 'c', 'd'],
        expected: [['a', 'a'], ['a', null], ['b', null], [null, 'c'], [null, 'd']]
    },
    {
        left: [{ name: 'a', value: 'val' }, { name: 'b', value: 'val' }],
        right: [{ name: 'b', value: 'val' }, { name: 'a', value: 'other' }],
        sorter: (x, y) => x.name.localeCompare(y.name),
        expected: [[{ name: 'a', value: 'val' }, { name: 'a', value: 'other' }], [{ name: 'b', value: 'val' }, { name: 'b', value: 'val' }]],
        equality: (x, y) => x.name === y.name && x.value === y.value
    }
];

const runSuite = () => {
    console.log('=== Starting tests ===');
    let fails = 0;
    const only = suite.find((s) => s.only);

    (only ? [only] : suite).forEach((s, i) => {
        try {
            test(s.left, s.right, s.sorter, s.expected, i + 1, s.equality, s.debug);
        } catch (e) {
            fails += 1;
            console.error(e);
            console.error(`xxx Test #${i + 1} failed xxx`);
        }
    });

    if (fails === 0) {
        console.log('=== All tests passed === ');
    } else {
        console.error(`xxx ${only ? 'Only' : fails} test${fails === 1 ? '' : 's'} failed xxx`);
    }
};

runSuite();

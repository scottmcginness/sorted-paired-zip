# Sorted paired zip

A JavaScript function which zips array elements together in pairs using a custom sort function

## Install

`npm install --save sorted-paired-zip`

## Examples

```javascript
const { sortedPairedZip } = require('sorted-paired-zip');

const sorter = (x, y) => x.localeCompare(y);
sortedPairedZip(['a', 'b', 'c', 'e'], ['b', 'c', 'd', 'e', 'f'], sorter) === [
  ['a', null],
  ['b', 'b'],
  ['c', 'c'],
  [null, 'd'],
  ['e', 'e'],
  [null, 'f']
];

const sorter = (x, y) => x - y;
sortedPairedZip([4, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], sorter) === [
  [null, 1],
  [null, 2],
  [null, 3],
  [4, 4],
  [null, 5],
  [null, 6],
  [7, 7],
  [8, 8]
];
```

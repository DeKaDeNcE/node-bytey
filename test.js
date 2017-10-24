const assert = require('assert');
const bytey = require('./bytey');

let hexStr = '683628f9edb5e9d1';
let hexBytes = [104, 54, 40, 249, 237, 181, 233, 209];

let sameA = [0x5, 0x25, 0xFF];
let sameB = [0x5, 0x25, 0xFF];
let diffA = [0x5, 0x26, 0xFF];
let diffB = [0xFF];

assert(bytey.isByteArrayEqual(sameA, sameB), 'sameA and sameB expected to be equal.');
assert(!bytey.isByteArrayEqual(sameA, diffA), 'sameA not expected to be equal to diffA');
assert(!bytey.isByteArrayEqual(sameA, diffB), 'sameA not expected to be equal to diffB');

let byteConvert = bytey.hexStringToByteArray(hexStr);
assert(bytey.isByteArrayEqual(byteConvert, hexBytes), 'byteConvert expected to be equal to hexBytes.');

let hexConvert = bytey.byteArrayToHexString(byteConvert);
assert(hexConvert === hexStr, 'hexConvert expected to be equal to hexStr.');

let multiByteStr = 'こんにちは';
let multiByteExpected = [227, 129, 147, 227, 130, 147, 227, 129, 171, 227, 129, 161, 227, 129, 175];

let multiBytes = bytey.utf8ToByteArray(multiByteStr);
assert(bytey.isByteArrayEqual(multiBytes, multiByteExpected), 'multiBytes expected to be equal to multiByteExpected.');

let utf8Str = bytey.byteArrayToUtf8(multiBytes);
assert(utf8Str === multiByteStr, 'utf8str expected to be equal to multiByteStr.');
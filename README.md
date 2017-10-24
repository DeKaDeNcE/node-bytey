# bytey
A simple NodeJS module that provides byte-array utility.

## Installing
```
npm install bytey
```

## Usage
```javascript
// Require the module, obviously.
const bytey = require('bytey');

// Convert hex string to byte-array.
 bytey.hexStringToByteArray('683628F9EDB5E9D1');
// -> [ 104, 54, 40, 249, 237, 181, 233, 209 ]

// Convert a byte-array to a hex string.
bytey.byteArrayToHexString([104, 54, 40, 249, 237, 181, 233, 209]);
// -> '683628f9edb5e9d1'

// Convert UTF8 string to byte-array.
bytey.utf8ToByteArray('こんにちは');
// -> [ 227, 129, 147, 227, 130, 147, 227, 129, 171, 227, 129, 161, 227, 129, 175 ]

// Convert byte-array to UTF8 string.
bytey.byteArrayToUtf8([227, 129, 147, 227, 130, 147, 227, 129, 171, 227, 129, 161, 227, 129, 175]);
// -> 'こんにちは'

// Check if two byte arrays are equals.
bytey.isByteArrayEqual([200, 55, 24], [200, 54, 24]);
// -> false
```
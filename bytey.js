/*!
	bytey (https://github.com/Kruithne/node-bytey)
	Author: Kruithne <kruithne@gmail.com>
	License: MIT
 */

module.exports = {
	/**
	 * Check if two byte-arrays are equal.
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @returns {boolean}
	 */
	isByteArrayEqual: (arr1, arr2) => {
		if(!Array.isArray(arr1) || !Array.isArray(arr2))
			throw new Error('bytey.isByteArrayEqual() expects two arrays.');

		// Naive rejection based on length.
		if (arr1.length !== arr2.length)
			return false;

		// Match all bytes.
		for (let i = 0; i < arr1.length; i++)
			if (arr1[i] !== arr2[i])
				return false;

		return true;
	},

	/**
	 * Convert a byte-array to a hex string.
	 * @param {Array} byteArray
	 * @returns {string}
	 */
	byteArrayToHexString: (byteArray) => {
		if (!Array.isArray(byteArray))
			throw new Error('bytey.byteArrayToHexString() expects an array.');

		return Array.from(byteArray, (byte) => {
			return ('0' + (byte & 0xFF).toString(16)).slice(-2);
		}).join('');
	},

	/**
	 * Convert a hex string to a byte-array.
	 * @param {string} hexString
	 * @returns {Array}
	 */
	hexStringToByteArray: (hexString) => {
		if (typeof(hexString) !== 'string')
			throw new Error('bytey.hexStringToByteArray() expects a string.');

		let result = [];
		for (let i = 0, charsLength = hexString.length; i < charsLength; i += 2)
			result.push(parseInt(hexString.substring(i, i + 2), 16));

		return result;
	},

	/**
	 * Convert a UTF8 string to a byte-array.
	 * https://github.com/google/closure-library/
	 * @param {string} str
	 * @returns {Array}
	 */
	utf8ToByteArray: (str) => {
		if (typeof str !== 'string')
			throw new Error('bytey.utf8ToByteArray() expects a string.');

		let out = [], p = 0;
		for (let i = 0; i < str.length; i++) {
			let c = str.charCodeAt(i);
			if (c < 128) {
				out[p++] = c;
			} else if (c < 2048) {
				out[p++] = (c >> 6) | 192;
				out[p++] = (c & 63) | 128;
			} else if (((c & 0xFC00) === 0xD800) && (i + 1) < str.length && ((str.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
				c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
				out[p++] = (c >> 18) | 240;
				out[p++] = ((c >> 12) & 63) | 128;
				out[p++] = ((c >> 6) & 63) | 128;
				out[p++] = (c & 63) | 128;
			} else {
				out[p++] = (c >> 12) | 224;
				out[p++] = ((c >> 6) & 63) | 128;
				out[p++] = (c & 63) | 128;
			}
		}
		return out;
	},

	/**
	 * Convert a byte-array to a UTF8 string.
	 * https://github.com/google/closure-library/
	 * @param {Array} arr
	 * @returns {string}
	 */
	byteArrayToUtf8: (arr) => {
		if (!Array.isArray(arr))
			throw new Error('bytey.byteArrayToUtf8() expects an array.');

		let out = [], pos = 0, c = 0;
		while (pos < arr.length) {
			let c1 = arr[pos++];
			if (c1 < 128) {
				out[c++] = String.fromCharCode(c1);
			} else if (c1 > 191 && c1 < 224) {
				let c2 = arr[pos++];
				out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
			} else if (c1 > 239 && c1 < 365) {
				let c2 = arr[pos++];
				let c3 = arr[pos++];
				let c4 = arr[pos++];
				let u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
				out[c++] = String.fromCharCode(0xD800 + (u >> 10));
				out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
			} else {
				let c2 = arr[pos++];
				let c3 = arr[pos++];
				out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
			}
		}
		return out.join('');
	}
};
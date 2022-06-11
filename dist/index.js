'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@zee-ava/avajs/dist/utils');
var dist = require('@zee-ava/avajs/dist');
var Web3 = require('web3');
var avajs = require('@zee-ava/avajs');
var ethers = require('ethers');
var xss = require('xss');
var Sockette = require('sockette');
var _ = require('buffer/');
var createHash = require('create-hash');
var bip39 = require('bip39');
var EthereumjsCommon = require('@ethereumjs/common');
var ethereumjsUtil = require('ethereumjs-util');
var HDKey = require('hdkey');
var tx = require('@ethereumjs/tx');
var avm = require('@zee-ava/avajs/dist/apis/avm');
var common = require('@zee-ava/avajs/dist/common');
var evm = require('@zee-ava/avajs/dist/apis/evm');
var platformvm = require('@zee-ava/avajs/dist/apis/platformvm');
var buffer = require('buffer');
var Big = require('big.js');
var CryptoJS = require('crypto-js/core');
var AES = require('crypto-js/aes');
var randomstring = require('randomstring');
var keychain = require('@zee-ava/avajs/dist/apis/avm/keychain');
var keychain$1 = require('@zee-ava/avajs/dist/apis/evm/keychain');
var utils$1 = require('ethers/lib/utils');
var bitcoin = require('bitcoinjs-lib');
var bip32 = require('bip32');
var Eth = require('@ledgerhq/hw-app-eth');
var AppAxc = require('@zee-ava/hd-wallet-axia');
var ethSigUtil = require('@metamask/eth-sig-util');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var Web3__default = /*#__PURE__*/_interopDefaultLegacy(Web3);
var xss__default = /*#__PURE__*/_interopDefaultLegacy(xss);
var Sockette__default = /*#__PURE__*/_interopDefaultLegacy(Sockette);
var createHash__default = /*#__PURE__*/_interopDefaultLegacy(createHash);
var bip39__namespace = /*#__PURE__*/_interopNamespace(bip39);
var EthereumjsCommon__default = /*#__PURE__*/_interopDefaultLegacy(EthereumjsCommon);
var HDKey__default = /*#__PURE__*/_interopDefaultLegacy(HDKey);
var Big__default = /*#__PURE__*/_interopDefaultLegacy(Big);
var CryptoJS__default = /*#__PURE__*/_interopDefaultLegacy(CryptoJS);
var AES__default = /*#__PURE__*/_interopDefaultLegacy(AES);
var randomstring__default = /*#__PURE__*/_interopDefaultLegacy(randomstring);
var bitcoin__namespace = /*#__PURE__*/_interopNamespace(bitcoin);
var bip32__namespace = /*#__PURE__*/_interopNamespace(bip32);
var Eth__default = /*#__PURE__*/_interopDefaultLegacy(Eth);
var AppAxc__default = /*#__PURE__*/_interopDefaultLegacy(AppAxc);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

function getRpcC(conf) {
    return `${conf.apiProtocol}://${conf.apiIp}:${conf.apiPort}/ext/bc/C/rpc`;
}
function getRpcX(conf) {
    return `${conf.apiProtocol}://${conf.apiIp}:${conf.apiPort}/ext/bc/X`;
}
function getRpcP(conf) {
    return `${conf.apiProtocol}://${conf.apiIp}:${conf.apiPort}/ext/bc/P`;
}

const MainnetConfig = {
    rawUrl: 'https://api.axc.network',
    apiProtocol: 'https',
    apiIp: 'api.axc.network',
    apiPort: 443,
    explorerURL: 'https://explorerapi.axc.network',
    explorerSiteURL: 'https://explorer.axc.network',
    networkID: 1,
    // @ts-ignore
    xChainID: utils.Defaults.network[1]['X']['blockchainID'],
    // @ts-ignore
    pChainID: utils.Defaults.network[1]['P']['blockchainID'],
    // @ts-ignore
    cChainID: utils.Defaults.network[1]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: utils.Defaults.network[1]['C']['chainID'],
    // @ts-ignore
    axcID: utils.Defaults.network[1]['X']['axcAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};
const TestnetConfig = {
    rawUrl: 'https://api.axc-test.network',
    apiProtocol: 'https',
    apiIp: 'api.axc-test.network',
    apiPort: 443,
    explorerURL: 'https://explorerapi.axc-test.network',
    explorerSiteURL: 'https://explorer.axc-test.network',
    networkID: 5,
    // @ts-ignore
    xChainID: utils.Defaults.network[5]['X']['blockchainID'],
    // @ts-ignore
    pChainID: utils.Defaults.network[5]['P']['blockchainID'],
    // @ts-ignore
    cChainID: utils.Defaults.network[5]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: utils.Defaults.network[5]['C']['chainID'],
    // @ts-ignore
    axcID: utils.Defaults.network[5]['X']['axcAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};
const LocalnetConfig = {
    rawUrl: 'http://localhost:9650',
    apiProtocol: 'http',
    apiIp: 'localhost',
    apiPort: 9650,
    networkID: 12345,
    // @ts-ignore
    xChainID: utils.Defaults.network[12345]['X']['blockchainID'],
    // @ts-ignore
    pChainID: utils.Defaults.network[12345]['P']['blockchainID'],
    // @ts-ignore
    cChainID: utils.Defaults.network[12345]['C']['blockchainID'],
    // @ts-ignore
    evmChainID: utils.Defaults.network[12345]['C']['chainID'],
    // @ts-ignore
    axcID: utils.Defaults.network[12345]['X']['axcAssetID'],
    get rpcUrl() {
        return {
            c: getRpcC(this),
            p: getRpcP(this),
            x: getRpcX(this),
        };
    },
};
// Default network connection
const DefaultConfig = MainnetConfig;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var url = {};

var punycode$1 = {exports: {}};

/*! https://mths.be/punycode v1.3.2 by @mathias */

(function (module, exports) {
(function(root) {

	/** Detect free variables */
	var freeExports = exports &&
		!exports.nodeType && exports;
	var freeModule = module &&
		!module.nodeType && module;
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(commonjsGlobal));
}(punycode$1, punycode$1.exports));

var util$1 = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

var querystring$1 = {};

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var decode = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

var encode = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

querystring$1.decode = querystring$1.parse = decode;
querystring$1.encode = querystring$1.stringify = encode;

var punycode = punycode$1.exports;
var util = util$1;

url.parse = urlParse;
url.resolve = urlResolve;
url.resolveObject = urlResolveObject;
url.format = urlFormat;

url.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = querystring$1;

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

const bintools = avajs.BinTools.getInstance();

class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.TIMEOUT = 10000;
    }
    get(path, params) {
        const query = params && new URLSearchParams(params);
        path = query ? `${path}?${query.toString()}` : path;
        const url = `${this.baseURL}/${path}`;
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return this.handleResponse(this.fetchWithTimeout(url, options));
    }
    post(path, data) {
        const url = `${this.baseURL}/${path}`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        return this.handleResponse(this.fetchWithTimeout(url, options));
    }
    handleResponse(responsePromise) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield responsePromise;
            if (response.ok) {
                return yield response.json();
            }
            else {
                const errorMessage = yield response.text();
                return Promise.reject(new Error(errorMessage));
            }
        });
    }
    fetchWithTimeout(input, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { timeout = this.TIMEOUT } = options;
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            const response = yield fetch(input, Object.assign(Object.assign({}, options), { signal: controller.signal }));
            clearTimeout(id);
            return response;
        });
    }
}

function wsUrlFromConfigX(config) {
    let protocol = config.apiProtocol === 'http' ? 'ws' : 'wss';
    return `${protocol}://${config.apiIp}:${config.apiPort}/ext/bc/X/events`;
}
function wsUrlFromConfigEVM(config) {
    let protocol = config.apiProtocol === 'http' ? 'ws' : 'wss';
    return `${protocol}://${config.apiIp}:${config.apiPort}/ext/bc/C/ws`;
}
/**
 * Given the base url of an Axia API, requests the Network ID
 * @param url The base url for the Axia API
 */
function getNetworkIdFromURL(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Not be the best to assume /ext/info but Axiajs complicates things
        let res = yield fetch(url + '/ext/info', {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'info.getNetworkID',
            }),
        });
        const data = yield res.json();
        return parseInt(data.result.networkID);
    });
}
function createAxiaProvider(config) {
    return new avajs.Axia(config.apiIp, config.apiPort, config.apiProtocol, config.networkID);
}
/**
 * Given a network configuration returns an HttpClient instance connected to the explorer
 */
function createExplorerApi(networkConfig) {
    if (!networkConfig.explorerURL) {
        throw new Error('Network configuration does not specify an explorer API.');
    }
    return new HttpClient(networkConfig.explorerURL);
}
/**
 * Checks if the given network accepts credentials.
 * This must be true to use cookies.
 */
function canUseCredentials(config) {
    return __awaiter(this, void 0, void 0, function* () {
        let provider = createAxiaProvider(config);
        provider.setRequestConfig('withCredentials', true);
        let infoApi = provider.Info();
        // Make a dummy request with credentials
        try {
            yield infoApi.getNetworkID();
            return true;
            // eslint-disable-next-line
        }
        catch (e) { }
        provider.setRequestConfig('withCredentials', false);
        try {
            yield infoApi.getNetworkID();
        }
        catch (e) {
            throw new Error('Unable to connect.');
        }
        return false;
    });
}

var network_helper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    wsUrlFromConfigX: wsUrlFromConfigX,
    wsUrlFromConfigEVM: wsUrlFromConfigEVM,
    getNetworkIdFromURL: getNetworkIdFromURL,
    createAxiaProvider: createAxiaProvider,
    createExplorerApi: createExplorerApi,
    canUseCredentials: canUseCredentials
});

const NETWORK_TIMEOUT = 'NETWORK_REQUEST_TIMEOUT';
/**
 * HttpProvider should be used to send rpc calls over http
 */
class FetchHttpProvider {
    constructor(host, options) {
        this.host = host;
        this.withCredentials = (options === null || options === void 0 ? void 0 : options.withCredentials) || false;
        this.timeout = (options === null || options === void 0 ? void 0 : options.timeout) || 0;
        this.headers = options === null || options === void 0 ? void 0 : options.headers;
        this.agent = options === null || options === void 0 ? void 0 : options.agent;
        this.connected = false;
        this.host = host || 'http://localhost:8545';
    }
    prepareRequest(body) {
        return new Promise((resolve, reject) => {
            var _a;
            fetch(this.host, {
                method: 'POST',
                headers: Object.assign({ 'Content-Type': 'application/json' }, (_a = this.headers) === null || _a === void 0 ? void 0 : _a.reduce((prev, current) => (Object.assign(Object.assign({}, prev), { [current.name]: current.value })), {})),
                credentials: this.withCredentials ? 'include' : undefined,
                body,
            }).then(resolve, reject);
            if (this.timeout) {
                const e = new Error(NETWORK_TIMEOUT);
                setTimeout(reject, this.timeout, e);
            }
        });
    }
    send(payload, callback) {
        this.prepareRequest(JSON.stringify(payload))
            .then((response) => response === null || response === void 0 ? void 0 : response.json())
            .then((result) => {
            this.connected = true;
            callback(null, result);
        })
            .catch((e) => {
            if ((e === null || e === void 0 ? void 0 : e.message) === NETWORK_TIMEOUT) {
                callback(new Error('CONNECTION TIMEOUT: timeout of ' + this.timeout + ' ms achived'));
                return;
            }
            const error = new Error("CONNECTION ERROR: Couldn't connect to node " + this.host + '.');
            if (e) {
                error.code = e.code;
                error.reason = e.reason;
            }
            this.connected = false;
            callback(error);
        });
    }
    disconnect() {
        //NO OP
    }
    supportsSubscriptions() {
        return false;
    }
}

function getEthersJsonRpcProvider(config) {
    return new ethers.ethers.providers.JsonRpcProvider(config.rpcUrl.c, {
        name: '',
        chainId: config.evmChainID,
    });
}

const axia = createAxiaProvider(DefaultConfig);
const xChain = axia.XChain();
const cChain = axia.CChain();
const pChain = axia.PChain();
const infoApi = axia.Info();
function getProviderFromUrl(url, credentials = false) {
    return new FetchHttpProvider(url, {
        timeout: 20000,
        withCredentials: credentials,
    });
}
const rpcUrl = getRpcC(DefaultConfig);
const web3 = new Web3__default["default"](getProviderFromUrl(rpcUrl, true));
// JSON RPC Ethers provider
exports.ethersProvider = getEthersJsonRpcProvider(DefaultConfig);
exports.explorer_api = null;
exports.activeNetwork = DefaultConfig;
/**
 * Returns the evm chain ID of the active network
 */
function getEvmChainID() {
    return exports.activeNetwork.evmChainID;
}
/**
 * Similar to `setRpcNetwork`, but checks if credentials can be used with the api.
 * @param config
 */
function setRpcNetworkAsync(config) {
    return __awaiter(this, void 0, void 0, function* () {
        let credentials = yield canUseCredentials(config);
        setRpcNetwork(config, credentials);
    });
}
/**
 * Changes the connected network of the SDK.
 * This is a synchronous call that does not do any network requests.
 * @param conf
 * @param credentials
 */
function setRpcNetwork(conf, credentials = true) {
    axia.setAddress(conf.apiIp, conf.apiPort, conf.apiProtocol);
    axia.setNetworkID(conf.networkID);
    if (credentials) {
        axia.setRequestConfig('withCredentials', credentials);
    }
    else {
        axia.removeRequestConfig('withCredentials');
    }
    xChain.refreshBlockchainID(conf.xChainID);
    xChain.setBlockchainAlias('X');
    pChain.refreshBlockchainID(conf.pChainID);
    pChain.setBlockchainAlias('P');
    cChain.refreshBlockchainID(conf.cChainID);
    cChain.setBlockchainAlias('C');
    xChain.setAXCAssetID(conf.axcID);
    pChain.setAXCAssetID(conf.axcID);
    cChain.setAXCAssetID(conf.axcID);
    if (conf.explorerURL) {
        exports.explorer_api = createExplorerApi(conf);
    }
    else {
        exports.explorer_api = null;
    }
    let rpcUrl = getRpcC(conf);
    web3.setProvider(getProviderFromUrl(rpcUrl, credentials));
    // Update ethers provider
    exports.ethersProvider = getEthersJsonRpcProvider(conf);
    exports.activeNetwork = conf;
}
/**
 * Given the base url for an Axia API, returns a NetworkConfig object.
 * @param url A string including protocol, base domain, and ports (if any). Ex: `http://localhost:9650`
 */
function getConfigFromUrl(url$1) {
    return __awaiter(this, void 0, void 0, function* () {
        let urlObj = url.parse(url$1);
        let portStr = urlObj.port;
        if (!urlObj.hostname || !urlObj.protocol)
            throw new Error('Invalid url.');
        if (!portStr) {
            portStr = urlObj.protocol === 'http:' ? '80' : '443';
        }
        // get network ID
        let netID = yield getNetworkIdFromURL(url$1);
        let protocol = urlObj.protocol === 'http:' ? 'http' : 'https';
        let connection = new dist.Axia(urlObj.hostname, parseInt(portStr), protocol, netID);
        // TODO: Use a helper for this
        let connectionEvm = new Web3__default["default"](getProviderFromUrl(urlObj.href + 'ext/bc/C/rpc'));
        let infoApi = connection.Info();
        let xApi = connection.XChain();
        let fetchIdX = infoApi.getBlockchainID('X');
        let fetchIdP = infoApi.getBlockchainID('P');
        let fetchIdC = infoApi.getBlockchainID('C');
        let fetchEvmChainID = connectionEvm.eth.getChainId();
        let fetchAxcId = yield xApi.getAXCAssetID();
        let values = yield Promise.all([fetchIdX, fetchIdP, fetchIdC, fetchAxcId, fetchEvmChainID]);
        let idX = values[0];
        let idP = values[1];
        let idC = values[2];
        let axcId = bintools.cb58Encode(values[3]);
        let evmChainId = values[4];
        let config = {
            rawUrl: url$1,
            apiProtocol: protocol,
            apiIp: urlObj.hostname,
            apiPort: parseInt(portStr),
            networkID: netID,
            xChainID: idX,
            pChainID: idP,
            cChainID: idC,
            axcID: axcId,
            evmChainID: evmChainId,
            get rpcUrl() {
                return {
                    c: getRpcC(this),
                    p: getRpcP(this),
                    x: getRpcX(this),
                };
            },
        };
        return config;
    });
}

var events = {exports: {}};

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };

var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

var EventEmitter$1 = events.exports;

/**
 * Fire network change event
 * @param newNetwork The newly connected network config
 */
function emitNetworkChange(newNetwork) {
    networkEvents.emit('network_change', newNetwork);
}
const MAX_LISTENERS = 100;
const networkEvents = new EventEmitter$1();
networkEvents.setMaxListeners(MAX_LISTENERS);

var _format$1 = "hh-sol-artifact-1";
var contractName$1 = "ERC20";
var sourceName$1 = "contracts/token/ERC20/ERC20.sol";
var abi$1 = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "subtractedValue",
				type: "uint256"
			}
		],
		name: "decreaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "addedValue",
				type: "uint256"
			}
		],
		name: "increaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$1 = "0x60806040523480156200001157600080fd5b5060405162000b6038038062000b608339810160408190526200003491620001db565b81516200004990600390602085019062000068565b5080516200005f90600490602084019062000068565b50505062000282565b828054620000769062000245565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013657600080fd5b81516001600160401b03808211156200015357620001536200010e565b604051601f8301601f19908116603f011681019082821181831017156200017e576200017e6200010e565b816040528381526020925086838588010111156200019b57600080fd5b600091505b83821015620001bf5785820183015181830184015290820190620001a0565b83821115620001d15760008385830101525b9695505050505050565b60008060408385031215620001ef57600080fd5b82516001600160401b03808211156200020757600080fd5b620002158683870162000124565b935060208501519150808211156200022c57600080fd5b506200023b8582860162000124565b9150509250929050565b600181811c908216806200025a57607f821691505b602082108114156200027c57634e487b7160e01b600052602260045260246000fd5b50919050565b6108ce80620002926000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101c6565b6040516100c3919061070b565b60405180910390f35b6100df6100da36600461077c565b610258565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f3660046107a6565b610270565b604051601281526020016100c3565b6100df61013136600461077c565b610294565b6100f36101443660046107e2565b6001600160a01b031660009081526020819052604090205490565b6100b66102d3565b6100df61017536600461077c565b6102e2565b6100df61018836600461077c565b610379565b6100f361019b366004610804565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d590610837565b80601f016020809104026020016040519081016040528092919081815260200182805461020190610837565b801561024e5780601f106102235761010080835404028352916020019161024e565b820191906000526020600020905b81548152906001019060200180831161023157829003601f168201915b5050505050905090565b600033610266818585610387565b5060019392505050565b60003361027e8582856104ab565b61028985858561053d565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061026690829086906102ce908790610872565b610387565b6060600480546101d590610837565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561036c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102898286868403610387565b60003361026681858561053d565b6001600160a01b0383166103e95760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610363565b6001600160a01b03821661044a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610363565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610537578181101561052a5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610363565b6105378484848403610387565b50505050565b6001600160a01b0383166105a15760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610363565b6001600160a01b0382166106035760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610363565b6001600160a01b0383166000908152602081905260409020548181101561067b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610363565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106b2908490610872565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106fe91815260200190565b60405180910390a3610537565b600060208083528351808285015260005b818110156107385785810183015185820160400152820161071c565b8181111561074a576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461077757600080fd5b919050565b6000806040838503121561078f57600080fd5b61079883610760565b946020939093013593505050565b6000806000606084860312156107bb57600080fd5b6107c484610760565b92506107d260208501610760565b9150604084013590509250925092565b6000602082840312156107f457600080fd5b6107fd82610760565b9392505050565b6000806040838503121561081757600080fd5b61082083610760565b915061082e60208401610760565b90509250929050565b600181811c9082168061084b57607f821691505b6020821081141561086c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561089357634e487b7160e01b600052601160045260246000fd5b50019056fea2646970667358221220defc8955c3c02a0a0a3f5d3ccbb278c4e49af78032ae9aa803f3b906b6677fb864736f6c63430008090033";
var deployedBytecode$1 = "0x608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101c6565b6040516100c3919061070b565b60405180910390f35b6100df6100da36600461077c565b610258565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f3660046107a6565b610270565b604051601281526020016100c3565b6100df61013136600461077c565b610294565b6100f36101443660046107e2565b6001600160a01b031660009081526020819052604090205490565b6100b66102d3565b6100df61017536600461077c565b6102e2565b6100df61018836600461077c565b610379565b6100f361019b366004610804565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d590610837565b80601f016020809104026020016040519081016040528092919081815260200182805461020190610837565b801561024e5780601f106102235761010080835404028352916020019161024e565b820191906000526020600020905b81548152906001019060200180831161023157829003601f168201915b5050505050905090565b600033610266818585610387565b5060019392505050565b60003361027e8582856104ab565b61028985858561053d565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061026690829086906102ce908790610872565b610387565b6060600480546101d590610837565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561036c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102898286868403610387565b60003361026681858561053d565b6001600160a01b0383166103e95760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610363565b6001600160a01b03821661044a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610363565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610537578181101561052a5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610363565b6105378484848403610387565b50505050565b6001600160a01b0383166105a15760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610363565b6001600160a01b0382166106035760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610363565b6001600160a01b0383166000908152602081905260409020548181101561067b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610363565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106b2908490610872565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106fe91815260200190565b60405180910390a3610537565b600060208083528351808285015260005b818110156107385785810183015185820160400152820161071c565b8181111561074a576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461077757600080fd5b919050565b6000806040838503121561078f57600080fd5b61079883610760565b946020939093013593505050565b6000806000606084860312156107bb57600080fd5b6107c484610760565b92506107d260208501610760565b9150604084013590509250925092565b6000602082840312156107f457600080fd5b6107fd82610760565b9392505050565b6000806040838503121561081757600080fd5b61082083610760565b915061082e60208401610760565b90509250929050565b600181811c9082168061084b57607f821691505b6020821081141561086c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561089357634e487b7160e01b600052601160045260246000fd5b50019056fea2646970667358221220defc8955c3c02a0a0a3f5d3ccbb278c4e49af78032ae9aa803f3b906b6677fb864736f6c63430008090033";
var linkReferences$1 = {
};
var deployedLinkReferences$1 = {
};
var ERC20Abi = {
	_format: _format$1,
	contractName: contractName$1,
	sourceName: sourceName$1,
	abi: abi$1,
	bytecode: bytecode$1,
	deployedBytecode: deployedBytecode$1,
	linkReferences: linkReferences$1,
	deployedLinkReferences: deployedLinkReferences$1
};

const NO_NETWORK = new Error('No network selected.');
const NO_EXPLORER_API = new Error('Explorer API not found.');

class Erc20Token {
    constructor(data) {
        this.name = xss__default["default"](data.name);
        this.symbol = xss__default["default"](data.symbol);
        this.address = data.address;
        this.decimals = data.decimals;
        this.chainId = data.chainId;
        this.data = data;
        //@ts-ignore
        this.contract = new web3.eth.Contract(ERC20Abi.abi, data.address);
    }
    toData() {
        return this.data;
    }
    static getData(address) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let contract = new web3.eth.Contract(ERC20Abi.abi, address);
            let contractCalls = yield Promise.all([
                contract.methods.name().call(),
                contract.methods.symbol().call(),
                contract.methods.decimals().call(),
            ]);
            // Purify the values for XSS protection
            let name = xss__default["default"](contractCalls[0]);
            let symbol = xss__default["default"](contractCalls[1]);
            let decimals = parseInt(contractCalls[2]);
            if (!exports.activeNetwork) {
                throw NO_NETWORK;
            }
            return {
                name,
                symbol,
                decimals,
                address,
                chainId: exports.activeNetwork.evmChainID,
            };
        });
    }
    balanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let bal = yield this.contract.methods.balanceOf(address).call();
            return new avajs.BN(bal);
        });
    }
}

exports.erc20Cache = {};
function getErc20Cache() {
    return Object.assign({}, exports.erc20Cache);
}
/**
 * Clears the internal erc20 cache.
 */
function bustErc20Cache() {
    exports.erc20Cache = {};
}
/**
 * Fetches ERC20 data from the given contract address and adds the token to the given store.
 * @param address ERC20 Contract address
 */
function addErc20Token(address) {
    return __awaiter(this, void 0, void 0, function* () {
        let existing = exports.erc20Cache[address];
        if (existing) {
            return existing;
        }
        try {
            let data = yield Erc20Token.getData(address);
            let token = new Erc20Token(data);
            exports.erc20Cache[address] = token;
            return token;
        }
        catch (e) {
            throw new Error('Unable to add ERC20 contract.');
        }
    });
}
/**
 * Initates and caches an erc20 token from the given data.
 * @param data Information such as name, symbol, and address about the ERC20 token.
 */
function addErc20TokenFromData(data) {
    let address = data.address;
    let existing = exports.erc20Cache[address];
    if (existing) {
        return existing;
    }
    let token = new Erc20Token(data);
    exports.erc20Cache[address] = token;
    return token;
}
function getContractDataErc20(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield Erc20Token.getData(address);
            return data;
        }
        catch (e) {
            throw new Error(`ERC20 contract ${address} does not exist.`);
        }
    });
}
function getErc20Token(address) {
    return __awaiter(this, void 0, void 0, function* () {
        let storeItem = exports.erc20Cache[address];
        if (storeItem) {
            return storeItem;
        }
        else {
            return yield addErc20Token(address);
        }
    });
}

function setNetwork(conf) {
    setRpcNetwork(conf);
    emitNetworkChange(conf);
    bustErc20Cache();
}
/**
 * Unlike `setNetwork` this function will fail if the network is not available.
 * @param conf
 */
function setNetworkAsync(conf) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setRpcNetworkAsync(conf);
        emitNetworkChange(conf);
        bustErc20Cache();
    });
}

/**
 * Given the chain ID returns the chain alias
 * @param id Chain id
 */
function idToChainAlias(id) {
    if (id === exports.activeNetwork.xChainID) {
        return 'X';
    }
    else if (id === exports.activeNetwork.pChainID) {
        return 'P';
    }
    else if (id === exports.activeNetwork.cChainID) {
        return 'C';
    }
    throw new Error('Unknown chain ID.');
}

/**
 * Given a chain alias, returns the chain id.
 * @param alias `X`, `P` or `C`
 */
function chainIdFromAlias(alias) {
    if (alias === 'X') {
        return xChain.getBlockchainID();
    }
    else if (alias === 'P') {
        return pChain.getBlockchainID();
    }
    else if (alias === 'C') {
        return cChain.getBlockchainID();
    }
    throw new Error('Unknown chain alias.');
}

const FILTER_ADDRESS_SIZE = 1000;
class AVMWebSocketProvider {
    constructor(wsUrl) {
        this.isConnected = false;
        this.wallets = [];
        this.boundHandler = () => this.onWalletAddressChange();
        this.socket = new Sockette__default["default"](wsUrl, {
            onopen: () => {
                this.onOpen();
            },
            onclose: () => {
                this.onClose();
            },
            onmessage: () => {
                this.onMessage();
            },
            onerror: () => {
                this.onError();
            },
        });
    }
    /**
     * Starts watching for transactions on this wallet.
     * @param wallet The wallet instance to track
     */
    trackWallet(wallet) {
        if (this.wallets.includes(wallet)) {
            return;
        }
        this.wallets.push(wallet);
        wallet.on('addressChanged', this.boundHandler);
        this.updateFilterAddresses();
    }
    onWalletAddressChange() {
        this.updateFilterAddresses();
    }
    removeWallet(w) {
        if (!this.wallets.includes(w)) {
            return;
        }
        let index = this.wallets.indexOf(w);
        this.wallets.splice(index, 1);
        w.off('addressChanged', this.boundHandler);
    }
    setEndpoint(wsUrl) {
        this.socket.close();
        this.socket = new Sockette__default["default"](wsUrl, {
            onopen: () => {
                this.onOpen();
            },
            onclose: () => {
                this.onClose();
            },
            onmessage: () => {
                this.onMessage();
            },
            onerror: () => {
                this.onError();
            },
        });
    }
    // Clears the filter listening to X chain transactions
    clearFilter() {
        let pubsub = new avajs.PubSub();
        let bloom = pubsub.newBloom(FILTER_ADDRESS_SIZE);
        this.socket.send(bloom);
    }
    /**
     * Creates a bloom filter from the addresses of the tracked wallets and subscribes to
     * transactions on the node.
     */
    updateFilterAddresses() {
        if (!this.isConnected) {
            return;
        }
        let wallets = this.wallets;
        let addrs = [];
        for (let i = 0; i < wallets.length; i++) {
            let w = wallets[i];
            let externalAddrs = w.getExternalAddressesXSync();
            let addrsLen = externalAddrs.length;
            let startIndex = Math.max(0, addrsLen - FILTER_ADDRESS_SIZE);
            let addAddrs = externalAddrs.slice(startIndex);
            addrs.push(...addAddrs);
        }
        let pubsub = new avajs.PubSub();
        let bloom = pubsub.newBloom(FILTER_ADDRESS_SIZE);
        this.socket.send(bloom);
        // Divide addresses by 100 and send multiple messages
        // There is a max msg size ~10kb
        const GROUP_AMOUNT = 100;
        let index = 0;
        while (index < addrs.length) {
            let chunk = addrs.slice(index, index + GROUP_AMOUNT);
            let addAddrs = pubsub.addAddresses(chunk);
            this.socket.send(addAddrs);
            index += GROUP_AMOUNT;
        }
    }
    updateWalletBalanceX() {
        this.wallets.forEach((w) => {
            w.updateUtxosX();
        });
    }
    onOpen() {
        this.isConnected = true;
        this.updateFilterAddresses();
    }
    onMessage() {
        this.updateWalletBalanceX();
    }
    onClose() {
        this.isConnected = false;
    }
    onError() { }
}

const SOCKET_RECONNECT_TIMEOUT = 1000;
class EVMWebSocketProvider {
    constructor(wsUrl) {
        this.wallets = [];
        let provider = new ethers.ethers.providers.WebSocketProvider(wsUrl);
        this.provider = provider;
        this.wsUrl = wsUrl;
        this.addListeners();
    }
    setEndpoint(wsUrl) {
        this.destroyConnection();
        let provider = new ethers.ethers.providers.WebSocketProvider(wsUrl);
        this.provider = provider;
        this.wsUrl = wsUrl;
        this.addListeners();
    }
    trackWallet(wallet) {
        if (this.wallets.includes(wallet)) {
            return;
        }
        this.wallets.push(wallet);
    }
    removeWallet(wallet) {
        if (!this.wallets.includes(wallet)) {
            return;
        }
        let index = this.wallets.indexOf(wallet);
        this.wallets.splice(index, 1);
    }
    destroyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.provider._websocket.onclose = () => { };
            yield this.provider.destroy();
        });
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear the current onclose handler so that we dont attempt a reconnection
            yield this.destroyConnection();
            let wsProvider = new ethers.ethers.providers.WebSocketProvider(this.wsUrl);
            this.provider = wsProvider;
        });
    }
    addListeners() {
        let provider = this.provider;
        provider.on('block', () => {
            this.onBlock();
        });
        // Save default function so we can keep calling it
        let defaultOnOpen = provider._websocket.onopen;
        let defaultOnClose = provider._websocket.onclose;
        provider._websocket.onopen = (ev) => {
            if (defaultOnOpen)
                defaultOnOpen(ev);
        };
        provider._websocket.onclose = (ev) => {
            if (defaultOnClose)
                defaultOnClose(ev);
            setTimeout(() => {
                this.reconnect();
            }, SOCKET_RECONNECT_TIMEOUT);
        };
    }
    removeListeners() {
        this.provider.off('block', this.onBlock);
    }
    onBlock() {
        // Update wallet balances
        this.wallets.forEach((w) => {
            w.updateAxcBalanceC();
        });
    }
}

class WebsocketProvider {
    constructor(avmEndpoint, evmEndpoint) {
        this.avmProvider = new AVMWebSocketProvider(avmEndpoint);
        this.evmProvider = new EVMWebSocketProvider(evmEndpoint);
    }
    static fromActiveNetwork() {
        return WebsocketProvider.fromNetworkConfig(exports.activeNetwork);
    }
    static fromNetworkConfig(config) {
        let evm = wsUrlFromConfigEVM(config);
        let avm = wsUrlFromConfigX(config);
        return new WebsocketProvider(avm, evm);
    }
    setEndpoints(avmEndpoint, evmEndpoint) {
        this.avmProvider.setEndpoint(avmEndpoint);
        this.evmProvider.setEndpoint(evmEndpoint);
    }
    setNetwork(config) {
        let evm = wsUrlFromConfigEVM(config);
        let avm = wsUrlFromConfigX(config);
        this.setEndpoints(avm, evm);
    }
    trackWallet(wallet) {
        this.avmProvider.trackWallet(wallet);
        this.evmProvider.trackWallet(wallet);
    }
    removeWallet(wallet) {
        this.avmProvider.removeWallet(wallet);
        this.evmProvider.removeWallet(wallet);
    }
}

function isFujiNetwork(activeNetwork) {
    return activeNetwork.networkID === TestnetConfig.networkID;
}
function isMainnetNetwork(activeNetwork) {
    return activeNetwork.networkID === MainnetConfig.networkID;
}
function isLocalNetwork(activeNetwork) {
    return activeNetwork.networkID === LocalnetConfig.networkID;
}
function getAxcAssetID() {
    return exports.activeNetwork.axcID;
}
function getActiveNetworkConfig() {
    return exports.activeNetwork;
}

// Default connection is Mainnet
setNetwork(MainnetConfig);

let assetCache = {};
function getAssetDescriptionSync(assetId) {
    if (typeof assetCache[assetId] === 'undefined')
        throw new Error(`Asset ID ${assetId} is not known.`);
    return assetCache[assetId];
}
/**
 * Uses the node api to get meta data given an asset ID. Saves the result to cache.
 * @param assetId
 */
function getAssetDescription(assetId) {
    return __awaiter(this, void 0, void 0, function* () {
        let cache = assetCache[assetId];
        if (cache) {
            return cache;
        }
        try {
            let res = yield xChain.getAssetDescription(assetId);
            let clean = Object.assign(Object.assign({}, res), { assetID: assetId, name: xss__default["default"](res.name), symbol: xss__default["default"](res.symbol) });
            assetCache[assetId] = clean;
            return clean;
        }
        catch (e) {
            throw new Error(`Asset ${assetId} does not exist.`);
        }
    });
}

var _format = "hh-sol-artifact-1";
var contractName = "ERC721";
var sourceName = "contracts/token/ERC721/ERC721.sol";
var abi = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name_",
				type: "string"
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "_data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode = "0x60806040523480156200001157600080fd5b50604051620014ed380380620014ed8339810160408190526200003491620001db565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b50505062000282565b828054620000769062000245565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013657600080fd5b81516001600160401b03808211156200015357620001536200010e565b604051601f8301601f19908116603f011681019082821181831017156200017e576200017e6200010e565b816040528381526020925086838588010111156200019b57600080fd5b600091505b83821015620001bf5785820183015181830184015290820190620001a0565b83821115620001d15760008385830101525b9695505050505050565b60008060408385031215620001ef57600080fd5b82516001600160401b03808211156200020757600080fd5b620002158683870162000124565b935060208501519150808211156200022c57600080fd5b506200023b8582860162000124565b9150509250929050565b600181811c908216806200025a57607f821691505b602082108114156200027c57634e487b7160e01b600052602260045260246000fd5b50919050565b61125b80620002926000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610d6b565b610228565b60405190151581526020015b60405180910390f35b61010461027a565b6040516100f39190610de0565b61012461011f366004610df3565b61030c565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610e28565b6103a6565b005b61014f61015f366004610e52565b6104bc565b61014f610172366004610e52565b6104ed565b610124610185366004610df3565b610508565b61019d610198366004610e8e565b61057f565b6040519081526020016100f3565b610104610606565b61014f6101c1366004610ea9565b610615565b61014f6101d4366004610efb565b610624565b6101046101e7366004610df3565b61065c565b6100e76101fa366004610fd7565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061025957506001600160e01b03198216635b5e139f60e01b145b8061027457506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102899061100a565b80601f01602080910402602001604051908101604052809291908181526020018280546102b59061100a565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661038a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103b182610508565b9050806001600160a01b0316836001600160a01b0316141561041f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610381565b336001600160a01b038216148061043b575061043b81336101fa565b6104ad5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610381565b6104b78383610744565b505050565b6104c633826107b2565b6104e25760405162461bcd60e51b815260040161038190611045565b6104b78383836108a9565b6104b783838360405180602001604052806000815250610624565b6000818152600260205260408120546001600160a01b0316806102745760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610381565b60006001600160a01b0382166105ea5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610381565b506001600160a01b031660009081526003602052604090205490565b6060600180546102899061100a565b610620338383610a45565b5050565b61062e33836107b2565b61064a5760405162461bcd60e51b815260040161038190611045565b61065684848484610b14565b50505050565b6000818152600260205260409020546060906001600160a01b03166106db5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610381565b60006106f260408051602081019091526000815290565b90506000815111610712576040518060200160405280600081525061073d565b8061071c84610b47565b60405160200161072d929190611096565b6040516020818303038152906040525b9392505050565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061077982610508565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b031661082b5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610381565b600061083683610508565b9050806001600160a01b0316846001600160a01b031614806108715750836001600160a01b03166108668461030c565b6001600160a01b0316145b806108a157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166108bc82610508565b6001600160a01b0316146109205760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610381565b6001600160a01b0382166109825760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610381565b61098d600082610744565b6001600160a01b03831660009081526003602052604081208054600192906109b69084906110db565b90915550506001600160a01b03821660009081526003602052604081208054600192906109e49084906110f2565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03161415610aa75760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610381565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610b1f8484846108a9565b610b2b84848484610c45565b6106565760405162461bcd60e51b81526004016103819061110a565b606081610b6b5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610b955780610b7f8161115c565b9150610b8e9050600a8361118d565b9150610b6f565b60008167ffffffffffffffff811115610bb057610bb0610ee5565b6040519080825280601f01601f191660200182016040528015610bda576020820181803683370190505b5090505b84156108a157610bef6001836110db565b9150610bfc600a866111a1565b610c079060306110f2565b60f81b818381518110610c1c57610c1c6111b5565b60200101906001600160f81b031916908160001a905350610c3e600a8661118d565b9450610bde565b60006001600160a01b0384163b15610d4757604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610c899033908990889088906004016111cb565b602060405180830381600087803b158015610ca357600080fd5b505af1925050508015610cd3575060408051601f3d908101601f19168201909252610cd091810190611208565b60015b610d2d573d808015610d01576040519150601f19603f3d011682016040523d82523d6000602084013e610d06565b606091505b508051610d255760405162461bcd60e51b81526004016103819061110a565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506108a1565b506001949350505050565b6001600160e01b031981168114610d6857600080fd5b50565b600060208284031215610d7d57600080fd5b813561073d81610d52565b60005b83811015610da3578181015183820152602001610d8b565b838111156106565750506000910152565b60008151808452610dcc816020860160208601610d88565b601f01601f19169290920160200192915050565b60208152600061073d6020830184610db4565b600060208284031215610e0557600080fd5b5035919050565b80356001600160a01b0381168114610e2357600080fd5b919050565b60008060408385031215610e3b57600080fd5b610e4483610e0c565b946020939093013593505050565b600080600060608486031215610e6757600080fd5b610e7084610e0c565b9250610e7e60208501610e0c565b9150604084013590509250925092565b600060208284031215610ea057600080fd5b61073d82610e0c565b60008060408385031215610ebc57600080fd5b610ec583610e0c565b915060208301358015158114610eda57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610f1157600080fd5b610f1a85610e0c565b9350610f2860208601610e0c565b925060408501359150606085013567ffffffffffffffff80821115610f4c57600080fd5b818701915087601f830112610f6057600080fd5b813581811115610f7257610f72610ee5565b604051601f8201601f19908116603f01168101908382118183101715610f9a57610f9a610ee5565b816040528281528a6020848701011115610fb357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610fea57600080fd5b610ff383610e0c565b915061100160208401610e0c565b90509250929050565b600181811c9082168061101e57607f821691505b6020821081141561103f57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600083516110a8818460208801610d88565b8351908301906110bc818360208801610d88565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156110ed576110ed6110c5565b500390565b60008219821115611105576111056110c5565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000600019821415611170576111706110c5565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261119c5761119c611177565b500490565b6000826111b0576111b0611177565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906111fe90830184610db4565b9695505050505050565b60006020828403121561121a57600080fd5b815161073d81610d5256fea264697066735822122024d65e76d601dd9ee59cb27f85be64e847ea64e23dc19b72ddf8d537e3d7c41264736f6c63430008090033";
var deployedBytecode = "0x608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610d6b565b610228565b60405190151581526020015b60405180910390f35b61010461027a565b6040516100f39190610de0565b61012461011f366004610df3565b61030c565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610e28565b6103a6565b005b61014f61015f366004610e52565b6104bc565b61014f610172366004610e52565b6104ed565b610124610185366004610df3565b610508565b61019d610198366004610e8e565b61057f565b6040519081526020016100f3565b610104610606565b61014f6101c1366004610ea9565b610615565b61014f6101d4366004610efb565b610624565b6101046101e7366004610df3565b61065c565b6100e76101fa366004610fd7565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061025957506001600160e01b03198216635b5e139f60e01b145b8061027457506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102899061100a565b80601f01602080910402602001604051908101604052809291908181526020018280546102b59061100a565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661038a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103b182610508565b9050806001600160a01b0316836001600160a01b0316141561041f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610381565b336001600160a01b038216148061043b575061043b81336101fa565b6104ad5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610381565b6104b78383610744565b505050565b6104c633826107b2565b6104e25760405162461bcd60e51b815260040161038190611045565b6104b78383836108a9565b6104b783838360405180602001604052806000815250610624565b6000818152600260205260408120546001600160a01b0316806102745760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610381565b60006001600160a01b0382166105ea5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610381565b506001600160a01b031660009081526003602052604090205490565b6060600180546102899061100a565b610620338383610a45565b5050565b61062e33836107b2565b61064a5760405162461bcd60e51b815260040161038190611045565b61065684848484610b14565b50505050565b6000818152600260205260409020546060906001600160a01b03166106db5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610381565b60006106f260408051602081019091526000815290565b90506000815111610712576040518060200160405280600081525061073d565b8061071c84610b47565b60405160200161072d929190611096565b6040516020818303038152906040525b9392505050565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061077982610508565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b031661082b5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610381565b600061083683610508565b9050806001600160a01b0316846001600160a01b031614806108715750836001600160a01b03166108668461030c565b6001600160a01b0316145b806108a157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166108bc82610508565b6001600160a01b0316146109205760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610381565b6001600160a01b0382166109825760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610381565b61098d600082610744565b6001600160a01b03831660009081526003602052604081208054600192906109b69084906110db565b90915550506001600160a01b03821660009081526003602052604081208054600192906109e49084906110f2565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03161415610aa75760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610381565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610b1f8484846108a9565b610b2b84848484610c45565b6106565760405162461bcd60e51b81526004016103819061110a565b606081610b6b5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610b955780610b7f8161115c565b9150610b8e9050600a8361118d565b9150610b6f565b60008167ffffffffffffffff811115610bb057610bb0610ee5565b6040519080825280601f01601f191660200182016040528015610bda576020820181803683370190505b5090505b84156108a157610bef6001836110db565b9150610bfc600a866111a1565b610c079060306110f2565b60f81b818381518110610c1c57610c1c6111b5565b60200101906001600160f81b031916908160001a905350610c3e600a8661118d565b9450610bde565b60006001600160a01b0384163b15610d4757604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610c899033908990889088906004016111cb565b602060405180830381600087803b158015610ca357600080fd5b505af1925050508015610cd3575060408051601f3d908101601f19168201909252610cd091810190611208565b60015b610d2d573d808015610d01576040519150601f19603f3d011682016040523d82523d6000602084013e610d06565b606091505b508051610d255760405162461bcd60e51b81526004016103819061110a565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506108a1565b506001949350505050565b6001600160e01b031981168114610d6857600080fd5b50565b600060208284031215610d7d57600080fd5b813561073d81610d52565b60005b83811015610da3578181015183820152602001610d8b565b838111156106565750506000910152565b60008151808452610dcc816020860160208601610d88565b601f01601f19169290920160200192915050565b60208152600061073d6020830184610db4565b600060208284031215610e0557600080fd5b5035919050565b80356001600160a01b0381168114610e2357600080fd5b919050565b60008060408385031215610e3b57600080fd5b610e4483610e0c565b946020939093013593505050565b600080600060608486031215610e6757600080fd5b610e7084610e0c565b9250610e7e60208501610e0c565b9150604084013590509250925092565b600060208284031215610ea057600080fd5b61073d82610e0c565b60008060408385031215610ebc57600080fd5b610ec583610e0c565b915060208301358015158114610eda57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610f1157600080fd5b610f1a85610e0c565b9350610f2860208601610e0c565b925060408501359150606085013567ffffffffffffffff80821115610f4c57600080fd5b818701915087601f830112610f6057600080fd5b813581811115610f7257610f72610ee5565b604051601f8201601f19908116603f01168101908382118183101715610f9a57610f9a610ee5565b816040528281528a6020848701011115610fb357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610fea57600080fd5b610ff383610e0c565b915061100160208401610e0c565b90509250929050565b600181811c9082168061101e57607f821691505b6020821081141561103f57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600083516110a8818460208801610d88565b8351908301906110bc818360208801610d88565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156110ed576110ed6110c5565b500390565b60008219821115611105576111056110c5565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000600019821415611170576111706110c5565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261119c5761119c611177565b500490565b6000826111b0576111b0611177565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906111fe90830184610db4565b9695505050505050565b60006020828403121561121a57600080fd5b815161073d81610d5256fea264697066735822122024d65e76d601dd9ee59cb27f85be64e847ea64e23dc19b72ddf8d537e3d7c41264736f6c63430008090033";
var linkReferences = {
};
var deployedLinkReferences = {
};
var ERC721Abi = {
	_format: _format,
	contractName: contractName,
	sourceName: sourceName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	linkReferences: linkReferences,
	deployedLinkReferences: deployedLinkReferences
};

// import { web3 } from '@/Network';
// import { AbiItem } from 'web3-utils';
/**
 * Returns an ethers ERC721 Contract
 * @param address
 */
function getErc721TokenEthers(address) {
    return ethers.ContractFactory.getContract(address, abi);
}
/**
 * Returns an web3 ERC721 Contract
 * @param address
 */
// export function getErc721TokenWeb3(address: string) {
//     return new web3.eth.Contract(abi as AbiItem[], address);
// }

/**
 * @ignore
 */
/**
 * Helper utility for encryption and password hashing, browser-safe.
 * Encryption is using AES-GCM with a random public nonce.
 */
class CryptoHelpers {
    constructor() {
        this.ivSize = 12;
        this.saltSize = 16;
        this.tagLength = 128;
        this.aesLength = 256;
        this.keygenIterations = 200000; //3.0, 2.0 uses 100000
    }
    /**
     * Internal-intended function for cleaning passwords.
     *
     * @param password
     * @param salt
     */
    _pwcleaner(password, slt) {
        const pw = _.Buffer.from(password, 'utf8');
        return this.sha256(_.Buffer.concat([pw, slt]));
    }
    /**
     * Internal-intended function for producing an intermediate key.
     *
     * @param pwkey
     */
    _keyMaterial(pwkey) {
        return __awaiter(this, void 0, void 0, function* () {
            return crypto.subtle.importKey('raw', new Uint8Array(pwkey), { name: 'PBKDF2' }, false, ['deriveKey']);
        });
    }
    /**
     * Internal-intended function for turning an intermediate key into a salted key.
     *
     * @param keyMaterial
     * @param salt
     */
    _deriveKey(keyMaterial, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return crypto.subtle.deriveKey({
                name: 'PBKDF2',
                salt,
                iterations: this.keygenIterations,
                hash: 'SHA-256',
            }, keyMaterial, { name: 'AES-GCM', length: this.aesLength }, false, ['encrypt', 'decrypt']);
        });
    }
    /**
     * A SHA256 helper function.
     *
     * @param message The message to hash
     *
     * @returns A {@link https://github.com/feross/buffer|Buffer} containing the SHA256 hash of the message
     */
    sha256(message) {
        let buff;
        if (typeof message === 'string') {
            buff = _.Buffer.from(message, 'utf8');
        }
        else {
            buff = _.Buffer.from(message);
        }
        return _.Buffer.from(createHash__default["default"]('sha256').update(buff).digest()); // ensures correct Buffer class is used
    }
    /**
     * Generates a randomized {@link https://github.com/feross/buffer|Buffer} to be used as a salt
     */
    makeSalt() {
        const salt = _.Buffer.alloc(this.saltSize);
        crypto.getRandomValues(salt);
        return salt;
    }
    /**
     * Produces a password-safe hash.
     *
     * @param password A string for the password
     * @param salt An optional {@link https://github.com/feross/buffer|Buffer} containing a salt used in the password hash
     *
     * @returns An object containing the "salt" and the "hash" produced by this function, both as {@link https://github.com/feross/buffer|Buffer}.
     */
    pwhash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            let slt;
            if (salt instanceof _.Buffer) {
                slt = salt;
                // @ts-ignore
            }
            else if (salt instanceof Uint8Array && process.env.NODE_ENV === 'test') {
                slt = salt;
            }
            else {
                slt = this.makeSalt();
            }
            const hash = this._pwcleaner(password, this._pwcleaner(password, slt));
            return { salt: slt, hash };
        });
    }
    /**
     * Encrypts plaintext with the provided password using AES-GCM.
     *
     * @param password A string for the password
     * @param plaintext The plaintext to encrypt
     * @param salt An optional {@link https://github.com/feross/buffer|Buffer} for the salt to use in the encryption process
     *
     * @returns An object containing the "salt", "iv", and "ciphertext", all as {@link https://github.com/feross/buffer|Buffer}.
     */
    encrypt(password, plaintext, salt = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            let slt;
            if (typeof salt !== 'undefined' && salt instanceof _.Buffer) {
                slt = salt;
            }
            else {
                slt = this.makeSalt();
            }
            let pt;
            if (typeof plaintext !== 'undefined' && plaintext instanceof _.Buffer) {
                pt = plaintext;
            }
            else {
                pt = _.Buffer.from(plaintext, 'utf8');
            }
            const pwkey = this._pwcleaner(password, slt);
            const keyMaterial = yield this._keyMaterial(pwkey);
            const pkey = yield this._deriveKey(keyMaterial, slt);
            const iv = _.Buffer.from(crypto.getRandomValues(new Uint8Array(this.ivSize)));
            const ciphertext = _.Buffer.from(yield crypto.subtle.encrypt({
                name: 'AES-GCM',
                iv,
                additionalData: slt,
                tagLength: this.tagLength,
            }, pkey, pt));
            return {
                salt: slt,
                iv,
                ciphertext,
            };
        });
    }
    /**
     * Decrypts ciphertext with the provided password, iv, and salt.
     *
     * @param password A string for the password
     * @param ciphertext A {@link https://github.com/feross/buffer|Buffer} for the ciphertext
     * @param salt A {@link https://github.com/feross/buffer|Buffer} for the salt
     * @param iv A {@link https://github.com/feross/buffer|Buffer} for the iv
     */
    decrypt(password, ciphertext, salt, iv) {
        return __awaiter(this, void 0, void 0, function* () {
            const pwkey = this._pwcleaner(password, salt);
            const keyMaterial = yield this._keyMaterial(pwkey);
            const pkey = yield this._deriveKey(keyMaterial, salt);
            const pt = _.Buffer.from(yield crypto.subtle.decrypt({
                name: 'AES-GCM',
                iv,
                additionalData: salt,
                tagLength: 128, // The tagLength you used to encrypt (if any)
            }, pkey, // from generateKey or importKey above
            ciphertext // ArrayBuffer of the data
            ));
            return pt;
        });
    }
}

const KEYSTORE_VERSION = '6.0'; // the current version
const ITERATIONS_V2 = 100000;
const ITERATIONS_V3 = 200000; // and any version above

const cryptoHelpers = new CryptoHelpers();
function readV2(data, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = data.version;
        cryptoHelpers.keygenIterations = ITERATIONS_V2;
        let salt = bintools.cb58Decode(data.salt);
        let pass_hash = data.pass_hash;
        let checkHashString;
        let checkHash = yield cryptoHelpers._pwcleaner(pass, salt);
        checkHashString = bintools.cb58Encode(avajs.Buffer.from(checkHash));
        if (checkHashString !== pass_hash) {
            throw 'INVALID_PASS';
        }
        let keys = data.keys;
        let keysDecrypt = [];
        for (let i = 0; i < keys.length; i++) {
            let key_data = keys[i];
            let key = bintools.cb58Decode(key_data.key);
            let nonce = bintools.cb58Decode(key_data.iv);
            let key_decrypt = yield cryptoHelpers.decrypt(pass, key, salt, nonce);
            let key_string = bintools.cb58Encode(avajs.Buffer.from(key_decrypt));
            keysDecrypt.push({
                key: key_string,
            });
        }
        return {
            version,
            activeIndex: 0,
            keys: keysDecrypt,
        };
    });
}
function readV3(data, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = data.version;
        cryptoHelpers.keygenIterations = ITERATIONS_V3;
        let salt = bintools.cb58Decode(data.salt);
        let pass_hash = data.pass_hash;
        let checkHashString;
        let checkHash = yield cryptoHelpers.pwhash(pass, salt);
        checkHashString = bintools.cb58Encode(avajs.Buffer.from(checkHash.hash));
        if (checkHashString !== pass_hash) {
            throw 'INVALID_PASS';
        }
        let keys = data.keys;
        let keysDecrypt = [];
        for (let i = 0; i < keys.length; i++) {
            let key_data = keys[i];
            let key = bintools.cb58Decode(key_data.key);
            let nonce = bintools.cb58Decode(key_data.iv);
            let key_decrypt = yield cryptoHelpers.decrypt(pass, key, salt, nonce);
            let key_string = bintools.cb58Encode(avajs.Buffer.from(key_decrypt));
            keysDecrypt.push({
                key: key_string,
            });
        }
        return {
            version,
            activeIndex: 0,
            keys: keysDecrypt,
        };
    });
}
function readV4(data, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = data.version;
        cryptoHelpers.keygenIterations = ITERATIONS_V3;
        let salt = bintools.cb58Decode(data.salt);
        let pass_hash = data.pass_hash;
        let checkHashString;
        let checkHash = yield cryptoHelpers.pwhash(pass, salt);
        checkHashString = bintools.cb58Encode(avajs.Buffer.from(checkHash.hash));
        if (checkHashString !== pass_hash) {
            throw 'INVALID_PASS';
        }
        let keys = data.keys;
        let keysDecrypt = [];
        for (let i = 0; i < keys.length; i++) {
            let key_data = keys[i];
            let key = bintools.cb58Decode(key_data.key);
            let nonce = bintools.cb58Decode(key_data.iv);
            let key_decrypt = yield cryptoHelpers.decrypt(pass, key, salt, nonce);
            let key_string = bintools.cb58Encode(avajs.Buffer.from(key_decrypt));
            keysDecrypt.push({
                key: key_string,
            });
        }
        return {
            version,
            activeIndex: 0,
            keys: keysDecrypt,
        };
    });
}
function readV5(data, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = data.version;
        cryptoHelpers.keygenIterations = ITERATIONS_V3;
        let salt = bintools.cb58Decode(data.salt);
        let pass_hash = data.pass_hash;
        let checkHashString;
        let checkHash = yield cryptoHelpers.pwhash(pass, salt);
        checkHashString = bintools.cb58Encode(avajs.Buffer.from(checkHash.hash));
        if (checkHashString !== pass_hash) {
            throw 'INVALID_PASS';
        }
        let keys = data.keys;
        let keysDecrypt = [];
        for (let i = 0; i < keys.length; i++) {
            let key_data = keys[i];
            let key = bintools.cb58Decode(key_data.key);
            let nonce = bintools.cb58Decode(key_data.iv);
            let key_decrypt = yield cryptoHelpers.decrypt(pass, key, salt, nonce);
            let key_string = key_decrypt.toString();
            keysDecrypt.push({
                key: key_string,
            });
        }
        return {
            version,
            activeIndex: 0,
            keys: keysDecrypt,
        };
    });
}
function readV6(data, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = data.version;
        const activeIndex = data.activeIndex;
        cryptoHelpers.keygenIterations = ITERATIONS_V3;
        let salt = bintools.cb58Decode(data.salt);
        let keys = data.keys;
        let keysDecrypt = [];
        for (let i = 0; i < keys.length; i++) {
            let key_data = keys[i];
            let key = bintools.cb58Decode(key_data.key);
            let type = key_data.type;
            let nonce = bintools.cb58Decode(key_data.iv);
            let key_decrypt;
            try {
                key_decrypt = yield cryptoHelpers.decrypt(pass, key, salt, nonce);
            }
            catch (e) {
                throw 'INVALID_PASS';
            }
            const key_string = key_decrypt.toString();
            keysDecrypt.push({
                key: key_string,
                type: type,
            });
        }
        return {
            version,
            activeIndex: activeIndex || 0,
            keys: keysDecrypt,
        };
    });
}
/**
 * Will decrypt and return the keys of the encrypted wallets in the given json file
 * @param data A JSON file of encrypted wallet keys
 * @param pass The password to decrypt the keys
 */
function readKeyFile(data, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (data.version) {
            case '6.0':
                return yield readV6(data, pass);
            case '5.0':
                return yield readV5(data, pass);
            case '4.0':
                return yield readV4(data, pass);
            case '3.0':
                return yield readV3(data, pass);
            case '2.0':
                return yield readV2(data, pass);
            default:
                throw 'INVALID_VERSION';
        }
    });
}
function extractKeysV2(file) {
    xChain.getBlockchainAlias();
    let keys = file.keys;
    return keys.map((key) => {
        // Private keys from the keystore file do not have the PrivateKey- prefix
        let pk = 'PrivateKey-' + key.key;
        // let keypair = keyToKeypair(pk, chainID)
        let keypair = xChain.newKeyChain().importKey(pk);
        let keyBuf = keypair.getPrivateKey();
        let keyHex = keyBuf.toString('hex');
        let paddedKeyHex = keyHex.padStart(64, '0');
        let mnemonic = bip39__namespace.entropyToMnemonic(paddedKeyHex);
        return {
            key: mnemonic,
            type: 'mnemonic',
        };
    });
}
function extractKeysV5(file) {
    return file.keys.map((key) => ({
        key: key.key,
        type: 'mnemonic',
    }));
}
function extractKeysV6(file) {
    return file.keys.map((key) => ({
        type: key.type,
        key: key.key,
    }));
}
function extractKeysFromDecryptedFile(file) {
    switch (file.version) {
        case '6.0':
            return extractKeysV6(file);
        case '5.0':
            return extractKeysV5(file);
        case '4.0':
            return extractKeysV2(file);
        case '3.0':
            return extractKeysV2(file);
        case '2.0':
            return extractKeysV2(file);
        default:
            throw 'INVALID_VERSION';
    }
}
/**
 * Given an array of wallets, the active index, and a password, return an encrypted JSON object that is the keystore file
 * @param wallets An array of wallet to encrypt
 * @param pass Password used in encryption
 * @param activeIndex Index of the active wallet in the `wallets` array
 * @return Returns a JSON object that can later be decrypted with `readKeyfile` and the given password
 */
function makeKeyfile(wallets, pass, activeIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        // 3.0 and above uses 200,000
        cryptoHelpers.keygenIterations = ITERATIONS_V3;
        let salt = yield cryptoHelpers.makeSalt();
        let keys = [];
        for (let i = 0; i < wallets.length; i++) {
            let wallet = wallets[i];
            let key;
            let type;
            if (wallet.type === 'singleton') {
                key = wallet.key;
                type = 'singleton';
            }
            else {
                key = wallet.getMnemonic();
                type = 'mnemonic';
            }
            let pk_crypt = yield cryptoHelpers.encrypt(pass, key, salt);
            let key_data = {
                key: bintools.cb58Encode(avajs.Buffer.from(pk_crypt.ciphertext)),
                iv: bintools.cb58Encode(avajs.Buffer.from(pk_crypt.iv)),
                type: type,
            };
            keys.push(key_data);
        }
        let file_data = {
            version: KEYSTORE_VERSION,
            salt: bintools.cb58Encode(avajs.Buffer.from(salt)),
            activeIndex,
            keys: keys,
        };
        return file_data;
    });
}

// HD WALLET
// m / purpose' / coin_type' / account' / change / address_index
const AXC_TOKEN_INDEX = '9000';
const AXC_TOKEN_PATH = `m/44'/${AXC_TOKEN_INDEX}'`;
const AXC_ACCOUNT_PATH = `m/44'/${AXC_TOKEN_INDEX}'/0'`; // Change and index left out
const ETH_ACCOUNT_PATH = `m/44'/60'/0'`;
const LEDGER_ETH_ACCOUNT_PATH = ETH_ACCOUNT_PATH + '/0/0';
const HD_SCAN_GAP_SIZE = 20; // a gap of at least 20 indexes is needed to claim an index unused
const SCAN_SIZE = 70; // the total number of utxos to look at initially to calculate last index
const HD_SCAN_LOOK_UP_WINDOW = 64; // Number of addresses to check with the explorer at a single call
const SCAN_RANGE = SCAN_SIZE - HD_SCAN_GAP_SIZE; // How many items are actually scanned
const LEDGER_EXCHANGE_TIMEOUT = 90000;
const MIN_EVM_SUPPORT_V = '0.5.3';
/**
 * In order to free the thread when deriving addresses, the execution will sleep every N address derived
 */
const DERIVATION_SLEEP_INTERVAL = 200;

function buildCreateNftFamilyTx(name, symbol, groupNum, fromAddrs, minterAddr, changeAddr, utxoSet) {
    return __awaiter(this, void 0, void 0, function* () {
        let fromAddresses = fromAddrs;
        let changeAddress = changeAddr;
        let minterAddress = minterAddr;
        const minterSets = [];
        // Create the groups
        for (let i = 0; i < groupNum; i++) {
            const minterSet = new avm.MinterSet(1, [minterAddress]);
            minterSets.push(minterSet);
        }
        let unsignedTx = yield xChain.buildCreateNFTAssetTx(utxoSet, fromAddresses, [changeAddress], minterSets, name, symbol);
        return unsignedTx;
    });
}
function buildMintNftTx(mintUtxo, payload, quantity, ownerAddress, changeAddress, fromAddresses, utxoSet) {
    return __awaiter(this, void 0, void 0, function* () {
        let addrBuf = bintools.parseAddress(ownerAddress, 'X');
        let owners = [];
        let sourceAddresses = fromAddresses;
        for (let i = 0; i < quantity; i++) {
            let owner = new common.OutputOwners([addrBuf]);
            owners.push(owner);
        }
        let groupID = mintUtxo.getOutput().getGroupID();
        let mintTx = yield xChain.buildCreateNFTMintTx(utxoSet, owners, sourceAddresses, [changeAddress], mintUtxo.getUTXOID(), groupID, payload);
        return mintTx;
    });
}
function buildAvmExportTransaction(destinationChain, utxoSet, fromAddresses, toAddress, amount, // export amount + fee
sourceChangeAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let destinationChainId = chainIdFromAlias(destinationChain);
        return yield xChain.buildExportTx(utxoSet, amount, destinationChainId, [toAddress], fromAddresses, [
            sourceChangeAddress,
        ]);
    });
}
function buildPlatformExportTransaction(utxoSet, fromAddresses, toAddress, amount, // export amount + fee
sourceChangeAddress, destinationChain) {
    return __awaiter(this, void 0, void 0, function* () {
        let destinationChainId = chainIdFromAlias(destinationChain);
        return yield pChain.buildExportTx(utxoSet, amount, destinationChainId, [toAddress], fromAddresses, [
            sourceChangeAddress,
        ]);
    });
}
/**
 *
 * @param fromAddresses
 * @param toAddress
 * @param amount
 * @param fromAddressBech
 * @param destinationChain Either `X` or `P`
 * @param fee Export fee in nAXC
 */
function buildEvmExportTransaction(fromAddresses, toAddress, amount, // export amount + fee
fromAddressBech, destinationChain, fee) {
    return __awaiter(this, void 0, void 0, function* () {
        let destinationChainId = chainIdFromAlias(destinationChain);
        const nonce = yield web3.eth.getTransactionCount(fromAddresses[0]);
        const axcAssetIDBuf = yield xChain.getAXCAssetID();
        const axcAssetIDStr = bintools.cb58Encode(axcAssetIDBuf);
        let fromAddressHex = fromAddresses[0];
        return yield cChain.buildExportTx(amount, axcAssetIDStr, destinationChainId, fromAddressHex, fromAddressBech, [toAddress], nonce, undefined, undefined, fee);
    });
}
function buildEvmTransferEIP1559Tx(from, to, amount, // in wei
priorityFee, maxFee, gasLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        const nonce = yield web3.eth.getTransactionCount(from);
        const chainId = yield web3.eth.getChainId();
        const networkId = yield web3.eth.net.getId();
        const common = EthereumjsCommon__default["default"].custom({ networkId, chainId });
        const tx$1 = tx.FeeMarketEIP1559Transaction.fromTxData({
            nonce: nonce,
            maxFeePerGas: '0x' + maxFee.toString('hex'),
            maxPriorityFeePerGas: '0x' + priorityFee.toString('hex'),
            gasLimit: gasLimit,
            to: to,
            value: '0x' + amount.toString('hex'),
            data: '0x',
        }, { common });
        return tx$1;
    });
}
function buildEvmTransferNativeTx(from, to, amount, // in wei
gasPrice, gasLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        const nonce = yield web3.eth.getTransactionCount(from);
        const chainId = yield web3.eth.getChainId();
        const networkId = yield web3.eth.net.getId();
        const common = EthereumjsCommon__default["default"].custom({ networkId, chainId });
        const tx$1 = tx.Transaction.fromTxData({
            nonce: nonce,
            gasPrice: '0x' + gasPrice.toString('hex'),
            gasLimit: gasLimit,
            to: to,
            value: '0x' + amount.toString('hex'),
            data: '0x',
        }, { common });
        return tx$1;
    });
}
function buildCustomEvmTx(from, gasPrice, gasLimit, data, to, value, nonce) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof nonce === 'undefined') {
            nonce = yield web3.eth.getTransactionCount(from);
        }
        const chainId = yield web3.eth.getChainId();
        const networkId = yield web3.eth.net.getId();
        const chainParams = {
            common: EthereumjsCommon__default["default"].forCustomChain('mainnet', { networkId, chainId }, 'istanbul'),
        };
        let gasPriceHex = `0x${gasPrice.toString('hex')}`;
        let tx$1 = tx.Transaction.fromTxData({
            nonce,
            gasPrice: gasPriceHex,
            gasLimit,
            value,
            to,
            data,
        }, chainParams);
        return tx$1;
    });
}
function buildEvmTransferErc20Tx(from, to, amount, // in wei
gasPrice, gasLimit, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const cont = new web3.eth.Contract(ERC20Abi.abi, contractAddress);
        const tokenTx = cont.methods.transfer(to, amount.toString());
        let data = tokenTx.encodeABI();
        let tx = yield buildCustomEvmTx(from, gasPrice, gasLimit, data, contractAddress);
        return tx;
    });
}
function buildEvmTransferErc721Tx(from, to, gasPrice, gasLimit, tokenContract, tokenId) {
    return __awaiter(this, void 0, void 0, function* () {
        const nonce = yield web3.eth.getTransactionCount(from);
        const chainId = yield web3.eth.getChainId();
        const networkId = yield web3.eth.net.getId();
        const chainParams = {
            common: EthereumjsCommon__default["default"].forCustomChain('mainnet', { networkId, chainId }, 'istanbul'),
        };
        // @ts-ignore
        const contract = new web3.eth.Contract(ERC721Abi.abi, tokenContract);
        const tokenTx = contract.methods['safeTransferFrom(address,address,uint256)'](from, to, tokenId);
        let tx$1 = tx.Transaction.fromTxData({
            nonce: nonce,
            gasPrice: '0x' + gasPrice.toString('hex'),
            gasLimit: gasLimit,
            value: '0x0',
            to: tokenContract,
            data: tokenTx.encodeABI(),
        }, chainParams);
        return tx$1;
    });
}
function estimateErc20Gas(tokenContract, from, to, value) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const contract = new web3.eth.Contract(ERC20Abi.abi, tokenContract);
        const tokenTx = contract.methods.transfer(to, value.toString());
        return yield tokenTx.estimateGas({
            from: from,
        });
    });
}
/**
 * Estimate the gas limit for the ERC721 `safeTransferFrom(address,address,uint256)` method.
 * @param contract
 * @param from
 * @param to
 * @param tokenID
 */
function estimateErc721TransferGas(contract, from, to, tokenID) {
    return __awaiter(this, void 0, void 0, function* () {
        let c = getErc721TokenEthers(contract);
        c = c.connect(exports.ethersProvider);
        const gas = yield c.estimateGas['safeTransferFrom(address,address,uint256)'](from, to, tokenID);
        return gas.toNumber();
    });
}
/**
 * Estimates the gas needed to send AXC
 * @param to Destination address
 * @param amount Amount of AXC to send, given in WEI
 * @param gasPrice Given in WEI
 */
function estimateAxcGas(from, to, amount, gasPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield web3.eth.estimateGas({
                from,
                to,
                gasPrice: `0x${gasPrice.toString('hex')}`,
                value: `0x${amount.toString('hex')}`,
            });
        }
        catch (e) {
            // TODO: Throws an error if we do not have enough axc balance
            //TODO: Is it ok to return 21000
            return 21000;
        }
    });
}
var AvmTxNameEnum;
(function (AvmTxNameEnum) {
    AvmTxNameEnum[AvmTxNameEnum["Transaction"] = avm.AVMConstants.BASETX] = "Transaction";
    AvmTxNameEnum[AvmTxNameEnum["Mint"] = avm.AVMConstants.CREATEASSETTX] = "Mint";
    AvmTxNameEnum[AvmTxNameEnum["Operation"] = avm.AVMConstants.OPERATIONTX] = "Operation";
    AvmTxNameEnum[AvmTxNameEnum["Import"] = avm.AVMConstants.IMPORTTX] = "Import";
    AvmTxNameEnum[AvmTxNameEnum["Export"] = avm.AVMConstants.EXPORTTX] = "Export";
})(AvmTxNameEnum || (AvmTxNameEnum = {}));
var PlatfromTxNameEnum;
(function (PlatfromTxNameEnum) {
    PlatfromTxNameEnum[PlatfromTxNameEnum["Transaction"] = platformvm.PlatformVMConstants.BASETX] = "Transaction";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Add Validator"] = platformvm.PlatformVMConstants.ADDVALIDATORTX] = "Add Validator";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Add Delegator"] = platformvm.PlatformVMConstants.ADDDELEGATORTX] = "Add Delegator";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Import"] = platformvm.PlatformVMConstants.IMPORTTX] = "Import";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Export"] = platformvm.PlatformVMConstants.EXPORTTX] = "Export";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Add Subnet Validator"] = platformvm.PlatformVMConstants.ADDSUBNETVALIDATORTX] = "Add Subnet Validator";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Create Chain"] = platformvm.PlatformVMConstants.CREATECHAINTX] = "Create Chain";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Create Subnet"] = platformvm.PlatformVMConstants.CREATESUBNETTX] = "Create Subnet";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Advance Time"] = platformvm.PlatformVMConstants.ADVANCETIMETX] = "Advance Time";
    PlatfromTxNameEnum[PlatfromTxNameEnum["Reward Validator"] = platformvm.PlatformVMConstants.REWARDVALIDATORTX] = "Reward Validator";
})(PlatfromTxNameEnum || (PlatfromTxNameEnum = {}));
// TODO: create asset transactions
var ParseableAvmTxEnum;
(function (ParseableAvmTxEnum) {
    ParseableAvmTxEnum[ParseableAvmTxEnum["Transaction"] = avm.AVMConstants.BASETX] = "Transaction";
    ParseableAvmTxEnum[ParseableAvmTxEnum["Import"] = avm.AVMConstants.IMPORTTX] = "Import";
    ParseableAvmTxEnum[ParseableAvmTxEnum["Export"] = avm.AVMConstants.EXPORTTX] = "Export";
})(ParseableAvmTxEnum || (ParseableAvmTxEnum = {}));
var ParseablePlatformEnum;
(function (ParseablePlatformEnum) {
    ParseablePlatformEnum[ParseablePlatformEnum["Transaction"] = platformvm.PlatformVMConstants.BASETX] = "Transaction";
    ParseablePlatformEnum[ParseablePlatformEnum["Add Validator"] = platformvm.PlatformVMConstants.ADDVALIDATORTX] = "Add Validator";
    ParseablePlatformEnum[ParseablePlatformEnum["Add Delegator"] = platformvm.PlatformVMConstants.ADDDELEGATORTX] = "Add Delegator";
    ParseablePlatformEnum[ParseablePlatformEnum["Import"] = platformvm.PlatformVMConstants.IMPORTTX] = "Import";
    ParseablePlatformEnum[ParseablePlatformEnum["Export"] = platformvm.PlatformVMConstants.EXPORTTX] = "Export";
})(ParseablePlatformEnum || (ParseablePlatformEnum = {}));
var ParseableEvmTxEnum;
(function (ParseableEvmTxEnum) {
    ParseableEvmTxEnum[ParseableEvmTxEnum["Import"] = evm.EVMConstants.IMPORTTX] = "Import";
    ParseableEvmTxEnum[ParseableEvmTxEnum["Export"] = evm.EVMConstants.EXPORTTX] = "Export";
})(ParseableEvmTxEnum || (ParseableEvmTxEnum = {}));

var tx_helper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    buildCreateNftFamilyTx: buildCreateNftFamilyTx,
    buildMintNftTx: buildMintNftTx,
    buildAvmExportTransaction: buildAvmExportTransaction,
    buildPlatformExportTransaction: buildPlatformExportTransaction,
    buildEvmExportTransaction: buildEvmExportTransaction,
    buildEvmTransferEIP1559Tx: buildEvmTransferEIP1559Tx,
    buildEvmTransferNativeTx: buildEvmTransferNativeTx,
    buildCustomEvmTx: buildCustomEvmTx,
    buildEvmTransferErc20Tx: buildEvmTransferErc20Tx,
    buildEvmTransferErc721Tx: buildEvmTransferErc721Tx,
    estimateErc20Gas: estimateErc20Gas,
    estimateErc721TransferGas: estimateErc721TransferGas,
    estimateAxcGas: estimateAxcGas,
    get AvmTxNameEnum () { return AvmTxNameEnum; },
    get PlatfromTxNameEnum () { return PlatfromTxNameEnum; },
    get ParseableAvmTxEnum () { return ParseableAvmTxEnum; },
    get ParseablePlatformEnum () { return ParseablePlatformEnum; },
    get ParseableEvmTxEnum () { return ParseableEvmTxEnum; }
});

/*
 * Bitcoin BIP32 path helpers
 * (C) 2016 Alex Beregszaszi
 */

const HARDENED = 0x80000000;

var BIPPath = function (path) {
  if (!Array.isArray(path)) {
    throw new Error('Input must be an Array')
  }
  if (path.length === 0) {
    throw new Error('Path must contain at least one level')
  }
  for (var i = 0; i < path.length; i++) {
    if (typeof path[i] !== 'number') {
      throw new Error('Path element is not a number')
    }
  }
  this.path = path;
};

BIPPath.validatePathArray = function (path) {
  try {
    BIPPath.fromPathArray(path);
    return true
  } catch (e) {
    return false
  }
};

BIPPath.validateString = function (text, reqRoot) {
  try {
    BIPPath.fromString(text, reqRoot);
    return true
  } catch (e) {
    return false
  }
};

BIPPath.fromPathArray = function (path) {
  return new BIPPath(path)
};

BIPPath.fromString = function (text, reqRoot) {
  // skip the root
  if (/^m\//i.test(text)) {
    text = text.slice(2);
  } else if (reqRoot) {
    throw new Error('Root element is required')
  }

  var path = text.split('/');
  var ret = new Array(path.length);
  for (var i = 0; i < path.length; i++) {
    var tmp = /(\d+)([hH\']?)/.exec(path[i]);
    if (tmp === null) {
      throw new Error('Invalid input')
    }
    ret[i] = parseInt(tmp[1], 10);

    if (ret[i] >= HARDENED) {
      throw new Error('Invalid child index')
    }

    if (tmp[2] === 'h' || tmp[2] === 'H' || tmp[2] === '\'') {
      ret[i] += HARDENED;
    } else if (tmp[2].length != 0) {
      throw new Error('Invalid modifier')
    }
  }
  return new BIPPath(ret)
};

BIPPath.prototype.toPathArray = function () {
  return this.path
};

BIPPath.prototype.toString = function (noRoot, oldStyle) {
  var ret = new Array(this.path.length);
  for (var i = 0; i < this.path.length; i++) {
    var tmp = this.path[i];
    if (tmp & HARDENED) {
      ret[i] = (tmp & ~HARDENED) + (oldStyle ? 'h' : '\'');
    } else {
      ret[i] = tmp;
    }
  }
  return (noRoot ? '' : 'm/') + ret.join('/')
};

BIPPath.prototype.inspect = function () {
  return 'BIPPath <' + this.toString() + '>'
};

var bip32Path = BIPPath;

/**
 * Given an account number, returns the Axia account derivation path as a string
 * @param accountIndex
 */
function getAccountPathAxia(accountIndex) {
    if (accountIndex < 0)
        throw new Error('Account index can not be less than 0.');
    return `${AXC_TOKEN_PATH}/${accountIndex}'`;
}
/**
 * Returns the string `m/44'/60'/0'/0/n` where `n` is the account index.
 * @param accountIndex
 */
function getAccountPathEVM(accountIndex) {
    if (accountIndex < 0)
        throw new Error('Account index can not be less than 0.');
    return `${ETH_ACCOUNT_PATH}/0/${accountIndex}`;
}

/**
 *
 * @param addrs an array of X chain addresses to get the atomic utxos of
 * @param sourceChain Which chain to check against, either `P` or `C`
 */
function avmGetAtomicUTXOs(addrs, sourceChain) {
    return __awaiter(this, void 0, void 0, function* () {
        const selection = addrs.slice(0, 1024);
        const remaining = addrs.slice(1024);
        const sourceChainId = chainIdFromAlias(sourceChain);
        let utxoSet = (yield xChain.getUTXOs(selection, sourceChainId)).utxos;
        if (remaining.length > 0) {
            const nextSet = yield avmGetAtomicUTXOs(remaining, sourceChain);
            utxoSet = utxoSet.merge(nextSet);
        }
        return utxoSet;
    });
}
// todo: Use end index to get ALL utxos
function platformGetAtomicUTXOs(addrs, sourceChain) {
    return __awaiter(this, void 0, void 0, function* () {
        let selection = addrs.slice(0, 1024);
        let remaining = addrs.slice(1024);
        const sourceChainId = chainIdFromAlias(sourceChain);
        let utxoSet = (yield pChain.getUTXOs(selection, sourceChainId)).utxos;
        if (remaining.length > 0) {
            let nextSet = yield platformGetAtomicUTXOs(remaining, sourceChain);
            utxoSet = utxoSet.merge(nextSet);
        }
        return utxoSet;
    });
}
// todo: Use end index to get ALL utxos
function evmGetAtomicUTXOs(addrs, sourceChain) {
    return __awaiter(this, void 0, void 0, function* () {
        if (addrs.length > 1024) {
            throw new Error('Number of addresses can not be greater than 1024.');
        }
        const sourceChainId = chainIdFromAlias(sourceChain);
        let result = (yield cChain.getUTXOs(addrs, sourceChainId)).utxos;
        return result;
    });
}
function getStakeForAddresses(addrs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (addrs.length <= 256) {
            let data = yield pChain.getStake(addrs);
            return data;
        }
        else {
            //Break the list in to 1024 chunks
            let chunk = addrs.slice(0, 256);
            let remainingChunk = addrs.slice(256);
            let chunkData = yield pChain.getStake(chunk);
            let chunkStake = chunkData.staked;
            let chunkUtxos = chunkData.stakedOutputs;
            let next = yield getStakeForAddresses(remainingChunk);
            return {
                staked: chunkStake.add(next.staked),
                stakedOutputs: [...chunkUtxos, ...next.stakedOutputs],
            };
        }
    });
}
function avmGetAllUTXOs(addrs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (addrs.length <= 1024) {
            let utxos = yield avmGetAllUTXOsForAddresses(addrs);
            return utxos;
        }
        else {
            //Break the list in to 1024 chunks
            let chunk = addrs.slice(0, 1024);
            let remainingChunk = addrs.slice(1024);
            let newSet = yield avmGetAllUTXOsForAddresses(chunk);
            return newSet.merge(yield avmGetAllUTXOs(remainingChunk));
        }
    });
}
function avmGetAllUTXOsForAddresses(addrs, endIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        if (addrs.length > 1024)
            throw new Error('Maximum length of addresses is 1024');
        let response;
        if (!endIndex) {
            response = yield xChain.getUTXOs(addrs);
        }
        else {
            response = yield xChain.getUTXOs(addrs, undefined, 0, endIndex);
        }
        let utxoSet = response.utxos;
        let nextEndIndex = response.endIndex;
        let len = response.numFetched;
        if (len >= 1024) {
            let subUtxos = yield avmGetAllUTXOsForAddresses(addrs, nextEndIndex);
            return utxoSet.merge(subUtxos);
        }
        return utxoSet;
    });
}
// helper method to get utxos for more than 1024 addresses
function platformGetAllUTXOs(addrs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (addrs.length <= 1024) {
            let newSet = yield platformGetAllUTXOsForAddresses(addrs);
            return newSet;
        }
        else {
            //Break the list in to 1024 chunks
            let chunk = addrs.slice(0, 1024);
            let remainingChunk = addrs.slice(1024);
            let newSet = yield platformGetAllUTXOsForAddresses(chunk);
            return newSet.merge(yield platformGetAllUTXOs(remainingChunk));
        }
    });
}
function platformGetAllUTXOsForAddresses(addrs, endIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        if (!endIndex) {
            response = yield pChain.getUTXOs(addrs);
        }
        else {
            response = yield pChain.getUTXOs(addrs, undefined, 0, endIndex);
        }
        let utxoSet = response.utxos;
        let nextEndIndex = response.endIndex;
        let len = response.numFetched;
        if (len >= 1024) {
            let subUtxos = yield platformGetAllUTXOsForAddresses(addrs, nextEndIndex);
            return utxoSet.merge(subUtxos);
        }
        return utxoSet;
    });
}

var utxo_helper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    avmGetAtomicUTXOs: avmGetAtomicUTXOs,
    platformGetAtomicUTXOs: platformGetAtomicUTXOs,
    evmGetAtomicUTXOs: evmGetAtomicUTXOs,
    getStakeForAddresses: getStakeForAddresses,
    avmGetAllUTXOs: avmGetAllUTXOs,
    avmGetAllUTXOsForAddresses: avmGetAllUTXOsForAddresses,
    platformGetAllUTXOs: platformGetAllUTXOs,
    platformGetAllUTXOsForAddresses: platformGetAllUTXOsForAddresses
});

const validateAddress = (address) => {
    return validateAddressX(address) || validateAddressP(address) || validateAddressEVM(address);
};
function validateAddressX(address) {
    try {
        let buff = bintools.parseAddress(address, 'X');
        if (!buff)
            return false;
        return true;
    }
    catch (error) {
        return false;
    }
}
function validateAddressP(address) {
    try {
        let buff = bintools.parseAddress(address, 'P');
        if (!buff)
            return false;
        return true;
    }
    catch (error) {
        return false;
    }
}
function validateAddressEVM(address) {
    return Web3__default["default"].utils.isAddress(address);
}
/**
 * Returns the human readable part of a X or P bech32 address.
 * @param address
 */
function getAddressHRP(address) {
    if (!validateAddress(address)) {
        throw new Error('Invalid X or P address.');
    }
    return address.split('-')[1].split('1')[0];
}
/**
 * Given an address, return which Chain it belongs to
 * @param address
 */
function getAddressChain(address) {
    if (!validateAddress(address)) {
        throw new Error('Invalid address.');
    }
    if (Web3__default["default"].utils.isAddress(address)) {
        return 'C';
    }
    else {
        return address[0];
    }
}

var address_helper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    validateAddress: validateAddress,
    validateAddressX: validateAddressX,
    validateAddressP: validateAddressP,
    validateAddressEVM: validateAddressEVM,
    getAddressHRP: getAddressHRP,
    getAddressChain: getAddressChain
});

/**
 * Checks if address is valid.
 *
 * @return
 * boolean if address is valid, error message if not valid.
 */
function isValidAddress(address) {
    return validateAddress(address) === true;
}
function digestMessage(msgStr) {
    let mBuf = Buffer.from(msgStr, 'utf8');
    let msgSize = Buffer.alloc(4);
    msgSize.writeUInt32BE(mBuf.length, 0);
    let msgBuf = Buffer.from(`\x1AAxia Signed Message:\n${msgSize}${msgStr}`, 'utf8');
    return createHash__default["default"]('sha256').update(msgBuf).digest();
}
let payloadtypes = utils.PayloadTypes.getInstance();
function parseNftPayload(rawPayload) {
    let payload = avajs.Buffer.from(rawPayload, 'base64');
    payload = avajs.Buffer.concat([new avajs.Buffer(4).fill(payload.length), payload]);
    let typeId = payloadtypes.getTypeID(payload);
    let pl = payloadtypes.getContent(payload);
    let payloadbase = payloadtypes.select(typeId, pl);
    return payloadbase;
}

Big__default["default"].prototype.toLocaleString = function (toFixed = 9) {
    let fixedStr = this.toFixed(toFixed, 0);
    let split = fixedStr.split('.');
    let wholeStr = parseInt(split[0]).toLocaleString('en-US');
    if (split.length === 1) {
        return wholeStr;
    }
    else {
        let remainderStr = split[1];
        // remove trailing 0s
        let lastChar = remainderStr.charAt(remainderStr.length - 1);
        while (lastChar === '0') {
            remainderStr = remainderStr.substring(0, remainderStr.length - 1);
            lastChar = remainderStr.charAt(remainderStr.length - 1);
        }
        let trimmed = remainderStr.substring(0, toFixed);
        if (!trimmed)
            return wholeStr;
        return `${wholeStr}.${trimmed}`;
    }
};
/**
 * @param val the amount to parse
 * @param denomination number of decimal places to parse with
 */
function bnToBig(val, denomination = 0) {
    let mult = Big__default["default"](10).pow(denomination);
    return new Big__default["default"](val.toString()).div(mult);
}
/**
 * Converts a BN amount of 18 decimals to 9.
 * Used for AXC C <-> X,P conversions
 * @param amount
 */
function axcCtoX(amount) {
    let tens = new avajs.BN(10).pow(new avajs.BN(9));
    return amount.div(tens);
}
function axcXtoC(amount) {
    let tens = new avajs.BN(10).pow(new avajs.BN(9));
    return amount.mul(tens);
}
function axcPtoC(amount) {
    return axcXtoC(amount);
}
function bnToBigAxcX(val) {
    return bnToBig(val, 9);
}
function bnToBigAxcP(val) {
    return bnToBigAxcX(val);
}
function bnToBigAxcC(val) {
    return bnToBig(val, 18);
}
/**
 * Parses the value using a denomination of 18
 *
 * @param val the amount to parse given in WEI
 *
 * @example
 * ```
 * bnToAxcC(new BN('22500000000000000000')
 * // will return  22.5
 *```
 *
 */
function bnToAxcC(val) {
    return bnToLocaleString(val, 18);
}
/**
 * Parses the value using a denomination of 9
 *
 * @param val the amount to parse given in nAXC
 */
function bnToAxcX(val) {
    return bnToLocaleString(val, 9);
}
/**
 * Parses the value using a denomination of 9
 *
 * @param val the amount to parse given in nAXC
 */
function bnToAxcP(val) {
    return bnToAxcX(val);
}
/**
 *
 * @param val the number to parse
 * @param decimals number of decimal places used to parse the number
 */
function numberToBN(val, decimals) {
    let valBig = Big__default["default"](val);
    let tens = Big__default["default"](10).pow(decimals);
    let valBN = new avajs.BN(valBig.times(tens).toFixed(0));
    return valBN;
}
function numberToBNAxcX(val) {
    return numberToBN(val, 9);
}
function numberToBNAxcP(val) {
    return numberToBNAxcX(val);
}
function numberToBNAxcC(val) {
    return numberToBN(val, 18);
}
/**
 * @Remarks
 * A helper method to convert BN numbers to human readable strings.
 *
 * @param val The amount to convert
 * @param decimals Number of decimal places to parse the amount with
 *
 * @example
 * ```
 * bnToLocaleString(new BN(100095),2)
 * // will return '1,000.95'
 * ```
 */
function bnToLocaleString(val, decimals = 9) {
    let bigVal = bnToBig(val, decimals);
    return bigToLocaleString(bigVal, decimals);
}
function bigToLocaleString(bigVal, decimals = 9) {
    let fixedStr = bigVal.toFixed(decimals);
    let split = fixedStr.split('.');
    let wholeStr = parseInt(split[0]).toLocaleString('en-US');
    if (split.length === 1) {
        return wholeStr;
    }
    else {
        let remainderStr = split[1];
        // remove trailing 0s
        let lastChar = remainderStr.charAt(remainderStr.length - 1);
        while (lastChar === '0') {
            remainderStr = remainderStr.substring(0, remainderStr.length - 1);
            lastChar = remainderStr.charAt(remainderStr.length - 1);
        }
        let trimmed = remainderStr.substring(0, decimals);
        if (!trimmed)
            return wholeStr;
        return `${wholeStr}.${trimmed}`;
    }
}
/**
 * Converts a string to a BN value of the given denomination.
 * @param value The string value of the
 * @param decimals
 *
 * @example
 * ```
 * stringToBN('1.32', 5) // is same as BN(132000)
 * ```
 */
function stringToBN(value, decimals) {
    let big = Big__default["default"](value);
    let tens = Big__default["default"](10).pow(decimals);
    let mult = big.times(tens);
    let rawStr = mult.toFixed(0, 0);
    return new avajs.BN(rawStr);
}
function bigToBN(val, denom) {
    let denomFlr = Math.floor(denom);
    if (denomFlr < 0)
        throw new Error('Denomination can not be less that 0.');
    const bnBig = val.mul(Big__default["default"](10).pow(denomFlr));
    const bnStr = bnBig.toFixed(0, 0);
    return new avajs.BN(bnStr);
}

/**
 * Returns the transaction fee for X chain.
 */
function getTxFeeX() {
    return xChain.getTxFee();
}
/**
 * Returns the transaction fee for P chain.
 */
function getTxFeeP() {
    return pChain.getTxFee();
}

/**
 * Waits until the given tx id is accepted on X chain
 * @param txId Tx ID to wait for
 * @param tryCount Number of attempts until timeout
 */
function waitTxX(txId, tryCount = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tryCount <= 0) {
            throw new Error('Timeout');
        }
        let resp;
        try {
            resp = (yield xChain.getTxStatus(txId));
        }
        catch (e) {
            throw new Error('Unable to get transaction status.');
        }
        let status;
        let reason;
        if (typeof resp === 'string') {
            status = resp;
        }
        else {
            status = resp.status;
            reason = resp.reason;
        }
        if (status === 'Unknown' || status === 'Processing') {
            return yield new Promise((resolve) => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield waitTxX(txId, tryCount - 1));
                }), 1000);
            });
            // return await waitTxX(txId, tryCount - 1);
        }
        else if (status === 'Rejected') {
            throw new Error(reason);
        }
        else if (status === 'Accepted') {
            return txId;
        }
        return txId;
    });
}
function waitTxP(txId, tryCount = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tryCount <= 0) {
            throw new Error('Timeout');
        }
        let resp;
        try {
            resp = (yield pChain.getTxStatus(txId));
        }
        catch (e) {
            throw new Error('Unable to get transaction status.');
        }
        let status;
        let reason;
        if (typeof resp === 'string') {
            status = resp;
        }
        else {
            status = resp.status;
            reason = resp.reason;
        }
        if (status === 'Unknown' || status === 'Processing') {
            return yield new Promise((resolve) => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield waitTxP(txId, tryCount - 1));
                }), 1000);
            });
            // return await waitTxX(txId, tryCount - 1);
        }
        else if (status === 'Dropped') {
            throw new Error(reason);
        }
        else if (status === 'Committed') {
            return txId;
        }
        else {
            throw new Error('Unknown status type.');
        }
    });
}
function waitTxEvm(txHash, tryCount = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tryCount <= 0) {
            throw new Error('Timeout');
        }
        let receipt;
        try {
            receipt = yield web3.eth.getTransactionReceipt(txHash);
        }
        catch (e) {
            throw new Error('Unable to get transaction receipt.');
        }
        if (!receipt) {
            return yield new Promise((resolve) => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield waitTxEvm(txHash, tryCount - 1));
                }), 1000);
            });
        }
        else {
            if (receipt.status) {
                return txHash;
            }
            else {
                throw new Error('Transaction reverted.');
            }
        }
    });
}
function waitTxC(txId, tryCount = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tryCount <= 0) {
            throw new Error('Timeout');
        }
        let resp;
        try {
            resp = (yield cChain.getAtomicTxStatus(txId));
        }
        catch (e) {
            throw new Error('Unable to get transaction status.');
        }
        let status;
        let reason;
        if (typeof resp === 'string') {
            status = resp;
        }
        else {
            status = resp.status;
            reason = resp.reason;
        }
        if (status === 'Unknown' || status === 'Processing') {
            return yield new Promise((resolve) => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield waitTxC(txId, tryCount - 1));
                }), 1000);
            });
            // return await waitTxX(txId, tryCount - 1);
        }
        else if (status === 'Dropped') {
            throw new Error(reason);
        }
        else if (status === 'Accepted') {
            return txId;
        }
        else {
            throw new Error('Unknown status type.');
        }
    });
}

function sleep(durMs) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, durMs);
        });
    });
}

/**
 * A helper class to obfuscate strings when storing in memory. Used as a helper rather than secure encryption.
 * @Remarks Do NOT use this class for actual secure encryption needs.
 */
class CypherAES {
    constructor(value) {
        this.pass = randomstring__default["default"].generate(32);
        this.encrypted = AES__default["default"].encrypt(value, this.pass).toString();
    }
    getValue() {
        return AES__default["default"].decrypt(this.encrypted, this.pass).toString(CryptoJS__default["default"].enc.Utf8);
    }
}

function filterDuplicateStrings(vals) {
    return vals.filter((val, i) => vals.indexOf(val) === i);
}
function isArraysOverlap(arr1, arr2) {
    let overlaps = arr1.filter((item) => arr2.includes(item));
    return overlaps.length > 0;
}
/**
 * Returns true if this utxo is owned by any of the given addresses
 * @param ownerAddrs Addresses to check against
 * @param output The UTXO
 */
function isOutputOwner(ownerAddrs, output) {
    let outAddrs = output.addresses;
    if (!outAddrs)
        return false;
    let totAddrs = outAddrs.filter((addr) => {
        return ownerAddrs.includes(addr);
    });
    return totAddrs.length > 0;
}
function isOutputOwnerC(ownerAddr, output) {
    let outAddrs = output.caddresses;
    if (!outAddrs)
        return false;
    return outAddrs.includes(ownerAddr);
}
/**
 * Returns the total amount of `assetID` in the given `utxos` owned by `address`. Checks for EVM address.
 * @param utxos UTXOs to calculate balance from.
 * @param address The wallet's  evm address `0x...`.
 * @param assetID Only count outputs of this asset ID.
 * @param chainID Only count the outputs on this chain.
 * @param isStake Set to `true` if looking for staking utxos.
 */
function getEvmAssetBalanceFromUTXOs(utxos, address, assetID, chainID, isStake = false) {
    let myOuts = utxos.filter((utxo) => {
        if (assetID === utxo.assetID &&
            isOutputOwnerC(address, utxo) &&
            chainID === utxo.chainID &&
            utxo.stake === isStake) {
            return true;
        }
        return false;
    });
    let tot = myOuts.reduce((acc, utxo) => {
        return acc.add(new avajs.BN(utxo.amount));
    }, new avajs.BN(0));
    return tot;
}
/**
 * Returns UTXOs owned by the given addresses
 * @param outs UTXOs to filter
 * @param myAddrs Addresses to filter by
 */
function getOwnedOutputs(outs, myAddrs) {
    return outs.filter((out) => {
        let outAddrs = out.addresses || [];
        return isArraysOverlap(myAddrs, outAddrs);
    });
}
/**
 * Returns addresses of the given UTXOs
 * @param outs UTXOs to get the addresses of.
 */
function getAddresses(outs) {
    let allAddrs = [];
    for (let i = 0; i < outs.length; i++) {
        let out = outs[i];
        let addrs = out.addresses || [];
        allAddrs.push(...addrs);
    }
    // Remove duplicated
    return allAddrs.filter((addr, i) => allAddrs.indexOf(addr) === i);
}
/**
 * Returns only the UTXOs of the given asset id.
 * @param outs
 * @param assetID
 */
function getAssetOutputs(outs, assetID) {
    return outs.filter((out) => out.assetID === assetID);
}
/**
 * Returns UTXOs not owned by the given addresses
 * @param outs UTXOs to filter
 * @param myAddrs Addresses to filter by
 */
function getNotOwnedOutputs(outs, myAddrs) {
    return outs.filter((out) => {
        let outAddrs = out.addresses || [];
        return !isArraysOverlap(myAddrs, outAddrs);
    });
}
function getOutputTotals(outs) {
    return outs.reduce((acc, out) => {
        return acc.add(new avajs.BN(out.amount));
    }, new avajs.BN(0));
}
function getRewardOuts(outs) {
    return outs.filter((out) => out.rewardUtxo);
}
/**
 * Returns outputs belonging to the given chain ID
 * @param outs UTXOs to filter
 * @param chainID Chain ID to filter by
 */
function getOutputsOfChain(outs, chainID) {
    return outs.filter((out) => out.chainID === chainID);
}
/**
 * Filters the UTXOs of a certain output type
 * @param outs UTXOs to filter
 * @param type Output type to filter by
 */
function getOutputsOfType(outs, type) {
    return outs.filter((out) => out.outputType === type);
}
/**
 * Returns a map of asset id to owner addresses
 * @param outs
 */
function getOutputsAssetOwners(outs) {
    let assetIDs = getOutputsAssetIDs(outs);
    let res = {};
    for (let i = 0; i < assetIDs.length; i++) {
        let id = assetIDs[i];
        let assetUTXOs = getAssetOutputs(outs, id);
        let addrs = getAddresses(assetUTXOs);
        res[id] = addrs;
    }
    return res;
}
/**
 * Returns an array of Asset IDs from the given UTXOs
 * @param outs Array of UTXOs
 */
function getOutputsAssetIDs(outs) {
    let res = [];
    for (let i = 0; i < outs.length; i++) {
        let out = outs[i];
        res.push(out.assetID);
    }
    return filterDuplicateStrings(res);
}

/**
 * Parse the raw memo field to readable text.
 * @param raw
 */
function parseMemo(raw) {
    const memoText = new Buffer(raw, 'base64').toString('utf8');
    // Bug that sets memo to empty string (AAAAAA==) for some tx types
    if (!memoText.length || raw === 'AAAAAA==')
        return '';
    return memoText;
}
function getNFTBalanceFromUTXOs(utxos, addresses, assetID) {
    let nftUTXOs = utxos.filter((utxo) => {
        if (utxo.outputType === avm.AVMConstants.NFTXFEROUTPUTID &&
            utxo.assetID === assetID &&
            isOutputOwner(addresses, utxo)) {
            return true;
        }
        return false;
    });
    let res = {};
    for (let i = 0; i < nftUTXOs.length; i++) {
        let utxo = nftUTXOs[i];
        let groupID = utxo.groupID;
        let content;
        if (utxo.payload) {
            let parsedPayload = parseNftPayload(utxo.payload);
            content = parsedPayload.getContent().toString();
        }
        if (res[groupID]) {
            res[groupID].amount++;
        }
        else {
            res[groupID] = {
                payload: content || '',
                amount: 1,
            };
        }
    }
    return res;
}

function getBaseTxSummary(tx, ownerAddrs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let ins = ((_a = tx.inputs) === null || _a === void 0 ? void 0 : _a.map((input) => input.output)) || [];
        let outs = tx.outputs || [];
        // Calculate losses from inputs
        let losses = getOwnedTokens(ins, ownerAddrs);
        let gains = getOwnedTokens(outs, ownerAddrs);
        let nowOwnedIns = getNotOwnedOutputs(ins, ownerAddrs);
        let nowOwnedOuts = getNotOwnedOutputs(outs, ownerAddrs);
        let froms = getOutputsAssetOwners(nowOwnedIns);
        let tos = getOutputsAssetOwners(nowOwnedOuts);
        let tokens = yield getBaseTxTokensSummary(gains, losses, froms, tos);
        return {
            id: tx.id,
            fee: getTxFeeX(),
            type: 'transaction',
            timestamp: new Date(tx.timestamp),
            memo: parseMemo(tx.memo),
            tokens: tokens,
        };
    });
}
/**
 * Returns a dictionary of asset totals belonging to the owner
 * @param utxos
 * @param ownerAddrs
 */
function getOwnedTokens(utxos, ownerAddrs) {
    let tokenUTXOs = getOutputsOfType(utxos, avm.AVMConstants.SECPXFEROUTPUTID);
    // Owned inputs
    let myUTXOs = getOwnedOutputs(tokenUTXOs, ownerAddrs);
    // Asset IDs received
    let assetIDs = getOutputsAssetIDs(myUTXOs);
    let res = {};
    for (let i = 0; i < assetIDs.length; i++) {
        let assetID = assetIDs[i];
        let assetUTXOs = getAssetOutputs(myUTXOs, assetID);
        let tot = getOutputTotals(assetUTXOs);
        res[assetID] = tot;
    }
    return res;
}
function getBaseTxTokensSummary(gains, losses, froms, tos) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = [];
        let assetIDs = filterDuplicateStrings([...Object.keys(gains), ...Object.keys(losses)]);
        // Fetch asset descriptions
        let calls = assetIDs.map((id) => getAssetDescription(id));
        let descs = yield Promise.all(calls);
        let descsDict = {};
        // Convert array to dict
        for (let i = 0; i < descs.length; i++) {
            let desc = descs[i];
            descsDict[desc.assetID] = desc;
        }
        for (let i = 0; i < assetIDs.length; i++) {
            let id = assetIDs[i];
            let tokenGain = gains[id] || new avajs.BN(0);
            let tokenLost = losses[id] || new avajs.BN(0);
            let tokenDesc = descsDict[id];
            // If we sent axc, deduct the fee
            if (id === getAxcAssetID() && !tokenLost.isZero()) {
                tokenLost = tokenLost.sub(getTxFeeX());
            }
            // How much we gained/lost of this token
            let diff = tokenGain.sub(tokenLost);
            let diffClean = bnToLocaleString(diff, tokenDesc.denomination);
            // If we didnt gain or lose anything, ignore this token
            if (diff.isZero())
                continue;
            if (diff.isNeg()) {
                res.push({
                    amount: diff,
                    amountDisplayValue: diffClean,
                    addresses: tos[id],
                    asset: tokenDesc,
                });
            }
            else {
                res.push({
                    amount: diff,
                    amountDisplayValue: diffClean,
                    addresses: froms[id],
                    asset: tokenDesc,
                });
            }
        }
        return res;
    });
}

const SNOWTRACE_MAINNET = 'https://api.snowtrace.io';
const SNOWTRACE_TESTNET = 'https://api-testnet.snowtrace.io';

/**
 * Filter duplicate Snowtrace transactions
 * @param txs
 */
function filterDuplicateTransactions(txs) {
    const hashes = txs.map((tx) => tx.hash);
    return txs.filter((tx, i) => {
        return hashes.indexOf(tx.hash) === i;
    });
}

function fetchSnowtraceAPI(query, isMainnet = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = isMainnet ? SNOWTRACE_MAINNET : SNOWTRACE_TESTNET;
        const response = yield fetch(`${baseUrl}/${query}`);
        return response.json();
    });
}
function getErc20History(address, networkConfig, page = 0, offset = 0, contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const contractQuery = contractAddress ? `&contractaddress=${contractAddress}` : '';
        const sort = 'desc';
        const query = `api?module=account&action=tokentx&address=${address}&sort=${sort}&page=${page}&offset=${offset}${contractQuery}`;
        let resp;
        if (isMainnetNetwork(networkConfig)) {
            resp = yield fetchSnowtraceAPI(query);
        }
        else if (isFujiNetwork(networkConfig)) {
            resp = yield fetchSnowtraceAPI(query, false);
        }
        else {
            throw new Error('Snow trace is only available for Axia Mainnet and Testnet');
        }
        return filterDuplicateTransactions(resp.result);
    });
}
function getNormalHistory(address, networkConfig, page = 0, offset = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const sort = 'desc';
        const query = `api?module=account&action=txlist&address=${address}&sort=${sort}&page=${page}&offset=${offset}`;
        let resp;
        if (isMainnetNetwork(networkConfig)) {
            resp = yield fetchSnowtraceAPI(query);
        }
        else if (isFujiNetwork(networkConfig)) {
            resp = yield fetchSnowtraceAPI(query, false);
        }
        else {
            throw new Error('Snow trace is only available for Axia Mainnet and Testnet');
        }
        return filterDuplicateTransactions(resp.result);
    });
}
/**
 * https://docs.etherscan.io/api-endpoints/contracts#get-contract-abi-for-verified-contract-source-codes
 *
 * @param address
 * @param networkConfig
 * @returns string array, the first index is the ABI
 */
function getABIForContract(address, networkConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMainnet = isMainnetNetwork(networkConfig);
        const isFuji = isFujiNetwork(networkConfig);
        if (!isMainnet && !isFuji) {
            throw new Error('Snow trace is only available for Axia Mainnet and Testnet');
        }
        const params = new window.URLSearchParams({ module: 'contract', action: 'getabi', address });
        return yield fetchSnowtraceAPI(`api?${params.toString()}`, isMainnet);
    });
}

/**
 * Type guard for SnowtraceErc20Tx
 * @param tx
 */
function isSnowtraceErc20Tx(tx) {
    return tx.hasOwnProperty('tokenName');
}
/**
 * Type guard for SnowtraceNormalTx
 * @param tx
 */
function isSnowtraceNormalTx(tx) {
    return !tx.hasOwnProperty('tokenName');
}

/**
 * Returns transactions FROM and TO the address given
 * @param addr The address to get historic transactions for.
 */
function getAddressHistoryEVM(addr) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        let endpoint = `v2/ctransactions?address=${addr}`;
        let data = (yield exports.explorer_api.get(endpoint)).Transactions;
        data.sort((a, b) => {
            let dateA = new Date(a.createdAt);
            let dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
        });
        return data;
    });
}
/**
 * Returns the ortelius data from the given tx id.
 * @param txID
 */
function getTx(txID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        let url = `v2/transactions/${txID}`;
        return yield exports.explorer_api.get(url);
    });
}
/**
 * Returns ortelius data for a transaction hash on C chain EVM,
 * @param txHash
 */
function getTxEvm(txHash) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        let endpoint = `v2/ctransactions?hash=${txHash}`;
        let data = (yield exports.explorer_api.get(endpoint)).Transactions[0];
        return data;
    });
}
/**
 * Returns, X or P chain transactions belonging to the given address array.
 * @param addresses Addresses to check for. Max number of addresses is 1024
 * @param limit
 * @param chainID The blockchain ID of X or P chain
 * @param endTime
 */
function getTransactionsAxia(addresses, limit = 20, chainID, endTime) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        if (addresses.length > 1024)
            throw new Error('Number of addresses can not exceed 1024.');
        // Remove the prefix (X- P-) from given addresses
        const addrsRaw = addresses.map((addr) => {
            return addr.split('-')[1];
        });
        const rootUrl = 'v2/transactions';
        const req = {
            address: addrsRaw,
            sort: ['timestamp-desc'],
            disableCount: ['1'],
            chainID: [chainID],
            disableGenesis: ['false'],
        };
        // Add limit if given
        if (limit > 0) {
            //@ts-ignore
            req.limit = [limit.toString()];
        }
        // Add end time if given
        if (endTime) {
            //@ts-ignore
            req.endTime = [endTime];
        }
        const res = yield exports.explorer_api.post(rootUrl, req);
        const resTxs = res.transactions;
        const next = res.next;
        let allTxs = resTxs === null ? [] : resTxs;
        // If we need to fetch more for this address
        if (next && !limit) {
            let endTime = next.split('&')[0].split('=')[1];
            let nextRes = yield getAddressHistory(addresses, limit, chainID, endTime);
            allTxs.push(...nextRes);
        }
        return allTxs;
    });
}
/**
 * Returns, X or P chain transactions belonging to the given address array.
 * @param addrs Addresses to check for.
 * @param limit
 * @param chainID The blockchain ID of X or P chain
 * @param endTime
 */
function getAddressHistory(addrs, limit = 20, chainID, endTime) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        const ADDR_SIZE = 1024;
        const addrsChunks = [];
        for (let i = 0; i < addrs.length; i += ADDR_SIZE) {
            const chunk = addrs.slice(i, i + ADDR_SIZE);
            addrsChunks.push(chunk);
        }
        // Get histories in parallel
        const promises = addrsChunks.map((chunk) => {
            return getTransactionsAxia(chunk, limit, chainID, endTime);
        });
        const results = yield Promise.all(promises);
        return results.reduce((acc, txs) => {
            return [...acc, ...txs];
        }, []);
    });
}
/**
 * Given an array of addresses, checks which chain each address was already used on
 * @param addrs
 */
function getAddressChains(addrs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        // Strip the prefix
        let rawAddrs = addrs.map((addr) => {
            return addr.split('-')[1];
        });
        let urlRoot = `v2/addressChains`;
        let res = yield exports.explorer_api.post(urlRoot, {
            address: rawAddrs,
            disableCount: ['1'],
        });
        return res.addressChains;
    });
}
function getAddressDetailX(addr) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.explorer_api) {
            throw NO_EXPLORER_API;
        }
        let addrRaw = addr.split('-')[1];
        let url = `x/addresses/${addrRaw}`;
        return yield exports.explorer_api.get(url);
    });
}

/**
 * Given an array of transactions from the explorer, filter out duplicate transactions
 * @param txs
 */
function filterDuplicateOrtelius(txs) {
    let txsIds = [];
    let filtered = [];
    for (let i = 0; i < txs.length; i++) {
        let tx = txs[i];
        let txId = tx.id;
        if (txsIds.includes(txId)) {
            continue;
        }
        else {
            txsIds.push(txId);
            filtered.push(tx);
        }
    }
    return filtered;
}
// If any of the inputs has a different chain ID, thats the source chain
// else return current chain
/**
 * Returns the source chain id.
 * @param tx Tx data from the explorer.
 */
function findSourceChain(tx) {
    let baseChain = tx.chainID;
    let ins = tx.inputs || [];
    for (let i = 0; i < ins.length; i++) {
        let inChainId = ins[i].output.inChainID;
        if (!inChainId)
            continue;
        if (inChainId !== baseChain)
            return inChainId;
    }
    return baseChain;
}
// If any of the outputs has a different chain ID, that's the destination chain
// else return current chain
/**
 * Returns the destination chain id.
 * @param tx Tx data from the explorer.
 */
function findDestinationChain(tx) {
    let baseChain = tx.chainID;
    let outs = tx.outputs || [];
    for (let i = 0; i < outs.length; i++) {
        let outChainId = outs[i].outChainID;
        if (!outChainId)
            continue;
        if (outChainId !== baseChain)
            return outChainId;
    }
    return baseChain;
}
// To get the stake amount, sum the non-reward output utxos.
function getStakeAmount(tx) {
    let outs = tx.outputs || [];
    let nonRewardUtxos = outs.filter((utxo) => !utxo.rewardUtxo && utxo.stake);
    let tot = getOutputTotals(nonRewardUtxos);
    return tot;
}

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const AXC_COIN_ID = 'axia-2';
/**
 * Fetches the current AXC price using Coin Gecko.
 * @remarks
 * You might get rate limited if you use this function frequently.
 *
 * @return
 * Current price of 1 AXC vs a currency (default USD)
 */
function getAxcPrice(currentCurrency = 'USD') {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${COINGECKO_BASE_URL}/simple/price?ids=${AXC_COIN_ID}&vs_currencies=${currentCurrency}`);
        const data = yield res.json();
        return data[AXC_COIN_ID][currentCurrency.toLowerCase()];
    });
}
/**
 * Gets daily price history using Coin Gecko.
 * @param currency
 */
function getAxcPriceHistory(currency = 'USD') {
    return __awaiter(this, void 0, void 0, function* () {
        const params = new URLSearchParams({
            vs_currency: currency.toLowerCase(),
            days: 'max',
            interval: 'daily',
        });
        const res = yield fetch(`${COINGECKO_BASE_URL}/coins/${AXC_COIN_ID}/market_chart?${params.toString()}`);
        const data = yield res.json();
        return data.prices;
    });
}

function getImportSummary(tx, addresses) {
    let sourceChain = findSourceChain(tx);
    let chainAliasFrom = idToChainAlias(sourceChain);
    let chainAliasTo = idToChainAlias(tx.chainID);
    let outs = tx.outputs || [];
    let myOuts = getOwnedOutputs(outs, addresses);
    let amtOut = getOutputTotals(myOuts);
    let time = new Date(tx.timestamp);
    let fee = xChain.getTxFee();
    let res = {
        id: tx.id,
        memo: parseMemo(tx.memo),
        source: chainAliasFrom,
        destination: chainAliasTo,
        amount: amtOut,
        amountDisplayValue: bnToAxcX(amtOut),
        timestamp: time,
        type: 'import',
        fee: fee,
    };
    return res;
}
function getExportSummary(tx, addresses) {
    let sourceChain = findSourceChain(tx);
    let chainAliasFrom = idToChainAlias(sourceChain);
    let destinationChain = findDestinationChain(tx);
    let chainAliasTo = idToChainAlias(destinationChain);
    let outs = tx.outputs || [];
    let myOuts = getOwnedOutputs(outs, addresses);
    let chainOuts = getOutputsOfChain(myOuts, destinationChain);
    let amtOut = getOutputTotals(chainOuts);
    let time = new Date(tx.timestamp);
    let fee = xChain.getTxFee();
    let res = {
        id: tx.id,
        memo: parseMemo(tx.memo),
        source: chainAliasFrom,
        destination: chainAliasTo,
        amount: amtOut,
        amountDisplayValue: bnToAxcX(amtOut),
        timestamp: time,
        type: 'export',
        fee: fee,
    };
    return res;
}

function getTransactionSummary(tx, walletAddrs, evmAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let cleanAddressesXP = walletAddrs.map((addr) => addr.split('-')[1]);
        switch (tx.type) {
            case 'import':
            case 'pvm_import':
                return getImportSummary(tx, cleanAddressesXP);
            case 'export':
            case 'pvm_export':
            case 'atomic_export_tx':
                return getExportSummary(tx, cleanAddressesXP);
            case 'add_validator':
            case 'add_delegator':
                return getStakingSummary(tx, cleanAddressesXP);
            case 'atomic_import_tx':
                return getImportSummaryC(tx, evmAddress);
            case 'operation':
            case 'base':
                return yield getBaseTxSummary(tx, cleanAddressesXP);
            default:
                return getUnsupportedSummary(tx);
        }
    });
}
function getUnsupportedSummary(tx) {
    return {
        id: tx.id,
        type: 'not_supported',
        timestamp: new Date(tx.timestamp),
        fee: new avajs.BN(0),
    };
}
function getStakingSummary(tx, ownerAddrs) {
    var _a;
    let time = new Date(tx.timestamp);
    // let pChainID = activeNetwork.pChainID;
    // let axcID = activeNetwork.axcID;
    let ins = ((_a = tx.inputs) === null || _a === void 0 ? void 0 : _a.map((tx) => tx.output)) || [];
    let myIns = getOwnedOutputs(ins, ownerAddrs);
    let outs = tx.outputs || [];
    let myOuts = getOwnedOutputs(outs, ownerAddrs);
    let stakeAmount = getStakeAmount(tx);
    // Assign the type
    let type = tx.type === 'add_validator' ? 'add_validator' : 'add_delegator';
    // If this wallet only received the fee
    if (myIns.length === 0 && type === 'add_delegator') {
        type = 'delegation_fee';
    }
    else if (myIns.length === 0 && type === 'add_validator') {
        type = 'validation_fee';
    }
    let rewardAmount;
    let rewardAmountClean;
    if (tx.rewarded) {
        let rewardOuts = getRewardOuts(myOuts);
        rewardAmount = getOutputTotals(rewardOuts);
        rewardAmountClean = bnToAxcP(rewardAmount);
    }
    return {
        id: tx.id,
        nodeID: tx.validatorNodeID,
        stakeStart: new Date(tx.validatorStart * 1000),
        stakeEnd: new Date(tx.validatorEnd * 1000),
        timestamp: time,
        type: type,
        fee: new avajs.BN(0),
        amount: stakeAmount,
        amountDisplayValue: bnToAxcP(stakeAmount),
        memo: parseMemo(tx.memo),
        isRewarded: tx.rewarded,
        rewardAmount: rewardAmount,
        rewardAmountDisplayValue: rewardAmountClean,
    };
}
// Returns the summary for a C chain import TX
function getImportSummaryC(tx, ownerAddr) {
    let sourceChain = findSourceChain(tx);
    let chainAliasFrom = idToChainAlias(sourceChain);
    let chainAliasTo = idToChainAlias(tx.chainID);
    let axcID = exports.activeNetwork.axcID;
    let outs = tx.outputs || [];
    let amtOut = getEvmAssetBalanceFromUTXOs(outs, ownerAddr, axcID, tx.chainID);
    let time = new Date(tx.timestamp);
    let fee = xChain.getTxFee();
    let res = {
        id: tx.id,
        source: chainAliasFrom,
        destination: chainAliasTo,
        amount: amtOut,
        amountDisplayValue: bnToAxcX(amtOut),
        timestamp: time,
        type: 'import',
        fee: fee,
        memo: parseMemo(tx.memo),
    };
    return res;
}

function getTransactionSummaryEVM(tx, walletAddress) {
    let isSender = tx.fromAddr.toUpperCase() === walletAddress.toUpperCase();
    let amt = new avajs.BN(tx.value);
    let amtClean = bnToAxcC(amt);
    let date = new Date(tx.createdAt);
    let gasLimit = new avajs.BN(tx.gasLimit);
    let gasPrice = new avajs.BN(tx.gasPrice);
    let feeBN = gasLimit.mul(gasPrice); // in gwei
    return {
        id: tx.hash,
        fee: feeBN,
        memo: '',
        block: tx.block,
        isSender,
        type: 'transaction_evm',
        amount: amt,
        amountDisplayValue: amtClean,
        gasLimit: tx.gasLimit,
        gasPrice: tx.gasPrice,
        from: tx.fromAddr,
        to: tx.toAddr,
        timestamp: date,
        input: tx.input,
    };
}

/**
 * Typeguard for `iHistoryImportExport` interface
 * @param tx The parsed history object
 */
function isHistoryImportExportTx(tx) {
    return tx.type === 'export' || tx.type === 'import';
}
/**
 * Typeguard for `iHistoryStaking` interface
 * @param tx The parsed history object
 */
function isHistoryStakingTx(tx) {
    let types = ['add_validator', 'add_delegator', 'validation_fee', 'delegation_fee'];
    return types.includes(tx.type);
}
/**
 * Typeguard for `iHistoryBaseTx` interface
 * @param tx The parsed history object
 */
function isHistoryBaseTx(tx) {
    return tx.type === 'transaction';
}
function isHistoryEVMTx(tx) {
    return tx.type === 'transaction_evm';
}

class UniversalNodeAbstract {
    constructor(balance, chain, feeExport, feeImport) {
        this.parents = [];
        this.child = null;
        this.balance = balance;
        this.chain = chain;
        this.feeExport = feeExport;
        this.feeImport = feeImport;
    }
    // Sum of the node's balance + all balance of parents minus the transfer fees
    reduceTotalBalanceFromParents() {
        // If there are no balance return balance of self
        if (this.parents.length === 0) {
            return this.balance;
        }
        let parentBals = this.parents.map((node) => {
            // Subtract transfer fees from parent balance
            // import + export
            let parentBalance = node.reduceTotalBalanceFromParents();
            parentBalance = parentBalance.sub(this.feeImport).sub(node.feeExport);
            let zero = new avajs.BN(0);
            return avajs.BN.max(parentBalance, zero);
        });
        let tot = parentBals.reduce((prev, current) => {
            return prev.add(current);
        }, new avajs.BN(0));
        return tot.add(this.balance);
    }
    buildExportTx(destChain, amount) {
        return {
            action: this.getExportMethod(destChain),
            amount: amount,
            fee: this.feeExport,
        };
    }
    buildImportTx(sourceChain) {
        return {
            action: this.getImportMethod(sourceChain),
            fee: this.feeImport,
        };
    }
    /***
     * Assumes there is enough balance on node tree
     * Returns empty array even if transaction not possible!
     * What steps to take to have the target balance on this node.
     * @param target Amount of nAXC needed on this node.
     */
    getStepsForTargetBalance(target) {
        // If the node has enough balance no transaction needed
        // If target is negative or zero no transaction needed
        if (this.balance.gte(target) || target.lte(new avajs.BN(0))) {
            return [];
        }
        // If not enough balance and no parents
        // return all the balance
        if (this.balance.lt(target) && this.parents.length === 0) {
            return [];
        }
        // If not enough balance on this node, try to collect it from parents
        // Amount needed to collect from parents
        let remaining = target.sub(this.balance);
        let transactions = [];
        for (let i = 0; i < this.parents.length; i++) {
            let p = this.parents[i];
            if (remaining.lte(new avajs.BN(0)))
                break;
            // Parent's balance
            let pBal = p.reduceTotalBalanceFromParents();
            const exportFee = p.feeExport;
            const importFee = this.feeImport;
            const feeImportExport = exportFee.add(importFee);
            // Maximum balance we can import from parent
            let pBalMax = pBal.sub(feeImportExport);
            // The parent needs to have this balance to satisfy the needed amount
            // Try to export the remaining amount, if the parent balance is lower than that export the maximum amount
            // Import amount is the usable amount imported
            const importAmt = avajs.BN.min(pBalMax, remaining); // The amount that will cross to the target chain
            // Exported amount should include the import fees
            const exportAmt = importAmt.add(importFee);
            if (exportAmt.lte(new avajs.BN(0)))
                continue;
            let pTx = p.buildExportTx(this.chain, exportAmt);
            let importTx = this.buildImportTx(p.chain);
            transactions.push(pTx);
            transactions.push(importTx);
            remaining = remaining.sub(importAmt);
        }
        // If we still have remaining balance, we can not complete this transfer
        if (remaining.gt(new avajs.BN(0))) {
            throw new Error('Insufficient AXC balances.');
        }
        return transactions;
    }
    addParent(node) {
        this.parents.push(node);
    }
    setChild(node) {
        this.child = node;
    }
}

class UniversalNodeX extends UniversalNodeAbstract {
    constructor(balance, feeExport, feeImport) {
        super(balance, 'X', feeExport, feeImport);
    }
    buildExportTx(destChain, amount) {
        return super.buildExportTx(destChain, amount);
    }
    buildImportTx(sourceChain) {
        return super.buildImportTx(sourceChain);
    }
    getExportMethod(to) {
        if (to === 'P') {
            return 'export_x_p';
        }
        else {
            return 'export_x_c';
        }
    }
    getImportMethod(from) {
        if (from === 'P') {
            return 'import_p_x';
        }
        else {
            return 'import_c_x';
        }
    }
}

class UniversalNodeP extends UniversalNodeAbstract {
    constructor(balance, feeExport, feeImport) {
        super(balance, 'P', feeExport, feeImport);
    }
    buildExportTx(destChain, amount) {
        return super.buildExportTx(destChain, amount);
    }
    buildImportTx(sourceChain) {
        return super.buildImportTx(sourceChain);
    }
    getExportMethod(to) {
        if (to === 'X') {
            return 'export_p_x';
        }
        else {
            return 'export_p_c';
        }
    }
    getImportMethod(from) {
        if (from === 'X') {
            return 'import_x_p';
        }
        else {
            return 'import_c_p';
        }
    }
}

class UniversalNodeC extends UniversalNodeAbstract {
    constructor(balance, feeExport, feeImport) {
        super(balance, 'C', feeExport, feeImport);
    }
    buildExportTx(destChain, amount) {
        return super.buildExportTx(destChain, amount);
    }
    buildImportTx(sourceChain) {
        return super.buildImportTx(sourceChain);
    }
    getExportMethod(to) {
        if (to === 'X') {
            return 'export_c_x';
        }
        else {
            return 'export_c_p';
        }
    }
    getImportMethod(from) {
        if (from === 'X') {
            return 'import_x_c';
        }
        else {
            return 'import_p_c';
        }
    }
}

function createGraphForP(balX, balP, balC, atomicFeeXP, atomicFeeC) {
    let xNode = new UniversalNodeX(balX, atomicFeeXP, atomicFeeXP);
    let pNode = new UniversalNodeP(balP, atomicFeeXP, atomicFeeXP);
    let cNode = new UniversalNodeC(balC, atomicFeeC, atomicFeeC);
    pNode.addParent(xNode);
    pNode.addParent(cNode);
    cNode.setChild(pNode);
    xNode.setChild(pNode);
    return pNode;
}
function createGraphForC(balX, balP, balC, atomicFeeXP, atomicFeeC) {
    let xNode = new UniversalNodeX(balX, atomicFeeXP, atomicFeeXP);
    let pNode = new UniversalNodeP(balP, atomicFeeXP, atomicFeeXP);
    let cNode = new UniversalNodeC(balC, atomicFeeC, atomicFeeC);
    cNode.addParent(xNode);
    cNode.addParent(pNode);
    pNode.setChild(cNode);
    xNode.setChild(cNode);
    return cNode;
}
function createGraphForX(balX, balP, balC, atomicFeeXP, atomicFeeC) {
    let xNode = new UniversalNodeX(balX, atomicFeeXP, atomicFeeXP);
    let pNode = new UniversalNodeP(balP, atomicFeeXP, atomicFeeXP);
    let cNode = new UniversalNodeC(balC, atomicFeeC, atomicFeeC);
    xNode.addParent(pNode);
    xNode.addParent(cNode);
    cNode.setChild(xNode);
    pNode.setChild(xNode);
    return xNode;
}
function canHaveBalanceOnX(balX, balP, balC, targetAmount, atomicFeeXP, atomicFeeC) {
    let startNode = createGraphForX(balX, balP, balC, atomicFeeXP, atomicFeeC);
    return startNode.reduceTotalBalanceFromParents().gte(targetAmount);
}
function canHaveBalanceOnP(balX, balP, balC, targetAmount, atomicFeeXP, atomicFeeC) {
    let startNode = createGraphForP(balX, balP, balC, atomicFeeXP, atomicFeeC);
    return startNode.reduceTotalBalanceFromParents().gte(targetAmount);
}
/**
 * Will return true if `targetAmount` can exist on C chain
 */
function canHaveBalanceOnC(balX, balP, balC, targetAmount, atomicFeeXP, atomicFeeC) {
    let startNode = createGraphForC(balX, balP, balC, atomicFeeXP, atomicFeeC);
    return startNode.reduceTotalBalanceFromParents().gte(targetAmount);
}
function getStepsForBalanceP(balX, balP, balC, targetAmount, atomicFeeXP, atomicFeeC) {
    let startNode = createGraphForP(balX, balP, balC, atomicFeeXP, atomicFeeC);
    if (startNode.reduceTotalBalanceFromParents().lt(targetAmount)) {
        throw new Error('Insufficient AXC.');
    }
    return startNode.getStepsForTargetBalance(targetAmount);
}
function getStepsForBalanceC(balX, balP, balC, targetAmount, atomicFeeXP, atomicFeeC) {
    let startNode = createGraphForC(balX, balP, balC, atomicFeeXP, atomicFeeC);
    if (startNode.reduceTotalBalanceFromParents().lt(targetAmount)) {
        throw new Error('Insufficient AXC.');
    }
    return startNode.getStepsForTargetBalance(targetAmount);
}
function getStepsForBalanceX(balX, balP, balC, targetAmount, atomicFeeXP, atomicFeeC) {
    let startNode = createGraphForX(balX, balP, balC, atomicFeeXP, atomicFeeC);
    if (startNode.reduceTotalBalanceFromParents().lt(targetAmount)) {
        throw new Error('Insufficient AXC.');
    }
    return startNode.getStepsForTargetBalance(targetAmount);
}

const MAX_GAS = new avajs.BN(1000000000000);
/**
 * Returns the current gas price in WEI from the network
 */
function getGasPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        return new avajs.BN(yield web3.eth.getGasPrice());
    });
}
/**
 * Returns the gas price + 25%, or max gas
 */
function getAdjustedGasPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        let gasPrice = yield getGasPrice();
        let adjustedGas = adjustValue(gasPrice, 25);
        return avajs.BN.min(adjustedGas, MAX_GAS);
    });
}
/**
 *
 * @param val
 * @param perc What percentage to adjust with
 */
function adjustValue(val, perc) {
    let padAmt = val.div(new avajs.BN(100)).mul(new avajs.BN(perc));
    return val.add(padAmt);
}
/**
 * Returns the base fee from the network.
 */
function getBaseFee() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawHex = (yield cChain.getBaseFee()).substring(2);
        return new avajs.BN(rawHex, 'hex');
    });
}
/**
 * Returns the current base fee + 25%
 */
function getBaseFeeRecommended() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseFee = yield getBaseFee();
        return adjustValue(baseFee, 25);
    });
}
/**
 * Returns the base max priority fee from the network.
 */
function getMaxPriorityFee() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawHex = (yield cChain.getMaxPriorityFeePerGas()).substring(2);
        return new avajs.BN(rawHex, 'hex');
    });
}
/**
 * Calculate max fee for EIP 1559 transactions given baseFee and maxPriorityFee.
 * According to https://www.blocknative.com/blog/eip-1559-fees
 * @param baseFee in WEI
 * @param maxPriorityFee in WEI
 */
function calculateMaxFee(baseFee, maxPriorityFee) {
    return baseFee.mul(new avajs.BN(2)).add(maxPriorityFee);
}
/**
 * Creates a mock import transaction and estimates the gas required for it. Returns fee in units of gas.
 * @param numIns Number of inputs for the import transaction.
 * @param numSigs Number of signatures used in the import transactions. This value is the sum of owner addresses in every UTXO.
 */
function estimateImportGasFeeFromMockTx(numIns = 1, numSigs // number of signatures (sum of owner addresses in each utxo)
) {
    const ATOMIC_TX_COST = 10000; // in gas
    const SIG_COST = 1000; // in gas
    const BASE_TX_SIZE = 78;
    const SINGLE_OWNER_INPUT_SIZE = 90; // in bytes
    const OUTPUT_SIZE = 60; // in bytes
    // C chain imports consolidate inputs to one output
    const numOutputs = 1;
    // Assuming each input has 1 owner
    const baseSize = BASE_TX_SIZE + numIns * SINGLE_OWNER_INPUT_SIZE + numOutputs * OUTPUT_SIZE;
    const importGas = baseSize + numSigs * SIG_COST + ATOMIC_TX_COST;
    return importGas;
}
/**
 * Estimates the gas fee using a mock ExportTx built from the passed values.
 * @param destinationChain `X` or `P`
 * @param amount in nAXC
 * @param from The C chain hex address exported from
 * @param to The destination X or P address
 */
function estimateExportGasFeeFromMockTx(destinationChain, amount, from, to) {
    const destChainId = chainIdFromAlias(destinationChain);
    const destChainIdBuff = bintools.cb58Decode(destChainId);
    const toBuff = bintools.stringToAddress(to);
    const netID = exports.activeNetwork.networkID;
    const chainID = exports.activeNetwork.cChainID;
    const AXC_ID = exports.activeNetwork.axcID;
    const axcIDBuff = bintools.cb58Decode(AXC_ID);
    const txIn = new evm.EVMInput(from, amount, axcIDBuff);
    const secpOut = new evm.SECPTransferOutput(amount, [toBuff]);
    const txOut = new evm.TransferableOutput(axcIDBuff, secpOut);
    // Create fake export Tx
    const chainIdBuff = bintools.cb58Decode(chainID);
    const exportTx = new evm.ExportTx(netID, chainIdBuff, destChainIdBuff, [txIn], [txOut]);
    const unisgnedTx = new evm.UnsignedTx(exportTx);
    return utils.costExportTx(unisgnedTx);
}
/**
 * Returns the estimated gas for the export transaction.
 * @param destinationChain Either `X` or `P`
 * @param amount The amount to export. In nAXC.
 * @param from The C chain hex address exporting the asset
 * @param fromBech The C chain bech32 address exporting the asset
 * @param to The destination address on the destination chain
 */
function estimateExportGasFee(destinationChain, from, fromBech, to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let exportTx = yield buildEvmExportTransaction([from], to, amount, fromBech, destinationChain, new avajs.BN(0));
        return utils.costExportTx(exportTx);
    });
}

var gas_helper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getGasPrice: getGasPrice,
    getAdjustedGasPrice: getAdjustedGasPrice,
    adjustValue: adjustValue,
    getBaseFee: getBaseFee,
    getBaseFeeRecommended: getBaseFeeRecommended,
    getMaxPriorityFee: getMaxPriorityFee,
    calculateMaxFee: calculateMaxFee,
    estimateImportGasFeeFromMockTx: estimateImportGasFeeFromMockTx,
    estimateExportGasFeeFromMockTx: estimateExportGasFeeFromMockTx,
    estimateExportGasFee: estimateExportGasFee
});

class WalletProvider {
    constructor() {
        /**
         * The X chain UTXOs of the wallet's current state
         */
        this.utxosX = new avm.UTXOSet();
        /**
         * The P chain UTXOs of the wallet's current state
         */
        this.utxosP = new platformvm.UTXOSet();
        this.balanceX = {};
        this.emitter = new EventEmitter$1();
        networkEvents.on('network_change', this.onNetworkChange.bind(this));
    }
    /**
     * Call after getting done with the wallet to avoi memory leaks and remove event listeners
     */
    destroy() {
        networkEvents.off('network_change', this.onNetworkChange);
    }
    /**
     * Fired when the network changes
     * @param config
     * @protected
     */
    //@ts-ignore
    onNetworkChange(config) { }
    /***
     * Used to get an identifier string that is consistent across different network connections.
     * Currently returns the C address of this wallet.
     */
    getBaseAddress() {
        return this.getAddressC();
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }
    emit(event, args) {
        this.emitter.emit(event, args);
    }
    emitAddressChange() {
        this.emit('addressChanged', {
            X: this.getAddressX(),
            changeX: this.getChangeAddressX(),
            P: this.getAddressP(),
        });
    }
    emitBalanceChangeX() {
        this.emit('balanceChangedX', this.balanceX);
    }
    emitBalanceChangeP() {
        this.emit('balanceChangedP', this.getAxcBalanceP());
    }
    emitBalanceChangeC() {
        this.emit('balanceChangedC', this.getAxcBalanceC());
    }
    /**
     * Gets the active address on the C chain
     * @return Hex representation of the EVM address.
     */
    getAddressC() {
        return this.evmWallet.getAddress();
    }
    getEvmAddressBech() {
        return this.evmWallet.getAddressBech32();
    }
    /**
     * Returns the BTC address of the C-Chain public key.
     */
    getAddressBTC(type) {
        return this.evmWallet.getAddressBTC(type);
    }
    /**
     *
     * @param to - the address funds are being send to.
     * @param amount - amount of AXC to send in nAXC
     * @param memo - A MEMO for the transaction
     */
    sendAxcX(to, amount, memo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!exports.activeNetwork)
                throw NO_NETWORK;
            let memoBuff = memo ? avajs.Buffer.from(memo) : undefined;
            let froms = yield this.getAllAddressesX();
            let changeAddress = this.getChangeAddressX();
            let utxoSet = this.utxosX;
            let tx = yield xChain.buildBaseTx(utxoSet, amount, exports.activeNetwork.axcID, [to], froms, [changeAddress], memoBuff);
            let signedTx = yield this.signX(tx);
            let txId = yield xChain.issueTx(signedTx);
            yield waitTxX(txId);
            // Update UTXOs
            this.updateUtxosX();
            return txId;
        });
    }
    /**
     * Sends AXC to another address on the C chain using legacy transaction format.
     * @param to Hex address to send AXC to.
     * @param amount Amount of AXC to send, represented in WEI format.
     * @param gasPrice Gas price in WEI format
     * @param gasLimit Gas limit
     *
     * @return Returns the transaction hash
     */
    sendAxcC(to, amount, gasPrice, gasLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            let fromAddr = this.getAddressC();
            let tx = yield buildEvmTransferNativeTx(fromAddr, to, amount, gasPrice, gasLimit);
            let txId = yield this.issueEvmTx(tx);
            yield this.updateAxcBalanceC();
            return txId;
        });
    }
    /**
     * Send Axia Native Tokens on X chain
     * @param assetID ID of the token to send
     * @param amount How many units of the token to send. Based on smallest divisible unit.
     * @param to X chain address to send tokens to
     */
    sendANT(assetID, amount, to) {
        return __awaiter(this, void 0, void 0, function* () {
            let utxoSet = this.getUtxosX();
            let fromAddrs = yield this.getAllAddressesX();
            let changeAddr = this.getChangeAddressX();
            let tx = yield xChain.buildBaseTx(utxoSet, amount, assetID, [to], fromAddrs, [changeAddr]);
            let signed = yield this.signX(tx);
            let txId = yield xChain.issueTx(signed);
            yield waitTxX(txId);
            this.updateUtxosX();
            return txId;
        });
    }
    /**
     * Makes a transfer call on a ERC20 contract.
     * @param to Hex address to transfer tokens to.
     * @param amount Amount of the ERC20 token to send, donated in the token's correct denomination.
     * @param gasPrice Gas price in WEI format
     * @param gasLimit Gas limit
     * @param contractAddress Contract address of the ERC20 token
     */
    sendErc20(to, amount, gasPrice, gasLimit, contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let fromAddr = this.getAddressC();
            let token = yield getErc20Token(contractAddress);
            let balOld = yield token.balanceOf(fromAddr);
            let tx = yield buildEvmTransferErc20Tx(fromAddr, to, amount, gasPrice, gasLimit, contractAddress);
            let txHash = yield this.issueEvmTx(tx);
            // TODO: We should not be using setTimeout, wait until tx is confirmed on chain
            // TODO: Can it be an issue with sticky sessions? Nodes behind a LB?
            // If new balance doesnt match old, emit balance change
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                let balNew = yield token.balanceOf(fromAddr);
                if (!balOld.eq(balNew)) {
                    this.emitBalanceChangeC();
                }
            }), 2000);
            return txHash;
        });
    }
    /**
     * Makes a `safeTransferFrom` call on a ERC721 contract.
     * @param to Hex address to transfer the NFT to.
     * @param tokenID ID of the token to transfer inside the ERC71 family.
     * @param gasPrice Gas price in WEI format
     * @param gasLimit Gas limit
     * @param contractAddress Contract address of the ERC721 token
     */
    sendErc721(contractAddress, to, tokenID, gasPrice, gasLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield buildEvmTransferErc721Tx(this.getAddressC(), to, gasPrice, gasLimit, contractAddress, tokenID);
            return yield this.issueEvmTx(tx);
        });
    }
    /**
     * Estimate the gas needed for an ERC20 Transfer transaction
     * @param contractAddress The ERC20 contract address
     * @param to Address receiving the tokens
     * @param amount Amount to send. Given in the smallest divisible unit.
     */
    estimateErc20Gas(contractAddress, to, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let from = this.getAddressC();
            return yield estimateErc20Gas(contractAddress, from, to, amount);
        });
    }
    /**
     * Estimate the gas needed for an ERC721 `safeTransferFrom` transaction
     * @param contractAddress The ERC20 contract address
     * @param to Address receiving the tokens
     * @param tokenID ID of the token to transfer inside the ERC71 family.
     */
    estimateErc721TransferGasLimit(contractAddress, to, tokenID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.estimateErc721TransferGasLimit(contractAddress, to, tokenID);
        });
    }
    /**
     * Estimate gas limit for the given inputs.
     * @param to
     * @param data
     */
    estimateGas(to, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = this.getAddressC();
            const nonce = yield web3.eth.getTransactionCount(from);
            return yield web3.eth.estimateGas({
                from: from,
                nonce: nonce,
                to: to,
                data: data,
            });
        });
    }
    /**
     * Estimate the gas needed for a AXC send transaction on the C chain.
     * @param to Destination address.
     * @param amount Amount of AXC to send, in WEI.
     */
    estimateAxcGasLimit(to, amount, gasPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            let from = this.getAddressC();
            return yield estimateAxcGas(from, to, amount, gasPrice);
        });
    }
    /**
     * A method to create custom EVM transactions.
     * @param gasPrice
     * @param gasLimit
     * @param data `data` field of the transaction, in hex format
     * @param to `to` field of the transaction, in hex format
     * @param value `value` field of the transaction, in hex format
     * @param nonce Nonce of the transaction, in number. If not provided, SDK will get the latest nonce from the network
     */
    sendCustomEvmTx(gasPrice, gasLimit, data, to, value, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            let from = this.getAddressC();
            let tx = yield buildCustomEvmTx(from, gasPrice, gasLimit, data, to, value, nonce);
            return yield this.issueEvmTx(tx);
        });
    }
    /**
     * Returns the maximum spendable AXC balance for the given chain.
     * Scans all chains and take cross over fees into account
     * @param chainType X, P or C
     */
    getUsableAxcBalanceForChain(chainType, atomicFeeXP, atomicFeeC) {
        return this.createUniversalNode(chainType, atomicFeeXP, atomicFeeC).reduceTotalBalanceFromParents();
    }
    /**
     * Create a new instance of a UniversalNode for the given chain using current balance state
     * @param chain Chain of the universal node.
     * @private
     */
    createUniversalNode(chain, atomicFeeXP, atomicFeeC) {
        let xBal = this.getAxcBalanceX().unlocked;
        let pBal = this.getAxcBalanceP().unlocked;
        let cBal = axcCtoX(this.getAxcBalanceC()); // need to use 9 decimal places
        switch (chain) {
            case 'X':
                return createGraphForX(xBal, pBal, cBal, atomicFeeXP, atomicFeeC);
            case 'P':
                return createGraphForP(xBal, pBal, cBal, atomicFeeXP, atomicFeeC);
            case 'C':
                return createGraphForC(xBal, pBal, cBal, atomicFeeXP, atomicFeeC);
        }
    }
    /**
     * Can this wallet have the given amount on the given chain after a series of internal transactions (if required).
     * @param chain X/P/C
     * @param amount The amount to check against
     */
    canHaveBalanceOnChain(chain, amount, atomicFeeXP, atomicFeeC) {
        // The maximum amount of AXC we can have on this chain
        let maxAmt = this.createUniversalNode(chain, atomicFeeXP, atomicFeeC).reduceTotalBalanceFromParents();
        return maxAmt.gte(amount);
    }
    /**
     * Returns an array of transaction to do in order to have the target amount on the given chain
     * @param chain The chain (X/P/C) to have the desired amount on
     * @param amount The desired amount
     */
    getTransactionsForBalance(chain, amount, atomicFeeXP, atomicFeeC) {
        let xBal = this.getAxcBalanceX().unlocked;
        let pBal = this.getAxcBalanceP().unlocked;
        let cBal = axcCtoX(this.getAxcBalanceC()); // need to use 9 decimal places
        switch (chain) {
            case 'P':
                return getStepsForBalanceP(xBal, pBal, cBal, amount, atomicFeeXP, atomicFeeC);
            case 'C':
                return getStepsForBalanceC(xBal, pBal, cBal, amount, atomicFeeXP, atomicFeeC);
            case 'X':
                return getStepsForBalanceX(xBal, pBal, cBal, amount, atomicFeeXP, atomicFeeC);
        }
    }
    /**
     * Given a `Transaction`, it will sign and issue it to the network.
     * @param tx The unsigned transaction to issue.
     */
    issueEvmTx(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            let signedTx = yield this.signEvm(tx);
            let txHex = signedTx.serialize().toString('hex');
            let hash = yield web3.eth.sendSignedTransaction('0x' + txHex);
            const txHash = hash.transactionHash;
            return yield waitTxEvm(txHash);
        });
    }
    /**
     * Returns the C chain AXC balance of the wallet in WEI format.
     */
    updateAxcBalanceC() {
        return __awaiter(this, void 0, void 0, function* () {
            let balOld = this.evmWallet.getBalance();
            let balNew = yield this.evmWallet.updateBalance();
            if (!balOld.eq(balNew)) {
                this.emitBalanceChangeC();
            }
            return balNew;
        });
    }
    /**
     *  Returns UTXOs on the X chain that belong to this wallet.
     *  - Makes network request.
     *  - Updates `this.utxosX` with new UTXOs
     *  - Calls `this.updateBalanceX()` after success.
     *  */
    updateUtxosX() {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.getAllAddressesX();
            this.utxosX = yield avmGetAllUTXOs(addresses);
            yield this.updateUnknownAssetsX();
            this.updateBalanceX();
            return this.utxosX;
        });
    }
    /**
     *  Returns the fetched UTXOs on the X chain that belong to this wallet.
     */
    getUtxosX() {
        return this.utxosX;
    }
    /**
     *  Returns UTXOs on the P chain that belong to this wallet.
     *  - Makes network request.
     *  - Updates `this.utxosP` with the new UTXOs
     */
    updateUtxosP() {
        return __awaiter(this, void 0, void 0, function* () {
            let addresses = yield this.getAllAddressesP();
            this.utxosP = yield platformGetAllUTXOs(addresses);
            this.emitBalanceChangeP();
            return this.utxosP;
        });
    }
    /**
     * Returns the fetched UTXOs on the P chain that belong to this wallet.
     */
    getUtxosP() {
        return this.utxosP;
    }
    /**
     * Returns the number AXC staked by this wallet.
     */
    getStake() {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAllAddressesP();
            return yield getStakeForAddresses(addrs);
        });
    }
    /**
     * Returns the wallet's balance of the given ERC20 contracts
     * @param addresses ERC20 Contract addresses
     */
    getBalanceERC20(addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            let walletAddr = this.getAddressC();
            let tokenCalls = addresses.map((addr) => getErc20Token(addr));
            let tokens = yield Promise.all(tokenCalls);
            let balanceCalls = tokens.map((token) => token.balanceOf(walletAddr));
            let balances = yield Promise.all(balanceCalls);
            return balances.map((bal, i) => {
                let token = tokens[i];
                let balance = {
                    address: token.address,
                    denomination: token.decimals,
                    balanceParsed: bnToLocaleString(bal, token.decimals),
                    balance: bal,
                    name: token.name,
                    symbol: token.symbol,
                };
                return balance;
            });
        });
    }
    updateUnknownAssetsX() {
        return __awaiter(this, void 0, void 0, function* () {
            let utxos = this.utxosX.getAllUTXOs();
            let assetIds = utxos.map((utxo) => {
                let idBuff = utxo.getAssetID();
                return bintools.cb58Encode(idBuff);
            });
            let uniqueIds = assetIds.filter((id, index) => {
                return assetIds.indexOf(id) === index;
            });
            let promises = uniqueIds.map((id) => getAssetDescription(id));
            yield Promise.all(promises);
        });
    }
    /**
     * Uses the X chain UTXOs owned by this wallet, gets asset description for unknown assets,
     * and returns a dictionary of Asset IDs to balance amounts.
     * - Updates `this.balanceX`
     * - Expensive operation if there are unknown assets
     * - Uses existing UTXOs
     * @private
     */
    updateBalanceX() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!exports.activeNetwork)
                throw NO_NETWORK;
            let utxos = this.utxosX.getAllUTXOs();
            let unixNow = utils.UnixNow();
            let res = {};
            for (let i = 0; i < utxos.length; i++) {
                let utxo = utxos[i];
                let out = utxo.getOutput();
                let type = out.getOutputID();
                if (type != avm.AVMConstants.SECPXFEROUTPUTID)
                    continue;
                let locktime = out.getLocktime();
                let amount = out.getAmount();
                let assetIdBuff = utxo.getAssetID();
                let assetId = bintools.cb58Encode(assetIdBuff);
                let asset = res[assetId];
                if (!asset) {
                    let assetInfo = yield getAssetDescription(assetId);
                    asset = { locked: new avajs.BN(0), unlocked: new avajs.BN(0), meta: assetInfo };
                }
                if (locktime.lte(unixNow)) {
                    // not locked
                    asset.unlocked = asset.unlocked.add(amount);
                }
                else {
                    // locked
                    asset.locked = asset.locked.add(amount);
                }
                res[assetId] = asset;
            }
            // If there are no AXC UTXOs create a dummy empty balance object
            let axcID = exports.activeNetwork.axcID;
            if (!res[axcID]) {
                let assetInfo = yield getAssetDescription(axcID);
                res[axcID] = {
                    locked: new avajs.BN(0),
                    unlocked: new avajs.BN(0),
                    meta: assetInfo,
                };
            }
            this.balanceX = res;
            // TODO: Check previous value
            this.emitBalanceChangeX();
            return res;
        });
    }
    getBalanceX() {
        return this.balanceX;
    }
    /**
     * A helpful method that returns the AXC balance on X, P, C chains.
     * Internally calls chain specific getAxcBalance methods.
     */
    getAxcBalance() {
        let X = this.getAxcBalanceX();
        let P = this.getAxcBalanceP();
        let C = this.getAxcBalanceC();
        return {
            X,
            P,
            C,
        };
    }
    /**
     * Returns the X chain AXC balance of the current wallet state.
     * - Does not make a network request.
     * - Does not refresh wallet balance.
     */
    getAxcBalanceX() {
        if (!exports.activeNetwork) {
            throw new Error('Network not selected.');
        }
        return (this.balanceX[exports.activeNetwork.axcID] || {
            unlocked: new avajs.BN(0),
            locked: new avajs.BN(0),
        });
    }
    getAxcBalanceC() {
        return this.evmWallet.getBalance();
    }
    /**
     * Returns the P chain AXC balance of the current wallet state.
     * - Does not make a network request.
     * - Does not refresh wallet balance.
     */
    getAxcBalanceP() {
        let unlocked = new avajs.BN(0);
        let locked = new avajs.BN(0);
        let lockedStakeable = new avajs.BN(0);
        let utxos = this.utxosP.getAllUTXOs();
        let unixNow = utils.UnixNow();
        for (let i = 0; i < utxos.length; i++) {
            let utxo = utxos[i];
            let out = utxo.getOutput();
            let type = out.getOutputID();
            let amount = out.getAmount();
            if (type === platformvm.PlatformVMConstants.STAKEABLELOCKOUTID) {
                let locktime = out.getStakeableLocktime();
                if (locktime.lte(unixNow)) {
                    unlocked.iadd(amount);
                }
                else {
                    lockedStakeable = lockedStakeable.add(amount);
                }
            }
            else {
                let locktime = out.getLocktime();
                if (locktime.lte(unixNow)) {
                    unlocked.iadd(amount);
                }
                else {
                    locked.iadd(amount);
                }
            }
        }
        return {
            unlocked,
            locked,
            lockedStakeable: lockedStakeable,
        };
    }
    /**
     * Exports AXC from P chain to X chain
     * @remarks
     * The export fee is added automatically to the amount. Make sure the exported amount includes the import fee for the destination chain.
     *
     * @param amt amount of nAXC to transfer. Fees excluded.
     * @param destinationChain Either `X` or `C`
     * @return returns the transaction id.
     */
    exportPChain(amt, destinationChain) {
        return __awaiter(this, void 0, void 0, function* () {
            let pChangeAddr = this.getAddressP();
            let fromAddrs = yield this.getAllAddressesP();
            const destinationAddr = destinationChain === 'X' ? this.getAddressX() : this.getEvmAddressBech();
            let utxoSet = this.utxosP;
            const exportTx = yield buildPlatformExportTransaction(utxoSet, fromAddrs, destinationAddr, amt, pChangeAddr, destinationChain);
            let tx = yield this.signP(exportTx);
            let txId = yield pChain.issueTx(tx);
            yield waitTxP(txId);
            yield this.updateUtxosP();
            return txId;
        });
    }
    /***
     * Estimates the required fee for a C chain export transaction
     * @param destinationChain Either `X` or `P`
     * @param baseFee Current base fee of the network, use a padded amount.
     * @return BN C chain atomic export transaction fee in nAXC.
     */
    estimateAtomicFeeExportC(destinationChain, baseFee) {
        let destinationAddr = destinationChain === 'X' ? this.getAddressX() : this.getAddressP();
        const hexAddr = this.getAddressC();
        // The amount does not effect the fee that much
        const amt = new avajs.BN(0);
        const gas = estimateExportGasFeeFromMockTx(destinationChain, amt, hexAddr, destinationAddr);
        return axcCtoX(baseFee.mul(new avajs.BN(gas)));
    }
    /**
     * Exports AXC from C chain to X chain
     * @remarks
     * Make sure the exported `amt` includes the import fee for the destination chain.
     *
     * @param amt amount of nAXC to transfer
     * @param destinationChain either `X` or `P`
     * @param exportFee Export fee in nAXC
     * @return returns the transaction id.
     */
    exportCChain(amt, destinationChain, exportFee) {
        return __awaiter(this, void 0, void 0, function* () {
            let hexAddr = this.getAddressC();
            let bechAddr = this.getEvmAddressBech();
            let fromAddresses = [hexAddr];
            let destinationAddr = destinationChain === 'X' ? this.getAddressX() : this.getAddressP();
            // Calculate export fee if it's not given.
            if (!exportFee) {
                const gas = estimateExportGasFeeFromMockTx(destinationChain, amt, hexAddr, destinationAddr);
                const baseFee = yield getBaseFeeRecommended();
                exportFee = axcCtoX(baseFee.mul(new avajs.BN(gas)));
            }
            let exportTx = yield buildEvmExportTransaction(fromAddresses, destinationAddr, amt, bechAddr, destinationChain, exportFee);
            let tx = yield this.signC(exportTx);
            let txId = yield cChain.issueTx(tx);
            yield waitTxC(txId);
            yield this.updateAxcBalanceC();
            return txId;
        });
    }
    /**
     * Exports AXC from X chain to either P or C chain
     * @remarks
     * The export fee will be added to the amount automatically. Make sure the exported amount has the import fee for the destination chain.
     *
     * @param amt amount of nAXC to transfer
     * @param destinationChain Which chain to export to.
     * @return returns the transaction id.
     */
    exportXChain(amt, destinationChain) {
        return __awaiter(this, void 0, void 0, function* () {
            let destinationAddr = destinationChain === 'P' ? this.getAddressP() : this.getEvmAddressBech();
            let fromAddresses = yield this.getAllAddressesX();
            let changeAddress = this.getChangeAddressX();
            let utxos = this.utxosX;
            let exportTx = yield buildAvmExportTransaction(destinationChain, utxos, fromAddresses, destinationAddr, amt, changeAddress);
            let tx = yield this.signX(exportTx);
            let txId = yield xChain.issueTx(tx);
            yield waitTxX(txId);
            // Update UTXOs
            yield this.updateUtxosX();
            return txId;
        });
    }
    getAtomicUTXOsX(sourceChain) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAllAddressesX();
            let result = yield avmGetAtomicUTXOs(addrs, sourceChain);
            return result;
        });
    }
    getAtomicUTXOsP(sourceChain) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAllAddressesP();
            return yield platformGetAtomicUTXOs(addrs, sourceChain);
        });
    }
    getAtomicUTXOsC(sourceChain) {
        return __awaiter(this, void 0, void 0, function* () {
            const bechAddr = this.getEvmAddressBech();
            return yield evmGetAtomicUTXOs([bechAddr], sourceChain);
        });
    }
    /**
     * Fetches X-Chain atomic utxos from all source networks and returns them as one set.
     */
    getAllAtomicUTXOsX() {
        return __awaiter(this, void 0, void 0, function* () {
            const utxos = yield Promise.all([this.getAtomicUTXOsX('P'), this.getAtomicUTXOsX('C')]);
            return utxos[0].merge(utxos[1]);
        });
    }
    /**
     * Fetches P-Chain atomic utxos from all source networks and returns them as one set.
     */
    getAllAtomicUTXOsP() {
        return __awaiter(this, void 0, void 0, function* () {
            const utxos = yield Promise.all([this.getAtomicUTXOsP('X'), this.getAtomicUTXOsP('C')]);
            return utxos[0].merge(utxos[1]);
        });
    }
    /**
     * Fetches C-Chain atomic utxos from all source networks and returns them as one set.
     */
    getAllAtomicUTXOsC() {
        return __awaiter(this, void 0, void 0, function* () {
            const utxos = yield Promise.all([this.getAtomicUTXOsC('X'), this.getAtomicUTXOsC('P')]);
            return utxos[0].merge(utxos[1]);
        });
    }
    /**
     * Imports atomic X chain UTXOs to the current active X chain address
     * @param sourceChain The chain to import from, either `P` or `C`
     */
    importX(sourceChain) {
        return __awaiter(this, void 0, void 0, function* () {
            const utxoSet = yield this.getAtomicUTXOsX(sourceChain);
            if (utxoSet.getAllUTXOs().length === 0) {
                throw new Error('Nothing to import.');
            }
            let xToAddr = this.getAddressX();
            let hrp = axia.getHRP();
            let utxoAddrs = utxoSet.getAddresses().map((addr) => bintools.addressToString(hrp, 'X', addr));
            let fromAddrs = utxoAddrs;
            let ownerAddrs = utxoAddrs;
            const sourceChainId = chainIdFromAlias(sourceChain);
            // Owner addresses, the addresses we exported to
            const unsignedTx = yield xChain.buildImportTx(utxoSet, ownerAddrs, sourceChainId, [xToAddr], fromAddrs, [
                xToAddr,
            ]);
            const tx = yield this.signX(unsignedTx);
            const txId = yield xChain.issueTx(tx);
            yield waitTxX(txId);
            // Update UTXOs
            yield this.updateUtxosX();
            return txId;
        });
    }
    /**
     * Import utxos in atomic memory to the P chain.
     * @param sourceChain Either `X` or `C`
     * @param [toAddress] The destination P chain address assets will get imported to. Defaults to the P chain address of the wallet.
     */
    importP(sourceChain, toAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const utxoSet = yield this.getAtomicUTXOsP(sourceChain);
            if (utxoSet.getAllUTXOs().length === 0) {
                throw new Error('Nothing to import.');
            }
            // Owner addresses, the addresses we exported to
            let walletAddrP = this.getAddressP();
            let hrp = axia.getHRP();
            let utxoAddrs = utxoSet.getAddresses().map((addr) => bintools.addressToString(hrp, 'P', addr));
            let ownerAddrs = utxoAddrs;
            if (!toAddress) {
                toAddress = walletAddrP;
            }
            const sourceChainId = chainIdFromAlias(sourceChain);
            const unsignedTx = yield pChain.buildImportTx(utxoSet, ownerAddrs, sourceChainId, [toAddress], ownerAddrs, [walletAddrP], undefined, undefined);
            const tx = yield this.signP(unsignedTx);
            const txId = yield pChain.issueTx(tx);
            yield waitTxP(txId);
            yield this.updateUtxosP();
            return txId;
        });
    }
    /**
     *
     * @param sourceChain Which chain to import from. `X` or `P`
     * @param [fee] The import fee to use in the transactions. If omitted the SDK will try to calculate the fee. For deterministic transactions you should always pre calculate and provide this value.
     * @param [utxoSet] If omitted imports all atomic UTXOs.
     */
    importC(sourceChain, fee, utxoSet) {
        return __awaiter(this, void 0, void 0, function* () {
            let bechAddr = this.getEvmAddressBech();
            if (!utxoSet) {
                utxoSet = yield this.getAtomicUTXOsC(sourceChain);
            }
            const utxos = utxoSet.getAllUTXOs();
            if (utxos.length === 0) {
                throw new Error('Nothing to import.');
            }
            let toAddress = this.getAddressC();
            let ownerAddresses = [bechAddr];
            let fromAddresses = ownerAddresses;
            const sourceChainId = chainIdFromAlias(sourceChain);
            // Calculate fee if not provided
            if (!fee) {
                // Calculate number of signatures
                const numSigs = utxos.reduce((acc, utxo) => {
                    return acc + utxo.getOutput().getAddresses().length;
                }, 0);
                const numIns = utxos.length;
                const importGas = estimateImportGasFeeFromMockTx(numIns, numSigs);
                const baseFee = yield getBaseFeeRecommended();
                fee = axcCtoX(baseFee.mul(new avajs.BN(importGas)));
            }
            const unsignedTx = yield cChain.buildImportTx(utxoSet, toAddress, ownerAddresses, sourceChainId, fromAddresses, fee);
            let tx = yield this.signC(unsignedTx);
            let id = yield cChain.issueTx(tx);
            yield waitTxC(id);
            yield this.updateAxcBalanceC();
            return id;
        });
    }
    createNftFamily(name, symbol, groupNum) {
        return __awaiter(this, void 0, void 0, function* () {
            let fromAddresses = yield this.getAllAddressesX();
            let changeAddress = this.getChangeAddressX();
            let minterAddress = this.getAddressX();
            let utxoSet = this.utxosX;
            let unsignedTx = yield buildCreateNftFamilyTx(name, symbol, groupNum, fromAddresses, minterAddress, changeAddress, utxoSet);
            let signed = yield this.signX(unsignedTx);
            const txId = yield xChain.issueTx(signed);
            return yield waitTxX(txId);
        });
    }
    mintNft(mintUtxo, payload, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            let ownerAddress = this.getAddressX();
            let changeAddress = this.getChangeAddressX();
            let sourceAddresses = yield this.getAllAddressesX();
            let utxoSet = this.utxosX;
            let tx = yield buildMintNftTx(mintUtxo, payload, quantity, ownerAddress, changeAddress, sourceAddresses, utxoSet);
            let signed = yield this.signX(tx);
            const txId = yield xChain.issueTx(signed);
            return yield waitTxX(txId);
        });
    }
    /**
     * Adds a validator to the network using the given node id.
     *
     * @param nodeID The node id you are adding as a validator
     * @param amt Amount of AXC to stake in nAXC
     * @param start Validation period start date
     * @param end Validation period end date
     * @param delegationFee Minimum 2%
     * @param rewardAddress P chain address to send staking rewards
     * @param utxos
     *
     * @return Transaction id
     */
    validate(nodeID, amt, start, end, delegationFee, rewardAddress, utxos) {
        return __awaiter(this, void 0, void 0, function* () {
            let utxoSet = this.utxosP;
            // If given custom UTXO set use that
            if (utxos) {
                utxoSet = new platformvm.UTXOSet();
                utxoSet.addArray(utxos);
            }
            let pAddressStrings = yield this.getAllAddressesP();
            let stakeAmount = amt;
            // If reward address isn't given use index 0 address
            if (!rewardAddress) {
                rewardAddress = this.getAddressP();
            }
            // For change address use first available on the platform chain
            let changeAddress = this.getAddressP();
            let stakeReturnAddr = this.getAddressP();
            // Convert dates to unix time
            let startTime = new avajs.BN(Math.round(start.getTime() / 1000));
            let endTime = new avajs.BN(Math.round(end.getTime() / 1000));
            const unsignedTx = yield pChain.buildAddValidatorTx(utxoSet, [stakeReturnAddr], pAddressStrings, // from
            [changeAddress], // change
            nodeID, startTime, endTime, stakeAmount, [rewardAddress], delegationFee);
            let tx = yield this.signP(unsignedTx);
            const txId = yield pChain.issueTx(tx);
            yield waitTxP(txId);
            this.updateUtxosP();
            return txId;
        });
    }
    delegate(nodeID, amt, start, end, rewardAddress, utxos) {
        return __awaiter(this, void 0, void 0, function* () {
            let utxoSet = this.utxosP;
            let pAddressStrings = yield this.getAllAddressesP();
            let stakeAmount = amt;
            // If given custom UTXO set use that
            if (utxos) {
                utxoSet = new platformvm.UTXOSet();
                utxoSet.addArray(utxos);
            }
            // If reward address isn't given use current P address
            if (!rewardAddress) {
                rewardAddress = this.getAddressP();
            }
            let stakeReturnAddr = this.getAddressP();
            // For change address use the current platform chain
            let changeAddress = this.getAddressP();
            // Convert dates to unix time
            let startTime = new avajs.BN(Math.round(start.getTime() / 1000));
            let endTime = new avajs.BN(Math.round(end.getTime() / 1000));
            const unsignedTx = yield pChain.buildAddDelegatorTx(utxoSet, [stakeReturnAddr], pAddressStrings, [changeAddress], nodeID, startTime, endTime, stakeAmount, [rewardAddress] // reward address
            );
            const tx = yield this.signP(unsignedTx);
            const txId = yield pChain.issueTx(tx);
            yield waitTxP(txId);
            this.updateUtxosP();
            return txId;
        });
    }
    /**
     * Issues the given transaction.
     * @param tx A universal transaction json object.
     */
    issueUniversalTx(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (tx.action) {
                case 'export_x_c':
                    return yield this.exportXChain(tx.amount, 'C');
                case 'import_x_c':
                    return yield this.importC('X', tx.fee);
                case 'export_x_p':
                    return yield this.exportXChain(tx.amount, 'P');
                case 'import_x_p':
                    return yield this.importP('X');
                case 'export_c_x':
                    return yield this.exportCChain(tx.amount, 'X', tx.fee);
                case 'import_c_x':
                    return yield this.importX('C');
                case 'export_c_p':
                    return yield this.exportCChain(tx.amount, 'P', tx.fee);
                case 'import_c_p':
                    return yield this.importP('C');
                case 'export_p_x':
                    return yield this.exportPChain(tx.amount, 'X');
                case 'import_p_x':
                    return yield this.importX('P');
                case 'export_p_c':
                    return yield this.exportPChain(tx.amount, 'C');
                case 'import_p_c':
                    return yield this.importC('P', tx.fee);
                default:
                    throw new Error('Method not supported.');
            }
        });
    }
    getHistoryX(limit = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAllAddressesX();
            return yield getAddressHistory(addrs, limit, xChain.getBlockchainID());
        });
    }
    getHistoryP(limit = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAllAddressesP();
            return yield getAddressHistory(addrs, limit, pChain.getBlockchainID());
        });
    }
    /**
     * Returns atomic history for this wallet on the C chain.
     * @remarks Excludes EVM transactions.
     * @param limit
     */
    getHistoryC(limit = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = [this.getEvmAddressBech(), ...(yield this.getAllAddressesX())];
            return yield getAddressHistory(addrs, limit, cChain.getBlockchainID());
        });
    }
    /**
     * Returns history for this wallet on the C chain.
     * @remarks Excludes atomic C chain import/export transactions.
     */
    getHistoryEVM() {
        return __awaiter(this, void 0, void 0, function* () {
            let addr = this.getAddressC();
            return yield getAddressHistoryEVM(addr);
        });
    }
    /**
     * Returns the erc 20 activity for this wallet's C chain address. Uses Snowtrace APIs.
     * @param offset Number of items per page. Optional.
     * @param page If provided will paginate the results. Optional.
     * @param contractAddress Filter activity by the ERC20 contract address. Optional.
     */
    getHistoryERC20(page, offset, contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const erc20Hist = yield getErc20History(this.getAddressC(), exports.activeNetwork, page, offset, contractAddress);
            return erc20Hist;
        });
    }
    /**
     * Get a list of 'Normal' Transactions for wallet's C chain address. Uses Snowtrace APIs.
     * @param offset Number of items per page. Optional.
     * @param page If provided will paginate the results. Optional.
     */
    getHistoryNormalTx(page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalHist = yield getNormalHistory(this.getAddressC(), exports.activeNetwork, page, offset);
            return normalHist;
        });
    }
    getHistory(limit = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let [txsX, txsP, txsC] = yield Promise.all([
                this.getHistoryX(limit),
                this.getHistoryP(limit),
                this.getHistoryC(limit),
            ]);
            let txsXPC = filterDuplicateOrtelius(txsX.concat(txsP, txsC));
            let txsEVM = yield this.getHistoryEVM();
            let addrsX = yield this.getAllAddressesX();
            let addrBechC = this.getEvmAddressBech();
            let addrs = [...addrsX, addrBechC];
            let addrC = this.getAddressC();
            // Parse X,P,C transactions
            // Have to loop because of the asynchronous call
            let parsedXPC = [];
            for (let i = 0; i < txsXPC.length; i++) {
                let tx = txsXPC[i];
                try {
                    let summary = yield getTransactionSummary(tx, addrs, addrC);
                    parsedXPC.push(summary);
                }
                catch (err) {
                    console.error(err);
                }
            }
            // Parse EVM Transactions
            let parsedEVM = txsEVM.map((tx) => getTransactionSummaryEVM(tx, addrC));
            // Sort and join X,P,C transactions
            let parsedAll = [...parsedXPC, ...parsedEVM];
            let txsSorted = parsedAll.sort((x, y) => (x.timestamp.getTime() < y.timestamp.getTime() ? 1 : -1));
            // If there is a limit only return that much
            if (limit > 0) {
                return txsSorted.slice(0, limit);
            }
            return txsSorted;
        });
    }
    /**
     * Fetches information about the given txId and parses it from the wallet's perspective
     * @param txId
     */
    getHistoryTx(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAllAddressesX();
            let addrC = this.getAddressC();
            let rawData = yield getTx(txId);
            return yield getTransactionSummary(rawData, addrs, addrC);
        });
    }
    /**
     * Fetches information about the given txId and parses it from the wallet's perspective
     * @param txHash
     */
    getHistoryTxEvm(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrC = this.getAddressC();
            let rawData = yield getTxEvm(txHash);
            return getTransactionSummaryEVM(rawData, addrC);
        });
    }
    parseOrteliusTx(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrsX = yield this.getAllAddressesX();
            let addrBechC = this.getEvmAddressBech();
            let addrs = [...addrsX, addrBechC];
            let addrC = this.getAddressC();
            return yield getTransactionSummary(tx, addrs, addrC);
        });
    }
}

// Each HD wallet has 2 HdScaners, one for internal chain, one for external
class HdScanner {
    constructor(accountKey, isInternal = true) {
        this.index = 0;
        this.addressCache = {};
        this.keyCacheX = {};
        this.keyCacheP = {};
        this.changePath = isInternal ? '1' : '0';
        this.accountKey = accountKey;
        // We need an instance of an AVM key to generate adddresses from public keys
        let hrp = utils.getPreferredHRP(axia.getNetworkID());
        this.avmAddrFactory = new keychain.KeyPair(hrp, 'X');
    }
    getIndex() {
        return this.index;
    }
    setIndex(index) {
        let round = Math.floor(index);
        if (round < 0)
            throw new Error('A derivation index can not be less than 0.');
        this.index = round;
    }
    increment() {
        return this.index++;
    }
    getAddressX() {
        return this.getAddressForIndex(this.index, 'X');
    }
    getAddressP() {
        return this.getAddressForIndex(this.index, 'P');
    }
    /**
     * Returns every address up to and including the current index.
     * @param chainId Either X or P
     */
    getAllAddresses(chainId = 'X') {
        return __awaiter(this, void 0, void 0, function* () {
            let upTo = this.index;
            return yield this.getAddressesInRange(0, upTo + 1, chainId);
        });
    }
    /**
     * Returns every address up to and including the current index synchronously.
     * @param chainId Either X or P
     */
    getAllAddressesSync(chainId = 'X') {
        let upTo = this.index;
        return this.getAddressesInRangeSync(0, upTo + 1, chainId);
    }
    /**
     * Returns addresses in the given range
     * @param start Start index
     * @param end End index, exclusive
     * @param chainId  `X` or `P` optional, returns X by default
     */
    getAddressesInRange(start, end, chainId = 'X') {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            for (let i = start; i < end; i++) {
                res.push(this.getAddressForIndex(i, chainId));
                // Sleep every Nth address to open up the thread
                if ((i - start) % DERIVATION_SLEEP_INTERVAL === 0) {
                    yield sleep(0);
                }
            }
            return res;
        });
    }
    /**
     * Returns addresses in the given range
     * @param start Start index
     * @param end End index, exclusive
     * @param chainId  `X` or `P` optional, returns X by default
     */
    getAddressesInRangeSync(start, end, chainId = 'X') {
        let res = [];
        for (let i = start; i < end; i++) {
            res.push(this.getAddressForIndex(i, chainId));
        }
        return res;
    }
    getKeyChainX() {
        let keychain = xChain.newKeyChain();
        for (let i = 0; i <= this.index; i++) {
            let key = this.getKeyForIndexX(i);
            keychain.addKey(key);
        }
        return keychain;
    }
    getKeyChainP() {
        let keychain = pChain.newKeyChain();
        for (let i = 0; i <= this.index; i++) {
            let key = this.getKeyForIndexP(i);
            keychain.addKey(key);
        }
        return keychain;
    }
    getKeyForIndexX(index) {
        let cache = this.keyCacheX[index];
        if (cache)
            return cache;
        let hdKey = this.getHdKeyForIndex(index);
        let pkHex = hdKey.privateKey.toString('hex');
        let pkBuf = new avajs.Buffer(pkHex, 'hex');
        let keychain = xChain.newKeyChain();
        let keypair = keychain.importKey(pkBuf);
        this.keyCacheX[index] = keypair;
        return keypair;
    }
    getKeyForIndexP(index) {
        let cache = this.keyCacheP[index];
        if (cache)
            return cache;
        let hdKey = this.getHdKeyForIndex(index);
        let pkHex = hdKey.privateKey.toString('hex');
        let pkBuf = new avajs.Buffer(pkHex, 'hex');
        let keychain = pChain.newKeyChain();
        let keypair = keychain.importKey(pkBuf);
        this.keyCacheP[index] = keypair;
        return keypair;
    }
    getHdKeyForIndex(index) {
        let key;
        if (this.addressCache[index]) {
            key = this.addressCache[index];
        }
        else {
            key = this.accountKey.derivePath(`${this.changePath}/${index}`);
            this.addressCache[index] = key;
        }
        return key;
    }
    getAddressForIndex(index, chainId = 'X') {
        let key = this.getHdKeyForIndex(index);
        let publicKey = key.publicKey.toString('hex');
        let publicKeyBuff = avajs.Buffer.from(publicKey, 'hex');
        let hrp = utils.getPreferredHRP(axia.getNetworkID());
        let addrBuf = keychain.KeyPair.addressFromPublicKey(publicKeyBuff);
        let addr = bintools.addressToString(hrp, chainId, addrBuf);
        return addr;
    }
    // Uses the explorer to scan used addresses and find its starting index
    resetIndex(startIndex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!exports.activeNetwork)
                throw NO_NETWORK;
            let index;
            if (exports.activeNetwork.explorerURL) {
                index = yield this.findAvailableIndexExplorer(startIndex);
            }
            else {
                index = yield this.findAvailableIndexNode(startIndex);
            }
            this.index = index;
            return index;
        });
    }
    // Scans the address space of this hd path and finds the last used index using the
    // explorer API.
    findAvailableIndexExplorer(startIndex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrs = yield this.getAddressesInRange(startIndex, startIndex + HD_SCAN_LOOK_UP_WINDOW);
            let addrChains = yield getAddressChains(addrs);
            for (let i = 0; i < addrs.length - HD_SCAN_GAP_SIZE; i++) {
                let gapSize = 0;
                for (let n = 0; n < HD_SCAN_GAP_SIZE; n++) {
                    let scanIndex = i + n;
                    let scanAddr = addrs[scanIndex];
                    let rawAddr = scanAddr.split('-')[1];
                    let chains = addrChains[rawAddr];
                    if (!chains) {
                        // If doesnt exist on any chain
                        gapSize++;
                    }
                    else {
                        i = i + n;
                        break;
                    }
                }
                // If the gap is reached return the index
                if (gapSize === HD_SCAN_GAP_SIZE) {
                    return startIndex + i;
                }
            }
            return yield this.findAvailableIndexExplorer(startIndex + (HD_SCAN_LOOK_UP_WINDOW - HD_SCAN_GAP_SIZE));
        });
    }
    // Uses the node to find last used HD index
    // Only used when there is no explorer API available
    findAvailableIndexNode(start = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let addrsX = [];
            let addrsP = [];
            // Get keys for indexes start to start+scan_size
            for (let i = start; i < start + SCAN_SIZE; i++) {
                let addressX = this.getAddressForIndex(i, 'X');
                let addressP = this.getAddressForIndex(i, 'P');
                addrsX.push(addressX);
                addrsP.push(addressP);
            }
            let utxoSetX = (yield xChain.getUTXOs(addrsX)).utxos;
            let utxoSetP = (yield pChain.getUTXOs(addrsP)).utxos;
            // Scan UTXOs of these indexes and try to find a gap of HD_SCAN_GAP_SIZE
            for (let i = 0; i < addrsX.length - HD_SCAN_GAP_SIZE; i++) {
                let gapSize = 0;
                for (let n = 0; n < HD_SCAN_GAP_SIZE; n++) {
                    let scanIndex = i + n;
                    let addr = addrsX[scanIndex];
                    let addrBuf = bintools.parseAddress(addr, 'X');
                    let addrUTXOsX = utxoSetX.getUTXOIDs([addrBuf]);
                    let addrUTXOsP = utxoSetP.getUTXOIDs([addrBuf]);
                    if (addrUTXOsX.length === 0 && addrUTXOsP.length === 0) {
                        gapSize++;
                    }
                    else {
                        // Potential improvement
                        i = i + n;
                        break;
                    }
                }
                // If we found a gap of 20, we can return the last fullIndex+1
                if (gapSize === HD_SCAN_GAP_SIZE) {
                    let targetIndex = start + i;
                    return targetIndex;
                }
            }
            return yield this.findAvailableIndexNode(start + SCAN_RANGE);
        });
    }
}

class HDWalletAbstract extends WalletProvider {
    /**
     *
     * @param accountKey The bip32 HD node for path `m/44'/9000'/n'` where n is the desired account index.
     * @protected
     */
    constructor(accountKey) {
        super();
        this.isHdReady = false;
        this.internalScan = new HdScanner(accountKey, true);
        this.externalScan = new HdScanner(accountKey, false);
        this.accountKey = accountKey;
    }
    onNetworkChange(config) {
        super.onNetworkChange(config);
        this.isHdReady = false;
    }
    /**
     * Returns current index used for external address derivation.
     */
    getExternalIndex() {
        return this.externalScan.getIndex();
    }
    /**
     * Returns current index used for internal address derivation.
     */
    getInternalIndex() {
        return this.internalScan.getIndex();
    }
    /**
     * Gets the active external address on the X chain
     * - The X address will change after every deposit.
     */
    getAddressX() {
        return this.externalScan.getAddressX();
    }
    /**
     * Gets the active change address on the X chain
     * - The change address will change after every transaction on the X chain.
     */
    getChangeAddressX() {
        return this.internalScan.getAddressX();
    }
    /**
     * Gets the active address on the P chain
     */
    getAddressP() {
        return this.externalScan.getAddressP();
    }
    /**
     * Returns every external X chain address used by the wallet up to now.
     */
    getExternalAddressesX() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.externalScan.getAllAddresses('X');
        });
    }
    /**
     * Returns every external X chain address used by the wallet up to now.
     */
    getExternalAddressesXSync() {
        return this.externalScan.getAllAddressesSync('X');
    }
    /**
     * Returns every internal X chain address used by the wallet up to now.
     */
    getInternalAddressesX() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.internalScan.getAllAddresses('X');
        });
    }
    /**
     * Returns every internal X chain address used by the wallet up to now.
     */
    getInternalAddressesXSync() {
        return this.internalScan.getAllAddressesSync('X');
    }
    /**
     * Returns every X chain address used by the wallet up to now (internal + external).
     */
    getAllAddressesX() {
        return __awaiter(this, void 0, void 0, function* () {
            return [...(yield this.getExternalAddressesX()), ...(yield this.getInternalAddressesX())];
        });
    }
    /**
     * Returns every X chain address used by the wallet up to now (internal + external).
     */
    getAllAddressesXSync() {
        return [...this.getExternalAddressesXSync(), ...this.getInternalAddressesXSync()];
    }
    getExternalAddressesP() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.externalScan.getAllAddresses('P');
        });
    }
    getExternalAddressesPSync() {
        return this.externalScan.getAllAddressesSync('P');
    }
    /**
     * Returns every P chain address used by the wallet up to now.
     */
    getAllAddressesP() {
        return this.getExternalAddressesP();
    }
    /**
     * Returns every P chain address used by the wallet up to now.
     */
    getAllAddressesPSync() {
        return this.getExternalAddressesPSync();
    }
    /**
     * Scans the network and initializes internal and external addresses on P and X chains.
     * - Heavy operation
     * - MUST use the explorer api to find the last used address
     * - If explorer is not available it will use the connected node. This may result in invalid balances.
     */
    resetHdIndices(externalStart = 0, internalStart = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseExt = this.externalScan.resetIndex(externalStart);
            let promiseInt = this.internalScan.resetIndex(internalStart);
            const [indexExt, indexInt] = yield Promise.all([promiseExt, promiseInt]);
            this.emitAddressChange();
            this.isHdReady = true;
            this.emitHdReady();
            return {
                internal: indexInt,
                external: indexExt,
            };
        });
    }
    setHdIndices(external, internal) {
        this.externalScan.setIndex(external);
        this.internalScan.setIndex(internal);
        this.emitAddressChange();
        this.isHdReady = true;
        this.emitHdReady();
    }
    /**
     * Emits an event to indicate the wallet has finishing calculating its last use address
     * @protected
     */
    emitHdReady() {
        this.emit('hd_ready', {
            external: this.getExternalIndex(),
            internal: this.getInternalIndex(),
        });
    }
    updateUtxosX() {
        const _super = Object.create(null, {
            updateUtxosX: { get: () => super.updateUtxosX }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let utxosX = yield _super.updateUtxosX.call(this);
            // If the current internal or external X address is in the utxo set, increment hd index
            let utxoAddrs = utxosX.getAddresses();
            let utxoAddrsStr = utxoAddrs.map((addr) => {
                return bintools.addressToString(axia.getHRP(), 'X', addr);
            });
            let addrExternalX = this.getAddressX();
            let addrInternalX = this.getChangeAddressX();
            let isAddrChange = false;
            // Increment external index if the current address is in the utxo set
            if (utxoAddrsStr.includes(addrExternalX)) {
                this.incrementExternal();
                isAddrChange = true;
            }
            // Increment internal index if the current address is in the utxo set
            if (utxoAddrsStr.includes(addrInternalX)) {
                this.incrementInternal();
                isAddrChange = true;
            }
            if (isAddrChange)
                this.emitAddressChange();
            return utxosX;
        });
    }
    incrementExternal() {
        this.externalScan.increment();
    }
    incrementInternal() {
        this.internalScan.increment();
    }
    updateUtxosP() {
        const _super = Object.create(null, {
            updateUtxosP: { get: () => super.updateUtxosP }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let utxosP = yield _super.updateUtxosP.call(this);
            // If the current P address is in the utxo set, increment hd index
            let utxoAddrs = utxosP.getAddresses();
            let utxoAddrsStr = utxoAddrs.map((addr) => {
                return bintools.addressToString(axia.getHRP(), 'P', addr);
            });
            let addrExternalP = this.getAddressP();
            // Increment external index if the current address is in the utxo set
            if (utxoAddrsStr.includes(addrExternalP)) {
                this.incrementExternal();
                this.emitAddressChange();
            }
            return utxosP;
        });
    }
    getAddressAtIndexExternalX(index) {
        if (index < 0)
            throw new Error('Index must be >= 0');
        return this.externalScan.getKeyForIndexX(index).getAddressString();
    }
    getAddressAtIndexInternalX(index) {
        if (index < 0)
            throw new Error('Index must be >= 0');
        return this.internalScan.getKeyForIndexX(index).getAddressString();
    }
    getAddressAtIndexExternalP(index) {
        if (index < 0)
            throw new Error('Index must be >= 0');
        return this.externalScan.getKeyForIndexP(index).getAddressString();
    }
}

class EvmWalletReadonly {
    /**
     *
     * @param publicKey 64 byte uncompressed public key. Starts with `0x`.
     */
    constructor(publicKey) {
        this.balance = new avajs.BN(0);
        this.publicKey = publicKey;
        this.publicKeyBuff = Buffer.from(publicKey.substr(2), 'hex');
        this.address = utils$1.computeAddress(publicKey);
    }
    getBalance() {
        return this.balance;
    }
    getAddress() {
        return ethers.ethers.utils.getAddress(this.address);
    }
    getCompressedPublicKey() {
        return utils$1.computePublicKey(this.publicKey, true);
    }
    getAddressBech32() {
        const compressedKey = this.getCompressedPublicKey();
        let addr = keychain$1.KeyPair.addressFromPublicKey(avajs.Buffer.from(compressedKey.substring(2), 'hex'));
        return bintools.addressToString(axia.getHRP(), 'C', addr);
    }
    /**
     * Returns a native P2WPKH address with the prefix `bc1q`. This bitcoin address is
     * derived from the same public key of the C chain address.
     */
    getAddressBTC(networkType = 'bitcoin') {
        let network;
        if (networkType === 'bitcoin') {
            network = bitcoin.networks.bitcoin;
        }
        else if (networkType === 'testnet') {
            network = bitcoin.networks.testnet;
        }
        else {
            network = bitcoin.networks.regtest;
        }
        const compressedBuff = Buffer.from(this.getCompressedPublicKey().substring(2), 'hex');
        let ecPair = bitcoin.ECPair.fromPublicKey(compressedBuff);
        let { address } = bitcoin.payments.p2wpkh({ pubkey: ecPair.publicKey, network });
        if (!address)
            throw new Error('Unable to get BTC address.');
        return address;
    }
    updateBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            let bal = yield web3.eth.getBalance(this.address);
            this.balance = new avajs.BN(bal);
            return this.balance;
        });
    }
    /**
     * Builds an unsigned ERC721 transfer transaction from this wallet.
     * @param contract The ERC721 Contract address
     * @param tokenID Token ID
     * @param to Recipient hex address.
     * @param gasPrice Gas price in `BN`
     * @param gasLimit Gas limit
     */
    buildErc721TransferTx(contract, tokenID, to, gasPrice, gasLimit) {
        return buildEvmTransferErc721Tx(this.getAddress(), to, gasPrice, gasLimit, contract, tokenID);
    }
    estimateErc721TransferGasLimit(contract, to, tokenID) {
        return __awaiter(this, void 0, void 0, function* () {
            return estimateErc721TransferGas(contract, this.getAddress(), to, tokenID);
        });
    }
}

class PublicMnemonicWallet extends HDWalletAbstract {
    /**
     *
     * @param xpubAVM of derivation path m/44'/9000'/n' where `n` is the account index
     * @param xpubEVM of derivation path m/44'/60'/0'/0/n where `n` is the account index
     */
    constructor(xpubAVM, xpubEVM) {
        let avmAcct = bip32__namespace.fromBase58(xpubAVM);
        let evmAcct = bip32__namespace.fromBase58(xpubEVM);
        super(avmAcct);
        this.type = 'xpub';
        const uncompressedKey = utils$1.computePublicKey(evmAcct.publicKey);
        this.evmWallet = new EvmWalletReadonly(uncompressedKey);
    }
    //@ts-ignore
    signC(tx) {
        throw new Error('Not supported.');
    }
    //@ts-ignore
    signEvm(tx) {
        throw new Error('Not supported.');
    }
    //@ts-ignore
    signP(tx) {
        throw new Error('Not supported.');
    }
    //@ts-ignore
    signX(tx) {
        throw new Error('Not supported.');
    }
    //@ts-ignore
    personalSign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported.');
        });
    }
    /**
     * V1 is based upon an early version of EIP-712 that lacked some later security improvements, and should generally be neglected in favor of later versions.
     * @param data The typed data to sign.
     * */
    //@ts-ignore
    signTypedData_V1(data) {
        throw new Error('Not supported.');
    }
    /**
     * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
     * @param data The typed data to sign.
     */
    //@ts-ignore
    signTypedData_V3(data) {
        throw new Error('Not supported.');
    }
    /**
     * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
     * @param data The typed data to sign.
     */
    //@ts-ignore
    signTypedData_V4(data) {
        throw new Error('Not supported.');
    }
}

/**
 *
 * @param xpub Extended public key for m/44'/60'/0'
 * @param index Index of the Eth address
 * @returns Extended public key for m/44'/60'/0'/0/n where `n` is the address index
 */
function getEthAddressKeyFromAccountKey(xpub, index) {
    const node = bip32__namespace.fromBase58(xpub).derivePath(`0/${index}`);
    return node.toBase58();
}
function getAppAxc(transport) {
    return new AppAxc__default["default"](transport, 'w0w');
}
function getAppEth(transport) {
    return new Eth__default["default"](transport, 'w0w');
}
function getLedgerConfigAxc(transport) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = getAppAxc(transport);
        let config = yield app.getAppConfiguration();
        if (!config) {
            throw new Error(`Unable to connect ledger. You must use ledger version ${MIN_EVM_SUPPORT_V} or above.`);
        }
        //@ts-ignore
        return config;
    });
}

const ERR_TransportNotSet = new Error('Transport is not set.');
const ERR_ConfigNotSet = new Error('Ledger configuration is not set.');

class LedgerWallet extends PublicMnemonicWallet {
    /**
     *
     * @param xpubAVM of derivation path m/44'/9000'/n' where `n` is the account index
     * @param xpubEVM of derivation path m/44'/60'/0'/0/n where `n` is the account index
     * @param accountIndex The given xpubs must match this index
     * @param config
     */
    constructor(xpubAVM, xpubEVM, accountIndex) {
        super(xpubAVM, xpubEVM);
        this.type = 'ledger';
        this.accountIndex = accountIndex;
    }
    static setTransport(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            LedgerWallet.transport = transport;
            transport.on('disconnect', () => {
                console.log('transport disconnect');
                LedgerWallet.transport = undefined;
            });
            // Update the config
            const config = yield getLedgerConfigAxc(transport);
            LedgerWallet.config = config;
        });
    }
    /**
     * Create a new ledger wallet instance from the given transport
     * @param transport
     * @param accountIndex
     */
    static fromTransport(transport, accountIndex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            transport.setExchangeTimeout(LEDGER_EXCHANGE_TIMEOUT);
            const pubAxc = yield LedgerWallet.getExtendedPublicKeyAxcAccount(transport, accountIndex);
            const pubEth = yield LedgerWallet.getExtendedPublicKeyEthAddress(transport, accountIndex);
            let config = yield getLedgerConfigAxc(transport);
            if (config.version < MIN_EVM_SUPPORT_V) {
                throw new Error(`Unable to connect ledger. You must use ledger version ${MIN_EVM_SUPPORT_V} or above.`);
            }
            // Use this transport for all ledger instances
            yield LedgerWallet.setTransport(transport);
            const wallet = new LedgerWallet(pubAxc, pubEth, accountIndex);
            return wallet;
        });
    }
    /**
     * Returns the extended public key used by C chain for address derivation.
     * @remarks Returns the extended public key for path `m/44'/60'/0'`. This key can be used to derive C chain addresses.
     * @param transport
     */
    static getExtendedPublicKeyEthAccount(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            const ethApp = getAppEth(transport);
            let ethRes = yield ethApp.getAddress(ETH_ACCOUNT_PATH, true, true);
            let hdEth = new HDKey__default["default"]();
            hdEth.publicKey = buffer.Buffer.from(ethRes.publicKey, 'hex');
            hdEth.chainCode = buffer.Buffer.from(ethRes.chainCode, 'hex');
            return hdEth.publicExtendedKey;
        });
    }
    /**
     * Get the extended public key for a specific C chain address.
     * @returns The xpub of HD node m/44'/60'/0'/0/n where `n` is `accountIndex`
     * @param transport
     * @param accountIndex
     */
    static getExtendedPublicKeyEthAddress(transport, accountIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountKey = yield LedgerWallet.getExtendedPublicKeyEthAccount(transport);
            return getEthAddressKeyFromAccountKey(accountKey, accountIndex);
        });
    }
    /**
     * Returns the extended public key used by X and P chains for address derivation.
     * @remarks Returns the extended public key for path `m/44'/90000'/n'` where `n` is the account index.
     * @param transport
     * @param accountIndex Which account's public key to derive
     */
    static getExtendedPublicKeyAxcAccount(transport, accountIndex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = getAppAxc(transport);
            let res = yield app.getWalletExtendedPublicKey(getAccountPathAxia(accountIndex));
            let pubKey = res.public_key;
            let chainCode = res.chain_code;
            // Get the base58 publick key from the HDKey instance
            let hdKey = new HDKey__default["default"]();
            // @ts-ignore
            hdKey.publicKey = pubKey;
            // @ts-ignore
            hdKey.chainCode = chainCode;
            return hdKey.publicExtendedKey;
        });
    }
    /**
     * Get information about the AXC app on the ledger device.
     * @param transport
     */
    static getAxcConfig(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            return getLedgerConfigAxc(transport);
        });
    }
    signEvm(tx$1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!LedgerWallet.transport)
                throw ERR_TransportNotSet;
            const rawUnsignedTx = ethereumjsUtil.rlp.encode([
                ethereumjsUtil.bnToRlp(tx$1.nonce),
                ethereumjsUtil.bnToRlp(tx$1.gasPrice),
                ethereumjsUtil.bnToRlp(tx$1.gasLimit),
                tx$1.to !== undefined ? tx$1.to.buf : avajs.Buffer.from([]),
                ethereumjsUtil.bnToRlp(tx$1.value),
                tx$1.data,
                ethereumjsUtil.bnToRlp(tx$1.common.chainIdBN()),
                avajs.Buffer.from([]),
                avajs.Buffer.from([]),
            ]);
            const ethApp = getAppEth(LedgerWallet.transport);
            const signature = yield ethApp.signTransaction(getAccountPathEVM(this.accountIndex), rawUnsignedTx.toString('hex'));
            const signatureBN = {
                v: new ethereumjsUtil.BN(signature.v, 16),
                r: new ethereumjsUtil.BN(signature.r, 16),
                s: new ethereumjsUtil.BN(signature.s, 16),
            };
            const chainId = yield web3.eth.getChainId();
            const networkId = yield web3.eth.net.getId();
            let common = EthereumjsCommon__default["default"].forCustomChain('mainnet', { networkId, chainId }, 'istanbul');
            const chainParams = {
                common,
            };
            const signedTx = tx.Transaction.fromTxData(Object.assign({ nonce: tx$1.nonce, gasPrice: tx$1.gasPrice, gasLimit: tx$1.gasLimit, to: tx$1.to, value: tx$1.value, data: tx$1.data }, signatureBN), chainParams);
            return signedTx;
        });
    }
    // Returns an array of derivation paths that need to sign this transaction
    // Used with signTransactionHash and signTransactionParsable
    getTransactionPaths(unsignedTx, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            let tx = unsignedTx.getTransaction();
            let txType = tx.getTxType();
            let ins = tx.getIns();
            let operations = [];
            // Try to get operations, it will fail if there are none, ignore and continue
            try {
                operations = tx.getOperations();
            }
            catch (e) {
                console.log('Failed to get tx operations.');
            }
            let items = ins;
            if ((txType === avm.AVMConstants.IMPORTTX && chainId === 'X') ||
                (txType === platformvm.PlatformVMConstants.IMPORTTX && chainId === 'P')) {
                items = (tx || platformvm.ImportTx).getImportInputs();
            }
            let hrp = axia.getHRP();
            let paths = [];
            let isAxcOnly = true;
            // Collect paths derivation paths for source addresses
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let assetId = bintools.cb58Encode(item.getAssetID());
                if (assetId !== exports.activeNetwork.axcID) {
                    isAxcOnly = false;
                }
                let sigidxs = item.getInput().getSigIdxs();
                let sources = sigidxs.map((sigidx) => sigidx.getSource());
                let addrs = sources.map((source) => {
                    return bintools.addressToString(hrp, chainId, source);
                });
                for (let j = 0; j < addrs.length; j++) {
                    let srcAddr = addrs[j];
                    let pathStr = yield this.getPathFromAddress(srcAddr); // returns change/index
                    paths.push(pathStr);
                }
            }
            // Do the Same for operational inputs, if there are any...
            for (let i = 0; i < operations.length; i++) {
                let op = operations[i];
                let sigidxs = op.getOperation().getSigIdxs();
                let sources = sigidxs.map((sigidx) => sigidx.getSource());
                let addrs = sources.map((source) => {
                    return bintools.addressToString(hrp, chainId, source);
                });
                for (let j = 0; j < addrs.length; j++) {
                    let srcAddr = addrs[j];
                    let pathStr = yield this.getPathFromAddress(srcAddr); // returns change/index
                    paths.push(pathStr);
                }
            }
            return { paths, isAxcOnly };
        });
    }
    getPathFromAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let externalAddrs = yield this.externalScan.getAllAddresses();
            let internalAddrs = yield this.internalScan.getAllAddresses();
            let platformAddrs = yield this.externalScan.getAllAddresses('P');
            let extIndex = externalAddrs.indexOf(address);
            let intIndex = internalAddrs.indexOf(address);
            let platformIndex = platformAddrs.indexOf(address);
            if (extIndex >= 0) {
                return `0/${extIndex}`;
            }
            else if (intIndex >= 0) {
                return `1/${intIndex}`;
            }
            else if (platformIndex >= 0) {
                return `0/${platformIndex}`;
            }
            else if (address[0] === 'C') {
                return '0/0';
            }
            else {
                throw new Error('Unable to find source address.');
            }
        });
    }
    signX(unsignedTx) {
        return __awaiter(this, void 0, void 0, function* () {
            let tx = unsignedTx.getTransaction();
            let txType = tx.getTxType();
            let chainId = 'X';
            let parseableTxs = ParseableAvmTxEnum;
            let { paths, isAxcOnly } = yield this.getTransactionPaths(unsignedTx, chainId);
            if (!LedgerWallet.config)
                throw ERR_ConfigNotSet;
            // If ledger doesnt support parsing, sign hash
            let canLedgerParse = LedgerWallet.config.version >= '0.3.1';
            let isParsableType = txType in parseableTxs && isAxcOnly;
            let signedTx;
            if (canLedgerParse && isParsableType) {
                signedTx = yield this.signTransactionParsable(unsignedTx, paths, chainId);
            }
            else {
                signedTx = yield this.signTransactionHash(unsignedTx, paths, chainId);
            }
            return signedTx;
        });
    }
    getChangePath(chainId) {
        switch (chainId) {
            case 'P':
                return 'm/0';
            case 'X':
            default:
                return 'm/1';
        }
    }
    getChangeIndex(chainId) {
        switch (chainId) {
            case 'P':
                // return this.platformHelper.hdIndex
                return this.externalScan.getIndex();
            case 'X':
            default:
                // return this.internalHelper.hdIndex
                return this.internalScan.getIndex();
        }
    }
    getChangeBipPath(unsignedTx, chainId) {
        if (chainId === 'C') {
            return null;
        }
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();
        const chainChangePath = this.getChangePath(chainId).split('m/')[1];
        let changeIdx = this.getChangeIndex(chainId);
        // If change and destination paths are the same
        // it can cause ledger to not display the destination amt.
        // Since platform helper does not have internal/external
        // path for change (it uses the external index)
        // there will be address collisions. So return null.
        if (txType === platformvm.PlatformVMConstants.IMPORTTX ||
            txType === platformvm.PlatformVMConstants.EXPORTTX ||
            txType === platformvm.PlatformVMConstants.ADDVALIDATORTX ||
            txType === platformvm.PlatformVMConstants.ADDDELEGATORTX) {
            return null;
        }
        return bip32Path.fromString(`${AXC_ACCOUNT_PATH}/${chainChangePath}/${changeIdx}`);
    }
    // Used for signing transactions that are parsable
    signTransactionParsable(unsignedTx, paths, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            // There must be an active transport connection
            if (!LedgerWallet.transport)
                throw ERR_TransportNotSet;
            let tx = unsignedTx.getTransaction();
            tx.getTxType();
            let bip32Paths = this.pathsToUniqueBipPaths(paths);
            const appAxc = getAppAxc(LedgerWallet.transport);
            const accountPath = chainId === 'C'
                ? bip32Path.fromString(`${ETH_ACCOUNT_PATH}`)
                : bip32Path.fromString(getAccountPathAxia(this.accountIndex));
            let txbuff = unsignedTx.toBuffer();
            let changePath = this.getChangeBipPath(unsignedTx, chainId);
            //@ts-ignore
            let ledgerSignedTx = yield appAxc.signTransaction(accountPath, bip32Paths, txbuff, changePath);
            let sigMap = ledgerSignedTx.signatures;
            let creds = this.getCredentials(unsignedTx, paths, sigMap, chainId);
            let signedTx;
            switch (chainId) {
                case 'X':
                    signedTx = new avm.Tx(unsignedTx, creds);
                    break;
                case 'P':
                    signedTx = new platformvm.Tx(unsignedTx, creds);
                    break;
                case 'C':
                    signedTx = new evm.Tx(unsignedTx, creds);
                    break;
            }
            return signedTx;
        });
    }
    /**
     *
     * @param accountPath `m/44'/9000'/0'` For X/P Chains, `m/44'/60'/0'` for C Chain
     * @param bip32Paths an array of paths to sign with `['0/0','0/1'..]`
     * @param hash A buffer of the hash to sign
     * @remarks Never sign untrusted hashes. This can lead to loss of funds.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signHash(accountPath, bip32Paths, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!LedgerWallet.transport)
                throw ERR_TransportNotSet;
            const appAxc = getAppAxc(LedgerWallet.transport);
            //@ts-ignore
            return yield appAxc.signHash(accountPath, bip32Paths, hash);
        });
    }
    // Used for non parsable transactions.
    // Ideally we wont use this function at all, but ledger is not ready yet.
    signTransactionHash(unsignedTx, paths, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!LedgerWallet.transport)
                throw ERR_TransportNotSet;
            let txbuff = unsignedTx.toBuffer();
            const msg = avajs.Buffer.from(createHash__default["default"]('sha256').update(txbuff).digest());
            let bip32Paths = this.pathsToUniqueBipPaths(paths);
            const appAxc = getAppAxc(LedgerWallet.transport);
            // Sign the msg with ledger
            //TODO: Update when ledger supports Accounts
            const accountPathSource = chainId === 'C' ? ETH_ACCOUNT_PATH : getAccountPathAxia(this.accountIndex);
            const accountPath = bip32Path.fromString(accountPathSource);
            //@ts-ignore
            let sigMap = yield appAxc.signHash(accountPath, bip32Paths, msg);
            let creds = this.getCredentials(unsignedTx, paths, sigMap, chainId);
            let signedTx;
            switch (chainId) {
                case 'X':
                    signedTx = new avm.Tx(unsignedTx, creds);
                    break;
                case 'P':
                    signedTx = new platformvm.Tx(unsignedTx, creds);
                    break;
                case 'C':
                    signedTx = new evm.Tx(unsignedTx, creds);
                    break;
            }
            return signedTx;
        });
    }
    pathsToUniqueBipPaths(paths) {
        let uniquePaths = paths.filter((val, i) => {
            return paths.indexOf(val) === i;
        });
        let bip32Paths = uniquePaths.map((path) => {
            return bip32Path.fromString(path, false);
        });
        return bip32Paths;
    }
    getCredentials(unsignedTx, paths, sigMap, chainId) {
        let creds = [];
        let tx = unsignedTx.getTransaction();
        let txType = tx.getTxType();
        // @ts-ignore
        let ins = tx.getIns ? tx.getIns() : [];
        let operations = [];
        let evmInputs = [];
        let items = ins;
        if ((txType === avm.AVMConstants.IMPORTTX && chainId === 'X') ||
            (txType === platformvm.PlatformVMConstants.IMPORTTX && chainId === 'P') ||
            (txType === evm.EVMConstants.IMPORTTX && chainId === 'C')) {
            items = (tx || platformvm.ImportTx || evm.ImportTx).getImportInputs();
        }
        // Try to get operations, it will fail if there are none, ignore and continue
        try {
            operations = tx.getOperations();
        }
        catch (e) {
            console.log('Failed to get tx operations.');
        }
        let CredentialClass;
        if (chainId === 'X') {
            CredentialClass = avm.SelectCredentialClass;
        }
        else if (chainId === 'P') {
            CredentialClass = platformvm.SelectCredentialClass;
        }
        else {
            CredentialClass = evm.SelectCredentialClass;
        }
        // Try to get evm inputs, it will fail if there are none, ignore and continue
        try {
            evmInputs = tx.getInputs();
        }
        catch (e) {
            console.log('Failed to get EVM inputs.');
        }
        for (let i = 0; i < items.length; i++) {
            const sigidxs = items[i].getInput().getSigIdxs();
            const cred = CredentialClass(items[i].getInput().getCredentialID());
            for (let j = 0; j < sigidxs.length; j++) {
                let pathIndex = i + j;
                let pathStr = paths[pathIndex];
                let sigRaw = sigMap.get(pathStr);
                let sigBuff = avajs.Buffer.from(sigRaw);
                const sig = new common.Signature();
                sig.fromBuffer(sigBuff);
                cred.addSignature(sig);
            }
            creds.push(cred);
        }
        for (let i = 0; i < operations.length; i++) {
            let op = operations[i].getOperation();
            const sigidxs = op.getSigIdxs();
            const cred = CredentialClass(op.getCredentialID());
            for (let j = 0; j < sigidxs.length; j++) {
                let pathIndex = items.length + i + j;
                let pathStr = paths[pathIndex];
                let sigRaw = sigMap.get(pathStr);
                let sigBuff = avajs.Buffer.from(sigRaw);
                const sig = new common.Signature();
                sig.fromBuffer(sigBuff);
                cred.addSignature(sig);
            }
            creds.push(cred);
        }
        for (let i = 0; i < evmInputs.length; i++) {
            let evmInput = evmInputs[i];
            const sigidxs = evmInput.getSigIdxs();
            const cred = CredentialClass(evmInput.getCredentialID());
            for (let j = 0; j < sigidxs.length; j++) {
                let pathIndex = items.length + i + j;
                let pathStr = paths[pathIndex];
                let sigRaw = sigMap.get(pathStr);
                let sigBuff = avajs.Buffer.from(sigRaw);
                const sig = new common.Signature();
                sig.fromBuffer(sigBuff);
                cred.addSignature(sig);
            }
            creds.push(cred);
        }
        return creds;
    }
    signP(unsignedTx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!LedgerWallet.transport)
                throw ERR_TransportNotSet;
            let tx = unsignedTx.getTransaction();
            let txType = tx.getTxType();
            let chainId = 'P';
            let parseableTxs = ParseablePlatformEnum;
            let { paths, isAxcOnly } = yield this.getTransactionPaths(unsignedTx, chainId);
            if (!LedgerWallet.config)
                throw ERR_ConfigNotSet;
            // If ledger doesnt support parsing, sign hash
            let canLedgerParse = LedgerWallet.config.version >= '0.3.1';
            let isParsableType = txType in parseableTxs && isAxcOnly;
            // TODO: Remove after ledger is fixed
            // If UTXOS contain lockedStakeable funds always use sign hash
            let txIns = unsignedTx.getTransaction().getIns();
            for (let i = 0; i < txIns.length; i++) {
                let typeID = txIns[i].getInput().getTypeID();
                if (typeID === platformvm.PlatformVMConstants.STAKEABLELOCKINID) {
                    canLedgerParse = false;
                    break;
                }
            }
            // TODO: Remove after ledger update
            // Ledger is not able to parse P/C atomic transactions
            if (txType === platformvm.PlatformVMConstants.EXPORTTX) {
                const destChainBuff = tx.getDestinationChain();
                // If destination chain is C chain, sign hash
                const destChain = idToChainAlias(bintools.cb58Encode(destChainBuff));
                if (destChain === 'C') {
                    canLedgerParse = false;
                }
            }
            // TODO: Remove after ledger update
            // Ledger is not able to parse P/C atomic transactions
            if (txType === platformvm.PlatformVMConstants.IMPORTTX) {
                const sourceChainBuff = tx.getSourceChain();
                // If destination chain is C chain, sign hash
                const sourceChain = idToChainAlias(bintools.cb58Encode(sourceChainBuff));
                if (sourceChain === 'C') {
                    canLedgerParse = false;
                }
            }
            let signedTx;
            if (canLedgerParse && isParsableType) {
                signedTx = yield this.signTransactionParsable(unsignedTx, paths, chainId);
            }
            else {
                signedTx = yield this.signTransactionHash(unsignedTx, paths, chainId);
            }
            return signedTx;
        });
    }
    signC(unsignedTx) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Might need to upgrade paths array to:
            //  paths = Array(utxoSet.getAllUTXOs().length).fill('0/0'),
            let tx = unsignedTx.getTransaction();
            let typeId = tx.getTxType();
            let paths = [`0/${this.accountIndex}`];
            if (typeId === evm.EVMConstants.EXPORTTX) {
                let ins = tx.getInputs();
                paths = ins.map(() => `0/${this.accountIndex}`);
            }
            else if (typeId === evm.EVMConstants.IMPORTTX) {
                let ins = tx.getImportInputs();
                paths = ins.map(() => `0/${this.accountIndex}`);
            }
            let canLedgerParse = true;
            // TODO: Remove after ledger update
            // Ledger is not able to parse P/C atomic transactions
            if (typeId === evm.EVMConstants.EXPORTTX) {
                const destChainBuff = tx.getDestinationChain();
                // If destination chain is C chain, sign hash
                const destChain = idToChainAlias(bintools.cb58Encode(destChainBuff));
                if (destChain === 'P') {
                    canLedgerParse = false;
                }
            }
            // TODO: Remove after ledger update
            if (typeId === evm.EVMConstants.IMPORTTX) {
                const sourceChainBuff = tx.getSourceChain();
                // If destination chain is C chain, sign hash
                const sourceChain = idToChainAlias(bintools.cb58Encode(sourceChainBuff));
                if (sourceChain === 'P') {
                    canLedgerParse = false;
                }
            }
            let txSigned;
            if (canLedgerParse) {
                txSigned = (yield this.signTransactionParsable(unsignedTx, paths, 'C'));
            }
            else {
                txSigned = (yield this.signTransactionHash(unsignedTx, paths, 'C'));
            }
            return txSigned;
        });
    }
}

class EvmWallet extends EvmWalletReadonly {
    constructor(key) {
        // Compute the uncompressed public key from private key
        let pubKey = utils$1.computePublicKey(key);
        super(pubKey);
        this.btcPair = bitcoin__namespace.ECPair.fromPrivateKey(key);
        this.privateKey = key;
    }
    static fromPrivateKey(key) {
        return new EvmWallet(Buffer.from(key, 'hex'));
    }
    getPrivateKeyBech() {
        return `PrivateKey-` + bintools.cb58Encode(avajs.Buffer.from(this.privateKey));
    }
    getKeyChain() {
        let keychain = new evm.KeyChain(axia.getHRP(), 'C');
        keychain.importKey(this.getPrivateKeyBech());
        return keychain;
    }
    getKeyPair() {
        let keychain = new evm.KeyChain(axia.getHRP(), 'C');
        return keychain.importKey(this.getPrivateKeyBech());
    }
    signEVM(tx) {
        return tx.sign(this.privateKey);
    }
    signBTCHash(hash) {
        return this.btcPair.sign(hash);
    }
    signC(tx) {
        return tx.sign(this.getKeyChain());
    }
    getPrivateKeyHex() {
        return this.privateKey.toString('hex');
    }
    /**
     * This function is equivalent to the eth_sign Ethereum JSON-RPC method as specified in EIP-1417,
     * as well as the MetaMask's personal_sign method.
     * @param data The hex data to sign. Must start with `0x`.
     */
    personalSign(data) {
        return ethSigUtil.personalSign({ privateKey: this.privateKey, data });
    }
    /**
     * Sign typed data according to EIP-712. The signing differs based upon the version.
     * V1 is based upon an early version of EIP-712 that lacked some later security improvements, and should generally be neglected in favor of later versions.
     * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
     * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
     * @param data The typed data to sign.
     * @param version The signing version to use.
     */
    signTypedData(data, version) {
        return ethSigUtil.signTypedData({
            privateKey: this.privateKey,
            data,
            version,
        });
    }
    /**
     * V1 is based upon an early version of EIP-712 that lacked some later security improvements, and should generally be neglected in favor of later versions.
     * @param data The typed data to sign.
     * */
    signTypedData_V1(data) {
        return this.signTypedData(data, ethSigUtil.SignTypedDataVersion.V1);
    }
    /**
     * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
     * @param data The typed data to sign.
     */
    signTypedData_V3(data) {
        return this.signTypedData(data, ethSigUtil.SignTypedDataVersion.V3);
    }
    /**
     * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
     * @param data The typed data to sign.
     */
    signTypedData_V4(data) {
        return this.signTypedData(data, ethSigUtil.SignTypedDataVersion.V4);
    }
}

//TODO: Should extend public mnemonic wallet
class MnemonicWallet extends HDWalletAbstract {
    constructor(mnemonic, account = 0) {
        let seed = bip39__namespace.mnemonicToSeedSync(mnemonic);
        let masterHdKey = bip32__namespace.fromSeed(seed);
        let accountKey = masterHdKey.derivePath(getAccountPathAxia(account));
        super(accountKey);
        this.type = 'mnemonic';
        if (!bip39__namespace.validateMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic phrase.');
        }
        let ethAccountKey = masterHdKey.derivePath(getAccountPathEVM(account));
        this.ethAccountKey = ethAccountKey;
        let ethKey = ethAccountKey.privateKey;
        let evmWallet = new EvmWallet(ethKey);
        this.accountIndex = account;
        this.mnemonicCypher = new CypherAES(mnemonic);
        this.evmWallet = evmWallet;
    }
    /**
     * Returns the derived private key used by the EVM wallet.
     */
    getEvmPrivateKeyHex() {
        return this.evmWallet.getPrivateKeyHex();
    }
    /**
     * Return the mnemonic phrase for this wallet.
     */
    getMnemonic() {
        return this.mnemonicCypher.getValue();
    }
    /**
     * Generates a 24 word mnemonic phrase and initializes a wallet instance with it.
     * @return Returns the initialized wallet.
     */
    static create() {
        const mnemonic = bip39__namespace.generateMnemonic(256);
        return MnemonicWallet.fromMnemonic(mnemonic);
    }
    /**
     * Returns a new 24 word mnemonic key phrase.
     */
    static generateMnemonicPhrase() {
        return bip39__namespace.generateMnemonic(256);
    }
    /**
     * Returns a new instance of a Mnemonic wallet from the given key phrase.
     * @param mnemonic The 24 word mnemonic phrase of the wallet
     */
    static fromMnemonic(mnemonic) {
        return new MnemonicWallet(mnemonic);
    }
    /**
     * Validates the given string is a valid mnemonic.
     * @param mnemonic
     */
    static validateMnemonic(mnemonic) {
        return bip39__namespace.validateMnemonic(mnemonic);
    }
    /**
     * Signs an EVM transaction on the C chain.
     * @param tx The unsigned transaction
     */
    signEvm(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signEVM(tx);
        });
    }
    /**
     * Signs an AVM transaction.
     * @param tx The unsigned transaction
     */
    signX(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return tx.sign(this.getKeyChainX());
        });
    }
    /**
     * Signs a PlatformVM transaction.
     * @param tx The unsigned transaction
     */
    signP(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return tx.sign(this.getKeyChainP());
        });
    }
    /**
     * Signs a C chain transaction
     * @remarks
     * Used for Import and Export transactions on the C chain. For everything else, use `this.signEvm()`
     * @param tx The unsigned transaction
     */
    signC(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signC(tx);
        });
    }
    /**
     * Returns a keychain with the keys of every derived X chain address.
     * @private
     */
    getKeyChainX() {
        let internal = this.internalScan.getKeyChainX();
        let external = this.externalScan.getKeyChainX();
        return internal.union(external);
    }
    /**
     * Returns a keychain with the keys of every derived P chain address.
     * @private
     */
    getKeyChainP() {
        return this.externalScan.getKeyChainP();
    }
    // TODO: Support internal address as well
    signMessage(msgStr, index) {
        let key = this.externalScan.getKeyForIndexX(index);
        let digest = digestMessage(msgStr);
        // Convert to the other Buffer and sign
        let digestHex = digest.toString('hex');
        let digestBuff = avajs.Buffer.from(digestHex, 'hex');
        let signed = key.sign(digestBuff);
        return bintools.cb58Encode(signed);
    }
    /**
     * This function is equivalent to the eth_sign Ethereum JSON-RPC method as specified in EIP-1417,
     * as well as the MetaMask's personal_sign method.
     * @remarks Signs using the C chain address.
     * @param data The hex data to sign
     */
    personalSign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.personalSign(data);
        });
    }
    /**
     * V1 is based upon an early version of EIP-712 that lacked some later security improvements, and should generally be neglected in favor of later versions.
     * @param data The typed data to sign.
     * */
    signTypedData_V1(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signTypedData_V1(data);
        });
    }
    /**
     * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
     * @param data The typed data to sign.
     */
    signTypedData_V3(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signTypedData_V3(data);
        });
    }
    /**
     * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
     * @param data The typed data to sign.
     */
    signTypedData_V4(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signTypedData_V4(data);
        });
    }
}

class SingletonWallet extends WalletProvider {
    /**
     *
     * @param privateKey An axia private key, starts with `PrivateKey-`
     */
    constructor(privateKey) {
        super();
        this.type = 'singleton';
        this.key = '';
        this.key = privateKey;
        // Derive EVM key and address
        let pkBuf = bintools.cb58Decode(privateKey.split('-')[1]);
        this.keyBuff = pkBuf;
        let pkHex = pkBuf.toString('hex');
        let pkBuffNative = Buffer.from(pkHex, 'hex');
        this.evmWallet = new EvmWallet(pkBuffNative);
    }
    static fromPrivateKey(key) {
        return new SingletonWallet(key);
    }
    static fromEvmKey(key) {
        let keyBuff = bintools.cb58Encode(avajs.Buffer.from(key, 'hex'));
        let avmKeyStr = `PrivateKey-${keyBuff}`;
        return new SingletonWallet(avmKeyStr);
    }
    getKeyChainX() {
        let keyChain = xChain.newKeyChain();
        keyChain.importKey(this.key);
        return keyChain;
    }
    getKeyChainP() {
        let keyChain = pChain.newKeyChain();
        keyChain.importKey(this.key);
        return keyChain;
    }
    /**
     * Returns the derived private key used by the EVM wallet.
     */
    getEvmPrivateKeyHex() {
        return this.evmWallet.getPrivateKeyHex();
    }
    getAddressP() {
        let keyChain = this.getKeyChainP();
        return keyChain.getAddressStrings()[0];
    }
    getAddressX() {
        let keyChain = this.getKeyChainX();
        return keyChain.getAddressStrings()[0];
    }
    getAllAddressesP() {
        return __awaiter(this, void 0, void 0, function* () {
            return [this.getAddressP()];
        });
    }
    getAllAddressesPSync() {
        return [this.getAddressP()];
    }
    getAllAddressesX() {
        return __awaiter(this, void 0, void 0, function* () {
            return [this.getAddressX()];
        });
    }
    getAllAddressesXSync() {
        return [this.getAddressX()];
    }
    getChangeAddressX() {
        return this.getAddressX();
    }
    getExternalAddressesP() {
        return __awaiter(this, void 0, void 0, function* () {
            return [this.getAddressP()];
        });
    }
    getExternalAddressesPSync() {
        return [this.getAddressP()];
    }
    getExternalAddressesX() {
        return __awaiter(this, void 0, void 0, function* () {
            return [this.getAddressX()];
        });
    }
    getExternalAddressesXSync() {
        return [this.getAddressX()];
    }
    getInternalAddressesX() {
        return __awaiter(this, void 0, void 0, function* () {
            return [this.getAddressX()];
        });
    }
    getInternalAddressesXSync() {
        return [this.getAddressX()];
    }
    signC(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signC(tx);
        });
    }
    signEvm(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signEVM(tx);
        });
    }
    signP(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return tx.sign(this.getKeyChainP());
        });
    }
    signX(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return tx.sign(this.getKeyChainX());
        });
    }
    /**
     * This function is equivalent to the eth_sign Ethereum JSON-RPC method as specified in EIP-1417,
     * as well as the MetaMask's personal_sign method.
     * @param data The hex data to sign
     */
    personalSign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.personalSign(data);
        });
    }
    /**
     * V1 is based upon an early version of EIP-712 that lacked some later security improvements, and should generally be neglected in favor of later versions.
     * @param data The typed data to sign.
     * */
    signTypedData_V1(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signTypedData_V1(data);
        });
    }
    /**
     * V3 is based on EIP-712, except that arrays and recursive data structures are not supported.
     * @param data The typed data to sign.
     */
    signTypedData_V3(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signTypedData_V3(data);
        });
    }
    /**
     * V4 is based on EIP-712, and includes full support of arrays and recursive data structures.
     * @param data The typed data to sign.
     */
    signTypedData_V4(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.evmWallet.signTypedData_V4(data);
        });
    }
}

const stakingHeaders = [
    'Tx ID',
    'Tx Date',
    'Type',
    'Node ID',
    'Stake Amount',
    'Stake Start',
    'Reward Date (Stake End)',
    'Is Rewarded',
    'Reward Amount',
];
const normalHeaders = ['Tx ID', 'Timestamp', 'Type', 'Token Symbol', 'Amount', 'Addresses', 'Chain'];

function createCSVContent(rows) {
    let csvContent = '';
    rows.forEach(function (arr) {
        let row = arr.join(',');
        csvContent += row + '\r\n';
    });
    return csvContent;
}

/**
 * Given an array of history transactions, filter the staking txs and returns the body of a csv file.
 * @remarks You can download the returned string as a CSV file.
 * @param txs An array of transactions made by a wallet.
 */
function createCsvStaking(txs) {
    // Filter only staking transactions
    const filtered = txs.filter(isHistoryStakingTx);
    // Sort by stake end date
    const sorted = filtered.sort((a, b) => {
        const aTime = a.stakeEnd.getTime();
        const bTime = b.stakeEnd.getTime();
        return bTime - aTime;
    });
    const rows = [stakingHeaders, ...parseStakingTxs(sorted)];
    return createCSVContent(rows);
}
/**
 * Parses each staking transaction according to the headers defined in constants and returns an array of strings for
 * each cell in the CSV.
 * @param txs
 */
function parseStakingTxs(txs) {
    return txs.map((tx) => {
        const txDate = moment__default["default"](tx.timestamp).format();
        const stakeStart = moment__default["default"](tx.stakeStart).format();
        const stakeEnd = moment__default["default"](tx.stakeEnd).format();
        const now = Date.now();
        const stakeAmt = bnToBigAxcP(tx.amount).toString();
        let rewardAmt;
        if (tx.stakeEnd.getTime() > now) {
            rewardAmt = 'Pending';
        }
        else if (!tx.isRewarded) {
            rewardAmt = 'Stake Not Rewarded';
        }
        else if (tx.rewardAmount) {
            rewardAmt = !tx.rewardAmount.isZero() ? bnToBigAxcP(tx.rewardAmount).toString() : 'Not Reward Owner';
        }
        else {
            rewardAmt = 'Not Reward Owner';
        }
        return [tx.id, txDate, tx.type, tx.nodeID, stakeAmt, stakeStart, stakeEnd, tx.isRewarded.toString(), rewardAmt];
    });
}

/**
 * Given an array of history transactions, filter the base and export/import txs and returns the body of a csv file.
 * @remarks You can download the returned string as a CSV file.
 * @param txs An array of transactions made by a wallet.
 */
function createCsvNormal(txs) {
    const rows = [normalHeaders, ...parseNormalTxs(txs)];
    return createCSVContent(rows);
}
function parseNormalTxs(txs) {
    const rows = [];
    txs.map((tx) => {
        const mom = moment__default["default"](tx.timestamp);
        const dateStr = mom.format();
        if (isHistoryBaseTx(tx)) {
            const tokenRows = tx.tokens.map((token) => {
                const amtStr = bnToBig(token.amount, token.asset.denomination).toString();
                return [tx.id, dateStr, tx.type, token.asset.symbol, amtStr, `"${token.addresses.join('\r')}"`, 'X'];
            });
            rows.push(...tokenRows);
        }
        else if (isHistoryImportExportTx(tx)) {
            const amtStr = bnToBigAxcX(tx.amount).toString();
            rows.push([tx.id, dateStr, tx.type, 'AXC', amtStr, '', `${tx.source} to ${tx.destination}`]);
        }
        else if (isHistoryEVMTx(tx)) {
            const amtStr = bnToBigAxcC(tx.amount).toString();
            const amtSigned = tx.isSender ? `-${amtStr}` : amtStr;
            if (!tx.input) {
                const addr = tx.isSender ? tx.to : tx.from;
                rows.push([tx.id, dateStr, tx.type, 'AXC', amtSigned, addr, `C`]);
            }
        }
    });
    return rows;
}

Object.defineProperty(exports, 'BN', {
    enumerable: true,
    get: function () { return avajs.BN; }
});
Object.defineProperty(exports, 'Buffer', {
    enumerable: true,
    get: function () { return avajs.Buffer; }
});
Object.defineProperty(exports, 'Big', {
    enumerable: true,
    get: function () { return Big__default["default"]; }
});
exports.AVMWebSocketProvider = AVMWebSocketProvider;
exports.AXC_ACCOUNT_PATH = AXC_ACCOUNT_PATH;
exports.AXC_TOKEN_INDEX = AXC_TOKEN_INDEX;
exports.AXC_TOKEN_PATH = AXC_TOKEN_PATH;
exports.AddressHelper = address_helper;
exports.CypherAES = CypherAES;
exports.DERIVATION_SLEEP_INTERVAL = DERIVATION_SLEEP_INTERVAL;
exports.DefaultConfig = DefaultConfig;
exports.ETH_ACCOUNT_PATH = ETH_ACCOUNT_PATH;
exports.EVMWebSocketProvider = EVMWebSocketProvider;
exports.Erc20Token = Erc20Token;
exports.EvmWallet = EvmWallet;
exports.EvmWalletReadonly = EvmWalletReadonly;
exports.GasHelper = gas_helper;
exports.HDWalletAbstract = HDWalletAbstract;
exports.HD_SCAN_GAP_SIZE = HD_SCAN_GAP_SIZE;
exports.HD_SCAN_LOOK_UP_WINDOW = HD_SCAN_LOOK_UP_WINDOW;
exports.HdScanner = HdScanner;
exports.LEDGER_ETH_ACCOUNT_PATH = LEDGER_ETH_ACCOUNT_PATH;
exports.LEDGER_EXCHANGE_TIMEOUT = LEDGER_EXCHANGE_TIMEOUT;
exports.LedgerWallet = LedgerWallet;
exports.LocalnetConfig = LocalnetConfig;
exports.MIN_EVM_SUPPORT_V = MIN_EVM_SUPPORT_V;
exports.MainnetConfig = MainnetConfig;
exports.MnemonicWallet = MnemonicWallet;
exports.NetworkHelper = network_helper;
exports.PublicMnemonicWallet = PublicMnemonicWallet;
exports.SCAN_RANGE = SCAN_RANGE;
exports.SCAN_SIZE = SCAN_SIZE;
exports.SNOWTRACE_MAINNET = SNOWTRACE_MAINNET;
exports.SNOWTRACE_TESTNET = SNOWTRACE_TESTNET;
exports.SingletonWallet = SingletonWallet;
exports.TestnetConfig = TestnetConfig;
exports.TxHelper = tx_helper;
exports.UniversalNodeAbstract = UniversalNodeAbstract;
exports.UtxoHelper = utxo_helper;
exports.WebsocketProvider = WebsocketProvider;
exports.addErc20TokenFromData = addErc20TokenFromData;
exports.axcCtoX = axcCtoX;
exports.axcPtoC = axcPtoC;
exports.axcXtoC = axcXtoC;
exports.axia = axia;
exports.bigToBN = bigToBN;
exports.bigToLocaleString = bigToLocaleString;
exports.bintools = bintools;
exports.bnToAxcC = bnToAxcC;
exports.bnToAxcP = bnToAxcP;
exports.bnToAxcX = bnToAxcX;
exports.bnToBig = bnToBig;
exports.bnToBigAxcC = bnToBigAxcC;
exports.bnToBigAxcP = bnToBigAxcP;
exports.bnToBigAxcX = bnToBigAxcX;
exports.bnToLocaleString = bnToLocaleString;
exports.bustErc20Cache = bustErc20Cache;
exports.cChain = cChain;
exports.canHaveBalanceOnC = canHaveBalanceOnC;
exports.canHaveBalanceOnP = canHaveBalanceOnP;
exports.canHaveBalanceOnX = canHaveBalanceOnX;
exports.chainIdFromAlias = chainIdFromAlias;
exports.createCSVContent = createCSVContent;
exports.createCsvNormal = createCsvNormal;
exports.createCsvStaking = createCsvStaking;
exports.createGraphForC = createGraphForC;
exports.createGraphForP = createGraphForP;
exports.createGraphForX = createGraphForX;
exports.digestMessage = digestMessage;
exports.extractKeysFromDecryptedFile = extractKeysFromDecryptedFile;
exports.extractKeysV2 = extractKeysV2;
exports.extractKeysV5 = extractKeysV5;
exports.extractKeysV6 = extractKeysV6;
exports.filterDuplicateOrtelius = filterDuplicateOrtelius;
exports.filterDuplicateTransactions = filterDuplicateTransactions;
exports.findDestinationChain = findDestinationChain;
exports.findSourceChain = findSourceChain;
exports.getABIForContract = getABIForContract;
exports.getActiveNetworkConfig = getActiveNetworkConfig;
exports.getAddressChains = getAddressChains;
exports.getAddressDetailX = getAddressDetailX;
exports.getAddressHistory = getAddressHistory;
exports.getAddressHistoryEVM = getAddressHistoryEVM;
exports.getAppAxc = getAppAxc;
exports.getAppEth = getAppEth;
exports.getAssetDescription = getAssetDescription;
exports.getAssetDescriptionSync = getAssetDescriptionSync;
exports.getAxcAssetID = getAxcAssetID;
exports.getAxcPrice = getAxcPrice;
exports.getAxcPriceHistory = getAxcPriceHistory;
exports.getConfigFromUrl = getConfigFromUrl;
exports.getContractDataErc20 = getContractDataErc20;
exports.getErc20Cache = getErc20Cache;
exports.getErc20History = getErc20History;
exports.getErc20Token = getErc20Token;
exports.getErc721TokenEthers = getErc721TokenEthers;
exports.getEthAddressKeyFromAccountKey = getEthAddressKeyFromAccountKey;
exports.getEthersJsonRpcProvider = getEthersJsonRpcProvider;
exports.getEvmChainID = getEvmChainID;
exports.getLedgerConfigAxc = getLedgerConfigAxc;
exports.getNFTBalanceFromUTXOs = getNFTBalanceFromUTXOs;
exports.getNormalHistory = getNormalHistory;
exports.getRpcC = getRpcC;
exports.getRpcP = getRpcP;
exports.getRpcX = getRpcX;
exports.getStakeAmount = getStakeAmount;
exports.getStepsForBalanceC = getStepsForBalanceC;
exports.getStepsForBalanceP = getStepsForBalanceP;
exports.getStepsForBalanceX = getStepsForBalanceX;
exports.getTransactionSummary = getTransactionSummary;
exports.getTransactionSummaryEVM = getTransactionSummaryEVM;
exports.getTx = getTx;
exports.getTxEvm = getTxEvm;
exports.getTxFeeP = getTxFeeP;
exports.getTxFeeX = getTxFeeX;
exports.idToChainAlias = idToChainAlias;
exports.infoApi = infoApi;
exports.isFujiNetwork = isFujiNetwork;
exports.isHistoryBaseTx = isHistoryBaseTx;
exports.isHistoryEVMTx = isHistoryEVMTx;
exports.isHistoryImportExportTx = isHistoryImportExportTx;
exports.isHistoryStakingTx = isHistoryStakingTx;
exports.isLocalNetwork = isLocalNetwork;
exports.isMainnetNetwork = isMainnetNetwork;
exports.isSnowtraceErc20Tx = isSnowtraceErc20Tx;
exports.isSnowtraceNormalTx = isSnowtraceNormalTx;
exports.isValidAddress = isValidAddress;
exports.makeKeyfile = makeKeyfile;
exports.normalHeaders = normalHeaders;
exports.numberToBN = numberToBN;
exports.numberToBNAxcC = numberToBNAxcC;
exports.numberToBNAxcP = numberToBNAxcP;
exports.numberToBNAxcX = numberToBNAxcX;
exports.pChain = pChain;
exports.parseMemo = parseMemo;
exports.parseNftPayload = parseNftPayload;
exports.parseNormalTxs = parseNormalTxs;
exports.parseStakingTxs = parseStakingTxs;
exports.readKeyFile = readKeyFile;
exports.readV2 = readV2;
exports.readV3 = readV3;
exports.readV4 = readV4;
exports.readV5 = readV5;
exports.readV6 = readV6;
exports.setNetwork = setNetwork;
exports.setNetworkAsync = setNetworkAsync;
exports.setRpcNetwork = setRpcNetwork;
exports.setRpcNetworkAsync = setRpcNetworkAsync;
exports.sleep = sleep;
exports.stakingHeaders = stakingHeaders;
exports.stringToBN = stringToBN;
exports.waitTxC = waitTxC;
exports.waitTxEvm = waitTxEvm;
exports.waitTxP = waitTxP;
exports.waitTxX = waitTxX;
exports.web3 = web3;
exports.xChain = xChain;
//# sourceMappingURL=index.js.map

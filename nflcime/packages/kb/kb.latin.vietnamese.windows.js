/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.vietnamese.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.vietnamese.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		determineChanges: function(edit, key) {
			var changes = {
				cursorStart: 0,
				cursorEnd: 0,
				insert: '',
				context: ''
			};
			var mappings = this.getKeyMappings();
			var entry;
			if (mappings && (entry = mappings[key]) != undefined) {
				changes.insert = entry;
				changes.context = entry;
				// see if it's a tone mark
				if (this.isToneMark(entry)) {
					// look at the character behind the cursor
					var evt = {
						type: 'CursorGetContext',
						target: edit,
						textAhead: '',
						textBehind: '',
						behindCount: 1,
						aheadCount: 0
					};
					NFLCIME.dispatchEvent(evt);
					if (this.isToneMark(evt.textBehind)) {
						// it's a tone mark--remove it
						changes.cursorStart = -1;
					} else if (!this.isVowel(evt.textBehind)) {
						// it's not a vowel--don't insert anything
						changes.insert = '';
					}
				}
				return changes;
			}
		},
		onKeyboardGetPossibleKeys: function(evt) {
			if (this.currentContext && this.isVowel(this.currentContext)) {
				var mappings = this.getKeyMappings();
				if (mappings) {
					var code;
					for (code in mappings) {
						var character = mappings[code];
						if (this.isToneMark(character)) {
							var to = this.currentContext + character;
							evt.keyCodes.push(parseInt(code));
							evt.characters.push(to);
						}
					}
				}
			}
		},
		isToneMark: function(c) {
			return /[\u0300\u0301\u0303\u0309\u0323]/.test(c);
		},
		isVowel: function(c) {
			return /[a\u0103\u00e2e\u00eaio\u00f4\u01a1u\u01b0yA\u0102\u00c2E\u00caIO\u00d4\u01a0U\u01afY]/.test(c);
		},
		mapNormal: {
			0xc0: '`', // `
			0x31: '\u0103', // 1
			0x32: '\u00e2', // 2
			0x33: '\u00ea', // 3
			0x34: '\u00f4', // 4
			0x35: '\u0300', // 5
			0x36: '\u0309', // 6
			0x37: '\u0303', // 7
			0x38: '\u0301', // 8
			0x39: '\u0323', // 9
			0x30: '\u0111', // 0
			0xbd: '-', // -
			0xbb: '\u20ab', // =
			0x51: 'q', // q
			0x57: 'w', // w
			0x45: 'e', // e
			0x52: 'r', // r
			0x54: 't', // t
			0x59: 'y', // y
			0x55: 'u', // u
			0x49: 'i', // i
			0x4f: 'o', // o
			0x50: 'p', // p
			0xdb: '\u01b0', // [
			0xdd: '\u01a1', // ]
			0xdc: '\\', // \
			0x41: 'a', // a
			0x53: 's', // s
			0x44: 'd', // d
			0x46: 'f', // f
			0x47: 'g', // g
			0x48: 'h', // h
			0x4a: 'j', // j
			0x4b: 'k', // k
			0x4c: 'l', // l
			0xba: ';', // ;
			0xde: '\'', // '
			0x0d: '\u000d', // [return]
			0x5a: 'z', // z
			0x58: 'x', // x
			0x43: 'c', // c
			0x56: 'v', // v
			0x42: 'b', // b
			0x4e: 'n', // n
			0x4d: 'm', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '~', // `
			0x31: '\u0102', // 1
			0x32: '\u00c2', // 2
			0x33: '\u00ca', // 3
			0x34: '\u00d4', // 4
			0x35: '\u0300', // 5
			0x36: '\u0309', // 6
			0x37: '\u0303', // 7
			0x38: '\u0301', // 8
			0x39: '\u0323', // 9
			0x30: '\u0110', // 0
			0xbd: '_', // -
			0xbb: '+', // =
			0x51: 'Q', // q
			0x57: 'W', // w
			0x45: 'E', // e
			0x52: 'R', // r
			0x54: 'T', // t
			0x59: 'Y', // y
			0x55: 'U', // u
			0x49: 'I', // i
			0x4f: 'O', // o
			0x50: 'P', // p
			0xdb: '\u01af', // [
			0xdd: '\u01a0', // ]
			0xdc: '|', // \
			0x41: 'A', // a
			0x53: 'S', // s
			0x44: 'D', // d
			0x46: 'F', // f
			0x47: 'G', // g
			0x48: 'H', // h
			0x4a: 'J', // j
			0x4b: 'K', // k
			0x4c: 'L', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: 'Z', // z
			0x58: 'X', // x
			0x43: 'C', // c
			0x56: 'V', // v
			0x42: 'B', // b
			0x4e: 'N', // n
			0x4d: 'M', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '`', // `
			0x31: '1', // 1
			0x32: '2', // 2
			0x33: '3', // 3
			0x34: '4', // 4
			0x35: '5', // 5
			0x36: '6', // 6
			0x37: '7', // 7
			0x38: '8', // 8
			0x39: '9', // 9
			0x30: '0', // 0
			0xbd: '-', // -
			0xbb: '=', // =
			0x51: 'q', // q
			0x57: 'w', // w
			0x45: 'e', // e
			0x52: 'r', // r
			0x54: 't', // t
			0x59: 'y', // y
			0x55: 'u', // u
			0x49: 'i', // i
			0x4f: 'o', // o
			0x50: 'p', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '\\', // \
			0x41: 'a', // a
			0x53: 's', // s
			0x44: 'd', // d
			0x46: 'f', // f
			0x47: 'g', // g
			0x48: 'h', // h
			0x4a: 'j', // j
			0x4b: 'k', // k
			0x4c: 'l', // l
			0xba: ';', // ;
			0xde: '\'', // '
			0x0d: '\u000d', // [return]
			0x5a: 'z', // z
			0x58: 'x', // x
			0x43: 'c', // c
			0x56: 'v', // v
			0x42: 'b', // b
			0x4e: 'n', // n
			0x4d: 'm', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrlShift: {
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '^', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '+', // =
			0x51: 'Q', // q
			0x57: 'W', // w
			0x45: 'E', // e
			0x52: 'R', // r
			0x54: 'T', // t
			0x59: 'Y', // y
			0x55: 'U', // u
			0x49: 'I', // i
			0x4f: 'O', // o
			0x50: 'P', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: 'A', // a
			0x53: 'S', // s
			0x44: 'D', // d
			0x46: 'F', // f
			0x47: 'G', // g
			0x48: 'H', // h
			0x4a: 'J', // j
			0x4b: 'K', // k
			0x4c: 'L', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: 'Z', // z
			0x58: 'X', // x
			0x43: 'C', // c
			0x56: 'V', // v
			0x42: 'B', // b
			0x4e: 'N', // n
			0x4d: 'M', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		},
		initialize: function() {
			// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
			this.mapCtrlShift = this.mapAltCtrlShift;
		}
	}
});

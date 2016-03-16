/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.burmese.burmese.wininnwa
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.burmese.burmese.wininnwa',
		type: 'encoding converter',
		inheritance: ['cvt'],
		lang: 'my',
		mappings: [
			[/\u0021/g, '\u100d'],
			[/\u0022/g, '\u1013'],
			[/\u0023/g, '\u100b'],
			[/\u0024/g, '\u1000\u103b\u1015\u103a'],
			[/\u0026/g, '\u101b'],
			[/\u0027/g, '\u1012'],
			[/\u002a/g, '\u1002'],
			[/\u002b/g, '\u002b'],
			[/\u002c/g, '\u101a'],
			[/\u002d/g, '\u002d'],
			[/\u002e/g, '\u1037'],
			[/\u002f/g, '\u104b'],
			[/\u0030/g, '\u1040'],
			[/\u0031/g, '\u1041'],
			[/\u0032/g, '\u1042'],
			[/\u0033/g, '\u1043'],
			[/\u0034/g, '\u1044'],
			[/\u0035/g, '\u1045'],
			[/\u0036/g, '\u1046'],
			[/\u0037/g, '\u1047'],
			[/\u0038/g, '\u1048'],
			[/\u0039/g, '\u1049'],
			[/\u003a/g, '\u102b\u103a'],
			[/\u003b/g, '\u1038'],
			[/\u003c/g, '\u103c\u103d'],
			[/\u003e/g, '\u103c\u103d'],
			[/\u003f/g, '\u104a'],
			[/\u0040/g, '\u100f\u1039\u100d'],
			[/\u0041/g, '\u1017'],
			[/\u0042/g, '\u103c'],
			[/\u0043/g, '\u1003'],
			[/\u0044/g, '\u102e'],
			[/\u0045/g, '\u1014'],
			[/\u0046/g, '\u1004\u103a\u1039\u200d'],
			[/\u0047/g, '\u103d'],
			[/\u0048/g, '\u1036'],
			[/\u0049/g, '\u103e\u102f'],
			[/\u004a/g, '\u1032'],
			[/\u004b/g, '\u102f'],
			[/\u004c/g, '\u1030'],
			[/\u004d/g, '\u103c'],
			[/\u004e/g, '\u103c'],
			[/\u004f/g, '\u1009'],
			[/\u0050/g, '\u100f'],
			[/\u0051/g, '\u103b\u103e'],
			[/\u0052/g, '\u103b\u103d'],
			[/\u0053/g, '\u103e'],
			[/\u0054/g, '\u103d\u103e'],
			[/\u0055/g, '\u1037'],
			[/\u0056/g, '\u1020'],
			[/\u0057/g, '\u103b\u103d\u103e'],
			[/\u0058/g, '\u100c'],
			[/\u0059/g, '\u1037'],
			[/\u005a/g, '\u1007'],
			[/\u005b/g, '\u101f'],
			[/\u005c/g, '\u104f'],
			[/\u0060/g, '\u103c'],
			[/\u0061/g, '\u1031'],
			[/\u0062/g, '\u1018'],
			[/\u0063/g, '\u1001'],
			[/\u0064/g, '\u102d'],
			[/\u0065/g, '\u1014'],
			[/\u0066/g, '\u103a'],
			[/\u0067/g, '\u102b'],
			[/\u0068/g, '\u1037'],
			[/\u0069/g, '\u1004'],
			[/\u006a/g, '\u103c'],
			[/\u006b/g, '\u102f'],
			[/\u006c/g, '\u1030'],
			[/\u006d/g, '\u102c'],
			[/\u006e/g, '\u100a'],
			[/\u006f/g, '\u101e'],
			[/\u0070/g, '\u1005'],
			[/\u0071/g, '\u1006'],
			[/\u0072/g, '\u1019'],
			[/\u0073/g, '\u103b'],
			[/\u0074/g, '\u1021'],
			[/\u0075/g, '\u1000'],
			[/\u0076/g, '\u101c'],
			[/\u0077/g, '\u1010'],
			[/\u0078/g, '\u1011'],
			[/\u0079/g, '\u1015'],
			[/\u007a/g, '\u1016'],
			[/\u007b/g, '\u1027'],
			[/\u007c/g, '\u100b\u1039\u100c'],
			[/\u007e/g, '\u103c'],
			[/\u0192/g, '\u1041/\u1042'],
			[/\u201e/g, '\u1041/\u1043'],
			[/\u2026/g, '\u1042/\u1043'],
			[/\u2020/g, '\u1041/\u1044'],
			[/\u2021/g, '\u1043/\u1044'],
			[/\u02c6/g, '\u1041/\u1045'],
			[/\u2030/g, '\u1042/\u1045'],
			[/\u0160/g, '\u1043/\u1045'],
			[/\u2039/g, '\u1044/\u1045'],
			[/\u2019/g, '\u1039\u101c'],
			[/\u00a1/g, '\u100e'],
			[/\u00a2/g, '\u1039\u1003'],
			[/\u00a3/g, '\u1023'],
			[/\u00a4/g, '\u104e'],
			[/\u00a5/g, '\u100b\u1039\u100b'],
			[/\u00a6/g, '\u1039\u1011'],
			[/\u00a7/g, '\u103e'],
			[/\u00a8/g, '\u1039\u1013'],
			[/\u00a9/g, '\u1039\u1001'],
			[/\u00aa/g, '\u103e\u1030'],
			[/\u00ac/g, '\u1039\u1011'],
			[/\u00ae/g, '\u1039\u1019'],
			[/\u00b2/g, '\u1039\u100c'],
			[/\u00b3/g, '\u1039\u100b'],
			[/\u00b4/g, '\u1039\u1012'],
			[/\u00b9/g, '\u100d\u1039\u100e'],
			[/\u00bd/g, '\u101b'],
			[/\u00be/g, '\u1039\u1002'],
			[/\u00c1/g, '\u1039\u1017'],
			[/\u00c5/g, '\u1039\u1010'],
			[/\u00c6/g, '\u1039\u1007'],
			[/\u00c7/g, '\u1018'],
			[/\u00c9/g, '\u1039\u1010\u103d'],
			[/\u00cd/g, '\u1063'],
			[/\u00d0/g, '\u1004\u103a\u1039\u200d\u102e'],
			[/\u00d1/g, '\u1039\u1008'],
			[/\u00d3/g, '\u1009\u102c'],
			[/\u00d6/g, '\u1039\u100f'],
			[/\u00d7/g, '\u100d\u1039\u100d'],
			[/\u00d8/g, '\u1004\u103a\u1039\u200d\u102d'],
			[/\u00da/g, '\u1009'],
			[/\u00dc/g, '\u1039\u1015'],
			[/\u00df/g, '\u103b'],
			[/\u00e4/g, '\u1039\u1006'],
			[/\u00e5/g, '\u1039\u1010'],
			[/\u00e6/g, '\u1039\u1016'],
			[/\u00e9/g, '\u1039\u1014'],
			[/\u00ea/g, '\u103c\u102f'],
			[/\u00ed/g, '\u104d'],
			[/\u00f0/g, '\u102d\u1036'],
			[/\u00f1/g, '\u100a'],
			[/\u00f3/g, '\u103f'],
			[/\u00f6/g, '\u1039\u1005'],
			[/\u00f8/g, '\u1004\u103a\u1039\u200d\u1036'],
			[/\u00fa/g, '\u1039\u1000'],
			[/\u00fb/g, '\u103c\u102f'],
			[/\u00fc/g, '\u104c'],
			[/\u00fe/g, '\u1024'],
			// not in Burmese range--happen later to avoid double transformations
			[/\u005e/g, '\u002f'],
			[/\u005f/g, '\u00d7'],
			[/\u007d/g, '\u2019'],
			[/\u00ab/g, '\u005b'],
			[/\u00b0/g, '?'], // company logo
			[/\u00b5/g, '\u0021'],
			[/\u00b6/g, '\u25c5'],
			[/\u00bb/g, '\u005d'],
			[/\u00bc/g, '\u002d'],
			[/\u00bf/g, '\u003f'],
			[/\u00c0/g, '\u2666'],
			[/\u00c2/g, '\u2713'],
			[/\u00c3/g, '\u2663'],
			[/\u00c4/g, '\u2734'],
			[/\u00e0/g, '\u2665'],
			[/\u00e1/g, '\u25bb'],
			[/\u00e2/g, '\u2717'],
			[/\u00e3/g, '\u2660'],
			[/\u00e7/g, '\u002c'],
			[/\u00e8/g, '\u005f'],
			[/\u2018/g, '\u0020'],
			[/\u201a/g, '\u260e'],
			[/\u005d/g, '\u2018'],
			//  At this point all characters have been converted to Unicode. The following series
			//  of rearrangement are applicable to all Burmese converters.
			// move kinzi to the front of cluster
			[/([\u1000-\u1021\u103f](\u1039[\u1000-\u1021])*)\u1004\u103a\u1039\u200d/g, '\u1004\u103a\u1039$1'],
			// move medial ra to back of consonant(s)
			[/\u103c([\u102f\u103d]?)([\u1000-\u1021\u103f]\u103a?(\u1039[\u1000-\u1021]\u103a?)*[\u103b]*)/g, '$2\u103c$1'],
			// move e sign to back of consonant(s)
			[/\u1031([\u1000-\u1021\u103f]\u103a?(\u1039[\u1000-\u1021]\u103a?)*[\u103b-\u103e]*)/g, '$1\u1031'],
			// move i, ii, or ai sign in front of u or uu (PadaukOT expects this ordering, but it is wrong according to Unicode)
			[/([\u102f\u1030])([\u102d\u102e\u1032])/g, '$2$1'],
			// move anusvara, atha, and dot below behind other signs
			[/([\u1036\u1037\u103a]+)([\u102d-\u1030\u1032\u103d\u103e]+)/g, '$2$1']
		]
	}
});

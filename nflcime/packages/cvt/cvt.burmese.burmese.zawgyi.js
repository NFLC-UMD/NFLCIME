/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.burmese.burmese.zawgyi
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.burmese.burmese.zawgyi',
		type: 'encoding converter',
		inheritance: ['cvt'],
		lang: 'my',
		mappings: [
			[/\u1033/g, '\u102f'],
			[/\u1034/g, '\u1030'],
			[/\u103d/g, '\u103e'],
			[/\u103c/g, '\u103d'],
			[/\u103b/g, '\u103c'],
			[/\u103a/g, '\u103b'],
			[/\u1039/g, '\u103a'],
			[/\u104e/g, '\u104e\u1004\u103a\u1038'],
			[/\u105a/g, '\u102b\u103a'],
			[/\u1060/g, '\u1039\u1000'],
			[/\u1061/g, '\u1039\u1001'],
			[/\u1062/g, '\u1039\u1002'],
			[/\u1063/g, '\u1039\u1003'],
			[/\u1064/g, '\u1004\u103a\u1039\u200d'],
			[/\u1065/g, '\u1039\u1005'],
			[/\u1066/g, '\u1039\u1006'],
			[/\u1067/g, '\u1039\u1006'],
			[/\u1068/g, '\u1039\u1007'],
			[/\u1069/g, '\u1039\u1008'],
			[/\u106a/g, '\u1063'],
			[/\u106b/g, '\u100a'],
			[/\u106c/g, '\u1039\u100b'],
			[/\u106d/g, '\u1039\u100c'],
			[/\u106e/g, '\u100d\u1039\u100d'],
			[/\u106f/g, '\u100d\u1039\u100e'],
			[/\u1070/g, '\u1039\u100f'],
			[/\u1071/g, '\u1039\u1010'],
			[/\u1072/g, '\u1039\u1011'],
			[/\u1073/g, '\u1039\u1011'],
			[/\u1074/g, '\u1039\u1011'],
			[/\u1075/g, '\u1039\u1012'],
			[/\u1076/g, '\u1039\u1013'],
			[/\u1077/g, '\u1039\u1014'],
			[/\u1078/g, '\u1039\u1015'],
			[/\u1079/g, '\u1039\u1016'],
			[/\u107a/g, '\u1039\u1017'],
			[/\u107b/g, '\u1039\u1018'],
			[/\u107c/g, '\u1039\u1019'],
			[/\u107d/g, '\u103b'],
			[/\u107e/g, '\u103c'],
			[/\u107f/g, '\u103c'],
			[/\u1080/g, '\u103c'],
			[/\u1081/g, '\u103c'],
			[/\u1082/g, '\u103c'],
			[/\u1083/g, '\u103c'],
			[/\u1084/g, '\u103c'],
			[/\u1085/g, '\u1039\u101c'],
			[/\u1086/g, '\u103f'],
			[/\u1087/g, '\u103e'],
			[/\u1088/g, '\u103e\u102f'],
			[/\u1089/g, '\u103e\u1030'],
			[/\u108a/g, '\u103d\u103e'],
			[/\u108b/g, '\u1004\u103a\u1039\u200d\u102d'],
			[/\u108c/g, '\u1004\u103a\u1039\u200d\u102e'],
			[/\u108d/g, '\u1004\u103a\u1039\u200d\u1036'],
			[/\u108e/g, '\u102d\u1036'],
			[/\u108f/g, '\u1014'],
			[/\u1090/g, '\u101b'],
			[/\u1091/g, '\u100f\u1039\u100d'],
			[/\u1092/g, '\u100b\u1039\u100c'],
			[/\u1094/g, '\u1037'],
			[/\u1095/g, '\u1037'],
			[/\u1096/g, '\u1039\u1010\u103d'],
			[/\u0097/g, '\u100b\u1039\u100b'],
			//  At this point all characters have been converted to Unicode. The following series
			//  of rearrangement are applicable to all Burmese converters.
			// move kinzi to the front of cluster
			[/([\u1000-\u1021\u103f](\u1039[\u1000-\u1021])*)\u1004\u103a\u1039\u200d/g, '\u1004\u103a\u1039$1'],
			// move medial ra to back of consonant(s)
			[/\u103c([\u102f\u103d]?)([\u1000-\u1021\u103f]\u103a?(\u1039[\u1000-\u1021]\u103a?)*[\u103b]*)/g, '$2\u103c$1'],
			// move e sign to back of consonant(s)
			[/\u1031([\u1000-\u1021\u103f]\u103a?(\u1039[\u1000-\u1021]\u103a?)*[\u103b-\u103e]*)/g, '$1\u1031'],
			// move i, ii, or ai sign in front of u or uu (PadaukOT expects this ordering, but it is wrong according to Unicode)
			[/([\u102f\u1030]+)([\u102d\u102e\u1032]+)/g, '$2$1'],
			// move medial wa and ha in front of other signs
			[/([\u1031\u102f\u1030\u102d\u102e\u1032]+)([\u103d\u103e]+)/g, '$2$1'],
			// move anusvara, atha, and dot below behind other signs
			[/([\u1036\u1037\u103a]+)([\u102d-\u1030\u1032\u103a\u103d\u103e]+)/g, '$2$1'],
			// remove double diacritics
			[/\u102d\u102d/g, '\u102d'],
			[/\u102e\u102e/g, '\u102e'],
			[/\u102f\u102f/g, '\u102f'],
			[/\u1030\u1030/g, '\u1030'],
			[/\u1032\u1032/g, '\u1032'],
			[/\u1036\u1036/g, '\u1036'],
			[/\u1037\u1037/g, '\u1037'],
			[/\u1039\u1039/g, '\u1039'],
			[/\u103a\u103a/g, '\u103a'],
			[/\u103d\u103d/g, '\u103d'],
			[/\u103e\u103e/g, '\u103e']
		]
	}
});

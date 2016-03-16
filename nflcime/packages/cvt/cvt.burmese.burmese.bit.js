/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.burmese.burmese.bit
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.burmese.burmese.bit',
		type: 'encoding converter',
		inheritance: ['cvt'],
		lang: 'my',
		mappings: [
			[/\u1033/g, '\u103c'],
			[/\u1034/g, '\u103c'],
			[/\u1035/g, '\u103b'],
			[/\u1039/g, '\u103a'],
			[/\u104e/g, '\u104e\u1004\u103a\u1038'],
			[/\u105d/g, '\u102b'],
			[/\u105e/g, '\u102b\u103a'],
			[/\u105f/g, '\u103e'],
			[/\u1060/g, '\u1039\u1000'],
			[/\u1061/g, '\u1039\u1001'],
			[/\u1062/g, '\u1039\u1002'],
			[/\u1063/g, '\u1039\u1003'],
			[/\u1064/g, '\u1039\u1005'],
			[/\u1065/g, '\u1039\u1006'],
			[/\u1066/g, '\u1039\u1007'],
			[/\u1067/g, '\u1039\u100f'],
			[/\u1068/g, '\u1039\u1010'],
			[/\u1069/g, '\u1039\u1011'],
			[/\u106a/g, '\u1039\u1011'],
			[/\u106b/g, '\u1039\u1011'],
			[/\u106c/g, '\u1039\u1012'],
			[/\u106d/g, '\u1039\u1013'],
			[/\u106e/g, '\u1039\u1014'],
			[/\u106f/g, '\u1039\u1015'],
			[/\u1070/g, '\u1039\u1016'],
			[/\u1071/g, '\u1039\u1017'],
			[/\u1072/g, '\u1039\u1018'],
			[/\u1073/g, '\u1039\u1019'],
			[/\u1074/g, '\u1039\u101c'],
			[/\u1075/g, '\u1039\u100c'],
			[/\u1076/g, '\u1039\u100b'],
			[/\u1077/g, '\u1039\u1010\u103d'],
			[/\u1078/g, '\u100f\u1039\u100d'],
			[/\u1079/g, '\u100d\u1039\u100e'],
			[/\u107a/g, '\u1039\u1000'],
			[/\u107b/g, '\u1039\u1003'],
			[/\u107c/g, '\u1039\u101e'],
			[/\u107d/g, '\u1039\u1006'],
			[/\u107e/g, '\u103d'],
			[/\u107f/g, '\u103d\u103e'],
			[/\u1080/g, '\u103e'],
			[/\u1081/g, '\u103e\u102f'],
			[/\u1082/g, '\u102f'],
			[/\u1083/g, '\u1030'],
			[/\u1084/g, '\u102d\u1036'],
			[/\u1085/g, '\u1004\u103a\u1039\u200d\u1036'],
			[/\u1086/g, '\u1004\u103a\u1039\u200d'],
			[/\u1087/g, '\u1004\u103a\u1039\u200d\u102d'],
			[/\u1088/g, '\u1004\u103a\u1039\u200d\u102e'],
			[/\u1089/g, '\u100b\u1039\u100c'],
			[/\u108a/g, '\u100b\u1039\u100b'],
			[/\u108b/g, '\u100d\u1039\u100d'],
			[/\u108c/g, '\u100a'],
			[/\u108d/g, '\u103f'],
			[/\u108e/g, '\u1014'],
			[/\u108f/g, '\u1063'],
			[/\u1090/g, '\u103c'],
			[/\u1091/g, '\u103c'],
			[/\u1092/g, '\u103c'],
			[/\u1093/g, '\u103c'],
			[/\u1094/g, '\u103c'],
			[/\u1095/g, '\u103c\u103d'],
			[/\u1096/g, '\u103b\u103e'],
			[/\u1097/g, '\u103b\u103d'],
			[/\u1098/g, '\u103b\u103d\u103e'],
			[/\u1099/g, '\u1039\u1008'],
			[/\u109a/g, '\u1037'],
			[/\u109b/g, '\u1037'],
			[/\u109c/g, '\u1039\u100f'],
			[/\u109d/g, '\u1039\u1018'],
			[/\u109e/g, '\u1039\u101c'],
			[/\u109f/g, '\u101b'],
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

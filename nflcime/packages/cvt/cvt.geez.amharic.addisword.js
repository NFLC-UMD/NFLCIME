/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.geez.amharic.addisword
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.geez.amharic.addisword',
		type: 'encoding converter',
		inheritance: ['cvt'],
		lang: 'am',
		convertTextSegment: function(segment) {
			var map1, map2;
			var font = segment.style.fontFamily;
			if (/(^|,)ADDISPROONE($|,)/i.test(font)) {
				map1 = this.addisOneCommonMappings;
				map2 = this.addisProOneMappingsExtra;
			} else if (/(^|,)ADDISPROTWO($|,)/i.test(font)) {
				map1 = this.addisTwoCommonMappings;
				map2 = this.addisProTwoMappingsExtra;
			} else if (/(^|,)ADDIS ONE($|,)/i.test(font)) {
				map1 = this.addisOneCommonMappings;
				map2 = this.addisOneMappingsExtra;
			} else if (/(^|,)ADDIS TWO($|,)/i.test(font)) {
				map1 = this.addisTwoCommonMappings;
				map2 = this.addisTwoMappingsExtra;
			}
			if (map1 && map2) {
				segment.text = this.applyMappings(map1, segment.text);
				segment.text = this.applyMappings(map2, segment.text);
				segment.lang = this.lang;
			}
		},
		addisOneCommonMappings: [
			[/\u0022/g, '\u00f7'],
			[/\u0027/g, '\u1363'],
			[/\u003a/g, '\u1362'],
			[/\u003b/g, '\u1364'],
			[/\u003c/g, '\u2018'],
			[/\u003e/g, '\u2019'],
			[/\u0041/g, '\u1200'],
			[/\u0042/g, '\u1201'],
			[/\u0043/g, '\u1202'],
			[/\u0044/g, '\u1203'],
			[/\u0045/g, '\u1204'],
			[/\u0046/g, '\u1205'],
			[/\u0047/g, '\u1206'],
			[/\u0048/g, '\u1208'],
			[/\u0049/g, '\u1209'],
			[/\u004a/g, '\u120a'],
			[/\u004b/g, '\u120b'],
			[/\u004c/g, '\u120c'],
			[/\u004d/g, '\u120d'],
			[/\u004e/g, '\u120e'],
			[/\u004f/g, '\u1218'],
			[/\u0050/g, '\u1219'],
			[/\u0051/g, '\u121a'],
			[/\u0052/g, '\u121b'],
			[/\u0053/g, '\u121c'],
			[/\u0054/g, '\u121d'],
			[/\u0055/g, '\u121e'],
			[/\u0056/g, '\u1228'],
			[/\u0057/g, '\u1229'],
			[/\u0058/g, '\u122a'],
			[/\u0059/g, '\u122b'],
			[/\u005a/g, '\u122c'],
			[/\u005b/g, '\u1328'],
			[/\u005c/g, '\u1329'],
			[/\u005d/g, '\u132a'],
			[/\u005e/g, '\u132b'],
			[/\u005f/g, '\u1328'],
			[/\u0060/g, '\u132e'],
			[/\u0061/g, '\u122d'],
			[/\u0062/g, '\u12b8'],
			[/\u0063/g, '\u1350'],
			[/\u0064/g, '\u1351'],
			[/\u0065/g, '\u1352'],
			[/\u0066/g, '\u1353'],
			[/\u0067/g, '\u1354'],
			[/\u0068/g, '\u1355'],
			[/\u0069/g, '\u1356'],
			[/\u006d/g, '\u1353'],
			[/\u006e/g, '\u1290'],
			[/\u006f/g, '\u132d'],
			[/\u0070/g, '\u2018'],
			[/\u0071/g, '\u1348'],
			[/\u0072/g, '\u1349'],
			[/\u0073/g, '\u134a'],
			[/\u0074/g, '\u134b'],
			[/\u0075/g, '\u134c'],
			[/\u0076/g, '\u134d'],
			[/\u0077/g, '\u134e'],
			[/\u0078/g, '\u12e8'],
			[/\u0079/g, '\u12e9'],
			[/\u007a/g, '\u12ea'],
			[/\u007e/g, '\u1291'],
			[/\u20ac/g, '\u12eb'],
			[/\u0081/g, '\u1335'],
			[/\u201a/g, '\u12ed'],
			[/\u0192/g, '\u12ee'],
			[/\u201e/g, '\u1270'],
			[/\u2026/g, '\u1271'],
			[/\u2020/g, '\u1272'],
			[/\u2021/g, '\u1273'],
			[/\u02c6/g, '\u1274'],
			[/\u2030/g, '\u1275'],
			[/\u0160/g, '\u1276'],
			[/\u2039/g, '\u1278'],
			[/\u0152/g, '\u1279'],
			[/\u008d/g, '\u127a'],
			[/\u017d/g, '\u127b'],
			[/\u008f/g, '\u127c'],
			[/\u0090/g, '\u127d'],
			[/\u2018/g, '\u127e'],
			[/\u2019/g, '\u1290'],
			[/\u201c/g, '\u1291'],
			[/\u201d/g, '\u12ad'],
			[/\u2022/g, '\u1293'],
			[/\u2013/g, '\u1294'],
			[/\u2014/g, '\u1295'],
			[/\u02dc/g, '\u1296'],
			[/\u2122/g, '\u1298'],
			[/\u0161/g, '\u1299'],
			[/\u203a/g, '\u129a'],
			[/\u0153/g, '\u129b'],
			[/\u009d/g, '\u129c'],
			[/\u017e/g, '\u129d'],
			[/\u0178/g, '\u129e'],
			[/\u00a1/g, '\u12a0'],
			[/\u00a2/g, '\u12a1'],
			[/\u00a3/g, '\u12a2'],
			[/\u00a4/g, '\u12a3'],
			[/\u00a5/g, '\u12a4'],
			[/\u00a6/g, '\u12a5'],
			[/\u00a7/g, '\u12a6'],
			[/\u00a8/g, '\u12a8'],
			[/\u00a9/g, '\u12a9'],
			[/\u00aa/g, '\u12aa'],
			[/\u00ab/g, '\u12ab'],
			[/\u00ac/g, '\u12ac'],
			[/\u00ad/g, '\u12ad'],
			[/\u00ae/g, '\u12ae'],
			[/\u00af/g, '\u12c8'],
			[/\u00b0/g, '\u12c9'],
			[/\u00b1/g, '\u12ca'],
			[/\u00b2/g, '\u12cb'],
			[/\u00b3/g, '\u12cc'],
			[/\u00b4/g, '\u12cd'],
			[/\u00b5/g, '\u12ce'],
			[/\u00b6/g, '\u12d8'],
			[/\u00b7/g, '\u12d9'],
			[/\u00b8/g, '\u12da'],
			[/\u00b9/g, '\u12db'],
			[/\u00ba/g, '\u12dc'],
			[/\u00bb/g, '\u12dd'],
			[/\u00bc/g, '\u12de'],
			[/\u00bd/g, '\u1260'],
			[/\u00be/g, '\u1261'],
			[/\u00bf/g, '\u1262'],
			[/\u00c0/g, '\u1263'],
			[/\u00c1/g, '\u1264'],
			[/\u00c2/g, '\u1265'],
			[/\u00c3/g, '\u1266'],
			[/\u00c4/g, '\u12f0'],
			[/\u00c5/g, '\u12f1'],
			[/\u00c6/g, '\u12f2'],
			[/\u00c7/g, '\u12f3'],
			[/\u00c8/g, '\u12f4'],
			[/\u00c9/g, '\u12f5'],
			[/\u00ca/g, '\u12f6'],
			[/\u00cb/g, '\u1300'],
			[/\u00cc/g, '\u1301'],
			[/\u00cd/g, '\u1302'],
			[/\u00ce/g, '\u1303'],
			[/\u00cf/g, '\u1304'],
			[/\u00d0/g, '\u1305'],
			[/\u00d1/g, '\u1306'],
			[/\u00d2/g, '\u1308'],
			[/\u00d3/g, '\u1309'],
			[/\u00d4/g, '\u130a'],
			[/\u00d5/g, '\u130b'],
			[/\u00d6/g, '\u130c'],
			[/\u00d7/g, '\u130d'],
			[/\u00d8/g, '\u130e'],
			[/\u00d9/g, '\u1320'],
			[/\u00da/g, '\u1321'],
			[/\u00db/g, '\u1322'],
			[/\u00dc/g, '\u1323'],
			[/\u00dd/g, '\u1324'],
			[/\u00de/g, '\u1325'],
			[/\u00df/g, '\u1326'],
			[/\u00e0/g, '\u1238'],
			[/\u00e1/g, '\u1239'],
			[/\u00e2/g, '\u123a'],
			[/\u00e3/g, '\u123b'],
			[/\u00e4/g, '\u123c'],
			[/\u00e5/g, '\u123d'],
			[/\u00e6/g, '\u123e'],
			[/\u00e7/g, '\u1340'],
			[/\u00e8/g, '\u1341'],
			[/\u00e9/g, '\u1342'],
			[/\u00ea/g, '\u1343'],
			[/\u00eb/g, '\u1344'],
			[/\u00ec/g, '\u1345'],
			[/\u00ed/g, '\u1346'],
			[/\u00ee/g, '\u1240'],
			[/\u00ef/g, '\u1241'],
			[/\u00f0/g, '\u1242'],
			[/\u00f1/g, '\u1243'],
			[/\u00f2/g, '\u1244'],
			[/\u00f3/g, '\u1245'],
			[/\u00f4/g, '\u1246'],
			[/\u00f5/g, '\u1230'],
			[/\u00f6/g, '\u1231'],
			[/\u00f7/g, '\u1232'],
			[/\u00f8/g, '\u1233'],
			[/\u00f9/g, '\u1234'],
			[/\u00fa/g, '\u1235'],
			[/\u00fb/g, '\u1236'],
			[/\u00fc/g, '\u122e'],
			[/\u00fd/g, '\u12ec'],
			[/\u00fe/g, '\u1293'],
			[/\u00ff/g, '\u1292']
		],
		addisOneMappingsExtra: [
			[/\u006a/g, '['],
			[/\u006b/g, '\\'],
			[/\u006c/g, ']'],
			[/\u007c/g, '\u1366'],
			[/\u007f/g, '~']
		],
		addisProOneMappingsExtra: [
			[/\u0023/g, '\u12ad'],
			[/\u0026/g, '\u127e'],
			[/\u006a/g, '\u1293'],
			[/\u006b/g, '\u1294'],
			[/\u006c/g, '\u1295'],
			[/\u007c/g, '\u1294'],
			[/\u007f/g, '\u12ad']
		],
		addisTwoCommonMappings: [
			[/\u0030/g, '\u137c'],
			[/\u0031/g, '\u1369'],
			[/\u0032/g, '\u136a'],
			[/\u0033/g, '\u136b'],
			[/\u0034/g, '\u136c'],
			[/\u0035/g, '\u136d'],
			[/\u0036/g, '\u136e'],
			[/\u0037/g, '\u136f'],
			[/\u0038/g, '\u1370'],
			[/\u0039/g, '\u1371'],
			[/\u003a/g, '\u1210'],
			[/\u003b/g, '\u1211'],
			[/\u003c/g, '\u1212'],
			[/\u003d/g, '\u1213'],
			[/\u003e/g, '\u1214'],
			[/\u003f/g, '\u1215'],
			[/\u0041/g, '\u1372'],
			[/\u0042/g, '\u1373'],
			[/\u0043/g, '\u1374'],
			[/\u0044/g, '\u1375'],
			[/\u0045/g, '\u1376'],
			[/\u0046/g, '\u1377'],
			[/\u0047/g, '\u1378'],
			[/\u0048/g, '\u1379'],
			[/\u0049/g, '\u137a'],
			[/\u004a/g, '\u137b'],
			[/\u004d/g, '\u1216'],
			[/\u0052/g, '\u1250'],
			[/\u0053/g, '\u1251'],
			[/\u0054/g, '\u1252'],
			[/\u0055/g, '\u1253'],
			[/\u0056/g, '\u1254'],
			[/\u0057/g, '\u1255'],
			[/\u0058/g, '\u1256'],
			[/\u0067/g, '\u120f'],
			[/\u0068/g, '\u121f'],
			[/\u0069/g, '\u122f'],
			[/\u006a/g, '\u1237'],
			[/\u006b/g, '\u123f'],
			[/\u006c/g, '\u1267'],
			[/\u006d/g, '\u1277'],
			[/\u006e/g, '\u127f'],
			[/\u006f/g, '\u1297'],
			[/\u0070/g, '\u129f'],
			[/\u0071/g, '\u12a7'],
			[/\u0072/g, '\u12df'],
			[/\u0073/g, '\u12e7'],
			[/\u0074/g, '\u12f7'],
			[/\u0075/g, '\u1327'],
			[/\u0076/g, '\u132f'],
			[/\u0077/g, '\u133f'],
			[/\u0078/g, '\u134f'],
			[/\u20ac/g, '\u12b8'],
			[/\u0081/g, '\u12b9'],
			[/\u201a/g, '\u12ba'],
			[/\u0192/g, '\u12bb'],
			[/\u201e/g, '\u12bc'],
			[/\u2026/g, '\u12bd'],
			[/\u2020/g, '\u12be'],
			[/\u2021/g, '\u12e0'],
			[/\u02c6/g, '\u12e1'],
			[/\u2030/g, '\u12e2'],
			[/\u0160/g, '\u12e3'],
			[/\u2039/g, '\u12e4'],
			[/\u0152/g, '\u12e5'],
			[/\u008d/g, '\u12e6'],
			[/\u017d/g, '\u12f8'],
			[/\u008f/g, '\u12f9'],
			[/\u0090/g, '\u12fa'],
			[/\u2018/g, '\u12fb'],
			[/\u2019/g, '\u12fc'],
			[/\u201c/g, '\u12fd'],
			[/\u201d/g, '\u12fe'],
			[/\u2022/g, '\u12b0'],
			[/\u2013/g, '\u12b5'],
			[/\u2014/g, '\u12b2'],
			[/\u02dc/g, '\u12b3'],
			[/\u2122/g, '\u12b4'],
			[/\u0161/g, '\u1310'],
			[/\u203a/g, '\u1315'],
			[/\u0153/g, '\u1312'],
			[/\u009d/g, '\u1313'],
			[/\u017e/g, '\u1314'],
			[/\u0178/g, '\u1248'],
			[/\u00a0/g, '\u124d'],
			[/\u00a1/g, '\u124a'],
			[/\u00a2/g, '\u124b'],
			[/\u00a3/g, '\u124c'],
			[/\u00a4/g, '\u1258'],
			[/\u00a5/g, '\u125d'],
			[/\u00a6/g, '\u125a'],
			[/\u00a7/g, '\u125b'],
			[/\u00a8/g, '\u125c'],
			[/\u00a9/g, '\u1288'],
			[/\u00aa/g, '\u128d'],
			[/\u00ab/g, '\u128a'],
			[/\u00ac/g, '\u128b'],
			[/\u00ad/g, '\u128c'],
			[/\u00ae/g, '\u1338'],
			[/\u00af/g, '\u1339'],
			[/\u00b0/g, '\u133a'],
			[/\u00b1/g, '\u133b'],
			[/\u00b2/g, '\u133c'],
			[/\u00b3/g, '\u133d'],
			[/\u00b4/g, '\u133e'],
			[/\u00b5/g, '\u1330'],
			[/\u00b6/g, '\u1331'],
			[/\u00b7/g, '\u1332'],
			[/\u00b8/g, '\u1333'],
			[/\u00b9/g, '\u1334'],
			[/\u00ba/g, '\u1335'],
			[/\u00bb/g, '\u1336'],
			[/\u00be/g, '\u1220'],
			[/\u00bf/g, '\u1221'],
			[/\u00c0/g, '\u1222'],
			[/\u00c1/g, '\u1223'],
			[/\u00c2/g, '\u1224'],
			[/\u00c3/g, '\u1225'],
			[/\u00c4/g, '\u1226'],
			[/\u00c5/g, '\u1216'],
			[/\u00c8/g, '\u12d0'],
			[/\u00c9/g, '\u12d1'],
			[/\u00ca/g, '\u12d2'],
			[/\u00cb/g, '\u12d3'],
			[/\u00cc/g, '\u12d4'],
			[/\u00cd/g, '\u12d5'],
			[/\u00ce/g, '\u12d6'],
			[/\u00d2/g, '\u1268'],
			[/\u00d3/g, '\u1269'],
			[/\u00d4/g, '\u126a'],
			[/\u00d5/g, '\u126b'],
			[/\u00d6/g, '\u126c'],
			[/\u00d7/g, '\u126d'],
			[/\u00d8/g, '\u126e'],
			[/\u00d9/g, '\u1280'],
			[/\u00da/g, '\u1281'],
			[/\u00db/g, '\u1282'],
			[/\u00dc/g, '\u1283'],
			[/\u00dd/g, '\u1284'],
			[/\u00de/g, '\u1285'],
			[/\u00df/g, '\u1286'],
			[/\u00e0/g, '\u1216'],
			[/\u00e1/g, '\u125a']
		],
		addisTwoMappingsExtra: [
			[/[\u0020-\u002f\u0040\u004b\u004c\u004e-\u0051\u0059-\u0066\u007a-\u007f\u00bc\u00bd\u00c6\u00c7\u00cf-\u00d1\u00e2-\u00ff]/g, '\ufffe']
		],
		addisProTwoMappingsExtra: [
			[/\u0059/g, '\u1291'],
			[/\u0079/g, '\u12ad'],
			[/\u007b/g, '\u1293'],
			[/\u007c/g, '\u1294'],
			[/\u007d/g, '\u1295'],
			[/\u007e/g, '\u127e'],
			[/\u007f/g, '\u12ad'],
			[/[\u0020-\u002f\u0040\u004b\u004c\u004e-\u0051\u005a-\u0066\u007a\u00bc\u00bd\u00c6\u00c7\u00cf-\u00d1\u00e2-\u00ff]/g, '\ufffe']
		]
	}
});

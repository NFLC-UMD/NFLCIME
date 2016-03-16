/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.bengali.bengali.sutonny
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.bengali.bengali.sutonny',
		type: 'encoding converter',
		inheritance: ['cvt'],
		lang: 'bn',
		mappings: [
			//--- convert letters from hack-encoding to Unicode
			[/\u0024/g, '\u09F3'],
			[/\u0026/g, '\u09CD\u200C'],
			[/\u0030/g, '\u09E6'],
			[/\u0031/g, '\u09E7'],
			[/\u0032/g, '\u09E8'],
			[/\u0033/g, '\u09E9'],
			[/\u0034/g, '\u09EA'],
			[/\u0035/g, '\u09EB'],
			[/\u0036/g, '\u09EC'],
			[/\u0037/g, '\u09ED'],
			[/\u0038/g, '\u09EE'],
			[/\u0039/g, '\u09EF'],
			[/\u0041/g, '\u0985'],
			[/\u0042/g, '\u0987'],
			[/\u0043/g, '\u0988'],
			[/\u0044/g, '\u0989'],
			[/\u0045/g, '\u098A'],
			[/\u0046/g, '\u098B'],
			[/\u0047/g, '\u098F'],
			[/\u0048/g, '\u0990'],
			[/\u0049/g, '\u0993'],
			[/\u004A/g, '\u0994'],
			[/\u004B/g, '\u0995'],
			[/\u004C/g, '\u0996'],
			[/\u004D/g, '\u0997'],
			[/\u004E/g, '\u0998'],
			[/\u004F/g, '\u0999'],
			[/\u0050/g, '\u099A'],
			[/\u0051/g, '\u099B'],
			[/\u0052/g, '\u099C'],
			[/\u0053/g, '\u099D'],
			[/\u0054/g, '\u099E'],
			[/\u0055/g, '\u099F'],
			[/\u0056/g, '\u09A0'],
			[/\u0057/g, '\u09A1'],
			[/\u0058/g, '\u09A2'],
			[/\u0059/g, '\u09A3'],
			[/\u005A/g, '\u09A4'],
			[/\u005C/g, '\u0965'],
			[/\u005E/g, '\u09AC'],
			[/\u005F/g, '\u09A5'],
			[/\u0060/g, '\u09A6'],
			[/\u0061/g, '\u09A7'],
			[/\u0062/g, '\u09A8'],
			[/\u0063/g, '\u09AA'],
			[/\u0064/g, '\u09AB'],
			[/\u0065/g, '\u09AC'],
			[/\u0066/g, '\u09AD'],
			[/\u0067/g, '\u09AE'],
			[/\u0068/g, '\u09AF'],
			[/\u0069/g, '\u09B0'],
			[/\u006A/g, '\u09B2'],
			[/\u006B/g, '\u09B6'],
			[/\u006C/g, '\u09B7'],
			[/\u006D/g, '\u09B8'],
			[/\u006E/g, '\u09B9'],
			[/\u006F/g, '\u09DC'],
			[/\u0070/g, '\u09DD'],
			[/\u0071/g, '\u09DF'],
			[/\u0072/g, '\u09A4\u09CD\u200D'],
			[/\u0073/g, '\u0982'],
			[/\u0074/g, '\u0983'],
			[/\u0075/g, '\u0981'],
			[/\u0076/g, '\u09BE'],
			[/\u0077/g, '\u09BF'],
			[/\u0078/g, '\u09C0'],
			[/\u0079/g, '\u09C1'],
			[/\u007A/g, '\u09C1'],
			[/\u007E/g, '\u09C2'],
			[/\u00A0/g, '\u09DC'],
			[/\u00A1/g, '\u09CD\u09AC'],
			[/\u00A2/g, '\u09CD\u09AD'],
			[/\u00A3/g, '\u09CD\u09AD\u09CD\u09B0'],
			[/\u00A4/g, '\u09AE\u09CD'],
			[/\u00A5/g, '\u09CD\u09AE'],
			[/\u00A6/g, '\u09CD\u09AC'],
			[/\u00A7/g, '\u09AE'],
			[/\u00A8/g, '\u09CD\u09AF'],
			[/\u00AA/g, '\u09CD\u09B0'],
			[/\u00AB/g, '\u09CD\u09B0'],
			[/\u00AC/g, '\u09CD\u09B2'],
			[/\u00AD/g, '\u09CD\u09B2'],
			[/\u00AE/g, '\u09B7\u09CD'],
			[/\u00AF/g, '\u09B8\u09CD'],
			[/\u00B0/g, '\u0995\u09CD\u0995'],
			[/\u00B1/g, '\u0995\u09CD\u099F'],
			[/\u00B2/g, '\u0995\u09CD\u09AE'],
			[/\u00B3/g, '\u0995\u09CD\u09A4'],
			[/\u00B4/g, '\u0995\u09CD\u09AE'],
			[/\u00B5/g, '\u0995\u09CD\u09B0'],
			[/\u00B6/g, '\u0995\u09CD\u09B7'],
			[/\u00B7/g, '\u0995\u09CD\u09B8'],
			[/\u00B8/g, '\u0997\u09C1'],
			[/\u00B9/g, '\u0997\u09CD\u0997'],
			[/\u00BA/g, '\u0997\u09CD\u09A6'],
			[/\u00BB/g, '\u0997\u09CD\u09A7'],
			[/\u00BC/g, '\u0999\u09CD\u0995'],
			[/\u00BD/g, '\u0999\u09CD\u0997'],
			[/\u00BE/g, '\u099C\u09CD\u099C'],
			[/\u00BF/g, '\u09CD\u09A4\u09CD\u09B0'],
			[/\u00C0/g, '\u099C\u09CD\u099D'],
			[/\u00C1/g, '\u099C\u09CD\u099E'],
			[/\u00C2/g, '\u099E\u09CD\u099A'],
			[/\u00C3/g, '\u099E\u09CD\u099B'],
			[/\u00C4/g, '\u099E\u09CD\u099C'],
			[/\u00C5/g, '\u099E\u09CD\u099D'],
			[/\u00C6/g, '\u099F\u09CD\u099F'],
			[/\u00C7/g, '\u09DC\u09CD\u09DC'],
			[/\u00C8/g, '\u09A8\u09CD\u099F'],
			[/\u00C9/g, '\u09A3\u09CD\u09A0'],
			[/\u00CA/g, '\u09A3\u09CD\u09A1'],
			[/\u00CB/g, '\u09A4\u09CD\u09A4'],
			[/\u00CC/g, '\u09A4\u09CD\u09A5'],
			[/\u00CD/g, '\u09A4'],
			[/\u00CE/g, '\u09A4\u09CD\u09B0'],
			[/\u00CF/g, '\u09A6\u09CD\u09A6'],
			[/\u00D6/g, '\u09CD\u09B0'],
			[/\u00D7/g, '\u09A6\u09CD\u09A7'],
			[/\u00D8/g, '\u09A6\u09CD\u09AC'],
			[/\u00D9/g, '\u09A6\u09CD\u09AE'],
			[/\u00DA/g, '\u09A8\u09CD\u09A0'],
			[/\u00DB/g, '\u09A8\u09CD\u09A1'],
			[/\u00DC/g, '\u09A8\u09CD\u09A7'],
			[/\u00DD/g, '\u09A8\u09CD\u09B8'],
			[/\u00DE/g, '\u09AA\u09CD\u099F'],
			[/\u00DF/g, '\u09AA\u09CD\u09A4'],
			[/\u00E0/g, '\u09AA\u09CD\u09AA'],
			[/\u00E1/g, '\u09AA\u09CD\u09B8'],
			[/\u00E2/g, '\u09AC\u09CD\u099C'],
			[/\u00E3/g, '\u09AC\u09CD\u09A6'],
			[/\u00E4/g, '\u09AC\u09CD\u09A7'],
			[/\u00E5/g, '\u09AD\u09CD\u09B0'],
			[/\u00E6/g, '\u09C1'],
			[/\u00E7/g, '\u09AE\u09CD\u09AB'],
			[/\u00E8/g, '\u09CD\u09A3'],
			[/\u00E9/g, '\u09B2\u09CD\u0995'],
			[/\u00EA/g, '\u09B2\u09CD\u0997'],
			[/\u00EB/g, '\u09B2\u09CD\u099F'],
			[/\u00EC/g, '\u09B2\u09CD\u09DC'],
			[/\u00ED/g, '\u09B2\u09CD\u09AA'],
			[/\u00EE/g, '\u09B2\u09CD\u09AB'],
			[/\u00EF/g, '\u09B6\u09C1'],
			[/\u00F0/g, '\u09B6\u09CD\u099A'],
			[/\u00F1/g, '\u09B6\u09CD\u099B'],
			[/\u00F2/g, '\u09B7\u09CD\u09A3'],
			[/\u00F3/g, '\u09B7\u09CD\u099F'],
			[/\u00F4/g, '\u09B7\u09CD\u09A0'],
			[/\u00F5/g, '\u09B7\u09CD\u09AB'],
			[/\u00F6/g, '\u09B8\u09CD\u0996'],
			[/\u00F7/g, '\u09B8\u09CD\u099F'],
			[/\u00F8/g, '\u09CD\u09B2'],
			[/\u00F9/g, '\u09B8\u09CD\u09AB'],
			[/\u00FA/g, '\u09CD\u09AA'],
			[/\u00FB/g, '\u09B9\u09C1'],
			[/\u00FC/g, '\u09B9\u09C3'],
			[/\u00FD/g, '\u09B9\u09CD\u09A8'],
			[/\u00FE/g, '\u09B9\u09CD\u09AE'],
			[/\u00FF/g, '\u0995\u09CD\u09B7'],
			[/\u0152/g, '\u09CD\u0995\u09CD\u09B0'],
			[/\u0153/g, '\u09CD\u09A8'],
			[/\u0160/g, '\u09D7'],
			[/\u0161/g, '\u09A8\u09CD'],
			[/\u0178/g, '\u09CD\u09AC'],
			[/\u0192/g, '\u09C2'],
			[/\u02C6/g, '\u09C8'],
			[/\u02C9/g, '\u09B8\u09CD'],
			[/\u02DC/g, '\u09A6\u09CD'],
			[/\u03BC/g, '\u0995\u09CD\u09B0'],
			[/\u2010/g, '\u2013'],
			[/\u2013/g, '\u09C1'],
			[/\u2014/g, '\u09CD\u09A4'],
			[/\u2018/g, '\u09CD\u09A4\u09CD\u09A4'],
			[/\u2019/g, '\u09CD\u09A5'],
			[/\u201A/g, '\u09C2'],
			[/\u201C/g, '\u09A4\u09CD'],
			[/\u201D/g, '\u099A\u09CD'],
			[/\u201E/g, '\u09C3'],
			[/\u2020/g, '\u09C7'],
			[/\u2021/g, '\u09C7'],
			[/\u2022/g, '\u0999\u09CD'],
			[/\u2026/g, '\u09C3'],
			[/\u2030/g, '\u09C8'],
			[/\u2039/g, '\u09CD\u0995'],
			[/\u203A/g, '\u09A8\u09CD'],
			[/\u2122/g, '\u09A6\u09CD'],
			[/\u2212/g, '\u09CD\u09B2'],
			[/\u2219/g, '\u0995\u09CD\u09B8'],
			//--- convert punctuation marks
			[/\u007C/g, '\u0964'],
			[/\u00D0/g, '\u2013'],
			[/\u00D1/g, '\u2014'],
			[/\u00D2/g, '\u201C'],
			[/\u00D3/g, '\u201D'],
			[/\u00D4/g, '\u2018'],
			[/\u00D5/g, '\u2019'],
			//--- move Ra sign to beginning of cluster
			[/(([\u0995-\u09B9\u09DC-\u09DF]\u0981?\u09CD)*[\u0995-\u09B9\u09DC-\u09DF][\u09BE\u09C0-\u09C4\u09D7]?)\u00A9/g, '\u09B0\u09CD$1'],
			//--- merge two vocalic L to vocalic LL
			[/\u09C3\u09C3/g, '\u09C4'],
			//--- remove extra Hasants
			[/\u09CD{2,}/g, '\u09CD'],
			//--- merge letter A with AA sign to letter AA
			[/\u0985\u09BE/g, '\u0986'],
			//--- move left-side-vowel to the back of cluster
			[/([\u09BF\u09C7\u09C8])([\u0995-\u09B9\u09DC-\u09DF][\u09BC]?)((\u09CD[\u0995-\u09B9\u09DC-\u09DF][\u09BC\u0981]?)*)([\u0981])?/g, '$2$3$1$5'],
			//--- move Candrabindu to back of cluster
			[/([\u0981])([\u09BE-\u09C4])/g, '$2$1'],
			//--- merge e signs with right sign stems
			[/\u09C7(\u0981)?\u09BE/g, '\u09CB$1'],
			[/\u09C7(\u0981)?\u09D7/g, '\u09CC$1'],
			//--- move vowel-sign to the back of cluster
			[/([\u09C1-\u09C4])((\u09CD[\u0995-\u09B9\u09DC-\u09DF])+)/g, '$2$1'],
			//--- replace visarga meant as a colon
			[/(\s)\u0983/g, '$1:']
		]
	}
});

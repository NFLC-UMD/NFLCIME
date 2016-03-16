NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cvt.bengali.bengali.boishakhi',
	type:'encoding converter',
	inheritance:['cvt'],
	lang:'bn',
	mappings:[
	//--- convert letters from hack-encoding to Unicode
	[/\u0023/g, '\u09D7'],
	[/\u0024/g, '\u09F3'],
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
	[/\u005C/g, '\u09F1'],
	[/\u005E/g, '\u0981'],
	[/\u0061/g, '\u09A5'],
	[/\u0062/g, '\u09A6'],
	[/\u0063/g, '\u09A7'],
	[/\u0064/g, '\u09A8'],
	[/\u0065/g, '\u09AA'],
	[/\u0066/g, '\u09AB'],
	[/\u0067/g, '\u09AC'],
	[/\u0068/g, '\u09AD'],
	[/\u0069/g, '\u09AE'],
	[/\u006A/g, '\u09AF'],
	[/\u006B/g, '\u09B0'],
	[/\u006C/g, '\u09B2'],
	[/\u006D/g, '\u09B6'],
	[/\u006E/g, '\u09B7'],
	[/\u006F/g, '\u09B8'],
	[/\u0070/g, '\u09B9'],
	[/\u0071/g, '\u0995\u09CD\u09B7'],
	[/\u0072/g, '\u09DC'],
	[/\u0073/g, '\u09DD'],
	[/\u0074/g, '\u09DF'],
	[/\u0075/g, '\u09A4\u09CD\u200D'],
	[/\u0076/g, '\u0982'],
	[/\u0077/g, '\u09BE'],
	[/\u0078/g, '\u09BF'],
	[/\u0079/g, '\u09C0'],
	[/\u007A/g, '\u09CD\u200C'],
	[/\u007E/g, '\u0995\u09CD\u0995'],
	[/\u00A1/g, '\u09A8\u09CD\u09A1'],
	[/\u00A2/g, '\u09A4\u09CD\u09B0'],
	[/\u00A3/g, '\u09A4\u09CD\u09A4'],
	[/\u00A4/g, '\u09A4\u09CD\u09A5'],
	[/\u00A5/g, '\u09A6\u09CD\u09A6'],
	[/\u00A6/g, '\u09A6\u09CD\u09A7'],
	[/\u00A7/g, '\u09A6\u09CD\u09AC'],
	[/\u00A8/g, '\u09A6\u09CD\u09AD'],
	[/\u00A9/g, '\u09A6\u09CD\u09B0'],
	[/\u00AA/g, '\u09A8\u09CD\u09A0'],
	[/\u00AB/g, '\u09A8\u09CD\u09A1'],
	[/\u00AC/g, '\u09A8\u09CD\u09A7'],
	[/\u00AE/g, '\u09AA\u09CD\u09A4'],
	[/\u00AF/g, '\u09AA\u09CD\u09AA'],
	[/\u00B0/g, '\u09AB\u09CD\u09B0'],
	[/\u00B1/g, '\u09AC\u09CD\u099C'],
	[/\u00B2/g, '\u09AC\u09CD\u09A6'],
	[/\u00B3/g, '\u09AC\u09CD\u09A7'],
	[/\u00B4/g, '\u09F0'],
	[/\u00B5/g, '\u09CD\u09AC'],
	[/\u00B6/g, '\u09A6\u09CD\u09A7\u09CD\u09AC'],
	[/\u00B8/g, '\u09AC\u09CD\u09B0'],
	[/\u00B9/g, '\u09AE\u09CD\u09AC'],
	[/\u00BA/g, '\u09AE\u09CD\u09AD'],
	[/\u00BB/g, '\u09AE\u09CD\u09AD\u09CD\u09B0'],
	[/\u00BF/g, '\u09B2\u09CD\u0995'],
	[/\u00C0/g, '\u09B2\u09CD\u09A1'],
	[/\u00C1/g, '\u09B2\u09CD\u09B2'],
	[/\u00C2/g, '\u09B6\u09C1'],
	[/\u00C3/g, '\u09B6\u09CD\u09A4'],
	[/\u00C4/g, '\u09B7\u09CD\u099F'],
	[/\u00C5/g, '\u09B7\u09CD\u09A0'],
	[/\u00C6/g, '\u09B8\u09CD\u0995'],
	[/\u00C7/g, '\u09B8\u09CD\u0995\u09CD\u09B0'],
	[/\u00C8/g, '\u09B8\u09CD\u09AC'],
	[/\u00C9/g, '\u09B9\u09C1'],
	[/\u00CA/g, '\u09B9\u09CD\u09AE'],
	[/\u00CB/g, '\u09C7'],
	[/\u00CC/g, '\u09C7'],
	[/\u00CC/g, '\u09C7'],
	[/\u00D0/g, '\u09C8'],
	[/\u00D1/g, '\u09C8'],
	[/\u00D2/g, '\u09A8\u09CD\u09A8'],
	[/\u00D3/g, '\u09C2'],
	[/\u00D4/g, '\u09C2'],
	[/\u00D5/g, '\u09C2'],
	[/\u00D6/g, '\u09C1'],
	[/\u00D7/g, '\u09C1'],
	[/\u00D8/g, '\u09C1'],
	[/\u00D9/g, '\u09C3'],
	[/\u00DA/g, '\u09C3'],
	[/\u00DB/g, '\u09CD\u09B0'],
	[/\u00DC/g, '\u09CD\u09B0'],
	[/\u00DD/g, '\u09CD\u09B0'],
	[/\u00DE/g, '\u09CD\u09B0'],
	[/\u00DF/g, '\u09CD\u09A3'],
	[/\u00E0/g, '\u0997\u09CD'],
	[/\u00E1/g, '\u0999\u09CD'],
	[/\u00E2/g, '\u099A\u09CD'],
	[/\u00E3/g, '\u099E\u09CD\u099D'],
	[/\u00E4/g, '\u09CD\u09A3'],
	[/\u00E5/g, '\u09A3\u09CD'],
	[/\u00E6/g, '\u09CD\u09A4'],
	[/\u00E7/g, '\u09CD\u09A4\u09C1'],
	[/\u00E8/g, '\u09CD\u09A4\u09CD\u09B0'],
	[/\u00E9/g, '\u099E\u09CD\u099A'],
	[/\u00EB/g, '\u09A8\u09CD'],
	[/\u00EC/g, '\u09A8\u09CD'],
	[/\u00ED/g, '\u09CD\u09A8'],
	[/\u00EE/g, '\u09A8\u09CD'],
	[/\u00EF/g, '\u09A9\u09CD'],
	[/\u00F0/g, '\u09CD\u09AC'],
	[/\u00F1/g, '\u09CD\u09AC'],
	[/\u00F2/g, '\u09CD\u09AC'],
	[/\u00F3/g, '\u09AE\u09CD'],
	[/\u00F4/g, '\u09CD\u09AE'],
	[/\u00F5/g, '\u09CD\u09B2'],
	[/\u00F6/g, '\u09CD\u09B2'],
	[/\u00F7/g, '\u0997\u09C1'],
	[/\u00F8/g, '\u09CD\u09AF'],
	[/\u00F9/g, '\u09B2\u09CD'],
	[/\u00FA/g, '\u09B6\u09CD'],
	[/\u00FB/g, '\u09B7\u09CD'],
	[/\u00FC/g, '\u09B7\u09CD'],
	[/\u00FD/g, '\u09B8\u09CD'],
	[/\u00FE/g, '\u09B8\u09CD'],
	[/\u00FF/g, '\u09CD\u0996'],
	[/\u0152/g, '\u099C\u09CD\u099C'],
	[/\u0153/g, '\u09DC\u09CD\u09DC'],
	[/\u0160/g, '\u0999\u09CD\u0997'],
	[/\u0161/g, '\u099C\u09CD\u099E'],
	[/\u0178/g, '\u09A3\u09CD\u09A0'],
	[/\u0192/g, '\u0995\u09CD\u099F'],
	[/\u02C6/g, '\u0997\u09CD\u09A7'],
	[/\u02DC/g, '\u099E\u09CD\u099B'],
	[/\u2014/g, '\u099E\u09CD\u099A'],
	[/\u201A/g, ','],
	[/\u201E/g, '\u0964'],
	[/\u2020/g, '\u0997\u09C1'],
	[/\u2021/g, '\u0997\u09CD\u0997'],
	[/\u2022/g, '\u099E\u09CD\u099C'],
	[/\u2026/g, '\u0995\u09CD\u09B8'],
	[/\u2030/g, '\u0999\u09CD\u0995'],
	[/\u2039/g, '\u09DC\u09CD\u0997'],
	[/\u203A/g, '\u099F\u09CD\u099F'],
	[/\u20AC/g, '\u0965'],
	[/\u20C6/g, '\u09C8'],
	[/\u2122/g, '\u099E\u09CD\u099C'],
	[/\uE56B/g, '\u0950'],
	[/\uE57D/g, '\u0986\u09A3\u09AA\u09A8'],
	[/\uE57E/g, '(\u0995\u09BF\u09AA\u0983)'],
	[/\uE57F/g, '(\u09C7\u099F\u09CD\u09B0\u09A1\u0983)'],
	[/\uE580/g, '(\u09E7)'],
	[/\uE581/g, '(\u09E8)'],
	[/\uE582/g, '(\u09E9)'],
	[/\uE583/g, '(\u09EA)'],
	[/\uE584/g, '(\u09EB)'],
	[/\uE585/g, '(\u09EC)'],
	[/\uE586/g, '(\u09ED)'],
	[/\uE587/g, '(\u09EE)'],
	[/\uE588/g, '(\u09EF)'],
	[/\uE589/g, '(\u0995)'],
	[/\uE58A/g, '(\u0996)'],
	[/\uE58B/g, '(\u0997)'],
	[/\uE58C/g, '(\u0998)'],
	[/\uE58D/g, '(\u0999)'],
	[/\uE58E/g, '(\u099A)'],
	[/\uE58F/g, '(\u099B)'],
	[/\uE590/g, '(\u099C)'],
	[/\uE591/g, '(\u099D)'],
	[/\uE592/g, '(\u099E)'],
	//--- put "feather cap" on vowel signs
	[/\u09BE\u00CE/g, '\u09D7'],
	[/\u09C7\u00CE/g, '\u09D7'],
	//--- convert fractions
	[/\u00BC/g, '\u09E7/\u09EA'],
	[/\u00BD/g, '\u09E7/\u09E8'],
	[/\u00BE/g, '\u09E9/\u09EA'],
	//--- convert punctuation marks
	[/\u007C/g, '\u0964'],
	//--- move Ra sign to beginning of cluster
	[/(([\u0995-\u09B9\u09DC-\u09DF]\u0981?\u09CD)*[\u0995-\u09B9\u09DC-\u09DF][\u09BE\u09C0-\u09C4\u09D7]?)\u00EA/g, '\u09B0\u09CD$1'],
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
	//--- change incorrect Ta Ra Nna segquences to Ka Ra
	[/\u09A4\u09CD\u09B0\u09CD\u09A3/g, '\u0995\u09CD\u09B0'],
	//--- change incorrect Ta Ta Nna segquences to Ka Ta
	[/\u09A4\u09CD\u09A4\u09CD\u09A3/g, '\u0995\u09CD\u09A4'],
	//--- replace visarga meant as a colon
	[/(\s)\u0983/g, '$1:']
	]
}
} );
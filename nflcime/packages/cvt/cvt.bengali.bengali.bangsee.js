NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cvt.bengali.bengali.bangsee',
	type:'encoding converter',
	inheritance:['cvt'],
	lang:'bn',
	mappings:[
	//--- convert conjuncts from hack-encoding to Unicode
	[/\u0A02/g, '\u0965'],
	[/\u0A05/g, '\u09A4\u09CD\u200D'],
	[/\u0A06/g, '\u0995\u09CD\u0995'],
	[/\u0A07/g, '\u0995\u09CD\u099F'],
	[/\u0A08/g, '\u0995\u09CD\u09B8'],
	[/\u0A09/g, '\u0995\u09CD\u09B7'],
	[/\u0A0A/g, '\u0997\u09C1'],
	[/\u0A0F/g, '\u0997\u09CD\u0997'],
	[/\u0A10/g, '\u0997\u09CD\u09A7'],
	[/\u0A13/g, '\u0999\u09CD\u0995'],
	[/\u0A14/g, '\u0999\u09CD\u0997'],
	[/\u0A15/g, '\u099C\u09CD\u099C'],
	[/\u0A16/g, '\u099C\u09CD\u099D'],
	[/\u0A17/g, '\u099E\u09CD\u099A'],
	[/\u0A18/g, '\u099E\u09CD\u099B'],
	[/\u0A19/g, '\u099E\u09CD\u099C'],
	[/\u0A1A/g, '\u099E\u09CD\u099D'],
	[/\u0A1B/g, '\u099C\u09CD\u099E'],
	[/\u0A1C/g, '\u099F\u09CD\u099F'],
	[/\u0A1D/g, '\u09A1\u09CD\u09A1'],
	[/\u0A1E/g, '\u09A3\u09CD\u09A0'],
	[/\u0A1F/g, '\u09A3\u09CD\u09A1'],
	[/\u0A20/g, '\u09A4\u09CD\u09B0'],
	[/\u0A21/g, '\u09A4\u09CD\u09A4'],
	[/\u0A22/g, '\u09A4\u09CD\u09A5'],
	[/\u0A23/g, '\u09A6\u09CD\u09A6'],
	[/\u0A24/g, '\u09A6\u09CD\u09A7'],
	[/\u0A25/g, '\u09A6\u09CD\u09A7\u09CD\u09AC'],
	[/\u0A26/g, '\u09A6\u09CD\u09AC'],
	[/\u0A27/g, '\u09A6\u09CD\u09AD'],
	[/\u0A28/g, '\u09A6\u09CD\u09B0'],
	[/\u0A2A/g, '\u09A8\u09CD\u09A0'],
	[/\u0A2B/g, '\u09A8\u09CD\u09A1'],
	[/\u0A2C/g, '\u09A8\u09CD\u09A7'],
	[/\u0A2D/g, '\u09A8\u09CD\u09A8'],
	[/\u0A2E/g, '\u09AA\u09CD\u09A4'],
	[/\u0A2F/g, '\u09AA\u09CD\u09AA'],
	[/\u0A30/g, '\u09AB\u09CD\u09B0'],
	[/\u0A32/g, '\u09AC\u09CD\u099C'],
	[/\u0A33/g, '\u09AC\u09CD\u09A6'],
	[/\u0A35/g, '\u09AC\u09CD\u09A7'],
	[/\u0A36/g, '\u09CD\u09AC'],
	[/\u0A38/g, '\u09AD\u09CD\u09B0'],
	[/\u0A39/g, '\u09AE\u09CD\u09AC'],
	[/\u0A3C/g, '\u09AE\u09CD\u09AD'],
	[/\u0A3D/g, '\u09AE\u09CD\u09AD\u09CD\u09B0'],
	[/\u0A3E/g, '\u09AE\u09CD\u09AD'],
	[/\u0A3F/g, '\u09B2\u09CD\u0995'],
	[/\u0A40/g, '\u09B2\u09CD\u09A1'],
	[/\u0A41/g, '\u09B2\u09CD\u09B2'],
	[/\u0A42/g, '\u09B6\u09C1'],
	[/\u0A47/g, '\u09B6\u09CD\u09A4'],
	[/\u0A48/g, '\u09B7\u09CD\u099F'],
	[/\u0A4B/g, '\u09B7\u09CD\u09A0'],
	[/\u0A4C/g, '\u09B8\u09CD\u0995'],
	[/\u0A4D/g, '\u09B8\u09CD\u0995\u09CD\u09B0'],
	[/\u0A59/g, '\u09B8\u09CD\u09AC'],
	[/\u0A5A/g, '\u09A4\u09CD\u09A5'],
	[/\u0A5B/g, '\u09B9\u09CD\u09AE'],
	[/\u0A5C/g, '\u09DC\u09CD\u0997'],
	[/\u0A5E/g, '\u0997\u09CD'],
	[/\u0A66/g, '\u0999\u09CD'],
	[/\u0A67/g, '\u099A\u09CD'],
	[/\u0A68/g, '\u09CD\u09A3'],
	[/\u0A69/g, '\u09A3\u09CD'],
	[/\u0A6A/g, '\u09CD\u09A4'],
	[/\u0A6B/g, '\u09CD\u09A4\u09CD\u09A4'],
	[/\u0A6C/g, '\u09CD\u09A4\u09CD\u09B0'],
	[/\u0A6D/g, '\u09CD\u09A6'],
	[/\u0A6E/g, '\u09CD\u09A7'],
	[/\u0A6F/g, '\u09A8\u09CD'],
	[/\u0A70/g, '\u09A8\u09CD'],
	[/\u0A71/g, '\u09CD\u09A8'],
	[/\u0A72/g, '\u09CD\u09A8'],
	[/\u0A73/g, '\u09AA\u09CD'],
	[/\u0A74/g, '\u09CD\u09AC'],
	[/\u0A81/g, '\u09CD\u09AC'],
	[/\u0A82/g, '\u09CD\u09AC'],
	[/\u0A83/g, '\u09AE\u09CD'],
	[/\u0A85/g, '\u09CD\u09AE'],
	[/\u0A86/g, '\u09CD\u09B2'],
	[/\u0A87/g, '\u09CD\u09B2'],
	[/\u0A88/g, '\u09B2\u09CD'],
	[/\u0A89/g, '\u09B6\u09CD'],
	[/\u0A8A/g, '\u09B7\u09CD'],
	[/\u0A8B/g, '\u09B7\u09CD'],
	[/\u0A8D/g, '\u09B8\u09CD'],
	[/\u0A8F/g, '\u09B8\u09CD'],
	[/\u0A90/g, '\u09CD\u09A5'],
	[/\u0A93/g, '\u09C1'],
	[/\u0A94/g, '\u09C1'],
	[/\u0A95/g, '\u09C2'],
	[/\u0A96/g, '\u09C2'],
	[/\u0A98/g, '\u09CD\u09AF'],
	[/\u0A99/g, '\u09CD\u09A3'],
	[/\u0A9A/g, '\u09CD\u09B0'],
	[/\u0A9B/g, '\u09CD\u09B0'],
	[/\u0A9C/g, '\u09CD\u09B0'],
	[/\u0A9D/g, '\u09CD\u09B0'],
	//--- convert punctuations
	[/\u09E0/g, '\u00F7'],
	[/\u09E1/g, '\u00D7'],
	[/\u09F2/g, '!'],
	[/\u09F3/g, '\u09F3'],
	[/\u09F4/g, ','],
	[/\u09F5/g, ';'],
	[/\u09F6/g, '?'],
	[/\u09F7/g, '\u0964'],
	[/\u09F8/g, '\u2018'],
	[/\u09F9/g, '\u2019'],
	[/\u09FA/g, '@'],
	//--- convert fractions
	[/\u0A9E/g, '\u09E7/\u09EA'],
	[/\u0A9F/g, '\u09E7/\u09E8'],
	[/\u0AA0/g, '\u09E9/\u09EA'],
	//--- move Ra sign to beginning of cluster
	[/(([\u0995-\u09B9\u09DC-\u09DF]\u0981?\u09CD)*[\u0995-\u09B9\u09DC-\u09DF][\u09BE\u09C0-\u09C4\u09D7]?)\u0A97/g, '\u09B0\u09CD$1'],
	//--- merge two vocalic L to vocalic LL
	[/\u09C3\u09C3/g, '\u09C4'],
	//--- remove extra Hasants
	[/\u09CD{2,}/g, '\u09CD'],
	//--- merge letter A with AA sign to letter AA
	[/\u0985\u09BE/g, '\u0986'],
	//--- move left-side-vowel to the back of cluster
	[/([\u09BF\u09C7\u09C8\u09CB\u09CC])([\u0995-\u09B9\u09DC-\u09DF][\u09BC]?)((\u09CD[\u0995-\u09B9\u09DC-\u09DF][\u09BC\u0981]?)*)([\u0981])?/g, '$2$3$1$5'],
	//--- move Candrabindu to back of cluster
	[/([\u0981])([\u09BE-\u09C4])/g, '$2$1'],
	//--- merge e signs with right sign stems
	[/\u09CC/g, '\u09C8'],
	[/[\u09C7\u09CB](\u0981)?\u09BE/g, '\u09CB$1'],
	[/[\u09C7\u09CB](\u0981)?\u09D7/g, '\u09CC$1'],
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
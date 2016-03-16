/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.devanagari.hindi.naidunia
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.devanagari.hindi.naidunia',
		type: 'encoding converter',
		inheritance: ['cvt'],
		lang: 'hi',
		mappings: [
			[/\u0016/g, '\u093e'],
			[/\u0018/g, '\u0914'],
			[/\u0019/g, '\u0949'],
			[/\u0022/g, '\u0927'],
			[/\u0026/g, '\u0903'],
			[/\u003a/g, '\u0925'],
			[/\u003b/g, '\u0924'],
			[/\u003d/g, '\u0926'],
			[/\u003e/g, '\u0964'],
			[/\u0040/g, '\u091e'],
			[/\u0041/g, '\u091b'],
			[/\u0042/g, '\u0933'],
			[/\u0043/g, '\u092d'],
			[/\u0044/g, '\u0918'],
			[/\u0045/g, '\u0919'],
			[/\u0046/g, '\u0916'],
			[/\u0047/g, '\u0915\u094d\u0937'],
			[/\u004a/g, '\u0935'],
			[/\u004b/g, '\u0923'],
			[/\u004d/g, '\u0937'],
			[/\u004e/g, '\u0936'],
			[/\u0051/g, '\u090a'],
			[/\u0052/g, '\u0907'],
			[/\u0053/g, '\u091d'],
			[/\u0054/g, '\u094d'],
			[/\u0055/g, ''],
			[/\u0056/g, '\u092b'],
			[/\u0057/g, '\u0909'],
			[/\u0058/g, '\u0920'],
			[/\u0059/g, '\u090f'],
			[/\u005a/g, '\u0922'],
			[/\u005b/g, '\u0930'],
			[/\u005d/g, '\u0943'],
			[/\u0060/g, '\u0950'],
			[/\u0061/g, '\u091a'],
			[/\u0062/g, '\u092e'],
			[/\u0063/g, '\u092c'],
			[/\u0064/g, '\u0917'],
			[/\u0065/g, '\u0940'],
			[/\u0065/g, '\u0940'],
			[/\u0066/g, '\u0915'],
			[/\u0067/g, '\u092f'],
			[/\u0068/g, '\u0930'],
			[/\u0069/g, '\u0948'],
			[/\u006a/g, '\u090c'],
			[/\u006b/g, '\u0902'],
			[/\u006c/g, '\u0928'],
			[/\u006d/g, '\u0938'],
			[/\u006e/g, '\u0939'],
			[/\u0070/g, '\u0945'],
			[/\u0071/g, '\u0942'],
			[/\u0072/g, '\u093f'],
			[/\u0073/g, '\u091c'],
			[/\u0074/g, '\u093e'],
			[/\u0075/g, '\u0947'],
			[/\u0076/g, '\u092a'],
			[/\u0077/g, '\u0941'],
			[/\u0078/g, '\u091f'],
			[/\u0079/g, '\u0905'],
			[/\u007a/g, '\u0921'],
			[/\u007b/g, '\u0930'],
			[/\u007d/g, '\u090b'],
			[/\u007e/g, '\u093d'],
			[/\u00a1/g, '\u0941'],
			[/\u00a2/g, '\u0915\u094d'],
			[/\u00a3/g, '\u0939\u094d\u0935'],
			[/\u00a4/g, '\u091e\u094d'],
			[/\u00a5/g, '\u0941'],
			[/\u00a7/g, '\u0916\u094d\u0930'],
			[/\u00a9/g, '\u092f\u094d'],
			[/\u00aa/g, '\u0928\u094d\u0928'],
			[/\u00ab/g, '\u0926\u094d\u092e'],
			[/\u00ac/g, '\u0915\u094d'],
			[/\u00af/g, '\u0938\u094d\u0924\u094d\u0930\u094d'],
			[/\u00b0/g, '\u0926\u094d\u0927'],
			[/\u00b1/g, '\u0944'],
			[/\u00b2/g, '\u0937\u094d\u091f'],
			[/\u00b3/g, '\u0937\u094d\u0920'],
			[/\u00b4/g, '\u0936\u094d\u091a\u094d'],
			[/\u00b5/g, '\u0915'],
			[/\u00b6/g, '\u0936\u094d\u0930'],
			[/\u00b7/g, '\u0901'],
			[/\u00b8/g, '\u0917'],
			[/\u00b9/g, '\u092a\u094d\u0924\u094d'],
			[/\u00ba/g, '\u0924\u094d\u0930\u094d'],
			[/\u00bb/g, '\u093c'],
			[/\u00bc/g, '\u091e\u094d\u091c\u094d'],
			[/\u00bd/g, '\u091e\u094d\u091a\u094d'],
			[/\u00be/g, '\u0944'],
			[/\u00bf/g, '\u0928'],
			[/\u00c0/g, '\u0924\u094d'],
			[/\u00c1/g, '\u0930\u0942'],
			[/\u00c2/g, '\u093f'],
			[/\u00c3/g, '\u0926\u094d\u092c'],
			[/\u00c4/g, '\u0939\u094d\u0930'],
			[/\u00c5/g, '\u0926\u094d\u0935'],
			[/\u00c6/g, '\u0927\u094d'],
			[/\u00c7/g, '\u0921\u094d\u0921\u094d'],
			[/\u00c8/g, '\u0921\u094d\u0921'],
			[/\u00c9/g, '\u0917\u094d'],
			[/\u00ca/g, '\u0939\u094d\u092f'],
			[/\u00cb/g, '\u092a\u094d'],
			[/\u00cc/g, '\u0915\u094d\u0937\u094d'],
			[/\u00cd/g, '\u091d\u094d'],
			[/\u00ce/g, '\u0918\u094d'],
			[/\u00cf/g, '\u0916\u094d'],
			[/\u00d0/g, '\u0926\u094d\u0926\u094d\u0935'],
			[/\u00d1/g, '\u0939\u094d\u092e'],
			[/\u00d2/g, '\u091c\u094d\u091e\u094d'],
			[/\u00d3/g, '\u092f'],
			[/\u00d4/g, '\u0935\u094d'],
			[/\u00d5/g, '\u091f\u094d\u091f'],
			[/\u00d6/g, '\u0932\u094d'],
			[/\u00d7/g, '\u0926\u094d\u0926\u094d\u0930'],
			[/\u00d8/g, '\u0926\u094d\u092d'],
			[/\u00d9/g, '\u0920\u094d\u0920'],
			[/\u00da/g, '\u0925\u094d'],
			[/\u00db/g, '\u0921\u094d\u0922'],
			[/\u00dc/g, '\u092B\u094d'],
			[/\u00dd/g, '\u0936\u094d\u091a\u094d'],
			[/\u00de/g, '\u0930'],
			[/\u00df/g, '\u091c\u094d'],
			[/\u00e0/g, '\u0928\u094d'],
			[/\u00e1/g, '\u091d\u094d\u0930'],
			[/\u00e2/g, '\u0901'],
			[/\u00e3/g, '\u0923\u094d'],
			[/\u00e4/g, '\u0933\u094d'],
			[/\u00e5/g, '\u091a\u094d'],
			[/\u00e6/g, '\u0926\u094d\u0926'],
			[/\u00e7/g, '\u092C\u094d'],
			[/\u00e8/g, '\u0922\u094d\u092e'],
			[/\u00e9/g, '\u0940\u0902'],
			[/\u00ea/g, '\u0922\u094d\u0922'],
			[/\u00eb/g, '\u0936\u094d'],
			[/\u00ec/g, '\u0926\u094d\u0917'],
			[/\u00ed/g, '\u0937\u094d'],
			[/\u00ee/g, '\u0948\u0902'],
			[/\u00ef/g, '\u0938\u094d\u0928\u094d'],
			[/\u00f0/g, '\u0926\u094d\u0917'],
			[/\u00f1/g, '\u0939\u094d'],
			[/\u00f2/g, '\u0939\u094d\u0932'],
			[/\u00f4/g, '\u0938\u094d'],
			[/\u00f5/g, '\u0926\u094d\u0927'],
			[/\u00f6/g, '\u092E\u094d'],
			[/\u00f7/g, '\u092e'],
			[/\u00f9/g, '\u0919\u094d\u0916'],
			[/\u00fa/g, '\u0924\u094d\u0924\u094d'],
			[/\u00fb/g, '\u0919\u094d\u0918'],
			[/\u00fc/g, '\u0947\u0902'],
			[/\u00fd/g, '\u0939\u0941'],
			[/\u00fe/g, '\u0939\u0942'],
			[/\u00ff/g, '\u0915\u094d\u0924'],
			[/\u0152/g, '\u092a\u094d\u0930'],
			[/\u0153/g, '\u0942'],
			[/\u0160/g, '\u0926\u094d\u0930'],
			[/\u0178/g, '\u0939\u094d\u0928\u094d'],
			[/\u02c6/g, '\u0936\u094d'],
			[/\u02dc/g, '\u0932'],
			[/\u2014/g, '\u0939\u094d\u0928'],
			[/\u2018/g, '\u0926\u094d\u092f'],
			[/\u2019/g, '\u0926\u094d\u0917'],
			[/\u201a/g, '\u0970'],
			[/\u201c/g, '\u0926\u094d\u0930'],
			[/\u201d/g, '\u091a\u094d\u091a\u094d'],
			[/\u201e/g, '\u0935'],
			[/\u2020/g, '\u0939\u090b'],
			[/\u2021/g, '\u0936\u094d'],
			[/\u2022/g, '\u0939\u094d\u0923'],
			[/\u2026/g, '\u0919\u094d\u0915\u094d\u0937'],
			[/\u2039/g, '\u0938\u094d\u0930\u094d'],
			[/\u2044/g, '\u0936'],
			[/\u2122/g, '\u091e\u094d\u091e\u094d'],
			[/\uF001/g, '\u0936'],
			//--- combine vowel sign with base vowel for compound vowel
			[/\u0905\u093e/g, '\u0906'],
			[/\u0905\u094b/g, '\u0913'],
			[/\u0905\u094C/g, '\u0914'],
			[/\u090f\u0947/g, '\u0910'],
			[/\u0906\u0901/g, '\u0911'],
			[/\u0906\u0947/g, '\u0913'],
			[/\u0906\u0948/g, '\u0914'],
			[/\u093e\u0945/g, '\u0949'],
			[/\u093e\u0947/g, '\u094b'],
			[/\u093e\u0948/g, '\u094c'],
			//--- I sign with Anusvara
			[/\u00AE(([\u0915-\u0939\u0958-\u095F][\u0901\u0902]?\u094D)*[\u0915-\u0939\u0958-\u095F])/g, '\u093F$1\u0902'],
			//--- I sign with Ra sign and Anusvara
			[/\u004C(([\u0915-\u0939\u0958-\u095F][\u0901\u0902]?\u094D)*[\u0915-\u0939\u0958-\u095F])/g, '\u093F\u0930\u094D$1\u0902'],
			//--- I sign with Ra sign and Anusvara
			[/\u203A(([\u0915-\u0939\u0958-\u095F][\u0901\u0902]?\u094D)*[\u0915-\u0939\u0958-\u095F])/g, '\u093F\u0930\u094D$1\u0902'],
			//--- move Ra sign to beginning of cluster
			[/(([\u0915-\u0939\u0958-\u095F][\u0901\u0902]?\u094D)*[\u0915-\u0939\u0958-\u095F][\u093E\u0940-\u094C]?)\u006F/g, '\u0930\u094D$1'],
			//--- move Ra sign with to beginning of cluster and put Anusvara in the back
			[/(([\u0915-\u0939\u0958-\u095F][\u0901\u0902]?\u094D)*[\u0915-\u0939\u0958-\u095F][\u093E\u0940-\u094C]?)\u00F8/g, '\u0930\u094D$1\u0902'],
			//--- combine Ra sign with letter I to form letter II
			[/\u0907\u006F/g, '\u0908'],
			//--- merge half-form with AA sign for full form
			[/\u094D\u093E/g, ''],
			[/\u094D\u094b/g, '\u0947'],
			[/\u094D\u094c/g, '\u0948'],
			//--- put Nutka behind consonant
			[/\u005c+(.?)/g, '$1\u093c'],
			//--- merge two vocalic L to vocalic LL
			[/\u0943\u0943/g, '\u0944'],
			//--- remove extra Halants
			[/\u094D{2,}/g, '\u094D'],
			//--- move left-side-vowel to the back of cluster
			[/(\u093F)([\u0915-\u0939\u0958-\u095F][\u093C]?)((\u094D[\u0915-\u0939\u0958-\u095F][\u093C]?)*)([\u0901\u0902])?/g, '$2$3$1$5'],
			//--- move Candrabindu and Anusvara to back of cluster
			//[/([\u0901\u0902])([\u093E-\u0944])/g, '$2$1'],
			//--- move vowel-sign to the back of cluster
			[/([\u0941-\u0945])((\u094D[\u0915-\u0939\u0958-\u095F])+)/g, '$2$1'],
			//--- combine consonant with Nukta sign for Nukta form
			[/\u0915\u093c/g, '\u0958'],
			[/\u0916\u093c/g, '\u0959'],
			[/\u0917\u093c/g, '\u095a'],
			[/\u091c\u093c/g, '\u095b'],
			[/\u0921\u093c/g, '\u095c'],
			[/\u0922\u093c/g, '\u095d'],
			[/\u092b\u093c/g, '\u095e'],
			[/\u092f\u093c/g, '\u095f'],
			//--- punctuation
			[/[\u0023\u004F]/g, '\u2019'],
			[/\u0026/g, ':'],
			[/\u0027/g, '\u00A9'],
			[/\u003C/g, ';'],
			[/\u0049/g, '\u2018'],
			//--- Arabic digits
			[/\u0080/g, '\u0031'],
			[/\u0081/g, '\u0032'],
			[/\u0082/g, '\u0033'],
			[/\u0083/g, '\u0034'],
			[/\u0084/g, '\u0035'],
			[/\u0085/g, '\u0036'],
			[/\u0086/g, '\u0037'],
			[/\u0141/g, '\u0038'],
			[/\u0142/g, '\u0039']
		]
	}
});

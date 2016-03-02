// subclass from the kb.brahmi module, which handles all scripts derived from that script (Devanagari, Bengali, Burmese, etc)
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.burmese',
	type:'contextual input',
	inheritance:['kb.brahmi'],
	// The Burmese script differ rather significantly from scripts of the Indian subcontinent.
	// The description of the syllabic structure needs to be completely overridden
	componentTypes:[
		'kinzi',
		'consonant',
		'specialLigature',
		'subscriptConsonant',
		'medialYa',
		'medialRa',
		'medialWa',
		'medialHa',
		'vowelSignE',
		'vowelSignU',
		'vowelSignI',
		'vowelSignA',
		'anusvara',
		'atha',
		'dotBelow',
		'visarga'
	],
	componentTypesRemovalOrder:[
		'vowelSignE',
		'medialRa',
		'consonant',
		'specialLigature',
		'subscriptConsonant',
		'medialYa',
		'kinzi',
		'vowelSignI',
		'anusvara',
		'atha',
		'medialWa',
		'medialHa',
		'vowelSignU',
		'dotBelow',
		'vowelSignA',
		'visarga'
	],
	logicalOrder:{
		kinzi:1,
		consonant:2,
		specialLigature:3,
		subscriptConsonant:4,
		medialYa:5,
		medialRa:6,
		medialWa:7,
		medialHa:8,
		vowelSignE:9,
		vowelSignU:10,		// vowel sign I comes before U according to Unicode specs, but PadaukOT expect this order
		vowelSignI:11,
		vowelSignA:12,
		anusvara:13,
		atha:14,
		dotBelow:15,
		visarga:16
	},
	visualOrder:{
		vowelSignE:1,
		medialRa:2,
		consonant:3, specialLigature:3,
		subscriptConsonant:4, medialYa:4, kinzi:4, vowelSignI:4, anusvara:4, atha:4, medialWa:4, medialHa:4, vowelSignU:4, dotBelow:4,
		vowelSignA:5,
		visarga:6
	},
	multipleComponentsInOneSyllable:{
	},
	allowComponentReplacement:{
		subscriptConsonant:true,
		vowelSignU:true,
		vowelSignI:true,
		vowelSignA:true
	},
	isZeroWidth:{
		kinzi:1,
		subscriptConsonant:4,
		medialWa:7,
		medialHa:8,
		vowelSignU:10,
		vowelSignI:11,
		anusvara:13,
		atha:14,
		dotBelow:15
	},
	placeholderPolicies:{
		'medialRa':{
			inTheAbsenceOf:['consonant'],
			place:'behind',
			placeholder:'\u200d',
			standingInFor:'consonant'
		},
		'vowelSignE':{
			inTheAbsenceOf:['consonant'],
			place:'behind',
			placeholder:'\u200d',
			standingInFor:'consonant'
		}
	},
	mutualExclusion: {
	},
	componentUnicodeGroups:[
		{ type:'kinzi',			pattern:'\u1004\u103a\u1039' },
		{ type:'specialLigature',	pattern:'\u1000\u103b\u1015\u103a' },
		{ type:'consonant',		pattern:'[\u1000-\u1021\u103f\u1050-\u1055]' },
		{ type:'subscriptConsonant',	pattern:'\u1039[\u1000-\u1021\u103f\u1050-\u1055]' },
		{ type:'medialYa',		pattern:'\u103b' },
		{ type:'medialRa',		pattern:'\u103c' },
		{ type:'medialWa',		pattern:'\u103d' },
		{ type:'medialHa',		pattern:'\u103e' },
		{ type:'vowelSignE',		pattern:'\u1031' },
		{ type:'vowelSignU',		pattern:'[\u102f\u1030]' },
		{ type:'vowelSignI',		pattern:'[\u102d\u102e\u1032]' },
		{ type:'vowelSignA',		pattern:'[\u102c\u102b]' },
		{ type:'anusvara',		pattern:'\u1036' },
		{ type:'atha',			pattern:'\u103a' },
		{ type:'dotBelow',		pattern:'\u1037' },
		{ type:'visarga',		pattern:'\u1038' }
	],
	decomposition:[
//		{ from:'\u0a86', to:'\u0a85\u0abe' },
	],
	modifyUnicodeBeforeScan:function(unicode) {
		return unicode.replace(/\u200d\u1031\u200d\u103c/g, '\u200d\u103c\u1031');
	},
	modifyUnicodeAfterMerge:function(unicode) {
		return unicode.replace(/\u200d\u103c\u200d\u1031/g, '\u200d\u1031\u200d\u103c');
	}
}
} );
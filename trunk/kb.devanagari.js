// subclass from the kb.brahmi module, which handles all scripts derived from that script (Devanagari, Bengali, Burmese, etc)
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.devanagari',
	type:'contextual input',
	inheritance:['kb.brahmi'],
	modifySyllable:function(syllable) {
		// if there's a half form but no full form consonant and an AA sign (which can look like the right-side stem of a consonant),
		// change the half form into full form and remove the sign
		// while no one would really type like this (easier to enter the full form), this is implemented for completeness sake
		if(syllable.components.consonantHalfForms && !syllable.components.consonant && syllable.components.vowelAppearingOnRight == '\u093e') {
			// second to last character is the consonant
			var s = syllable.components.consonantHalfForms;
			syllable.components.consonant = s.substr(s.length - 2, 1);
			syllable.components.consonantHalfForms = s.substr(0, s.length - 2);
			syllable.components.vowelAppearingOnRight = '';
		}
	},
	componentUnicodeGroups:[
		// from specific to general
		{ type:'consonantAppearingAsSignPre',	pattern:'\u0930\u094d' },		// halant RA
		{ type:'consonantAppearingAsSignPost',	pattern:'\u094d\u0930' },		// RA halant
		{ type:'consonantHalfForms',		pattern:'[\u0915-\u0939\u0958-\u095f]\u094d' },
		{ type:'consonant',			pattern:'[\u0915-\u0939\u0958-\u095f]' },
		{ type:'consonantModifiers',		pattern:'[\u093C\u094d]' },
		{ type:'vowelSign',			pattern:'[\u0941-\u0948]' },
		{ type:'vowelAppearingOnLeft',		pattern:'[\u093f\u094e]' },
		{ type:'vowelAppearingOnRight',		pattern:'[\u093E\u0940\u0949-\u094C]' },
		{ type:'syllableModifiers',		pattern:'[\u0900-\u0903]' },
		{ type:'vowelIndependent', 		pattern:'[\u0904-\u0914\u0960\u0961\u0972]' }
	],
	decomposition:[
		{ from:'\u0904', to:'\u0905\u0946' },
		{ from:'\u0906', to:'\u0905\u093e' },
		{ from:'\u090d', to:'\u090f\u0945' },
		{ from:'\u090e', to:'\u090f\u0946' },
		{ from:'\u0910', to:'\u090f\u0947' },
		{ from:'\u0911', to:'\u0905\u093e\u0945' },
		{ from:'\u0912', to:'\u0905\u093e\u0946' },
		{ from:'\u0913', to:'\u0905\u093e\u0947' },
		{ from:'\u0914', to:'\u0905\u093e\u0948' },
		{ from:'\u0929', to:'\u0928\u093c' },
		{ from:'\u0949', to:'\u093e\u0945' },
		{ from:'\u094a', to:'\u093e\u0946' },
		{ from:'\u094b', to:'\u093e\u0947' },
		{ from:'\u094c', to:'\u093e\u0948' },
		{ from:'\u0958', to:'\u0915\u093c' },
		{ from:'\u0959', to:'\u0916\u093c' },
		{ from:'\u095a', to:'\u0917\u093c' },
		{ from:'\u095b', to:'\u091C\u093c' },
		{ from:'\u095c', to:'\u0921\u093c' },
		{ from:'\u095d', to:'\u0922\u093c' },
		{ from:'\u095e', to:'\u092b\u093c' },
		{ from:'\u095f', to:'\u092f\u093c' },
		{ from:'\u0960', to:'\u090b\u0943' },
		{ from:'\u0961', to:'\u090c\u0943' },
		{ from:'\u0972', to:'\u0905\u0945' }
	]
}
} );
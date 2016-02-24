NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cvt.devanagari.hindi.auto',
	type:'encoding converter',
	dependency:['cvt.devanagari.hindi.webdunia', 'cvt.devanagari.hindi.naidunia', 'cvt.devanagari.hindi.kruti', 'cvt.devanagari.hindi.jaipur'],
	inheritance:['cvt'],
	lang:'hi',
	convertTextSegment:function(segment) {
		var converter;
		var font = segment.style.fontFamily;
		if(/(^|,)naidunia($|,)/i.test(font)) {
			converter = this.naiduniaConverter;
		} else if(/(^|,)webdunia($|,)/i.test(font)) {
			converter = this.webduniaConverter;
		} else if(/(^|,)kruti dev/i.test(font)) {
			converter = this.krutiConverter;
		} else if(/(^|,)jaipur($|,)/i.test(font)) {
			converter = this.jaipurConverter;
		}
		if(converter) {
			converter.convertTextSegment(segment);
		}
	},
	initialize:function() {
		var list = [];
		NFLCIME.dispatchEvent( { type:'ModuleGetList', list:list } );
		for(var i = 0; i < list.length; i++) {
			var module = list[i];
			switch(module.id) {
				case 'cvt.devanagari.hindi.naidunia': this.naiduniaConverter = module; break;
				case 'cvt.devanagari.hindi.webdunia': this.webduniaConverter = module; break;
				case 'cvt.devanagari.hindi.kruti': this.krutiConverter = module; break;
				case 'cvt.devanagari.hindi.jaipur': this.jaipurConverter = module; break;
			}
		}
	},
	naiduniaConverter:null,
	webduniaConverter:null,
	krutiConverter:null,
	jaipurConverter:null
}
} );
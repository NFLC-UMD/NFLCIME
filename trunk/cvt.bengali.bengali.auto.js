NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cvt.bengali.bengali.auto',
	type:'encoding converter',
	dependency:['cvt.bengali.bengali.amardesh', 'cvt.bengali.bengali.bangla2000', 'cvt.bengali.bengali.bangsee', 'cvt.bengali.bengali.boishakhi', 'cvt.bengali.bengali.prothoma', 'cvt.bengali.bengali.sutonny'],
	inheritance:['cvt'],
	lang:'bn',
	convertTextSegment:function(segment) {
		var converter;
		var font = segment.style.fontFamily;
		if(/(^|,)amar desh($|,)/i.test(font)) {
			converter = this.amardeshConverter;
		} else if(/(^|,)bangla2000($|,)/i.test(font)) {
			converter = this.bangla2000Converter;
		} else if(/(^|,)bangsee($|,)/i.test(font)) {
			converter = this.bangseeConverter;
		} else if(/(^|,)boishakhi($|,)/i.test(font)) {
			converter = this.boishakhiConverter;
		} else if(/(^|,)prothoma($|,)/i.test(font)) {
			converter = this.prothomaConverter;
		} else if(/(^|,)sutonny($|,)/i.test(font)) {
			converter = this.sutonnyConverter;
		} else if(/(^|,)sutonnymj($|,)/i.test(font)) {
			converter = this.sutonnyConverter;
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
				case 'cvt.bengali.bengali.amardesh': this.amardeshConverter = module; break;
				case 'cvt.bengali.bengali.bangla2000': this.bangla2000Converter = module; break;
				case 'cvt.bengali.bengali.bangsee': this.bangseeConverter = module; break;
				case 'cvt.bengali.bengali.boishakhi': this.boishakhiConverter = module; break;
				case 'cvt.bengali.bengali.prothoma': this.prothomaConverter = module; break;
				case 'cvt.bengali.bengali.sutonny': this.sutonnyConverter = module; break;
			}
		}
	},
	amardeshConverter:null,
	bangla2000Converter:null,
	bangseeConverter:null,
	boishakhiConverter:null,
	prothomaConverter:null,
	sutonnyConverter:null
}
} );
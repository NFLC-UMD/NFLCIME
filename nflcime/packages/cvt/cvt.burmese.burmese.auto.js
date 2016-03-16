/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.burmese.burmese.auto
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.burmese.burmese.auto',
		type: 'encoding converter',
		dependency: ['cvt.burmese.burmese.bit', 'cvt.burmese.burmese.myan', 'cvt.burmese.burmese.wininnwa', 'cvt.burmese.burmese.winmyanmar', 'cvt.burmese.burmese.zawgyi'],
		inheritance: ['cvt'],
		lang: 'my',
		convertTextSegment: function(segment) {
			var converter;
			var font = segment.style.fontFamily;
			if (/(^|,)bit($|,)/i.test(font)) {
				converter = this.bitConverter;
			} else if (/(^|,)myanttf($|,)/i.test(font)) {
				converter = this.myanConverter;
			} else if (/(^|,)wininnwa($|,)/i.test(font)) {
				converter = this.wininnwaConverter;
			} else if (/(^|,)winmyanmar($|,)/i.test(font)) {
				converter = this.winmyanmarConverter;
			} else if (/(^|,)zawgyi-one($|,)/i.test(font)) {
				converter = this.zawgyiConverter;
			}
			if (converter) {
				converter.convertTextSegment(segment);
			}
		},
		initialize: function() {
			var list = [];
			NFLCIME.dispatchEvent({
				type: 'ModuleGetList',
				list: list
			});
			for (var i = 0; i < list.length; i++) {
				var module = list[i];
				switch (module.id) {
					case 'cvt.burmese.burmese.bit':
						this.bitConverter = module;
						break;
					case 'cvt.burmese.burmese.myan':
						this.myanConverter = module;
						break;
					case 'cvt.burmese.burmese.wininnwa':
						this.wininnwaConverter = module;
						break;
					case 'cvt.burmese.burmese.winmyanmar':
						this.winmyanmarConverter = module;
						break;
					case 'cvt.burmese.burmese.zawgyi':
						this.zawgyiConverter = module;
						break;
				}
			}
		},
		bitConverter: null,
		myanConverter: null,
		wininnwaConverter: null,
		winmyanmarConverter: null,
		zawgyiConverter: null
	}
});

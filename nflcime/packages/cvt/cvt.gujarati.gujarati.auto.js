/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.cvt.gujarati.gujarati.auto
 * @extends NFLCIME.CVT
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'cvt.gujarati.gujarati.auto',
		type: 'encoding converter',
		dependency: ['cvt.gujarati.gujarati.gopika',
			'cvt.gujarati.gujarati.krishnaweb',
			'cvt.gujarati.gujarati.surya'
		],
		inheritance: ['cvt'],
		lang: 'gu',
		convertTextSegment: function(segment) {
			var converter;
			var font = segment.style.fontFamily;
			if (/(^|,)gopika($|,)/i.test(font)) {
				converter = this.gopikaConverter;
			} else if (/(^|,)krishnaweb($|,)/i.test(font)) {
				converter = this.krishnawebConverter;
			} else if (/(^|,)govinda($|,)/i.test(font)) {
				converter = this.krishnawebConverter;
			} else if (/(^|,)divya($|,)/i.test(font)) {
				converter = this.suryaConverter;
			} else if (/(^|,)surya($|,)/i.test(font)) {
				converter = this.suryaConverter;
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
					case 'cvt.gujarati.gujarati.gopika':
						this.gopikaConverter = module;
						break;
					case 'cvt.gujarati.gujarati.krishnaweb':
						this.krishnawebConverter = module;
						break;
					case 'cvt.gujarati.gujarati.surya':
						this.suryaConverter = module;
						break;
				}
			}
		},
		gopikaConverter: null,
		krishnawebConverter: null,
		suryaConverter: null
	}
});

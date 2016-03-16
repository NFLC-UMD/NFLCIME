/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.quechua.windows
 * Quechua language keyboard class.
 *
 * *Note: Same as the Spanish language keyboard.*
 * @extends NFLCIME.kb.latin.spanish.windows
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.latin.quechua.windows',
    type: 'keyboard layout',
    inheritance: ['kb.latin.spanish.windows']
  }
});

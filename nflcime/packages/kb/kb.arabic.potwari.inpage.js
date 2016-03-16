/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.potwari.inpage
 * Potwari language keyboard map class.
 *
 * *Note: Same as the {@link NFLCIME.kb.arabic.urdu.inpage Urdu language keyboard}.*
 * @extends NFLCIME.kb.arabic.urdu.inpage
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.arabic.potwari.inpage',
    type: 'keyboard layout',
    inheritance: ['kb.arabic.urdu.inpage']
  }
});

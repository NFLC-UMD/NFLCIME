/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.dari.phonetic
 * Dari Persian language phonetic keyboard map class.
 *
 * *Note: Same as the {@link NFLCIME.kb.arabic.farsi.phonetic Farsi phonetic keyboard}.*
 * @extends NFLCIME.kb.arabic.farsi.phonetic
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.arabic.dari.phonetic',
    type: 'keyboard layout',
    inheritance: ['kb.arabic.farsi.phonetic']
  }
});

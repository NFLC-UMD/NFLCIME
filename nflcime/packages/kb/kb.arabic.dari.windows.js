/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.dari.windows
 * Dari Persian language windows keyboard map class.
 *
 * *Note: Same as the {@link NFLCIME.kb.arabic.farsi.windows Farsi windows keyboard}.*
 * @extends NFLCIME.kb.arabic.farsi.windows
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.arabic.dari.windows',
    type: 'keyboard layout',
    inheritance: ['kb.arabic.farsi.windows']
  }
});

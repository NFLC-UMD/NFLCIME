/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.sama.windows
 * @extends NFLCIME.kb.latin.tagalog.windows
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.latin.sama.windows',
    type: 'keyboard layout',
    inheritance: ['kb.latin.tagalog.windows']
      // exactly the same as the Tagalog keyboard
  }
});

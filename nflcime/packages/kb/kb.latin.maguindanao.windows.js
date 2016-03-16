/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.maguindanao.windows
 * @extends NFLCIME.kb.latin.tagalog.windows
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.latin.maguindanao.windows',
    type: 'keyboard layout',
    inheritance: ['kb.latin.tagalog.windows']
      // exactly the same as the Tagalog keyboard
  }
});

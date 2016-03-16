/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.geez.tigrinya.phonetic
 * @extends NFLCIME.kb.geez.amharic.phonetic
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.geez.tigrinya.phonetic',
    type: 'keyboard layout',
    inheritance: ['kb.geez.amharic.phonetic']
      // exactly the same as the Amharic keyboard
  }
});

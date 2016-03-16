/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.geez.tigrinya.powergeez
 * @extends NFLCIME.kb.geez.amharic.powergeez
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.geez.tigrinya.powergeez',
    type: 'keyboard layout',
    inheritance: ['kb.geez.amharic.powergeez']
      // exactly the same as the Amharic keyboard
  }
});

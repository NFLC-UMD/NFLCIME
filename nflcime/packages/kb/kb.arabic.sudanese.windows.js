/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.sudanese.windows
 * Sudanese language windows keyboard map class.
 *
 * @extends NFLCIME.kb.arabic.msa.windows
 *
 */

NFLCIME.dispatchEvent({
  type: 'ModuleAdd',
  module: {
    id: 'kb.arabic.sudanese.windows',
    type: 'keyboard layout',
    inheritance: ['kb.arabic.msa.windows'],
    initialize: function(env, subclassing) {
      // make the Persian gaf available
      this.mapNormal[0xdc] = '\u06af'; // \
    }
  }
});

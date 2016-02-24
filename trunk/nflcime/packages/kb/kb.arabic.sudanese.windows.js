NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.arabic.sudanese.windows',
	type:'keyboard layout',
	inheritance:['kb.arabic.msa.windows'],
	initialize:function(env, subclassing) {
		// make the Persian gaf available
		this.mapNormal[0xdc] = '\u06af'; // \
	}
}
} );
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'pers.cookie',
	type:'persistence',
	//--- Event handlers
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			NFLCIME.addEventListener('PersistenceGetValue', this);
			NFLCIME.addEventListener('PersistenceSetValue', this);
		}
	},
	// Stop handling DOM event when module is deactivated
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			NFLCIME.removeEventListener('PersistenceGetValue', this);
			NFLCIME.removeEventListener('PersistenceSetValue', this);
		}
	},
	onPersistenceGetValue:function(evt) {
		evt.value = this.getValue(evt.id, evt.name);
	},
	onPersistenceSetValue:function(evt) {
		this.setValue(evt.id, evt.name, evt.value);
	},
	//--- Private functions
	getValue:function(group, name) {
		var cookie_values = this.cookieValueGroups[group];
		if(!cookie_values) {
			this.cookieValueGroups[group] = cookie_values = this.getCookieValues(group);
		}
		var value = cookie_values[name];
		return value;
	},
	setValue:function(group, name, value) {
		var cookie_values = this.cookieValueGroups[group];
		if(!cookie_values) {
			this.cookieValueGroups[group] = cookie_values = this.getCookieValues(group);
		}
		cookie_values[name] = value + '';
		var cookie_pairs = [], n;
		for(n in cookie_values) {
			var val = cookie_values[n];
			if(typeof(val) != 'function') {
				cookie_pairs.push(n + '::' + val);
			}
		}
		var now = new Date();
		var next_year = new Date(now.getTime() + 31536000000);
		document.cookie = group + '="' + cookie_pairs.join('//') + '"' + '; expires=' + next_year;
	},
	getCookieValues:function(group) {
		var cookie_values = Array();
		var regex = new RegExp('(^|\\s)' + group + '="([^"]*)"', 'i');
		var match;
		if(match = regex.exec(document.cookie)) {
			var cookie_pairs = match[2].split('//');
			for(var i = 0; i < cookie_pairs.length; i++) {
				var a = cookie_pairs[i].split('::');
				var name = a[0], value = a[1];
				if(name != 'PHPSESSID') {
					cookie_values[name] = value;
				}
			}
		}
		return cookie_values;
	},
	initialize:function(env, subclassing) {
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this)
	},
	//--- Private variables
	cookieValueGroups:{}
}
} );
//turns 'quickly' into 'quick'
var to_adjective = (function() {
	var main = function(str) {
		var irregulars = {
			"idly": "idle",
			"sporadically": "sporadic",
			"basically": "basic",
			"grammatically": "grammatical",
			"alphabetically": "alphabetical",
			"economically": "economical",
			"conically": "conical",
			"politically": "political",
			"vertically": "vertical",
			"practically": "practical",
			"theoretically": "theoretical",
			"critically": "critical",
			"fantastically": "fantastic",
			"mystically": "mystical",
			"pornographically": "pornographic",
			"fully": "full",
			"jolly": "jolly",
			"wholly": "whole",
		}
		var transforms = [{
			reg: /bly$/i,
			repl: 'ble',
		}, {
			reg: /gically$/i,
			repl: 'gical',
		}, {
			reg: /([rsdh])ically$/i,
			repl: '$1ical',
		}, {
			reg: /ically$/i,
			repl: 'ic',
		}, {
			reg: /uly$/i,
			repl: 'ue',
		}, {
			reg: /ily$/i,
			repl: 'y',
		}, {
			reg: /(.{3})ly$/i,
			repl: '$1',
		}, ]
		if (irregulars[str]) {
			return irregulars[str]
		}
		for (var i = 0; i < transforms.length; i++) {
			if (str.match(transforms[i].reg)) {
				return str.replace(transforms[i].reg, transforms[i].repl)
			}
		}
		return str
	}
	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main;
})();

// console.log(to_adjective('quickly') == 'quick')
// console.log(to_adjective('marvelously') == 'marvelous')
// console.log(to_adjective('marvelously') == 'marvelous')

// data = require("./test").data
// data = data.filter(function(w) {
// 	return to_adjective(w[0]) != w[1]
// })

// arr = data.map(function(w) {
// 	console.log(w[0] + " -  " + to_adjective(w[0]))
// })
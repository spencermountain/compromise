//turn 'quick' into 'quickly'
var to_adverb = (function() {
	var main = function(str) {

		var irregulars = {
			"idle": "idly",
			"public": "publicly",
			"vague": "vaguely",
			"day": "daily",
			"icy": "icily",
		}

		var transforms = [{
			reg: /ly$/i,
			repl: 'ly',
		}, {
			reg: /(.{3})y$/i,
			repl: '$1ily',
		}, {
			reg: /que$/i,
			repl: 'quely',
		}, {
			reg: /ue$/i,
			repl: 'uly',
		}, {
			reg: /ic$/i,
			repl: 'ically',
		}, {
			reg: /ble$/i,
			repl: 'bly',
		}, ]

		if (irregulars[str]) {
			return irregulars[str]
		}
		for (var i = 0; i < transforms.length; i++) {
			if (str.match(transforms[i].reg)) {
				return str.replace(transforms[i].reg, transforms[i].repl)
			}
		}
		return str + 'ly'
	}
	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main;
})();



// data = require("./test").data
// data = data.filter(function(w) {
// 	return to_adverb(w[1]) != w[0]
// })
// arr = data.map(function(w) {
// 	console.log(w[1] + "  -  " + to_adverb(w[1]))
// })
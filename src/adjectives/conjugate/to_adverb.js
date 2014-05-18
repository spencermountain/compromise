//turn 'quick' into 'quickly'
var to_adverb = (function() {
	var main = function(str) {


		var irregulars = {
			"idle": "idly",
			"public": "publicly",
			"vague": "vaguely",
			"day": "daily",
			"icy": "icily",
			"single": "singly",
			"female": "womanly",
			"male": "manly",
			"simple": "simply",
			"whole": "wholly",
			"special": "especially",
			"fast": "fast",
			"straight": "straight",
			"wrong": "wrong",
			"fast": "fast",
			"hard": "hard",
			"late": "late",
			"early": "early",
			"well": "well",
			"best": "best",
			"latter": "latter",
		}
		var dont = {
			"foreign": 1,
			"black": 1,
			"modern": 1,
			"able": 1,
			"next": 1,
			"small": 1,
			"big": 1,
			"hot": 1,
			"difficult": 1,
			"degenerate": 1,
			"young": 1,
			"still": 1,
			"awake": 1,
			"back": 1,
			"blue": 1,
			"brown": 1,
			"red": 1,
			"orange": 1,
			"complex": 1,
			"cool": 1,
			"dull": 1,
			"dirty": 1,
			"done": 1,
			"empty": 1,
			"fat": 1,
			"fertile": 1,
			"frozen": 1,
			"gold": 1,
			"grey": 1,
			"gray": 1,
			"green": 1,
			"ill": 1,
			"medium": 1,
			"parallel": 1,
			"outdoor": 1,
			"tall": 1,
			"unknown": 1,
			"undersized": 1,
			"used": 1,
			"well": 1,
			"welcome": 1,
			"yellow": 1,
			"wet": 1,
			"white": 1,
			"fixed": 1,
			"mixed": 1,
			"": 1,
		}
		var transforms = [{
			reg: /al$/i,
			repl: 'ally',
		}, {
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
		}, {
			reg: /l$/i,
			repl: 'ly',
		}, ]

		if (dont[str]) {
			return null
		}
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
// console.log(to_adverb('normal'))
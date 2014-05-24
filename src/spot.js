var spot = (function() {

	if (typeof module !== "undefined" && module.exports) {
		pos = require("./pos");
	}
	var blacklist = {
		"i": 1,
		"me": 1,
		"he": 1,
		"she": 1,
		"we": 1,
		"they": 1,
	}

	var main = function(text, options) {
		options = options || {}
		var sentences = pos(text, options)
		var spots = []
		sentences.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				if (token.pos.parent == "noun" && !blacklist[token.normalised]) {
					spots.push(token)
				}
			})
		})

		if (options.ignore_gerund) {
			spots = spots.filter(function(t) {
				return t.pos.tag != "VBG"
			})
		}
		return spots
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

// var spots = spot("tony hawk walked to toronto")
// var spots = spot("mike myers and nancy kerrigan")
// console.log(spots[1].analysis)
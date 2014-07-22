var spot = (function() {

	if (typeof module !== "undefined" && module.exports) {
		pos = require("./pos");
	}

	var main = function(text, options) {
		options = options || {}
		var sentences = pos(text, options)
		var spots = []
		sentences.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				if (token.pos.parent == "noun" && token.analysis.is_entity) {
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
// console.log(spots)
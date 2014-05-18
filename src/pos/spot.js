var spot = (function() {

	if (typeof module !== "undefined" && module.exports) {
		var pos = require("./pos").pos;
	}

	var main = function(text, options) {
		var sentences = pos(text, options)
		var spots = []
		sentences.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				if (token.pos.parent == "noun") {
					spots.push(token)
				}
			})
		})
		return spots
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

var spots = spot("tony hawk walked to toronto")
console.log(spots)
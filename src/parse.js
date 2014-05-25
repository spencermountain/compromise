var parsed = (function() {

	if (typeof module !== "undefined" && module.exports) {
		pos = require("./pos");
	}

	var get_tag = function(sentences, tag) {
		var found = []
		sentences.forEach(function(s) {
			s.tokens.forEach(function(t) {
				if (t.pos.tag == tag) {
					found.push(t.analysis)
				}
			})
		})
		return found
	}

	var main = function(text, options) {
		options = options || {}
		var sentences = pos(text, options)
		return {
			sentences: sentences.map(function(s) {
				return s.text()
			}),
			numbers: get_tag(sentences, "NU"),
			dates: get_tag(sentences, "DA"),

		}

	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

// console.log(parsed("mike myers and nancy kerrigan are nice. They've lived at twenty two baltimore since July 8 1992"))
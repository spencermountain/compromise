// accepts parsed tokens
var Sentence = function(tokens) {
	var the = this
	the.tokens = tokens || [];

	the.tense = function() {
		var verbs = the.tokens.filter(function(token) {
			return token.pos.parent == "verb"
		})
		return verbs.map(function(v) {
			return v.analysis.tense
		})
	}

	the.to_past = function() {
		return the.tokens.map(function(token) {
			if (token.pos.parent == "verb") {
				token.text = token.analysis.to_past()
				token.normalised = token.text
			}
			return token
		})
	}
	the.to_present = function() {
		return the.tokens.map(function(token) {
			if (token.pos.parent == "verb") {
				token.text = token.analysis.to_present()
				token.normalised = token.text
			}
			return token
		})
	}
	the.to_future = function() {
		return the.tokens.map(function(token) {
			if (token.pos.parent == "verb") {
				token.text = token.analysis.to_future()
				token.normalised = token.text
			}
			return token
		})
	}

	the.text = function() {
		return the.tokens.map(function(s) {
			return s.text
		}).join(' ')
	}

	return the
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = Sentence;
}
// pos = require("./pos")
// tokens = pos('joe swims to the bank')[0].tokens
// // console.log(new Sentence(tokens).tense())
// s = new Sentence(tokens)
// s.to_past()
// console.log(s)
// console.log(s.text())
// s.to_present()
// console.log(s.text())
// s.to_future()
// console.log(s.text())
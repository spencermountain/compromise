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
		the.tokens = the.tokens.map(function(token) {
			if (token.pos.parent == "verb") {
				token.text = token.analysis.to_past()
				token.normalised = token.text
			}
			return token
		})
		return the
	}
	the.to_present = function() {
		the.tokens = the.tokens.map(function(token) {
			if (token.pos.parent == "verb") {
				token.text = token.analysis.to_present()
				token.normalised = token.text
			}
			return token
		})
		return the
	}
	the.to_future = function() {
		the.tokens = the.tokens.map(function(token) {
			if (token.pos.parent == "verb") {
				token.text = token.analysis.to_future()
				token.normalised = token.text
			}
			return token
		})
		return the
	}

	the.insert = function(token, i) {
		if (i && token) {
			the.tokens.splice(i, 0, token);
		}
	}

	the.negate = function() {
		//if it's already negative, don't touch it
		for (var i = 0; i < the.tokens.length; i++) {
			if (the.tokens[i].analysis.negative) {
				return the
			}
		}
		//first at 'not' before copulas
		var _l = the.tokens.length
		for (var i = 0; i < _l; i++) { //this modifies array while looping
			if (the.tokens[i].pos && the.tokens[i].pos.tag == "CP" && !the.tokens[i].analysis.negative) {
				var token = {
					text: "not"
				}
				//set surrounding verbs as negative
				the.tokens[i].analysis.negative = true
				if (the.tokens[i + 1] && the.tokens[i + 1].analysis) {
					the.tokens[i + 1].analysis.negative = true
				}
				the.insert(token, i + 1)
			}
		}
		//then, address other verbs
		var verb_negations = {
			past: "didn't",
			present: "doesn't",
			future: "won't",
			gerund: "isn't",
		}
		var _l = the.tokens.length
		for (var i = 0; i < _l; i++) {
			if (the.tokens[i].pos && the.tokens[i].pos.parent == "verb" && !the.tokens[i].analysis.negative) {
				var tense = the.tokens[i].analysis.tense || 'present'
				//set it as negative
				the.tokens[i].analysis.negative = true
				//set it as present tense
				if (tense != 'gerund') {
					the.tokens[i].text = the.tokens[i].analysis.conjugate().infinitive
					the.tokens[i].normalised = the.tokens[i].text
				}
				var token = {
					text: verb_negations[tense],
					normalised: verb_negations[tense],
				}
				the.insert(token, i)
			}
		}
		return the
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

//gerund negation
// tokens = pos('joe is so cool, he is going')[0].tokens
//non-gerund verb negations
// tokens = pos('joe swims to the bank')[0].tokens
// tokens = pos('joe swam to the bank')[0].tokens
// tokens = pos('joe swam to the bank')[0].tokens
// tokens = pos('joe is swimming to the bank')[0].tokens
// tokens = pos('joe is not swimming to the bank')[0].tokens //already negative
// tokens = pos('the chimney was so yellow')[0].tokens

// s = new Sentence(tokens).negate().tokens[2].analysis.conjugate()
// console.log(s)
// console.log(s)
// s = new Sentence(tokens)
// s.to_past()
// console.log(s)
// console.log(s.text())
// s.to_present()
// console.log(s.text())
// s.to_future()
// console.log(s.text())
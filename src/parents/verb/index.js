// "VB  - verb, generic (eat)",
// "VBD  - past-tense verb (ate)",
// "VBN  - past-participle verb (eaten)",
// "VBP  - infinitive verb (eat)",
// "VBZ  - present-tense verb (eats, swims)",

// "VBG  - gerund verb (eating,winning)"
// "CP  - copula (is, was, were)",

var Verb = function(str) {
	var the = this
	the.word = str || '';

	if (typeof module !== "undefined" && module.exports) {
		verb_conjugate = require("./conjugate/conjugate")
		parts_of_speech = require("../../data/parts_of_speech")
	}

	var copulas = {
		"is": "CP",
		"will be": "CP",
		"are": "CP",
		"was": "CP",
		"were": "CP",
	}
	var tenses = {
		past: "VBD",
		participle: "VBN",
		infinitive: "VBP",
		present: "VBZ",
		gerund: "VBG"
	}
	// console.log(verb_conjugate)

	the.conjugate = function() {
		return verb_conjugate(the.word)
	}

	the.which = (function() {
		if (copulas[the.word]) {
			return parts_of_speech['CP']
		}
		if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) {
			return parts_of_speech['VBG']
		}
		var forms = verb_conjugate(the.word)
		for (var i in forms) {
			if (forms[i] == the.word) {
				return parts_of_speech[tenses[i]]
			}
		}
	})()


	return the;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Verb;
}

// console.log(new Verb("walked"))
// console.log(new Verb("stalking"))
// console.log(new Verb("stalks"))
// console.log(new Verb("stalked"))
var Verb = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		verb_conjugate = require("./conjugate/conjugate")
	}

	// console.log(verb_conjugate)

	the.conjugate = (function() {
		return verb_conjugate(the.word)
	})(),

	the.tense = (function(str) {
		var forms = verb_conjugate(the.word)
		for (var i in forms) {
			if (forms[i] == the.word) {
				return i
			}
		}
	})()


	return the;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Verb;
}

// s = new Verb("walk")
// console.log(s)
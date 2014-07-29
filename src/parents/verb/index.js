var Verb = function(str, next, last, token) {
	var the = this
	the.word = str || '';
	the.next = next
	the.last = last

	if (typeof module !== "undefined" && module.exports) {
		verb_conjugate = require("./conjugate/conjugate")
		parts_of_speech = require("../../data/parts_of_speech")
	}

	var copulas = {
		"is": "CP",
		"will be": "CP",
		"will": "CP",
		"are": "CP",
		"was": "CP",
		"were": "CP",
	}
	var modals = {
		"can": "MD",
		"may": "MD",
		"could": "MD",
		"might": "MD",
		"will": "MD",
		"ought to": "MD",
		"would": "MD",
		"must": "MD",
		"shall": "MD",
		"should": "MD",
	}
	var tenses = {
		past: "VBD",
		participle: "VBN",
		infinitive: "VBP",
		present: "VBZ",
		gerund: "VBG"
	}

	the.conjugate = function() {
		return verb_conjugate(the.word)
	}

	the.to_past = function() {
		if (the.form == "gerund") {
			return the.word
		}
		return verb_conjugate(the.word).past
	}
	the.to_present = function() {
		return verb_conjugate(the.word).present
	}
	the.to_future = function() {
		return "will " + verb_conjugate(the.word).infinitive
	}

	//which conjugation
	the.form = (function() {
		var forms = verb_conjugate(the.word)
		for (var i in forms) {
			if (forms[i] == the.word) {
				return i
			}
		}
	})()

	//past/present/future
	the.tense = (function() {
		if (the.word.match(/^will ./)) {
			return "future"
		}
		var form = the.form
		if (form == "present") {
			return "present"
		}
		if (form == "past") {
			return "past"
		}
		return "present"
	})()

	//the most accurate part_of_speech
	the.which = (function() {
		if (copulas[the.word]) {
			return parts_of_speech['CP']
		}
		if (the.word.match(/([aeiou][^aeiouwyrlm])ing$/)) {
			return parts_of_speech['VBG']
		}
		var form = the.form
		return parts_of_speech[tenses[form]]
	})()

	//is this verb negative already?
	the.negative = (function() {
		if (the.word.match(/n't$/)) {
			return true
		}
		if ((modals[the.word] || copulas[the.word]) && the.next && the.next.normalised == "not") {
			return true
		}
		return false
	})()


	return the;
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = Verb;
}


// console.log(new Verb("walked"))
// console.log(new Verb("stalking").tense)
// console.log(new Verb("will walk").tense)
// console.log(new Verb("stalks"))
// console.log(new Verb("eat").to_future())
// console.log(new Verb("having").to_past())
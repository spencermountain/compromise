// "NN  - noun, generic (dog, rain)",
// "NNS  - plural noun (dogs, foxes)",

// "NNP  - singular proper noun (Edinburgh, skateboard)",
// "NNPS  - plural proper noun (Smiths)",

// "NG  - gerund noun (eating,winning - but used grammatically as a noun)",

// "PRP  - personal pronoun (I,you,she)"
// "NNO  - possessive noun (spencer's, sam's)",


var Noun = function(str) {
	var the = this
	the.word = str || '';

	if (typeof module !== "undefined" && module.exports) {
		parts_of_speech = require("../../data/parts_of_speech")
		inflect = require("./conjugate/inflect")
		indefinite_article = require("./indefinite_article/indefinite_article")
	}
	//personal pronouns
	var prps = {
		"it": "PRP",
		"they": "PRP",
		"i": "PRP",
		"them": "PRP",
		"you": "PRP",
		"she": "PRP",
		"me": "PRP",
		"he": "PRP",
		"him": "PRP",
		"her": "PRP",
		"us": "PRP",
		"we": "PRP",
		"thou": "PRP",
	}

	the.is_acronym = (function() {
		var s = the.word
		//no periods
		if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
			return true
		}
		//with periods
		if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
			return true
		}
		return false
	})()



	the.conjugate = function() {
		return inflect.inflect(the.word)
	},

	the.is_plural = (function() {
		return inflect.is_plural(the.word)
	})()

	the.article = function() {
		return indefinite_article(the.word)
	}

	the.pluralize = function() {
		return (inflect.inflect(the.word) || {}).plural
	}
	the.singularize = function() {
		return (inflect.inflect(the.word) || {}).singular
	}

	//specifically which pos it is
	the.which = (function() {
		//posessive
		if (the.word.match(/'s$/)) {
			return parts_of_speech['NNO']
		}
		//noun-gerund
		if (the.word.match(/..ing$/)) {
			return parts_of_speech['NNG']
		}
		//personal pronoun
		if (prps[the.word]) {
			return parts_of_speech['PRP']
		}
		//proper nouns
		var first = the.word.substr(0, 1)
		if (first.toLowerCase() != first) {
			if (the.is_acronym) {
				return parts_of_speech['NNPA']
			}
			if (the.is_plural) {
				return parts_of_speech['NNPS']
			}
			return parts_of_speech['NNP']
		}
		//plural
		if (the.is_plural) {
			return parts_of_speech['NNS']
		}
		//generic
		return parts_of_speech['NN']
	})()


	return the;
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = Noun;
}


// console.log(nouns.conjugate('farmhouse'))
// console.log(new Noun("FBI").is_acronym)
// console.log(new Noun("FBI").which)
// console.log(new Noun("kitchen's").which)
// console.log(new Noun("he").which)
// console.log(new Noun("Flanders").which)
// console.log(new Noun("walking").which)
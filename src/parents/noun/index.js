var Noun = function(str, next, last, token) {
	var the = this
	the.word = str || '';
	the.next = next
	the.last = last

	if (typeof module !== "undefined" && module.exports) {
		parts_of_speech = require("../../data/parts_of_speech")
		inflect = require("./conjugate/inflect")
		indefinite_article = require("./indefinite_article/indefinite_article")
		// is_entity = require("./ner/is_entity")
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


	the.is_entity= (function(){
		if(!token){
			return false
		}
		var blacklist = {
	    "itself": 1,
	    "west": 1,
	    "western": 1,
	    "east": 1,
	    "eastern": 1,
	    "north": 1,
	    "northern": 1,
	    "south": 1,
	    "southern": 1,
	    "the": 1,
	    "one": 1,
	    "your": 1,
	    "my": 1,
	    "today": 1,
	    "yesterday": 1,
	    "tomorrow": 1,
	    "era": 1,
	    "century": 1,
	    "it":1
	  }
	  //prepositions
	  if(prps[token.normalised]){
	  	return false
	  }
	  //blacklist
	  if(blacklist[token.normalised]){
	  	return false
	  }
	  //discredit specific nouns forms
	  if(token.pos){
	   if(token.pos.tag=="NNA"){//eg. 'singer'
	  		return false
			}
	   if(token.pos.tag=="NNO"){//eg. "spencer's"
	  		return false
			}
	   if(token.pos.tag=="NNG"){//eg. 'walking'
	  		return false
			}
	   if(token.pos.tag=="NNP"){//yes! eg. 'Edinburough'
	  		// return true
			}
	  }
	  //distinct capital is very good signal
		if(token.special_capitalised){
			return true
		}
	  //multiple-word nouns are very good signal
		if(token.normalised.match(/ /)){
			return true
		}
	  //if it has an abbreviation, like 'business ltd.'
		if(token.normalised.match(/\./)){
			return true
		}
	  //acronyms are a-ok
		if(the.is_acronym){
			return true
		}
		//else, be conservative
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


// console.log(new Noun('farmhouse').is_entity)
// console.log(new Noun("FBI").is_acronym)
// console.log(new Noun("FBI").which)
// console.log(new Noun("kitchen's").which)
// console.log(new Noun("he").which)
// console.log(new Noun("Flanders").which)
// console.log(new Noun("walking").which)
// console.log(new Noun("women").singularize())
var pos = (function() {


	if (typeof module !== "undefined" && module.exports) {
		var tokenizer = require("./tokenization/tokenize").tokenize;
		var parts_of_speech = require("./data/parts_of_speech")
		var word_rules = require("./data/word_rules").rules
		var lexicon = require("./data/lexicon")
		var sentence_rules = require("./data/sentence_rules")
		var wordnet_suffixes = require("./data/unambiguous_suffixes").data
	}


	var lexicon_pass = function(w) {
		if (lexicon[w]) {
			return parts_of_speech[lexicon[w]]
		}
	}
	var rules_pass = function(w) {
		for (var i = 0; i < word_rules.length; i++) {
			if (w.match(word_rules[i].reg)) {
				return parts_of_speech[word_rules[i].pos]
			}
		}
	}



	var main = function(text, options) {

		var sentences = tokenizer(text);
		sentences.forEach(function(sentence) {

			//first pass
			sentence.tokens = sentence.tokens.map(function(token) {
				//known words list
				var lex = lexicon_pass(token.normalised)
				if (lex) {
					token.pos = lex;
					token.pos_reason = "lexicon"
					return token
				}
				// suffix pos signals from wordnet
				var len = token.normalised.length
				if (len > 4) {
					var suffix = token.normalised.substr(len - 4, len - 1)
					if (wordnet_suffixes[suffix]) {
						token.pos = parts_of_speech[wordnet_suffixes[suffix]]
						token.pos_reason = "wordnet suffix"
						return token
					}
				}

				// suffix regexes for words
				var r = rules_pass(token.normalised);
				if (r) {
					token.pos = r;
					token.pos_reason = "regex suffix"
					return token
				}

				//it has a capital and isn't first word
				if (!token.start && token.capitalised) {
					token.pos = parts_of_speech['NN']
					token.pos_reason = "capitalised"
					return token
				}
				//see if it's a number
				if (parseFloat(token.normalised)) {
					token.pos = parts_of_speech['CD']
					token.pos_reason = "parsefloat"
					return token
				}

				return token
			})

			//second pass, suggest verb or noun phrase after their signals
			var need = null
			var reason = ''
			sentence.tokens = sentence.tokens.map(function(token) {
				//suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
				if (token.pos && (token.pos.tag == "PRP" || token.pos.tag == "MD")) {
					need = 'VB'
					reason = token.pos.tag
				}
				//suggest noun after determiners (a|the), posessive pronouns (her|my|its)
				if (token.pos && (token.pos.tag == "DT" || token.pos.tag == "PP")) {
					need = 'NN'
					reason = token.pos.tag
				}
				if (need && !token.pos) {
					token.pos = parts_of_speech[need]
					token.pos_reason = "second_pass signal from " + reason
				}
				if (need == 'VB' && token.pos.parent == 'verb') {
					need = null
				}
				if (need == 'NN' && token.pos.parent == 'noun') {
					need = null
				}
				return token
			})

			//third pass, identify missing clauses, fallback to noun
			var has = {}
			sentence.tokens.forEach(function(token) {
				if (token.pos) {
					has[token.pos.parent] = true
				}
			})
			sentence.tokens = sentence.tokens.map(function(token, i) {
				if (!token.pos) {
					//if there no verb in the sentence, there needs to be.
					if (!has['verb']) {
						token.pos = parts_of_speech['VB']
						token.pos_reason = "need one verb"
						return token
					}
					//if it's after an adverb, it's not a noun
					var last = sentence.tokens[i - 1]
					if (last && last.pos && last.pos.tag == "RB") {
						token.pos = parts_of_speech['VB']
						token.pos_reason = "after an adverb"
						return token
					}
					//fallback to a noun
					token.pos = parts_of_speech['NN']
					token.pos_reason = "noun fallback"
				}

				return token
			})




		})
		return sentences

	}

	if (typeof module !== "undefined" && module.exports) {
		exports.pos = main;
		exports.parts_of_speech = parts_of_speech
	}
	return main
})()





var merge_tokens = function(a, b) {
	a.text += " " + b.text
	a.normalised += " " + b.normalised
	a.pos_reason += "|" + b.pos_reason
	a.start = a.start || b.start
	a.capitalised = a.capitalised || b.capitalised
	a.end = a.end || b.end
	return a
}

//combine adjacent neighbours
var combine = function(sentence) {
	var arr = sentence.tokens
	var better = []
	for (var i = 0; i <= arr.length; i++) {
		var next = arr[i + 1]
		if (arr[i] && next && arr[i].pos.tag == next.pos.tag) {
			arr[i] = merge_tokens(arr[i], arr[i + 1])
			arr[i + 1] = null
		}
		better.push(arr[i])
	}
	sentence.tokens = better.filter(function(r) {
		return r
	})
	return sentence
}



	function render(arr) {
		arr.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				console.log(token.text + "   " + (token.pos || {}).tag + '   (' + token.pos_reason + ')')
			})
		})
	}

	// fun = pos("Geroge Clooney walked, quietly into a bank. It was cold.")
	// fun = pos("Geroge Clooney is cool.")
	// fun = pos("atleast i'm better than geroge clooney")
	// fun = pos("i paid five fifty")//combine numbers
	// fun = pos("he was a gorky asdf")//second pass signal
	// fun = pos("Joe quiitly alks the asdf") //"need one verb"
	// fun = pos("Joe would alks the asdf") //"second pass modal"
	// fun = pos("he alks the asdf") //"second_pass signal from PRP"
	// fun = pos("joe is fun and quickly alks") //after adverb
	// fun = pos("joe is 9") //number
	// fun = pos("joe is real, nice") //number
	// x = pos("If the debts are repaid, it could clear the way for Soviet bonds to be sold in the U.S.")
	// render(x)
	// sentence = fun[0]
	// sentence = combine(sentence)
	// console.log(JSON.stringify(sentence, null, 2));
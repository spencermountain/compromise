var pos = (function() {


	if (typeof module !== "undefined" && module.exports) {
		var tokenizer = require("../tokenization/tokenize").tokenize;
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

				return token
			})


			//second pass
			sentence.tokens = sentence.tokens.map(function(token) {
				if (!token.pos) {

					//fallback to a noun
					// token.pos = {}
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

// x = pos("Geroge Clooney walked, quietly into a bank. It was cold.")
// x = pos("If the debts are repaid, it could clear the way for Soviet bonds to be sold in the U.S.")
// render(x)
// console.log(JSON.stringify(x, null, 2));



	function render(arr) {
		arr.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				console.log(token.text + "   " + (token.pos || {}).tag + '   (' + token.pos_reason + ')')
			})
		})
	}
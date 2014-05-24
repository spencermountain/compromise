var pos = (function() {


	if (typeof module !== "undefined" && module.exports) {
		tokenize = require("./methods/tokenization/tokenize").tokenize;
		parts_of_speech = require("./data/parts_of_speech")
		word_rules = require("./data/word_rules")
		lexicon = require("./data/lexicon")
		wordnet_suffixes = require("./data/unambiguous_suffixes")
		Sentence = require("./sentence")
		parents = require("./parents/parents")
	}

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
	var combine_tags = function(sentence) {
		var arr = sentence.tokens
		var better = []
		for (var i = 0; i <= arr.length; i++) {
			var next = arr[i + 1]
			if (arr[i] && next) {
				//'joe smith' are both NN
				if (arr[i].pos.tag == next.pos.tag && arr[i].punctuated != true) {
					arr[i] = merge_tokens(arr[i], arr[i + 1])
					arr[i + 1] = null
				}
				//'will walk' -> future-tense verb
				else if (arr[i].normalised == "will" && next.pos.parent == "verb") {
					arr[i] = merge_tokens(arr[i], arr[i + 1])
					arr[i + 1] = null
				}
			}
			better.push(arr[i])
		}
		sentence.tokens = better.filter(function(r) {
			return r
		})
		return sentence
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


	var fourth_pass = function(token, i, sentence) {
		var last = sentence.tokens[i - 1]
		var next = sentence.tokens[i + 1]
		//if it's before a modal verb, it's a noun -> lkjsdf would
		if (next && token.pos.parent != "noun" && next.pos.tag == "MD") {
			token.pos = parts_of_speech['NN']
			token.pos_reason = "before a modal"
		}
		//if it's after an adverb, it's not a noun -> quickly acked
		//support form 'atleast he is..'
		if (last && token.pos.parent == "noun" && last.pos.tag == "RB" && !last.start) {
			token.pos = parts_of_speech['VB']
			token.pos_reason = "after an adverb"
		}
		//no consecutive, unpunctuated adjectives -> real good
		if (next && token.pos.parent == "adjective" && next.pos.parent == "adjective" && !token.punctuated) {
			token.pos = parts_of_speech['RB']
			token.pos_reason = "consecutive_adjectives"
		}
		//if it's after a determiner, it's not a verb -> the walk
		if (last && token.pos.parent == "verb" && last.pos.tag == "DT") {
			token.pos = parts_of_speech['NN']
			token.pos_reason = "determiner-verb"
		}
		//copulas are followed by a determiner ("are a .."), or an adjective ("are good")
		//(we would have gotten the adverb already)
		if (last && last.pos.tag == "CP" && token.pos.tag != "DT" && token.pos.tag != "RB" && token.pos.parent != "adjective" && token.pos.parent != "value") {
			token.pos = parts_of_speech['JJ']
			token.pos_reason = "copula-adjective"
		}
		//copula, adverb, verb -> copula adverb adjective -> is very lkjsdf
		if (last && next && last.pos.tag == "CP" && token.pos.tag == "RB" && next.pos.parent == "verb") {
			sentence.tokens[i + 1].pos = parts_of_speech['JJ']
			sentence.tokens[i + 1].pos_reason = "copula-adverb-adjective"
		}

		return token
	}

	//add a 'quiet' token for contractions so we can represent their grammar
	var handle_contractions = function(arr) {
		var contractions = {
			"i'd": ["i", "would"],
			"she'd": ["she", "would"],
			"he'd": ["he", "would"],
			"they'd": ["they", "would"],
			"we'd": ["we", "would"],
			"i'll": ["i", "will"],
			"she'll": ["she", "will"],
			"he'll": ["he", "will"],
			"they'll": ["they", "will"],
			"we'll": ["we", "will"],
			"i've": ["i", "have"],
			"they've": ["they", "have"],
			"we've": ["we", "have"],
			"should've": ["should", "have"],
			"would've": ["would", "have"],
			"could've": ["could", "have"],
			"must've": ["must", "have"],
			"i'm": ["i", "am"],
			"he's": ["he", "is"],
			"she's": ["she", "is"],
			"we're": ["we", "are"],
			"they're": ["they", "are"],
		}
		for (var i = 0; i < arr.length; i++) {
			if (contractions[arr[i].normalised || null]) {
				var before = arr.slice(0, i)
				var after = arr.slice(i + 1, arr.length)
				var fix = [{
					text: "",
					normalised: contractions[arr[i].normalised][0],
					start: arr[i].start
				}, {
					text: arr[i].text,
					normalised: contractions[arr[i].normalised][1],
					start: undefined
				}]
				arr = before.concat(fix)
				arr = arr.concat(after)
				return handle_contractions(arr)
			}
		}
		return arr
	}


	////////////
	//////////
	var main = function(text, options) {
		options = options || {}

		var sentences = tokenize(text);
		sentences.forEach(function(sentence) {

			//smart handling of contractions
			sentence.tokens = handle_contractions(sentence.tokens)

			//first pass, word-level clues
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

			//second pass, set verb or noun phrases after their signals
			var need = null
			var reason = ''
			sentence.tokens = sentence.tokens.map(function(token, i) {
				var next = sentence.tokens[i + 1]
				var prev = sentence.tokens[i - 1]
				if (token.pos) {
					//suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
					if (token.pos.tag == "PRP" || token.pos.tag == "MD") {
						need = 'VB'
						reason = token.pos.name
					}
					//suggest noun after determiners (a|the), posessive pronouns (her|my|its)
					if (token.pos.tag == "DT" || token.pos.tag == "PP") {
						need = 'NN'
						reason = token.pos.name
					}

				}
				if (need && !token.pos) {
					token.pos = parts_of_speech[need]
					token.pos_reason = "signal from " + reason
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
						has['verb'] = true
						return token
					}

					//fallback to a noun
					token.pos = parts_of_speech['NN']
					token.pos_reason = "noun fallback"
				}
				return token
			})

			//fourth pass, error correction
			sentence.tokens = sentence.tokens.map(function(token, i) {
				return fourth_pass(token, i, sentence)
			})
			//run the fourth-pass again!
			sentence.tokens = sentence.tokens.map(function(token, i) {
				return fourth_pass(token, i, sentence)
			})

		})

		//combine neighbours
		if (!options.dont_combine) {
			sentences = sentences.map(function(s) {
				return combine_tags(s)
			})
		}

		//add analysis on each token
		sentences = sentences.map(function(s) {
			s.tokens = s.tokens.map(function(token, i) {
				var last_token = s.tokens[i - 1] || null
				var next_token = s.tokens[i + 1] || null
				token.analysis = parents[token.pos.parent](token.normalised, next_token, last_token)
				//change to the more accurate version of the pos
				if (token.analysis.which) {
					token.pos = token.analysis.which
				}
				return token
			})
			return s
		})

		//make them Sentence objects
		return sentences.map(function(s) {
			return new Sentence(s.tokens)
		})

	}


	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()





	function render(arr) {
		arr.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				console.log(token.normalised + "   " + (token.pos || {}).tag + '   (' + token.pos_reason + ')')
			})
		})
	}

	function analysis(arr) {
		arr.forEach(function(sentence) {
			sentence.tokens.forEach(function(token) {
				console.log(token.normalised + "   " + token.pos.tag + "  " + JSON.stringify(token.analysis))
			})
		})
	}

	// fun = pos("Geroge Clooney walked, quietly into a bank. It was cold.")
	// fun = pos("Geroge Clooney is cool.")
	// fun = pos("i paid five fifty") //combine numbers
	// fun = pos("he was a gorky asdf") //second pass signal
	// fun = pos("Joe quiitly alks the asdf") //"need one verb"
	// fun = pos("Joe would alks the asdf") //"second pass modal"
	// fun = pos("he blalks the asdf") //"second_pass signal from PRP"
	// fun = pos("joe is fun and quickly blalks") //after adverb
	// fun = pos("he went on the walk") //determiner-verb
	// fun = pos("he is very walk") //copula-adverb-adjective
	// fun = pos("he is very lkajsdf") //two error-corrections (copula-adverb-adjective)
	// fun = pos("joe is 9") //number
	// fun = pos("joe is real pretty") //consecutive adjectives to adverb
	// fun = pos("joe is real, pretty") //don't combine over a comma
	// fun = pos("walk should walk") //before a modal

	//contractions
	// fun = pos("atleast i'm better than geroge clooney")//i'm
	// fun = pos("i bet they'd blalk") //contraction
	// fun = pos("i'm the best") //contraction
	// fun = pos("i'd have said he'd go") //double contractions
	// fun = pos("also is trying to combine their latest") //
	// fun = pos("i agree with tom hanks and nancy kerrigan") //
	// fun = pos("joe walks quickly to the park") //
	// fun = pos("joe will walk to the park") //
	// fun = pos("He has also produced a documentary") //
	// fun = pos("She subsequently married her fourth husband, Jack Bond, a hairdresser; the marriage ended in 1994.") //
	// fun = pos("joe will not walk")[0].tokens //
	// fun = pos("joe won't walk")[0].tokens //
	// fun = pos("joe is not swimming to the bank")[0].tokens //
	// console.log(fun[1])
	// render(fun)
	// analysis(fun)
	// console.log(JSON.stringify(fun[0], null, 2));
	// console.log(fun[0].to_past().text())
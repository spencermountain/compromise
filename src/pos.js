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

	//combine adjacent neighbours, and special cases
	var combine_tags = function(sentence) {
		var arr = sentence.tokens
		var better = []
		for (var i = 0; i <= arr.length; i++) {
			var next = arr[i + 1]
			if (arr[i] && next) {
				//'joe smith' are both NN
				if (arr[i].pos.tag == next.pos.tag && arr[i].punctuated != true && arr[i].capitalised==next.capitalised) {
					arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
					arr[i] = null
				}
				//'will walk' -> future-tense verb
				else if (arr[i].normalised == "will" && next.pos.parent == "verb") {
					arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
					arr[i] = null
				}
				//'hundred and fifty'
				else if (arr[i].pos.tag == "CD" && next.normalised == "and" && arr[i + 2] && arr[i + 2].pos.tag == "CD") {
					arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
					arr[i] = null
				}
				//'toronto fun festival'
				// else if (arr[i].pos.tag == "NN" && next.pos.tag == "JJ" && arr[i + 2] && arr[i + 2].pos.tag == "NN") {
					// arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
					// arr[i] = null
				// }
				//capitals surrounding a preposition  'United States of America'
				else if (i>0 && arr[i].capitalised && next.normalised=="of" && arr[i+2] && arr[i+2].capitalised) {
					arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
					arr[i] = null
					arr[i + 2] = merge_tokens(arr[i+1], arr[i + 2])
					arr[i + 1] = null
				}
				//capitals surrounding two prepositions  'Phantom of the Opera'
				else if (arr[i].capitalised && next.normalised=="of" && arr[i+2] && arr[i+2].pos.tag=="DT" && arr[i+3] && arr[i+3].capitalised) {
					arr[i + 1] = merge_tokens(arr[i], arr[i + 1])
					arr[i] = null
					arr[i + 2] = merge_tokens(arr[i+1], arr[i + 2])
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
		//try to match it without a prefix - eg. outworked -> worked
		if(w.match(/^(over|under|out|-|un|re|en).{4}/)){
			var attempt=w.replace(/^(over|under|out|.*?-|un|re|en)/, '')
			return parts_of_speech[lexicon[attempt]]
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
		var strong_determiners= {
			"the":1,
			"a":1,
			"an":1,
		}
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
		if (last && token.pos.parent == "verb" && strong_determiners[last.pos.normalised] && token.pos.tag!="CP") {
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
		// the city [verb] him.
		if(next && next.pos.tag=="PRP" && token.pos.parent=="noun" && !token.punctuated){
			token.pos=parts_of_speech['VB']
			token.pos_reason = "before a [him|her|it]"
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
			"cannot": ["can", "not"],
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


				//it has a capital and isn't first word
				if (!token.start && token.capitalised) {
					token.pos = parts_of_speech['NN']
					token.pos_reason = "capitalised"
					return token
				}

				//known words list
				var lex = lexicon_pass(token.normalised)
				if (lex) {
					token.pos = lex;
					token.pos_reason = "lexicon"
					return token
				}
				//handle punctuation like ' -- '
				if(!token.normalised){
					token.pos= parts_of_speech['UH']
					token.pos_reason= "wordless_string"
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

				//see if it's a number
				if (parseFloat(token.normalised)) {
					token.pos = parts_of_speech['CD']
					token.pos_reason = "parsefloat"
					return token
				}

				return token
			})

			//second pass, wrangle results a bit
			sentence.tokens = sentence.tokens.map(function(token, i) {
				var next = sentence.tokens[i + 1]
				var prev = sentence.tokens[i - 1]
				//set ambiguous 'ed' endings as either verb/adjective
				if (token.normalised.match(/.ed$/)) {
					token.pos = parts_of_speech['VB']
					token.pos_reason = "ed"
				}
				return token
			})

			//third pass, seek verb or noun phrases after their signals
			var need = null
			var reason = ''
			sentence.tokens = sentence.tokens.map(function(token, i) {
				var next = sentence.tokens[i + 1]
				var prev = sentence.tokens[i - 1]
				if (token.pos) {
					//suggest noun after some determiners (a|the), posessive pronouns (her|my|its)
					if (token.normalised=="the" || token.normalised=="a" || token.normalised=="an" || token.pos.tag == "PP") {
						need = 'NN'
						reason = token.pos.name
						return token //proceed
					}
					//suggest verb after personal pronouns (he|she|they), modal verbs (would|could|should)
					if (token.pos.tag == "PRP" || token.pos.tag == "MD") {
						need = 'VB'
						reason = token.pos.name
						return token //proceed
					}

				}
				//satisfy need on a conflict, and fix a likely error
				if(token.pos){
					if(need=="VB" && token.pos.parent=="noun"){
						token.pos = parts_of_speech[need]
						token.pos_reason = "signal from " + reason
						need=null
					}
					if(need=="NN" && token.pos.parent=="verb"){
						token.pos = parts_of_speech[need]
						token.pos_reason = "signal from " + reason
						need=null
					}
				}
				//satisfy need with an unknown pos
				if (need && !token.pos ) {
					token.pos = parts_of_speech[need]
					token.pos_reason = "signal from " + reason
					need= null
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
					// if (!has['verb']) {
					// 	token.pos = parts_of_speech['VB']
					// 	token.pos_reason = "need one verb"
					// 	has['verb'] = true
					// 	return token
					// }

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
				token.analysis = parents[token.pos.parent](token.normalised, next_token, last_token, token)
				//change to the more accurate version of the pos
				if (token.analysis.which) {
					// token.pos = token.analysis.which
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
	// fun = pos("it was one hundred and fifty five thousand people") //combine over and
	// fun = pos("the toronto international festival") //combine over and

	// fun = pos("they were even weaker he said") //better adjectives
	// fun = pos("new") //better adjectives
	// console.log(fun[0].tokens[0])
	// render(fun)
	// analysis(fun)
	// console.log(JSON.stringify(fun[0], null, 2));
	// console.log(fun[0].to_past().text())

	// fun = pos("That malignant desire is in the very heart of those who share (this order's) benefits.", {}) //punctuation bug
	// fun = pos("He’s like his character Oishi.", {}) //dont combine non-capitals with capitals
	// fun = pos("one which is justly measured", {}) //dont' overwrite existing lexicon words in conjugation
	// fun = pos("to that which - it is", {}) //handle wordless strings
	// fun = pos("Robert Tucker for one has rightly emphasized", {}) //combine capitals at start
	// fun = pos(" the libertarian thought of The Enlightenment.", {}) //precedence to capital signal
	// fun = pos("he said YOU ARE VERY NICE then left", {}) //handle all-caps
	// fun = pos("he presents an anarchist vision that is appropriate", {}) //
	// fun = pos("The latter can face any visible antagonism.", {}) //

	// fun = pos("He does not perform it with truly human energies", {}) //issue with needs model
	// fun = pos("he was by far the worst", {}) //support pos for multiples
	// fun = pos("in the United States of America", {}) //combine captial of capital
	// fun = pos("the Phantom of the Opera", {}) //two combines
	// fun = pos("They’re taking risks", {}) //normalise punctuation
	// fun = pos("the school asdf him", {}) //before him|her"it
	// fun = pos("the disgruntled worker", {}) //
	// console.log(fun[0])
	// render(fun)



	//  __ above[IN] -> noun?

var tokenize = (function() {


	if (typeof module !== "undefined" && module.exports) {
		var sentence_parser = require("./sentence").sentences
		var multiples = require("./data/multiples").multiples
	}

	var normalise = function(str) {
		str = str.toLowerCase()
		str = str.replace(/[,\.!:;\?]/, '')
		return str
	}

	var sentence_type = function(sentence) {
		if (sentence.match(/\?$/)) {
			return "question"
		} else {
			return "statement"
		}
	}

	var combine_multiples = function(arr) {
		var better = []
		for (var i = 0; i < arr.length; i++) {
			for (var o = 0; o < multiples.length; o++) {
				if (arr[i + 1] && arr[i] == multiples[o][0] && normalise(arr[i + 1]) == multiples[o][1]) { //
					//we have a match
					arr[i] = arr[i] + ' ' + arr[i + 1]
					arr[i + 1] = null
					break
				}
			}
			better.push(arr[i])
		}
		return better.filter(function(w) {
			return w
		})
	}

	var main = function(str) {
		var sentences = sentence_parser(str)
		return sentences.map(function(sentence) {
			var arr = sentence.split(' ');
			arr = combine_multiples(arr)
			var tokens = arr.map(function(w, i) {
				return {
					text: w,
					normalised: normalise(w),
					capitalised: (i > 0 && w.match(/^[A-Z][a-z]/) != null) || undefined,
					punctuated: (w.match(/[,;:]$/) != null) || undefined,
					end: (i == (arr.length - 1)) || undefined,
					start: (i == 0) || undefined
				}
			})
			return {
				sentence: sentence,
				tokens: tokens,
				type: sentence_type(sentence)
			}
		})
	}

	if (typeof module !== "undefined" && module.exports) {
		exports.tokenize = main;
	}
	return main
})()

// a = tokenize("Geroge Clooney walked, quietly into a bank of course. It was cold.")
// console.log(JSON.stringify(a, null, 2));



var contractions = function(text) {
	//undo contractions
	if (text.match(/\b(he's|she's|it's)\b/)) {
		text = text.replace(/([^ ])['’]s /ig, '$1 is ');
	}
	text = text.replace(/([^ ])['’]ve /ig, '$1 have ');
	text = text.replace(/([^ ])['’]re /ig, '$1 are ');
	text = text.replace(/([^ ])['’]d /ig, '$1 would ');
	text = text.replace(/([^ ])['’]ll /ig, '$1 will ');
	text = text.replace(/([^ ])n['’]t /ig, '$1 not ');
	text = text.replace(/\bi'm /ig, 'I am ');
	return text
}

// console.log(contractions("i think he's better"))
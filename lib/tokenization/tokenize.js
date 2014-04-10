var tokenize = (function() {


	if (typeof module !== "undefined" && module.exports) {
		var sentence_parser = require("./sentence").sentences
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

	var main = function(str) {
		var sentences = sentence_parser(str)
		return sentences.map(function(sentence) {
			var arr = sentence.split(' ')
			var tokens = arr.map(function(w, i) {
				return {
					text: w,
					normalised: normalise(w),
					capitalised: (i > 0 && w.match(/^[A-Z][a-z]/) != null) || undefined,
					punctuated: (w.match(/[,;:]$/) != null) || undefined,
					end: i == (arr.length - 1) || undefined
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

// a = tokenize("Geroge Clooney walked, quietly into a bank. It was cold.")
// console.log(JSON.stringify(a, null, 2));
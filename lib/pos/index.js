var pos = (function() {


	if (typeof module !== "undefined" && module.exports) {
		var tokenizer = require("../tokenization/tokenize").tokenize;
		var parts_of_speech = require("./data/parts_of_speech")
		var word_rules = require("./data/word_rules").rules
		var lexicon = require("./data/lexicon")
		var sentence_rules = require("./data/sentence_rules")
	}


	var main = function(text, options) {

		var sentences = tokenizer(text)
		return sentences

	}

	if (typeof module !== "undefined" && module.exports) {
		exports.pos = main;
	}
	return main
})()

// x = pos("Geroge Clooney walked, quietly into a bank. It was cold.")
// console.log(JSON.stringify(x, null, 2));
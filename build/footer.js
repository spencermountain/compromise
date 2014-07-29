///
//footer
//
var main = {

	noun: parents.noun,
	adjective: parents.adjective,
	verb: parents.verb,
	adverb: parents.adverb,
	value: parents.value,

	sentences: sentence_parser,
	ngram: ngram,
	tokenize: tokenize,
	americanize: americanize,
	britishize: britishize,
	syllables: syllables,
	normalize: normalize.normalize,
	denormalize: normalize.denormalize,
	pos: pos,
	spot: spot,

	word: function(str, options){
	  return nlp.pos(str, options)[0].tokens[0]
	}

	// tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()
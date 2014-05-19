///
//footer
//
var main = {

	noun: Noun,
	adjective: Adjective,
	verb: Verb,
	adverb: Adverb,
	value: Value,

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
	// tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()
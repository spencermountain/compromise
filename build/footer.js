///
//footer
//
var main = {
	sentences: sentences,
	ngram: ngram,
	// americanize: americanize,
	// britishize: britishize,
	// singularize: singularize,
	// pluralize: pluralize,
	// syllables: syllables,
	// adj_to_noun: adj_to_noun,
	// dates: dates,
	// tag: tag,
	// spot: spot,
	// tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()
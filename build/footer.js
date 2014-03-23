///
//footer
//
var main = {
	sentences: sentences,
	ngram: ngram,
	americanize: americanize,
	britishize: britishize,
	singularize: inflect.singularize,
	pluralize: inflect.pluralize,
	syllables: syllables,
	adj_to_noun: adj_to_noun,
	dates: date_extractor,
	tag: pos,
	// spot: spot,
	// tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()
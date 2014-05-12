///
//footer
//
var main = {

	noun: {
		singularize: singularize,
		pluralize: pluralize,
		article: indefinite_article
	},

	adjective: {
		to_noun: to_noun,
		to_adverb: to_adverb,
	},

	verb: {
		conjugate: conjugate
	},

	adverb: {
		to_adjective: to_adjective
	},

	sentences: sentences,
	ngram: ngram,
	americanize: americanize,
	britishize: britishize,
	syllables: syllables,
	dates: dates,
	to_number: to_number
	pos: pos,
	normalize: normalize.normalize,
	denormalize: normalize.denormalize,
	spot: function(text, options) {
		var tags = pos(text, options)
		return spot(tags, options)
	},
	tests: tests,
}

if (typeof module !== "undefined" && module.exports) {
	exports.npm = main;
}
return main
})()
//built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// mainly,
// ise <-> ize
// our <-> or
// re <-> er
// ise <-> ice
// xion <-> tion
// logue <-> log
// ae <-> e
// eing -> ing
// illful -> ilful


var americanize = (function() {

	var main = function(str) {

		var patterns = [
			// ise -> ize
			{
				reg: /[^aeiou]([iy])s(e|ed|es|ing)?$/,
				repl: '$1z$2',
				exceptions: []
			},
			// our -> or
			{
				reg: /(..)our(ly|y|ite)?$/,
				repl: '$1or$2',
				exceptions: []
			},
			// re -> er
			{
				reg: /([^cdnv])re(s)?$/,
				repl: '$1er$2',
				exceptions: []
			},
			// xion -> tion
			{
				reg: /([aeiou])xion([ed])?$/,
				repl: '$1tion$2',
				exceptions: []
			},
			//logue -> log
			{
				reg: /logue$/,
				repl: 'log',
				exceptions: []
			},
			// ae -> e
			{
				reg: /([o|a])e/,
				repl: 'e',
				exceptions: []
			},
			//eing -> ing
			{
				reg: /e(ing|able)$/,
				repl: '$1',
				exceptions: []
			},
			// illful -> ilful
			{
				reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
				repl: '$1l$2',
				exceptions: []
			},
		]

		for (var i = 0; i < patterns.length; i++) {
			if (str.match(patterns[i].reg)) {
				//check for exceptions
				for (var o in patterns[i].exceptions) {
					if (str.match(patterns[i].exceptions[o])) {
						return str
					}
				}
				return str.replace(patterns[i].reg, patterns[i].repl)
			}
		}


		return str
	}

	if (typeof module !== "undefined" && module.exports) {
		exports.americanize = main;
	}
	return main
})()



arr = [
	"synthesise",
	"synthesised",
	"synthesises",
	"synthesising",
	"analyse",
	"analysed",
	"analysing",

	"poise",
	"poised",
	"colour",
	"honour",
	"neighbour",
	"neighbourly",
	"savour",
	"savourly",
	"favour",
	"favourite",
	"theatre",
	"theatres",

	"entendre",
	"genre",
	"mediocre",
	"acre",
	"acres",
	"analogue",
	"homologue",
	"anaemia",
	"oestrogen",
	"ageing",
	"useable",
	"programme",
	"tonne",
	"counsellor",
	"traveller",

	"labelled",
	"cancelled",
	"quarrelled",

	"signalling",
	"modelling",
	"travelling",

	"willful",
	"filling",


]
// arr.forEach(function(w) {
// 	console.log(americanize(w))
// })
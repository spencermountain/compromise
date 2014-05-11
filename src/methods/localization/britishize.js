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




var britishize = (function() {

	var main = function(str) {

		var patterns = [
			// ise -> ize
			{
				reg: /([^aeiou][iy])z(e|ed|es|ing)?$/,
				repl: '$1s$2',
				exceptions: []
			},
			// our -> or
			// {
			// 	reg: /(..)our(ly|y|ite)?$/,
			// 	repl: '$1or$2',
			// 	exceptions: []
			// },
			// re -> er
			// {
			// 	reg: /([^cdnv])re(s)?$/,
			// 	repl: '$1er$2',
			// 	exceptions: []
			// },
			// xion -> tion
			// {
			// 	reg: /([aeiou])xion([ed])?$/,
			// 	repl: '$1tion$2',
			// 	exceptions: []
			// },
			//logue -> log
			// {
			// 	reg: /logue$/,
			// 	repl: 'log',
			// 	exceptions: []
			// },
			// ae -> e
			// {
			// 	reg: /([o|a])e/,
			// 	repl: 'e',
			// 	exceptions: []
			// },
			//eing -> ing
			// {
			// 	reg: /e(ing|able)$/,
			// 	repl: '$1',
			// 	exceptions: []
			// },
			// illful -> ilful
			{
				reg: /([aeiou]+[^aeiou]+[aeiou]+)l(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
				repl: '$1ll$2',
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
		exports.britishize = main;
	}
	return main
})()






/////////////////
//////////
//////////////
var americanize = (function() {

	var main = function(str) {

		var patterns = [
			// ise -> ize
			{
				reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
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


// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")
// console.log(americanize("synthesises")=="synthesizes")
// console.log(americanize("synthesising")=="synthesizing")
// console.log(americanize("analyse")=="analyze")
// console.log(americanize("analysed")=="analyzed")
// console.log(americanize("analysing")=="analyzing")
// console.log(americanize("poise")=="poise")
// console.log(americanize("poised")=="poised")
// console.log(americanize("colour")=="color")
// console.log(americanize("honour")=="honor")
// console.log(americanize("neighbour")=="neighbor")
// console.log(americanize("neighbourly")=="neighborly")
// console.log(americanize("savour")=="savor")
// console.log(americanize("savourly")=="savorly")
// console.log(americanize("favour")=="favor")
// console.log(americanize("favourite")=="favorite")
// console.log(americanize("theatre")=="theater")
// console.log(americanize("theatres")=="theaters")
// console.log(americanize("entendre")=="entendre")
// console.log(americanize("genre")=="genre")
// console.log(americanize("mediocre")=="mediocre")
// console.log(americanize("acre")=="acre")
// console.log(americanize("acres")=="acres")
// console.log(americanize("analogue")=="analog")
// console.log(americanize("homologue")=="homolog")
// console.log(americanize("anaemia")=="anemia")
// console.log(americanize("oestrogen")=="estrogen")
// console.log(americanize("ageing")=="aging")
// console.log(americanize("useable")=="usable")
// console.log(americanize("programme")=="programme")
// console.log(americanize("tonne")=="tonne")
// console.log(americanize("counsellor")=="counselor")
// console.log(americanize("traveller")=="traveler")
// console.log(americanize("labelled")=="labeled")
// console.log(americanize("cancelled")=="canceled")
// console.log(americanize("quarrelled")=="quarreled")
// console.log(americanize("signalling")=="signaling")
// console.log(americanize("modelling")=="modeling")
// console.log(americanize("travelling")=="traveling")
// console.log(americanize("willful")=="willful")
// console.log(americanize("filling")=="filling")
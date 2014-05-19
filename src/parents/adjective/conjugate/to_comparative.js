//turn 'quick' into 'quickly'
var to_comparative = (function() {
	var main = function(str) {


		var irregulars = {
			"poor": "poorer",
			"pure": "purer",
			"brown": "browner",
			"orange": "oranger",
			"green": "greener",
			"yellow": "yellower",
			"red": "redder",
			"blue": "bluer",
			"black": "blacker",
			"white": "whiter",
			"wise": "wiser",
			"round": "rounder",
			"great": "greater",
			"quiet": "quieter",
			"quick": "quicker",
		}
		var dont = {
			"overweight": 1,
			"neat": 1
		}
		var transforms = [{
			reg: /y$/i,
			repl: 'ier',
		}, {
			reg: /([aeiou])t$/i,
			repl: '$1tter',
		}, {
			reg: /([aeou])de$/i,
			repl: '$1der',
		}, {
			reg: /nge$/i,
			repl: 'nger',
		}, ]
		var matches = [
			/ght$/,
			// /k$/,
			/nge$/,
			/ough$/,
			/ain$/,
			/uel$/,
			/[au]ll$/,
			/ow$/,
		]
		var not_matches = [
			/ary$/
		]

		if (dont[str]) {
			return null
		}
		if (irregulars[str]) {
			return irregulars[str]
		}

		for (var i = 0; i < not_matches.length; i++) {
			if (str.match(not_matches[i])) {
				return "more " + str
			}
		}

		for (var i = 0; i < transforms.length; i++) {
			if (str.match(transforms[i].reg)) {
				return str.replace(transforms[i].reg, transforms[i].repl)
			}
		}
		for (var i = 0; i < matches.length; i++) {
			if (str.match(matches[i])) {
				return str + "er"
			}
		}
		return "more " + str
	}
	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main;
})();



// console.log(to_comparative('dry'))
// console.log(to_comparative('cruel'))
// console.log(to_comparative('hot'))
// console.log(to_comparative('wide'))
// console.log(to_comparative('strange'))
// console.log(to_comparative('narrow'))
// console.log(to_comparative('dull'))
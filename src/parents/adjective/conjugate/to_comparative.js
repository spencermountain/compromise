//turn 'quick' into 'quickly'
var to_comparative = (function() {
	var main = function(str) {


		var irregulars = {
			"grey": "greyer",
			"gray": "grayer",
			"green": "greener",
			"yellow": "yellower",
			"red": "redder",
			"good": "better",
			"well": "better",
		}
		var dos = {
			"black": 1,
			"poor": 1,
			"brown": 1,
			"pure": 1,
			"orange": 1,
			"blue": 1,
			"white": 1,
			"wise": 1,
			"large": 1,
			"simple": 1,
			"nice": 1,
			"round": 1,
			"great": 1,
			"quiet": 1,
			"quick": 1,
			"weak": 1,
			"clear": 1,
			"firm": 1,
			"young": 1,
			"wide": 1,
			"hard": 1,
			"brave": 1,
			"cool": 1,
			"fair": 1,
			"fresh": 1,
			"grand": 1,
			"sharp": 1,
			"soft": 1,
			"stiff": 1,
			"thick": 1,
			"thin": 1,
			"warm": 1,
			"wild": 1,
			"new": 1,
			"sweet": 1,

			"formal": 1,
			"raw": 1,
			"weird": 1,
			"broad": 1,
			"fast": 1,
			"glad": 1,
			"odd": 1,
			"mad": 1,
			"strict": 1,
			"tired": 1,
			"solid": 1,
			"smooth": 1,
			"sad": 1,
			"rich": 1,
			"fine": 1,
			"extreme": 1,
			"rare": 1,
			"safe": 1,
			"mature": 1,
			"lame": 1,
			"feeble": 1,
			"true": 1,
			"free": 1,
			"late": 1,
			"clean": 1,
			"short": 1,
			"high": 1,
			"dark": 1,

		}
		var dont = {
			"overweight": 1,
			"neat": 1,
			"main": 1,
			"nearby": 1,
			"asleep": 1,
			"weekly": 1,
			"secret": 1,
			"certain": 1,
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
			/nge$/,
			/ough$/,
			/ain$/,
			/uel$/,
			/[au]ll$/,
			/ow$/,
			/old$/,
			/oud$/,
			/e[ae]p$/,
		]
		var not_matches = [
			/ary$/,
			/ous$/,
		]

		if (dont[str]) {
			return null
		}
		if (dos[str]) {
			if (str.match(/e$/)) {
				return str + "r"
			} else {
				return str + "er"
			}
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
// console.log(to_comparative('weak'))
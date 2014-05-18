//turn 'quick' into 'quickest'
var to_superlative = (function() {
	var main = function(str) {


		var irregulars = {
			"nice": "nicest",
			"late": "latest",
			"hard": "hardest",
			"inner": "innermost",
			"outer": "outermost",
			"poor": "poorest",
			"new": "newest",
			"wise": "wisest",
			"warm": "warmest",
			"tame": "tamest",
			"sad": "saddest",
			"safe": "safest",
			"rich": "richest",
			"gross": "grossest",
			"fair": "fairest",
			"cool": "coolest",
			"quiet": "quietest",
			"sweet": "sweetest",
			"great": "greatest",
			"neat": "neatest",
			"quick": "quickest",
		}
		var dont = {
			"overweight": 1,
			"ready": 1,
		}
		var transforms = [{
			reg: /y$/i,
			repl: 'iest',
		}, {
			reg: /([aeiou])t$/i,
			repl: '$1ttest',
		}, {
			reg: /([aeou])de$/i,
			repl: '$1dest',
		}, {
			reg: /nge$/i,
			repl: 'ngest',
		}, ]
		var matches = [
			/ght$/,
			/nge$/,
			/ough$/,
			/ain$/,
			/uel$/,
			/[au]ll$/,
			/ow$/,
			/oud$/,
			/...p$/,
		]
		var not_matches = [
			/ary$/
		]

		if (dont[str]) {
			return "most " + str
		}
		if (irregulars[str]) {
			return irregulars[str]
		}

		for (var i = 0; i < not_matches.length; i++) {
			if (str.match(not_matches[i])) {
				return "most " + str
			}
		}

		for (var i = 0; i < transforms.length; i++) {
			if (str.match(transforms[i].reg)) {
				return str.replace(transforms[i].reg, transforms[i].repl)
			}
		}
		for (var i = 0; i < matches.length; i++) {
			if (str.match(matches[i])) {
				return str + "est"
			}
		}
		return "most " + str
	}
	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main;
})();



// console.log(to_superlative('dry'))
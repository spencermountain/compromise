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
			"bad": "worse",
			"sad": "sadder",
		}
		var dos = {
			"absurd": 1,
			"aggressive": 1,
			"alert": 1,
			"alive": 1,
			"awesome": 1,
			"beautiful": 1,
			"big": 1,
			"bitter": 1,
			"black": 1,
			"blue": 1,
			"bored": 1,
			"boring": 1,
			"brash": 1,
			"brave": 1,
			"brief": 1,
			"bright": 1,
			"broad": 1,
			"brown": 1,
			"calm": 1,
			"charming": 1,
			"cheap": 1,
			"clean": 1,
			"cold": 1,
			"cool": 1,
			"cruel": 1,
			"cute": 1,
			"damp": 1,
			"deep": 1,
			"dear": 1,
			"dead": 1,
			"dark": 1,
			"dirty": 1,
			"drunk": 1,
			"dull": 1,
			"eager": 1,
			"efficient": 1,
			"even": 1,
			"faint": 1,
			"fair": 1,
			"fanc": 1,
			"fast": 1,
			"fat": 1,
			"feeble": 1,
			"few": 1,
			"fierce ": 1,
			"fine": 1,
			"flat": 1,
			"forgetful": 1,
			"frail": 1,
			"full": 1,
			"gentle": 1,
			"glib": 1,
			"great": 1,
			"green": 1,
			"gruesome": 1,
			"handsome": 1,
			"hard": 1,
			"harsh": 1,
			"high": 1,
			"hollow": 1,
			"hot": 1,
			"impolite": 1,
			"innocent": 1,
			"keen": 1,
			"kind": 1,
			"lame": 1,
			"lean": 1,
			"light": 1,
			"little": 1,
			"loose": 1,
			"long": 1,
			"loud": 1,
			"low": 1,
			"lush": 1,
			"macho": 1,
			"mean": 1,
			"meek": 1,
			"mellow": 1,
			"mundane": 1,
			"near": 1,
			"neat": 1,
			"new": 1,
			"nice": 1,
			"normal": 1,
			"odd": 1,
			"old": 1,
			"pale": 1,
			"pink": 1,
			"plain": 1,
			"poor": 1,
			"proud": 1,
			"purple": 1,
			"quick": 1,
			"rare": 1,
			"rapid": 1,
			"red": 1,
			"rich": 1,
			"ripe": 1,
			"rotten": 1,
			"round": 1,
			"rude": 1,
			"sad": 1,
			"safe": 1,
			"scarce": 1,
			"scared": 1,
			"shallow": 1,
			"sharp": 1,
			"short": 1,
			"shrill": 1,
			"simple": 1,
			"slim": 1,
			"slow": 1,
			"small": 1,
			"smart": 1,
			"smooth": 1,
			"soft": 1,
			"sore": 1,
			"sour": 1,
			"square": 1,
			"stale": 1,
			"steep": 1,
			"stiff": 1,
			"straight": 1,
			"strange": 1,
			"strong": 1,
			"sweet": 1,
			"swift": 1,
			"tall": 1,
			"tame": 1,
			"tart": 1,
			"tender": 1,
			"tense": 1,
			"thick": 1,
			"thin": 1,
			"tight": 1,
			"tough": 1,
			"vague": 1,
			"vast": 1,
			"vulgar": 1,
			"warm": 1,
			"weak": 1,
			"wet": 1,
			"white": 1,
			"wide": 1,
			"wild": 1,
			"wise": 1,
			"young": 1,
			"yellow": 1,
			"easy": 1,
			"narrow": 1,
			"late": 1,
			"early": 1,
			"soon": 1,
			"close": 1,
			"empty": 1,
			"dry": 1,
			"windy": 1,
			"noisy": 1,
			"thirsty": 1,
			"hungry": 1,
			"fresh": 1,
			"quiet": 1,
			"clear": 1,
			"heavy": 1,
			"happy": 1,
			"funny": 1,
			"lucky": 1,
			"pretty": 1,
			"important": 1,
			"interesting": 1,
			"attractive": 1,
			"dangerous": 1,
			"intellegent": 1,
			"pure": 1,
			"orange": 1,
			"large": 1,
			"firm": 1,
			"grand": 1,
			"formal": 1,
			"raw": 1,
			"weird": 1,
			"glad": 1,
			"mad": 1,
			"strict": 1,
			"tired": 1,
			"solid": 1,
			"extreme": 1,
			"mature": 1,
			"true": 1,
			"free": 1,
			"curly": 1,
			"angry": 1
		}

		var dont = {
			"overweight": 1,
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
// console.log(to_comparative('sad'))

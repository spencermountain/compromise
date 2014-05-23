var verb_rules = {

	infinitive: [


		{
			reg: /([a[tg]|i[zn]]|ur|nc|gl|is)e$/i,
			repl: {
				present: "$1es",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'angulate, stipulate, orientate',
			exceptions: ["ate", "overate"],
			power: 804,
			tense: 'infinitive'
		}, {
			reg: /([i|f|rr])y$/i,
			repl: {
				present: "$1ies",
				gerund: "$1ying",
				past: "$1ied"
			},
			examples: 'unify, classify, glorify',
			exceptions: [],
			power: 128,
			tense: 'infinitive'
		}, {
			reg: /([td]er)$/i,
			repl: {
				present: "$1s",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'sputter, fritter, charter',
			exceptions: [],
			power: 123,
			tense: 'infinitive'
		}, {
			reg: /([bd])le$/i,
			repl: {
				present: "$1es",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'shamble, warble, grabble',
			exceptions: [],
			power: 69,
			tense: 'infinitive'
		}, {
			reg: /(ish|tch|ess)$/i,
			repl: {
				present: "$1es",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'relish, wish, brandish',
			exceptions: [],
			power: 62,
			tense: 'infinitive'
		}, {
			reg: /(ion|end|e[nc]t)$/i,
			repl: {
				present: "$1s",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'caution, aircondition, cushion',
			exceptions: ["sent", "bent", "overspent", "misspent", "went", "kent", "outwent", "forwent", "spent", "pent", "lent", "underwent", "rent", "unbent", "shent"],
			power: 55,
			tense: 'infinitive'
		}, {
			reg: /(om)e$/i,
			repl: {
				present: "$1es",
				gerund: "$1ing",
				past: "ame",
			},
			examples: 'become',
			exceptions: [],
			power: 1,
			tense: 'infinitive'
		}, {
			reg: /([aeiou])([ptn])$/i,
			repl: {
				present: "$1$2s",
				gerund: "$1$2$2ing",
				past: "$1$2",
			},
			examples: 'win',
			exceptions: [],
			power: 1,
			tense: 'infinitive'
		},

		{
			reg: /(er)$/i,
			repl: {
				present: "$1s",
				gerund: "$1ing",
				past: "$1ed",
			},
			examples: 'win',
			exceptions: [],
			power: 1,
			tense: 'infinitive'
		},
	],

	present: [

		{
			reg: /([tzlshicgrvdnkmu])es$/i,
			repl: {
				infinitive: "$1e",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'convolutes, angulates, stipulates',
			exceptions: [],
			power: 923,
			tense: 'present'
		}, {
			reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
			repl: {
				infinitive: "$1",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'wants, squints, garments',
			exceptions: [],
			power: 153,
			tense: 'present'
		}, {
			reg: /(ow)s$/i,
			repl: {
				infinitive: "$1",
				gerund: "$1ing",
				past: "ew"
			},
			examples: 'wants, squints, garments',
			exceptions: [],
			power: 153,
			tense: 'present'
		}, {
			reg: /(op)s$/i,
			repl: {
				infinitive: "$1",
				gerund: "$1ping",
				past: "$1ped"
			},
			examples: 'wants, squints, garments',
			exceptions: [],
			power: 153,
			tense: 'present'
		}, {
			reg: /([eirs])ts$/i,
			repl: {
				infinitive: "$1t",
				gerund: "$1tting",
				past: "$1tted"
			},
			examples: 'outwits, revisits, knits',
			exceptions: [],
			power: 105,
			tense: 'present'
		}, {
			reg: /(ll)s$/i,
			repl: {
				infinitive: "$1",
				gerund: "$1ing",
				past: "$1ed"
			},
			examples: 'culls, tolls, shalls',
			exceptions: [],
			power: 92,
			tense: 'present'
		}, {
			reg: /(el)s$/i,
			repl: {
				infinitive: "$1",
				gerund: "$1ling",
				past: "$1led"
			},
			examples: 'swivels, rebels, travels',
			exceptions: [],
			power: 88,
			tense: 'present'
		}, {
			reg: /s$/i, //generic one
			repl: {
				infinitive: "",
				gerund: "ing",
				past: "ed"
			},
			examples: 'swivels, rebels, travels',
			exceptions: [],
			power: 88,
			tense: 'present'
		},
	],

	gerund: [

		//suffixes that need a trailing e
		//
		{
			reg: /(i.)ing$/i,
			repl: {
				infinitive: "$1e",
				present: "$1es",
				past: "$1ed"
			},
			examples: 'driving',
			exceptions: [],
			power: 8475,
			tense: 'gerund'
		}, { //more that need a trailing e
			reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
			repl: {
				infinitive: "$1e",
				present: "$1es",
				past: "$1ed"
			},
			examples: 'convoluting, compensating, fouling',
			exceptions: [],
			power: 8475,
			tense: 'gerund'
		},

		{
			reg: /(..)ing$/i,
			repl: {
				infinitive: "$1",
				present: "$1s",
				past: "$1ed"
			},
			examples: 'walking, fawning, farming, swing',
			exceptions: [],
			power: 8475,
			tense: 'gerund'
		}
	],

	past: [

		{
			reg: /(.[^aeiou])ed$/i,
			repl: {
				infinitive: "$1e",
				present: "$1es",
				doer: "$1er",
				gerund: "$1ing"
			},
			examples: 'convoluted, outwitted, angulated',
			exceptions: [],
			power: 1854,
			tense: 'past'
		}, {
			reg: /(.o)ed$/i,
			repl: {
				infinitive: "$1o",
				present: "$1os",
				doer: "$1oer",
				gerund: "$1oing"
			},
			examples: 'ballyhooed,',
			exceptions: [],
			power: 0,
			tense: 'past'
		}, {
			reg: /(.i)ed$/i,
			repl: {
				infinitive: "$1",
				present: "$1s",
				doer: "$1er",
				gerund: "$1ing"
			},
			examples: 'ballyhooed,',
			exceptions: [],
			power: 0,
			tense: 'past'
		}, {
			reg: /([rl])ew$/i,
			repl: {
				infinitive: "$1ow",
				present: "$1ows",
				gerund: "$1owing"
			},
			example: "overthrew",
			exceptions: ["brew", "drew", "withdrew", "crew", "screw", "unscrew"],
			tense: "past"
		}, {
			reg: /([pnl])t$/i,
			repl: {
				infinitive: "$1",
				present: "$1s",
				gerund: "$1ing"
			},
			example: "lept, leant",
			exceptions: [],
			tense: "past"
		},
	]
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = verb_rules;
}
// nlp_comprimise by @spencermountain  in 2014

/* *********************************************************************************************************
//	The main dictionary to build various language (or context) specific lexica -
//  part 3 : Regex rules for each part of speech that convert it to all other parts of speech.
********************************************************************************************************* */

// see ./build.js for generating the lexica

module.exports = {


// RULES FOR POS TAGGING
// --------------------v
pos: {
	
//: strongDeterminers
// TODO - this might go to dictionary as flag 'strongDeterminer' (build automatically)
// list strong noun determiners
strongDeterminers: {
	en: {the: 1, a: 1, an: 1}
},
	
//: merge (preprocessing)
// rules for pos merging of tokens
/*
	{{posReason}}: {
		// condition
		_if: function (token, tokenArray (sentence tokens), tokenIndex) { 
			return {{posCondition}}
		},
		tag: {{posTag}},
		set: {{tokenIndexSetter}},
		merge: {{tokenMergeCount}}
	}
	
// {{posReason}} - a note going to the .pos
// {{posCondition}} - the if condition for this rule
// {{posTag}} - optional, default: null - if any token.pos receives a tag
// {{tokenIndexSetter}} - optional, default: 0 - e.g. 1 for nextToken or -1 for lastToken
// {{tokenMergeCount}} - optional, default: 1 - e.g. 2 to merge (this + (i+1) + (i+2)) [ and set to 0 for no merging ]
*/
merge: {
	en: {
		NN_NN: {
			// 'joe smith' are both NN, for example
			_if: function (t,a,i) { return (t.pos.tag === a[i+1].pos.tag && !t.punctuated && t.noun_capital == a[i+1].noun_capital ); }
		},
		CD_CD: {
			// merge dates manually, which often have punctuation
			_if: function (t,a,i) { return (t.pos.tag === 'CD' && a[i+1].pos.tag ==='CD'); }
		},
		CD_w_CD: {
			// merges like 'hundred and fifty', 'march the 5th'
			_if: function (t,a,i) { return (t.pos.tag === 'CD' && (a[i+1].normalised === 'and' || a[i+1].normalised === 'the') && a[i+2] && a[i+2].pos.tag === 'CD'); }
		},
		NNAB_NN: {
			// merge abbreviations with nouns manually, eg. 'Joe jr.'
			_if: function (t,a,i) { return ((t.pos.tag === 'NNAB' && a[i+1].pos.parent ==='noun') || (t.pos.parent==='noun' && a[i+1].pos.tag==='NNAB')); }
		},
		will_VB: {
			// 'will walk' -> future-tense verb
			_if: function (t,a,i) { return (t.normalised === 'will' && a[i+1].pos.parent === 'verb'); }
		},
		NNP_NN: {
			// merge NNP and NN, like firstname, lastname
			tag: 'NNP', set: 1,
			_if: function (t,a,i) { return ((t.pos.tag === 'NNP' && a[i+1].pos.tag ==='NN') || (t.pos.tag === 'NN' && a[i+1].pos.tag === 'NNP')); }
		},
		DT1: {
			// capitals surrounding a preposition  'United States of America'
			merge: 2,
			_if: function (t,a,i) { return (t.pos.tag=='NN' && t.noun_capital && (a[i+1].normalised == 'of' || a[i+1].normalised == 'and') && a[i+2] && a[i+2].noun_capital); }
		},
		DT2: {
			// capitals surrounding two prepositions  'Phantom of the Opera'
			merge: 3,
			_if: function (t,a,i) { return (t.noun_capital && a[i+1].normalised == 'of' && a[i+2] && a[i+2].pos.tag == 'DT' && a[i+3] && a[i+3].noun_capital); }
		}
	}
	//, end of english
},

//: ambiguousContractions
// if any of the contractions, specified in dictionary are ambiguous (like 's = is||has) then specify
// a simple function - (a, i)
// {{a}} is the array of sentence tokens and {{i}} is the index of the found first contraction word.

ambiguousContractions: {
	// choose which verb this contraction should have..
	en: function (a, i) {
		// look for the next verb, and if it's past-tense (he's walked -> he has walked)
		for(var j = i+1; j < a.length; j++){
			if(a[j] && a[j].pos && a[j].pos.tag=='VBD'){ // past tense
				return 'has';
			}
		}
		return 'is';
	}
	//, end of english
},

//: replacing (1st pass, for lexi)
// all of these matches/replaces/replacer regex objects will be used in the pos lexi pass 
// if they match the language. -
// native regexes, set to 0, false or null if not needed in your language
// {{matches}} finds
// {{replaces}} replaces by {{replacer}}  // ({{replaces}} is optional, defaults to {{matches}})
replacing: { 
	prefix: {
		// try to match it without a prefix - eg. outworked -> worked
		en: {
			matches: /^(over|under|out|-|un|re|en).{4}/i,
			replaces: /^(over|under|out|.*?-|un|re|en)/i,
			replacer: ''
		}
		//, end of english
	}
},

//: set (2nd pass)
// rules for pos tagging
/*
	{{posReason}}: {
		// condition
		tag: {{posTag}},
		set: {{tokenIndexSetter}},
		_if: function (token, nextToken, lastToken, tokenIndex) { 
			return {{posCondition}}
		}
	}
	
// {{posReason}} - a note going to the .pos
// {{posCondition}} - the if condition for this rule
// {{posTag}} - optional, default: null - if any token.pos receives a tag
// {{tokenIndexSetter}} - optional, default: 0 - e.g. 1 for nextToken or -1 for lastToken
*/
set: { 
	en: {
		ed: {
			tag: 'VB', // set ambiguous 'ed' endings as either verb/adjective
			_if: function (t,n,l) { return (t.pos_reason!=='lexicon' && t.normalised.match(/.ed$/)); }
		}
	}
},
	
//: special (3rd/last pass)
// rules for pos exceptions (same signature like for setPos above) ::
/*
	{{posReason}}: {
		// condition
		tag: {{posTag}},
		set: {{tokenIndexSetter}},
		_if: function (token, nextToken, lastToken, tokenIndex) { 
			return {{posCondition}}
		}
	}
	
// {{posReason}} - a note going to the .pos
// {{posCondition}} - the if condition for this rule
// {{posTag}} - optional, default: null - if any token.pos receives a tag
// {{tokenIndexSetter}} - optional, default: 0 - e.g. 1 for nextToken or -1 for lastToken
*/
special: { 
	en: {
		mayIsDate: {
			tag: 'CD', // resolve ambiguous 'march','april','may' with dates
			_if: function (t,n,l) { return (_.has(t.normalised, ['march','april','may']) && ((n && n.pos.tag=='CD') || (l && l.pos.tag=='CD'))); }
		},
		beforeModal: {
			tag: 'NN', // if it's before a modal verb, it's a noun -> lkjsdf would
			_if: function (t,n,l) { return (n && !_.has(t.pos.parent, ['noun','glue']) && n.pos.tag === 'MD'); }
		},
		afterWill: {
			tag: 'VB', // if it's after the word 'will' its probably a verb/adverb
			_if: function (t,n,l) { return (l && l.normalised == 'will' && !l.punctuated && t.pos.parent == 'noun' && !_.has(t.pos.tag, ['PRP', 'PP'])); }
		},
		afterI: {
			tag: 'VB', // if it's after the word 'i' its probably a verb/adverb
			_if: function (t,n,l) { return (l && l.normalised == 'i' && !l.punctuated && t.pos.parent == 'noun'); }
		},
		afterAdverb: {
			tag: 'VB', // if it's after an adverb, it's not a noun -> quickly acked; support form 'atleast he is..'
			_if: function (t,n,l) { return (l && t.pos.parent === 'noun' && t.pos.tag !== 'PRP' && t.pos.tag !== 'PP' && l.pos.tag === 'RB' && !l.start); }
		},
		consecutiveAdjectives: {
			tag: 'RB', // no consecutive, unpunctuated adjectives -> real good
			_if: function (t,n,l) { return (n && t.pos.parent === 'adjective' && n.pos.parent === 'adjective' && !t.punctuated); }
		},
		determinerVerb: {
			tag: 'NN', // if it's after a determiner, it's not a verb -> the walk
			_if: function (t,n,l) { return (l && t.pos.parent === 'verb' && _.has(l.pos.normalised, ['the','a','an']) && t.pos.tag != 'CP'); }
		},
		copulaAdjective: {
			tag: 'JJ', // copulas are followed by a determiner ('are a ..'), or an adjective ('are good')
			_if: function (t,n,l) { return (l && l.pos.tag === 'CP' && !_.has(t.pos.tag, ['DT','RB','PRP']) && !_.has(t.pos.parent, ['adjective','value'])); }
		},
		copulaAdverbAdjective: {
			tag: 'JJ', set: 1, // copula, adverb, verb -> copula adverb adjective [SET] -> is very lkjsdf
			_if: function (t,n,l) { return (l && n && l.pos.tag === 'CP' && t.pos.tag === 'RB' && n.pos.parent === 'verb'); }
		},
		beforeHimHerIt: {
			tag: 'VB', // the city [verb] him.
			_if: function (t,n,l) { return (n && n.pos.tag == 'PRP' && t.pos.tag !== 'PP' && t.pos.parent == 'noun' && !t.punctuated); }
		},
		determinerAdjectiveNoun: {
			tag: 'JJ', // the misled worker -> misled is an adjective, not vb
			_if: function (t,n,l) { return (l && n && l.pos.tag === 'DT' && n.pos.parent === 'noun' && t.pos.parent === 'verb'); }
		},
		adjectiveAfterPronoun: {
			tag: 'VB', // where's he gone -> gone=VB, not JJ
			_if: function (t,n,l) { return (l && l.pos.tag==='PRP' && t.pos.tag==='JJ' ); }
		}
	}
	//, end of english
},

//: word_rules
// 'parts of speech' regex patterns
// {{posType}}: [
// 	{{ regex }}
// ]
words: {
	en: {
		JJ: [
			/.[cts]hy$/i,
			/.[st]ty$/i,
			/.[gk]y$/i,
			/.some$/i,
			/.[nrtumcd]al$/i,
			/.que$/i,
			/.[tnl]ary$/i,
			/.lar$/i,
			/[bszmp]{2}y/i,
			/.[icldtgrv]ent$/i,
			/.[oe]ry$/i,
			/.[lsrnpb]ian$/i,
			/.[^aeiou]ial$/i,
			/.[^aeiou]eal$/i,
			/.[vrl]id$/i,
			/.ike$/i,
			/.rmy$/i,
			/.azy$/i,
			/.bound$/i,
			/.oid$/i,
			/.rough$/i,
			/.mum$/i,
			/.ean$/i,
			/.[ia]sed$/i,
			/.llen$/i,
			/.ried$/i,
			/.gone$/i,
			/.made$/i,
			/.[pdltrkvyns]ing$/i,
			/.ous$/i,
			/.[gt]led$/i,
			/[aeiou].*ist$/i,
			/[a-z]*\\-[a-z]*\\-/i,
			/.[^aeiou][ei]al$/i,
			/.ffy$/i,
			/.[^aeiou]ic$/i,
			/.(gg|bb|zz)ly$/i,
			/.[aeiou]my$/i,
			/.[aeiou]ble$/i,
			/.[^aeiou]ful$/i,
			/.[^aeiou]ish$/i,
			/..ic$/i,
			/[aeiou][^aeiou]id$/i,
			/.[^aeiou]ish$/i,
			/.[^aeiou]ive$/i,
			/[ea]{2}zy$/i
		],
		VB: [
			/.[lnr]ize$/i,
			/.fies$/i,
			/^(un|de|re)\\-[a-z]../i,
			/.zes$/i,
			/.ends$/i,
			/.ify$/i,
			/.ens$/i,
			/.oses$/i,
			/.ishes$/i,
			/.ects$/i,
			/.bles$/i,
			/.pose$/i,
			/.tized$/i,
			/.gate$/i,
			/.nes$/i,
			/.lked$/i,
			/.'n$/i,
			/.'t$/i,
			/.tches$/i,
			/.ize$/i,
			/.[^aeiou]ise$/i,
			/.[aeiou]te$/i
		],
		JJS: [
			/.[di]est$/i
		],
		VBZ: [
			/.[rln]ates$/i
		],
		RB: [
			/[rdntkdhs]ly$/i,
			/.wards$/i,
			/.where$/i,
			/.fore$/i,
			/.less$/i,
			/. so$/i,
			/.fully$/i
		],
		JJR: [
			/.[ilk]er$/i
		],
		NN: [
			/.rol$/i,
			/.tors$/i,
			/.vice$/i,
			/.ices$/i,
			/.ions$/i,
			/.ances$/i,
			/.tions$/i,
			/.tures$/i,
			/.ports$/i,
			/.ints$/i,
			/.ea$/i,
			/[aeiou][pns]er$/i,
			/.ia$/i,
			/.sis$/i,
			/.[aeiou]na$/i,
			/.[^aeiou]ity$/i,
			/.[^aeiou]ium$/i,
			/.[^aeiou]ica$/i,
			/[aeiou][^aeiou]is$/i,
			/[^aeiou]ard$/i,
			/[^aeiou]ism$/i,
			/.[^aeiou]ity$/i,
			/.[^aeiou]ium$/i,
			/.[lstrn]us$/i
		],
		CD: [
			/.teen(th)?$/i,
			/.tieth$/i,
			/^-?[0-9]+(.[0-9]+)?$/i,
			/^https?:?\/\/[a-z0-9]/i,
			/^www.[a-z0-9]/i
		],
		MD: [
			/.*ould$/i,
			/.'ll$/i
		],
		NNO: [
			/[a-z]'s$/i
		],
		CP: [
			/.'re$/i
		]
	}
}

},
// end of POS rules


// RULES FOR SENTENCES
// ------------------v
sentence: {
	
	//: negate
	// the rules for pos merging of tokens
	negate: {
		en: {
			infinitive: {
				prefix: "don't", // 'i walk' -> 'i don't walk'
				tense: 'infinitive',
				_if: function (t/*, a, i*/) { return (t.analysis.form === 'infinitive' && t.analysis.tense != 'future'); }
			},
			gerund: {
				prefix: 'not', // if verb is gerund, 'walking' -> 'not walking'
				_if: function (t) { return (t.analysis.form === 'gerund'); }
			},
			past: {
				prefix: "didn't", // if verb is past-tense, 'he walked' -> 'he did't walk'
				tense: 'infinitive',
				_if: function (t) { return (t.analysis.tense === 'past'); }
			},
			present: {
				prefix: "doesn't", // if verb is present-tense, 'he walks' -> 'he doesn't walk'
				tense: 'infinitive',
				_if: function (t) { return (t.analysis.tense === 'present'); }
			},
			future: {
				prefix: "won't", 
				tense: 'infinitive',
				_if: function (t) { return (t.analysis.tense === 'future' && t.normalised.match(/will\b/)); }
			}
		}
		//, end of english
	}
	
},
// end of SENTENCES rules


// RULES FOR NOUNS
// --------------------v
nouns: {
	// noun.which: specifically which pos it is
	which: {
		en: {
			possessiveNoun: {
				matches: /'s$/,
				tag: 'NNO', // possessive
			}
		}
	},
	// noun.pronoun: decides if it deserves a he, she, they, or it
	// for plurals (string)
	pluralPronoun: { en: 'they' },
	// general rules
	gender: {
		en: [
			// femaleHonorifics
			[/\b(mrs|miss|ms|misses|mme|mlle)\.?\b/i, 'she'],
			// maleHonorifics
			[/\b(mr|mister|sr|jr)\.?\b/i, 'he']
		]
	},
	// rules for names (predict ...)
	genderNames: {
		en: [
			// preferFemale if it ends in a 'ee or ah'
			[/[aeiy]$/i, 'she'],
			// preferMale if it ends in a 'oh or uh'
			[/^[ou]$/i, 'he'],
			// fallbackFemale if it has double-consonants
			[/(nn|ll|tt)/i, 'she']
		]
	},
	genderFallback: {
		// male like 'he'
		male: { en: 'he' },
		// female like 'she'
		female: { en: 'she' },
		// general fallback (last option)
		gender: { en: 'it' },
		// fallback for name
		names: { en: 'they' },
		// fallback for plural
		plural: { en: 'they' }
	},
	// regex string for preposition phrases' inflect - handle e.g. 'mayors of chicago'
	prepositionPhrase: {
			en:	'([a-z]*) (of|in|by|for) [a-z]'
	},
	// indefinite articles
	articles: {
		fallback: {
			en: 'a'
		},
		// the article for plurals
		plural: {
			en: 'the'
		},
		// list irregular articles as object key with according words / regexes
		irregulars: {
			en: {
				an: {
					hour: 1,
					heir: 1,
					heirloom: 1,
					honest: 1,
					honour: 1,
					honor: 1,
					uber: 1 //german u
				}
			}
		},
		regexes: {
			en: {
				a: [
					/^onc?e/i, //'wu' sound of 'o'
					/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
					/^eul/i
				],
				an: [
					/^[aeiou]/
				]
			}
		},
		// correction function		
		fn: {
			// runs in the scope of noun (this.word, this.METHODS)
			en: function() {
				// spelled-out acronyms
				// pronounced letters of acronyms that get a 'an'
				var an_acronyms = { A:1, E:1, F:1, H:1, I:1, L:1, M:1, N:1, O:1, R:1, S:1, X:1 };
				if (this.is_acronym(this.word) && an_acronyms.hasOwnProperty(this.word.substr(0, 1)) ) {
					return 'an';
				}
			}
		}
	},
	
	isPluralFallback: {
		en:	function(word) {
			// 'looks pretty plural' rules - TODO // needs some lovin' :
			if (word.match(/s$/) && !word.match(/ss$/) && word.length > 3) {
				return true;
			}
			return false;
		}
	},
	// noun.pluralize and .singularize [matches, replaces]
	pluralize: {
		en: [
			[/(ax|test)is$/i, '$1es'],
			[/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
			[/(octop|vir)i$/i, '$1i'],
			[/([rl])f$/i, '$1ves'],
			[/(alias|status)$/i, '$1es'],
			[/(bu)s$/i, '$1ses'],
			[/(zer|avocad|hal|tornad|tuxed)o$/i, '$1os'],
			[/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
			[/([ti])um$/i, '$1a'],
			[/([ti])a$/i, '$1a'],
			[/sis$/i, 'ses'],
			[/(?:([^f])fe|([lr])f)$/i, '$1ves'],
			[/(hive|stomach|epoch)$/i, '$1s'],
			[/([^aeiouy]|qu)y$/i, '$1ies'],
			[/(x|ch|ss|sh|s|z)$/i, '$1es'],
			[/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'],
			[/([m|l])ouse$/i, '$1ice'],
			[/([m|l])ice$/i, '$1ice'],
			[/^(ox)$/i, '$1en'],
			[/^(oxen)$/i, '$1'],
			[/(quiz)$/i, '$1zes'],
			[/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
			[/(sis)$/i, 'ses'],
			[/^(?!talis|.*hu)(.*)man$/i, '$1men'],
			[/(.*)/i, '$1s']
		]
	},
	singularize: {
		en: [
			[/([^v])ies$/i, '$1y'],
			[/ises$/i, 'isis'],
			[/ives$/i, 'ife'],
			[/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
			[/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
			[/(buffal|tomat|tornad)(oes)$/i, '$1o'],
			[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
			[/(vert|ind|cort)(ices)$/i, '$1ex'],
			[/(matr|append)(ices)$/i, '$1ix'],
			[/(x|ch|ss|sh|s|z|o)es$/i, '$1'],
			[/men$/i, 'man'],
			[/(n)ews$/i, '$1ews'],
			[/([ti])a$/i, '$1um'],
			[/([^f])ves$/i, '$1fe'],
			[/([lr])ves$/i, '$1f'],
			[/([^aeiouy]|qu)ies$/i, '$1y'],
			[/(s)eries$/i, '$1eries'],
			[/(m)ovies$/i, '$1ovie'],
			[/([m|l])ice$/i, '$1ouse'],
			[/(cris|ax|test)es$/i, '$1is'],
			[/(alias|status)es$/i, '$1'],
			[/(ss)$/i, '$1'],
			[/(ics)$/i, "$1"],
			[/s$/i, '']
		]
	},
	// indicators are similar to plural/singularize rules, but not the same // TODO DOC
	pluralIndicators: {
		en: [
			/(^v)ies$/i,
			/ises$/i,
			/ives$/i,
			/(antenn|formul|nebul|vertebr|vit)ae$/i,
			/(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
			/(buffal|tomat|tornad)oes$/i,
			/(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,
			/(vert|ind|cort)ices$/i,
			/(matr|append)ices$/i,
			/(x|ch|ss|sh|s|z|o)es$/i,
			/men$/i,
			/news$/i,
			/.tia$/i,
			/(^f)ves$/i,
			/(lr)ves$/i,
			/(^aeiouy|qu)ies$/i,
			/(m|l)ice$/i,
			/(cris|ax|test)es$/i,
			/(alias|status)es$/i,
			/ics$/i
		]
	},
	singularIndicators: {
		en: [
			/(ax|test)is$/i,
			/(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
			/(octop|vir)i$/i,
			/(rl)f$/i,
			/(alias|status)$/i,
			/(bu)s$/i,
			/(al|ad|at|er|et|ed|ad)o$/i,
			/(ti)um$/i,
			/(ti)a$/i,
			/sis$/i,
			/(?:(^f)fe|(lr)f)$/i,
			/hive$/i,
			/(^aeiouy|qu)y$/i,
			/(x|ch|ss|sh|z)$/i,
			/(matr|vert|ind|cort)(ix|ex)$/i,
			/(m|l)ouse$/i,
			/(m|l)ice$/i,
			/(antenn|formul|nebul|vertebr|vit)a$/i,
			/.sis$/i,
			/^(?!talis|.*hu)(.*)man$/i
		]
	}
},


// RULES FOR VERBS
// --------------------v
verbs: {
	//: unPrefix
	// enter a regex to un-prefix the verb, and add it in later
	unPrefix: {
		en: /^(over|under|re|anti|full)\-?/i
	},
	//: conjugate
	// regex rules for verb conjugation
	// used in combination with the generic 'fallback' method
	// regex strings (!) // TODO - why?
	conjugate: {
		en: {
			infinitive: [
				{
					regex: '(eed)$',
					present: '$1s', gerund: '$1ing', past: '$1ed', doer: '$1er'
				},
				{
					regex: '(e)(ep)$',
					present: '$1$2s', gerund: '$1$2ing', past: '$1pt', doer: '$1$2er'
				},
				{
					regex: '(a[tg]|i[zn]|ur|nc|gl|is)e$',
					present: '$1es', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '([i|f|rr])y$',
					present: '$1ies', gerund: '$1ying', past: '$1ied'
				},
				{
					regex: '([td]er)$',
					present: '$1s', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '([bd]l)e$',
					present: '$1es', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(ish|tch|ess)$',
					present: '$1es', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(ion|end|e[nc]t)$',
					present: '$1s', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(om)e$',
					present: '$1es', gerund: '$1ing', past: 'ame'
				},
				{
					regex: '([aeiu])([pt])$',
					present: '$1$2s', gerund: '$1$2$2ing', past: '$1$2'
				},
				{
					regex: '(er)$',
					present: '$1s', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(en)$',
					present: '$1s', gerund: '$1ing', past: '$1ed'
				}
			],
			//:
			present: [
				{
					regex: '(ies)$',
					infinitive: 'y', gerund: 'ying', past: 'ied'
				},
				{
					regex: '(tch|sh)es$',
					infinitive: '$1', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(ss)es$',
					infinitive: '$1', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '([tzlshicgrvdnkmu])es$',
					infinitive: '$1e', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',
					infinitive: '$1', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(ow)s$',
					infinitive: '$1', gerund: '$1ing', past: 'ew'
				},
				{
					regex: '(op)s$',
					infinitive: '$1', gerund: '$1ping', past: '$1ped'
				},
				{
					regex: '([eirs])ts$',
					infinitive: '$1t', gerund: '$1tting', past: '$1tted'
				},
				{
					regex: '(ll)s$',
					infinitive: '$1', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: '(el)s$',
					infinitive: '$1', gerund: '$1ling', past: '$1led'
				},
				{
					regex: '(ip)es$',
					infinitive: '$1e', gerund: '$1ing', past: '$1ed'
				},
				{
					regex: 'ss$',
					infinitive: 'ss', gerund: 'ssing', past: 'ssed'
				},
				{
					regex: 's$',
					infinitive: '', gerund: 'ing', past: 'ed'
				}
			],
			//:
			gerund: [
				{
					regex: 'pping$',
					infinitive: 'p', present: 'ps', past: 'pped'
				},
				{
					regex: 'lling$',
					infinitive: 'll', present: 'lls', past: 'lled'
				},
				{
					regex: 'tting$',
					infinitive: 't', present: 'ts', past: 't'
				},
				{
					regex: 'ssing$',
					infinitive: 'ss', present: 'sses', past: 'ssed'
				},
				{
					regex: 'gging$',
					infinitive: 'g', present: 'gs', past: 'gged'
				},
				{
					regex: '([^aeiou])ying$',
					infinitive: '$1y', present: '$1ies', past: '$1ied', doer: '$1ier'
				},
				{
					regex: '(i.)ing$',
					infinitive: '$1e', present: '$1es', past: '$1ed'
				},
				{
					regex: '(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',
					infinitive: '$1e', present: '$1es', past: '$1ed'
				},
				{
					regex: '(ch|sh)ing$',
					infinitive: '$1', present: '$1es', past: '$1ed'
				},
				{
					regex: '(..)ing$',
					infinitive: '$1', present: '$1s', past: '$1ed'
				}
			],
			//: 
			past: [
				{
					regex: '(ued)$',
					present: 'ues', gerund: 'uing', past: 'ued', doer: 'uer'
				},
				{
					regex: '(e|i)lled$',
					present: '$1lls', gerund: '$1lling', past: '$1lled', doer: '$1ller'
				},
				{
					regex: '(sh|ch)ed$',
					infinitive: '$1', present: '$1es', gerund: '$1ing', doer: '$1er'
				},
				{
					regex: '(tl|gl)ed$',
					infinitive: '$1e', present: '$1es', gerund: '$1ing', doer: '$1er'
				},
				{
					regex: '(ss)ed$',
					infinitive: '$1', present: '$1es', gerund: '$1ing', doer: '$1er'
				},
				{
					regex: 'pped$',
					infinitive: 'p', present: 'ps', gerund: 'pping', doer: 'pper'
				},
				{
					regex: 'tted$',
					infinitive: 't', present: 'ts', gerund: 'tting', doer: 'tter'
				},
				{
					regex: 'gged$',
					infinitive: 'g', present: 'gs', gerund: 'gging', doer: 'gger'
				},
				{
					regex: '(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',
					infinitive: '$1', present: '$1s', gerund: '$1ing', doer: '$1er'
				},
				{
					regex: '(..[^aeiou])ed$',
					infinitive: '$1e', present: '$1es', gerund: '$1ing', doer: '$1er'
				},
				{
					regex: 'ied$',
					infinitive: 'y', present: 'ies', gerund: 'ying', doer: 'ier'
				},
				{
					regex: '(.o)ed$',
					infinitive: '$1o', present: '$1os', gerund: '$1oing', doer: '$1oer'
				},
				{
					regex: '(.i)ed$',
					infinitive: '$1', present: '$1s', gerund: '$1ing', doer: '$1er'
				},
				{
					regex: '([rl])ew$',
					infinitive: '$1ow', present: '$1ows', gerund: '$1owing'
				},
				{
					regex: '([pl])t$',
					infinitive: '$1t', present: '$1ts', gerund: '$1ting'
				}
			]
		}
		//, end of conjugate english
	},
	
	//: verb suffixes
	suffixes: {
		en: {
			// generated from test data
			gerund: [
				'ing'
			],
			infinitive: [
				'ate', 'ize', 'tion', 'rify', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 
				'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 
				'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'eed', 'er', 'le'
			],
			past: [ 'ed', 'lt', 'nt', 'pt', 'ew', 'ld' ],
			present: [
				'rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 
				'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 
				'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns', 's'
			]
		}
		//, end of suffixes english
	},
	
	//: replace
	// add rules to simplify tenses for conjugation
	tenseReplace: {
		pluperfect: {
			en: {
				matches: /^had [a-z]/i,
				replaces: /^had /i,
				replacer: ''
			}
		},
		perfect: {
			en: {
				matches: /^have [a-z]/i,
				replaces: /^have /i,
				replacer: ''
			}		
		},
		futurePerfect: {
			en: {
				matches: /^will have [a-z]/i,
				replaces: /^will have /i,
				replacer: ''
			}		
		},
		future: {
			en: {
				replaces: /^will /i,
				replacer: ''
			}		
		}
	},
	
	//: detectFallbacks
	// fallbacks for detection of special tenses or forms
	detectFallbacks: {
		en: [
			// future fallback
			[/^will\b/, 'future'],
			// gerund tag fallback
			[/([aeiou][^aeiouwyrlm])ing$/, 'gerund'],
			// negative
			[/n't$/, 'negative']
		]
	},
	
	//: fallback
	// function: fallback to this transformation if it has an unknown prefix ...
	// get's a blank conjugated verb object, returns this object with plan b
	fallback: {
		en: function(w, o) {
			if (w.length > 4) {
				o.infinitive = w.replace(/ed$/, '');
			} else {
				o.infinitive = w.replace(/d$/, '');
			}
			if (w.match(/[^aeiou]$/)) {
				o.gerund = [w, 'ing'].join('');
				o.past = [w, 'ed'].join('');
				if (w.match(/ss$/)) {
					o.present = [w, 'es'].join(''); //'passes'
				} else {
					o.present = [w, 's'].join('');
				}
			} else {
				o.gerund = w.replace(/[aeiou]$/, 'ing');
				o.past = w.replace(/[aeiou]$/, 'ed');
				o.present = w.replace(/[aeiou]$/, 'es');
			}
			return o;
		}
		//, end of english
	},
	
	//: fulfill
	// function: makes conjugation complete
	// get's a conjugated verb object, returns fulfilled
	fulfill: {
		en: function(o) {
			return {
				gerund: [o.infinitive, 'ing'],
				present: [o.infinitive, 's'],
				past: [o.infinitive, 'ed'],
				future: ['will ', o.infinitive],
				perfect: ['have ', o.past],
				pluperfect: ['had ', o.past],
				futurePerfect: ['will have ', o.past]
			};
		}
	},
	
	//: doer
	// transforms for toDoer [matches, replaces]
	doer: {
		en: [
			[/e$/i, 'er'],
			[/([aeiou])([mlgp])$/i, '$1$2$2er'],
			[/([rlf])y$/i, '$1ier'],
			[/^(.?.[aeiou])t$/i, '$1tter']
		]
	}
},

// RULES FOR ADJECTIVES
// --------------------v
adjectives: {
	// adjectives.which: specifically which pos it is
	which: {
		en: {
			comparative: {
				matches: /..er$/,
				tag: 'JJR'
			},
			superlative: {
				matches: /..est$/,
				tag: 'JJS'
			},
		}
	},
	adverb: {
		// irregular - to adverb transforms (replaces)
		to: {
			en: [
				[/al$/i, 'ally'],
				[/ly$/i, 'ly'],
				[/(.{3})y$/i, '$1ily'],
				[/que$/i, 'quely'],
				[/ue$/i, 'uly'],
				[/ic$/i, 'ically'],
				[/ble$/i, 'bly'],
				[/l$/i, 'ly']
			]
		},
		// has no adverb
		no: {
			en: [
				/airs$/,
				/ll$/,
				/ee.$/,
				/ile$/
			]
		},
		// regular: not needed yet
		// adjective to adverb function
		fallback: {
			en: function(word) {
				return [word,'ly'].join('');	
			}
		}
	},
	comparative: {
		// irregular - to comparative transforms (replaces)
		to: {
			en: [
				[/y$/i, 'ier'],
				[/([aeiou])t$/i, '$1tter'],
				[/([aeou])de$/i, '$1der'],
				[/nge$/i, 'nger']
			]
		},
		// has no comparative
		no: {
			en: [
				/ary$/,
				/ous$/
			]
		},
		// regular comparative, e.g. with '-er' like stronger, define below
		regular: {
			en: [
				/ght$/,
				/nge$/,
				/ough$/,
				/ain$/,
				/uel$/,
				/[au]ll$/,
				/ow$/,
				/old$/,
				/oud$/,
				/e[ae]p$/
			]
		},
		fn: {
			en: function(word) {
				return [word,(word.match(/e$/) ? 'r' : 'er')].join('');	
			}
		},
		// the fallback for the adjective to comparative
		fallback: {
			en: function(word) {
				return ['more', word].join(' ');	
			}
		}
	},
	superlative: {
		// to superlative transforms (replaces)
		to: {
			en: [
				[/y$/i, 'iest'],
				[/([aeiou])t$/i, '$1ttest'],
				[/([aeou])de$/i, '$1dest'],
				[/nge$/i, 'ngest']
			]
		},
		// has no superlative
		no: {
			en: [
				/ary$/
			]
		},
		// regular superlative e.g. with '-est', strongest, define below
		regular: {
			en: [
				/ght$/,
				/nge$/,
				/ough$/,
				/ain$/,
				/uel$/,
				/[au]ll$/,
				/ow$/,
				/oud$/,
				/...p$/
			]
		},
		fn: {
			en: function(word) {
				if (word.match(/e$/)) {
					return [word,'st'].join('');
				} else {
					return [word,'est'].join('');
				}
			}
		},
		// the fallback for the adjective to superlative
		fallback: {
			en: function(word) {
				return ['most', word].join(' ');	
			}
		}
	},
	noun: {
		// to noun transforms (replaces)	
		to: {
			en: [
				[/y$/, 'iness'],
				[/le$/, 'ility'],
				[/ial$/, 'y'],
				[/al$/, 'ality'],
				[/ting$/, 'ting'],
				[/ring$/, 'ring'],
				[/bing$/, 'bingness'],
				[/sing$/, 'se'],
				[/ing$/, 'ment'],
				[/ess$/, 'essness'],
				[/ous$/, 'ousness']
			]
		},
		// has no noun (or is same)
		no: {
			en: [
				/\s$/,
				/w$/,
				/s$/
			]
		},
		// adjective to noun function
		fallback: {
			en: function(word) {
				return [word,'ness'].join('');	
			}
		}
	}
},

// RULES FOR ADVERBS
// --------------------v
adverbs: {
	// adverbs.which: specifically which pos it is
	which: {
		en: {
			superlative: {
				matches: /..est$/,
				tag: 'RBS'
			},
			comparative: {
				matches: /..er$/,
				tag: 'RBR'
			}
		}
	},
	adjective: {
		// irregular - to adjective transforms (replaces)
		to: {
			en: [
				[/bly$/i, 'ble'],
				[/gically$/i, 'gical'],
				[/([rsdh])ically$/i, '$1ical'],
				[/ically$/i, 'ic'],
				[/uly$/i, 'ue'],
				[/ily$/i, 'y'],
				[/(.{3})ly$/i, '$1']
			]
		}
	}
},
// RULES FOR NUMBERS (others generated by dictionary)
// -------------------------------------------------v
numbers: {
	negative: {en: /^(-|minus|negative)[\s\-]/i}, // TODO anchored
	factors: {en: 
		[{
			reg: /\b(a)?(one-)?(\s)?half([\s\-])?(of\s)?/i,
			mult: 0.5
		}, {
			reg: /\b(a)?(one-)?(\s)?quarter([\s\-])?(of\s)?/i,
			mult: 0.25
		}]
	},
	ordinals: {en: /(?:\w*)(st|nd|rd|th)(?: |$)/i}
},

// RULES FOR DATES (others generated by dictionary)
// -------------------------------------------------v
dates: {
	// enter only language dependent words for split (NO '-','&',',' etc.)
	split: {
			multiple: {en: ['and', 'or']},
			eventStart: {en: ['between', 'from']},
			eventEnd: {en: ['and', 'to']}
	},
	day: {
		suffix: {en: '(?:st|nd|rd|th)?(?:,\\s| of |$|\\s)'}
	},
	year:{
		suffix: { // TODO? - could be arrays - but check if it would be to unflexible for i18n
			bc: {en: ' before| vor| v.'},
			ad: {en: ' anno| nach| n.'}
		}
	},
	gregorian: {
		_1000: { en: 'millennium(?:s?)|millennia' },
		_100: { en: 'centur(?:y|ies)' },
		_10: { en: 'decades?' },
		_1: { en: 'years?' },
		_m: { en: 'months?' },
		_d: { en: 'days?' },
		_h: { en: 'h\\.?|hr|hrs|hours?|stunden?|heurs?' },
		_min: { en: 'm(?:\\.| )|min(?:ute(?:[sn]?))|mikes?' },
		_sec: { en: 's(?:\\.| )|se[ck]\\.?(?:(?:[ou])nde?)?|\\u0022|\\u2033' }
	},
	relative: {
		tmr: { en: 'tomorrow|tmr' },
		yda: { en: 'yester|y(?:.?)da' },
		tni: { en: '(?:(?:to|2)(?:night|nite|nyt|noc))|tngt' },
		//links: { en: 'in|at' },
		morn: { en: 'morning' },
		noon: { en: 'noon' },
		anoon: { en: 'afternoon|aftn' },
		eve: { en: 'eve(?:ning?)' },
		night: { en: 'night|nite|nyt|noc' }
	}
},


// RULES FOR GENERIC WORDS AND METHODS
// ----------------------------------v
//: units
/*
[ { en: 'wir euro'},{ en: 'wir franc'},{ en: 'cfa franc'},{ en: 'unidad de fomento'},{ en: 'unidad de valor'},{ en: 'uic franc'},{ en: 'cfa franc'},{ en: 'cfp franc'},
{ en: 'silver' },{ en: 'gold' },{ en: 'palladium' },{ en: 'platinum' } ]
*/
units: {
	systems: ['metric', 'us', 'imperial', 'digital', 'natural'],
	categories: [
		//0:
		['time'],
		['mass'],
		['thermodynamic temperature'],
		['length'],
		['area'],
		['volume'],
		['information content'],
		['amount of substance'],
		['electric current'],
		['luminous intensity'],
		//10:
		['plane angle'],
		['solid angle'],
		['energy','work','heat'],
		['pressure','stress'], 
		['power','radiant flux'],
		['force'],
		['magnetic flux'],
		['magnetic field strength','magnetic flux density'],
		['inductance'],
		['electric charge','quantity of electricity'],
		//20:
		['voltage','electrical potential difference','electromotive force'],
		['electric capacitance'],
		['electric conductance'],
		['electric resistance','impedance','reactance'],
		['frequency'],
		['illumination'],
		['luminous flux'],
		['radioactivity'],
		['radioactivity absorbed dose'],
		['radioactivity equivalent dose'],
		//30:
		['catalytic activity'],
		['speed','velocity'],
		['acceleration'],
		['density'],
		['mass fraction'],
		['specific volume'],
		['magnetic field strength'],
		['electric current density'],
		['concentration'],
		['luminance'],
		//40:
		['convergence'],
		['volumetric flow'],
		['jerk','jolt'],
		['snap','jounce'],
		['angular velocity'],
		['momentum','impulse'],
		['angular momentum'],
		['torque','moment of force'],
		['yank'],
		['wavenumber','optical power','curvature','spatial frequency'],
		//50:
		['area density'],
		['molar volume'],
		['action'],
		['heat capacity','entropy'],
		['molar heat capacity','molar entropy'],
		['specific heat capacity','specific entropy'],
		['molar energy'],
		['specific energy'],
		['energy density'],
		['surface tension','stiffness'],
		//60:
		['heat flux density','irradiance'],
		['thermal conductivity'],
		['kinematic viscosity','diffusion coefficient'],
		['dynamic viscosity'],
		['electric displacement field','polarization vector'],
		['electric charge density'],
		['conductivity'],
		['molar conductivity'],
		['permittivity'],
		['permeability'],
		//70:
		['electric field strength'],
		['luminous energy'],
		['luminous exposure'],
		['X and gamma exposure'],
		['absorbed dose rate'],
		['resistivity']
	],
	tags: ['','nautical','historical','dry','fluid','avoirdupois'], // '' = optional ...
	metric: {
		prefixes: [
			// expo of 10, symbol, wordRegex, expo of 2 (computing, optional)
			// terra for typos in 'latin' languages, it's greek, let's be tolerant? ;)
			//1.000.000.000.000.000.000.000.000 :
			[24,'Y','yotta',80],
			//		1.000.000.000.000.000.000.000 :
			[21,'Z','zetta',70],
			//				1.000.000.000.000.000.000 :
			[18,'E','e(?:ks|x)a',60],
			//						1.000.000.000.000.000 :
			[15,'P','peta',50],
			//								1.000.000.000.000 :
			[12,'T','te[r]+a',40], 
			//										1.000.000.000 :
			[9, 'G','giga',30],
			//												1.000.000 :
			[6, 'M','mega',20],
			//														1.000 :
			[3, 'k','kilo',10],
			//															100 :
			[2, 'h','he[ck]to'],
			//															 10 :
			[1, 'da','de[ck]a'],
			// unit --------------------------- 1
			// -
			//															0,1 :
			[-1, 'd','de[cz][yi]'],
			//														 0,01 :
			[-2, 'c','[cz]ent[yi]'],
			//														0,001 :
			[-3, 'm','milli'],
			//												0,000.001 :
			[-6, 'u','\\u00B5|mikro'],
			//										0,000.000.001 :
			[-9, 'n','nano'],
			//								0,000.000.000.001 :
			[-12,'p','pi[ck]o'],
			//						0,000.000.000.000.001 :
			[-15,'f','femto'],
			//				0,000.000.000.000.000.001 :
			[-18,'a','atto'],
			//		0,000.000.000.000.000.000.001 :
			[-21,'z','zepto'],
			//0,000.000.000.000.000.000.000.001 :
			[-24,'y','yokto']
		]
	},
	units: [
	// TODO sys 1 --> 2 if ONLY imperial and see comments:
	// cat, sys, s, w OR [w,r], tag OR 0, siBase OR 0, isPow
	// auto s order will be done by .length
		[0,0,'s',['second','se[ck]\\.?(?:(?:[ou])nde?)?|\\u0022|\\u2033']],
		[0,0,'m',['minute','min\\.?(?:ute(?:[sn]?))?|mikes?'],0,[60,0]],
		[0,0,'h',['hour','h\\.?|hr|hrs|hours?|stunden?|heurs?'],0,[3600,0]],
		[1,0,'g',['gram','gramm?e?'],0,3], //siBase: kg (historic reasons)
		[1,0,'t',['tonne','(?:metris?ch?e? )?tonne[sn]?(?: métrique)?'],0,6],
		[1,1,'gr','grain'],
		[1,1,'dwt','pennyweight'],
		[1,1,'dr','dram'],
		[1,1,'oz',['ounce','[ou]n[cz]e']],
		[1,1,'oz t',['troy ounce','troy [ou]n[cz]e']],
		[1,1,'lb t',['troy pound','troy p[fo]und']],
		[1,1,'lb',['pound','p[fo]und']], //de: see TODO pound below
		[1,1,'st','stone'],
		[1,1,'cwt',['hundredweight','hundredweight|cental|zentner']],
		[1,1,'TON',['ton','(?:short ?|net ?)?ton[\\W]']], //(2,000 pounds)
		[1,1,'lTON',['long ton','(?:long ?|gross |weight )ton']], //(2,240 pounds, historic)
		// !TODO mass: both don't fit in metric conversion range:
		// carat = 0,2 g
		// note the german pound is ambiguous with US and its values: "informal" means 0,5 kg but it is 0,453 592 37 !
		// historically it depends on the region (e.g. bavaria:0,56, hamburg:0,484609) - ignored for now.
		[2,0,'°? ?K','kelvin'],
		[2,0,'° ?C','celsius',0,[1,273.15]],
		[2,1,'° ?F','fahrenheit'], // conflict w. farad F
		[3,0,'m',['meter','meter|m[eè]tre']],
		[3,0,'l',['liter','liter|litre'],0,0,3],
		[3,1,'p',['point','point|punkt']],
		[3,1,'P\u0338','pica'],
		[3,1,'in','inch'],
		[3,1,'ft',['foot','f(?:oo|ee)t|fu(?:ß|ss)']],
		[3,1,'yd','yard'],
		[3,1,'mi',['mile','me?ill?e']],
		//us land, e.g. chain?, acre-foot
		//us fluid, e.g. fl. ounces, pints, quarts, gallons
		//us dry ...
		[3,1,'ftm',['fathom','fathom|faden|klafter|brasse'],1],
		[3,1,'shot','shackle|shot',1],
		[3,1,'cb',['cable','c[aâ]ble|kabel'],1],
		[3,1,'NM',['nautical mile (nmi)','(?:nautical |nautische )me?ile|nmi|mille nautique'],1],
		[3,1,'nl',['nautical mile (nl)','nautical league|nautische liga|ligue nautique'],1],
		[3,3,'px','pixel'],
		[3,3,'pt',['point','point|punkt']],
		[3,3,'em',['quad (em)','quad|geviert']],
		[3,3,'rem',['root quad (rem)','root em']],
		[6,3,'b','bit'],
		[6,3,'B','byte'],
		[7,0,'mol','mole'],
		[8,0,'A',['ampère','ampere|ampère']],
		[9,0,'cd','candela'],
		//lx, lux = illuminance = lumen/qm2
		[10,0,'rad',['radian','radiant?']],
		[11,0,'sr',['steradian','st[eé]radiant?']],
		[12,0,'J','joule'],
		[13,0,'Pa','pascal'],
		[13,0,'bar','bar'], // bar TODO
		[14,0,'W','watt'],
		[15,0,'N','newton'],
		//dyn|dyne
		[16,0,'Wb','weber'],
		[17,0,'T','tesla'],
		[18,0,'H','henry'],
		[19,0,'C','coulomb'],
		[20,0,'V','volt'],
		[21,0,'F','farad'],
		[22,0,'S','siemens'],
		[23,0,'O',['ohm','\\u2126|ohm']],
		[24,0,'Hz','hertz'],
		// revolutions per minute
		[25,0,'lx',['lux','lux|beleuchtungsstärke|éclairement']],
		[26,0,'lm',['lumen','lumen|lumina|lumière']],
		[27,0,'Bq','becquerel'],
		//..
		[28,0,'Gy','gray'],
		//rad
		[29,0,'Sv','sievert'],
		[30,0,'kat','katal'],
		[40,0,'dioptry','dioptry'],
		[45,0,0,['newton second','newton se(?:co|ku)nde?']],
		[46,0,0,['newton meter second','newton meter|m[eè]tre se(?:co|ku)nde?']],
		[47,0,0,['newton meter','newton meter|m[eè]tre']],
		[49,0,0,['reciprocal meter','reciprocal meter|m[eè]tre']],
		[52,0,0,['joule second','joule se(?:co|ku)nde?']],
		[63,0,0,['pascal second','pascal se(?:co|ku)nde?']],
		[71,0,0,['lumen second','lumen se(?:co|ku)nde?']],
		[72,0,0,['lux second','lux se(?:co|ku)nde?']],
		[['thermodynamic temperature by amount of substance'],0,0,['kelvin mole','kelvin mole?']],
		[['thermodynamic temperature by mass'],0,0,['kilogramm? kelvin','kilogramm? kelvin']],
		[['length by thermodynamic temperature'],0,0,['meter kelvin','(?:meter|m[eè]tre) kelvin']],
		[['electric conductance by area'],0,0,['siemens square meter','siemens (square ?|quadrat ?)?meter|m[eè]tre']]
		
		/* TODO
			CONSTANTS:: m-1:wavenumber
			----------+	
			watt hours
			currency/währung, loudness/lautheit, bandRate/tonheit, bpm, lat/lng
			Richter
			megaparsec [Mpc]
			Kiloparsec [kpc]
			Parsec [pc]
			Lichtjahr [ly]
			astronomical unit [AU]
			Liga [lea]
			Fermi [f]
			Arpent 
			Twip
			ALN
			Kaliber
			Ken
			Reed
			
			Planck-Länge
			http://physics.nist.gov/cuu/Units/outside.html +
			GtCO2eq, MTU, toe, gilbert, bushel
			1 board-foot = 1 ft × 1 ft × 1 in = 2.360 dm3
			1 British thermal unit (Btu) ≈ 1055 J
			1 calorie (cal) = 4.184 J
			1 food calorie (kilocalorie, large calorie) (kcal, Cal) = 4.184 kJ
			1 foot-pound (energy) ≈ 1.356 J
			1 hand = 10.16 cm // finger // nail
			1 horsepower ≈ 745.7 W
			1 R-value (ft2·°F·h/Btu) ≈ 0.1761 RSI (K·m2/W)
			1 slug = 1 lbf·s2/ft
			1 U (rack unit) = 1.75 in
// calculation (special):
/!	46 	newton metre second						N⋅m⋅s				angular momentum																				m2⋅kg⋅s−1
/!	54 	joule per kelvin mole					J/(K⋅mol)		molar heat capacity, molelectric displacement field, polarization vectorar entropy 	m2⋅kg⋅s−2⋅K−1⋅mol−1
/!	55 	joule per kilogram kelvin			J/(K⋅kg)			specific heat capacity, specific entropy								m2⋅s−2⋅K−1
/!	61 	watt per metre kelvin					W/(m⋅K)			thermal conductivity																		m⋅kg⋅s−3⋅K−1
/!	67 	siemens square metre per mole	S⋅m2/mol	 		molar conductivity																			kg−1⋅s3⋅mol−1⋅A2
/!	49 	reciprocal metre							m−1					wavenumber, optical power, curvature, spatial frequency	m−1
		*/
	],
	pows: { 
		// TODO http://physics.stackexchange.com/questions/11779/whats-the-range-of-dimension-exponents-in-the-si-units-system
		// regexPrefix, regexSuffix 
		_2: ['square ','square|quadrat|centiare|centare|(?:s?q[. ]*)', '(?: carr[eé])|(?: squared?)|\\u00B2|2'],
		_3: ['cubic ','[ck]ubi[ck]|(?:[ck]b[. ]*)', '(?: cubed?)|\\u00B3|3'],
		_4: ['quartic ','quarti(?:c|que)|biquadratische?|q.', '(?: quarti(?:c|que))|\\u2074|4'],
		length: [0,3,4,5] //-, length, area, volume
	},
	
	by: {
		_: "by|\\u22C5|\\u00B7|\\u00D7|\\u2715|\\*",
		force: {
			time: 45,
			length: 47
		},
		energy: {
			time: 52,
			'thermodynamic temperature': 53
		},
		pressure: {
			time: 63
		},
		'luminous flux': {
			time: 71
		},
		illumination: {
			time: 72
		},
		'electric resistance': {
			length: 75
		}
	},
	per: {
		_: 'per|pro|a l?|\\/',
		length: {
			length: 10,
			time: 31,
			time_2: 32,	// TODO
			time_3: 42,	// TODO
			time_4: 43	// TODO
		},
		area: {
			area: 11,
			time: 62
		},
		mass: {
			volume: 33,
			mass: 34,
			area: 50
		},
		volume: {
			mass: 35,
			time: 41,
			'amount of substance': 51
		},
		'plane angle': {
			time: 44
		},
		force: {
			length: 12,
			area: 13,
			time: 48
		},
		energy: {
			time: 14,
			'thermodynamic temperature by amount of substance': 54,
			'thermodynamic temperature by mass': 55,
			'amount of substance': 56,
			mass: 57,
			volume: 58
		},
		'electric current': {
			length: 36,
			area: 37
		},
		'amount of substance': {
			volume: 38
		},
		'luminous intensity': {
			area: 39
		},
		power: {
			area: 60,
			'length by thermodynamic temperature': 61
		},
		'electric charge': {
			area: 64,
			volume: 65,
			mass: 73
		},
		'electric conductance': {
			length: 66
		},
		'electric conductance by area': {
			'amount of substance': 67
		},
		'electric capacitance': {
			length: 68
		},
		inductance: {
			length: 69
		},
		voltage: {
			length: 70
		},
		'radioactivity absorbed dose': {
			time: 74	
		}
		/*
		[0,0,0,['siemens square meter','siemens (square ?|quadrat ?)?meter|m[eè]tre']], //... per mol 67
		*/
	},
	
	currencies: { ALL:'L', AFN:'؋', ARS:'$', AWG:'ƒ', AUD:'$', AZN:'₼', BSD:'$', BBD:'$', BYR:'p.', BZD:'BZ$', BMD:'$', BOB:'Bs.', BAM:'KM', BWP:'P', BGN:'лв', BRL:'R$', BND:'$', KHR:'៛', CAD:'$', KYD:'$', CLP:'$', CNY:'¥', COP:'$', CRC:'₡', HRK:'kn', CUP:'₱', CZK:'Kč', DKK:'kr', DOP:'RD$', XCD:'$', EGP:'£', SVC:'$', EEK:'kr', EUR:'€', FKP:'£', FJD:'$', GHC:'¢', GIP:'£', GTQ:'Q', GGP:'£', GYD:'$', HNL:'L', HKD:'$', HUF:'Ft', ISK:'kr', INR:'₹', IDR:'Rp', IRR:'﷼', IMP:'£', ILS:'₪', JMD:'J$', JPY:'¥', JEP:'£', KES:'KSh', KZT:'лв', KPW:'₩', KRW:'₩', KGS:'лв', LAK:'₭', LVL:'Ls', LBP:'£', LRD:'$', LTL:'Lt', MKD:'ден', MYR:'RM', MUR:'₨', MXN:'$', MNT:'₮', MZN:'MT', NAD:'$', NPR:'₨', ANG:'ƒ', NZD:'$', NIO:'C$', NGN:'₦', NOK:'kr', OMR:'﷼', PKR:'₨', PAB:'B/.', PYG:'Gs', PEN:'S/.', PHP:'₱', PLN:'zł', QAR:'﷼', RON:'lei', RUB:'₽', SHP:'£', SAR:'﷼', RSD:'Дин.', SCR:'₨', SGD:'$', SBD:'$', SOS:'S', ZAR:'R', LKR:'₨', SEK:'kr', CHF:'Fr.', SRD:'$', SYP:'£', TZS:'TSh', TWD:'NT$', THB:'฿', TTD:'TT$', TRY:'', TRL:'₤', TVD:'$', UGX:'USh', UAH:'₴', GBP:'£', USD:'$', UYU:'$U', UZS:'лв', VEF:'Bs', VND:'₫', YER:'﷼', ZWD:'Z$'},
	
	cryptoCurrencies: {
		
	}
},

//: unambigous suffixes
unambiguousSuffixes: {
	en: {
		NN: [
			'ceae', 'inae', 'idae', 'leaf', 'rgan', 'eman', 'sman', 'star', 'boat', 'tube', 'rica', 'tica', 'nica', 'auce', 'tics', 'ency', 'ancy', 'poda', 'tude', 'xide', 'body', 'weed', 'tree', 'rrel', 'stem', 'cher', 'icer', 'erer', 'ader', 'ncer', 'izer', 'ayer', 'nner', 'ates', 'ales', 'ides', 'rmes', 'etes', 'llet', 'uage', 'ings', 'aphy', 'chid', 'tein', 'vein', 'hair', 'tris', 'unit', 'cake', 'nake', 'illa', 'ella', 'icle', 'ille', 'etle', 'scle', 'cell', 'bell', 'bill', 'palm', 'toma', 'game', 'lamp', 'bone', 'mann', 'ment', 'wood', 'book', 'nson', 'agon', 'odon', 'dron', 'iron', 'tion', 'itor', 'ator', 'root', 'cope', 'tera', 'hora', 'lora', 'bird', 'worm', 'fern', 'horn', 'wort', 'ourt', 'stry', 'etry', 'bush', 'ness', 'gist', 'rata', 'lata', 'tata', 'moth', 'lity', 'nity', 'sity', 'rity', 'city', 'dity', 'vity', 'drug', 'dium', 'llum', 'trum', 'inum', 'lium', 'tium', 'atum', 'rium', 'icum', 'anum', 'nium', 'orum', 'icus', 'opus', 'chus', 'ngus', 'thus', 'rius', 'rpus'
		],
		JJ: [
			'liac', 'siac', 'clad', 'deaf', 'xial', 'hial', 'chal', 'rpal', 'asal', 'rial', 'teal', 'oeal', 'vial', 'phal', 'sial', 'heal', 'rbal', 'neal', 'geal', 'dial', 'eval', 'bial', 'ugal', 'kian', 'izan', 'rtan', 'odan', 'llan', 'zian', 'eian', 'eyan', 'ndan', 'eban', 'near', 'unar', 'lear', 'liar', '-day', '-way', 'tech', 'sick', 'tuck', 'inct', 'unct', 'wide', 'endo', 'uddy', 'eedy', 'uted', 'aled', 'rred', 'oned', 'rted', 'obed', 'oped', 'ched', 'dded', 'cted', 'tied', 'eked', 'ayed', 'rked', 'teed', 'mmed', 'tred', 'awed', 'rbed', 'bbed', 'axed', 'bred', 'pied', 'cked', 'rced', 'ened', 'fied', 'lved', 'mned', 'kled', 'hted', 'lied', 'eted', 'rded', 'lued', 'rved', 'azed', 'oked', 'ghed', 'sked', 'emed', 'aded', 'ived', 'mbed', 'pted', 'zled', 'ored', 'pled', 'wned', 'afed', 'nied', 'aked', 'gued', 'oded', 'oved', 'oled', 'ymed', 'lled', 'bled', 'cled', 'eded', 'toed', 'ited', 'oyed', 'eyed', 'ured', 'omed', 'ixed', 'pped', 'ined', 'lted', 'iced', 'exed', 'nded', 'amed', 'owed', 'dged', 'nted', 'eged', 'nned', 'used', 'ibed', 'nced', 'umed', 'dled', 'died', 'rged', 'aped', 'oted', 'uled', 'ided', 'nked', 'aved', 'rled', 'rned', 'aned', 'rmed', 'lmed', 'aged', 'ized', 'eved', 'ofed', 'thed', 'ered', 'ared', 'ated', 'eled', 'sted', 'ewed', 'nsed', 'nged', 'lded', 'gged', 'osed', 'fled', 'shed', 'aced', 'ffed', 'tted', 'uced', 'iled', 'uded', 'ired', 'yzed', '-fed', 'mped', 'iked', 'fted', 'imed', 'hree', 'llel', 'aten', 'lden', 'nken', 'apen', 'ozen', 'ober', '-set', 'nvex', 'osey', 'laid', 'paid', 'xvii', 'xxii', '-air', 'tair', 'icit', 'knit', 'nlit', 'xxiv', '-six', '-old', 'held', 'cile', 'ible', 'able', 'gile', 'full', '-ply', 'bbly', 'ggly', 'zzly', '-one', 'mane', 'mune', 'rung', 'uing', 'mant', 'yant', 'uant', 'pant', 'urnt', 'awny', 'eeny', 'ainy', 'orny', 'siny', 'tood', 'shod', '-toe', 'd-on', '-top', '-for', 'odox', 'wept', 'eepy', 'oopy', 'hird', 'dern', 'worn', 'mart', 'ltry', 'oury', 'ngry', 'arse', 'bose', 'cose', 'mose', 'iose', 'gish', 'kish', 'pish', 'wish', 'vish', 'yish', 'owsy', 'ensy', 'easy', 'ifth', 'edth', 'urth', 'ixth', '00th', 'ghth', 'ilty', 'orty', 'ifty', 'inty', 'ghty', 'kety', 'afty', 'irty', 'roud', 'true', 'wful', 'dful', 'rful', 'mful', 'gful', 'lful', 'hful', 'kful', 'iful', 'yful', 'sful', 'tive', 'cave', 'sive', 'five', 'cive', 'xxvi', 'urvy', 'nown', 'hewn', 'lown', '-two', 'lowy', 'ctyl'
		],
		VB: [
			'wrap', 'hear', 'draw', 'rlay', 'away', 'elay', 'duce', 'esce', 'elch', 'ooch', 'pick', 'huck', 'back', 'hack', 'ruct', 'lict', 'nect', 'vict', 'eact', 'tect', 'vade', 'lude', 'vide', 'rude', 'cede', 'ceed', 'ivel', 'hten', 'rken', 'shen', 'open', 'quer', 'over', 'efer', 'eset', 'uiet', 'pret', 'ulge', 'lign', 'pugn', 'othe', 'rbid', 'raid', 'veil', 'vail', 'roil', 'join', 'dain', 'feit', 'mmit', 'erit', 'voke', 'make', 'weld', 'uild', 'idle', 'rgle', 'otle', 'rble', 'self', 'fill', 'till', 'eels', 'sult', 'pply', 'sume', 'dime', 'lame', 'lump', 'rump', 'vene', 'cook', 'look', 'from', 'elop', 'grow', 'adow', 'ploy', 'sorb', 'pare', 'uire', 'jure', 'lore', 'surf', 'narl', 'earn', 'ourn', 'hirr', 'tort', '-fry', 'uise', 'lyse', 'sise', 'hise', 'tise', 'nise', 'lise', 'rise', 'anse', 'gise', 'owse', 'oosh', 'resh', 'cuss', 'uess', 'sess', 'vest', 'inst', 'gest', 'fest', 'xist', 'into', 'ccur', 'ieve', 'eive', 'olve', 'down', '-dye', 'laze', 'lyze', 'raze', 'ooze'
		],
		RB: [
			'that', 'oubt', 'much', 'diem', 'high', 'atim', 'sely', 'nely', 'ibly', 'lely', 'dely', 'ally', 'gely', 'imly', 'tely', 'ully', 'ably', 'owly', 'vely', 'cely', 'mely', 'mply', 'ngly', 'exly', 'ffly', 'rmly', 'rely', 'uely', 'time', 'iori', 'oors', 'wise', 'orst', 'east', 'ways'
		]
	}
	// end unambiguousSuffixes.en
},


//: normalisation and denormalisation
normalisations: [
	['²', '2'], ['ƻ', '2'], ['³', '3'], ['Ʒ', '3'], ['Ƹ', '3'], ['ƹ', '3'], ['ƺ', '3'], ['Ǯ', '3'], ['ǯ', '3'], ['З', '3'], ['Ҙ', '3'], ['ҙ', '3'], ['Ӟ', '3'], ['ӟ', '3'], ['Ӡ', '3'], ['ӡ', '3'], ['Ȝ', '3'], ['ȝ', '3'], ['Ƽ', '5'], ['ƽ', '5'], ['Ȣ', '8'], ['ȣ', '8'], ['¡', '!'], ['¿', '?'], ['Ɂ', '?'], ['ɂ', '?'], ['ª', 'a'], ['À', 'a'], ['Á', 'a'], ['Â', 'a'], ['Ã', 'a'], ['Ä', 'a'], ['Å', 'a'], ['à', 'a'], ['á', 'a'], ['â', 'a'], ['ã', 'a'], ['ä', 'a'], ['å', 'a'], ['Ā', 'a'], ['ā', 'a'], ['Ă', 'a'], ['ă', 'a'], ['Ą', 'a'], ['ą', 'a'], ['Ǎ', 'a'], ['ǎ', 'a'], ['Ǟ', 'a'], ['ǟ', 'a'], ['Ǡ', 'a'], ['ǡ', 'a'], ['Ǻ', 'a'], ['ǻ', 'a'], ['Ȁ', 'a'], ['ȁ', 'a'], ['Ȃ', 'a'], ['ȃ', 'a'], ['Ȧ', 'a'], ['ȧ', 'a'], ['Ⱥ', 'a'], ['Ά', 'a'], ['Α', 'a'], ['Δ', 'a'], ['Λ', 'a'], ['ά', 'a'], ['α', 'a'], ['λ', 'a'], ['А', 'a'], ['Д', 'a'], ['а', 'a'], ['д', 'a'], ['Ѧ', 'a'], ['ѧ', 'a'], ['Ӑ', 'a'], ['ӑ', 'a'], ['Ӓ', 'a'], ['ӓ', 'a'], ['ƛ', 'a'], ['Ʌ', 'a'], ['ß', 'b'], ['þ', 'b'], ['ƀ', 'b'], ['Ɓ', 'b'], ['Ƃ', 'b'], ['ƃ', 'b'], ['Ƅ', 'b'], ['ƅ', 'b'], ['Ƀ', 'b'], ['Β', 'b'], ['β', 'b'], ['ϐ', 'b'], ['Ϧ', 'b'], ['Б', 'b'], ['В', 'b'], ['Ъ', 'b'], ['Ь', 'b'], ['б', 'b'], ['в', 'b'], ['ъ', 'b'], ['ь', 'b'], ['Ѣ', 'b'], ['ѣ', 'b'], ['Ҍ', 'b'], ['ҍ', 'b'], ['Ҕ', 'b'], ['ҕ', 'b'], ['ƥ', 'b'], ['ƾ', 'b'], ['¢', 'c'], ['©', 'c'], ['Ç', 'c'], ['ç', 'c'], ['Ć', 'c'], ['ć', 'c'], ['Ĉ', 'c'], ['ĉ', 'c'], ['Ċ', 'c'], ['ċ', 'c'], ['Č', 'c'], ['č', 'c'], ['Ɔ', 'c'], ['Ƈ', 'c'], ['ƈ', 'c'], ['Ȼ', 'c'], ['ȼ', 'c'], ['ͻ', 'c'], ['ͼ', 'c'], ['ͽ', 'c'], ['ϲ', 'c'], ['Ϲ', 'c'], ['Ͻ', 'c'], ['Ͼ', 'c'], ['Ͽ', 'c'], ['Є', 'c'], ['С', 'c'], ['с', 'c'], ['є', 'c'], ['Ҁ', 'c'], ['ҁ', 'c'], ['Ҫ', 'c'], ['ҫ', 'c'], ['Ð', 'd'], ['Ď', 'd'], ['ď', 'd'], ['Đ', 'd'], ['đ', 'd'], ['Ɖ', 'd'], ['Ɗ', 'd'], ['ȡ', 'd'], ['Ƌ', 'd'], ['ƌ', 'd'], ['Ƿ', 'd'], ['È', 'e'], ['É', 'e'], ['Ê', 'e'], ['Ë', 'e'], ['è', 'e'], ['é', 'e'], ['ê', 'e'], ['ë', 'e'], ['Ē', 'e'], ['ē', 'e'], ['Ĕ', 'e'], ['ĕ', 'e'], ['Ė', 'e'], ['ė', 'e'], ['Ę', 'e'], ['ę', 'e'], ['Ě', 'e'], ['ě', 'e'], ['Ǝ', 'e'], ['Ə', 'e'], ['Ɛ', 'e'], ['ǝ', 'e'], ['Ȅ', 'e'], ['ȅ', 'e'], ['Ȇ', 'e'], ['ȇ', 'e'], ['Ȩ', 'e'], ['ȩ', 'e'], ['Ɇ', 'e'], ['ɇ', 'e'], ['Έ', 'e'], ['Ε', 'e'], ['Ξ', 'e'], ['Σ', 'e'], ['έ', 'e'], ['ε', 'e'], ['ξ', 'e'], ['ϱ', 'e'], ['ϵ', 'e'], ['϶', 'e'], ['Ѐ', 'e'], ['Ё', 'e'], ['Е', 'e'], ['Э', 'e'], ['е', 'e'], ['ѐ', 'e'], ['ё', 'e'], ['Ҽ', 'e'], ['ҽ', 'e'], ['Ҿ', 'e'], ['ҿ', 'e'], ['Ӗ', 'e'], ['ӗ', 'e'], ['Ә', 'e'], ['ә', 'e'], ['Ӛ', 'e'], ['ӛ', 'e'], ['Ӭ', 'e'], ['ӭ', 'e'], ['Ƒ', 'f'], ['ƒ', 'f'], ['Ϝ', 'f'], ['ϝ', 'f'], ['Ӻ', 'f'], ['ӻ', 'f'], ['Ĝ', 'g'], ['ĝ', 'g'], ['Ğ', 'g'], ['ğ', 'g'], ['Ġ', 'g'], ['ġ', 'g'], ['Ģ', 'g'], ['ģ', 'g'], ['Ɠ', 'g'], ['Ǥ', 'g'], ['ǥ', 'g'], ['Ǧ', 'g'], ['ǧ', 'g'], ['Ǵ', 'g'], ['ǵ', 'g'], ['Ĥ', 'h'], ['ĥ', 'h'], ['Ħ', 'h'], ['ħ', 'h'], ['ƕ', 'h'], ['Ƕ', 'h'], ['Ȟ', 'h'], ['ȟ', 'h'], ['Ή', 'h'], ['Η', 'h'], ['Ђ', 'h'], ['Њ', 'h'], ['Ћ', 'h'], ['Н', 'h'], ['н', 'h'], ['ђ', 'h'], ['ћ', 'h'], ['Ң', 'h'], ['ң', 'h'], ['Ҥ', 'h'], ['ҥ', 'h'], ['Һ', 'h'], ['һ', 'h'], ['Ӊ', 'h'], ['ӊ', 'h'], ['Ì', 'I'], ['Í', 'I'], ['Î', 'I'], ['Ï', 'I'], ['ì', 'i'], ['í', 'i'], ['î', 'i'], ['ï', 'i'], ['Ĩ', 'i'], ['ĩ', 'i'], ['Ī', 'i'], ['ī', 'i'], ['Ĭ', 'i'], ['ĭ', 'i'], ['Į', 'i'], ['į', 'i'], ['İ', 'i'], ['ı', 'i'], ['Ɩ', 'i'], ['Ɨ', 'i'], ['Ȉ', 'i'], ['ȉ', 'i'], ['Ȋ', 'i'], ['ȋ', 'i'], ['Ί', 'i'], ['ΐ', 'i'], ['Ϊ', 'i'], ['ί', 'i'], ['ι', 'i'], ['ϊ', 'i'], ['І', 'i'], ['Ї', 'i'], ['і', 'i'], ['ї', 'i'], ['Ĵ', 'j'], ['ĵ', 'j'], ['ǰ', 'j'], ['ȷ', 'j'], ['Ɉ', 'j'], ['ɉ', 'j'], ['ϳ', 'j'], ['Ј', 'j'], ['ј', 'j'], ['Ķ', 'k'], ['ķ', 'k'], ['ĸ', 'k'], ['Ƙ', 'k'], ['ƙ', 'k'], ['Ǩ', 'k'], ['ǩ', 'k'], ['Κ', 'k'], ['κ', 'k'], ['Ќ', 'k'], ['Ж', 'k'], ['К', 'k'], ['ж', 'k'], ['к', 'k'], ['ќ', 'k'], ['Қ', 'k'], ['қ', 'k'], ['Ҝ', 'k'], ['ҝ', 'k'], ['Ҟ', 'k'], ['ҟ', 'k'], ['Ҡ', 'k'], ['ҡ', 'k'], ['Ĺ', 'l'], ['ĺ', 'l'], ['Ļ', 'l'], ['ļ', 'l'], ['Ľ', 'l'], ['ľ', 'l'], ['Ŀ', 'l'], ['ŀ', 'l'], ['Ł', 'l'], ['ł', 'l'], ['ƚ', 'l'], ['ƪ', 'l'], ['ǀ', 'l'], ['Ǐ', 'l'], ['ǐ', 'l'], ['ȴ', 'l'], ['Ƚ', 'l'], ['Ι', 'l'], ['Ӏ', 'l'], ['ӏ', 'l'], ['Μ', 'm'], ['Ϻ', 'm'], ['ϻ', 'm'], ['М', 'm'], ['м', 'm'], ['Ӎ', 'm'], ['ӎ', 'm'], ['Ñ', 'n'], ['ñ', 'n'], ['Ń', 'n'], ['ń', 'n'], ['Ņ', 'n'], ['ņ', 'n'], ['Ň', 'n'], ['ň', 'n'], ['ŉ', 'n'], ['Ŋ', 'n'], ['ŋ', 'n'], ['Ɲ', 'n'], ['ƞ', 'n'], ['Ǹ', 'n'], ['ǹ', 'n'], ['Ƞ', 'n'], ['ȵ', 'n'], ['Ν', 'n'], ['Π', 'n'], ['ή', 'n'], ['η', 'n'], ['Ϟ', 'n'], ['Ѝ', 'n'], ['И', 'n'], ['Й', 'n'], ['Л', 'n'], ['П', 'n'], ['и', 'n'], ['й', 'n'], ['л', 'n'], ['п', 'n'], ['ѝ', 'n'], ['Ҋ', 'n'], ['ҋ', 'n'], ['Ӆ', 'n'], ['ӆ', 'n'], ['Ӣ', 'n'], ['ӣ', 'n'], ['Ӥ', 'n'], ['ӥ', 'n'], ['π', 'n'], ['Ò', 'o'], ['Ó', 'o'], ['Ô', 'o'], ['Õ', 'o'], ['Ö', 'o'], ['Ø', 'o'], ['ð', 'o'], ['ò', 'o'], ['ó', 'o'], ['ô', 'o'], ['õ', 'o'], ['ö', 'o'], ['ø', 'o'], ['Ō', 'o'], ['ō', 'o'], ['Ŏ', 'o'], ['ŏ', 'o'], ['Ő', 'o'], ['ő', 'o'], ['Ɵ', 'o'], ['Ơ', 'o'], ['ơ', 'o'], ['Ǒ', 'o'], ['ǒ', 'o'], ['Ǫ', 'o'], ['ǫ', 'o'], ['Ǭ', 'o'], ['ǭ', 'o'], ['Ǿ', 'o'], ['ǿ', 'o'], ['Ȍ', 'o'], ['ȍ', 'o'], ['Ȏ', 'o'], ['ȏ', 'o'], ['Ȫ', 'o'], ['ȫ', 'o'], ['Ȭ', 'o'], ['ȭ', 'o'], ['Ȯ', 'o'], ['ȯ', 'o'], ['Ȱ', 'o'], ['ȱ', 'o'], ['Ό', 'o'], ['Θ', 'o'], ['Ο', 'o'], ['Φ', 'o'], ['Ω', 'o'], ['δ', 'o'], ['θ', 'o'], ['ο', 'o'], ['σ', 'o'], ['ό', 'o'], ['ϕ', 'o'], ['Ϙ', 'o'], ['ϙ', 'o'], ['Ϭ', 'o'], ['ϭ', 'o'], ['ϴ', 'o'], ['О', 'o'], ['Ф', 'o'], ['о', 'o'], ['Ѳ', 'o'], ['ѳ', 'o'], ['Ѻ', 'o'], ['ѻ', 'o'], ['Ѽ', 'o'], ['ѽ', 'o'], ['Ӧ', 'o'], ['ӧ', 'o'], ['Ө', 'o'], ['ө', 'o'], ['Ӫ', 'o'], ['ӫ', 'o'], ['¤', 'o'], ['ƍ', 'o'], ['Ώ', 'o'], ['Ƥ', 'p'], ['ƿ', 'p'], ['Ρ', 'p'], ['ρ', 'p'], ['Ϸ', 'p'], ['ϸ', 'p'], ['ϼ', 'p'], ['Р', 'p'], ['р', 'p'], ['Ҏ', 'p'], ['ҏ', 'p'], ['Þ', 'p'], ['Ɋ', 'q'], ['ɋ', 'q'], ['­®', 'r'], ['Ŕ', 'r'], ['ŕ', 'r'], ['Ŗ', 'r'], ['ŗ', 'r'], ['Ř', 'r'], ['ř', 'r'], ['Ʀ', 'r'], ['Ȑ', 'r'], ['ȑ', 'r'], ['Ȓ', 'r'], ['ȓ', 'r'], ['Ɍ', 'r'], ['ɍ', 'r'], ['Ѓ', 'r'], ['Г', 'r'], ['Я', 'r'], ['г', 'r'], ['я', 'r'], ['ѓ', 'r'], ['Ґ', 'r'], ['ґ', 'r'], ['Ғ', 'r'], ['ғ', 'r'], ['Ӷ', 'r'], ['ӷ', 'r'], ['ſ', 'r'], ['Ś', 's'], ['ś', 's'], ['Ŝ', 's'], ['ŝ', 's'], ['Ş', 's'], ['ş', 's'], ['Š', 's'], ['š', 's'], ['Ƨ', 's'], ['ƨ', 's'], ['Ș', 's'], ['ș', 's'], ['ȿ', 's'], ['ς', 's'], ['Ϛ', 's'], ['ϛ', 's'], ['ϟ', 's'], ['Ϩ', 's'], ['ϩ', 's'], ['Ѕ', 's'], ['ѕ', 's'], ['Ţ', 't'], ['ţ', 't'], ['Ť', 't'], ['ť', 't'], ['Ŧ', 't'], ['ŧ', 't'], ['ƫ', 't'], ['Ƭ', 't'], ['ƭ', 't'], ['Ʈ', 't'], ['Ț', 't'], ['ț', 't'], ['ȶ', 't'], ['Ⱦ', 't'], ['Γ', 't'], ['Τ', 't'], ['τ', 't'], ['Ϯ', 't'], ['ϯ', 't'], ['Т', 't'], ['т', 't'], ['҂', 't'], ['Ҭ', 't'], ['ҭ', 't'], ['µ', 'u'], ['Ù', 'u'], ['Ú', 'u'], ['Û', 'u'], ['Ü', 'u'], ['ù', 'u'], ['ú', 'u'], ['û', 'u'], ['ü', 'u'], ['Ũ', 'u'], ['ũ', 'u'], ['Ū', 'u'], ['ū', 'u'], ['Ŭ', 'u'], ['ŭ', 'u'], ['Ů', 'u'], ['ů', 'u'], ['Ű', 'u'], ['ű', 'u'], ['Ų', 'u'], ['ų', 'u'], ['Ư', 'u'], ['ư', 'u'], ['Ʊ', 'u'], ['Ʋ', 'u'], ['Ǔ', 'u'], ['ǔ', 'u'], ['Ǖ', 'u'], ['ǖ', 'u'], ['Ǘ', 'u'], ['ǘ', 'u'], ['Ǚ', 'u'], ['ǚ', 'u'], ['Ǜ', 'u'], ['ǜ', 'u'], ['Ȕ', 'u'], ['ȕ', 'u'], ['Ȗ', 'u'], ['ȗ', 'u'], ['Ʉ', 'u'], ['ΰ', 'u'], ['μ', 'u'], ['υ', 'u'], ['ϋ', 'u'], ['ύ', 'u'], ['ϑ', 'u'], ['Џ', 'u'], ['Ц', 'u'], ['Ч', 'u'], ['ц', 'u'], ['џ', 'u'], ['Ҵ', 'u'], ['ҵ', 'u'], ['Ҷ', 'u'], ['ҷ', 'u'], ['Ҹ', 'u'], ['ҹ', 'u'], ['Ӌ', 'u'], ['ӌ', 'u'], ['Ӈ', 'u'], ['ӈ', 'u'], ['Ɣ', 'v'], ['ν', 'v'], ['Ѵ', 'v'], ['ѵ', 'v'], ['Ѷ', 'v'], ['ѷ', 'v'], ['Ŵ', 'w'], ['ŵ', 'w'], ['Ɯ', 'w'], ['ω', 'w'], ['ώ', 'w'], ['ϖ', 'w'], ['Ϣ', 'w'], ['ϣ', 'w'], ['Ш', 'w'], ['Щ', 'w'], ['ш', 'w'], ['щ', 'w'], ['ѡ', 'w'], ['ѿ', 'w'], ['×', 'x'], ['Χ', 'x'], ['χ', 'x'], ['ϗ', 'x'], ['ϰ', 'x'], ['Х', 'x'], ['х', 'x'], ['Ҳ', 'x'], ['ҳ', 'x'], ['Ӽ', 'x'], ['ӽ', 'x'], ['Ӿ', 'x'], ['ӿ', 'x'], ['¥', 'y'], ['Ý', 'y'], ['ý', 'y'], ['ÿ', 'y'], ['Ŷ', 'y'], ['ŷ', 'y'], ['Ÿ', 'y'], ['Ƴ', 'y'], ['ƴ', 'y'], ['Ȳ', 'y'], ['ȳ', 'y'], ['Ɏ', 'y'], ['ɏ', 'y'], ['Ύ', 'y'], ['Υ', 'y'], ['Ψ', 'y'], ['Ϋ', 'y'], ['γ', 'y'], ['ψ', 'y'], ['ϒ', 'y'], ['ϓ', 'y'], ['ϔ', 'y'], ['Ў', 'y'], ['У', 'y'], ['у', 'y'], ['ч', 'y'], ['ў', 'y'], ['Ѱ', 'y'], ['ѱ', 'y'], ['Ү', 'y'], ['ү', 'y'], ['Ұ', 'y'], ['ұ', 'y'], ['Ӯ', 'y'], ['ӯ', 'y'], ['Ӱ', 'y'], ['ӱ', 'y'], ['Ӳ', 'y'], ['ӳ', 'y'], ['Ź', 'z'], ['ź', 'z'], ['Ż', 'z'], ['ż', 'z'], ['Ž', 'z'], ['ž', 'z'], ['Ʃ', 'z'], ['Ƶ', 'z'], ['ƶ', 'z'], ['Ȥ', 'z'], ['ȥ', 'z'], ['ɀ', 'z'], ['Ζ', 'z'], ['ζ', 'z']
]
}

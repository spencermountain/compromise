// nlp_comprimise by @spencermountain  in 2014

/* *********************************************************************************************************
//	The main dictionary to build various language (or context) specific lexica -
//  part 4 : The "Schema" --> parts_of_speech
********************************************************************************************************* */

// see ./build.js for generating the lexica

var main = {
	tenses: {
		infinitive: {
			en: 'infinitive',
			de: 'Infinitiv',
			tag: 'VBP',
			base: 1
		},
		present: {
			en: 'present',
			de: 'Präsenz',
			tag: 'VBZ',
			base: 1
		},
		past: {
			en: 'past',
			de: 'Imperfekt',
			tag: 'VBD',
			base: 1
		},
		gerund: {
			en: 'gerund',
			de: 'Gerundium',
			tag: 'VBG',
			base: 1
		},
		doer: {
			en: 'doer',
			de: 'Ausführer',
			tag: 'NNA'
		},
		participle: {
			en: 'participle',
			de: 'Partizip',
			tag: 'VBN'
		},
		future: {
			en: 'future',
			de: 'Futur',
			tag: 'VBF'
		},
		futurePerfect: {
			en: 'future perfect',
			de: 'Futur-Perfekt',
			tag: 'VB'
		},
		perfect: {
			en: 'perfect',
			de: 'Perfekt',
			tag: 'VB'
		},
		pluperfect: {
			en: 'pluperfect',
			de: 'Plusquamperfekt',
			tag: 'VB'
		}
	},
	tags: {
		VB: {
			en: 'verb, generic',
			parent: 'verb'
		},
		VBD: {
			en: 'past-tense verb',
			parent: 'verb',
			tense: 'past'
		},
		VBN: {
			en: 'past-participle verb',
			parent: 'verb',
			tense: 'past'
		},
		VBP: {
			en: 'infinitive verb',
			parent: 'verb',
			tense: 'present'
		},
		VBF: {
			en: 'future-tense verb',
			parent: 'verb',
			tense: 'future'
		},
		VBZ: {
			en: 'present-tense verb',
			tense: 'present',
			parent: 'verb'
		},
		CP: {
			en: 'copula',
			parent: 'verb'
		},
		VBG: {
			en: 'gerund verb',
			parent: 'verb'
		},

		// adjectives
		JJ: {
			en: 'adjective, generic',
			parent: 'adjective'
		},
		JJR: {
			en: 'comparative adjective',
			parent: 'adjective'
		},
		JJS: {
			en: 'superlative adjective',
			parent: 'adjective'
		},

		// adverbs
		RB: {
			en: 'adverb',
			parent: 'adverb'
		},
		RBR: {
			en: 'comparative adverb',
			parent: 'adverb'
		},
		RBS: {
			en: 'superlative adverb',
			parent: 'adverb'
		},

		// nouns
		NN: {
			en: 'noun, generic',
			parent: 'noun'
		},
		NNP: {
			en: 'singular proper noun',
			parent: 'noun'
		},
		NNA: {
			en: 'noun, active',
			parent: 'noun'
		},
		NNPA: {
			en: 'noun, acronym',
			parent: 'noun'
		},
		NNPS: {
			en: 'plural proper noun',
			parent: 'noun'
		},
		NNAB: {
			en: 'noun, abbreviation',
			parent: 'noun'
		},
		NNS: {
			en: 'plural noun',
			parent: 'noun'
		},
		NNO: {
			en: 'possessive noun',
			parent: 'noun'
		},
		NNG: {
			en: 'gerund noun',
			parent: 'noun'
		},

		PP: {
			en: 'possessive pronoun',
			parent: 'noun'
		},
		PRP: {
			en: 'personal pronoun',
			parent: 'noun'
		},
		// value and glue
		FW: {
			en: 'foreign word',
			parent: 'glue'
		},
		CD: {
			en: 'cardinal value, generic',
			parent: 'value'
		},
		DA: {
			en: 'date',
			parent: 'value'
		},
		NU: {
			en: 'number',
			parent: 'value'
		},
		IN: {
			en: 'preposition',
			parent: 'glue'
		},
		MD: {
			en: 'modal verb',
			parent: 'verb', //dunno
		},
		CC: {
			en: 'co-ordating conjunction',
			parent: 'glue'
		},
		DT: {
			en: 'determiner',
			parent: 'glue'
		},
		UH: {
			en: 'interjection',
			parent: 'glue'
		},
		EX: {
			en: 'existential there',
			parent: 'glue'
		}
	}
}
if (typeof module !== 'undefined' && module.exports) module.exports = main;

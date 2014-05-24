var parts_of_speech = (function() {

    var main = {

        //verbs
        "VB": {
            "name": "verb, generic",
            "example": "eat",
            "parent": "verb",
            "tag": "VB"
        },
        "VBD": {
            "name": "past-tense verb",
            "example": "ate",
            "parent": "verb",
            "tense": "past",
            "tag": "VBD"
        },
        "VBN": {
            "name": "past-participle verb",
            "example": "eaten",
            "parent": "verb",
            "tense": "past",
            "tag": "VBN"
        },
        "VBP": {
            "name": "infinitive verb",
            "example": "eat",
            "parent": "verb",
            "tense": "present",
            "tag": "VBP"
        },
        "VBZ": {
            "name": "present-tense verb",
            "example": "eats, swims",
            "tense": "present",
            "parent": "verb",
            "tag": "VBZ"
        },
        "CP": {
            "name": "copula",
            "example": "is, was, were",
            "parent": "verb",
            "tag": "CP"
        },
        "VBG": {
            "name": "gerund verb",
            "example": "eating,winning",
            "parent": "verb",
            "tag": "VBG"
        },


        //adjectives
        "JJ": {
            "name": "adjective, generic",
            "example": "big, nice",
            "parent": "adjective",
            "tag": "JJ"
        },
        "JJR": {
            "name": "comparative adjective",
            "example": "bigger, cooler",
            "parent": "adjective",
            "tag": "JJR"
        },
        "JJS": {
            "name": "superlative adjective",
            "example": "biggest, fattest",
            "parent": "adjective",
            "tag": "JJS"
        },


        //adverbs
        "RB": {
            "name": "adverb",
            "example": "quickly, softly",
            "parent": "adverb",
            "tag": "RB"
        },
        "RBR": {
            "name": "comparative adverb",
            "example": "faster, cooler",
            "parent": "adverb",
            "tag": "RBR"
        },
        "RBS": {
            "name": "superlative adverb",
            "example": "fastest (driving), coolest (looking)",
            "parent": "adverb",
            "tag": "RBS"
        },


        //nouns
        "NN": {
            "name": "noun, generic",
            "example": "dog, rain",
            "parent": "noun",
            "tag": "NN"
        },
        "NNP": {
            "name": "singular proper noun",
            "example": "Edinburgh, skateboard",
            "parent": "noun",
            "tag": "NNP"
        },
        "NNA": {
            "name": "noun, active",
            "example": "supplier, singer",
            "parent": "noun",
            "tag": "NNA"
        },
        "NNPA": {
            "name": "noun, acronym",
            "example": "FBI, N.A.S.A.",
            "parent": "noun",
            "tag": "NNPA"
        },
        "NNPS": {
            "name": "plural proper noun",
            "example": "Smiths",
            "parent": "noun",
            "tag": "NNPS"
        },
        "NNS": {
            "name": "plural noun",
            "example": "dogs, foxes",
            "parent": "noun",
            "tag": "NNS"
        },
        "NNO": {
            "name": "possessive noun",
            "example": "spencer's, sam's",
            "parent": "noun",
            "tag": "NNO"
        },
        "NNG": {
            "name": "gerund noun",
            "example": "eating,winning - but used grammatically as a noun",
            "parent": "noun",
            "tag": "VBG"
        },


        //glue
        "PP": {
            "name": "possessive pronoun",
            "example": "my,one's",
            "parent": "glue",
            "tag": "PP"
        },
        "FW": {
            "name": "foreign word",
            "example": "mon dieu, voila",
            "parent": "glue",
            "tag": "FW"
        },
        "CD": {
            "name": "cardinal value, generic",
            "example": "one, two, june 5th",
            "parent": "value",
            "tag": "CD"
        },
        "DA": {
            "name": "date",
            "example": "june 5th, 1998",
            "parent": "value",
            "tag": "DA"
        },
        "NU": {
            "name": "number",
            "example": "89, half-million",
            "parent": "value",
            "tag": "NU"
        },

        "IN": {
            "name": "preposition",
            "example": "of,in,by",
            "parent": "glue",
            "tag": "IN"
        },
        "MD": {
            "name": "modal verb",
            "example": "can,should",
            "parent": "verb", //dunno
            "tag": "MD"
        },
        "CC": {
            "name": "co-ordating conjunction",
            "example": "and,but,or",
            "parent": "glue",
            "tag": "CC"
        },
        "PRP": {
            "name": "personal pronoun",
            "example": "I,you,she",
            "parent": "noun",
            "tag": "PRP"
        },
        "DT": {
            "name": "determiner",
            "example": "the,some",
            "parent": "glue",
            "tag": "DT"
        },
        "UH": {
            "name": "interjection",
            "example": "oh, oops",
            "parent": "glue",
            "tag": "UH"
        },
        "EX": {
            "name": "existential there",
            "example": "there",
            "parent": "glue",
            "tag": "EX"
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }

    return main
})()
var print_pos = function() {
    parents = {}
    Object.keys(parts_of_speech).forEach(function(k) {
        var parent = parts_of_speech[k].parent
        parents[parent] = parents[parent] || []
        parents[parent].push(k + '  - ' + parts_of_speech[k].name + ' (' + parts_of_speech[k].example + ')')
    })
    console.log(JSON.stringify(parents, null, 2));
}
// print_pos()
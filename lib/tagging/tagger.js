/*! nlp-node
 by @spencermountain
 2013*/





var pos = (function() {


    if (typeof module !== "undefined" && module.exports) {
        var parts_of_speech = require("./parts_of_speech")
    }
    if (typeof module !== "undefined" && module.exports) {
        var lexicon = require("./lexicon")
    }



    var multiples = { //adverbs
        "of course": true,
        "at least": true,
        "for example": true,
        "in order": true,
        "more than": true,
        "no longer": true,
        "a little": true,
        "for instance": true,
        "in particular": true,
        "a bit": true,
        "sort of": true,
        "all right": true,
        "no doubt": true,
        "and so on": true,
        "at first": true,
        "in addition": true,
        "at last": true,
        "that is": true,
        "at once": true,
        "once again": true,
        "at present": true,
        "less than": true,
        "up to": true,
        "once more": true,
        "by now": true,
        "so as": true,
        "in part": true,
        "all but": true,
        "in short": true,
        "even so": true,
        "just about": true,
        "as yet": true,
        "for long": true,
        "far from": true,
        "for ever": true,
        "on board": true,
        "a lot": true,
        "by far": true,
        "over here": true,
        "per annum": true,
        "as usual": true,
        "at best": true,
        "for once": true,
        "at large": true,
        "any longer": true,
        "for good": true,
        "vice versa": true,
        "for certain": true,
        "kind of": true,
        "anything but": true,
        "in between": true,
        "en route": true,
        "in private": true,
        "in vain": true,
        "at length": true,
        "at random": true,
        "for sure": true,
        "upside down": true,
        "at most": true,
        "per se": true,
        "per capita": true,
        "up front": true,
        "in situ": true,
        "in the main": true,
        "inter alia": true,
        "ex parte": true,
        "in vitro": true,
        "to and fro": true,
        "in vivo": true,
        "in brief": true,
        "at worst": true,
        "prima facie": true,
        "upwards of": true,
        "something like": true,
        "in case": true,
        "en masse": true,
        "ultra vires": true,
        "a priori": true,
        "ad hoc": true,
        "none the": true,
        "et cetera": true,
        "de facto": true,
        "off guard": true,
        "spot on": true,
        "ipso facto": true,
        "ceteris paribus": true,
        "ad infinitum": true,
        "op. cit.": true,
        "in absentia": true,
        "en bloc": true,
        "in camera": true,
        "point blank": true,
        "a fortiori": true,
        "ex officio": true,
        "nigh on": true,
        "ad nauseam": true,
        "inside out": true,
        "sotto voce": true,
        "pro rata": true,
        "in memoriam": true,
        "in extremis": true,
        "not withstanding": true,
        "in toto": true,
        "the most part": true,
        "for keeps": true,
        "al fresco": true,
        "ab initio": true,
        "de jure": true,
        "a la carte": true,
        "sub judice": true,
        "op. cit": true,
        "post hoc": true,
        "so on": true,
        "sine die": true,
        "op cit": true,
        "just in": true,
        "ex gratia": true,
        "au contraire": true,
        "ad hominem": true,
        "a posteriori": true,
        //adjectives
        "fed up": true,
        "brand new": true,
        "ad hoc": true,
        "so called": true,
        "out of date": true,
        "old fashioned": true,
        "per capita": true,
        "de facto": true,
        "grown up": true,
        "bona fide": true,
        "ex parte": true,
        "well off": true,
        "prima facie": true,
        "far off": true,
        "a priori": true,
        "in between": true,
        "par excellence": true,
        "a la carte": true,
        "ultra vires": true,
        "straight forward": true,
        "hard up": true,
        "de luxe": true,
        "post mortem": true,
        "ex gratia": true,
        "upside down": true,
        "up front": true,
        "au fait": true,
        "sui generis": true,
        "pro rata": true,
        "post hoc": true,
        "ex officio": true,
        "ab initio": true,
        "inside out": true,
        "point blank": true,
        "en suite": true,
        "spot on": true,
        "all right": true,
        "ad hominem": true,
        "de jure": true,
        "tout court": true,
        "avant garde": true,
        "viva voce": true,
        "sub judice": true,
        "al fresco": true,
        "sans serif": true,
        "gung ho": true,
        "compos mentis": true,
        "super duper": true,
        "such like": true,
        "de trop": true,

        //mine
        "will be": true
    }







    var tokenizer = (function() {
        var tokenizer = function(text, options) {
            if (!options) {
                options = {};
            }
            //undo contractions
            if (text.match(/(he's|she's|it's)/)) {
                text = text.replace(/([^ ])['’]s /ig, '$1 is ');
            }
            text = text.replace(/([^ ])['’]ve /ig, '$1 have ');
            text = text.replace(/([^ ])['’]re /ig, '$1 are ');
            text = text.replace(/([^ ])['’]d /ig, '$1 would ');
            text = text.replace(/([^ ])['’]ll /ig, '$1 will ');
            text = text.replace(/([^ ])n['’]t /ig, '$1 not ');
            text = text.replace(/\bi'm /ig, 'I am ');

            //remove bracketed parts
            if (!options.keep_brackets) {
                text = text.replace(/ ?\(.{0,200}?\)/g, '');
            }

            var words = text.split(' ');

            if (options.want_quotations) {
                if (text.match('"')) {
                    words = rejoin(words);
                }
            }

            words = spot_multiples(words);
            //words=words.map(function(word){ return word.replace(/("|,|\)|\(|!)/g,'')})

            return words;
        }


        //connect common multiple-word-phrases into one token

            function spot_multiples(words) {
                for (var i in words) {
                    i = parseInt(i);
                    if (!words[i + 1]) {
                        continue;
                    }
                    var two = words[i] + ' ' + words[i + 1];
                    two = two.replace(/[\.,!:;]*$/, '')
                    if (multiples[two]) {
                        words[i] = words[i] + ' ' + words[i + 1];
                        words[i + 1] = null;
                    }
                }
                //remove empty words
                return words.filter(function(w) {
                    return w
                })
            }


            //rejoin quotations to one token

            function rejoin(words) {
                var quotes = [];
                for (var i in words) {
                    if (words[i].match('"')) {
                        quotes.push(parseInt(i))
                    }
                }
                if (quotes.length == 2) {
                    var quote = words.slice(quotes[0], quotes[1] + 1).join(' ');
                    quote = quote.replace(/"/g, '')
                    words.push(quote)
                }
                return words;
            }

        return tokenizer;


    })()

    /*!
     *by spencer kelly
     *
     * based on jsPOS by Percy Wegmann
     * Licensed under the LGPLv3 license
     * http://www.opensource.org/licenses/lgpl-3.0.html
     */

    var tag = (function() {

        var tag = function(words, options) {
            var results = [];
            //first, regex-based guesses
            var patterns = [{
                reg: /.[cts]hy$/i,
                pos: 'JJ',
                strength: 64,
                errors: 1,
                accuracy: '0.98'
            }, {
                reg: /.[st]ty$/i,
                pos: 'JJ',
                strength: 44,
                errors: 1,
                accuracy: '0.98'
            }, {
                reg: /.[lnr]ize$/i,
                pos: 'VB',
                strength: 91,
                errors: 2,
                accuracy: '0.98'
            }, {
                reg: /.[gk]y$/i,
                pos: 'JJ',
                strength: 113,
                errors: 3,
                accuracy: '0.97'
            }, {
                reg: /.fies$/i,
                pos: 'VB',
                strength: 30,
                errors: 1,
                accuracy: '0.97'
            }, {
                reg: /.some$/i,
                pos: 'JJ',
                strength: 34,
                errors: 1,
                accuracy: '0.97'
            }, {
                reg: /.[nrtumcd]al$/i,
                pos: 'JJ',
                strength: 513,
                errors: 16,
                accuracy: '0.97'
            }, {
                reg: /.que$/i,
                pos: 'JJ',
                strength: 26,
                errors: 1,
                accuracy: '0.96'
            }, {
                reg: /.[tnl]ary$/i,
                pos: 'JJ',
                strength: 87,
                errors: 4,
                accuracy: '0.95'
            }, {
                reg: /.[di]est$/i,
                pos: 'JJS',
                strength: 74,
                errors: 4,
                accuracy: '0.95'
            }, {
                reg: /^(un|de|re)\-[a-z]../i,
                pos: 'VB',
                strength: 44,
                errors: 2,
                accuracy: '0.95'
            }, {
                reg: /.lar$/i,
                pos: 'JJ',
                strength: 83,
                errors: 5,
                accuracy: '0.94'
            }, {
                reg: /[bszmp]{2}y/,
                pos: 'JJ',
                strength: 95,
                errors: 6,
                accuracy: '0.94'
            }, {
                reg: /.zes$/i,
                pos: 'VB',
                strength: 54,
                errors: 4,
                accuracy: '0.93'
            }, {
                reg: /.[icldtgrv]ent$/i,
                pos: 'JJ',
                strength: 214,
                errors: 14,
                accuracy: '0.93'
            }, {
                reg: /.[rln]ates$/i,
                pos: 'VBZ',
                strength: 74,
                errors: 5,
                accuracy: '0.93'
            }, {
                reg: /.[oe]ry$/i,
                pos: 'JJ',
                strength: 150,
                errors: 10,
                accuracy: '0.93'
            }, {
                reg: /.[rdntk]ly$/i,
                pos: 'JJ',
                strength: 108,
                errors: 9,
                accuracy: '0.92'
            }, {
                reg: /.[lsrnpb]ian$/i,
                pos: 'JJ',
                strength: 121,
                errors: 10,
                accuracy: '0.92'
            }, {
                reg: /.[vrl]id$/i,
                pos: 'JJ',
                strength: 23,
                errors: 2,
                accuracy: '0.91'
            }, {
                reg: /.[ilk]er$/i,
                pos: 'JJR',
                strength: 167,
                errors: 17,
                accuracy: '0.90'
            }, {
                reg: /.ike$/i,
                pos: 'JJ',
                strength: 71,
                errors: 8,
                accuracy: '0.89'
            }, {
                reg: /.ends$/i,
                pos: 'VB',
                strength: 24,
                errors: 3,
                accuracy: '0.88'
            }, {
                reg: /.wards$/i,
                pos: 'RB',
                strength: 31,
                errors: 4,
                accuracy: '0.87'
            }, {
                reg: /.rmy$/i,
                pos: 'JJ',
                strength: 7,
                errors: 1,
                accuracy: '0.86'
            }, {
                reg: /.rol$/i,
                pos: 'NN',
                strength: 7,
                errors: 1,
                accuracy: '0.86'
            }, {
                reg: /.tors$/i,
                pos: 'NN',
                strength: 7,
                errors: 1,
                accuracy: '0.86'
            }, {
                reg: /.azy$/i,
                pos: 'JJ',
                strength: 7,
                errors: 1,
                accuracy: '0.86'
            }, {
                reg: /.where$/i,
                pos: 'RB',
                strength: 7,
                errors: 1,
                accuracy: '0.86'
            }, {
                reg: /.ify$/i,
                pos: 'VB',
                strength: 49,
                errors: 7,
                accuracy: '0.86'
            }, {
                reg: /.bound$/i,
                pos: 'JJ',
                strength: 22,
                errors: 3,
                accuracy: '0.86'
            }, {
                reg: /.ens$/i,
                pos: 'VB',
                strength: 42,
                errors: 6,
                accuracy: '0.86'
            }, {
                reg: /.oid$/i,
                pos: 'JJ',
                strength: 20,
                errors: 3,
                accuracy: '0.85'
            }, {
                reg: /.vice$/i,
                pos: 'NN',
                strength: 6,
                errors: 1,
                accuracy: '0.83'
            }, {
                reg: /.rough$/i,
                pos: 'JJ',
                strength: 6,
                errors: 1,
                accuracy: '0.83'
            }, {
                reg: /.mum$/i,
                pos: 'JJ',
                strength: 6,
                errors: 1,
                accuracy: '0.83'
            }, {
                reg: /.teen(th)?$/i,
                pos: 'CD',
                strength: 17,
                errors: 3,
                accuracy: '0.82'
            }, {
                reg: /.oses$/i,
                pos: 'VB',
                strength: 22,
                errors: 4,
                accuracy: '0.82'
            }, {
                reg: /.ishes$/i,
                pos: 'VB',
                strength: 21,
                errors: 4,
                accuracy: '0.81'
            }, {
                reg: /.-ever$/i,
                pos: 'RB',
                strength: 10,
                errors: 2,
                accuracy: '0.80'
            }, {
                reg: /.ects$/i,
                pos: 'VB',
                strength: 30,
                errors: 6,
                accuracy: '0.80'
            }, {
                reg: /.ieth$/i,
                pos: 'CD',
                strength: 5,
                errors: 1,
                accuracy: '0.80'
            }, {
                reg: /.ices$/i,
                pos: 'NN',
                strength: 15,
                errors: 3,
                accuracy: '0.80'
            }, {
                reg: /.bles$/i,
                pos: 'VB',
                strength: 20,
                errors: 4,
                accuracy: '0.80'
            }, {
                reg: /.pose$/i,
                pos: 'VB',
                strength: 19,
                errors: 4,
                accuracy: '0.79'
            }, {
                reg: /.ions$/i,
                pos: 'NN',
                strength: 9,
                errors: 2,
                accuracy: '0.78'
            }, {
                reg: /.ean$/i,
                pos: 'JJ',
                strength: 32,
                errors: 7,
                accuracy: '0.78'
            }, {
                reg: /.[ia]sed$/i,
                pos: 'JJ',
                strength: 151,
                errors: 35,
                accuracy: '0.77'
            }, {
                reg: /.tized$/i,
                pos: 'VB',
                strength: 21,
                errors: 5,
                accuracy: '0.76'
            }, {
                reg: /.llen$/i,
                pos: 'JJ',
                strength: 8,
                errors: 2,
                accuracy: '0.75'
            }, {
                reg: /.fore$/i,
                pos: 'RB',
                strength: 8,
                errors: 2,
                accuracy: '0.75'
            }, {
                reg: /. of$/i,
                pos: 'RB',
                strength: 8,
                errors: 2,
                accuracy: '0.75'
            }, {
                reg: /.ances$/i,
                pos: 'NN',
                strength: 8,
                errors: 2,
                accuracy: '0.75'
            }, {
                reg: /.gate$/i,
                pos: 'VB',
                strength: 23,
                errors: 6,
                accuracy: '0.74'
            }, {
                reg: /.nes$/i,
                pos: 'VB',
                strength: 27,
                errors: 7,
                accuracy: '0.74'
            }, {
                reg: /.less$/i,
                pos: 'RB',
                strength: 11,
                errors: 3,
                accuracy: '0.73'
            }, {
                reg: /.ried$/i,
                pos: 'JJ',
                strength: 22,
                errors: 6,
                accuracy: '0.73'
            }, {
                reg: /.gone$/i,
                pos: 'JJ',
                strength: 7,
                errors: 2,
                accuracy: '0.71'
            }, {
                reg: /.made$/i,
                pos: 'JJ',
                strength: 7,
                errors: 2,
                accuracy: '0.71'
            }, {
                reg: /.[pdltrkvyns]ing$/i,
                pos: 'JJ',
                strength: 942,
                errors: 280,
                accuracy: '0.70'
            }, {
                reg: /.tions$/i,
                pos: 'NN',
                strength: 71,
                errors: 21,
                accuracy: '0.70'
            }, {
                reg: /.tures$/i,
                pos: 'NN',
                strength: 16,
                errors: 5,
                accuracy: '0.69'
            }, {
                reg: /.ous$/i,
                pos: 'JJ',
                strength: 6,
                errors: 2,
                accuracy: '0.67'
            }, {
                reg: /.ports$/i,
                pos: 'NN',
                strength: 9,
                errors: 3,
                accuracy: '0.67'
            }, {
                reg: /. so$/i,
                pos: 'RB',
                strength: 3,
                errors: 1,
                accuracy: '0.67'
            }, {
                reg: /.ints$/i,
                pos: 'NN',
                strength: 11,
                errors: 4,
                accuracy: '0.64'
            }, {
                reg: /.gled$/i,
                pos: 'JJ',
                strength: 16,
                errors: 7,
                accuracy: '0.56'
            }, {
                reg: /.fully$/i,
                pos: 'RB',
                strength: 13,
                errors: 6,
                accuracy: '0.54'
            }, {
                reg: /.*ould$/,
                pos: 'MD',
                strength: 3,
                errors: 0,
                accuracy: '0.00'
            }, {
                reg: /[a-z]'s$/i,
                pos: 'NN',
                strength: 1,
                errors: 0,
                accuracy: '0.00'
            }, {
                reg: /.'n$/i,
                pos: 'VB',
                strength: 1,
                errors: 0,
                accuracy: '0.00'
            }, {
                reg: /^-?[0-9]+(.[0-9]+)?$/,
                pos: 'CD',
                strength: 1,
                errors: 1,
                accuracy: '0.00'
            }]

            //lookup words
            for (var i in words) {
                var word = words[i];
                results[i] = {
                    word: word,
                    pos: null,
                    clues: []
                }
                for (var o in patterns) {
                    if (word.match(patterns[o].reg)) {
                        results[i].pos = parts_of_speech[patterns[o].pos];
                        results[i].rule = "regex"
                    }
                }
                //next, use the pos suggestions from the lexicon
                word = word.replace(/[\.,!:;]*$/, '')
                var lex = lexicon[word.toLowerCase()];
                if (lex) {
                    results[i].pos = parts_of_speech[lex];
                    results[i].rule = "lexicon";
                }
                //noun if a capital appears in the not-first word
                if (i != 0 && word.match(/[A-Z]/)) {
                    results[i].pos = parts_of_speech["NN"];
                    results[i].rule = "capital";
                }
                //noun if we can convert into a number
                if (parseFloat(word)) {
                    results[i].pos = parts_of_speech["NN"];
                    results[i].rule = "number";
                }
                //fallback to noun
                if (!results[i].pos) {
                    results[i].pos = parts_of_speech["NN"];
                    results[i].rule = "unknown";
                }
            }

            //sentence-level context rules
            for (var i in results) {
                i = parseInt(i);
                if (!results[i + 1]) {
                    continue;
                }

                //suggest verb or adjective after adverb
                if (results[i].pos.tag == "RB" && (!results[i - 1] || results[i - 1].pos.parent != "verb")) {
                    results = suggest_adverb_phrase(i, "from_adverb", results, {
                        strong: false
                    });
                }
                //suggest noun phrase after posessive pronouns (her|my|its)
                if (results[i].pos.tag == "PP") {
                    results = suggest_noun_phrase(i, "from_posessive", results, {
                        strong: true
                    });
                }
                //suggest noun phrase after determiners (the|a)
                if (results[i].pos.tag == "VBZ" && results[i + 1].pos.parent != "verb") {
                    results = suggest_adjective_phrase(i, "vbz-adjective", results, {
                        strong: false
                    });
                }
                //suggest noun phrase after determiners (the|a)
                if (results[i].pos.tag == "DT") {
                    results = suggest_noun_phrase(i, "from_determiner", results, {
                        strong: false
                    });
                }
                // suggest verb phrase after would|could|should
                if (results[i].pos.tag == "MD") {
                    results = suggest_verb_phrase(i, "from_would", results, {
                        strong: false
                    });
                }
                // suggest adjective phrase after copula and no determiner/verb
                //  if(results[i].pos.tag=="CP" && results[i+1].pos.tag!="DT" && results[i+1].pos.parent!="verb"){
                // results=suggest_adjective_phrase(i, "from_copula", results, {strong:false});
                // }
            }




            //more specific context rules
            for (var i in results) {
                i = parseInt(i);
                if (!results[i + 1]) {
                    continue;
                }
                //noun adjective noun
                if (results[i].pos.parent == "noun" && results[i + 2] && results[i + 1].pos.tag == "JJ" && results[i + 2].pos.parent == "noun") {
                    if (!options.big) {
                        results[i + 1].pos = parts_of_speech["NN"]; //fails on 'truck bombing outside kabul'
                        results[i + 1].rule = "noun_adjective_noun";
                    }
                }
                //adjective - verb to adverb - verb
                if (results[i].pos.tag == "JJ" && results[i + 1].pos.parent == "verb") {
                    results[i].pos = parts_of_speech["RB"];
                    results[i].rule = "adjective_verb";
                }
                //two consecutive adjectives, no comma
                if (results[i].pos.tag == "JJ" && results[i + 1].pos.tag == "JJ") {
                    if (!results[i].word.match(',')) {
                        results[i].pos = parts_of_speech["RB"];
                        results[i].rule = "twoadjectives";
                    }
                }
                //verb before persponal pronoun (scared his..)
                if (results[i].pos.tag == "PRP") {
                    if (results[i - 1] && results[i - 1].pos.parent == "adjective") {
                        results[i - 1].pos = parts_of_speech["VB"];
                        results[i - 1].rule = "verb_myself";
                    } else if (!results[i - 1] || !results[i - 1].pos.parent == "verb") {
                        results = suggest_verb_phrase(i, "from_pronoun", results, {
                            strong: false
                        });
                    }
                }
                //interpret prepositions as verbs is in, are from
                if (results[i].pos.tag == "CP" && results[i + 1].pos.tag == "IN") {
                    results[i + 1].pos = parts_of_speech["VB"];
                    results[i + 1].rule = "preposition_verb";
                }
                //hook conjunction grammars together  cute and [noun]
                if (results[i].pos.parent == "adjective" && results[i + 1].pos.tag == "CC" && results[i + 2] && results[i + 2].pos.parent == "noun") {
                    results[i + 2].pos = parts_of_speech["JJ"];
                    results[i + 2].rule = "and_adjective";
                }

            }


            //context based on end of phrase
            var last = results.length - 1;
            if (results[last - 1]) {
                // 'is [noun]' then end, becomes 'is [adjective]'
                if (results[last - 1].pos.tag == "CP" && results[last].pos.parent == "noun") {
                    results[last].pos = parts_of_speech["JJ"];
                    results[last].rule = "end_copula"
                }
                // '[noun] [verb]' then end, becomes '[noun] [noun]'
                if (results[last - 1].pos.parent == "noun" && (results[last].pos.parent == "adjective" || results[last].pos.tag == "RB")) {
                    results[last].pos = parts_of_speech["NN"];
                    results[last].rule = "ending_noun"
                }

            }


            return results;
        }


            function suggest_noun_phrase(o, rule, results, options) {
                var top = results.length;
                for (var i = o + 1; i < top; i++) { // console.log(results[i].word)
                    if (results[i].pos.parent == 'noun') {
                        return results;
                    }
                    if (results[i].pos.parent == 'verb' && results[i].pos.tag != "RB") {
                        results[i].pos = parts_of_speech["NN"];
                        results[i].rule = rule;
                        return results;
                    }
                    if (results[i + 1]) {
                        if (results[i].pos.parent == 'adj' || results[i].pos.tag == "RB") {
                            results[i].pos.parent = 'adjective';
                            results[i].rule = rule;
                        }
                    } else { //last word and still no noun
                        results[i].pos = parts_of_speech["NN"];
                        results[i].rule = rule;
                    }
                }
                return results;
            }


            function suggest_verb_phrase(o, rule, results, options) {
                var top = results.length;
                for (var i = o + 1; i < top; i++) {
                    if (results[i].pos.parent == 'verb') {
                        return results;
                    }
                    if (results[i].pos.parent == 'noun') {
                        results[i].pos = parts_of_speech["VB"];
                        results[i].rule = rule;
                        return results;
                    }
                    if (results[i + 1]) {
                        if (results[i].pos.parent == 'adj' || results[i].pos.tag == "RB") {
                            results[i].pos.parent = 'verb';
                            results[i].rule = rule;
                        }
                    } else { //last word and still no verb
                        results[i].pos = parts_of_speech["VB"];
                        results[i].rule = rule;
                    }
                }
                return results;
            }

            function suggest_adjective_phrase(o, rule, results, options) {
                var top = results.length;
                for (var i = o + 1; i < top; i++) {
                    if (results[i].pos.parent == 'adjective') {
                        return results;
                    }
                    if (results[i].pos.tag == "DT" || results[i].pos.tag == "CP") {
                        return results;
                    }
                    if (results[i].pos.parent == 'noun' || results[i].pos.parent == 'verb') {
                        results[i].pos = parts_of_speech["JJ"];
                        results[i].rule = rule;
                        return results;
                    }
                    if (results[i + 1]) {
                        if (results[i].pos.tag == "RB") {
                            results[i].pos.parent = 'adjective';
                            results[i].rule = rule;
                        }
                    } else { //last word and still no verb
                        if (options.strong) {
                            results[i].pos = parts_of_speech["JJ"];
                            results[i].rule = rule;
                        }
                    }
                }
                return results;
            }

            //suggest a verb or adjective is coming
            function suggest_adverb_phrase(o, rule, results, options) {
                var top = results.length;
                for (var i = o + 1; i < top; i++) {
                    if (results[i].pos.parent == 'adjective' || results[i].pos.parent == 'verb') {
                        return results;
                    }
                    if (results[i].pos.parent == 'noun') {
                        results[i].pos = parts_of_speech["JJ"];
                        results[i].rule = rule;
                        return results;
                    }
                    if (results[i + 1]) {
                        if (results[i].pos.tag == "RB") {
                            results[i].pos.parent = 'adjective';
                            results[i].rule = rule;
                        }
                    } else { //last word and still no verb
                        if (options.strong) {
                            results[i].pos = parts_of_speech["JJ"];
                            results[i].rule = rule;
                        }
                    }
                }
                return results;
            }

        return tag;


    })()





        function set_options(options) {
            if (!options) {
                options = {};
            }
            if (options.verbose) {
                options.gerund = true;
                options.stick_adjectives = true;
                options.stick_prepositions = true;
                options.stick_the = true;
                options.want_quotations = true;
                options.subnouns = true;
                options.match_whole = true;
                options.case_sensitive = false;
                options.kill_numbers = false;
                options.kill_quotes = false;
            }
            if (options.big) {
                options.gerund = false;
                options.stick_adjectives = false;
                options.stick_prepositions = false;
                options.stick_the = false;
                options.subnouns = false;
                options.want_quotations = true;
                options.match_whole = false;
                options.kill_numbers = true;
                options.kill_quotes = true;
            }
            return options;
        }



        //tag each word with a part-of-speech object
    var main = function(text, options) {
        options = set_options(options);
        var words = tokenizer(text, options); //split
        return tag(words, options)
    }





    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }

    return main
})()
// console.log(pos("The boy walked to the store."))
// console.log(tokenizer)
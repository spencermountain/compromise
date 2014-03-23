var tests = (function() {
    //load in methods if using node, otherwise assume
    if (typeof module !== "undefined" && module.exports) {
        nlp = require("./index")
    }

    function test_others() {

        print_header("sentence")
        arr = nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye")
        console.log(arr.length == 3)

        print_header("singularize")
        console.log(nlp.singularize("earthquakes") == "earthquake")

        print_header("ngram")
        s = nlp.ngram("i really think that we all really think it's all good")
        console.log(s[1][0].word == 'really think' && s[1][0].count == 2)
        console.log(s[0][0].word == 'really' && s[0][0].count == 2)
        s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
        console.log(s[0][0].word == 'she' && s[0][0].count == 2)

        print_header("adj_to_noun")
        console.log(nlp.adj_to_noun("ferocious") == "ferociousness")
        console.log(nlp.adj_to_noun("fancy") == "fanciness")

        print_header("dates")
        dates = nlp.dates("I got divorced on June 4th 1993, in Miami")
        console.log(dates.from.year == '1993' && dates.from.month == '06' && dates.from.day == '04')

        print_header("americanization")
        console.log(nlp.americanize("favourite") == "favorite")
        console.log(nlp.americanize("synthesised") == "synthesized")

        print_header("britishization")
        // console.log(nlp.britishize("favorite") == "favourite")
        console.log(nlp.britishize("synthesized") == "synthesised")
    }


    function test_pos() {
        print_header("part of speech")
        var fails = []
        ////coerce a noun
        assert_pos("Tony Hawk walked quickly to the store.", ["NN", "NN", "VBD", "RB", "TO", "DT", "NN"])
        assert_pos("swim", ["VB"])
        assert_pos("the swim", ["DT", "NN"])
        // assert_pos("my swim was great", ["PP", "NN"])
        assert_pos("the obviously good swim", ["DT", "RB", "JJ", "NN"])
        assert_pos("spencer kelly", ["NN", "NN"]) //looks like an adverb but aint
        //coerce a verb
        assert_pos("swing", ["NN"])
        assert_pos("would normally swing", ["MD", "RB", "VB"])
        //coerce an adjective
        assert_pos("quietly lkajsfijf", ["RB", "JJ"])
        assert_pos("schlooking in toronto is scarey and lkasf", ["VBG", "IN", "NN", "CP", "JJ", "CC", "JJ"])
        assert_pos("lkjasdf always walks so very nicely", ["NN", "RB", "VBZ", "RB", "RB", "RB"])
        assert_pos("lkjasdf always walks in every cafesefirehty", ["NN", "RB", "VBZ", "IN", "DT", "NN"])
        //coerce a verb
        assert_pos("he lkajsdf so hard", ["PRP", "VB", "RB", "JJ"])
        assert_pos("scared", ["JJ"])
        assert_pos("scared him hard", ["VB", "PRP", "JJ"])
        //coerce an adverb
        assert_pos("he is real", ["PRP", "CP", "JJ"])
        assert_pos("he is real cool", ["PRP", "CP", "RB", "JJ"])
        assert_pos("a pretty, good and nice swim", ["DT", "JJ", "JJ", "CC", "JJ", "NN"])
        assert_pos("a pretty good and nice swim", ["DT", "RB", "JJ", "CC", "JJ", "NN"])

        return fails

    }


    function test_spot() {
        print_header("spotter")
        //spotter tests
        ////////////////
        var options = {
            gerund: true,
            stick_adjectives: true,
            stick_prepositions: true,
            stick_the: false,
            subnouns: false,
            match_whole: false
        }


        //sticky nouns
        assert_spot("the strobelight at plastic people", {}, ["strobelight"]);
        assert_spot("the strobelight at plastic people", {
            stick_adjectives: true
        }, ["strobelight", "plastic people"]);
        assert_spot("natalie portman in black swan", {}, ["natalie portman", "swan"]);
        assert_spot("natalie portman in black swan", {
            stick_adjectives: true
        }, ["natalie portman", "swan", "black swan"]);
        assert_spot("i enjoyed watching children of men", {}, []);
        assert_spot("i enjoyed watching children of men", {
            stick_prepositions: true
        }, ["children of men"]);

        assert_spot("really lame", {}, []);
        assert_spot("really lame", {
            match_whole: true
        }, ["really lame"]);
        //ngram
        assert_spot("toronto international film festival", {}, ["toronto international film festival"])
        assert_spot("toronto film festival", {
            subnouns: true
        }, ["toronto film festival", "toronto", "festival", "toronto film", "film festival"]);
        assert_spot("nancy reagan when she spoke about hiv in denver", {}, ["nancy reagan", "hiv", "denver"])
        assert_spot("nancy reagan when she spoke about hiv in denver", {
            subnouns: true
        }, ["nancy reagan", "hiv", "denver", "nancy", "reagan"])
        assert_spot("Dr. Conrad Murray guilty verdict", {}, ["dr. conrad murray guilty verdict"])
        assert_spot("Dr. Conrad Murray guilty verdict", {
            subnouns: true
        }, ["dr. conrad murray guilty verdict", "conrad", "murray", "guilty", "verdict", "conrad murray", "murray guilty", "guilty verdict", "conrad murray guilty", "murray guilty verdict", "conrad murray guilty verdict"])
        assert_spot("tom cruise and nancy kerrigan", {}, ["tom cruise", "nancy kerrigan"])

        assert_spot("strolling in berlin", {}, ["berlin"]);
        assert_spot("strolling in berlin", {
            gerund: true
        }, ["strolling", "berlin"]);

        assert_spot("smoking all morning in the bathtub", {
            gerund: false
        }, ["morning", "bathtub"]);
        assert_spot("smoking all morning in the bathtub", {
            gerund: true
        }, ["smoking", "morning", "bathtub"]);

        assert_spot("waking up and being exhausted at bob marley's house", {
            gerund: true
        }, ["waking up", "bob marley"]);

        assert_spot("the simpsons", {}, ["simpsons"]);
        assert_spot("the simpsons", {
            stick_the: true
        }, ["simpsons", "the simpsons"]);

        assert_spot("singing in the phantom of the opera", {
            stick_prepositions: false
        }, ["phantom", "opera"]);
        assert_spot("singing in the phantom of the opera", {
            stick_prepositions: false,
            gerund: true
        }, ["singing", "phantom", "opera"]);

    }

    function print_header(str) {
        console.log("")
        console.log("  === " + str + " ===")
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    function assert_pos(str, arr) {
        var the = nlp.tag(str, {})
        the = the.map(function(a) {
            return a.pos
        }).map(function(a) {
            return a.tag
        })
        if (arraysEqual(the, arr)) {
            console.log('true');
        } else {
            console.log('fail  =>' + str + '        ' + JSON.stringify(the) + " vs. " + JSON.stringify(arr))
        }
    }

    function assert_spot(str, obj, arr) {
        var the = nlp.spot(str, obj)
        the = the.map(function(a) {
            return a.word.toLowerCase()
        })
        if (arraysEqual(the, arr)) {
            console.log('true');
        } else {
            console.log('fail  =>' + str + '        ')
            console.log(the)
            console.log(arr)
        }
    }

    var main = function() {
        test_spot()
        test_pos()
        test_others()
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }
    return main
})()
tests()
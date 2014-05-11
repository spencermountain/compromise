var tests = (function() {
    //load in methods if using node, otherwise assume
    if (typeof module !== "undefined" && module.exports) {
        nlp = require("../index")
    }

    function test_others() {

        print_header("adverb.to_adjective")
        console.log(nlp.adverb.to_adjective('garishly') == 'garish')
        console.log(nlp.adverb.to_adjective('tediously') == 'tedious')
        console.log(nlp.adverb.to_adjective('frightfully') == 'frightful')
        console.log(nlp.adverb.to_adjective('tortuously') == 'tortuous')
        console.log(nlp.adverb.to_adjective('privately') == 'private')
        console.log(nlp.adverb.to_adjective('unambiguously') == 'unambiguous')
        console.log(nlp.adverb.to_adjective('cortically') == 'cortic')
        console.log(nlp.adverb.to_adjective('biradially') == 'biradial')
        console.log(nlp.adverb.to_adjective('meanly') == 'mean')
        console.log(nlp.adverb.to_adjective('raspingly') == 'rasping')
        console.log(nlp.adverb.to_adjective('comprehensively') == 'comprehensive')
        console.log(nlp.adverb.to_adjective('fervently') == 'fervent')
        console.log(nlp.adverb.to_adjective('nationally') == 'national')
        console.log(nlp.adverb.to_adjective('maternally') == 'maternal')
        console.log(nlp.adverb.to_adjective('flashily') == 'flashy')
        console.log(nlp.adverb.to_adjective('only') == 'only')
        console.log(nlp.adverb.to_adjective('narrowly') == 'narrow')
        console.log(nlp.adverb.to_adjective('blasphemously') == 'blasphemous')
        console.log(nlp.adverb.to_adjective('abortively') == 'abortive')
        console.log(nlp.adverb.to_adjective('inoffensively') == 'inoffensive')
        console.log(nlp.adverb.to_adjective('truly') == 'true')
        console.log(nlp.adverb.to_adjective('gently') == 'gent')
        console.log(nlp.adverb.to_adjective('tolerantly') == 'tolerant')
        console.log(nlp.adverb.to_adjective('enchantingly') == 'enchanting')
        console.log(nlp.adverb.to_adjective('unswervingly') == 'unswerving')
        console.log(nlp.adverb.to_adjective('grubbily') == 'grubby')
        console.log(nlp.adverb.to_adjective('longitudinally') == 'longitudinal')
        console.log(nlp.adverb.to_adjective('thermodynamically') == 'thermodynamic')
        console.log(nlp.adverb.to_adjective('mirthfully') == 'mirthful')
        console.log(nlp.adverb.to_adjective('salaciously') == 'salacious')
        console.log(nlp.adverb.to_adjective('dourly') == 'dour')
        console.log(nlp.adverb.to_adjective('credulously') == 'credulous')
        console.log(nlp.adverb.to_adjective('carefully') == 'careful')
        console.log(nlp.adverb.to_adjective('knowingly') == 'knowing')
        console.log(nlp.adverb.to_adjective('geometrically') == 'geometrical')
        console.log(nlp.adverb.to_adjective('unassailably') == 'unassailable')
        console.log(nlp.adverb.to_adjective('antecedently') == 'antecedent')
        console.log(nlp.adverb.to_adjective('adjectively') == 'adjective')
        console.log(nlp.adverb.to_adjective('hebdomadally') == 'hebdomadal')
        console.log(nlp.adverb.to_adjective('dizzily') == 'dizzy')
        console.log(nlp.adverb.to_adjective('obnoxiously') == 'obnoxious')
        console.log(nlp.adverb.to_adjective('thirstily') == 'thirsty')
        console.log(nlp.adverb.to_adjective('biennially') == 'biennial')
        console.log(nlp.adverb.to_adjective('roguishly') == 'roguish')
        console.log(nlp.adverb.to_adjective('mentally') == 'mental')
        console.log(nlp.adverb.to_adjective('incessantly') == 'incessant')
        console.log(nlp.adverb.to_adjective('intelligently') == 'intelligent')
        console.log(nlp.adverb.to_adjective('perseveringly') == 'persevering')
        console.log(nlp.adverb.to_adjective('namely') == 'name')
        console.log(nlp.adverb.to_adjective('formidably') == 'formidable')

        print_header("nlp.sentences")
        console.log(nlp.sentences('Tony is nice. He lives in Japan.').length == 2)
        console.log(nlp.sentences('I like that Color').length == 1)
        console.log(nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length == 3)
        console.log(nlp.sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length == 2)

        print_header("pluralize")
        console.log(nlp.noun.pluralize('snake') == 'snakes')
        console.log(nlp.noun.pluralize('ski') == 'skis')
        console.log(nlp.noun.pluralize('Barrymore') == 'Barrymores')
        console.log(nlp.noun.pluralize('witch') == 'witches')
        console.log(nlp.noun.pluralize('box') == 'boxes')
        console.log(nlp.noun.pluralize('gas') == 'gases')
        console.log(nlp.noun.pluralize('bus') == 'buses')
        console.log(nlp.noun.pluralize('kiss') == 'kisses')
        console.log(nlp.noun.pluralize('index') == 'indices')
        console.log(nlp.noun.pluralize('appendix') == 'appendices')
        console.log(nlp.noun.pluralize('criterion') == 'criteria')
        console.log(nlp.noun.pluralize('berry') == 'berries')
        console.log(nlp.noun.pluralize('activity') == 'activities')
        console.log(nlp.noun.pluralize('daisy') == 'daisies')
        console.log(nlp.noun.pluralize('church') == 'churches')
        console.log(nlp.noun.pluralize('bus') == 'buses')
        console.log(nlp.noun.pluralize('fox') == 'foxes')
        console.log(nlp.noun.pluralize('stomach') == 'stomachs')
        console.log(nlp.noun.pluralize('epoch') == 'epochs')
        console.log(nlp.noun.pluralize('knife') == 'knives')
        console.log(nlp.noun.pluralize('half') == 'halves')
        console.log(nlp.noun.pluralize('scarf') == 'scarves')
        console.log(nlp.noun.pluralize('chief') == 'chiefs')
        console.log(nlp.noun.pluralize('spoof') == 'spoofs')
        console.log(nlp.noun.pluralize('solo') == 'solos')
        console.log(nlp.noun.pluralize('zero') == 'zeros')
        console.log(nlp.noun.pluralize('avocado') == 'avocados')
        console.log(nlp.noun.pluralize('studio') == 'studios')
        console.log(nlp.noun.pluralize('zoo') == 'zoos')
        console.log(nlp.noun.pluralize('embryo') == 'embryos')
        console.log(nlp.noun.pluralize('hero') == 'heroes')
        console.log(nlp.noun.pluralize('banjo') == 'banjos')
        console.log(nlp.noun.pluralize('cargo') == 'cargos')
        console.log(nlp.noun.pluralize('flamingo') == 'flamingos')
        console.log(nlp.noun.pluralize('fresco') == 'frescos')
        console.log(nlp.noun.pluralize('ghetto') == 'ghettos')
        console.log(nlp.noun.pluralize('halo') == 'halos')
        console.log(nlp.noun.pluralize('mango') == 'mangos')
        console.log(nlp.noun.pluralize('memento') == 'mementos')
        console.log(nlp.noun.pluralize('motto') == 'mottos')
        console.log(nlp.noun.pluralize('tornado') == 'tornados')
        console.log(nlp.noun.pluralize('tuxedo') == 'tuxedos')
        console.log(nlp.noun.pluralize('volcano') == 'volcanos')
        console.log(nlp.noun.pluralize('crisis') == 'crises')
        console.log(nlp.noun.pluralize('analysis') == 'analyses')
        console.log(nlp.noun.pluralize('neurosis') == 'neuroses')
        console.log(nlp.noun.pluralize('aircraft') == 'aircraft')
        console.log(nlp.noun.pluralize('halibut') == 'halibut')
        console.log(nlp.noun.pluralize('moose') == 'moose')
        console.log(nlp.noun.pluralize('salmon') == 'salmon')
        console.log(nlp.noun.pluralize('sheep') == 'sheep')
        console.log(nlp.noun.pluralize('spacecraft') == 'spacecraft')
        console.log(nlp.noun.pluralize('tuna') == 'tuna')
        console.log(nlp.noun.pluralize('trout') == 'trout')
        console.log(nlp.noun.pluralize('armadillo') == 'armadillos')
        console.log(nlp.noun.pluralize('auto') == 'autos')
        console.log(nlp.noun.pluralize('bravo') == 'bravos')
        console.log(nlp.noun.pluralize('bronco') == 'broncos')
        console.log(nlp.noun.pluralize('casino') == 'casinos')
        console.log(nlp.noun.pluralize('combo') == 'combos')
        console.log(nlp.noun.pluralize('gazebo') == 'gazebos')

        print_header("singularize")
        console.log(nlp.noun.singularize('Joneses') == 'Jones')
        console.log(nlp.noun.singularize('children') == 'child')
        console.log(nlp.noun.singularize('women') == 'woman')
        console.log(nlp.noun.singularize('men') == 'man')
        console.log(nlp.noun.singularize('people') == 'person')
        console.log(nlp.noun.singularize('geese') == 'goose')
        console.log(nlp.noun.singularize('mice') == 'mouse')
        console.log(nlp.noun.singularize('barracks') == 'barracks')
        console.log(nlp.noun.singularize('deer') == 'deer')
        console.log(nlp.noun.singularize('nuclei') == 'nucleus')
        console.log(nlp.noun.singularize('syllabi') == 'syllabus')
        console.log(nlp.noun.singularize('fungi') == 'fungus')
        console.log(nlp.noun.singularize('cacti') == 'cactus')
        console.log(nlp.noun.singularize('theses') == 'thesis')
        console.log(nlp.noun.singularize('crises') == 'crisis')
        console.log(nlp.noun.singularize('phenomena') == 'phenomenon')
        console.log(nlp.noun.singularize('embryos') == 'embryo')
        console.log(nlp.noun.singularize('frescos') == 'fresco')
        console.log(nlp.noun.singularize('ghettos') == 'ghetto')
        console.log(nlp.noun.singularize('halos') == 'halo')
        console.log(nlp.noun.singularize('mangos') == 'mango')
        console.log(nlp.noun.singularize('mementos') == 'memento')
        console.log(nlp.noun.singularize('mottos') == 'motto')
        console.log(nlp.noun.singularize('tornados') == 'tornado')
        console.log(nlp.noun.singularize('tuxedos') == 'tuxedo')
        console.log(nlp.noun.singularize('volcanos') == 'volcano')
        console.log(nlp.noun.singularize('crises') == 'crisis')
        console.log(nlp.noun.singularize('analyses') == 'analysis')
        console.log(nlp.noun.singularize('aircraft') == 'aircraft')
        console.log(nlp.noun.singularize('bass') == 'bass')
        console.log(nlp.noun.singularize('bison') == 'bison')
        console.log(nlp.noun.singularize('fish') == 'fish')
        console.log(nlp.noun.singularize('fowl') == 'fowl')
        console.log(nlp.noun.singularize('kilos') == 'kilo')
        console.log(nlp.noun.singularize('kimonos') == 'kimono')
        console.log(nlp.noun.singularize('logos') == 'logo')
        console.log(nlp.noun.singularize('memos') == 'memo')
        console.log(nlp.noun.singularize('ponchos') == 'poncho')
        console.log(nlp.noun.singularize('photos') == 'photo')
        console.log(nlp.noun.singularize('pimentos') == 'pimento')
        console.log(nlp.noun.singularize('pros') == 'pro')
        console.log(nlp.noun.singularize('sombreros') == 'sombrero')
        console.log(nlp.noun.singularize('tacos') == 'taco')
        console.log(nlp.noun.singularize('memos') == 'memo')
        console.log(nlp.noun.singularize('torsos') == 'torso')
        console.log(nlp.noun.singularize('xylophones') == 'xylophone')
        console.log(nlp.noun.singularize('quintuplets') == 'quintuplet')
        console.log(nlp.noun.singularize('worrywarts') == 'worrywart')
        console.log(nlp.noun.singularize('nerds') == 'nerd')
        console.log(nlp.noun.singularize('lollipops') == 'lollipop')
        console.log(nlp.noun.singularize('eyebrows') == 'eyebrow')


        print_header("ngram")
        s = nlp.ngram("i really think that we all really think it's all good")
        console.log(s[1][0].word == 'really think' && s[1][0].count == 2)
        console.log(s[0][0].word == 'really' && s[0][0].count == 2)
        s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
        console.log(s[0][0].word == 'she' && s[0][0].count == 2)

        print_header("adj_to_noun")
        console.log(nlp.adjective.to_noun("ferocious") == "ferociousness")
        console.log(nlp.adjective.to_noun("fancy") == "fanciness")

        print_header("dates")
        dates = nlp.dates("I got divorced on June 4th 1993, in Miami")
        console.log(dates.from.year == '1993' && dates.from.month == '06' && dates.from.day == '04')

        print_header("americanization")
        console.log(nlp.americanize("synthesise") == "synthesize")
        console.log(nlp.americanize("synthesised") == "synthesized")
        console.log(nlp.americanize("synthesises") == "synthesizes")
        console.log(nlp.americanize("synthesising") == "synthesizing")
        console.log(nlp.americanize("analyse") == "analyze")
        console.log(nlp.americanize("analysed") == "analyzed")
        console.log(nlp.americanize("analysing") == "analyzing")
        console.log(nlp.americanize("poise") == "poise")
        console.log(nlp.americanize("poised") == "poised")
        console.log(nlp.americanize("colour") == "color")
        console.log(nlp.americanize("honour") == "honor")
        console.log(nlp.americanize("neighbour") == "neighbor")
        console.log(nlp.americanize("neighbourly") == "neighborly")
        console.log(nlp.americanize("savour") == "savor")
        console.log(nlp.americanize("savourly") == "savorly")
        console.log(nlp.americanize("favour") == "favor")
        console.log(nlp.americanize("favourite") == "favorite")
        console.log(nlp.americanize("theatre") == "theater")
        console.log(nlp.americanize("theatres") == "theaters")
        console.log(nlp.americanize("entendre") == "entendre")
        console.log(nlp.americanize("genre") == "genre")
        console.log(nlp.americanize("mediocre") == "mediocre")
        console.log(nlp.americanize("acre") == "acre")
        console.log(nlp.americanize("acres") == "acres")
        console.log(nlp.americanize("analogue") == "analog")
        console.log(nlp.americanize("homologue") == "homolog")
        console.log(nlp.americanize("anaemia") == "anemia")
        console.log(nlp.americanize("oestrogen") == "estrogen")
        console.log(nlp.americanize("ageing") == "aging")
        console.log(nlp.americanize("useable") == "usable")
        console.log(nlp.americanize("programme") == "programme")
        console.log(nlp.americanize("tonne") == "tonne")
        console.log(nlp.americanize("counsellor") == "counselor")
        console.log(nlp.americanize("traveller") == "traveler")
        console.log(nlp.americanize("labelled") == "labeled")
        console.log(nlp.americanize("cancelled") == "canceled")
        console.log(nlp.americanize("quarrelled") == "quarreled")
        console.log(nlp.americanize("signalling") == "signaling")
        console.log(nlp.americanize("modelling") == "modeling")
        console.log(nlp.americanize("travelling") == "traveling")
        console.log(nlp.americanize("willful") == "willful")
        console.log(nlp.americanize("filling") == "filling")


        print_header("britishization")
        console.log(nlp.britishize("synthesized") == "synthesised")

        print_header("nlp.syllables")
        console.log(nlp.syllables("suddenly").length == 3)
        console.log(nlp.syllables("constipation").length == 4)
        console.log(nlp.syllables("diabolic").length == 4)
        console.log(nlp.syllables("fate").length == 1)
        console.log(nlp.syllables("fated").length == 2)
        console.log(nlp.syllables("fates").length == 1)
        console.log(nlp.syllables("genetic").length == 3)
        console.log(nlp.syllables("deviled").length == 3)
        console.log(nlp.syllables("imitated").length == 4)
        console.log(nlp.syllables("horse").length == 1)

        print_header("unicode")
        var obj = {
            percentage: 100
        }
        console.log(nlp.normalize("The ɋӈїck brown fox juӎÞs over tӊe laζy dog", obj) == "The quick brown fox jumps over the lazy dog")
        console.log(nlp.normalize("Björk", obj) == "Bjork")

        print_header("nlp.to_number")
        console.log(nlp.to_number("twenty two thousand five hundred") == 22500)
        console.log(nlp.to_number("two thousand five hundred and sixty") == 2560)
        console.log(nlp.to_number("a hundred and two") == 102)
        console.log(nlp.to_number("a hundred") == 100)
        console.log(nlp.to_number("seven") == 7)
        console.log(nlp.to_number("seven grand") == 7000)
        console.log(nlp.to_number("half a million") == 500000)
        console.log(nlp.to_number("half-million") == 500000)
        console.log(nlp.to_number("quarter-million") == 250000)
        console.log(nlp.to_number("a quarter million") == 250000)
        console.log(nlp.to_number("a quarter-grand") == 250)
        console.log(nlp.to_number("four and a half") == 6)
        console.log(nlp.to_number("ten and a half million") == 15000000)
        console.log(nlp.to_number("104") == 104)
        console.log(nlp.to_number("13 thousand") == 13000)


        print_header("nlp.noun.article")
        console.log(nlp.noun.article("wolf") == "a")
        console.log(nlp.noun.article("eulogy") == "a")
        console.log(nlp.noun.article("eater") == "an")
        console.log(nlp.noun.article("african") == "an")
        console.log(nlp.noun.article("houri") == "a")
        console.log(nlp.noun.article("awful") == "an")
        console.log(nlp.noun.article("utter") == "an")
        console.log(nlp.noun.article('S.S.L.') == "an")
        console.log(nlp.noun.article('FBI') == "an")
        console.log(nlp.noun.article('GHQ') == "a")
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
        var sentences = nlp.pos(str, {})
        var the = sentences.map(function(a) {
            return a.tokens
        }).map(function(a) {
            return a.pos
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
        // test_spot()
        // test_pos()
        test_others()
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }
    return main
})()
// tests()
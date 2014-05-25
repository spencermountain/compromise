var tests = (function() {
    //load in methods if using node, otherwise assume
    if (typeof module !== "undefined" && module.exports) {
        nlp = require("../index")
    }

    function test_others() {

        print_header("adjective.to_comparative")
        console.log(nlp.adjective("quick").conjugate().comparative == "quicker")
        console.log(nlp.adjective("friendly").conjugate().comparative == "friendlier")
        console.log(nlp.adjective("stinky").conjugate().comparative == "stinkier")
        console.log(nlp.adjective("clever").conjugate().comparative == "more clever")
        console.log(nlp.adjective("caring").conjugate().comparative == "more caring")

        print_header("adjective.to_superlative")
        console.log(nlp.adjective("quick").conjugate().superlative == "quickest")
        console.log(nlp.adjective("friendly").conjugate().superlative == "friendliest")
        console.log(nlp.adjective("caring").conjugate().superlative == "most caring")

        print_header("adjective.to_adverb")
        console.log(nlp.adjective('obligatory').conjugate().adverb == 'obligatorily')
        console.log(nlp.adjective('extensive').conjugate().adverb == 'extensively')
        console.log(nlp.adjective('large').conjugate().adverb == 'largely')
        console.log(nlp.adjective('naive').conjugate().adverb == 'naively')
        console.log(nlp.adjective('unimaginable').conjugate().adverb == 'unimaginably')
        console.log(nlp.adjective('unthinkable').conjugate().adverb == 'unthinkably')
        console.log(nlp.adjective('amiable').conjugate().adverb == 'amiably')
        console.log(nlp.adjective('affable').conjugate().adverb == 'affably')
        console.log(nlp.adjective('livid').conjugate().adverb == 'lividly')
        console.log(nlp.adjective('tentative').conjugate().adverb == 'tentatively')
        console.log(nlp.adjective('wide').conjugate().adverb == 'widely')
        console.log(nlp.adjective('impracticable').conjugate().adverb == 'impracticably')
        console.log(nlp.adjective('gruesome').conjugate().adverb == 'gruesomely')
        console.log(nlp.adjective('jejune').conjugate().adverb == 'jejunely')
        console.log(nlp.adjective('immature').conjugate().adverb == 'immaturely')
        console.log(nlp.adjective('retentive').conjugate().adverb == 'retentively')
        console.log(nlp.adjective('desperate').conjugate().adverb == 'desperately')
        console.log(nlp.adjective('recognizable').conjugate().adverb == 'recognizably')
        console.log(nlp.adjective('close').conjugate().adverb == 'closely')
        console.log(nlp.adjective('unprofitable').conjugate().adverb == 'unprofitably')
        console.log(nlp.adjective('vapid').conjugate().adverb == 'vapidly')
        console.log(nlp.adjective('obscure').conjugate().adverb == 'obscurely')
        console.log(nlp.adjective('bad').conjugate().adverb == 'badly')
        console.log(nlp.adjective('indeterminable').conjugate().adverb == 'indeterminably')
        console.log(nlp.adjective('horrible').conjugate().adverb == 'horribly')
        console.log(nlp.adjective('shamefaced').conjugate().adverb == 'shamefacedly')
        console.log(nlp.adjective('suave').conjugate().adverb == 'suavely')
        console.log(nlp.adjective('ornate').conjugate().adverb == 'ornately')
        console.log(nlp.adjective('inattentive').conjugate().adverb == 'inattentively')
        console.log(nlp.adjective('abstracted').conjugate().adverb == 'abstractedly')
        console.log(nlp.adjective('absentminded').conjugate().adverb == 'absentmindedly')
        console.log(nlp.adjective('competitive').conjugate().adverb == 'competitively')
        console.log(nlp.adjective('secure').conjugate().adverb == 'securely')
        console.log(nlp.adjective('profitable').conjugate().adverb == 'profitably')
        console.log(nlp.adjective('productive').conjugate().adverb == 'productively')
        console.log(nlp.adjective('irritable').conjugate().adverb == 'irritably')
        console.log(nlp.adjective('unfashionable').conjugate().adverb == 'unfashionably')
        console.log(nlp.adjective('dense').conjugate().adverb == 'densely')
        console.log(nlp.adjective('visible').conjugate().adverb == 'visibly')
        console.log(nlp.adjective('noticeable').conjugate().adverb == 'noticeably')
        console.log(nlp.adjective('observable').conjugate().adverb == 'observably')
        console.log(nlp.adjective('perceptible').conjugate().adverb == 'perceptibly')
        console.log(nlp.adjective('inexpressive').conjugate().adverb == 'inexpressively')
        console.log(nlp.adjective('unproductive').conjugate().adverb == 'unproductively')
        console.log(nlp.adjective('imaginative').conjugate().adverb == 'imaginatively')
        console.log(nlp.adjective('incisive').conjugate().adverb == 'incisively')
        console.log(nlp.adjective('precise').conjugate().adverb == 'precisely')
        console.log(nlp.adjective('reserved').conjugate().adverb == 'reservedly')
        console.log(nlp.adjective('effusive').conjugate().adverb == 'effusively')
        console.log(nlp.adjective('square').conjugate().adverb == 'squarely')

        print_header("adverb.to_adjective")
        console.log(nlp.adverb('garishly').conjugate().adjective == 'garish')
        console.log(nlp.adverb('tediously').conjugate().adjective == 'tedious')
        console.log(nlp.adverb('frightfully').conjugate().adjective == 'frightful')
        console.log(nlp.adverb('tortuously').conjugate().adjective == 'tortuous')
        console.log(nlp.adverb('privately').conjugate().adjective == 'private')
        console.log(nlp.adverb('unambiguously').conjugate().adjective == 'unambiguous')
        console.log(nlp.adverb('cortically').conjugate().adjective == 'cortic')
        console.log(nlp.adverb('biradially').conjugate().adjective == 'biradial')
        console.log(nlp.adverb('meanly').conjugate().adjective == 'mean')
        console.log(nlp.adverb('raspingly').conjugate().adjective == 'rasping')
        console.log(nlp.adverb('comprehensively').conjugate().adjective == 'comprehensive')
        console.log(nlp.adverb('fervently').conjugate().adjective == 'fervent')
        console.log(nlp.adverb('nationally').conjugate().adjective == 'national')
        console.log(nlp.adverb('maternally').conjugate().adjective == 'maternal')
        console.log(nlp.adverb('flashily').conjugate().adjective == 'flashy')
        console.log(nlp.adverb('only').conjugate().adjective == 'only')
        console.log(nlp.adverb('narrowly').conjugate().adjective == 'narrow')
        console.log(nlp.adverb('blasphemously').conjugate().adjective == 'blasphemous')
        console.log(nlp.adverb('abortively').conjugate().adjective == 'abortive')
        console.log(nlp.adverb('inoffensively').conjugate().adjective == 'inoffensive')
        console.log(nlp.adverb('truly').conjugate().adjective == 'true')
        console.log(nlp.adverb('gently').conjugate().adjective == 'gent')
        console.log(nlp.adverb('tolerantly').conjugate().adjective == 'tolerant')
        console.log(nlp.adverb('enchantingly').conjugate().adjective == 'enchanting')
        console.log(nlp.adverb('unswervingly').conjugate().adjective == 'unswerving')
        console.log(nlp.adverb('grubbily').conjugate().adjective == 'grubby')
        console.log(nlp.adverb('longitudinally').conjugate().adjective == 'longitudinal')
        console.log(nlp.adverb('thermodynamically').conjugate().adjective == 'thermodynamic')
        console.log(nlp.adverb('mirthfully').conjugate().adjective == 'mirthful')
        console.log(nlp.adverb('salaciously').conjugate().adjective == 'salacious')
        console.log(nlp.adverb('dourly').conjugate().adjective == 'dour')
        console.log(nlp.adverb('credulously').conjugate().adjective == 'credulous')
        console.log(nlp.adverb('carefully').conjugate().adjective == 'careful')
        console.log(nlp.adverb('knowingly').conjugate().adjective == 'knowing')
        console.log(nlp.adverb('geometrically').conjugate().adjective == 'geometrical')
        console.log(nlp.adverb('unassailably').conjugate().adjective == 'unassailable')
        console.log(nlp.adverb('antecedently').conjugate().adjective == 'antecedent')
        console.log(nlp.adverb('adjectively').conjugate().adjective == 'adjective')
        console.log(nlp.adverb('hebdomadally').conjugate().adjective == 'hebdomadal')
        console.log(nlp.adverb('dizzily').conjugate().adjective == 'dizzy')
        console.log(nlp.adverb('obnoxiously').conjugate().adjective == 'obnoxious')
        console.log(nlp.adverb('thirstily').conjugate().adjective == 'thirsty')
        console.log(nlp.adverb('biennially').conjugate().adjective == 'biennial')
        console.log(nlp.adverb('roguishly').conjugate().adjective == 'roguish')
        console.log(nlp.adverb('mentally').conjugate().adjective == 'mental')
        console.log(nlp.adverb('incessantly').conjugate().adjective == 'incessant')
        console.log(nlp.adverb('intelligently').conjugate().adjective == 'intelligent')
        console.log(nlp.adverb('perseveringly').conjugate().adjective == 'persevering')
        console.log(nlp.adverb('namely').conjugate().adjective == 'name')
        console.log(nlp.adverb('formidably').conjugate().adjective == 'formidable')

        print_header("nlp.sentences")
        console.log(nlp.sentences('Tony is nice. He lives in Japan.').length == 2)
        console.log(nlp.sentences('I like that Color').length == 1)
        console.log(nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length == 3)
        console.log(nlp.sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length == 2)

        print_header("pluralize")
        console.log(nlp.noun('snake').pluralize() == 'snakes')
        console.log(nlp.noun('ski').pluralize() == 'skis')
        console.log(nlp.noun('Barrymore').pluralize() == 'Barrymores')
        console.log(nlp.noun('witch').pluralize() == 'witches')
        console.log(nlp.noun('box').pluralize() == 'boxes')
        console.log(nlp.noun('gas').pluralize() == 'gases')
        console.log(nlp.noun('bus').pluralize() == 'buses')
        console.log(nlp.noun('kiss').pluralize() == 'kisses')
        console.log(nlp.noun('index').pluralize() == 'indices')
        console.log(nlp.noun('appendix').pluralize() == 'appendices')
        console.log(nlp.noun('criterion').pluralize() == 'criteria')
        console.log(nlp.noun('berry').pluralize() == 'berries')
        console.log(nlp.noun('activity').pluralize() == 'activities')
        console.log(nlp.noun('daisy').pluralize() == 'daisies')
        console.log(nlp.noun('church').pluralize() == 'churches')
        console.log(nlp.noun('bus').pluralize() == 'buses')
        console.log(nlp.noun('fox').pluralize() == 'foxes')
        console.log(nlp.noun('stomach').pluralize() == 'stomachs')
        console.log(nlp.noun('epoch').pluralize() == 'epochs')
        console.log(nlp.noun('knife').pluralize() == 'knives')
        console.log(nlp.noun('half').pluralize() == 'halves')
        console.log(nlp.noun('scarf').pluralize() == 'scarves')
        console.log(nlp.noun('chief').pluralize() == 'chiefs')
        console.log(nlp.noun('spoof').pluralize() == 'spoofs')
        console.log(nlp.noun('solo').pluralize() == 'solos')
        console.log(nlp.noun('zero').pluralize() == 'zeros')
        console.log(nlp.noun('avocado').pluralize() == 'avocados')
        console.log(nlp.noun('studio').pluralize() == 'studios')
        console.log(nlp.noun('zoo').pluralize() == 'zoos')
        console.log(nlp.noun('embryo').pluralize() == 'embryos')
        console.log(nlp.noun('hero').pluralize() == 'heroes')
        console.log(nlp.noun('banjo').pluralize() == 'banjos')
        console.log(nlp.noun('cargo').pluralize() == 'cargos')
        console.log(nlp.noun('flamingo').pluralize() == 'flamingos')
        console.log(nlp.noun('fresco').pluralize() == 'frescos')
        console.log(nlp.noun('ghetto').pluralize() == 'ghettos')
        console.log(nlp.noun('halo').pluralize() == 'halos')
        console.log(nlp.noun('mango').pluralize() == 'mangos')
        console.log(nlp.noun('memento').pluralize() == 'mementos')
        console.log(nlp.noun('motto').pluralize() == 'mottos')
        console.log(nlp.noun('tornado').pluralize() == 'tornados')
        console.log(nlp.noun('tuxedo').pluralize() == 'tuxedos')
        console.log(nlp.noun('volcano').pluralize() == 'volcanos')
        console.log(nlp.noun('crisis').pluralize() == 'crises')
        console.log(nlp.noun('analysis').pluralize() == 'analyses')
        console.log(nlp.noun('neurosis').pluralize() == 'neuroses')
        console.log(nlp.noun('aircraft').pluralize() == 'aircraft')
        console.log(nlp.noun('halibut').pluralize() == 'halibut')
        console.log(nlp.noun('moose').pluralize() == 'moose')
        console.log(nlp.noun('salmon').pluralize() == 'salmon')
        console.log(nlp.noun('sheep').pluralize() == 'sheep')
        console.log(nlp.noun('spacecraft').pluralize() == 'spacecraft')
        console.log(nlp.noun('tuna').pluralize() == 'tuna')
        console.log(nlp.noun('trout').pluralize() == 'trout')
        console.log(nlp.noun('armadillo').pluralize() == 'armadillos')
        console.log(nlp.noun('auto').pluralize() == 'autos')
        console.log(nlp.noun('bravo').pluralize() == 'bravos')
        console.log(nlp.noun('bronco').pluralize() == 'broncos')
        console.log(nlp.noun('casino').pluralize() == 'casinos')
        console.log(nlp.noun('combo').pluralize() == 'combos')
        console.log(nlp.noun('gazebo').pluralize() == 'gazebos')

        print_header("singularize")
        console.log(nlp.noun('Joneses').singularize() == 'Jones')
        console.log(nlp.noun('children').singularize() == 'child')
        console.log(nlp.noun('women').singularize() == 'woman')
        console.log(nlp.noun('men').singularize() == 'man')
        console.log(nlp.noun('people').singularize() == 'person')
        console.log(nlp.noun('geese').singularize() == 'goose')
        console.log(nlp.noun('mice').singularize() == 'mouse')
        console.log(nlp.noun('barracks').singularize() == 'barracks')
        console.log(nlp.noun('deer').singularize() == 'deer')
        console.log(nlp.noun('nuclei').singularize() == 'nucleus')
        console.log(nlp.noun('syllabi').singularize() == 'syllabus')
        console.log(nlp.noun('fungi').singularize() == 'fungus')
        console.log(nlp.noun('cacti').singularize() == 'cactus')
        console.log(nlp.noun('theses').singularize() == 'thesis')
        console.log(nlp.noun('crises').singularize() == 'crisis')
        console.log(nlp.noun('phenomena').singularize() == 'phenomenon')
        console.log(nlp.noun('embryos').singularize() == 'embryo')
        console.log(nlp.noun('frescos').singularize() == 'fresco')
        console.log(nlp.noun('ghettos').singularize() == 'ghetto')
        console.log(nlp.noun('halos').singularize() == 'halo')
        console.log(nlp.noun('mangos').singularize() == 'mango')
        console.log(nlp.noun('mementos').singularize() == 'memento')
        console.log(nlp.noun('mottos').singularize() == 'motto')
        console.log(nlp.noun('tornados').singularize() == 'tornado')
        console.log(nlp.noun('tuxedos').singularize() == 'tuxedo')
        console.log(nlp.noun('volcanos').singularize() == 'volcano')
        console.log(nlp.noun('crises').singularize() == 'crisis')
        console.log(nlp.noun('analyses').singularize() == 'analysis')
        console.log(nlp.noun('aircraft').singularize() == 'aircraft')
        console.log(nlp.noun('bass').singularize() == 'bass')
        console.log(nlp.noun('bison').singularize() == 'bison')
        console.log(nlp.noun('fish').singularize() == 'fish')
        console.log(nlp.noun('fowl').singularize() == 'fowl')
        console.log(nlp.noun('kilos').singularize() == 'kilo')
        console.log(nlp.noun('kimonos').singularize() == 'kimono')
        console.log(nlp.noun('logos').singularize() == 'logo')
        console.log(nlp.noun('memos').singularize() == 'memo')
        console.log(nlp.noun('ponchos').singularize() == 'poncho')
        console.log(nlp.noun('photos').singularize() == 'photo')
        console.log(nlp.noun('pimentos').singularize() == 'pimento')
        console.log(nlp.noun('pros').singularize() == 'pro')
        console.log(nlp.noun('sombreros').singularize() == 'sombrero')
        console.log(nlp.noun('tacos').singularize() == 'taco')
        console.log(nlp.noun('memos').singularize() == 'memo')
        console.log(nlp.noun('torsos').singularize() == 'torso')
        console.log(nlp.noun('xylophones').singularize() == 'xylophone')
        console.log(nlp.noun('quintuplets').singularize() == 'quintuplet')
        console.log(nlp.noun('worrywarts').singularize() == 'worrywart')
        console.log(nlp.noun('nerds').singularize() == 'nerd')
        console.log(nlp.noun('lollipops').singularize() == 'lollipop')
        console.log(nlp.noun('eyebrows').singularize() == 'eyebrow')


        print_header("ngram")
        s = nlp.ngram("i really think that we all really think it's all good")
        console.log(s[1][0].word == 'really think' && s[1][0].count == 2)
        console.log(s[0][0].word == 'really' && s[0][0].count == 2)
        s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
        console.log(s[0][0].word == 'she' && s[0][0].count == 2)

        print_header("adj_to_noun")
        console.log(nlp.adjective("ferocious").conjugate().noun == "ferociousness")
        console.log(nlp.adjective("fancy").conjugate().noun == "fanciness")

        print_header("dates")
        dates = nlp.value("I got divorced on June 4th 1993, in Miami").date()
        console.log(dates.year == 1993 && dates.month == 5 && dates.day == 4)
        dates = nlp.value("sunday March 18th").date()
        console.log(dates.month == 2 && dates.day == 18)
        dates = nlp.value("june 5th 1998").date()
        console.log(dates.month == 5 && dates.day == 5)

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

        print_header("nlp.value")
        console.log(nlp.value("twenty two thousand five hundred").number() == 22500)
        console.log(nlp.value("two thousand five hundred and sixty").number() == 2560)
        console.log(nlp.value("a hundred and two").number() == 102)
        console.log(nlp.value("a hundred").number() == 100)
        console.log(nlp.value("seven").number() == 7)
        console.log(nlp.value("seven grand").number() == 7000)
        console.log(nlp.value("half a million").number() == 500000)
        console.log(nlp.value("half-million").number() == 500000)
        console.log(nlp.value("quarter-million").number() == 250000)
        console.log(nlp.value("a quarter million").number() == 250000)
        console.log(nlp.value("a quarter-grand").number() == 250)
        console.log(nlp.value("four and a half").number() == 6)
        console.log(nlp.value("ten and a half million").number() == 15000000)
        console.log(nlp.value("104").number() == 104)
        console.log(nlp.value("13 thousand").number() == 13000)
        console.log(nlp.value("13 thousand").number() == 13000)
        console.log(nlp.value("17,983").number() == 17983)
        console.log(nlp.value("12:32").number() == null)
        console.log(nlp.value("123-1231").number() == null)
        console.log(nlp.value("seven eleven").number() == null)
        console.log(nlp.value("ten-four").number() == null)

        print_header("nlp.noun.article")
        console.log(nlp.noun("wolf").article() == "a")
        console.log(nlp.noun("eulogy").article() == "a")
        console.log(nlp.noun("eater").article() == "an")
        console.log(nlp.noun("african").article() == "an")
        console.log(nlp.noun("houri").article() == "a")
        console.log(nlp.noun("awful").article() == "an")
        console.log(nlp.noun("utter").article() == "an")
        console.log(nlp.noun('S.S.L.').article() == "an")
        console.log(nlp.noun('FBI').article() == "an")
        console.log(nlp.noun('GHQ').article() == "a")
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
        assert_spot("tony hawk walked to toronto", {}, ["tony hawk", "toronto"]);
        assert_spot("natalie portman in black swan was really great", {}, ["natalie portman", "swan"]);

        assert_spot("nancy reagan was great when she spoke about hiv in denver", {}, ["nancy reagan", "hiv", "denver"])
        // assert_spot("Dr. Conrad Murray recieved a guilty verdict", {}, ["dr. conrad murray"])
        assert_spot("i agree with tom hanks and nancy kerrigan", {}, ["tom hanks", "nancy kerrigan"])
        assert_spot("i went strolling in berlin", {
            ignore_gerund: true
        }, ["berlin"]);
        assert_spot("smoking all day in the bathtub", {}, ["day", "bathtub"]);
        assert_spot("john recently watched the simpsons", {}, ["john", "simpsons"]);
        assert_spot("I especially loved the singing in the phantom of the opera", {}, ["singing", "phantom", "opera"]);

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
            return a.normalised
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
tests()
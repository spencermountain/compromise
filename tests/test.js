var tests = (function() {
    //load in methods if using node, otherwise assume
    if (typeof module !== "undefined" && module.exports) {
        nlp = require("../index")
    }

    function printer(a,b){
        if(a!=b){
          console.log("fail - "+b+"===")
        }
    }

    function test_others() {

        print_header("adjective.to_comparative")
        printer(nlp.adjective("quick").conjugate().comparative , "quicker")
        printer(nlp.adjective("friendly").conjugate().comparative , "friendlier")
        printer(nlp.adjective("stinky").conjugate().comparative , "stinkier")
        printer(nlp.adjective("clever").conjugate().comparative , "more clever")
        printer(nlp.adjective("caring").conjugate().comparative , "more caring")

        print_header("adjective.to_superlative")
        printer(nlp.adjective("quick").conjugate().superlative , "quickest")
        printer(nlp.adjective("friendly").conjugate().superlative , "friendliest")
        printer(nlp.adjective("caring").conjugate().superlative , "most caring")

        print_header("adjective.to_adverb")
        printer(nlp.adjective('obligatory').conjugate().adverb , 'obligatorily')
        printer(nlp.adjective('extensive').conjugate().adverb , 'extensively')
        printer(nlp.adjective('large').conjugate().adverb , 'largely')
        printer(nlp.adjective('naive').conjugate().adverb , 'naively')
        printer(nlp.adjective('unimaginable').conjugate().adverb , 'unimaginably')
        printer(nlp.adjective('unthinkable').conjugate().adverb , 'unthinkably')
        printer(nlp.adjective('amiable').conjugate().adverb , 'amiably')
        printer(nlp.adjective('affable').conjugate().adverb , 'affably')
        printer(nlp.adjective('livid').conjugate().adverb , 'lividly')
        printer(nlp.adjective('tentative').conjugate().adverb , 'tentatively')
        printer(nlp.adjective('wide').conjugate().adverb , 'widely')
        printer(nlp.adjective('impracticable').conjugate().adverb , 'impracticably')
        printer(nlp.adjective('gruesome').conjugate().adverb , 'gruesomely')
        printer(nlp.adjective('jejune').conjugate().adverb , 'jejunely')
        printer(nlp.adjective('immature').conjugate().adverb , 'immaturely')
        printer(nlp.adjective('retentive').conjugate().adverb , 'retentively')
        printer(nlp.adjective('desperate').conjugate().adverb , 'desperately')
        printer(nlp.adjective('recognizable').conjugate().adverb , 'recognizably')
        printer(nlp.adjective('close').conjugate().adverb , 'closely')
        printer(nlp.adjective('unprofitable').conjugate().adverb , 'unprofitably')
        printer(nlp.adjective('vapid').conjugate().adverb , 'vapidly')
        printer(nlp.adjective('obscure').conjugate().adverb , 'obscurely')
        printer(nlp.adjective('bad').conjugate().adverb , 'badly')
        printer(nlp.adjective('indeterminable').conjugate().adverb , 'indeterminably')
        printer(nlp.adjective('horrible').conjugate().adverb , 'horribly')
        printer(nlp.adjective('shamefaced').conjugate().adverb , 'shamefacedly')
        printer(nlp.adjective('suave').conjugate().adverb , 'suavely')
        printer(nlp.adjective('ornate').conjugate().adverb , 'ornately')
        printer(nlp.adjective('inattentive').conjugate().adverb , 'inattentively')
        printer(nlp.adjective('abstracted').conjugate().adverb , 'abstractedly')
        printer(nlp.adjective('absentminded').conjugate().adverb , 'absentmindedly')
        printer(nlp.adjective('competitive').conjugate().adverb , 'competitively')
        printer(nlp.adjective('secure').conjugate().adverb , 'securely')
        printer(nlp.adjective('profitable').conjugate().adverb , 'profitably')
        printer(nlp.adjective('productive').conjugate().adverb , 'productively')
        printer(nlp.adjective('irritable').conjugate().adverb , 'irritably')
        printer(nlp.adjective('unfashionable').conjugate().adverb , 'unfashionably')
        printer(nlp.adjective('dense').conjugate().adverb , 'densely')
        printer(nlp.adjective('visible').conjugate().adverb , 'visibly')
        printer(nlp.adjective('noticeable').conjugate().adverb , 'noticeably')
        printer(nlp.adjective('observable').conjugate().adverb , 'observably')
        printer(nlp.adjective('perceptible').conjugate().adverb , 'perceptibly')
        printer(nlp.adjective('inexpressive').conjugate().adverb , 'inexpressively')
        printer(nlp.adjective('unproductive').conjugate().adverb , 'unproductively')
        printer(nlp.adjective('imaginative').conjugate().adverb , 'imaginatively')
        printer(nlp.adjective('incisive').conjugate().adverb , 'incisively')
        printer(nlp.adjective('precise').conjugate().adverb , 'precisely')
        printer(nlp.adjective('reserved').conjugate().adverb , 'reservedly')
        printer(nlp.adjective('effusive').conjugate().adverb , 'effusively')
        printer(nlp.adjective('square').conjugate().adverb , 'squarely')

        print_header("adverb.to_adjective")
        printer(nlp.adverb('garishly').conjugate().adjective , 'garish')
        printer(nlp.adverb('tediously').conjugate().adjective , 'tedious')
        printer(nlp.adverb('frightfully').conjugate().adjective , 'frightful')
        printer(nlp.adverb('tortuously').conjugate().adjective , 'tortuous')
        printer(nlp.adverb('privately').conjugate().adjective , 'private')
        printer(nlp.adverb('unambiguously').conjugate().adjective , 'unambiguous')
        printer(nlp.adverb('cortically').conjugate().adjective , 'cortic')
        printer(nlp.adverb('biradially').conjugate().adjective , 'biradial')
        printer(nlp.adverb('meanly').conjugate().adjective , 'mean')
        printer(nlp.adverb('raspingly').conjugate().adjective , 'rasping')
        printer(nlp.adverb('comprehensively').conjugate().adjective , 'comprehensive')
        printer(nlp.adverb('fervently').conjugate().adjective , 'fervent')
        printer(nlp.adverb('nationally').conjugate().adjective , 'national')
        printer(nlp.adverb('maternally').conjugate().adjective , 'maternal')
        printer(nlp.adverb('flashily').conjugate().adjective , 'flashy')
        printer(nlp.adverb('only').conjugate().adjective , 'only')
        printer(nlp.adverb('narrowly').conjugate().adjective , 'narrow')
        printer(nlp.adverb('blasphemously').conjugate().adjective , 'blasphemous')
        printer(nlp.adverb('abortively').conjugate().adjective , 'abortive')
        printer(nlp.adverb('inoffensively').conjugate().adjective , 'inoffensive')
        printer(nlp.adverb('truly').conjugate().adjective , 'true')
        printer(nlp.adverb('gently').conjugate().adjective , 'gent')
        printer(nlp.adverb('tolerantly').conjugate().adjective , 'tolerant')
        printer(nlp.adverb('enchantingly').conjugate().adjective , 'enchanting')
        printer(nlp.adverb('unswervingly').conjugate().adjective , 'unswerving')
        printer(nlp.adverb('grubbily').conjugate().adjective , 'grubby')
        printer(nlp.adverb('longitudinally').conjugate().adjective , 'longitudinal')
        printer(nlp.adverb('thermodynamically').conjugate().adjective , 'thermodynamic')
        printer(nlp.adverb('mirthfully').conjugate().adjective , 'mirthful')
        printer(nlp.adverb('salaciously').conjugate().adjective , 'salacious')
        printer(nlp.adverb('dourly').conjugate().adjective , 'dour')
        printer(nlp.adverb('credulously').conjugate().adjective , 'credulous')
        printer(nlp.adverb('carefully').conjugate().adjective , 'careful')
        printer(nlp.adverb('knowingly').conjugate().adjective , 'knowing')
        printer(nlp.adverb('geometrically').conjugate().adjective , 'geometrical')
        printer(nlp.adverb('unassailably').conjugate().adjective , 'unassailable')
        printer(nlp.adverb('antecedently').conjugate().adjective , 'antecedent')
        printer(nlp.adverb('adjectively').conjugate().adjective , 'adjective')
        printer(nlp.adverb('hebdomadally').conjugate().adjective , 'hebdomadal')
        printer(nlp.adverb('dizzily').conjugate().adjective , 'dizzy')
        printer(nlp.adverb('obnoxiously').conjugate().adjective , 'obnoxious')
        printer(nlp.adverb('thirstily').conjugate().adjective , 'thirsty')
        printer(nlp.adverb('biennially').conjugate().adjective , 'biennial')
        printer(nlp.adverb('roguishly').conjugate().adjective , 'roguish')
        printer(nlp.adverb('mentally').conjugate().adjective , 'mental')
        printer(nlp.adverb('incessantly').conjugate().adjective , 'incessant')
        printer(nlp.adverb('intelligently').conjugate().adjective , 'intelligent')
        printer(nlp.adverb('perseveringly').conjugate().adjective , 'persevering')
        printer(nlp.adverb('namely').conjugate().adjective , 'name')
        printer(nlp.adverb('formidably').conjugate().adjective , 'formidable')

        print_header("nlp.sentences")
        printer(nlp.sentences('Tony is nice. He lives in Japan.').length , 2)
        printer(nlp.sentences('I like that Color').length , 1)
        printer(nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length , 3)
        printer(nlp.sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length , 2)

        print_header("pluralize")
        printer(nlp.noun('snake').pluralize() , 'snakes')
        printer(nlp.noun('ski').pluralize() , 'skis')
        printer(nlp.noun('Barrymore').pluralize() , 'Barrymores')
        printer(nlp.noun('witch').pluralize() , 'witches')
        printer(nlp.noun('box').pluralize() , 'boxes')
        printer(nlp.noun('gas').pluralize() , 'gases')
        printer(nlp.noun('kiss').pluralize() , 'kisses')
        printer(nlp.noun('index').pluralize() , 'indices')
        printer(nlp.noun('appendix').pluralize() , 'appendices')
        printer(nlp.noun('criterion').pluralize() , 'criteria')
        printer(nlp.noun('berry').pluralize() , 'berries')
        printer(nlp.noun('activity').pluralize() , 'activities')
        printer(nlp.noun('daisy').pluralize() , 'daisies')
        printer(nlp.noun('church').pluralize() , 'churches')
        printer(nlp.noun('fox').pluralize() , 'foxes')
        printer(nlp.noun('stomach').pluralize() , 'stomachs')
        printer(nlp.noun('epoch').pluralize() , 'epochs')
        printer(nlp.noun('knife').pluralize() , 'knives')
        printer(nlp.noun('half').pluralize() , 'halves')
        printer(nlp.noun('scarf').pluralize() , 'scarves')
        printer(nlp.noun('chief').pluralize() , 'chiefs')
        printer(nlp.noun('spoof').pluralize() , 'spoofs')
        printer(nlp.noun('solo').pluralize() , 'solos')
        printer(nlp.noun('zero').pluralize() , 'zeros')
        printer(nlp.noun('avocado').pluralize() , 'avocados')
        printer(nlp.noun('studio').pluralize() , 'studios')
        printer(nlp.noun('zoo').pluralize() , 'zoos')
        printer(nlp.noun('embryo').pluralize() , 'embryos')
        printer(nlp.noun('hero').pluralize() , 'heroes')
        printer(nlp.noun('banjo').pluralize() , 'banjos')
        printer(nlp.noun('cargo').pluralize() , 'cargos')
        printer(nlp.noun('flamingo').pluralize() , 'flamingos')
        printer(nlp.noun('fresco').pluralize() , 'frescos')
        printer(nlp.noun('ghetto').pluralize() , 'ghettos')
        printer(nlp.noun('halo').pluralize() , 'halos')
        printer(nlp.noun('mango').pluralize() , 'mangos')
        printer(nlp.noun('memento').pluralize() , 'mementos')
        printer(nlp.noun('motto').pluralize() , 'mottos')
        printer(nlp.noun('tornado').pluralize() , 'tornados')
        printer(nlp.noun('tuxedo').pluralize() , 'tuxedos')
        printer(nlp.noun('volcano').pluralize() , 'volcanos')
        // printer(nlp.noun('bus').pluralize() , 'buses')
        // printer(nlp.noun('crisis').pluralize() , 'crises')
        // printer(nlp.noun('analysis').pluralize() , 'analyses')
        // printer(nlp.noun('neurosis').pluralize() , 'neuroses')
        printer(nlp.noun('aircraft').pluralize() , 'aircraft')
        printer(nlp.noun('halibut').pluralize() , 'halibut')
        printer(nlp.noun('moose').pluralize() , 'moose')
        printer(nlp.noun('salmon').pluralize() , 'salmon')
        printer(nlp.noun('sheep').pluralize() , 'sheep')
        printer(nlp.noun('spacecraft').pluralize() , 'spacecraft')
        printer(nlp.noun('tuna').pluralize() , 'tuna')
        printer(nlp.noun('trout').pluralize() , 'trout')
        printer(nlp.noun('armadillo').pluralize() , 'armadillos')
        printer(nlp.noun('auto').pluralize() , 'autos')
        printer(nlp.noun('bravo').pluralize() , 'bravos')
        printer(nlp.noun('bronco').pluralize() , 'broncos')
        printer(nlp.noun('casino').pluralize() , 'casinos')
        printer(nlp.noun('combo').pluralize() , 'combos')
        printer(nlp.noun('gazebo').pluralize() , 'gazebos')

        print_header("singularize")
        printer(nlp.noun('Joneses').singularize() , 'Jones')
        printer(nlp.noun('children').singularize() , 'child')
        printer(nlp.noun('women').singularize() , 'woman')
        printer(nlp.noun('men').singularize() , 'man')
        printer(nlp.noun('people').singularize() , 'person')
        printer(nlp.noun('geese').singularize() , 'goose')
        printer(nlp.noun('mice').singularize() , 'mouse')
        printer(nlp.noun('barracks').singularize() , 'barracks')
        printer(nlp.noun('deer').singularize() , 'deer')
        printer(nlp.noun('nuclei').singularize() , 'nucleus')
        printer(nlp.noun('syllabi').singularize() , 'syllabus')
        printer(nlp.noun('fungi').singularize() , 'fungus')
        printer(nlp.noun('cacti').singularize() , 'cactus')
        printer(nlp.noun('theses').singularize() , 'thesis')
        printer(nlp.noun('crises').singularize() , 'crisis')
        printer(nlp.noun('phenomena').singularize() , 'phenomenon')
        printer(nlp.noun('embryos').singularize() , 'embryo')
        printer(nlp.noun('frescos').singularize() , 'fresco')
        printer(nlp.noun('ghettos').singularize() , 'ghetto')
        printer(nlp.noun('halos').singularize() , 'halo')
        printer(nlp.noun('mangos').singularize() , 'mango')
        printer(nlp.noun('mementos').singularize() , 'memento')
        printer(nlp.noun('mottos').singularize() , 'motto')
        printer(nlp.noun('tornados').singularize() , 'tornado')
        printer(nlp.noun('tuxedos').singularize() , 'tuxedo')
        printer(nlp.noun('volcanos').singularize() , 'volcano')
        printer(nlp.noun('crises').singularize() , 'crisis')
        printer(nlp.noun('analyses').singularize() , 'analysis')
        printer(nlp.noun('aircraft').singularize() , 'aircraft')
        printer(nlp.noun('bass').singularize() , 'bass')
        printer(nlp.noun('bison').singularize() , 'bison')
        printer(nlp.noun('fish').singularize() , 'fish')
        printer(nlp.noun('fowl').singularize() , 'fowl')
        printer(nlp.noun('kilos').singularize() , 'kilo')
        printer(nlp.noun('kimonos').singularize() , 'kimono')
        printer(nlp.noun('logos').singularize() , 'logo')
        printer(nlp.noun('memos').singularize() , 'memo')
        printer(nlp.noun('ponchos').singularize() , 'poncho')
        printer(nlp.noun('photos').singularize() , 'photo')
        printer(nlp.noun('pimentos').singularize() , 'pimento')
        printer(nlp.noun('pros').singularize() , 'pro')
        printer(nlp.noun('sombreros').singularize() , 'sombrero')
        printer(nlp.noun('tacos').singularize() , 'taco')
        printer(nlp.noun('memos').singularize() , 'memo')
        printer(nlp.noun('torsos').singularize() , 'torso')
        printer(nlp.noun('xylophones').singularize() , 'xylophone')
        printer(nlp.noun('quintuplets').singularize() , 'quintuplet')
        printer(nlp.noun('worrywarts').singularize() , 'worrywart')
        printer(nlp.noun('nerds').singularize() , 'nerd')
        printer(nlp.noun('lollipops').singularize() , 'lollipop')
        printer(nlp.noun('eyebrows').singularize() , 'eyebrow')


        print_header("ngram")
        s = nlp.ngram("i really think that we all really think it's all good")
        printer(s[1][0].word , 'really think' )
        printer(s[1][0].count , 2 )
        printer(s[0][0].word , 'really')
        s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
        printer(s[0][0].word , 'she')

        print_header("adj_to_noun")
        printer(nlp.adjective("ferocious").conjugate().noun , "ferociousness")
        printer(nlp.adjective("fancy").conjugate().noun , "fanciness")

        print_header("dates")


        var date_tests= [
          ["I got divorced on June 4th 1993, in Miami",  {"month":5,"day":4,"year":1993}],
          ["March 7th-11th 1987",  {"month":2,"day":7,"year":1987}],
          ["June 1st-11th 1999",  {"month":5,"day":1,"year":1999}],
          ["28th of September to 5th of October 2008",  {"month":8,"day":28,"year":2008}],
          ["2nd of January to 5th of October 2008",  {"month":9,"day":5,"year":2008}],
          ["March 7th to june 11th 1987",  {"month":2,"day":7,"year":1987}],
          ["April 17th to september 11th 1981",  {"month":3,"day":17,"year":1981}],
          ["June 1st to June 11th 2014",  {"month":5,"day":1,"year":2014}],
          ["between 13 February and 15 February 1945",  {"month":1,"day":13,"year":1945}],
          ["between March 7th and june 11th 1987",  {"month":2,"day":7,"year":1987}],
          ["March 1st 1987",  {"month":2,"day":1,"year":1987}],
          ["June 22nd 2014",  {"month":5,"day":22,"year":undefined}],
          ["June 22nd 1997",  {"month":5,"day":22,"year":undefined}],
          ["3rd - 5th of March 1969",  {"month":2,"day":3,"year":1969}],
          ["3rd of March 1969",  {"month":2,"day":3,"year":1969}],
          ["2nd of April 1929",  {"month":3,"day":undefined,"year":1929}],
          // ["September 1939 to April 1945",  {"month":undefined,"day":undefined,"year":1939}],
          // ["June 1969 to April 1975",  {"month":undefined,"day":undefined,"year":1969}],
          ["March 1969",  {"month":2,"day":undefined,"year":1969}],
          ["March 18th",  {"month":2,"day":18,"year":undefined}],
          ["August 28th",  {"month":7,"day":28,"year":undefined}],
          ["18th of March",  {"month":2,"day":18,"year":undefined}],
          ["27th of March",  {"month":2,"day":27,"year":undefined}],
          ["2012-2014",  {"month":undefined,"day":undefined,"year":2012}],
          ["1997-1998",  {"month":undefined,"day":undefined,"year":1997}],
          ["1998",  {"month":undefined,"day":undefined,"year":1998}],
          ["1672",  {"month":undefined,"day":undefined,"year":1672}],
          ["2015",  {"month":undefined,"day":undefined,"year":2015}],
          ["january 5th 1998",  {"month":0,"day":5,"year":1998}],

          //edge cases
          ["2014-1998",  {"month":undefined,"day":undefined,"year":undefined}],
          ["february 10th",  {"month":1,"day":10,"year":undefined}],
          ["february 30th",  {"month":1,"day":undefined,"year":undefined}],
          ["2103",  {"month":undefined,"day":undefined,"year":undefined}],
          ["1111",  {"month":undefined,"day":undefined,"year":undefined}],
          ["jan 1921",  {"month":0,"day":undefined,"year":1921}],
          ["",  {"month":undefined,"day":undefined,"year":undefined}],
        ]
        date_tests.forEach(function(arr) {
          var o = nlp.value(arr[0]).date();
          return Object.keys(arr[1]).forEach(function(k) {
            printer(arr[1][k], o[k])
          });
        });



        print_header("americanization")
        printer(nlp.americanize("synthesise") , "synthesize")
        printer(nlp.americanize("synthesised") , "synthesized")
        printer(nlp.americanize("synthesises") , "synthesizes")
        printer(nlp.americanize("synthesising") , "synthesizing")
        printer(nlp.americanize("analyse") , "analyze")
        printer(nlp.americanize("analysed") , "analyzed")
        printer(nlp.americanize("analysing") , "analyzing")
        printer(nlp.americanize("poise") , "poise")
        printer(nlp.americanize("poised") , "poised")
        printer(nlp.americanize("colour") , "color")
        printer(nlp.americanize("honour") , "honor")
        printer(nlp.americanize("neighbour") , "neighbor")
        printer(nlp.americanize("neighbourly") , "neighborly")
        printer(nlp.americanize("savour") , "savor")
        printer(nlp.americanize("savourly") , "savorly")
        printer(nlp.americanize("favour") , "favor")
        printer(nlp.americanize("favourite") , "favorite")
        printer(nlp.americanize("theatre") , "theater")
        printer(nlp.americanize("theatres") , "theaters")
        printer(nlp.americanize("entendre") , "entendre")
        printer(nlp.americanize("genre") , "genre")
        printer(nlp.americanize("mediocre") , "mediocre")
        printer(nlp.americanize("acre") , "acre")
        printer(nlp.americanize("acres") , "acres")
        printer(nlp.americanize("analogue") , "analog")
        printer(nlp.americanize("homologue") , "homolog")
        printer(nlp.americanize("anaemia") , "anemia")
        printer(nlp.americanize("oestrogen") , "estrogen")
        printer(nlp.americanize("ageing") , "aging")
        printer(nlp.americanize("useable") , "usable")
        printer(nlp.americanize("programme") , "programme")
        printer(nlp.americanize("tonne") , "tonne")
        printer(nlp.americanize("counsellor") , "counselor")
        printer(nlp.americanize("traveller") , "traveler")
        printer(nlp.americanize("labelled") , "labeled")
        printer(nlp.americanize("cancelled") , "canceled")
        printer(nlp.americanize("quarrelled") , "quarreled")
        printer(nlp.americanize("signalling") , "signaling")
        printer(nlp.americanize("modelling") , "modeling")
        printer(nlp.americanize("travelling") , "traveling")
        printer(nlp.americanize("willful") , "willful")
        printer(nlp.americanize("filling") , "filling")


        print_header("britishization")
        printer(nlp.britishize("synthesized") , "synthesised")

        print_header("nlp.syllables")
        printer(nlp.syllables("suddenly").length , 3)
        printer(nlp.syllables("constipation").length , 4)
        printer(nlp.syllables("diabolic").length , 4)
        printer(nlp.syllables("fate").length , 1)
        printer(nlp.syllables("fated").length , 2)
        printer(nlp.syllables("fates").length , 1)
        printer(nlp.syllables("genetic").length , 3)
        printer(nlp.syllables("deviled").length , 3)
        printer(nlp.syllables("imitated").length , 4)
        printer(nlp.syllables("horse").length , 1)

        print_header("unicode")
        var obj = {
            percentage: 100
        }
        printer(nlp.normalize("The ɋӈїck brown fox juӎÞs over tӊe laζy dog", obj) , "The quick brown fox jumps over the lazy dog")
        printer(nlp.normalize("Björk", obj) , "Bjork")

        print_header("nlp.value")
        printer(nlp.value("twenty two thousand five hundred").number(), 22500)
        printer(nlp.value("two thousand five hundred and sixty").number(), 2560)
        printer(nlp.value("a hundred and two").number(), 102)
        printer(nlp.value("a hundred").number(), 100)
        printer(nlp.value("seven").number(), 7)
        printer(nlp.value("seven grand").number(), 7000)
        printer(nlp.value("half a million").number(), 500000)
        printer(nlp.value("half-million").number(), 500000)
        printer(nlp.value("quarter-million").number(), 250000)
        printer(nlp.value("a quarter million").number(), 250000)
        printer(nlp.value("a quarter-grand").number(), 250)
        printer(nlp.value("104").number(), 104)
        printer(nlp.value("13 thousand").number(), 13000)
        printer(nlp.value("17,983").number(), 17983)
        printer(nlp.value("12:32").number(), null)
        printer(nlp.value("123-1231").number(), null)
        printer(nlp.value("seven eleven").number(), null)
        printer(nlp.value("ten-four").number(), null)
        printer(nlp.value("one seven").number(), null)
        printer(nlp.value("one ten").number(), null)
        printer(nlp.value("one twelve").number(), null)
        printer(nlp.value("one thirty").number(), null)
        printer(nlp.value("nine fifty").number(), null)
        printer(nlp.value("five six").number(), null)
        printer(nlp.value("nine seventy").number(), null)
        printer(nlp.value("nine hundred").number(), 900)
        printer(nlp.value("nine two hundred").number(), null)
        printer(nlp.value("twenty one hundred").number(), 2100)
        printer(nlp.value("ten one").number(), null)
        printer(nlp.value("twelve one").number(), null)
        printer(nlp.value("twenty one").number(), 21)
        printer(nlp.value("seventy two").number(), 72)
        printer(nlp.value("seventy five two").number(), null)
        printer(nlp.value("two hundred two").number(), 202)
        printer(nlp.value("two hundred three hundred").number(), null)
        printer(nlp.value("one thousand one").number(), 1001)
        printer(nlp.value("minus five hundred").number(), -500)
        printer(nlp.value("minus fifteen").number(), -15)
        printer(nlp.value("five hundred million").number(), 500000000)
        printer(nlp.value("sixty fifteen hundred").number(), null)
        printer(nlp.value("$12.03").number(), 12.03)
        printer(nlp.value("$12").number(), 12)
        printer(nlp.value("5 hundred").number(), 500)
        printer(nlp.value("5.2 thousand").number(), 5200)
        printer(nlp.value("million").number(), 1000000)
        printer(nlp.value("hundred one").number(), 101)
        printer(nlp.value("one twenty").number(), null)
        printer(nlp.value("twenty five twenty").number(), null)
        printer(nlp.value("").number(), null)
        printer(nlp.value("minus fifty").number(), -50)
        printer(nlp.value("twenty thousand").number(), 20000)
        printer(nlp.value("four point six").number(), 4.6)
        printer(nlp.value("nine hundred point five").number(), 900.5)
        printer(nlp.value("sixteen hundred sixteen point eight").number(), 1616.8)
        printer(nlp.value("four point seven nine").number(), 4.79)
        printer(nlp.value("four point sixteen").number(), 4.16)
        printer(nlp.value("twenty first").number(), 21)
        printer(nlp.value("fifty ninth").number(), 59)
        printer(nlp.value("nine hundred fiftieth").number(), 950)



        print_header("nlp.noun.article")
        printer(nlp.noun("wolf").article() , "a")
        printer(nlp.noun("eulogy").article() , "a")
        printer(nlp.noun("eater").article() , "an")
        printer(nlp.noun("african").article() , "an")
        printer(nlp.noun("houri").article() , "a")
        printer(nlp.noun("awful").article() , "an")
        printer(nlp.noun("utter").article() , "an")
        printer(nlp.noun('S.S.L.').article() , "an")
        printer(nlp.noun('FBI').article() , "an")
        printer(nlp.noun('GHQ').article() , "a")
    }


    function test_pos() {
        print_header("part of speech")
        var fails = []
        ////coerce a noun
        assert_pos("Tony Hawk walked quickly to the store.", ["NN", "VB", "RB", "IN", "DT", "NN"])
        assert_pos("swim", ["VBP"])
        assert_pos("the swim", ["DT", "NN"])
        // assert_pos("my swim was great", ["PP", "NN"])
        assert_pos("the obviously good swim", ["DT", "RB", "JJ", "NN"])
        assert_pos("spencer kelly", ["NN"]) //looks like an adverb but aint
        //coerce a verb
        assert_pos("the big swing", ["DT","JJ","NN"])
        assert_pos("would normally swing", ["MD", "RB", "VBP"])
        //coerce an adjective
        assert_pos("is quietly lkajsfijf", ["CP","RB", "JJ"])
        // assert_pos("schlooking in toronto is scarey and lkasf", ["VBG", "IN", "NN", "CP", "JJ", "CC", "JJ"])
        assert_pos("lkjasdf always walks so very nicely", ["NN", "RB", "VBZ", "RB"])
        assert_pos("lkjasdf always walks in every cafesefirehty", ["NN", "RB", "VBZ", "IN", "DT", "NN"])
        //coerce a verb
        // assert_pos("scared", ["JJ"])
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
        console.log("     [pass]")
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a , null || b , null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    function assert_pos(str, arr) {
        var tags = nlp.pos(str, {}).sentences[0].tags()
        if (arraysEqual(tags, arr)) {
            console.log('true');
        } else {
            console.log('fail  =>' + str + '        ' + JSON.stringify(tags) + " vs. " + JSON.stringify(arr))
        }
    }

    function assert_spot(str, obj, arr) {
        var the = nlp.spot(str, obj)
        the = the.map(function(a) {
            return a.normalised
        })
        console.log(the)
        if (arraysEqual(the, arr)) {
            console.log('true');
        } else {
            // console.log('fail  =>' + str + '        ')
            // console.log(the)
            // console.log(arr)
        }
    }

    var main = function() {
        // test_spot()
        test_pos()
        test_others()
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }
    return main
})()
tests()
// console.log(nlp.adjective('bad').conjugate())
// console.log(nlp.noun('kiss').pluralize())
// dates = nlp.value("I got divorced on June 4th 1993, in Miami").date()
// console.log(dates)
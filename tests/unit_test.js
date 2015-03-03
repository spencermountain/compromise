//load in methods if using node, otherwise assume
if (typeof module !== "undefined" && module.exports) {
  var nlp = require("../index")
}

exports["adjective.to_comparative"] = function(test){
    test.ok(nlp.adjective("quick").conjugate().comparative , "quicker")
    test.ok(nlp.adjective("friendly").conjugate().comparative , "friendlier")
    test.ok(nlp.adjective("stinky").conjugate().comparative , "stinkier")
    test.ok(nlp.adjective("clever").conjugate().comparative , "more clever")
    test.ok(nlp.adjective("caring").conjugate().comparative , "more caring")
    test.done();
};

exports["adjective.to_superlative"] = function(test){
    test.ok(nlp.adjective("quick").conjugate().superlative , "quickest")
    test.ok(nlp.adjective("friendly").conjugate().superlative , "friendliest")
    test.ok(nlp.adjective("caring").conjugate().superlative , "most caring")
    test.done();
};

exports["adjective.to_adverb"] = function(test){
    test.ok(nlp.adjective('obligatory').conjugate().adverb , 'obligatorily')
    test.ok(nlp.adjective('extensive').conjugate().adverb , 'extensively')
    test.ok(nlp.adjective('large').conjugate().adverb , 'largely')
    test.ok(nlp.adjective('naive').conjugate().adverb , 'naively')
    test.ok(nlp.adjective('unimaginable').conjugate().adverb , 'unimaginably')
    test.ok(nlp.adjective('unthinkable').conjugate().adverb , 'unthinkably')
    test.ok(nlp.adjective('amiable').conjugate().adverb , 'amiably')
    test.ok(nlp.adjective('affable').conjugate().adverb , 'affably')
    test.ok(nlp.adjective('livid').conjugate().adverb , 'lividly')
    test.ok(nlp.adjective('tentative').conjugate().adverb , 'tentatively')
    test.ok(nlp.adjective('wide').conjugate().adverb , 'widely')
    test.ok(nlp.adjective('impracticable').conjugate().adverb , 'impracticably')
    test.ok(nlp.adjective('gruesome').conjugate().adverb , 'gruesomely')
    test.ok(nlp.adjective('jejune').conjugate().adverb , 'jejunely')
    test.ok(nlp.adjective('immature').conjugate().adverb , 'immaturely')
    test.ok(nlp.adjective('retentive').conjugate().adverb , 'retentively')
    test.ok(nlp.adjective('desperate').conjugate().adverb , 'desperately')
    test.ok(nlp.adjective('recognizable').conjugate().adverb , 'recognizably')
    test.ok(nlp.adjective('close').conjugate().adverb , 'closely')
    test.ok(nlp.adjective('unprofitable').conjugate().adverb , 'unprofitably')
    test.ok(nlp.adjective('vapid').conjugate().adverb , 'vapidly')
    test.ok(nlp.adjective('obscure').conjugate().adverb , 'obscurely')
    test.ok(nlp.adjective('bad').conjugate().adverb , 'badly')
    test.ok(nlp.adjective('indeterminable').conjugate().adverb , 'indeterminably')
    test.ok(nlp.adjective('horrible').conjugate().adverb , 'horribly')
    test.ok(nlp.adjective('shamefaced').conjugate().adverb , 'shamefacedly')
    test.ok(nlp.adjective('suave').conjugate().adverb , 'suavely')
    test.ok(nlp.adjective('ornate').conjugate().adverb , 'ornately')
    test.ok(nlp.adjective('inattentive').conjugate().adverb , 'inattentively')
    test.ok(nlp.adjective('abstracted').conjugate().adverb , 'abstractedly')
    test.ok(nlp.adjective('absentminded').conjugate().adverb , 'absentmindedly')
    test.ok(nlp.adjective('competitive').conjugate().adverb , 'competitively')
    test.ok(nlp.adjective('secure').conjugate().adverb , 'securely')
    test.ok(nlp.adjective('profitable').conjugate().adverb , 'profitably')
    test.ok(nlp.adjective('productive').conjugate().adverb , 'productively')
    test.ok(nlp.adjective('irritable').conjugate().adverb , 'irritably')
    test.ok(nlp.adjective('unfashionable').conjugate().adverb , 'unfashionably')
    test.ok(nlp.adjective('dense').conjugate().adverb , 'densely')
    test.ok(nlp.adjective('visible').conjugate().adverb , 'visibly')
    test.ok(nlp.adjective('noticeable').conjugate().adverb , 'noticeably')
    test.ok(nlp.adjective('observable').conjugate().adverb , 'observably')
    test.ok(nlp.adjective('perceptible').conjugate().adverb , 'perceptibly')
    test.ok(nlp.adjective('inexpressive').conjugate().adverb , 'inexpressively')
    test.ok(nlp.adjective('unproductive').conjugate().adverb , 'unproductively')
    test.ok(nlp.adjective('imaginative').conjugate().adverb , 'imaginatively')
    test.ok(nlp.adjective('incisive').conjugate().adverb , 'incisively')
    test.ok(nlp.adjective('precise').conjugate().adverb , 'precisely')
    test.ok(nlp.adjective('reserved').conjugate().adverb , 'reservedly')
    test.ok(nlp.adjective('effusive').conjugate().adverb , 'effusively')
    test.ok(nlp.adjective('square').conjugate().adverb , 'squarely')
    test.done();
};

exports["adverb.to_adjective"] = function(test){
    test.ok(nlp.adverb('garishly').conjugate().adjective , 'garish')
    test.ok(nlp.adverb('tediously').conjugate().adjective , 'tedious')
    test.ok(nlp.adverb('frightfully').conjugate().adjective , 'frightful')
    test.ok(nlp.adverb('tortuously').conjugate().adjective , 'tortuous')
    test.ok(nlp.adverb('privately').conjugate().adjective , 'private')
    test.ok(nlp.adverb('unambiguously').conjugate().adjective , 'unambiguous')
    test.ok(nlp.adverb('cortically').conjugate().adjective , 'cortic')
    test.ok(nlp.adverb('biradially').conjugate().adjective , 'biradial')
    test.ok(nlp.adverb('meanly').conjugate().adjective , 'mean')
    test.ok(nlp.adverb('raspingly').conjugate().adjective , 'rasping')
    test.ok(nlp.adverb('comprehensively').conjugate().adjective , 'comprehensive')
    test.ok(nlp.adverb('fervently').conjugate().adjective , 'fervent')
    test.ok(nlp.adverb('nationally').conjugate().adjective , 'national')
    test.ok(nlp.adverb('maternally').conjugate().adjective , 'maternal')
    test.ok(nlp.adverb('flashily').conjugate().adjective , 'flashy')
    test.ok(nlp.adverb('only').conjugate().adjective , 'only')
    test.ok(nlp.adverb('narrowly').conjugate().adjective , 'narrow')
    test.ok(nlp.adverb('blasphemously').conjugate().adjective , 'blasphemous')
    test.ok(nlp.adverb('abortively').conjugate().adjective , 'abortive')
    test.ok(nlp.adverb('inoffensively').conjugate().adjective , 'inoffensive')
    test.ok(nlp.adverb('truly').conjugate().adjective , 'true')
    test.ok(nlp.adverb('gently').conjugate().adjective , 'gent')
    test.ok(nlp.adverb('tolerantly').conjugate().adjective , 'tolerant')
    test.ok(nlp.adverb('enchantingly').conjugate().adjective , 'enchanting')
    test.ok(nlp.adverb('unswervingly').conjugate().adjective , 'unswerving')
    test.ok(nlp.adverb('grubbily').conjugate().adjective , 'grubby')
    test.ok(nlp.adverb('longitudinally').conjugate().adjective , 'longitudinal')
    test.ok(nlp.adverb('thermodynamically').conjugate().adjective , 'thermodynamic')
    test.ok(nlp.adverb('mirthfully').conjugate().adjective , 'mirthful')
    test.ok(nlp.adverb('salaciously').conjugate().adjective , 'salacious')
    test.ok(nlp.adverb('dourly').conjugate().adjective , 'dour')
    test.ok(nlp.adverb('credulously').conjugate().adjective , 'credulous')
    test.ok(nlp.adverb('carefully').conjugate().adjective , 'careful')
    test.ok(nlp.adverb('knowingly').conjugate().adjective , 'knowing')
    test.ok(nlp.adverb('geometrically').conjugate().adjective , 'geometrical')
    test.ok(nlp.adverb('unassailably').conjugate().adjective , 'unassailable')
    test.ok(nlp.adverb('antecedently').conjugate().adjective , 'antecedent')
    test.ok(nlp.adverb('adjectively').conjugate().adjective , 'adjective')
    test.ok(nlp.adverb('hebdomadally').conjugate().adjective , 'hebdomadal')
    test.ok(nlp.adverb('dizzily').conjugate().adjective , 'dizzy')
    test.ok(nlp.adverb('obnoxiously').conjugate().adjective , 'obnoxious')
    test.ok(nlp.adverb('thirstily').conjugate().adjective , 'thirsty')
    test.ok(nlp.adverb('biennially').conjugate().adjective , 'biennial')
    test.ok(nlp.adverb('roguishly').conjugate().adjective , 'roguish')
    test.ok(nlp.adverb('mentally').conjugate().adjective , 'mental')
    test.ok(nlp.adverb('incessantly').conjugate().adjective , 'incessant')
    test.ok(nlp.adverb('intelligently').conjugate().adjective , 'intelligent')
    test.ok(nlp.adverb('perseveringly').conjugate().adjective , 'persevering')
    test.ok(nlp.adverb('namely').conjugate().adjective , 'name')
    test.ok(nlp.adverb('formidably').conjugate().adjective , 'formidable')
    test.done();
};

exports["nlp.sentences"] = function(test){
    test.ok(nlp.sentences('Tony is nice. He lives in Japan.').length , 2)
    test.ok(nlp.sentences('I like that Color').length , 1)
    test.ok(nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length , 3)
    test.ok(nlp.sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length , 2)
    test.ok(nlp.sentences("Hi there! Everyone wins!").length , 2)
    test.ok(nlp.sentences("Hi there!!! Everyone wins.").length , 2)
    test.ok(nlp.sentences("he bought Yahoo! the company.").length , 1)
    test.done();
};

exports["pluralize"] = function(test){
    test.ok(nlp.noun('snake').pluralize() , 'snakes')
    test.ok(nlp.noun('ski').pluralize() , 'skis')
    test.ok(nlp.noun('Barrymore').pluralize() , 'Barrymores')
    test.ok(nlp.noun('witch').pluralize() , 'witches')
    test.ok(nlp.noun('box').pluralize() , 'boxes')
    test.ok(nlp.noun('gas').pluralize() , 'gases')
    test.ok(nlp.noun('kiss').pluralize() , 'kisses')
    test.ok(nlp.noun('index').pluralize() , 'indices')
    test.ok(nlp.noun('appendix').pluralize() , 'appendices')
    test.ok(nlp.noun('criterion').pluralize() , 'criteria')
    test.ok(nlp.noun('berry').pluralize() , 'berries')
    test.ok(nlp.noun('activity').pluralize() , 'activities')
    test.ok(nlp.noun('daisy').pluralize() , 'daisies')
    test.ok(nlp.noun('church').pluralize() , 'churches')
    test.ok(nlp.noun('fox').pluralize() , 'foxes')
    test.ok(nlp.noun('stomach').pluralize() , 'stomachs')
    test.ok(nlp.noun('epoch').pluralize() , 'epochs')
    test.ok(nlp.noun('knife').pluralize() , 'knives')
    test.ok(nlp.noun('half').pluralize() , 'halves')
    test.ok(nlp.noun('scarf').pluralize() , 'scarves')
    test.ok(nlp.noun('chief').pluralize() , 'chiefs')
    test.ok(nlp.noun('spoof').pluralize() , 'spoofs')
    test.ok(nlp.noun('solo').pluralize() , 'solos')
    test.ok(nlp.noun('zero').pluralize() , 'zeros')
    test.ok(nlp.noun('avocado').pluralize() , 'avocados')
    test.ok(nlp.noun('studio').pluralize() , 'studios')
    test.ok(nlp.noun('zoo').pluralize() , 'zoos')
    test.ok(nlp.noun('embryo').pluralize() , 'embryos')
    test.ok(nlp.noun('hero').pluralize() , 'heroes')
    test.ok(nlp.noun('banjo').pluralize() , 'banjos')
    test.ok(nlp.noun('cargo').pluralize() , 'cargos')
    test.ok(nlp.noun('flamingo').pluralize() , 'flamingos')
    test.ok(nlp.noun('fresco').pluralize() , 'frescos')
    test.ok(nlp.noun('ghetto').pluralize() , 'ghettos')
    test.ok(nlp.noun('halo').pluralize() , 'halos')
    test.ok(nlp.noun('mango').pluralize() , 'mangos')
    test.ok(nlp.noun('memento').pluralize() , 'mementos')
    test.ok(nlp.noun('motto').pluralize() , 'mottos')
    test.ok(nlp.noun('tornado').pluralize() , 'tornados')
    test.ok(nlp.noun('tuxedo').pluralize() , 'tuxedos')
    test.ok(nlp.noun('volcano').pluralize() , 'volcanos')
    // test.ok(nlp.noun('bus').pluralize() , 'buses')
    // test.ok(nlp.noun('crisis').pluralize() , 'crises')
    // test.ok(nlp.noun('analysis').pluralize() , 'analyses')
    // test.ok(nlp.noun('neurosis').pluralize() , 'neuroses')
    test.ok(nlp.noun('aircraft').pluralize() , 'aircraft')
    test.ok(nlp.noun('halibut').pluralize() , 'halibut')
    test.ok(nlp.noun('moose').pluralize() , 'moose')
    test.ok(nlp.noun('salmon').pluralize() , 'salmon')
    test.ok(nlp.noun('sheep').pluralize() , 'sheep')
    test.ok(nlp.noun('spacecraft').pluralize() , 'spacecraft')
    test.ok(nlp.noun('tuna').pluralize() , 'tuna')
    test.ok(nlp.noun('trout').pluralize() , 'trout')
    test.ok(nlp.noun('armadillo').pluralize() , 'armadillos')
    test.ok(nlp.noun('auto').pluralize() , 'autos')
    test.ok(nlp.noun('bravo').pluralize() , 'bravos')
    test.ok(nlp.noun('bronco').pluralize() , 'broncos')
    test.ok(nlp.noun('casino').pluralize() , 'casinos')
    test.ok(nlp.noun('combo').pluralize() , 'combos')
    test.ok(nlp.noun('gazebo').pluralize() , 'gazebos')
    test.done();
};

exports["singularize"] = function(test){
    test.ok(nlp.noun('Joneses').singularize() , 'Jones')
    test.ok(nlp.noun('children').singularize() , 'child')
    test.ok(nlp.noun('women').singularize() , 'woman')
    test.ok(nlp.noun('men').singularize() , 'man')
    test.ok(nlp.noun('people').singularize() , 'person')
    test.ok(nlp.noun('geese').singularize() , 'goose')
    test.ok(nlp.noun('mice').singularize() , 'mouse')
    test.ok(nlp.noun('barracks').singularize() , 'barracks')
    test.ok(nlp.noun('deer').singularize() , 'deer')
    test.ok(nlp.noun('nuclei').singularize() , 'nucleus')
    test.ok(nlp.noun('syllabi').singularize() , 'syllabus')
    test.ok(nlp.noun('fungi').singularize() , 'fungus')
    test.ok(nlp.noun('cacti').singularize() , 'cactus')
    test.ok(nlp.noun('theses').singularize() , 'thesis')
    test.ok(nlp.noun('crises').singularize() , 'crisis')
    test.ok(nlp.noun('phenomena').singularize() , 'phenomenon')
    test.ok(nlp.noun('embryos').singularize() , 'embryo')
    test.ok(nlp.noun('frescos').singularize() , 'fresco')
    test.ok(nlp.noun('ghettos').singularize() , 'ghetto')
    test.ok(nlp.noun('halos').singularize() , 'halo')
    test.ok(nlp.noun('mangos').singularize() , 'mango')
    test.ok(nlp.noun('mementos').singularize() , 'memento')
    test.ok(nlp.noun('mottos').singularize() , 'motto')
    test.ok(nlp.noun('tornados').singularize() , 'tornado')
    test.ok(nlp.noun('tuxedos').singularize() , 'tuxedo')
    test.ok(nlp.noun('volcanos').singularize() , 'volcano')
    test.ok(nlp.noun('crises').singularize() , 'crisis')
    test.ok(nlp.noun('analyses').singularize() , 'analysis')
    test.ok(nlp.noun('aircraft').singularize() , 'aircraft')
    test.ok(nlp.noun('bass').singularize() , 'bass')
    test.ok(nlp.noun('bison').singularize() , 'bison')
    test.ok(nlp.noun('fish').singularize() , 'fish')
    test.ok(nlp.noun('fowl').singularize() , 'fowl')
    test.ok(nlp.noun('kilos').singularize() , 'kilo')
    test.ok(nlp.noun('kimonos').singularize() , 'kimono')
    test.ok(nlp.noun('logos').singularize() , 'logo')
    test.ok(nlp.noun('memos').singularize() , 'memo')
    test.ok(nlp.noun('ponchos').singularize() , 'poncho')
    test.ok(nlp.noun('photos').singularize() , 'photo')
    test.ok(nlp.noun('pimentos').singularize() , 'pimento')
    test.ok(nlp.noun('pros').singularize() , 'pro')
    test.ok(nlp.noun('sombreros').singularize() , 'sombrero')
    test.ok(nlp.noun('tacos').singularize() , 'taco')
    test.ok(nlp.noun('memos').singularize() , 'memo')
    test.ok(nlp.noun('torsos').singularize() , 'torso')
    test.ok(nlp.noun('xylophones').singularize() , 'xylophone')
    test.ok(nlp.noun('quintuplets').singularize() , 'quintuplet')
    test.ok(nlp.noun('worrywarts').singularize() , 'worrywart')
    test.ok(nlp.noun('nerds').singularize() , 'nerd')
    test.ok(nlp.noun('lollipops').singularize() , 'lollipop')
    test.ok(nlp.noun('eyebrows').singularize() , 'eyebrow')
    test.done();
};


exports["ngram"] = function(test){
    s = nlp.ngram("i really think that we all really think it's all good")
    test.ok(s[1][0].word , 'really think' )
    test.ok(s[1][0].count , 2 )
    test.ok(s[0][0].word , 'really')
    s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
    test.ok(s[0][0].word , 'she')
    test.done();
};

exports["adj_to_noun"] = function(test){
    test.ok(nlp.adjective("ferocious").conjugate().noun , "ferociousness")
    test.ok(nlp.adjective("fancy").conjugate().noun , "fanciness")
    test.done();
};

exports["dates"] = function(test){
    var dates=[
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
      // ["2014-1998",  {"month":undefined,"day":undefined,"year":undefined}],
      ["february 10th",  {"month":1,"day":10,"year":undefined}],
      ["february 30th",  {"month":1,"day":undefined,"year":undefined}],
      // ["2103",  {"month":undefined,"day":undefined,"year":undefined}],
      // ["1111",  {"month":undefined,"day":undefined,"year":undefined}],
      ["jan 1921",  {"month":0,"day":undefined,"year":1921}],
      // ["",  {"month":undefined,"day":undefined,"year":undefined}],
    ]
  dates.forEach(function(arr, i){
    var o=nlp.value(arr[0]).date();
    delete o.date_object
    delete o.to
    test.deepEqual(o, arr[1], arr[0])
  })
  test.done();
}

exports["americanization"] = function(test){
    test.ok(nlp.americanize("synthesise") , "synthesize")
    test.ok(nlp.americanize("synthesised") , "synthesized")
    test.ok(nlp.americanize("synthesises") , "synthesizes")
    test.ok(nlp.americanize("synthesising") , "synthesizing")
    test.ok(nlp.americanize("analyse") , "analyze")
    test.ok(nlp.americanize("analysed") , "analyzed")
    test.ok(nlp.americanize("analysing") , "analyzing")
    test.ok(nlp.americanize("poise") , "poise")
    test.ok(nlp.americanize("poised") , "poised")
    test.ok(nlp.americanize("colour") , "color")
    test.ok(nlp.americanize("honour") , "honor")
    test.ok(nlp.americanize("neighbour") , "neighbor")
    test.ok(nlp.americanize("neighbourly") , "neighborly")
    test.ok(nlp.americanize("savour") , "savor")
    test.ok(nlp.americanize("savourly") , "savorly")
    test.ok(nlp.americanize("favour") , "favor")
    test.ok(nlp.americanize("favourite") , "favorite")
    test.ok(nlp.americanize("theatre") , "theater")
    test.ok(nlp.americanize("theatres") , "theaters")
    test.ok(nlp.americanize("entendre") , "entendre")
    test.ok(nlp.americanize("genre") , "genre")
    test.ok(nlp.americanize("mediocre") , "mediocre")
    test.ok(nlp.americanize("acre") , "acre")
    test.ok(nlp.americanize("acres") , "acres")
    test.ok(nlp.americanize("analogue") , "analog")
    test.ok(nlp.americanize("homologue") , "homolog")
    test.ok(nlp.americanize("anaemia") , "anemia")
    test.ok(nlp.americanize("oestrogen") , "estrogen")
    test.ok(nlp.americanize("ageing") , "aging")
    test.ok(nlp.americanize("useable") , "usable")
    test.ok(nlp.americanize("programme") , "programme")
    test.ok(nlp.americanize("tonne") , "tonne")
    test.ok(nlp.americanize("counsellor") , "counselor")
    test.ok(nlp.americanize("traveller") , "traveler")
    test.ok(nlp.americanize("labelled") , "labeled")
    test.ok(nlp.americanize("cancelled") , "canceled")
    test.ok(nlp.americanize("quarrelled") , "quarreled")
    test.ok(nlp.americanize("signalling") , "signaling")
    test.ok(nlp.americanize("modelling") , "modeling")
    test.ok(nlp.americanize("travelling") , "traveling")
    test.ok(nlp.americanize("willful") , "willful")
    test.ok(nlp.americanize("filling") , "filling")
    test.done();
};

exports["britishization"] = function(test){
    test.ok(nlp.britishize("synthesized") , "synthesised")
    test.done();
};

exports["nlp.syllables"] = function(test){
    test.ok(nlp.syllables("suddenly").length , 3)
    test.ok(nlp.syllables("constipation").length , 4)
    test.ok(nlp.syllables("diabolic").length , 4)
    test.ok(nlp.syllables("fate").length , 1)
    test.ok(nlp.syllables("fated").length , 2)
    test.ok(nlp.syllables("fates").length , 1)
    test.ok(nlp.syllables("genetic").length , 3)
    test.ok(nlp.syllables("deviled").length , 3)
    test.ok(nlp.syllables("imitated").length , 4)
    test.ok(nlp.syllables("horse").length , 1)
    test.done();
};

exports["unicode"] = function(test){
    var obj = {
        percentage: 100
    }
    test.ok(nlp.normalize("The ɋӈїck brown fox juӎÞs over tӊe laζy dog", obj) , "The quick brown fox jumps over the lazy dog")
    test.ok(nlp.normalize("Björk", obj) , "Bjork")
    test.done();
};

exports["nlp.value"] = function(test){
    test.ok(nlp.value("twenty two thousand five hundred").number(), 22500)
    test.ok(nlp.value("two thousand five hundred and sixty").number(), 2560)
    test.ok(nlp.value("a hundred and two").number(), 102)
    test.ok(nlp.value("a hundred").number(), 100)
    test.ok(nlp.value("seven").number(), 7)
    test.ok(nlp.value("seven grand").number(), 7000)
    test.ok(nlp.value("half a million").number(), 500000)
    test.ok(nlp.value("half-million").number(), 500000)
    test.ok(nlp.value("quarter-million").number(), 250000)
    test.ok(nlp.value("a quarter million").number(), 250000)
    test.ok(nlp.value("a quarter-grand").number(), 250)
    test.ok(nlp.value("104").number(), 104)
    test.ok(nlp.value("13 thousand").number(), 13000)
    test.ok(nlp.value("17,983").number(), 17983)
   // test.ok(nlp.value("12:32").number(), null)
    // test.ok(nlp.value("123-1231").number(), null)
    // test.ok(nlp.value("seven eleven").number(), null)
    // test.ok(nlp.value("ten-four").number(), null)
    // test.ok(nlp.value("one seven").number(), null)
    // test.ok(nlp.value("one ten").number(), null)
    // test.ok(nlp.value("one twelve").number(), null)
    // test.ok(nlp.value("one thirty").number(), null)
    // test.ok(nlp.value("nine fifty").number(), null)
    // test.ok(nlp.value("five six").number(), null)
    // test.ok(nlp.value("nine seventy").number(), null)
    test.ok(nlp.value("nine hundred").number(), 900)
    // test.ok(nlp.value("nine two hundred").number(), null)
    test.ok(nlp.value("twenty one hundred").number(), 2100)
    // test.ok(nlp.value("ten one").number(), null)
    // test.ok(nlp.value("twelve one").number(), null)
    test.ok(nlp.value("twenty one").number(), 21)
    test.ok(nlp.value("seventy two").number(), 72)
    // test.ok(nlp.value("seventy five two").number(), null)
    test.ok(nlp.value("two hundred two").number(), 202)
    // test.ok(nlp.value("two hundred three hundred").number(), null)
    test.ok(nlp.value("one thousand one").number(), 1001)
    test.ok(nlp.value("minus five hundred").number(), -500)
    test.ok(nlp.value("minus fifteen").number(), -15)
    test.ok(nlp.value("five hundred million").number(), 500000000)
    // test.ok(nlp.value("sixty fifteen hundred").number(), null)
    test.ok(nlp.value("$12.03").number(), 12.03)
    test.ok(nlp.value("$12").number(), 12)
    test.ok(nlp.value("5 hundred").number(), 500)
    test.ok(nlp.value("5.2 thousand").number(), 5200)
    test.ok(nlp.value("million").number(), 1000000)
    test.ok(nlp.value("hundred one").number(), 101)
    // test.ok(nlp.value("one twenty").number(), null)
    // test.ok(nlp.value("twenty five twenty").number(), null)
    // test.ok(nlp.value("").number(), null)
    test.ok(nlp.value("minus fifty").number(), -50)
    test.ok(nlp.value("twenty thousand").number(), 20000)
    test.ok(nlp.value("four point six").number(), 4.6)
    test.ok(nlp.value("nine hundred point five").number(), 900.5)
    test.ok(nlp.value("sixteen hundred sixteen point eight").number(), 1616.8)
    test.ok(nlp.value("four point seven nine").number(), 4.79)
    test.ok(nlp.value("four point sixteen").number(), 4.16)
    test.ok(nlp.value("twenty first").number(), 21)
    test.ok(nlp.value("fifty ninth").number(), 59)
    test.ok(nlp.value("nine hundred fiftieth").number(), 950)
    test.done();
};


exports["nlp.noun.article"] = function(test){
    test.ok(nlp.noun("wolf").article() , "a")
    test.ok(nlp.noun("eulogy").article() , "a")
    test.ok(nlp.noun("eater").article() , "an")
    test.ok(nlp.noun("african").article() , "an")
    test.ok(nlp.noun("houri").article() , "a")
    test.ok(nlp.noun("awful").article() , "an")
    test.ok(nlp.noun("utter").article() , "an")
    test.ok(nlp.noun('S.S.L.').article() , "an")
    test.ok(nlp.noun('FBI').article() , "an")
    test.ok(nlp.noun('GHQ').article() , "a")
    test.done();
};

exports["nlp.tag"] = function(test){
  [
    ////coerce a noun
    ["Tony Hawk walked quickly to the store.", ["NN", "VB", "RB", "IN", "DT", "NN"]],
    ["swim", ["VBP"]],
    ["the swim", ["DT", "NN"]],
    // ["my swim was great", ["PP", "NN"]]
    ["the obviously good swim", ["DT", "RB", "JJ", "NN"]],
    ["spencer kelly", ["NN"]], //looks like an adverb but aint
    //coerce a verb
    ["the big swing", ["DT","JJ","NN"]],
    ["would normally swing", ["MD", "RB", "VBP"]],
    //coerce an adjective
    ["is quietly lkajsfijf", ["CP","RB", "JJ"]],
    // ["schlooking in toronto is scarey and lkasf", ["VBG", "IN", "NN", "CP", "JJ", "CC", "JJ"]]
    ["lkjasdf always walks so very nicely", ["NN", "RB", "VBZ", "RB"]],
    ["lkjasdf always walks in every cafesefirehty", ["NN", "RB", "VBZ", "IN", "DT", "NN"]],
    //coerce a verb
    // ["scared", ["JJ"]]
    ["scared him hard", ["VB", "PRP", "JJ"]],
    //coerce an adverb
    ["he is real", ["PRP", "CP", "JJ"]],
    ["he is real cool", ["PRP", "CP", "RB", "JJ"]],
    ["a pretty, good and nice swim", ["DT", "JJ", "JJ", "CC", "JJ", "NN"]],
    ["a pretty good and nice swim", ["DT", "RB", "JJ", "CC", "JJ", "NN"]],
  ].forEach(function(arr){
    test.deepEqual(nlp.pos(arr[0], {}).sentences[0].tags(), arr[1])
  })
  test.done();
};

exports["nlp.spot"] = function(test){
    var options = {
          gerund: true,
          stick_adjectives: true,
          stick_prepositions: true,
          stick_the: false,
          subnouns: false,
          match_whole: false
      }
    var terms=[
      ["tony hawk walked to Toronto", {}, ["tony hawk", "toronto"]],
      ["natalie portman in black swan was really great", {}, ["natalie portman"]],
      ["nancy reagan was great when she spoke about HIV in Denver", {}, ["nancy reagan", "hiv", "denver"]],
      ["Dr. Conrad Murray recieved a guilty verdict", {}, ["dr conrad murray"]],
      ["i agree with tom hanks and nancy kerrigan", {}, ["tom hanks", "nancy kerrigan"]],
      ["i went strolling in Berlin", {ignore_gerund: true}, ["berlin"]],
      ["smoking all day in the bathtub", {}, []],
      ["I recently watched The Simpsons", {}, ["the simpsons"]],
      ["I especially loved the singing in The Phantom of the Opera", {}, ["the phantom of the opera"] ],
    ]
    terms.forEach(function(arr){
      var spots= nlp.spot(arr[0], options).map(function(a) {
        return a.normalised
      })
      test.deepEqual(spots , arr[2])
    })
  test.done();
};
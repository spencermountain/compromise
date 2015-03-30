//load in methods if using node, otherwise assume
if (typeof module !== "undefined" && module.exports) {
  var nlp = require("../index")
}

exports["negation"] = function(test){
  var negate=function(s){
    s=nlp.pos(s).sentences[0].negate().text()
    return s
  }
  // hacks for logic-words
  test.equal(negate("everyone will still be there"), "no one will still be there")
  test.equal(negate("everybody listens to the cbc"), "nobody listens to the cbc")
  test.equal(negate("somebody said it was great"), "nobody said it was great")
  test.equal(negate("i always walk to work"), "i never walk to work")
  test.equal(negate("always the quiet ones"), "never the quiet ones")
  test.equal(negate("i always use the laptop"), "i never use the laptop")
  test.equal(negate("he will always be a fool"), "he won't always be a fool")
  test.equal(negate("he always will be a fool"), "he never will be a fool")
  test.equal(negate("he will john"), "he won't john")
  test.equal(negate("he won't john"), "he will john")
  test.equal(negate("the groom will"), "the groom won't")
  // [infinitive verb] - walk -> don't walk
  test.equal(negate("i say"), "i don't say")
  test.equal(negate("i think everything will be ok"), "i don't think everything will be ok")
  // [future-tense verb] - will->wont
  test.equal(negate("he will go to the store"), "he won't go to the store")
  test.equal(negate("she will watch the movie"), "she won't watch the movie")
  //[present-tense verb] - add 'didn't', conjugate verb
  test.equal(negate("she walks"), "she doesn't walk")
  test.equal(negate("he goes to the store"), "he doesn't go to the store")
  test.equal(negate("she watches the movie"), "she doesn't watch the movie")
  test.equal(negate("she clutches the wheel"), "she doesn't clutch the wheel")
  test.equal(negate("she sells seashells by the seashore"), "she doesn't sell seashells by the seashore")
  test.equal(negate("she still drives to work"), "she still doesn't drive to work")
  //[past-tense verb] - add didn't and conjugate verb
  test.equal(negate("he went to the store"), "he didn't go to the store")
  test.equal(negate("she watched the movie"), "she didn't watch the movie")
  //[gerund verb] - 'walking' -> 'not walking'
  test.equal(negate("walking to toronto"), "not walking to toronto")
  test.equal(negate("smoking in the elevator"), "not smoking in the elevator")
  // [copula] - not
  test.equal(negate("he is an animal"), "he isn't an animal")
  test.equal(negate("tom was a goofball"), "tom wasn't a goofball")
  test.equal(negate("he will be a lion"), "he won't be a lion")
  // already negative
  test.equal(negate("he didn't go to the store"), "he did go to the store")
  test.equal(negate("she didn't watch the movie"), "she did watch the movie")
  test.equal(negate("he will not be a lion"), "he will be a lion")
  // other stuff
  test.equal(negate("he will be the best"), "he won't be the best")
  test.equal(negate("he is the best"), "he isn't the best")
  test.equal(negate("he is walking to toronto"), "he isn't walking to toronto")
  // coumpound sentences
  test.equal(negate("he will be a lion and will be on stage"), "he won't be a lion and will be on stage")
  test.equal(negate("he was a lion and will be on stage"), "he wasn't a lion and will be on stage")
  test.equal(negate("the walk was good and swimming was nice"), "the walk wasn't good and swimming was nice")
  //hard ones
  // test.equal(negate("he will surely not be a lion"), "he will surely be a lion") //this is interesting..
  // test.equal(negate("smoking in the elevator is allowed"), "smoking in the elevator is not allowed") // this is interesting..

  test.done()
}

exports["adjective.to_comparative"] = function(test){
    test.equal(nlp.adjective("quick").conjugate().comparative , "quicker")
    test.equal(nlp.adjective("friendly").conjugate().comparative , "friendlier")
    test.equal(nlp.adjective("stinky").conjugate().comparative , "stinkier")
    test.equal(nlp.adjective("clever").conjugate().comparative , "more clever")
    test.equal(nlp.adjective("caring").conjugate().comparative , "more caring")
    test.done();
};

exports["adjective.to_superlative"] = function(test){
    test.equal(nlp.adjective("quick").conjugate().superlative , "quickest")
    test.equal(nlp.adjective("friendly").conjugate().superlative , "friendliest")
    test.equal(nlp.adjective("caring").conjugate().superlative , "most caring")
    test.done();
};

exports["adjective.to_adverb"] = function(test){
    test.equal(nlp.adjective('obligatory').conjugate().adverb , 'obligatorily')
    test.equal(nlp.adjective('extensive').conjugate().adverb , 'extensively')
    test.equal(nlp.adjective('large').conjugate().adverb , 'largely')
    test.equal(nlp.adjective('naive').conjugate().adverb , 'naively')
    test.equal(nlp.adjective('unimaginable').conjugate().adverb , 'unimaginably')
    test.equal(nlp.adjective('unthinkable').conjugate().adverb , 'unthinkably')
    test.equal(nlp.adjective('amiable').conjugate().adverb , 'amiably')
    test.equal(nlp.adjective('affable').conjugate().adverb , 'affably')
    test.equal(nlp.adjective('livid').conjugate().adverb , 'lividly')
    test.equal(nlp.adjective('tentative').conjugate().adverb , 'tentatively')
    test.equal(nlp.adjective('wide').conjugate().adverb , 'widely')
    test.equal(nlp.adjective('impracticable').conjugate().adverb , 'impracticably')
    test.equal(nlp.adjective('gruesome').conjugate().adverb , 'gruesomely')
    test.equal(nlp.adjective('jejune').conjugate().adverb , 'jejunely')
    test.equal(nlp.adjective('immature').conjugate().adverb , 'immaturely')
    test.equal(nlp.adjective('retentive').conjugate().adverb , 'retentively')
    test.equal(nlp.adjective('desperate').conjugate().adverb , 'desperately')
    test.equal(nlp.adjective('recognizable').conjugate().adverb , 'recognizably')
    test.equal(nlp.adjective('close').conjugate().adverb , 'closely')
    test.equal(nlp.adjective('unprofitable').conjugate().adverb , 'unprofitably')
    test.equal(nlp.adjective('vapid').conjugate().adverb , 'vapidly')
    test.equal(nlp.adjective('obscure').conjugate().adverb , 'obscurely')
    test.equal(nlp.adjective('bad').conjugate().adverb , 'badly')
    test.equal(nlp.adjective('indeterminable').conjugate().adverb , 'indeterminably')
    test.equal(nlp.adjective('horrible').conjugate().adverb , 'horribly')
    test.equal(nlp.adjective('shamefaced').conjugate().adverb , 'shamefacedly')
    test.equal(nlp.adjective('suave').conjugate().adverb , 'suavely')
    test.equal(nlp.adjective('ornate').conjugate().adverb , 'ornately')
    test.equal(nlp.adjective('inattentive').conjugate().adverb , 'inattentively')
    test.equal(nlp.adjective('abstracted').conjugate().adverb , 'abstractedly')
    test.equal(nlp.adjective('absentminded').conjugate().adverb , 'absentmindedly')
    test.equal(nlp.adjective('competitive').conjugate().adverb , 'competitively')
    test.equal(nlp.adjective('secure').conjugate().adverb , 'securely')
    test.equal(nlp.adjective('profitable').conjugate().adverb , 'profitably')
    test.equal(nlp.adjective('productive').conjugate().adverb , 'productively')
    test.equal(nlp.adjective('irritable').conjugate().adverb , 'irritably')
    test.equal(nlp.adjective('unfashionable').conjugate().adverb , 'unfashionably')
    test.equal(nlp.adjective('dense').conjugate().adverb , 'densely')
    test.equal(nlp.adjective('visible').conjugate().adverb , 'visibly')
    test.equal(nlp.adjective('noticeable').conjugate().adverb , 'noticeably')
    test.equal(nlp.adjective('observable').conjugate().adverb , 'observably')
    test.equal(nlp.adjective('perceptible').conjugate().adverb , 'perceptibly')
    test.equal(nlp.adjective('inexpressive').conjugate().adverb , 'inexpressively')
    test.equal(nlp.adjective('unproductive').conjugate().adverb , 'unproductively')
    test.equal(nlp.adjective('imaginative').conjugate().adverb , 'imaginatively')
    test.equal(nlp.adjective('incisive').conjugate().adverb , 'incisively')
    test.equal(nlp.adjective('precise').conjugate().adverb , 'precisely')
    test.equal(nlp.adjective('reserved').conjugate().adverb , 'reservedly')
    test.equal(nlp.adjective('effusive').conjugate().adverb , 'effusively')
    test.equal(nlp.adjective('square').conjugate().adverb , 'squarely')
    test.done();
};

exports["adverb.to_adjective"] = function(test){
    test.equal(nlp.adverb('garishly').conjugate().adjective , 'garish')
    test.equal(nlp.adverb('tediously').conjugate().adjective , 'tedious')
    test.equal(nlp.adverb('frightfully').conjugate().adjective , 'frightful')
    test.equal(nlp.adverb('tortuously').conjugate().adjective , 'tortuous')
    test.equal(nlp.adverb('privately').conjugate().adjective , 'private')
    test.equal(nlp.adverb('unambiguously').conjugate().adjective , 'unambiguous')
    test.equal(nlp.adverb('cortically').conjugate().adjective , 'cortic')
    test.equal(nlp.adverb('biradially').conjugate().adjective , 'biradial')
    test.equal(nlp.adverb('meanly').conjugate().adjective , 'mean')
    test.equal(nlp.adverb('raspingly').conjugate().adjective , 'rasping')
    test.equal(nlp.adverb('comprehensively').conjugate().adjective , 'comprehensive')
    test.equal(nlp.adverb('fervently').conjugate().adjective , 'fervent')
    test.equal(nlp.adverb('nationally').conjugate().adjective , 'national')
    test.equal(nlp.adverb('maternally').conjugate().adjective , 'maternal')
    test.equal(nlp.adverb('flashily').conjugate().adjective , 'flashy')
    test.equal(nlp.adverb('only').conjugate().adjective , 'only')
    test.equal(nlp.adverb('narrowly').conjugate().adjective , 'narrow')
    test.equal(nlp.adverb('blasphemously').conjugate().adjective , 'blasphemous')
    test.equal(nlp.adverb('abortively').conjugate().adjective , 'abortive')
    test.equal(nlp.adverb('inoffensively').conjugate().adjective , 'inoffensive')
    test.equal(nlp.adverb('truly').conjugate().adjective , 'true')
    test.equal(nlp.adverb('gently').conjugate().adjective , 'gent')
    test.equal(nlp.adverb('tolerantly').conjugate().adjective , 'tolerant')
    test.equal(nlp.adverb('enchantingly').conjugate().adjective , 'enchanting')
    test.equal(nlp.adverb('unswervingly').conjugate().adjective , 'unswerving')
    test.equal(nlp.adverb('grubbily').conjugate().adjective , 'grubby')
    test.equal(nlp.adverb('longitudinally').conjugate().adjective , 'longitudinal')
    test.equal(nlp.adverb('thermodynamically').conjugate().adjective , 'thermodynamic')
    test.equal(nlp.adverb('mirthfully').conjugate().adjective , 'mirthful')
    test.equal(nlp.adverb('salaciously').conjugate().adjective , 'salacious')
    test.equal(nlp.adverb('dourly').conjugate().adjective , 'dour')
    test.equal(nlp.adverb('credulously').conjugate().adjective , 'credulous')
    test.equal(nlp.adverb('carefully').conjugate().adjective , 'careful')
    test.equal(nlp.adverb('knowingly').conjugate().adjective , 'knowing')
    test.equal(nlp.adverb('geometrically').conjugate().adjective , 'geometrical')
    test.equal(nlp.adverb('unassailably').conjugate().adjective , 'unassailable')
    test.equal(nlp.adverb('antecedently').conjugate().adjective , 'antecedent')
    test.equal(nlp.adverb('adjectively').conjugate().adjective , 'adjective')
    test.equal(nlp.adverb('hebdomadally').conjugate().adjective , 'hebdomadal')
    test.equal(nlp.adverb('dizzily').conjugate().adjective , 'dizzy')
    test.equal(nlp.adverb('obnoxiously').conjugate().adjective , 'obnoxious')
    test.equal(nlp.adverb('thirstily').conjugate().adjective , 'thirsty')
    test.equal(nlp.adverb('biennially').conjugate().adjective , 'biennial')
    test.equal(nlp.adverb('roguishly').conjugate().adjective , 'roguish')
    test.equal(nlp.adverb('mentally').conjugate().adjective , 'mental')
    test.equal(nlp.adverb('incessantly').conjugate().adjective , 'incessant')
    test.equal(nlp.adverb('intelligently').conjugate().adjective , 'intelligent')
    test.equal(nlp.adverb('perseveringly').conjugate().adjective , 'persevering')
    test.equal(nlp.adverb('namely').conjugate().adjective , 'name')
    test.equal(nlp.adverb('formidably').conjugate().adjective , 'formidable')
    test.done();
};

exports["nlp.sentences"] = function(test){
    test.equal(nlp.sentences('Tony is nice. He lives in Japan.').length , 2)
    test.equal(nlp.sentences('I like that Color').length , 1)
    test.equal(nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length , 3)
    test.equal(nlp.sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length , 2)
    test.equal(nlp.sentences("Hi there! Everyone wins!").length , 2)
    test.equal(nlp.sentences("Hi there!!! Everyone wins.").length , 2)
    test.equal(nlp.sentences("he bought Yahoo! the company.").length , 1)
    test.done();
};

exports["pluralize"] = function(test){
    test.equal(nlp.noun('snake').pluralize() , 'snakes')
    test.equal(nlp.noun('ski').pluralize() , 'skis')
    test.equal(nlp.noun('Barrymore').pluralize() , 'Barrymores')
    test.equal(nlp.noun('witch').pluralize() , 'witches')
    test.equal(nlp.noun('box').pluralize() , 'boxes')
    test.equal(nlp.noun('gas').pluralize() , 'gases')
    test.equal(nlp.noun('kiss').pluralize() , 'kisses')
    test.equal(nlp.noun('index').pluralize() , 'indices')
    test.equal(nlp.noun('appendix').pluralize() , 'appendices')
    test.equal(nlp.noun('criterion').pluralize() , 'criteria')
    test.equal(nlp.noun('berry').pluralize() , 'berries')
    test.equal(nlp.noun('activity').pluralize() , 'activities')
    test.equal(nlp.noun('daisy').pluralize() , 'daisies')
    test.equal(nlp.noun('church').pluralize() , 'churches')
    test.equal(nlp.noun('fox').pluralize() , 'foxes')
    test.equal(nlp.noun('stomach').pluralize() , 'stomachs')
    test.equal(nlp.noun('epoch').pluralize() , 'epochs')
    test.equal(nlp.noun('knife').pluralize() , 'knives')
    test.equal(nlp.noun('half').pluralize() , 'halves')
    test.equal(nlp.noun('scarf').pluralize() , 'scarves')
    test.equal(nlp.noun('chief').pluralize() , 'chiefs')
    test.equal(nlp.noun('spoof').pluralize() , 'spoofs')
    test.equal(nlp.noun('solo').pluralize() , 'solos')
    test.equal(nlp.noun('zero').pluralize() , 'zeros')
    test.equal(nlp.noun('avocado').pluralize() , 'avocados')
    test.equal(nlp.noun('studio').pluralize() , 'studios')
    test.equal(nlp.noun('zoo').pluralize() , 'zoos')
    test.equal(nlp.noun('embryo').pluralize() , 'embryos')
    test.equal(nlp.noun('hero').pluralize() , 'heroes')
    test.equal(nlp.noun('banjo').pluralize() , 'banjos')
    test.equal(nlp.noun('cargo').pluralize() , 'cargos')
    test.equal(nlp.noun('flamingo').pluralize() , 'flamingos')
    test.equal(nlp.noun('fresco').pluralize() , 'frescos')
    test.equal(nlp.noun('ghetto').pluralize() , 'ghettos')
    test.equal(nlp.noun('halo').pluralize() , 'halos')
    test.equal(nlp.noun('mango').pluralize() , 'mangos')
    test.equal(nlp.noun('memento').pluralize() , 'mementos')
    test.equal(nlp.noun('motto').pluralize() , 'mottos')
    test.equal(nlp.noun('tornado').pluralize() , 'tornados')
    test.equal(nlp.noun('tuxedo').pluralize() , 'tuxedos')
    test.equal(nlp.noun('volcano').pluralize() , 'volcanos')
    // test.equal(nlp.noun('bus').pluralize() , 'buses')
    // test.equal(nlp.noun('crisis').pluralize() , 'crises')
    // test.equal(nlp.noun('analysis').pluralize() , 'analyses')
    // test.equal(nlp.noun('neurosis').pluralize() , 'neuroses')
    test.equal(nlp.noun('aircraft').pluralize() , 'aircraft')
    test.equal(nlp.noun('halibut').pluralize() , 'halibut')
    test.equal(nlp.noun('moose').pluralize() , 'moose')
    test.equal(nlp.noun('salmon').pluralize() , 'salmon')
    test.equal(nlp.noun('sheep').pluralize() , 'sheep')
    test.equal(nlp.noun('spacecraft').pluralize() , 'spacecraft')
    test.equal(nlp.noun('tuna').pluralize() , 'tuna')
    test.equal(nlp.noun('trout').pluralize() , 'trout')
    test.equal(nlp.noun('armadillo').pluralize() , 'armadillos')
    test.equal(nlp.noun('auto').pluralize() , 'autos')
    test.equal(nlp.noun('bravo').pluralize() , 'bravos')
    test.equal(nlp.noun('bronco').pluralize() , 'broncos')
    test.equal(nlp.noun('casino').pluralize() , 'casinos')
    test.equal(nlp.noun('combo').pluralize() , 'combos')
    test.equal(nlp.noun('gazebo').pluralize() , 'gazebos')
    test.done();
};

exports["singularize"] = function(test){
    test.equal(nlp.noun('Joneses').singularize() , 'Jones')
    test.equal(nlp.noun('children').singularize() , 'child')
    test.equal(nlp.noun('women').singularize() , 'woman')
    test.equal(nlp.noun('men').singularize() , 'man')
    test.equal(nlp.noun('people').singularize() , 'person')
    test.equal(nlp.noun('geese').singularize() , 'goose')
    test.equal(nlp.noun('mice').singularize() , 'mouse')
    test.equal(nlp.noun('barracks').singularize() , 'barracks')
    test.equal(nlp.noun('deer').singularize() , 'deer')
    test.equal(nlp.noun('nuclei').singularize() , 'nucleus')
    test.equal(nlp.noun('syllabi').singularize() , 'syllabus')
    test.equal(nlp.noun('fungi').singularize() , 'fungus')
    test.equal(nlp.noun('cacti').singularize() , 'cactus')
    test.equal(nlp.noun('theses').singularize() , 'thesis')
    test.equal(nlp.noun('crises').singularize() , 'crisis')
    test.equal(nlp.noun('phenomena').singularize() , 'phenomenon')
    test.equal(nlp.noun('embryos').singularize() , 'embryo')
    test.equal(nlp.noun('frescos').singularize() , 'fresco')
    test.equal(nlp.noun('ghettos').singularize() , 'ghetto')
    test.equal(nlp.noun('halos').singularize() , 'halo')
    test.equal(nlp.noun('mangos').singularize() , 'mango')
    test.equal(nlp.noun('mementos').singularize() , 'memento')
    test.equal(nlp.noun('mottos').singularize() , 'motto')
    test.equal(nlp.noun('tornados').singularize() , 'tornado')
    test.equal(nlp.noun('tuxedos').singularize() , 'tuxedo')
    test.equal(nlp.noun('volcanos').singularize() , 'volcano')
    test.equal(nlp.noun('crises').singularize() , 'crisis')
    test.equal(nlp.noun('analyses').singularize() , 'analysis')
    test.equal(nlp.noun('aircraft').singularize() , 'aircraft')
    test.equal(nlp.noun('bass').singularize() , 'bass')
    test.equal(nlp.noun('bison').singularize() , 'bison')
    test.equal(nlp.noun('fish').singularize() , 'fish')
    test.equal(nlp.noun('fowl').singularize() , 'fowl')
    test.equal(nlp.noun('kilos').singularize() , 'kilo')
    test.equal(nlp.noun('kimonos').singularize() , 'kimono')
    test.equal(nlp.noun('logos').singularize() , 'logo')
    test.equal(nlp.noun('memos').singularize() , 'memo')
    test.equal(nlp.noun('ponchos').singularize() , 'poncho')
    test.equal(nlp.noun('photos').singularize() , 'photo')
    test.equal(nlp.noun('pimentos').singularize() , 'pimento')
    test.equal(nlp.noun('pros').singularize() , 'pro')
    test.equal(nlp.noun('sombreros').singularize() , 'sombrero')
    test.equal(nlp.noun('tacos').singularize() , 'taco')
    test.equal(nlp.noun('memos').singularize() , 'memo')
    test.equal(nlp.noun('torsos').singularize() , 'torso')
    test.equal(nlp.noun('xylophones').singularize() , 'xylophone')
    test.equal(nlp.noun('quintuplets').singularize() , 'quintuplet')
    test.equal(nlp.noun('worrywarts').singularize() , 'worrywart')
    test.equal(nlp.noun('nerds').singularize() , 'nerd')
    test.equal(nlp.noun('lollipops').singularize() , 'lollipop')
    test.equal(nlp.noun('eyebrows').singularize() , 'eyebrow')
    test.done();
};


exports["ngram"] = function(test){
    s = nlp.ngram("i really think that we all really think it's all good")
    test.equal(s[1][0].word , 'really think' )
    test.equal(s[1][0].count , 2 )
    test.equal(s[0][0].word , 'really')
    s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
    test.equal(s[0][0].word , 'she')
    test.done();
};

exports["adj_to_noun"] = function(test){
    test.equal(nlp.adjective("ferocious").conjugate().noun , "ferociousness")
    test.equal(nlp.adjective("fancy").conjugate().noun , "fanciness")
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
    test.equal(nlp.americanize("synthesise") , "synthesize")
    test.equal(nlp.americanize("synthesised") , "synthesized")
    test.equal(nlp.americanize("synthesises") , "synthesizes")
    test.equal(nlp.americanize("synthesising") , "synthesizing")
    test.equal(nlp.americanize("analyse") , "analyze")
    test.equal(nlp.americanize("analysed") , "analyzed")
    test.equal(nlp.americanize("analysing") , "analyzing")
    test.equal(nlp.americanize("poise") , "poise")
    test.equal(nlp.americanize("poised") , "poised")
    test.equal(nlp.americanize("colour") , "color")
    test.equal(nlp.americanize("honour") , "honor")
    test.equal(nlp.americanize("neighbour") , "neighbor")
    test.equal(nlp.americanize("neighbourly") , "neighborly")
    test.equal(nlp.americanize("savour") , "savor")
    test.equal(nlp.americanize("savourly") , "savorly")
    test.equal(nlp.americanize("favour") , "favor")
    test.equal(nlp.americanize("favourite") , "favorite")
    test.equal(nlp.americanize("theatre") , "theater")
    test.equal(nlp.americanize("theatres") , "theaters")
    test.equal(nlp.americanize("entendre") , "entendre")
    test.equal(nlp.americanize("genre") , "genre")
    test.equal(nlp.americanize("mediocre") , "mediocre")
    test.equal(nlp.americanize("acre") , "acre")
    test.equal(nlp.americanize("acres") , "acres")
    test.equal(nlp.americanize("analogue") , "analog")
    test.equal(nlp.americanize("homologue") , "homolog")
    test.equal(nlp.americanize("anaemia") , "anemia")
    test.equal(nlp.americanize("oestrogen") , "estrogen")
    test.equal(nlp.americanize("ageing") , "aging")
    test.equal(nlp.americanize("useable") , "usable")
    test.equal(nlp.americanize("programme") , "programme")
    test.equal(nlp.americanize("tonne") , "tonne")
    test.equal(nlp.americanize("counsellor") , "counselor")
    test.equal(nlp.americanize("traveller") , "traveler")
    test.equal(nlp.americanize("labelled") , "labeled")
    test.equal(nlp.americanize("cancelled") , "canceled")
    test.equal(nlp.americanize("quarrelled") , "quarreled")
    test.equal(nlp.americanize("signalling") , "signaling")
    test.equal(nlp.americanize("modelling") , "modeling")
    test.equal(nlp.americanize("travelling") , "traveling")
    test.equal(nlp.americanize("willful") , "willful")
    test.equal(nlp.americanize("filling") , "filling")
    test.done();
};

exports["britishization"] = function(test){
    test.equal(nlp.britishize("synthesized") , "synthesised")
    test.done();
};

exports["nlp.syllables"] = function(test){
    test.equal(nlp.syllables("suddenly").length , 3)
    test.equal(nlp.syllables("constipation").length , 4)
    test.equal(nlp.syllables("diabolic").length , 4)
    test.equal(nlp.syllables("fate").length , 1)
    test.equal(nlp.syllables("fated").length , 2)
    test.equal(nlp.syllables("fates").length , 1)
    test.equal(nlp.syllables("genetic").length , 3)
    test.equal(nlp.syllables("deviled").length , 3)
    test.equal(nlp.syllables("imitated").length , 4)
    test.equal(nlp.syllables("horse").length , 1)
    test.done();
};

exports["unicode"] = function(test){
    var obj = {
        percentage: 100
    }
    test.equal(nlp.normalize("The ɋӈїck brown fox juӎÞs over tӊe laζy dog", obj) , "The quick brown fox jumps over the lazy dog")
    test.equal(nlp.normalize("Björk", obj) , "Bjork")
    test.done();
};

exports["nlp.value"] = function(test){
    test.equal(nlp.value("twenty two thousand five hundred").number(), 22500)
    test.equal(nlp.value("two thousand five hundred and sixty").number(), 2560)
    test.equal(nlp.value("a hundred and two").number(), 102)
    test.equal(nlp.value("a hundred").number(), 100)
    test.equal(nlp.value("seven").number(), 7)
    test.equal(nlp.value("seven grand").number(), 7000)
    test.equal(nlp.value("half a million").number(), 500000)
    test.equal(nlp.value("half-million").number(), 500000)
    test.equal(nlp.value("quarter-million").number(), 250000)
    test.equal(nlp.value("a quarter million").number(), 250000)
    test.equal(nlp.value("a quarter-grand").number(), 250)
    test.equal(nlp.value("104").number(), 104)
    test.equal(nlp.value("13 thousand").number(), 13000)
    test.equal(nlp.value("17,983").number(), 17983)
   // test.equal(nlp.value("12:32").number(), null)
    // test.equal(nlp.value("123-1231").number(), null)
    // test.equal(nlp.value("seven eleven").number(), null)
    // test.equal(nlp.value("ten-four").number(), null)
    // test.equal(nlp.value("one seven").number(), null)
    // test.equal(nlp.value("one ten").number(), null)
    // test.equal(nlp.value("one twelve").number(), null)
    // test.equal(nlp.value("one thirty").number(), null)
    // test.equal(nlp.value("nine fifty").number(), null)
    // test.equal(nlp.value("five six").number(), null)
    // test.equal(nlp.value("nine seventy").number(), null)
    test.equal(nlp.value("nine hundred").number(), 900)
    // test.equal(nlp.value("nine two hundred").number(), null)
    test.equal(nlp.value("twenty one hundred").number(), 2100)
    // test.equal(nlp.value("ten one").number(), null)
    // test.equal(nlp.value("twelve one").number(), null)
    test.equal(nlp.value("twenty one").number(), 21)
    test.equal(nlp.value("seventy two").number(), 72)
    // test.equal(nlp.value("seventy five two").number(), null)
    test.equal(nlp.value("two hundred two").number(), 202)
    // test.equal(nlp.value("two hundred three hundred").number(), null)
    test.equal(nlp.value("one thousand one").number(), 1001)
    test.equal(nlp.value("minus five hundred").number(), -500)
    test.equal(nlp.value("minus fifteen").number(), -15)
    test.equal(nlp.value("five hundred million").number(), 500000000)
    // test.equal(nlp.value("sixty fifteen hundred").number(), null)
    test.equal(nlp.value("$12.03").number(), 12.03)
    test.equal(nlp.value("$12").number(), 12)
    test.equal(nlp.value("5 hundred").number(), 500)
    test.equal(nlp.value("5.2 thousand").number(), 5200)
    test.equal(nlp.value("million").number(), 1000000)
    test.equal(nlp.value("hundred one").number(), 101)
    // test.equal(nlp.value("one twenty").number(), null)
    // test.equal(nlp.value("twenty five twenty").number(), null)
    // test.equal(nlp.value("").number(), null)
    test.equal(nlp.value("minus fifty").number(), -50)
    test.equal(nlp.value("twenty thousand").number(), 20000)
    test.equal(nlp.value("four point six").number(), 4.6)
    test.equal(nlp.value("nine hundred point five").number(), 900.5)
    test.equal(nlp.value("sixteen hundred sixteen point eight").number(), 1616.8)
    test.equal(nlp.value("four point seven nine").number(), 4.79)
    test.equal(nlp.value("four point sixteen").number(), 4.16)
    test.equal(nlp.value("twenty first").number(), 21)
    test.equal(nlp.value("fifty ninth").number(), 59)
    test.equal(nlp.value("nine hundred fiftieth").number(), 950)
    test.done();
};


exports["nlp.noun.article"] = function(test){
    test.equal(nlp.noun("wolf").article() , "a")
    test.equal(nlp.noun("eulogy").article() , "a")
    test.equal(nlp.noun("eater").article() , "an")
    test.equal(nlp.noun("african").article() , "an")
    test.equal(nlp.noun("houri").article() , "a")
    test.equal(nlp.noun("awful").article() , "an")
    test.equal(nlp.noun("utter").article() , "an")
    test.equal(nlp.noun('S.S.L.').article() , "an")
    test.equal(nlp.noun('FBI').article() , "an")
    test.equal(nlp.noun('GHQ').article() , "a")
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
        a=a||{}
        return a.normalised
      })
      test.deepEqual(spots , arr[2])
    })
  test.done();
};
var TIME=false

//load in methods if using node, otherwise assume
if (typeof module !== "undefined" && module.exports) {
  var nlp = require("../index")
} else {
  exports = {} //for clientside
}
var t;

// Dummy method for testing under prototype pollution
Object.prototype.dummy = function () {};

t = "ambiguous contractions"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.pos("he's fun").sentences[0].tokens[1].normalised, "is")
  test.strictEqual(nlp.pos("she's walking").sentences[0].tokens[1].normalised, "is")
  test.strictEqual(nlp.pos("he's walked").sentences[0].tokens[1].normalised, "has")
  test.strictEqual(nlp.pos("it's got the best features").sentences[0].tokens[1].normalised, "has")
  test.strictEqual(nlp.pos("it's achieved each goal").sentences[0].tokens[1].normalised, "has")
  test.strictEqual(nlp.pos("where's waldo").sentences[0].tokens[1].normalised, "is")
  test.strictEqual(nlp.pos("where's he going?").sentences[0].tokens[1].normalised, "is")
  test.strictEqual(nlp.pos("where's the pencil?").sentences[0].tokens[1].normalised, "is")
  test.strictEqual(nlp.pos("where's he disappeared to?").sentences[0].tokens[1].normalised, "has")
  test.strictEqual(nlp.pos("where's the pencil disappeared to?").sentences[0].tokens[1].normalised, "has")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "referenced by"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var refs = nlp.pos("i think Tony Danza is cool, he rocks it.").sentences[0].tokens[2].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].text, "he")
  refs = nlp.pos("i think Tony Danza is cool. He rocks it and he is golden.").sentences[0].tokens[2].analysis.referenced_by()
  test.strictEqual(refs.length, 2)
  test.strictEqual(refs[0].normalised, "he")
  test.strictEqual(refs[1].normalised, "he")
  refs = nlp.pos("Jamaica is nice because it never snows").sentences[0].tokens[0].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "it")
  refs = nlp.pos("Flowers are stupid. All they ever do is smell.").sentences[0].tokens[0].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "they")
  refs = nlp.pos("the tomatoes are good because they ripened.").sentences[0].tokens[1].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "they")

  refs = nlp.pos("Henry sold his kids.").sentences[0].tokens[0].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "his")
  refs = nlp.pos("Tina grabbed her shoes. She is lovely.").sentences[0].tokens[0].analysis.referenced_by()
  test.strictEqual(refs.length, 2)
  test.strictEqual(refs[0].normalised, "her")
  test.strictEqual(refs[1].normalised, "she")
  refs = nlp.pos("The books are dusty. They need to be dusted.").sentences[0].tokens[1].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "they")
  refs = nlp.pos("The books are dusty. I need to dust them.").sentences[0].tokens[1].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "them")
  refs = nlp.pos("Carrots are gross. Their skin makes make cry.").sentences[0].tokens[0].analysis.referenced_by()
  test.strictEqual(refs.length, 1)
  test.strictEqual(refs[0].normalised, "their")
  // refs = nlp.pos("I am fun. The world is mine.").sentences[0].tokens[0].analysis.referenced_by()
  // test.strictEqual(refs.length, 1)
  // test.strictEqual(refs[0].normalised, "i")


  // refs=nlp.pos("Sally and Tom fight a lot. She thinks he is her friend.").sentences[0].tokens[0].analysis.referenced_by()
  // test.strictEqual(refs.length, 2)
  // test.strictEqual(refs[0].normalised, "she")
  // test.strictEqual(refs[0].normalised, "her")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "reference to"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var ref = nlp.pos("i think Tony Danza is cool and he is golden.").sentences[0].tokens[6].analysis.reference_to()
  test.strictEqual(ref.text, "Tony Danza")
  ref = nlp.pos("i think Sally is cool and he is golden.").sentences[0].tokens[6].analysis.reference_to()
  test.strictEqual(ref, undefined)
  ref = nlp.pos("Joe walked away. I think he is a nightmare.").sentences[1].tokens[2].analysis.reference_to()
  test.strictEqual(ref.text, "Joe")
  ref = nlp.pos("Tennis balls are fun because they are chewy").sentences[0].tokens[4].analysis.reference_to()
  test.strictEqual(ref.text, "Tennis balls")
  ref = nlp.pos("Tanya G thinks dogs suck and she quit her job").sentences[0].tokens[5].analysis.reference_to()
  test.strictEqual(ref.text, "Tanya G")
  ref = nlp.pos("Tara says they suck and she quit her job").sentences[0].tokens[5].analysis.reference_to()
  test.strictEqual(ref.text, "Tara")

  ref = nlp.pos("Tony Danza is great. His bank is on the ball.").sentences[1].tokens[0].analysis.reference_to()
  test.strictEqual(ref.text, "Tony Danza")
  ref = nlp.pos("the banks were hacked. He took their money.").sentences[1].tokens[2].analysis.reference_to()
  test.strictEqual(ref.text, "banks")
  // ref = nlp.pos("We are cool. The banks are completely ours.").sentences[1].tokens[4].analysis.reference_to()
  // test.strictEqual(ref.text, "We")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "referables"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var obj = nlp.pos("Toronto is the center of Ontario").sentences[0].referables()
  test.strictEqual(obj.it.text, "Ontario")
  test.strictEqual(obj.he, undefined)
  test.strictEqual(obj.she, undefined)
  test.strictEqual(obj.they, undefined)
  obj = nlp.pos("Heather Lauren and Spencer Kelly went to Canada").sentences[0].referables()
  test.strictEqual(obj.it.text, "Canada")
  test.strictEqual(obj.he.text, "Spencer Kelly")
  test.strictEqual(obj.she.text, "Heather Lauren")
  test.strictEqual(obj.they, undefined)
  obj = nlp.pos("the books are dusty").sentences[0].referables()
  test.strictEqual(obj.it, undefined)
  test.strictEqual(obj.he, undefined)
  test.strictEqual(obj.she, undefined)
  test.strictEqual(obj.they.text, "books")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "noun.pronoun"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.noun("Toronto").pronoun(), "it")
  test.strictEqual(nlp.noun("studying").pronoun(), "it")
  test.strictEqual(nlp.noun("horses").pronoun(), "they")
  test.strictEqual(nlp.noun("road bike").pronoun(), "it")
  test.strictEqual(nlp.noun("road bikes").pronoun(), "they")
  test.strictEqual(nlp.noun("OHL goaltenders").pronoun(), "they")
  test.strictEqual(nlp.noun("Tony Danza").pronoun(), "he")
  test.strictEqual(nlp.noun("Tanya Danza").pronoun(), "she")
  test.strictEqual(nlp.noun("mrs. Taya Danza").pronoun(), "she")
  test.strictEqual(nlp.noun("Gool Tanya Danza").pronoun(), "she")
  test.strictEqual(nlp.noun("Illi G. Danza").pronoun(), "she")
  test.strictEqual(nlp.noun("Jill").pronoun(), "she")
  // test.strictEqual(nlp.noun("John Fisher & sons").pronoun(),"it")
  test.strictEqual(nlp.noun("John G. Fishermore Institute").pronoun(), "it")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "sentence.people"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var arr=[
    [
      "Sally Daniels went to the park with Donna Douglas", ["Sally Daniels", "Donna Douglas"]
    ], [
      "Then Sally went to the park with all her friends.", ["Sally"]
    ], [
      "Oh say can you see? By the dawn's early rise.", []
    ], [
      "Freddy Prince Jr. is cute. He and Madonna should get married.", ["Freddy Prince Jr."]
    ],
    // [
    //   "Ken Ripkin and Steven Samkos are friends, but Steven is taller.",
    //   ["Ken Ripkin", "Steven Samkos"]
    // ],
    // [
    //   "Ken Ripkin and Steven Samkos are friends, but one is taller.",
    //   ["Ken Ripkin", "Steven Samkos"]
    // ],
  ].forEach(function (arr) {
    var people = nlp.pos(arr[0], {}).people().map(function (o) {
      return o.text
    })
    test.deepEqual(people, arr[1], arr[0])
  })
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "phrasal verbs"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.deepEqual(nlp.pos("look after a kid").tags(), [
    ["VBP", "DT", "NN"]
  ])
  //he comes to
  //he comes to the game

  //shooting off the gun
  //shooting off the boards

  //singing in the new year
  //singing in the choir

  //looks after the kid
  //looks after the game

  //he blew up the bomb
  //he blew up the balloon

  // test.deepEqual(pos("The bomb blew up").tags(), [["DT","NN", "VBP"]]) //issue
  test.deepEqual(nlp.pos("The pen blew up").tags(), [
    ["DT", "NN", "VBD"]
  ])
  // test.deepEqual(pos("The clown blew up the balloon").tags(), [["DT","NN","VBP","DT","NN"]])
  test.deepEqual(nlp.pos("he turns on the tv").tags(), [
    ["PRP", "VBZ", "DT", "NN"]
  ])
  test.deepEqual(nlp.pos("they take off the spandex").tags(), [
    ["PRP", "VBP", "DT", "NN"]
  ])
  test.deepEqual(nlp.pos("he would look after it").tags(), [
    ["PRP", "MD", "VBP", "PRP"]
  ])
  test.deepEqual(nlp.pos("he looks after it").tags(), [
    ["PRP", "VBZ", "PRP"]
  ])
  test.deepEqual(nlp.pos("he looked after it").tags(), [
    ["PRP", "VBD", "PRP"]
  ])
  test.deepEqual(nlp.pos("john puts down the book").tags(), [
    ["NNP", "VBZ", "DT", "NN"]
  ])

  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "word tokenization"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.tokenize("i live in new york")[0].tokens.length, 4)
  test.strictEqual(nlp.tokenize("I speak optimistically of course.")[0].tokens.length, 4)
  test.strictEqual(nlp.tokenize("Joe is 9")[0].tokens.length, 3)
  test.strictEqual(nlp.tokenize("Joe in Toronto")[0].tokens.length, 3)
  test.strictEqual(nlp.tokenize("I am mega-rich")[0].tokens.length, 3)
  test.strictEqual(nlp.tokenize("he is Dr. Jones")[0].tokens.length, 4)
  test.strictEqual(nlp.tokenize("That’s a ‘magic’ sock.")[0].tokens[2].normalised, "'magic'")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "is_person"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  //honourifics
  test.strictEqual(nlp.noun("wolf").is_person(), false)
  test.strictEqual(nlp.noun("tiger wolf sr.").is_person(), true)
  test.strictEqual(nlp.noun("tiger wolf sr").is_person(), true)
  test.strictEqual(nlp.noun("tiger wolfsr").is_person(), false)
  test.strictEqual(nlp.noun("wolfsr").is_person(), false)
  test.strictEqual(nlp.noun("dr quack").is_person(), true)
  test.strictEqual(nlp.noun("dr. quack").is_person(), true)
  test.strictEqual(nlp.noun("dr. quack jr.").is_person(), true)
  //first names
  test.strictEqual(nlp.noun("James Quaker").is_person(), true)
  test.strictEqual(nlp.noun("lkjsdf James").is_person(), false)
  test.strictEqual(nlp.noun("tony danza").is_person(), true)
  test.strictEqual(nlp.noun("tony danza jr.").is_person(), true)
  test.strictEqual(nlp.noun("tony").is_person(), true)
  test.strictEqual(nlp.noun("danza").is_person(), false)
  //middle initial
  test.strictEqual(nlp.noun("tony h. danza").is_person(), true, 'initial')
  test.strictEqual(nlp.noun("Tongapan H. Danza").is_person(), true, 'initial2')
  test.strictEqual(nlp.noun("tongapan h. danza").is_person(), true, 'initial3')
  //eponyms
  test.strictEqual(nlp.noun("tony h. danza memorial center").is_person(), false, 'eponym1')
  test.strictEqual(nlp.noun("tony college").is_person(), false, 'eponym2')
  test.strictEqual(nlp.noun("ss tony danza").is_person(), false, 'eponym3')
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "noun.article"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.noun("wolf").article(), "a")
  test.strictEqual(nlp.noun("eulogy").article(), "a")
  test.strictEqual(nlp.noun("eater").article(), "an")
  test.strictEqual(nlp.noun("african").article(), "an")
  test.strictEqual(nlp.noun("hour").article(), "an")
  test.strictEqual(nlp.noun("awful").article(), "an")
  test.strictEqual(nlp.noun("utter").article(), "an")
  test.strictEqual(nlp.noun('S.S.L.').article(), "an")
  test.strictEqual(nlp.noun('FBI').article(), "an")
  test.strictEqual(nlp.noun('GHQ').article(), "a")
  test.strictEqual(nlp.noun('book').article(), "a")
  test.strictEqual(nlp.noun('books').article(), "the")
  test.strictEqual(nlp.noun('Canadiens').article(), "the")
  test.strictEqual(nlp.noun('soviet missionaries').article(), "the")
  test.strictEqual(nlp.noun('bond girls').article(), "the")
  test.strictEqual(nlp.noun('mason jars').article(), "the")
  test.strictEqual(nlp.noun('problems').article(), "the")
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "conjugate future"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var convert = function (s) {
    s = nlp.pos(s).to_future().text()
    return s
  }
  test.strictEqual(convert("he went to the store"), "he will go to the store")
  test.strictEqual(convert("she walked backwards"), "she will walk backwards")
  // test.strictEqual(convert("everyone said he was cool"), "everyone will say he is cool") //hard
  test.strictEqual(convert("he crawls to the back door"), "he will crawl to the back door")
  test.strictEqual(convert("i am slouching forward"), "i will be slouching forward")
  test.strictEqual(convert("i will slouch forward"), "i will slouch forward") //future-future //FIX
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "conjugate present"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var convert = function (s) {
    s = nlp.pos(s).to_present().text()
    return s
  }
  test.strictEqual(convert("he went to the store"), "he goes to the store")
  test.strictEqual(convert("she walked backwards"), "she walks backwards")
  // test.strictEqual(convert("everyone said he was cool"), "everyone says he was cool") //hard
  test.strictEqual(convert("he will crawl to the back door"), "he crawls to the back door")
  // test.strictEqual(convert("i am slouching forward"), "i slouch forward")  //interesting
  test.strictEqual(convert("he crawls to the back door"), "he crawls to the back door") //present-present
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "conjugate past"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var convert = function (s) {
    s = nlp.pos(s).to_past().text()
    return s
  }
  test.strictEqual(convert("he goes to the store"), "he went to the store")
  test.strictEqual(convert("she will walk backwards"), "she walked backwards")
  test.strictEqual(convert("everyone says he is cool"), "everyone said he was cool")
  test.strictEqual(convert("he will crawl to the back door"), "he crawled to the back door")
  test.strictEqual(convert("i am slouching forward"), "i was slouching forward")
  test.strictEqual(convert("he went to the store"), "he went to the store") //past-past
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "verb conjugate"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var tenses = [
    "present",
    "past",
    "infinitive",
    "gerund",
    "future",
  ]

  function isequal(o1, o2) {
    tenses.forEach(function (t) {
      test.strictEqual(o1[t], o2[t])
    })
  }
  verbs = [{
    "infinitive": "convolute",
    "present": "convolutes",
    "gerund": "convoluting",
    "past": "convoluted"
  }, {
    "present": "presents",
    "gerund": "presenting",
    "past": "presented",
    "infinitive": "present"
  }, {
    "present": "angulates",
    "gerund": "angulating",
    "past": "angulated",
    "infinitive": "angulate"
  }, {
    "present": "conjures",
    "gerund": "conjuring",
    "past": "conjured",
    "infinitive": "conjure"
  }, {
    "present": "denounces",
    "gerund": "denouncing",
    "past": "denounced",
    "infinitive": "denounce"
  }, {
    "present": "watches",
    "gerund": "watching",
    "past": "watched",
    "infinitive": "watch"
  }, {
    "present": "tingles",
    "gerund": "tingling",
    "past": "tingled",
    "infinitive": "tingle"
  }, {
    "present": "mortises",
    "gerund": "mortising",
    "past": "mortised",
    "infinitive": "mortise"
  }, {
    "present": "disguises",
    "gerund": "disguising",
    "past": "disguised",
    "infinitive": "disguise"
  }, {
    "infinitive": "effect",
    "gerund": "effecting",
    "past": "effected",
    "present": "effects"
  }, {
    "infinitive": "want",
    "gerund": "wanting",
    "past": "wanted",
    "present": "wants"
  }, {
    "infinitive": "power",
    "gerund": "powering",
    "past": "powered",
    "present": "powers"
  }, {
    "infinitive": "overcompensate",
    "present": "overcompensates",
    "past": "overcompensated",
    "gerund": "overcompensating"
  }, {
    "infinitive": "ice",
    "present": "ices",
    "past": "iced",
    "gerund": "icing"
  }, {
    "infinitive": "buy",
    "present": "buys",
    "past": "bought",
    "gerund": "buying"
  }, {
    "infinitive": "flower",
    "present": "flowers",
    "past": "flowered",
    "gerund": "flowering"
  }, {
    "infinitive": "rage",
    "present": "rages",
    "past": "raged",
    "gerund": "raging"
  }, {
    "infinitive": "drive",
    "present": "drives",
    "past": "drove",
    "gerund": "driving"
  }, {
    "infinitive": "foul",
    "present": "fouls",
    "past": "fouled",
    "gerund": "fouling"
  }, {
    "infinitive": "overthrow",
    "present": "overthrows",
    "gerund": "overthrowing",
    "past": "overthrew"
  }, {
    "infinitive": "aim",
    "present": "aims",
    "past": "aimed",
    "gerund": "aiming"
  }, {
    "present": "unifies",
    "gerund": "unifying",
    "past": "unified",
    "infinitive": "unify"
  }, {
    "present": "addresses",
    "gerund": "addressing",
    "past": "addressed",
    "infinitive": "address"
  }, {
    "infinitive": "bumble",
    "present": "bumbles",
    "past": "bumbled",
    "gerund": "bumbling"
  }, {
    "infinitive": "snipe",
    "present": "snipes",
    "past": "sniped",
    "gerund": "sniping"
  }, {
    "present": "relishes",
    "gerund": "relishing",
    "past": "relished",
    "infinitive": "relish"
  }, {
    "infinitive": "lengthen",
    "gerund": "lengthening",
    "past": "lengthened",
    "present": "lengthens"
  }, {
    "infinitive": "farm",
    "present": "farms",
    "past": "farmed",
    "gerund": "farming"
  }]
  //add future tense
  verbs = verbs.map(function (o) {
    o.future = "will " + o.infinitive
    return o
  })
  verbs.forEach(function (o) {
    tenses.forEach(function (type) {
      var o2 = nlp.verb(o[type]).conjugate()
      isequal(o, o2)
    })
  })
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "negation"
exports[t] = function (test) {
  if(TIME){console.time(t)}

  var negate = function (s) {
      s = nlp.pos(s).sentences[0].negate().text()
      return s
    }
    // hacks for logic-words
  test.strictEqual(negate("everyone will still be there"), "no one will still be there")
  test.strictEqual(negate("everybody listens to the cbc"), "nobody listens to the cbc")
  test.strictEqual(negate("somebody said it was great"), "nobody said it was great")
  test.strictEqual(negate("i always walk to work"), "i never walk to work")
  test.strictEqual(negate("always the quiet ones"), "never the quiet ones")
  test.strictEqual(negate("i always use the laptop"), "i never use the laptop")
  test.strictEqual(negate("he will always be a fool"), "he won't always be a fool")
  test.strictEqual(negate("he always will be a fool"), "he never will be a fool")
  test.strictEqual(negate("he will john"), "he won't john")
  test.strictEqual(negate("he won't john"), "he will john")
  test.strictEqual(negate("the groom will"), "the groom won't")
  // [infinitive verb] - walk -> don't walk
  test.strictEqual(negate("i say"), "i don't say")
  test.strictEqual(negate("i think everything will be ok"), "i don't think everything will be ok")
  // [future-tense verb] - will->wont
  test.strictEqual(negate("he will go to the store"), "he won't go to the store")
  test.strictEqual(negate("she will watch the movie"), "she won't watch the movie")
  //[present-tense verb] - add 'didn't', conjugate verb
  test.strictEqual(negate("she walks"), "she doesn't walk")
  test.strictEqual(negate("he goes to the store"), "he doesn't go to the store")
  test.strictEqual(negate("she watches the movie"), "she doesn't watch the movie")
  test.strictEqual(negate("she clutches the wheel"), "she doesn't clutch the wheel")
  test.strictEqual(negate("she sells seashells by the seashore"), "she doesn't sell seashells by the seashore")
  // test.strictEqual(negate("she still drives to work"), "she still doesn't drive to work")
  //[past-tense verb] - add didn't and conjugate verb
  test.strictEqual(negate("he went to the store"), "he didn't go to the store")
  test.strictEqual(negate("she watched the movie"), "she didn't watch the movie")
  //[gerund verb] - 'walking' -> 'not walking'
  test.strictEqual(negate("walking to toronto"), "not walking to toronto")
  // test.strictEqual(negate("smoking in the elevator"), "not smoking in the elevator")//phrasal verb problem
  // [copula] - not
  test.strictEqual(negate("he is an animal"), "he isn't an animal")
  test.strictEqual(negate("tom was a goofball"), "tom wasn't a goofball")
  test.strictEqual(negate("he will be a lion"), "he won't be a lion")
  // [md] - special counterpart or not
  test.strictEqual(negate("he should go to the store"), "he shouldn't go to the store")
  // test.strictEqual(negate("he may go to the store"), "he may not go to the store")
  // already negative
  test.strictEqual(negate("he didn't go to the store"), "he did go to the store")
  test.strictEqual(negate("she didn't watch the movie"), "she did watch the movie")
  test.strictEqual(negate("he will not be a lion"), "he will be a lion")
  // other stuff
  test.strictEqual(negate("he will be the best"), "he won't be the best")
  test.strictEqual(negate("he is the best"), "he isn't the best")
  test.strictEqual(negate("he is walking to toronto"), "he isn't walking to toronto")
  // coumpound sentences
  test.strictEqual(negate("he will be a lion and will be on stage"), "he won't be a lion and will be on stage")
  test.strictEqual(negate("he was a lion and will be on stage"), "he wasn't a lion and will be on stage")
  test.strictEqual(negate("the walk was good and swimming was nice"), "the walk wasn't good and swimming was nice")
  //hard ones
  // test.strictEqual(negate("he will really not be a king"), "he will totally be a king") //this is interesting..
  // test.strictEqual(negate("he will not really be a king"), "he will totally be a king") //this is interesting..
  // test.strictEqual(negate("smoking in the elevator is allowed"), "smoking in the elevator is not allowed") // this is interesting..
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "to_comparative"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.adjective("quick").conjugate().comparative, "quicker")
  test.strictEqual(nlp.adjective("friendly").conjugate().comparative, "friendlier")
  test.strictEqual(nlp.adjective("stinky").conjugate().comparative, "stinkier")
  test.strictEqual(nlp.adjective("clever").conjugate().comparative, "more clever")
  test.strictEqual(nlp.adjective("caring").conjugate().comparative, "more caring")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "to_superlative"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.adjective("quick").conjugate().superlative, "quickest")
  test.strictEqual(nlp.adjective("friendly").conjugate().superlative, "friendliest")
  test.strictEqual(nlp.adjective("caring").conjugate().superlative, "most caring")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "to_adverb"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.adjective('obligatory').conjugate().adverb, 'obligatorily')
  test.strictEqual(nlp.adjective('extensive').conjugate().adverb, 'extensively')
  test.strictEqual(nlp.adjective('large').conjugate().adverb, 'largely')
  test.strictEqual(nlp.adjective('naive').conjugate().adverb, 'naively')
  test.strictEqual(nlp.adjective('unimaginable').conjugate().adverb, 'unimaginably')
  test.strictEqual(nlp.adjective('unthinkable').conjugate().adverb, 'unthinkably')
  test.strictEqual(nlp.adjective('amiable').conjugate().adverb, 'amiably')
  test.strictEqual(nlp.adjective('affable').conjugate().adverb, 'affably')
  test.strictEqual(nlp.adjective('livid').conjugate().adverb, 'lividly')
  test.strictEqual(nlp.adjective('tentative').conjugate().adverb, 'tentatively')
  test.strictEqual(nlp.adjective('wide').conjugate().adverb, 'widely')
  test.strictEqual(nlp.adjective('impracticable').conjugate().adverb, 'impracticably')
  test.strictEqual(nlp.adjective('gruesome').conjugate().adverb, 'gruesomely')
  test.strictEqual(nlp.adjective('jejune').conjugate().adverb, 'jejunely')
  test.strictEqual(nlp.adjective('immature').conjugate().adverb, 'immaturely')
  test.strictEqual(nlp.adjective('retentive').conjugate().adverb, 'retentively')
  test.strictEqual(nlp.adjective('desperate').conjugate().adverb, 'desperately')
  test.strictEqual(nlp.adjective('recognizable').conjugate().adverb, 'recognizably')
  test.strictEqual(nlp.adjective('close').conjugate().adverb, 'closely')
  test.strictEqual(nlp.adjective('unprofitable').conjugate().adverb, 'unprofitably')
  test.strictEqual(nlp.adjective('vapid').conjugate().adverb, 'vapidly')
  test.strictEqual(nlp.adjective('obscure').conjugate().adverb, 'obscurely')
  test.strictEqual(nlp.adjective('bad').conjugate().adverb, 'badly')
  test.strictEqual(nlp.adjective('indeterminable').conjugate().adverb, 'indeterminably')
  test.strictEqual(nlp.adjective('horrible').conjugate().adverb, 'horribly')
  test.strictEqual(nlp.adjective('shamefaced').conjugate().adverb, 'shamefacedly')
  test.strictEqual(nlp.adjective('suave').conjugate().adverb, 'suavely')
  test.strictEqual(nlp.adjective('ornate').conjugate().adverb, 'ornately')
  test.strictEqual(nlp.adjective('inattentive').conjugate().adverb, 'inattentively')
  test.strictEqual(nlp.adjective('abstracted').conjugate().adverb, 'abstractedly')
  test.strictEqual(nlp.adjective('absentminded').conjugate().adverb, 'absentmindedly')
  test.strictEqual(nlp.adjective('competitive').conjugate().adverb, 'competitively')
  test.strictEqual(nlp.adjective('secure').conjugate().adverb, 'securely')
  test.strictEqual(nlp.adjective('profitable').conjugate().adverb, 'profitably')
  test.strictEqual(nlp.adjective('productive').conjugate().adverb, 'productively')
  test.strictEqual(nlp.adjective('irritable').conjugate().adverb, 'irritably')
  test.strictEqual(nlp.adjective('unfashionable').conjugate().adverb, 'unfashionably')
  test.strictEqual(nlp.adjective('dense').conjugate().adverb, 'densely')
  test.strictEqual(nlp.adjective('visible').conjugate().adverb, 'visibly')
  test.strictEqual(nlp.adjective('noticeable').conjugate().adverb, 'noticeably')
  test.strictEqual(nlp.adjective('observable').conjugate().adverb, 'observably')
  test.strictEqual(nlp.adjective('perceptible').conjugate().adverb, 'perceptibly')
  test.strictEqual(nlp.adjective('inexpressive').conjugate().adverb, 'inexpressively')
  test.strictEqual(nlp.adjective('unproductive').conjugate().adverb, 'unproductively')
  test.strictEqual(nlp.adjective('imaginative').conjugate().adverb, 'imaginatively')
  test.strictEqual(nlp.adjective('incisive').conjugate().adverb, 'incisively')
  test.strictEqual(nlp.adjective('precise').conjugate().adverb, 'precisely')
  test.strictEqual(nlp.adjective('reserved').conjugate().adverb, 'reservedly')
  test.strictEqual(nlp.adjective('effusive').conjugate().adverb, 'effusively')
  test.strictEqual(nlp.adjective('square').conjugate().adverb, 'squarely')
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "adverb.to_adjective"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.adverb('garishly').conjugate().adjective, 'garish')
  test.strictEqual(nlp.adverb('tediously').conjugate().adjective, 'tedious')
  test.strictEqual(nlp.adverb('frightfully').conjugate().adjective, 'frightful')
  test.strictEqual(nlp.adverb('tortuously').conjugate().adjective, 'tortuous')
  test.strictEqual(nlp.adverb('privately').conjugate().adjective, 'private')
  test.strictEqual(nlp.adverb('unambiguously').conjugate().adjective, 'unambiguous')
  test.strictEqual(nlp.adverb('cortically').conjugate().adjective, 'cortic')
  test.strictEqual(nlp.adverb('biradially').conjugate().adjective, 'biradial')
  test.strictEqual(nlp.adverb('meanly').conjugate().adjective, 'mean')
  test.strictEqual(nlp.adverb('raspingly').conjugate().adjective, 'rasping')
  test.strictEqual(nlp.adverb('comprehensively').conjugate().adjective, 'comprehensive')
  test.strictEqual(nlp.adverb('fervently').conjugate().adjective, 'fervent')
  test.strictEqual(nlp.adverb('nationally').conjugate().adjective, 'national')
  test.strictEqual(nlp.adverb('maternally').conjugate().adjective, 'maternal')
  test.strictEqual(nlp.adverb('flashily').conjugate().adjective, 'flashy')
  test.strictEqual(nlp.adverb('only').conjugate().adjective, 'only')
  test.strictEqual(nlp.adverb('narrowly').conjugate().adjective, 'narrow')
  test.strictEqual(nlp.adverb('blasphemously').conjugate().adjective, 'blasphemous')
  test.strictEqual(nlp.adverb('abortively').conjugate().adjective, 'abortive')
  test.strictEqual(nlp.adverb('inoffensively').conjugate().adjective, 'inoffensive')
  test.strictEqual(nlp.adverb('truly').conjugate().adjective, 'true')
  test.strictEqual(nlp.adverb('gently').conjugate().adjective, 'gent')
  test.strictEqual(nlp.adverb('tolerantly').conjugate().adjective, 'tolerant')
  test.strictEqual(nlp.adverb('enchantingly').conjugate().adjective, 'enchanting')
  test.strictEqual(nlp.adverb('unswervingly').conjugate().adjective, 'unswerving')
  test.strictEqual(nlp.adverb('grubbily').conjugate().adjective, 'grubby')
  test.strictEqual(nlp.adverb('longitudinally').conjugate().adjective, 'longitudinal')
  test.strictEqual(nlp.adverb('thermodynamically').conjugate().adjective, 'thermodynamic')
  test.strictEqual(nlp.adverb('mirthfully').conjugate().adjective, 'mirthful')
  test.strictEqual(nlp.adverb('salaciously').conjugate().adjective, 'salacious')
  test.strictEqual(nlp.adverb('dourly').conjugate().adjective, 'dour')
  test.strictEqual(nlp.adverb('credulously').conjugate().adjective, 'credulous')
  test.strictEqual(nlp.adverb('carefully').conjugate().adjective, 'careful')
  test.strictEqual(nlp.adverb('knowingly').conjugate().adjective, 'knowing')
  test.strictEqual(nlp.adverb('geometrically').conjugate().adjective, 'geometrical')
  test.strictEqual(nlp.adverb('unassailably').conjugate().adjective, 'unassailable')
  test.strictEqual(nlp.adverb('antecedently').conjugate().adjective, 'antecedent')
  test.strictEqual(nlp.adverb('adjectively').conjugate().adjective, 'adjective')
  test.strictEqual(nlp.adverb('hebdomadally').conjugate().adjective, 'hebdomadal')
  test.strictEqual(nlp.adverb('dizzily').conjugate().adjective, 'dizzy')
  test.strictEqual(nlp.adverb('obnoxiously').conjugate().adjective, 'obnoxious')
  test.strictEqual(nlp.adverb('thirstily').conjugate().adjective, 'thirsty')
  test.strictEqual(nlp.adverb('biennially').conjugate().adjective, 'biennial')
  test.strictEqual(nlp.adverb('roguishly').conjugate().adjective, 'roguish')
  test.strictEqual(nlp.adverb('mentally').conjugate().adjective, 'mental')
  test.strictEqual(nlp.adverb('incessantly').conjugate().adjective, 'incessant')
  test.strictEqual(nlp.adverb('intelligently').conjugate().adjective, 'intelligent')
  test.strictEqual(nlp.adverb('perseveringly').conjugate().adjective, 'persevering')
  test.strictEqual(nlp.adverb('namely').conjugate().adjective, 'name')
  test.strictEqual(nlp.adverb('formidably').conjugate().adjective, 'formidable')
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "sentences"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.sentences('Tony is nice. He lives in Japan.').length, 2)
  test.strictEqual(nlp.sentences('I like that Color').length, 1)
  test.strictEqual(nlp.sentences("Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th. Bye").length, 3)
  test.strictEqual(nlp.sentences("Soviet bonds to be sold in the U.S. market. Everyone wins.").length, 2)
  test.strictEqual(nlp.sentences("Hi there! Everyone wins!").length, 2)
  test.strictEqual(nlp.sentences("Hi there!!! Everyone wins.").length, 2)
  test.strictEqual(nlp.sentences("he bought Yahoo! the company.").length, 1)
  test.strictEqual(nlp.sentences("he is ill").length, 1)
  test.strictEqual(nlp.sentences("he is ill.").length, 1)
  test.strictEqual(nlp.sentences("she is dead. he is ill.").length, 2)
  test.strictEqual(nlp.sentences("she is dead. he is ill").length, 2)
  test.strictEqual(nlp.sentences("lkajsdflkjeicclksdfjefifh").length, 1)
  test.strictEqual(nlp.sentences("i think it is good ie. fantastic.").length, 1)
  test.strictEqual(nlp.sentences("i think it is good i.e. fantastic.").length, 1)
  test.strictEqual(nlp.sentences("i think it is good ... or else.").length, 1)
  test.strictEqual(nlp.sentences("i think it is good ... ").length, 1)
  test.strictEqual(nlp.sentences("What's my age again? What's my age again?").length, 2)
  test.strictEqual(nlp.sentences("the problem, eg. the javascript").length, 1)
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "is_plural"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.noun('octopus').is_plural(), false)
  test.strictEqual(nlp.noun('tree').is_plural(), false)
  test.strictEqual(nlp.noun('trees').is_plural(), true)
  test.strictEqual(nlp.noun('i').is_plural(), false)
  test.strictEqual(nlp.noun('we').is_plural(), true)
  test.strictEqual(nlp.noun('mayor of chicago').is_plural(), false)
  test.strictEqual(nlp.noun('mayors of chicago').is_plural(), true)
  test.strictEqual(nlp.noun('octopus').is_plural(), false)
  test.strictEqual(nlp.noun('octopi').is_plural(), true)
  test.strictEqual(nlp.noun('eyebrow').is_plural(), false)
  test.strictEqual(nlp.noun('eyebrows').is_plural(), true)
  test.strictEqual(nlp.noun('child').is_plural(), false)
  test.strictEqual(nlp.noun('children').is_plural(), true)
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "pluralize"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.noun('snake').pluralize(), 'snakes')
  test.strictEqual(nlp.noun('ski').pluralize(), 'skis')
  test.strictEqual(nlp.noun('Barrymore').pluralize(), 'Barrymores')
  test.strictEqual(nlp.noun('witch').pluralize(), 'witches')
  test.strictEqual(nlp.noun('box').pluralize(), 'boxes')
  test.strictEqual(nlp.noun('gas').pluralize(), 'gases')
  test.strictEqual(nlp.noun('kiss').pluralize(), 'kisses')
  test.strictEqual(nlp.noun('index').pluralize(), 'indices')
  test.strictEqual(nlp.noun('appendix').pluralize(), 'appendices')
  test.strictEqual(nlp.noun('criterion').pluralize(), 'criteria')
  test.strictEqual(nlp.noun('berry').pluralize(), 'berries')
  test.strictEqual(nlp.noun('activity').pluralize(), 'activities')
  test.strictEqual(nlp.noun('daisy').pluralize(), 'daisies')
  test.strictEqual(nlp.noun('church').pluralize(), 'churches')
  test.strictEqual(nlp.noun('fox').pluralize(), 'foxes')
  test.strictEqual(nlp.noun('stomach').pluralize(), 'stomachs')
  test.strictEqual(nlp.noun('epoch').pluralize(), 'epochs')
  test.strictEqual(nlp.noun('knife').pluralize(), 'knives')
  test.strictEqual(nlp.noun('half').pluralize(), 'halves')
  test.strictEqual(nlp.noun('scarf').pluralize(), 'scarves')
  test.strictEqual(nlp.noun('chief').pluralize(), 'chiefs')
  test.strictEqual(nlp.noun('spoof').pluralize(), 'spoofs')
  test.strictEqual(nlp.noun('solo').pluralize(), 'solos')
  test.strictEqual(nlp.noun('zero').pluralize(), 'zeros')
  test.strictEqual(nlp.noun('avocado').pluralize(), 'avocados')
  test.strictEqual(nlp.noun('studio').pluralize(), 'studios')
  test.strictEqual(nlp.noun('zoo').pluralize(), 'zoos')
  test.strictEqual(nlp.noun('embryo').pluralize(), 'embryos')
  test.strictEqual(nlp.noun('hero').pluralize(), 'heroes')
  test.strictEqual(nlp.noun('banjo').pluralize(), 'banjos')
  test.strictEqual(nlp.noun('cargo').pluralize(), 'cargos')
  test.strictEqual(nlp.noun('flamingo').pluralize(), 'flamingos')
  test.strictEqual(nlp.noun('fresco').pluralize(), 'frescos')
  test.strictEqual(nlp.noun('ghetto').pluralize(), 'ghettos')
  test.strictEqual(nlp.noun('halo').pluralize(), 'halos')
  test.strictEqual(nlp.noun('mango').pluralize(), 'mangos')
  test.strictEqual(nlp.noun('memento').pluralize(), 'mementos')
  test.strictEqual(nlp.noun('motto').pluralize(), 'mottos')
  test.strictEqual(nlp.noun('tornado').pluralize(), 'tornados')
  test.strictEqual(nlp.noun('tuxedo').pluralize(), 'tuxedos')
  test.strictEqual(nlp.noun('volcano').pluralize(), 'volcanos')
  test.strictEqual(nlp.noun('bus').pluralize(), 'buses')
  test.strictEqual(nlp.noun('crisis').pluralize(), 'crises')
  test.strictEqual(nlp.noun('analysis').pluralize(), 'analyses')
  test.strictEqual(nlp.noun('neurosis').pluralize(), 'neuroses')
  test.strictEqual(nlp.noun('aircraft').pluralize(), 'aircraft')
  test.strictEqual(nlp.noun('halibut').pluralize(), 'halibut')
  test.strictEqual(nlp.noun('moose').pluralize(), 'moose')
  test.strictEqual(nlp.noun('salmon').pluralize(), 'salmon')
  test.strictEqual(nlp.noun('sheep').pluralize(), 'sheep')
  test.strictEqual(nlp.noun('spacecraft').pluralize(), 'spacecraft')
  test.strictEqual(nlp.noun('tuna').pluralize(), 'tuna')
  test.strictEqual(nlp.noun('trout').pluralize(), 'trout')
  test.strictEqual(nlp.noun('armadillo').pluralize(), 'armadillos')
  test.strictEqual(nlp.noun('auto').pluralize(), 'autos')
  test.strictEqual(nlp.noun('bravo').pluralize(), 'bravos')
  test.strictEqual(nlp.noun('bronco').pluralize(), 'broncos')
  test.strictEqual(nlp.noun('casino').pluralize(), 'casinos')
  test.strictEqual(nlp.noun('combo').pluralize(), 'combos')
  test.strictEqual(nlp.noun('gazebo').pluralize(), 'gazebos')

  //test that plural.pluralize()==plural
  test.strictEqual(nlp.noun('snakes').pluralize(), 'snakes')
  test.strictEqual(nlp.noun('skis').pluralize(), 'skis')
  test.strictEqual(nlp.noun('Barrymores').pluralize(), 'Barrymores')
  test.strictEqual(nlp.noun('witches').pluralize(), 'witches')
  test.strictEqual(nlp.noun('boxes').pluralize(), 'boxes')
  test.strictEqual(nlp.noun('gases').pluralize(), 'gases')
  test.strictEqual(nlp.noun('spoofs').pluralize(), 'spoofs')
  test.strictEqual(nlp.noun('solos').pluralize(), 'solos')
  test.strictEqual(nlp.noun('avocados').pluralize(), 'avocados')
  test.strictEqual(nlp.noun('studios').pluralize(), 'studios')
  test.strictEqual(nlp.noun('zoos').pluralize(), 'zoos')
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "singularize"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.noun('Joneses').singularize(), 'Jones')
  test.strictEqual(nlp.noun('children').singularize(), 'child')
  test.strictEqual(nlp.noun('women').singularize(), 'woman')
  test.strictEqual(nlp.noun('men').singularize(), 'man')
  test.strictEqual(nlp.noun('people').singularize(), 'person')
  test.strictEqual(nlp.noun('geese').singularize(), 'goose')
  test.strictEqual(nlp.noun('mice').singularize(), 'mouse')
  test.strictEqual(nlp.noun('barracks').singularize(), 'barracks')
  test.strictEqual(nlp.noun('deer').singularize(), 'deer')
  test.strictEqual(nlp.noun('nuclei').singularize(), 'nucleus')
  test.strictEqual(nlp.noun('syllabi').singularize(), 'syllabus')
  test.strictEqual(nlp.noun('fungi').singularize(), 'fungus')
  test.strictEqual(nlp.noun('cacti').singularize(), 'cactus')
  test.strictEqual(nlp.noun('theses').singularize(), 'thesis')
  test.strictEqual(nlp.noun('crises').singularize(), 'crisis')
  test.strictEqual(nlp.noun('phenomena').singularize(), 'phenomenon')
  test.strictEqual(nlp.noun('embryos').singularize(), 'embryo')
  test.strictEqual(nlp.noun('frescos').singularize(), 'fresco')
  test.strictEqual(nlp.noun('ghettos').singularize(), 'ghetto')
  test.strictEqual(nlp.noun('halos').singularize(), 'halo')
  test.strictEqual(nlp.noun('mangos').singularize(), 'mango')
  test.strictEqual(nlp.noun('mementos').singularize(), 'memento')
  test.strictEqual(nlp.noun('mottos').singularize(), 'motto')
  test.strictEqual(nlp.noun('tornados').singularize(), 'tornado')
  test.strictEqual(nlp.noun('tuxedos').singularize(), 'tuxedo')
  test.strictEqual(nlp.noun('volcanos').singularize(), 'volcano')
  test.strictEqual(nlp.noun('crises').singularize(), 'crisis')
  test.strictEqual(nlp.noun('analyses').singularize(), 'analysis')
  test.strictEqual(nlp.noun('aircraft').singularize(), 'aircraft')
  test.strictEqual(nlp.noun('bass').singularize(), 'bass')
  test.strictEqual(nlp.noun('bison').singularize(), 'bison')
  test.strictEqual(nlp.noun('fish').singularize(), 'fish')
  test.strictEqual(nlp.noun('fowl').singularize(), 'fowl')
  test.strictEqual(nlp.noun('kilos').singularize(), 'kilo')
  test.strictEqual(nlp.noun('kimonos').singularize(), 'kimono')
  test.strictEqual(nlp.noun('logos').singularize(), 'logo')
  test.strictEqual(nlp.noun('memos').singularize(), 'memo')
  test.strictEqual(nlp.noun('ponchos').singularize(), 'poncho')
  test.strictEqual(nlp.noun('photos').singularize(), 'photo')
  test.strictEqual(nlp.noun('pimentos').singularize(), 'pimento')
  test.strictEqual(nlp.noun('pros').singularize(), 'pro')
  test.strictEqual(nlp.noun('sombreros').singularize(), 'sombrero')
  test.strictEqual(nlp.noun('tacos').singularize(), 'taco')
  test.strictEqual(nlp.noun('memos').singularize(), 'memo')
  test.strictEqual(nlp.noun('torsos').singularize(), 'torso')
  test.strictEqual(nlp.noun('xylophones').singularize(), 'xylophone')
  test.strictEqual(nlp.noun('quintuplets').singularize(), 'quintuplet')
  test.strictEqual(nlp.noun('worrywarts').singularize(), 'worrywart')
  test.strictEqual(nlp.noun('nerds').singularize(), 'nerd')
  test.strictEqual(nlp.noun('lollipops').singularize(), 'lollipop')
  test.strictEqual(nlp.noun('eyebrows').singularize(), 'eyebrow')

  //test that sungular.singularize()==singular
  test.strictEqual(nlp.noun('mango').singularize(), 'mango')
  test.strictEqual(nlp.noun('memento').singularize(), 'memento')
  test.strictEqual(nlp.noun('motto').singularize(), 'motto')
  test.strictEqual(nlp.noun('tornado').singularize(), 'tornado')
  test.strictEqual(nlp.noun('person').singularize(), 'person')
  test.strictEqual(nlp.noun('goose').singularize(), 'goose')
  test.strictEqual(nlp.noun('mouse').singularize(), 'mouse')
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "ngram"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  s = nlp.ngram("i really think that we all really think it's all good")
  test.strictEqual(s[1][0].word, 'really think')
  test.strictEqual(s[1][0].count, 2)
  test.strictEqual(s[0][0].word, 'really')
  s = nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.")
  test.strictEqual(s[0][0].word, 'she')
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "adj_to_noun"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.adjective("ferocious").conjugate().noun, "ferociousness")
  test.strictEqual(nlp.adjective("fancy").conjugate().noun, "fanciness")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "dates"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var dates = [
    ["I got divorced on June 4th 1993, in Miami", {
      "month": 5,
      "day": 4,
      "year": 1993
    }],
    ["March 7th-11th 1987", {
      "month": 2,
      "day": 7,
      "year": 1987
    }],
    ["June 1st-11th 1999", {
      "month": 5,
      "day": 1,
      "year": 1999
    }],
    ["28th of September to 5th of October 2008", {
      "month": 8,
      "day": 28,
      "year": 2008
    }],
    ["2nd of January to 5th of October 2008", {
      "month": 9,
      "day": 5,
      "year": 2008
    }],
    ["March 7th to june 11th 1987", {
      "month": 2,
      "day": 7,
      "year": 1987
    }],
    ["April 17th to september 11th 1981", {
      "month": 3,
      "day": 17,
      "year": 1981
    }],
    ["June 1st to June 11th 2014", {
      "month": 5,
      "day": 1,
      "year": 2014
    }],
    ["between 13 February and 15 February 1945", {
      "month": 1,
      "day": 13,
      "year": 1945
    }],
    ["between March 7th and june 11th 1987", {
      "month": 2,
      "day": 7,
      "year": 1987
    }],
    ["March 1st 1987", {
      "month": 2,
      "day": 1,
      "year": 1987
    }],
    ["June 22nd 2014", {
      "month": 5,
      "day": 22,
      "year": undefined
    }],
    ["June 22nd 1997", {
      "month": 5,
      "day": 22,
      "year": undefined
    }],
    ["3rd - 5th of March 1969", {
      "month": 2,
      "day": 3,
      "year": 1969
    }],
    ["3rd of March 1969", {
      "month": 2,
      "day": 3,
      "year": 1969
    }],
    ["2nd of April 1929", {
      "month": 3,
      "day": undefined,
      "year": 1929
    }],
    // ["September 1939 to April 1945",  {"month":undefined,"day":undefined,"year":1939}],
    // ["June 1969 to April 1975",  {"month":undefined,"day":undefined,"year":1969}],
    ["March 1969", {
      "month": 2,
      "day": undefined,
      "year": 1969
    }],
    ["March 18th", {
      "month": 2,
      "day": 18,
      "year": undefined
    }],
    ["August 28th", {
      "month": 7,
      "day": 28,
      "year": undefined
    }],
    ["18th of March", {
      "month": 2,
      "day": 18,
      "year": undefined
    }],
    ["27th of March", {
      "month": 2,
      "day": 27,
      "year": undefined
    }],
    ["2012-2014", {
      "month": undefined,
      "day": undefined,
      "year": 2012
    }],
    ["1997-1998", {
      "month": undefined,
      "day": undefined,
      "year": 1997
    }],
    ["1998", {
      "month": undefined,
      "day": undefined,
      "year": 1998
    }],
    ["1672", {
      "month": undefined,
      "day": undefined,
      "year": 1672
    }],
    ["2015", {
      "month": undefined,
      "day": undefined,
      "year": 2015
    }],
    ["january 5th 1998", {
      "month": 0,
      "day": 5,
      "year": 1998
    }],

    //edge cases
    // ["2014-1998",  {"month":undefined,"day":undefined,"year":undefined}],
    ["february 10th", {
      "month": 1,
      "day": 10,
      "year": undefined
    }],
    ["february 30th", {
      "month": 1,
      "day": undefined,
      "year": undefined
    }],
    // ["2103",  {"month":undefined,"day":undefined,"year":undefined}],
    // ["1111",  {"month":undefined,"day":undefined,"year":undefined}],
    ["jan 1921", {
      "month": 0,
      "day": undefined,
      "year": 1921
    }],
    // ["",  {"month":undefined,"day":undefined,"year":undefined}],
  ]
  dates.forEach(function (arr, i) {
    var o = nlp.value(arr[0]).date();
    delete o.date_object
    delete o.to
    test.deepEqual(o, arr[1], arr[0])
  })
  if(TIME){console.timeEnd(t)}
  test.done()
}

t = "americanize"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.americanize("synthesise"), "synthesize")
  test.strictEqual(nlp.americanize("synthesised"), "synthesized")
  test.strictEqual(nlp.americanize("synthesises"), "synthesizes")
  test.strictEqual(nlp.americanize("synthesising"), "synthesizing")
  test.strictEqual(nlp.americanize("analyse"), "analyze")
  test.strictEqual(nlp.americanize("analysed"), "analyzed")
  test.strictEqual(nlp.americanize("analysing"), "analyzing")
  test.strictEqual(nlp.americanize("poise"), "poise")
  test.strictEqual(nlp.americanize("poised"), "poised")
  test.strictEqual(nlp.americanize("colour"), "color")
  test.strictEqual(nlp.americanize("honour"), "honor")
  test.strictEqual(nlp.americanize("neighbour"), "neighbor")
  test.strictEqual(nlp.americanize("neighbourly"), "neighborly")
  test.strictEqual(nlp.americanize("savour"), "savor")
  test.strictEqual(nlp.americanize("savourly"), "savorly")
  test.strictEqual(nlp.americanize("favour"), "favor")
  test.strictEqual(nlp.americanize("favourite"), "favorite")
  test.strictEqual(nlp.americanize("theatre"), "theater")
  test.strictEqual(nlp.americanize("theatres"), "theaters")
  test.strictEqual(nlp.americanize("entendre"), "entendre")
  test.strictEqual(nlp.americanize("genre"), "genre")
  test.strictEqual(nlp.americanize("mediocre"), "mediocre")
  test.strictEqual(nlp.americanize("acre"), "acre")
  test.strictEqual(nlp.americanize("acres"), "acres")
  test.strictEqual(nlp.americanize("analogue"), "analog")
  test.strictEqual(nlp.americanize("homologue"), "homolog")
  test.strictEqual(nlp.americanize("anaemia"), "anemia")
  test.strictEqual(nlp.americanize("oestrogen"), "estrogen")
  test.strictEqual(nlp.americanize("ageing"), "aging")
  test.strictEqual(nlp.americanize("useable"), "usable")
  test.strictEqual(nlp.americanize("programme"), "programme")
  test.strictEqual(nlp.americanize("tonne"), "tonne")
  test.strictEqual(nlp.americanize("counsellor"), "counselor")
  test.strictEqual(nlp.americanize("traveller"), "traveler")
  test.strictEqual(nlp.americanize("labelled"), "labeled")
  test.strictEqual(nlp.americanize("cancelled"), "canceled")
  test.strictEqual(nlp.americanize("quarrelled"), "quarreled")
  test.strictEqual(nlp.americanize("signalling"), "signaling")
  test.strictEqual(nlp.americanize("modelling"), "modeling")
  test.strictEqual(nlp.americanize("travelling"), "traveling")
  test.strictEqual(nlp.americanize("willful"), "willful")
  test.strictEqual(nlp.americanize("filling"), "filling")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "britishize"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.britishize("synthesized"), "synthesised")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "syllables"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.syllables("suddenly").length, 3)
  test.strictEqual(nlp.syllables("constipation").length, 4)
  test.strictEqual(nlp.syllables("diabolic").length, 4)
  test.strictEqual(nlp.syllables("fate").length, 1)
  test.strictEqual(nlp.syllables("fated").length, 2)
  test.strictEqual(nlp.syllables("fates").length, 1)
  test.strictEqual(nlp.syllables("genetic").length, 3)
  test.strictEqual(nlp.syllables("deviled").length, 3)
  test.strictEqual(nlp.syllables("imitated").length, 4)
  test.strictEqual(nlp.syllables("horse").length, 1)
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "unicode"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var obj = {
    percentage: 100
  }
  test.strictEqual(nlp.normalize("The ɋӈїck brown fox juӎÞs over tӊe laζy dog", obj), "The quick brown fox jumps over the lazy dog")
  test.strictEqual(nlp.normalize("Björk", obj), "Bjork")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "value"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.value("twenty two thousand five hundred").number(), 22500)
  test.strictEqual(nlp.value("two thousand five hundred and sixty").number(), 2560)
  test.strictEqual(nlp.value("a hundred and two").number(), 102)
  test.strictEqual(nlp.value("a hundred").number(), 100)
  test.strictEqual(nlp.value("seven").number(), 7)
  test.strictEqual(nlp.value("seven grand").number(), 7000)
  test.strictEqual(nlp.value("half a million").number(), 500000)
  test.strictEqual(nlp.value("half-million").number(), 500000)
  test.strictEqual(nlp.value("quarter-million").number(), 250000)
  test.strictEqual(nlp.value("a quarter million").number(), 250000)
  test.strictEqual(nlp.value("a quarter-grand").number(), 250)
  test.strictEqual(nlp.value("104").number(), 104)
  test.strictEqual(nlp.value("13 thousand").number(), 13000)
  test.strictEqual(nlp.value("17,983").number(), 17983)
  test.strictEqual(nlp.value("nine hundred").number(), 900)
  test.strictEqual(nlp.value("twenty one hundred").number(), 2100)
  test.strictEqual(nlp.value("twenty one").number(), 21)
  test.strictEqual(nlp.value("seventy two").number(), 72)
  test.strictEqual(nlp.value("two hundred two").number(), 202)
  test.strictEqual(nlp.value("one thousand one").number(), 1001)
  test.strictEqual(nlp.value("minus five hundred").number(), -500)
  test.strictEqual(nlp.value("minus fifteen").number(), -15)
  test.strictEqual(nlp.value("five hundred million").number(), 500000000)
  test.strictEqual(nlp.value("$12.03").number(), 12.03)
  test.strictEqual(nlp.value("$12").number(), 12)
  test.strictEqual(nlp.value("5 hundred").number(), 500)
  test.strictEqual(nlp.value("5.2 thousand").number(), 5200)
  test.strictEqual(nlp.value("million").number(), 1000000)
  test.strictEqual(nlp.value("hundred one").number(), 101)
  test.strictEqual(nlp.value("12:32").number(), null)
  test.strictEqual(nlp.value("123-1231").number(), null)
  test.strictEqual(nlp.value("seven eleven").number(), null)
  test.strictEqual(nlp.value("ten-four").number(), null)
  test.strictEqual(nlp.value("one seven").number(), null)
  test.strictEqual(nlp.value("one ten").number(), null)
  test.strictEqual(nlp.value("one twelve").number(), null)
  test.strictEqual(nlp.value("one thirty").number(), null)
  test.strictEqual(nlp.value("nine fifty").number(), null)
  test.strictEqual(nlp.value("five six").number(), null)
  test.strictEqual(nlp.value("nine seventy").number(), null)
  test.strictEqual(nlp.value("nine two hundred").number(), null)
  test.strictEqual(nlp.value("ten one").number(), null)
  test.strictEqual(nlp.value("twelve one").number(), null)
  test.strictEqual(nlp.value("seventy five two").number(), null)
  test.strictEqual(nlp.value("two hundred three hundred").number(), null)
  test.strictEqual(nlp.value("sixty fifteen hundred").number(), null)
  test.strictEqual(nlp.value("one twenty").number(), null)
  test.strictEqual(nlp.value("twenty five twenty").number(), null)
  test.strictEqual(nlp.value("").number(), null)
  test.strictEqual(nlp.value("minus fifty").number(), -50)
  test.strictEqual(nlp.value("twenty thousand").number(), 20000)
  test.strictEqual(nlp.value("four point six").number(), 4.6)
  test.strictEqual(nlp.value("nine hundred point five").number(), 900.5)
  test.strictEqual(nlp.value("sixteen hundred sixteen point eight").number(), 1616.8)
  test.strictEqual(nlp.value("four point seven nine").number(), 4.79)
  test.strictEqual(nlp.value("four point sixteen").number(), 4.16)
  test.strictEqual(nlp.value("twenty first").number(), 21)
  test.strictEqual(nlp.value("fifty ninth").number(), 59)
  test.strictEqual(nlp.value("nine hundred fiftieth").number(), 950)
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "noun.article"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  test.strictEqual(nlp.noun("wolf").article(), "a")
  test.strictEqual(nlp.noun("eulogy").article(), "a")
  test.strictEqual(nlp.noun("eater").article(), "an")
  test.strictEqual(nlp.noun("african").article(), "an")
  test.strictEqual(nlp.noun("houri").article(), "a")
  test.strictEqual(nlp.noun("awful").article(), "an")
  test.strictEqual(nlp.noun("utter").article(), "an")
  test.strictEqual(nlp.noun('S.S.L.').article(), "an")
  test.strictEqual(nlp.noun('FBI').article(), "an")
  test.strictEqual(nlp.noun('GHQ').article(), "a")
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "pos"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var arr=[
    ////coerce a noun
    ["Tony Hawk walked quickly to the store.", ["NNP", "VBD", "RB", "IN", "DT", "NN"]], ["swim", ["VBP"]], ["the swim", ["DT", "NN"]],
    // ["my swim was great", ["PP", "NN", "CP","JJ"]],
    ["the obviously good swim", ["DT", "RB", "JJ", "NN"]], ["spencer kelly", ["NNP"]], //looks like an adverb but aint
    //coerce a verb
    ["the big swing", ["DT", "JJ", "NN"]], ["would normally swing", ["MD", "RB", "VBP"]],
    //coerce an adjective
    ["is quietly lkajsfijf", ["CP", "RB", "JJ"]],
    // ["schlooking in toronto is scarey and lkasf", ["VBG", "IN", "NN", "CP", "JJ", "CC", "JJ"]]
    ["lkjasdf always walks so very nicely", ["NN", "RB", "VBZ", "RB"]], ["lkjasdf always walks every cafesefirehty", ["NN", "RB", "VBZ", "DT", "NN"]],
    //coerce a verb
    ["is scared", ["CP", "JJ"]],
    //coerce an adverb
    ["he is real", ["PRP", "CP", "JJ"]], ["he is real cool", ["PRP", "CP", "RB", "JJ"]], ["a pretty, good and nice swim", ["DT", "JJ", "JJ", "CC", "JJ", "NN"]], ["a pretty good and nice swim", ["DT", "RB", "JJ", "CC", "JJ", "NN"]],

    ["the chicago zoo is fun", ["DT", "NN", "CP", "JJ"]], //combine tags
    ["the chicago, zoo is fun", ["DT", "NN", "NN", "CP", "JJ"]], //don't combine tags
    ["the chicago Zoo is fun", ["DT", "NN", "NN", "CP", "JJ"]], //don't combine tags
    ["it is a hundred and fifty", ['PRP', 'CP', 'DT', 'CD']], ["the United States of America is sunny", ["DT", "NN", "CP", "JJ"]], //combine over 'of'
    ["the Phantom of the Opera is lovely", ["DT", "NN", "CP", "JJ"]], //combine over 'of the'
    ["he will walk", ["PRP", "MD"]],
    //re-under-over...
    ["he walked", ["PRP", "VBD"]], ["he overwalked", ["PRP", "VBD"]], ["he over-walked", ["PRP", "VB"]], ["they under-walked", ["PRP", "VB"]],
    //before a modal
    ["lkajsdfj would say", ["NN", "MD", "VBP"]], ["the walk would say", ["DT", "NN", "MD", "VBP"]],
    //after a modal
    ["they will lkjfesj", ["PRP", "MD"]], ["I will slightly garoomph", ["PRP", "MD", "RB", "VB"]],
    //after word 'I'
    ["i lkjaf", ["PRP", "VB"]],
    //after adverb
    ["spencer quickly acked", ["NNP", "RB", "VB"]],
    //no two adjectives
    ["he was real", ["PRP", "CP", "JJ"]], ["he was real good", ["PRP", "CP", "RB", "JJ"]],
    //after 'the'
    // ["the walk was good", ["DT","NN","CP","JJ"]],
    //after copula
    ["they are lkjfes", ["PRP", "CP", "JJ"]], ["they are the lkjfes", ["PRP", "CP", "DT", "NN"]],
    //after copula-adverb
    ["he is very shoe", ["PRP", "CP", "RB", "JJ"]], ["she is so camp", ["PRP", "CP", "RB", "JJ"]],
    //before a pronoun
    ["Spencer lkajf him", ["NNP", "VB", "PRP"]], ["Toronto lkajf them", ["NN", "VB", "PRP"]],
    //contractions
    ["he's amazing", ["PRP", "CP", "JJ"]], ["we're excited", ["PRP", "CP", "JJ"]], ["I'd go", ["PRP", "MD", "VBP"]], ["he's amazing, she's corrupt", ["PRP", "CP", "JJ", "PRP", "CP", "JJ"]],
    //numbers
    ["the 10 women", ["DT", "CD", "NN"]], ["the 10.4 women", ["DT", "CD", "NN"]], ["the ten women", ["DT", "CD", "NN"]],
    // ["the ten-thousand women", ["DT","CD","NN"]],
    //after possessives
    ["watch her lkjefj", ["VBP", "PP", "NN"]], ["study my lkjfeh!", ["VBP", "PP", "NN"]], ["serve his kfjfekefjh.", ["VBP", "PP", "NN"]],
    // ["relinquish my lkjfeh!", ["VBP","PP","NN"]],//this could be a rule
    // ["he would afefese", ["PRP","MD","VB"]],
    //word rules
    ["lkjefifize the marbles", ["VB", "DT", "NN"]],
    //ensure reserved words are safe..
    ["prototype", ["NN"]], ["constructor", ["NN"]], ["this", ["DT"]], ["new", ["JJ"]], ["new", ["JJ"]], ["class", ["NN"]],
    //unicode
    ["Björk Guðmundsdóttir lives in Reykjavík", ["NN", "VBZ", "IN", "NN"]], ["Bjork Guomundsdottir lives in Reykjavik", ["NN", "VBZ", "IN", "NN"]],

    ["Climate Change, Miliband", ["NN", "NN"]], ["http://google.com", ["CD"]], ["may live", ["MD", "VBP"]], ["may 7th live", ["CD", "VBP"]], ["She and Marc Emery married on July 23, 2006", ["PRP", "CC", "NN", "VBD", "IN", "CD"]]
  ].forEach(function (arr) {
    test.deepEqual(nlp.pos(arr[0], {}).tags(), [arr[1]], arr[0])
  })
  //dont_combine option
  test.deepEqual(nlp.pos("tony hawk walks", {
    dont_combine: false
  }).tags(), [
    ["NNP", "VBZ"]
  ])
  test.deepEqual(nlp.pos("tony hawk walks", {
    dont_combine: true
  }).tags(), [
    ["NNP", "NN", "VBZ"]
  ])
  //test memory-leaks
  test.deepEqual(nlp.pos("tony hawk walks. tony hawk walks. tony hawk walks.", {}).tags(), [
    ["NNP", "VBZ"],
    ["NNP", "VBZ"],
    ["NNP", "VBZ"]
  ])
  test.deepEqual(nlp.pos("tony hawk is lkjej. tony hawk will lkjej. tony is very lkjej.", {}).tags(), [
    ["NNP", "CP", "JJ"],
    ["NNP", "MD"],
    ["NNP", "CP", "RB", "JJ"]
  ])

  //edge cases..
  test.deepEqual(nlp.pos("", {}).tags(), [])
  test.deepEqual(nlp.pos("   ", {}).tags(), [])
  test.deepEqual(nlp.pos(null, {}).tags(), [])
  if(TIME){console.timeEnd(t)}
  test.done()
};

t = "spot"
exports[t] = function (test) {
  if(TIME){console.time(t)}
  var options = {}
  var terms = [
    ["tony hawk walked to Toronto", {},
      ["tony hawk", "toronto"]
    ],
    ["Tony Hawk walked to Toronto", {},
      ["tony hawk", "toronto"]
    ],
    ["natalie portman in black swan was really great", {},
      ["natalie portman"]
    ],
    ["Natalie Portman in black swan was really great", {},
      ["natalie portman"]
    ],
    ["nancy reagan was great when she spoke about HIV in Denver", {},
      ["nancy reagan", "hiv", "denver"]
    ],
    ["Dr. Conrad Murray recieved a guilty verdict", {},
      ["dr conrad murray"]
    ],
    ["i agree with tom hanks and nancy kerrigan", {},
      ["tom hanks", "nancy kerrigan"]
    ],
    ["i went strolling in Berlin", {
        ignore_gerund: true
      },
      ["berlin"]
    ],
    ["smoking all day in the bathtub", {},
      []
    ],
    ["I recently watched The Simpsons", {},
      ["the simpsons"]
    ],
    ["I especially loved the singing in The Phantom of the Opera", {},
      ["the phantom of the opera"]
    ],
    //capitalisation of first word..
    ["Tony Hawk is cool", {},
      ["tony hawk"]
    ],
    ["My Hawk is cool", {},
      ["hawk"]
    ],
    //remove redundant people terms
    ["Tony Hawk is cool. Tony eats all day.", {},
      ["tony hawk"]
    ],
    ["Tony Danza eats chocolate. Nobody eats it like Danza.", {},
      ["tony danza"]
    ],
    ["Tony Danza eats chocolate. Tony Hawk is legitimate.", {},
      ["tony danza", "tony hawk"]
    ],
    // ["Tony eats all day. Tony Hawk is cool.", {},
    //   ["tony", "tony hawk"]
    // ],
  ]
  terms.forEach(function (arr) {
    var spots = nlp.spot(arr[0], options).map(function (a) {
      a = a || {}
      return a.normalised
    })
    test.deepEqual(spots, arr[2])
  })
  if(TIME){console.timeEnd(t)}
  test.done()
};

t=""

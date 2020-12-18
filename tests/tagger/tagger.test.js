const test = require('tape')
const nlp = require('../_lib')

test('pos-basic-tag:', function (t) {
  let arr = [
    ['John is pretty', ['Person', 'Copula', 'Adjective']],
    ['John was lofty', ['Person', 'Copula', 'Adjective']],
    ['John Smith was lofty', ['FirstName', 'LastName', 'Copula', 'Adjective']],
    ['asdfes was lofty', ['Noun', 'Copula', 'Adjective']],
    ['asdfes lksejfj was lofty', ['Noun', 'Noun', 'Copula', 'Adjective']],
    ['Spencer Kelly is in Canada', ['Person', 'Person', 'Copula', 'Preposition', 'Place']],
    ['He is in Canada', ['Pronoun', 'Copula', 'Preposition', 'Place']],
    ['5 red roses', ['Value', 'Adjective', 'Noun']],
    ['3 trains', ['Value', 'Noun']],
    ['3 trainers', ['Value', 'Noun']],
    ['5 buses', ['Value', 'Noun']],
    ['101010101010101010101010101010101010101010', ['NumericValue']],

    ['walk the walk', ['Verb', 'Determiner', 'Noun']],
    ['Peter the man', ['Person', 'Determiner', 'Noun']],
    // ['book the flight', ['Verb', 'Determiner', 'Noun']],

    ['one dream', ['Value', 'Singular']],
    ['two dreams', ['Value', 'Plural']],

    // modal verbs
    ['can buy', ['Modal', 'Verb']],
    ['he can', ['Pronoun', 'Verb']],
    ['the can', ['Determiner', 'Noun']],

    ['will earn', ['Modal', 'Verb']],
    ['they will', ['Pronoun', 'Verb']],
    ['the will', ['Determiner', 'Noun']],

    ['may leave', ['Modal', 'Verb']],
    ['they may', ['Pronoun', 'Verb']],
    ['this may', ['Determiner', 'Noun']],

    //slang, contractions
    ['u r nice', ['Pronoun', 'Copula', 'Adjective']],
    ['canadian bacon', ['Demonym', 'Noun']],
    ['canadian dollar', ['Currency', 'Currency']],

    //possessive rules
    ["john lkjsdf's", ['Person', 'Possessive']],
    ["john lkjsdf's house", ['Person', 'Possessive', 'Noun']],
    ["john Lkjsdf's house", ['Person', 'Possessive', 'Noun']],
    ["john Lkjsdf's House", ['Person', 'Possessive', 'Noun']],
    ["mark's question mark", ['Possessive', 'Noun', 'Noun']],

    //question-words
    ['who is good?', ['QuestionWord', 'Copula', 'Adjective']],
    ['which is good?', ['QuestionWord', 'Copula', 'Adjective']],
    // ['bacon which is good', ['Noun', 'Pronoun', 'Copula', 'Adjective']],
    // ['bacon which really is good', ['Noun', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],
    // ['Douglas who really is good', ['Person', 'Pronoun', 'Adverb', 'Copula', 'Adjective']],

    //web text things
    ['lkj@fun.com', ['Email']],
    ['j@f.ti', ['Email']],
    ['j@ti', ['Noun']],
    ['@ti', ['AtMention']],
    ['#funtimes', ['HashTag']],
    ['http://fun.com/cool?fun=yes', ['Url']],
    ['#cool fun.com @cooman', ['HashTag', 'Url', 'AtMention']],

    //determiner-corrections
    ['this rocks dude', ['Determiner', 'Verb', 'Noun']],
    ['that rocks dude', ['Determiner', 'Verb', 'Noun']],
    ['the rocks dude', ['Determiner', 'Plural', 'Noun']],
    ['these rocks dude', ['Determiner', 'Plural', 'Noun']],
    ['those rocks dude', ['Determiner', 'Plural', 'Noun']],
    ['the test string', ['Determiner', 'Noun', 'Noun']],

    //people
    ['John swim', ['Person', 'Verb']],
    ['John, John', ['Person', 'Person']],
    ['John, you', ['FirstName', 'Pronoun']],
    ['John you', ['MaleName', 'Pronoun']],
    ['you John you', ['Pronoun', 'Person', 'Pronoun']],
    // ['10 + 9', ['Value', 'Symbol', 'Value']],
    // ['2 * 90 = 180', ['Value', 'Symbol', 'Value', 'Symbol', 'Value']],
    // ['one - seventy-six', ['Value', 'Symbol', 'Value']],
    ['The stream runs', ['Determiner', 'Noun', 'Verb']],
    ['The stream really runs', ['Determiner', 'Noun', 'Adverb', 'Verb']],
    ['The nice stream really runs', ['Determiner', 'Adjective', 'Noun', 'Adverb', 'Verb']],

    ['he is walking', ['Pronoun', 'Copula', 'Gerund']],
    ['walking is fun', ['Activity', 'Copula', 'Adjective']],
    ["walking's great", ['Activity', 'Copula', 'Adjective']],
    ['jack cheered', ['Person', 'PastTense']],
    ['jack guarded', ['Person', 'PastTense']],
    ['jack is guarded', ['Person', 'Copula', 'Adjective']],
    ['jack seems guarded', ['Person', 'Verb', 'Adjective']],
    //more
    ['there are reasons', ['Noun', 'Copula', 'Plural']],
    ['there were many walks', ['Noun', 'Copula', 'Adjective', 'Plural']],
    ['there were the walks', ['Noun', 'Copula', 'Determiner', 'Noun']],

    ['it was fixed', ['Noun', 'Copula', 'PastTense']],
    ['it will be boxed', ['Noun', 'Verb', 'Verb', 'PastTense']],
    //ambiguous adverbs
    ['it was pretty', ['Noun', 'Copula', 'Adjective']],
    ['it was pretty cool', ['Noun', 'Copula', 'Adverb', 'Adjective']],
    // ['it was really pretty cool', ['Noun', 'Copula', 'Adverb', 'Adverb', 'Adjective']],
    ['it was just', ['Noun', 'Copula', 'Adjective']],
    ['it was just gorgeous', ['Noun', 'Copula', 'Adverb', 'Adjective']],

    ['butterfly', ['Singular']],
    ['he blamed the girl', ['Pronoun', 'PastTense', 'Determiner', 'Singular']],
    ['his fine', ['Possessive', 'Noun']],

    //acronyms
    // ['contracted AIDS', ['PastTense', 'Acronym']],
    ['contacted nbc', ['PastTense', 'Acronym']],
    ['UNESCO', ['Acronym']],
    ['NAFTA', ['Acronym']],

    ['city/town', ['Noun', 'Noun']],
    ['boyfriend to Jane', ['Noun', 'Conjunction', 'Person']],
    // ['boyfriend of Jane', ['Noun', 'Conjunction', 'Person']],
    ['his fines', ['Possessive', 'Noun']],
    ['100+ rumours', ['Value', 'Plural']],
    ['John & John,', ['Noun', 'Noun', 'Noun']],
    // ['i am gutted', ['Noun', 'PastTense', 'Adjective']],
    ['N.V.,', ['Noun']],

    // verb suffixes
    ['lied', ['PastTense']],
    ['lies', ['PresentTense']],
    ['owed', ['PastTense']],
    ['owes', ['PresentTense']],
    ['aced', ['PastTense']],
    ['vied', ['PastTense']],
    ['vies', ['PresentTense']],
    ['husked', ['PastTense']],
    ['husks', ['PresentTense']],
    ['masked', ['PastTense']],
    ['planned', ['PastTense']],
    ['hummed', ['PastTense']],

    // numberrange
    ['it was 1-2 kg woooh', ['Noun', 'PastTense', 'NumberRange', 'NumberRange', 'NumberRange', 'Unit', 'Expression']],
    ['1-1', ['NumberRange', 'NumberRange', 'NumberRange']],
    ['12-12', ['NumberRange', 'NumberRange', 'NumberRange']],
    ['123-123', ['NumberRange', 'NumberRange', 'NumberRange']],
    ['1234-1234', ['Noun']],

    ['bakes', ['PresentTense']],
    ['fakes', ['PresentTense']],
    ['makes', ['PresentTense']],
    ['mistakes', ['PresentTense']],
    ['overtakes', ['PresentTense']],
    ['remakes', ['PresentTense']],
    ['retakes', ['PresentTense']],
    ['forsakes', ['PresentTense']],
    ['shakes', ['PresentTense']],
    ['snakes', ['PresentTense']],
    ['takes', ['PresentTense']],
    ['undertakes', ['PresentTense']],

    ['baked', ['PastTense']],
    ['faked', ['PastTense']],
    ['maked', ['PastTense']],
    ['mistaked', ['PastTense']],
    ['overtook', ['PastTense']],
    ['remaked', ['PastTense']],
    ['retaked', ['PastTense']],
    ['forsaked', ['PastTense']],
    ['shaked', ['PastTense']],
    ['snaked', ['PastTense']],
    ['took', ['PastTense']],
    ['undertook', ['PastTense']],

    //phrasal verb tense
    ['head-over', ['PresentTense', 'Particle']],
    ['head-under', ['PresentTense', 'Particle']],
    ['haze-over', ['PresentTense', 'Particle']],
    ['hazed-over', ['PastTense', 'Particle']],
    ['headed-over', ['PastTense', 'Particle']],
    ['heading-under', ['Gerund', 'Particle']],
    ['healing-over', ['Gerund', 'Particle']],

    //abbreviations
    [
      'col. Patrick said march and feb. etc.',
      ['Abbreviation', 'Person', 'PastTense', 'Month', 'Conjunction', 'Abbreviation', 'Abbreviation'],
    ],
    [`i met April O'neil`, ['Pronoun', 'PastTense', 'Person', 'Person']],

    // adjectives
    ['germans are nice', ['Demonym', 'Verb', 'Adjective']],
    ['Iraqis are nice', ['Plural', 'Copula', 'Adjective']],
    ['canadians are nice', ['ProperNoun', 'Verb', 'Adjective']],
    ['thom is smart', ['ProperNoun', 'Verb', 'Adjective']],

    // [`ANA, ENA, CCP etc.`, ['Acronym', 'Acronym', 'Acronym', 'Abbreviation']],
    [`as disgusting as`, ['Preposition', 'Adjective', 'Preposition']],
    [`more disgusting than`, ['Adverb', 'Adjective', 'Preposition']],
    [`was so nausiating`, ['Copula', 'Adverb', 'Adjective']],
    [`extremely moving`, ['Adverb', 'Adjective']],
    [`each promising image`, ['Determiner', 'Adjective', 'Singular']],
    [`this reckoning`, ['Determiner', 'Noun']],
    [`it was redefining`, ['Pronoun', 'Copula', 'Adjective']],
    [`it was a redefining moment`, ['Pronoun', 'Copula', 'Determiner', 'Adjective', 'Noun']],
    [`he is redefining art`, ['Pronoun', 'Copula', 'Verb', 'Noun']],
    [`revealing his guts`, ['Verb', 'Possessive', 'Plural']],
    // [`the ruling party`, ['Determiner', 'Adjective', 'Singular']],
    [`i found it isolating`, ['Noun', 'PastTense', 'Noun', 'Adjective']],
    // [`promising to leave`, ['Gerund', 'Conjunction', 'Verb']],
    [`distressing us`, ['Gerund', 'Noun']],
    [`loving you`, ['Gerund', 'Noun']],
    [`it was disgusting`, ['Pronoun', 'Copula', 'Adjective']],
    [`dark green`, ['Adverb', 'Adjective']],
    [`kinda sparkly`, ['Adverb', 'Adjective']],
    [`quite stunning`, ['Adverb', 'Adjective']],
    [`slowly stunning`, ['Adverb', 'Verb']],
    [`quite awfully stunning`, ['Adverb', 'Adverb', 'Adjective']],
    [`quite awfully swimming`, ['Adverb', 'Adverb', 'Verb']],
    ['is doing well', ['Copula', 'Gerund', 'Adverb']],
    ['well, no.', ['Expression', 'Negative']],
    ['he is well', ['Pronoun', 'Copula', 'Adjective']],
    ['is well made', ['Copula', 'Adverb', 'Adjective']],
    ['at some point', ['Preposition', 'Determiner', 'Noun']],
    ['to a point', ['Conjunction', 'Determiner', 'Noun']],
  ]
  arr.forEach(function (a) {
    let terms = nlp(a[0]).json(0).terms
    terms.forEach((term, i) => {
      let tag = a[1][i]
      let found = term.tags.some(tg => tg === tag)
      t.equal(found, true, a[0] + "  - '" + term.text + ' #' + tag)
    })
  })
  t.end()
})

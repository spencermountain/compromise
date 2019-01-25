'use strict';

//mostly pos-corections here
const corrections = function(doc) {
  //ambig prepositions/conjunctions
  if (doc.has('so')) {
    //so funny
    doc.match('so #Adjective').match('so').tag('Adverb', 'so-adv');
    //so the
    doc.match('so #Noun').match('so').tag('Conjunction', 'so-conj');
    //do so
    doc.match('do so').match('so').tag('Noun', 'so-noun');
  }
  if (doc.has('all')) {
    //all students
    doc.match('[all] #Determiner? #Noun').tag('Adjective', 'all-noun');
    //it all fell apart
    doc.match('[all] #Verb').tag('Adverb', 'all-verb');
  }
  //the ambiguous word 'that' and 'which'
  if (doc.has('(that|which)')) {
    //remind john that
    doc.match('#Verb #Adverb? #Noun (that|which)').lastTerm().tag('Preposition', 'that-prep');
    //that car goes
    doc.match('that #Noun #Verb').firstTerm().tag('Determiner', 'that-determiner');
    //work, which has been done.
    doc.match('#Comma [which] (#Pronoun|#Verb)').tag('Preposition', 'which-copula');
  //things that provide
  // doc.match('#Plural (that|which) #Adverb? #Verb').term(1).tag('Preposition', 'noun-that');
  }
  //Determiner-signals
  if (doc.has('#Determiner')) {
    //the wait to vote
    doc.match('(the|this) [#Verb] #Preposition .').tag('Noun', 'correction-determiner1');
    //the swim
    doc.match('(the|those|these) (#Infinitive|#PresentTense|#PastTense)').term(1).tag('Noun', 'correction-determiner2');
    //a staggering cost
    doc.match('(a|an) [#Gerund]').tag('Adjective', 'correction-a|an');
    doc.match('(a|an) #Adjective (#Infinitive|#PresentTense)').term(2).tag('Noun', 'correction-a|an2');
    //some pressing issues
    doc.match('some [#Verb] #Plural').tag('Noun', 'correction-determiner6');
    //the test string
    doc.match('#Determiner [#Infinitive] #Noun').tag('Noun', 'correction-determiner7');
    //the orange.
    doc.match('#Determiner #Adjective$').not('(#Comparative|#Superlative)').term(1).tag('Noun', 'the-adj-1');
    //the orange is
    doc.match('#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)').tag('Noun', 'the-adj-2');
    //the nice swim
    doc.match('(the|this|those|these) #Adjective [#Verb]').tag('Noun', 'the-adj-verb');
    //the truly nice swim
    doc.match('(the|this|those|these) #Adverb #Adjective [#Verb]').tag('Noun', 'correction-determiner4');
    //a stream runs
    doc.match('(the|this|a|an) [#Infinitive] #Adverb? #Verb').tag('Noun', 'correction-determiner5');
    //a sense of
    doc.match('#Determiner [#Verb] of').tag('Noun', 'the-verb-of');
    //the threat of force
    doc.match('#Determiner #Noun of [#Verb]').tag('Noun', 'noun-of-noun');
    //a close
    doc.match('#Determiner #Adverb? [close]').tag('Adjective', 'a-close');
    //did a 900, paid a 20
    doc.match('#Verb (a|an) [#Value]').tag('Singular', 'a-value');
    //a tv show
    doc.match('(a|an) #Noun [#Infinitive]').tag('Noun', 'a-noun-inf');
  }

  //like
  if (doc.has('like')) {
    doc.match('just [like]').tag('Preposition', 'like-preposition');
    //folks like her
    doc.match('#Noun [like] #Noun').tag('Preposition', 'noun-like');
    //look like
    doc.match('#Verb [like]').tag('Adverb', 'verb-like');
    //exactly like
    doc.match('#Adverb like').not('(really|generally|typically|usually|sometimes|often) like').lastTerm().tag('Adverb', 'adverb-like');
  }

  if (doc.has('#Value')) {
    //half a million
    doc.match('half a? #Value').tag('Value', 'half-a-value'); //quarter not ready
    doc.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
    //all values are either ordinal or cardinal
    // doc.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');
    //money
    doc.match('#Value+ #Currency').tag('Money', 'value-currency').lastTerm().tag('Unit', 'money-unit');
    doc.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');
    //1 800 PhoneNumber
    doc.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value');
    //(454) 232-9873
    doc.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber');
    //two hundredth
    doc.match('#TextValue+').match('#Cardinal+ #Ordinal').tag('Ordinal', 'two-hundredth');
  }

  if (doc.has('#Noun')) {
    //'more' is not always an adverb
    doc.match('more #Noun').tag('Noun', 'more-noun');
    //the word 'second'
    doc.match('[second] #Noun').not('#Honorific').unTag('Unit').tag('Ordinal', 'second-noun');
    //he quickly foo
    doc.match('#Noun #Adverb [#Noun]').tag('Verb', 'correction');
    //fix for busted-up phrasalVerbs
    doc.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal');
    //John & Joe's
    doc.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun');
    //Aircraft designer
    doc.match('#Noun #Actor').tag('Actor', 'thing-doer');
    //this rocks
    doc.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs');
    //by a bear.
    doc.match('#Determiner #Infinitive$').lastTerm().tag('Noun', 'a-inf');
    //the western line
    doc.match('#Determiner [(western|eastern|northern|southern|central)] #Noun').tag('Noun', 'western-line');
    doc.match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun').tag('Noun', 'technical-noun');
    //organization
    if (doc.has('#Organization')) {
      doc.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
      doc.match('#Organization #Country').tag('Organization', 'org-country');
      doc.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
    }
    if (doc.has('#Possessive')) {
      //my buddy
      doc.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name');
      //spencer kelly's
      doc.match('#FirstName #Acronym? #Possessive').ifNo('#Comma').match('#FirstName #Acronym? #LastName').tag('Possessive');
      //Super Corp's fundraiser
      doc.match('#Organization+ #Possessive').ifNo('#Comma').tag('Possessive');
      //Los Angeles's fundraiser
      doc.match('#Place+ #Possessive').ifNo('#Comma').tag('Possessive');
    }
  }

  if (doc.has('#Verb')) {
    //still make
    doc.match('[still] #Verb').tag('Adverb', 'still-verb');
    //'u' as pronoun
    doc.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1');
    //is no walk
    doc.match('is no [#Verb]').tag('Noun', 'is-no-verb');
    //different views than
    doc.match('[#Verb] than').tag('Noun', 'correction');
    //her polling
    doc.match('#Possessive [#Verb]').tag('Noun', 'correction-possessive');
    //there are reasons
    doc.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are');
    //jack seems guarded
    doc.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled');

    if (doc.has('(who|what|where|why|how|when)')) {
      //the word 'how'
      doc.match('^how').tag('QuestionWord', 'how-question').tag('QuestionWord', 'how-question');
      doc.match('how (#Determiner|#Copula|#Modal|#PastTense)').term(0).tag('QuestionWord', 'how-is');
      // //the word 'which'
      doc.match('^which').tag('QuestionWord', 'which-question').tag('QuestionWord', 'which-question');
      doc.match('which . (#Noun)+ #Pronoun').term(0).tag('QuestionWord', 'which-question2');
      doc.match('which').tag('QuestionWord', 'which-question3');
      //where

      //how he is driving
      let word = doc.match('#QuestionWord #Noun #Copula #Adverb? (#Verb|#Adjective)').firstTerm();
      word.unTag('QuestionWord').tag('Conjunction', 'how-he-is-x');
      //when i go fishing
      word = doc.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund').firstTerm();
      word.unTag('QuestionWord').tag('Conjunction', 'when i go fishing');
    }

    if (doc.has('#Copula')) {
      //is eager to go
      doc.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');
      //is mark hughes
      doc.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun');

      doc.match('[#Infinitive] #Copula').tag('Noun', 'infinitive-copula');
      //sometimes adverbs - 'pretty good','well above'
      doc.match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)').ifNo('#Comma').tag('#Copula #Adverb #Adjective', 'sometimes-adverb');
      //sometimes not-adverbs
      doc.match('#Copula [(just|alone)$]').tag('Adjective', 'not-adverb');
      //jack is guarded
      doc.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled');
    }
    //went to sleep
    // doc.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
    //support a splattering of auxillaries before a verb
    let advb = '(#Adverb|not)+?';
    if (doc.has(advb)) {
      //had walked
      doc.match(`(has|had) ${advb} #PastTense`).not('#Verb$').tag('Auxiliary', 'had-walked');
      //was walking
      doc.match(`#Copula ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'copula-walking');
      //been walking
      doc.match(`(be|been) ${advb} #Gerund`).not('#Verb$').tag('Auxiliary', 'be-walking');
      //would walk
      doc.match(`(#Modal|did) ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'modal-verb');
      //would have had
      doc.match(`#Modal ${advb} have ${advb} had ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-have');
      //would be walking
      doc.match(`(#Modal) ${advb} be ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
      //would been walking
      doc.match(`(#Modal|had|has) ${advb} been ${advb} #Verb`).not('#Verb$').tag('Auxiliary', 'would-be');
    //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
    // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');
    }
    //fall over
    doc.match('#PhrasalVerb #PhrasalVerb').lastTerm().tag('Particle', 'phrasal-particle');
    if (doc.has('#Gerund')) {
      //walking is cool
      doc.match('#Gerund #Adverb? not? #Copula').firstTerm().tag('Activity', 'gerund-copula');
      //walking should be fun
      doc.match('#Gerund #Modal').firstTerm().tag('Activity', 'gerund-modal');
      //running-a-show
      doc.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show');
    //setting records
    // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
    }
    //will be cool -> Copula
    if (doc.has('will #Adverb? not? #Adverb? be')) {
      //will be running (not copula
      if (doc.has('will #Adverb? not? #Adverb? be #Gerund') === false) {
        //tag it all
        doc.match('will not? be').tag('Copula', 'will-be-copula');
        //for more complex forms, just tag 'be'
        doc.match('will #Adverb? not? #Adverb? be #Adjective').match('be').tag('Copula', 'be-copula');
      }
    }
  }

  if (doc.has('#Adjective')) {
    //still good
    doc.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
    //big dreams, critical thinking
    doc.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense');
    //will secure our
    doc.match('will [#Adjective]').tag('Verb', 'will-adj');
    //cheering hard - dropped -ly's
    doc.match('#PresentTense (hard|quick|long|bright|slow)').lastTerm().tag('Adverb', 'lazy-ly');
    //his fine
    doc.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine');
    //
    doc.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb');
  }

  if (doc.has('#TitleCase')) {
    //FitBit Inc
    doc.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv');
    //Foo District
    doc
      .match('#TitleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)')
      .tag('Region', 'foo-district');
    //District of Foo
    doc
      .match('(district|region|province|municipality|territory|burough|state) of #TitleCase')
      .tag('Region', 'district-of-Foo');
  }

  if (doc.has('#Hyphenated')) {
    //air-flow
    doc.match('#Hyphenated #Hyphenated').match('#Noun #Verb').tag('Noun', 'hyphen-verb');
    let hyphen = doc.match('#Hyphenated+');
    if (hyphen.has('#Expression')) {
      //ooh-wee
      hyphen.tag('Expression', 'ooh-wee');
    }
  }

  if (doc.has('#Place')) {
    //West Norforlk
    doc.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk');
    //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
    doc.match('#City [#Acronym]').match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)').tag('Region', 'us-state');
  }
  //misc:
  //foot/feet
  doc.match('(foot|feet)').tag('Noun', 'foot-noun');
  doc.match('#Value (foot|feet)').term(1).tag('Unit', 'foot-unit');
  //'u' as pronoun
  doc.match('#Conjunction [u]').tag('Pronoun', 'u-pronoun-2');
  //'a/an' can mean 1 - "a hour"
  doc.match('(a|an) (#Duration|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)').ifNo('#Plural').term(0).tag('Value', 'a-is-one');
  //swear-words as non-expression POS
  //nsfw
  doc.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  doc.match('#Determiner (shit|damn|hell)').term(1).tag('Noun', 'swears-noun');
  doc.match('(shit|damn|fuck) (#Determiner|#Possessive|them)').term(0).tag('Verb', 'swears-verb');
  doc.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective');
  //6 am
  doc.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day');
  //timezones
  doc.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone');
  //canadian dollar, Brazilian pesos
  doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency');
  //about to go
  doc.match('about to #Adverb? #Verb').match('about to').tag(['Auxiliary', 'Verb'], 'about-to');
  //Doctor john smith jr
  doc.match('#Honorific #Person').tag('Person', 'honorific-person');
  doc.match('#Person (jr|sr|md)').tag('Person', 'person-honorific');
  //right of way
  doc.match('(right|rights) of .').tag('Noun', 'right-of');
  return doc;
};

module.exports = corrections;

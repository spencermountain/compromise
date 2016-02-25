(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlp_compromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var fns = require('./fns.js');

var models = {
  Term: require('./term/term.js'),
  Text: require('./text/text.js'),
  Sentence: require('./sentence/sentence.js'),
  Statement: require('./sentence/statement/statement.js'),
  Question: require('./sentence/question/question.js'),
  Verb: require('./term/verb/verb.js'),
  Adjective: require('./term/adjective/adjective.js'),
  Adverb: require('./term/adverb/adverb.js'),
  Noun: require('./term/noun/noun.js'),
  Value: require('./term/noun/value/value.js'),
  Person: require('./term/noun/person/person.js'),
  Place: require('./term/noun/place/place.js'),
  Date: require('./term/noun/date/date.js'),
  Organisation: require('./term/noun/organisation/organisation.js')
};

function NLP() {

  this.plugin = function (obj) {
    obj = obj || {};
    // if obj is a function, pass it an instance of this nlp library
    if (fns.isFunction(obj)) {
      // run it in this current context
      obj = obj.call(this, this);
    }
    //apply each plugin to the correct prototypes
    Object.keys(obj).forEach(function (k) {
      Object.keys(obj[k]).forEach(function (method) {
        models[k].fn[method] = obj[k][method];
      });
    });
  };
  this.lexicon = function () {
    return require('./lexicon.js');
  };

  this.term = function (s) {
    return new models.Term(s);
  };
  this.noun = function (s) {
    return new models.Noun(s);
  };
  this.verb = function (s) {
    return new models.Verb(s);
  };
  this.adjective = function (s) {
    return new models.Adjective(s);
  };
  this.adverb = function (s) {
    return new models.Adverb(s);
  };

  this.value = function (s) {
    return new models.Value(s);
  };
  this.person = function (s) {
    return new models.Person(s);
  };
  this.place = function (s) {
    return new models.Place(s);
  };
  this.date = function (s) {
    return new models.Date(s);
  };
  this.organisation = function (s) {
    return new models.Organisation(s);
  };

  this.text = function (s, options) {
    return new models.Text(s, options);
  };
  this.sentence = function (s, options) {
    return new models.Sentence(s, options);
  };
  this.statement = function (s) {
    return new models.Statement(s);
  };
  this.question = function (s) {
    return new models.Question(s);
  };
}

var nlp = new NLP();
//export to window or webworker
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
  self.nlp_compromise = nlp;
}
//export to commonjs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = nlp;
}
//export to amd
if (typeof define === 'function' && define.amd) {
  define(nlp);
}

// let lexicon = nlp.lexicon();
// // augment it
// lexicon['apple'] = 'Person';
// // use it for the pos-tagging
// let s = nlp.sentence('apple', {
//   lexicon: lexicon
// });
// console.log(s.tags());

// console.log(nlp.text('John was lofty').terms());

},{"./fns.js":19,"./lexicon.js":20,"./sentence/question/question.js":36,"./sentence/sentence.js":37,"./sentence/statement/statement.js":38,"./term/adjective/adjective.js":40,"./term/adverb/adverb.js":45,"./term/noun/date/date.js":50,"./term/noun/noun.js":56,"./term/noun/organisation/organisation.js":58,"./term/noun/person/person.js":62,"./term/noun/place/place.js":64,"./term/noun/value/value.js":72,"./term/term.js":73,"./term/verb/verb.js":81,"./text/text.js":83}],2:[function(require,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.
'use strict';

var honourifics = require('./honourifics'); //stored seperately, for 'noun.is_person()'

//common abbreviations
var main = ['arc', 'al', 'exp', 'rd', 'st', 'dist', 'mt', 'fy', 'pd', 'pl', 'plz', 'tce', 'llb', 'md', 'bl', 'ma', 'ba', 'lit', 'ex', 'eg', 'ie', 'circa', 'ca', 'cca', 'vs', 'etc', 'esp', 'ft', 'bc', 'ad'];

//person titles like 'jr', (stored seperately)
main = main.concat(honourifics);

//org main
var orgs = ['dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co', 'corp',
//proper nouns with exclamation marks
'yahoo', 'joomla', 'jeopardy'];
main = main.concat(orgs);

//place main
var places = ['ala', 'ariz', 'ark', 'cal', 'calif', 'col', 'colo', 'conn', 'del', 'fed', 'fla', 'fl', 'ga', 'ida', 'ind', 'ia', 'la', 'kan', 'kans', 'ken', 'ky', 'la', 'md', 'mich', 'minn', 'mont', 'neb', 'nebr', 'nev', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wash', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta', 'ont', 'que', 'sask', 'yuk', 'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy'];
main = main.concat(places);

//date abbrevs.
//these are added seperately because they are not nouns
var dates = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'sep'];
main = main.concat(dates);

module.exports = {
  abbreviations: main,
  dates: dates,
  orgs: orgs,
  places: places
};

},{"./honourifics":8}],3:[function(require,module,exports){
'use strict';

//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
module.exports = ['aberrant', 'ablaze', 'able', 'aboard', 'above', 'abrupt', 'absent', 'absolute', 'absorbing', 'abstract', 'abundant', 'accurate', 'actual', 'acute', 'cute', 'adept', 'adequate', 'adult', 'advanced', 'adverse', 'afraid', 'against', 'agonizing', 'ahead', 'alarming', 'alcoholic', 'all', 'aloof', 'amazing', 'antiquated', 'apparent', 'appetizing', 'appropriate', 'apt', 'arab', 'arbitrary', 'arrogant', 'artificial', 'asleep', 'astonishing', 'authentic', 'average', 'awake', 'aware', 'awkward', 'back', 'backwards', 'bad', 'bald', 'bankrupt', 'barren', 'bawdy', 'behind', 'beloved', 'beneficial', 'bent', 'best', 'better', 'beyond', 'bizarre', 'bland', 'blank', 'blind', 'blond', 'bloody', 'bogus', 'bold', 'bottom', 'bouncy', 'brilliant', 'brisk', 'broken', 'burly', 'busy', 'cagey', 'calming', 'careful', 'caring', 'certain', 'cheesy', 'chief', 'chilly', 'civil', 'clever', 'closed', 'cloudy', 'colonial', 'colossal', 'commercial', 'common', 'complete', 'complex', 'concerned', 'concrete', 'congruent', 'constant', 'contemporary', 'contrary', 'cooing', 'correct', 'corrupt', 'costly', 'covert', 'cowardly', 'cozy', 'cramped', 'craven', 'crazed', 'crisp', 'crowded', 'crucial', 'cuddly', 'daily', 'damaged', 'damaging', 'danish', 'dapper', 'dashing', 'deadpan', 'deaf', 'deeply', 'defiant', 'degenerate', 'deliberate', 'delicate', 'delightful', 'dense', 'deranged', 'desperate', 'detailed', 'determined', 'devout', 'didactic', 'difficult', 'dire', 'discreet', 'diseased', 'disgruntled', 'dishonest', 'disorderly', 'distant', 'distressed', 'diverse', 'divine', 'dominant', 'done', 'double', 'doubtful', 'downtown', 'dreary', 'due', 'dumb', 'earthly', 'east', 'eastern', 'easygoing', 'eerie', 'elaborate', 'elderly', 'elegant', 'elite', 'eminent', 'encouraging', 'entire', 'erect', 'essential', 'ethereal', 'everyday', 'evil', 'exact', 'excess', 'expected', 'expert', 'extra', 'extravagant', 'exuberant', 'exultant', 'fabled', 'fake', 'false', 'fancy', 'far', 'far-reaching', 'faulty', 'faux', 'favorite', 'female', 'feminine', 'fertile', 'fierce ', 'financial', 'finite', 'first', 'fit', 'fixed', 'flagrant', 'fluent', 'foamy', 'foolish', 'foregoing', 'foreign', 'former', 'fortunate', 'foul', 'frantic', 'freezing', 'frequent', 'fretful', 'friendly', 'friendly', 'fun', 'furry', 'future', 'gainful', 'gaudy', 'gay', 'generic', 'genuine', 'ghastly', 'ghostly', 'giant', 'giddy', 'gigantic', 'gleaming', 'global', 'gloomy', 'gold', 'gone', 'good', 'goofy', 'graceful', 'grateful', 'gratis', 'gray', 'grey', 'grisly', 'groovy', 'gross', 'guarded', 'half', 'hallowed', 'handy', 'hanging', 'harrowing', 'hateful', 'heady', 'heavenly', 'hefty', 'hellish', 'helpful', 'hesitant', 'highfalutin', 'hilly', 'hispanic', 'homely', 'honest', 'hooked', 'horrific', 'hostile', 'hourly', 'huge', 'humble', 'humdrum', 'humid', 'hurried', 'hurt', 'icy', 'ideal', 'ignorant', 'ill', 'illegal', 'immediate', 'immense', 'imminent', 'impartial', 'imperfect', 'imported', 'improper', 'inadequate', 'inappropriate', 'inbred', 'incorrect', 'indirect', 'indoor', 'influential', 'initial', 'innate', 'inner', 'insane', 'insecure', 'inside', 'instant', 'intact', 'intense', 'intermediate', 'intimate', 'intoxicated', 'irate', 'irrelevant', 'jagged', 'jolly', 'juicy', 'junior', 'justified', 'juvenile', 'kaput', 'kindly', 'knowing', 'labored', 'languid', 'last', 'latter', 'lax', 'learned', 'left', 'left-wing', 'legal', 'legendary', 'legitimate', 'less', 'lethal', 'level', 'lewd', 'likely', 'limited', 'literal', 'literate', 'lively', 'living', 'lofty', 'lonely', 'longing', 'lousy', 'loutish', 'lovely', 'loving', 'lowly', 'loyal', 'luxuriant', 'lying', 'macabre', 'madly', 'magenta', 'main', 'major', 'makeshift', 'male', 'malignant', 'mammoth', 'many', 'masculine', 'measly', 'meaty', 'medium', 'melancholy', 'menacing', 'mere', 'middle', 'mild', 'miniature', 'minor', 'miscreant', 'mixed', 'mobile', 'moderate', 'moldy', 'monthly', 'moody', 'moot', 'most', 'multiple', 'mute', 'naive', 'naked', 'nearby', 'necessary', 'neighborly', 'next', 'nightly', 'nimble', 'noble', 'nonchalant', 'nondescript', 'nonstop', 'north', 'northern', 'nosy', 'nuanced', 'obeisant', 'obese', 'obscene', 'obscure', 'observant', 'obsolete', 'offbeat', 'official', 'oily', 'ok', 'okay', 'ongoing', 'only', 'open', 'opposite', 'organic', 'other', 'outdoor', 'outer', 'outgoing', 'outside', 'oval', 'over', 'overall', 'overnight', 'overt', 'overweight', 'overwrought', 'painful', 'paralleled', 'part-time', 'partial', 'past', 'peaceful', 'perfect', 'permanent', 'perplexing', 'perverse', 'petite', 'phony', 'picayune', 'placid', 'plant', 'pleasant', 'polite', 'populist', 'potential', 'precise', 'pregnant', 'premature', 'premium', 'present', 'pricey', 'prickly', 'primary', 'prime', 'prior', 'pristine', 'private', 'pro', 'probable', 'profound', 'profuse', 'prominent', 'proper', 'public', 'pumped', 'puny', 'quack', 'quaint', 'quickest', 'rabid', 'racial', 'racist', 'ragged', 'random', 'ready', 'real', 'rear', 'rebel', 'recondite', 'redundant', 'refreshing', 'relevant', 'reluctant', 'remote', 'republican', 'resistant', 'resolute', 'resonant', 'retarded', 'right', 'right-wing', 'rightful', 'ritzy', 'rival', 'robust', 'romantic', 'roomy', 'rosy', 'rough', 'routine', 'royal', 'sacred', 'saintly', 'salty', 'same', 'savvy', 'scary', 'scathing', 'scientific', 'screeching', 'second', 'secondary', 'secret', 'secure', 'sedate', 'seemly', 'self-loathing', 'selfish', 'senior', 'separate', 'serene', 'severe', 'sexy', 'shady', 'shameful', 'sheer', 'shiny', 'shocking', 'shut', 'shy', 'sick', 'significant', 'silly', 'sincere', 'single', 'skinny', 'sleek', 'slender', 'slick', 'slight', 'slimy', 'sly', 'smelly', 'smug', 'snobbish', 'social', 'sole', 'solemn', 'somber', 'soothing', 'sophisticated', 'sordid', 'sorry', 'south', 'southern', 'soviet', 'spare', 'special', 'specific', 'spicy', 'spirited', 'splendid', 'sprightly', 'squeamish', 'standard', 'standing', 'stark', 'steadfast', 'steady', 'stereotyped', 'stern', 'still', 'straightforward', 'striped', 'stupid', 'sturdy', 'stylish', 'subdued', 'subsequent', 'substantial', 'subtle', 'sudden', 'super', 'superb', 'superficial', 'superior', 'supreme', 'sure', 'surprising', 'surreal', 'symbolic', 'taboo', 'talented', 'tan', 'tasteful', 'tawdry', 'teenage', 'telling', 'temporary', 'terrific', 'tested', 'thoughtful', 'tidy', 'timely', 'tiny', 'together', 'top', 'torpid', 'tranquil', 'trendy', 'trite', 'troubled', 'twin', 'ugly', 'ultimate', 'ultra', 'unappealing', 'unassuming', 'unauthorized', 'unbecoming', 'unconvincing', 'undecided', 'under', 'underground', 'understood', 'unending', 'uneven', 'unexpected', 'unfair', 'universal', 'unknown', 'unlikely', 'unprecedented', 'unpublished', 'unrecognized', 'unregulated', 'unrelated', 'unruly', 'unsightly', 'unsupervised', 'unsuspecting', 'untidy', 'unwieldy', 'unwritten', 'upbeat', 'upcoming', 'upper', 'uppity', 'upscale', 'upset', 'upstairs', 'uptight', 'urban', 'used', 'useful', 'usual', 'utter', 'uttermost', 'vacant', 'vagabond', 'vain', 'vanilla', 'various', 'vengeful', 'verdant', 'vexing', 'vibrant', 'violet', 'volatile', 'wanting', 'warped', 'wary', 'wasteful', 'weary', 'weekly', 'welcome', 'western', 'whole', 'wholesale', 'wicked', 'widespread', 'wily', 'wiry', 'wistful', 'womanly', 'wooden', 'woozy', 'wound', 'wrong', 'wry', 'yearly', 'zany'];

},{}],4:[function(require,module,exports){
'use strict';

//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
module.exports = ['absurd', 'aggressive', 'alert', 'alive', 'awesome', 'beautiful', 'big', 'bitter', 'black', 'blue', 'bored', 'boring', 'brash', 'brave', 'brief', 'bright', 'broad', 'brown', 'calm', 'charming', 'cheap', 'clean', 'cold', 'cool', 'cruel', 'cute', 'damp', 'deep', 'dear', 'dead', 'dark', 'dirty', 'drunk', 'dull', 'eager', 'efficient', 'even', 'faint', 'fair', 'fanc', 'fast', 'fat', 'feeble', 'few', 'fierce', 'fine', 'flat', 'forgetful', 'frail', 'full', 'gentle', 'glib', 'great', 'green', 'gruesome', 'handsome', 'hard', 'harsh', 'high', 'hollow', 'hot', 'impolite', 'innocent', 'keen', 'kind', 'lame', 'lean', 'light', 'little', 'loose', 'long', 'loud', 'low', 'lush', 'macho', 'mean', 'meek', 'mellow', 'mundane', 'near', 'neat', 'new', 'nice', 'normal', 'odd', 'old', 'pale', 'pink', 'plain', 'poor', 'proud', 'purple', 'quick', 'rare', 'rapid', 'red', 'rich', 'ripe', 'rotten', 'round', 'rude', 'sad', 'safe', 'scarce', 'scared', 'shallow', 'sharp', 'short', 'shrill', 'simple', 'slim', 'slow', 'small', 'smart', 'smooth', 'soft', 'sore', 'sour', 'square', 'stale', 'steep', 'stiff', 'straight', 'strange', 'strong', 'sweet', 'swift', 'tall', 'tame', 'tart', 'tender', 'tense', 'thick', 'thin', 'tight', 'tough', 'vague', 'vast', 'vulgar', 'warm', 'weak', 'wet', 'white', 'wide', 'wild', 'wise', 'young', 'yellow', 'easy', 'narrow', 'late', 'early', 'soon', 'close', 'empty', 'dry', 'windy', 'noisy', 'thirsty', 'hungry', 'fresh', 'quiet', 'clear', 'heavy', 'happy', 'funny', 'lucky', 'pretty', 'important', 'interesting', 'attractive', 'dangerous', 'intellegent', 'pure', 'orange', 'large', 'firm', 'grand', 'formal', 'raw', 'weird', 'glad', 'mad', 'strict', 'tired', 'solid', 'extreme', 'mature', 'true', 'free', 'curly', 'angry'].reduce(function (h, s) {
  h[s] = 'Adjective';
  return h;
}, {});

},{}],5:[function(require,module,exports){
'use strict';
//terms that are 'Date' term

var months = ['january', 'february',
// "march",  //ambig
'april',
// "may",   //ambig
'june', 'july', 'august', 'september', 'october', 'november', 'december', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'sep'];
var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
module.exports = {
  days: days,
  months: months
};

},{}],6:[function(require,module,exports){
'use strict';

//adjectival forms of place names, as adjectives.
module.exports = ['afghan', 'albanian', 'algerian', 'argentine', 'armenian', 'australian', 'aussie', 'austrian', 'bangladeshi', 'belgian', 'bolivian', 'bosnian', 'brazilian', 'bulgarian', 'cambodian', 'canadian', 'chilean', 'chinese', 'colombian', 'croat', 'cuban', 'czech', 'dominican', 'egyptian', 'british', 'estonian', 'ethiopian', 'finnish', 'french', 'gambian', 'georgian', 'german', 'greek', 'haitian', 'hungarian', 'indian', 'indonesian', 'iranian', 'iraqi', 'irish', 'israeli', 'italian', 'jamaican', 'japanese', 'jordanian', 'kenyan', 'korean', 'kuwaiti', 'latvian', 'lebanese', 'liberian', 'libyan', 'lithuanian', 'macedonian', 'malaysian', 'mexican', 'mongolian', 'moroccan', 'dutch', 'nicaraguan', 'nigerian', 'norwegian', 'omani', 'pakistani', 'palestinian', 'filipino', 'polish', 'portuguese', 'qatari', 'romanian', 'russian', 'rwandan', 'samoan', 'saudi', 'scottish', 'senegalese', 'serbian', 'singaporean', 'slovak', 'somali', 'sudanese', 'swedish', 'swiss', 'syrian', 'taiwanese', 'thai', 'tunisian', 'ugandan', 'ukrainian', 'american', 'hindi', 'spanish', 'venezuelan', 'vietnamese', 'welsh', 'african', 'european', 'asian', 'californian'];

},{}],7:[function(require,module,exports){
// common first-names in compressed form.
//from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
//not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names
//used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
//used to identify gender for coreference resolution
'use strict';

var main = [];

//an ad-hoc prefix encoding for names. 2ms decompression of names
var male_names = {
  'will': 'iam,ie,ard,is,iams',
  'fred': ',erick,die,rick,dy',
  'marc': 'us,,o,os,el',
  'darr': 'ell,yl,en,el,in',
  'fran': 'k,cis,cisco,klin,kie',
  'terr': 'y,ance,ence,ell',
  'rand': 'y,all,olph,al',
  'brad': 'ley,,ford,y',
  'jeff': 'rey,,ery,ry',
  'john': ',ny,nie,athan',
  'greg': 'ory,,g,orio',
  'mar': 'k,tin,vin,io,shall,ty,lon,lin',
  'car': 'l,los,lton,roll,y,ey',
  'ken': 'neth,,t,ny,dall,drick',
  'har': 'old,ry,vey,ley,lan,rison',
  'ste': 'ven,phen,ve,wart,phan,rling',
  'jer': 'ry,emy,ome,emiah,maine,ald',
  'mic': 'hael,heal,ah,key,hel',
  'dar': 'yl,in,nell,win,ius',
  'dan': 'iel,ny,,e',
  'wil': 'bur,son,bert,fred,fredo',
  'ric': 'hard,ky,ardo,k,key',
  'cli': 'fford,nton,fton,nt,ff',
  'cla': 'rence,ude,yton,rk,y',
  'ben': 'jamin,,nie,ny,ito',
  'rod': 'ney,erick,olfo,ger,',
  'rob': 'ert,erto,bie,',
  'gar': 'y,ry,rett,land',
  'sam': 'uel,,my,mie',
  'and': 'rew,re,y,res',
  'jos': 'eph,e,hua,h',
  'joe': ',l,y,sph',
  'leo': 'nard,n,,nardo',
  'tom': ',my,as,mie',
  'bry': 'an,ant,ce,on',
  'ant': 'hony,onio,oine,on',
  'jac': 'k,ob,kson',
  'cha': 'rles,d,rlie,se',
  'sha': 'wn,ne,un',
  'bre': 'nt,tt,ndan,t',
  'jes': 'se,us,s',
  'al': 'bert,an,len,fred,exander,ex,vin,lan,fredo,berto,ejandro,fonso,ton,,onzo,i,varo',
  'ro': 'nald,ger,y,nnie,land,n,ss,osevelt,gelio,lando,man,cky,yce,scoe,ry',
  'de': 'nnis,rek,an,rrick,lbert,vin,wey,xter,wayne,metrius,nis,smond',
  'ja': 'mes,son,y,red,vier,ke,sper,mal,rrod',
  'el': 'mer,lis,bert,ias,ijah,don,i,ton,liot,liott,vin,wood',
  'ma': 'tthew,nuel,urice,thew,x,tt,lcolm,ck,son',
  'do': 'nald,uglas,n,nnie,ug,minic,yle,mingo,minick',
  'er': 'ic,nest,ik,nesto,ick,vin,nie,win',
  'ra': 'ymond,lph,y,mon,fael,ul,miro,phael',
  'ed': 'ward,win,die,gar,uardo,,mund,mond',
  'co': 'rey,ry,dy,lin,nrad,rnelius',
  'le': 'roy,wis,ster,land,vi',
  'lo': 'uis,nnie,renzo,ren,well,uie,u,gan',
  'da': 'vid,le,ve,mon,llas,mian,mien',
  'jo': 'nathan,n,rge,rdan,nathon,aquin',
  'ru': 'ssell,ben,dolph,dy,fus,ssel,sty',
  'ke': 'vin,ith,lvin,rmit',
  'ar': 'thur,nold,mando,turo,chie,mand',
  're': 'ginald,x,ynaldo,uben,ggie',
  'ge': 'orge,rald,ne,rard,offrey,rardo',
  'la': 'rry,wrence,nce,urence,mar,mont',
  'mo': 'rris,ses,nte,ises,nty',
  'ju': 'an,stin,lio,lian,lius,nior',
  'pe': 'ter,dro,rry,te,rcy',
  'tr': 'avis,oy,evor,ent',
  'he': 'nry,rbert,rman,ctor,ath',
  'no': 'rman,el,ah,lan,rbert',
  'em': 'anuel,il,ilio,mett,manuel',
  'wa': 'lter,yne,rren,llace,de',
  'mi': 'ke,guel,lton,tchell,les',
  'sa': 'lvador,lvatore,ntiago,ul,ntos',
  'ch': 'ristopher,ris,ester,ristian,uck',
  'pa': 'ul,trick,blo,t',
  'st': 'anley,uart,an',
  'hu': 'gh,bert,go,mberto',
  'br': 'ian,uce,andon,ain',
  'vi': 'ctor,ncent,rgil,cente',
  'ca': 'lvin,meron,leb',
  'gu': 'y,illermo,stavo',
  'lu': 'is,ther,ke,cas',
  'gr': 'ant,ady,over,aham',
  'ne': 'il,lson,al,d',
  't': 'homas,imothy,odd,ony,heodore,im,yler,ed,yrone,aylor,erence,immy,oby,eddy,yson',
  's': 'cott,ean,idney,ergio,eth,pencer,herman,ylvester,imon,heldon,cotty,olomon',
  'r': 'yan',
  'n': 'icholas,athan,athaniel,ick,icolas',
  'a': 'dam,aron,drian,ustin,ngelo,braham,mos,bel,gustin,ugust,dolfo',
  'b': 'illy,obby,arry,ernard,ill,ob,yron,lake,ert,oyd,illie,laine,art,uddy,urton',
  'e': 'ugene,arl,verett,nrique,van,arnest,frain,than,steban',
  'h': 'oward,omer,orace,ans,al',
  'p': 'hillip,hilip,reston,hil,ierre',
  'c': 'raig,urtis,lyde,ecil,esar,edric,leveland,urt',
  'j': 'immy,im,immie',
  'g': 'lenn,ordon,len,ilbert,abriel,ilberto',
  'm': 'elvin,yron,erle,urray',
  'k': 'yle,arl,urt,irk,ristopher',
  'o': 'scar,tis,liver,rlando,mar,wen,rville,tto',
  'l': 'loyd,yle,ionel',
  'f': 'loyd,ernando,elix,elipe,orrest,abian,idel',
  'w': 'esley,endell,m,oodrow,inston',
  'd': 'ustin,uane,wayne,wight,rew,ylan',
  'z': 'achary',
  'v': 'ernon,an,ance',
  'i': 'an,van,saac,ra,rving,smael,gnacio,rvin',
  'q': 'uentin,uinton',
  'x': 'avier'
};
var female_names = {
  'mari': 'a,e,lyn,an,anne,na,ssa,bel,sa,sol,tza',
  'kris': 'ten,tin,tina,ti,tine,ty,ta,tie',
  'jean': 'ette,ne,nette,nie,ine,nine',
  'chri': 'stine,stina,sty,stie,sta,sti',
  'marg': 'aret,ie,arita,uerite,ret,o',
  'ange': 'la,lica,lina,lia,line',
  'fran': 'ces,cine,cisca',
  'kath': 'leen,erine,y,ryn,arine',
  'sher': 'ry,ri,yl,i,rie',
  'caro': 'l,lyn,line,le,lina',
  'dian': 'e,a,ne,na',
  'jenn': 'ifer,ie,y,a',
  'luci': 'lle,a,nda,le',
  'kell': 'y,i,ey,ie',
  'rosa': ',lie,lind',
  'jani': 'ce,e,s,ne',
  'stac': 'y,ey,ie,i',
  'shel': 'ly,ley,ia',
  'laur': 'a,en,ie,el',
  'trac': 'y,ey,i,ie',
  'jane': 't,,lle,tte',
  'bett': 'y,ie,e,ye',
  'rose': 'mary,marie,tta',
  'joan': ',ne,n,na',
  'mar': 'y,tha,jorie,cia,lene,sha,yann,cella,ta,la,cy,tina',
  'lor': 'i,raine,etta,a,ena,ene,na,ie',
  'sha': 'ron,nnon,ri,wna,nna,na,una',
  'dor': 'othy,is,a,een,thy,othea',
  'cla': 'ra,udia,ire,rice,udette',
  'eli': 'zabeth,sa,sabeth,se,za',
  'kar': 'en,la,a,i,in',
  'tam': 'my,ara,i,mie,ika',
  'ann': 'a,,e,ie,ette',
  'car': 'men,rie,la,a,mela',
  'mel': 'issa,anie,inda',
  'ali': 'ce,cia,son,sha,sa',
  'bri': 'ttany,dget,ttney,dgette',
  'lyn': 'n,da,ne,ette',
  'del': 'ores,la,ia,oris',
  'ter': 'esa,ri,i',
  'son': 'ia,ya,ja,dra',
  'deb': 'orah,ra,bie,ora',
  'jac': 'queline,kie,quelyn,lyn',
  'lat': 'oya,asha,onya,isha',
  'che': 'ryl,lsea,ri,rie',
  'vic': 'toria,ki,kie,ky',
  'sus': 'an,ie,anne,ana',
  'rob': 'erta,yn',
  'est': 'her,elle,ella,er',
  'lea': 'h,,nne,nn',
  'lil': 'lian,lie,a,y',
  'ma': 'ureen,ttie,xine,bel,e,deline,ggie,mie,ble,ndy,ude,yra,nuela,vis,gdalena,tilda',
  'jo': 'yce,sephine,,di,dy,hanna,sefina,sie,celyn,lene,ni,die',
  'be': 'verly,rtha,atrice,rnice,th,ssie,cky,linda,ulah,rnadette,thany,tsy,atriz',
  'ca': 'therine,thy,ssandra,ndace,ndice,mille,itlin,ssie,thleen,llie',
  'le': 'slie,na,ona,ticia,igh,la,nora,ola,sley,ila',
  'el': 'aine,len,eanor,sie,la,ena,oise,vira,sa,va,ma',
  'sa': 'ndra,rah,ra,lly,mantha,brina,ndy,die,llie',
  'mi': 'chelle,ldred,chele,nnie,riam,sty,ndy,randa,llie',
  'co': 'nnie,lleen,nstance,urtney,ra,rinne,nsuelo,rnelia',
  'ju': 'lie,dith,dy,lia,anita,ana,stine',
  'da': 'wn,nielle,rlene,na,isy,rla,phne',
  're': 'becca,nee,na,bekah,ba',
  'al': 'ma,lison,berta,exandra,yssa,ta',
  'ra': 'chel,mona,chael,quel,chelle',
  'an': 'drea,ita,a,gie,toinette,tonia',
  'ge': 'raldine,rtrude,orgia,nevieve,orgina',
  'de': 'nise,anna,siree,na,ana,e',
  'ja': 'smine,na,yne',
  'lu': 'cy,z,la,pe,ella,isa',
  'je': 'ssica,nifer,well,ri',
  'ad': 'a,rienne,die,ele,riana,eline',
  'pa': 'tricia,mela,ula,uline,tsy,m,tty,ulette,tti,trice,trica,ige',
  'ke': 'ndra,rri,isha,ri',
  'mo': 'nica,lly,nique,na,llie',
  'lo': 'uise,is,la',
  'he': 'len,ather,idi,nrietta,lene,lena',
  'me': 'gan,rcedes,redith,ghan,agan',
  'wi': 'lma,lla,nnie',
  'ga': 'il,yle,briela,brielle,le',
  'er': 'in,ica,ika,ma,nestine',
  'ce': 'cilia,lia,celia,leste,cile',
  'ka': 'tie,y,trina,yla,te',
  'ol': 'ga,ivia,lie,a',
  'li': 'nda,sa,ndsay,ndsey,zzie',
  'na': 'ncy,talie,omi,tasha,dine',
  'la': 'verne,na,donna,ra',
  'vi': 'rginia,vian,ola',
  'ha': 'rriet,nnah',
  'pe': 'ggy,arl,nny,tra',
  'br': 'enda,andi,ooke',
  'ki': 'mberly,m,mberley,rsten',
  'au': 'drey,tumn,dra',
  'bo': 'nnie,bbie,nita,bbi',
  'do': 'nna,lores,lly,minique',
  'gl': 'oria,adys,enda,enna',
  'tr': 'icia,ina,isha,udy',
  'ta': 'ra,nya,sha,bitha',
  'ro': 'sie,xanne,chelle,nda',
  'am': 'y,anda,ber,elia',
  'fa': 'ye,nnie,y',
  'ni': 'cole,na,chole,kki',
  've': 'ronica,ra,lma,rna',
  'gr': 'ace,etchen,aciela,acie',
  'b': 'arbara,lanca,arbra,ianca',
  'r': 'uth,ita,honda',
  's': 'hirley,tephanie,ylvia,heila,uzanne,ue,tella,ophia,ilvia,ophie,tefanie,heena,ummer,elma,ocorro,ybil,imone',
  'c': 'ynthia,rystal,indy,harlene,ristina,leo',
  'e': 'velyn,mily,dna,dith,thel,mma,va,ileen,unice,ula,ssie,ffie,tta,ugenia',
  'a': 'shley,pril,gnes,rlene,imee,bigail,ida,bby,ileen',
  't': 'heresa,ina,iffany,helma,onya,oni,herese,onia',
  'i': 'rene,da,rma,sabel,nez,ngrid,va,mogene,sabelle',
  'w': 'anda,endy,hitney',
  'p': 'hyllis,riscilla,olly',
  'n': 'orma,ellie,ora,ettie,ell',
  'f': 'lorence,elicia,lora,reda,ern,rieda',
  'v': 'alerie,anessa',
  'j': 'ill,illian',
  'y': 'vonne,olanda,vette',
  'g': 'ina,wendolyn,wen,oldie',
  'l': 'ydia',
  'm': 'yrtle,yra,uriel,yrna',
  'h': 'ilda',
  'o': 'pal,ra,felia',
  'k': 'rystal',
  'd': 'ixie,ina',
  'u': 'rsula'
};
var ambiguous = ['casey', 'jamie', 'lee', 'jaime', 'jessie', 'morgan', 'rene', 'robin', 'devon', 'kerry', 'alexis', 'guadalupe', 'blair', 'kasey', 'jean', 'marion', 'aubrey', 'shelby', 'jan', 'shea', 'jade', 'kenyatta', 'kelsey', 'shay', 'lashawn', 'trinity', 'regan', 'jammie', 'cassidy', 'cheyenne', 'reagan', 'shiloh', 'marlo', 'andra', 'devan', 'rosario', 'lee'];

//add data into the main obj
//males
var keys = Object.keys(male_names);
var l = keys.length;
for (var i = 0; i < l; i++) {
  var arr = male_names[keys[i]].split(',');
  for (var i2 = 0; i2 < arr.length; i2++) {
    main[keys[i] + arr[i2]] = 'm';
  }
}

//females
keys = Object.keys(female_names);
l = keys.length;
for (var i = 0; i < l; i++) {
  var arr = female_names[keys[i]].split(',');
  for (var i2 = 0; i2 < arr.length; i2++) {
    main[keys[i] + arr[i2]] = 'f';
  }
}
//unisex names
l = ambiguous.length;
for (var i = 0; i < l; i += 1) {
  main[ambiguous[i]] = 'a';
}
// console.log(firstnames['spencer'])
// console.log(firstnames['jill'])
// console.log(firstnames['sue'])
// console.log(firstnames['jan'])
// console.log(JSON.stringify(Object.keys(firstnames).length, null, 2));

module.exports = main;

},{}],8:[function(require,module,exports){
'use strict';

//these are common person titles used in the lexicon and sentence segmentation methods
//they are also used to identify that a noun is a person
module.exports = [
//honourifics
'jr', 'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'sen', 'corp', 'rep', 'gov', 'atty', 'supt', 'det', 'rev', 'col', 'gen', 'lt', 'cmdr', 'adm', 'capt', 'sgt', 'cpl', 'maj', 'miss', 'misses', 'mister', 'sir', 'esq', 'mstr', 'phd', 'adj', 'adv', 'asst', 'bldg', 'brig', 'comdr', 'hon', 'messrs', 'mlle', 'mme', 'op', 'ord', 'pvt', 'reps', 'res', 'sens', 'sfc', 'surg'];

},{}],9:[function(require,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';

var main = [['child', '_ren'], ['person', 'people'], ['leaf', 'leaves'], ['database', '_s'], ['quiz', '_zes'], ['stomach', '_s'], ['sex', '_es'], ['move', '_s'], ['shoe', '_s'], ['goose', 'geese'], ['phenomenon', 'phenomena'], ['barracks', '_'], ['deer', '_'], ['syllabus', 'syllabi'], ['index', 'indices'], ['appendix', 'appendices'], ['criterion', 'criteria'], ['man', 'men'], ['sex', '_es'], ['rodeo', '_s'], ['epoch', '_s'], ['zero', '_s'], ['avocado', '_s'], ['halo', '_s'], ['tornado', '_s'], ['tuxedo', '_s'], ['sombrero', '_s'], ['addendum', 'addenda'], ['alga', '_e'], ['alumna', '_e'], ['alumnus', 'alumni'], ['bacillus', 'bacilli'], ['cactus', 'cacti'], ['beau', '_x'], ['château', '_x'], ['chateau', '_x'], ['tableau', '_x'], ['corpus', 'corpora'], ['curriculum', 'curricula'], ['echo', '_es'], ['embargo', '_es'], ['foot', 'feet'], ['genus', 'genera'], ['hippopotamus', 'hippopotami'], ['larva', '_e'], ['libretto', 'libretti'], ['loaf', 'loaves'], ['matrix', 'matrices'], ['memorandum', 'memoranda'], ['mosquito', '_es'], ['opus', 'opera'], ['ovum', 'ova'], ['ox', '_en'], ['radius', 'radii'], ['referendum', 'referenda'], ['thief', 'thieves'], ['tooth', 'teeth']];

main = main.map(function (a) {
  a[1] = a[1].replace('_', a[0]);
  return a;
});

module.exports = main;

},{}],10:[function(require,module,exports){
'use strict';

//a list of exceptions to the verb rules
var irregular_verbs = {
  arise: {
    past: 'arose',
    participle: 'arisen'
  },
  babysit: {
    past: 'babysat',
    actor: 'babysitter'
  },
  be: {
    past: 'was',
    present: 'am',
    future: 'will be',
    perfect: 'have been',
    pluperfect: 'had been',
    future_perfect: 'will have been',
    actor: '',
    gerund: 'am'
  },
  is: {
    past: 'was',
    present: 'is',
    future: 'will be',
    perfect: 'have been',
    pluperfect: 'had been',
    future_perfect: 'will have been',
    actor: '',
    gerund: 'being'
  },
  beat: {
    gerund: 'beating',
    actor: 'beater'
  },
  begin: {
    gerund: 'beginning',
    past: 'began'
  },
  bet: {
    actor: 'better'
  },
  bind: {
    past: 'bound'
  },
  bite: {
    gerund: 'biting',
    past: 'bit'
  },
  bleed: {
    past: 'bled'
  },
  break: {
    past: 'broke'
  },
  breed: {
    past: 'bred'
  },
  bring: {
    past: 'brought'
  },
  broadcast: {
    past: 'broadcast'
  },
  build: {
    past: 'built'
  },
  buy: {
    past: 'bought'
  },
  catch: {
    past: 'caught'
  },
  choose: {
    gerund: 'choosing',
    past: 'chose'
  },
  cost: {
    past: 'cost'
  },
  deal: {
    past: 'dealt'
  },
  die: {
    past: 'died',
    gerund: 'dying'
  },
  dig: {
    gerund: 'digging',
    past: 'dug'
  },
  do: {
    past: 'did',
    present: 'does'
  },
  draw: {
    past: 'drew'
  },
  drink: {
    past: 'drank'
  },
  drive: {
    gerund: 'driving',
    past: 'drove'
  },
  eat: {
    gerund: 'eating',
    past: 'ate',
    actor: 'eater'
  },
  fall: {
    past: 'fell'
  },
  feed: {
    past: 'fed'
  },
  feel: {
    past: 'felt',
    actor: 'feeler'
  },
  fight: {
    past: 'fought'
  },
  find: {
    past: 'found'
  },
  fly: {
    past: 'flew'
  },
  forbid: {
    past: 'forbade'
  },
  forget: {
    gerund: 'forgeting',
    past: 'forgot'
  },
  forgive: {
    gerund: 'forgiving',
    past: 'forgave'
  },
  freeze: {
    gerund: 'freezing',
    past: 'froze'
  },
  get: {
    past: 'got'
  },
  give: {
    gerund: 'giving',
    past: 'gave'
  },
  go: {
    past: 'went',
    present: 'goes'
  },
  hang: {
    past: 'hung'
  },
  have: {
    gerund: 'having',
    past: 'had',
    present: 'has'
  },
  hear: {
    past: 'heard'
  },
  hide: {
    past: 'hid'
  },
  hold: {
    past: 'held'
  },
  hurt: {
    past: 'hurt'
  },
  lay: {
    past: 'laid'
  },
  lead: {
    past: 'led'
  },
  leave: {
    past: 'left'
  },
  lie: {
    gerund: 'lying',
    past: 'lay'
  },
  light: {
    past: 'lit'
  },
  lose: {
    gerund: 'losing',
    past: 'lost'
  },
  make: {
    past: 'made'
  },
  mean: {
    past: 'meant'
  },
  meet: {
    gerund: 'meeting',
    past: 'met',
    actor: 'meeter'
  },
  pay: {
    past: 'paid'
  },
  read: {
    past: 'read'
  },
  ring: {
    past: 'rang'
  },
  rise: {
    past: 'rose'
  },
  run: {
    gerund: 'running',
    past: 'ran'
  },
  say: {
    past: 'said'
  },
  see: {
    past: 'saw'
  },
  sell: {
    past: 'sold'
  },
  shine: {
    past: 'shone'
  },
  shoot: {
    past: 'shot'
  },
  show: {
    past: 'showed'
  },
  sing: {
    past: 'sang'
  },
  sink: {
    past: 'sank'
  },
  sit: {
    past: 'sat'
  },
  slide: {
    past: 'slid'
  },
  speak: {
    past: 'spoke'
  },
  spin: {
    gerund: 'spinning',
    past: 'spun'
  },
  spread: {
    past: 'spread'
  },
  stand: {
    past: 'stood'
  },
  steal: {
    past: 'stole',
    actor: 'stealer'
  },
  stick: {
    past: 'stuck'
  },
  sting: {
    past: 'stung'
  },
  strike: {
    gerund: 'striking',
    past: 'struck'
  },
  swear: {
    past: 'swore'
  },
  swim: {
    past: 'swam'
  },
  swing: {
    past: 'swung'
  },
  teach: {
    past: 'taught',
    present: 'teaches'
  },
  tear: {
    past: 'tore'
  },
  tell: {
    past: 'told'
  },
  think: {
    past: 'thought'
  },
  understand: {
    past: 'understood'
  },
  wake: {
    past: 'woke'
  },
  wear: {
    past: 'wore'
  },
  win: {
    gerund: 'winning',
    past: 'won'
  },
  withdraw: {
    past: 'withdrew'
  },
  write: {
    gerund: 'writing',
    past: 'wrote'
  },
  tie: {
    gerund: 'tying',
    past: 'tied'
  },
  ski: {
    past: 'skiied'
  },
  boil: {
    actor: 'boiler'
  },
  miss: {
    present: 'miss'
  },
  act: {
    actor: 'actor'
  },
  compete: {
    gerund: 'competing',
    past: 'competed',
    actor: 'competitor'
  },
  being: {
    gerund: 'are',
    past: 'were',
    present: 'are'
  },
  imply: {
    past: 'implied',
    present: 'implies'
  },
  ice: {
    gerund: 'icing',
    past: 'iced'
  },
  develop: {
    past: 'develop',
    actor: 'developer'
  },
  wait: {
    gerund: 'waiting',
    past: 'waited',
    actor: 'waiter'
  },
  aim: {
    actor: 'aimer'
  },
  spill: {
    past: 'spilt'
  },
  drop: {
    gerund: 'dropping',
    past: 'dropped'
  },
  log: {
    gerund: 'logging',
    past: 'logged'
  },
  rub: {
    gerund: 'rubbing',
    past: 'rubbed'
  },
  smash: {
    present: 'smashes'
  },
  suit: {
    gerund: 'suiting',
    past: 'suited',
    actor: 'suiter'
  }
};
module.exports = irregular_verbs;

},{}],11:[function(require,module,exports){
'use strict';

var misc = {

  'etc': 'FW', //foreign words
  'ie': 'FW',

  'there': 'NN',

  'better': 'JJR',
  'earlier': 'JJR',

  'has': 'VB',
  'more': 'RB',

  'sounds': 'VBZ'
};

var compact = {
  //conjunctions
  'CC': ['yet', 'therefore', 'or', 'while', 'nor', 'whether', 'though', 'because', 'but', 'for', 'and', 'if', 'however', 'before', 'although', 'how', 'plus', 'versus', 'not'],

  'VBD': ['where\'d', 'when\'d', 'how\'d', 'what\'d', 'said', 'had', 'been', 'began', 'came', 'did', 'meant', 'went'],

  'VBN': ['given', 'known', 'shown', 'seen', 'born'],

  'VBG': ['going', 'being', 'according', 'resulting', 'developing', 'staining'],

  //copula
  'CP': ['is', 'will be', 'are', 'was', 'were', 'am', 'isn\'t', 'ain\'t', 'aren\'t'],

  //determiners
  'DT': ['this', 'any', 'enough', 'each', 'whatever', 'every', 'which', 'these', 'another', 'plenty', 'whichever', 'neither', 'an', 'a', 'least', 'own', 'few', 'both', 'those', 'the', 'that', 'various', 'what', 'either', 'much', 'some', 'else', 'no',
  //some other languages (what could go wrong?)
  'la', 'le', 'les', 'des', 'de', 'du', 'el'],

  //prepositions
  'IN': ['until', 'onto', 'of', 'into', 'out', 'except', 'across', 'by', 'between', 'at', 'down', 'as', 'from', 'around', 'with', 'among', 'upon', 'amid', 'to', 'along', 'since', 'about', 'off', 'on', 'within', 'in', 'during', 'per', 'without', 'throughout', 'through', 'than', 'via', 'up', 'unlike', 'despite', 'below', 'unless', 'towards', 'besides', 'after', 'whereas', '\'o', 'amidst', 'amongst', 'apropos', 'atop', 'barring', 'chez', 'circa', 'mid', 'midst', 'notwithstanding', 'qua', 'sans', 'vis-a-vis', 'thru', 'till', 'versus', 'without', 'w/o', 'o\'', 'a\''],

  //modal verbs
  'MD': ['can', 'may', 'could', 'might', 'will', 'ought to', 'would', 'must', 'shall', 'should', 'ought', 'shouldn\'t', 'wouldn\'t', 'couldn\'t', 'mustn\'t', 'shan\'t', 'shant', 'lets', //arguable
  'who\'d', 'let\'s'],

  //posessive pronouns
  'PP': ['mine', 'something', 'none', 'anything', 'anyone', 'theirs', 'himself', 'ours', 'his', 'my', 'their', 'yours', 'your', 'our', 'its', 'nothing', 'herself', 'hers', 'themselves', 'everything', 'myself', 'itself', 'her', //this one is pretty ambiguous
  'who', 'whom', 'whose'],

  //personal pronouns (nouns)
  'PRP': ['it', 'they', 'i', 'them', 'you', 'she', 'me', 'he', 'him', 'ourselves', 'us', 'we', 'thou', 'il', 'elle', 'yourself', '\'em'],

  //some manual adverbs (the rest are generated)
  'RB': ['now', 'again', 'already', 'soon', 'directly', 'toward', 'forever', 'apart', 'instead', 'yes', 'alone', 'ago', 'indeed', 'ever', 'quite', 'perhaps', 'where', 'then', 'here', 'thus', 'very', 'often', 'once', 'never', 'why', 'when', 'away', 'always', 'sometimes', 'also', 'maybe', 'so', 'just', 'well', 'several', 'such', 'randomly', 'too', 'rather', 'abroad', 'almost', 'anyway', 'twice', 'aside', 'moreover', 'anymore', 'newly', 'damn', 'somewhat', 'somehow', 'meanwhile', 'hence', 'further', 'furthermore'],

  //interjections
  'UH': ['uhh', 'uh-oh', 'please', 'ugh', 'sheesh', 'eww', 'pff', 'voila', 'oy', 'eep', 'hurrah', 'yuck', 'ow', 'duh', 'oh', 'hmm', 'yeah', 'whoa', 'ooh', 'whee', 'ah', 'bah', 'gah', 'yaa', 'phew', 'gee', 'ahem', 'eek', 'meh', 'yahoo', 'oops', 'd\'oh', 'psst', 'argh', 'grr', 'nah', 'shhh', 'whew', 'mmm', 'yay', 'uh-huh', 'boo', 'wow', 'nope'],

  //nouns that shouldnt be seen as a verb
  'NN': ['president', 'dollar', 'student', 'patent', 'funding', 'morning', 'banking', 'ceiling', 'energy', 'secretary', 'purpose', 'friends', 'event']
};
//unpack the compact terms into the misc lexicon..
var keys = Object.keys(compact);
for (var i = 0; i < keys.length; i++) {
  var arr = compact[keys[i]];
  for (var i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
// console.log(misc.a);
module.exports = misc;

},{}],12:[function(require,module,exports){
'use strict';

//common terms that are multi-word, but one part-of-speech
//these should not include phrasal verbs, like 'looked out'. These are handled elsewhere.
module.exports = {
  'of course': 'RB',
  'at least': 'RB',
  'no longer': 'RB',
  'sort of': 'RB',
  'at first': 'RB',
  'once again': 'RB',
  'once more': 'RB',
  'up to': 'RB',
  'by now': 'RB',
  'all but': 'RB',
  'just about': 'RB',
  'on board': 'JJ',
  'a lot': 'RB',
  'by far': 'RB',
  'at best': 'RB',
  'at large': 'RB',
  'for good': 'RB',
  'vice versa': 'JJ',
  'en route': 'JJ',
  'for sure': 'RB',
  'upside down': 'JJ',
  'at most': 'RB',
  'per se': 'RB',
  'at worst': 'RB',
  'upwards of': 'RB',
  'en masse': 'RB',
  'point blank': 'RB',
  'up front': 'JJ',
  'in situ': 'JJ',
  'in vitro': 'JJ',
  'ad hoc': 'JJ',
  'de facto': 'JJ',
  'ad infinitum': 'JJ',
  'ad nauseam': 'RB',
  'for keeps': 'JJ',
  'a priori': 'FW',
  'et cetera': 'FW',
  'off guard': 'JJ',
  'spot on': 'JJ',
  'ipso facto': 'JJ',
  'not withstanding': 'RB',
  'de jure': 'RB',
  'a la': 'IN',
  'ad hominem': 'NN',
  'par excellence': 'RB',
  'de trop': 'RB',
  'a posteriori': 'RB',
  'fed up': 'JJ',
  'brand new': 'JJ',
  'old fashioned': 'JJ',
  'bona fide': 'JJ',
  'well off': 'JJ',
  'far off': 'JJ',
  'straight forward': 'JJ',
  'hard up': 'JJ',
  'sui generis': 'JJ',
  'en suite': 'JJ',
  'avant garde': 'JJ',
  'sans serif': 'JJ',
  'gung ho': 'JJ',
  'super duper': 'JJ',
  'new york': 'NN',
  'new england': 'NN',
  'new hampshire': 'NN',
  'new delhi': 'NN',
  'new jersey': 'NN',
  'new mexico': 'NN',
  'united states': 'NN',
  'united kingdom': 'NN',
  'great britain': 'NN',
  'head start': 'NN'
};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = [
//numbers
'minus', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion'];

},{}],14:[function(require,module,exports){
'use strict';
//just a few named-organisations
//no acronyms needed. no product/brand pollution.

var organisations = ['google', 'microsoft', 'walmart', 'exxonmobil', 'glencore', 'samsung', 'chevron', 'at&t', 'verizon', 'costco', 'nestlé', '7-eleven', 'adidas', 'nike', 'acer', 'mcdonalds', 'mcdonald\'s', 'comcast', 'compaq', 'craigslist', 'cisco', 'disney', 'coca cola', 'dupont', 'ebay', 'facebook', 'fedex', 'kmart', 'kodak', 'monsanto', 'myspace', 'netflix', 'sony', 'telus', 'twitter', 'usps', 'ubs', 'ups', 'walgreens', 'youtube', 'yahoo!', 'yamaha'];

var suffixes = ['center', 'centre', 'memorial', 'school', 'university', 'bank', 'college', 'house', 'foundation', 'department', 'institute', 'club', 'co', 'sons'];

module.exports = {
  suffixes: suffixes,
  organisations: organisations
};

},{}],15:[function(require,module,exports){
//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
'use strict';

var verb_conjugate = require('../term/verb/conjugate/conjugate.js');

//start the list with some randoms
var main = ['be onto', 'fall behind', 'fall through', 'fool with', 'get across', 'get along', 'get at', 'give way', 'hear from', 'hear of', 'lash into', 'make do', 'run across', 'set upon', 'take aback', 'keep from'];

//if there's a phrasal verb "keep on", there's often a "keep off"
var opposites = {
  'away': 'back',
  'in': 'out',
  'on': 'off',
  'over': 'under',
  'together': 'apart',
  'up': 'down'
};

//forms that have in/out symmetry
var symmetric = {
  'away': 'blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw',
  'in': 'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,rain,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel',
  'on': 'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait',
  'over': 'come,go,look,read,run,talk',
  'together': 'come,pull,put',
  'up': 'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,turn,use,wash,wind'
};
Object.keys(symmetric).forEach(function (k) {
  symmetric[k].split(',').forEach(function (s) {
    //add the given form
    main.push(s + ' ' + k);
    //add its opposite form
    main.push(s + ' ' + opposites[k]);
  });
});

//forms that don't have in/out symmetry
var asymmetric = {
  'about': 'bring,fool,gad,go,root',
  'after': 'go,look,take',
  'ahead': 'get,go,press',
  'along': 'bring,move',
  'apart': 'fall,take',
  'around': 'ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play',
  'away': 'back,carry,file,frighten,hide,wash',
  'back': 'fall,fight,hit,hold,look,pay,stand,think',
  'by': 'drop,get,go,stop,swear,swing,tick,zip',
  'down': 'bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear',
  'for': 'fend,file,gun,hanker,root,shoot',
  'forth': 'bring,come',
  'forward': 'come,look',
  'in': 'cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero',
  'into': 'look,run',
  'it': 'go,have',
  'off': 'auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write',
  'on': 'bank,bargain,egg,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer',
  'out': 'act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk',
  'over': 'bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip',
  'round': 'get,go',
  'through': 'go,run',
  'to': 'keep,see',
  'up': 'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip'
};
Object.keys(asymmetric).forEach(function (k) {
  asymmetric[k].split(',').forEach(function (s) {
    main.push(s + ' ' + k);
  });
});

//at his point all verbs are infinitive. lets make this explicit.
main = main.reduce(function (h, s) {
  h[s] = 'VBP';
  return h;
}, {});

//conjugate every phrasal verb. takes ~30ms
var tags = {
  present: 'VB',
  past: 'VBD',
  future: 'VBF',
  gerund: 'VBG',
  infinitive: 'VBP'
};
var cache = {}; //cache individual verbs to speed it up
var split = undefined,
    verb = undefined,
    particle = undefined,
    phrasal = undefined;
Object.keys(main).forEach(function (s) {
  split = s.split(' ');
  verb = split[0];
  particle = split[1];
  if (cache[verb] === undefined) {
    cache[verb] = verb_conjugate(verb);
  }
  Object.keys(cache[verb]).forEach(function (k) {
    phrasal = cache[verb][k] + ' ' + particle;
    if (tags[k]) {
      main[phrasal] = tags[k];
    }
  });
});

// console.log(main["wiring up"] === "VBG")
module.exports = main;

},{"../term/verb/conjugate/conjugate.js":74}],16:[function(require,module,exports){
'use strict';

var countries = ['china', 'india', 'america', 'united states', 'usa', 'u.s.a.', 'ussr', 'united states of america', 'indonesia', 'brazil', 'pakistan', 'nigeria', 'bangladesh', 'russia', 'japan', 'mexico', 'philippines', 'vietnam', 'ethiopia', 'egypt', 'germany', 'iran', 'turkey', 'dr congo', 'thailand', 'france', 'united kingdom', 'italy', 'myanmar', 'south africa', 'south korea', 'colombia', 'spain', 'ukraine', 'tanzania', 'kenya', 'argentina', 'algeria', 'poland', 'sudan', 'uganda', 'canada', 'iraq', 'morocco', 'peru', 'uzbekistan', 'saudi arabia', 'malaysia', 'venezuela', 'nepal', 'afghanistan', 'yemen', 'north korea', 'ghana', 'mozambique', 'taiwan', 'australia', 'syria', 'madagascar', 'angola', 'cameroon', 'sri lanka', 'romania', 'burkina faso', 'niger', 'kazakhstan', 'netherlands', 'chile', 'malawi', 'ecuador', 'guatemala', 'côte d\'ivoire', 'mali', 'cambodia', 'senegal', 'zambia', 'zimbabwe', 'chad', 'south sudan', 'belgium', 'cuba', 'tunisia', 'guinea', 'greece', 'rwanda', 'czech republic', 'somalia', 'portugal', 'haiti', 'benin', 'burundi', 'bolivia', 'hungary', 'sweden', 'belarus', 'dominican republic', 'azerbaijan', 'honduras', 'austria', 'united arab emirates', 'israel', 'switzerland', 'tajikistan', 'bulgaria', 'serbia', 'papua new guinea', 'paraguay', 'laos', 'jordan', 'el salvador', 'eritrea', 'libya', 'togo', 'sierra leone', 'nicaragua', 'kyrgyzstan', 'denmark', 'finland', 'slovakia', 'turkmenistan', 'norway', 'lebanon', 'costa rica', 'central african republic', 'republic of ireland', 'new zealand', 'georgia', 'congo-brazzaville', 'palestine', 'liberia', 'croatia', 'oman', 'bosnia and herzegovina', 'kuwait', 'moldova', 'mauritania', 'panama', 'uruguay', 'armenia', 'lithuania', 'albania', 'mongolia', 'jamaica', 'namibia', 'lesotho', 'qatar', 'macedonia', 'slovenia', 'botswana', 'latvia', 'gambia', 'guinea-bissau', 'gabon', 'equatorial guinea', 'trinidad-tobago', 'estonia', 'mauritius', 'swaziland', 'bahrain', 'timor-leste', 'djibouti', 'cyprus', 'fiji', 'guyana', 'comoros', 'bhutan', 'solomon islands', 'luxembourg', 'suriname', 'cape verde', 'malta', 'bahamas', 'iceland'];

var cities = ['shanghai', 'beijing', 'guangzhou', 'tianjin', 'shenzhen', 'mumbai', 'new delhi', 'chennai', 'bangalore', 'ahmedabad', 'new york', 'los angeles', 'chicago', 'houston', 'philadelphia', 'phoenix', 'jakarta', 'rio de janeiro', 'salvador', 'brasília', 'curitiba', 'karachi', 'dhaka', 'chittagong', 'moscow', 'saint petersburg', 'yekaterinburg', 'tokyo', 'yokohama', 'osaka', 'nagoya', 'sapporo', 'kobe', 'mexico', 'guadalajara', 'puebla', 'manila', 'cebu', 'ho chi minh', 'hanoi', 'cairo', 'alexandria', 'giza', 'berlin', 'hamburg', 'munich', 'cologne', 'frankfurt', 'stuttgart', 'tehran', 'karaj', 'istanbul', 'ankara', 'i̇zmir', 'bursa', 'bangkok', 'chiang mai', 'paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'london', 'birmingham', 'manchester', 'liverpool', 'rome', 'milan', 'naples', 'turin', 'palermo', 'genoa', 'yangon', 'mandalay', 'cape town', 'port elizabeth', 'pretoria', 'durban', 'seoul', 'busan', 'incheon', 'daegu', 'daejeon', 'bogotá', 'medellín', 'barranquilla', 'madrid', 'barcelona', 'valencia', 'seville', 'zaragoza', 'kiev', 'kharkiv', 'odessa', 'dnipropetrovsk', 'lviv', 'buenos aires', 'rosario', 'la plata', 'warsaw', 'kraków', 'łódź', 'wrocław', 'poznań', 'gdańsk', 'kampala', 'toronto', 'vancouver', 'calgary', 'ottawa', 'edmonton', 'fes', 'tangier', 'lima', 'kuala lumpur', 'caracas', 'kabul', 'sana\'a', 'pyongyang', 'new taipei', 'kaohsiung', 'taichung', 'taipei', 'tainan', 'sydney', 'melbourne', 'brisbane', 'perth', 'damascus', 'homs', 'colombo', 'kandy', 'bucharest', 'timișoara', 'iași', 'cluj-napoca', 'constanța', 'craiova', 'hauts-bassins region', 'nord region', 'almaty', 'amsterdam', 'the hague', 'rotterdam', 'utrecht', 'eindhoven', 'tilburg', 'santiago', 'quito', 'guatemala', 'abidjan', 'phnom penh', 'dakar', 'antwerp', 'ghent', 'charleroi', 'liège', 'brussels', 'havana', 'tunis', 'athens', 'thessaloniki', 'piraeus', 'patras', 'heraklion', 'prague', 'brno', 'pilsen', 'lisbon', 'porto', 'budapest', 'miskolc', 'stockholm', 'gothenburg', 'malmö', 'västerås', 'minsk', 'baku', 'tegucigalpa', 'vienna', 'graz', 'linz', 'salzburg', 'innsbruck', 'abu dhabi', 'tel aviv', 'haifa', 'ashdod', 'petah tikva', 'zürich', 'geneva', 'basel', 'lausanne', 'bern', 'winterthur', 'dushanbe', 'sofia', 'varna', 'burgas', 'belgrade', 'niš', 'amman', 'aqaba', 'san salvador', 'copenhagen', 'aarhus', 'aalborg', 'helsinki', 'espoo', 'tampere', 'vantaa', 'turku', 'bratislava', 'košice', 'ashgabat', 'oslo', 'bergen', 'trondheim', 'beirut', 'san josé', 'dublin', 'cork', 'auckland', 'christchurch', 'wellington', 'hamilton', 'dunedin', 'tbilisi', 'zagreb', 'split', 'banja luka', 'kuwait', 'chișinău', 'panama', 'montevideo', 'yerevan', 'vilnius', 'kaunas', 'klaipėda', 'tirana', 'ulan bator', 'doha', 'skopje', 'ljubljana', 'maribor', 'riga', 'daugavpils', 'tallinn', 'tartu', 'nicosia', 'limassol', 'luxembourg', 'reykjavik', 'kópavogur'];

module.exports = {
  countries: countries,
  cities: cities
};

},{}],17:[function(require,module,exports){
'use strict';

//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = ['aircraft', 'bass', 'bison', 'fowl', 'halibut', 'moose', 'salmon', 'spacecraft', 'tuna', 'trout', 'advice', 'information', 'knowledge', 'trouble', 'enjoyment', 'fun', 'recreation', 'relaxation', 'meat', 'rice', 'bread', 'cake', 'coffee', 'ice', 'water', 'oil', 'grass', 'hair', 'fruit', 'wildlife', 'equipment', 'machinery', 'furniture', 'mail', 'luggage', 'jewelry', 'clothing', 'money', 'mathematics', 'economics', 'physics', 'civics', 'ethics', 'gymnastics', 'mumps', 'measles', 'news', 'tennis', 'baggage', 'currency', 'soap', 'toothpaste', 'food', 'sugar', 'butter', 'flour', 'research', 'leather', 'wool', 'wood', 'coal', 'weather', 'homework', 'cotton', 'silk', 'patience', 'impatience', 'vinegar', 'art', 'beef', 'blood', 'cash', 'chaos', 'cheese', 'chewing', 'conduct', 'confusion', 'education', 'electricity', 'entertainment', 'fiction', 'forgiveness', 'gold', 'gossip', 'ground', 'happiness', 'history', 'honey', 'hospitality', 'importance', 'justice', 'laughter', 'leisure', 'lightning', 'literature', 'luck', 'melancholy', 'milk', 'mist', 'music', 'noise', 'oxygen', 'paper', 'pay', 'peace', 'peanut', 'pepper', 'petrol', 'plastic', 'pork', 'power', 'pressure', 'rain', 'recognition', 'sadness', 'safety', 'salt', 'sand', 'scenery', 'shopping', 'silver', 'snow', 'softness', 'space', 'speed', 'steam', 'sunshine', 'tea', 'thunder', 'time', 'traffic', 'trousers', 'violence', 'warmth', 'wine', 'steel', 'soccer', 'hockey', 'golf', 'fish', 'gum', 'liquid', 'series', 'sheep', 'species', 'fahrenheit', 'celcius', 'kelvin', 'hertz'];

},{}],18:[function(require,module,exports){
'use strict';

//most-frequent non-irregular verbs, in infinitive form, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
module.exports = ['collapse', 'stake', 'forsee', 'suck', 'answer', 'argue', 'tend', 'examine', 'depend', 'form', 'figure', 'mind', 'surround', 'suspect', 'reflect', 'wonder', 'hope', 'end', 'thank', 'file', 'regard', 'report', 'imagine', 'consider', 'ensure', 'cause', 'work', 'enter', 'stop', 'defeat', 'surge', 'launch', 'turn', 'like', 'control', 'relate', 'remember', 'join', 'listen', 'train', 'spring', 'enjoy', 'fail', 'recognize', 'obtain', 'learn', 'fill', 'announce', 'prevent', 'achieve', 'realize', 'involve', 'remove', 'aid', 'visit', 'test', 'prepare', 'ask', 'carry', 'suppose', 'determine', 'raise', 'love', 'use', 'pull', 'improve', 'contain', 'offer', 'talk', 'pick', 'care', 'express', 'remain', 'operate', 'close', 'add', 'mention', 'support', 'decide', 'walk', 'vary', 'demand', 'describe', 'agree', 'happen', 'allow', 'suffer', 'study', 'press',
// 'watch', //omg Object.watch bug
'seem', 'occur', 'contribute', 'claim', 'compare', 'apply', 'direct', 'discuss', 'indicate', 'require', 'change', 'fix', 'reach', 'prove', 'expect', 'exist', 'play', 'permit', 'kill', 'charge', 'increase', 'believe', 'create', 'continue', 'live', 'help', 'represent', 'edit', 'serve', 'appear', 'cover', 'maintain', 'start', 'stay', 'move', 'extend', 'design', 'supply', 'suggest', 'want', 'approach', 'call', 'include', 'try', 'receive', 'save', 'discover', 'marry', 'need', 'establish', 'keep', 'assume', 'attend', 'unite', 'explain', 'publish', 'accept', 'settle', 'reduce', 'do', 'look', 'interact', 'concern', 'labor', 'return', 'select', 'die', 'provide', 'seek', 'wish', 'finish', 'follow', 'disagree', 'produce', 'attack', 'attempt', 'brake', 'brush', 'burn', 'bang', 'bomb', 'budget', 'comfort', 'cook', 'copy', 'cough', 'crush', 'cry', 'check', 'claw', 'clip', 'combine', 'damage', 'desire', 'doubt', 'drain', 'dance', 'decrease', 'defect', 'deposit', 'drift', 'dip', 'dive', 'divorce', 'dream', 'exchange', 'envy', 'exert', 'exercise', 'export', 'fold', 'flood', 'focus', 'forecast', 'fracture', 'grip', 'guide', 'guard', 'guarantee', 'guess', 'hate', 'heat', 'handle', 'hire', 'host', 'hunt', 'hurry', 'import', 'judge', 'jump', 'jam', 'kick', 'kiss', 'knock', 'laugh', 'lift', 'lock', 'lecture', 'link', 'load', 'loan', 'lump', 'melt', 'message', 'murder', 'neglect', 'overlap', 'overtake', 'overuse', 'print', 'protest', 'pump', 'push', 'post', 'progress', 'promise', 'purchase', 'regret', 'request', 'reward', 'roll', 'rub', 'rent', 'repair', 'sail', 'scale', 'screw', 'shock', 'sleep', 'slip', 'smash', 'smell', 'smoke', 'sneeze', 'snow', 'surprise', 'scratch', 'search', 'share', 'shave', 'spit', 'splash', 'stain', 'stress', 'switch', 'taste', 'touch', 'trade', 'trick', 'twist', 'trap', 'travel', 'tune', 'undergo', 'undo', 'uplift', 'vote', 'wash', 'wave', 'whistle', 'wreck', 'yawn', 'betray', 'restrict', 'perform', 'worry', 'point', 'activate', 'fear', 'plan', 'note', 'face', 'predict', 'differ', 'deserve', 'torture', 'recall', 'count', 'admit', 'insist', 'lack', 'pass', 'belong', 'complain', 'constitute', 'rely', 'refuse', 'range', 'cite', 'flash', 'arrive', 'reveal', 'consist', 'observe', 'notice', 'trust', 'display', 'view', 'stare', 'acknowledge', 'owe', 'gaze', 'treat', 'account', 'gather', 'address', 'confirm', 'estimate', 'manage', 'participate', 'sneak', 'drop', 'mirror', 'experience', 'strive', 'arch', 'dislike', 'favor', 'earn', 'emphasize', 'match', 'question', 'emerge', 'encourage', 'matter', 'name', 'head', 'line', 'slam', 'list', 'warn', 'ignore', 'resemble', 'feature', 'place', 'reverse', 'accuse', 'spoil', 'retain', 'survive', 'praise', 'function',
// 'please', //too awkward
'date', 'remind', 'deliver', 'echo', 'engage', 'deny', 'yield', 'center', 'gain', 'anticipate', 'reason', 'side', 'thrive', 'defy', 'dodge', 'enable', 'applaud', 'bear', 'persist', 'pose', 'reject', 'attract', 'await', 'inhibit', 'declare', 'process', 'risk', 'urge', 'value', 'block', 'confront', 'credit', 'cross', 'amuse', 'dare', 'resent', 'smile', 'gloss', 'threaten', 'collect', 'depict', 'dismiss', 'submit', 'benefit', 'step', 'deem', 'limit', 'sense', 'issue', 'embody', 'force', 'govern', 'replace', 'bother', 'cater', 'adopt', 'empower', 'outweigh', 'alter', 'enrich', 'influence', 'prohibit', 'pursue', 'warrant', 'convey', 'approve', 'reserve', 'rest', 'strain', 'wander', 'adjust', 'dress', 'market', 'mingle', 'disapprove', 'evaluate', 'flow', 'inhabit', 'pop', 'rule', 'depart', 'roam', 'assert', 'disappear', 'envision', 'pause', 'afford', 'challenge', 'grab', 'grumble', 'house', 'portray', 'revel', 'base', 'conduct', 'review', 'stem', 'crave', 'mark', 'store', 'target', 'unlock', 'weigh', 'resist', 'drag', 'pour', 'reckon', 'assign', 'cling', 'rank', 'attach', 'decline', 'destroy', 'interfere', 'paint', 'skip', 'sprinkle', 'wither', 'allege', 'retire', 'score', 'monitor', 'expand', 'honor', 'pack', 'assist', 'float', 'appeal', 'stretch', 'undermine', 'assemble', 'boast', 'bounce', 'grasp', 'install', 'borrow', 'crack', 'elect', 'shout', 'contrast', 'overcome', 'relax', 'relent', 'strengthen', 'conform', 'dump', 'pile', 'scare', 'relive', 'resort', 'rush', 'boost', 'cease', 'command', 'excel', 'plug', 'plunge', 'proclaim', 'discourage', 'endure', 'ruin', 'stumble', 'abandon', 'cheat', 'convince', 'merge', 'convert', 'harm', 'multiply', 'overwhelm', 'chew', 'invent', 'bury', 'wipe', 'added', 'took', 'define', 'goes', 'measure', 'enhance', 'distinguish', 'avoid'];

},{}],19:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.pluck = function (arr, str) {
  arr = arr || [];
  return arr.map(function (o) {
    return o[str];
  });
};

exports.flatten = function (arr) {
  var all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

exports.sameArr = function (arr, arrB) {
  if ((typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) !== (typeof arrB === 'undefined' ? 'undefined' : _typeof(arrB)) || arr.length !== arrB.length) {
    return null;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
};

exports.compact = function (arr) {
  return arr.filter(function (a) {
    if (a === undefined || a === null) {
      return false;
    }
    return true;
  });
};

//shallow-combine two objects
exports.extend = function (objA, objB) {
  Object.keys(objB).forEach(function (k) {
    objA[k] = objB[k];
  });
  return objA;
};

//string utilities
exports.endsWith = function (str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

exports.titlecase = function (str) {
  if (!str) {
    return '';
  }
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// typeof obj == "function" also works
// but not in older browsers. :-/
exports.isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

},{}],20:[function(require,module,exports){
//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';

var fns = require('./fns.js');
var verb_conjugate = require('./term/verb/conjugate/conjugate.js');
var to_comparative = require('./term/adjective/to_comparative.js');
var to_superlative = require('./term/adjective/to_superlative.js');
var grand_mapping = require('./sentence/pos/parts_of_speech.js').tag_mapping;

var lexicon = {};

var addObj = function addObj(obj) {
  var keys = Object.keys(obj);
  var l = keys.length;
  for (var i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]];
  }
};

var addArr = function addArr(arr, tag) {
  var l = arr.length;
  for (var i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//conjugate all verbs.
var verbMap = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
  PresentTense: 'PresentTense'
};

var irregulars = require('./data/irregular_verbs.js');
var verbs = require('./data/verbs.js').concat(Object.keys(irregulars));

var _loop = function _loop(i) {
  var o = verb_conjugate(verbs[i]);
  Object.keys(o).forEach(function (k) {
    if (k && o[k] && verbMap[k]) {
      lexicon[o[k]] = verbMap[k];
    }
  });
};

for (var i = 0; i < verbs.length; i++) {
  _loop(i);
}

var orgs = require('./data/organisations.js');
addArr(orgs.organisations, 'Noun');
addArr(orgs.suffixes, 'Noun');

var places = require('./data/places.js');
addArr(places.countries, 'Place');
addArr(places.cities, 'Place');

require('./data/adjectives.js').forEach(function (s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
});
addObj(require('./data/convertables.js'));

addArr(require('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(require('./data/demonyms.js'), 'Adjective');
addArr(require('./data/honourifics.js'), 'Honourific');
addArr(require('./data/uncountables.js'), 'Noun');
addArr(require('./data/dates.js'), 'Date');
addArr(require('./data/numbers.js'), 'Value');
//a little fancy
addArr(Object.keys(require('./data/firstnames.js')), 'Person');
//add irregular nouns
var irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function (k) {
  if (!grand_mapping[lexicon[k]]) {
    // console.log(lexicon[k]);
  }
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});

// console.log(Object.keys(lexicon).length)
// console.log(lexicon)

// console.log(lexicon['once again'] === 'RB');
// console.log(lexicon['seven'] === 'Value');
// console.log(lexicon['sleep'] === 'VBP');
// console.log(lexicon['slept'] === 'VBD');
// console.log(lexicon['sleeping'] === 'VBG');
// console.log(lexicon['canadian'] === 'JJ');
// console.log(lexicon['july'] === 'Value');
// console.log(lexicon[null] === undefined);
// console.log(lexicon['dr'] === 'NNAB');
// console.log(lexicon['sounds'] === 'VBZ');
// console.log(lexicon['look after'] === 'VBP');
// console.log(lexicon['tony'] === 'Noun');
// console.log(lexicon['loaf'] === 'Noun');
// console.log(lexicon['loaves'] === 'NNS');
// console.log(lexicon['he'] === 'PRP');
// console.log(lexicon['canada'] === 'Noun');
// console.log(lexicon['is']);

module.exports = lexicon;

},{"./data/abbreviations.js":2,"./data/adjectives.js":3,"./data/convertables.js":4,"./data/dates.js":5,"./data/demonyms.js":6,"./data/firstnames.js":7,"./data/honourifics.js":8,"./data/irregular_nouns.js":9,"./data/irregular_verbs.js":10,"./data/misc.js":11,"./data/multiples.js":12,"./data/numbers.js":13,"./data/organisations.js":14,"./data/phrasal_verbs.js":15,"./data/places.js":16,"./data/uncountables.js":17,"./data/verbs.js":18,"./fns.js":19,"./sentence/pos/parts_of_speech.js":32,"./term/adjective/to_comparative.js":42,"./term/adjective/to_superlative.js":44,"./term/verb/conjugate/conjugate.js":74}],21:[function(require,module,exports){
'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class

var Terms = require('./terms');

//a particular slice of words+terms to try of equal-length
var tryMatch = function tryMatch(terms, words, options) {
  for (var i = 0; i < terms.length; i++) {
    if (!terms[i].match(words[i], options)) {
      return false;
    }
  }
  return true;
};

//find first match and return Terms
var firstMatch = function firstMatch(terms, str, options) {
  var words = str.split(' ');
  var len = terms.length - words.length + 1;
  for (var i = 0; i < len; i++) {
    var slice = terms.slice(i, i + words.length);
    if (tryMatch(slice, words)) {
      return new Terms(slice);
    }
  }
  return new Terms([]);
};

//find first match and return []Terms
var findAll = function findAll(terms, str, options) {
  var result = [];
  var words = str.split(' ');
  var len = terms.length - words.length + 1;
  for (var i = 0; i < len; i++) {
    var slice = terms.slice(i, i + words.length);
    if (tryMatch(slice, words)) {
      result.push(new Terms(slice));
    }
  }
  return result;
};

//calls Terms.replace() on each found result
var replaceAll = function replaceAll(terms, str, replacement, options) {
  var list = findAll(terms, str, options);
  list.forEach(function (t) {
    t.replace(replacement, options);
  });
};

module.exports = {
  firstMatch: firstMatch,
  findAll: findAll,
  replaceAll: replaceAll
};

},{"./terms":22}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _match = require('./match.js');

// a slice of term objects returned from .match()
// ideally changes that happen here happen in the original object

var Terms = function () {
  function Terms(terms) {
    _classCallCheck(this, Terms);

    this.terms = terms;
    //a short-cut for testing a match result
    this.exists = false;
    if (this.terms.length > 0) {
      this.exists = true;
    }
  }
  //wha, this is possible eg. text.match().match()

  _createClass(Terms, [{
    key: 'match',
    value: function match(str, options) {
      return _match(this.terms, str, options);
    }
    //a 1-1 replacement of strings

  }, {
    key: 'replace',
    value: function replace(str, options) {
      var words = str.split(' ');
      for (var i = 0; i < this.terms.length; i++) {
        //   //umm, this is like a capture-group in regexp..
        if (words[i] === '$') {
          continue;
        }
        this.terms[i].changeTo(words[i] || '');
      }
    }
  }, {
    key: 'text',
    value: function text() {
      return this.terms.reduce(function (arr, t) {
        arr.push(t.text);
        return arr;
      }, []).join(' ');
    }
  }, {
    key: 'normal',
    value: function normal() {
      return this.terms.reduce(function (arr, t) {
        arr.push(t.normal);
        return arr;
      }, []).join(' ');
    }
  }]);

  return Terms;
}();
//a slice of term objects

module.exports = Terms;

},{"./match.js":21}],23:[function(require,module,exports){
'use strict';

var fns = require('../fns.js');
var pos = require('./pos/parts_of_speech.js');
//negate makes s sentence mean s opposite thing.
var negate = function negate(s) {
  if (!s) {
    return '';
  }
  //these are cheap ways to negate s meaning
  // ('none' is ambiguous because it could mean (all or some) )
  var logic_negate = {
    //some logical ones work
    'everyone': 'no one',
    'everybody': 'nobody',
    'someone': 'no one',
    'somebody': 'nobody',
    // everything:"nothing",
    'always': 'never',
    //copulas
    'is': 'isn\'t',
    'are': 'aren\'t',
    'was': 'wasn\'t',
    'will': 'won\'t',
    //modals
    'didn\'t': 'did',
    'wouldn\'t': 'would',
    'couldn\'t': 'could',
    'shouldn\'t': 'should',
    'can\'t': 'can',
    'won\'t': 'will',
    'mustn\'t': 'must',
    'shan\'t': 'shall',
    'shant': 'shall',

    'did': 'didn\'t',
    'would': 'wouldn\'t',
    'could': 'couldn\'t',
    'should': 'shouldn\'t',
    'can': 'can\'t',
    'must': 'mustn\'t'
  };
  //loop through each term..
  for (var i = 0; i < s.terms.length; i++) {
    var tok = s.terms[i];
    // handle ambiguous contractions
    if (tok.reason === 'ambiguous_contraction') {
      tok.text = tok.normal;
    }

    //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
    if (logic_negate[tok.normal] && (!s.terms[i + 1] || s.terms[i + 1].normal !== 'not')) {
      tok.text = logic_negate[tok.normal];
      tok.normal = logic_negate[tok.normal];
      if (tok.capitalised) {
        tok.text = fns.titlecase(tok.text);
      }
      return s;
    }

    // find s first verb..
    if (tok instanceof pos.Verb) {
      // if verb is already negative, make it not negative
      if (tok.isNegative()) {
        if (s.terms[i + 1] && s.terms[i + 1].normal === 'not') {
          s.terms.splice(i + 1, 1);
        }
        return s;
      }

      //turn future-tense 'will go' into "won't go"
      if (tok.normal.match(/^will /i)) {
        tok.text = tok.text.replace(/^will /i, 'won\'t ');
        tok.normal = tok.text;
        if (tok.capitalised) {
          tok.text = fns.titlecase(tok.text);
        }
        return s;
      }
      // - INFINITIVE-
      // 'i walk' -> "i don't walk"
      if (tok.pos['infinitive'] && tok.conjugation() !== 'future') {
        tok.text = 'don\'t ' + (tok.conjugate().infinitive || tok.text);
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - GERUND-
      // if verb is gerund, 'walking' -> "not walking"
      if (tok.conjugation() === 'gerund') {
        tok.text = 'not ' + tok.text;
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - PAST-
      // if verb is past-tense, 'he walked' -> "he did't walk"
      if (tok.tense === 'past') {
        tok.text = 'didn\'t ' + (tok.analysis.conjugate().infinitive || tok.text);
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - PRESENT-
      // if verb is present-tense, 'he walks' -> "he doesn't walk"
      if (tok.conjugations.present) {
        tok.text = 'doesn\'t ' + (tok.conjugate().infinitive || tok.text);
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - FUTURE-
      // if verb is future-tense, 'will go' -> won't go. easy-peasy
      if (tok.conjugations.future) {
        if (tok.normal === 'will') {
          tok.normal = 'won\'t';
          tok.text = 'won\'t';
        } else {
          tok.text = tok.text.replace(/^will /i, 'won\'t ');
          tok.normal = tok.normal.replace(/^will /i, 'won\'t ');
        }
        if (tok.capitalised) {
          tok.text = fns.titlecase(tok.text);
        }
        return s;
      }

      return s;
    }
  }
  return s;
};

module.exports = negate;

},{"../fns.js":19,"./pos/parts_of_speech.js":32}],24:[function(require,module,exports){
'use strict';

//boolean if sentence has

// "[copula] [pastTense] by"
// "[pastParticiple] by"

var passive_voice = function passive_voice(s) {
  var terms = s.terms;
  for (var i = 0; i < terms.length - 2; i++) {
    if (terms[i].pos['Copula'] && terms[i + 1].pos['Verb'] && terms[i + 2].normal === 'by') {
      //don't do 'june was approaching by then'
      if (terms[i + 1].pos['Gerund']) {
        continue;
      }
      return true;
    }
  }
  return false;
};

module.exports = passive_voice;

},{}],25:[function(require,module,exports){
'use strict';

var pos = require('./parts_of_speech');
var fns = require('../../fns');

//swap the Term object with a proper Pos class
var assign = function assign(t, tag, reason) {
  var old_pos = t.pos;
  var P = pos.classMapping[tag] || pos.Term;
  var implicit = t.implicit;
  t = new P(t.text, tag);
  t.reason = reason;
  t.implicit = implicit;
  t.pos = fns.extend(t.pos, old_pos);
  return t;
};
module.exports = assign;

},{"../../fns":19,"./parts_of_speech":32}],26:[function(require,module,exports){
'use strict';

var assign = require('./assign');
//set POS for capitalised words
var capital_signals = function capital_signals(terms) {
  //first words need careful rules
  if (terms[0].is_acronym()) {
    terms[0] = assign(terms[0], 'Noun', 'acronym');
  }
  //non-first-word capitals are nouns
  for (var i = 1; i < terms.length; i++) {
    if (terms[i].is_capital() || terms[i].is_acronym()) {
      terms[i] = assign(terms[i], 'Noun', 'capital_signal');
    }
  }
  return terms;
};
module.exports = capital_signals;

},{"./assign":25}],27:[function(require,module,exports){
//add a 'quiet' token for contractions so we can represent their grammar
//some contractions need detailed POS tense info, to resolve the is/was/has part
'use strict';

var pos = require('../../sentence/pos/parts_of_speech.js');

var easy_contractions = {
  'i\'d': ['i', 'would'],
  'she\'d': ['she', 'would'],
  'he\'d': ['he', 'would'],
  'they\'d': ['they', 'would'],
  'we\'d': ['we', 'would'],
  'i\'ll': ['i', 'will'],
  'she\'ll': ['she', 'will'],
  'he\'ll': ['he', 'will'],
  'they\'ll': ['they', 'will'],
  'we\'ll': ['we', 'will'],
  'i\'ve': ['i', 'have'],
  'they\'ve': ['they', 'have'],
  'we\'ve': ['we', 'have'],
  'should\'ve': ['should', 'have'],
  'would\'ve': ['would', 'have'],
  'could\'ve': ['could', 'have'],
  'must\'ve': ['must', 'have'],
  'i\'m': ['i', 'am'],
  'we\'re': ['we', 'are'],
  'they\'re': ['they', 'are'],
  'cannot': ['can', 'not']
};
var ambiguous = {
  'he\'s': 'he',
  'she\'s': 'she',
  'it\'s': 'it',
  'who\'s': 'who',
  'what\'s': 'what',
  'where\'s': 'where',
  'when\'s': 'when',
  'why\'s': 'why',
  'how\'s': 'how'
};
var opposite_map = Object.keys(ambiguous).reduce(function (h, k) {
  h[ambiguous[k]] = k;
  return h;
}, {});

//take remaining sentence after contraction and decide which verb fits best [is/was/has]
var chooseVerb = function chooseVerb(terms) {
  for (var i = 0; i < terms.length; i++) {
    //he's nice
    if (terms[i].pos['Adjective']) {
      return 'is';
    }
    //he's followed
    if (terms[i].tag === 'PastTense') {
      return 'has';
    }
    //he's following
    if (terms[i].tag === 'Gerund') {
      return 'is';
    }
  }
  return 'is';
};

var easy_ones = function easy_ones(terms) {
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    if (easy_contractions[t.normal]) {
      //first one assumes the whole word, but has implicit first-half of contraction
      terms[i].implicit = easy_contractions[t.normal][0];
      //second one gets an empty term '', but has an implicit verb, like 'is'
      var word_two = new pos.Term('');
      word_two.implicit = easy_contractions[t.normal][1];
      terms.splice(i + 1, 0, word_two);
      i++;
    }
  }
  return terms;
};

var hard_ones = function hard_ones(terms) {
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    if (ambiguous[t.normal]) {
      var pronoun = ambiguous[t.normal];
      var verb = chooseVerb(terms.slice(i, terms.length)); //send the rest of the sentence over
      //first one assumes the whole word, but has implicit first-half of contraction
      terms[i].implicit = pronoun;
      //second one gets an empty term '', but has an implicit verb, like 'is'
      var word_two = new pos.Term('');
      word_two.implicit = verb;
      terms.splice(i + 1, 0, word_two);
      i++;
    }
  }
  return terms;
};

var combine_contraction = function combine_contraction(terms, i, k) {
  //combine two terms
  terms[i].implicit = terms[i].text;
  terms[i + 1].implicit = terms[i + 1].text;
  terms[i].text = k;
  terms[i].rebuild();
  //undo second term
  terms[i + 1].text = '';
  terms[i + 1].rebuild();
  return terms;
};

//turn 'i will' into "i'll"
var contract = function contract(terms) {
  var _loop = function _loop(i) {
    var t = terms[i];
    Object.keys(easy_contractions).forEach(function (k) {
      var arr = easy_contractions[k];
      var next = terms[i + 1];
      if (t.normal === arr[0] && next.normal === arr[1]) {
        terms = combine_contraction(terms, i, k);
        return;
      }
      //'hard ones'
      if (opposite_map[t.normal] && (next.normal === 'is' || next.normal === 'was' || next.normal === 'has')) {
        terms = combine_contraction(terms, i, opposite_map[t.normal]);
        return;
      }
    });
  };

  for (var i = 0; i < terms.length - 1; i++) {
    _loop(i);
  }
  return terms;
};

module.exports = {
  easy_ones: easy_ones,
  hard_ones: hard_ones,
  contract: contract
};

},{"../../sentence/pos/parts_of_speech.js":32}],28:[function(require,module,exports){
//fancy combining/chunking of terms
'use strict';

var pos = require('./parts_of_speech');

var shouldLumpThree = function shouldLumpThree(a, b, c) {
  if (!a || !b || !c) {
    return false;
  }
  var lump_rules = [{
    condition: a.pos.Noun && b.text === '&' && c.pos.Noun, //John & Joe's
    result: 'Person'
  }, {
    condition: a.pos.Noun && b.text === 'N' && c.pos.Noun, //John N Joe's
    result: 'Person'
  }, {
    condition: a.pos.Date && b.normal === 'the' && c.pos.Value, //June the 5th
    result: 'Person'
  }, {
    condition: a.is_capital() && b.normal === 'of' && c.is_capital(), //President of Mexico
    result: 'Noun'
  }, {
    condition: a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/), //three-word quote
    result: 'Noun'
  }, {
    condition: a.normal === 'will' && b.normal === 'have' && b.pos.Verb, //will have walk
    result: 'FutureTense'
  }];
  for (var i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};

var shouldLumpTwo = function shouldLumpTwo(a, b) {
  if (!a || !b) {
    return false;
  }
  var lump_rules = [{
    condition: a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person, //"John sr."
    result: 'Person'
  }, {
    condition: a.pos.Honourific && b.is_capital(), //'Dr. John
    result: 'Person'
  }, {
    condition: a.pos.Person && b.is_capital(), //'Person, Capital -> Person'
    result: 'Person'
  }, {
    condition: a.pos.Date && b.pos.Value, //June 4
    result: 'Date'
  }, {
    condition: a.pos.Value && b.pos.Noun, //5 books
    result: 'Value'
  }, {
    condition: a.is_capital() && b.pos['Organisation'] || b.is_capital() && a.pos['Organisation'], //Canada Inc
    result: 'Organisation'
  }, {
    condition: a.text.match(/^["']/) && b.text.match(/["']$/), //two-word quote
    result: 'Noun'
  }, {
    condition: a.normal === 'will' && b.pos.Verb, //will walk (perfect)
    result: 'PerfectTense'
  }, {
    condition: a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb, //will have walked (pluperfect)
    result: 'PluperfectTense'
  }];
  for (var i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};

var fancy_lumping = function fancy_lumping(terms) {
  for (var i = 1; i < terms.length; i++) {
    var a = terms[i - 1];
    var b = terms[i];
    var c = terms[i + 1];

    // rules for lumping two terms
    var tag = shouldLumpTwo(a, b);
    if (tag !== false) {
      var Cl = pos.classMapping[tag] || pos.Term;
      terms[i] = new Cl(a.text + ' ' + b.text, tag);
      terms[i].reason = 'lumped(' + terms[i].reason + ')';
      terms[i - 1] = null;
      continue;
    }

    // rules for lumpting three terms
    if (c) {
      tag = shouldLumpThree(a, b, c);
      if (tag !== false) {
        var Cl = pos.classMapping[tag] || pos.Term;
        terms[i - 1] = new Cl([a.text, b.text, c.text].join(' '), tag);
        terms[i - 1].reason = 'lumped(' + terms[i].reason + ')';
        terms[i] = null;
        terms[i + 1] = null;
        continue;
      }
    }
  }
  //remove killed terms
  terms = terms.filter(function (t) {
    return t !== null;
  });
  return terms;
};

module.exports = fancy_lumping;

},{"./parts_of_speech":32}],29:[function(require,module,exports){
'use strict';

module.exports = [
//determiner hints
{
  'before': ['Determiner', '?'],
  'after': ['Determiner', 'Noun']
}, {
  'before': ['Determiner', 'Verb'],
  'after': ['Determiner', 'Noun']
}, {
  'before': ['Determiner', 'Adjective', 'Verb'],
  'after': ['Noun', 'Noun', 'Noun']
}, {
  'before': ['Determiner', 'Adverb', 'Adjective', '?'],
  'after': ['Determiner', 'Adverb', 'Adjective', 'Noun']
}, {
  'before': ['Unknown', 'Determiner', 'Noun'],
  'after': ['Verb', 'Determiner', 'Noun']
},
//posessive hints
{
  'before': ['Posessive', 'Unknown'],
  'after': ['Posessive', 'Noun']
}, {
  'before': ['Posessive', 'Verb'],
  'after': ['Posessive', 'Noun']
}, {
  'before': ['Unknown', 'Posessive', 'Noun'],
  'after': ['Verb', 'Posessive', 'Noun']
},
//copula hints
{
  'before': ['Copula', 'Unknown'],
  'after': ['Copula', 'Adjective'] }, // not sure
{
  'before': ['Copula', 'Adverb', '?'],
  'after': ['Copula', 'Adverb', 'Adjective'] }, // not sure

//preposition hints
{
  'before': ['Unknown', 'Preposition'],
  'after': ['Verb', 'Preposition']
},
//conjunction hints, like lists (a little sloppy)
{
  'before': ['Adverb', 'Conjunction', 'Adverb'],
  'after': ['Adverb', 'Adverb', 'Adverb']
}, {
  'before': ['Verb', 'Conjunction', 'Verb'],
  'after': ['Verb', 'Verb', 'Verb']
}, {
  'before': ['Noun', 'Conjunction', 'Noun'],
  'after': ['Noun', 'Noun', 'Noun']
}, {
  'before': ['Adjective', 'Conjunction', 'Adjective'],
  'after': ['Adjective', 'Adjective', 'Adjective']
}, {
  'before': ['Unknown', 'Conjunction', 'Verb'],
  'after': ['Verb', 'Conjunction', 'Verb']
}, {
  'before': ['Verb', 'Conjunction', 'Unknown'],
  'after': ['Verb', 'Conjunction', 'Verb']
},
//adverb hints
{
  'before': ['Noun', 'Adverb', 'Noun'],
  'after': ['Noun', 'Adverb', 'Verb']
},
//pronoun hints
{
  'before': ['Unknown', 'Pronoun'],
  'after': ['Verb', 'Pronoun']
},
//modal hints
{
  'before': ['Modal', 'Unknown'],
  'after': ['Modal', 'Verb']
}, {
  'before': ['Modal', 'Adverb', '?'],
  'after': ['Modal', 'Adverb', 'Verb']
},
//ambiguous dates (march/may)
{
  'before': ['Modal', 'Value'],
  'after': ['Modal', 'Verb']
}, {
  'before': ['Adverb', 'Value'],
  'after': ['Adverb', 'Verb']
}];

},{}],30:[function(require,module,exports){
'use strict';

var assign = require('./assign');

//clear-up ambiguous interjections "ok[Int], thats ok[Adj]"
var interjection_fixes = function interjection_fixes(terms) {
  var interjections = {
    ok: true,
    so: true,
    please: true,
    alright: true,
    well: true,
    now: true
  };
  for (var i = 0; i < terms.length; i++) {
    if (i > 3) {
      break;
    }
    if (interjections[terms[i].normal]) {
      terms[i] = assign(terms[i], 'Expression', 'interjection_fixes');
    } else {
      break;
    }
  }
  return terms;
};

module.exports = interjection_fixes;

},{"./assign":25}],31:[function(require,module,exports){
'use strict';

var defaultLexicon = require('../../lexicon.js');
var assign = require('./assign');

//consult lexicon for this known-word
var lexicon_pass = function lexicon_pass(terms, options) {
  var lexicon = options.lexicon || defaultLexicon;
  return terms.map(function (t) {
    //check lexicon straight-up
    if (lexicon[t.normal] !== undefined) {
      return assign(t, lexicon[t.normal], 'lexicon_pass');
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (t.normal.match(/^(over|under|out|-|un|re|en).{4}/)) {
      var attempt = t.normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      return assign(t, lexicon[attempt], 'lexicon_prefix');
    }
    //match 'twenty-eight'
    if (t.normal.match(/-/)) {
      var sides = t.normal.split('-');
      if (lexicon[sides[0]]) {
        return assign(t, lexicon[sides[0]], 'lexicon_dash');
      }
      if (lexicon[sides[1]]) {
        return assign(t, lexicon[sides[1]], 'lexicon_dash');
      }
    }
    return t;
  });
};
module.exports = lexicon_pass;

},{"../../lexicon.js":20,"./assign":25}],32:[function(require,module,exports){
'use strict';

var Term = require('../../term/term.js');

var Verb = require('../../term/verb/verb.js');
var Adverb = require('../../term/adverb/adverb.js');
var Adjective = require('../../term/adjective/adjective.js');

var Noun = require('../../term/noun/noun.js');
var Person = require('../../term/noun/person/person.js');
var Place = require('../../term/noun/place/place.js');
var Organisation = require('../../term/noun/organisation/organisation.js');
var Value = require('../../term/noun/value/value.js');
var _Date = require('../../term/noun/date/date.js');

var tag_mapping = {
  //nouns
  'NNA': 'Acronym',
  'NNS': 'Plural',
  'NN': 'Noun',
  'NNO': 'Posessive',
  'CD': 'Value',
  // 'NNP': 'Noun',
  // 'NNPA': 'Noun',
  // 'NNAB': 'Noun',
  // 'NNPS': 'Noun',
  // 'NNG': 'Noun',
  // 'CD': 'Noun',
  // 'NU': 'Noun',
  // 'DA': 'Noun',

  //glue
  'PP': 'Posessive',
  'PRP': 'Pronoun',
  'UH': 'Expression', //interjection
  'FW': 'Expression', //foreign-word
  'DT': 'Determiner',
  'CC': 'Conjunction',
  'IN': 'Preposition',

  //verbs
  'VB': 'Verb',
  'VBD': 'PastTense',
  'VBF': 'FutureTense',
  'VBP': 'Infinitive',
  'VBZ': 'PresentTense',
  'VBG': 'Gerund',
  'VBN': 'Verb',
  'CP': 'Copula',
  'MD': 'Modal',
  'JJ': 'Adjective',
  'JJR': 'Comparative',
  'JJS': 'Superlative',
  'RB': 'Adverb'
};

var classMapping = {
  'Noun': Noun,
  'Honourific': Noun,
  'Acronym': Noun,
  'Plural': Noun,
  'Pronoun': Noun,
  'Actor': Noun,
  'Abbreviation': Noun,

  'Verb': Verb,
  'PresentTense': Verb,
  'FutureTense': Verb,
  'PastTense': Verb,
  'Infinitive': Verb,
  'PerfectTense': Verb,
  'PluperfectTense': Verb,
  'Gerund': Verb,
  'Copula': Verb,
  'Modal': Verb,

  'Comparative': Adjective,
  'Superlative': Adjective,
  'Adjective': Adjective,

  'Determiner': Term,
  'Preposition': Term,
  'Expression': Term,
  'Conjunction': Term,
  'Posessive': Term,

  'Adverb': Adverb,
  'Value': Value,
  'Place': Place,
  'Person': Person,
  'Organisation': Organisation,
  'Date': _Date
};

module.exports = {
  tag_mapping: tag_mapping,
  classMapping: classMapping,
  Term: Term,
  'Date': _Date,
  Value: Value,
  Verb: Verb,
  Person: Person,
  Place: Place,
  Organisation: Organisation,
  Adjective: Adjective,
  Adverb: Adverb,
  Noun: Noun
};

},{"../../term/adjective/adjective.js":40,"../../term/adverb/adverb.js":45,"../../term/noun/date/date.js":50,"../../term/noun/noun.js":56,"../../term/noun/organisation/organisation.js":58,"../../term/noun/person/person.js":62,"../../term/noun/place/place.js":64,"../../term/noun/value/value.js":72,"../../term/term.js":73,"../../term/verb/verb.js":81}],33:[function(require,module,exports){
'use strict';

//some prepositions are clumped onto the back of a verb "looked for", "looks at"
//they should be combined with the verb, sometimes.
//does not handle seperated phrasal verbs ('take the coat off' -> 'take off')

var particles = ['in', 'out', 'on', 'off', 'behind', 'way', 'with', 'of', 'do', 'away', 'across', 'ahead', 'back', 'over', 'under', 'together', 'apart', 'up', 'upon', 'aback', 'down', 'about', 'before', 'after', 'around', 'to', 'forth', 'round', 'through', 'along', 'onto'];
particles = particles.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

//combine ['blew','up'] -> 'blew up'
var phrasal_verbs = function phrasal_verbs(terms) {
  for (var i = 0; i < terms.length - 1; i++) {
    if (terms[i] && terms[i].pos['Verb'] && particles[terms[i + 1].normal]) {
      //don't do 'is in'
      if (terms[i].pos['Copula']) {
        continue;
      }
      terms[i].text = terms[i].text + ' ' + terms[i + 1].text;
      terms[i].reason = 'phrasal(' + terms[i].reason + ')';
      terms[i + 1] = null;
      terms[i].rebuild();
      // terms[i].conjugate();
    }
  }
  //remove killed-off ones
  terms = terms.filter(function (t) {
    return t !== null;
  });
  return terms;
};

module.exports = phrasal_verbs;

},{}],34:[function(require,module,exports){
//part-of-speech tagging
'use strict';

var contractions = require('./contractions');
var word_rules = require('./word_rules');
var grammar_rules = require('./grammar_rules');
var fancy_lumping = require('./fancy_lumping');
var phrasal_verbs = require('./phrasal_verbs');
var interjection_fixes = require('./interjection_fixes');
var lexicon_pass = require('./lexicon_pass');
var capital_signals = require('./capital_signals');
var pos = require('./parts_of_speech');
var assign = require('./assign');

//regex hints for words/suffixes
var word_rules_pass = function word_rules_pass(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (terms[i].tag !== '?') {
      continue;
    }
    for (var o = 0; o < word_rules.length; o++) {
      if (terms[i].normal.length > 4 && terms[i].normal.match(word_rules[o].reg)) {
        terms[i] = assign(terms[i], word_rules[o].pos, 'rules_pass_' + o);
        break;
      }
    }
  }
  return terms;
};

var should_chunk = function should_chunk(a, b) {
  if (!a || !b) {
    return false;
  }
  //if A has a comma, don't chunk it
  if (a.has_comma()) {
    return false;
  }
  //dont chunk these pos
  var dont_chunk = {
    Expression: true
  };
  if (dont_chunk[a.tag] || dont_chunk[b.tag]) {
    return false;
  }
  //dont chunk contractions (again)
  if (a.implicit || b.implicit) {
    return false;
  }
  if (a.tag === b.tag) {
    return true;
  }
  return false;
};

//turn [noun, noun..] into [noun..]
var chunk_neighbours = function chunk_neighbours(terms) {
  var new_terms = [];
  var last_one = null;
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    //if the tags match (but it's not a hidden contraction)
    if (should_chunk(last_one, t)) {
      new_terms[new_terms.length - 1].text += ' ' + t.text;
      new_terms[new_terms.length - 1].normalize();
    } else {
      new_terms.push(t);
    }
    last_one = t;
  }
  return new_terms;
};

//tests a subset of terms against a array of tags
var hasTags = function hasTags(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for (var i = 0; i < tags.length; i++) {
    if (!terms[i].pos[tags[i]]) {
      return false;
    }
  }
  return true;
};

//hints from the sentence grammar
var grammar_rules_pass = function grammar_rules_pass(s) {
  for (var i = 0; i < s.terms.length; i++) {
    for (var o = 0; o < grammar_rules.length; o++) {
      var rule = grammar_rules[o];
      //does this rule match
      var terms = s.terms.slice(i, i + rule.before.length);
      if (hasTags(terms, rule.before)) {
        //change before/after for each term
        for (var c = 0; c < rule.before.length; c++) {
          s.terms[i + c] = assign(s.terms[i + c], rule.after[c], 'grammar_rule ' + c);
        }
      }
    }
  }
  return s.terms;
};

var noun_fallback = function noun_fallback(terms) {
  for (var i = 0; i < terms.length; i++) {
    if (terms[i].tag === '?' && terms[i].normal.match(/[a-z]/)) {
      terms[i] = assign(terms[i], 'Noun', 'fallback');
    }
  }
  return terms;
};

//turn nouns into person/place
var specific_pos = function specific_pos(terms) {
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    if (t instanceof pos.Noun) {
      if (t.is_person()) {
        terms[i] = assign(t, 'Person', 'is_person');
      } else if (t.is_place()) {
        terms[i] = assign(t, 'Place', 'is_place');
      } else if (t.is_value()) {
        terms[i] = assign(t, 'Value', 'is_value');
      } else if (t.is_date()) {
        terms[i] = assign(t, 'Date', 'is_date');
      } else if (t.is_organisation()) {
        terms[i] = assign(t, 'Organisation', 'is_organisation');
      }
    }
  }
  return terms;
};

var tagger = function tagger(s, options) {
  //word-level rules
  s.terms = capital_signals(s.terms);
  s.terms = contractions.easy_ones(s.terms);
  s.terms = lexicon_pass(s.terms, options);
  s.terms = word_rules_pass(s.terms);
  s.terms = interjection_fixes(s.terms);
  //repeat these steps a couple times, to wiggle-out the grammar
  for (var i = 0; i < 1; i++) {
    s.terms = grammar_rules_pass(s);
    s.terms = chunk_neighbours(s.terms);
    s.terms = noun_fallback(s.terms);
    s.terms = phrasal_verbs(s.terms);
    s.terms = specific_pos(s.terms);
    s.terms = contractions.hard_ones(s.terms);
    s.terms = fancy_lumping(s.terms);
  }
  return s.terms;
};

module.exports = tagger;

},{"./assign":25,"./capital_signals":26,"./contractions":27,"./fancy_lumping":28,"./grammar_rules":29,"./interjection_fixes":30,"./lexicon_pass":31,"./parts_of_speech":32,"./phrasal_verbs":33,"./word_rules":35}],35:[function(require,module,exports){
'use strict';

var tag_mapping = require('./parts_of_speech.js').tag_mapping;
//regex patterns and parts of speech],
module.exports = [['.[cts]hy$', 'JJ'], ['.[st]ty$', 'JJ'], ['.[lnr]ize$', 'VB'], ['.[gk]y$', 'JJ'], ['.fies$', 'VB'], ['.some$', 'JJ'], ['.[nrtumcd]al$', 'JJ'], ['.que$', 'JJ'], ['.[tnl]ary$', 'JJ'], ['.[di]est$', 'JJS'], ['^(un|de|re)\\-[a-z]..', 'VB'], ['.lar$', 'JJ'], ['[bszmp]{2}y', 'JJ'], ['.zes$', 'VB'], ['.[icldtgrv]ent$', 'JJ'], ['.[rln]ates$', 'VBZ'], ['.[oe]ry$', 'JJ'], ['[rdntkdhs]ly$', 'RB'], ['.[lsrnpb]ian$', 'JJ'], ['.[^aeiou]ial$', 'JJ'], ['.[^aeiou]eal$', 'JJ'], ['.[vrl]id$', 'JJ'], ['.[ilk]er$', 'JJR'], ['.ike$', 'JJ'], ['.ends$', 'VB'], ['.wards$', 'RB'], ['.rmy$', 'JJ'], ['.rol$', 'NN'], ['.tors$', 'NN'], ['.azy$', 'JJ'], ['.where$', 'RB'], ['.ify$', 'VB'], ['.bound$', 'JJ'], ['.ens$', 'VB'], ['.oid$', 'JJ'], ['.vice$', 'NN'], ['.rough$', 'JJ'], ['.mum$', 'JJ'], ['.teen(th)?$', 'CD'], ['.oses$', 'VB'], ['.ishes$', 'VB'], ['.ects$', 'VB'], ['.tieth$', 'CD'], ['.ices$', 'NN'], ['.bles$', 'VB'], ['.pose$', 'VB'], ['.ions$', 'NN'], ['.ean$', 'JJ'], ['.[ia]sed$', 'JJ'], ['.tized$', 'VB'], ['.llen$', 'JJ'], ['.fore$', 'RB'], ['.ances$', 'NN'], ['.gate$', 'VB'], ['.nes$', 'VB'], ['.less$', 'RB'], ['.ried$', 'JJ'], ['.gone$', 'JJ'], ['.made$', 'JJ'], ['.[pdltrkvyns]ing$', 'JJ'], ['.tions$', 'NN'], ['.tures$', 'NN'], ['.ous$', 'JJ'], ['.ports$', 'NN'], ['. so$', 'RB'], ['.ints$', 'NN'], ['.[gt]led$', 'JJ'], ['[aeiou].*ist$', 'JJ'], ['.lked$', 'VB'], ['.fully$', 'RB'], ['.*ould$', 'MD'], ['^-?[0-9]+(.[0-9]+)?$', 'CD'], ['[a-z]*\\-[a-z]*\\-', 'JJ'], ['[a-z]\'s$', 'NNO'], ['.\'n$', 'VB'], ['.\'re$', 'CP'], ['.\'ll$', 'MD'], ['.\'t$', 'VB'], ['.tches$', 'VB'], ['^https?\:?\/\/[a-z0-9]', 'NN'], //the colon is removed in normalisation
['^www\.[a-z0-9]', 'NN'], ['.ize$', 'VB'], ['.[^aeiou]ise$', 'VB'], ['.[aeiou]te$', 'VB'], ['.ea$', 'NN'], ['[aeiou][pns]er$', 'NN'], ['.ia$', 'NN'], ['.sis$', 'NN'], ['.[aeiou]na$', 'NN'], ['.[^aeiou]ity$', 'NN'], ['.[^aeiou]ium$', 'NN'], ['.[^aeiou][ei]al$', 'JJ'], ['.ffy$', 'JJ'], ['.[^aeiou]ic$', 'JJ'], ['.(gg|bb|zz)ly$', 'JJ'], ['.[aeiou]my$', 'JJ'], ['.[aeiou]ble$', 'JJ'], ['.[^aeiou]ful$', 'JJ'], ['.[^aeiou]ish$', 'JJ'], ['.[^aeiou]ica$', 'NN'], ['[aeiou][^aeiou]is$', 'NN'], ['[^aeiou]ard$', 'NN'], ['[^aeiou]ism$', 'NN'], ['.[^aeiou]ity$', 'NN'], ['.[^aeiou]ium$', 'NN'], ['.[lstrn]us$', 'NN'], ['..ic$', 'JJ'], ['[aeiou][^aeiou]id$', 'JJ'], ['.[^aeiou]ish$', 'JJ'], ['.[^aeiou]ive$', 'JJ'], ['[ea]{2}zy$', 'JJ']].map(function (a) {
  return {
    reg: new RegExp(a[0], 'i'),
    pos: tag_mapping[a[1]]
  };
});

},{"./parts_of_speech.js":32}],36:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sentence = require('../sentence.js');

var Question = function (_Sentence) {
  _inherits(Question, _Sentence);

  function Question(str, options) {
    _classCallCheck(this, Question);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Question).call(this, str, options));
  }
  // // john walks quickly -> john walked quickly
  // to_past() {
  //   change_tense(this, 'past');
  //   return this;
  // }
  // // john walked quickly -> john walks quickly
  // to_present() {
  //   change_tense(this, 'present');
  //   return this;
  // }
  // // john walked quickly -> john will walk quickly
  // to_future() {
  //   change_tense(this, 'future');
  //   return this;
  // }

  return Question;
}(Sentence);

Question.fn = Question.prototype;

module.exports = Question;

// let s = new Question('is John a person?');

},{"../sentence.js":37}],37:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Term = require('../term/term.js');
var tagger = require('./pos/tagger.js');
var passive_voice = require('./passive_voice.js');
var _negate = require('./negate.js');
var _contract = require('./pos/contractions.js').contract;
var change_tense = require('./tense.js');
var _match = require('./match/match.js');

//a sentence is an array of Term objects, along with their various methods

var Sentence = function () {
  function Sentence(str, options) {
    _classCallCheck(this, Sentence);

    this.str = str || '';
    options = options || {};
    var the = this;
    var terms = str.split(' ');
    //build-up term-objects
    this.terms = terms.map(function (s) {
      return new Term(s);
    });
    this.terms = tagger(this, options);
    //contractions
    this.contractions = {
      // "he'd go" -> "he would go"
      expand: function expand() {
        //the hard part is already done, just flip them
        the.terms.forEach(function (t) {
          if (t.implicit) {
            t.changeTo(t.implicit);
            t.implicit = '';
          }
        });
        return the;
      },
      // "he would go" -> "he'd go"
      contract: function contract() {
        return _contract(the.terms);
      }
    };
  }

  //Sentence methods:

  //insert a new word at this point

  _createClass(Sentence, [{
    key: 'addBefore',
    value: function addBefore(i, str) {
      var t = new Term(str);
      this.terms.splice(i, 0, t);
    }
  }, {
    key: 'addAfter',
    value: function addAfter(i, str) {
      var t = new Term(str);
      this.terms.splice(i + 1, 0, t);
    }

    // a regex-like lookup for a list of terms.
    // returns matches in a 'Terms' class

  }, {
    key: 'match',
    value: function match(str, options) {
      return _match.firstMatch(this.terms, str, options);
    }
  }, {
    key: 'matches',
    value: function matches(str, options) {
      return _match.findAll(this.terms, str, options);
    }
    //returns a transformed sentence

  }, {
    key: 'replace',
    value: function replace(str, replacement, options) {
      var terms = _match.replaceAll(this.terms, str, replacement, options);
      return this;
    }

    //the ending punctuation

  }, {
    key: 'terminator',
    value: function terminator() {
      var allowed = ['.', '?', '!'];
      var punct = this.str.slice(-1) || '';
      if (allowed.indexOf(punct) !== -1) {
        return punct;
      }
      return '.';
    }

    //part-of-speech assign each term

  }, {
    key: 'tag',
    value: function tag() {
      this.terms = tagger(this);
      return this.terms;
    }

    //is it a question/statement

  }, {
    key: 'sentence_type',
    value: function sentence_type() {
      var char = this.terminator();
      var types = {
        '?': 'interrogative',
        '!': 'exclamative',
        '.': 'declarative'
      };
      return types[char] || 'declarative';
    }

    // A was verbed by B - B verbed A

  }, {
    key: 'is_passive',
    value: function is_passive() {
      return passive_voice(this);
    }
    // A is B - A is not B

  }, {
    key: 'negate',
    value: function negate() {
      _negate(this);
      return this;
    }

    //map over Term methods

  }, {
    key: 'text',
    value: function text() {
      return this.terms.reduce(function (s, t) {
        //implicit contractions shouldn't be included
        if (t.text) {
          if (s === '') {
            s = t.text;
          } else {
            s += ' ' + t.text;
          }
        }
        return s;
      }, '');
    }
    //like text but for cleaner text

  }, {
    key: 'normalized',
    value: function normalized() {
      return this.terms.reduce(function (s, t) {
        if (t.text) {
          s += ' ' + t.normal;
        }
        return s;
      }, '');
    }
    //return only the main POS classnames/tags

  }, {
    key: 'tags',
    value: function tags() {
      return this.terms.map(function (t) {
        return t.tag || '?';
      });
    }
    //mining for specific things

  }, {
    key: 'people',
    value: function people() {
      return this.terms.filter(function (t) {
        return t.pos['Person'];
      });
    }
  }, {
    key: 'places',
    value: function places() {
      return this.terms.filter(function (t) {
        return t.pos['Place'];
      });
    }
  }, {
    key: 'dates',
    value: function dates() {
      return this.terms.filter(function (t) {
        return t.pos['Date'];
      });
    }
  }, {
    key: 'organisations',
    value: function organisations() {
      return this.terms.filter(function (t) {
        return t.pos['Organisation'];
      });
    }
  }, {
    key: 'values',
    value: function values() {
      return this.terms.filter(function (t) {
        return t.pos['Value'];
      });
    }

    // john walks quickly -> john walked quickly

  }, {
    key: 'to_past',
    value: function to_past() {
      change_tense(this, 'past');
      return this;
    }
    // john walked quickly -> john walks quickly

  }, {
    key: 'to_present',
    value: function to_present() {
      change_tense(this, 'present');
      return this;
    }
    // john walked quickly -> john will walk quickly

  }, {
    key: 'to_future',
    value: function to_future() {
      change_tense(this, 'future');
      return this;
    }
  }]);

  return Sentence;
}();

Sentence.fn = Sentence.prototype;

module.exports = Sentence;

// let s = new Sentence('the dog played');
// console.log(s.replace('the [Noun]', 'the cat').text());

},{"../term/term.js":73,"./match/match.js":21,"./negate.js":23,"./passive_voice.js":24,"./pos/contractions.js":27,"./pos/tagger.js":34,"./tense.js":39}],38:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sentence = require('../sentence.js');
// const change_tense = require('../tense.js');

var Statement = function (_Sentence) {
  _inherits(Statement, _Sentence);

  function Statement(str, options) {
    _classCallCheck(this, Statement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Statement).call(this, str, options));
  }
  // // john walks quickly -> john walked quickly
  // to_past() {
  //   change_tense(this, 'past');
  //   return this;
  // }
  // // john walked quickly -> john walks quickly
  // to_present() {
  //   change_tense(this, 'present');
  //   return this;
  // }
  // // john walked quickly -> john will walk quickly
  // to_future() {
  //   change_tense(this, 'future');
  //   return this;
  // }

  return Statement;
}(Sentence);

Statement.fn = Statement.prototype;

module.exports = Statement;

// let s = new Statement('john is a person');
// console.log(s.tags());
// console.log(s);
// console.log(s.to_past().text());

},{"../sentence.js":37}],39:[function(require,module,exports){
'use strict';
//change a sentence to past, present, or future tense

var pos = require('./pos/parts_of_speech.js');

//conjugate a specific verb
var flip = function flip(t, tense) {
  if (tense === 'present') {
    t.to_present();
  } else if (tense === 'past') {
    t.to_past();
  } else if (tense === 'future') {
    t.to_future();
  }
  return t;
};

var change_tense = function change_tense(s, tense) {
  //convert all verbs
  s.terms.forEach(function (t) {
    if (t instanceof pos.Verb) {
      flip(t, tense);
    }
  });
  return s;
};

// [
//   'john walks to the church',
//   'john walks and feeds the birds',
//   'john always walks',
//   'will you walk?',
// ];

module.exports = change_tense;

},{"./pos/parts_of_speech.js":32}],40:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = require('../term.js');

var _to_comparative = require('./to_comparative');
var _to_superlative = require('./to_superlative');
var adj_to_adv = require('./to_adverb');
var adj_to_noun = require('./to_noun');

var Adjective = function (_Term) {
  _inherits(Adjective, _Term);

  function Adjective(str, tag) {
    _classCallCheck(this, Adjective);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Adjective).call(this, str));

    _this.tag = tag;
    _this.pos['Adjective'] = true;
    return _this;
  }

  _createClass(Adjective, [{
    key: 'to_comparative',
    value: function to_comparative() {
      return _to_comparative(this.normal);
    }
  }, {
    key: 'to_superlative',
    value: function to_superlative() {
      return _to_superlative(this.normal);
    }
  }, {
    key: 'to_noun',
    value: function to_noun() {
      return adj_to_noun(this.normal);
    }
  }, {
    key: 'to_adverb',
    value: function to_adverb() {
      return adj_to_adv(this.normal);
    }
  }, {
    key: 'conjugate',
    value: function conjugate() {
      return {
        comparative: _to_comparative(this.normal),
        superlative: _to_superlative(this.normal),
        adverb: adj_to_adv(this.normal),
        noun: adj_to_noun(this.normal)
      };
    }
  }]);

  return Adjective;
}(Term);

Adjective.fn = Adjective.prototype;
// let t = new Adjective("quick")
// console.log(t.conjugate())

module.exports = Adjective;

},{"../term.js":73,"./to_adverb":41,"./to_comparative":42,"./to_noun":43,"./to_superlative":44}],41:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';

var adj_to_adv = function adj_to_adv(str) {
  var irregulars = {
    'idle': 'idly',
    'public': 'publicly',
    'vague': 'vaguely',
    'day': 'daily',
    'icy': 'icily',
    'single': 'singly',
    'female': 'womanly',
    'male': 'manly',
    'simple': 'simply',
    'whole': 'wholly',
    'special': 'especially',
    'straight': 'straight',
    'wrong': 'wrong',
    'fast': 'fast',
    'hard': 'hard',
    'late': 'late',
    'early': 'early',
    'well': 'well',
    'best': 'best',
    'latter': 'latter',
    'bad': 'badly'
  };

  var dont = {
    'foreign': 1,
    'black': 1,
    'modern': 1,
    'next': 1,
    'difficult': 1,
    'degenerate': 1,
    'young': 1,
    'awake': 1,
    'back': 1,
    'blue': 1,
    'brown': 1,
    'orange': 1,
    'complex': 1,
    'cool': 1,
    'dirty': 1,
    'done': 1,
    'empty': 1,
    'fat': 1,
    'fertile': 1,
    'frozen': 1,
    'gold': 1,
    'grey': 1,
    'gray': 1,
    'green': 1,
    'medium': 1,
    'parallel': 1,
    'outdoor': 1,
    'unknown': 1,
    'undersized': 1,
    'used': 1,
    'welcome': 1,
    'yellow': 1,
    'white': 1,
    'fixed': 1,
    'mixed': 1,
    'super': 1,
    'guilty': 1,
    'tiny': 1,
    'able': 1,
    'unable': 1,
    'same': 1,
    'adult': 1
  };

  var transforms = [{
    reg: /al$/i,
    repl: 'ally'
  }, {
    reg: /ly$/i,
    repl: 'ly'
  }, {
    reg: /(.{3})y$/i,
    repl: '$1ily'
  }, {
    reg: /que$/i,
    repl: 'quely'
  }, {
    reg: /ue$/i,
    repl: 'uly'
  }, {
    reg: /ic$/i,
    repl: 'ically'
  }, {
    reg: /ble$/i,
    repl: 'bly'
  }, {
    reg: /l$/i,
    repl: 'ly'
  }];

  var not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/];

  if (dont[str]) {
    return null;
  }
  if (irregulars[str]) {
    return irregulars[str];
  }
  if (str.length <= 3) {
    return null;
  }
  for (var i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return null;
    }
  }
  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + 'ly';
};
// console.log(adj_to_adv('direct'))

module.exports = adj_to_adv;

},{}],42:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';

var convertables = require('../../data/convertables.js');

var to_comparative = function to_comparative(str) {
  var irregulars = {
    'grey': 'greyer',
    'gray': 'grayer',
    'green': 'greener',
    'yellow': 'yellower',
    'red': 'redder',
    'good': 'better',
    'well': 'better',
    'bad': 'worse',
    'sad': 'sadder'
  };

  var dont = {
    'overweight': 1,
    'main': 1,
    'nearby': 1,
    'asleep': 1,
    'weekly': 1,
    'secret': 1,
    'certain': 1
  };

  var transforms = [{
    reg: /y$/i,
    repl: 'ier'
  }, {
    reg: /([aeiou])t$/i,
    repl: '$1tter'
  }, {
    reg: /([aeou])de$/i,
    repl: '$1der'
  }, {
    reg: /nge$/i,
    repl: 'nger'
  }];

  var matches = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];

  var not_matches = [/ary$/, /ous$/];

  if (dont.hasOwnProperty(str)) {
    return null;
  }

  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.hasOwnProperty(str)) {
    if (str.match(/e$/)) {
      return str + 'r';
    }
    return str + 'er';
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }

  for (var i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'more ' + str;
    }
  }

  for (var i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return str + 'er';
    }
  }
  return 'more ' + str;
};

// console.log(to_comparative("great"))

module.exports = to_comparative;

},{"../../data/convertables.js":4}],43:[function(require,module,exports){
//convert cute to cuteness
'use strict';

var to_noun = function to_noun(w) {
  var irregulars = {
    'clean': 'cleanliness',
    'naivety': 'naivety'
  };
  if (!w) {
    return '';
  }
  if (irregulars.hasOwnProperty(w)) {
    return irregulars[w];
  }
  if (w.match(' ')) {
    return w;
  }
  if (w.match(/w$/)) {
    return w;
  }
  var transforms = [{
    'reg': /y$/,
    'repl': 'iness'
  }, {
    'reg': /le$/,
    'repl': 'ility'
  }, {
    'reg': /ial$/,
    'repl': 'y'
  }, {
    'reg': /al$/,
    'repl': 'ality'
  }, {
    'reg': /ting$/,
    'repl': 'ting'
  }, {
    'reg': /ring$/,
    'repl': 'ring'
  }, {
    'reg': /bing$/,
    'repl': 'bingness'
  }, {
    'reg': /sing$/,
    'repl': 'se'
  }, {
    'reg': /ing$/,
    'repl': 'ment'
  }, {
    'reg': /ess$/,
    'repl': 'essness'
  }, {
    'reg': /ous$/,
    'repl': 'ousness'
  }];

  for (var i = 0; i < transforms.length; i++) {
    if (w.match(transforms[i].reg)) {
      return w.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (w.match(/s$/)) {
    return w;
  }
  return w + 'ness';
};

// console.log(to_noun("great"))

module.exports = to_noun;

},{}],44:[function(require,module,exports){
//turn 'quick' into 'quickest'
'use strict';

var convertables = require('../../data/convertables.js');

var to_superlative = function to_superlative(str) {
  var irregulars = {
    'nice': 'nicest',
    'late': 'latest',
    'hard': 'hardest',
    'inner': 'innermost',
    'outer': 'outermost',
    'far': 'furthest',
    'worse': 'worst',
    'bad': 'worst',
    'good': 'best'
  };

  var dont = {
    'overweight': 1,
    'ready': 1
  };

  var transforms = [{
    'reg': /y$/i,
    'repl': 'iest'
  }, {
    'reg': /([aeiou])t$/i,
    'repl': '$1ttest'
  }, {
    'reg': /([aeou])de$/i,
    'repl': '$1dest'
  }, {
    'reg': /nge$/i,
    'repl': 'ngest'
  }];

  var matches = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];

  var not_matches = [/ary$/];

  var generic_transformation = function generic_transformation(s) {
    if (s.match(/e$/)) {
      return s + 'st';
    }
    return s + 'est';
  };

  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.hasOwnProperty(str)) {
    return generic_transformation(str);
  }

  if (dont.hasOwnProperty(str)) {
    return 'most ' + str;
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (var i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'most ' + str;
    }
  }

  for (var i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return generic_transformation(str);
    }
  }
  return 'most ' + str;
};

// console.log(to_superlative("great"))

module.exports = to_superlative;

},{"../../data/convertables.js":4}],45:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = require('../term.js');
var _to_adjective = require('./to_adjective.js');

var Adverb = function (_Term) {
  _inherits(Adverb, _Term);

  function Adverb(str, tag) {
    _classCallCheck(this, Adverb);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Adverb).call(this, str));

    _this.tag = tag;
    _this.pos['Adverb'] = true;
    return _this;
  }

  _createClass(Adverb, [{
    key: 'to_adjective',
    value: function to_adjective() {
      return _to_adjective(this.normal);
    }
  }]);

  return Adverb;
}(Term);

Adverb.fn = Adverb.prototype;
// let t = new Adverb("quickly")
// console.log(t.to_adjective())

module.exports = Adverb;

},{"../term.js":73,"./to_adjective.js":46}],46:[function(require,module,exports){
//turns 'quickly' into 'quick'
'use strict';

var to_adjective = function to_adjective(str) {
  var irregulars = {
    'idly': 'idle',
    'sporadically': 'sporadic',
    'basically': 'basic',
    'grammatically': 'grammatical',
    'alphabetically': 'alphabetical',
    'economically': 'economical',
    'conically': 'conical',
    'politically': 'political',
    'vertically': 'vertical',
    'practically': 'practical',
    'theoretically': 'theoretical',
    'critically': 'critical',
    'fantastically': 'fantastic',
    'mystically': 'mystical',
    'pornographically': 'pornographic',
    'fully': 'full',
    'jolly': 'jolly',
    'wholly': 'whole'
  };
  var transforms = [{
    'reg': /bly$/i,
    'repl': 'ble'
  }, {
    'reg': /gically$/i,
    'repl': 'gical'
  }, {
    'reg': /([rsdh])ically$/i,
    'repl': '$1ical'
  }, {
    'reg': /ically$/i,
    'repl': 'ic'
  }, {
    'reg': /uly$/i,
    'repl': 'ue'
  }, {
    'reg': /ily$/i,
    'repl': 'y'
  }, {
    'reg': /(.{3})ly$/i,
    'repl': '$1'
  }];
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str;
};

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
module.exports = to_adjective;

},{}],47:[function(require,module,exports){
'use strict';

var is_acronym = function is_acronym(str) {
  //like N.D.A
  if (str.match(/([A-Z]\.)+[A-Z]?$/)) {
    return true;
  }
  //like NDA
  if (str.match(/[A-Z]{3}$/)) {
    return true;
  }
  return false;
};
module.exports = is_acronym;

},{}],48:[function(require,module,exports){
'use strict';

var fns = require('../fns.js');

//a regex-like string search
// returns a boolean for match/not
var match = function match(term, str, options) {
  //wildcard
  if (str === '*') {
    return true;
  }
  //a regular string-match
  if (term.normal === str || term.text === str || term.root === str) {
    return true;
  }
  //declare a POS-match like term '[Noun]'
  var bracketed = str.match(/^\[(.*?)\]$/);
  if (bracketed) {
    //a pos match
    var pos = fns.titlecase(bracketed[1]);
    if (term.pos[pos]) {
      return true;
    }
    return false;
  }
  //declare a list-match like term '(a|an)'
  var listed = str.match(/^\((.*?)\)$/);
  if (listed) {
    var list = listed[1].split('|');
    for (var i = 0; i < list.length; i++) {
      if (list[i] === term.normal || list[i] === term.text || list[i] === term.root) {
        return true;
      }
    }
    return false;
  }
  return false;
};

module.exports = match;

},{"../fns.js":19}],49:[function(require,module,exports){
'use strict';

var is_acronym = require('../is_acronym.js');

//chooses an indefinite aricle 'a/an' for a word
var irregulars = {
  'hour': 'an',
  'heir': 'an',
  'heirloom': 'an',
  'honest': 'an',
  'honour': 'an',
  'honor': 'an',
  'uber': 'an' //german u
};

var indefinite_article = function indefinite_article(str) {
  if (!str) {
    return null;
  }
  //pronounced letters of acronyms that get a 'an'
  var an_acronyms = {
    A: true,
    E: true,
    F: true,
    H: true,
    I: true,
    L: true,
    M: true,
    N: true,
    O: true,
    R: true,
    S: true,
    X: true
  };
  //'a' regexes
  var a_regexs = [/^onc?e/i, //'wu' sound of 'o'
  /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
  /^eul/i];

  //begin business time
  ////////////////////
  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  if (is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
    return 'an';
  }
  //'a' regexes
  for (var i = 0; i < a_regexs.length; i++) {
    if (str.match(a_regexs[i])) {
      return 'a';
    }
  }
  //basic vowel-startings
  if (str.match(/^[aeiou]/i)) {
    return 'an';
  }
  return 'a';
};

module.exports = indefinite_article;

// console.log(indefinite_article('N.D.A'));

},{"../is_acronym.js":47}],50:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = require('../noun.js');
var parse_date = require('./parse_date.js');

var _Date = function (_Noun) {
  _inherits(_Date, _Noun);

  function _Date(str, tag) {
    _classCallCheck(this, _Date);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_Date).call(this, str));

    _this.tag = tag;
    _this.pos['Date'] = true;
    _this.data = parse_date(_this.text) || {};
    return _this;
  }

  //can we make it a js Date object?

  _createClass(_Date, [{
    key: 'is_date',
    value: function is_date() {
      var o = this.data;
      if (o.month === null || o.day === null || o.year === null) {
        return false;
      }
      return true;
    }
  }, {
    key: 'date',
    value: function date() {
      if (this.is_date() === false) {
        return null;
      }
      var d = new Date();
      if (this.data.year) {
        d.setYear(this.data.year);
      }
      if (this.data.month !== null) {
        d.setMonth(this.data.month);
      }
      if (this.data.day !== null) {
        d.setDate(this.data.day);
      }
      return d;
    }
  }]);

  return _Date;
}(Noun);

_Date.fn = _Date.prototype;

module.exports = _Date;

// let d = new _Date('June 4th 1993');
// console.log(d.date());

},{"../noun.js":56,"./parse_date.js":53}],51:[function(require,module,exports){
'use strict';

var months = require('../../../data/dates').months.concat(['march', 'may']); //(march and may are ambiguous grammatically)
var month = '(' + months.join('|') + ')';
var day = '([0-9]{1,2})';
var year = '\'?([12][0-9]{3})';

var rules = [{
  reg: month + ' ' + day + ' ' + year, //'March 1st 1987'
  order: ['month', 'day', 'year']
}, {
  reg: day + ' of ' + month + ' ' + year, //'3rd of March 1969',
  order: ['day', 'month', 'year']
},

//incomplete versions
{
  reg: day + ' of ' + month, //'3rd of March',
  order: ['day', 'month']
}, {
  reg: month + ' ' + year, //'March 1969',
  order: ['month', 'year']
}, {
  reg: month + ' ' + day, //'March 18th',
  order: ['month', 'day']
}, {
  reg: day + ' ' + month, //'18th of March',
  order: ['month', 'day']
}, {
  reg: '' + month, //'january'
  order: ['month']
}, {
  reg: '' + year, //'1998'
  order: ['year']
}].map(function (o) {
  o.reg = new RegExp('\\b' + o.reg + '\\b', '');
  return o;
});
module.exports = rules;

},{"../../../data/dates":5}],52:[function(require,module,exports){

'use strict';

var dates = require('../../../data/dates');

//build date regex
var terms = dates.months.concat(dates.days);
var day_reg = '(\\b' + terms.join('\\b|\\b') + '\\b)';
day_reg = new RegExp(day_reg, 'i');
var times_reg = /1?[0-9]:[0-9]{2}/;

var is_date = function is_date(str) {
  if (str.match(day_reg) || str.match(times_reg)) {
    return true;
  }
  return false;
};

module.exports = is_date;

// console.log(is_date('january fifth, 2015'));

},{"../../../data/dates":5}],53:[function(require,module,exports){
'use strict';
// #generates properly-formatted dates from free-text date forms
// #by spencer kelly 2015

var to_number = require('../value/to_number.js');
//regexes to top-parse
var rules = require('./date_rules.js');

//return integers from strings
var wrangle = {

  year: function year(s) {
    var num = s.match(/[0-9]+/);
    num = parseInt(num, 10);
    if (!num || num > 2900 || num < 0) {
      return null;
    }
    //honestly, prob not a year either
    if (num > 100 && num < 1000) {
      return null;
    }
    //'20BC' becomes -20
    if (s.match(/[0-9] ?bc/i)) {
      return num *= -1;
    }
    // '98 becomes 1998
    if (num < 100 && num > 30) {
      num += 1900;
    }
    return num;
  },

  month: function month(s) {
    //0 based months, 1 based days...
    var months_obj = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      aug: 7,
      sept: 8,
      oct: 9,
      nov: 10,
      dec: 11
    };
    return months_obj[s];
  },

  day: function day(s) {
    var n = to_number(s) || parseInt(s, 10);
    if (n < 0 || n > 31) {
      return null;
    }
    return n;
  }
};

//cleanup string
var preprocess = function preprocess(str) {
  str = str.toLowerCase();
  str = str.replace(/([0-9]+)(nd|rd|th|st)/i, '$1');
  var words = str.split(' ').map(function (w) {
    if (!w.match(/[0-9]/)) {
      return to_number(w) || w;
    }
    return w;
  });
  return words.join(' ');
};

var date_parser = function date_parser(str) {
  str = preprocess(str);
  var result = {
    year: null,
    month: null,
    day: null
  };
  for (var i = 0; i < rules.length; i++) {
    if (str.match(rules[i].reg)) {
      var m = str.match(rules[i].reg);
      for (var o = 0; o < rules[i].order.length; o++) {
        var type = rules[i].order[o];
        result[type] = wrangle[type](m[o + 1]);
      }
      break;
    }
  }
  return result;
};
module.exports = date_parser;
// console.log(wrangle.year('1998'));
// console.log(date_parser('March 1st 1987'));
// console.log(date_extractor('june second 1999'));

},{"../value/to_number.js":70,"./date_rules.js":51}],54:[function(require,module,exports){
'use strict';

var irregulars = require('../../data/irregular_nouns');

//similar to plural/singularize rules, but not the same
var plural_indicators = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i];

//similar to plural/singularize rules, but not the same
var singular_indicators = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];

var is_plural = function is_plural(str) {
  str = (str || '').toLowerCase();
  //handle 'mayors of chicago'
  var preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  for (var i = 0; i < irregulars.length; i++) {
    if (irregulars[i][1] === str) {
      return true;
    }
    if (irregulars[i][0] === str) {
      return false;
    }
  }
  for (var i = 0; i < plural_indicators.length; i++) {
    if (str.match(plural_indicators[i])) {
      return true;
    }
  }
  for (var i = 0; i < singular_indicators.length; i++) {
    if (str.match(singular_indicators[i])) {
      return false;
    }
  }
  // some 'looks pretty plural' rules
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) {
    //needs some lovin'
    return true;
  }
  return false;
};

// console.log(is_plural('octopus') === false)
// console.log(is_plural('octopi') === true)
// console.log(is_plural('eyebrow') === false)
// console.log(is_plural('eyebrows') === true)
// console.log(is_plural('child') === false)
// console.log(is_plural('children') === true)

module.exports = is_plural;

},{"../../data/irregular_nouns":9}],55:[function(require,module,exports){
//uncountables are words that shouldn't ever inflect, for metaphysical reasons, like 'peace'
'use strict';

var uncountable_arr = require('../../data/uncountables.js');

var uncountable = uncountable_arr.reduce(function (h, a) {
  h[a] = true;
  return h;
}, {});

var is_uncountable = function is_uncountable(str) {
  if (uncountable[str]) {
    return true;
  }
  return false;
};
// console.log(is_uncountable("peace") === true)
// console.log(is_uncountable("dog") === false)
module.exports = is_uncountable;

},{"../../data/uncountables.js":17}],56:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = require('../term.js');
var _article = require('./article.js');
var _is_plural = require('./is_plural.js');
var _is_place = require('./place/is_place.js');
var _is_person = require('./person/is_person.js');
var _pronoun = require('./pronoun.js');
var _is_value = require('./value/is_value.js');
var _is_date = require('./date/is_date.js');
var _is_organisation = require('./organisation/is_organisation.js');
var _singularize = require('./singularize.js');
var _pluralize = require('./pluralize.js');
var _is_uncountable = require('./is_uncountable.js');

var Noun = function (_Term) {
  _inherits(Noun, _Term);

  function Noun(str, tag) {
    _classCallCheck(this, Noun);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Noun).call(this, str));

    _this.tag = tag;
    _this.pos['Noun'] = true;
    if (tag) {
      _this.pos[tag] = true;
    }
    return _this;
  }
  //noun methods

  _createClass(Noun, [{
    key: 'article',
    value: function article() {
      return _article(this.text);
    }
  }, {
    key: 'pronoun',
    value: function pronoun() {
      if (this.is_organisation() || this.is_place() || this.is_value()) {
        return 'it';
      }
      return _pronoun(this.normal);
    }
  }, {
    key: 'is_plural',
    value: function is_plural() {
      return _is_plural(this.normal);
    }
  }, {
    key: 'is_uncountable',
    value: function is_uncountable() {
      return _is_uncountable(this.normal);
    }
  }, {
    key: 'pluralize',
    value: function pluralize() {
      return _pluralize(this.normal);
    }
  }, {
    key: 'singularize',
    value: function singularize() {
      return _singularize(this.normal);
    }
    //sub-classes

  }, {
    key: 'is_person',
    value: function is_person() {
      return _is_person(this.normal);
    }
  }, {
    key: 'is_organisation',
    value: function is_organisation() {
      return _is_organisation(this.normal, this.text);
    }
  }, {
    key: 'is_date',
    value: function is_date() {
      return _is_date(this.normal);
    }
  }, {
    key: 'is_value',
    value: function is_value() {
      return _is_value(this.normal);
    }
  }, {
    key: 'is_place',
    value: function is_place() {
      return _is_place(this.normal);
    }
  }]);

  return Noun;
}(Term);

Noun.fn = Noun.prototype;

module.exports = Noun;

// let t = new Noun('NDA');
// console.log(t.article());

},{"../term.js":73,"./article.js":49,"./date/is_date.js":52,"./is_plural.js":54,"./is_uncountable.js":55,"./organisation/is_organisation.js":57,"./person/is_person.js":60,"./place/is_place.js":63,"./pluralize.js":65,"./pronoun.js":66,"./singularize.js":67,"./value/is_value.js":68}],57:[function(require,module,exports){
'use strict';

var abbreviations = require('../../../data/abbreviations');
var org_data = require('../../../data/organisations');

//words like 'co' and ltd
var org_suffix = abbreviations.orgs.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});
org_data.suffixes.forEach(function (s) {
  //a few more
  org_suffix[s] = true;
});

//named orgs like google and nestle
var org_names = org_data.organisations.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var is_organisation = function is_organisation(str, text) {
  text = text || '';
  //some known organisations, like microsoft
  if (org_names[str]) {
    return true;
  }
  //no period acronyms
  if (text.length <= 5 && text.match(/^[A-Z][A-Z]+$/) !== null) {
    return true;
  }
  //period acronyms
  if (text.length >= 4 && text.match(/^([A-Z]\.)*$/) !== null) {
    return true;
  }
  // eg 'Smith & Co'
  if (str.match(/ & /)) {
    return true;
  }
  // Girlscouts of Canada
  if (str.match(/..s of /)) {
    return true;
  }
  // eg pets.com
  if (str.match(/[a-z]{3}\.(com|net|org|biz)/)) {
    //not a perfect url regex, but a "org.com"
    return true;
  }
  var words = str.split(' ');
  var last = words[words.length - 1];
  if (org_suffix[last]) {
    return true;
  }

  return false;
};

module.exports = is_organisation;

// console.log(is_organisation('Captain of Jamaica'));

},{"../../../data/abbreviations":2,"../../../data/organisations":14}],58:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = require('../noun.js');

var Organisation = function (_Noun) {
  _inherits(Organisation, _Noun);

  function Organisation(str, tag) {
    _classCallCheck(this, Organisation);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Organisation).call(this, str));

    _this.tag = tag;
    _this.pos['Organisation'] = true;

    return _this;
  }

  return Organisation;
}(Noun);

Organisation.fn = Organisation.prototype;
module.exports = Organisation;

},{"../noun.js":56}],59:[function(require,module,exports){
'use strict';

var firstnames = require('../../../data/firstnames');
var parse_name = require('./parse_name.js');

var gender = function gender(normal) {
  if (normal === 'he') {
    return 'Male';
  }
  if (normal === 'she') {
    return 'Female';
  }
  var o = parse_name(normal);
  var firstName = o.firstName;
  if (!firstName) {
    return null;
  }
  if (firstnames[firstName] === 'm') {
    return 'Male';
  }
  if (firstnames[firstName] === 'f') {
    return 'Female';
  }
  //male honourifics
  if (normal.match(/\b(mr|mister|sr|jr)\b/i)) {
    return 'Male';
  }
  //female honourifics
  if (normal.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /i)) {
    return 'Female';
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) {
    //this is almost-always true
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) {
    //if it ends in a 'oh or uh', male
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) {
    //if it has double-consonants, female
    return 'Female';
  }
  return null;
};
module.exports = gender;

// console.log(gender('john', 'john') === 'Male');
// console.log(gender('jane smith', 'jane') === 'Female');

},{"../../../data/firstnames":7,"./parse_name.js":61}],60:[function(require,module,exports){
'use strict';

var firstnames = require('../../../data/firstnames');
var honourifics = require('../../../data/honourifics').reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var whitelist = {
  'he': true,
  'she': true,
  'i': true,
  'you': true
};

var is_person = function is_person(str) {
  if (whitelist[str] || firstnames[str]) {
    return true;
  }
  var words = str.split(' ');
  if (words.length > 1) {
    var first = words[0];
    if (honourifics[first] || firstnames[first]) {
      return true;
    }
  }
  return false;
};

module.exports = is_person;

// console.log(is_person('Illi Danza'));

},{"../../../data/firstnames":7,"../../../data/honourifics":8}],61:[function(require,module,exports){
'use strict';

var firstnames = require('../../../data/firstnames');
var honourifics = require('../../../data/honourifics').reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var parse_name = function parse_name(str) {

  var words = str.split(' ');
  var o = {
    honourific: null,
    firstName: null,
    middleName: null,
    lastName: null
  };

  //first-word honourific
  if (honourifics[words[0]]) {
    o.honourific = words[0];
    words = words.slice(1, words.length);
  }
  //last-word honourific
  if (honourifics[words[words.length - 1]]) {
    o.honourific = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  //see if the first word is now a known first-name
  if (firstnames[words[0]]) {
    o.firstName = words[0];
    words = words.slice(1, words.length);
  } else {
    //ambiguous one-word name
    if (words.length === 1) {
      return o;
    }
    //looks like an unknown first-name
    o.firstName = words[0];
    words = words.slice(1, words.length);
  }
  //assume the remaining is '[middle..] [last]'
  if (words[words.length - 1]) {
    o.lastName = words[words.length - 1];
    words = words.slice(0, words.length - 1);
  }
  o.middleName = words.join(' ');
  return o;
};

module.exports = parse_name;

// console.log(parse_name('john smith'));

},{"../../../data/firstnames":7,"../../../data/honourifics":8}],62:[function(require,module,exports){
// not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = require('../noun.js');
var guess_gender = require('./gender.js');
var parse_name = require('./parse_name.js');

var Person = function (_Noun) {
  _inherits(Person, _Noun);

  function Person(str, tag) {
    _classCallCheck(this, Person);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Person).call(this, str));

    _this.tag = tag;
    _this.pos['Person'] = true;
    _this.honourific = null;
    _this.firstName = null;
    _this.middleName = null;
    _this.lastName = null;
    _this.parse();
    return _this;
  }

  //turn a multi-word string into [first, middle, last, honourific]

  _createClass(Person, [{
    key: 'parse',
    value: function parse() {
      var o = parse_name(this.normal);
      this.honourific = o.honourific;
      this.firstName = o.firstName;
      this.middleName = o.middleName;
      this.lastName = o.lastName;
    }
  }, {
    key: 'gender',
    value: function gender() {
      return guess_gender(this.normal);
    }
  }]);

  return Person;
}(Noun);

Person.fn = Person.prototype;
module.exports = Person;

// let p = new Person('John Smith');
// console.log(p.gender());

},{"../noun.js":56,"./gender.js":59,"./parse_name.js":61}],63:[function(require,module,exports){
'use strict';

var places = require('../../../data/places');
var abbreviations = require('../../../data/abbreviations');

//add Country names
var isPlace = places.countries.reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});
//add City names
places.cities.forEach(function (s) {
  isPlace[s] = true;
});
//add place abbreviations names
abbreviations.places.forEach(function (s) {
  isPlace[s] = true;
});

//these are signals too
var placeSignals = ['west', 'east', 'nort', 'south', 'western', 'eastern', 'nortern', 'southern', 'city', 'town', 'county', 'state', 'province'].reduce(function (h, s) {
  h[s] = true;
  return h;
}, {});

var is_place = function is_place(str) {
  var words = str.split();
  for (var i = 0; i < words.length; i++) {
    if (isPlace[words[i]]) {
      return true;
    }
    if (placeSignals[words[i]] && !placeSignals[str]) {
      return true;
    }
  }

  return false;
};

module.exports = is_place;

},{"../../../data/abbreviations":2,"../../../data/places":16}],64:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = require('../noun.js');

var Place = function (_Noun) {
  _inherits(Place, _Noun);

  function Place(str, tag) {
    _classCallCheck(this, Place);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Place).call(this, str));

    _this.tag = tag;
    _this.pos['Place'] = true;
    return _this;
  }

  return Place;
}(Noun);
Place.fn = Place.prototype;
module.exports = Place;

},{"../noun.js":56}],65:[function(require,module,exports){
'use strict';

var is_uncountable = require('./is_uncountable.js');
var irregulars = require('../../data/irregular_nouns.js');
var is_plural = require('./is_plural.js');
var fns = require('../../fns.js');

var pluralize_rules = [[/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/([rl])f$/i, '$1ves'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(?:([^f])fe|([lr])f)$/i, '$1ves'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh|s|z)$/i, '$1es'], [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes'], [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(.*)/i, '$1s']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var pluralize = function pluralize(str) {
  var low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) {
    //uncountables shouldn't ever inflect
    return str;
  }
  //is it already plural?
  if (is_plural(low) === true) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function (r) {
    return r[0] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) {
      //handle capitalisation properly
      return fns.titlecase(found[0][1]);
    }
    return found[0][1];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      var better_first = pluralize(first);
      return better_first + str.replace(first, '');
    }
  }
  //regular
  for (var i = 0; i < pluralize_rules.length; i++) {
    if (str.match(pluralize_rules[i].reg)) {
      return str.replace(pluralize_rules[i].reg, pluralize_rules[i].repl);
    }
  }
};
// console.log(pluralize('gas') === "gases")
// console.log(pluralize('narrative') === "narratives")
// console.log(pluralize('video') === "videos")
// console.log(pluralize('photo') === "photos")
// console.log(pluralize('stomach') === "stomachs")
// console.log(pluralize('database') === "databases")
// console.log(pluralize('kiss') === "kisses")
// console.log(pluralize('towns') === "towns")
// console.log(pluralize('peace') === "peace")
// console.log(pluralize('mayor of chicago') === "mayors of chicago")
module.exports = pluralize;

},{"../../data/irregular_nouns.js":9,"../../fns.js":19,"./is_plural.js":54,"./is_uncountable.js":55}],66:[function(require,module,exports){
'use strict';

var is_person = require('./person/is_person.js');
var is_plural = require('./is_plural.js');
var gender = require('./person/gender.js');

var pronoun = function pronoun(str) {
  if (is_person(str)) {
    var g = gender(str);
    if (g === 'Male') {
      return 'he';
    } else if (g === 'Female') {
      return 'she';
    }
    return 'they'; //singular they
  }
  //non-person, like 'microwaves'
  if (is_plural(str)) {
    return 'they';
  }
  return 'it';
};

module.exports = pronoun;

// console.log(pronoun('Illi Danza'));

},{"./is_plural.js":54,"./person/gender.js":59,"./person/is_person.js":60}],67:[function(require,module,exports){
'use strict';

var is_uncountable = require('./is_uncountable.js');
var irregulars = require('../../data/irregular_nouns.js');
var is_plural = require('./is_plural.js');
var fns = require('../../fns.js');

var singularize_rules = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/ives$/i, 'ife'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'], [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^f])ves$/i, '$1fe'], [/([lr])ves$/i, '$1f'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']].map(function (a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

var singularize = function singularize(str) {
  var low = str.toLowerCase();
  //uncountable
  if (is_uncountable(low)) {
    return str;
  }
  //is it already singular?
  if (is_plural(low) === false) {
    return str;
  }
  //irregular
  var found = irregulars.filter(function (r) {
    return r[1] === low;
  });
  if (found[0]) {
    if (fns.titlecase(low) === str) {
      //handle capitalisation properly
      return fns.titlecase(found[0][0]);
    }
    return found[0][0];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    var first = str.match(/^([a-z]*) (of|in|by|for) [a-z]/);
    if (first && first[1]) {
      var better_first = singularize(first[1]);
      return better_first + str.replace(first[1], '');
    }
  }
  //regular
  for (var i = 0; i < singularize_rules.length; i++) {
    if (str.match(singularize_rules[i].reg)) {
      return str.replace(singularize_rules[i].reg, singularize_rules[i].repl);
    }
  }
  return str;
};

// console.log(singularize('gases') === "gas")
// console.log(singularize('kisses') === "kiss")
// console.log(singularize('kiss') === "kiss")
// console.log(singularize('children') === "child")
// console.log(singularize('peace') === "peace")
// console.log(singularize('child') === "child")
// console.log(singularize('mayors of chicago') === "mayor of chicago")

module.exports = singularize;

},{"../../data/irregular_nouns.js":9,"../../fns.js":19,"./is_plural.js":54,"./is_uncountable.js":55}],68:[function(require,module,exports){
'use strict';

var nums = require('./numbers');
var is_date = require('../date/is_date');

var is_value = function is_value(str) {
  var words = str.split(' ');
  //'january 5' is not a value
  if (is_date(str)) {
    return false;
  }
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w] || nums.prefixes[w]) {
      return true;
    }
    if (parseFloat(w)) {
      return true;
    }
  }
  return false;
};

module.exports = is_value;

},{"../date/is_date":52,"./numbers":69}],69:[function(require,module,exports){
'use strict';

var ones = {
  'a': 1,
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'first': 1,
  'second': 2,
  'third': 3,
  'fourth': 4,
  'fifth': 5,
  'sixth': 6,
  'seventh': 7,
  'eighth': 8,
  'ninth': 9
};
var teens = {
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'thirteen': 13,
  'fourteen': 14,
  'fifteen': 15,
  'sixteen': 16,
  'seventeen': 17,
  'eighteen': 18,
  'nineteen': 19,
  'eleventh': 11,
  'twelfth': 12,
  'thirteenth': 13,
  'fourteenth': 14,
  'fifteenth': 15,
  'sixteenth': 16,
  'seventeenth': 17,
  'eighteenth': 18,
  'nineteenth': 19
};
var tens = {
  'twenty': 20,
  'thirty': 30,
  'forty': 40,
  'fifty': 50,
  'sixty': 60,
  'seventy': 70,
  'eighty': 80,
  'ninety': 90,
  'twentieth': 20,
  'thirtieth': 30,
  'fourtieth': 40,
  'fiftieth': 50,
  'sixtieth': 60,
  'seventieth': 70,
  'eightieth': 80,
  'ninetieth': 90
};
var multiples = {
  'hundred': 100,
  'grand': 1000,
  'thousand': 1000,
  'million': 1000000,
  'billion': 1000000000,
  'trillion': 1000000000000,
  'quadrillion': 1000000000000000,
  'quintillion': 1000000000000000000,
  'sextillion': 1000000000000000000000,
  'septillion': 1000000000000000000000000,
  'octillion': 1000000000000000000000000000,
  'nonillion': 1000000000000000000000000000000,
  'decillion': 1000000000000000000000000000000000
};

//used for the units
var prefixes = {
  'yotta': 1,
  'zeta': 1,
  'peta': 1,
  'tera': 1,
  'giga': 1,
  'mega': 1,
  'kilo': 1,
  'hecto': 1,
  'deca': 1,
  'centi': 1,
  'centa': 1,
  'milli': 1,
  'micro': 1,
  'nano': 1,
  'pico': 1,
  'femto': 1,
  'atto': 1,
  'zepto': 1,
  'yokto': 1,

  'square': 1,
  'cubic': 1,
  'quartic': 1
};

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples,
  prefixes: prefixes
};

},{}],70:[function(require,module,exports){
// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

'use strict';

var nums = require('./numbers.js');
//these sets of numbers each have different rules
//[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
// let decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};

//test for nearly-values, like phonenumbers, or whatever
var is_number = function is_number(s) {
  //phone numbers, etc
  if (s.match(/[:@]/)) {
    return false;
  }
  //if there's a number, then something, then a number
  if (s.match(/[0-9][^0-9,\.][0-9]/)) {
    return false;
  }
  return true;
};

//try the best to turn this into a integer/float
var to_number = function to_number(s) {
  if (s === null || s === undefined) {
    return null;
  }
  //if it's already a number,
  if (typeof s === 'number') {
    return s;
  }
  //remove symbols, commas, etc
  if (is_number(s) !== true) {
    return null;
  }
  s = s.replace(/[\$%\(\)~,]/g, '');
  s = s.trim();
  //if it's a number-as-string
  if (s.match(/^[0-9\.\-]+$/)) {
    return parseFloat(s);
  }
  //remember these concerns for possible errors
  var ones_done = false;
  var teens_done = false;
  var tens_done = false;
  var multiple_done = {};
  var total = 0;
  var global_multiplier = 1;
  //pretty-printed numbers
  s = s.replace(/, ?/g, '');
  //parse-out currency
  s = s.replace(/[$£€]/, '');
  //try to die fast. (phone numbers or times)
  if (s.match(/[0-9][\-:][0-9]/)) {
    return null;
  }
  //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  var mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }, {
    reg: /^(a\s)?quarter[\s\-]/i,
    mult: 0.25
  }];
  for (var i = 0; i < mults.length; i++) {
    if (s.match(mults[i].reg)) {
      global_multiplier = mults[i].mult;
      s = s.replace(mults[i].reg, '');
      break;
    }
  }

  //do each word in turn..
  var words = s.toString().split(/[\s\-]+/);
  var w = undefined,
      x = undefined;
  var current_sum = 0;
  var local_multiplier = 1;
  var decimal_mode = false;
  for (var i = 0; i < words.length; i++) {
    w = words[i];

    //skip 'and' eg. five hundred and twelve
    if (w === 'and') {
      continue;
    }

    //..we're doing decimals now
    if (w === 'point' || w === 'decimal') {
      if (decimal_mode) {
        return null;
      } //two point one point six
      decimal_mode = true;
      total += current_sum;
      current_sum = 0;
      ones_done = false;
      local_multiplier = 0.1;
      continue;
    }

    //handle special rules following a decimal
    if (decimal_mode) {
      x = null;
      //allow consecutive ones in decimals eg. 'two point zero five nine'
      if (nums.ones[w] !== undefined) {
        x = nums.ones[w];
      }
      if (nums.teens[w] !== undefined) {
        x = nums.teens[w];
      }
      if (parseInt(w, 10) === w) {
        x = parseInt(w, 10);
      }
      if (!x) {
        return null;
      }
      if (x < 10) {
        total += x * local_multiplier;
        local_multiplier = local_multiplier * 0.1; // next number is next decimal place
        current_sum = 0;
        continue;
      }
      //two-digit decimals eg. 'two point sixteen'
      if (x < 100) {
        total += x * (local_multiplier * 0.1);
        local_multiplier = local_multiplier * 0.01; // next number is next decimal place
        current_sum = 0;
        continue;
      }
    }

    //if it's already an actual number
    if (w.match(/^[0-9\.]+$/)) {
      current_sum += parseFloat(w);
      continue;
    }
    if (parseInt(w, 10) === w) {
      current_sum += parseInt(w, 10);
      continue;
    }
    //ones rules
    if (nums.ones[w] !== undefined) {
      if (ones_done) {
        return null;
      } // eg. five seven
      if (teens_done) {
        return null;
      } // eg. five seventeen
      ones_done = true;
      current_sum += nums.ones[w];
      continue;
    }
    //teens rules
    if (nums.teens[w]) {
      if (ones_done) {
        return null;
      } // eg. five seventeen
      if (teens_done) {
        return null;
      } // eg. fifteen seventeen
      if (tens_done) {
        return null;
      } // eg. sixty fifteen
      teens_done = true;
      current_sum += nums.teens[w];
      continue;
    }
    //tens rules
    if (nums.tens[w]) {
      if (ones_done) {
        return null;
      } // eg. five seventy
      if (teens_done) {
        return null;
      } // eg. fiveteen seventy
      if (tens_done) {
        return null;
      } // eg. twenty seventy
      tens_done = true;
      current_sum += nums.tens[w];
      continue;
    }
    //multiple rules
    if (nums.multiples[w]) {
      if (multiple_done[w]) {
        return null;
      } // eg. five hundred six hundred
      multiple_done[w] = true;
      //reset our concerns. allow 'five hundred five'
      ones_done = false;
      teens_done = false;
      tens_done = false;
      //case of 'hundred million', (2 consecutive multipliers)
      if (current_sum === 0) {
        total = total || 1; //dont ever multiply by 0
        total *= nums.multiples[w];
      } else {
        current_sum *= nums.multiples[w];
        total += current_sum;
      }
      current_sum = 0;
      continue;
    }
    //if word is not a known thing now, die
    return null;
  }
  if (current_sum) {
    total += (current_sum || 1) * local_multiplier;
  }
  //combine with global multiplier, like 'minus' or 'half'
  total = total * global_multiplier;

  return total;
};

// console.log(to_number('minus five hundred'));
// console.log(to_number("a hundred"))
// console.log(to_number('four point six'));

//kick it into module
module.exports = to_number;

},{"./numbers.js":69}],71:[function(require,module,exports){
'use strict';

var units = {
  'Temperature': {
    '°C': 'Celsius',
    '°F': 'Fahrenheit',
    'K': 'Kelvin',
    '°Ré': 'Reaumur',
    '°N': 'Newton',
    '°Ra': 'Rankine'
  },
  'Volume': {
    'm³': 'cubic meter',
    'dm³': 'cubic decimeter',
    'cm³': 'cubic centimeter',
    'l': 'liter',
    'dl': 'deciliter',
    'cl': 'centiliter',
    'ml': 'milliliter',
    'in³': 'cubic inch',
    'ft³': 'cubic foot',
    'yd³': 'cubic yard',
    'gal': 'gallon',
    'bbl': 'petroleum barrel',
    'pt': 'pint'
  },
  'Distance': {
    'km': 'kilometer',
    'm': 'meter',
    'dm': 'decimeter',
    'cm': 'centimeter',
    'mm': 'millimeter',
    'mi': 'mile',
    'in': 'inch',
    'ft': 'foot',
    'feet': 'foot',
    'yd': 'yard'
  },
  'Weight': {
    't': 'tonne',
    'kg': 'kilogram',
    'hg': 'hectogram',
    'g': 'gram',
    'dg': 'decigram',
    'cg': 'centigram',
    'mg': 'milligram',
    'µg': 'microgram',
    'carat': 'carat',
    'grain': 'grain',
    'oz': 'ounce',
    'lb': 'pound',
    'ton': 'tonne',
    'st': 'stone'
  },
  'Area': {
    'km²': 'square kilometer',
    'm²': 'square meter',
    'dm²': 'square decimeter',
    'cm²': 'square centimeter',
    'mm²': 'square millimeter',
    'ha': 'hectare',
    'ca': 'centiare',
    'mile²': 'square mile',
    'in²': 'square inch',
    'yd²': 'square yard',
    'ft²': 'square foot',
    'acre': 'acre'
  },
  'Frequency': {
    'Hz': 'hertz'
  },
  'Speed': {
    'km/h': 'kilometer per hour',
    'kmph': 'kilometer per hour',
    'mps': 'meter per second',
    'm/s': 'meter per second',
    'mph': 'mile per hour',
    'mi/h': 'mile per hour',
    'knot': 'knot'
  },
  'Data': {
    'b': 'bit',
    'B': 'byte',
    'KB': 'kilobyte',
    'Kb': 'kilobyte',
    'MB': 'megabyte',
    'Mb': 'megabyte',
    'GB': 'gigabyte',
    'Gb': 'gigabyte',
    'TB': 'terabyte',
    'Tb': 'terabyte',
    'PB': 'petabyte',
    'Pb': 'petabyte',
    'EB': 'exabyte',
    'Eb': 'exabyte',
    'ZB': 'zettabyte',
    'Zb': 'zettabyte',
    'YB': 'yottabyte',
    'Yb': 'yottabyte'
  },
  'Energy': {
    'J': 'joule',
    'Pa': 'pascal',
    'bar': 'bar',
    'W': 'watt',
    'N': 'newton',
    'Wb': 'weber',
    'T': 'tesla',
    'H': 'henry',
    'C': 'coulomb',
    'V': 'volt',
    'F': 'farad',
    'S': 'siemens',
    'O': 'ohm',
    'lx': 'lux',
    'lm': 'lumen'
  },
  'Time': {
    'year': 'year',
    'week': 'week',
    'day': 'day',
    'h': 'hour',
    'min': 'minute',
    's': 'second',
    'ms': 'millisecond',
    'µs': 'microsecond',
    'nanosecond': 'nanosecond',
    'picosecond': 'picosecond',
    'femtosecond': 'femtosecond',
    'attosecond': 'attosecond'
  },
  'Money': {
    'dollar': 'currency',
    'cent': 'currency',
    'penny': 'currency',
    'dime': 'currency',
    'dinar': 'currency',
    'euro': 'currency',
    'EU': 'currency',
    'lira': 'currency',
    'pound': 'currency',
    'GBP': 'currency',
    'pence': 'currency',
    'peso': 'currency',
    'sterling': 'currency',
    'rand': 'currency',
    'rouble': 'currency',
    'shekel': 'currency',
    'yen': 'currency',
    'yuan': 'currency',
    'franc': 'currency',
    'rupee': 'currency',
    'shilling': 'currency',
    'won': 'currency',
    'krona': 'currency',
    'dirham': 'currency',
    '€': 'currency',
    '$': 'currency',
    '¥': 'currency',
    '£': 'currency',
    'real': 'currency',
    'USD': 'currency',
    'AUD': 'currency',
    'CAD': 'currency',
    'BRL': 'currency',
    'EUR': 'currency',
    'CNY': 'currency',
    'EGP': 'currency',
    'MXN': 'currency'
  }
};

module.exports = Object.keys(units).reduce(function (h, k) {
  Object.keys(units[k]).forEach(function (u) {
    h[u] = {
      name: units[k][u],
      category: k
    };
    h[units[k][u]] = {
      name: units[k][u],
      category: k
    };
  });
  return h;
}, {});

},{}],72:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Noun = require('../noun.js');
var to_number = require('./to_number.js');
var units = require('./units.js');
var nums = require('./numbers.js');

var Value = function (_Noun) {
  _inherits(Value, _Noun);

  function Value(str, tag) {
    _classCallCheck(this, Value);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Value).call(this, str));

    _this.tag = tag;
    _this.pos['Value'] = true;
    _this.number = null;
    _this.unit = null;
    _this.unit_name = null;
    _this.measurement = null;
    _this.parse();
    return _this;
  }

  _createClass(Value, [{
    key: 'is_unit',
    value: function is_unit(s) {
      if (units[s]) {
        return true;
      }
      s = s.toLowerCase();
      if (nums.prefixes[s]) {
        return true;
      }
      //try singular version
      s = s.replace(/s$/); //ew
      if (units[s]) {
        return true;
      }

      return false;
    }
  }, {
    key: 'parse',
    value: function parse() {
      var words = this.text.toLowerCase().split(' ');
      var number_words = {
        minus: true,
        point: true
      };
      var numbers = '';
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w] || number_words[w] || w.match(/[0-9]/)) {
          numbers += ' ' + w;
        } else if (this.is_unit(w)) {
          //optional units come after the number
          this.unit = w;
          if (units[w]) {
            this.measurement = units[w].category;
            this.unit_name = units[w].name;
          }
        }
      }
      this.number = to_number(numbers);
    }
  }]);

  return Value;
}(Noun);

Value.fn = Value.prototype;

module.exports = Value;

},{"../noun.js":56,"./numbers.js":69,"./to_number.js":70,"./units.js":71}],73:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _is_acronym = require('./is_acronym');
var _match = require('./match');
var fns = require('../fns');

var Term = function () {
  function Term(str, tag) {
    _classCallCheck(this, Term);

    //fail-safe
    if (str === null || str === undefined) {
      str = '';
    }
    str = str.toString();
    //set .text
    this.text = str;
    //the normalised working-version of the word
    this.normal = '';
    // the simplified inflected, conjugated version
    // (akin to lemma or stem but full word)
    this.root = '';
    //if it's a contraction, the 'hidden word'
    this.implicit = '';
    //set .normal
    this.rebuild();
    //the reasoning behind it's part-of-speech
    this.reason = '';
    //these are orphaned POS that have no methods
    var types = {
      Determiner: 'Determiner',
      Conjunction: 'Conjunction',
      Preposition: 'Preposition',
      Posessive: 'Posessive',
      Expression: 'Expression'
    };
    this.pos = {};
    this.tag = types[tag] || '?';
    //record them in pos{}
    if (types[tag]) {
      this.pos[types[tag]] = true;
    }
  }

  //when the text changes, rebuild derivative fields

  _createClass(Term, [{
    key: 'rebuild',
    value: function rebuild() {
      this.text = this.text || '';
      this.text = this.text.trim();
      this.normal = '';
      this.normalize();
    }
  }, {
    key: 'changeTo',
    value: function changeTo(str) {
      this.text = str;
      this.rebuild();
    }
    //a regex-like string search

  }, {
    key: 'match',
    value: function match(str, options) {
      return _match(this, str, options);
    }

    //Term methods..

  }, {
    key: 'has_comma',
    value: function has_comma() {
      if (this.text.match(/,$/)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'is_capital',
    value: function is_capital() {
      if (this.text.match(/[A-Z][a-z]/)) {
        return true;
      }
      return false;
    }
    //FBI or F.B.I.

  }, {
    key: 'is_acronym',
    value: function is_acronym() {
      return _is_acronym(this.text);
    }
    //working word

  }, {
    key: 'normalize',
    value: function normalize() {
      var str = this.text || '';
      str = str.toLowerCase();
      str = str.replace(/[,\.!:;\?\(\)]/, '');
      str = str.replace(/’/g, '\'');
      str = str.replace(/"/g, '');
      // coerce single curly quotes
      str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
      // coerce double curly quotes
      str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
      if (!str.match(/[a-z0-9]/i)) {
        return '';
      }
      this.normal = str;
      return this.normal;
    }
  }]);

  return Term;
}();

Term.fn = Term.prototype;
// let t = new Term('quick');
// console.log(t.lookup('(fun|nice|quick|cool)'));

module.exports = Term;

},{"../fns":19,"./is_acronym":47,"./match":48}],74:[function(require,module,exports){
//turn a verb into its other grammatical forms.
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var verb_to_actor = require('./to_actor');
var to_infinitive = require('./to_infinitive');
var from_infinitive = require('./from_infinitive');
var irregular_verbs = require('../../../data/irregular_verbs');
var predict = require('./predict_form.js');

//make sure object has all forms
var fufill = function fufill(obj, prefix) {
  if (!obj.infinitive) {
    return obj;
  }
  if (!obj.gerund) {
    if (obj.infinitive.match(/e$/)) {
      obj.gerund = obj.infinitive.replace(/e$/, 'ing');
    } else {
      obj.gerund = obj.infinitive + 'ing';
    }
  }
  if (obj.actor === undefined) {
    obj.actor = verb_to_actor(obj.infinitive);
  }
  if (!obj.present) {
    obj.present = obj.infinitive + 's';
  }
  if (!obj.past) {
    if (obj.infinitive.match(/e$/)) {
      obj.past = obj.infinitive + 'd';
    } else {
      obj.past = obj.infinitive + 'ed';
    }
  }
  //add the prefix to all forms, if it exists
  if (prefix) {
    Object.keys(obj).forEach(function (k) {
      obj[k] = prefix + obj[k];
    });
  }
  //future is 'will'+infinitive
  if (!obj.future) {
    obj.future = 'will ' + obj.infinitive;
  }
  //perfect is 'have'+past-tense
  if (!obj.perfect) {
    obj.perfect = 'have ' + (obj.participle || obj.past);
  }
  //pluperfect is 'had'+past-tense
  if (!obj.pluperfect) {
    obj.pluperfect = 'had ' + obj.past;
  }
  //future perfect is 'will have'+past-tense
  if (!obj.future_perfect) {
    obj.future_perfect = 'will have ' + obj.past;
  }
  return obj;
};

var conjugate = function conjugate(w) {
  if (w === undefined) {
    return {};
  }

  //for phrasal verbs ('look out'), conjugate look, then append 'out'
  var phrasal_reg = new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$', 'i');
  if (w.match(phrasal_reg)) {
    var _ret = function () {
      var split = w.match(phrasal_reg, '');
      var phrasal_verb = split[1];
      var particle = split[2];
      var result = conjugate(phrasal_verb); //recursive
      Object.keys(result).forEach(function (k) {
        if (result[k]) {
          result[k] += ' ' + particle;
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  //for pluperfect ('had tried') remove 'had' and call it past-tense
  w = w.replace(/^had /i, '');
  //for perfect ('have tried') remove 'have' and call it past-tense
  w = w.replace(/^have /i, '');
  //for future perfect ('will have tried') remove 'will have' and call it past-tense
  w = w.replace(/^will have /i, '');
  //chop it if it's future-tense
  w = w.replace(/^will /i, '');

  //un-prefix the verb, and add it in later
  var prefix = '';
  var match = w.match(/^(over|under|re|anti|full)[- ]?([a-z]*)/i);
  if (match) {
    prefix = match[1];
    w = match[2];
  }
  //guess the tense, so we know which transormation to make
  var predicted = predict(w) || 'infinitive';
  //check against suffix rules
  var infinitive = to_infinitive(w, predicted) || '';
  //check irregulars
  var obj = irregular_verbs[w] || irregular_verbs[infinitive] || {};
  obj = Object.assign({}, obj);
  //apply regex-transformations
  var conjugations = from_infinitive(infinitive);
  Object.keys(conjugations).forEach(function (k) {
    if (!obj[k]) {
      obj[k] = conjugations[k];
    }
  });
  return fufill(obj, prefix);
};
module.exports = conjugate;

// console.log(conjugate('die'));

// // broken
// console.log(conjugate("read"))
// console.log(conjugate("free"))
// console.log(conjugate("flesh"))
// console.log(conjugate("branch"))
// console.log(conjugate("spred"))
// console.log(conjugate("bog"))
// console.log(conjugate("nod"))
// console.log(conjugate("had tried"))
// console.log(conjugate("wrote about"))

},{"../../../data/irregular_verbs":10,"./from_infinitive":75,"./predict_form.js":76,"./to_actor":78,"./to_infinitive":79}],75:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var rules = [{
  reg: /(eave)$/i,
  repl: {
    pr: '$1s',
    pa: '$1d',
    gr: 'eaving',
    ar: '$1r'
  }
}, {
  reg: /(end)$/i,
  repl: {
    pr: '$1s',
    pa: 'ent',
    gr: '$1ing',
    ar: '$1er'
  }
}, {
  reg: /(ide)$/i,
  repl: {
    pr: '$1s',
    pa: 'ode',
    gr: 'iding',
    ar: 'ider'
  }
}, {
  reg: /(ake)$/i,
  repl: {
    pr: '$1s',
    pa: 'ook',
    gr: 'aking',
    ar: '$1r'
  }
}, {
  reg: /(eed)$/i,
  repl: {
    pr: '$1s',
    pa: '$1ed',
    gr: '$1ing',
    ar: '$1er'
  }
}, {
  reg: /(e)(ep)$/i,
  repl: {
    pr: '$1$2s',
    pa: '$1pt',
    gr: '$1$2ing',
    ar: '$1$2er'
  }
}, {
  reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
  repl: {
    pr: '$1es',
    pa: '$1ed',
    gr: '$1ing',
    prt: '$1en'
  }
}, {
  reg: /([i|f|rr])y$/i,
  repl: {
    pr: '$1ies',
    pa: '$1ied',
    gr: '$1ying'
  }
}, {
  reg: /([td]er)$/i,
  repl: {
    pr: '$1s',
    pa: '$1ed',
    gr: '$1ing'
  }
}, {
  reg: /([bd]l)e$/i,
  repl: {
    pr: '$1es',
    pa: '$1ed',
    gr: '$1ing'
  }
}, {
  reg: /(ish|tch|ess)$/i,
  repl: {
    pr: '$1es',
    pa: '$1ed',
    gr: '$1ing'
  }
}, {
  reg: /(ion|end|e[nc]t)$/i,
  repl: {
    pr: '$1s',
    pa: '$1ed',
    gr: '$1ing'
  }
}, {
  reg: /(om)e$/i,
  repl: {
    pr: '$1es',
    pa: 'ame',
    gr: '$1ing'
  }
}, {
  reg: /([aeiu])([pt])$/i,
  repl: {
    pr: '$1$2s',
    pa: '$1$2',
    gr: '$1$2$2ing'
  }
}, {
  reg: /(er)$/i,
  repl: {
    pr: '$1s',
    pa: '$1ed',
    gr: '$1ing'
  }
}, {
  reg: /(en)$/i,
  repl: {
    pr: '$1s',
    pa: '$1ed',
    gr: '$1ing'
  }
}, {
  reg: /(..)(ow)$/i,
  repl: {
    pr: '$1$2s',
    pa: '$1ew',
    gr: '$1$2ing',
    prt: '$1$2n'
  }
}];

var keys = {
  pr: 'present',
  pa: 'past',
  gr: 'gerund',
  prt: 'participle',
  ar: 'actor'
};

var from_infinitive = function from_infinitive(str) {
  var obj = {
    infinitive: str
  };
  if (!str || typeof str !== 'string') {
    // console.log(str);
    return obj;
  }

  var _loop = function _loop(i) {
    if (str.match(rules[i].reg)) {
      Object.keys(rules[i].repl).forEach(function (k) {
        obj[keys[k]] = str.replace(rules[i].reg, rules[i].repl[k]);
      });
      return {
        v: obj
      };
    }
  };

  for (var i = 0; i < rules.length; i++) {
    var _ret = _loop(i);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return obj;
};
// console.log(from_infinitive('watch'));

module.exports = from_infinitive;

},{}],76:[function(require,module,exports){
'use strict';
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library,

var fns = require('../../../fns.js');
var suffix_rules = require('./suffix_rules');
var irregular_verbs = require('../../../data/irregular_verbs');
var known_verbs = Object.keys(irregular_verbs).reduce(function (h, k) {
  Object.keys(irregular_verbs[k]).forEach(function (k2) {
    h[irregular_verbs[k][k2]] = k2;
  });
  return h;
}, {});

var predict = function predict(w) {

  //check if known infinitive
  if (irregular_verbs[w]) {
    return 'infinitive';
  }
  //check if known infinitive
  if (known_verbs[w]) {
    return known_verbs[w];
  }

  if (w.match(/will ha(ve|d) [a-z]{2}/)) {
    return 'future_perfect';
  }
  if (w.match(/will [a-z]{2}/)) {
    return 'future';
  }
  if (w.match(/had [a-z]{2}/)) {
    return 'pluperfect';
  }
  if (w.match(/have [a-z]{2}/)) {
    return 'perfect';
  }
  if (w.match(/..erer$/)) {
    return 'actor';
  }
  if (w.match(/[^aeiou]ing$/)) {
    return 'gerund';
  }

  var arr = Object.keys(suffix_rules);
  for (var i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i]) && arr[i].length < w.length) {
      return suffix_rules[arr[i]];
    }
  }
  return 'infinitive';
};

module.exports = predict;

},{"../../../data/irregular_verbs":10,"../../../fns.js":19,"./suffix_rules":77}],77:[function(require,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data

var compact = {
  'gerund': [],
  'infinitive': ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'eed', 'er', 'le'],
  'participle': ['own', 'unk', 'ung', 'en'],
  'past': ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  'present': ['rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns', 's']
};
var suffix_rules = {};
var keys = Object.keys(compact);
var l = keys.length;

for (var i = 0; i < l; i++) {
  var l2 = compact[keys[i]].length;
  for (var o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i];
  }
}
module.exports = suffix_rules;

},{}],78:[function(require,module,exports){
//somone who does this present-tense verb
//turn 'walk' into 'walker'
'use strict';

var actor = function actor(str) {
  str = str || '';
  var irregulars = {
    'tie': 'tier',
    'dream': 'dreamer',
    'sail': 'sailer',
    'run': 'runner',
    'rub': 'rubber',
    'begin': 'beginner',
    'win': 'winner',
    'claim': 'claimant',
    'deal': 'dealer',
    'spin': 'spinner'
  };
  var dont = {
    'aid': 1,
    'fail': 1,
    'appear': 1,
    'happen': 1,
    'seem': 1,
    'try': 1,
    'say': 1,
    'marry': 1,
    'be': 1,
    'forbid': 1,
    'understand': 1,
    'bet': 1
  };
  var transforms = [{
    'reg': /e$/i,
    'repl': 'er'
  }, {
    'reg': /([aeiou])([mlgp])$/i,
    'repl': '$1$2$2er'
  }, {
    'reg': /([rlf])y$/i,
    'repl': '$1ier'
  }, {
    'reg': /^(.?.[aeiou])t$/i,
    'repl': '$1tter'
  }];

  if (dont.hasOwnProperty(str)) {
    return null;
  }
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (var i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + 'er';
};

// console.log(verb_to_actor('set'))
// console.log(verb_to_actor('sweep'))
// console.log(verb_to_actor('watch'))
module.exports = actor;

},{}],79:[function(require,module,exports){
'use strict';

var irregular_verbs = require('../../../data/irregular_verbs');
var known_verbs = Object.keys(irregular_verbs).reduce(function (h, k) {
  Object.keys(irregular_verbs[k]).forEach(function (k2) {
    h[irregular_verbs[k][k2]] = k;
  });
  return h;
}, {});

var rules = {
  participle: [{
    reg: /own$/i,
    to: 'ow'
  }, {
    reg: /(.)un([g|k])$/i,
    to: '$1in$2'
  }, {
    reg: /(..)en$/i,
    to: '$1e'
  }],
  actor: [{
    reg: /(er)er$/i,
    to: '$1'
  }],
  present: [{
    reg: /(ies)$/i,
    to: 'y'
  }, {
    reg: /(tch|sh)es$/i,
    to: '$1'
  }, {
    reg: /(ss)es$/i,
    to: '$1'
  }, {
    reg: /([tzlshicgrvdnkmu])es$/i,
    to: '$1e'
  }, {
    reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
    to: '$1'
  }, {
    reg: /(ow)s$/i,
    to: '$1'
  }, {
    reg: /(op)s$/i,
    to: '$1'
  }, {
    reg: /([eirs])ts$/i,
    to: '$1t'
  }, {
    reg: /(ll)s$/i,
    to: '$1'
  }, {
    reg: /(el)s$/i,
    to: '$1'
  }, {
    reg: /(ip)es$/i,
    to: '$1e'
  }, {
    reg: /ss$/i,
    to: 'ss'
  }, {
    reg: /s$/i,
    to: ''
  }],
  gerund: [{
    reg: /pping$/i,
    to: 'p'
  }, {
    reg: /lling$/i,
    to: 'll'
  }, {
    reg: /tting$/i,
    to: 't'
  }, {
    reg: /ssing$/i,
    to: 'ss'
  }, {
    reg: /gging$/i,
    to: 'g'
  }, {
    reg: /([^aeiou])ying$/i,
    to: '$1y'
  }, {
    reg: /(i.)ing$/i,
    to: '$1e'
  }, {
    reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
    to: '$1e'
  }, {
    reg: /(ch|sh)ing$/i,
    to: '$1'
  }, {
    reg: /(..)ing$/i,
    to: '$1'
  }],
  past: [{
    reg: /(ued)$/i,
    to: 'ue'
  }, {
    reg: /(e|i)lled$/i,
    to: '$1ll'
  }, {
    reg: /(sh|ch)ed$/i,
    to: '$1'
  }, {
    reg: /(tl|gl)ed$/i,
    to: '$1e'
  }, {
    reg: /(ss)ed$/i,
    to: '$1'
  }, {
    reg: /pped$/i,
    to: 'p'
  }, {
    reg: /tted$/i,
    to: 't'
  }, {
    reg: /gged$/i,
    to: 'g'
  }, {
    reg: /(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
    to: '$1'
  }, {
    reg: /(..[^aeiou])ed$/i,
    to: '$1e'
  }, {
    reg: /ied$/i,
    to: 'y'
  }, {
    reg: /(.o)ed$/i,
    to: '$1o'
  }, {
    reg: /(.i)ed$/i,
    to: '$1'
  }, {
    reg: /([rl])ew$/i,
    to: '$1ow'
  }, {
    reg: /([pl])t$/i,
    to: '$1t'
  }]
};

var to_infinitive = function to_infinitive(str, from_tense) {
  if (known_verbs[str]) {
    return known_verbs[str];
  }
  if (from_tense === 'infinitive') {
    return str;
  }
  var regs = rules[from_tense] || [];
  for (var i = 0; i < regs.length; i++) {
    if (str.match(regs[i].reg)) {
      return str.replace(regs[i].reg, regs[i].to);
    }
  }
  return str;
};

// console.log(to_infinitive('underwent', 'past'));

module.exports = to_infinitive;

},{"../../../data/irregular_verbs":10}],80:[function(require,module,exports){
'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't

var negate = function negate(v, form) {

  var exceptions = {
    'is': 'isn\'t',
    'are': 'aren\'t',
    'was': 'wasn\'t',
    'will': 'won\'t',
    'had': 'hadn\'t',
    //modals
    'did': 'didn\'t',
    'would': 'wouldn\'t',
    'could': 'couldn\'t',
    'should': 'shouldn\'t',
    'can': 'can\'t',
    'must': 'mustn\'t',
    'have': 'hasn\'t',
    'does': 'doesn\'t',
    //un-negate?
    'didn\'t': 'did',
    'doesn\'t': 'does',
    'wouldn\'t': 'would',
    'couldn\'t': 'could',
    'shouldn\'t': 'should',
    'can\'t': 'can',
    'won\'t': 'will',
    'mustn\'t': 'must',
    'shan\'t': 'shall',
    'shant': 'shall',
    'not': '',
    'don\'t': ''
  };
  //hard-coded exceptions
  if (exceptions[v.normal]) {
    return exceptions[v.normal];
  }

  //multiple-word verbs, like 'have walked'
  var words = v.normal.split(' ');
  if (words.length > 1 && exceptions[words[0]]) {
    return exceptions[words[0]] + ' ' + words.slice(1, words.length).join(' ');
  }
  form = form || v.conjugation();
  //walked -> didn't walk
  if (form === 'PastTense') {
    return 'didn\'t ' + v.conjugate()['infinitive'];
  }
  //walks -> doesn't walk
  if (form === 'PresentTense') {
    return 'doesn\'t ' + v.conjugate()['infinitive'];
  }
  //walking -> not walking
  if (form === 'Gerund') {
    return 'not ' + v.text;
  }
  //walker -> non-walker ?
  if (form === 'Actor') {
    return 'non-' + v.text;
  }
  //walk -> not walk ?
  if (form === 'Infinitive') {
    return 'not ' + v.text;
  }

  return v.text;
};

module.exports = negate;

},{}],81:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Term = require('../term.js');
var _conjugate = require('./conjugate/conjugate.js');
var _negate = require('./negate.js');

var verbTags = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
  PresentTense: 'PresentTense'
};

var Verb = function (_Term) {
  _inherits(Verb, _Term);

  function Verb(str, tag) {
    _classCallCheck(this, Verb);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Verb).call(this, str));

    _this.tag = tag;
    _this.pos['Verb'] = true;
    _this.conjugations = {}; //cached conjugations
    //if we've been told which
    _this.pos[tag] = true;
    if (tag && verbTags[tag]) {
      _this.conjugations[tag] = _this.normal;
    }
    return _this;
  }

  //retrieve a specific form

  _createClass(Verb, [{
    key: 'conjugation',
    value: function conjugation() {
      //check cached conjugations
      this.conjugations = this.conjugate();
      var keys = Object.keys(this.conjugations);
      for (var i = 0; i < keys.length; i++) {
        if (this.conjugations[keys[i]] === this.normal) {
          return verbTags[keys[i]];
        }
      }
      return verbTags[predict(this.normal)];
    }
  }, {
    key: 'conjugate',
    value: function conjugate() {
      this.conjugations = _conjugate(this.normal);
      return this.conjugations;
    }
  }, {
    key: 'to_past',
    value: function to_past() {
      var tense = 'past';
      if (!this.conjugations[tense]) {
        this.conjugate(this.normal);
      }
      this.tag = verbTags[tense];
      this.changeTo(this.conjugations[tense]);
      return this.conjugations[tense];
    }
  }, {
    key: 'to_present',
    value: function to_present() {
      var tense = 'present';
      if (!this.conjugations[tense]) {
        this.conjugate(this.normal);
      }
      this.tag = verbTags[tense];
      this.changeTo(this.conjugations[tense]);
      return this.conjugations[tense];
    }
  }, {
    key: 'to_future',
    value: function to_future() {
      var tense = 'future';
      if (!this.conjugations[tense]) {
        this.conjugate(this.normal);
      }
      this.tag = verbTags[tense];
      this.changeTo(this.conjugations[tense]);
      return this.conjugations[tense];
    }

    //is this verb negative already?

  }, {
    key: 'isNegative',
    value: function isNegative() {
      var str = this.normal;
      if (str.match(/(n't|\bnot\b)/)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'negate',
    value: function negate(form) {
      if (this.isNegative()) {
        return this.text;
      }
      this.changeTo(_negate(this, form));
      return this.text;
    }
  }]);

  return Verb;
}(Term);

Verb.fn = Verb.prototype;

module.exports = Verb;

// let v = new Verb('cost of');
// v.conjugate();
// console.log(v.conjugate());

},{"../term.js":73,"./conjugate/conjugate.js":74,"./negate.js":80}],82:[function(require,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';

var abbreviations = require('../data/abbreviations').abbreviations;

var sentence_parser = function sentence_parser(text) {
  var sentences = [];
  //first do a greedy-split..
  var chunks = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);

  //detection of non-sentence chunks
  var abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
  var acronym_reg = new RegExp('[ |\.][A-Z]\.?$', 'i');
  var elipses_reg = new RegExp('\\.\\.\\.*$');

  //loop through these chunks, and join the non-sentence chunks back together..
  var chunks_length = chunks.length;
  for (var i = 0; i < chunks_length; i++) {
    if (chunks[i]) {
      //trim whitespace
      chunks[i] = chunks[i].replace(/^\s+|\s+$/g, '');
      //should this chunk be combined with the next one?
      if (chunks[i + 1] && (chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg))) {
        chunks[i + 1] = ((chunks[i] || '') + ' ' + (chunks[i + 1] || '')).replace(/ +/g, ' ');
      } else if (chunks[i] && chunks[i].length > 0) {
        //this chunk is a proper sentence..
        sentences.push(chunks[i]);
        chunks[i] = '';
      }
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }

  return sentences;
};

module.exports = sentence_parser;
// console.log(sentence_parser('For example. This doesn\'t work for the US'));

},{"../data/abbreviations":2}],83:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sentence_parser = require('./sentence_parser.js');
var Sentence = require('../sentence/sentence.js');
var Question = require('../sentence/question/question.js');
var Statement = require('../sentence/statement/statement.js');
var fns = require('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them

var Text = function () {
  function Text(str, options) {
    _classCallCheck(this, Text);

    options = options || {};
    var the = this;
    this.raw_text = str || '';
    //build-up sentence/statement methods
    this.sentences = sentence_parser(str).map(function (s) {
      var last_char = s.slice(-1);
      if (last_char === '?') {
        return new Question(s, options);
      } else if (last_char === '.' || last_char === '!') {
        return new Statement(s, options);
      }
      return new Sentence(s, options);
    });

    this.contractions = {
      // he'd -> he would
      expand: function expand() {
        return the.sentences.map(function (s) {
          return s.contractions.expand();
        });
      },
      // he would -> he'd
      contract: function contract() {
        return the.sentences.map(function (s) {
          return s.contractions.contract();
        });
      }
    };
  }

  //map over sentence methods

  _createClass(Text, [{
    key: 'text',
    value: function text() {
      var arr = this.sentences.map(function (s) {
        return s.text();
      });
      return fns.flatten(arr).join(' ');
    }
  }, {
    key: 'normalized',
    value: function normalized() {
      var arr = this.sentences.map(function (s) {
        return s.normalized();
      });
      return fns.flatten(arr).join(' ');
    }
  }, {
    key: 'terms',
    value: function terms() {
      var arr = this.sentences.map(function (s) {
        return s.terms;
      });
      return fns.flatten(arr);
    }
  }, {
    key: 'normalised',
    value: function normalised() {
      var arr = this.sentences.map(function (s) {
        return s.normalized();
      });
      return fns.flatten(arr).join(' ');
    }
  }, {
    key: 'tags',
    value: function tags() {
      return this.sentences.map(function (s) {
        return s.tags();
      });
    }

    //a regex-like lookup for a sentence.
    // returns an array of terms

  }, {
    key: 'lookup',
    value: function lookup(str) {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].lookup(str));
      }
      return arr;
    }

    //transformations

  }, {
    key: 'to_past',
    value: function to_past() {
      return this.sentences.map(function (s) {
        return s.to_past();
      });
    }
  }, {
    key: 'to_present',
    value: function to_present() {
      return this.sentences.map(function (s) {
        return s.to_present();
      });
    }
  }, {
    key: 'to_future',
    value: function to_future() {
      return this.sentences.map(function (s) {
        return s.to_future();
      });
    }
  }, {
    key: 'negate',
    value: function negate() {
      return this.sentences.map(function (s) {
        return s.negate();
      });
    }
    //mining

  }, {
    key: 'people',
    value: function people() {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].people());
      }
      return arr;
    }
  }, {
    key: 'places',
    value: function places() {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].places());
      }
      return arr;
    }
  }, {
    key: 'organisations',
    value: function organisations() {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].organisations());
      }
      return arr;
    }
  }, {
    key: 'dates',
    value: function dates() {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].dates());
      }
      return arr;
    }
  }, {
    key: 'values',
    value: function values() {
      var arr = [];
      for (var i = 0; i < this.sentences.length; i++) {
        arr = arr.concat(this.sentences[i].values());
      }
      return arr;
    }
  }]);

  return Text;
}();

Text.fn = Text.prototype;

module.exports = Text;

},{"../fns.js":19,"../sentence/question/question.js":36,"../sentence/sentence.js":37,"../sentence/statement/statement.js":38,"./sentence_parser.js":82}]},{},[1])(1)
});
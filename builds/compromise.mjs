//this is a not-well-thought-out way to reduce our dependence on `object===object` stuff
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

//generates a unique id for this term
function makeId(str) {
  str = str || '_';
  var text = str + '-';
  for (var i = 0; i < 7; i++) {
    text += chars[Math.floor(Math.random() * chars.length)];
  }
  return text
}

var _id = makeId;

//a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
let compact = {
  '!': '¡',
  '?': '¿Ɂ',
  '"': '“”"❝❞',
  "'": '‘‛❛❜',
  '-': '—–',
  a: 'ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАадѦѧӐӑӒӓƛɅæ',
  b: 'ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ',
  c: '¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾСсєҀҁҪҫ',
  d: 'ÐĎďĐđƉƊȡƋƌǷ',
  e: 'ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ',
  f: 'ƑƒϜϝӺӻҒғſ',
  g: 'ĜĝĞğĠġĢģƓǤǥǦǧǴǵ',
  h: 'ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ',
  I: 'ÌÍÎÏ',
  i: 'ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії',
  j: 'ĴĵǰȷɈɉϳЈј',
  k: 'ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ',
  l: 'ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ',
  m: 'ΜϺϻМмӍӎ',
  n: 'ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ',
  o: 'ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϭϴОФоѲѳӦӧӨөӪӫ',
  p: 'ƤƿΡρϷϸϼРрҎҏÞ',
  q: 'Ɋɋ',
  r: 'ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ',
  s: 'ŚśŜŝŞşŠšƧƨȘșȿЅѕ',
  t: 'ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт',
  u: 'µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ',
  v: 'νѴѵѶѷ',
  w: 'ŴŵƜωώϖϢϣШЩшщѡѿ',
  x: '×ΧχϗϰХхҲҳӼӽӾӿ',
  y: 'ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ',
  z: 'ŹźŻżŽžƩƵƶȤȥɀΖζ',
};
//decompress data into two hashes
let unicode = {};
Object.keys(compact).forEach(function(k) {
  compact[k].split('').forEach(function(s) {
    unicode[s] = k;
  });
});

const killUnicode = str => {
  let chars = str.split('');
  chars.forEach((s, i) => {
    if (unicode[s]) {
      chars[i] = unicode[s];
    }
  });
  return chars.join('')
};
var unicode_1 = killUnicode;

const periodAcronym = /([A-Z]\.)+[A-Z]?,?$/;
const oneLetterAcronym = /^[A-Z]\.,?$/;
const noPeriodAcronym = /[A-Z]{2}('s|,)?$/;
const lowerCaseAcronym = /([a-z]\.){2,}[a-z]\.?$/;

const isAcronym = function(str) {
  //like N.D.A
  if (periodAcronym.test(str) === true) {
    return true
  }
  //like c.e.o
  if (lowerCaseAcronym.test(str) === true) {
    return true
  }
  //like 'F.'
  if (oneLetterAcronym.test(str) === true) {
    return true
  }
  //like NDA
  if (noPeriodAcronym.test(str) === true) {
    return true
  }
  return false
};
var isAcronym_1 = isAcronym;

const hasSlash = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/;

/** some basic operations on a string to reduce noise */
const clean = function(str) {
  str = str || '';
  str = str.toLowerCase();
  str = str.trim();
  let original = str;
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = unicode_1(str);
  //rough handling of slashes - 'see/saw'
  if (hasSlash.test(str) === true) {
    str = str.replace(/\/.*/, '');
  }
  //#tags, @mentions
  str = str.replace(/^[#@]/, '');
  //punctuation
  str = str.replace(/[,;.!?]+$/, '');
  // coerce single curly quotes
  str = str.replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'");
  // coerce double curly quotes
  str = str.replace(
    /[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g,
    '"'
  );
  //coerce Unicode ellipses
  str = str.replace(/\u2026/g, '...');
  //en-dash
  str = str.replace(/\u2013/g, '-');
  //lookin'->looking (make it easier for conjugation)
  if (/[a-z][^aeiou]in['’]$/.test(str) === true) {
    str = str.replace(/in['’]$/, 'ing');
  }
  //turn re-enactment to reenactment
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    str = str.replace('-', '');
  }
  //strip leading & trailing grammatical punctuation
  if (/^[:;]/.test(str) === false) {
    str = str.replace(/\.{3,}$/g, '');
    str = str.replace(/['",\.!:;\?\)]+$/g, '');
    str = str.replace(/^['"\(]+/g, '');
  }
  //remove possessives
  str = str.replace(/['’]s$/, '');

  //do this again..
  str = str.trim();
  //oh shucks,
  if (str === '') {
    str = original;
  }
  //compact acronyms
  if (isAcronym_1(str)) {
    str = str.replace(/\./g, '');
  }
  //nice-numbers
  str = str.replace(/([0-9]),([0-9])/g, '$1$2');
  return str
};

var clean_1 = clean;

// basically, tokenize for terms.

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.
const startings = /^[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*\•^†‡°”¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+/;
const endings = /[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+$/;
//money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥
const hasSlash$1 = /\//;

/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */
const parseTerm = str => {
  let original = str;
  let pre = '';
  let post = '';
  str = str.replace(startings, found => {
    pre = found;
    return ''
  });
  str = str.replace(endings, found => {
    post = found;
    return ''
  });
  //we went too far..
  if (str === '') {
    // do a very mild parse, and hope for the best.
    original = original.replace(/ *$/, after => {
      post = after || '';
      return ''
    });
    str = original;
    pre = '';
    post = post;
  }
  const parsed = {
    text: str,
    clean: clean_1(str),
    pre: pre,
    post: post,
  };
  // support aliases for slashes
  if (hasSlash$1.test(str)) {
    str.split(hasSlash$1).forEach(word => {
      parsed.alias = parsed.alias || {};
      parsed.alias[word.trim()] = true;
    });
  }
  return parsed
};
var parse = parseTerm;

const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;

/** convert all text to uppercase */
var toUpperCase = function(world) {
  this.text = this.text.toUpperCase();
  this.tag('#UpperCase', 'toUpperCase', world);
  return this
};

/** convert all text to lowercase */
var toLowerCase = function(world) {
  this.text = this.text.toLowerCase();
  this.unTag('#TitleCase', world);
  this.unTag('#UpperCase', world);
  return this
};

/** only set the first letter to uppercase
 * leave any existing uppercase alone
 */
var toTitleCase = function(world) {
  this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()); //support unicode?
  this.tag('#TitleCase', 'toTitleCase', world);
  return this
};

/** if the first letter is uppercase, and the rest are lowercase */
var isTitleCase = function() {
  return titleCase.test(this.text)
};

var _01Case = {
	toUpperCase: toUpperCase,
	toLowerCase: toLowerCase,
	toTitleCase: toTitleCase,
	isTitleCase: isTitleCase
};

// these methods are called with '@hasComma' in the match syntax

/** search the term's 'post' punctuation  */
var hasPost = function(punct) {
  return this.post.includes(punct)
};

/** does it have a comma?  */
var hasComma = function() {
  return this.hasPost(',')
};

/** does it end in a period? */
var hasPeriod = function() {
  return this.hasPost('.') === true && this.hasPost('...') === false
};

/** does it end in an exclamation */
var hasExclamation = function() {
  return this.hasPost('!')
};

/** does it end with a question mark? */
var hasQuestionMark = function() {
  return this.hasPost('?') || this.hasPost('¿')
};

/** is there a ... at the end? */
var hasEllipses = function() {
  return this.hasPost('..') || this.hasPost('…')
};

/** is there a semicolon after this word? */
var hasSemicolon = function() {
  return this.hasPost(';')
};

/** is there a slash in this word? */
var hasSlash$2 = function() {
  return /\//.test(this.text)
};

/** is there a hyphen, or dash after this word? */
var hasHyphen = function() {
  const hyphen = /(-|–|—)/;
  return hyphen.test(this.post) || hyphen.test(this.pre)
};

/** is it multiple words combinded */
var hasContraction = function() {
  return Boolean(this.implicit)
};

/** try to sensibly put this punctuation mark into the term */
var addPunctuation = function(punct) {
  // dont add doubles
  if (punct === ',' || punct === ';') {
    this.post = this.post.replace(punct, '');
  }
  this.post = punct + this.post;
  return this
};

var _02Punctuation = {
	hasPost: hasPost,
	hasComma: hasComma,
	hasPeriod: hasPeriod,
	hasExclamation: hasExclamation,
	hasQuestionMark: hasQuestionMark,
	hasEllipses: hasEllipses,
	hasSemicolon: hasSemicolon,
	hasSlash: hasSlash$2,
	hasHyphen: hasHyphen,
	hasContraction: hasContraction,
	addPunctuation: addPunctuation
};

//declare it up here
let wrapMatch = function() {};

/** ignore optional/greedy logic, straight-up term match*/
const doesMatch = function(t, reg) {
  // support id matches
  if (reg.id === t.id) {
    return true
  }
  // support '.'
  if (reg.anything === true) {
    return true
  }
  //support a text match
  if (reg.word !== undefined) {
    //match contractions
    if (t.implicit !== null && t.implicit === reg.word) {
      return true
    }
    // term aliases for slashes and things
    if (t.alias !== undefined && t.alias.hasOwnProperty(reg.word)) {
      return true
    }
    //match either .clean or .text
    return reg.word === t.clean || reg.word === t.text
  }
  //support #Tag
  if (reg.tag !== undefined) {
    return t.tags[reg.tag] === true
  }
  //support @method
  if (reg.method !== undefined) {
    if (typeof t[reg.method] === 'function' && t[reg.method]() === true) {
      return true
    }
    return false
  }
  //support /reg/
  if (reg.regex !== undefined) {
    return reg.regex.test(t.clean)
  }
  //support (one|two)
  if (reg.choices !== undefined) {
    // try to support && operator
    if (reg.operator === 'and') {
      // must match them all
      return reg.choices.every(r => wrapMatch(t, r))
    }
    // or must match one
    return reg.choices.some(r => wrapMatch(t, r))
  }
  return false
};

// wrap result for !negative match logic
wrapMatch = function(t, reg) {
  let result = doesMatch(t, reg);
  if (reg.negative === true) {
    return !result
  }
  return result
};

var _doesMatch = wrapMatch;

// these tags aren't juicy-enough
const boring = {
  TitleCase: true,
  UpperCase: true,
  CamelCase: true,
  Hyphenated: true,
  StartBracket: true,
  EndBracket: true,
  Comma: true,
  ClauseEnd: true,
};

/** check a match object against this term */
var doesMatch_1 = function(reg) {
  return _doesMatch(this, reg)
};

/** does this term look like an acryonym? */
var isAcronym_1$1 = function() {
  return isAcronym_1(this.text)
};

/** is this term implied by a contraction? */
var isImplicit = function() {
  return this.text === '' && this.implicit
};

/** does the term have at least one good tag? */
var isKnown = function() {
  return Object.keys(this.tags).some(t => boring[t] !== true)
};

var _03Misc = {
	doesMatch: doesMatch_1,
	isAcronym: isAcronym_1$1,
	isImplicit: isImplicit,
	isKnown: isKnown
};

const hasSpace = /[ -]/;

/** return various text formats of this term */
var textOut = function(options, showPre, showPost) {
  options = options || {};
  let word = this.text;
  let before = this.pre;
  let after = this.post;

  if (options.unicode === true) {
    word = this.clean;
  }
  if (options.whitespace === true) {
    before = '';
    after = ' ';
    if (hasSpace.test(this.post) === false || options.last) {
      after = '';
    }
  }
  if (options.lowercase === true) {
    word = word.toLowerCase();
  }
  if (options.punctuation === true) {
    //normalized end punctuation
    if (this.hasPost('.') === true) {
      after = '.' + after;
    } else if (this.hasPost('?') === true) {
      after = '?' + after;
    } else if (this.hasPost('!') === true) {
      after = '!' + after;
    } else if (this.hasPost(',') === true) {
      after = ',' + after;
    } else if (this.hasEllipses() === true) {
      after = '...' + after;
    }
  }
  if (showPre !== true) {
    before = '';
  }
  if (showPost !== true) {
    after = '';
  }
  return before + word + after
};

var _04Out = {
	textOut: textOut
};

const boringTags = {
  Auxiliary: 1,
  Possessive: 1,
};

/** a subjective ranking of tags kinda tfidf-based */
const rankTags = function(term, world) {
  let tags = Object.keys(term.tags);
  const tagSet = world.tags;
  tags = tags.sort(); //alphabetical, first

  tags = tags.sort((a, b) => {
    //bury the tags we dont want
    if (boringTags[b] || !tagSet[b]) {
      return -1
    }
    // unknown tags are interesting
    if (!tagSet[a]) {
      return 1
    }
    // then sort by #of parent tags (most-specific tags first)
    if (tagSet[a].downward.length > tagSet[b].downward.length) {
      return 1
    }
    return 0
  });
  return tags
};
var _rankTags = rankTags;

const jsonDefault = {
  text: true,
  tags: true,
  implicit: true,

  clean: false,
  raw: false,
  id: false,
  offset: false,
  whitespace: false,
  bestTag: false,
};

/** return various metadata for this term */
var json = function(options, world) {
  options = options || {};
  options = Object.assign({}, jsonDefault, options);
  let result = {};

  // default on
  if (options.text) {
    result.text = this.text;
  }
  if (options.tags) {
    result.tags = Object.keys(this.tags);
  }

  // default off
  if (options.clean) {
    result.clean = this.clean;
  }
  if (options.id || options.offset) {
    result.id = this.id;
  }
  if (options.normal) {
    result.normal = this.normal;
  }
  if (options.raw) {
    result.raw = this.raw;
  }
  if (options.implicit && this.implicit !== null) {
    result.implicit = this.implicit;
  }
  if (options.whitespace) {
    result.pre = this.pre;
    result.post = this.post;
  }
  if (options.bestTag) {
    result.bestTag = _rankTags(this, world)[0];
  }

  return result
};

var _05Json = {
	json: json
};

var methods = Object.assign(
  {},
  _01Case,
  _02Punctuation,
  _03Misc,
  _04Out,
  _05Json
);

/** add spaces at the end */
const padEnd = function(str, width) {
  str = str.toString();
  while (str.length < width) {
    str += ' ';
  }
  return str
};

/** output for verbose-mode */
var logTag = function(t, tag, reason) {
  let log = '\x1b[33m' + padEnd(t.clean, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m ';
  if (reason) {
    log = padEnd(log, 35) + ' ' + reason + '';
  }
  console.log(log);
};

/** output for verbose mode  */
var logUntag = function(t, tag, reason) {
  let log = '\x1b[33m' + padEnd(t.clean, 3) + ' \x1b[31m - #' + tag + '\x1b[0m ';
  if (reason) {
    log = padEnd(log, 35) + ' ' + reason;
  }
  console.log(log);
};

var isArray = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
};

var titleCase$1 = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
};

var fns = {
	logTag: logTag,
	logUntag: logUntag,
	isArray: isArray,
	titleCase: titleCase$1
};

/** add a tag, and its descendents, to a term */
const addTag = function(t, tag, reason, world) {
  // process.tagged.push(reason)
  if (!world) {
    console.warn('World not found - ' + reason);
  }
  //support '.' or '-' notation for skipping the tag
  if (tag === '' || tag === '.' || tag === '-') {
    return
  }
  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  }
  tag = fns.titleCase(tag);
  //if we already got this one
  if (t.tags[tag] === true) {
    return
  }
  if (world !== undefined && world.isVerbose() === true) {
    fns.logTag(t, tag, reason);
  }
  //add tag
  t.tags[tag] = true; //whee!

  //check tagset for any additional things to do...
  if (world !== undefined && world.tags !== undefined) {
    let tagset = world.tags;
    if (tagset.hasOwnProperty(tag) === true) {
      //add parent Tags
      if (tagset[tag].isA !== undefined) {
        let parentTag = tagset[tag].isA;
        addTag(t, parentTag, '→', world); //recursive
      }
      //add these extra ones, too
      if (tagset[tag].also !== undefined) {
        let alsoTag = tagset[tag].also;
        addTag(t, alsoTag, '→', world); //recursive
      }
      //remove any contrary tags
      if (typeof tagset[tag].notA !== 'undefined') {
        t.unTag(tagset[tag].notA, '←', world);
      }
    }
  }
};

/** support an array of tags */
const addTags = function(term, tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach(tag => addTag(term, tag, reason, world));
  } else {
    addTag(term, tags, reason, world);
  }
};
var add = addTags;

/** remove this tag, and its descentents from the term */
const unTag = function(t, tag, reason, world) {
  //support '*' for removing all tags
  if (tag === '*') {
    t.tags = {};
    return t
  }
  // remove the tag
  if (t.tags[tag] === true && t.tags.hasOwnProperty(tag) === true) {
    delete t.tags[tag];
    //log in verbose-mode
    if (world !== undefined && world.isVerbose() === true) {
      fns.logUntag(t, tag, reason);
    }
  }
  //delete downstream tags too
  if (world) {
    //TODO: properly support Term calling itself directly
    const tagset = world.tags;
    if (tagset[tag]) {
      let also = tagset[tag].downward;
      for (let i = 0; i < also.length; i++) {
        unTag(t, also[i], ' - -   - ', world); //recursive
      }
    }
  }
  return t
};

//handle an array of tags
const untagAll = function(term, tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach(tag => unTag(term, tag, reason, world));
  } else {
    unTag(term, tags, reason, world);
  }
};
var unTag_1 = untagAll;

//recursively-check compatibility of this tag and term
const canBe = function(term, tag, world) {
  const tagset = world.tags;
  // cleanup tag
  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  }
  //fail-fast
  if (tagset[tag] === undefined) {
    return true
  }
  //loop through tag's contradictory tags
  let enemies = tagset[tag].notA || [];
  for (let i = 0; i < enemies.length; i++) {
    if (term.tags[enemies[i]] === true) {
      return false
    }
  }
  if (tagset[tag].isA !== undefined) {
    return canBe(term, tagset[tag].isA, world) //recursive
  }
  return true
};

var canBe_1 = canBe;

/** add a tag or tags, and their descendents to this term
 * @param  {string | string[]} tags - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */
var tag_1 = function(tags, reason, world) {
  add(this, tags, reason, world);
  return this
};

/** only tag this term if it's consistent with it's current tags */
var tagSafe = function(tags, reason, world) {
  if (canBe_1(this, tags, world)) {
    add(this, tags, reason, world);
  }
  return this
};

/** remove a tag or tags, and their descendents from this term
 * @param {string | string[]} tags  - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */
var unTag_1$1 = function(tags, reason, world) {
  unTag_1(this, tags, reason, world);
  return this
};

/** is this tag consistent with the word's current tags?
 * @param {string | string[]} tags - a tag or tags
 * @returns {boolean}
 */
var canBe_1$1 = function(tags, world) {
  return canBe_1(this, tags, world)
};

var tag = {
	tag: tag_1,
	tagSafe: tagSafe,
	unTag: unTag_1$1,
	canBe: canBe_1$1
};

class Term {
  constructor(text = '') {
    text = String(text);
    let obj = parse(text);
    this.text = obj.text || '';
    this.clean = obj.clean;
    this.implicit =  null;
    this.pre = obj.pre || '';
    this.post = obj.post || '';
    this.raw = text.trim();
    this.tags = {};
    this.prev = null;
    this.next = null;
    this.id = _id(obj.clean);
    this.isA = 'Term'; // easier than .constructor...
    // support alternative matches
    if (obj.alias) {
      this.alias = obj.alias;
    }
  }
  /** set the text of the Term to something else*/
  set(str) {
    let obj = parse(str);
    this.text = obj.text;
    this.clean = obj.clean;
    return this
  }
}

/** create a deep-copy of this term */
Term.prototype.clone = function() {
  let term = new Term(this.text);
  term.pre = this.pre;
  term.post = this.post;
  term.tags = Object.assign({}, term.tags);
  return term
};

Object.assign(Term.prototype, methods);
Object.assign(Term.prototype, tag);

var Term_1 = Term;

/** return a flat array of Term objects */
var terms = function(n) {
  // use our cached version, if we have one...
  if (this.cache && this.cache.terms) {
    // console.log('skipped-terms')
    return this.cache.terms
  }
  let terms = [this.pool.get(this.start)];
  if (this.length === 0) {
    return []
  }
  for (let i = 0; i < this.length - 1; i += 1) {
    let id = terms[terms.length - 1].next;
    if (id === null) {
      console.warn('linked-list broken');
      break
    }
    let term = this.pool.get(id);
    terms.push(term);
    //return this one?
    if (n !== undefined && n === i) {
      return terms[n]
    }
  }
  if (n !== undefined) {
    return terms[n]
  }
  // cache it, for next time?
  if (!this.cache.words) {
    this.cache.words = terms.reduce((h, t) => {
      h[t.clean] = true;
      return h
    }, {});
  }
  if (!this.cache.terms) {
    this.cache.terms = terms;
  }
  return terms
};

/** return a deep-copy of this phrse  */
var clone = function() {
  //how do we clone part of the pool?
  let terms = this.terms();
  let newTerms = terms.map(t => t.clone());
  //connect these new ids up
  newTerms.forEach((t, i) => {
    //add it to the pool..
    this.pool.add(t);
    if (newTerms[i + 1]) {
      t.next = newTerms[i + 1].id;
    }
    if (newTerms[i - 1]) {
      t.prev = newTerms[i - 1].id;
    }
  });
  return this.buildFrom(newTerms[0].id, newTerms.length)
};

/** return last term object */
var lastTerm = function() {
  let terms = this.terms();
  return terms[terms.length - 1]
};

/** quick lookup for a term id */
var hasId = function(wantId) {
  if (this.length === 0 || !wantId) {
    return false
  }
  if (this.start === wantId) {
    return true
  }
  let lastId = this.start;
  for (let i = 0; i < this.length - 1; i += 1) {
    let term = this.pool.get(lastId);
    if (term.next === wantId) {
      return true
    }
    lastId = term.next;
  }
  return false
};

/** how many seperate, non-empty words is it? */
var wordCount = function() {
  return this.terms().filter(t => t.text !== '').length
};

var _01Utils = {
	terms: terms,
	clone: clone,
	lastTerm: lastTerm,
	hasId: hasId,
	wordCount: wordCount
};

const trimEnd = function(str) {
  return str.replace(/ +$/, '')
};

/** produce output in the given format */
var text = function(options = {}, isFirst, isLast) {
  if (typeof options === 'string') {
    if (options === 'normal') {
      options = {
        punctuation: true,
        whitespace: true,
        unicode: true,
      };
    } else if (options === 'clean') {
      options = {
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
      };
    } else {
      options = {};
    }
  }
  let terms = this.terms();
  //this this phrase a complete sentence?
  let isFull = false;
  if (terms[0] && terms[0].prev === null && terms[terms.length - 1].next === null) {
    isFull = true;
  }
  let text = terms.reduce((str, t, i) => {
    options.last = isLast && i === terms.length - 1;
    let showPre = true;
    let showPost = true;
    if (isFull === false) {
      // dont show beginning whitespace
      if (i === 0 && isFirst) {
        showPre = false;
      }
      // dont show end-whitespace
      if (i === terms.length - 1 && isLast) {
        showPost = false;
      }
    }
    return str + t.textOut(options, showPre, showPost)
  }, '');
  //full-phrases show punctuation, but not whitespace
  if (isFull === true && isLast) {
    text = trimEnd(text);
  }
  return text
};

var _02Out = {
	text: text
};

/** remove start and end whitespace */
var trim = function() {
  let terms = this.terms();
  if (terms.length > 0) {
    //trim starting
    terms[0].pre = terms[0].pre.replace(/^\s+/, '');
    //trim ending
    let lastTerm = terms[terms.length - 1];
    lastTerm.post = lastTerm.post.replace(/\s+$/, '');
  }
  return this
};

var _03Change = {
	trim: trim
};

//add whitespace to the start of the second bit
const addWhitespace = function(beforeTerms, newTerms) {
  // add any existing pre-whitespace to beginning
  newTerms[0].pre = beforeTerms[0].pre;
  let lastTerm = beforeTerms[beforeTerms.length - 1];

  //add any existing punctuation to end of our new terms
  let newTerm = newTerms[newTerms.length - 1];
  newTerm.post = lastTerm.post;
  // remove existing punctuation
  lastTerm.post = '';

  //before ←[space]  - after
  if (lastTerm.post === '') {
    lastTerm.post += ' ';
  }
};

//insert this segment into the linked-list
const stitchIn = function(main, newPhrase) {
  let afterId = main.lastTerm().next;
  //connect ours in (main → newPhrase)
  main.lastTerm().next = newPhrase.start;
  //stich the end in  (newPhrase → after)
  newPhrase.lastTerm().next = afterId;
  //do it backwards, too
  if (afterId) {
    // newPhrase ← after
    let afterTerm = main.pool.get(afterId);
    afterTerm.prev = newPhrase.lastTerm().id;
  }
  // before ← newPhrase
  let beforeId = main.terms(0).id;
  if (beforeId) {
    let newTerm = newPhrase.terms(0);
    newTerm.prev = beforeId;
  }
};

//recursively increase the length of all parent phrases
const stretchAll = function(doc, id, len) {
  let phrase = doc.list.find(p => p.hasId(id));
  phrase.length += len;

  let parents = doc.parents();
  parents.forEach(parent => {
    phrase = parent.list.find(p => p.hasId(id));
    phrase.length += len;
  });
};

//append one phrase onto another
const joinPhrase = function(main, newPhrase, doc) {
  let beforeTerms = main.terms();
  //spruce-up the whitespace issues
  addWhitespace(beforeTerms, newPhrase.terms());
  //insert this segment into the linked-list
  stitchIn(main, newPhrase);
  //increase the length of our phrases
  stretchAll(doc, beforeTerms[0].id, newPhrase.length);
  return main
};
var append = joinPhrase;

const hasSpace$1 = / /;

//a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'
const addWhitespace$1 = function(newTerms, original) {
  //add a space before our new text?

  // add a space after our text
  let lastTerm = newTerms[newTerms.length - 1];
  if (hasSpace$1.test(lastTerm.post) === false) {
    lastTerm.post += ' ';
  }

  // let term = original.pool.get(original.start)
  // if (term.prev) {
  //   //add our space ahead of our new terms
  //   let firstWord = newTerms[0]
  //   if (hasSpace.test(firstWord.post) === false) {
  //     firstWord.post += ' '
  //   }
  //   return
  // }

  //otherwise, add our space to the start of original
  // if (hasSpace.test(term.pre) === false) {
  //   term.pre = ' ' + term.pre
  // }
  return
};

//insert this segment into the linked-list
const stitchIn$1 = function(main, newPhrase, newTerms) {
  // [newPhrase] → [main]
  let lastTerm = newTerms[newTerms.length - 1];
  lastTerm.next = main.start;
  // [before] → [main]
  let pool = main.pool;
  let start = pool.get(main.start);
  if (start.prev) {
    let before = pool.get(start.prev);
    before.next = newPhrase.start;
  }
  //do it backwards, too
  // before ← newPhrase
  newTerms[0].prev = main.terms(0).prev;
  // newPhrase ← main
  main.terms(0).prev = lastTerm.id;
};

//recursively increase the length of all parent phrases
const stretchAll$1 = function(doc, oldStart, newPhrase) {
  //find our phrase to stretch
  let phrase = doc.list.find(p => p.hasId(oldStart) || p.hasId(newPhrase.start));
  if (phrase === undefined) {
    console.error('compromise error: Prepend missing start - ' + oldStart);
    return
  }
  //should we update the phrase's starting?
  if (phrase.start === oldStart) {
    phrase.start = newPhrase.start;
  }
  // console.log(newPhrase)
  phrase.length += newPhrase.length;
  if (doc.from) {
    stretchAll$1(doc.from, oldStart, newPhrase);
  }
};

//append one phrase onto another
const joinPhrase$1 = function(original, newPhrase, doc) {
  let newTerms = newPhrase.terms();
  let oldStart = original.start;
  //spruce-up the whitespace issues
  addWhitespace$1(newTerms);
  //insert this segment into the linked-list
  stitchIn$1(original, newPhrase, newTerms);
  //increase the length of our phrases
  stretchAll$1(doc, oldStart, newPhrase);
  return original
};
var prepend = joinPhrase$1;

//recursively decrease the length of all the parent phrases
const shrinkAll = function(doc, id, deleteLength, after) {
  //find our phrase to shrink
  let phrase = doc.list.find(p => p.hasId(id));
  if (phrase !== undefined) {
    phrase.length -= deleteLength;

    //does it start with this soon-removed word?
    if (phrase.start === id) {
      phrase.start = after.id;
    }
  }
  if (doc.from) {
    shrinkAll(doc.from, id, deleteLength, after);
  }
};

/** wrap the linked-list around these terms
 * so they don't appear any more
 */
const deletePhrase = function(phrase, doc) {
  let pool = doc.pool();
  let terms = phrase.terms();

  //grab both sides of the chain,
  let prev = pool.get(terms[0].prev) || {};
  let after = pool.get(terms[terms.length - 1].next) || {};

  //first, change phrase lengths
  shrinkAll(doc, phrase.start, phrase.length, after);

  // connect [prev]->[after]
  if (prev) {
    prev.next = after.id;
  }
  // connect [prev]<-[after]
  if (after) {
    after.prev = prev.id;
  }
  // lastly, actually delete the terms from the pool
  for (let i = 0; i < terms.length; i++) {
    // pool.remove(terms[i].id)
  }
};
var _delete = deletePhrase;

// const build = require('../../tokenizer')

/** put this text at the end */
var append_1 = function(newPhrase, doc) {
  this.cache.terms = null;
  append(this, newPhrase, doc);
  return this
};

/** add this text to the beginning */
var prepend_1 = function(newPhrase, doc) {
  this.cache.terms = null;
  prepend(this, newPhrase, doc);
  return this
};

var delete_1 = function(doc) {
  this.cache.terms = null;
  _delete(this, doc);
  return this
};

var replace = function(newPhrase, doc) {
  this.cache.terms = null;
  //add it do the end
  let firstLength = this.length;
  append(this, newPhrase, doc);
  //delete original terms
  let tmp = this.buildFrom(this.start, this.length);
  tmp.length = firstLength;

  _delete(tmp, doc);
  return this
};

/**
 * Turn this phrase object into 3 phrase objects
 */
var splitOn = function(p) {
  let terms = this.terms();
  let result = {
    before: null,
    match: null,
    after: null,
  };
  let index = terms.findIndex(t => t.id === p.start);
  if (index === -1) {
    return result
  }
  //make all three sections into phrase-objects
  let start = terms.slice(0, index);
  if (start.length > 0) {
    result.before = this.buildFrom(start[0].id, start.length);
  }
  let match = terms.slice(index, index + p.length);
  if (match.length > 0) {
    result.match = this.buildFrom(match[0].id, match.length);
  }
  let end = terms.slice(index + p.length, terms.length);
  if (end.length > 0) {
    result.after = this.buildFrom(end[0].id, end.length, this.pool);
  }
  return result
};

var _04Split = {
	append: append_1,
	prepend: prepend_1,
	delete: delete_1,
	replace: replace,
	splitOn: splitOn
};

/** return json metadata for this phrase */
var json$1 = function(options = {}, world) {
  let res = {};
  // text data
  if (options.text) {
    res.text = this.text();
    if (options.trim) {
      res.text = res.text.trim();
    }
  }
  if (options.normal) {
    res.normal = this.text({
      punctuation: true,
      whitespace: true,
      unicode: true,
    });
  }
  // terms data
  if (options.terms) {
    if (options.terms === true) {
      options.terms = {};
    }
    res.terms = this.terms().map(t => t.json(options.terms, world));
  }
  return res
};

var _05Json$1 = {
	json: json$1
};

var methods$1 = Object.assign(
  {},
  _01Utils,
  _02Out,
  _03Change,
  _04Split,
  _05Json$1
);

// try to avoid doing the match
const failFast = function(p, terms, regs) {
  if (regs.length === 0) {
    return true
  }
  for (let i = 0; i < regs.length; i += 1) {
    let reg = regs[i];
    //logical quick-ones
    if (reg.optional !== true) {
      //this is not possible
      if (reg.anything === true && reg.negative === true) {
        return true
      }
      //start/end impossibilites
      if (reg.start === true && i > 0) {
        return true
      }
      if (reg.end === true && i < regs.length - 1) {
        return true
      }
      if (reg.start === true && reg.end === true && terms.length > 1) {
        return true
      }
      //empty choices
      if (reg.choices && reg.choices.length === 0) {
        return true
      }
    }
    // check our cache
    if (p.cache.tags && reg.tag && !reg.optional && !reg.negative && !p.cache.tags[reg.tag]) {
      // console.log('skip-tag')
      return true
    }
    if (p.cache.words && reg.word && !reg.optional && !reg.negative && !p.cache.words[reg.word]) {
      // console.log('skip-word')
      return true
    }
  }
  return false
};
var _02FailFast = failFast;

// i formally apologize for how complicated this is.

//found a match? it's greedy? keep going!
const getGreedy = function(terms, t, reg, until) {
  let start = t;
  for (; t < terms.length; t += 1) {
    //stop for next-reg match
    if (until && terms[t].doesMatch(until)) {
      return t
    }
    let count = t - start + 1;
    // is it max-length now?
    if (reg.max !== undefined && count === reg.max) {
      return t
    }
    //stop here
    if (terms[t].doesMatch(reg) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null
      }
      return t
    }
  }
  return t
};

//'unspecific greedy' is a weird situation.
const greedyTo = function(terms, t, nextReg) {
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(nextReg) === true) {
      return t
    }
  }
  //guess it doesn't exist, then.
  return null
};

/** tries to match a sequence of terms, starting from here */
const tryHere = function(terms, regs) {
  let captures = [];
  let t = 0;
  // we must satisfy each rule in 'regs'
  for (let r = 0; r < regs.length; r += 1) {
    let reg = regs[r];

    //should we fail here?
    if (!terms[t]) {
      //are all remaining regs optional?
      const hasNeeds = regs.slice(r).some(remain => !remain.optional);
      if (hasNeeds === false) {
        break
      }
      // have unmet needs
      return false
    }

    //support 'unspecific greedy' .* properly
    if (reg.anything === true && reg.greedy === true) {
      let skipto = greedyTo(terms, t, regs[r + 1]);
      // ensure it's long enough
      if (reg.min !== undefined && skipto - t < reg.min) {
        return false
      }
      // reduce it back, if it's too long
      if (reg.max !== undefined && skipto - t > reg.max) {
        t = t + reg.max;
        continue
      }
      //TODO: support [*] properly
      if (skipto === null) {
        return false //couldn't find it
      }
      t = skipto;
      continue
    }

    //if it looks like a match, continue
    if (reg.anything === true || terms[t].doesMatch(reg) === true) {
      let startAt = t;
      // okay, it was a match, but if it optional too,
      // we should check the next reg too, to skip it?
      if (reg.optional && regs[r + 1] && terms[t].doesMatch(regs[r + 1]) === true) {
        r += 1;
      }
      //advance to the next term!
      t += 1;
      //check any ending '$' flags
      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (t !== terms.length && reg.greedy !== true) {
          return false
        }
      }
      //try keep it going!
      if (reg.greedy === true) {
        t = getGreedy(terms, t, reg, regs[r + 1]);
        if (t === null) {
          return false //greedy was too short
        }
      }
      if (reg.capture) {
        captures.push(startAt);
        //add greedy-end to capture
        if (t > 1 && reg.greedy) {
          captures.push(t - 1);
        }
      }
      continue
    }

    //bah, who cares, keep going
    if (reg.optional === true) {
      continue
    }
    // should we skip-over an implicit word?
    if (terms[t].isImplicit() && regs[r - 1] && terms[t + 1]) {
      // does the next one match?
      if (terms[t + 1].doesMatch(reg)) {
        t += 2;
        continue
      }
    }
    // console.log('   ❌\n\n')
    return false
  }
  //we got to the end of the regs, and haven't failed!
  //try to only return our [captured] segment
  if (captures.length > 0) {
    //make sure the array is the full-length we'd return anyways
    let arr = terms.slice(captures[0], captures[captures.length - 1] + 1);
    //make sure the array is t-length (so we skip ahead full-length)
    for (let tmp = 0; tmp < t; tmp++) {
      arr[tmp] = arr[tmp] || null;
    }
    return arr
  }
  //return our result
  return terms.slice(0, t)
};
var _03TryMatch = tryHere;

/* break-down a match expression into this:
{
  word:'',
  tag:'',
  regex:'',

  start:false,
  end:false,
  negative:false,
  anything:false,
  greedy:false,
  optional:false,

  capture:false,
  choices:[],
}
*/
const hasMinMax = /\{([0-9]+,?[0-9]*)\}/;
const andSign = /&&/;

const titleCase$2 = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
};

const end = function(str) {
  return str[str.length - 1]
};
const start = function(str) {
  return str[0]
};
const stripStart = function(str) {
  return str.substr(1)
};
const stripEnd = function(str) {
  return str.substr(0, str.length - 1)
};
const stripBoth = function(str) {
  str = stripStart(str);
  str = stripEnd(str);
  return str
};

//
const token = function(w) {
  let obj = {};
  //collect any flags (do it twice)
  for (let i = 0; i < 2; i += 1) {
    //back-flags
    if (end(w) === '+') {
      obj.greedy = true;
      w = stripEnd(w);
    }
    if (w !== '*' && end(w) === '*' && w !== '\\*') {
      obj.greedy = true;
      w = stripEnd(w);
    }
    if (end(w) === '?') {
      obj.optional = true;
      w = stripEnd(w);
    }
    if (end(w) === '$') {
      obj.end = true;
      w = stripEnd(w);
    }
    //front-flags
    if (start(w) === '^') {
      obj.start = true;
      w = stripStart(w);
    }
    if (start(w) === '!') {
      obj.negative = true;
      w = stripStart(w);
    }
    //wrapped-flags
    if (start(w) === '(' && end(w) === ')') {
      // support (one && two)
      if (andSign.test(w)) {
        obj.choices = w.split(andSign);
        obj.operator = 'and';
      } else {
        obj.choices = w.split('|');
        obj.operator = 'or';
      }
      //remove '(' and ')'
      obj.choices[0] = stripStart(obj.choices[0]);
      let last = obj.choices.length - 1;
      obj.choices[last] = stripEnd(obj.choices[last]);
      // clean up the results
      obj.choices = obj.choices.map(s => s.trim());
      obj.choices = obj.choices.filter(s => s);
      //recursion alert!
      obj.choices = obj.choices.map(token);
      w = '';
    }
    //capture group (this one can span multiple-terms)
    if (start(w) === '[' || end(w) === ']') {
      obj.capture = true;
      w = w.replace(/^\[/, '');
      w = w.replace(/\]$/, '');
    }
    //regex
    if (start(w) === '/' && end(w) === '/') {
      w = stripBoth(w);
      obj.regex = new RegExp(w);
      return obj
    }
  }
  // support #Tag{0,9}
  if (hasMinMax.test(w) === true) {
    w = w.replace(hasMinMax, (a, b) => {
      let arr = b.split(/,/g);
      if (arr.length === 1) {
        // '{3}'	Exactly three times
        obj.min = Number(arr[0]);
        obj.max = Number(arr[0]);
      } else {
        // '{2,4}' Two to four times
        // '{3,}' Three or more times
        obj.min = Number(arr[0]);
        obj.max = Number(arr[1] || 999);
      }
      obj.greedy = true;
      return ''
    });
  }

  //do the actual token content
  if (start(w) === '#') {
    obj.tag = stripStart(w);
    obj.tag = titleCase$2(obj.tag);
    return obj
  }
  //dynamic function on a term object
  if (start(w) === '@') {
    obj.method = stripStart(w);
    return obj
  }
  if (w === '.') {
    obj.anything = true;
    return obj
  }
  //support alone-astrix
  if (w === '*') {
    obj.anything = true;
    obj.greedy = true;
    obj.optional = true;
    return obj
  }
  if (w) {
    //somehow handle encoded-chars?
    w = w.replace('\\*', '*');
    w = w.replace('\\.', '.');
    obj.word = w.toLowerCase();
  }
  return obj
};
var parseToken = token;

const isArray$1 = function(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
};

//split-up by (these things)
const byParentheses = function(str) {
  let arr = str.split(/(\[?\(.*?\)[?+*]*\]?\$?)/);
  arr = arr.map(s => s.trim());
  return arr
};

const byWords = function(arr) {
  let words = [];
  arr.forEach(a => {
    //keep brackets lumped together
    if (/^[[^_/]?\(/.test(a[0])) {
      words.push(a);
      return
    }
    let list = a.split(' ');
    list = list.filter(w => w);
    words = words.concat(list);
  });
  return words
};

//turn an array into a 'choices' list
const byArray = function(arr) {
  return [
    {
      choices: arr.map(s => {
        return {
          word: s,
        }
      }),
    },
  ]
};

const postProcess = function(tokens) {
  //ensure there's only one consecutive capture group.
  let count = tokens.filter(t => t.capture === true).length;
  if (count > 1) {
    let captureArr = tokens.map(t => t.capture);
    let first = captureArr.indexOf(true);
    let last = captureArr.length - 1 - captureArr.reverse().indexOf(true);
    //'fill in' capture groups between start-end
    for (let i = first; i < last; i++) {
      tokens[i].capture = true;
    }
  }
  return tokens
};

const fromDoc = function(doc) {
  if (!doc || !doc.list || !doc.list[0]) {
    return []
  }
  return doc.list[0].terms().map(t => {
    return {
      id: t.id,
    }
  })
};

/** parse a match-syntax string into json */
const syntax = function(input) {
  // fail-fast
  if (input === null || input === undefined || input === '') {
    return []
  }
  //try to support a ton of different formats:
  if (typeof input === 'object') {
    if (isArray$1(input)) {
      if (input.length === 0 || !input[0]) {
        return []
      }

      //is it a pre-parsed reg-list?
      if (typeof input[0] === 'object') {
        return input
      }
      //support a flat array of normalized words
      if (typeof input[0] === 'string') {
        return byArray(input)
      }
    }
    //support passing-in a compromise object as a match
    if (input && input.isA === 'Doc') {
      return fromDoc(input)
    }
    return []
  }
  if (typeof input === 'number') {
    input = String(input); //go for it?
  }
  let tokens = byParentheses(input);
  tokens = byWords(tokens);
  tokens = tokens.map(parseToken);
  //clean up anything weird
  tokens = postProcess(tokens);
  // console.log(JSON.stringify(tokens, null, 2))
  return tokens
};
var syntax_1 = syntax;

/**  returns a simple array of arrays */
const matchAll = function(p, regs, matchOne = false) {
  //if we forgot to parse it..
  if (typeof regs === 'string') {
    regs = syntax_1(regs);
  }

  let terms = p.terms();
  //try to dismiss it, at-once
  if (_02FailFast(p, terms, regs) === true) {
    return []
  }
  //any match needs to be this long, at least
  const minLength = regs.filter(r => r.optional !== true).length;
  let matches = [];

  //optimisation for '^' start logic
  if (regs[0].start === true) {
    let match = _03TryMatch(terms, regs);
    if (match !== false && match.length > 0) {
      matches.push(match);
    }
    return matches
  }
  //try starting, from every term
  for (let i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      break
    }
    //try it!
    let match = _03TryMatch(terms.slice(i), regs);
    if (match !== false && match.length > 0) {
      //zoom forward!
      i += match.length - 1;
      //[capture-groups] return some null responses
      match = match.filter(m => m);
      matches.push(match);
      //ok, maybe that's enough?
      if (matchOne === true) {
        return matches
      }
    }
  }
  return matches
};
var _01MatchAll = matchAll;

/** return anything that doesn't match.
 * returns a simple array of arrays
 */
const notMatch = function(p, regs) {
  let found = {};
  let arr = _01MatchAll(p, regs);
  arr.forEach(ts => {
    ts.forEach(t => {
      found[t.id] = true;
    });
  });
  //return anything not found
  let terms = p.terms();
  let result = [];
  let current = [];
  terms.forEach(t => {
    if (found[t.id] === true) {
      if (current.length > 0) {
        result.push(current);
        current = [];
      }
      return
    }
    current.push(t);
  });
  if (current.length > 0) {
    result.push(current);
  }
  return result
};
var not = notMatch;

/** return an array of matching phrases */
var match_1 = function(str) {
  let matches = _01MatchAll(this, str);
  //make them phrase objects
  matches = matches.map(list => {
    return this.buildFrom(list[0].id, list.length)
  });
  return matches
};

/** return boolean if one match is found */
var has = function(str) {
  let matches = _01MatchAll(this, str, true);
  return matches.length > 0
};

/** remove all matches from the result */
var not$1 = function(str) {
  let matches = not(this, str);
  //make them phrase objects
  matches = matches.map(list => {
    return this.buildFrom(list[0].id, list.length)
  });
  return matches
};

/** return a list of phrases that can have this tag */
var canBe$1 = function(tag, world) {
  let results = [];
  let terms = this.terms();
  let previous = false;
  for (let i = 0; i < terms.length; i += 1) {
    let can = terms[i].canBe(tag, world);
    if (can === true) {
      if (previous === true) {
        //add it to the end
        results[results.length - 1].push(terms[i]);
      } else {
        results.push([terms[i]]); //make a new one
      }
      previous = can;
    }
  }
  //turn them into Phrase objects
  results = results
    .filter(a => a.length > 0)
    .map(arr => {
      return this.buildFrom(arr[0].id, arr.length)
    });
  return results
};

var match = {
	match: match_1,
	has: has,
	not: not$1,
	canBe: canBe$1
};

class Phrase {
  constructor(id, length, pool) {
    this.start = id;
    this.length = length;
    this.isA = 'Phrase'; // easier than .constructor...
    Object.defineProperty(this, 'pool', {
      enumerable: false,
      writable: true,
      value: pool,
    });
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      writable: true,
      value: {},
    });
  }
}

/** create a new Phrase object from an id and length */
Phrase.prototype.buildFrom = function(id, length) {
  let p = new Phrase(id, length, this.pool);
  p.parent = this;
  if (this.cache) {
    p.cache = this.cache;
    p.cache.terms = null;
  }
  return p
};

//apply methods
Object.assign(Phrase.prototype, match);
Object.assign(Phrase.prototype, methods$1);

//apply aliases
const aliases = {
  term: 'terms',
};
Object.keys(aliases).forEach(k => (Phrase.prototype[k] = Phrase.prototype[aliases[k]]));

var Phrase_1 = Phrase;

/** a key-value store of all terms in our Document */
class Pool {
  constructor(words = {}) {
    //quiet this property in console.logs
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: words,
    });
  }
  /** throw a new term object in */
  add(term) {
    this.words[term.id] = term;
    return this
  }
  /** find a term by it's id */
  get(id) {
    return this.words[id]
  }
  /** find a term by it's id */
  remove(id) {
    delete this.words[id];
  }
  /** helper method */
  stats() {
    return {
      words: Object.keys(this.words).length,
    }
  }
}

/** make a deep-copy of all terms */
Pool.prototype.clone = function() {
  let keys = Object.keys(this.words);
  let words = keys.reduce((h, k) => {
    let t = this.words[k].clone();
    h[t.id] = t;
    return h
  }, {});
  return new Pool(words)
};

var Pool_1 = Pool;

//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2017 MIT

//proper nouns with exclamation marks
// const blacklist = {
//   yahoo: true,
//   joomla: true,
//   jeopardy: true,
// }

//regs-
const initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g;
const hasSomething = /\S/;

const isAcronym$1 = /[ .][A-Z]\.? *$/i;
const hasEllipse = /(?:\u2026|\.{2,}) *$/;
const newLine = /((?:\r?\n|\r)+)/; // Match different new-line formats
const hasLetter = /[a-z\u00C0-\u00FF]/i;

const startWhitespace = /^\s+/;

// Start with a regex:
const naiive_split = function(text) {
  let all = [];
  //first, split by newline
  let lines = text.split(newLine);
  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    let arr = lines[i].split(initSplit);
    for (let o = 0; o < arr.length; o++) {
      all.push(arr[o]);
    }
  }
  return all
};

/** does this look like a sentence? */
const isSentence = function(str, abbrevs) {
  // check for 'F.B.I.'
  if (isAcronym$1.test(str) === true) {
    return false
  }
  //check for '...'
  if (hasEllipse.test(str) === true) {
    return false
  }
  // must have a letter
  if (hasLetter.test(str) === false) {
    return false
  }

  let txt = str.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, '');
  let words = txt.split(' ');
  let lastWord = words[words.length - 1].toLowerCase();
  // check for 'Mr.'
  if (abbrevs.hasOwnProperty(lastWord)) {
    return false
  }
  // //check for jeopardy!
  // if (blacklist.hasOwnProperty(lastWord)) {
  //   return false
  // }
  return true
};

const splitSentences = function(text, world) {
  let abbrevs = world.cache.abbreviations;

  text = text || '';
  text = String(text);
  let sentences = [];
  // First do a greedy-split..
  let chunks = [];
  // Ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || hasSomething.test(text) === false) {
    return sentences
  }
  // Start somewhere:
  let splits = naiive_split(text);
  // Filter-out the crap ones
  for (let i = 0; i < splits.length; i++) {
    let s = splits[i];
    if (s === undefined || s === '') {
      continue
    }
    //this is meaningful whitespace
    if (hasSomething.test(s) === false) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue
      }
    }
    //else, only whitespace, no terms, no sentence
    chunks.push(s);
  }

  //detection of non-sentence chunks:
  //loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    let c = chunks[i];
    //should this chunk be combined with the next one?
    if (chunks[i + 1] && isSentence(c, abbrevs) === false) {
      chunks[i + 1] = c + (chunks[i + 1] || '');
    } else if (c && c.length > 0 && hasLetter.test(c)) {
      //this chunk is a proper sentence..
      sentences.push(c);
      chunks[i] = '';
    }
  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text]
  }

  //move whitespace to the ends of sentences, when possible
  //['hello',' world'] -> ['hello ','world']
  for (let i = 1; i < sentences.length; i += 1) {
    let ws = sentences[i].match(startWhitespace);
    if (ws !== null) {
      sentences[i - 1] += ws[0];
      sentences[i] = sentences[i].replace(startWhitespace, '');
    }
  }
  return sentences
};

var _01Sentences = splitSentences;

const wordlike = /\S/;
const isBoundary = /^[!?.]+$/;
const naiiveSplit = /(\S+)/;
const isSlash = /\/\W*$/;

const notWord = {
  '.': true,
  '-': true, //dash
  '–': true, //en-dash
  '—': true, //em-dash
  '--': true,
  '...': true,
  // '/': true, // 'one / two'
};

const hasHyphen$1 = function(str) {
  //dont split 're-do'
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    return false
  }
  //letter-number
  let reg = /^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i;
  if (reg.test(str) === true) {
    return true
  }
  //support weird number-emdash combo '2010–2011'
  // let reg2 = /^([0-9]+)(–|—)([0-9].*)/i
  // if (reg2.test(str)) {
  //   return true
  // }
  return false
};

// 'he / she' should be one word
const combineSlashes = function(arr) {
  for (let i = 1; i < arr.length - 1; i++) {
    if (isSlash.test(arr[i])) {
      arr[i - 1] += arr[i] + arr[i + 1];
      arr[i] = null;
      arr[i + 1] = null;
    }
  }
  return arr
};

const splitHyphens = function(word) {
  let arr = [];
  //support multiple-hyphenated-terms
  const hyphens = word.split(/[-–—]/);
  for (let o = 0; o < hyphens.length; o++) {
    if (o === hyphens.length - 1) {
      arr.push(hyphens[o]);
    } else {
      arr.push(hyphens[o] + '-');
    }
  }
  return arr
};

//turn a string into an array of terms (naiive for now, lumped later)
const splitWords = function(str) {
  let result = [];
  let arr = [];
  //start with a naiive split
  str = str || '';
  if (typeof str === 'number') {
    str = String(str);
  }

  const words = str.split(naiiveSplit);
  for (let i = 0; i < words.length; i++) {
    //split 'one-two'
    if (hasHyphen$1(words[i]) === true) {
      arr = arr.concat(splitHyphens(words[i]));
      continue
    }
    arr.push(words[i]);
  }

  //greedy merge whitespace+arr to the right
  let carry = '';
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    //if it's more than a whitespace
    if (wordlike.test(word) === true && notWord.hasOwnProperty(word) === false && isBoundary.test(word) === false) {
      //put whitespace on end of previous term, if possible
      if (result.length > 0) {
        result[result.length - 1] += carry;
        result.push(word);
      } else {
        //otherwise, but whitespace before
        result.push(carry + word);
      }
      carry = '';
    } else {
      carry += word;
    }
  }
  //handle last one
  if (carry && result.length > 0) {
    result[result.length - 1] += carry; //put it on the end
  }
  // combine 'one / two'
  result = combineSlashes(result);
  // remove empty results
  result = result.filter(s => s);
  return result
};
var _02Words = splitWords;

//add forward/backward 'linked-list' prev/next ids
const addLinks = terms => {
  terms.forEach((term, i) => {
    if (i > 0) {
      term.prev = terms[i - 1].id;
    }
    if (terms[i + 1]) {
      term.next = terms[i + 1].id;
    }
  });
};

/** turn a string into an array of Phrase objects */
const fromText = function(text = '', world, pool) {
  //a bit of validation, first
  if (typeof text !== 'string') {
    if (typeof text === 'number') {
      text = String(text);
    }
  }
  //tokenize into words
  let sentences = _01Sentences(text, world);
  sentences = sentences.map(str => _02Words(str));

  //turn them into proper objects
  pool = pool || new Pool_1();

  let phrases = sentences.map(terms => {
    terms = terms.map(str => {
      let term = new Term_1(str);
      pool.add(term);
      return term
    });
    //add next/previous ids
    addLinks(terms);

    //return phrase objects
    return new Phrase_1(terms[0].id, terms.length, pool)
  });
  //return them ready for a Document object
  return phrases
};

/** create a word-pool and Phrase objects from .json() results*/
const fromJSON = function(data) {
  let pool = new Pool_1();
  //create Phrase objects
  let phrases = data.map(terms => {
    //create Term objects
    terms = terms.map(obj => {
      let term = new Term_1(obj.text);
      term.pre = obj.pre;
      term.post = obj.post;
      term.tags = obj.tags.reduce((h, tag) => {
        h[tag] = true;
        return h
      }, {});
      pool.add(term);
      return term
    });
    //add prev/next links
    addLinks(terms);
    return new Phrase_1(terms[0].id, terms.length, pool)
  });
  return phrases
};

var _01Tokenizer = {
  fromText,
  fromJSON,
};

var _version = '0.0.0';

var _data={
  "Comparative": "true¦better",
  "Superlative": "true¦earlier",
  "PresentTense": "true¦is,sounds",
  "Value": "true¦a few",
  "Noun": "true¦aIbHcFdaylightEeCfBhere,ie,lit,mAno doubt,one d9p8s5t2vs,w0yesterd9;eek0int5;d7end;ce,mr1o0;d5morrow;!w;ome 1tandard8umm0;er;d1point;d,l;ay;a,d;t,y;g,om,sp,tc,x0;!p; time;a,ca,o0;l,rp;a,c,l;d,l,rc,utumn",
  "Copula": "true¦a1is,w0;as,ere;m,re",
  "PastTense": "true¦be3came,d2had,meant,sa2taken,w0;as,e0;nt,re;id;en,gan",
  "Condition": "true¦if,unless",
  "Gerund": "true¦accord0be0develop0go0result0stain0;ing",
  "Negative": "true¦n0;ever,o0;!n,t",
  "Verb": "true¦awakAborn,cann9fr8g7h5k3le2m1n9s0worsA;e9h3;ake sure,sg;ngth7ss7;eep tabs,n0;own;as0e2;!t3;iv2onna;ight1;ot;en",
  "QuestionWord": "true¦how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s",
  "Plural": "true¦records",
  "Conjunction": "true¦&,aEbAcuz,how8in caDno7o6p4supposing,t1vers5wh0yet;eth8ile;h0o;eref9o0;!uC;l0rovided that;us;r,therwi6; matt1r;!ev0;er;e0ut;cau1f0;ore;se;lthou1nd,s 0;far as,if;gh",
  "Pronoun": "true¦'em,elle,h4i3me,ourselves,she5th1us,we,you0;!rself;e0ou;m,y;!l,t;e0im;!'s",
  "Singular": "true¦0:0W;1:0Z;a0Vb0Jc0Ad03e01fWgRhNici1jel0kitty,lMmInHoGpCquestion mark,rBs7t4u2womV;nc0Qs 2;doll0Cst0E; rex,a3h2ic,ragedy,v show;ere,i1;l0x return;ist0Oky,omeone,t2uper bowl,yst0V;ep3ri1u2;de0Off;faLmoL;al0i1oom;a4i0Jr3u2;dLrpoD;erogaVobl0O;rt,te0I;bjSceGthers;othi1umb0E;a4ee04o2;del,m2nopo0th0C;!my;n,yf0;i0unch;ead start,o2;l0me3u2;se;! run;adf0entlem5irlZlaci04od,rand3u2;l0y; slam,fa2mo2;th01;an;a5ella,ly,ol0r3un2;di1;iTo2;ntiWsN;mi0thV;conomy,gg,ner5veWx2;ampQecu7;ad7e4innSo2ragonf0ude;cumentFg2i0l0or;gy;ath,t2;ec2;tive;!dy;a8eili1h6i4o2redit card;ttage,u2;riJsin;ty,vil w2;ar;andeliGocol2;ate;n2rD;ary;aAel0lesHo6r4u2;n2tterf0;ti1;eakfast,o2;!th8;dy,tt4y2;!fri2;end;le;nki1r2;ri2;er;d4l0noma0u2;nt;ly; homin4verti2;si1;ng;em",
  "Actor": "true¦aJbGcFdCengineIfAgardenIh9instructPjournalLlawyIm8nurse,opeOp5r3s1t0;echnCherapK;ailNcientJoldiGu0;pervKrgeon;e0oofE;ceptionGsearC;hotographClumbColi1r0sychologF;actitionBogrammB;cem6t5;echanic,inist9us4;airdress8ousekeep8;arm7ire0;fight6m2;eputy,iet0;ici0;an;arpent2lerk;ricklay1ut0;ch0;er;ccoun6d2ge7r0ssis6ttenda7;chitect,t0;ist;minist1v0;is1;rat0;or;ta0;nt",
  "Honorific": "true¦a03b00cSdReQfiLgKhon,jr,king,lJmEoDp8queen,r4s0taoiseach,vice7;e1fc,gt,ir,r,u0;ltTpt,rg;c0nDrgeaL;ond liJretary;abbi,e0;ar1pAs,v0;!erend; admirY;astPhd,r0vt;esideEi1of0;!essN;me mini5nce0;!ss;fficOp,rd;a3essrs,i2lle,me,r1s0;!tr;!s;stK;gistrate,j,r6yF;i3lb,t;en,ov;eld mar3rst l0;ady,i0;eutena0;nt;shG;sq,xcellency;et,oct6r,utchess;apt6hance4mdr,o0pl;lonel,m2ngress0unci3;m0wom0;an;dr,mand5;ll0;or;!ain;ldg,rig0;!adi0;er;d0sst,tty,yatullah;j,m0v;!ir0;al",
  "SportsTeam": "true¦0:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls",
  "Uncountable": "true¦0:1C;a1Jb1Bc13d10e0Tf0Ng0Jh0Ei0Aj09knowled1Il04mWnews,oVpSrNsBt6vi5w1;a3ea07i2oo1;d,l;ldlife,ne;rmth,t0;neg8ol08tae;e4h3oothpaste,r1una;affRou1;ble,sers,t;ermod1Fund0;a,nnis;aAcene06eri0Qh9il8kittl0Qnow,o7p5t3u1;g1nshi0J;ar;ati1De1;am,el;ace16e1;ci0Ked;ap,cc0;k,v0;eep,ingl0H;d05fe10l1nd;m0St;a4e2ic1;e,ke0E;c1laxa0Asearch;ogni09rea09;bi0Ain;aKe2hys10last6o1ressW;lit0Zrk,w0;a0Vtrol;bstetr0Xil,xygen;a6e4ilk,o3u1;mps,s1;ic;nHo0A;a1chan0S;sl00t;chine1il,themat0Q; learn05ry;aught0e3i2ogi0Nu1;ck,g0C;ce,ghtn02ngui0LteratI;a1isH;th0;ewel8usti0G;ce,mp1nformaPtself;a1ortan0E;ti1;en0C;a4isto3o1;ck1mework,n1spitali06;ey;ry;ir,libut,ppi8;en01o2r1um,ymna08;a7ound;l1ssip;d,f;i5lour,o2urnit1;ure;od,rgive1uri0wl;ne1;ss;c7sh;conomZduca6lectr5n3quip4thZvery1;body,o1thE;ne;joy1tertain1;ment;iciNonU;tiF;ar2iabet1raugh2;es;ts;a7elcius,h3ivPl2o1urrency;al,nfusiAttA;assNoth3;aos,e1;e2w1;ing;se;r5sh;a5eef,i2lood,owls,read,utt0;er;lliar2s1;on;ds;g1ss;ga1;ge;c7dvi6ero4ir3mnes2rt,thl1;et8;ty;craft;b5d1naut5;ynam4;ce;id,ou1;st1;ics",
  "Infinitive": "true¦0:6I;1:6W;2:56;3:6T;4:6U;5:5X;6:65;7:6S;8:6O;9:6G;A:6Q;B:6N;C:6B;D:6X;a68b5Xc4Zd47e3Rf3Eg37h30i2Nj2Lk2Jl2Am20n1Xo1Tp1Eques3Fr0Ms01tTuPvMwFyE;awn,ield;aHe1Thist6iGoEre61;nd0rE;k,ry;pe,sh,th0;lk,nFrEsh,tCve;n,raD;d0t;aFiEo7;ew,sB;l69ry;nFpEr3se;gra4Kli3X;dEi7lo5P;er48o;aKeJhIoHrFuEwi8;ne,rn;aEe0Ki5Lu8y;de,in,nsf0p,v5D;r2WuC;ank,reat2L;nd,st;lk,rg1Ms7;aXcUeThRi49kip,lQmPnee3Io4XpOtHuEwitC;bmBck,ff0gge8ppFrEspe5;ge,pri1rou4Uvi4;ly,o33;aJeIoHrFuE;dy,mb6;a4OeEi4;ngth2Bss,tC;p,re;m,p;in,ke,r0Oy;la51oil,rink6;e1Vi6o3G;am,ip;a2iv0oE;ck,ut;arCem,le5n1r4tt6;aFo2rE;atCew;le,re;il,ve;a03eGisk,oFuE;in,le,sh;am,ll;aZcXdu9fWgVje5lSmRnt,pOquNsItHvEwa5M;eEiew,o33;al,l,rE;se,t;a42i2u3Z;eHi8oGtE;!o2rE;i5uc1X;l4rt;mb6nt,r4;e8i2;air,eFlEo3YreseD;a9y;at;a3Semb0i3Uo4;aFeEi4y;a1nt;te,x;a54r0F;act1Ver,le5u1;a0Zei4k5GoEyc6;gni29nci6rd;ch,li28s5E;i1nE;ge,k;aRerQiPlMoKrGuE;b1Yll,mp,rEsh;cha1s4H;ai1eGiDoE;cEdu9greAhibBmi1te8vi2S;eAlaim;di5pa2ss,veD;iDp,rtr3XsEur;e,t;aFuE;g,n3;n,y;ck,le;fo2ZmBsi8;ck,iDrt4Dss,u1;bGccur,ff0pera7utweFverEwe;co3Ylap,ta1Zu1whelm;igh;ser4ta2Z;eFotE;e,i9;ed,gle5;aJeIiGoFuE;ltip3Brd0;nit11ve;nErr10;d,g6us;asu2lt,n0Nr3ssa3;inta2Pna3rFtE;ch,t0;ch,kEry;et;aKeJiGoEu1B;aEck,ok,ve;d,n;ft,ke,mBnFstEve;!en;e,k;a2Cc0Dt;b0Mck,uE;gh,nC;iEno2X;ck,ll,ss;am,o2AuE;d3mp;gno2mOnEss3A;cMdica7flu0LhLsItGvE;eEol4;nt,st;erErodu9;a5fe2;i8tE;aEru5;ll;abBibB;lu1Dr1B;agi21pE;lemeDo1Zro4;aIeGi2oFuE;nt,rry;n01pe,st;aElp;d,t;nd6ppErm,te;en;aJloAoIrGuE;arEeAi12;ant31d;aEip,umb6;b,sp;es,ve1G;in,th0ze;aOeaNiLlJoGracFuncE;ti3A;tu2;cus,lFrE;ce,eca8m,s2S;d,l1W;a1ToE;at,od,w;gu2lEni1Rx;e,l;r,tu2;il,vE;or;a11cho,le5mQnNstLvalua7xE;a08cJerIi8pEte15;a14eFla12oEreA;rt,se;ct,riE;en9;ci1t;el,han3;abEima7;li1D;ab6couVdFfor9ga3han9j01riCsu2t0vE;isi2Ny;!u2;body,er3pE;hasiEow0;ze;a04eSiJoIrFuE;mp;aFeAiE;ft;g,in;d3ubt;ff0p,re5sFvE;iWor9;aIcFliEmiApl13tingui0Y;ke;oEuA;uEv0;ra3;gr1QppE;ear,ro4;cLem,fJliv0ma0Bny,pIsFterE;mi0C;cribe,er4iFtrE;oy;gn,re;a07e06i5osB;eEi07y;at,ct;iGlFrE;ea1;a2i03;de;ma3n9re,te;a08e07h04i7l02oHrE;aFeEoAu0Dy;a7dB;ck,ve;llXmQnFok,py,uEv0;gh,nt;ceNdu5fKsItGvE;eEin9;rt,y;aNin0PrE;a8ibu7ol;iEtitu7;d0st;iFoEroD;rm;gu2rm;rn;biJfoImaHpE;a2laE;in;re;nd;rt;ne;ap1e5;aEip,o1;im,w;aFeE;at,ck,w;llen3n3r3se;a1nt0;ll,ncFrEt0u1;e,ry;el;aNeKloJoHruGuE;lEry;ly;sh;a8mb,o8rrEth0un9;ow;ck;ar,lFnefBtrE;ay;ie4ong;ng,se;band0Hc09d04ffo03gr02id,lZmu1nWppRrOsIttEvoid,waB;acGeFra5;ct;m0Dnd;h,k;k,sE;eGiFocia7uE;me;gn,st;mb6rt;le;chFgEri4;ue;!i4;eaHlGroE;aCve;ch;aud,y;l,r;noun9sw0tE;icipa7;ce;lFt0;er;e3ow;ee;rd;aPdGju8mBoP;it;st;!reA;ss;cHhie4knowled3tiva7;te;ge;ve;eGouDu1;se;nt;pt;on",
  "Unit": "true¦0:16;a11b0Zc0Ld0Ke0If0Dg09h06in0Ejoule0k00lYmNnMoLpIqHsqCt7volts,w6y4z3°2µ1;g,s;c,f,n;b,e2;a0Kb,d0Qears old,o1;tt0E;att0b;able4b3e2on1sp;!ne0;a2r0A;!l,sp;spo01; ft,uare 1;c0Fd0Ef3i0Ckilo0Gm1ya0B;e0Jil1;e0li0E;eet0o0A;t,uart0;ascals,e2i1ou0Mt;c0Jnt0;rcent,tZ;hms,uVz;an0GewtQ;/s,b,e7g,i3l,m2p1²,³;h,s;!²;!/h,cro3l1;e1li05;! DsC²;g05s0A;gPter1;! 2s1;! 1;per second;b,iZm,u1x;men0x0;b,elvin0g,ilo2m1nQ;!/h,ph,²;byYgWmeter1;! 2s1;! 1;per hour;e1g,z;ct1rtz0;aXogQ;al2b,igAra1;in0m0;!l1;on0;a4emtPl2t1;²,³; oz,uid ou1;nce0;hrenheit0rad0;b,x1;abyH;eciCg,l,mA;arat0eAg,m9oulomb0u1;bic 1p0;c5d4fo3i2meAya1;rd0;nch0;ot0;eci2;enti1;me4;!²,³;lsius0nti1;g2li1me1;ter0;ram0;bl,y1;te0;c4tt1;os1;eco1;nd0;re0;!s",
  "Organization": "true¦0:46;a3Ab2Qc2Ad21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2S;a3e1orld trade organizati41;lls fargo,st1;fie22inghou16;l1rner br3D;-m11gree31l street journ25m11;an halNeriz3Wisa,o1;dafo2Gl1;kswagLvo;bs,kip,n2ps,s1;a tod2Rps;es35i1;lev2Xted natio2Uv; mobi2Kaco bePd bMeAgi frida9h3im horto2Tmz,o1witt2W;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen33daily ma2Xguess w2holli0rolling st1Ms1w2;mashing pumpki2Ouprem0;ho;ea1lack eyed pe3Fyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Gnp,o2pice gir5ta1ubaru;rbucks,to2N;ny,undgard1;en;a2Rx pisto1;ls;few25insbu26msu1X;.e.m.,adiohead,b6e3oyal 1yan2X;b1dutch she4;ank;/max,aders dige1Ed 1vl32;bu1c1Uhot chili peppe2Klobst28;ll;c,s;ant2Vizno2F;an5bs,e3fiz24hilip morrBi2r1;emier27octer & gamb1Rudenti14;nk floyd,zza hut;psi28tro1uge08;br2Qchina,n2Q; 2ason1Xda2G;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Etflix,w1; 1sweek;kids on the block,york08;a,c;nd1Us2t1;ional aca2Fo,we0Q;a,cYd0O;aAcdonald9e5i3lb,o1tv,yspace;b1Nnsanto,ody blu0t1;ley crue,or0O;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt13z1Y;'ore09a3e1g,ittle caesa1Ktd;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1K;art;iffy lu0Lo3pmorgan1sa;! cha1;se;hnson & johns1Sy d1R;bm,hop,n1tv;c,g,te1;l,rpol; & m,asbro,ewlett-packaTi3o1sbc,yundai;me dep1n1J;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Iu1;cci,ns n ros0;ldman sachs,o1;dye1g0B;ar;axo smith kliZencore;electr0Im1;oto0V;a3bi,da,edex,i1leetwood mac,oGrito-l0A;at,nancial1restoV; tim0;cebook,nnie mae;b06sa,u3xxon1; m1m1;ob0H;!rosceptics;aiml0Ae5isney,o3u1;nkin donuts,po0Wran dur1;an;j,w j1;on0;a,f leppa3ll,p2r spiegZstiny's chi1;ld;eche mode,t;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra05;al;!ca c5l4m1o0Ast05;ca2p1;aq;st;dplMgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Hy;dbury,pital o1rl's jr;ne;aGbc,eCfAl6mw,ni,o2p,r1;exiteeWos;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roX;ckbuster video,omingda1;le; g1g1;oodriN;cht3e ge0n & jer2rkshire hathaw1;ay;ryH;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bXcSdidRerosmith,ig,lLmFnheuser-busEol,ppleAr7s3t&t,v2y1;er;is,on;hland2s1;n,ociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c",
  "Demonym": "true¦0:16;1:13;a0Wb0Nc0Cd0Ae09f07g04h02iYjVkTlPmLnIomHpDqatari,rBs7t5u4v3wel0Rz2;am0Fimbabwe0;enezuel0ietnam0H;g9krai1;aiwThai,rinida0Iu2;ni0Qrkmen;a4cot0Ke3ingapoOlovak,oma0Tpa05udRw2y0X;edi0Kiss;negal0Br08;mo0uU;o6us0Lw2;and0;a3eru0Hhilipp0Po2;li0Ertugu06;kist3lesti1na2raguay0;ma1;ani;amiZi2orweP;caragu0geri2;an,en;a3ex0Mo2;ngo0Erocc0;cedo1la2;gasy,y08;a4eb9i2;b2thua1;e0Dy0;o,t02;azakh,eny0o2uwaiti;re0;a2orda1;ma0Bp2;anN;celandic,nd4r2sraeli,ta02vo06;a2iT;ni0qi;i0oneV;aiDin2ondur0unN;di;amDe2hanai0reek,uatemal0;or2rm0;gi0;i2ren7;lipino,n4;cuadoVgyp6ngliJsto1thiopi0urope0;a2ominXut4;niH;a9h6o4roa3ub0ze2;ch;ti0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el8o6r3ul2;gaG;aziBi2;ti2;sh;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;gent2me1;ine;ba1ge2;ri0;ni0;gh0r2;ic0;an",
  "Possessive": "true¦anyAh5its,m3noCo1sometBthe0yo1;ir1mselves;ur0;!s;i8y0;!se4;er1i0;mse2s;!s0;!e0;lf;o1t0;hing;ne",
  "Currency": "true¦$,aud,bRcPdKeurJfIgbp,hkd,inr,jpy,kGlEp8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotyRł;en,uanQ;af,of;h0t5;e0il5;k0q0;elL;iel,oubleKp,upeeK;e2ound st0;er0;lingH;n0soG;ceFn0;ies,y;e0i7;i,mpi6;n,r0wanzaByatB;!onaAw;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s",
  "Abbreviation": "true¦a08b05cZdXeUfSgRhQiPjNkanMlKmGnEoDpCque,rAs6t4u3v2w0;is0y00;!c;a,s,t;niv,safa,t;ce,e0;nn,x;ask,e1fc,gt,ir,r,t,u0;pt,rg;nDp0;!t;d,e0;pAs,v;a,d,ennGhd,l,rof,vt;ct,kla,nt,p,rd;eb0ov;!r;a2d,essrs,i1lle,me,r5s0t;!tr;nn,ster;!j,r;it,lb,t0;!d;!s;an,r,u0;l,n;a,da,e,nc;on,wy;a,en,ov;eb,l0t,y;!a;g,s1tc,x0;!p;p,q;ak,e0ist,r;c,pt,t;a3ca,l,m2o0pl,res,t;!l0m1nn,rp;!o;dr;!l0pt;!if;a,c,l1r0;ig,os;!dg,vd;d3l2pr,r1ss0tty,ug,ve;n,t;c,iz;!ta;!j,m,v",
  "Place": "true¦a07b05cZdYeXfVgRhQiOjfk,kMlKmHneEoDp9que,rd,s8t5u4v3w0yyz;is1y0;!o;!c;a,t;pYsafa,t;e1he 0;bronx,hamptons;nn,x;ask,fo,oho,t,under6yd;a2e1h0;l,x;k,nnK;!cifX;kla,nt;b1w eng0;land;!r;a1co,i0t,uc;dKnn;libu,nhattS;a0gw,hr;s,x;an0ul;!s;a0cn,da,ndianMst;!x;arlem,kg,nd,wy;a2re0;at 0enwich;britain,lak6;!y village;co,l0ra;!a;urope,verglad2;ak,en,fw,ist,own4xb;al4dg,gk,hina3l2o1r0t;es;lo,nn;!t;town;!if;cn,e0kk,lvd,rooklyn;l air,verly hills;frica,lta,m5ntarct2r1sia,tl0ve;!ant1;ct0iz;ic0; oce0;an;ericas,s",
  "Country": "true¦0:38;1:2L;a2Wb2Dc21d1Xe1Rf1Lg1Bh19i13j11k0Zl0Um0Gn05om3CpZqat1JrXsKtCu6v4wal3yemTz2;a24imbabwe;es,lis and futu2X;a2enezue31ietnam;nuatu,tican city;.5gTkraiZnited 3ruXs2zbeE;a,sr;arab emirat0Kkingdom,states2;! of am2X;k.,s.2; 27a.;a7haBimor-les0Bo6rinidad4u2;nis0rk2valu;ey,me2Xs and caic1T; and 2-2;toba1J;go,kel0Ynga;iw2Vji2nz2R;ki2T;aCcotl1eBi8lov7o5pa2Bri lanka,u4w2yr0;az2ed9itzerl1;il1;d2Qriname;lomon1Vmal0uth 2;afr2IkLsud2O;ak0en0;erra leoEn2;gapo1Wt maart2;en;negKrb0ychellY;int 2moa,n marino,udi arab0;hele24luc0mart1Z;epublic of ir0Com2Cuss0w2;an25;a3eHhilippinTitcairn1Ko2uerto riM;l1rtugE;ki2Bl3nama,pua new0Tra2;gu6;au,esti2;ne;aAe8i6or2;folk1Gth3w2;ay; k2ern mariana1B;or0M;caragua,ger2ue;!ia;p2ther18w zeal1;al;mib0u2;ru;a6exi5icro09o2yanm04;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagascZl6r4urit3yot2;te;an0i14;shall0Vtin2;ique;a3div2i,ta;es;wi,ys0;ao,ed00;a5e4i2uxembourg;b2echtenste10thu1E;er0ya;ban0Gsotho;os,tv0;azakh1De2iriba02osovo,uwait,yrgyz1D;eling0Jnya;a2erF;ma15p1B;c6nd5r3s2taly,vory coast;le of m19rael;a2el1;n,q;ia,oI;el1;aiSon2ungary;dur0Mg kong;aAermany,ha0Pibralt9re7u2;a5ern4inea2ya0O;!-biss2;au;sey;deloupe,m,tema0P;e2na0M;ce,nl1;ar;bTmb0;a6i5r2;ance,ench 2;guia0Dpoly2;nes0;ji,nl1;lklandTroeT;ast tim6cu5gypt,l salv5ngl1quatorial3ritr4st2thiop0;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprQzech2; 8ia;ba,racao;c3lo2morPngo-brazzaville,okFsta r03te d'ivoiK;mb0;osD;i2ristmasF;le,na;republic;m2naTpe verde,yman9;bod0ero2;on;aFeChut00o8r4u2;lgar0r2;kina faso,ma,undi;azil,itish 2unei;virgin2; is2;lands;liv0nai4snia and herzegoviGtswaGuvet2; isl1;and;re;l2n7rmuF;ar2gium,ize;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaFlCmAn5r3ustr2zerbaijH;al0ia;genti2men0uba;na;dorra,g4t2;arct6igua and barbu2;da;o2uil2;la;er2;ica;b2ger0;an0;ia;ni2;st2;an",
  "Region": "true¦0:1U;a20b1Sc1Id1Des1Cf19g13h10i0Xj0Vk0Tl0Qm0FnZoXpSqPrMsDtAut9v6w3y1zacatec22;o05u1;cat18kZ;a1est vi4isconsin,yomi14;rwick0shington1;! dc;er2i1;rgin1S;acruz,mont;ah,tar pradesh;a2e1laxca1DuscaA;nnessee,x1R;bas0Kmaulip1QsmJ;a6i4o2taf0Ou1ylh13;ffVrr00s0Y;me10no1Auth 1;cSdR;ber1Ic1naloa;hu0Sily;n2skatchew0Rxo1;ny; luis potosi,ta catari1I;a1hode7;j1ngp02;asth0Mshahi;inghai,u1;e1intana roo;bec,ensWreta0E;ara4e2rince edward1; isU;i,nnsylv1rnambu02;an14;!na;axa0Ndisha,h1klaho1Bntar1reg4x04;io;ayarit,eBo3u1;evo le1nav0L;on;r1tt0Rva scot0X;f6mandy,th1; 1ampton0;c3d2yo1;rk0;ako0Y;aroli0V;olk;bras0Xva01w1; 2foundland1;! and labrador;brunswick,hamp0jers1mexiJyork state;ey;a6i2o1;nta0Nrelos;ch3dlanBn2ss1;issippi,ouri;as geraGneso0M;igQoacQ;dhya,harasht04ine,ni3r1ssachusetts;anhao,y1;land;p1toba;ur;anca0e1incoln0ouis8;e1iH;ds;a1entucky,hul0A;ns08rnata0Dshmir;alis1iangxi;co;daho,llino2nd1owa;ia05;is;a2ert1idalEunA;ford0;mp0waii;ansu,eorgWlou5u1;an2erre1izhou,jarat;ro;ajuato,gdo1;ng;cester0;lori2uji1;an;da;sex;e4o2uran1;go;rs1;et;lawaErby0;a8ea7hi6o1umbrH;ahui4l3nnectic2rsi1ventry;ca;ut;iMorado;la;apEhuahua;ra;l8m1;bridge0peche;a5r4uck1;ingham0;shi1;re;emen,itish columb3;h2ja cal1sque,var2;iforn1;ia;guascalientes,l4r1;izo2kans1;as;na;a2ber1;ta;ba2s1;ka;ma",
  "City": "true¦a2Wb26c1Wd1Re1Qf1Og1Ih1Ai18jakar2Hk0Zl0Tm0Gn0Co0ApZquiYrVsLtCuBv8w3y1z0;agreb,uri1Z;ang1Te0okohama;katerin1Hrev34;ars3e2i0rocl3;ckl0Vn0;nipeg,terth0W;llingt1Oxford;aw;a1i0;en2Hlni2Z;lenc2Uncouv0Gr2G;lan bat0Dtrecht;a6bilisi,e5he4i3o2rondheim,u0;nVr0;in,ku;kyo,ronIulouC;anj23l13miso2Jra2A; haJssaloni0X;gucigalpa,hr2Ol av0L;i0llinn,mpe2Bngi07rtu;chu22n2MpT;a3e2h1kopje,t0ydney;ockholm,uttga12;angh1Fenzh1X;o0KvZ;int peters0Ul3n0ppo1F; 0ti1B;jo0salv2;se;v0z0Q;adU;eykjavik,i1o0;me,sario,t25;ga,o de janei17;to;a8e6h5i4o2r0ueb1Qyongya1N;a0etor24;gue;rt0zn24; elizabe3o;ls1Grae24;iladelph1Znom pe07oenix;r0tah tik19;th;lerJr0tr10;is;dessa,s0ttawa;a1Hlo;a2ew 0is;delTtaip0york;ei;goya,nt0Upl0Uv1R;a5e4i3o1u0;mb0Lni0I;nt0scH;evideo,real;l1Mn01skolc;dellín,lbour0S;drid,l5n3r0;ib1se0;ille;or;chest0dalWi0Z;er;mo;a4i1o0vAy01;nd00s angel0F;ege,ma0nz,sbZverpo1;!ss0;ol; pla0Iusan0F;a5hark4i3laipeda,o1rak0uala lump2;ow;be,pavog0sice;ur;ev,ng8;iv;b3mpa0Kndy,ohsiu0Hra0un03;c0j;hi;ncheMstanb0̇zmir;ul;a5e3o0; chi mi1ms,u0;stI;nh;lsin0rakliG;ki;ifa,m0noi,va0A;bu0SiltD;alw4dan3en2hent,iza,othen1raz,ua0;dalaj0Gngzhou;bu0P;eUoa;sk;ay;es,rankfu0;rt;dmont4indhovU;a1ha01oha,u0;blRrb0Eshanbe;e0kar,masc0FugavpiJ;gu,je0;on;a7ebu,h2o0raioJuriti01;lo0nstanJpenhagNrk;gFmbo;enn3i1ristchur0;ch;ang m1c0ttagoL;ago;ai;i0lgary,pe town,rac4;ro;aHeBirminghWogoAr5u0;char3dap3enos air2r0sZ;g0sa;as;es;est;a2isba1usse0;ls;ne;silPtisla0;va;ta;i3lgrade,r0;g1l0n;in;en;ji0rut;ng;ku,n3r0sel;celo1ranquil0;la;na;g1ja lu0;ka;alo0kok;re;aBb9hmedabad,l7m4n2qa1sh0thens,uckland;dod,gabat;ba;k0twerp;ara;m5s0;terd0;am;exandr0maty;ia;idj0u dhabi;an;lbo1rh0;us;rg",
  "FemaleName": "true¦0:FY;1:G2;2:FR;3:FD;4:FC;5:FS;6:EP;7:ER;8:EZ;9:GF;A:GB;B:E5;C:FO;D:G8;E:FL;F:EG;aE2bD4cB7dAHe9Ff90g8Gh82i7Rj6Tk5Zl4Nm38n2To2Qp2Fqu2Er1Os0Qt04ursu7vUwOyLzG;aJeHoG;e,la,ra;lGna;da,ma;da,ra;as7DeHol1TvG;et6onB8;le0sen3;an8endBNhiB3iG;lInG;if39niGo0;e,f38;a,helmi0lGma;a,ow;aMeJiG;cHviG;an9WenG1;kCZtor3;da,l8Unus,rG;a,nGoniD2;a,iDC;leGnesEC;nDLrG;i1y;aSePhNiMoJrGu7y4;acG3iGu0E;c3na,sG;h9Lta;nHrG;a,i;i9Iya;a5HffaCGna,s5;al3eGomasi0;a,l8Fo6Wres1;g7To6VrHssG;!a,ie;eFi,ri9;bNliMmKnIrHs5tGwa0;ia0um;a,yn;iGya;a,ka,s5;a4e4iGmCAra;!ka;a,t5;at5it5;a05carlet2Xe04hUiSkye,oQtMuHyG;bFJlvi1;e,sHzG;an2Set6ie,y;anGi9;!a,e,nG;aEe;aIeG;fGl3CphG;an2;cF8r71;f3nGphi1;d4ia,ja,ya;er4lv3mon1nGobh74;dy;aKeGirlBLo0y7;ba,e0i7lIrG;iGrBPyl;!d6Z;ia,lBV;ki4nIrHu0w0yG;la,na;i,leAon,ron;a,da,ia,nGon;a,on;l5Xre0;bMdLi8lKmIndHrGs5vannaE;aEi0;ra,y;aGi4;nt5ra;lBNome;e,ie;in1ri0;a02eXhViToHuG;by,thBK;bQcPlOnNsHwe0xG;an93ie,y;aHeGie,lD;ann9ll1marBFtB;!lGnn1;iGyn;e,nG;a,d7V;da,i,na;an8;hel52io;bin,erByn;a,cGkki,na,ta;helBZki;ea,iannDXoG;da,n11;an0bIgi0i0nGta,y0;aGee;!e,ta;a,eG;cARkaE;chGe,i0mo0n5DquCDvCy0;aCCelGi8;!e,le;een2ia0;aMeLhJoIrG;iGudenAW;scil1Tyamva8;lly,rt3;ilome0oebe,ylG;is,lis;arl,ggy,nelope,r7t4;ige,m0En4No7rvaBBtHulG;a,et6in1;ricGsy,tA8;a,e,ia;ctav3deHf85lGph85;a,ga,iv3;l3t6;aQePiJoGy7;eHrG;aEeCma;ll1mi;aKcIkGla,na,s5ta;iGki;!ta;hoB2k8BolG;a,eBH;!mh;l7Tna,risF;dIi5OnHo22taG;li1s5;cy,et6;eAiCO;a00ckenz2eUiKoHrignayani,uriBGyrG;a,na,tAT;i4ll9YnG;a,iG;ca,ka,qB5;a,chOkaNlJmi,nIrGtzi;aGiam;!n8;a,dy,erva,h,n2;a,dIi9KlG;iGy;cent,e;red;!e7;ae7el3G;ag4KgKi,lHrG;edi61isFyl;an2iGliF;nGsAN;a,da;!an,han;b08c9Fd06e,g04i03l01nZrKtJuHv6Sx88yGz2;a,bell,ra;de,rG;a,eC;h76il8t2;a,cSgOiJjor2l6In2s5tIyG;!aGbe5QjaAlou;m,n9T;a,ha,i0;!aIbAMeHja,lDna,sGt53;!a,ol,sa;!l06;!h,m,nG;!a,e,n1;arIeHie,oGr3Kueri6;!t;!ry;et3IiB;elGi61y;a,l1;dGon,ue7;akranBy;iGlo36;a,ka,n8;a,re,s2;daGg2;!l2W;alDd2elGge,isBHon0;eiAin1yn;el,le;a0Ie08iWoQuKyG;d3la,nG;!a,dHe9TnGsAR;!a,e9S;a,sAP;aB2cJelIiFlHna,pGz;e,iB;a,u;a,la;iGy;a2Ae,l25n8;is,l1GrHtt2uG;el7is1;aIeHi9na,rG;a70i9;lei,n1tB;!in1;aQbPd3lLnIsHv3zG;!a,be4Ket6z2;a,et6;a,dG;a,sGy;ay,ey,i,y;a,iaIlG;iGy;a8He;!n4F;b7Uerty;!n5S;aNda,e0iLla,nKoIslAStGx2;iGt2;c3t3;la,nGra;a,ie,o4;a,or1;a,gh,laG;!ni;!h,nG;a,d4e,n4N;cNdon7Ti7kes5na,rMtKurIvHxGy7;mi;ern1in3;a,eGie,yn;l,n;as5is5oG;nya,ya;a,isF;ey,ie,y;aZeUhadija,iMoLrIyG;lGra;a,ee,ie;istGy5C;a,en,iGy;!e,n48;ri,urtn9B;aMerLl9AmIrGzzy;a,stG;en,in;!berlG;eGi,y;e,y;a,stC;!na,ra;el6QiJlInHrG;a,i,ri;d4na;ey,i,l9Rs2y;ra,s5;c8Xi5YlOma7nyakumari,rMss5MtJviByG;!e,lG;a,eG;e,i79;a5FeHhGi3PlDri0y;ar5Der5Die,leCr9Gy;!lyn74;a,en,iGl4Vyn;!ma,n31sF;ei73i,l2;a04eVilToMuG;anKdJliGst57;aHeGsF;!nAt0W;!n8Y;i2Ry;a,iB;!anLcelDd5Wel72han6JlJni,sHva0yG;a,ce;eGie;fi0lDph4Y;eGie;en,n1;!a,e,n36;!i10lG;!i0Z;anLle0nIrHsG;i5Rsi5R;i,ri;!a,el6Qif1RnG;a,et6iGy;!e,f1P;a,e73iHnG;a,e72iG;e,n1;cLd1mi,nHqueliAsmin2Uvie4yAzG;min9;a9eHiG;ce,e,n1s;!lGsFt06;e,le;inHk2lDquelG;in1yn;da,ta;lPmNnMo0rLsHvaG;!na;aHiGob6V;do4;!belGdo4;!a,e,l2G;en1i0ma;a,di4es,gr5S;el8ogG;en1;a,eAia0o0se;aNeKilHoGyacin1N;ll2rten1H;aHdGlaH;a,egard;ry;ath0WiHlGnrietBrmiAst0W;en24ga;di;il76lKnJrGtt2yl76z6E;iGmo4Gri4H;etG;!te;aEnaE;ey,l2;aYeTiOlMold12rIwG;enGyne18;!dolD;acHetGisel8;a,chC;e,ieG;!la;adys,enGor3yn1Y;a,da,na;aJgi,lHna,ov72selG;a,e,le;da,liG;an;!n0;mYnIorgHrG;ald36i,m2Ttru74;et6i5U;a,eGna;s1Nvieve;briel3Gil,le,rnet,yle;aReOio0loMrG;anHe8iG;da,e8;!cG;esHiGoi0G;n1s3W;!ca;!rG;a,en44;lHrnG;!an8;ec3ic3;rHtiGy9;ma;ah,rah;d0FileCkBl00mUn4BrRsMtLuKvG;aIelHiG;e,ta;in0Ayn;!ngel2I;geni1la,ni3S;h53ta;meral8peranJtG;eHhGrel7;er;l2Qr;za;iGma,nest2Ayn;cGka,n;a,ka;eJilImG;aGie,y;!liA;ee,i1y;lGrald;da,y;aTeRiMlLma,no4oJsIvG;a,iG;na,ra;a,ie;iGuiG;se;a,en,ie,y;a0c3da,nJsGzaH;aGe;!beG;th;!a,or;anor,nG;!a;in1na;en,iGna,wi0;e,th;aWeKiJoGul2V;lor52miniq3Zn31rGtt2;a,eCis,la,othGthy;ea,y;an09naEonAx2;anPbOde,eNiLja,lImetr3nGsir4V;a,iG;ce,se;a,iHla,orGphiA;es,is;a,l5K;dGrdG;re;!d4Nna;!b2DoraEra;a,d4nG;!a,e;hl3i0mMnKphn1rHvi1XyG;le,na;a,by,cHia,lG;a,en1;ey,ie;a,et6iG;!ca,el1Bka;arGia;is;a0Re0Nh05i03lVoJrHynG;di,th3;istGy05;al,i0;lPnMrHurG;tn1E;aJdIiGnIriA;!nG;a,e,n1;el3;!l1S;n2sG;tanGuelo;ce,za;eGleC;en,t6;aIeoHotG;il4B;!pat4;ir9rIudG;et6iG;a,ne;a,e,iG;ce,sX;a4er4ndG;i,y;aPeMloe,rG;isHyG;stal;sy,tG;aHen,iGy;!an1e,n1;!l;lseHrG;!i9yl;a,y;nLrG;isJlHmG;aiA;a,eGot6;n1t6;!sa;d4el1PtG;al,el1O;cHlG;es6i3F;el3ilG;e,ia,y;iYlXmilWndVrNsLtGy7;aJeIhGri0;erGleCrDy;in1;ri0;li0ri0;a2GsG;a2Fie;a,iMlKmeIolHrG;ie,ol;!e,in1yn;lGn;!a,la;a,eGie,y;ne,y;na,sF;a0Di0D;a,e,l1;isBl2;tlG;in,yn;arb0CeYianXlVoTrG;andRePiIoHyG;an0nn;nwDok9;an2NdgKg0ItG;n27tG;!aHnG;ey,i,y;ny;etG;!t9;an0e,nG;da,na;i9y;bbi9nG;iBn2;ancGossom,ythe;a,he;ca;aRcky,lin8niBrNssMtIulaEvG;!erlG;ey,y;hHsy,tG;e,i0Zy9;!anG;ie,y;!ie;nGt5yl;adHiG;ce;et6iA;!triG;ce,z;a4ie,ra;aliy29b24d1Lg1Hi19l0Sm0Nn01rWsNthe0uJvIyG;anGes5;a,na;a,r25;drIgusHrG;el3o4;ti0;a,ey,i,y;hHtrG;id;aKlGt1P;eHi9yG;!n;e,iGy;gh;!nG;ti;iIleHpiB;ta;en,n1t6;an19elG;le;aYdWeUgQiOja,nHtoGya;inet6n3;!aJeHiGmI;e,ka;!mGt6;ar2;!belHliFmT;sa;!le;ka,sGta;a,sa;elGie;a,iG;a,ca,n1qG;ue;!t6;te;je7rea;la;!bHmGstas3;ar3;el;aIberHel3iGy;e,na;!ly;l3n8;da;aTba,eNiKlIma,yG;a,c3sG;a,on,sa;iGys0J;e,s0I;a,cHna,sGza;a,ha,on,sa;e,ia;c3is5jaIna,ssaIxG;aGia;!nd4;nd4;ra;ia;i0nHyG;ah,na;a,is,naE;c5da,leCmLnslKsG;haElG;inGyW;g,n;!h;ey;ee;en;at5g2nG;es;ie;ha;aVdiSelLrG;eIiG;anLenG;a,e,ne;an0;na;aKeJiHyG;nn;a,n1;a,e;!ne;!iG;de;e,lDsG;on;yn;!lG;iAyn;ne;agaJbHiG;!gaI;ey,i9y;!e;il;ah",
  "WeekDay": "true¦fri4mon4s2t1wed0;!nesd4;hurs2ues2;at0un1;!urd1;!d0;ay0;!s",
  "Date": "true¦autumn,daylight9eom,one d8s5t2w0yesterd8;eek0int5;d6end;mr1o0;d4morrow;!w;ome 1tandard3umm0;er;d0point;ay; time",
  "Time": "true¦a6breakfast 5dinner5e3lunch5m2n0oclock,some5to7;i7o0;on,w;id4or1;od,ve0;ning;time;fternoon,go,ll day,t 0;ni0;ght",
  "Holiday": "true¦0:1Q;1:1P;a1Fb1Bc12d0Ye0Of0Kg0Hh0Di09june07kwanzaa,l04m00nYoVpRrPsFt9v6w4xm03y2;om 2ule;hasho16kippur;hit2int0Xomens equalit8; 0Ss0T;alentines3e2ictor1E;r1Bteran1;! 0;-0ax 0h6isha bav,rinityMu2; b3rke2;y 0;ish2she2;vat;a0Xe prophets birth0;a6eptember14h4imchat tor0Ut 3u2;kk4mmer T;a8p7s6valentines day ;avu2mini atzeret;ot;int 2mhain;a4p3s2valentine1;tephen1;atrick1;ndrew1;amadan,ememberanc0Yos2;a park1h hashana;a3entecost,reside0Zur2;im,ple heart 0;lm2ssovE; s04;rthodox 2stara;christma1easter2goOhoJn0C;! m07;ational 2ew years09;freedom 0nurse1;a2emorial 0lHoOuharram;bMr2undy thurs0;ch0Hdi gr2tin luther k0B;as;a2itRughnassadh;bour 0g baom2ilat al-qadr;er; 2teenth;soliU;d aJmbolc,n2sra and miraj;augurGd2;ependen2igenous people1;c0Bt1;a3o2;ly satur0;lloween,nukkUrvey mil2;k 0;o3r2;ito de dolores,oundhoW;odW;a4east of 2;our lady of guadalupe,the immaculate concepti2;on;ther1;aster8id 3lectYmancip2piphany;atX;al-3u2;l-f3;ad3f2;itr;ha;! 2;m8s2;un0;ay of the dead,ecemb3i2;a de muertos,eciseis de septiembre,wali;er sol2;stice;anad8h4inco de mayo,o3yber m2;on0;lumbu1mmonwealth 0rpus christi;anuk4inese n3ristmas2;! N;ew year;ah;a 0ian tha2;nksgiving;astillCeltaine,lack4ox2;in2;g 0; fri0;dvent,ll 9pril fools,rmistic8s6u2;stral4tum2;nal2; equinox;ia 0;cens2h wednes0sumption of mary;ion 0;e 0;hallows 6s2;ai2oul1t1;nt1;s 0;day;eve",
  "Month": "true¦aBdec9feb7j2mar,nov9oct1sep0;!t8;!o8;an3u0;l1n0;!e;!y;!u1;!ru0;ary;!em0;ber;pr1ug0;!ust;!il",
  "Duration": "true¦centur4d2hour3m0seconds,week3year3;i0onth2;llisecond1nute1;ay0ecade0;!s;ies,y",
  "FirstName": "true¦aEblair,cCdevBj8k6lashawn,m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g1ne;ar1el,org0;an;ion,lo;as8e0r9;ls7nyatta,rry;am0ess1ude;ie,m0;ie;an,on;as0heyenne;ey,sidy;lex1ndra,ubr0;ey;is",
  "LastName": "true¦0:34;1:39;2:3B;3:2Y;4:2E;5:30;a3Bb31c2Od2Ee2Bf25g1Zh1Pi1Kj1Ek17l0Zm0Nn0Jo0Gp05rYsMtHvFwCxBy8zh6;a6ou,u;ng,o;a6eun2Uoshi1Kun;ma6ng;da,guc1Zmo27sh21zaR;iao,u;a7eb0il6o3right,u;li3Bs1;gn0lk0ng,tanabe;a6ivaldi;ssilj37zqu2;a9h8i2Go7r6sui,urn0;an,ynisJ;lst0Prr1Uth;at1Uomps1;kah0Vnaka,ylor;aEchDeChimizu,iBmiAo9t7u6zabo;ar2lliv2AzuE;a6ein0;l23rm0;sa,u3;rn4th;lva,mmo24ngh;mjon4rrano;midt,neid0ulz;ito,n7sa6to;ki;ch2dLtos,z;amBeag1Zi9o7u6;bio,iz,sD;b6dri1MgIj0Tme24osevelt,ssi,ux;erts,ins1;c6ve0F;ci,hards1;ir2os;aEeAh8ic6ow20;as6hl0;so;a6illips;m,n1T;ders5et8r7t6;e0Nr4;ez,ry;ers;h21rk0t6vl4;el,te0J;baBg0Blivei01r6;t6w1O;ega,iz;a6eils1guy5ix1owak,ym1E;gy,ka6var1K;ji6muW;ma;aEeCiBo8u6;ll0n6rr0Bssolini,ñ6;oz;lina,oKr6zart;al0Me6r0U;au,no;hhail4ll0;rci0ssi6y0;!er;eWmmad4r6tsu07;in6tin2;!o;aCe8i6op2uo;!n6u;coln,dholm;fe7n0Qr6w0J;oy;bv6v6;re;mmy,rs5u;aBennedy,imuAle0Lo8u7wo6;k,n;mar,znets4;bay6vacs;asY;ra;hn,rl9to,ur,zl4;aAen9ha3imen2o6u3;h6nYu3;an6ns1;ss1;ki0Es5;cks1nsse0D;glesi9ke8noue,shik7to,vano6;u,v;awa;da;as;aBe8itchcock,o7u6;!a3b0ghNynh;a3ffmann,rvat;mingw7nde6rN;rs1;ay;ns5rrQs7y6;asDes;an4hi6;moJ;a9il,o8r7u6;o,tierr2;ayli3ub0;m2nzal2;nd6o,rcia;hi;erAis9lor8o7uj6;ita;st0urni0;es;ch0;nand2;d7insteHsposi6vaL;to;is1wards;aCeBi9omin8u6;bo6rand;is;gu2;az,mitr4;ov;lgado,vi;nkula,rw7vi6;es,s;in;aFhBlarkAo6;h5l6op0rbyn,x;em7li6;ns;an;!e;an8e7iu,o6ristens5u3we;i,ng,u3w,y;!n,on6u3;!g;mpb7rt0st6;ro;ell;aBe8ha3lanco,oyko,r6yrne;ooks,yant;ng;ck7ethov5nnett;en;er,ham;ch,h8iley,rn6;es,i0;er;k,ng;dDl9nd6;ers6rA;en,on,s1;on;eks7iy8var2;ez;ej6;ev;ams",
  "MaleName": "true¦0:CF;1:BL;2:C3;3:BT;4:B5;5:C0;6:AT;7:9V;8:BD;9:AX;A:AO;aB4bA8c97d87e7Gf6Yg6Gh5Wi5Ij4Lk4Bl3Rm2Pn2Eo28p22qu20r1As0Qt06u05v00wNxavi3yGzB;aBor0;cBh8Ine;hCkB;!aB1;ar51eB0;ass2i,oCuB;sDu25;nEsDusB;oBsC;uf;ef;at0g;aJeHiCoByaAP;lfgang,odrow;lBn1O;bDey,frBJlB;aA5iB;am,e,s;e89ur;i,nde7sB;!l6t1;de,lCrr5yB;l1ne;lBt3;a93y;aEern1iB;cCha0nceBrg9Bva0;!nt;ente,t5A;lentin49n8Yughn;lyss4Msm0;aTeOhKiIoErCyB;!l3ro8s1;av9QeBist0oy,um0;nt9Iv54y;bDd7XmBny;!as,mBoharu;aAYie,y;i83y;mBt9;!my,othy;adDeoCia7DomB;!as;!do7M;!de9;dErB;en8HrB;an8GeBy;ll,n8F;!dy;dgh,ic9Tnn3req,ts45;aRcotPeNhJiHoFpenc3tBur1Oylve8Hzym1;anDeBua7B;f0phAFvBwa7A;e57ie;!islaw,l6;lom1nA3uB;leyma8ta;dBl7Jm1;!n6;aDeB;lBrm0;d1t1;h6Sne,qu0Uun,wn,y8;aBbasti0k1Xl41rg40th,ymo9I;m9n;!tB;!ie,y;lCmBnti21q4Iul;!mAu4;ik,vato6V;aWeShe92iOoFuCyB;an,ou;b6LdCf9pe6QssB;!elAJ;ol2Uy;an,bIcHdGel,geFh0landA3mEnDry,sCyB;!ce;coe,s;!a95nA;an,eo;l3Jr;e4Qg3n6oA4ri68;co,ky;bAe9U;cBl6;ar5Oc5NhCkBo;!ey,ie,y;a85ie;gCid,ub5x,yBza;ansh,nS;g8WiB;na8Ss;ch5Yfa4lDmCndBpha4sh6Uul,ymo70;al9Zol2By;i9Ion;f,ph;ent2inB;cy,t1;aFeDhilCier62ol,reB;st1;!ip,lip;d9Brcy,tB;ar,e2V;b3Sdra6Ft44ul;ctav2Vliv3m96rFsCtBum8Uw5;is,to;aCc8SvB;al52;ma;i,l49vJ;athJeHiDoB;aBel,l0ma0r2X;h,m;cCg4i3IkB;h6Uola;hol5XkBol5X;!ol5W;al,d,il,ls1vB;il50;anBy;!a4i4;aWeTiKoFuCyB;l21r1;hamCr5ZstaB;fa,p4G;ed,mF;dibo,e,hamDis1XntCsBussa;es,he;e,y;ad,ed,mB;ad,ed;cGgu4kElDnCtchB;!e7;a78ik;o03t1;e,olB;aj;ah,hBk6;a4eB;al,l;hClv2rB;le,ri7v2;di,met;ck,hNlLmOnu4rHs1tDuricCxB;!imilian86we7;e,io;eo,hCi52tB;!eo,hew,ia;eBis;us,w;cDio,k80lCqu6Gsha7tBv2;i2Hy;in,on;!el,oKus;achBcolm,ik;ai,y;amBdi,moud;adB;ou;aReNiMlo2RoIuCyB;le,nd1;cEiDkBth3;aBe;!s;gi,s;as,iaB;no;g0nn6RrenDuBwe7;!iB;e,s;!zo;am,on4;a7Bevi,la4SnDoBst3vi;!nB;!a60el;!ny;mCnBr67ur4Twr4T;ce,d1;ar,o4N;aIeDhaled,iBrist4Vu48y3B;er0p,rB;by,k,ollos;en0iEnBrmit,v2;!dCnBt5C;e0Yy;a7ri4N;r,th;na68rBthem;im,l;aYeQiOoDuB;an,liBst2;an,o,us;aqu2eJhnInGrEsB;eChBi7Cue;!ua;!ph;dBge;an,i,on;!aBny;h,s,th4X;!ath4Wie,nA;!l,sBy;ph;an,e,mB;!mA;d,ffGrDsB;sBus;!e;a5JemCmai8oBry;me,ni0O;i6Vy;!e58rB;ey,y;cHd5kGmFrDsCvi3yB;!d5s1;on,p3;ed,od,rBv4M;e4Zod;al,es,is1;e,ob,ub;k,ob,quB;es;aNbrahMchika,gKkeJlija,nuIrGsDtBv0;ai,sB;uki;aBha0i6Gma4sac;ac,iaB;h,s;a,vinBw2;!g;k,nngu52;!r;nacBor;io;im;in,n;aJeFina4VoDuByd56;be25gBmber4CsD;h,o;m3ra33sBwa3X;se2;aDctCitCn4ErB;be20m0;or;th;bKlJmza,nIo,rDsCyB;a43d5;an,s0;lEo4FrDuBv6;hi40ki,tB;a,o;is1y;an,ey;k,s;!im;ib;aQeMiLlenKoIrEuB;illerCsB;!tavo;mo;aDegBov3;!g,orB;io,y;dy,h58nt;nzaBrd1;lo;!n;lbe4Qno,ovan4S;ne,oDrB;aBry;ld,rd4O;ffr6rge;bri4l5rBv2;la1Zr3Eth,y;aReNiLlJorr0IrB;anDedBitz;!dAeBri24;ri23;cDkB;!ie,lB;in,yn;esJisB;!co,zek;etch3oB;yd;d4lBonn;ip;deriDliCng,rnB;an01;pe,x;co;bi0di;arZdUfrTit0lNmGnFo2rCsteb0th0uge8vBym5zra;an,ere2V;gi,iCnBrol,v2w2;est3Zie;c07k;och,rique,zo;aGerFiCmB;aFe2P;lCrB;!h0;!io;s1y;nu4;be09d1iEliDmCt1viBwood;n,s;er,o;ot1Ts;!as,j44sB;ha;a2en;!dAg32mEuCwB;a25in;arB;do;o0Su0S;l,nB;est;aYeOiLoErDuCwByl0;ay8ight;a8dl6nc0st2;ag0ew;minFnDri0ugCyB;le;!l03;!a29nBov0;e7ie,y;go,icB;!k;armuCeBll1on,rk;go;id;anIj0lbeHmetri9nFon,rEsDvCwBxt3;ay8ey;en,in;hawn,mo08;ek,ri0F;is,nBv3;is,y;rt;!dB;re;lKmInHrDvB;e,iB;!d;en,iDne7rByl;eBin,yl;l2Wn;n,o,us;!e,i4ny;iBon;an,en,on;e,lB;as;a06e04hWiar0lLoGrEuCyrB;il,us;rtB;!is;aBistobal;ig;dy,lEnCrB;ey,neli9y;or,rB;ad;by,e,in,l2t1;aGeDiByI;fBnt;fo0Ct1;meCt9velaB;nd;nt;rDuCyB;!t1;de;enB;ce;aFeErisCuB;ck;!tB;i0oph3;st3;d,rlBs;eBie;s,y;cBdric,s11;il;lEmer1rB;ey,lCro7y;ll;!os,t1;eb,v2;ar02eUilTlaSoPrCuByr1;ddy,rtI;aJeEiDuCyB;an,ce,on;ce,no;an,ce;nCtB;!t;dCtB;!on;an,on;dCndB;en,on;!foBl6y;rd;bCrByd;is;!by;i8ke;al,lA;nFrBshoi;at,nCtB;!r11;aBie;rd0M;!edict,iCjam2nA;ie,y;to;n6rBt;eBy;tt;ey;ar0Yb0Od0Kgust2hm0Hid5ja0FlZmXnPputsiOrFsaEuCveBya0ziz;ry;gust9st2;us;hi;aIchHi4jun,maFnDon,tBy0;hBu06;ur;av,oB;ld;an,nd04;el;ie;ta;aq;dGgelZtB;hoEoB;i8nB;!iWy;ne;ny;reBy;!as,s,w;ir,mBos;ar;an,beOd5eIfFi,lEonDphonHt1vB;aMin;on;so,zo;an,en;onCrB;edJ;so;c,jaEksandDssaExB;!and3;er;ar,er;ndB;ro;rtB;!o;ni;en;ad,eB;d,t;in;aCoBri0vik;lfo;mBn;!a;dFeEraCuB;!bakr,lfazl;hBm;am;!l;allEel,oulaye,ulB;!lCrahm0;an;ah,o;ah;av,on",
  "Person": "true¦ashton kutchRbQcLdJeHgastMhFinez,jDkCleBmAnettIo9p7r4s3t2v0;a0irgin maF;lentino rossi,n go3;heresa may,iger woods,yra banks;addam hussain,carlett johanssIlobodan milosevic,uA;ay romano,eese witherspoHo1ush limbau0;gh;d stewart,naldinho;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0ruz;on;dinal wols1son0;! palm2;ey;arack obama,rock;er",
  "PhrasalVerb": "true¦0:71;1:6P;2:7D;3:73;4:6I;5:7G;6:75;7:6O;8:6B;9:6C;A:5H;B:70;C:6Z;a7Gb62c5Cd59e57f45g3Nh37iron0j33k2Yl2Km2Bn29o27p1Pr1Es09tQuOvacuum 1wGyammerCzD;eroAip EonD;e0k0;by,up;aJeGhFiEorDrit52;d 1k2Q;mp0n49pe0r8s8;eel Bip 7K;aEiD;gh 06rd0;n Br 3C;it 5Jk8lk6rm 0Qsh 73t66v4O;rgeCsD;e 9herA;aRePhNiJoHrFuDype 0N;ckArn D;d2in,o3Fup;ade YiDot0y 32;ckle67p 79;ne66p Ds4C;d2o6Kup;ck FdEe Dgh5Sme0p o0Dre0;aw3ba4d2in,up;e5Jy 1;by,o6U;ink Drow 5U;ba4ov7up;aDe 4Hll4N;m 1r W;ckCke Elk D;ov7u4N;aDba4d2in,o30up;ba4ft7p4Sw3;a0Gc0Fe09h05i02lYmXnWoVpSquare RtJuHwD;earFiD;ngEtch D;aw3ba4o6O; by;ck Dit 1m 1ss0;in,up;aIe0RiHoFrD;aigh1LiD;ke 5Xn2X;p Drm1O;by,in,o6A;n2Yr 1tc3H;c2Xmp0nd Dr6Gve6y 1;ba4d2up;d2o66up;ar2Uell0ill4TlErDurC;ingCuc8;a32it 3T;be4Brt0;ap 4Dow B;ash 4Yoke0;eep EiDow 9;c3Mp 1;in,oD;ff,v7;gn Eng2Yt Dz8;d2o5up;in,o5up;aFoDu4E;ot Dut0w 5W;aw3ba4f36o5Q;c2EdeAk4Rve6;e Hll0nd GtD; Dtl42;d2in,o5upD;!on;aw3ba4d2in,o1Xup;o5to;al4Kout0rap4K;il6v8;at0eKiJoGuD;b 4Dle0n Dstl8;aDba4d2in52o3Ft2Zu3D;c1Ww3;ot EuD;g2Jnd6;a1Wf2Qo5;ng 4Np6;aDel6inAnt0;c4Xd D;o2Su0C;aQePiOlMoKrHsyc29uD;ll Ft D;aDba4d2in,o1Gt33up;p38w3;ap37d2in,o5t31up;attleCess EiGoD;p 1;ah1Gon;iDp 52re3Lur44wer 52;nt0;ay3YuD;gAmp 9;ck 52g0leCn 9p3V;el 46ncilA;c3Oir 2Hn0ss FtEy D;ba4o4Q; d2c1X;aw3ba4o11;pDw3J;e3It B;arrow3Serd0oD;d6te3R;aJeHiGoEuD;ddl8ll36;c16p 1uth6ve D;al3Ad2in,o5up;ss0x 1;asur8lt 9ss D;a19up;ke Dn 9r2Zs1Kx0;do,o3Xup;aOeMiHoDuck0;a16c36g 0AoDse0;k Dse34;aft7ba4d2forw2Ain3Vov7uD;nd7p;e GghtFnEsDv1T;ten 4D;e 1k 1; 1e2Y;ar43d2;av1Ht 2YvelD; o3L;p 1sh DtchCugh6y1U;in3Lo5;eEick6nock D;d2o3H;eDyA;l2Hp D;aw3ba4d2fSin,o05to,up;aFoEuD;ic8mpA;ke2St2W;c31zz 1;aPeKiHoEuD;nker2Ts0U;lDneArse2O;d De 1;ba4d2fast,oZup;de Et D;ba4on,up;aw3o5;aDlp0;d Fr Dt 1;fDof;rom;in,oO;cZm 1nDve it;d Dg 27kerF;d2in,o5;aReLive Jloss1VoFrEunD; f0M;in39ow 23; Dof 0U;aEb17it,oDr35t0Ou12;ff,n,v7;bo5ft7hJw3;aw3ba4d2in,oDup,w3;ff,n,ut;a17ek0t D;aEb11d2oDr2Zup;ff,n,ut,v7;cEhDl1Pr2Xt,w3;ead;ross;d aEnD;g 1;bo5;a08e01iRlNoJrFuD;cDel 1;k 1;eEighten DownCy 1;aw3o2L;eDshe1G; 1z8;lFol D;aDwi19;bo5r2I;d 9;aEeDip0;sh0;g 9ke0mDrD;e 2K;gLlJnHrFsEzzD;le0;h 2H;e Dm 1;aw3ba4up;d0isD;h 1;e Dl 11;aw3fI;ht ba4ure0;eInEsD;s 1;cFd D;fDo1X;or;e B;dQl 1;cHll Drm0t0O;apYbFd2in,oEtD;hrough;ff,ut,v7;a4ehi1S;e E;at0dge0nd Dy8;o1Mup;o09rD;ess 9op D;aw3bNin,o15;aShPlean 9oDross But 0T;me FoEuntD; o1M;k 1l6;aJbIforGin,oFtEuD;nd7;ogeth7;ut,v7;th,wD;ard;a4y;pDr19w3;art;eDipA;ck BeD;r 1;lJncel0rGsFtch EveA; in;o16up;h Bt6;ry EvD;e V;aw3o12;l Dm02;aDba4d2o10up;r0Vw3;a0He08l01oSrHuD;bbleFcklTilZlEndlTrn 05tDy 10zz6;t B;k 9; ov7;anMeaKiDush6;ghHng D;aEba4d2forDin,o5up;th;bo5lDr0Lw3;ong;teD;n 1;k D;d2in,o5up;ch0;arKgJil 9n8oGssFttlEunce Dx B;aw3ba4;e 9; ar0B;k Bt 1;e 1;d2up; d2;d 1;aIeed0oDurt0;cFw D;aw3ba4d2o5up;ck;k D;in,oK;ck0nk0st6; oJaGef 1nd D;d2ov7up;er;up;r0t D;d2in,oDup;ff,ut;ff,nD;to;ck Jil0nFrgEsD;h B;ainCe B;g BkC; on;in,o5; o5;aw3d2o5up;ay;cMdIsk Fuction6; oD;ff;arDo5;ouD;nd;d D;d2oDup;ff,n;own;t D;o5up;ut",
  "Modal": "true¦c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to;ay,ight,ust;an,o0;uld",
  "Adjective": "true¦0:75;1:7K;2:7Q;3:7J;4:7C;5:5C;6:48;7:49;8:4S;9:61;A:7H;B:70;C:6Z;D:73;E:5X;a6Jb65c5Rd57e4Tf49g41h3Qi35j33k32l2Rm2Gn27o1Rp1Aquack,r10s0Gt09uQvNwFyear5;arp0eJholeIiHoF;man5oFu6C;d6Ezy;despr75s5G;!sa7;eGlFste26;co1Il o4L;!k5;aGiFola4B;b7Tce versa,ol55;ca2gabo63nilla;ltWnJpGrb5Asu4tterF;!moC; f34b1OpGsFti1H;ca7et,ide dMtairs;er,i3N;aPbeco6Rconvin27deMeLfair,ivers4knKprecedYrIsGwF;iel20ritt5Z;i1VuF;pervis0specti3;eFu5;cognLgul6Hl6H;own;ndi3v5Txpect0;cid0rF;!grou5OsF;iz0tood;b7ppeaLssu6GuthorF;iz0;i24ra;aJeHhough4PoGrF;i1oubl0;geth8p,rpB;en5QlFm50rr2Ust0;li3;boo,lFn;ent0;aXcWeUhTiRmug,nobbi3EoPpOqueami3EtJuFymb64;bHi gener55pFrprisi3;erFre0L;! dup8b,i29;du0seq4U;anda6UeIi0PrFy38;aightFip0; fFfF;or5B;adfaCreotyp0;aEec2Gir1JlendBot on; call0le,mb8phist1XrFu0Xvi42;dBry;gnifica2nF;ceEg7;am2Pe8ocki3ut;cFda1em5lfi2Yni1Wpa69re6;o1Gr3W;at58ient28reec58;cr0me,ns serif;aMeIiGoF;buCtt4UuSy4;ghtFv4;!-29f9;ar,bel,condi1du63fres52lHpublic3WsFtard0;is48oF;lu1na2;e1Euc46;bBciF;al,st;aQeOicayu6lacBopuliCrGuF;bl5Amp0;eJiGoF;!b0AfuDmi32p8;mGor,sFva1;ti6;a4We;ciDmF;a0IiF;er,um;ac20rFti1;feAma2Uplexi3v34;rFst;allelHtF;-tiFi4;me;!ed;bQffOkNld fashion0nMpLrg1Hth8utKvF;al,erF;!aHniGt,wF;eiFrouF;ght;ll;do0Ver,g2Msi46;en,posi1; boa5Gg2Kli6;!ay; gua5EbFli6;eat;eHsF;cFer0Hole1;e6uE;d2Tse;ak0eMiLoFua4P;nJrGtF;ab7;thF;!eF;rn;chala2descri50stop;ght5;arby,cessa3Xighbor5xt;aNeLiIoFultip7;bi7derGlFnth5ot,st;dy;a1n;nFx0;iaFor;tuE;di4FnaFre;ci3;cFgenta,in,j03keshift,le,mmoth,ny,sculi6;abEho;aOeJiGoFu13;uti12vi3;mGteraF;l,te;it0;ftIgFth4;al,eGitiF;ma1;nda3D;!-0C;nguBst,tt8;ap1Tind5no0A;agg0uF;niOstifi0veni7;de4gno4Clleg4mSnHpso 1WrF;a1releF;va2; NaMbr0corLdJfluenTiTnIsHtF;aAenDoxF;ic37;a6i2S;a1er,oce2;iGoF;or;reA;deq3Kppr2Z;fFsitu,vitro;ro2;mJpF;arHerfeAoFrop8;li1rtF;a2ed;ti4;eFi0R;d2RnD;aKelJiHoFumdr3C;neCok0rrFs07ur5;if2T;ghfalut1PspF;an2R;liZpf9;lInHrF;d05roF;wi3;dy,gi3;f,low0;ainf9ener2Kiga23lLoKraHuF;ilFng ho;ty;cGtF;ef9is;ef9;ne,od;ea2Eob4;aUeOinNlMoHrF;a1UeFoz1L;e2Eq13tf9;oHrF; keeps,eFm8tuna1;g05ign;liF;sh;ag30ue2;al,i1;dJmGrF;ti7;a7ini6;ne;le; up;bl0i2lDr Gux,voF;ri1uri1;oFreac1F;ff;aOfficie2lNmiMnKreAthere4veJxF;aAcess,peHtraGuF;be2Ml0I;!va1E;ct0rt;n,ryday; Fcouragi3tiE;rou1sui1;ne2;abo23dQe18i1;g8sF;t,ygF;oi3;er;aVeNiHoFrea15ue;mina2ne,ubF;le,tf9;dact1Bfficu1OsGvF;erD;creHeas0gruntl0honeCordGtF;a2ress0;er5;et; LadpKfJgene1PliHrang0spe1PtGvoF;ut;ail0ermin0;be1Mca1ghF;tf9;ia2;an;facto;i5magFngeroZs0I;ed,i3;ly;ertaRhief,ivil,oHrF;aFowd0u0H;mp0v02z0;loNmLnGoi3rrFve0P;eAu1I;cre1grIsHtF;emFra0F;po0D;ta2;ue2;mer08pleF;te,x;ni4ss4;in;aPeLizarElJoGrF;and new,isk,okP;gGna fiWttom,urgeoF;is;us;ank,iI;re;autif9hiGlov0nFst,yoG;eVt;nd;ul;ckGnkru0XrrF;en;!wards; priori,b0Nc0Kd0AfraBg05h04lZma06ntiquYpUrOsMttracti07utheLvIwF;aGkF;wa0U;ke,re;ant garGerF;age;de;ntV;leep,tonisF;hi3;ab,bitIroHtiF;fiF;ci4;ga2;raF;ry;pFt;are2etiPrF;oprF;ia1;at0;arIcohGeFiMl,oof;rt;olF;ic;mi3;ead;ainCgressiGoniF;zi3;ve;st;id; MeKuJvF;aGerD;se;nc0;ed;lt;pt,qF;ua1;hoc,infinitF;um;cuGtu4u1;al;ra1;erPlOoMruLsGuF;nda2;e2oGtraA;ct;lu1rbi3;ng;te;pt;aFve;rd;aze,e;ra2;nt",
  "Comparable": "true¦0:40;1:4H;2:44;3:4A;4:2X;5:3W;a4Nb43c3Nd3Ce34f2Qg2Eh23i1Uj1Tk1Ql1Hm1Bn15o13p0Tqu0Rr0IsRtKuIvFw7y6za11;ell26ou3;aBe9hi1Xi7r6;o3y;ck0Mde,l6n1ry,se;d,y;a6i4Lt;k,ry;n1Sr6sI;m,y;a7e6ulgar;nge5rda2xi3;gue,in,st;g0n6pco3Lse5;like0ti1;aAen9hi8i7ough,r6;anqu2Pen1ue;dy,g3Tme0ny,r09;ck,n,rs2Q;d41se;ll,me,rt,s6wd46;te5;aVcarUeThRiQkin0FlMmKoHpGqua1GtAu7w6;eet,ift;b7dd14per0Gr6;e,re2I;sta2Gt4;aAe9iff,r7u6;pXr1;a6ict,o3;ig3Gn0V;a1ep,rn;le,rk;e23i3Gright0;ci29ft,l7o6re,ur;n,thi3;emn,id;a6el0ooth;ll,rt;e8i6ow,y;ck,g36m6;!y;ek,nd3E;ck,l0mp4;a6iTort,rill,y;dy,ll0Yrp;cu0Sve0Sxy;ce,ed,y;d,fe,int0l1Wv15;aBe9i8o6ude;mantic,o1Jsy,u6;gh,nd;ch,pe,tzy;a6d,mo0I;dy,l;gg7ndom,p6re,w;id;ed;ai2i6;ck,et;aEhoDi1RlCoBr8u6;ny,r6;e,p4;egna2ic7o6;fouZud;ey,k0;li05or,te1C;ain,easa2;ny;in5le;dd,f6i0ld,ranR;fi11;aAe8i7o6;b4isy,rm16sy;ce,mb4;a6w;r,t;ive,rr02;aAe8ild,o7u6;nda1Ate;ist,o1;a6ek,llY;n,s0ty;d,tuR;aCeBi9o6ucky;f0Vn7o1Eu6ve0w18y0U;d,sy;e0g;g1Uke0tt4v6;e0i3;an,wd;me,r6te;ge;e7i6;nd;en;ol0ui1P;cy,ll,n6;sBt6;e6ima8;llege2r6;es7media6;te;ti3;ecu6ta2;re;aEeBiAo8u6;ge,m6ng1R;b4id;ll6me0t;ow;gh,l0;a6f04sita2;dy,v6;en0y;nd1Hppy,r6te5;d,sh;aGenFhDiClBoofy,r6;a9e8is0o6ue1E;o6ss;vy;at,en,y;nd,y;ad,ib,ooI;a2d1;a6o6;st0;t4uiY;u1y;aIeeb4iDlat,oAr8u6;ll,n6r14;!ny;aHe6iend0;e,sh;a7r6ul;get5mG;my;erce8n6rm,t;an6e;ciC;! ;le;ir,ke,n0Fr,st,t,ulA;aAerie,mp9sse7v6xtre0Q;il;nti6;al;ty;r7s6;tern,y;ly,th0;aFeCi9r7u6;ll,mb;u6y;nk;r7vi6;ne;e,ty;a6ep,nD;d6f,r;!ly;mp,pp03rk;aHhDlAo8r7u6;dd0r0te;isp,uel;ar6ld,mmon,ol,st0ward0zy;se;e6ou1;a6vW;n,r;ar8e6il0;ap,e6;sy;mi3;gey,lm8r6;e5i3;ful;!i3;aNiLlIoEr8u6;r0sy;ly;aAi7o6;ad,wn;ef,g7llia2;nt;ht;sh,ve;ld,r7un6;cy;ed,i3;ng;a7o6ue;nd,o1;ck,nd;g,tt6;er;d,ld,w1;dy;bsu9ng8we6;so6;me;ry;rd",
  "TextNumber": "true¦bMeIfChundredNmMnin9one,qu8s6t0zeroN;enMh3rLw0;e0o;l0ntC;fGve;ir0ousandIree;d,t5;e0ix7;cond,ptEven6xtE;adrDintD;e0th;!t0;e9ie8y;i3o0;rt1ur0;!t2;ie4y;ft0rst,ve;e3h,ie2y;ight0lev2;!e1h,ie0y;th;en1;illion0;!th",
  "Ordinal": "true¦bGeDf9hundredHmGnin7qu6s4t0zeroH;enGh1rFwe0;lfFn9;ir0ousandE;d,t4;e0ixt9;cond,ptAvent8xtA;adr9int9;et0th;e6ie8;i2o0;r0urt3;tie5;ft1rst;ight0lev1;e0h,ie2;en1;illion0;th",
  "Cardinal": "true¦bGeDf7hundred,mGnine9one,qu6s4t0zero;en,h2rFw0;e0o;lve,n7;irt8ousand,ree;e0ix4;ptAven3xtA;adr9int9;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illion",
  "Expression": "true¦a02b01dXeVfuck,gShLlImHnGoDpBshAu7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la",
  "Adverb": "true¦a07by 05d01eYfShQinPjustOkinda,mMnJoEpCquite,r9s5t2up1very,w0Bye0;p,s; to,wards5;h1o0wiO;o,t6ward;en,us;everal,o0uch;!me1rt0; of;hXtimes,w07;a1e0;alS;ndomRthN;ar excellDer0oint blank; Mhaps;f3n0;ce0ly;! 0;ag00moU; courHten;ewJo0; longEt 0;onHwithstanding;aybe,eanwhiAore0;!ovB;! aboS;deed,steT;en0;ce;or2u0;l9rther0;!moH; 0ev3;examp0good,suF;le;n mas1v0;er;se;e0irect1; 1finite0;ly;ju7trop;far,n0;ow; CbroBd nauseam,gAl5ny2part,side,t 0w3;be5l0mo5wor5;arge,ea4;mo1w0;ay;re;l 1mo0one,ready,so,ways;st;b1t0;hat;ut;ain;ad;lot,posteriori",
  "Preposition": "true¦'o,-,aKbHcGdFexcept,fEinDmidPnotwithstandiQoBpRqua,sAt6u3vi2w0;/o,hereMith0;!in,oQ;a,s-a-vis;n1p0;!on;like,til;h0ill,owards;an,r0;ough0u;!oI;ans,ince,o that;',f0n1ut;!f;!to;or,rom;espite,own,u3;hez,irca;ar1e0oAy;low,sides,tween;ri6;',bo7cross,ft6lo5m3propos,round,s1t0;!op;! long 0;as;id0ong0;!st;ng;er;ut",
  "Determiner": "true¦aAboth,d8e5few,l3mu7neiCown,plenty,some,th2various,wh0;at0ich0;evB;at,e3is,ose;a,e0;!ast,s;a1i6l0nough,very;!se;ch;e0u;!s;!n0;!o0y;th0;er"
};

//list of inconsistent parts-of-speech
var conflicts = [
  //top-level pos are all inconsistent
  [
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Determiner',
    'Conjunction',
    'Preposition',
    'QuestionWord',
    'Expression',
    'Url',
    'PhoneNumber',
    'Email',
    'Emoji',
  ],
  //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  //acronyms
  ['Acronym', 'Pronoun', 'Actor', 'Unit', 'Address'],
  ['Acronym', 'Plural'],
  //things that can't be plural
  ['Plural', 'Singular'],
  //exlusive-people
  ['MaleName', 'FemaleName'],
  ['FirstName', 'LastName', 'Honorific'],
  //adjectives
  ['Comparative', 'Superlative'],
  //values
  ['Value', 'Verb', 'Adjective'],
  ['Ordinal', 'Cardinal'],
  ['TextValue', 'NumericValue'],
  ['NiceNumber', 'TextValue'],
  ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['PastTense', 'PresentTense', 'FutureTense'],
  ['Pluperfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund', 'FuturePerfect', 'PerfectTense'],
  ['Auxiliary', 'Noun', 'Value'],
  //date
  ['Month', 'WeekDay', 'Year', 'Duration', 'Holiday'],
  ['Particle', 'Conjunction', 'Adverb', 'Preposition', 'Date'],
  ['Date', 'Verb', 'Adjective', 'Person'],
  ['Date', 'Money', 'RomanNumeral', 'Fraction'],
  //a/an -> 1
  ['Value', 'Determiner'],
  ['Url', 'Value', 'HashTag', 'PhoneNumber', 'Emoji'],
  //roman numerals
  ['RomanNumeral', 'Fraction', 'NiceNumber'],
  ['RomanNumeral', 'Money', 'Acronym'],
  //cases
  ['UpperCase', 'TitleCase', 'CamelCase'],
  //phrases
  ['Verb', 'Noun', 'Adjective', 'Value'], //VerbPhrase',
  //QuestionWord
  ['QuestionWord', 'Verb'],
  //acronyms
  ['Acronym', 'Verb'],
];

var nouns = {
  Noun: {},
  // - singular
  Singular: {
    isA: 'Noun',
  },
  //a specific thing that's capitalized
  ProperNoun: {
    isA: 'Noun',
  },

  // -- people
  Person: {
    isA: 'ProperNoun',
    also: 'Singular',
  },
  FirstName: {
    isA: 'Person',
  },
  MaleName: {
    isA: 'FirstName',
  },
  FemaleName: {
    isA: 'FirstName',
  },
  LastName: {
    isA: 'Person',
  },
  Honorific: {
    isA: 'Noun',
  },
  Place: {
    isA: 'Singular',
  },

  // -- places
  Country: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  City: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  Region: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  Address: {
    isA: 'Place',
  },
  Organization: {
    isA: 'Singular',
    also: 'ProperNoun',
  },
  SportsTeam: {
    isA: 'Organization',
  },
  Company: {
    isA: 'Organization',
  },
  School: {
    isA: 'Organization',
  },

  // - plural
  Plural: {
    isA: 'Noun',
  },
  Uncountable: {
    //(not plural or singular)
    isA: 'Noun',
  },
  Pronoun: {
    isA: 'Noun',
  },
  //a word for someone doing something -'plumber'
  Actor: {
    isA: 'Noun',
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    isA: 'Noun',
  },
  //'kilograms'
  Unit: {
    isA: 'Noun',
  },
  //'Canadians'
  Demonym: {
    isA: 'Noun',
    also: 'ProperNoun',
  },
  //`john's`
  Possessive: {
    isA: 'Noun',
  },
};

var verbs = {
  Verb: {
    // isA: 'VerbPhrase',
  },
  PresentTense: {
    isA: 'Verb',
  },
  Infinitive: {
    isA: 'PresentTense',
  },
  Gerund: {
    isA: 'PresentTense',
  },
  PastTense: {
    isA: 'Verb',
  },
  PerfectTense: {
    isA: 'Verb',
  },
  FuturePerfect: {
    isA: 'Verb',
  },
  Pluperfect: {
    isA: 'Verb',
  },
  Copula: {
    isA: 'Verb',
  },
  Modal: {
    isA: 'Verb',
  },
  Participle: {
    isA: 'Verb',
  },
  Particle: {
    isA: 'Verb',
  },
  PhrasalVerb: {
    isA: 'Verb',
  },
};

var values = {
  Value: {},
  Ordinal: {
    isA: 'Value',
  },
  Cardinal: {
    isA: 'Value',
  },
  // Multiple: {
  //   isA: 'Value',
  // },
  RomanNumeral: {
    isA: 'Cardinal',
  },
  Fraction: {
    isA: 'Value',
  },
  TextValue: {
    isA: 'Value',
  },
  NumericValue: {
    isA: 'Value',
  },
  Money: {
    //isA: 'Cardinal'
  },
  Percent: {
    isA: 'Value',
  },
};

var dates = {
  Date: {}, //not a noun, but usually is
  Month: {
    isA: 'Date',
    also: 'Singular',
  },
  WeekDay: {
    isA: 'Date',
    also: 'Noun',
  },
  RelativeDay: {
    isA: 'Date',
  },
  Year: {
    isA: 'Date',
  },
  Duration: {
    isA: 'Date',
    also: 'Noun',
  },
  Time: {
    isA: 'Date',
    also: 'Noun',
  },
  Holiday: {
    isA: 'Date',
    also: 'Noun',
  },
};

var misc = {
  Adjective: {},
  Comparable: {
    isA: 'Adjective',
  },
  Comparative: {
    isA: 'Adjective',
  },
  Superlative: {
    isA: 'Adjective',
  },

  NumberRange: {
    isA: 'Contraction',
  },
  Adverb: {},

  Currency: {},
  //glue
  Determiner: {},
  Conjunction: {},
  Preposition: {},
  QuestionWord: {},
  RelativeProunoun: {
    isA: 'Pronoun',
  },
  Expression: {},
  Abbreviation: {},
  Url: {},
  PhoneNumber: {},
  HashTag: {},
  AtMention: {
    isA: 'Noun',
  },
  Emoji: {},
  Email: {},

  //non-exclusive
  Auxiliary: {},
  Negative: {},
  Contraction: {},

  TitleCase: {},
  Hyphenated: {},
  Acronym: {},

  // Quotes
  Quotation: {},
  //parentheses
  Parentheses: {},
};

//add 'downward' tags (that immediately depend on this one)
const addDownword = function(tags) {
  const keys = Object.keys(tags);
  keys.forEach(k => {
    tags[k].downward = [];
    //look for tags with this as parent
    for (let i = 0; i < keys.length; i++) {
      if (tags[keys[i]].isA && tags[keys[i]].isA === k) {
        tags[k].downward.push(keys[i]);
      }
    }
  });
};
var addDownward = addDownword;

//used for pretty-printing on the server-side
const colors = {
  Noun: 'blue',
  // NounPhrase: 'blue',

  Verb: 'green',
  Auxiliary: 'green',
  Negative: 'green',
  // VerbPhrase: 'green',

  Date: 'red',
  Value: 'red',

  Adjective: 'magenta',

  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adverb: 'cyan',
  // Condition: 'cyan',
};

//extend tagset with new tags
const addIn = function(obj, tags) {
  Object.keys(obj).forEach(k => {
    tags[k] = obj[k];
  });
};

//add tags to remove when tagging this one
const addConflicts = function(tags) {
  Object.keys(tags).forEach(k => {
    tags[k].notA = {};
    for (let i = 0; i < conflicts.length; i++) {
      let arr = conflicts[i];
      if (arr.indexOf(k) !== -1) {
        arr = arr.filter(a => a !== k);
        arr.forEach(e => {
          tags[k].notA[e] = true;
        });
      }
    }
    tags[k].notA = Object.keys(tags[k].notA);
  });
};

const addColors = function(tags) {
  Object.keys(tags).forEach(k => {
    if (colors[k]) {
      tags[k].color = colors[k];
      return
    }
    if (tags[k].isA && colors[tags[k].isA]) {
      tags[k].color = colors[tags[k].isA];
      return
    }
    if (tags[k].isA && tags[tags[k].isA].color) {
      tags[k].color = tags[tags[k].isA].color;
    }
  });
};

const build = () => {
  let tags = {};
  addIn(nouns, tags);
  addIn(verbs, tags);
  addIn(values, tags);
  addIn(dates, tags);
  addIn(misc, tags);
  //downstream
  addDownward(tags);
  //add enemies
  addConflicts(tags);
  //for nice-logging
  addColors(tags);
  return tags
};
var tags = build();

const seq="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",cache=seq.split("").reduce(function(n,o,e){return n[o]=e,n},{}),toAlphaCode=function(n){if(void 0!==seq[n])return seq[n];let o=1,e=36,t="";for(;n>=e;n-=e,o++,e*=36);for(;o--;){const o=n%36;t=String.fromCharCode((o<10?48:55)+o)+t,n=(n-o)/36;}return t},fromAlphaCode=function(n){if(void 0!==cache[n])return cache[n];let o=0,e=1,t=36,r=1;for(;e<n.length;o+=t,e++,t*=36);for(let e=n.length-1;e>=0;e--,r*=36){let t=n.charCodeAt(e)-48;t>10&&(t-=7),o+=t*r;}return o};var encoding={toAlphaCode:toAlphaCode,fromAlphaCode:fromAlphaCode},symbols=function(n){const o=new RegExp("([0-9A-Z]+):([0-9A-Z]+)");for(let e=0;e<n.nodes.length;e++){const t=o.exec(n.nodes[e]);if(!t){n.symCount=e;break}n.syms[encoding.fromAlphaCode(t[1])]=encoding.fromAlphaCode(t[2]);}n.nodes=n.nodes.slice(n.symCount,n.nodes.length);};const indexFromRef=function(n,o,e){const t=encoding.fromAlphaCode(o);return t<n.symCount?n.syms[t]:e+t+1-n.symCount},toArray=function(n){const o=[],e=(t,r)=>{let s=n.nodes[t];"!"===s[0]&&(o.push(r),s=s.slice(1));const c=s.split(/([A-Z0-9,]+)/g);for(let s=0;s<c.length;s+=2){const u=c[s],i=c[s+1];if(!u)continue;const l=r+u;if(","===i||void 0===i){o.push(l);continue}const f=indexFromRef(n,i,t);e(f,l);}};return e(0,""),o},unpack=function(n){const o={nodes:n.split(";"),syms:[],symCount:0};return n.match(":")&&symbols(o),toArray(o)};var unpack_1=unpack,unpack_1$1=function(n){const o=n.split("|").reduce((n,o)=>{const e=o.split("¦");return n[e[0]]=e[1],n},{}),e={};return Object.keys(o).forEach(function(n){const t=unpack_1(o[n]);"true"===n&&(n=!0);for(let o=0;o<t.length;o++){const r=t[o];!0===e.hasOwnProperty(r)?!1===Array.isArray(e[r])?e[r]=[e[r],n]:e[r].push(n):e[r]=n;}}),e};var efrtUnpack_min=unpack_1$1;

//safely add it to the lexicon
const addWord = function(word, tag, lex) {
  if (lex[word] !== undefined) {
    if (typeof lex[word] === 'string') {
      lex[word] = [lex[word]];
    }
    lex[word].push(tag);
  } else {
    lex[word] = tag;
  }
};

// blast-out more forms for some given words
const addMore = function(word, tag, world) {
  let lexicon = world.lexicon;
  let transform = world.transforms;

  // cache multi-words
  let words = word.split(' ');
  if (words.length > 1) {
    //cache the beginning word
    world.hasCompound[words[0]] = true;
  }
  // inflect our nouns
  if (tag === 'Singular') {
    let plural = transform.nouns(word);
    lexicon[plural] = lexicon[plural] || 'Plural'; // only if it's safe
  }
  //conjugate our verbs
  if (tag === 'Infinitive') {
    let conj = transform.verbs(word);
    let tags = Object.keys(conj);
    for (let i = 0; i < tags.length; i++) {
      let w = conj[tags[i]];
      lexicon[w] = lexicon[w] || tags[i]; // only if it's safe
    }
  }
  //derive more adjective forms
  if (tag === 'Comparable') {
    let conj = transform.adjectives(word);
    let tags = Object.keys(conj);
    for (let i = 0; i < tags.length; i++) {
      let w = conj[tags[i]];
      lexicon[w] = lexicon[w] || tags[i]; // only if it's safe
    }
  }
  //conjugate phrasal-verbs
  if (tag === 'PhrasalVerb') {
    //add original form
    addWord(word, 'Infinitive', lexicon);
    //conjugate first word
    let conj = transform.verbs(words[0]);
    let tags = Object.keys(conj);
    for (let i = 0; i < tags.length; i++) {
      //add it to our cache
      world.hasCompound[conj[tags[i]]] = true;
      //first + last words
      let w = conj[tags[i]] + ' ' + words[1];
      addWord(w, tags[i], lexicon);
      addWord(w, 'PhrasalVerb', lexicon);
    }
  }
  // inflect our demonyms - 'germans'
  if (tag === 'Demonym') {
    let plural = transform.nouns(word);
    lexicon[plural] = lexicon[plural] || ['Demonym', 'Plural']; // only if it's safe
  }
};

// throw a bunch of words in our lexicon
// const doWord = function(words, tag, world) {
//   let lexicon = world.lexicon
//   for (let i = 0; i < words.length; i++) {
//     addWord(words[i], tag, lexicon)
//     // do some fancier stuff
//     addMore(words[i], tag, world)
//   }
// }
var addWords = {
  addWord: addWord,
  addMore: addMore,
};

// add words from plurals and conjugations data
const addIrregulars = function(world) {
  //add irregular plural nouns
  let nouns = world.irregulars.nouns;
  let words = Object.keys(nouns);
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    world.lexicon[w] = 'Singular';
    world.lexicon[nouns[w]] = 'Plural';
  }

  // add irregular verb conjugations
  let verbs = world.irregulars.verbs;
  let keys = Object.keys(verbs);
  for (let i = 0; i < keys.length; i++) {
    const inf = keys[i];
    //add only if it it's safe...
    world.lexicon[inf] = world.lexicon[inf] || 'Infinitive';
    let forms = world.transforms.verbs(inf);
    forms = Object.assign(forms, verbs[inf]);
    //add the others
    Object.keys(forms).forEach(tag => {
      world.lexicon[forms[tag]] = world.lexicon[forms[tag]] || tag;
    });
  }
};
var addIrregulars_1 = addIrregulars;

//words that can't be compressed, for whatever reason
var misc$1 = {
  // numbers
  '20th century fox': 'Organization',
  '3m': 'Organization',
  '7 eleven': 'Organization',
  '7-eleven': 'Organization',
  g8: 'Organization',
  'motel 6': 'Organization',
  vh1: 'Organization',
  q1: 'Date',
  q2: 'Date',
  q3: 'Date',
  q4: 'Date',
};

//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.

var plurals = {
  addendum: 'addenda',
  alga: 'algae',
  alumna: 'alumnae',
  alumnus: 'alumni',
  analysis: 'analyses',
  antenna: 'antennae',
  appendix: 'appendices',
  avocado: 'avocados',
  axis: 'axes',
  bacillus: 'bacilli',
  barracks: 'barracks',
  beau: 'beaux',
  bus: 'buses',
  cactus: 'cacti',
  chateau: 'chateaux',
  child: 'children',
  circus: 'circuses',
  clothes: 'clothes',
  corpus: 'corpora',
  criterion: 'criteria',
  curriculum: 'curricula',
  database: 'databases',
  deer: 'deer',
  diagnosis: 'diagnoses',
  echo: 'echoes',
  embargo: 'embargoes',
  epoch: 'epochs',
  foot: 'feet',
  formula: 'formulae',
  fungus: 'fungi',
  genus: 'genera',
  goose: 'geese',
  halo: 'halos',
  hippopotamus: 'hippopotami',
  index: 'indices',
  larva: 'larvae',
  leaf: 'leaves',
  libretto: 'libretti',
  loaf: 'loaves',
  man: 'men',
  matrix: 'matrices',
  memorandum: 'memoranda',
  modulus: 'moduli',
  mosquito: 'mosquitoes',
  mouse: 'mice',
  move: 'moves',
  nebula: 'nebulae',
  nucleus: 'nuclei',
  octopus: 'octopi',
  opus: 'opera',
  ovum: 'ova',
  ox: 'oxen',
  parenthesis: 'parentheses',
  person: 'people',
  phenomenon: 'phenomena',
  prognosis: 'prognoses',
  quiz: 'quizzes',
  radius: 'radii',
  referendum: 'referenda',
  rodeo: 'rodeos',
  sex: 'sexes',
  shoe: 'shoes',
  sombrero: 'sombreros',
  stimulus: 'stimuli',
  stomach: 'stomachs',
  syllabus: 'syllabi',
  synopsis: 'synopses',
  tableau: 'tableaux',
  thesis: 'theses',
  thief: 'thieves',
  tooth: 'teeth',
  tornado: 'tornados',
  tuxedo: 'tuxedos',
  vertebra: 'vertebrae',
  // virus: 'viri',
  zero: 'zeros',
};

// a list of irregular verb conjugations
// used in verbs().conjugate()
// but also added to our lexicon

//use shorter key-names
const mapping = {
  g: 'Gerund',
  prt: 'Participle',
  perf: 'PerfectTense',
  pst: 'PastTense',
  fut: 'FuturePerfect',
  pres: 'PresentTense',
  pluperf: 'Pluperfect',
  act: 'Actor',
};

// '_' in conjugations is the infinitive form
let conjugations = {
  act: {
    act: '_or',
  },
  age: {
    g: 'ageing',
    pst: 'aged',
    pres: 'ages',
  },
  aim: {
    act: '_er',
    g: '_ing',
    pst: '_ed',
  },
  arise: {
    prt: '_n',
    pst: 'arose',
  },
  babysit: {
    act: '_ter',
    pst: 'babysat',
  },
  ban: {
    act: '',
    g: '_ning',
    pst: '_ned',
  },
  be: {
    act: '',
    g: 'am',
    prt: 'been',
    pst: 'was',
    pres: 'is',
  },
  beat: {
    act: '_er',
    g: '_ing',
    prt: '_en',
  },
  become: {
    prt: '_',
  },
  begin: {
    g: '_ning',
    prt: 'begun',
    pst: 'began',
  },
  being: {
    g: 'are',
    pst: 'were',
    pres: 'are',
  },
  bend: {
    prt: 'bent',
  },
  bet: {
    act: '_ter',
    prt: '_',
  },
  bind: {
    pst: 'bound',
  },
  bite: {
    g: 'biting',
    prt: 'bitten',
    pst: 'bit',
  },
  bleed: {
    prt: 'bled',
    pst: 'bled',
  },
  blow: {
    prt: '_n',
    pst: 'blew',
  },
  boil: {
    act: '_er',
  },
  brake: {
    prt: 'broken',
  },
  break: {
    pst: 'broke',
  },
  breed: {
    pst: 'bred',
  },
  bring: {
    prt: 'brought',
    pst: 'brought',
  },
  broadcast: {
    pst: '_',
  },
  budget: {
    pst: '_ed',
  },
  build: {
    prt: 'built',
    pst: 'built',
  },
  burn: {
    prt: '_ed',
  },
  burst: {
    prt: '_',
  },
  buy: {
    prt: 'bought',
    pst: 'bought',
  },
  can: {
    act: '',
    fut: '_',
    g: '',
    pst: 'could',
    perf: 'could',
    pluperf: 'could',
    pres: '_',
  },
  catch: {
    pst: 'caught',
  },
  choose: {
    g: 'choosing',
    prt: 'chosen',
    pst: 'chose',
  },
  cling: {
    prt: 'clung',
  },
  come: {
    prt: '_',
    pst: 'came',
  },
  compete: {
    act: 'competitor',
    g: 'competing',
    pst: '_d',
  },
  cost: {
    pst: '_',
  },
  creep: {
    prt: 'crept',
  },
  cut: {
    prt: '_',
  },
  deal: {
    prt: '_t',
    pst: '_t',
  },
  develop: {
    act: '_er',
    g: '_ing',
    pst: '_ed',
  },
  die: {
    g: 'dying',
    pst: '_d',
  },
  dig: {
    g: '_ging',
    prt: 'dug',
    pst: 'dug',
  },
  dive: {
    prt: '_d',
  },
  do: {
    pst: 'did',
    pres: '_es',
  },
  draw: {
    prt: '_n',
    pst: 'drew',
  },
  dream: {
    prt: '_t',
  },
  drink: {
    prt: 'drunk',
    pst: 'drank',
  },
  drive: {
    g: 'driving',
    prt: '_n',
    pst: 'drove',
  },
  drop: {
    g: '_ping',
    pst: '_ped',
  },
  eat: {
    act: '_er',
    g: '_ing',
    prt: '_en',
    pst: 'ate',
  },
  edit: {
    g: '_ing',
  },
  egg: {
    pst: '_ed',
  },
  fall: {
    prt: '_en',
    pst: 'fell',
  },
  feed: {
    prt: 'fed',
    pst: 'fed',
  },
  feel: {
    act: '_er',
    pst: 'felt',
  },
  fight: {
    prt: 'fought',
    pst: 'fought',
  },
  find: {
    pst: 'found',
  },
  flee: {
    g: '_ing',
    prt: 'fled',
  },
  fling: {
    prt: 'flung',
  },
  fly: {
    prt: 'flown',
    pst: 'flew',
  },
  forbid: {
    pst: 'forbade',
  },
  forget: {
    g: '_ing',
    prt: 'forgotten',
    pst: 'forgot',
  },
  forgive: {
    g: 'forgiving',
    prt: '_n',
    pst: 'forgave',
  },
  free: {
    act: '',
    g: '_ing',
  },
  freeze: {
    g: 'freezing',
    prt: 'frozen',
    pst: 'froze',
  },
  get: {
    pst: 'got',
    prt: 'gotten',
  },
  give: {
    g: 'giving',
    prt: '_n',
    pst: 'gave',
  },
  go: {
    prt: '_ne',
    pst: 'went',
    pres: 'goes',
  },
  grow: {
    prt: '_n',
  },
  hang: {
    prt: 'hung',
    pst: 'hung',
  },
  have: {
    g: 'having',
    prt: 'had',
    pst: 'had',
    pres: 'has',
  },
  hear: {
    prt: '_d',
    pst: '_d',
  },
  hide: {
    prt: 'hidden',
    pst: 'hid',
  },
  hit: {
    prt: '_',
  },
  hold: {
    prt: 'held',
    pst: 'held',
  },
  hurt: {
    prt: '_',
    pst: '_',
  },
  ice: {
    g: 'icing',
    pst: '_d',
  },
  imply: {
    pst: 'implied',
    pres: 'implies',
  },
  is: {
    act: '',
    g: 'being',
    pst: 'was',
    pres: '_',
  },
  keep: {
    prt: 'kept',
  },
  kneel: {
    prt: 'knelt',
  },
  know: {
    prt: '_n',
  },
  lay: {
    prt: 'laid',
    pst: 'laid',
  },
  lead: {
    prt: 'led',
    pst: 'led',
  },
  leap: {
    prt: '_t',
  },
  leave: {
    prt: 'left',
    pst: 'left',
  },
  lend: {
    prt: 'lent',
  },
  lie: {
    g: 'lying',
    pst: 'lay',
  },
  light: {
    prt: 'lit',
    pst: 'lit',
  },
  log: {
    g: '_ging',
    pst: '_ged',
  },
  loose: {
    prt: 'lost',
  },
  lose: {
    g: 'losing',
    pst: 'lost',
  },
  make: {
    prt: 'made',
    pst: 'made',
  },
  mean: {
    prt: '_t',
    pst: '_t',
  },
  meet: {
    act: '_er',
    g: '_ing',
    prt: 'met',
    pst: 'met',
  },
  miss: {
    pres: '_',
  },
  pay: {
    prt: 'paid',
    pst: 'paid',
  },
  prove: {
    prt: '_n',
  },
  puke: {
    g: 'puking',
  },
  put: {
    prt: '_',
  },
  quit: {
    prt: '_',
  },
  read: {
    prt: '_',
    pst: '_',
  },
  ride: {
    prt: 'ridden',
  },
  ring: {
    prt: 'rung',
    pst: 'rang',
  },
  rise: {
    fut: 'will have _n',
    g: 'rising',
    prt: '_n',
    pst: 'rose',
    pluperf: 'had _n',
  },
  rub: {
    g: '_bing',
    pst: '_bed',
  },
  run: {
    g: '_ning',
    prt: '_',
    pst: 'ran',
  },
  say: {
    prt: 'said',
    pst: 'said',
    pres: '_s',
  },
  seat: {
    prt: 'sat',
  },
  see: {
    g: '_ing',
    prt: '_n',
    pst: 'saw',
  },
  seek: {
    prt: 'sought',
  },
  sell: {
    prt: 'sold',
    pst: 'sold',
  },
  send: {
    prt: 'sent',
  },
  set: {
    prt: '_',
  },
  sew: {
    prt: '_n',
  },
  shake: {
    prt: '_n',
  },
  shave: {
    prt: '_d',
  },
  shed: {
    g: '_ding',
    pst: '_',
    pres: '_s',
  },
  shine: {
    prt: 'shone',
    pst: 'shone',
  },
  shoot: {
    prt: 'shot',
    pst: 'shot',
  },
  show: {
    pst: '_ed',
  },
  shut: {
    prt: '_',
  },
  sing: {
    prt: 'sung',
    pst: 'sang',
  },
  sink: {
    pst: 'sank',
    pluperf: 'had sunk',
  },
  sit: {
    pst: 'sat',
  },
  ski: {
    pst: '_ied',
  },
  slay: {
    prt: 'slain',
  },
  sleep: {
    prt: 'slept',
  },
  slide: {
    prt: 'slid',
    pst: 'slid',
  },
  smash: {
    pres: '_es',
  },
  sneak: {
    prt: 'snuck',
  },
  speak: {
    fut: 'will have spoken',
    prt: 'spoken',
    pst: 'spoke',
    perf: 'have spoken',
    pluperf: 'had spoken',
  },
  speed: {
    prt: 'sped',
  },
  spend: {
    prt: 'spent',
  },
  spill: {
    prt: '_ed',
    pst: 'spilt',
  },
  spin: {
    g: '_ning',
    prt: 'spun',
    pst: 'spun',
  },
  spit: {
    prt: 'spat',
  },
  split: {
    prt: '_',
  },
  spread: {
    pst: '_',
  },
  spring: {
    prt: 'sprung',
  },
  stand: {
    pst: 'stood',
  },
  steal: {
    act: '_er',
    pst: 'stole',
  },
  stick: {
    pst: 'stuck',
  },
  sting: {
    pst: 'stung',
  },
  stink: {
    prt: 'stunk',
    pst: 'stunk',
  },
  stream: {
    act: '_er',
  },
  strew: {
    prt: '_n',
  },
  strike: {
    g: 'striking',
    pst: 'struck',
  },
  suit: {
    act: '_er',
    g: '_ing',
    pst: '_ed',
  },
  sware: {
    prt: 'sworn',
  },
  swear: {
    pst: 'swore',
  },
  sweep: {
    prt: 'swept',
  },
  swim: {
    g: '_ming',
    pst: 'swam',
  },
  swing: {
    pst: 'swung',
  },
  take: {
    fut: 'will have _n',
    pst: 'took',
    perf: 'have _n',
    pluperf: 'had _n',
  },
  teach: {
    pst: 'taught',
    pres: '_es',
  },
  tear: {
    pst: 'tore',
  },
  tell: {
    pst: 'told',
  },
  think: {
    pst: 'thought',
  },
  thrive: {
    prt: '_d',
  },
  tie: {
    g: 'tying',
    pst: '_d',
  },
  undergo: {
    prt: '_ne',
  },
  understand: {
    pst: 'understood',
  },
  upset: {
    prt: '_',
  },
  wait: {
    act: '_er',
    g: '_ing',
    pst: '_ed',
  },
  wake: {
    pst: 'woke',
  },
  wear: {
    pst: 'wore',
  },
  weave: {
    prt: 'woven',
  },
  weep: {
    prt: 'wept',
  },
  win: {
    g: '_ning',
    pst: 'won',
  },
  wind: {
    prt: 'wound',
  },
  withdraw: {
    pst: 'withdrew',
  },
  wring: {
    prt: 'wrung',
  },
  write: {
    g: 'writing',
    prt: 'written',
    pst: 'wrote',
  },
};

//uncompress our ad-hoc compression scheme
let keys = Object.keys(conjugations);
for (let i = 0; i < keys.length; i++) {
  const inf = keys[i];
  let final = {};
  Object.keys(conjugations[inf]).forEach(key => {
    let str = conjugations[inf][key];
    //swap-in infinitives for '_'
    str = str.replace('_', inf);

    let full = mapping[key];
    final[full] = str;
  });
  //over-write original
  conjugations[inf] = final;
}

var conjugations_1 = conjugations;

const endsWith = {
  b: [
    {
      reg: /([^aeiou][aeiou])b$/i,
      repl: {
        pr: '$1bs',
        pa: '$1bbed',
        gr: '$1bbing',
      },
    },
  ],
  d: [
    {
      reg: /(end)$/i,
      repl: {
        pr: '$1s',
        pa: 'ent',
        gr: '$1ing',
        ar: '$1er',
      },
    },
    {
      reg: /(eed)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing',
        ar: '$1er',
      },
    },
    {
      reg: /(ed)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ded',
        ar: '$1der',
        gr: '$1ding',
      },
    },
    {
      reg: /([^aeiou][ou])d$/i,
      repl: {
        pr: '$1ds',
        pa: '$1dded',
        gr: '$1dding',
      },
    },
  ],
  e: [
    {
      reg: /(eave)$/i,
      repl: {
        pr: '$1s',
        pa: '$1d',
        gr: 'eaving',
        ar: '$1r',
      },
    },
    {
      reg: /(ide)$/i,
      repl: {
        pr: '$1s',
        pa: 'ode',
        gr: 'iding',
        ar: 'ider',
      },
    },
    {
      reg: /(ake)$/i,
      repl: {
        pr: '$1s',
        pa: 'ook',
        gr: 'aking',
        ar: '$1r',
      },
    },
    {
      reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing',
        prt: '$1en',
      },
    },
    {
      reg: /([bd]l)e$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
    {
      reg: /(om)e$/i,
      repl: {
        pr: '$1es',
        pa: 'ame',
        gr: '$1ing',
      },
    },
  ],

  g: [
    {
      reg: /([^aeiou][ou])g$/i,
      repl: {
        pr: '$1gs',
        pa: '$1gged',
        gr: '$1gging',
      },
    },
  ],
  h: [
    {
      reg: /(..)([cs]h)$/i,
      repl: {
        pr: '$1$2es',
        pa: '$1$2ed',
        gr: '$1$2ing',
      },
    },
  ],
  k: [
    {
      reg: /(ink)$/i,
      repl: {
        pr: '$1s',
        pa: 'unk',
        gr: '$1ing',
        ar: '$1er',
      },
    },
  ],

  m: [
    {
      reg: /([^aeiou][aeiou])m$/i,
      repl: {
        pr: '$1ms',
        pa: '$1mmed',
        gr: '$1mming',
      },
    },
  ],

  n: [
    {
      reg: /(en)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
  ],
  p: [
    {
      reg: /(e)(ep)$/i,
      repl: {
        pr: '$1$2s',
        pa: '$1pt',
        gr: '$1$2ing',
        ar: '$1$2er',
      },
    },
    {
      reg: /([^aeiou][aeiou])p$/i,
      repl: {
        pr: '$1ps',
        pa: '$1pped',
        gr: '$1pping',
      },
    },
    {
      reg: /([aeiu])p$/i,
      repl: {
        pr: '$1ps',
        pa: '$1p',
        gr: '$1pping',
      },
    },
  ],

  r: [
    {
      reg: /([td]er)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
    {
      reg: /(er)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
  ],
  s: [
    {
      reg: /(ish|tch|ess)$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
  ],

  t: [
    {
      reg: /(ion|end|e[nc]t)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
    {
      reg: /(.eat)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
    {
      reg: /([aeiu])t$/i,
      repl: {
        pr: '$1ts',
        pa: '$1t',
        gr: '$1tting',
      },
    },
    {
      reg: /([^aeiou][aeiou])t$/i,
      repl: {
        pr: '$1ts',
        pa: '$1tted',
        gr: '$1tting',
      },
    },
  ],

  w: [
    {
      reg: /(..)(ow)$/i,
      repl: {
        pr: '$1$2s',
        pa: '$1ew',
        gr: '$1$2ing',
        prt: '$1$2n',
      },
    },
  ],
  y: [
    {
      reg: /([i|f|rr])y$/i,
      repl: {
        pr: '$1ies',
        pa: '$1ied',
        gr: '$1ying',
      },
    },
  ],

  z: [
    {
      reg: /([aeiou]zz)$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing',
      },
    },
  ],
};

var suffixes = endsWith;

const posMap = {
  pr: 'PresentTense',
  pa: 'PastTense',
  gr: 'Gerund',
  prt: 'Participle',
  ar: 'Actor',
};

const doTransform = function(str, obj) {
  let found = {};
  let keys = Object.keys(obj.repl);
  for (let i = 0; i < keys.length; i += 1) {
    let pos = keys[i];
    found[posMap[pos]] = str.replace(obj.reg, obj.repl[pos]);
  }
  return found
};

//look at the end of the word for clues
const checkSuffix = function(str = '') {
  let c = str[str.length - 1];
  if (suffixes.hasOwnProperty(c) === true) {
    for (let r = 0; r < suffixes[c].length; r += 1) {
      const reg = suffixes[c][r].reg;
      if (reg.test(str) === true) {
        return doTransform(str, suffixes[c][r])
      }
    }
  }
  return {}
};
var _01Suffixes = checkSuffix;

//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const hasY = /[bcdfghjklmnpqrstvwxz]y$/;

const generic = {
  Gerund: inf => {
    if (inf.charAt(inf.length - 1) === 'e') {
      return inf.replace(/e$/, 'ing')
    }
    return inf + 'ing'
  },

  PresentTense: inf => {
    if (inf.charAt(inf.length - 1) === 's') {
      return inf + 'es'
    }
    if (hasY.test(inf) === true) {
      return inf.slice(0, -1) + 'ies'
    }
    return inf + 's'
  },

  PastTense: inf => {
    if (inf.charAt(inf.length - 1) === 'e') {
      return inf + 'd'
    }
    if (inf.substr(-2) === 'ed') {
      return inf
    }
    if (hasY.test(inf) === true) {
      return inf.slice(0, -1) + 'ied'
    }
    return inf + 'ed'
  },
};

var _02Generic = generic;

//we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive
const fastConjugate = function(str = '', world) {
  let found = {};
  // 1. look at irregulars
  //the lexicon doesn't pass this in
  if (world && world.irregulars) {
    if (world.irregulars.verbs.hasOwnProperty(str) === true) {
      found = Object.assign({}, world.irregulars.verbs[str]);
    }
  }
  //2. rule-based regex
  found = Object.assign({}, found, _01Suffixes(str));

  //3. generic transformations
  //'buzzing'
  if (found.Gerund === undefined) {
    found.Gerund = _02Generic.Gerund(str);
  }
  //'buzzed'
  if (found.PastTense === undefined) {
    found.PastTense = _02Generic.PastTense(str);
  }
  //'buzzes'
  if (found.PresentTense === undefined) {
    found.PresentTense = _02Generic.PresentTense(str);
  }
  return found
};
var verbs$1 = fastConjugate;

//convert 'cute' to 'cuteness'
const irregulars = {
  clean: 'cleanliness',
  naivety: 'naivety',
  hurt: 'hurt',
};

const transforms = [
  {
    reg: /y$/,
    repl: 'iness',
  },
  {
    reg: /le$/,
    repl: 'ility',
  },
  {
    reg: /ial$/,
    repl: 'y',
  },
  {
    reg: /al$/,
    repl: 'ality',
  },
  {
    reg: /ting$/,
    repl: 'ting',
  },
  {
    reg: /ring$/,
    repl: 'ring',
  },
  {
    reg: /bing$/,
    repl: 'bingness',
  },
  {
    reg: /sing$/,
    repl: 'se',
  },
  {
    reg: /ing$/,
    repl: 'ment',
  },
  {
    reg: /ess$/,
    repl: 'essness',
  },
  {
    reg: /ous$/,
    repl: 'ousness',
  },
];

const to_noun = function(w) {
  if (irregulars.hasOwnProperty(w)) {
    return irregulars[w]
  }
  const lastChar = w.charAt(w.length - 1);
  if (lastChar === 'w' || lastChar === 's') {
    return null
  }
  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(w) === true) {
      return w.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  return w + 'ness'
};

var toNoun = to_noun;

//turn 'quick' into 'quickest'
const do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
const dont_rules = [/ary$/];

const irregulars$1 = {
  nice: 'nicest',
  late: 'latest',
  hard: 'hardest',
  inner: 'innermost',
  outer: 'outermost',
  far: 'furthest',
  worse: 'worst',
  bad: 'worst',
  good: 'best',
  big: 'biggest',
  large: 'largest',
};

const transforms$1 = [
  {
    reg: /y$/i,
    repl: 'iest',
  },
  {
    reg: /([aeiou])t$/i,
    repl: '$1ttest',
  },
  {
    reg: /([aeou])de$/i,
    repl: '$1dest',
  },
  {
    reg: /nge$/i,
    repl: 'ngest',
  },
  {
    reg: /([aeiou])te$/i,
    repl: '$1test',
  },
];

const to_superlative = function(str) {
  //irregulars
  if (irregulars$1.hasOwnProperty(str)) {
    return irregulars$1[str]
  }
  //known transforms
  for (let i = 0; i < transforms$1.length; i++) {
    if (transforms$1[i].reg.test(str)) {
      return str.replace(transforms$1[i].reg, transforms$1[i].repl)
    }
  }
  //dont-rules
  for (let i = 0; i < dont_rules.length; i++) {
    if (dont_rules[i].test(str) === true) {
      return null
    }
  }
  //do-rules
  for (let i = 0; i < do_rules.length; i++) {
    if (do_rules[i].test(str) === true) {
      if (str.charAt(str.length - 1) === 'e') {
        return str + 'st'
      }
      return str + 'est'
    }
  }
  return str + 'est'
};

var toSuperlative = to_superlative;

//turn 'quick' into 'quickly'
const do_rules$1 = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];
const dont_rules$1 = [/ary$/, /ous$/];

const irregulars$2 = {
  grey: 'greyer',
  gray: 'grayer',
  green: 'greener',
  yellow: 'yellower',
  red: 'redder',
  good: 'better',
  well: 'better',
  bad: 'worse',
  sad: 'sadder',
  big: 'bigger',
};

const transforms$2 = [
  {
    reg: /y$/i,
    repl: 'ier',
  },
  {
    reg: /([aeiou])t$/i,
    repl: '$1tter',
  },
  {
    reg: /([aeou])de$/i,
    repl: '$1der',
  },
  {
    reg: /nge$/i,
    repl: 'nger',
  },
];

const to_comparative = function(str) {
  //known-irregulars
  if (irregulars$2.hasOwnProperty(str)) {
    return irregulars$2[str]
  }
  //known-transforms
  for (let i = 0; i < transforms$2.length; i++) {
    if (transforms$2[i].reg.test(str) === true) {
      return str.replace(transforms$2[i].reg, transforms$2[i].repl)
    }
  }
  //dont-patterns
  for (let i = 0; i < dont_rules$1.length; i++) {
    if (dont_rules$1[i].test(str) === true) {
      return null
    }
  }
  //do-patterns
  for (let i = 0; i < do_rules$1.length; i++) {
    if (do_rules$1[i].test(str) === true) {
      return str + 'er'
    }
  }
  //easy-one
  if (/e$/.test(str) === true) {
    return str + 'r'
  }
  return str + 'er'
};

var toComparative = to_comparative;

//turn 'quick' into 'quickly'
const not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/, /y$/];

const irregulars$3 = {
  bad: 'badly',
  good: 'well',
  icy: 'icily',
  idle: 'idly',
  male: 'manly',
  public: 'publicly',
  simple: 'simply',
  single: 'singly',
  special: 'especially',
  straight: 'straight',
  vague: 'vaguely',
  whole: 'wholly',
};
const dontChange = ['best', 'early', 'hard', 'fast', 'wrong', 'well', 'late', 'latter', 'little', 'long', 'low'].reduce(
  (h, c) => {
    h[c] = true;
    return h
  },
  {}
);

const transforms$3 = [
  {
    reg: /al$/i,
    repl: 'ally',
  },
  {
    reg: /ly$/i,
    repl: 'ly',
  },
  {
    reg: /(.{3})y$/i,
    repl: '$1ily',
  },
  {
    reg: /que$/i,
    repl: 'quely',
  },
  {
    reg: /ue$/i,
    repl: 'uly',
  },
  {
    reg: /ic$/i,
    repl: 'ically',
  },
  {
    reg: /ble$/i,
    repl: 'bly',
  },
  {
    reg: /l$/i,
    repl: 'ly',
  },
];

const adj_to_adv = function(str) {
  if (irregulars$3.hasOwnProperty(str) === true) {
    return irregulars$3[str]
  }
  if (dontChange.hasOwnProperty(str) === true) {
    return str
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (not_matches[i].test(str) === true) {
      return null
    }
  }
  for (let i = 0; i < transforms$3.length; i++) {
    if (transforms$3[i].reg.test(str) === true) {
      return str.replace(transforms$3[i].reg, transforms$3[i].repl)
    }
  }
  return str + 'ly'
};

var toAdverb = adj_to_adv;

//turn an adjective like 'soft' into a verb like 'soften'
//(don't do words like 'green' -> 'greenen')

//these are suffices that are usually too weird
let dontDo = ['c', 'e', 'g', 'l', 'n', 'r', 'w', 'y'].reduce((h, c) => {
  h[c] = true;
  return h
}, {});

const dontDoTwo = { ed: true, nt: true };

const blacklist = {
  random: true,
  wild: true,
};

const irregulars$4 = {
  bored: 'bore',
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten',
  small: 'shrink',
  full: 'fill',
  tired: 'tire',
};

const toVerb = str => {
  if (irregulars$4.hasOwnProperty(str) === true) {
    return irregulars$4[str]
  }
  //don't bother with these:
  if (str.length <= 3) {
    return null
  }
  if (blacklist.hasOwnProperty(str) === true) {
    return null
  }
  //suffixes to avoid
  if (dontDo.hasOwnProperty(str[str.length - 1])) {
    return null
  }
  let suffix = str.substr(str.length - 2);
  if (dontDoTwo.hasOwnProperty(suffix) === true) {
    return null
  }

  if (/e$/.test(str) === true) {
    return str + 'n'
  }
  return str + 'en'
};
var toVerb_1 = toVerb;

const fns$1 = {
  toNoun: toNoun,
  toSuperlative: toSuperlative,
  toComparative: toComparative,
  toAdverb: toAdverb,
  toVerb: toVerb_1,
};

/** conjugate an adjective into other forms */
const conjugate = function(w) {
  let res = {};
  // 'greatness'
  let noun = fns$1.toNoun(w);
  if (noun) {
    res.Noun = noun;
  }
  // 'greatest'
  let sup = fns$1.toSuperlative(w);
  if (sup) {
    res.Superlative = sup;
  }
  // 'greater'
  let comp = fns$1.toComparative(w);
  if (comp) {
    res.Comparative = comp;
  }
  // 'greatly'
  let adv = fns$1.toAdverb(w);
  if (adv) {
    res.Adverb = adv;
  }
  // 'greaten' :/
  let vb = fns$1.toVerb(w);
  if (vb) {
    res.Verb = vb;
  }
  // res.Adjective = w
  return res
};
var adjectives = conjugate;

/** patterns for turning 'bus' to 'buses'*/
const suffixes$1 = {
  a: [[/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/([ti])a$/i, '$1a']],

  e: [
    [/(kn|l|w)ife$/i, '$1ives'],
    [/(hive)$/i, '$1s'],
    [/([m|l])ouse$/i, '$1ice'],
    [/([m|l])ice$/i, '$1ice'],
  ],

  f: [
    [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'],
    [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'],
  ],

  i: [[/(octop|vir)i$/i, '$1i']],

  m: [[/([ti])um$/i, '$1a']],

  n: [[/^(oxen)$/i, '$1']],

  o: [[/(al|ad|at|er|et|ed|ad)o$/i, '$1oes']],

  s: [
    [/(ax|test)is$/i, '$1es'],
    [/(alias|status)$/i, '$1es'],
    [/sis$/i, 'ses'],
    [/(bu)s$/i, '$1ses'],
    [/(sis)$/i, 'ses'],
    [/^(?!talis|.*hu)(.*)man$/i, '$1men'],
    [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
  ],

  x: [[/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/^(ox)$/i, '$1en']],

  y: [[/([^aeiouy]|qu)y$/i, '$1ies']],

  z: [[/(quiz)$/i, '$1zes']],
};

var _01Suffixes$1 = suffixes$1;

const addE = /(x|ch|sh|s|z)$/;

const trySuffix = function(str) {
  let c = str[str.length - 1];
  if (_01Suffixes$1.hasOwnProperty(c) === true) {
    for (let i = 0; i < _01Suffixes$1[c].length; i += 1) {
      let reg = _01Suffixes$1[c][i][0];
      if (reg.test(str) === true) {
        return str.replace(reg, _01Suffixes$1[c][i][1])
      }
    }
  }
  return null
};

/** Turn a singular noun into a plural
 * assume the given string is singular
 */
const pluralize = function(str = '') {
  //we have some rules to try-out
  let plural = trySuffix(str);
  if (plural !== null) {
    return plural
  }
  //like 'church'
  if (addE.test(str)) {
    return str + 'es'
  }
  // ¯\_(ツ)_/¯
  return str + 's'
};
var nouns$1 = pluralize;

//these let users change inflection / verb conjugation
const irregulars$5 = {
  nouns: plurals,
  verbs: conjugations_1,
};

//these behaviours are configurable & shared across some plugins
const transforms$4 = {
  verbs: verbs$1,
  adjectives: adjectives,
  nouns: nouns$1,
};

let isVerbose = false;

/** all configurable linguistic data */
class World {
  constructor() {
    // quiet these properties from a console.log
    Object.defineProperty(this, 'lexicon', {
      enumerable: false,
      value: misc$1,
      writable: true,
    });
    Object.defineProperty(this, 'hasCompound', {
      enumerable: false,
      value: {},
      writable: true,
    });
    Object.defineProperty(this, 'irregulars', {
      enumerable: false,
      value: irregulars$5,
      writable: true,
    });
    Object.defineProperty(this, 'tags', {
      enumerable: false,
      value: Object.assign({}, tags),
      writable: true,
    });
    Object.defineProperty(this, 'transforms', {
      enumerable: false,
      value: transforms$4,
    });
    // add our compressed data to lexicon
    this.unpackWords(_data);
    // add our irregulars to lexicon
    this.addIrregulars();

    // cache our abbreviations for our sentence-parser
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      value: {
        abbreviations: this.getByTag('Abbreviation'),
      },
    });
  }

  /** more logs for debugging */
  verbose(bool) {
    isVerbose = bool;
    return this
  }
  isVerbose() {
    return isVerbose
  }

  /** get all terms in our lexicon with this tag */
  getByTag(tag) {
    let lex = this.lexicon;
    let res = {};
    let words = Object.keys(lex);
    for (let i = 0; i < words.length; i++) {
      if (typeof lex[words[i]] === 'string') {
        if (lex[words[i]] === tag) {
          res[words[i]] = true;
        }
      } else if (lex[words[i]].some(t => t === tag)) {
        res[words[i]] = true;
      }
    }
    return res
  }

  /** augment our lingustic data with new data */
  unpackWords(lex) {
    let tags = Object.keys(lex);
    for (let i = 0; i < tags.length; i++) {
      let words = Object.keys(efrtUnpack_min(lex[tags[i]]));
      for (let w = 0; w < words.length; w++) {
        addWords.addWord(words[w], tags[i], this.lexicon);
        // do some fancier stuff
        addWords.addMore(words[w], tags[i], this);
      }
    }
  }
  /** put new words into our lexicon, properly */
  addWords(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let word = keys[i].toLowerCase();
      addWords.addWord(word, obj[keys[i]], this.lexicon);
      // do some fancier stuff
      addWords.addMore(word, obj[keys[i]], this);
    }
  }

  addIrregulars() {
    addIrregulars_1(this);
    return this
  }

  /** helper method for logging + debugging */
  stats() {
    return {
      words: Object.keys(this.lexicon).length,
      plurals: Object.keys(this.irregular.plurals).length,
      conjugations: Object.keys(this.irregular.conjugations).length,
      compounds: Object.keys(this.hasCompound).length,
    }
  }
}

//  ¯\_(:/)_/¯
const clone$1 = function(obj) {
  return JSON.parse(JSON.stringify(obj))
};

/** produce a deep-copy of all lingustic data */
World.prototype.clone = function() {
  let w2 = new World();
  //who really knows about this one:
  w2.lexicon = clone$1(this.lexicon);
  w2.plurals = clone$1(this.plurals);
  w2.conjugations = clone$1(this.conjugations);
  w2.tags = clone$1(this.tags);
  return w2
};
var World_1 = World;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _01Utils$1 = createCommonjsModule(function (module, exports) {
// const cache = require('./_setCache')

/** return the root, first document */
exports.all = function() {
  return this.parents()[0] || this
};

/** return the previous result */
exports.parent = function() {
  if (this.from) {
    return this.from
  }
  return this
};

/**  return a list of all previous results */
exports.parents = function() {
  let arr = [];
  const addParent = function(doc) {
    if (doc.from) {
      arr.push(doc.from);
      addParent(doc.from);
    }
  };
  addParent(this);
  return arr.reverse()
};

/** deep-copy the document, so that no references remain */
exports.clone = function() {
  let list = this.list.map(ts => ts.clone());
  let tmp = this.buildFrom(list);
  return tmp
};

/** how many seperate terms does the document have? */
exports.wordCount = function() {
  return this.list.reduce((count, p) => {
    count += p.wordCount;
    return count
  }, 0)
};
exports.wordcount = exports.wordCount;

/** turn on logging for decision-debugging */
exports.verbose = function(bool) {
  if (bool === undefined) {
    bool = true;
  }
  this.world.verbose = bool;
};

/** freeze the current state of the document, for speed-purposes*/
// exports.cache = function(options) {
//   return cache(this, options)
// }
// exports.blow = function() {
//   if (this.found && this.list.length > 0) {
//     console.log('\n\n======!!====\n\n')
//     process.exit()
//   }
//   return this
// }
});
var _01Utils_1 = _01Utils$1.all;
var _01Utils_2 = _01Utils$1.parent;
var _01Utils_3 = _01Utils$1.parents;
var _01Utils_4 = _01Utils$1.clone;
var _01Utils_5 = _01Utils$1.wordCount;
var _01Utils_6 = _01Utils$1.wordcount;
var _01Utils_7 = _01Utils$1.verbose;

var _02Accessors = createCommonjsModule(function (module, exports) {
/** use only the first result(s) */
exports.first = function(n) {
  if (n === undefined) {
    return this.get(n)
  }
  return this.slice(0, n)
};

/** use only the last result(s) */
exports.last = function(n) {
  if (n === undefined) {
    return this.get(this.list.length - 1)
  }
  let end = this.list.length;
  return this.slice(end - n, end)
};

/** grab a subset of the results*/
exports.slice = function(start, end) {
  let list = this.list.slice(start, end);
  return this.buildFrom(list)
};

/* grab nth result */
exports.eq = function(n) {
  let p = this.list[n];
  if (p === undefined) {
    return this.buildFrom([])
  }
  return this.buildFrom([p])
};
exports.get = exports.eq;

/** grab term[0] for every match */
exports.firstTerm = function() {
  return this.match('^.')
};
/** grab the last term for every match  */
exports.lastTerm = function() {
  return this.match('.$')
};

/** return a flat array of term objects */
exports.termList = function(num) {
  let arr = [];
  //'reduce' but faster
  for (let i = 0; i < this.list.length; i++) {
    let terms = this.list[i].terms();
    for (let o = 0; o < terms.length; o++) {
      arr.push(terms[o]);
      //support .termList(4)
      if (num !== undefined && arr[num] !== undefined) {
        return arr[num]
      }
    }
  }
  return arr
};
});
var _02Accessors_1 = _02Accessors.first;
var _02Accessors_2 = _02Accessors.last;
var _02Accessors_3 = _02Accessors.slice;
var _02Accessors_4 = _02Accessors.eq;
var _02Accessors_5 = _02Accessors.get;
var _02Accessors_6 = _02Accessors.firstTerm;
var _02Accessors_7 = _02Accessors.lastTerm;
var _02Accessors_8 = _02Accessors.termList;

// const checkCache = require('./match/checkCache')

/** return a new Doc, with this one as a parent */
var match$1 = function(reg) {
  //parse-up the input expression
  let regs = syntax_1(reg);
  if (regs.length === 0) {
    return this.buildFrom([])
  }
  // if (!checkCache(this, regs)) {
  //   console.log('skipped')
  //   return this.buildFrom([])
  // }
  //try expression on each phrase
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.match(regs))
  }, []);
  return this.buildFrom(matches)
};

/** return all results except for this */
var not$2 = function(reg) {
  //parse-up the input expression
  let regs = syntax_1(reg);
  //if it's empty, return them all!
  if (regs.length === 0) {
    return this
  }
  //try expression on each phrase
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.not(regs))
  }, []);
  return this.buildFrom(matches)
};

/** return only the first match */
var matchOne = function(reg) {
  let regs = syntax_1(reg);
  for (let i = 0; i < this.list.length; i++) {
    let match = this.list[i].match(regs);
    return this.buildFrom(match)
  }
  return this.buildFrom([])
};

/** return each current phrase, only if it contains this match */
var if_1 = function(reg) {
  let regs = syntax_1(reg);
  let found = this.list.filter(p => p.match(regs).length > 0);
  return this.buildFrom(found)
};

/** Filter-out any current phrases that have this match*/
var ifNo = function(reg) {
  let regs = syntax_1(reg);
  let found = this.list.filter(p => p.match(regs).length === 0);
  return this.buildFrom(found)
};

/**Return a boolean if this match exists */
var has$1 = function(reg) {
  let regs = syntax_1(reg);
  return this.list.some(p => p.has(regs) === true)
};

/** return all terms before a match, in each phrase */
var before = function(reg) {
  let regs = syntax_1(reg);
  //only the phrases we care about
  let phrases = this.if(regs).list;
  let befores = phrases.map(p => {
    let ids = p.terms().map(t => t.id);
    //run the search again
    let m = p.match(regs)[0];
    let index = ids.indexOf(m.start);
    //nothing is before a first-term match
    if (index === 0 || index === -1) {
      return null
    }
    return p.buildFrom(p.start, index)
  });
  befores = befores.filter(p => p !== null);
  return this.buildFrom(befores)
};

/** return all terms after a match, in each phrase */
var after = function(reg) {
  let regs = syntax_1(reg);
  //only the phrases we care about
  let phrases = this.if(regs).list;
  let befores = phrases.map(p => {
    let terms = p.terms();
    let ids = terms.map(t => t.id);
    //run the search again
    let m = p.match(regs)[0];
    let index = ids.indexOf(m.start);
    //skip if nothing is after it
    if (index === -1 || !terms[index + m.length]) {
      return null
    }
    //create the new phrase, after our match.
    let id = terms[index + m.length].id;
    let len = p.length - index - m.length;
    return p.buildFrom(id, len)
  });
  befores = befores.filter(p => p !== null);
  return this.buildFrom(befores)
};

var _03Match = {
	match: match$1,
	not: not$2,
	matchOne: matchOne,
	if: if_1,
	ifNo: ifNo,
	has: has$1,
	before: before,
	after: after
};

const eachTerm = function(doc, fn) {
  let world = doc.world;
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn](world));
  });
  return doc
};

/** turn every letter of every term to lower-cse */
var toLowerCase$1 = function() {
  return eachTerm(this, 'toLowerCase')
};

/** turn every letter of every term to upper case */
var toUpperCase$1 = function() {
  return eachTerm(this, 'toUpperCase')
};

/** upper-case the first letter of each term */
var toTitleCase$1 = function() {
  return eachTerm(this, 'toTitleCase')
};
/** remove whitespace and title-case each term */
var toCamelCase = function() {
  this.toTitleCase();
  this.list.forEach(p => {
    //remove whitespace
    let terms = p.terms();
    terms.forEach((t, i) => {
      if (i !== terms.length - 1) {
        t.post = '';
      }
    });
  });
  this.tag('#CamelCase', 'toCamelCase');
  return this
};

var _04Case = {
	toLowerCase: toLowerCase$1,
	toUpperCase: toUpperCase$1,
	toTitleCase: toTitleCase$1,
	toCamelCase: toCamelCase
};

/** remove start and end whitespace */
var trim$1 = function() {
  this.list = this.list.map(p => p.trim());
  return this
};

/** connect words with hyphen, and remove whitespace */
var hyphenate = function() {
  this.list.forEach(p => {
    let terms = p.terms();
    //remove whitespace
    terms.forEach((t, i) => {
      if (i !== 0) {
        t.pre = '';
      }
      if (terms[i + 1]) {
        t.post = '-';
      }
    });
  });
  this.tag('#Hyphenated', 'hyphenate');
  return this
};

/** remove hyphens between words, and set whitespace */
var dehyphenate = function() {
  const hasHyphen = /(-|–|—)/;
  this.list.forEach(p => {
    let terms = p.terms();
    //remove whitespace
    terms.forEach(t => {
      if (hasHyphen.test(t.post)) {
        t.post = ' ';
      }
    });
  });
  this.untag('#Hyphenated', 'hyphenate');
  return this
};

var _05Whitespace = {
	trim: trim$1,
	hyphenate: hyphenate,
	dehyphenate: dehyphenate
};

/** apply a tag, or tags to all terms */
const tagTerms = function(tag, doc, safe, reason) {
  let tagList = [];
  if (typeof tag === 'string') {
    tagList = tag.split(' ');
  }

  // console.log(doc.parents().length)
  //do indepenent tags for each term:
  doc.list.forEach(p => {
    let terms = p.terms();
    // tagSafe - apply only to fitting terms
    if (safe === true) {
      terms = terms.filter(t => t.canBe(tag, doc.world));
    }
    // set tags in our cache
    if (terms.length > 0) {
      p.cache = p.cache || {};
      p.cache.tags = p.cache.tags || {};
      p.cache.tags[tag] = true;

      if (p.parent) {
        p.parent.cache = p.parent.cache || { tags: {} };
        p.parent.cache.tags[tag] = true;
      }
    }
    terms.forEach((t, i) => {
      //fancy version:
      if (tagList.length > 1) {
        if (tagList[i] && tagList[i] !== '.') {
          t.tag(tagList[i], reason, doc.world);
        }
      } else {
        //non-fancy version (same tag for all terms)
        t.tag(tag, reason, doc.world);
      }
    });
  });
  return
};
var _setTag = tagTerms;

/** Give all terms the given tag */
var tag$1 = function(tags, why) {
  if (!tags) {
    return this
  }
  _setTag(tags, this, false, why);
  return this
};

/** Only apply tag to terms if it is consistent with current tags */
var tagSafe$1 = function(tags, why) {
  if (!tags) {
    return this
  }
  _setTag(tags, this, true, why);
  return this
};

/** Remove this term from the given terms */
var unTag$1 = function(tags, why) {
  this.list.forEach(p => {
    p.terms().forEach(t => t.unTag(tags, why, this.world));
  });
  return this
};

/** return only the terms that can be this tag*/
var canBe$2 = function(tag) {
  if (!tag) {
    return this
  }
  let world = this.world;
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.canBe(tag, world))
  }, []);
  return this.buildFrom(matches)
};

var _06Tag = {
	tag: tag$1,
	tagSafe: tagSafe$1,
	unTag: unTag$1,
	canBe: canBe$2
};

/* run each phrase through a function, and create a new document */
var map = function(fn) {
  if (!fn) {
    return this
  }
  let list = this.list.map((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent
    let res = fn(doc, i);
    if (res.list && res.list[0]) {
      return res.list[0]
    }
    return res
  });
  return this.buildFrom(list)
};

/** run a function on each phrase */
var forEach = function(fn) {
  if (!fn) {
    return this
  }
  this.list.forEach((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent
    fn(doc, i);
  });
  return this
};

/** return only the phrases that return true */
var filter = function(fn) {
  if (!fn) {
    return this
  }
  let list = this.list.filter((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent
    return fn(doc, i)
  });
  return this.buildFrom(list)
};

/** return a document with only the first phrase that matches */
var find = function(fn) {
  if (!fn) {
    return this
  }
  let list = this.list.find((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent
    return fn(doc, i)
  });
  if (list) {
    return this.buildFrom([list])
  }
  return undefined
};

/** return true or false if there is one matching phrase */
var some = function(fn) {
  if (!fn) {
    return this
  }
  return this.list.some((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent
    return fn(doc, i)
  })
};

/** sample a subset of the results */
var random = function(n) {
  if (!this.found) {
    return this
  }
  let r = Math.floor(Math.random() * this.list.length);
  if (n === undefined) {
    let list = [this.list[r]];
    return this.buildFrom(list)
  }
  //prevent it from going over the end
  if (r + n > this.length) {
    r = this.length - n;
    r = r < 0 ? 0 : r;
  }
  return this.slice(r, r + n)
};

/** combine each phrase into a new data-structure */
// exports.reduce = function(fn, h) {
//   let list = this.list.reduce((_h, ts) => {
//     let doc = this.buildFrom([ts])
//     doc.from = null //it's not a child/parent
//     return fn(_h, doc)
//   }, h)
//   return this.buildFrom(list)
// }

var _07Loops = {
	map: map,
	forEach: forEach,
	filter: filter,
	find: find,
	some: some,
	random: random
};

var _08Replace = createCommonjsModule(function (module, exports) {
/** substitute-in new content */
exports.replaceWith = function(replace) {
  if (!replace) {
    return this.delete()
  }
  this.list.forEach(p => {
    let newPhrases = _01Tokenizer.fromText(replace, this.world, this.pool());
    //tag the new phrases
    let tmpDoc = this.buildFrom(newPhrases);
    tmpDoc.tagger();
    p.replace(newPhrases[0], this); //TODO: support multi-sentence replacements
  });
  return this
};

/** search and replace match with new content */
exports.replace = function(match, replace) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match)
  }
  this.match(match).replaceWith(replace);
  return this
};

/** fully remove these terms from the document */
exports.delete = function(match) {
  let toRemove = this;
  if (match) {
    toRemove = this.match(match);
  }
  toRemove.list.forEach(phrase => phrase.delete(this));
  return this
};
// aliases
exports.remove = exports.delete;
});
var _08Replace_1 = _08Replace.replaceWith;
var _08Replace_2 = _08Replace.replace;
var _08Replace_3 = _08Replace.remove;

var _09Insert = createCommonjsModule(function (module, exports) {
/** add these new terms to the end*/
exports.append = function(str) {
  if (!str) {
    return this
  }
  //add it to end of every phrase
  this.list.forEach(p => {
    //build it
    let phrase = _01Tokenizer.fromText(str, this.world, this.pool())[0]; //assume it's one sentence, for now
    //tag it
    let tmpDoc = this.buildFrom([phrase]);
    tmpDoc.tagger();
    // push it onto the end
    p.append(phrase, this);
  });
  return this
};
exports.insertAfter = exports.append;
exports.insertAt = exports.append;

/** add these new terms to the front*/
exports.prepend = function(str) {
  if (!str) {
    return this
  }
  //add it to start of every phrase
  this.list.forEach(p => {
    //build it
    let phrase = _01Tokenizer.fromText(str, this.world, this.pool())[0]; //assume it's one sentence, for now
    //tag it
    let tmpDoc = this.buildFrom([phrase]);
    tmpDoc.tagger();
    // add it to the start
    p.prepend(phrase, this);
  });
  return this
};
exports.insertBefore = exports.prepend;

/** add these new things to the end*/
exports.concat = function() {
  let list = this.list.slice(0);
  //repeat for any number of params
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    //support a fresh string
    if (typeof arg === 'string') {
      let arr = _01Tokenizer.fromText(arg, this.world);
      //TODO: phrase.tagger()?
      list = list.concat(arr);
    } else if (arg.isA === 'Doc') {
      list = list.concat(arg.list);
    } else if (arg.isA === 'Phrase') {
      list.push(arg);
    }
  }
  return this.buildFrom(list)
};

/** return a Document with three parts for every match
 * seperate everything before the word, as a new phrase
 */
exports.split = function(reg) {
  let regs = syntax_1(reg);
  let matches = [];
  this.list.forEach(p => {
    let allFound = p.match(regs);
    //no match, keep it going
    if (allFound.length === 0) {
      matches.push(p);
    }
    allFound.forEach(found => {
      // do it again, at the end
      let last = matches.pop() || p;
      let results = last.splitOn(found); //splits into three parts
      if (results.before) {
        matches.push(results.before);
      }
      if (results.match) {
        matches.push(results.match);
      }
      if (results.after) {
        matches.push(results.after);
      }
    });
  });
  return this.buildFrom(matches)
};
exports.splitOn = exports.split;

/** return a Document with two parts for every match
 * seperate everything after the word, as a new phrase
 */
exports.splitAfter = function(reg) {
  let regs = syntax_1(reg);
  let matches = [];
  this.list.forEach(p => {
    let allFound = p.match(regs);
    //no match, return whole phrase
    if (allFound.length === 0) {
      matches.push(p);
    }
    allFound.forEach(found => {
      // apply it to the end, recursively
      let last = matches.pop() || p;
      let results = last.splitOn(found); //splits into three parts
      //merge first and second parts
      if (results.before && results.match) {
        results.before.length += results.match.length;
        matches.push(results.before);
      } else if (results.match) {
        matches.push(results.match);
      }
      // add third part, if it exists
      if (results.after) {
        matches.push(results.after);
      }
    });
  });
  return this.buildFrom(matches)
};

/** return a Document with two parts for every match */
exports.splitBefore = function(reg) {
  let regs = syntax_1(reg);
  let matches = [];
  this.list.forEach(p => {
    let allFound = p.match(regs);
    //no match, keep it going
    if (allFound.length === 0) {
      matches.push(p);
    }
    allFound.forEach(found => {
      // do it again, at the end
      let last = matches.pop() || p;
      let results = last.splitOn(found); //splits into three parts
      //support multiple-matches per phrase
      if (results.before) {
        matches.push(results.before);
      }
      //merge 'match' and 'after'
      if (results.match && results.after) {
        results.match.length += results.after.length;
        matches.push(results.match);
      } else if (results.match) {
        matches.push(results.match);
      }
    });
  });
  return this.buildFrom(matches)
};
});
var _09Insert_1 = _09Insert.append;
var _09Insert_2 = _09Insert.insertAfter;
var _09Insert_3 = _09Insert.insertAt;
var _09Insert_4 = _09Insert.prepend;
var _09Insert_5 = _09Insert.insertBefore;
var _09Insert_6 = _09Insert.concat;
var _09Insert_7 = _09Insert.split;
var _09Insert_8 = _09Insert.splitOn;
var _09Insert_9 = _09Insert.splitAfter;
var _09Insert_10 = _09Insert.splitBefore;

const methods$2 = {
  /** alphabetical order */
  alpha: (a, b) => {
    let left = a.text('clean');
    let right = b.text('clean');
    if (left < right) {
      return -1
    }
    if (left > right) {
      return 1
    }
    return 0
  },

  /** the 'chronological', or original document sort order */
  chron: (a, b) => {
    let left = a.text();
    let right = b.text();
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  },

  /** count the # of characters of each match */
  length: (a, b) => {
    let left = a.text().trim().length;
    let right = b.text().trim().length;
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  },

  /** count the # of terms in each match */
  wordCount: (a, b) => {
    let left = a.wordCount();
    let right = b.wordCount();
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  },
};

/** sort by # of duplicates in the document*/
const byFreq = function(doc) {
  let counts = {};
  const options = {
    case: true,
    punctuation: false,
    whitespace: true,
    unicode: true,
  };
  doc.list.forEach(p => {
    let str = p.text(options);
    counts[str] = counts[str] || 0;
    counts[str] += 1;
  });
  console.log(counts);
  // sort by freq
  doc.list.sort((a, b) => {
    let left = counts[a.text(options)];
    let right = counts[b.text(options)];
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  });
  return doc
};

//aliases
methods$2.alphabetical = methods$2.alpha;
methods$2.wordcount = methods$2.wordCount;
methods$2.chronological = methods$2.chron;
methods$2.index = methods$2.chron;

/** re-arrange the order of the matches (in place) */
var sort = function(input) {
  input = input || 'alpha';
  input = methods$2[input] || input;
  //do this one up-front
  if (input === 'freq' || input === 'frequency' || input === 'topk') {
    return byFreq(this)
  }
  // apply sort method on each phrase
  if (typeof input === 'function') {
    this.list = this.list.sort(input);
    return this
  }
  return this
};

var _10Sort = {
	sort: sort
};

//list of inconsistent parts-of-speech
var conflicts$1 = [
  //top-level pos are all inconsistent
  [
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Determiner',
    'Conjunction',
    'Preposition',
    'QuestionWord',
    'Expression',
    'Url',
    'PhoneNumber',
    'Email',
    'Emoji',
  ],
  //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  //acronyms
  ['Acronym', 'Pronoun', 'Actor', 'Unit', 'Address'],
  ['Acronym', 'Plural'],
  //things that can't be plural
  ['Plural', 'Singular'],
  //exlusive-people
  ['MaleName', 'FemaleName'],
  ['FirstName', 'LastName', 'Honorific'],
  //adjectives
  ['Comparative', 'Superlative'],
  //values
  ['Value', 'Verb', 'Adjective'],
  ['Ordinal', 'Cardinal'],
  ['TextValue', 'NumericValue'],
  ['NiceNumber', 'TextValue'],
  ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['PastTense', 'PresentTense', 'FutureTense'],
  ['Pluperfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund', 'FuturePerfect', 'PerfectTense'],
  ['Auxiliary', 'Noun', 'Value'],
  //date
  ['Month', 'WeekDay', 'Year', 'Duration', 'Holiday'],
  ['Particle', 'Conjunction', 'Adverb', 'Preposition', 'Date'],
  ['Date', 'Verb', 'Adjective', 'Person'],
  ['Date', 'Money', 'RomanNumeral', 'Fraction'],
  //a/an -> 1
  ['Value', 'Determiner'],
  ['Url', 'Value', 'HashTag', 'PhoneNumber', 'Emoji'],
  //roman numerals
  ['RomanNumeral', 'Fraction', 'NiceNumber'],
  ['RomanNumeral', 'Money', 'Acronym'],
  //cases
  ['UpperCase', 'TitleCase', 'CamelCase'],
  //phrases
  ['Verb', 'Noun', 'Adjective', 'Value'], //VerbPhrase',
  //QuestionWord
  ['QuestionWord', 'Verb'],
  //acronyms
  ['Acronym', 'Verb'],
];

var nouns$2 = {
  Noun: {},
  // - singular
  Singular: {
    isA: 'Noun',
  },
  //a specific thing that's capitalized
  ProperNoun: {
    isA: 'Noun',
  },

  // -- people
  Person: {
    isA: 'ProperNoun',
    also: 'Singular',
  },
  FirstName: {
    isA: 'Person',
  },
  MaleName: {
    isA: 'FirstName',
  },
  FemaleName: {
    isA: 'FirstName',
  },
  LastName: {
    isA: 'Person',
  },
  Honorific: {
    isA: 'Noun',
  },
  Place: {
    isA: 'Singular',
  },

  // -- places
  Country: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  City: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  Region: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  Address: {
    isA: 'Place',
  },
  Organization: {
    isA: 'Singular',
    also: 'ProperNoun',
  },
  SportsTeam: {
    isA: 'Organization',
  },
  Company: {
    isA: 'Organization',
  },
  School: {
    isA: 'Organization',
  },

  // - plural
  Plural: {
    isA: 'Noun',
  },
  Uncountable: {
    //(not plural or singular)
    isA: 'Noun',
  },
  Pronoun: {
    isA: 'Noun',
  },
  //a word for someone doing something -'plumber'
  Actor: {
    isA: 'Noun',
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    isA: 'Noun',
  },
  //'kilograms'
  Unit: {
    isA: 'Noun',
  },
  //'Canadians'
  Demonym: {
    isA: 'Noun',
    also: 'ProperNoun',
  },
  //`john's`
  Possessive: {
    isA: 'Noun',
  },
};

var verbs$2 = {
  Verb: {
    // isA: 'VerbPhrase',
  },
  PresentTense: {
    isA: 'Verb',
  },
  Infinitive: {
    isA: 'PresentTense',
  },
  Gerund: {
    isA: 'PresentTense',
  },
  PastTense: {
    isA: 'Verb',
  },
  PerfectTense: {
    isA: 'Verb',
  },
  FuturePerfect: {
    isA: 'Verb',
  },
  Pluperfect: {
    isA: 'Verb',
  },
  Copula: {
    isA: 'Verb',
  },
  Modal: {
    isA: 'Verb',
  },
  Participle: {
    isA: 'Verb',
  },
  Particle: {
    isA: 'Verb',
  },
  PhrasalVerb: {
    isA: 'Verb',
  },
};

var values$1 = {
  Value: {},
  Ordinal: {
    isA: 'Value',
  },
  Cardinal: {
    isA: 'Value',
  },
  // Multiple: {
  //   isA: 'Value',
  // },
  RomanNumeral: {
    isA: 'Cardinal',
  },
  Fraction: {
    isA: 'Value',
  },
  TextValue: {
    isA: 'Value',
  },
  NumericValue: {
    isA: 'Value',
  },
  Money: {
    //isA: 'Cardinal'
  },
  Percent: {
    isA: 'Value',
  },
};

var dates$1 = {
  Date: {}, //not a noun, but usually is
  Month: {
    isA: 'Date',
    also: 'Singular',
  },
  WeekDay: {
    isA: 'Date',
    also: 'Noun',
  },
  RelativeDay: {
    isA: 'Date',
  },
  Year: {
    isA: 'Date',
  },
  Duration: {
    isA: 'Date',
    also: 'Noun',
  },
  Time: {
    isA: 'Date',
    also: 'Noun',
  },
  Holiday: {
    isA: 'Date',
    also: 'Noun',
  },
};

var misc$2 = {
  Adjective: {},
  Comparable: {
    isA: 'Adjective',
  },
  Comparative: {
    isA: 'Adjective',
  },
  Superlative: {
    isA: 'Adjective',
  },

  NumberRange: {
    isA: 'Contraction',
  },
  Adverb: {},

  Currency: {},
  //glue
  Determiner: {},
  Conjunction: {},
  Preposition: {},
  QuestionWord: {},
  RelativeProunoun: {
    isA: 'Pronoun',
  },
  Expression: {},
  Abbreviation: {},
  Url: {},
  PhoneNumber: {},
  HashTag: {},
  AtMention: {
    isA: 'Noun',
  },
  Emoji: {},
  Email: {},

  //non-exclusive
  Auxiliary: {},
  Negative: {},
  Contraction: {},

  TitleCase: {},
  Hyphenated: {},
  Acronym: {},

  // Quotes
  Quotation: {},
  //parentheses
  Parentheses: {},
};

//add 'downward' tags (that immediately depend on this one)
const addDownword$1 = function(tags) {
  const keys = Object.keys(tags);
  keys.forEach(k => {
    tags[k].downward = [];
    //look for tags with this as parent
    for (let i = 0; i < keys.length; i++) {
      if (tags[keys[i]].isA && tags[keys[i]].isA === k) {
        tags[k].downward.push(keys[i]);
      }
    }
  });
};
var addDownward$1 = addDownword$1;

//used for pretty-printing on the server-side
const colors$1 = {
  Noun: 'blue',
  // NounPhrase: 'blue',

  Verb: 'green',
  Auxiliary: 'green',
  Negative: 'green',
  // VerbPhrase: 'green',

  Date: 'red',
  Value: 'red',

  Adjective: 'magenta',

  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adverb: 'cyan',
  // Condition: 'cyan',
};

//extend tagset with new tags
const addIn$1 = function(obj, tags) {
  Object.keys(obj).forEach(k => {
    tags[k] = obj[k];
  });
};

//add tags to remove when tagging this one
const addConflicts$1 = function(tags) {
  Object.keys(tags).forEach(k => {
    tags[k].notA = {};
    for (let i = 0; i < conflicts$1.length; i++) {
      let arr = conflicts$1[i];
      if (arr.indexOf(k) !== -1) {
        arr = arr.filter(a => a !== k);
        arr.forEach(e => {
          tags[k].notA[e] = true;
        });
      }
    }
    tags[k].notA = Object.keys(tags[k].notA);
  });
};

const addColors$1 = function(tags) {
  Object.keys(tags).forEach(k => {
    if (colors$1[k]) {
      tags[k].color = colors$1[k];
      return
    }
    if (tags[k].isA && colors$1[tags[k].isA]) {
      tags[k].color = colors$1[tags[k].isA];
      return
    }
    if (tags[k].isA && tags[tags[k].isA].color) {
      tags[k].color = tags[tags[k].isA].color;
    }
  });
};

const build$1 = () => {
  let tags = {};
  addIn$1(nouns$2, tags);
  addIn$1(verbs$2, tags);
  addIn$1(values$1, tags);
  addIn$1(dates$1, tags);
  addIn$1(misc$2, tags);
  //downstream
  addDownward$1(tags);
  //add enemies
  addConflicts$1(tags);
  //for nice-logging
  addColors$1(tags);
  return tags
};
var tags$1 = build$1();

var _debug = createCommonjsModule(function (module) {
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const reset = '\x1b[0m';

const padEnd = function(str, width) {
  str = str.toString();
  while (str.length < width) {
    str += ' ';
  }
  return str
};

//cheaper than requiring chalk
const colors = {
  green: function(str) {
    return '\x1b[32m' + str + reset
  },
  red: function(str) {
    return '\x1b[31m' + str + reset
  },
  blue: function(str) {
    return '\x1b[34m' + str + reset
  },
  magenta: function(str) {
    return '\x1b[35m' + str + reset
  },
  cyan: function(str) {
    return '\x1b[36m' + str + reset
  },
  yellow: function(str) {
    return '\x1b[33m' + str + reset
  },
  black: function(str) {
    return '\x1b[30m' + str + reset
  },
};

const tagString = function(tags) {
  tags = tags.map(tag => {
    if (!tags$1.hasOwnProperty(tag)) {
      return tag
    }
    const c = tags$1[tag].color || 'blue';
    return colors[c](tag)
  });
  return tags.join(', ')
};

//output some helpful stuff to the console
const debug = function(doc) {
  console.log(colors.blue('====='));
  doc.list.forEach(p => {
    console.log(colors.blue('  -----'));
    p.terms().forEach(t => {
      let tags = Object.keys(t.tags);
      let text = t.text || '-';
      if (t.implicit) {
        text = '[' + t.implicit + ']';
      }
      {
        text = colors.yellow(text);
      }
      let word = "'" + text + "'";
      word = padEnd(word, 18);
      let str = colors.blue('  ｜ ') + word + '  - ' + tagString(tags);
      console.log(str);
    });
  });
  console.log('');
  return doc
};
module.exports = debug;
});

/** return the document as text */
var text$1 = function(options = {}) {
  //are we showing every phrase?
  let showFull = false;
  if (this.parents().length === 0) {
    showFull = true;
  }
  return this.list.reduce((str, p, i) => {
    const trimPre = !showFull && i === 0;
    const trimPost = !showFull && i === this.list.length - 1;
    return str + p.text(options, trimPre, trimPost)
  }, '')
};

/** pretty-print the current document and its tags */
var debug_1 = function() {
  _debug(this);
  return this
};

/** some named output formats */
var out = function(method) {
  if (method === 'text') {
    return this.text()
  }
  if (method === 'normal') {
    return this.text('normal')
  }
  if (method === 'json') {
    return this.json()
  }
  if (method === 'array') {
    return this.json({ terms: false }).map(obj => obj.text)
  }
  if (method === 'terms') {
    let list = [];
    this.json({ text: false, terms: { text: true } }).forEach(obj => {
      let terms = obj.terms.map(t => t.text);
      terms = terms.filter(t => t);
      list = list.concat(terms);
    });
    return list
  }
  if (method === 'debug') {
    _debug(this);
    return this
  }
  return this.text()
};

var _11Out = {
	text: text$1,
	debug: debug_1,
	out: out
};

const isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
const quotes = /['‘’“”"′″‴]+/g;

/*
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,

  contractions: false,

  adverbs: false,
  emoji: false,
  parentheses: false,
  quotations: false,
  possessives: false,

  verbs: false,
  nouns: false,
*/

const defaults = {};
/** common ways to clean-up the document, and reduce noise */
var normalize = function(options = {}) {
  options = Object.assign({}, defaults, options);
  let termArr = this.list.map(ts => ts.terms());
  //whitespace
  if (options.whitespace) {
    termArr.forEach((terms, o) => {
      terms.forEach((t, i) => {
        t.pre = t.pre.replace(/\s/g, '');
        t.post = t.post.replace(/\s/g, '');
        //last word? ensure there's a next sentence.
        if (terms.length - 1 === i && !termArr[o + 1]) {
          return
        }
        t.post += ' ';
      });
    });
  }

  let termList = this.termList();
  //punctuation - keep sentence punctation, quotes, parenths
  if (options.punctuation) {
    termList.forEach(t => {
      t.post = t.post.replace(isPunct, '');
      t.pre = t.pre.replace(isPunct, '');
    });
  }
  // é -> e
  if (options.unicode) {
    termList.forEach(t => {
      t.text = unicode_1(t.text);
    });
  }
  // '(word)' -> 'word'
  if (options.parentheses) {
    this.parentheses().unwrap();
  }
  // `isn't` -> 'is not'
  if (options.contraction || options.contractions) {
    this.contractions().expand();
  }
  // `cory hart's -> cory hart'
  if (options.possessive || options.possessives) {
    this.possessives().strip();
  }
  // remove "" punctuation
  if (options.quotations || options.quotes) {
    termList.forEach(t => {
      t.post = t.post.replace(quotes, '');
      t.pre = t.pre.replace(quotes, '');
    });
  }
  return this
};

var _12Normalize = {
	normalize: normalize
};

var _13Json = createCommonjsModule(function (module, exports) {
const jsonDefaults = { text: true, terms: true, trim: true };

// get all character startings in doc
const termOffsets = function(doc) {
  let elapsed = 0;
  let offsets = {};
  doc.termList().forEach(term => {
    offsets[term.id] = {
      start: elapsed + term.pre.length,
      length: term.text.length,
    };
    elapsed += term.pre.length + term.text.length + term.post.length;
  });
  return offsets
};

/** pull out desired metadata from the document */
exports.json = function(options = {}) {
  //support json(3) format
  if (typeof options === 'number') {
    return this.list[options].json(jsonDefaults)
  }

  options = Object.assign({}, jsonDefaults, options);
  let result = this.list.map(p => {
    return p.json(options, this.world)
  });
  // add offset data for each term
  if (options.terms.offset) {
    let offsets = termOffsets(this.all());
    result.forEach(o => {
      o.terms.forEach(t => {
        t.offset = offsets[t.id] || {};
      });
    });
  }
  return result
};

//aliases
exports.data = exports.json;
});
var _13Json_1 = _13Json.json;
var _13Json_2 = _13Json.data;

var methods$3 = Object.assign(
  {},
  _01Utils$1,
  _02Accessors,
  _03Match,
  _04Case,
  _05Whitespace,
  _06Tag,
  _07Loops,
  _08Replace,
  _09Insert,
  _10Sort,
  _11Out,
  _12Normalize,
  _13Json
);

var find$1 = createCommonjsModule(function (module, exports) {
//these are selections that don't require their own subclasses/methods

/** split-up results by each term */
exports.terms = function(n) {
  let r = this.match('.');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r
};
exports.words = exports.terms;

// /** split-up results into multi-term phrases */
exports.clauses = function(n) {
  let r = this.splitAfter('#ClauseEnd'); //TODO:make this
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r
};

/** all terms connected with a hyphen or dash */
exports.hyphenated = function(n) {
  let r = this.match('@hasHyphen .').debug();
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r
};
/** return anything tagged as a phone number */
exports.phoneNumbers = function(n) {
  let r = this.splitAfter('#Comma');
  r = r.match('#PhoneNumber+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r
};
// /** return anything inside parentheses */
// exports.parentheses = function(n) {
//   let r = this.match('#Parentheses+')
//   //split-up consecutive ones
//   r = r.splitAfter('#EndBracket')
//   if (typeof n === 'number') {
//     r = r.get(n)
//   }
//   return r
// }
/** return anything tagged as an organization*/
exports.organizations = function(n) {
  let r = this.splitAfter('#Comma');
  r = r.match('#Organization+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r
};

/** return anything tagged as a Place*/
exports.places = function(n) {
  let r = this.splitAfter('#Comma');
  r = r.match('#Place+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r
};

/** return any sentences that ask a question */
// exports.questions = function(doc) {
//   return doc.sentences().isQuestion()
// }

// /** return any sentences that are not a question or exclamation*/
// exports.statements = function(doc) {
//   return doc.sentences().isStatement()
// }
/** return any sentences that are not a question */
// exports.exclamations = function(doc) {
//   return doc.sentences().isExclamation()
// }
});
var find_1 = find$1.terms;
var find_2 = find$1.words;
var find_3 = find$1.clauses;
var find_4 = find$1.hyphenated;
var find_5 = find$1.phoneNumbers;
var find_6 = find$1.organizations;
var find_7 = find$1.places;

// allow helper methods like .adjectives() and .adverbs()
const arr = [
  ['adjectives', '#Adjective'],
  ['hashTags', '#HashTag'],
  ['emails', '#Email'],
  ['atMentions', '#AtMention'],
  ['emoji', '#Emoji'],
  ['urls', '#Url'],
  ['adverbs', '#Adverb'],
  ['pronouns', '#Pronoun'],
  ['acronyms', '#Acronym'],
  ['fractions', '#Fraction'],
  ['money', '#Money'],
  ['months', '#Month'],
  ['years', '#Year'],
  ['conjunctions', '#Conjunction'],
  ['prepositions', '#Preposition'],
  ['abbreviations', '#Abbreviation'],
  ['romanNumerals', '#RomanNumeral'],
  ['firstNames', '#FirstName'],
  ['lastNames', '#LastName'],
];
let methods$4 = {};
arr.forEach(a => {
  methods$4[a[0]] = function(n) {
    let r = this.match(a[1]);
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r
  };
});
var simple = methods$4;

var selections = Object.assign({}, find$1, simple);

/** match a word-sequence, like 'super bowl' in the lexicon */
const tryMultiple = function(terms, t, world) {
  let lex = world.lexicon;
  //try a two-word version
  let txt = terms[t].clean + ' ' + terms[t + 1].clean;
  if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
    terms[t].tag(lex[txt], 'lexicon-two', world);
    terms[t + 1].tag(lex[txt], 'lexicon-two', world);
    return 1
  }
  //try a three-word version?
  if (t + 2 < terms.length) {
    txt += ' ' + terms[t + 2].clean;
    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-three', world);
      terms[t + 1].tag(lex[txt], 'lexicon-three', world);
      terms[t + 2].tag(lex[txt], 'lexicon-three', world);
      return 2
    }
  }
  //try a four-word version?
  if (t + 3 < terms.length) {
    txt += ' ' + terms[t + 3].clean;
    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-four', world);
      terms[t + 1].tag(lex[txt], 'lexicon-four', world);
      terms[t + 2].tag(lex[txt], 'lexicon-four', world);
      terms[t + 3].tag(lex[txt], 'lexicon-four', world);
      return 3
    }
  }
  return 0
};

/** look at each word in our list of known-words */
const checkLexicon = function(terms, world) {
  let lex = world.lexicon;
  let hasCompound = world.hasCompound;
  //go through each term, and check the lexicon
  for (let t = 0; t < terms.length; t += 1) {
    let str = terms[t].clean;
    //is it the start of a compound word, like 'super bowl'?
    if (hasCompound[str] === true && t + 1 < terms.length) {
      let foundWords = tryMultiple(terms, t, world);
      if (foundWords > 0) {
        t += foundWords; //skip any already-found words
        continue
      }
    }
    //try one-word lexicon
    if (lex[str] !== undefined && lex.hasOwnProperty(str) === true) {
      terms[t].tag(lex[str], 'lexicon', world);
    }
  }
  return terms
};
var _01Lexicon = checkLexicon;

const apostrophes = /[\'‘’‛‵′`´]/;
const oneLetterAcronym$1 = /^[A-Z]('s|,)?$/;

const oneLetterWord = {
  I: true,
  A: true,
};

//
const checkPunctuation = function(terms, i, world) {
  let term = terms[i];

  //check hyphenation
  // if (term.post.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].pre === '') {
  //   term.tag('Hyphenated', 'has-hyphen', world)
  // }

  //an end-tick (trailing apostrophe) - flanders', or Carlos'
  if (apostrophes.test(term.post) && !apostrophes.test(term.pre)) {
    let endChar = term.clean[term.clean.length - 1];
    //flanders'
    if (endChar === 's') {
      term.tag(['Possessive', 'Noun'], 'end-tick', world);
      return
    }
    //chillin'
    if (endChar === 'n') {
      term.tag(['Gerund'], 'chillin', world);
    }
  }
  // NASA
  if (term.isAcronym()) {
    term.tag('Acronym', 'acronym-step', world);
    term.tag('Noun', 'acronym-infer', world);
  } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym$1.test(term.text)) {
    term.tag('Acronym', 'one-letter-acronym', world);
    term.tag('Noun', 'one-letter-infer', world);
  }
};
var _02Punctuation$1 = checkPunctuation;

//these are regexes applied to t.text, instead of t.clean
// order matters.
var regexes = [
  //phone numbers
  [/^[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //589-3809
  [/^[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //632-589-3809

  //money
  [/^[-+]?[$€¥£][0-9]+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5.30
  [/^[-+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5,231.30

  //web tags
  [/^\w+@\w+\.[a-z]{2,3}$/, 'Email'], //not fancy
  [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'],
  [/^@\w{2,}$/, 'AtMention'],
  [/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, 'Url'], //with http/www
  [/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/, 'Url'], //http://mostpopularwebsites.net/top-level-domain

  //dates/times
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, 'Time'], //4:32:32
  [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/, 'Time'], //4pm
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/, 'Time'], //4:00pm
  [/^[PMCE]ST$/, 'Time'], //PST, time zone abbrevs
  [/^utc ?[+-]?[0-9]+?$/, 'Time'], //UTC 8+
  [/^[a-z0-9]*? o\'?clock$/, 'Time'], //3 oclock
  [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, 'Date'], // 03-02-89
  [/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, 'Date'], // 03/02/89

  //names
  [/^ma?c\'.*/, 'LastName'], //mc'adams
  [/^o\'[drlkn].*/, 'LastName'], //o'douggan
  [/^ma?cd[aeiou]/, 'LastName'], //macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes

  //slang things
  [/^(lol)+[sz]$/, 'Expression'], //lol
  [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, 'Verb'],
  [/^[\-\+]?[0-9]+(\.[0-9])*$/, ['Cardinal', 'NumericValue']],
  [/^(over|under)[a-z]{2,}/, 'Adjective'],
  [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'], // 03-02-89

  //numbers
  [/^[\-\+]?[0-9][0-9,]*(\.[0-9])*$/, ['Cardinal', 'NumericValue']], //like 5
  [/^[-+]?[0-9]+(.[0-9]+)?$/, ['Cardinal', 'NumericValue']], //like +5.0
  [/^[0-9\.]{1,4}(st|nd|rd|th)?[-–][0-9\.]{1,4}(st|nd|rd|th)?$/, 'NumberRange'], //5-7
  [/^[-+]?[0-9.,]{1,3}(,[0-9.,]{3})+(.[0-9]+)?$/, 'NiceNumber'], //like 5,999.0
  [/^.?[0-9]+([0-9,.]+)?%$/, ['Percent', 'Cardinal', 'NumericValue']], //7%  ..
  [/^[0-9]{1,4}\/[0-9]{1,4}$/, 'Fraction'], //3/2ths
  [/^[0-9\.]{1,2}[-–][0-9]{1,2}$/, ['Value', 'NumberRange']], //7-8
  [/^[0-9][0-9,\.]*(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], //like 5th
  [/[0-9]\+$/, ['Cardinal', 'NumericValue']], //10+
  [/^[0-9]+(st|nd|rd|th)$/, 'Ordinal'], //like 5th
  [/^[0-9]+([a-z]{1,4})$/, 'Value'], //like 5tbsp
];

const romanNumeral = /^[IVXLCDM]{2,}$/;
const romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/; //  https://stackoverflow.com/a/267405/168877

//try each of the ^regexes in our list
const checkRegex = function(term, world) {
  let str = term.text;
  // do them all!
  for (let r = 0; r < regexes.length; r += 1) {
    if (regexes[r][0].test(str) === true) {
      term.tagSafe(regexes[r][1], 'regex #' + r, world);
      break
    }
  }
  // do some more!
  //roman numberals - XVII
  if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
    term.tag('RomanNumeral', 'xvii', world);
  }
};
var _03Regex = checkRegex;

//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.
//this mapping shrinks-down the uglified build
const Adj = 'Adjective';
const Inf = 'Infinitive';
const Pres = 'PresentTense';
const Sing = 'Singular';
const Past = 'PastTense';
const Adverb = 'Adverb';
const Exp = 'Expression';
const Actor = 'Actor';
const Verb = 'Verb';
const Noun = 'Noun';
const Last = 'LastName';
//the order here matters.

//regexes indexed by mandated last-character
var regex = {
  a: [
    [/.[aeiou]na$/, Noun],
    [/.[oau][wvl]ska$/, Last], //polish (female)
    [/.[^aeiou]ica$/, Sing],
    [/^([hyj]a)+$/, Exp], //hahah
  ],
  c: [[/.[^aeiou]ic$/, Adj]],
  d: [
    [/.[ia]sed$/, Adj],
    [/.[gt]led$/, Adj],
    [/.[aeiou][td]ed$/, Past],
    [/.[aeiou]red$/, Past],
    [/.[^aeiou]led$/, Past], //rumbled
    [/[^aeiou]ard$/, Sing],
    [/[aeiou][^aeiou]id$/, Adj],
    [/[aeiou]c?ked$/, Past], //hooked
    [/[^aeiou][aeiou][tvx]ed$/, Past], //boxed
    [/.[vrl]id$/, Adj],
  ],
  e: [
    [/.[lnr]ize$/, Inf],
    [/.[^aeiou]ise$/, Inf],
    [/.[aeiou]te$/, Inf],
    [/.[^aeiou][ai]ble$/, Adj],
    [/.[^aeiou]eable$/, Adj],
    [/.[ts]ive$/, Adj],
  ],
  h: [
    [/.[^aeiouf]ish$/, Adj],
    [/.v[iy]ch$/, Last], //east-europe
    [/^ug?h+$/, Exp], //uhh
    [/^uh[ -]?oh$/, Exp], //uhoh
  ],
  i: [
    [/.[oau][wvl]ski$/, Last], //polish (male)
  ],
  k: [
    [/^(k)+$/, Exp], //kkkk
  ],
  l: [[/.[gl]ial$/, Adj], [/.[^aeiou]ful$/, Adj], [/.[nrtumcd]al$/, Adj], [/.[^aeiou][ei]al$/, Adj]],
  m: [
    [/.[^aeiou]ium$/, Sing],
    [/[^aeiou]ism$/, Sing],
    [/^h*u*m+$/, Exp], //mmmmmmm / ummmm / huuuuuummmmmm
    [/^\d+ ?[ap]m$/, 'Date'],
  ],
  n: [[/.[lsrnpb]ian$/, Adj], [/[^aeiou]ician$/, Actor]],
  o: [
    [/^no+$/, Exp], //noooo
    [/^(yo)+$/, Exp], //yoyo
    [/^woo+[pt]?$/, Exp], //woo
  ],
  r: [[/.[ilk]er$/, 'Comparative'], [/[aeiou][pns]er$/, Sing], [/[^i]fer$/, Inf], [/.[^aeiou][ao]pher$/, Actor]],
  t: [[/.[di]est$/, 'Superlative'], [/.[icldtgrv]ent$/, Adj], [/[aeiou].*ist$/, Adj], [/^[a-z]et$/, Verb]],
  s: [
    [/.[rln]ates$/, Pres],
    [/.[^z]ens$/, Verb],
    [/.[lstrn]us$/, Sing],
    [/[aeiou][^aeiou]is$/, Sing],
    [/[a-z]\'s$/, Noun],
    [/^yes+$/, Exp], //yessss
  ],
  v: [
    [/.[^aeiou][ai][kln]ov$/, Last], //east-europe
  ],
  y: [
    [/.[cts]hy$/, Adj],
    [/.[st]ty$/, Adj],
    [/.[gk]y$/, Adj],
    [/.[tnl]ary$/, Adj],
    [/.[oe]ry$/, Sing],
    [/[rdntkbhs]ly$/, Adverb],
    [/...lly$/, Adverb],
    [/[bszmp]{2}y$/, Adj],
    [/.(gg|bb|zz)ly$/, Adj],
    [/.[aeiou]my$/, Adj],
    [/[ea]{2}zy$/, Adj],
    [/.[^aeiou]ity$/, Sing],
  ],
};

//just a foolish lookup of known suffixes
const Adj$1 = 'Adjective';
const Inf$1 = 'Infinitive';
const Pres$1 = 'PresentTense';
const Sing$1 = 'Singular';
const Past$1 = 'PastTense';
const Avb = 'Adverb';
const Plrl = 'Plural';
const Actor$1 = 'Actor';
const Vb = 'Verb';
const Noun$1 = 'Noun';
const Last$1 = 'LastName';
const Modal = 'Modal';

// find any issues - https://observablehq.com/@spencermountain/suffix-word-lookup
var suffixList = [
  null, //0
  null, //1
  {
    //2-letter
    ea: Sing$1,
    ia: Noun$1,
    ic: Adj$1,
    ly: Avb,
    "'n": Vb,
    "'t": Vb,
  },
  {
    //3-letter
    que: Adj$1,
    lar: Adj$1,
    ffy: Adj$1,
    nny: Adj$1,
    rmy: Adj$1,
    azy: Adj$1,
    oid: Adj$1,
    mum: Adj$1,
    ous: Adj$1,
    end: Vb,
    sis: Sing$1,
    rol: Sing$1,
    ize: Inf$1,
    ify: Inf$1,
    zes: Pres$1,
    nes: Pres$1,
    ing: 'Gerund', //likely to be converted to Adj after lexicon pass
    ' so': Avb,
    "'ll": Modal,
    "'re": 'Copula',
  },
  {
    //4-letter
    teen: 'Value',
    tors: Noun$1,
    amed: Past$1,
    ched: Past$1,
    ends: Vb,
    oses: Pres$1,
    fies: Pres$1,
    ects: Pres$1,
    nded: Past$1,
    cede: Inf$1,
    tage: Inf$1,
    gate: Inf$1,
    vice: Sing$1,
    tion: Sing$1,
    cted: Past$1,
    ette: Sing$1,
    some: Adj$1,
    llen: Adj$1,
    ried: Adj$1,
    gone: Adj$1,
    made: Adj$1,
    fore: Avb,
    less: Avb,
    ices: Plrl,
    ions: Plrl,
    ints: Plrl,
    aped: Past$1,
    lked: Past$1,
    ould: Modal,
    tive: Actor$1,
    sson: Last$1, //swedish male
    czyk: Last$1, //polish (male)
    chuk: Last$1, //east-europe
    enko: Last$1, //east-europe
    akis: Last$1, //greek
    nsen: Last$1, //norway
  },
  {
    //5-letter
    fully: Avb,
    where: Avb,
    wards: Avb,
    urned: Past$1,
    tized: Past$1,
    eased: Past$1,
    ances: Plrl,
    tures: Plrl,
    ports: Plrl,
    ettes: Plrl,
    ities: Plrl,
    rough: Adj$1,
    bound: Adj$1,
    tieth: 'Ordinal',
    ishes: Pres$1,
    tches: Pres$1,
    nssen: Last$1, //norway
    marek: Last$1, //polish (male)
  },
  {
    //6-letter
    keeper: Actor$1,
    logist: Actor$1,
    auskas: Last$1, //lithuania
    teenth: 'Value',
  },
  {
    //7-letter
    sdottir: Last$1, //swedish female
    opoulos: Last$1, //greek
  },
];

const suffixRegexes = function(term, world) {
  let str = term.clean;
  let char = str[str.length - 1];
  if (regex.hasOwnProperty(char) === true) {
    let regs = regex[char];
    for (let r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        term.tagSafe(regs[r][1], `endsWith ${char} #${r}`, world);
        break
      }
    }
  }
};

//sweep-through all suffixes
const knownSuffixes = function(term, world) {
  const len = term.clean.length;
  let max = 7;
  if (len <= max) {
    max = len - 1;
  }
  for (let i = max; i > 1; i -= 1) {
    let str = term.clean.substr(len - i, len);
    if (suffixList[str.length].hasOwnProperty(str) === true) {
      let tag = suffixList[str.length][str];
      term.tagSafe(tag, 'suffix -' + str, world);
      break
    }
  }
};

//all-the-way-down!
const checkRegex$1 = function(term, world) {
  suffixRegexes(term, world);
  knownSuffixes(term, world);
};
var _04Suffixes = checkRegex$1;

//yep,
//https://github.com/mathiasbynens/emoji-regex/blob/master/index.js
var regex$1 = /(?:0\u20E3\n1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF2|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFD|\uDDFF)|\uDDE7\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFC|\uDDFE|\uDDFF)|\uDDE8\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDE9\uD83C(?:\uDDEA|\uDDEC|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDFF)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDED|\uDDF7|\uDDF8|\uDDF9|\uDDFA)|\uDDEB\uD83C(?:\uDDEE|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDF7)|\uDDEC\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF1|\uDDF2|\uDDF3|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFE)|\uDDED\uD83C(?:\uDDF0|\uDDF2|\uDDF3|\uDDF7|\uDDF9|\uDDFA)|\uDDEE\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9)|\uDDEF\uD83C(?:\uDDEA|\uDDF2|\uDDF4|\uDDF5)|\uDDF0\uD83C(?:\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDF2|\uDDF3|\uDDF5|\uDDF7|\uDDFC|\uDDFE|\uDDFF)|\uDDF1\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDEE|\uDDF0|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFE)|\uDDF2\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDF3\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFF)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDE6|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF7|\uDDF8|\uDDF9|\uDDFC|\uDDFE)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDF8|\uDDFA|\uDDFC)|\uDDF8\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDE9|\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFD|\uDDFE|\uDDFF)|\uDDF9\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF9|\uDDFB|\uDDFC|\uDDFF)|\uDDFA\uD83C(?:\uDDE6|\uDDEC|\uDDF2|\uDDF8|\uDDFE|\uDDFF)|\uDDFB\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDEE|\uDDF3|\uDDFA)|\uDDFC\uD83C(?:\uDDEB|\uDDF8)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDEA|\uDDF9)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC)))|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]/g;

//just some of the most common emoticons
//faster than
//http://stackoverflow.com/questions/28077049/regex-matching-emoticons
var list = {
  ':(': true,
  ':)': true,
  ':P': true,
  ':p': true,
  ':O': true,
  ':3': true,
  ':|': true,
  ':/': true,
  ':\\': true,
  ':$': true,
  ':*': true,
  ':@': true,
  ':-(': true,
  ':-)': true,
  ':-P': true,
  ':-p': true,
  ':-O': true,
  ':-3': true,
  ':-|': true,
  ':-/': true,
  ':-\\': true,
  ':-$': true,
  ':-*': true,
  ':-@': true,
  ':^(': true,
  ':^)': true,
  ':^P': true,
  ':^p': true,
  ':^O': true,
  ':^3': true,
  ':^|': true,
  ':^/': true,
  ':^\\': true,
  ':^$': true,
  ':^*': true,
  ':^@': true,
  '):': true,
  '(:': true,
  '$:': true,
  '*:': true,
  ')-:': true,
  '(-:': true,
  '$-:': true,
  '*-:': true,
  ')^:': true,
  '(^:': true,
  '$^:': true,
  '*^:': true,
  '<3': true,
  '</3': true,
  '<\\3': true,
};

//for us, there's three types -
// * ;) - emoticons
// * 🌵 - unicode emoji
// * :smiling_face: - asci-represented emoji

//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js
const isCommaEmoji = t => {
  if (t.raw.charAt(0) === ':') {
    //end comma can be last or second-last ':haircut_tone3:‍♀️'
    if (t.raw.match(/:.?$/) === null) {
      return false
    }
    //ensure no spaces
    if (t.raw.match(' ')) {
      return false
    }
    //reasonably sized
    if (t.raw.length > 35) {
      return false
    }
    return true
  }
  return false
};

//check against emoticon whitelist
const isEmoticon = t => {
  let str = t.raw.replace(/^[:;]/, ':'); //normalize the 'eyes'
  return list.hasOwnProperty(str)
};

//these are somewhat popular.
const tagEmoji = (term, world) => {
  //test for :keyword: emojis
  if (isCommaEmoji(term) === true) {
    term.tag('Emoji', 'comma-emoji', world);
    term.text = term.raw;
    term.pre = term.pre.replace(':', '');
    term.post = term.post.replace(':', '');
  }
  //test for unicode emojis
  if (term.text.match(regex$1)) {
    term.tag('Emoji', 'unicode-emoji', world);
    term.text = term.raw;
  }
  //test for emoticon ':)' emojis
  if (isEmoticon(term) === true) {
    term.tag('Emoji', 'emoticon-emoji', world);
    term.text = term.raw;
  }
};
var _05Emoji = tagEmoji;

const steps = {
  lexicon: _01Lexicon,
  punctuation: _02Punctuation$1,
  regex: _03Regex,
  suffix: _04Suffixes,
  emoji: _05Emoji,
};

//'lookups' look at a term by itself
const lookups = function(doc) {
  let terms = doc.termList();
  let world = doc.world;
  //our list of known-words
  steps.lexicon(terms, world);

  //try these other methods
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i];
    //or maybe some helpful punctuation
    steps.punctuation(terms, i, world);
    //mostly prefix checks
    steps.regex(term, world);
    //maybe we can guess
    steps.suffix(term, world);
    // :c
    steps.emoji(term, world);
  }
  return doc
};
var _01Init = lookups;

//markov-like stats about co-occurance, for hints about unknown terms
//basically, a little-bit better than the noun-fallback
//just top n-grams from nlp tags, generated from nlp-corpus

//after this word, here's what happens usually
let afterThisWord = {
  i: 'Verb', //44% //i walk..
  first: 'Noun', //50% //first principles..
  it: 'Verb', //33%
  there: 'Verb', //35%
  not: 'Verb', //33%
  because: 'Noun', //31%
  if: 'Noun', //32%
  but: 'Noun', //26%
  who: 'Verb', //40%
  this: 'Noun', //37%
  his: 'Noun', //48%
  when: 'Noun', //33%
  you: 'Verb', //35%
  very: 'Adjective', // 39%
  old: 'Noun', //51%
  never: 'Verb', //42%
  before: 'Noun', //28%
};

//in advance of this word, this is what happens usually
let beforeThisWord = {
  there: 'Verb', //23% // be there
  me: 'Verb', //31% //see me
  man: 'Adjective', // 80% //quiet man
  only: 'Verb', //27% //sees only
  him: 'Verb', //32% //show him
  were: 'Noun', //48% //we were
  took: 'Noun', //38% //he took
  himself: 'Verb', //31% //see himself
  went: 'Noun', //43% //he went
  who: 'Noun', //47% //person who
  jr: 'Person',
};

//following this POS, this is likely
let afterThisPOS = {
  Adjective: 'Noun', //36% //blue dress
  Possessive: 'Noun', //41% //his song
  Determiner: 'Noun', //47%
  Adverb: 'Verb', //20%
  Pronoun: 'Verb', //40%
  Value: 'Noun', //47%
  Ordinal: 'Noun', //53%
  Modal: 'Verb', //35%
  Superlative: 'Noun', //43%
  Demonym: 'Noun', //38%
  Honorific: 'Person', //
};

//in advance of this POS, this is likely
let beforeThisPOS = {
  Copula: 'Noun', //44% //spencer is
  PastTense: 'Noun', //33% //spencer walked
  Conjunction: 'Noun', //36%
  Modal: 'Noun', //38%
  PluperfectTense: 'Noun', //40%
  PerfectTense: 'Verb', //32%
};
var markov = {
  beforeThisWord: beforeThisWord,
  afterThisWord: afterThisWord,

  beforeThisPos: beforeThisPOS,
  afterThisPos: afterThisPOS,
};

const afterKeys = Object.keys(markov.afterThisPos);
const beforeKeys = Object.keys(markov.beforeThisPos);

const checkNeighbours = function(terms, world) {
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i];
    //do we still need a tag?
    if (term.isKnown() === true) {
      continue
    }
    //ok, this term needs a tag.
    //look at previous word for clues..
    let lastTerm = terms[i - 1];
    if (lastTerm) {
      // 'foobar term'
      if (markov.afterThisWord.hasOwnProperty(lastTerm.clean) === true) {
        let tag = markov.afterThisWord[lastTerm.clean];
        term.tag(tag, 'after-' + lastTerm.clean, world);
        continue
      }
      // 'Tag term'
      // (look at previous POS tags for clues..)
      let foundTag = afterKeys.find(tag => lastTerm.tags[tag]);
      if (foundTag !== undefined) {
        let tag = markov.afterThisPos[foundTag];
        term.tag(tag, 'after-' + foundTag, world);
        continue
      }
    }

    //look at next word for clues..
    let nextTerm = terms[i + 1];
    if (nextTerm) {
      // 'term foobar'
      if (markov.beforeThisWord.hasOwnProperty(nextTerm.clean) === true) {
        let tag = markov.beforeThisWord[nextTerm.clean];
        term.tag(tag, 'before-' + nextTerm.clean, world);
        continue
      }
      // 'term Tag'
      // (look at next POS tags for clues..)
      let foundTag = beforeKeys.find(tag => nextTerm.tags[tag]);
      if (foundTag !== undefined) {
        let tag = markov.beforeThisPos[foundTag];
        term.tag(tag, 'before-' + foundTag, world);
        continue
      }
    }
  }
};
var _01Neighbours = checkNeighbours;

const titleCase$3 = /^[A-Z][a-z'\u00C0-\u00FF]/;
const hasNumber = /[0-9]/;

/** look for any grammar signals based on capital/lowercase */
const checkCase = function(terms, world) {
  terms.forEach((term, i) => {
    //is it a titlecased word?
    if (titleCase$3.test(term.text) === true && hasNumber.test(term.text) === false) {
      // tag it as titlecase, if possible
      if (i !== 0) {
        term.tag('TitleCase', 'case', world);
      } else if (term.tags.Person || term.tags.Organization || term.tags.Place) {
        term.tag('TitleCase', 'case-person', world);
      }
      // can we call it a noun?
      if (i !== 0) {
        //sure!
        term.tag('ProperNoun', 'case-noun', world);
      }
    }
  });
};
var _02Case = checkCase;

//these tags don't have plurals
const noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday'];

const notPlural = [/ss$/, /sis$/, /[uo]s$/];
const notSingular = [/i$/, /ae$/, /men$/, /tia$/];

/** turn nouns into singular/plural */
const checkPlural = function(t, world) {
  if (t.tags.Noun && !t.tags.Acronym) {
    let str = t.clean;
    //skip existing tags, fast
    if (t.tags.Singular || t.tags.Plural) {
      return
    }
    //too short
    if (str.length <= 2) {
      return
    }
    //is it impossible to be plural?
    if (noPlurals.find(tag => t.tags[tag])) {
      return
    }
    // finally, fallback 'looks check plural' rules..
    if (/s$/.test(str) === true) {
      //avoid anything too sketchy to be plural
      if (notPlural.find(reg => reg.test(str))) {
        return
      }
      t.tag('Plural', 'plural-fallback', world);
      return
    }
    //avoid anything too sketchy to be singular
    if (notSingular.find(reg => reg.test(str))) {
      return
    }
    t.tag('Singular', 'singular-fallback', world);
  }
};
var _04Plurals = checkPlural;

const hasPrefix = /^(re|un)-?[a-z\u00C0-\u00FF]/;
const prefix = /^(re|un)-?/;

/** check 'rewatch' in lexicon as 'watch' */
const checkPrefix = function(terms, world) {
  let lex = world.lexicon;
  terms.forEach(term => {
    // skip if we have a good tag already
    if (term.isKnown() === true) {
      return
    }
    //does it start with 'un|re'
    if (hasPrefix.test(term.clean) === true) {
      // look for the root word in the lexicon:
      let stem = term.clean.replace(prefix, '');
      if (lex[stem] !== undefined && lex.hasOwnProperty(stem) === true) {
        term.tag(lex[stem], 'stem-' + stem, world);
      }
    }
  });
};
var _03Stem = checkPrefix;

const step = {
  neighbours: _01Neighbours,
  case: _02Case,
  plural: _04Plurals,
  stem: _03Stem,
};
//
const fallbacks = function(doc) {
  let terms = doc.termList();
  let world = doc.world;

  // if it's empty, consult it's neighbours, first
  step.neighbours(terms, world);

  // is there a case-sensitive clue?
  step.case(terms, world);

  // check 'rewatch' as 'watch'
  step.stem(terms, world);

  // ... fallback to a noun!
  terms.forEach(t => {
    if (t.isKnown() === false) {
      t.tag('Noun', 'noun-fallback', doc.world);
    }
  });

  //are the nouns singular or plural?
  terms.forEach(t => {
    step.plural(t, doc.world);
  });

  return doc
};
var _02Fallbacks = fallbacks;

const hasNegative = /n't$/;

const irregulars$6 = {
  "won't": ['will', 'not'],
  wont: ['will', 'not'],
  "can't": ['can', 'not'],
  cant: ['can', 'not'],
  cannot: ['can', 'not'],
  "shan't": ['should', 'not'],
  dont: ['do', 'not'],
  dun: ['do', 'not'],
  // "ain't" is ambiguous for is/was
};

const checkNegative = function(term) {
  //check named-ones
  if (irregulars$6.hasOwnProperty(term.clean) === true) {
    return irregulars$6[term.clean]
  }
  //try it normally
  if (hasNegative.test(term.clean) === true) {
    let main = term.clean.replace(hasNegative, '');
    return [main, 'not']
  }
  return null
};
var _01Negative = checkNegative;

const contraction = /([a-z\u00C0-\u00FF]+)'([a-z]{1,2})$/i;

//these ones don't seem to be ambiguous
const easy = {
  ll: 'will',
  ve: 'have',
  re: 'are',
  m: 'am',
  "n't": 'not',
};
//
const checkApostrophe = function(term) {
  let parts = term.text.match(contraction);
  if (parts === null) {
    return null
  }
  if (easy.hasOwnProperty(parts[2])) {
    return [parts[1], easy[parts[2]]]
  }
  return null
};
var _02Simple = checkApostrophe;

const irregulars$7 = {
  wanna: ['want', 'to'],
  gonna: ['going', 'to'],
  im: ['i', 'am'],
  alot: ['a', 'lot'],
  ive: ['i', 'have'],
  imma: ['I', 'will'],

  "where'd": ['where', 'did'],
  whered: ['where', 'did'],
  "when'd": ['when', 'did'],
  whend: ['when', 'did'],
  "how'd": ['how', 'did'],
  howd: ['how', 'did'],
  "what'd": ['what', 'did'],
  whatd: ['what', 'did'],
  "let's": ['let', 'us'],

  //multiple word contractions
  dunno: ['do', 'not', 'know'],
  brb: ['be', 'right', 'back'],
  gtg: ['got', 'to', 'go'],
  irl: ['in', 'real', 'life'],
  tbh: ['to', 'be', 'honest'],
  imo: ['in', 'my', 'opinion'],
  til: ['today', 'i', 'learned'],
  rn: ['right', 'now'],
  twas: ['it', 'was'],
  '@': ['at'],
};

// either 'is not' or 'are not'
const doAint = function(term, phrase) {
  let terms = phrase.terms();
  let index = terms.indexOf(term);
  let before = terms.slice(0, index);
  //look for the preceding noun
  let noun = before.find(t => {
    return t.tags.Noun
  });
  if (noun && noun.tags.Plural) {
    return ['are', 'not']
  }
  return ['is', 'not']
};

//
const checkIrregulars = function(term, phrase) {
  //this word needs it's own logic:
  if (term.clean === `ain't` || term.clean === 'aint') {
    return doAint(term, phrase)
  }
  //check white-list
  if (irregulars$7.hasOwnProperty(term.clean)) {
    return irregulars$7[term.clean]
  }
  return null
};
var _03Irregulars = checkIrregulars;

const hasApostropheS = /([a-z\u00C0-\u00FF]+)'s$/i;

const blacklist$1 = {
  that: true,
  there: true,
};
const isPossessive = (term, pool) => {
  // if we already know it
  if (term.tags.Possessive) {
    return true
  }
  //a pronoun can't be possessive - "he's house"
  if (term.tags.Pronoun || term.tags.QuestionWord) {
    return false
  }
  if (blacklist$1.hasOwnProperty(term.clean)) {
    return false
  }
  //if end of sentence, it is possessive - "was spencer's"
  let nextTerm = pool.get(term.next);
  if (!nextTerm) {
    return true
  }
  //a gerund suggests 'is walking'
  if (nextTerm.tags.Verb) {
    //fix 'jamie's bite'
    if (nextTerm.tags.Infinitive) {
      return true
    }
    return false
  }

  //spencer's house
  if (nextTerm.tags.Noun) {
    return true
  }
  //rocket's red glare
  let twoTerm = pool.get(nextTerm.next);
  if (twoTerm && twoTerm.tags.Noun) {
    return true
  }
  //othwerwise, an adjective suggests 'is good'
  if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
    return false
  }
  return false
};

const isHas = (term, phrase) => {
  let terms = phrase.terms();
  let index = terms.indexOf(term);
  let after = terms.slice(index + 1, index + 3);
  //look for a past-tense verb
  return after.find(t => {
    return t.tags.PastTense
  })
};

const checkPossessive = function(term, phrase, world) {
  //the rest of 's
  let found = term.text.match(hasApostropheS);
  if (found !== null) {
    //spencer's thing vs spencer-is
    if (isPossessive(term, phrase.pool) === true) {
      term.tag('#Possessive', 'isPossessive', world);
      return null
    }
    //'spencer is'
    if (found !== null) {
      if (isHas(term, phrase)) {
        return [found[1], 'has']
      }
      return [found[1], 'is']
    }
  }
  return null
};
var _04Possessive = checkPossessive;

const hasPerfect = /[a-z\u00C0-\u00FF]'d$/;

/** split `i'd` into 'i had', or 'i would' */
const checkPerfect = function(term, phrase) {
  if (hasPerfect.test(term.clean)) {
    let root = term.clean.replace(/'d$/, '');
    //look at the next few words
    let terms = phrase.terms();
    let index = terms.indexOf(term);
    let after = terms.slice(index + 1, index + 4);
    //is it before a past-tense verb? - 'i'd walked'
    for (let i = 0; i < after.length; i++) {
      let t = after[i];
      if (t.tags.Verb) {
        if (t.tags.PastTense) {
          return [root, 'had']
        }
        return [root, 'would']
      }
    }
    //otherwise, 'i'd walk'
    return [root, 'would']
  }
  return null
};
var _05PerfectTense = checkPerfect;

const isRange = /([0-9]+)[-–—]([0-9]+)$/i;

//split '2-4' into '2 to 4'
const checkRange = function(term) {
  if (term.tags.PhoneNumber === true) {
    return null
  }
  let parts = term.text.match(isRange);
  if (parts !== null) {
    return [parts[1], 'to', parts[2]]
  }
  return null
};
var _06Ranges = checkRange;

const isNumber = /^[0-9]+$/;

const createPhrase = function(found, doc) {
  //create phrase from ['would', 'not']
  let phrase = _01Tokenizer.fromText(found.join(' '), doc.world, doc.pool())[0];
  //tag it
  let terms = phrase.terms();
  _01Lexicon(terms, doc.world);
  //make these terms implicit
  terms.forEach(t => {
    t.implicit = t.text;
    t.text = '';
    t.clean = '';
    // remove whitespace for implicit terms
    t.pre = '';
    t.post = '';
    // tag number-ranges
    if (isNumber.test(t.implicit)) {
      t.tags.Number = true;
      t.tags.Cardinal = true;
    }
  });
  return phrase
};

const contractions = function(doc) {
  let world = doc.world;
  doc.list.forEach(p => {
    let terms = p.terms();
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i];
      let found = _01Negative(term);
      found = found || _02Simple(term);
      found = found || _03Irregulars(term, p);
      found = found || _04Possessive(term, p, world);
      found = found || _05PerfectTense(term, p);
      found = found || _06Ranges(term);
      //add them in
      if (found !== null) {
        let newPhrase = createPhrase(found, doc);
        //set text as contraction
        let firstTerm = newPhrase.terms(0);
        firstTerm.text = term.text;
        //grab sub-phrase to remove
        let match = p.buildFrom(term.id, 1, doc.pool());
        match.replace(newPhrase, doc);
      }
    }
  });
  return doc
};
var _03Contractions = contractions;

//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
const orgWords = [
  'academy',
  'administration',
  'agence',
  'agences',
  'agencies',
  'agency',
  'airlines',
  'airways',
  'army',
  'assoc',
  'associates',
  'association',
  'assurance',
  'authority',
  'autorite',
  'aviation',
  'bank',
  'banque',
  'board',
  'boys',
  'brands',
  'brewery',
  'brotherhood',
  'brothers',
  'building society',
  'bureau',
  'cafe',
  'caisse',
  'capital',
  'care',
  'cathedral',
  'center',
  'central bank',
  'centre',
  'chemicals',
  'choir',
  'chronicle',
  'church',
  'circus',
  'clinic',
  'clinique',
  'club',
  'co',
  'coalition',
  'coffee',
  'collective',
  'college',
  'commission',
  'committee',
  'communications',
  'community',
  'company',
  'comprehensive',
  'computers',
  'confederation',
  'conference',
  'conseil',
  'consulting',
  'containers',
  'corporation',
  'corps',
  'corp',
  'council',
  'crew',
  'daily news',
  'data',
  'departement',
  'department',
  'department store',
  'departments',
  'design',
  'development',
  'directorate',
  'division',
  'drilling',
  'education',
  'eglise',
  'electric',
  'electricity',
  'energy',
  'ensemble',
  'enterprise',
  'enterprises',
  'entertainment',
  'estate',
  'etat',
  'evening news',
  'faculty',
  'federation',
  'financial',
  'fm',
  'foundation',
  'fund',
  'gas',
  'gazette',
  'girls',
  'government',
  'group',
  'guild',
  'health authority',
  'herald',
  'holdings',
  'hospital',
  'hotel',
  'hotels',
  'inc',
  'industries',
  'institut',
  'institute',
  'institute of technology',
  'institutes',
  'insurance',
  'international',
  'interstate',
  'investment',
  'investments',
  'investors',
  'journal',
  'laboratory',
  'labs',
  // 'law',
  'liberation army',
  'limited',
  'local authority',
  'local health authority',
  'machines',
  'magazine',
  'management',
  'marine',
  'marketing',
  'markets',
  'media',
  'memorial',
  'mercantile exchange',
  'ministere',
  'ministry',
  'military',
  'mobile',
  'motor',
  'motors',
  'musee',
  'museum',
  // 'network',
  'news',
  'news service',
  'observatory',
  'office',
  'oil',
  'optical',
  'orchestra',
  'organization',
  'partners',
  'partnership',
  // 'party',
  "people's party",
  'petrol',
  'petroleum',
  'pharmacare',
  'pharmaceutical',
  'pharmaceuticals',
  'pizza',
  'plc',
  'police',
  'polytechnic',
  'post',
  'power',
  'press',
  'productions',
  'quartet',
  'radio',
  'regional authority',
  'regional health authority',
  'reserve',
  'resources',
  'restaurant',
  'restaurants',
  'savings',
  'school',
  'securities',
  'service',
  'services',
  'social club',
  'societe',
  'society',
  'sons',
  'standard',
  'state police',
  'state university',
  'stock exchange',
  'subcommittee',
  'syndicat',
  'systems',
  'telecommunications',
  'telegraph',
  'television',
  'times',
  'tribunal',
  'tv',
  'union',
  'university',
  'utilities',
  'workers',
];

var orgWords_1 = orgWords.reduce(function(h, str) {
  h[str] = 'Noun';
  return h
}, {});

//could this word be an organization
const maybeOrg = function(t) {
  //must be a noun
  if (!t.tags.Noun) {
    return false
  }
  //can't be these things
  if (t.tags.Pronoun || t.tags.Comma || t.tags.Possessive) {
    return false
  }
  //must be one of these
  if (t.tags.TitleCase || t.tags.Organization || t.tags.Acronym || t.tags.Place) {
    return true
  }
  return false
};

const tagOrgs = function(doc, termArr) {
  termArr.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      let t = terms[i];
      if (orgWords_1[t.clean] !== undefined && orgWords_1.hasOwnProperty(t.clean) === true) {
        // look-backward - eg. 'Toronto University'
        let lastTerm = terms[i - 1];
        if (lastTerm !== undefined && maybeOrg(lastTerm) === true) {
          lastTerm.tag('Organization', 'org-word-1', doc.world);
          t.tag('Organization', 'org-word-2', doc.world);
          continue
        }
        //look-forward - eg. University of Toronto
        let nextTerm = terms[i + 1];
        if (nextTerm !== undefined && nextTerm.clean === 'of') {
          if (terms[i + 2] && maybeOrg(terms[i + 2])) {
            t.tag('Organization', 'org-of-word-1', doc.world);
            nextTerm.tag('Organization', 'org-of-word-2', doc.world);
            terms[i + 2].tag('Organization', 'org-of-word-3', doc.world);
            continue
          }
        }
      }
    }
  });

  return doc
};
var _01Organizations = tagOrgs;

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map(p => p.terms());
  _01Organizations(doc, termArr);
  return doc
};
var _04Inference = inference;

//mostly pos-corections here
const miscCorrection = function(doc) {
  //misc:
  //foot/feet
  doc.match('(foot|feet)').tag('Noun', 'foot-noun');
  //3 feet
  doc.match('#Value [(foot|feet)]').tag('Unit', 'foot-unit');
  //'u' as pronoun
  doc.match('#Conjunction [u]').tag('Pronoun', 'u-pronoun-2');
  //6 am
  doc.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day');
  //timezones
  doc.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone');
  //about to go
  doc.match('[about to] #Adverb? #Verb').tag(['Auxiliary', 'Verb'], 'about-to');
  //right of way
  doc.match('(right|rights) of .').tag('Noun', 'right-of');
  // a bit
  doc.match('[much] #Adjective').tag('Adverb', 'bit-1');
  doc.match('a [bit]').tag('Noun', 'bit-2');
  doc.match('a bit much').tag('Determiner Adverb Adjective', 'bit-3');
  doc.match('too much').tag('Adverb Adjective', 'bit-4');
  // u r cool
  doc.match('u r').tag('Pronoun #Copula', 'u r');
  //swear-words as non-expression POS
  //nsfw
  doc.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  doc.match('#Determiner [(shit|damn|hell)]').tag('Noun', 'swears-noun');
  doc.match('[(shit|damn|fuck)] (#Determiner|#Possessive|them)').tag('Verb', 'swears-verb');
  doc
    .match('#Copula fucked up?')
    .not('#Copula')
    .tag('Adjective', 'swears-adjective');

  //ambig prepositions/conjunctions
  let so = doc.if('so');
  if (so.found === true) {
    //so funny
    so.match('[so] #Adjective').tag('Adverb', 'so-adv');
    //so the
    so.match('[so] #Noun').tag('Conjunction', 'so-conj');
    //do so
    so.match('do [so]').tag('Noun', 'so-noun');
  }

  let all = doc.if('all');
  if (all.found === true) {
    //all students
    all.match('[all] #Determiner? #Noun').tag('Adjective', 'all-noun');
    //it all fell apart
    all.match('[all] #Verb').tag('Adverb', 'all-verb');
  }

  //the ambiguous word 'that' and 'which'
  let which = doc.if('which');
  if (which.found === true) {
    //remind john that
    which.match('#Verb #Adverb? #Noun [(that|which)]').tag('Preposition', 'that-prep');
    //that car goes
    which.match('that #Noun [#Verb]').tag('Determiner', 'that-determiner');
    //work, which has been done.
    which.match('#Comma [which] (#Pronoun|#Verb)').tag('Preposition', 'which-copula');
    //things that provide
    // doc.match('#Plural (that|which) #Adverb? #Verb').term(1).tag('Preposition', 'noun-that');
  }

  //like
  let like = doc.if('like');
  if (like.found === true) {
    like.match('just [like]').tag('Preposition', 'like-preposition');
    //folks like her
    like.match('#Noun [like] #Noun').tag('Preposition', 'noun-like');
    //look like
    like.match('#Verb [like]').tag('Adverb', 'verb-like');
    //exactly like
    like
      .match('#Adverb like')
      .notIf('(really|generally|typically|usually|sometimes|often) [like]')
      .tag('Adverb', 'adverb-like');
  }

  let title = doc.if('#TitleCase');
  if (title.found === true) {
    //FitBit Inc
    title.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv');
    //Foo District
    title
      .match('#TitleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)')
      .tag('Region', 'foo-district');
    //District of Foo
    title
      .match('(district|region|province|municipality|territory|burough|state) of #TitleCase')
      .tag('Region', 'district-of-Foo');
  }

  let hyph = doc.if('#Hyphenated');
  if (hyph.found === true) {
    //air-flow
    hyph
      .match('#Hyphenated #Hyphenated')
      .match('#Noun #Verb')
      .tag('Noun', 'hyphen-verb');
    //connect hyphenated expressions - 'ooh-wee'
    hyph
      .match('#Hyphenated+')
      .if('#Expression')
      .tag('Expression', 'ooh-wee');
  }

  let place = doc.if('#Place');
  if (place.found === true) {
    //West Norforlk
    place.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk');
    //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
    place
      .match('#City [#Acronym]')
      .match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)')
      .tag('Region', 'us-state');
  }

  return doc
};

var fixMisc = miscCorrection;

//Determiner-signals
const fixThe = function(doc) {
  let det = doc.if('#Determiner');

  if (det.found === true) {
    let adj = det.if('#Adjective');
    if (adj.found) {
      //the nice swim
      adj.match('(the|this|those|these) #Adjective [#Verb]').tag('Noun', 'the-adj-verb');
      // the truly nice swim
      adj.match('(the|this|those|these) #Adverb #Adjective [#Verb]').tag('Noun', 'correction-determiner4');
      //the orange is
      adj.match('#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)').tag('Noun', 'the-adj-2');
      //the orange.
      adj
        .match('#Determiner #Adjective$')
        .notIf('(#Comparative|#Superlative)')
        .terms(1)
        .tag('Noun', 'the-adj-1');
    }

    let inf = det.if('#Infinitive');
    if (inf.found) {
      // a stream runs
      inf.match('(the|this|a|an) [#Infinitive] #Adverb? #Verb').tag('Noun', 'correction-determiner5');
      //the test string
      inf.match('#Determiner [#Infinitive] #Noun').tag('Noun', 'correction-determiner7');
      //by a bear.
      inf.match('#Determiner [#Infinitive]$').tag('Noun', 'a-inf');
    }

    //the wait to vote
    det.match('(the|this) [#Verb] #Preposition .').tag('Noun', 'correction-determiner1');
    //some pressing issues
    det.match('some [#Verb] #Plural').tag('Noun', 'correction-determiner6');
    //a sense of
    det.match('#Determiner [#Verb] of').tag('Noun', 'the-verb-of');
    //the threat of force
    det.match('#Determiner #Noun of [#Verb]').tag('Noun', 'noun-of-noun');
    //a close
    det.match('#Determiner #Adverb? [close]').tag('Adjective', 'a-close');
    //the western line
    det.match('#Determiner [(western|eastern|northern|southern|central)] #Noun').tag('Noun', 'western-line');
    //the swim
    det.match('(the|those|these) [(#Infinitive|#PresentTense|#PastTense)]').tag('Noun', 'correction-determiner2');
  }

  let an = doc.if('(a|an)');
  if (an.found === true) {
    //a staggering cost
    an.match('(a|an) [#Gerund]').tag('Adjective', 'correction-a|an');
    //did a 900, paid a 20
    an.match('#Verb (a|an) [#Value]').tag('Singular', 'a-value');
    //a tv show
    an.match('(a|an) #Noun [#Infinitive]').tag('Noun', 'a-noun-inf');
    //a great run
    an.match('(a|an) #Adjective (#Infinitive|#PresentTense)')
      .terms(2)
      .tag('Noun', 'correction-a|an2');
    //'a/an' can mean 1 - "a hour"
    an.match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)')
      .ifNo('#Plural')
      .tag('Value', 'a-is-one');
  }

  return doc
};
var fixThe_1 = fixThe;

//
const fixNouns = function(doc) {
  let noun = doc.if('#Noun');
  if (noun.found === true) {
    //'more' is not always an adverb
    noun.match('more #Noun').tag('Noun', 'more-noun');
    //he quickly foo
    noun.match('#Noun #Adverb [#Noun]').tag('Verb', 'correction');
    //fix for busted-up phrasalVerbs
    noun.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal');
    //John & Joe's
    noun.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun');
    //Aircraft designer
    noun.match('#Noun #Actor').tag('Actor', 'thing-doer');
    //this rocks
    noun.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs');
    //j.k Rowling
    doc.match('#Noun van der? #Noun').tagSafe('#Person', 'von der noun');
    //king of spain
    doc.match('(king|queen|prince|saint|lady) of? #Noun').tagSafe('#Person', 'king-of-noun');
    //the word 'second'
    noun
      .match('[second] #Noun')
      .notIf('#Honorific')
      .unTag('Unit')
      .tag('Ordinal', 'second-noun');
    //linear algebra
    noun
      .match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun')
      .tag('Noun', 'technical-noun');

    //organization
    let org = noun.if('#Organization');
    if (org.found === true) {
      org.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
      org.match('#Organization #Country').tag('Organization', 'org-country');
      org.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
    }
  }

  //acronyms
  let acronym = doc.if('#Acronym');
  if (acronym.found === true) {
    acronym
      .match('the [#Acronym]')
      .notIf('(iou|fomo|yolo|diy|dui|nimby)')
      .tag('Organization', 'the-acronym');
    acronym
      .match('#Acronym')
      .match('#Possessive')
      .tag('Organization', 'possessive-acronym');
  }

  //possessives
  let poss = doc.if('#Possessive');
  if (poss.found === true) {
    //my buddy
    poss.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name');
    //spencer kelly's
    poss
      .match('#FirstName #Acronym? #Possessive')
      .ifNo('#Comma')
      .match('#FirstName #Acronym? #LastName')
      .tag('Possessive');
    //Super Corp's fundraiser
    poss
      .match('#Organization+ #Possessive')
      .ifNo('#Comma')
      .tag('Possessive');
    //Los Angeles's fundraiser
    poss
      .match('#Place+ #Possessive')
      .ifNo('#Comma')
      .tag('Possessive');
  }
  return doc
};
var fixNouns_1 = fixNouns;

const maybeNoun =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)';
const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)';
const maybeAdj = '(misty|rusty|dusty|rich|randy)';
const maybeDate = '(april|june|may|jan|august|eve)';
const maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)';

const fixPerson = function(doc) {
  // clues from honorifics
  let hon = doc.if('#Honorific');
  if (hon.found === true) {
    //mr Putin
    doc.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin');
    //mr X
    hon.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase');
    //remove single 'mr'
    hon.match('^#Honorific$').unTag('Person', 'single-honorific');
    //first general..
    hon.match('[(1st|2nd|first|second)] #Honorific').tag('Honorific', 'ordinal-honorific');
  }

  //methods requiring a titlecase
  let titleCase = doc.if('#TitleCase');
  if (titleCase.found === true) {
    titleCase.match('#Acronym #TitleCase').tagSafe('#Person', 'acronym-titlecase');
    //ludwig van beethovan
    titleCase.match('#TitleCase (van|al|bin) #TitleCase').tagSafe('Person', 'titlecase-van-titlecase');
    //jose de Sucre
    titleCase.match('#TitleCase (de|du) la? #TitleCase').tagSafe('Person', 'titlecase-van-titlecase');

    //pope francis
    titleCase
      .match('(lady|queen|sister) #TitleCase')
      .ifNo('#Date')
      .ifNo('#Honorific')
      .tag('#FemaleName', 'lady-titlecase');
    titleCase
      .match('(king|pope|father) #TitleCase')
      .ifNo('#Date')
      .tag('#MaleName', 'poe');

    // jean Foobar
    titleCase.match(maybeNoun + ' #Acronym? #TitleCase').tagSafe('Person', 'ray-smith');
    // rob Foobar
    titleCase.match(maybeVerb + ' #Acronym? #TitleCase').tag('Person', 'rob-smith');
    // rusty Foobar
    titleCase.match(maybeAdj + ' #Acronym? #TitleCase').tag('Person', 'rusty-smith');
    // june Foobar
    titleCase.match(maybeDate + ' #Acronym? #TitleCase').tagSafe('Person', 'june-smith');
  }

  let person = doc.if('#Person');
  if (person.found === true) {
    //Frank jr
    person.match('#Person (jr|sr|md)').tag('Person', 'person-honorific');
    //peter II
    person.match('#Person #Person the? #RomanNumeral').tag('Person', 'roman-numeral');
    //'Professor Fink', 'General McCarthy'
    person.match('#Honorific #Person').tag('Person', 'Honorific-Person');
    // 'john E rockefeller'
    person.match('#FirstName [/^[^aiurck]$/]').tag(['Acronym', 'Person'], 'john-e');
    //Doctor john smith jr
    person.match('#Honorific #Person').tag('Person', 'honorific-person');
    //general pearson
    person
      .match('[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person')
      .tag('Honorific', 'ambg-honorifics');
    //Morgan Shlkjsfne
    titleCase
      .match('#Person #TitleCase')
      .match('#TitleCase #Noun')
      .tagSafe('Person', 'person-titlecase');
    //a bunch of ambiguous first names

    //Nouns: 'viola' or 'sky'
    let ambigNoun = person.if(maybeNoun);
    if (ambigNoun.found === true) {
      // ambigNoun.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray')
      ambigNoun.match(maybeNoun + ' #Person').tagSafe('Person', 'ray-smith');
    }

    //Verbs: 'pat' or 'wade'
    let ambigVerb = person.if(maybeVerb);
    if (ambigVerb === true) {
      ambigVerb.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark');
      ambigVerb.match(maybeVerb + ' #Person').tag('Person', 'rob-smith');
    }

    //Adjectives: 'rusty' or 'rich'
    let ambigAdj = person.if(maybeAdj);
    if (ambigAdj.found === true) {
      ambigAdj.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich');
      ambigAdj.match(maybeAdj + ' #Person').tag('Person', 'randy-smith');
    }

    //Dates: 'june' or 'may'
    let ambigDate = person.if(maybeDate);
    if (ambigDate.found === true) {
      ambigDate.match(String(maybeDate) + ' #Person').tagSafe('Person', 'june-smith');
      ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']').tagSafe('Date', 'in-june');
      ambigDate.match(maybeDate + ' (#Date|#Value)').tagSafe('Date', 'june-5th');
    }

    //Places: paris or syndey
    let ambigPlace = person.if(maybePlace);
    if (ambigPlace.found === true) {
      ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']').tagSafe('Place', 'in-paris');
      ambigPlace.match('[' + maybePlace + '] #Place').tagSafe('Place', 'paris-france');
      // ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton')
    }

    //this one is tricky
    let al = person.if('al');
    if (al.found === true) {
      al.match('al (#Person|#TitleCase)').tagSafe('#Person', 'al-borlen');
      al.match('#TitleCase al #TitleCase').tagSafe('#Person', 'arabic-al-arabic');
    }

    let firstName = person.if('#FirstName');
    if (firstName.found === true) {
      //ferdinand de almar
      firstName.match('#FirstName de #Noun').tag('#Person', 'firstname-de-noun');
      //Osama bin Laden
      firstName.match('#FirstName (bin|al) #Noun').tag('#Person', 'firstname-al-noun');
      //John L. Foo
      firstName.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
      //Andrew Lloyd Webber
      firstName.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase');
      //Mr Foo
      firstName.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
      //peter the great
      firstName.match('#FirstName the #Adjective').tag('Person', 'determiner5');

      //very common-but-ambiguous lastnames
      firstName
        .match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)')
        .tag('#Person', 'firstname-maybe');

      //John Foo
      firstName
        .match('#FirstName #TitleCase #TitleCase?')
        .match('#Noun+')
        .tag('Person', 'firstname-titlecase');
      //Joe K. Sombrero
      firstName
        .match('#FirstName #Acronym #Noun')
        .ifNo('#Date')
        .tag('#Person', 'n-acro-noun')
        .lastTerm()
        .tag('#LastName', 'n-acro-noun');

      // Dwayne 'the rock' Johnson
      firstName
        .match('#FirstName [#Determiner #Noun] #LastName')
        .tag('#NickName', 'first-noun-last')
        .tag('#Person', 'first-noun-last');

      //john bodego's
      firstName
        .match('#FirstName (#Singular|#Possessive)')
        .ifNo('#Date')
        .ifNo('#NickName')
        .tag('#Person', 'first-possessive')
        .lastTerm()
        .tag('#LastName', 'first-possessive');

      // Firstname x (dangerous)
      let tmp = firstName
        .match('#FirstName (#Noun|#TitleCase)')
        .ifNo('^#Possessive')
        .ifNo('#ClauseEnd .')
        .ifNo('#Pronoun');
      tmp.lastTerm().tag('#LastName', 'firstname-noun');
    }

    let lastName = person.if('#LastName');
    if (lastName === true) {
      //is foo Smith
      lastName.match('#Copula [(#Noun|#PresentTense)] #LastName').tag('#FirstName', 'copula-noun-lastname');
      // x Lastname
      lastName
        .match('[#Noun] #LastName')
        .canBe('#FirstName')
        .tag('#FirstName', 'noun-lastname');
      //ambiguous-but-common firstnames
      lastName
        .match(
          '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName'
        )
        .tag('#FirstName', 'maybe-lastname');

      //Jani K. Smith
      lastName
        .match('#TitleCase #Acronym? #LastName')
        .ifNo('#Date')
        .tag('#Person', 'title-acro-noun')
        .lastTerm()
        .tag('#LastName', 'title-acro-noun');
    }
  }

  return doc
};
var fixPerson_1 = fixPerson;

const advb = '(#Adverb|not)+?';
//
const fixVerb = function(doc) {
  let vb = doc.if('#Verb');
  if (vb.found) {
    //still make
    vb.match('[still] #Verb').tag('Adverb', 'still-verb');
    //'u' as pronoun
    vb.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1');
    //is no walk
    vb.match('is no [#Verb]').tag('Noun', 'is-no-verb');
    //different views than
    vb.match('[#Verb] than').tag('Noun', 'correction');
    //her polling
    vb.match('#Possessive [#Verb]').tag('Noun', 'correction-possessive');
    //there are reasons
    vb.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are');
    //jack seems guarded
    vb.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled');
    //fall over
    vb.match('#PhrasalVerb [#PhrasalVerb]').tag('Particle', 'phrasal-particle');
    //went to sleep
    // vb.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
    //been walking
    vb.match(`(be|been) ${advb} #Gerund`)
      .not('#Verb$')
      .tag('Auxiliary', 'be-walking');

    //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
    // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');

    let modal = vb.if('(#Modal|did|had|has)');
    if (modal.found === true) {
      //support a splattering of auxillaries before a verb
      modal
        .match(`(has|had) ${advb} #PastTense`)
        .not('#Verb$')
        .tag('Auxiliary', 'had-walked');
      //would walk
      modal
        .match(`(#Modal|did) ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'modal-verb');
      //would have had
      modal
        .match(`#Modal ${advb} have ${advb} had ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'would-have');
      //would be walking
      modal
        .match(`#Modal ${advb} be ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'would-be');
      //would been walking
      modal
        .match(`(#Modal|had|has) ${advb} been ${advb} #Verb`)
        .not('#Verb$')
        .tag('Auxiliary', 'would-be');
    }

    let copula = vb.if('#Copula');
    if (copula.found === true) {
      //was walking
      copula
        .match(`#Copula ${advb} #Gerund`)
        .not('#Verb$')
        .tag('Auxiliary', 'copula-walking');
      //is mark hughes
      copula.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun');
      //
      copula.match('[#Infinitive] #Copula').tag('Noun', 'inf-copula');
      //sometimes not-adverbs
      copula.match('#Copula [(just|alone)]$').tag('Adjective', 'not-adverb');
      //jack is guarded
      copula.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled');
      //is eager to go
      copula
        .match('#Copula #Adjective to #Verb')
        .match('#Adjective to')
        .tag('Verb', 'correction');

      //sometimes adverbs - 'pretty good','well above'
      copula
        .match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)')
        .ifNo('#Comma')
        .tag('#Copula #Adverb #Adjective', 'sometimes-adverb');
    }

    //Gerund - 'walking'
    let gerund = vb.if('#Gerund');
    if (gerund.found === true) {
      //walking is cool
      gerund
        .match('#Gerund #Adverb? not? #Copula')
        .firstTerm()
        .tag('Activity', 'gerund-copula');
      //walking should be fun
      gerund
        .match('#Gerund #Modal')
        .firstTerm()
        .tag('Activity', 'gerund-modal');
      //running-a-show
      gerund.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show');
      //setting records
      // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
    }

    //'will be'
    let willBe = vb.if('will #Adverb? not? #Adverb? be');
    if (willBe.found === true) {
      //will be running (not copula
      if (willBe.has('will #Adverb? not? #Adverb? be #Gerund') === false) {
        //tag it all
        willBe.match('will not? be').tag('Copula', 'will-be-copula');
        //for more complex forms, just tag 'be'
        willBe
          .match('will #Adverb? not? #Adverb? be #Adjective')
          .match('be')
          .tag('Copula', 'be-copula');
      }
    }
  }

  //question words
  let m = doc.if('(who|what|where|why|how|when)');
  if (m.found) {
    //the word 'how'
    m.match('^how').tag('QuestionWord', 'how-question');
    m.match('[how] (#Determiner|#Copula|#Modal|#PastTense)').tag('QuestionWord', 'how-is');
    // //the word 'which'
    m.match('^which').tag('QuestionWord', 'which-question');
    m.match('[which] . (#Noun)+ #Pronoun').tag('QuestionWord', 'which-question2');
    m.match('which').tag('QuestionWord', 'which-question3');

    //how he is driving
    m.match('[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)')
      .unTag('QuestionWord')
      .tag('Conjunction', 'how-he-is-x');

    //when i go fishing
    m.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund')
      .unTag('QuestionWord')
      .tag('Conjunction', 'when i go fishing');
  }

  return doc
};
var fixVerb_1 = fixVerb;

//
const fixAdjective = function(doc) {
  let adj = doc.if('#Adjective');
  if (adj.found) {
    //still good
    adj.match('[still] #Adjective').tag('Adverb', 'still-advb');
    //barely even walk
    adj.match('(barely|hardly) even').tag('#Adverb', 'barely-even');
    //big dreams, critical thinking
    adj.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense');
    //will secure our
    adj.match('will [#Adjective]').tag('Verb', 'will-adj');
    //cheering hard - dropped -ly's
    adj.match('#PresentTense [(hard|quick|long|bright|slow)]').tag('Adverb', 'lazy-ly');
    //his fine
    adj.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine');
    //he left
    adj.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb');
  }
  return doc
};
var fixAdjective_1 = fixAdjective;

//
const fixValue = function(doc) {
  //canadian dollar, Brazilian pesos
  doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency');

  let val = doc.if('#Value');
  if (val.found === true) {
    //half a million
    val.match('half a? #Value').tag('Value', 'half-a-value'); //(quarter not ready)
    //five and a half
    val.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
    //one hundred and seven dollars
    val.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');
    //1 800 PhoneNumber
    val.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value');
    //(454) 232-9873
    val.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber');
    //three trains
    val.match('#Value [#PresentTense]').tag('Plural', 'value-presentTense');
    //all values are either ordinal or cardinal
    // doc.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');
    //money
    val
      .match('#Value+ #Currency')
      .tag('Money', 'value-currency')
      .lastTerm()
      .tag('Unit', 'money-unit');

    //two hundredth
    val
      .match('#TextValue+')
      .match('#Cardinal+ #Ordinal')
      .tag('Ordinal', 'two-hundredth');
  }
  return doc
};
var fixValue_1 = fixValue;

//ambiguous 'may' and 'march'
const preps = '(in|by|before|during|on|until|after|of|within|all)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
const seasons = '(spring|summer|winter|fall|autumn)';
const people = '(january|april|may|june|summer|autumn|jan|sep)';
const verbs$3 = '(may|march)';
const units = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)';

//ensure a year is approximately typical for common years
//please change in one thousand years
const tagYear = (m, reason) => {
  if (m.found !== true) {
    return
  }
  let term = m.termList()[0];
  if (term) {
    let num = parseInt(term.clean, 10);
    if (num && num > 1000 && num < 3000) {
      m.tag('Year', reason);
    }
  }
};
//same, but for less-confident values
const tagYearSafe = (m, reason) => {
  if (m.found !== true) {
    return
  }
  let term = m.termList()[0];
  if (term) {
    let num = parseInt(term.clean, 10);
    if (num && num > 1900 && num < 2030) {
      m.tag('Year', reason);
    }
  }
};

const fixDates = function(doc) {
  doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');

  //ambiguous month - person forms
  let person = doc.if(people);
  if (person.found === true) {
    //give to april
    person.match(`#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${people}]`).tag('Person', 'ambig-person');
    //remind june
    person.match(`#Infinitive [${people}]`).tag('Person', 'infinitive-person');
    //may waits for
    person.match(`[${people}] #PresentTense (to|for)`).tag('Person', 'ambig-active');
    //april will
    person.match(`[${people}] #Modal`).tag('Person', 'ambig-modal');
    //would april
    person.match(`#Modal [${people}]`).tag('Person', 'modal-ambig');
    //with april
    person.match(`(that|with|for) [${people}]`).tag('Person', 'that-month');
    //it is may
    person.match(`#Copula [${people}]`).tag('Person', 'is-may');
    //may is
    person.match(`[${people}] #Copula`).tag('Person', 'may-is');
    //april the 5th
    person.match(`[${people}] the? #Value`).tag('Month', 'person-value');
    //wednesday april
    person.match(`#Date [${people}]`).tag('Month', 'correction-may');
    //may 5th
    person.match(`[${people}] the? #Value`).tag('Month', 'may-5th');
    //5th of may
    person.match(`#Value of [${people}]`).tag('Month', '5th-of-may');
    //by april
    person
      .match(`${preps} ${people}`)
      .ifNo('#Holiday')
      .terms(1)
      .tag('Month', 'preps-month');
    //this april
    person.match(`(next|this|last) [${people}]`).tag('Month', 'correction-may'); //maybe not 'this'
  }

  //ambiguous month - verb-forms
  let verb = doc.if(verbs$3);
  if (verb.found === true) {
    //quickly march
    verb
      .match(`#Adverb ${verbs$3}`)
      .lastTerm()
      .tag('Infinitive', 'ambig-verb');
    verb
      .match(`${verbs$3} #Adverb`)
      .lastTerm()
      .tag('Infinitive', 'ambig-verb');
    //all march
    verb
      .match(`${preps} ${verbs$3}`)
      .lastTerm()
      .tag('Month', 'in-month');
    //this march
    verb
      .match(`(next|this|last) ${verbs$3}`)
      .lastTerm()
      .tag('Month', 'this-month');
    //with date
    verb
      .match(`${verbs$3} the? #Value`)
      .firstTerm()
      .tag('Month', 'march-5th');
    verb
      .match(`#Value of? ${verbs$3}`)
      .lastTerm()
      .tag('Month', '5th-of-march');
    //nearby
    verb
      .match(`[${verbs$3}] .? #Date`)
      .lastTerm()
      .tag('Month', 'march-and-feb');
    verb
      .match(`#Date .? [${verbs$3}]`)
      .lastTerm()
      .tag('Month', 'feb-and-march');

    let march = doc.if('march');
    if (march.found === true) {
      //march to
      march.match('[march] (up|down|back|to|toward)').tag('Infinitive', 'march-to');
      //must march
      march.match('#Modal [march]').tag('Infinitive', 'must-march');
    }
  }
  //sun 5th
  let sun = doc.if('sun');
  if (sun.found === true) {
    //sun feb 2
    sun.match('[sun] #Date').tag('WeekDay', 'sun-feb');
    //sun the 5th
    sun
      .match('sun the #Ordinal')
      .tag('Date')
      .firstTerm()
      .tag('WeekDay', 'sun-the-5th');
    //the sun
    sun.match('#Determiner [sun]').tag('Singular', 'the-sun');
  }

  //sat, nov 5th
  let sat = doc.if('sat');
  if (sat.found) {
    //sat november
    sat.match('[sat] #Date').tag('WeekDay', 'sat-feb');
    //this sat
    sat.match(`${preps} [sat]`).tag('WeekDay', 'sat');
  }

  //months:
  let month = doc.if('#Month');
  if (month.found === true) {
    //June 5-7th
    month.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange');
    //5th of March
    month.match('#Value of #Month').tag('Date', 'value-of-month');
    //5 March
    month.match('#Cardinal #Month').tag('Date', 'cardinal-month');
    //march 5 to 7
    month.match('#Month #Value to #Value').tag('Date', 'value-to-value');
    //march the 12th
    month.match('#Month the #Value').tag('Date', 'month-the-value');
  }

  //months:
  let val = doc.if('#Value');
  if (val.found === true) {
    //values
    val.match('#Value #Abbreviation').tag('Value', 'value-abbr');
    //seven point five
    val.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value');
    //minus 7
    val.match('(minus|negative) #Value').tag('Value', 'minus-value');
    // ten grand
    val.match('#Value grand').tag('Value', 'value-grand');
    //quarter million
    val.match('(a|the) [(half|quarter)] #Ordinal').tag('Value', 'half-ordinal');
    //june 7
    val
      .match('(#WeekDay|#Month) #Value')
      .ifNo('#Money')
      .tag('Date', 'date-value');

    //7 june
    val
      .match('#Value (#WeekDay|#Month)')
      .ifNo('#Money')
      .tag('Date', 'value-date');

    //may twenty five
    val
      .match('#TextValue #TextValue')
      .if('#Date')
      .tag('#Date', 'textvalue-date');

    //eg 'year'
    let duration = val.if('#Duration');
    if (duration.found === true) {
      //for 4 months
      duration.match('for #Value #Duration').tag('Date', 'for-x-duration');
      //two days before
      duration.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');
      //for four days
      duration.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');
      //two years old
      duration.match('#Value #Duration old').unTag('Date', 'val-years-old');
    }
    //eg 'trillion'
    let mult = val.if(units);
    if (mult.found === true) {
      mult.match('a #Value').tag('Value', 'a-value');
      // mult.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
      mult.match(`${units} and #Value`).tag('Value', 'magnitude-and-value');
    }
  }

  //seasons
  let season = doc.if(seasons);
  if (season.found === true) {
    season.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season');
    season.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season');
    season.match(`${seasons} ${preps}? #Cardinal`).tag('Date', 'season-year');
  }

  //rest-dates
  let date = doc.if('#Date');
  if (date.found === true) {
    //june the 5th
    date.match('#Date the? #Ordinal').tag('Date', 'correction');
    //last month
    date.match(`${thisNext} #Date`).tag('Date', 'thisNext');
    //by 5 March
    date.match('due? (by|before|after|until) #Date').tag('Date', 'by');
    //next feb
    date.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
    //start of june
    date.match(`the? ${sections} of #Date`).tag('Date', 'section-of');
    //fifth week in 1998
    date.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in');
    //early in june
    date.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening');
    //tomorrow before 3
    date
      .match('#Date (by|before|after|at|@|about) #Cardinal')
      .not('^#Date')
      .tag('Time', 'date-before-Cardinal');
    //saturday am
    date
      .match('#Date [(am|pm)]')
      .unTag('Verb')
      .unTag('Copula')
      .tag('Time', 'date-am');
    //feb to june
    date
      .match('#Date (#Preposition|to) #Date')
      .ifNo('#Duration')
      .tag('Date', 'date-prep-date');
  }

  //year/cardinal tagging
  let cardinal = doc.if('#Cardinal');
  if (cardinal.found === true) {
    let v = cardinal.match(`#Date #Value [#Cardinal]`);
    tagYear(v, 'date-value-year');
    //scoops up a bunch
    v = cardinal.match(`#Date+ [#Cardinal]`);
    tagYear(v, 'date-year');
    //feb 8 2018
    v = cardinal.match(`#Month #Value [#Cardinal]`);
    tagYear(v, 'month-value-year');
    //feb 8 to 10th 2018
    v = cardinal.match(`#Month #Value to #Value [#Cardinal]`);
    tagYear(v, 'month-range-year');
    //in 1998
    v = cardinal.match(`(in|of|by|during|before|starting|ending|for|year) [#Cardinal]`);
    tagYear(v, 'in-year');
    //q2 2009
    v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]');
    tagYear(v, 'in-year');
    //2nd quarter 2009
    v = cardinal.match('#Ordinal quarter [#Cardinal]');
    tagYear(v, 'in-year');
    //in the year 1998
    v = cardinal.match('the year [#Cardinal]');
    tagYear(v, 'in-year');
    //it was 1998
    v = cardinal.match('it (is|was) [#Cardinal]');
    tagYearSafe(v, 'in-year');
    //was 1998 and...
    v = cardinal.match(`[#Cardinal] !#Plural`);
    tagYearSafe(v, 'year-unsafe');
  }

  let time = doc.if('#Time');
  if (time.found === true) {
    //by 6pm
    time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
    //7 7pm
    time
      .match('#Cardinal #Time')
      .not('#Year')
      .tag('Time', 'value-time');
    //2pm est
    time.match('#Time [(eastern|pacific|central|mountain)]').tag('Time', 'timezone');
    //6pm est
    time.match('#Time [(est|pst|gmt)]').tag('Time', 'timezone abbr');
  }

  return doc
};
var fixDates_1 = fixDates;

// det: 131.338ms
// verb: 100.828ms
// dates: 80.874ms
// person: 66.054ms
// nouns: 51.340ms
// adj: 19.760ms
// value: 12.950ms
// misc: 43.359ms

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  // console.time('det')
  fixThe_1(doc);
  // console.timeEnd('det')

  // console.time('nouns')
  fixNouns_1(doc);
  // console.timeEnd('nouns')

  // console.time('person')
  fixPerson_1(doc);
  // console.timeEnd('person')

  // console.time('verb')
  fixVerb_1(doc);
  // console.timeEnd('verb')

  // console.time('adj')
  fixAdjective_1(doc);
  // console.timeEnd('adj')

  // console.time('value')
  fixValue_1(doc);
  // console.timeEnd('value')

  // console.time('dates')
  fixDates_1(doc);
  // console.timeEnd('dates')

  // console.time('misc')
  fixMisc(doc);
  // console.timeEnd('misc')
  return doc
};
var _05Correction = corrections;

/** POS-tag all terms in this document */
const tagger = function(doc) {
  let terms = doc.termList();
  // console.time('init')
  // check against any known-words
  doc = _01Init(doc);
  // console.timeEnd('init')

  // everything has gotta be something. ¯\_(:/)_/¯
  // console.time('fallbacks')
  doc = _02Fallbacks(doc);
  // console.timeEnd('fallbacks')

  // support "didn't" & "spencer's"
  // console.time('contractions')
  doc = _03Contractions(doc);
  // console.timeEnd('contractions')

  // deduce more specific tags - singular/plurals/quotations...
  // console.time('inference')
  doc = _04Inference(doc);
  // console.timeEnd('inference')

  //set our cache, to speed things up
  // doc.cache()

  // wiggle-around the results, so they make more sense
  // console.time('corrections')
  doc = _05Correction(doc);
  // console.timeEnd('corrections')

  //remove our cache?
  // doc.unfreeze()
  return doc
};
var _02Tagger = tagger;

const addMethod = function(Doc) {
  /**  */
  class Acronyms extends Doc {
    // stripPeriods() {//TODO:finish
    //   return this
    // }
    // addPeriods() {
    //   return this
    // }
  }

  Doc.prototype.acronyms = function(n) {
    let match = this.match('#Acronym');
    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new Acronyms(match.list, this, this.world)
  };
  return Doc
};
var acronyms = addMethod;

const addMethod$1 = function(Doc) {
  /**  */
  class Contractions extends Doc {
    constructor(list, from, world) {
      super(list, from, world);
      this.contracted = null;
    }
    /** turn didn't into 'did not' */
    expand() {
      this.list.forEach(p => {
        let terms = p.terms();
        //change the case?
        let isTitlecase = terms[0].isTitleCase();

        terms.forEach((t, i) => {
          //use the implicit text
          // console.log(t.clean)
          t.set(t.implicit || t.text);
          t.implicit = undefined;

          //add whitespace
          if (i < terms.length - 1) {
            t.post += ' ';
          }
        });
        //set titlecase
        if (isTitlecase) {
          terms[0].toTitleCase();
        }
      });
      return this
    }
  }

  //find contractable, expanded-contractions
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }

  Doc.prototype.contractions = function(n) {
    //find currently-contracted
    let found = this.match('@hasContraction+');
    //todo: split consecutive contractions
    if (typeof n === 'number') {
      found = found.get(n);
    }
    return new Contractions(found.list, this, this.world)
  };

  //aliases
  Doc.prototype.expanded = Doc.prototype.isExpanded;
  Doc.prototype.contracted = Doc.prototype.isContracted;
  return Doc
};
var contractions$1 = addMethod$1;

const open = /\(/;
const close = /\)/;

const addMethod$2 = function(Doc) {
  /** anything between (these things) */
  class Parentheses extends Doc {
    /** remove the parentheses characters */
    unwrap() {
      this.list.forEach(p => {
        let first = p.terms(0);
        first.pre = first.pre.replace(open, '');
        let last = p.lastTerm();
        last.post = last.post.replace(close, '');
      });
      return this
    }
  }

  Doc.prototype.parentheses = function(n) {
    let list = [];
    this.list.forEach(p => {
      let terms = p.terms();
      //look for opening brackets
      for (let i = 0; i < terms.length; i += 1) {
        const t = terms[i];
        if (open.test(t.pre)) {
          //look for the closing bracket..
          for (let o = i; o < terms.length; o += 1) {
            if (close.test(terms[o].post)) {
              let len = o - i + 1;
              list.push(p.buildFrom(t.id, len));
              i = o;
              break
            }
          }
        }
      }
    });
    //support nth result
    if (typeof n === 'number') {
      if (list[n]) {
        list = [list[n]];
      } else {
        list = [];
      }
      return new Parentheses(list, this, this.world)
    }
    return new Parentheses(list, this, this.world)
  };

  return Doc
};
var parentheses = addMethod$2;

const addMethod$3 = function(Doc) {
  /**  */
  class Possessives extends Doc {
    constructor(list, from, world) {
      super(list, from, world);
      this.contracted = null;
    }
    /** turn didn't into 'did not' */
    strip() {
      this.list.forEach(p => {
        let terms = p.terms();
        terms.forEach(t => {
          let str = t.text.replace(/'s$/, '');
          t.set(str || t.text);
        });
      });
      return this
    }
  }

  //find contractable, expanded-contractions
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }

  Doc.prototype.possessives = function(n) {
    //find currently-contracted
    let found = this.match('#Possessive');
    //todo: split consecutive contractions
    if (typeof n === 'number') {
      found = found.get(n);
    }
    return new Possessives(found.list, this, this.world)
  };
  return Doc
};
var possessives = addMethod$3;

const addMethod$4 = function(Doc) {
  //pull it apart..
  const parse = function(doc) {
    let things = doc.splitAfter('@hasComma').not('(and|or) not?');
    let beforeLast = doc.match('[.] (and|or)');
    return {
      things: things,
      conjunction: doc.match('(and|or) not?'),
      beforeLast: beforeLast,
      hasOxford: beforeLast.has('@hasComma'),
    }
  };

  /** cool, fun, and nice */
  class Lists extends Doc {
    /** coordinating conjunction */
    conjunctions() {
      return this.match('(and|or)')
    }
    /** remove conjunctions */
    things() {
      let arr = [];
      this.forEach(p => {
        let things = parse(p).things;
        arr = arr.concat(things.list);
      });
      return this.buildFrom(arr)
    }
    /** add a new unit to the list */
    add(str) {
      this.forEach(p => {
        let beforeLast = parse(p).beforeLast;
        //add a comma to it
        beforeLast.termList(0).addPunctuation(',');
        beforeLast.append(str);
      });
      return this
    }
    /** remove any matching unit from the list */
    remove(str) {
      return this
    }

    /** return only lists that use a serial comma */
    hasOxfordComma() {
      return this.filter(doc => parse(doc).hasOxford)
    }
    addOxfordComma() {
      return this
    }
    removeOxfordComma() {
      return this
    }
  }

  Doc.prototype.lists = function(n) {
    let match = this.match('@hasComma+ .? (and|or) not? .'); // '... and Don Smith'?
    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new Lists(match.list, this, this.world)
  };
  return Doc
};
var lists = addMethod$4;

const selections$1 = [
  acronyms,
  contractions$1,
  parentheses,
  possessives,
  lists,
];

const extend = function(Doc) {
  selections$1.forEach(addFn => addFn(Doc));
  return Doc
};
var Subset = extend;

const methods$5 = {
  misc: methods$3,
  selections: selections,
};



/** a parsed text object */
class Doc {
  constructor(list, from, world) {
    this.list = list;
    //quiet these properties in console.logs
    Object.defineProperty(this, 'from', {
      enumerable: false,
      value: from,
      writable: true,
    });
    //borrow some missing data from parent
    if (world === undefined && from !== undefined) {
      world = from.world;
    }
    //'world' getter
    Object.defineProperty(this, 'world', {
      enumerable: false,
      value: world,
      // writable: true, //todo: add me?
    });
    //fast-scans for our data

    //'found' getter
    Object.defineProperty(this, 'found', {
      get: () => this.list.length > 0,
    });
    //'length' getter
    Object.defineProperty(this, 'length', {
      get: () => this.list.length,
    });
    // this is way easier than .constructor.name...
    Object.defineProperty(this, 'isA', {
      get: () => 'Doc',
    });
  }

  /** run part-of-speech tagger on all results*/
  tagger() {
    return _02Tagger(this)
  }

  /** pool is stored on phrase objects */
  pool() {
    if (this.list.length > 0) {
      return this.list[0].pool
    }
    return this.all().list[0].pool
  }
}

/** create a new Document object */
Doc.prototype.buildFrom = function(list) {
  let doc = new Doc(list, this, this.world);
  return doc
};
/** add new subclass methods */
Doc.prototype.extend = function(fn) {
  fn(this);
  return this
};

Object.assign(Doc.prototype, methods$5.misc);
Object.assign(Doc.prototype, methods$5.selections);

//add sub-classes
Subset(Doc);

//aliases
const aliases$1 = {
  untag: 'unTag',
  and: 'match',
  notIf: 'ifNo',
  only: 'if',
  onlyIf: 'if',
};
Object.keys(aliases$1).forEach(k => (Doc.prototype[k] = Doc.prototype[aliases$1[k]]));
var Doc_1 = Doc;

//blast-out our word-lists, just once
let world = new World_1();

/** parse and tag text into a compromise object  */
const nlp = function(text = '', lexicon) {
  if (lexicon) {
    world.addWords(lexicon);
  }
  let list = _01Tokenizer.fromText(text, world);
  let doc = new Doc_1(list, null, world);
  doc.tagger();
  return doc
};

/** parse text into a compromise object, without running POS-tagging */
nlp.tokenize = function(text = '', lexicon) {
  if (lexicon) {
    world.addWords(lexicon);
  }
  let list = _01Tokenizer.fromText(text, world);
  let doc = new Doc_1(list, null, world);
  return doc
};

/** mix in a compromise-plugin */
nlp.extend = function(fn) {
  fn(Doc_1);
};

/** make a deep-copy of the library state */
nlp.clone = function() {
  world = world.clone();
  return this
};

/** re-generate a Doc object from .json() results */
nlp.fromJSON = function(json) {
  let list = _01Tokenizer.fromJSON(json);
  return new Doc_1(list, null, world)
};

/** log our decision-making for debugging */
nlp.verbose = function(bool = true) {
  world.verbose(bool);
};

/** current version of the library */
nlp.version = _version;

var src = nlp;

export default src;

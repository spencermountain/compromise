/* compromise 13.11.2 MIT */
//this is a not-well-thought-out way to reduce our dependence on `object===object` stuff
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''); //generates a unique id for this term

function makeId(str) {
  str = str || '_';
  let text = str + '-';

  for (let i = 0; i < 7; i++) {
    text += chars[Math.floor(Math.random() * chars.length)];
  }

  return text;
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
  z: 'ŹźŻżŽžƩƵƶȤȥɀΖζ'
}; //decompress data into two hashes

let unicode = {};
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
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
  return chars.join('');
};

var unicode_1 = killUnicode; // console.log(killUnicode('bjŏȒk—Ɏó'));

const periodAcronym = /([A-Z]\.)+[A-Z]?,?$/;
const oneLetterAcronym = /^[A-Z]\.,?$/;
const noPeriodAcronym = /[A-Z]{2,}('s|,)?$/;
const lowerCaseAcronym = /([a-z]\.)+[a-z]\.?$/;

const isAcronym$1 = function (str) {
  //like N.D.A
  if (periodAcronym.test(str) === true) {
    return true;
  } //like c.e.o


  if (lowerCaseAcronym.test(str) === true) {
    return true;
  } //like 'F.'


  if (oneLetterAcronym.test(str) === true) {
    return true;
  } //like NDA


  if (noPeriodAcronym.test(str) === true) {
    return true;
  }

  return false;
};

var isAcronym_1$1 = isAcronym$1;

const hasSlash$1 = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/;
/** some basic operations on a string to reduce noise */

const clean = function (str) {
  str = str || '';
  str = str.toLowerCase();
  str = str.trim();
  let original = str; //(very) rough ASCII transliteration -  bjŏrk -> bjork

  str = unicode_1(str); //rough handling of slashes - 'see/saw'

  if (hasSlash$1.test(str) === true) {
    str = str.replace(/\/.*/, '');
  } //#tags, @mentions


  str = str.replace(/^[#@]/, ''); //punctuation

  str = str.replace(/[,;.!?]+$/, ''); // coerce single curly quotes

  str = str.replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'"); // coerce double curly quotes

  str = str.replace(/[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g, '"'); //coerce Unicode ellipses

  str = str.replace(/\u2026/g, '...'); //en-dash

  str = str.replace(/\u2013/g, '-'); //lookin'->looking (make it easier for conjugation)

  str = str.replace(/([aeiou][ktrp])in$/, '$1ing'); //turn re-enactment to reenactment

  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    str = str.replace('-', '');
  } //compact acronyms


  if (isAcronym_1$1(str)) {
    str = str.replace(/\./g, '');
  } //strip leading & trailing grammatical punctuation


  if (/^[:;]/.test(str) === false) {
    str = str.replace(/\.{3,}$/g, '');
    str = str.replace(/[",\.!:;\?\)]+$/g, '');
    str = str.replace(/^['"\(]+/g, '');
  } // remove zero-width characters


  str = str.replace(/[\u200B-\u200D\uFEFF]/g, ''); //do this again..

  str = str.trim(); //oh shucks,

  if (str === '') {
    str = original;
  } //nice-numbers


  str = str.replace(/([0-9]),([0-9])/g, '$1$2');
  return str;
};

var clean_1 = clean; // console.log(normalize('Dr. V Cooper'));

/** reduced is one step further than clean */
const reduced = function (str) {
  // remove apostrophes
  str = str.replace(/['’]s$/, '');
  str = str.replace(/s['’]$/, 's');
  return str;
};

var reduce = reduced;

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.

const startings = /^[ \n\t\.\[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;\/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~\|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/;
const endings = /[ \n\t\.'\[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;\/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~\|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/; //money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥

const hasSlash = /\//;
const hasApostrophe = /['’]/;
const hasAcronym = /^[a-z]\.([a-z]\.)+/i;
const minusNumber = /^[-+\.][0-9]/;
const shortYear = /^'[0-9]{2}/;
/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */

const parseTerm = str => {
  let original = str;
  let pre = '';
  let post = '';
  str = str.replace(startings, found => {
    pre = found; // support '-40'

    if ((pre === '-' || pre === '+' || pre === '.') && minusNumber.test(str)) {
      pre = '';
      return found;
    } // support years like '97


    if (pre === `'` && shortYear.test(str)) {
      pre = '';
      return found;
    }

    return '';
  });
  str = str.replace(endings, found => {
    post = found; // keep s-apostrophe - "flanders'" or "chillin'"

    if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
      post = post.replace(hasApostrophe, '');
      return `'`;
    } //keep end-period in acronym


    if (hasAcronym.test(str) === true) {
      post = post.replace(/\./, '');
      return '.';
    }

    return '';
  }); //we went too far..

  if (str === '') {
    // do a very mild parse, and hope for the best.
    original = original.replace(/ *$/, after => {
      post = after || '';
      return '';
    });
    str = original;
    pre = '';
    post = post;
  } // create the various forms of our text,


  let clean = clean_1(str);
  const parsed = {
    text: str,
    clean: clean,
    reduced: reduce(clean),
    pre: pre,
    post: post
  }; // support aliases for slashes

  if (hasSlash.test(str)) {
    str.split(hasSlash).forEach(word => {
      parsed.alias = parsed.alias || {};
      parsed.alias[word.trim()] = true;
    });
  }

  return parsed;
};

var parse$2 = parseTerm;

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var _01Case = createCommonjsModule(function (module, exports) {
  const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;
  const upperCase = /^[A-Z]+s?$/;
  /** convert all text to uppercase */

  exports.toUpperCase = function () {
    this.text = this.text.toUpperCase();
    return this;
  };
  /** convert all text to lowercase */


  exports.toLowerCase = function () {
    this.text = this.text.toLowerCase();
    return this;
  };
  /** only set the first letter to uppercase
   * leave any existing uppercase alone
   */


  exports.toTitleCase = function () {
    this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()); //support unicode?

    return this;
  };
  /** if all letters are uppercase */


  exports.isUpperCase = function () {
    return upperCase.test(this.text);
  };
  /** if the first letter is uppercase, and the rest are lowercase */


  exports.isTitleCase = function () {
    return titleCase.test(this.text);
  };

  exports.titleCase = exports.isTitleCase;
});

var _02Punctuation = createCommonjsModule(function (module, exports) {
  // these methods are called with '@hasComma' in the match syntax
  // various unicode quotation-mark formats
  const startQuote = /(\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)/;
  const endQuote = /(\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E)/;
  /** search the term's 'post' punctuation  */

  exports.hasPost = function (punct) {
    return this.post.indexOf(punct) !== -1;
  };
  /** search the term's 'pre' punctuation  */


  exports.hasPre = function (punct) {
    return this.pre.indexOf(punct) !== -1;
  };
  /** does it have a quotation symbol?  */


  exports.hasQuote = function () {
    return startQuote.test(this.pre) || endQuote.test(this.post);
  };

  exports.hasQuotation = exports.hasQuote;
  /** does it have a comma?  */

  exports.hasComma = function () {
    return this.hasPost(',');
  };
  /** does it end in a period? */


  exports.hasPeriod = function () {
    return this.hasPost('.') === true && this.hasPost('...') === false;
  };
  /** does it end in an exclamation */


  exports.hasExclamation = function () {
    return this.hasPost('!');
  };
  /** does it end with a question mark? */


  exports.hasQuestionMark = function () {
    return this.hasPost('?') || this.hasPost('¿');
  };
  /** is there a ... at the end? */


  exports.hasEllipses = function () {
    return this.hasPost('..') || this.hasPost('…') || this.hasPre('..') || this.hasPre('…');
  };
  /** is there a semicolon after this word? */


  exports.hasSemicolon = function () {
    return this.hasPost(';');
  };
  /** is there a slash '/' in this word? */


  exports.hasSlash = function () {
    return /\//.test(this.text);
  };
  /** a hyphen connects two words like-this */


  exports.hasHyphen = function () {
    const hyphen = /^(-|–|—)$/;
    return hyphen.test(this.post) || hyphen.test(this.pre);
  };
  /** a dash separates words - like that */


  exports.hasDash = function () {
    const hyphen = / (-|–|—) /;
    return hyphen.test(this.post) || hyphen.test(this.pre);
  };
  /** is it multiple words combinded */


  exports.hasContraction = function () {
    return Boolean(this.implicit);
  };
  /** try to sensibly put this punctuation mark into the term */


  exports.addPunctuation = function (punct) {
    // dont add doubles
    if (punct === ',' || punct === ';') {
      this.post = this.post.replace(punct, '');
    }

    this.post = punct + this.post;
    return this;
  };
});

// fuzzy-match (damerau-levenshtein)
// Based on  tad-lispy /node-damerau-levenshtein
// https://github.com/tad-lispy/node-damerau-levenshtein/blob/master/index.js
// count steps (insertions, deletions, substitutions, or transpositions)
const editDistance = function (strA, strB) {
  let aLength = strA.length,
      bLength = strB.length; // fail-fast

  if (aLength === 0) {
    return bLength;
  }

  if (bLength === 0) {
    return aLength;
  } // If the limit is not defined it will be calculate from this and that args.


  let limit = (bLength > aLength ? bLength : aLength) + 1;

  if (Math.abs(aLength - bLength) > (limit || 100)) {
    return limit || 100;
  } // init the array


  let matrix = [];

  for (let i = 0; i < limit; i++) {
    matrix[i] = [i];
    matrix[i].length = limit;
  }

  for (let i = 0; i < limit; i++) {
    matrix[0][i] = i;
  } // Calculate matrix.


  let j, a_index, b_index, cost, min, t;

  for (let i = 1; i <= aLength; ++i) {
    a_index = strA[i - 1];

    for (j = 1; j <= bLength; ++j) {
      // Check the jagged distance total so far
      if (i === j && matrix[i][j] > 4) {
        return aLength;
      }

      b_index = strB[j - 1];
      cost = a_index === b_index ? 0 : 1; // Step 5
      // Calculate the minimum (much faster than Math.min(...)).

      min = matrix[i - 1][j] + 1; // Deletion.

      if ((t = matrix[i][j - 1] + 1) < min) min = t; // Insertion.

      if ((t = matrix[i - 1][j - 1] + cost) < min) min = t; // Substitution.
      // Update matrix.

      let shouldUpdate = i > 1 && j > 1 && a_index === strB[j - 2] && strA[i - 2] === b_index && (t = matrix[i - 2][j - 2] + cost) < min;

      if (shouldUpdate) {
        matrix[i][j] = t;
      } else {
        matrix[i][j] = min;
      }
    }
  } // return number of steps


  return matrix[aLength][bLength];
}; // score similarity by from 0-1 (steps/length)


const fuzzyMatch = function (strA, strB, minLength = 3) {
  if (strA === strB) {
    return 1;
  } //don't even bother on tiny strings


  if (strA.length < minLength || strB.length < minLength) {
    return 0;
  }

  const steps = editDistance(strA, strB);
  let length = Math.max(strA.length, strB.length);
  let relative = length === 0 ? 0 : steps / length;
  let similarity = 1 - relative;
  return similarity;
};

var _fuzzy = fuzzyMatch; // console.log(fuzzyMatch('test', 'test')) //exact match

let wrapMatch = function () {};
/** ignore optional/greedy logic, straight-up term match*/


const doesMatch = function (t, reg, index, length) {
  // support id matches
  if (reg.id === t.id) {
    return true;
  } // support '.'


  if (reg.anything === true) {
    return true;
  } // support '^' (in parentheses)


  if (reg.start === true && index !== 0) {
    return false;
  } // support '$' (in parentheses)


  if (reg.end === true && index !== length - 1) {
    return false;
  } //support a text match


  if (reg.word !== undefined) {
    //match contractions
    if (t.implicit !== null && t.implicit === reg.word) {
      return true;
    } // term aliases for slashes and things


    if (t.alias !== undefined && t.alias.hasOwnProperty(reg.word)) {
      return true;
    } // support ~ match


    if (reg.soft === true && reg.word === t.root) {
      return true;
    } // support fuzzy match param


    if (reg.fuzzy !== undefined) {
      let score = _fuzzy(reg.word, t.reduced);

      if (score > reg.fuzzy) {
        return true;
      } // support fuzzy + soft match


      if (reg.soft === true) {
        score = _fuzzy(reg.word, t.root);

        if (score > reg.fuzzy) {
          return true;
        }
      }
    } //match either .clean or .text


    return reg.word === t.clean || reg.word === t.text || reg.word === t.reduced;
  } //support #Tag


  if (reg.tag !== undefined) {
    return t.tags[reg.tag] === true;
  } //support @method


  if (reg.method !== undefined) {
    if (typeof t[reg.method] === 'function' && t[reg.method]() === true) {
      return true;
    }

    return false;
  } //support /reg/


  if (reg.regex !== undefined) {
    return reg.regex.test(t.clean);
  } // support optimized (one|two)


  if (reg.fastOr !== undefined) {
    if (t.implicit && reg.fastOr.hasOwnProperty(t.implicit) === true) {
      return true;
    }

    return reg.fastOr.hasOwnProperty(t.reduced) || reg.fastOr.hasOwnProperty(t.text);
  } //support slower (one|two)


  if (reg.choices !== undefined) {
    // try to support && operator
    if (reg.operator === 'and') {
      // must match them all
      return reg.choices.every(r => wrapMatch(t, r, index, length));
    } // or must match one


    return reg.choices.some(r => wrapMatch(t, r, index, length));
  }

  return false;
}; // wrap result for !negative match logic


wrapMatch = function (t, reg, index, length) {
  let result = doesMatch(t, reg, index, length);

  if (reg.negative === true) {
    return !result;
  }

  return result;
};

var _doesMatch = wrapMatch;

const boring = {};
/** check a match object against this term */

var doesMatch_1 = function (reg, index, length) {
  return _doesMatch(this, reg, index, length);
};
/** does this term look like an acronym? */


var isAcronym_1 = function () {
  return isAcronym_1$1(this.text);
};
/** is this term implied by a contraction? */


var isImplicit = function () {
  return this.text === '' && Boolean(this.implicit);
};
/** does the term have at least one good tag? */


var isKnown = function () {
  return Object.keys(this.tags).some(t => boring[t] !== true);
};
/** cache the root property of the term */


var setRoot = function (world) {
  let transform = world.transforms;
  let str = this.implicit || this.clean;

  if (this.tags.Plural) {
    str = transform.toSingular(str, world);
  }

  if (this.tags.Verb && !this.tags.Negative && !this.tags.Infinitive) {
    let tense = null;

    if (this.tags.PastTense) {
      tense = 'PastTense';
    } else if (this.tags.Gerund) {
      tense = 'Gerund';
    } else if (this.tags.PresentTense) {
      tense = 'PresentTense';
    } else if (this.tags.Participle) {
      tense = 'Participle';
    } else if (this.tags.Actor) {
      tense = 'Actor';
    }

    str = transform.toInfinitive(str, world, tense);
  }

  this.root = str;
};

var _03Misc = {
  doesMatch: doesMatch_1,
  isAcronym: isAcronym_1,
  isImplicit: isImplicit,
  isKnown: isKnown,
  setRoot: setRoot
};

const hasSpace$1 = /[\s-]/;
const isUpperCase = /^[A-Z-]+$/; // const titleCase = str => {
//   return str.charAt(0).toUpperCase() + str.substr(1)
// }

/** return various text formats of this term */

var textOut = function (options, showPre, showPost) {
  options = options || {};
  let word = this.text;
  let before = this.pre;
  let after = this.post; // -word-

  if (options.reduced === true) {
    word = this.reduced || '';
  }

  if (options.root === true) {
    word = this.root || '';
  }

  if (options.implicit === true && this.implicit) {
    word = this.implicit || '';
  }

  if (options.normal === true) {
    word = this.clean || this.text || '';
  }

  if (options.root === true) {
    word = this.root || this.reduced || '';
  }

  if (options.unicode === true) {
    word = unicode_1(word);
  } // cleanup case


  if (options.titlecase === true) {
    if (this.tags.ProperNoun && !this.titleCase()) ; else if (this.tags.Acronym) {
      word = word.toUpperCase(); //uppercase acronyms
    } else if (isUpperCase.test(word) && !this.tags.Acronym) {
      // lowercase everything else
      word = word.toLowerCase();
    }
  }

  if (options.lowercase === true) {
    word = word.toLowerCase();
  } // remove the '.'s from 'F.B.I.' (safely)


  if (options.acronyms === true && this.tags.Acronym) {
    word = word.replace(/\./g, '');
  } // -before/after-


  if (options.whitespace === true || options.root === true) {
    before = '';
    after = ' ';

    if ((hasSpace$1.test(this.post) === false || options.last) && !this.implicit) {
      after = '';
    }
  }

  if (options.punctuation === true && !options.root) {
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
    // let keep = after.match(/\)/) || ''
    after = ''; //keep //after.replace(/[ .?!,]+/, '')
  } // remove the '.' from 'Mrs.' (safely)


  if (options.abbreviations === true && this.tags.Abbreviation) {
    after = after.replace(/^\./, '');
  }

  return before + word + after;
};

var _04Text = {
  textOut: textOut
};

const boringTags = {
  Auxiliary: 1,
  Possessive: 1
};
/** a subjective ranking of tags kinda tfidf-based */

const rankTags = function (term, world) {
  let tags = Object.keys(term.tags);
  const tagSet = world.tags;
  tags = tags.sort((a, b) => {
    //bury the tags we dont want
    if (boringTags[b] || !tagSet[b]) {
      return -1;
    } // unknown tags are interesting


    if (!tagSet[b]) {
      return 1;
    }

    if (!tagSet[a]) {
      return 0;
    } // then sort by #of parent tags (most-specific tags first)


    if (tagSet[a].lineage.length > tagSet[b].lineage.length) {
      return 1;
    }

    if (tagSet[a].isA.length > tagSet[b].isA.length) {
      return -1;
    }

    return 0;
  });
  return tags;
};

var _bestTag = rankTags;

const jsonDefault = {
  text: true,
  tags: true,
  implicit: true,
  whitespace: true,
  clean: false,
  id: false,
  index: false,
  offset: false,
  bestTag: false
};
/** return various metadata for this term */

var json$1 = function (options, world) {
  options = options || {};
  options = Object.assign({}, jsonDefault, options);
  let result = {}; // default on

  if (options.text) {
    result.text = this.text;
  }

  if (options.normal) {
    result.normal = this.clean;
  }

  if (options.tags) {
    result.tags = Object.keys(this.tags);
  } // default off


  if (options.clean) {
    result.clean = this.clean;
  }

  if (options.id || options.offset) {
    result.id = this.id;
  }

  if (options.implicit && this.implicit !== null) {
    result.implicit = this.implicit;
  }

  if (options.whitespace) {
    result.pre = this.pre;
    result.post = this.post;
  }

  if (options.bestTag) {
    result.bestTag = _bestTag(this, world)[0];
  }

  return result;
};

var _05Json$1 = {
  json: json$1
};

var methods$8 = Object.assign({}, _01Case, _02Punctuation, _03Misc, _04Text, _05Json$1);

function isClientSide() {
  return typeof window !== 'undefined' && window.document;
}
/** add spaces at the end */


const padEnd = function (str, width) {
  str = str.toString();

  while (str.length < width) {
    str += ' ';
  }

  return str;
};
/** output for verbose-mode */


var logTag = function (t, tag, reason) {
  if (isClientSide()) {
    console.log('%c' + padEnd(t.clean, 3) + '  + ' + tag + ' ', 'color: #6accb2;');
    return;
  } //server-side


  let log = '\x1b[33m' + padEnd(t.clean, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m ';

  if (reason) {
    log = padEnd(log, 35) + ' ' + reason + '';
  }

  console.log(log);
};
/** output for verbose mode  */


var logUntag = function (t, tag, reason) {
  if (isClientSide()) {
    console.log('%c' + padEnd(t.clean, 3) + '  - ' + tag + ' ', 'color: #AB5850;');
    return;
  } //server-side


  let log = '\x1b[33m' + padEnd(t.clean, 3) + ' \x1b[31m - #' + tag + '\x1b[0m ';

  if (reason) {
    log = padEnd(log, 35) + ' ' + reason;
  }

  console.log(log);
};

var isArray$3 = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

var titleCase$3 = str => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var fns = {
  logTag: logTag,
  logUntag: logUntag,
  isArray: isArray$3,
  titleCase: titleCase$3
};

/** add a tag, and its descendents, to a term */

const addTag = function (t, tag, reason, world) {
  let tagset = world.tags; //support '.' or '-' notation for skipping the tag

  if (tag === '' || tag === '.' || tag === '-') {
    return;
  }

  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  }

  tag = fns.titleCase(tag); //if we already got this one

  if (t.tags[tag] === true) {
    return;
  } // log it?


  const isVerbose = world.isVerbose();

  if (isVerbose === true) {
    fns.logTag(t, tag, reason);
  } //add tag


  t.tags[tag] = true; //whee!
  //check tagset for any additional things to do...

  if (tagset.hasOwnProperty(tag) === true) {
    //add parent Tags
    tagset[tag].isA.forEach(down => {
      t.tags[down] = true;

      if (isVerbose === true) {
        fns.logTag(t, '→ ' + down);
      }
    }); //remove any contrary tags

    t.unTag(tagset[tag].notA, '←', world);
  }
};
/** support an array of tags */


const addTags = function (term, tags, reason, world) {
  if (typeof tags !== 'string') {
    for (let i = 0; i < tags.length; i++) {
      addTag(term, tags[i], reason, world);
    } // tags.forEach(tag => addTag(term, tag, reason, world))

  } else {
    addTag(term, tags, reason, world);
  }
};

var add = addTags;

const lowerCase = /^[a-z]/;

const titleCase$2 = str => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
/** remove this tag, and its descentents from the term */


const unTag$1 = function (t, tag, reason, world) {
  const isVerbose = world.isVerbose(); //support '*' for removing all tags

  if (tag === '*') {
    t.tags = {};
    return t;
  }

  tag = tag.replace(/^#/, '');

  if (lowerCase.test(tag) === true) {
    tag = titleCase$2(tag);
  } // remove the tag


  if (t.tags[tag] === true) {
    delete t.tags[tag]; //log in verbose-mode

    if (isVerbose === true) {
      fns.logUntag(t, tag, reason);
    }
  } //delete downstream tags too


  const tagset = world.tags;

  if (tagset[tag]) {
    let lineage = tagset[tag].lineage;

    for (let i = 0; i < lineage.length; i++) {
      if (t.tags[lineage[i]] === true) {
        delete t.tags[lineage[i]];

        if (isVerbose === true) {
          fns.logUntag(t, ' - ' + lineage[i]);
        }
      }
    }
  }

  return t;
}; //handle an array of tags


const untagAll = function (term, tags, reason, world) {
  if (typeof tags !== 'string' && tags) {
    for (let i = 0; i < tags.length; i++) {
      unTag$1(term, tags[i], reason, world);
    }

    return;
  }

  unTag$1(term, tags, reason, world);
};

var unTag_1$1 = untagAll;

const canBe$2 = function (term, tag, world) {
  const tagset = world.tags; // cleanup tag

  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  } //fail-fast


  if (tagset[tag] === undefined) {
    return true;
  } //loop through tag's contradictory tags


  let enemies = tagset[tag].notA || [];

  for (let i = 0; i < enemies.length; i++) {
    if (term.tags[enemies[i]] === true) {
      return false;
    }
  }

  if (tagset[tag].isA !== undefined) {
    return canBe$2(term, tagset[tag].isA, world); //recursive
  }

  return true;
};

var canBe_1$1 = canBe$2;

/** add a tag or tags, and their descendents to this term
 * @param  {string | string[]} tags - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */

var tag_1 = function (tags, reason, world) {
  add(this, tags, reason, world);
  return this;
};
/** only tag this term if it's consistent with it's current tags */


var tagSafe$1 = function (tags, reason, world) {
  if (canBe_1$1(this, tags, world)) {
    add(this, tags, reason, world);
  }

  return this;
};
/** remove a tag or tags, and their descendents from this term
 * @param {string | string[]} tags  - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */


var unTag_1 = function (tags, reason, world) {
  unTag_1$1(this, tags, reason, world);
  return this;
};
/** is this tag consistent with the word's current tags?
 * @param {string | string[]} tags - a tag or tags
 * @returns {boolean}
 */


var canBe_1 = function (tags, world) {
  return canBe_1$1(this, tags, world);
};

var tag$1 = {
  tag: tag_1,
  tagSafe: tagSafe$1,
  unTag: unTag_1,
  canBe: canBe_1
};

class Term {
  constructor(text = '') {
    text = String(text);
    let obj = parse$2(text); // the various forms of our text

    this.text = obj.text || '';
    this.clean = obj.clean;
    this.reduced = obj.reduced;
    this.root = null;
    this.implicit = null;
    this.pre = obj.pre || '';
    this.post = obj.post || '';
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
    let obj = parse$2(str);
    this.text = obj.text;
    this.clean = obj.clean;
    this.reduced = obj.reduced;
    this.root = null;
    this.implicit = null;
    return this;
  }

}
/** create a deep-copy of this term */


Term.prototype.clone = function () {
  let term = new Term(this.text);
  term.pre = this.pre;
  term.post = this.post;
  term.clean = this.clean;
  term.reduced = this.reduced;
  term.root = this.root;
  term.implicit = this.implicit;
  term.tags = Object.assign({}, this.tags); //use the old id, so it can be matched with .match(doc)
  // term.id = this.id

  return term;
};

Object.assign(Term.prototype, methods$8);
Object.assign(Term.prototype, tag$1);
var Term_1 = Term;

/** return a flat array of Term objects */
var terms = function (n) {
  if (this.length === 0) {
    return [];
  } // use cache, if it exists


  if (this.cache.terms) {
    if (n !== undefined) {
      return this.cache.terms[n];
    }

    return this.cache.terms;
  }

  let terms = [this.pool.get(this.start)];

  for (let i = 0; i < this.length - 1; i += 1) {
    let id = terms[terms.length - 1].next;

    if (id === null) {
      // throw new Error('linked-list broken')
      console.error("Compromise error: Linked list broken in phrase '" + this.start + "'");
      break;
    }

    let term = this.pool.get(id);
    terms.push(term); //return this one?

    if (n !== undefined && n === i) {
      return terms[n];
    }
  }

  if (n === undefined) {
    this.cache.terms = terms;
  }

  if (n !== undefined) {
    return terms[n];
  }

  return terms;
};
/** return a shallow or deep copy of this phrase  */


var clone$1 = function (isShallow) {
  if (isShallow) {
    let p = this.buildFrom(this.start, this.length);
    p.cache = this.cache;
    return p;
  } //how do we clone part of the pool?


  let terms = this.terms();
  let newTerms = terms.map(t => t.clone()); // console.log(newTerms)
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
  return this.buildFrom(newTerms[0].id, newTerms.length);
};
/** return last term object */


var lastTerm = function () {
  let terms = this.terms();
  return terms[terms.length - 1];
};
/** quick lookup for a term id */


var hasId = function (wantId) {
  if (this.length === 0 || !wantId) {
    return false;
  }

  if (this.start === wantId) {
    return true;
  } // use cache, if available


  if (this.cache.terms) {
    let terms = this.cache.terms;

    for (let i = 0; i < terms.length; i++) {
      if (terms[i].id === wantId) {
        return true;
      }
    }

    return false;
  } // otherwise, go through each term


  let lastId = this.start;

  for (let i = 0; i < this.length - 1; i += 1) {
    let term = this.pool.get(lastId);

    if (term === undefined) {
      console.error(`Compromise error: Linked list broken. Missing term '${lastId}' in phrase '${this.start}'\n`); // throw new Error('linked List error')

      return false;
    }

    if (term.next === wantId) {
      return true;
    }

    lastId = term.next;
  }

  return false;
};
/** how many seperate, non-empty words is it? */


var wordCount = function () {
  return this.terms().filter(t => t.text !== '').length;
};
/** get the full-sentence this phrase belongs to */


var fullSentence = function () {
  let t = this.terms(0); //find first term in sentence

  while (t.prev) {
    t = this.pool.get(t.prev);
  }

  let start = t.id;
  let len = 1; //go to end of sentence

  while (t.next) {
    t = this.pool.get(t.next);
    len += 1;
  }

  return this.buildFrom(start, len);
};

var _01Utils$1 = {
  terms: terms,
  clone: clone$1,
  lastTerm: lastTerm,
  hasId: hasId,
  wordCount: wordCount,
  fullSentence: fullSentence
};

const trimEnd = function (str) {
  return str.replace(/ +$/, '');
};
/** produce output in the given format */


var text$1 = function (options = {}, isFirst, isLast) {
  if (typeof options === 'string') {
    if (options === 'normal') {
      options = {
        whitespace: true,
        unicode: true,
        lowercase: true,
        punctuation: true,
        acronyms: true,
        abbreviations: true,
        implicit: true,
        normal: true
      };
    } else if (options === 'clean') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        normal: true
      };
    } else if (options === 'reduced') {
      options = {
        punctuation: false,
        //Hmm: is this reversed?
        titlecase: false,
        lowercase: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        reduced: true
      };
    } else if (options === 'implicit') {
      options = {
        punctuation: true,
        implicit: true,
        whitespace: true,
        trim: true
      };
    } else if (options === 'root') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        root: true
      };
    } else {
      options = {};
    }
  }

  let terms = this.terms(); //this this phrase a complete sentence?

  let isFull = false;

  if (terms[0] && terms[0].prev === null && terms[terms.length - 1].next === null) {
    isFull = true;
  }

  let text = terms.reduce((str, t, i) => {
    // don't output intro space for a contraction-match  i'm good => "[am] good"
    if (i === 0 && t.text === '' && t.implicit !== null && !options.implicit) {
      return str;
    }

    options.last = isLast && i === terms.length - 1;
    let showPre = true;
    let showPost = true;

    if (isFull === false) {
      // dont show beginning whitespace
      if (i === 0 && isFirst) {
        showPre = false;
      } // dont show end-whitespace


      if (i === terms.length - 1 && isLast) {
        showPost = false;
      }
    }

    let txt = t.textOut(options, showPre, showPost); // console.log(terms)
    // if (options.titlecase && i === 0) {
    // txt = titleCase(txt)
    // }

    return str + txt;
  }, ''); //full-phrases show punctuation, but not whitespace

  if (isFull === true && isLast) {
    text = trimEnd(text);
  }

  if (options.trim === true) {
    text = text.trim();
  }

  return text;
};

var _02Text = {
  text: text$1
};

/** remove start and end whitespace */
var trim = function () {
  let terms = this.terms();

  if (terms.length > 0) {
    //trim starting
    terms[0].pre = terms[0].pre.replace(/^\s+/, ''); //trim ending

    let lastTerm = terms[terms.length - 1];
    lastTerm.post = lastTerm.post.replace(/\s+$/, '');
  }

  return this;
};

var _03Change = {
  trim: trim
};

const endOfSentence = /[.?!]\s*$/; // replacing a 'word.' with a 'word!'

const combinePost = function (before, after) {
  //only transfer the whitespace
  if (endOfSentence.test(after)) {
    let whitespace = before.match(/\s*$/);
    return after + whitespace;
  }

  return before;
}; //add whitespace to the start of the second bit


const addWhitespace$1 = function (beforeTerms, newTerms) {
  // add any existing pre-whitespace to beginning
  newTerms[0].pre = beforeTerms[0].pre;
  let lastTerm = beforeTerms[beforeTerms.length - 1]; //add any existing punctuation to end of our new terms

  let newTerm = newTerms[newTerms.length - 1];
  newTerm.post = combinePost(lastTerm.post, newTerm.post); // remove existing punctuation

  lastTerm.post = ''; //before ←[space]  - after

  if (lastTerm.post === '') {
    lastTerm.post += ' ';
  }
}; //insert this segment into the linked-list


const stitchIn$1 = function (beforeTerms, newTerms, pool) {
  let lastBefore = beforeTerms[beforeTerms.length - 1];
  let lastNew = newTerms[newTerms.length - 1];
  let afterId = lastBefore.next; //connect ours in (main → newPhrase)

  lastBefore.next = newTerms[0].id; //stich the end in  (newPhrase → after)

  lastNew.next = afterId; //do it backwards, too

  if (afterId) {
    // newPhrase ← after
    let afterTerm = pool.get(afterId);
    afterTerm.prev = lastNew.id;
  } // before ← newPhrase


  let beforeId = beforeTerms[0].id;

  if (beforeId) {
    let newTerm = newTerms[0];
    newTerm.prev = beforeId;
  }
}; // avoid stretching a phrase twice.


const unique$4 = function (list) {
  return list.filter((o, i) => {
    return list.indexOf(o) === i;
  });
}; //append one phrase onto another.


const appendPhrase = function (before, newPhrase, doc) {
  let beforeTerms = before.terms();
  let newTerms = newPhrase.terms(); //spruce-up the whitespace issues

  addWhitespace$1(beforeTerms, newTerms); //insert this segment into the linked-list

  stitchIn$1(beforeTerms, newTerms, before.pool); // stretch!
  // make each effected phrase longer

  let toStretch = [before];
  let hasId = before.start;
  let docs = [doc];
  docs = docs.concat(doc.parents()); // find them all!

  docs.forEach(parent => {
    // only the phrases that should change
    let shouldChange = parent.list.filter(p => {
      return p.hasId(hasId);
    });
    toStretch = toStretch.concat(shouldChange);
  }); // don't double-count a phrase

  toStretch = unique$4(toStretch);
  toStretch.forEach(p => {
    p.length += newPhrase.length;
  });
  before.cache = {};
  return before;
};

var append = appendPhrase;

const hasSpace = / /; //a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'

const addWhitespace = function (newTerms) {
  //add a space before our new text?
  // add a space after our text
  let lastTerm = newTerms[newTerms.length - 1];

  if (hasSpace.test(lastTerm.post) === false) {
    lastTerm.post += ' ';
  }

  return;
}; //insert this segment into the linked-list


const stitchIn = function (main, newPhrase, newTerms) {
  // [newPhrase] → [main]
  let lastTerm = newTerms[newTerms.length - 1];
  lastTerm.next = main.start; // [before] → [main]

  let pool = main.pool;
  let start = pool.get(main.start);

  if (start.prev) {
    let before = pool.get(start.prev);
    before.next = newPhrase.start;
  } //do it backwards, too
  // before ← newPhrase


  newTerms[0].prev = main.terms(0).prev; // newPhrase ← main

  main.terms(0).prev = lastTerm.id;
};

const unique$3 = function (list) {
  return list.filter((o, i) => {
    return list.indexOf(o) === i;
  });
}; //append one phrase onto another


const joinPhrase = function (original, newPhrase, doc) {
  const starterId = original.start;
  let newTerms = newPhrase.terms(); //spruce-up the whitespace issues

  addWhitespace(newTerms); //insert this segment into the linked-list

  stitchIn(original, newPhrase, newTerms); //increase the length of our phrases

  let toStretch = [original];
  let docs = [doc];
  docs = docs.concat(doc.parents());
  docs.forEach(d => {
    // only the phrases that should change
    let shouldChange = d.list.filter(p => {
      return p.hasId(starterId) || p.hasId(newPhrase.start);
    });
    toStretch = toStretch.concat(shouldChange);
  }); // don't double-count

  toStretch = unique$3(toStretch); // stretch these phrases

  toStretch.forEach(p => {
    p.length += newPhrase.length; // change the start too, if necessary

    if (p.start === starterId) {
      p.start = newPhrase.start;
    }

    p.cache = {};
  });
  return original;
};

var prepend = joinPhrase;

//recursively decrease the length of all the parent phrases
const shrinkAll = function (doc, id, deleteLength, after) {
  let arr = doc.parents();
  arr.push(doc);
  arr.forEach(d => {
    //find our phrase to shrink
    let phrase = d.list.find(p => p.hasId(id));

    if (!phrase) {
      return;
    }

    phrase.length -= deleteLength; // does it start with this soon-removed word?

    if (phrase.start === id) {
      phrase.start = after.id;
    }

    phrase.cache = {};
  }); // cleanup empty phrase objects

  doc.list = doc.list.filter(p => {
    if (!p.start || !p.length) {
      return false;
    }

    return true;
  });
};
/** wrap the linked-list around these terms
 * so they don't appear any more
 */


const deletePhrase = function (phrase, doc) {
  let pool = doc.pool();
  let terms = phrase.terms(); //grab both sides of the chain,

  let prev = pool.get(terms[0].prev) || {};
  let after = pool.get(terms[terms.length - 1].next) || {};

  if (terms[0].implicit && prev.implicit) {
    prev.set(prev.implicit);
    prev.post += ' ';
  } // //first, change phrase lengths


  shrinkAll(doc, phrase.start, phrase.length, after); // connect [prev]->[after]

  if (prev) {
    prev.next = after.id;
  } // connect [prev]<-[after]


  if (after) {
    after.prev = prev.id;
  } // lastly, actually delete the terms from the pool?
  // for (let i = 0; i < terms.length; i++) {
  //   pool.remove(terms[i].id)
  // }

};

var _delete$1 = deletePhrase;

/** put this text at the end */

var append_1 = function (newPhrase, doc) {
  append(this, newPhrase, doc);
  return this;
};
/** add this text to the beginning */


var prepend_1 = function (newPhrase, doc) {
  prepend(this, newPhrase, doc);
  return this;
};

var _delete = function (doc) {
  _delete$1(this, doc);
  return this;
}; // stich-in newPhrase, stretch 'doc' + parents


var replace$1 = function (newPhrase, doc) {
  //add it do the end
  let firstLength = this.length;
  append(this, newPhrase, doc); //delete original terms

  let tmp = this.buildFrom(this.start, this.length);
  tmp.length = firstLength;
  _delete$1(tmp, doc);
};
/**
 * Turn this phrase object into 3 phrase objects
 */


var splitOn = function (p) {
  let terms = this.terms();
  let result = {
    before: null,
    match: null,
    after: null
  };
  let index = terms.findIndex(t => t.id === p.start);

  if (index === -1) {
    return result;
  } //make all three sections into phrase-objects


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

  return result;
};

var _04Insert = {
  append: append_1,
  prepend: prepend_1,
  delete: _delete,
  replace: replace$1,
  splitOn: splitOn
};

/** return json metadata for this phrase */
var json = function (options = {}, world) {
  let res = {}; // text data

  if (options.text) {
    res.text = this.text();
  }

  if (options.normal) {
    res.normal = this.text('normal');
  }

  if (options.clean) {
    res.clean = this.text('clean');
  }

  if (options.reduced) {
    res.reduced = this.text('reduced');
  }

  if (options.implicit) {
    res.implicit = this.text('implicit');
  }

  if (options.root) {
    res.root = this.text('root');
  }

  if (options.trim) {
    if (res.text) {
      res.text = res.text.trim();
    }

    if (res.normal) {
      res.normal = res.normal.trim();
    }

    if (res.reduced) {
      res.reduced = res.reduced.trim();
    }
  } // terms data


  if (options.terms) {
    if (options.terms === true) {
      options.terms = {};
    }

    res.terms = this.terms().map(t => t.json(options.terms, world));
  }

  return res;
};

var _05Json = {
  json: json
};

/** match any terms after this phrase */
var lookAhead = function (regs) {
  // if empty match string, return everything after
  if (!regs) {
    regs = '.*';
  }

  let pool = this.pool; // get a list of all terms preceding our start

  let terms = [];

  const getAfter = function (id) {
    let term = pool.get(id);

    if (!term) {
      return;
    }

    terms.push(term);

    if (term.prev) {
      getAfter(term.next); //recursion
    }
  };

  let all = this.terms();
  let lastTerm = all[all.length - 1];
  getAfter(lastTerm.next);

  if (terms.length === 0) {
    return [];
  } // got the terms, make a phrase from them


  let p = this.buildFrom(terms[0].id, terms.length);
  return p.match(regs);
};
/** match any terms before this phrase */


var lookBehind = function (regs) {
  // if empty match string, return everything before
  if (!regs) {
    regs = '.*';
  }

  let pool = this.pool; // get a list of all terms preceding our start

  let terms = [];

  const getBefore = function (id) {
    let term = pool.get(id);

    if (!term) {
      return;
    }

    terms.push(term);

    if (term.prev) {
      getBefore(term.prev); //recursion
    }
  };

  let term = pool.get(this.start);
  getBefore(term.prev);

  if (terms.length === 0) {
    return [];
  } // got the terms, make a phrase from them


  let p = this.buildFrom(terms[terms.length - 1].id, terms.length);
  return p.match(regs);
};

var _06Lookahead = {
  lookAhead: lookAhead,
  lookBehind: lookBehind
};

var methods$7 = Object.assign({}, _01Utils$1, _02Text, _03Change, _04Insert, _05Json, _06Lookahead);

// try to avoid doing the match
const failFast$1 = function (p, regs) {
  if (regs.length === 0) {
    return true;
  }

  for (let i = 0; i < regs.length; i += 1) {
    let reg = regs[i]; //logical quick-ones

    if (reg.optional !== true && reg.negative !== true) {
      //start/end impossibilites
      if (reg.start === true && i > 0) {
        return true;
      }
    } //this is not possible


    if (reg.anything === true && reg.negative === true) {
      return true;
    }
  }

  return false;
};

var _02FailFast = failFast$1;

var _matchLogic = createCommonjsModule(function (module, exports) {
  //found a match? it's greedy? keep going!
  exports.getGreedy = function (state, endReg) {
    // for greedy checking, we no longer care about the reg.start
    // value, and leaving it can cause failures for anchored greedy
    // matches.  ditto for end-greedy matches: we need an earlier non-
    // ending match to succceed until we get to the actual end.
    let reg = Object.assign({}, state.regs[state.r], {
      start: false,
      end: false
    });
    let start = state.t;

    for (; state.t < state.terms.length; state.t += 1) {
      //stop for next-reg match
      if (endReg && state.terms[state.t].doesMatch(endReg, state.start_i + state.t, state.phrase_length)) {
        return state.t;
      }

      let count = state.t - start + 1; // is it max-length now?

      if (reg.max !== undefined && count === reg.max) {
        return state.t;
      } //stop here


      if (state.terms[state.t].doesMatch(reg, state.start_i + state.t, state.phrase_length) === false) {
        // is it too short?
        if (reg.min !== undefined && count < reg.min) {
          return null;
        }

        return state.t;
      }
    }

    return state.t;
  }; //'unspecific greedy' is a weird situation.


  exports.greedyTo = function (state, nextReg) {
    let t = state.t; //if there's no next one, just go off the end!

    if (!nextReg) {
      return state.terms.length;
    } //otherwise, we're looking for the next one


    for (; t < state.terms.length; t += 1) {
      if (state.terms[t].doesMatch(nextReg, state.start_i + t, state.phrase_length) === true) {
        return t;
      }
    } //guess it doesn't exist, then.


    return null;
  }; //we have a special case where an end-anchored greedy match may need to
  //start matching before the actual end; we do this by (temporarily!)
  //removing the "end" property from the matching token... since this is
  //very situation-specific, we *only* do this when we really need to.


  exports.isEndGreedy = function (reg, state) {
    if (reg.end === true && reg.greedy === true) {
      if (state.start_i + state.t < state.phrase_length - 1) {
        let tmpReg = Object.assign({}, reg, {
          end: false
        });

        if (state.terms[state.t].doesMatch(tmpReg, state.start_i + state.t, state.phrase_length) === true) {
          return true;
        }
      }
    }

    return false;
  }; // match complex OR cases like (a|b|foo bar)


  exports.doOrBlock = function (state, skipN = 0) {
    let block = state.regs[state.r];
    let wasFound = false; // do each multiword sequence

    for (let c = 0; c < block.choices.length; c += 1) {
      // try to match this list of tokens
      let regs = block.choices[c];
      wasFound = regs.every((cr, w_index) => {
        let extra = 0;
        let t = state.t + w_index + skipN + extra;

        if (state.terms[t] === undefined) {
          return false;
        }

        let foundBlock = state.terms[t].doesMatch(cr, t + state.start_i, state.phrase_length); // this can be greedy - '(foo+ bar)'

        if (foundBlock === true && cr.greedy === true) {
          for (let i = 1; i < state.terms.length; i += 1) {
            let term = state.terms[t + i];

            if (term) {
              let keepGoing = term.doesMatch(cr, state.start_i + i, state.phrase_length);

              if (keepGoing === true) {
                extra += 1;
              } else {
                break;
              }
            }
          }
        }

        skipN += extra;
        return foundBlock;
      });

      if (wasFound) {
        skipN += regs.length;
        break;
      }
    } // we found a match -  is it greedy though?


    if (wasFound && block.greedy === true) {
      return exports.doOrBlock(state, skipN); // try it again!
    }

    return skipN;
  }; // match AND cases like (#Noun && foo)


  exports.doAndBlock = function (state) {
    let longest = 0; // all blocks must match, and we return the greediest match

    let reg = state.regs[state.r];
    let allDidMatch = reg.choices.every(block => {
      //  for multi-word blocks, all must match
      let allWords = block.every((cr, w_index) => {
        let tryTerm = state.t + w_index;

        if (state.terms[tryTerm] === undefined) {
          return false;
        }

        return state.terms[tryTerm].doesMatch(cr, tryTerm, state.phrase_length);
      });

      if (allWords === true && block.length > longest) {
        longest = block.length;
      }

      return allWords;
    });

    if (allDidMatch === true) {
      return longest;
    }

    return false;
  }; // get or create named group


  exports.getGroup = function (state, term_index, name) {
    if (state.groups[state.groupId]) {
      return state.groups[state.groupId];
    }

    const termId = state.terms[term_index].id;
    state.groups[state.groupId] = {
      group: String(name),
      start: termId,
      length: 0
    };
    return state.groups[state.groupId];
  };
});

/** tries to match a sequence of terms, starting from here */

const tryHere = function (terms, regs, start_i, phrase_length) {
  // all the variables that matter
  let state = {
    t: 0,
    //the term index we're on
    terms: terms,
    //the working slice of term objects
    r: 0,
    // the reg index we're on
    regs: regs,
    //our match conditions
    groups: {},
    //all named-group matches
    start_i: start_i,
    // term index we're starting from
    phrase_length: phrase_length,
    // # of terms in the sentence
    hasGroup: false,
    groupId: null,
    previousGroup: null
  }; // we must satisfy each rule in 'regs'

  for (; state.r < regs.length; state.r += 1) {
    let reg = regs[state.r]; // Check if this reg has a named capture group

    state.hasGroup = typeof reg.named === 'string' || typeof reg.named === 'number'; // Reuse previous capture group if same

    if (state.hasGroup === true) {
      const prev = regs[state.r - 1];

      if (prev && prev.named === reg.named && state.previousGroup) {
        state.groupId = state.previousGroup;
      } else {
        state.groupId = _id(reg.named);
        state.previousGroup = state.groupId;
      }
    } //have we run-out of terms?


    if (!state.terms[state.t]) {
      //are all remaining regs optional or negative?
      const haveNeeds = regs.slice(state.r).some(remain => !remain.optional);

      if (haveNeeds === false) {
        break; //done!
      }

      return null; // die
    } //support 'unspecific greedy' .* properly


    if (reg.anything === true && reg.greedy === true) {
      let skipto = _matchLogic.greedyTo(state, regs[state.r + 1]); //maybe we couldn't find it

      if (skipto === null || skipto === 0) {
        return null;
      } // ensure it's long enough


      if (reg.min !== undefined && skipto - state.t < reg.min) {
        return null;
      } // reduce it back, if it's too long


      if (reg.max !== undefined && skipto - state.t > reg.max) {
        state.t = state.t + reg.max;
        continue;
      } // is it really this easy?....


      if (state.hasGroup === true) {
        const g = _matchLogic.getGroup(state, state.t, reg.named);
        g.length = skipto - state.t;
      }

      state.t = skipto;
      continue;
    } // support multi-word OR (a|b|foo bar)


    if (reg.choices !== undefined && reg.operator === 'or') {
      let skipNum = _matchLogic.doOrBlock(state);

      if (skipNum) {
        // handle 'not' logic
        if (reg.negative === true) {
          return null; // die
        }

        if (state.hasGroup === true) {
          const g = _matchLogic.getGroup(state, state.t, reg.named);
          g.length += skipNum;
        }

        state.t += skipNum;
        continue;
      } else if (!reg.optional) {
        return null; //die
      }
    } // support AND (#Noun && foo) blocks


    if (reg.choices !== undefined && reg.operator === 'and') {
      let skipNum = _matchLogic.doAndBlock(state);

      if (skipNum) {
        // handle 'not' logic
        if (reg.negative === true) {
          return null; // die
        }

        if (state.hasGroup === true) {
          const g = _matchLogic.getGroup(state, state.t, reg.named);
          g.length += skipNum;
        }

        state.t += skipNum;
        continue;
      } else if (!reg.optional) {
        return null; //die
      }
    } // ok, finally test the term/reg


    let term = state.terms[state.t];
    let doesMatch = term.doesMatch(reg, state.start_i + state.t, state.phrase_length);

    if (reg.anything === true || doesMatch === true || _matchLogic.isEndGreedy(reg, state)) {
      let startAt = state.t; // if it's a negative optional match... :0

      if (reg.optional && regs[state.r + 1] && reg.negative) {
        continue;
      } // okay, it was a match, but if it's optional too,
      // we should check the next reg too, to skip it?


      if (reg.optional && regs[state.r + 1]) {
        // does the next reg match it too?
        let nextRegMatched = term.doesMatch(regs[state.r + 1], state.start_i + state.t, state.phrase_length);

        if (reg.negative || nextRegMatched) {
          // but does the next reg match the next term??
          // only skip if it doesn't
          let nextTerm = state.terms[state.t + 1];

          if (!nextTerm || !nextTerm.doesMatch(regs[state.r + 1], state.start_i + state.t, state.phrase_length)) {
            state.r += 1;
          }
        }
      } //advance to the next term!


      state.t += 1; //check any ending '$' flags

      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (state.t !== state.terms.length && reg.greedy !== true) {
          return null; //die
        }
      } //try keep it going!


      if (reg.greedy === true) {
        state.t = _matchLogic.getGreedy(state, regs[state.r + 1]);

        if (state.t === null) {
          return null; //greedy was too short
        }

        if (reg.min && reg.min > state.t) {
          return null; //greedy was too short
        } // if this was also an end-anchor match, check to see we really
        // reached the end


        if (reg.end === true && state.start_i + state.t !== phrase_length) {
          return null; //greedy didn't reach the end
        }
      }

      if (state.hasGroup === true) {
        // Get or create capture group
        const g = _matchLogic.getGroup(state, startAt, reg.named); // Update group - add greedy or increment length

        if (state.t > 1 && reg.greedy) {
          g.length += state.t - startAt;
        } else {
          g.length++;
        }
      }

      continue;
    } // ok, it doesn't match.
    // did it *actually match* a negative?


    if (reg.negative) {
      let tmpReg = Object.assign({}, reg);
      tmpReg.negative = false; // try removing it

      let foundNeg = state.terms[state.t].doesMatch(tmpReg, state.start_i + state.t, state.phrase_length);

      if (foundNeg === true) {
        return null; //bye!
      }
    } //bah, who cares, keep going


    if (reg.optional === true) {
      continue;
    } // should we skip-over an implicit word?


    if (state.terms[state.t].isImplicit() && regs[state.r - 1] && state.terms[state.t + 1]) {
      // if the last match was implicit too, we're missing a word.
      if (state.terms[state.t - 1] && state.terms[state.t - 1].implicit === regs[state.r - 1].word) {
        return null;
      } // does the next one match?


      if (state.terms[state.t + 1].doesMatch(reg, state.start_i + state.t, state.phrase_length)) {
        state.t += 2;
        continue;
      }
    }

    return null; //die
  } //return our result


  return {
    match: state.terms.slice(0, state.t),
    groups: state.groups
  };
};

var _03TryMatch = tryHere;

// final checks on the validity of our results
const postProcess$1 = function (terms, regs, matches) {
  if (!matches || matches.length === 0) {
    return matches;
  } // ensure end reg has the end term


  let atEnd = regs.some(r => r.end);

  if (atEnd) {
    let lastTerm = terms[terms.length - 1];
    matches = matches.filter(({
      match: arr
    }) => arr.indexOf(lastTerm) !== -1);
  }

  return matches;
};

var _04PostProcess = postProcess$1;

// supported suffix-flags:
// suffixes:     ? ] + * $ {2,6} ~
//     [\?\]\+\*\$~]*
// prefixes: ! [ ^
//     [\!\[\^]*
// match  'foo /yes/' and not 'foo/no/bar'
const bySlashes = /(?:^|\s)([\!\[\^]*(?:<[^<]*>)?\/.*?[^\\\/]\/[\?\]\+\*\$~]*)(?:\s|$)/; // match '(yes) but not foo(no)bar'

const byParentheses = /([\!\[\^]*(?:<[^<]*>)?\([^\)]+[^\\\)]\)[\?\]\+\*\$~]*)(?:\s|$)/; // okay

const byWord = / /g;

const isBlock = str => {
  return /^[\!\[\^]*(<[^<]*>)?\(/.test(str) && /\)[\?\]\+\*\$~]*$/.test(str);
};

const isReg = str => {
  return /^[\!\[\^]*(<[^<]*>)?\//.test(str) && /\/[\?\]\+\*\$~]*$/.test(str);
};

const cleanUp = function (arr) {
  arr = arr.map(str => str.trim());
  arr = arr.filter(str => str);
  return arr;
};

const parseBlocks = function (txt) {
  // parse by /regex/ first
  let arr = txt.split(bySlashes);
  let res = []; // parse by (blocks), next

  arr.forEach(str => {
    if (isReg(str)) {
      res.push(str);
      return;
    }

    res = res.concat(str.split(byParentheses));
  });
  res = cleanUp(res); // split by spaces, now

  let final = [];
  res.forEach(str => {
    if (isBlock(str)) {
      final.push(str);
    } else if (isReg(str)) {
      final.push(str);
    } else {
      final = final.concat(str.split(byWord));
    }
  });
  final = cleanUp(final);
  return final;
};

var _01ParseBlocks = parseBlocks; // console.log('(one two) (upto) [<snooze_to>#Date+]'.split(byParentheses))

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

  named:'',
  choices:[],
}
*/
const hasMinMax = /\{([0-9]+,?[0-9]*)\}/;
const andSign = /&&/;
const captureName = new RegExp(/^<\s*?(\S+)\s*?>/);

const titleCase$1 = str => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

const end = function (str) {
  return str[str.length - 1];
};

const start = function (str) {
  return str[0];
};

const stripStart = function (str) {
  return str.substr(1);
};

const stripEnd = function (str) {
  return str.substr(0, str.length - 1);
};

const stripBoth = function (str) {
  str = stripStart(str);
  str = stripEnd(str);
  return str;
}; //


const parseToken = function (w) {
  let obj = {}; //collect any flags (do it twice)

  for (let i = 0; i < 2; i += 1) {
    //end-flag
    if (end(w) === '$') {
      obj.end = true;
      w = stripEnd(w);
    } //front-flag


    if (start(w) === '^') {
      obj.start = true;
      w = stripStart(w);
    } //capture group (this one can span multiple-terms)


    if (start(w) === '[' || end(w) === ']') {
      obj.named = true;

      if (start(w) === '[') {
        obj.groupType = end(w) === ']' ? 'single' : 'start';
      } else {
        obj.groupType = 'end';
      }

      w = w.replace(/^\[/, '');
      w = w.replace(/\]$/, ''); // Use capture group name

      if (start(w) === '<') {
        const res = captureName.exec(w);

        if (res.length >= 2) {
          obj.named = res[1];
          w = w.replace(res[0], '');
        }
      }
    } //back-flags


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

    if (start(w) === '!') {
      obj.negative = true; // obj.optional = true

      w = stripStart(w);
    } //wrapped-flags


    if (start(w) === '(' && end(w) === ')') {
      // support (one && two)
      if (andSign.test(w)) {
        obj.choices = w.split(andSign);
        obj.operator = 'and';
      } else {
        obj.choices = w.split('|');
        obj.operator = 'or';
      } //remove '(' and ')'


      obj.choices[0] = stripStart(obj.choices[0]);
      let last = obj.choices.length - 1;
      obj.choices[last] = stripEnd(obj.choices[last]); // clean up the results

      obj.choices = obj.choices.map(s => s.trim());
      obj.choices = obj.choices.filter(s => s); //recursion alert!

      obj.choices = obj.choices.map(str => {
        return str.split(/ /g).map(parseToken);
      });
      w = '';
    } //regex


    if (start(w) === '/' && end(w) === '/') {
      w = stripBoth(w);
      obj.regex = new RegExp(w); //potential vuln - security/detect-non-literal-regexp

      return obj;
    } //soft-match


    if (start(w) === '~' && end(w) === '~') {
      w = stripBoth(w);
      obj.soft = true;
      obj.word = w;
      return obj;
    }
  } // support #Tag{1,9}


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
      } // use same method as '+'


      obj.greedy = true; // 0 as min means the same as '?'

      obj.optional = true;
      return '';
    });
  } //do the actual token content


  if (start(w) === '#') {
    obj.tag = stripStart(w);
    obj.tag = titleCase$1(obj.tag);
    return obj;
  } //dynamic function on a term object


  if (start(w) === '@') {
    obj.method = stripStart(w);
    return obj;
  }

  if (w === '.') {
    obj.anything = true;
    return obj;
  } //support alone-astrix


  if (w === '*') {
    obj.anything = true;
    obj.greedy = true;
    obj.optional = true;
    return obj;
  }

  if (w) {
    //somehow handle encoded-chars?
    w = w.replace('\\*', '*');
    w = w.replace('\\.', '.');
    obj.word = w.toLowerCase();
  }

  return obj;
};

var _02ParseToken = parseToken;

// name any [unnamed] capture-groups with a number
const nameGroups = function (tokens) {
  let convert = false;
  let index = -1;
  let current; //'fill in' capture groups between start-end

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]; // Give name to un-named single tokens

    if (token.groupType === 'single' && token.named === true) {
      index += 1;
      token.named = index;
      continue;
    } // Start converting tokens


    if (token.groupType === 'start') {
      convert = true;

      if (typeof token.named === 'string' || typeof token.named === 'number') {
        current = token.named;
      } else {
        index += 1;
        current = index;
      }
    } // Ensure this token has the right name


    if (convert) {
      token.named = current;
    } // Stop converting tokens


    if (token.groupType === 'end') {
      convert = false;
    }
  }

  return tokens;
}; // optimize an 'or' lookup, when the (a|b|c) list is simple or multi-word


const doFastOrMode = function (tokens) {
  return tokens.map(token => {
    if (token.choices !== undefined) {
      // are they all straight-up words? then optimize them.
      let shouldPack = token.choices.every(block => {
        if (block.length !== 1) {
          return false;
        }

        let reg = block[0];

        if (reg.word !== undefined && reg.negative !== true && reg.optional !== true && reg.method !== true) {
          return true; //reg is simple-enough
        }

        return false;
      });

      if (shouldPack === true) {
        let oneOf = {};
        token.choices.forEach(block => {
          oneOf[block[0].word] = true;
        });
        token.fastOr = oneOf;
        delete token.choices;
      }
    }

    return token;
  });
}; // allow multiword OR (foo|one two)
// const doMultiWord = function (tokens) {
//   return tokens.map(token => {
//     if (token.choices !== undefined) {
//       let isMulti = token.choices.find(o => hasASpace.test(o.word)) || false
//       if (isMulti !== false) {
//         token.multiword = true
//         // turn all choices into arrays
//         token.choices = token.choices.map(choice => {
//           if (choice.word) {
//             choice.sequence = choice.word.split(hasASpace)
//             delete choice.word
//           }
//           return choice
//         })
//       }
//     }
//     return token
//   })
// }
// const doBlockMode = function (tokens) {
//   return tokens.map(token => {
//     // we've already setup fastOr mode
//     if (token.choices !== undefined) {
//       // console.log(token)
//     }
//     return token
//   })
// }


const postProcess = function (tokens, opts = {}) {
  // ensure all capture groups are filled between start and end
  // give all capture groups names
  let count = tokens.filter(t => t.groupType).length;

  if (count > 0) {
    tokens = nameGroups(tokens);
  } // convert 'choices' format to 'fastOr' format


  if (!opts.fuzzy) {
    tokens = doFastOrMode(tokens);
  } // support multiword OR (foo bar|baz)
  // tokens = doMultiWord(tokens)
  // support (one two three)
  // tokens = doBlockMode(tokens)


  return tokens;
};

var _03PostProcess = postProcess;

const isArray$2 = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}; //turn an array into a 'choices' list


const byArray = function (arr) {
  let blocks = arr.map(s => {
    return [{
      word: s
    }];
  });
  return [{
    choices: blocks,
    operator: 'or'
  }];
}; // turn a Doc object into a reg of ids to lookup


const fromDoc = function (doc) {
  if (!doc || !doc.list || !doc.list[0]) {
    return [];
  }

  let regs = [];
  doc.list.forEach(p => {
    let ids = [];
    p.terms().forEach(t => {
      ids.push(t.id);
    });
    regs.push(ids);
  });
  return [{
    idBlocks: regs
  }];
}; // add fuzziness etc to each reg


const addOptions = function (tokens, opts) {
  // add default fuzzy-search limit
  if (opts.fuzzy === true) {
    opts.fuzzy = 0.85;
  }

  if (typeof opts.fuzzy === 'number') {
    tokens = tokens.map(reg => {
      // add a fuzzy-match on 'word' tokens
      if (opts.fuzzy > 0 && reg.word) {
        reg.fuzzy = opts.fuzzy;
      } //add it to or|and choices too


      if (reg.choices) {
        reg.choices.forEach(block => {
          block.forEach(r => {
            r.fuzzy = opts.fuzzy;
          });
        });
      }

      return reg;
    });
  }

  return tokens;
};
/** parse a match-syntax string into json */


const syntax = function (input, opts = {}) {
  // fail-fast
  if (input === null || input === undefined || input === '') {
    return [];
  } //try to support a ton of different formats:


  if (typeof input === 'object') {
    if (isArray$2(input)) {
      if (input.length === 0 || !input[0]) {
        return [];
      } //is it a pre-parsed reg-list?


      if (typeof input[0] === 'object') {
        return input;
      } //support a flat array of normalized words


      if (typeof input[0] === 'string') {
        return byArray(input);
      }
    } //support passing-in a compromise object as a match


    if (input && input.isA === 'Doc') {
      return fromDoc(input);
    }

    return [];
  }

  if (typeof input === 'number') {
    input = String(input); //go for it?
  }

  let tokens = _01ParseBlocks(input); //turn them into objects

  tokens = tokens.map(str => _02ParseToken(str)); //clean up anything weird

  tokens = _03PostProcess(tokens, opts); // add fuzzy limits, etc

  tokens = addOptions(tokens, opts); // console.log(tokens)

  return tokens;
};

var matchSyntax = syntax; // console.log(syntax('[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)'))

// match an explicit sequence of term ids
// take a phrase and find any of the idBlocks in it
const idLookup = function (terms, regs) {
  let matches = [];
  let blocklist = regs[0].idBlocks;

  for (let t = 0; t < terms.length; t += 1) {
    blocklist.forEach(block => {
      if (block.length === 0) {
        return;
      }

      let foundAll = block.every((id, i) => {
        return terms[t + i].id === id;
      });

      if (foundAll) {
        matches.push({
          match: terms.slice(t, t + block.length)
        }); //  skip top-loop forward

        t += block.length - 1;
      }
    });
  }

  return matches;
};

var idLookup_1 = idLookup;

/**  returns a simple array of arrays */

const matchAll = function (p, regs, matchOne = false) {
  //if we forgot to parse it..
  if (typeof regs === 'string') {
    regs = matchSyntax(regs);
  } //try to dismiss it, at-once


  if (_02FailFast(p, regs) === true) {
    return [];
  } //any match needs to be this long, at least


  const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length;
  let terms = p.terms();
  let matches = []; // these id-lookups can be super-fast

  if (regs[0].idBlocks) {
    let res = idLookup_1(terms, regs);

    if (res && res.length > 0) {
      return _04PostProcess(terms, regs, res);
    }
  } //optimisation for '^' start logic


  if (regs[0].start === true) {
    let res = _03TryMatch(terms, regs, 0, terms.length);

    if (res && res.match && res.match.length > 0) {
      res.match = res.match.filter(m => m);
      matches.push(res);
    }

    return _04PostProcess(terms, regs, matches);
  } //try starting, from every term


  for (let i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      break;
    } //try it!


    let res = _03TryMatch(terms.slice(i), regs, i, terms.length);

    if (res && res.match && res.match.length > 0) {
      //zoom forward!
      i += res.match.length - 1; //[capture-groups] return some null responses

      res.match = res.match.filter(m => m);
      matches.push(res); //ok, maybe that's enough?

      if (matchOne === true) {
        return _04PostProcess(terms, regs, matches);
      }
    }
  }

  return _04PostProcess(terms, regs, matches);
};

var _01MatchAll = matchAll;

/** return anything that doesn't match.
 * returns a simple array of arrays
 */

const notMatch = function (p, regs) {
  let found = {};
  let arr = _01MatchAll(p, regs);
  arr.forEach(({
    match: ts
  }) => {
    ts.forEach(t => {
      found[t.id] = true;
    });
  }); //return anything not found

  let terms = p.terms();
  let result = [];
  let current = [];
  terms.forEach(t => {
    if (found[t.id] === true) {
      if (current.length > 0) {
        result.push(current);
        current = [];
      }

      return;
    }

    current.push(t);
  });

  if (current.length > 0) {
    result.push(current);
  }

  return result;
};

var not$1 = notMatch;

/** return an array of matching phrases */

var match_1 = function (regs, justOne = false) {
  let matches = _01MatchAll(this, regs, justOne); //make them phrase objects

  matches = matches.map(({
    match,
    groups
  }) => {
    let p = this.buildFrom(match[0].id, match.length, groups);
    p.cache.terms = match;
    return p;
  });
  return matches;
};
/** return boolean if one match is found */


var has = function (regs) {
  let matches = _01MatchAll(this, regs, true);
  return matches.length > 0;
};
/** remove all matches from the result */


var not = function (regs) {
  let matches = not$1(this, regs); //make them phrase objects

  matches = matches.map(list => {
    return this.buildFrom(list[0].id, list.length);
  });
  return matches;
};
/** return a list of phrases that can have this tag */


var canBe$1 = function (tag, world) {
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
  } //turn them into Phrase objects


  results = results.filter(a => a.length > 0).map(arr => {
    return this.buildFrom(arr[0].id, arr.length);
  });
  return results;
};

var match = {
  match: match_1,
  has: has,
  not: not,
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
      value: pool
    });
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, 'groups', {
      enumerable: false,
      writable: true,
      value: {}
    });
  }

}
/** create a new Phrase object from an id and length */


Phrase.prototype.buildFrom = function (id, length, groups) {
  let p = new Phrase(id, length, this.pool); //copy-over or replace capture-groups too

  if (groups && Object.keys(groups).length > 0) {
    p.groups = groups;
  } else {
    p.groups = this.groups;
  }

  return p;
}; //apply methods


Object.assign(Phrase.prototype, match);
Object.assign(Phrase.prototype, methods$7); //apply aliases

const aliases$1 = {
  term: 'terms'
};
Object.keys(aliases$1).forEach(k => Phrase.prototype[k] = Phrase.prototype[aliases$1[k]]);
var Phrase_1 = Phrase;

/** a key-value store of all terms in our Document */
class Pool {
  constructor(words = {}) {
    //quiet this property in console.logs
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: words
    });
  }
  /** throw a new term object in */


  add(term) {
    this.words[term.id] = term;
    return this;
  }
  /** find a term by it's id */


  get(id) {
    return this.words[id];
  }
  /** find a term by it's id */


  remove(id) {
    delete this.words[id];
  }

  merge(pool) {
    Object.assign(this.words, pool.words);
    return this;
  }
  /** helper method */


  stats() {
    return {
      words: Object.keys(this.words).length
    };
  }

}
/** make a deep-copy of all terms */


Pool.prototype.clone = function () {
  let keys = Object.keys(this.words);
  let words = keys.reduce((h, k) => {
    let t = this.words[k].clone();
    h[t.id] = t;
    return h;
  }, {});
  return new Pool(words);
};

var Pool_1 = Pool;

//add forward/backward 'linked-list' prev/next ids
const linkTerms = terms => {
  terms.forEach((term, i) => {
    if (i > 0) {
      term.prev = terms[i - 1].id;
    }

    if (terms[i + 1]) {
      term.next = terms[i + 1].id;
    }
  });
};

var _linkTerms = linkTerms;

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
const isAcronym = /[ .][A-Z]\.? *$/i;
const hasEllipse = /(?:\u2026|\.{2,}) *$/;
const newLine = /((?:\r?\n|\r)+)/; // Match different new-line formats

const hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;
const startWhitespace = /^\s+/; // Start with a regex:

const naiive_split = function (text) {
  let all = []; //first, split by newline

  let lines = text.split(newLine);

  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    let arr = lines[i].split(initSplit);

    for (let o = 0; o < arr.length; o++) {
      all.push(arr[o]);
    }
  }

  return all;
};
/** does this look like a sentence? */


const isSentence = function (str, abbrevs) {
  // check for 'F.B.I.'
  if (isAcronym.test(str) === true) {
    return false;
  } //check for '...'


  if (hasEllipse.test(str) === true) {
    return false;
  } // must have a letter


  if (hasLetter.test(str) === false) {
    return false;
  }

  let txt = str.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, '');
  let words = txt.split(' ');
  let lastWord = words[words.length - 1].toLowerCase(); // check for 'Mr.'

  if (abbrevs.hasOwnProperty(lastWord)) {
    return false;
  } // //check for jeopardy!
  // if (blacklist.hasOwnProperty(lastWord)) {
  //   return false
  // }


  return true;
};

const splitSentences = function (text, world) {
  let abbrevs = world.cache.abbreviations;
  text = text || '';
  text = String(text);
  let sentences = []; // First do a greedy-split..

  let chunks = []; // Ensure it 'smells like' a sentence

  if (!text || typeof text !== 'string' || hasSomething.test(text) === false) {
    return sentences;
  } // cleanup unicode-spaces


  text = text.replace('\xa0', ' '); // Start somewhere:

  let splits = naiive_split(text); // Filter-out the crap ones

  for (let i = 0; i < splits.length; i++) {
    let s = splits[i];

    if (s === undefined || s === '') {
      continue;
    } //this is meaningful whitespace


    if (hasSomething.test(s) === false) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    } //else, only whitespace, no terms, no sentence


    chunks.push(s);
  } //detection of non-sentence chunks:
  //loop through these chunks, and join the non-sentence chunks back together..


  for (let i = 0; i < chunks.length; i++) {
    let c = chunks[i]; //should this chunk be combined with the next one?

    if (chunks[i + 1] && isSentence(c, abbrevs) === false) {
      chunks[i + 1] = c + (chunks[i + 1] || '');
    } else if (c && c.length > 0) {
      //&& hasLetter.test(c)
      //this chunk is a proper sentence..
      sentences.push(c);
      chunks[i] = '';
    }
  } //if we never got a sentence, return the given text


  if (sentences.length === 0) {
    return [text];
  } //move whitespace to the ends of sentences, when possible
  //['hello',' world'] -> ['hello ','world']


  for (let i = 1; i < sentences.length; i += 1) {
    let ws = sentences[i].match(startWhitespace);

    if (ws !== null) {
      sentences[i - 1] += ws[0];
      sentences[i] = sentences[i].replace(startWhitespace, '');
    }
  }

  return sentences;
};

var _01Sentences = splitSentences; // console.log(sentence_parser('john f. kennedy'));

const wordlike = /\S/;
const isBoundary = /^[!?.]+$/;
const naiiveSplit = /(\S+)/;
const isSlash = /[a-z] ?\/ ?[a-z]*$/;
let notWord = ['.', '?', '!', ':', ';', '-', '–', '—', '--', '...', '(', ')', '[', ']', '"', "'", '`'];
notWord = notWord.reduce((h, c) => {
  h[c] = true;
  return h;
}, {});

const hasHyphen = function (str) {
  //dont split 're-do'
  if (/^(re|un|micro|macro|trans|bi|mono|over)-?[^aeiou]./.test(str) === true) {
    return false;
  } //dont split 'bat-like'


  if (/^([a-z\u00C0-\u00FF/]+)(-|–|—)(like|ish|less|able)/i.test(str) === true) {
    return false;
  } //letter-number 'aug-20'


  let reg = /^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i;

  if (reg.test(str) === true) {
    return true;
  } //number-letter '20-aug'


  let reg2 = /^([0-9]{1,4})(-|–|—)([a-z\u00C0-\u00FF`"'/-]+$)/i;

  if (reg2.test(str) === true) {
    return true;
  }

  return false;
}; // combine '2 - 5' like '2-5' is


const combineRanges = function (arr) {
  const startRange = /^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?(-|–|—) ?$/;
  const endRange = /^[0-9]{1,4}([a-z]{1,2})? ?$/;

  for (let i = 0; i < arr.length - 1; i += 1) {
    if (arr[i + 1] && startRange.test(arr[i]) && endRange.test(arr[i + 1])) {
      arr[i] = arr[i] + arr[i + 1];
      arr[i + 1] = null;
    }
  }

  return arr;
}; // 'he / she' should be one word


const combineSlashes = function (arr) {
  for (let i = 1; i < arr.length - 1; i++) {
    if (isSlash.test(arr[i])) {
      arr[i - 1] += arr[i] + arr[i + 1];
      arr[i] = null;
      arr[i + 1] = null;
    }
  }

  return arr;
};

const splitHyphens = function (word) {
  let arr = []; //support multiple-hyphenated-terms

  const hyphens = word.split(/[-–—]/);
  let whichDash = '-';
  let found = word.match(/[-–—]/);

  if (found && found[0]) {
    whichDash = found;
  }

  for (let o = 0; o < hyphens.length; o++) {
    if (o === hyphens.length - 1) {
      arr.push(hyphens[o]);
    } else {
      arr.push(hyphens[o] + whichDash);
    }
  }

  return arr;
};

const isArray$1 = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}; //turn a string into an array of strings (naiive for now, lumped later)


const splitWords = function (str) {
  let result = [];
  let arr = []; //start with a naiive split

  str = str || '';

  if (typeof str === 'number') {
    str = String(str);
  }

  if (isArray$1(str)) {
    return str;
  }

  const words = str.split(naiiveSplit);

  for (let i = 0; i < words.length; i++) {
    //split 'one-two'
    if (hasHyphen(words[i]) === true) {
      arr = arr.concat(splitHyphens(words[i]));
      continue;
    }

    arr.push(words[i]);
  } //greedy merge whitespace+arr to the right


  let carry = '';

  for (let i = 0; i < arr.length; i++) {
    let word = arr[i]; //if it's more than a whitespace

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
  } //handle last one


  if (carry) {
    if (result.length === 0) {
      result[0] = '';
    }

    result[result.length - 1] += carry; //put it on the end
  } // combine 'one / two'


  result = combineSlashes(result);
  result = combineRanges(result); // remove empty results

  result = result.filter(s => s);
  return result;
};

var _02Words = splitWords;

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
/** turn a string into an array of Phrase objects */


const fromText = function (text = '', world, pool) {
  let sentences = null; //a bit of validation, first

  if (typeof text !== 'string') {
    if (typeof text === 'number') {
      text = String(text);
    } else if (isArray(text)) {
      sentences = text;
    }
  } //tokenize into words


  sentences = sentences || _01Sentences(text, world);
  sentences = sentences.map(str => _02Words(str)); //turn them into proper objects

  pool = pool || new Pool_1();
  let phrases = sentences.map(terms => {
    terms = terms.map(str => {
      let term = new Term_1(str);
      pool.add(term);
      return term;
    }); //add next/previous ids

    _linkTerms(terms); //return phrase objects

    let p = new Phrase_1(terms[0].id, terms.length, pool);
    p.cache.terms = terms;
    return p;
  }); //return them ready for a Document object

  return phrases;
};

var _01Tokenizer = fromText;

const fromJSON = function (json, world) {
  let pool = new Pool_1();
  let phrases = json.map((p, k) => {
    let terms = p.terms.map((o, i) => {
      let term = new Term_1(o.text);
      term.pre = o.pre !== undefined ? o.pre : '';

      if (o.post === undefined) {
        o.post = ' '; //no given space for very last term

        if (i >= p.terms.length - 1) {
          o.post = '. ';

          if (k >= p.terms.length - 1) {
            o.post = '.';
          }
        }
      }

      term.post = o.post !== undefined ? o.post : ' ';

      if (o.tags) {
        o.tags.forEach(tag => term.tag(tag, '', world));
      }

      pool.add(term);
      return term;
    }); //add prev/next links

    _linkTerms(terms); // return a proper Phrase object

    return new Phrase_1(terms[0].id, terms.length, pool);
  });
  return phrases;
};

var fromJSON_1 = fromJSON;

var _version = '13.11.2';

const entity = ['Person', 'Place', 'Organization'];
var nouns = {
  Noun: {
    notA: ['Verb', 'Adjective', 'Adverb']
  },
  // - singular
  Singular: {
    isA: 'Noun',
    notA: 'Plural'
  },
  //a specific thing that's capitalized
  ProperNoun: {
    isA: 'Noun'
  },
  // -- people
  Person: {
    isA: ['ProperNoun', 'Singular'],
    notA: ['Place', 'Organization', 'Date']
  },
  FirstName: {
    isA: 'Person'
  },
  MaleName: {
    isA: 'FirstName',
    notA: ['FemaleName', 'LastName']
  },
  FemaleName: {
    isA: 'FirstName',
    notA: ['MaleName', 'LastName']
  },
  LastName: {
    isA: 'Person',
    notA: ['FirstName']
  },
  NickName: {
    isA: 'Person',
    notA: ['FirstName', 'LastName']
  },
  Honorific: {
    isA: 'Noun',
    notA: ['FirstName', 'LastName', 'Value']
  },
  // -- places
  Place: {
    isA: 'Singular',
    notA: ['Person', 'Organization']
  },
  Country: {
    isA: ['Place', 'ProperNoun'],
    notA: ['City']
  },
  City: {
    isA: ['Place', 'ProperNoun'],
    notA: ['Country']
  },
  Region: {
    isA: ['Place', 'ProperNoun']
  },
  Address: {
    isA: 'Place'
  },
  //---Orgs---
  Organization: {
    isA: ['Singular', 'ProperNoun'],
    notA: ['Person', 'Place']
  },
  SportsTeam: {
    isA: 'Organization'
  },
  School: {
    isA: 'Organization'
  },
  Company: {
    isA: 'Organization'
  },
  // - plural
  Plural: {
    isA: 'Noun',
    notA: ['Singular']
  },
  //(not plural or singular)
  Uncountable: {
    isA: 'Noun'
  },
  Pronoun: {
    isA: 'Noun',
    notA: entity
  },
  //a word for someone doing something -'plumber'
  Actor: {
    isA: 'Noun',
    notA: entity
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    isA: 'Noun',
    notA: ['Person', 'Place']
  },
  //'kilograms'
  Unit: {
    isA: 'Noun',
    notA: entity
  },
  //'Canadians'
  Demonym: {
    isA: ['Noun', 'ProperNoun'],
    notA: entity
  },
  //`john's`
  Possessive: {
    isA: 'Noun' // notA: 'Pronoun',

  }
};

var verbs = {
  Verb: {
    notA: ['Noun', 'Adjective', 'Adverb', 'Value', 'Expression']
  },
  // walks
  PresentTense: {
    isA: 'Verb',
    notA: ['PastTense', 'FutureTense']
  },
  // neutral form - 'walk'
  Infinitive: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Gerund']
  },
  //close the door!
  Imperative: {
    isA: 'Infinitive' // notA: ['PresentTense', 'PastTense', 'FutureTense', 'Gerund'],

  },
  // walking
  Gerund: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Copula', 'FutureTense']
  },
  // walked
  PastTense: {
    isA: 'Verb',
    notA: ['FutureTense']
  },
  // will walk
  FutureTense: {
    isA: 'Verb'
  },
  // is
  Copula: {
    isA: 'Verb'
  },
  // would have
  Modal: {
    isA: 'Verb',
    notA: ['Infinitive']
  },
  // had walked
  PerfectTense: {
    isA: 'Verb',
    notA: 'Gerund'
  },
  Pluperfect: {
    isA: 'Verb'
  },
  // shown
  Participle: {
    isA: 'PastTense'
  },
  // show up
  PhrasalVerb: {
    isA: 'Verb'
  },
  //'up' part
  Particle: {
    isA: 'PhrasalVerb'
  },
  //this can be an adverb
  Auxiliary: {
    notA: ['Noun', 'Adjective', 'Value']
  }
};

var values = {
  Value: {
    notA: ['Verb', 'Adjective', 'Adverb']
  },
  Ordinal: {
    isA: 'Value',
    notA: ['Cardinal']
  },
  Cardinal: {
    isA: 'Value',
    notA: ['Ordinal']
  },
  Fraction: {
    isA: 'Value',
    notA: ['Noun']
  },
  RomanNumeral: {
    isA: 'Cardinal',
    //can be a person, too
    notA: ['Ordinal', 'TextValue']
  },
  TextValue: {
    isA: 'Value',
    notA: ['NumericValue']
  },
  NumericValue: {
    isA: 'Value',
    notA: ['TextValue']
  },
  Money: {
    isA: 'Cardinal'
  },
  Percent: {
    isA: 'Value'
  }
};

const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord'];
var misc = {
  //--Adjectives--
  Adjective: {
    notA: ['Noun', 'Verb', 'Adverb', 'Value']
  },
  // adjectives that can conjugate
  Comparable: {
    isA: ['Adjective']
  },
  // better
  Comparative: {
    isA: ['Adjective']
  },
  // best
  Superlative: {
    isA: ['Adjective'],
    notA: ['Comparative']
  },
  NumberRange: {// isA: ['Contraction'],
  },
  Adverb: {
    notA: ['Noun', 'Verb', 'Adjective', 'Value']
  },
  // Dates:
  //not a noun, but usually is
  Date: {
    notA: ['Verb', 'Adverb', 'Preposition', 'Adjective']
  },
  Month: {
    isA: ['Date', 'Singular'],
    notA: ['Year', 'WeekDay', 'Time']
  },
  WeekDay: {
    isA: ['Date', 'Noun']
  },
  // 'PST'
  Timezone: {
    isA: ['Date', 'Noun'],
    notA: ['Adjective', 'ProperNoun']
  },
  // '9:20pm'
  Time: {
    isA: ['Date'],
    notA: ['AtMention']
  },
  //glue
  Determiner: {
    notA: anything
  },
  Conjunction: {
    notA: anything
  },
  Preposition: {
    notA: anything
  },
  // what, who, why
  QuestionWord: {
    notA: ['Determiner']
  },
  // peso, euro
  Currency: {
    isA: ['Noun']
  },
  // ughh
  Expression: {
    notA: ['Noun', 'Adjective', 'Verb', 'Adverb']
  },
  // dr.
  Abbreviation: {},
  // internet tags
  Url: {
    notA: ['HashTag', 'PhoneNumber', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email']
  },
  PhoneNumber: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email']
  },
  HashTag: {},
  AtMention: {
    isA: ['Noun'],
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'Email']
  },
  Emoji: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention']
  },
  Emoticon: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention']
  },
  Email: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention']
  },
  //non-exclusive
  Acronym: {
    notA: ['Plural', 'RomanNumeral']
  },
  Negative: {
    notA: ['Noun', 'Adjective', 'Value']
  },
  // if, unless, were
  Condition: {
    notA: ['Verb', 'Adjective', 'Noun', 'Value']
  }
};

// i just made these up
const colorMap = {
  Noun: 'blue',
  Verb: 'green',
  Negative: 'green',
  Date: 'red',
  Value: 'red',
  Adjective: 'magenta',
  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adverb: 'cyan'
};
/** add a debug color to some tags */

const addColors = function (tags) {
  Object.keys(tags).forEach(k => {
    // assigned from plugin, for example
    if (tags[k].color) {
      tags[k].color = tags[k].color;
      return;
    } // defined above


    if (colorMap[k]) {
      tags[k].color = colorMap[k];
      return;
    }

    tags[k].isA.some(t => {
      if (colorMap[t]) {
        tags[k].color = colorMap[t];
        return true;
      }

      return false;
    });
  });
  return tags;
};

var _color = addColors;

const unique$2 = function (arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}; //add 'downward' tags (that immediately depend on this one)


const inferIsA = function (tags) {
  Object.keys(tags).forEach(k => {
    let tag = tags[k];
    let len = tag.isA.length;

    for (let i = 0; i < len; i++) {
      let down = tag.isA[i];

      if (tags[down]) {
        tag.isA = tag.isA.concat(tags[down].isA);
      }
    } // clean it up


    tag.isA = unique$2(tag.isA);
  });
  return tags;
};

var _isA = inferIsA;

const unique$1 = function (arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}; // crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time


const inferNotA = function (tags) {
  let keys = Object.keys(tags);
  keys.forEach(k => {
    let tag = tags[k];
    tag.notA = tag.notA || [];
    tag.isA.forEach(down => {
      if (tags[down] && tags[down].notA) {
        // borrow its conflicts
        let notA = typeof tags[down].notA === 'string' ? [tags[down].isA] : tags[down].notA || [];
        tag.notA = tag.notA.concat(notA);
      }
    }); // any tag that lists us as a conflict, we conflict it back.

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (tags[key].notA.indexOf(k) !== -1) {
        tag.notA.push(key);
      }
    } // clean it up


    tag.notA = unique$1(tag.notA);
  });
  return tags;
};

var _notA = inferNotA;

// a lineage is all 'incoming' tags that have this as 'isA'
const inferLineage = function (tags) {
  let keys = Object.keys(tags);
  keys.forEach(k => {
    let tag = tags[k];
    tag.lineage = []; // find all tags with it in their 'isA' set

    for (let i = 0; i < keys.length; i++) {
      if (tags[keys[i]].isA.indexOf(k) !== -1) {
        tag.lineage.push(keys[i]);
      }
    }
  });
  return tags;
};

var _lineage = inferLineage;

const validate = function (tags) {
  // cleanup format
  Object.keys(tags).forEach(k => {
    let tag = tags[k]; // ensure isA is an array

    tag.isA = tag.isA || [];

    if (typeof tag.isA === 'string') {
      tag.isA = [tag.isA];
    } // ensure notA is an array


    tag.notA = tag.notA || [];

    if (typeof tag.notA === 'string') {
      tag.notA = [tag.notA];
    }
  });
  return tags;
}; // build-out the tag-graph structure


const inferTags = function (tags) {
  // validate data
  tags = validate(tags); // build its 'down tags'

  tags = _isA(tags); // infer the conflicts

  tags = _notA(tags); // debug tag color

  tags = _color(tags); // find incoming links

  tags = _lineage(tags);
  return tags;
};

var inference = inferTags;

const addIn = function (obj, tags) {
  Object.keys(obj).forEach(k => {
    tags[k] = obj[k];
  });
};

const build = () => {
  let tags = {};
  addIn(nouns, tags);
  addIn(verbs, tags);
  addIn(values, tags);
  addIn(misc, tags); // do the graph-stuff

  tags = inference(tags);
  return tags;
};

var tags = build();

var _object = {};

var _function = n => n;

const fancy = {
  Unit: (lex, w) => {
    lex[w] = ['Abbreviation', 'Unit'];
  },
  Cardinal: (lex, w) => {
    lex[w] = ['TextValue', 'Cardinal'];
  },
  TextOrdinal: (lex, w) => {
    lex[w] = ['Ordinal', 'TextValue'];
    lex[w + 's'] = ['TextValue', 'Fraction']; // add 'millionths'
  },
  // add plural/singular forms
  Singular: (lex, w, world) => {
    lex[w] = 'Singular';
    let plural = world.transforms.toPlural(w, world);
    lex[plural] = lex[plural] || 'Plural';
  },
  // conjugate these verbs
  Infinitive: (lex, w, world) => {
    lex[w] = 'Infinitive';
    let conj = world.transforms.conjugate(w, world);
    let tags = Object.keys(conj);

    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]];
      lex[str] = lex[str] || tags[i]; // only if it's safe
    }
  },
  // conjugate other Adjectival forms
  Comparable: (lex, w, world) => {
    lex[w] = 'Comparable';
    let conj = world.transforms.adjectives(w);
    let tags = Object.keys(conj);

    for (let i = 0; i < tags.length; i++) {
      let word = conj[tags[i]];
      lex[word] = lex[word] || tags[i]; // only if it's safe
    }
  },
  //conjugate phrasal-verbs
  PhrasalVerb: (lex, w, world) => {
    // whole thing
    lex[w] = ['PhrasalVerb', 'Infinitive']; //add original form

    let words = w.split(' '); // lex[words[0]] = lex[words[0]] || 'Infinitive'
    // //conjugate first word

    let conj = world.transforms.conjugate(words[0], world);
    let tags = Object.keys(conj);

    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]] + ' ' + words[1];
      lex[str] = lex[str] || ['PhrasalVerb', tags[i]];
      world.hasCompound[conj[tags[i]]] = true;
    }
  },
  // inflect our demonyms - 'germans'
  Demonym: (lex, w, world) => {
    lex[w] = 'Demonym';
    let plural = world.transforms.toPlural(w, world);
    lex[plural] = lex[plural] || ['Demonym', 'Plural']; // only if it's safe
  }
}; // let a user explode their lexicon, too

const addWords = function (wordsObj, lex, world) {
  Object.keys(wordsObj).forEach(word => {
    let tag = wordsObj[word]; // abbreviation-words are used in our tokenizer

    if (tag === 'Abbreviation' || tag === 'Unit') {
      world.cache.abbreviations[word] = true;
    } // cache multi-words


    let multi = word.split(' ');

    if (multi.length > 1) {
      world.hasCompound[multi[0]] = true;
    } // do some ad-hoc work before adding it


    if (fancy[tag] !== undefined) {
      fancy[tag](lex, word, world);
      return;
    } //set it in our lexicon, basic


    if (lex[word] === undefined) {
      lex[word] = tag;
      return;
    } // if we already have that word


    if (typeof lex[word] === 'string') {
      lex[word] = [lex[word]];
    }

    if (typeof tag === 'string') {
      lex[word].push(tag);
    } else {
      lex[word] = lex[word].concat(tag);
    }
  });
}; // we do some ad-hoc stuff here, building-up our word-list


const buildOut = function (world) {
  //our bag of words
  let lexicon = Object.assign({}, _object); // start adding words to the lex

  Object.keys(_object).forEach(tag => {
    let wordsObj = _function(_object[tag]); // this part sucks

    Object.keys(wordsObj).forEach(w => {
      wordsObj[w] = tag;
    });
    addWords(wordsObj, lexicon, world);
  }); // console.log(Object.keys(lexicon).length)

  return lexicon;
};

var unpack_1 = {
  buildOut: buildOut,
  addWords: addWords
};

// add words from plurals and conjugations data
const addIrregulars = function (world) {
  //add irregular plural nouns
  let nouns = world.irregulars.nouns;
  let words = Object.keys(nouns);

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    world.words[w] = 'Singular';
    world.words[nouns[w]] = 'Plural';
  } // add irregular verb conjugations


  let verbs = world.irregulars.verbs;
  let keys = Object.keys(verbs);

  for (let i = 0; i < keys.length; i++) {
    const inf = keys[i]; //add only if it it's safe...

    world.words[inf] = world.words[inf] || 'Infinitive';
    let forms = world.transforms.conjugate(inf, world);
    forms = Object.assign(forms, verbs[inf]); //add the others

    Object.keys(forms).forEach(tag => {
      world.words[forms[tag]] = world.words[forms[tag]] || tag; // lexicon should prefer other tags, over participle

      if (world.words[forms[tag]] === 'Participle') {
        world.words[forms[tag]] = tag;
      }
    });
  }
};

var addIrregulars_1 = addIrregulars;

const irregulars$1 = {
  nouns: _object,
  verbs: _object
}; //these behaviours are configurable & shared across some plugins

const transforms = {
  conjugate: _function,
  adjectives: _function,
  toPlural: _function,
  toSingular: _function,
  toInfinitive: _function
};
let isVerbose = false;
/** all configurable linguistic data */

class World {
  constructor() {
    // quiet these properties from a console.log
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: {},
      writable: true
    });
    Object.defineProperty(this, 'hasCompound', {
      enumerable: false,
      value: {},
      writable: true
    });
    Object.defineProperty(this, 'irregulars', {
      enumerable: false,
      value: irregulars$1,
      writable: true
    });
    Object.defineProperty(this, 'tags', {
      enumerable: false,
      value: Object.assign({}, tags),
      writable: true
    });
    Object.defineProperty(this, 'transforms', {
      enumerable: false,
      value: transforms,
      writable: true
    });
    Object.defineProperty(this, 'taggers', {
      enumerable: false,
      value: [],
      writable: true
    }); // cache our abbreviations for our sentence-parser

    Object.defineProperty(this, 'cache', {
      enumerable: false,
      value: {
        abbreviations: {}
      }
    }); // add our compressed data to lexicon

    this.words = unpack_1.buildOut(this); // add our irregulars to lexicon

    addIrregulars_1(this);
  }
  /** more logs for debugging */


  verbose(bool) {
    isVerbose = bool;
    return this;
  }

  isVerbose() {
    return isVerbose;
  }
  /** put new words into our lexicon, properly */


  addWords(wordObj) {
    // clean them up a bit
    let cleaned = {};
    Object.keys(wordObj).forEach(w => {
      let tag = wordObj[w];
      w = w.toLowerCase().trim();
      cleaned[w] = tag;
    });
    unpack_1.addWords(cleaned, this.words, this);
  }
  /** add new custom conjugations */


  addConjugations(obj) {
    Object.assign(this.irregulars.verbs, obj);
    return this;
  }
  /** add new custom plural/singular pairs */


  addPlurals(obj) {
    Object.assign(this.irregulars.nouns, obj);
    return this;
  }
  /** extend the compromise tagset */


  addTags(tags) {
    tags = Object.assign({}, tags);
    this.tags = Object.assign(this.tags, tags); // calculate graph implications for the new tags

    this.tags = inference(this.tags);
    return this;
  }
  /** call methods after tagger runs */


  postProcess(fn) {
    this.taggers.push(fn);
    return this;
  }
  /** helper method for logging + debugging */


  stats() {
    return {
      words: Object.keys(this.words).length,
      plurals: Object.keys(this.irregulars.nouns).length,
      conjugations: Object.keys(this.irregulars.verbs).length,
      compounds: Object.keys(this.hasCompound).length,
      postProcessors: this.taggers.length
    };
  }

} //  ¯\_(:/)_/¯


const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
/** produce a deep-copy of all lingustic data */


World.prototype.clone = function () {
  let w2 = new World(); // these are simple to copy:

  w2.words = Object.assign({}, this.words);
  w2.hasCompound = Object.assign({}, this.hasCompound); //these ones are nested:

  w2.irregulars = clone(this.irregulars);
  w2.tags = clone(this.tags); // these are functions

  w2.transforms = this.transforms;
  w2.taggers = this.taggers;
  return w2;
};

var World_1 = World;

/** return the root, first document */

var _01Utils = createCommonjsModule(function (module, exports) {
  exports.all = function () {
    return this.parents()[0] || this;
  };
  /** return the previous result */


  exports.parent = function () {
    if (this.from) {
      return this.from;
    }

    return this;
  };
  /**  return a list of all previous results */


  exports.parents = function (n) {
    let arr = [];

    const addParent = function (doc) {
      if (doc.from) {
        arr.push(doc.from);
        addParent(doc.from);
      }
    };

    addParent(this);
    arr = arr.reverse();

    if (typeof n === 'number') {
      return arr[n];
    }

    return arr;
  };
  /** deep-copy the document, so that no references remain */


  exports.clone = function (doShallow) {
    let list = this.list.map(ts => ts.clone(doShallow));
    let tmp = this.buildFrom(list);
    return tmp;
  };
  /** how many seperate terms does the document have? */


  exports.wordCount = function () {
    return this.list.reduce((count, p) => {
      count += p.wordCount();
      return count;
    }, 0);
  };

  exports.wordcount = exports.wordCount;
  /** turn on logging for decision-debugging */
  // exports.verbose = function(bool) {
  //   if (bool === undefined) {
  //     bool = true
  //   }
  //   this.world.verbose = bool
  // }
});

/** use only the first result(s) */

var _02Accessors = createCommonjsModule(function (module, exports) {
  exports.first = function (n) {
    if (n === undefined) {
      return this.get(0);
    }

    return this.slice(0, n);
  };
  /** use only the last result(s) */


  exports.last = function (n) {
    if (n === undefined) {
      return this.get(this.list.length - 1);
    }

    let end = this.list.length;
    return this.slice(end - n, end);
  };
  /** grab a given subset of the results*/


  exports.slice = function (start, end) {
    let list = this.list.slice(start, end);
    return this.buildFrom(list);
  };
  /* grab nth result */


  exports.eq = function (n) {
    let p = this.list[n];

    if (p === undefined) {
      return this.buildFrom([]);
    }

    return this.buildFrom([p]);
  };

  exports.get = exports.eq;
  /** grab term[0] for every match */

  exports.firstTerms = function () {
    return this.match('^.');
  };

  exports.firstTerm = exports.firstTerms;
  /** grab the last term for every match  */

  exports.lastTerms = function () {
    return this.match('.$');
  };

  exports.lastTerm = exports.lastTerms;
  /** return a flat array of term objects */

  exports.termList = function (num) {
    let arr = []; //'reduce' but faster

    for (let i = 0; i < this.list.length; i++) {
      let terms = this.list[i].terms();

      for (let o = 0; o < terms.length; o++) {
        arr.push(terms[o]); //support .termList(4)

        if (num !== undefined && arr[num] !== undefined) {
          return arr[num];
        }
      }
    }

    return arr;
  };
  /* grab named capture group terms as object */


  const getGroups = function (doc) {
    let res = {};
    const allGroups = {};

    for (let i = 0; i < doc.list.length; i++) {
      const phrase = doc.list[i];
      const groups = Object.keys(phrase.groups).map(k => phrase.groups[k]);

      for (let j = 0; j < groups.length; j++) {
        const {
          group,
          start,
          length
        } = groups[j];

        if (!allGroups[group]) {
          allGroups[group] = [];
        }

        allGroups[group].push(phrase.buildFrom(start, length));
      }
    }

    const keys = Object.keys(allGroups);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      res[key] = doc.buildFrom(allGroups[key]);
    }

    return res;
  };
  /** lookup a named-group, by its name */


  const getOneName = function (doc, name) {
    const arr = [];

    for (let i = 0; i < doc.list.length; i++) {
      const phrase = doc.list[i];
      let keys = Object.keys(phrase.groups);
      keys = keys.filter(id => phrase.groups[id].group === name);
      keys.forEach(id => {
        arr.push(phrase.buildFrom(phrase.groups[id].start, phrase.groups[id].length));
      });
    }

    return doc.buildFrom(arr);
  };
  /** grab named capture group results */


  exports.groups = function (target) {
    if (target === undefined) {
      return getGroups(this);
    }

    if (typeof target === 'number') {
      target = String(target);
    }

    return getOneName(this, target) || this.buildFrom([]);
  };

  exports.group = exports.groups;
  /** get the full-sentence each phrase belongs to */

  exports.sentences = function (n) {
    let arr = [];
    this.list.forEach(p => {
      arr.push(p.fullSentence());
    });

    if (typeof n === 'number') {
      return this.buildFrom([arr[n]]);
    }

    return this.buildFrom(arr);
  };

  exports.sentence = exports.sentences;
});

// cache the easier conditions up-front
const cacheRequired = function (reg) {
  let needTags = [];
  let needWords = [];
  reg.forEach(obj => {
    if (obj.optional === true || obj.negative === true) {
      return;
    }

    if (obj.tag !== undefined) {
      needTags.push(obj.tag);
    }

    if (obj.word !== undefined) {
      needWords.push(obj.word);
    }
  });
  return {
    tags: needTags,
    words: needWords
  };
}; // try to pre-fail as many matches as possible, without doing them


const failFast = function (doc, regs) {
  if (doc._cache && doc._cache.set === true) {
    let {
      words,
      tags
    } = cacheRequired(regs); //check required words

    for (let i = 0; i < words.length; i++) {
      if (doc._cache.words[words[i]] === undefined) {
        return false;
      }
    } //check required tags


    for (let i = 0; i < tags.length; i++) {
      if (doc._cache.tags[tags[i]] === undefined) {
        return false;
      }
    }
  }

  return true;
};

var _failFast = failFast;

var _03Match = createCommonjsModule(function (module, exports) {
  /** return a new Doc, with this one as a parent */
  exports.match = function (reg, opts = {}) {
    // support '0' shorthand for named-groups
    if (typeof opts === 'string' || typeof opts === 'number' || opts === null) {
      opts = {
        group: opts
      };
    } //parse-up the input expression


    let regs = matchSyntax(reg, opts);

    if (regs.length === 0) {
      return this.buildFrom([]);
    } //check our cache, if it exists


    if (_failFast(this, regs) === false) {
      return this.buildFrom([]);
    } //try expression on each phrase


    let matches = this.list.reduce((arr, p) => {
      return arr.concat(p.match(regs));
    }, []); // support returning named groups

    if (opts.group !== undefined && opts.group !== null && opts.group !== '') {
      return this.buildFrom(matches).groups(opts.group);
    }

    return this.buildFrom(matches);
  };
  /** return all results except for this */


  exports.not = function (reg, opts = {}) {
    //parse-up the input expression
    let regs = matchSyntax(reg, opts); //if it's empty, return them all!

    if (regs.length === 0 || _failFast(this, regs) === false) {
      return this;
    } //try expression on each phrase


    let matches = this.list.reduce((arr, p) => {
      return arr.concat(p.not(regs));
    }, []);
    return this.buildFrom(matches);
  };
  /** return only the first match */


  exports.matchOne = function (reg, opts = {}) {
    let regs = matchSyntax(reg, opts); //check our cache, if it exists

    if (_failFast(this, regs) === false) {
      return this.buildFrom([]);
    }

    for (let i = 0; i < this.list.length; i++) {
      let match = this.list[i].match(regs, true);
      return this.buildFrom(match);
    }

    return this.buildFrom([]);
  };
  /** return each current phrase, only if it contains this match */


  exports.if = function (reg, opts = {}) {
    let regs = matchSyntax(reg, opts); //consult our cache, if it exists

    if (_failFast(this, regs) === false) {
      return this.buildFrom([]);
    }

    let found = this.list.filter(p => p.has(regs) === true);
    return this.buildFrom(found);
  };
  /** Filter-out any current phrases that have this match*/


  exports.ifNo = function (reg, opts = {}) {
    let regs = matchSyntax(reg, opts);
    let found = this.list.filter(p => p.has(regs) === false);
    return this.buildFrom(found);
  };
  /**Return a boolean if this match exists */


  exports.has = function (reg, opts = {}) {
    let regs = matchSyntax(reg, opts); //consult our cache, if it exists

    if (_failFast(this, regs) === false) {
      return false;
    }

    return this.list.some(p => p.has(regs) === true);
  };
  /** match any terms after our matches, within the sentence */


  exports.lookAhead = function (reg, opts = {}) {
    // find everything afterwards, by default
    if (!reg) {
      reg = '.*';
    }

    let regs = matchSyntax(reg, opts);
    let matches = [];
    this.list.forEach(p => {
      matches = matches.concat(p.lookAhead(regs));
    });
    matches = matches.filter(p => p);
    return this.buildFrom(matches);
  };

  exports.lookAfter = exports.lookAhead;
  /** match any terms before our matches, within the sentence */

  exports.lookBehind = function (reg, opts = {}) {
    // find everything afterwards, by default
    if (!reg) {
      reg = '.*';
    }

    let regs = matchSyntax(reg, opts);
    let matches = [];
    this.list.forEach(p => {
      matches = matches.concat(p.lookBehind(regs));
    });
    matches = matches.filter(p => p);
    return this.buildFrom(matches);
  };

  exports.lookBefore = exports.lookBehind;
  /** return all terms before a match, in each phrase */

  exports.before = function (reg, opts = {}) {
    let regs = matchSyntax(reg, opts); //only the phrases we care about

    let phrases = this.if(regs).list;
    let befores = phrases.map(p => {
      let ids = p.terms().map(t => t.id); //run the search again

      let m = p.match(regs)[0];
      let index = ids.indexOf(m.start); //nothing is before a first-term match

      if (index === 0 || index === -1) {
        return null;
      }

      return p.buildFrom(p.start, index);
    });
    befores = befores.filter(p => p !== null);
    return this.buildFrom(befores);
  };
  /** return all terms after a match, in each phrase */


  exports.after = function (reg, opts = {}) {
    let regs = matchSyntax(reg, opts); //only the phrases we care about

    let phrases = this.if(regs).list;
    let befores = phrases.map(p => {
      let terms = p.terms();
      let ids = terms.map(t => t.id); //run the search again

      let m = p.match(regs)[0];
      let index = ids.indexOf(m.start); //skip if nothing is after it

      if (index === -1 || !terms[index + m.length]) {
        return null;
      } //create the new phrase, after our match.


      let id = terms[index + m.length].id;
      let len = p.length - index - m.length;
      return p.buildFrom(id, len);
    });
    befores = befores.filter(p => p !== null);
    return this.buildFrom(befores);
  };
  /** return only results with this match afterwards */


  exports.hasAfter = function (reg, opts = {}) {
    return this.filter(doc => {
      return doc.lookAfter(reg, opts).found;
    });
  };
  /** return only results with this match before it */


  exports.hasBefore = function (reg, opts = {}) {
    return this.filter(doc => {
      return doc.lookBefore(reg, opts).found;
    });
  };
});

/** apply a tag, or tags to all terms */
const tagTerms = function (tag, doc, safe, reason) {
  let tagList = [];

  if (typeof tag === 'string') {
    tagList = tag.split(' ');
  } // doc.parents()[0].reasons.push(reason)
  //do indepenent tags for each term:


  doc.list.forEach(p => {
    let terms = p.terms(); // tagSafe - apply only to fitting terms

    if (safe === true) {
      terms = terms.filter(t => t.canBe(tag, doc.world));
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
  return;
};

var _setTag = tagTerms;

/** Give all terms the given tag */

var tag = function (tags, why) {
  if (!tags) {
    return this;
  }

  _setTag(tags, this, false, why);
  return this;
};
/** Only apply tag to terms if it is consistent with current tags */


var tagSafe = function (tags, why) {
  if (!tags) {
    return this;
  }

  _setTag(tags, this, true, why);
  return this;
};
/** Remove this term from the given terms */


var unTag = function (tags, why) {
  this.list.forEach(p => {
    p.terms().forEach(t => t.unTag(tags, why, this.world));
  });
  return this;
};
/** return only the terms that can be this tag*/


var canBe = function (tag) {
  if (!tag) {
    return this;
  }

  let world = this.world;
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.canBe(tag, world));
  }, []);
  return this.buildFrom(matches);
};

var _04Tag = {
  tag: tag,
  tagSafe: tagSafe,
  unTag: unTag,
  canBe: canBe
};

/* run each phrase through a function, and create a new document */
var map = function (fn) {
  if (!fn) {
    return this;
  }

  let list = this.list.map((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent

    let res = fn(doc, i); // if its a doc, return one result

    if (res && res.list && res.list[0]) {
      return res.list[0];
    }

    return res;
  }); //remove nulls

  list = list.filter(x => x); // return an empty response

  if (list.length === 0) {
    return this.buildFrom(list);
  } // if it is not a list of Phrase objects, then don't try to make a Doc object


  if (typeof list[0] !== 'object' || list[0].isA !== 'Phrase') {
    return list;
  }

  return this.buildFrom(list);
};
/** run a function on each phrase */


var forEach = function (fn, detachParent) {
  if (!fn) {
    return this;
  }

  this.list.forEach((p, i) => {
    let sub = this.buildFrom([p]); // if we're doing fancy insertions, we may want to skip updating the parent each time.

    if (detachParent === true) {
      sub.from = null; //
    }

    fn(sub, i);
  });
  return this;
};
/** return only the phrases that return true */


var filter = function (fn) {
  if (!fn) {
    return this;
  }

  let list = this.list.filter((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });
  return this.buildFrom(list);
};
/** return a document with only the first phrase that matches */


var find = function (fn) {
  if (!fn) {
    return this;
  }

  let phrase = this.list.find((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });

  if (phrase) {
    return this.buildFrom([phrase]);
  }

  return undefined;
};
/** return true or false if there is one matching phrase */


var some = function (fn) {
  if (!fn) {
    return this;
  }

  return this.list.some((p, i) => {
    let doc = this.buildFrom([p]);
    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });
};
/** sample a subset of the results */


var random = function (n) {
  if (!this.found) {
    return this;
  }

  let r = Math.floor(Math.random() * this.list.length);

  if (n === undefined) {
    let list = [this.list[r]];
    return this.buildFrom(list);
  } //prevent it from going over the end


  if (r + n > this.length) {
    r = this.length - n;
    r = r < 0 ? 0 : r;
  }

  return this.slice(r, r + n);
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


var _05Loops = {
  map: map,
  forEach: forEach,
  filter: filter,
  find: find,
  some: some,
  random: random
};

// const tokenize = require('../../01-tokenizer/02-words')
const tokenize = function (str) {
  return str.split(/[ -]/g);
}; // take a list of strings
// look them up in the document


const buildTree = function (termList, values = []) {
  let root = {}; // parse our input

  termList.forEach((str, i) => {
    let val = true;

    if (values[i] !== undefined) {
      val = values[i];
    } // some rough normalization


    str = (str || '').toLowerCase();
    str = str.replace(/[,;.!?]+$/, '');
    let arr = tokenize(str).map(s => s.trim());
    root[arr[0]] = root[arr[0]] || {};

    if (arr.length === 1) {
      root[arr[0]].value = val;
    } else {
      root[arr[0]].more = root[arr[0]].more || [];
      root[arr[0]].more.push({
        rest: arr.slice(1),
        value: val
      });
    }
  }); // sort by longest-first?
  // console.log(JSON.stringify(root, null, 2))

  return root;
};

const fastLookup = function (termList, values, doc) {
  let root = buildTree(termList, values);
  let found = []; // each phrase

  for (let i = 0; i < doc.list.length; i++) {
    const p = doc.list[i];
    let terms = p.terms();
    let words = terms.map(t => t.reduced); // each word

    for (let w = 0; w < words.length; w++) {
      if (root[words[w]] !== undefined) {
        // is it a multi-word match?
        if (root[words[w]].more !== undefined) {
          root[words[w]].more.forEach(more => {
            // is it too-long?
            if (words[w + more.rest.length] === undefined) {
              return;
            } // compare each subsequent term


            let everyTerm = more.rest.every((word, r) => {
              return word === words[w + r + 1];
            });

            if (everyTerm === true) {
              found.push({
                id: p.terms()[w].id,
                value: more.value,
                length: more.rest.length + 1
              });
            }
          });
        } // is it a single-word match?


        if (root[words[w]].value !== undefined) {
          found.push({
            id: p.terms()[w].id,
            value: root[words[w]].value,
            length: 1
          });
        }
      }
    }
  }

  return found;
};

var _lookup = fastLookup;

var _06Lookup = createCommonjsModule(function (module, exports) {
  // compare one term and one match
  // const doesMatch = function(term, str) {
  //   if (str === '') {
  //     return false
  //   }
  //   return term.reduced === str || term.implicit === str || term.root === str || term.text.toLowerCase() === str
  // }
  const isObject = function (obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  };
  /** lookup an array of words or phrases */


  exports.lookup = function (arr) {
    let values = []; //is it a {key:val} object?

    let isObj = isObject(arr);

    if (isObj === true) {
      arr = Object.keys(arr).map(k => {
        values.push(arr[k]);
        return k;
      });
    } // support .lookup('foo')


    if (typeof arr === 'string') {
      arr = [arr];
    } //make sure we go fast.


    if (this._cache.set !== true) {
      this.cache();
    }

    let found = _lookup(arr, values, this);
    let p = this.list[0]; // make object response

    if (isObj === true) {
      let byVal = {};
      found.forEach(o => {
        byVal[o.value] = byVal[o.value] || [];
        byVal[o.value].push(p.buildFrom(o.id, o.length));
      });
      Object.keys(byVal).forEach(k => {
        byVal[k] = this.buildFrom(byVal[k]);
      });
      return byVal;
    } // otherwise, make array response:


    found = found.map(o => p.buildFrom(o.id, o.length));
    return this.buildFrom(found);
  };

  exports.lookUp = exports.lookup;
});

/** freeze the current state of the document, for speed-purposes*/
var cache = function (options) {
  options = options || {};
  let words = {};
  let tags = {};
  this._cache.words = words;
  this._cache.tags = tags;
  this._cache.set = true;
  this.list.forEach((p, i) => {
    p.cache = p.cache || {}; //p.terms get cached automatically

    let terms = p.terms(); // cache all the terms

    terms.forEach(t => {
      if (words[t.reduced] && !words.hasOwnProperty(t.reduced)) {
        return; //skip prototype words
      }

      words[t.reduced] = words[t.reduced] || [];
      words[t.reduced].push(i);
      Object.keys(t.tags).forEach(tag => {
        tags[tag] = tags[tag] || [];
        tags[tag].push(i);
      }); // cache root-form on Term, too

      if (options.root) {
        t.setRoot(this.world);
        words[t.root] = [i];
      }
    });
  });
  return this;
};
/** un-freezes the current state of the document, so it may be transformed */


var uncache = function () {
  this._cache = {};
  this.list.forEach(p => {
    p.cache = {};
  }); // do parents too?

  this.parents().forEach(doc => {
    doc._cache = {};
    doc.list.forEach(p => {
      p.cache = {};
    });
  });
  return this;
};

var _07Cache = {
  cache: cache,
  uncache: uncache
};

const titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
/** substitute-in new content */


var replaceWith = function (replace, options = {}) {
  if (!replace) {
    return this.delete();
  } //support old-style params


  if (options === true) {
    options = {
      keepTags: true
    };
  }

  if (options === false) {
    options = {
      keepTags: false
    };
  }

  options = options || {}; // clear the cache

  this.uncache(); // return this

  this.list.forEach(p => {
    let input = replace; // accept a function for replace

    if (typeof replace === 'function') {
      input = replace(p);
    }

    let newPhrases; // accept a Doc object to replace

    if (input && typeof input === 'object' && input.isA === 'Doc') {
      newPhrases = input.list;
      this.pool().merge(input.pool());
    } else if (typeof input === 'string') {
      //input is a string
      if (options.keepCase !== false && p.terms(0).isTitleCase()) {
        input = titleCase(input);
      }

      newPhrases = _01Tokenizer(input, this.world, this.pool()); //tag the new phrases

      let tmpDoc = this.buildFrom(newPhrases);
      tmpDoc.tagger();
      newPhrases = tmpDoc.list;
    } else {
      return; //don't even bother
    } // try to keep its old tags, if appropriate


    if (options.keepTags === true) {
      let oldTags = p.json({
        terms: {
          tags: true
        }
      }).terms;
      newPhrases[0].terms().forEach((t, i) => {
        if (oldTags[i]) {
          t.tagSafe(oldTags[i].tags, 'keptTag', this.world);
        }
      });
    }

    p.replace(newPhrases[0], this); //Oneday: support multi-sentence replacements
  });
  return this;
};
/** search and replace match with new content */


var replace = function (match, replace, options) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match, options);
  }

  this.match(match).replaceWith(replace, options);
  return this;
};

var _01Replace = {
  replaceWith: replaceWith,
  replace: replace
};

var _02Insert = createCommonjsModule(function (module, exports) {
  const isObject = function (obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  }; // if it's empty, just create the phrase


  const makeNew = function (str, doc) {
    let phrase = _01Tokenizer(str, doc.world)[0]; //assume it's one sentence, for now

    let tmpDoc = doc.buildFrom([phrase]);
    tmpDoc.tagger();
    doc.list = tmpDoc.list;
    return doc;
  };
  /** add these new terms to the end*/


  exports.append = function (str = '') {
    if (!str) {
      return this;
    } // if it's empty, just create the phrase


    if (!this.found) {
      return makeNew(str, this);
    } // clear the cache


    this.uncache(); //add it to end of every phrase

    this.list.forEach(p => {
      //build it
      let phrase;

      if (isObject(str) && str.isA === 'Doc') {
        phrase = str.list[0].clone(); //use the first phrase
      } else if (typeof str === 'string') {
        phrase = _01Tokenizer(str, this.world, this.pool())[0]; //assume it's one sentence, for now
      } //tag it


      let tmpDoc = this.buildFrom([phrase]);
      tmpDoc.tagger(); // push it onto the end

      p.append(phrase, this);
    });
    return this;
  };

  exports.insertAfter = exports.append;
  exports.insertAt = exports.append;
  /** add these new terms to the front*/

  exports.prepend = function (str) {
    if (!str) {
      return this;
    } // if it's empty, just create the phrase


    if (!this.found) {
      return makeNew(str, this);
    } // clear the cache


    this.uncache(); //add it to start of every phrase

    this.list.forEach(p => {
      //build it
      let phrase;

      if (isObject(str) && str.isA === 'Doc') {
        phrase = str.list[0].clone(); //use the first phrase
      } else if (typeof str === 'string') {
        phrase = _01Tokenizer(str, this.world, this.pool())[0]; //assume it's one sentence, for now
      } //tag it


      let tmpDoc = this.buildFrom([phrase]);
      tmpDoc.tagger(); // add it to the start

      p.prepend(phrase, this);
    });
    return this;
  };

  exports.insertBefore = exports.prepend;
  /** add these new things to the end*/

  exports.concat = function () {
    // clear the cache
    this.uncache();
    let list = this.list.slice(0); //repeat for any number of params

    for (let i = 0; i < arguments.length; i++) {
      let arg = arguments[i]; //support a fresh string

      if (typeof arg === 'string') {
        let arr = _01Tokenizer(arg, this.world); //TODO: phrase.tagger()?

        list = list.concat(arr);
      } else if (arg.isA === 'Doc') {
        list = list.concat(arg.list);
      } else if (arg.isA === 'Phrase') {
        list.push(arg);
      }
    }

    return this.buildFrom(list);
  };
  /** fully remove these terms from the document */


  exports.delete = function (match) {
    // clear the cache
    this.uncache();
    let toRemove = this;

    if (match) {
      toRemove = this.match(match);
    }

    toRemove.list.forEach(phrase => phrase.delete(this));
    return this;
  }; // aliases


  exports.remove = exports.delete;
});

const shouldTrim = {
  clean: true,
  reduced: true,
  root: true
};
/** return the document as text */

var text = function (options) {
  options = options || {}; //are we showing every phrase?

  let showFull = false;

  if (this.parents().length === 0) {
    showFull = true;
  } // cache roots, if necessary


  if (options === 'root' || typeof options === 'object' && options.root) {
    this.list.forEach(p => {
      p.terms().forEach(t => {
        if (t.root === null) {
          t.setRoot(this.world);
        }
      });
    });
  }

  let txt = this.list.reduce((str, p, i) => {
    const trimPre = !showFull && i === 0;
    const trimPost = !showFull && i === this.list.length - 1;
    return str + p.text(options, trimPre, trimPost);
  }, ''); // clumsy final trim of leading/trailing whitespace

  if (shouldTrim[options] === true || options.reduced === true || options.clean === true || options.root === true) {
    txt = txt.trim();
  }

  return txt;
};

var _01Text = {
  text: text
};

// get all character startings in doc
const termOffsets = function (doc) {
  let elapsed = 0;
  let index = 0;
  let offsets = {};
  doc.termList().forEach(term => {
    offsets[term.id] = {
      index: index,
      start: elapsed + term.pre.length,
      length: term.text.length
    };
    elapsed += term.pre.length + term.text.length + term.post.length;
    index += 1;
  });
  return offsets;
};

const calcOffset = function (doc, result, options) {
  // calculate offsets for each term
  let offsets = termOffsets(doc.all()); // add index values

  if (options.terms.index || options.index) {
    result.forEach(o => {
      o.terms.forEach(t => {
        t.index = offsets[t.id].index;
      });
      o.index = o.terms[0].index;
    });
  } // add offset values


  if (options.terms.offset || options.offset) {
    result.forEach(o => {
      o.terms.forEach(t => {
        t.offset = offsets[t.id] || {};
      }); // let len = o.terms.reduce((n, t, i) => {
      //   n += t.offset.length || 0
      //   //add whitespace, too
      //   console.log(t.post)
      //   return n
      // }, 0)
      // The offset information for the entire doc starts at (or just before)
      // the first term, and is as long as the whole text.  The code originally
      // copied the entire offset value from terms[0], but since we're now
      // overriding 2 of the three fields, it's cleaner to just create an all-
      // new object and not pretend it's "just" the same as terms[0].

      o.offset = {
        index: o.terms[0].offset.index,
        start: o.terms[0].offset.start - o.text.indexOf(o.terms[0].text),
        length: o.text.length
      };
    });
  }
};

var _offset = calcOffset;

var _02Json = createCommonjsModule(function (module, exports) {
  const jsonDefaults = {
    text: true,
    terms: true,
    trim: true
  }; //some options have dependents

  const setOptions = function (options) {
    options = Object.assign({}, jsonDefaults, options);

    if (options.unique) {
      options.reduced = true;
    } //offset calculation requires these options to be on


    if (options.offset) {
      options.text = true;

      if (!options.terms || options.terms === true) {
        options.terms = {};
      }

      options.terms.offset = true;
    }

    if (options.index || options.terms.index) {
      options.terms = options.terms === true ? {} : options.terms;
      options.terms.id = true;
    }

    return options;
  };
  /** pull out desired metadata from the document */


  exports.json = function (options = {}) {
    //support json(3) format
    if (typeof options === 'number' && this.list[options]) {
      return this.list[options].json(jsonDefaults);
    }

    options = setOptions(options); // cache root strings beforehand, if necessary

    if (options.root === true) {
      this.list.forEach(p => {
        p.terms().forEach(t => {
          if (t.root === null) {
            t.setRoot(this.world);
          }
        });
      });
    }

    let result = this.list.map(p => {
      return p.json(options, this.world);
    }); // add offset and index data for each term

    if (options.terms.offset || options.offset || options.terms.index || options.index) {
      _offset(this, result, options);
    } // add frequency #s


    if (options.frequency || options.freq || options.count) {
      let obj = {};
      this.list.forEach(p => {
        let str = p.text('reduced');
        obj[str] = obj[str] || 0;
        obj[str] += 1;
      });
      this.list.forEach((p, i) => {
        result[i].count = obj[p.text('reduced')];
      });
    } // remove duplicates


    if (options.unique) {
      let already = {};
      result = result.filter(o => {
        if (already[o.reduced] === true) {
          return false;
        }

        already[o.reduced] = true;
        return true;
      });
    }

    return result;
  }; //aliases


  exports.data = exports.json;
});

var _debug = createCommonjsModule(function (module) {
  // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  const reset = '\x1b[0m';

  const padEnd = function (str, width) {
    str = str.toString();

    while (str.length < width) {
      str += ' ';
    }

    return str;
  };

  function isClientSide() {
    return typeof window !== 'undefined' && window.document;
  } // some nice colors for client-side debug


  const css = {
    green: '#7f9c6c',
    red: '#914045',
    blue: '#6699cc',
    magenta: '#6D5685',
    cyan: '#2D85A8',
    yellow: '#e6d7b3',
    black: '#303b50'
  };

  const logClientSide = function (doc) {
    let tagset = doc.world.tags;
    doc.list.forEach(p => {
      console.log('\n%c"' + p.text() + '"', 'color: #e6d7b3;');
      let terms = p.terms();
      terms.forEach(t => {
        let tags = Object.keys(t.tags);
        let text = t.text || '-';

        if (t.implicit) {
          text = '[' + t.implicit + ']';
        }

        let word = "'" + text + "'";
        word = padEnd(word, 8);
        let found = tags.find(tag => tagset[tag] && tagset[tag].color);
        let color = 'steelblue';

        if (tagset[found]) {
          color = tagset[found].color;
          color = css[color];
        }

        console.log(`   ${word}  -  %c${tags.join(', ')}`, `color: ${color || 'steelblue'};`);
      });
    });
  }; //cheaper than requiring chalk


  const cli = {
    green: function (str) {
      return '\x1b[32m' + str + reset;
    },
    red: function (str) {
      return '\x1b[31m' + str + reset;
    },
    blue: function (str) {
      return '\x1b[34m' + str + reset;
    },
    magenta: function (str) {
      return '\x1b[35m' + str + reset;
    },
    cyan: function (str) {
      return '\x1b[36m' + str + reset;
    },
    yellow: function (str) {
      return '\x1b[33m' + str + reset;
    },
    black: function (str) {
      return '\x1b[30m' + str + reset;
    }
  };

  const tagString = function (tags, world) {
    tags = tags.map(tag => {
      if (!world.tags.hasOwnProperty(tag)) {
        return tag;
      }

      const c = world.tags[tag].color || 'blue';
      return cli[c](tag);
    });
    return tags.join(', ');
  }; //output some helpful stuff to the console


  const debug = function (doc) {
    if (isClientSide()) {
      logClientSide(doc);
      return doc;
    }

    console.log(cli.blue('====='));
    doc.list.forEach(p => {
      console.log(cli.blue('  -----'));
      let terms = p.terms();
      terms.forEach(t => {
        let tags = Object.keys(t.tags);
        let text = t.text || '-';

        if (t.implicit) {
          text = '[' + t.implicit + ']';
        }

        {
          text = cli.yellow(text);
        }

        let word = "'" + text + "'";
        word = padEnd(word, 18);
        let str = cli.blue('  ｜ ') + word + '  - ' + tagString(tags, doc.world);
        console.log(str);
      });
    });
    console.log('');
    return doc;
  };

  module.exports = debug;
});

const topk = function (doc) {
  let list = doc.json({
    text: false,
    terms: false,
    reduced: true
  }); // combine them

  let obj = {};
  list.forEach(o => {
    if (!obj[o.reduced]) {
      o.count = 0;
      obj[o.reduced] = o;
    }

    obj[o.reduced].count += 1;
  });
  let arr = Object.keys(obj).map(k => obj[k]); // sort them

  arr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (a.count < b.count) {
      return 1;
    }

    return 0;
  });
  return arr;
};

var _topk = topk;

/** pretty-print the current document and its tags */

var debug_1 = function () {
  _debug(this);
  return this;
};
/** some named output formats */


var out = function (method) {
  if (method === 'text') {
    return this.text();
  }

  if (method === 'normal') {
    return this.text('normal');
  }

  if (method === 'json') {
    return this.json();
  }

  if (method === 'offset' || method === 'offsets') {
    return this.json({
      offset: true
    });
  }

  if (method === 'array') {
    return this.json({
      terms: false
    }).map(obj => obj.text).filter(str => str);
  }

  if (method === 'freq' || method === 'frequency') {
    return _topk(this);
  }

  if (method === 'terms') {
    let list = [];
    this.json({
      text: false,
      terms: {
        text: true
      }
    }).forEach(obj => {
      let terms = obj.terms.map(t => t.text);
      terms = terms.filter(t => t);
      list = list.concat(terms);
    });
    return list;
  }

  if (method === 'tags') {
    return this.list.map(p => {
      return p.terms().reduce((h, t) => {
        h[t.clean || t.implicit] = Object.keys(t.tags);
        return h;
      }, {});
    });
  }

  if (method === 'debug') {
    _debug(this);
    return this;
  }

  return this.text();
};

var _03Out = {
  debug: debug_1,
  out: out
};

const methods$6 = {
  /** alphabetical order */
  alpha: (a, b) => {
    let left = a.text('clean');
    let right = b.text('clean');

    if (left < right) {
      return -1;
    }

    if (left > right) {
      return 1;
    }

    return 0;
  },

  /** count the # of characters of each match */
  length: (a, b) => {
    let left = a.text().trim().length;
    let right = b.text().trim().length;

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  },

  /** count the # of terms in each match */
  wordCount: (a, b) => {
    let left = a.wordCount();
    let right = b.wordCount();

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  }
};
/** sort by # of duplicates in the document*/

const byFreq = function (doc) {
  let counts = {};
  const options = {
    case: true,
    punctuation: false,
    whitespace: true,
    unicode: true
  };
  doc.list.forEach(p => {
    let str = p.text(options);
    counts[str] = counts[str] || 0;
    counts[str] += 1;
  }); // sort by freq

  doc.list.sort((a, b) => {
    let left = counts[a.text(options)];
    let right = counts[b.text(options)];

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  });
  return doc;
}; // order results 'chronologically', or document-order


const sortSequential = function (doc) {
  let order = {};
  doc.json({
    terms: {
      offset: true
    }
  }).forEach(o => {
    order[o.terms[0].id] = o.terms[0].offset.start;
  });
  doc.list = doc.list.sort((a, b) => {
    if (order[a.start] > order[b.start]) {
      return 1;
    } else if (order[a.start] < order[b.start]) {
      return -1;
    }

    return 0;
  });
  return doc;
}; //aliases


methods$6.alphabetical = methods$6.alpha;
methods$6.wordcount = methods$6.wordCount; // aliases for sequential ordering

const seqNames = {
  index: true,
  sequence: true,
  seq: true,
  sequential: true,
  chron: true,
  chronological: true
};
/** re-arrange the order of the matches (in place) */

var sort = function (input) {
  input = input || 'alpha'; //do this one up-front

  if (input === 'freq' || input === 'frequency' || input === 'topk') {
    return byFreq(this);
  }

  if (seqNames.hasOwnProperty(input)) {
    return sortSequential(this);
  }

  input = methods$6[input] || input; // apply sort method on each phrase

  if (typeof input === 'function') {
    this.list = this.list.sort(input);
    return this;
  }

  return this;
};
/** reverse the order of the matches, but not the words */


var reverse = function () {
  let list = [].concat(this.list);
  list = list.reverse();
  return this.buildFrom(list);
};
/** remove any duplicate matches */


var unique = function () {
  let list = [].concat(this.list);
  let obj = {};
  list = list.filter(p => {
    let str = p.text('reduced').trim() || p.text('implicit').trim();

    if (obj.hasOwnProperty(str) === true) {
      return false;
    }

    obj[str] = true;
    return true;
  });
  return this.buildFrom(list);
};

var _01Sort = {
  sort: sort,
  reverse: reverse,
  unique: unique
};

const isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
const quotes = /['‘’“”"′″‴]+/g;
const methods$5 = {
  // cleanup newlines and extra spaces
  whitespace: function (doc) {
    let termArr = doc.list.map(ts => ts.terms());
    termArr.forEach((terms, o) => {
      terms.forEach((t, i) => {
        // keep dashes between words
        if (t.hasDash() === true) {
          t.post = ' - ';
          return;
        } // remove existing spaces


        t.pre = t.pre.replace(/\s/g, '');
        t.post = t.post.replace(/\s/g, ''); //last word? ensure there's a next sentence.

        if (terms.length - 1 === i && !termArr[o + 1]) {
          return;
        } // no extra spaces for contractions


        if (t.implicit && Boolean(t.text) === true) {
          return;
        } // no extra spaces for hyphenated words


        if (t.hasHyphen() === true) {
          return;
        }

        t.post += ' ';
      });
    });
  },
  punctuation: function (termList) {
    termList.forEach(t => {
      // space between hyphenated words
      if (t.hasHyphen() === true) {
        t.post = ' ';
      }

      t.pre = t.pre.replace(isPunct, '');
      t.post = t.post.replace(isPunct, ''); // elipses

      t.post = t.post.replace(/\.\.\./, ''); // only allow one exclamation

      if (/!/.test(t.post) === true) {
        t.post = t.post.replace(/!/g, '');
        t.post = '!' + t.post;
      } // only allow one question mark


      if (/\?/.test(t.post) === true) {
        t.post = t.post.replace(/[\?!]*/, '');
        t.post = '?' + t.post;
      }
    });
  },
  unicode: function (termList) {
    termList.forEach(t => {
      if (t.isImplicit() === true) {
        return;
      }

      t.text = unicode_1(t.text);
    });
  },
  quotations: function (termList) {
    termList.forEach(t => {
      t.post = t.post.replace(quotes, '');
      t.pre = t.pre.replace(quotes, '');
    });
  },
  adverbs: function (doc) {
    doc.match('#Adverb').not('(not|nary|seldom|never|barely|almost|basically|so)').remove();
  },
  // remove the '.' from 'Mrs.' (safely)
  abbreviations: function (doc) {
    doc.list.forEach(ts => {
      let terms = ts.terms();
      terms.forEach((t, i) => {
        if (t.tags.Abbreviation === true && terms[i + 1]) {
          t.post = t.post.replace(/^\./, '');
        }
      });
    });
  }
};
var _methods = methods$5;

const defaults = {
  // light
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,
  // medium
  case: false,
  contractions: false,
  parentheses: false,
  quotations: false,
  adverbs: false,
  // heavy (loose legibility)
  possessives: false,
  verbs: false,
  nouns: false,
  honorifics: false // pronouns: true,

};
const mapping = {
  light: {},
  medium: {
    case: true,
    contractions: true,
    parentheses: true,
    quotations: true,
    adverbs: true
  }
};
mapping.heavy = Object.assign({}, mapping.medium, {
  possessives: true,
  verbs: true,
  nouns: true,
  honorifics: true
});
/** common ways to clean-up the document, and reduce noise */

var normalize = function (options) {
  options = options || {}; // support named forms

  if (typeof options === 'string') {
    options = mapping[options] || {};
  } // set defaults


  options = Object.assign({}, defaults, options); // clear the cache

  this.uncache();
  let termList = this.termList(); // lowercase things

  if (options.case) {
    this.toLowerCase();
  } //whitespace


  if (options.whitespace) {
    _methods.whitespace(this);
  } // unicode: é -> e


  if (options.unicode) {
    _methods.unicode(termList);
  } //punctuation - keep sentence punctation, quotes, parenths


  if (options.punctuation) {
    _methods.punctuation(termList);
  } // remove ':)'


  if (options.emoji) {
    this.remove('(#Emoji|#Emoticon)');
  } // 'f.b.i.' -> 'FBI'


  if (options.acronyms) {
    this.acronyms().strip(); // .toUpperCase()
  } // remove period from abbreviations


  if (options.abbreviations) {
    _methods.abbreviations(this);
  } // --Medium methods--
  // `isn't` -> 'is not'


  if (options.contraction || options.contractions) {
    this.contractions().expand();
  } // '(word)' -> 'word'


  if (options.parentheses) {
    this.parentheses().unwrap();
  } // remove "" punctuation


  if (options.quotations || options.quotes) {
    _methods.quotations(termList);
  } // remove any un-necessary adverbs


  if (options.adverbs) {
    _methods.adverbs(this);
  } // --Heavy methods--
  // `cory hart's -> cory hart'


  if (options.possessive || options.possessives) {
    this.possessives().strip();
  } // 'he walked' -> 'he walk'


  if (options.verbs) {
    this.verbs().toInfinitive();
  } // 'three dogs' -> 'three dog'


  if (options.nouns || options.plurals) {
    this.nouns().toSingular();
  } // remove 'Mr.' from 'Mr John Smith'


  if (options.honorifics) {
    this.remove('#Honorific');
  }

  return this;
};

var _02Normalize = {
  normalize: normalize
};

var _03Split = createCommonjsModule(function (module, exports) {
  /** return a Document with three parts for every match
   * seperate everything before the word, as a new phrase
   */
  exports.splitOn = function (reg) {
    // if there's no match, split parent, instead
    if (!reg) {
      let parent = this.parent();
      return parent.splitOn(this);
    } //start looking for a match..


    let regs = matchSyntax(reg);
    let matches = [];
    this.list.forEach(p => {
      let foundEm = p.match(regs); //no match here, add full sentence

      if (foundEm.length === 0) {
        matches.push(p);
        return;
      } // we found something here.


      let carry = p;
      foundEm.forEach(found => {
        let parts = carry.splitOn(found); // add em in

        if (parts.before) {
          matches.push(parts.before);
        }

        if (parts.match) {
          matches.push(parts.match);
        } // start matching now on the end


        carry = parts.after;
      }); // add that last part

      if (carry) {
        matches.push(carry);
      }
    });
    return this.buildFrom(matches);
  };
  /** return a Document with two parts for every match
   * seperate everything after the word, as a new phrase
   */


  exports.splitAfter = function (reg) {
    // if there's no match, split parent, instead
    if (!reg) {
      let parent = this.parent();
      return parent.splitAfter(this);
    } // start looking for our matches


    let regs = matchSyntax(reg);
    let matches = [];
    this.list.forEach(p => {
      let foundEm = p.match(regs); //no match here, add full sentence

      if (foundEm.length === 0) {
        matches.push(p);
        return;
      } // we found something here.


      let carry = p;
      foundEm.forEach(found => {
        let parts = carry.splitOn(found); // add em in

        if (parts.before && parts.match) {
          // merge these two together
          parts.before.length += parts.match.length;
          matches.push(parts.before);
        } else if (parts.match) {
          matches.push(parts.match);
        } // start matching now on the end


        carry = parts.after;
      }); // add that last part

      if (carry) {
        matches.push(carry);
      }
    });
    return this.buildFrom(matches);
  };

  exports.split = exports.splitAfter; //i guess?

  /** return a Document with two parts for every match */

  exports.splitBefore = function (reg) {
    // if there's no match, split parent, instead
    if (!reg) {
      let parent = this.parent();
      return parent.splitBefore(this);
    } //start looking for a match..


    let regs = matchSyntax(reg);
    let matches = [];
    this.list.forEach(p => {
      let foundEm = p.match(regs); //no match here, add full sentence

      if (foundEm.length === 0) {
        matches.push(p);
        return;
      } // we found something here.


      let carry = p;
      foundEm.forEach(found => {
        let parts = carry.splitOn(found); // add before part in

        if (parts.before) {
          matches.push(parts.before);
        } // merge match+after


        if (parts.match && parts.after) {
          parts.match.length += parts.after.length;
        } // start matching now on the end


        carry = parts.match;
      }); // add that last part

      if (carry) {
        matches.push(carry);
      }
    });
    return this.buildFrom(matches);
  };
  /** split a document into labeled sections */


  exports.segment = function (regs, options) {
    regs = regs || {};
    options = options || {
      text: true
    };
    let doc = this;
    let keys = Object.keys(regs); // split em

    keys.forEach(k => {
      doc = doc.splitOn(k);
    }); //add labels for each section

    doc.list.forEach(p => {
      for (let i = 0; i < keys.length; i += 1) {
        if (p.has(keys[i])) {
          p.segment = regs[keys[i]];
          return;
        }
      }
    });
    return doc.list.map(p => {
      let res = p.json(options);
      res.segment = p.segment || null;
      return res;
    });
  };
});

const eachTerm = function (doc, fn) {
  let world = doc.world;
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn](world));
  });
  return doc;
};
/** turn every letter of every term to lower-cse */


var toLowerCase = function () {
  return eachTerm(this, 'toLowerCase');
};
/** turn every letter of every term to upper case */


var toUpperCase = function () {
  return eachTerm(this, 'toUpperCase');
};
/** upper-case the first letter of each term */


var toTitleCase = function () {
  return eachTerm(this, 'toTitleCase');
};
/** remove whitespace and title-case each term */


var toCamelCase = function () {
  this.list.forEach(p => {
    //remove whitespace
    let terms = p.terms();
    terms.forEach((t, i) => {
      if (i !== 0) {
        t.toTitleCase();
      }

      if (i !== terms.length - 1) {
        t.post = '';
      }
    });
  }); // this.tag('#CamelCase', 'toCamelCase')

  return this;
};

var _04Case = {
  toLowerCase: toLowerCase,
  toUpperCase: toUpperCase,
  toTitleCase: toTitleCase,
  toCamelCase: toCamelCase
};

/** add this punctuation or whitespace before each match: */

var _05Whitespace = createCommonjsModule(function (module, exports) {
  exports.pre = function (str, concat) {
    if (str === undefined) {
      return this.list[0].terms(0).pre;
    }

    this.list.forEach(p => {
      let term = p.terms(0);

      if (concat === true) {
        term.pre += str;
      } else {
        term.pre = str;
      }
    });
    return this;
  };
  /** add this punctuation or whitespace after each match: */


  exports.post = function (str, concat) {
    // return array of post strings
    if (str === undefined) {
      return this.list.map(p => {
        let terms = p.terms();
        let term = terms[terms.length - 1];
        return term.post;
      });
    } // set post string on all ends


    this.list.forEach(p => {
      let terms = p.terms();
      let term = terms[terms.length - 1];

      if (concat === true) {
        term.post += str;
      } else {
        term.post = str;
      }
    });
    return this;
  };
  /** remove start and end whitespace */


  exports.trim = function () {
    this.list = this.list.map(p => p.trim());
    return this;
  };
  /** connect words with hyphen, and remove whitespace */


  exports.hyphenate = function () {
    this.list.forEach(p => {
      let terms = p.terms(); //remove whitespace

      terms.forEach((t, i) => {
        if (i !== 0) {
          t.pre = '';
        }

        if (terms[i + 1]) {
          t.post = '-';
        }
      });
    });
    return this;
  };
  /** remove hyphens between words, and set whitespace */


  exports.dehyphenate = function () {
    const hasHyphen = /(-|–|—)/;
    this.list.forEach(p => {
      let terms = p.terms(); //remove whitespace

      terms.forEach(t => {
        if (hasHyphen.test(t.post)) {
          t.post = ' ';
        }
      });
    });
    return this;
  };

  exports.deHyphenate = exports.dehyphenate;
  /** add quotations around these matches */

  exports.toQuotations = function (start, end) {
    start = start || `"`;
    end = end || `"`;
    this.list.forEach(p => {
      let terms = p.terms();
      terms[0].pre = start + terms[0].pre;
      let last = terms[terms.length - 1];
      last.post = end + last.post;
    });
    return this;
  };

  exports.toQuotation = exports.toQuotations;
  /** add brackets around these matches */

  exports.toParentheses = function (start, end) {
    start = start || `(`;
    end = end || `)`;
    this.list.forEach(p => {
      let terms = p.terms();
      terms[0].pre = start + terms[0].pre;
      let last = terms[terms.length - 1];
      last.post = end + last.post;
    });
    return this;
  };
});

/** make all phrases into one phrase */
var join = function (str) {
  // clear the cache
  this.uncache(); // make one large phrase - 'main'

  let main = this.list[0];
  let before = main.length;
  let removed = {};

  for (let i = 1; i < this.list.length; i++) {
    const p = this.list[i];
    removed[p.start] = true;
    let term = main.lastTerm(); // add whitespace between them

    if (str) {
      term.post += str;
    } //  main -> p


    term.next = p.start; // main <- p

    p.terms(0).prev = term.id;
    main.length += p.length;
    main.cache = {};
  } // parents are bigger than than their children.
  // when we increase a child, we increase their parent too.


  let increase = main.length - before;
  this.parents().forEach(doc => {
    // increase length on each effected phrase
    doc.list.forEach(p => {
      let terms = p.terms();

      for (let i = 0; i < terms.length; i++) {
        if (terms[i].id === main.start) {
          p.length += increase;
          break;
        }
      }

      p.cache = {};
    }); // remove redundant phrases now

    doc.list = doc.list.filter(p => removed[p.start] !== true);
  }); // return one major phrase

  return this.buildFrom([main]);
};

var _06Join = {
  join: join
};

const postPunct = /[,\)"';:\-–—\.…]/; // const irregulars = {
//   'will not': `won't`,
//   'i am': `i'm`,
// }

const setContraction = function (m, suffix) {
  if (!m.found) {
    return;
  }

  let terms = m.termList(); //avoid any problematic punctuation

  for (let i = 0; i < terms.length - 1; i++) {
    const t = terms[i];

    if (postPunct.test(t.post)) {
      return;
    }
  } // set them as implict


  terms.forEach(t => {
    t.implicit = t.clean;
  }); // perform the contraction

  terms[0].text += suffix; // clean-up the others

  terms.slice(1).forEach(t => {
    t.text = '';
  });

  for (let i = 0; i < terms.length - 1; i++) {
    const t = terms[i];
    t.post = t.post.replace(/ /, '');
  }
};
/** turn 'i am' into i'm */


var contract = function () {
  let doc = this.not('@hasContraction'); // we are -> we're

  let m = doc.match('(we|they|you) are');
  setContraction(m, `'re`); // they will -> they'll

  m = doc.match('(he|she|they|it|we|you) will');
  setContraction(m, `'ll`); // she is -> she's

  m = doc.match('(he|she|they|it|we) is');
  setContraction(m, `'s`); // spencer is -> spencer's

  m = doc.match('#Person is');
  setContraction(m, `'s`); // spencer would -> spencer'd

  m = doc.match('#Person would');
  setContraction(m, `'d`); // would not -> wouldn't

  m = doc.match('(is|was|had|would|should|could|do|does|have|has|can) not');
  setContraction(m, `n't`); // i have -> i've

  m = doc.match('(i|we|they) have');
  setContraction(m, `'ve`); // would have -> would've

  m = doc.match('(would|should|could) have');
  setContraction(m, `'ve`); // i am -> i'm

  m = doc.match('i am');
  setContraction(m, `'m`); // going to -> gonna

  m = doc.match('going to');
  return this;
};

var _07Contract = {
  contract: contract
};

var methods$4 = Object.assign({}, _01Utils, _02Accessors, _03Match, _04Tag, _05Loops, _06Lookup, _07Cache, _01Replace, _02Insert, _01Text, _02Json, _03Out, _01Sort, _02Normalize, _03Split, _04Case, _05Whitespace, _06Join, _07Contract);

let methods$3 = {}; // allow helper methods like .adjectives() and .adverbs()

const arr = [['terms', '.'], ['hyphenated', '@hasHyphen .'], ['adjectives', '#Adjective'], ['hashTags', '#HashTag'], ['emails', '#Email'], ['emoji', '#Emoji'], ['emoticons', '#Emoticon'], ['atMentions', '#AtMention'], ['urls', '#Url'], ['adverbs', '#Adverb'], ['pronouns', '#Pronoun'], ['conjunctions', '#Conjunction'], ['prepositions', '#Preposition']];
arr.forEach(a => {
  methods$3[a[0]] = function (n) {
    let m = this.match(a[1]);

    if (typeof n === 'number') {
      m = m.get(n);
    }

    return m;
  };
}); // aliases

methods$3.emojis = methods$3.emoji;
methods$3.atmentions = methods$3.atMentions;
methods$3.words = methods$3.terms;
/** return anything tagged as a phone number */

methods$3.phoneNumbers = function (n) {
  let m = this.splitAfter('@hasComma');
  m = m.match('#PhoneNumber+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** Deprecated: please use compromise-numbers plugin */


methods$3.money = function (n) {
  let m = this.match('#Money #Currency?');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** return all cities, countries, addresses, and regions */


methods$3.places = function (n) {
  // don't split 'paris, france'
  let keep = this.match('(#City && @hasComma) (#Region|#Country)'); // but split the other commas

  let m = this.not(keep).splitAfter('@hasComma'); // combine them back together

  m = m.concat(keep);
  m.sort('index');
  m = m.match('#Place+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** return all schools, businesses and institutions */


methods$3.organizations = function (n) {
  let m = this.clauses();
  m = m.match('#Organization+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
}; //combine them with .topics() method


methods$3.entities = function (n) {
  let r = this.clauses(); // Find people, places, and organizations

  let yup = r.people();
  yup = yup.concat(r.places());
  yup = yup.concat(r.organizations());
  let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
  yup = yup.not(ignore); //return them to normal ordering

  yup.sort('sequence'); // yup.unique() //? not sure

  if (typeof n === 'number') {
    yup = yup.get(n);
  }

  return yup;
}; //aliases


methods$3.things = methods$3.entities;
methods$3.topics = methods$3.entities;
var _simple = methods$3;

const underOver = /^(under|over)-?/;
/** match a word-sequence, like 'super bowl' in the lexicon */

const tryMultiple = function (terms, t, world) {
  let lex = world.words; //try a two-word version

  let txt = terms[t].reduced + ' ' + terms[t + 1].reduced;

  if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
    terms[t].tag(lex[txt], 'lexicon-two', world);
    terms[t + 1].tag(lex[txt], 'lexicon-two', world);
    return 1;
  } //try a three-word version?


  if (t + 2 < terms.length) {
    txt += ' ' + terms[t + 2].reduced;

    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-three', world);
      terms[t + 1].tag(lex[txt], 'lexicon-three', world);
      terms[t + 2].tag(lex[txt], 'lexicon-three', world);
      return 2;
    }
  } //try a four-word version?


  if (t + 3 < terms.length) {
    txt += ' ' + terms[t + 3].reduced;

    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-four', world);
      terms[t + 1].tag(lex[txt], 'lexicon-four', world);
      terms[t + 2].tag(lex[txt], 'lexicon-four', world);
      terms[t + 3].tag(lex[txt], 'lexicon-four', world);
      return 3;
    }
  }

  return 0;
};
/** look at each word in our list of known-words */


const checkLexicon = function (terms, world) {
  let lex = world.words;
  let hasCompound = world.hasCompound; // use reduced?
  //go through each term, and check the lexicon

  for (let t = 0; t < terms.length; t += 1) {
    let str = terms[t].clean; //is it the start of a compound word, like 'super bowl'?

    if (hasCompound[str] === true && t + 1 < terms.length) {
      let foundWords = tryMultiple(terms, t, world);

      if (foundWords > 0) {
        t += foundWords; //skip any already-found words

        continue;
      }
    } //try one-word lexicon


    if (lex[str] !== undefined && lex.hasOwnProperty(str) === true) {
      terms[t].tag(lex[str], 'lexicon', world);
      continue;
    } // look at reduced version of term, too


    if (str !== terms[t].reduced && lex.hasOwnProperty(terms[t].reduced) === true) {
      terms[t].tag(lex[terms[t].reduced], 'lexicon', world);
      continue;
    } // prefix strip: try to match 'take' for 'undertake'


    if (underOver.test(str) === true) {
      let noPrefix = str.replace(underOver, '');

      if (lex.hasOwnProperty(noPrefix) === true) {
        terms[t].tag(lex[noPrefix], 'noprefix-lexicon', world);
      }
    }
  }

  return terms;
};

var _01Lexicon = checkLexicon;

const smallTagger = function (doc) {
  let terms = doc.termList();
  _01Lexicon(terms, doc.world); // run any user-given tagger functions

  doc.world.taggers.forEach(fn => {
    fn(doc);
  });
  return doc;
};

var tiny = smallTagger;

const addMethod$a = function (Doc) {
  /**  */
  class Abbreviations extends Doc {
    stripPeriods() {
      this.termList().forEach(t => {
        if (t.tags.Abbreviation === true && t.next) {
          t.post = t.post.replace(/^\./, '');
        }

        let str = t.text.replace(/\./, '');
        t.set(str);
      });
      return this;
    }

    addPeriods() {
      this.termList().forEach(t => {
        t.post = t.post.replace(/^\./, '');
        t.post = '.' + t.post;
      });
      return this;
    }

  }

  Abbreviations.prototype.unwrap = Abbreviations.prototype.stripPeriods;

  Doc.prototype.abbreviations = function (n) {
    let match = this.match('#Abbreviation');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Abbreviations(match.list, this, this.world);
  };

  return Doc;
};

var Abbreviations = addMethod$a;

const hasPeriod = /\./;

const addMethod$9 = function (Doc) {
  /**  */
  class Acronyms extends Doc {
    stripPeriods() {
      this.termList().forEach(t => {
        let str = t.text.replace(/\./g, '');
        t.set(str);
      });
      return this;
    }

    addPeriods() {
      this.termList().forEach(t => {
        let str = t.text.replace(/\./g, '');
        str = str.split('').join('.'); // don't add a end-period if there's a sentence-end one

        if (hasPeriod.test(t.post) === false) {
          str += '.';
        }

        t.set(str);
      });
      return this;
    }

  }

  Acronyms.prototype.unwrap = Acronyms.prototype.stripPeriods;
  Acronyms.prototype.strip = Acronyms.prototype.stripPeriods;

  Doc.prototype.acronyms = function (n) {
    let match = this.match('#Acronym');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Acronyms(match.list, this, this.world);
  };

  return Doc;
};

var Acronyms = addMethod$9;

const addMethod$8 = function (Doc) {
  /** split into approximate sub-sentence phrases */
  Doc.prototype.clauses = function (n) {
    // an awkward way to disambiguate a comma use
    let commas = this.if('@hasComma').notIf('@hasComma @hasComma') //fun, cool...
    .notIf('@hasComma . .? (and|or) .') //cool, and fun
    .notIf('(#City && @hasComma) #Country') //'toronto, canada'
    .notIf('(#WeekDay && @hasComma) #Date') //'tuesday, march 2nd'
    .notIf('(#Date && @hasComma) #Year') //'july 6, 1992'
    .notIf('@hasComma (too|also)$') //at end of sentence
    .match('@hasComma');
    let found = this.splitAfter(commas);
    let quotes = found.quotations();
    found = found.splitOn(quotes);
    let parentheses = found.parentheses();
    found = found.splitOn(parentheses); // it is cool and it is ..

    let conjunctions = found.if('#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb').match('#Conjunction');
    found = found.splitBefore(conjunctions); // if it is this then that

    let condition = found.if('if .{2,9} then .').match('then');
    found = found.splitBefore(condition); // misc clause partitions

    found = found.splitBefore('as well as .');
    found = found.splitBefore('such as .');
    found = found.splitBefore('in addition to .'); // semicolons, dashes

    found = found.splitAfter('@hasSemicolon');
    found = found.splitAfter('@hasDash'); // passive voice verb - '.. which was robbed is empty'
    // let passive = found.match('#Noun (which|that) (was|is) #Adverb? #PastTense #Adverb?')
    // if (passive.found) {
    //   found = found.splitAfter(passive)
    // }
    // //which the boy robbed
    // passive = found.match('#Noun (which|that) the? #Noun+ #Adverb? #PastTense #Adverb?')
    // if (passive.found) {
    //   found = found.splitAfter(passive)
    // }
    // does there appear to have relative/subordinate clause still?

    let tooLong = found.filter(d => d.wordCount() > 5 && d.match('#Verb+').length >= 2);

    if (tooLong.found) {
      let m = tooLong.splitAfter('#Noun .* #Verb .* #Noun+');
      found = found.splitOn(m.eq(0));
    }

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Doc(found.list, this, this.world);
  };

  return Doc;
};

var Clauses = addMethod$8;

const addMethod$7 = function (Doc) {
  /**  */
  class Contractions extends Doc {
    constructor(list, from, world) {
      super(list, from, world);
      this.contracted = null;
    }
    /** turn didn't into 'did not' */


    expand() {
      this.list.forEach(p => {
        let terms = p.terms(); //change the case?

        let isTitlecase = terms[0].isTitleCase();
        terms.forEach((t, i) => {
          //use the implicit text
          t.set(t.implicit || t.text);
          t.implicit = undefined; //add whitespace

          if (i < terms.length - 1 && t.post === '') {
            t.post += ' ';
          }
        }); //set titlecase

        if (isTitlecase) {
          terms[0].toTitleCase();
        }
      });
      return this;
    }

  } //find contractable, expanded-contractions
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }


  Doc.prototype.contractions = function (n) {
    //find currently-contracted
    let found = this.match('@hasContraction+'); //(may want to split these up)
    //todo: split consecutive contractions

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Contractions(found.list, this, this.world);
  }; //aliases


  Doc.prototype.expanded = Doc.prototype.isExpanded;
  Doc.prototype.contracted = Doc.prototype.isContracted;
  return Doc;
};

var Contractions = addMethod$7;

const addMethod$6 = function (Doc) {
  //pull it apart..
  const parse = function (doc) {
    let things = doc.splitAfter('@hasComma').splitOn('(and|or) not?').not('(and|or) not?');
    let beforeLast = doc.match('[.] (and|or)', 0);
    return {
      things: things,
      conjunction: doc.match('(and|or) not?'),
      beforeLast: beforeLast,
      hasOxford: beforeLast.has('@hasComma')
    };
  };
  /** cool, fun, and nice */


  class Lists extends Doc {
    /** coordinating conjunction */
    conjunctions() {
      return this.match('(and|or)');
    }
    /** split-up by list object */


    parts() {
      return this.splitAfter('@hasComma').splitOn('(and|or) not?');
    }
    /** remove the conjunction */


    items() {
      return parse(this).things;
    }
    /** add a new unit to the list */


    add(str) {
      this.forEach(p => {
        let beforeLast = parse(p).beforeLast;
        beforeLast.append(str); //add a comma to it

        beforeLast.termList(0).addPunctuation(',');
      });
      return this;
    }
    /** remove any matching unit from the list */


    remove(match) {
      return this.items().if(match).remove();
    }
    /** return only lists that use a serial comma */


    hasOxfordComma() {
      return this.filter(doc => parse(doc).hasOxford);
    }

    addOxfordComma() {
      let items = this.items();
      let needsComma = items.eq(items.length - 2);

      if (needsComma.found && needsComma.has('@hasComma') === false) {
        needsComma.post(', ');
      }

      return this;
    }

    removeOxfordComma() {
      let items = this.items();
      let needsComma = items.eq(items.length - 2);

      if (needsComma.found && needsComma.has('@hasComma') === true) {
        needsComma.post(' ');
      }

      return this;
    }

  } // aliases


  Lists.prototype.things = Lists.prototype.items;

  Doc.prototype.lists = function (n) {
    let m = this.if('@hasComma+ .? (and|or) not? .'); // person-list

    let nounList = m.match('(#Noun|#Adjective|#Determiner|#Article)+ #Conjunction not? (#Article|#Determiner)? #Adjective? #Noun+').if('#Noun');
    let adjList = m.match('(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+');
    let verbList = m.match('(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+');
    let result = nounList.concat(adjList);
    result = result.concat(verbList);
    result = result.if('@hasComma');

    if (typeof n === 'number') {
      result = m.get(n);
    }

    return new Lists(result.list, this, this.world);
  };

  return Doc;
};

var Lists = addMethod$6;

const noPlural = '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)'; //certain words can't be plural, like 'peace'

const hasPlural = function (doc) {
  if (doc.has('#Plural') === true) {
    return true;
  } // these can't be plural


  if (doc.has(noPlural) === true) {
    return false;
  }

  return true;
};

var hasPlural_1 = hasPlural;

const irregulars = {
  hour: 'an',
  heir: 'an',
  heirloom: 'an',
  honest: 'an',
  honour: 'an',
  honor: 'an',
  uber: 'an' //german u

}; //pronounced letters of acronyms that get a 'an'

const an_acronyms = {
  a: true,
  e: true,
  f: true,
  h: true,
  i: true,
  l: true,
  m: true,
  n: true,
  o: true,
  r: true,
  s: true,
  x: true
}; //'a' regexes

const a_regexs = [/^onc?e/i, //'wu' sound of 'o'
/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
/^eul/i];

const makeArticle = function (doc) {
  //no 'the john smith', but 'a london hotel'
  if (doc.has('#Person') || doc.has('#Place')) {
    return '';
  } //no a/an if it's plural


  if (doc.has('#Plural')) {
    return 'the';
  }

  let str = doc.text('normal').trim(); //explicit irregular forms

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //spelled-out acronyms


  let firstLetter = str.substr(0, 1);

  if (doc.has('^@isAcronym') && an_acronyms.hasOwnProperty(firstLetter)) {
    return 'an';
  } //'a' regexes


  for (let i = 0; i < a_regexs.length; i++) {
    if (a_regexs[i].test(str)) {
      return 'a';
    }
  } //basic vowel-startings


  if (/^[aeiou]/i.test(str)) {
    return 'an';
  }

  return 'a';
};

var getArticle = makeArticle;

//similar to plural/singularize rules, but not the same
const isPlural$2 = [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i]; //similar to plural/singularize rules, but not the same

const isSingular = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
var _rules = {
  isSingular: isSingular,
  isPlural: isPlural$2
};

const endS = /s$/; // double-check this term, if it is not plural, or singular.
// (this is a partial copy of ./tagger/fallbacks/plural)
// fallback plural if it ends in an 's'.

const isPlural$1 = function (str) {
  // isSingular suffix rules
  if (_rules.isSingular.find(reg => reg.test(str))) {
    return false;
  } // does it end in an s?


  if (endS.test(str) === true) {
    return true;
  } // is it a plural like 'fungi'?


  if (_rules.isPlural.find(reg => reg.test(str))) {
    return true;
  }

  return null;
};

var isPlural_1$1 = isPlural$1;

const exceptions = {
  he: 'his',
  she: 'hers',
  they: 'theirs',
  we: 'ours',
  i: 'mine',
  you: 'yours',
  her: 'hers',
  their: 'theirs',
  our: 'ours',
  my: 'mine',
  your: 'yours'
}; // turn "David" to "David's"

const toPossessive = function (doc) {
  let str = doc.text('text').trim(); // exceptions

  if (exceptions.hasOwnProperty(str)) {
    doc.replaceWith(exceptions[str], true);
    doc.tag('Possessive', 'toPossessive');
    return;
  } // flanders'


  if (/s$/.test(str)) {
    str += "'";
    doc.replaceWith(str, true);
    doc.tag('Possessive', 'toPossessive');
    return;
  } //normal form:


  str += "'s";
  doc.replaceWith(str, true);
  doc.tag('Possessive', 'toPossessive');
  return;
};

var toPossessive_1 = toPossessive;

// .nouns() supports some noun-phrase-ish groupings
// pull these apart, if necessary
const parse$1 = function (doc) {
  let res = {
    main: doc
  }; //support 'mayor of chicago' as one noun-phrase

  if (doc.has('#Noun (of|by|for) .')) {
    let m = doc.splitAfter('[#Noun+]', 0);
    res.main = m.eq(0);
    res.post = m.eq(1);
  }

  return res;
};

var parse_1 = parse$1;

const methods$2 = {
  /** overload the original json with noun information */
  json: function (options) {
    let n = null;

    if (typeof options === 'number') {
      n = options;
      options = null;
    }

    options = options || {
      text: true,
      normal: true,
      trim: true,
      terms: true
    };
    let res = [];
    this.forEach(doc => {
      let json = doc.json(options)[0];
      json.article = getArticle(doc);
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },

  /** get all adjectives describing this noun*/
  adjectives: function () {
    let list = this.lookAhead('^(that|who|which)? (was|is|will)? be? #Adverb? #Adjective+');
    list = list.concat(this.lookBehind('#Adjective+ #Adverb?$'));
    list = list.match('#Adjective');
    return list.sort('index');
  },
  isPlural: function () {
    return this.if('#Plural'); //assume tagger has run?
  },
  hasPlural: function () {
    return this.filter(d => hasPlural_1(d));
  },
  toPlural: function (agree) {
    let toPlural = this.world.transforms.toPlural;
    this.forEach(doc => {
      if (doc.has('#Plural') || hasPlural_1(doc) === false) {
        return;
      } // double-check it isn't an un-tagged plural


      let main = parse_1(doc).main;
      let str = main.text('reduced');

      if (!main.has('#Singular') && isPlural_1$1(str) === true) {
        return;
      }

      str = toPlural(str, this.world);
      main.replace(str).tag('#Plural'); // 'an apple' -> 'apples'

      if (agree) {
        let an = main.lookBefore('(an|a) #Adjective?$').not('#Adjective');

        if (an.found === true) {
          an.remove();
        }
      }
    });
    return this;
  },
  toSingular: function (agree) {
    let toSingular = this.world.transforms.toSingular;
    this.forEach(doc => {
      if (doc.has('^#Singular+$') || hasPlural_1(doc) === false) {
        return;
      } // double-check it isn't an un-tagged plural


      let main = parse_1(doc).main;
      let str = main.text('reduced');

      if (!main.has('#Plural') && isPlural_1$1(str) !== true) {
        return;
      }

      str = toSingular(str, this.world);
      main.replace(str).tag('#Singular'); // add an article

      if (agree) {
        // 'apples' -> 'an apple'
        let start = doc;
        let adj = doc.lookBefore('#Adjective');

        if (adj.found) {
          start = adj;
        }

        let article = getArticle(start);
        start.insertBefore(article);
      }
    });
    return this;
  },
  toPossessive: function () {
    this.forEach(d => {
      toPossessive_1(d);
    });
    return this;
  }
};
var methods_1 = methods$2;

const addMethod$5 = function (Doc) {
  /**  */
  class Nouns extends Doc {} // add-in our methods


  Object.assign(Nouns.prototype, methods_1);

  Doc.prototype.nouns = function (n, opts = {}) {
    // don't split 'paris, france'
    let keep = this.match('(#City && @hasComma) (#Region|#Country)'); // but split the other commas

    let m = this.not(keep).splitAfter('@hasComma'); // combine them back together

    m = m.concat(keep); // don't combine over scare-quotes

    let quotes = m.quotations();

    if (quotes.found) {
      m = m.splitOn(quotes.eq(0));
    }

    m = m.match('#Noun+ (of|by)? the? #Noun+?'); //nouns that we don't want in these results, for weird reasons

    if (opts.keep_anaphora !== true) {
      m = m.not('#Pronoun');
      m = m.not('(there|these)');
      m = m.not('(#Month|#WeekDay)'); //allow Durations, Holidays
      // //allow possessives like "spencer's", but not generic ones like,

      m = m.not('(my|our|your|their|her|his)');
    }

    m = m.not('(of|for|by|the)$');

    if (typeof n === 'number') {
      m = m.get(n);
    }

    return new Nouns(m.list, this, this.world);
  };

  return Doc;
};

var Nouns = addMethod$5;

const open = /\(/;
const close = /\)/;

const addMethod$4 = function (Doc) {
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
      return this;
    }

  }

  Doc.prototype.parentheses = function (n) {
    let list = [];
    this.list.forEach(p => {
      let terms = p.terms(); //look for opening brackets

      for (let i = 0; i < terms.length; i += 1) {
        const t = terms[i];

        if (open.test(t.pre)) {
          //look for the closing bracket..
          for (let o = i; o < terms.length; o += 1) {
            if (close.test(terms[o].post)) {
              let len = o - i + 1;
              list.push(p.buildFrom(t.id, len));
              i = o;
              break;
            }
          }
        }
      }
    }); //support nth result

    if (typeof n === 'number') {
      if (list[n]) {
        list = [list[n]];
      } else {
        list = [];
      }

      return new Parentheses(list, this, this.world);
    }

    return new Parentheses(list, this, this.world);
  };

  return Doc;
};

var Parentheses = addMethod$4;

const addMethod$3 = function (Doc) {
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
      return this;
    }

  } //find contractable, expanded-contractions
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }


  Doc.prototype.possessives = function (n) {
    //find currently-contracted
    let found = this.match('#Noun+? #Possessive'); //todo: split consecutive contractions

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Possessives(found.list, this, this.world);
  };

  return Doc;
};

var Possessives = addMethod$3;

const pairs = {
  '\u0022': '\u0022',
  // 'StraightDoubleQuotes'
  '\uFF02': '\uFF02',
  // 'StraightDoubleQuotesWide'
  '\u0027': '\u0027',
  // 'StraightSingleQuotes'
  '\u201C': '\u201D',
  // 'CommaDoubleQuotes'
  '\u2018': '\u2019',
  // 'CommaSingleQuotes'
  '\u201F': '\u201D',
  // 'CurlyDoubleQuotesReversed'
  '\u201B': '\u2019',
  // 'CurlySingleQuotesReversed'
  '\u201E': '\u201D',
  // 'LowCurlyDoubleQuotes'
  '\u2E42': '\u201D',
  // 'LowCurlyDoubleQuotesReversed'
  '\u201A': '\u2019',
  // 'LowCurlySingleQuotes'
  '\u00AB': '\u00BB',
  // 'AngleDoubleQuotes'
  '\u2039': '\u203A',
  // 'AngleSingleQuotes'
  // Prime 'non quotation'
  '\u2035': '\u2032',
  // 'PrimeSingleQuotes'
  '\u2036': '\u2033',
  // 'PrimeDoubleQuotes'
  '\u2037': '\u2034',
  // 'PrimeTripleQuotes'
  // Prime 'quotation' variation
  '\u301D': '\u301E',
  // 'PrimeDoubleQuotes'
  '\u0060': '\u00B4',
  // 'PrimeSingleQuotes'
  '\u301F': '\u301E' // 'LowPrimeDoubleQuotesReversed'

};
const hasOpen = RegExp('(' + Object.keys(pairs).join('|') + ')');

const addMethod$2 = function (Doc) {
  /** "these things" */
  class Quotations extends Doc {
    /** remove the quote characters */
    unwrap() {
      return this;
    }

  }

  Doc.prototype.quotations = function (n) {
    let list = [];
    this.list.forEach(p => {
      let terms = p.terms(); //look for opening quotes

      for (let i = 0; i < terms.length; i += 1) {
        const t = terms[i];

        if (hasOpen.test(t.pre)) {
          let char = (t.pre.match(hasOpen) || [])[0];
          let want = pairs[char]; // if (!want) {
          //   console.warn('missing quote char ' + char)
          // }
          //look for the closing bracket..

          for (let o = i; o < terms.length; o += 1) {
            if (terms[o].post.indexOf(want) !== -1) {
              let len = o - i + 1;
              list.push(p.buildFrom(t.id, len));
              i = o;
              break;
            }
          }
        }
      }
    }); //support nth result

    if (typeof n === 'number') {
      if (list[n]) {
        list = [list[n]];
      } else {
        list = [];
      }

      return new Quotations(list, this, this.world);
    }

    return new Quotations(list, this, this.world);
  }; // alias


  Doc.prototype.quotes = Doc.prototype.quotations;
  return Doc;
};

var Quotations = addMethod$2;

// walked => walk  - turn a verb into it's root form
const toInfinitive = function (parsed, world) {
  let verb = parsed.verb; //1. if it's already infinitive

  let str = verb.text('reduced');

  if (verb.has('#Infinitive')) {
    return str;
  } // 2. world transform does the heavy-lifting


  let tense = null;

  if (verb.has('#PastTense')) {
    tense = 'PastTense';
  } else if (verb.has('#Gerund')) {
    tense = 'Gerund';
  } else if (verb.has('#PresentTense')) {
    tense = 'PresentTense';
  } else if (verb.has('#Participle')) {
    tense = 'Participle';
  } else if (verb.has('#Actor')) {
    tense = 'Actor';
  }

  return world.transforms.toInfinitive(str, world, tense);
};

var toInfinitive_1 = toInfinitive;

// spencer walks -> singular
// we walk -> plural
// the most-recent noun-phrase, before this verb.
const findNoun = function (vb) {
  let noun = vb.lookBehind('#Noun+').last();
  return noun;
}; //sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
// othertimes you need its subject 'we walk' vs 'i walk'


const isPlural = function (parsed) {
  let vb = parsed.verb;

  if (vb.has('(are|were|does)') || parsed.auxiliary.has('(are|were|does)')) {
    return true;
  } //consider its prior noun


  let noun = findNoun(vb);

  if (noun.has('(he|she|many|both)')) {
    return false;
  }

  if (noun.has('(we|they|you|i)')) {
    return true;
  }

  if (noun.has('#Person')) {
    return false;
  }

  if (noun.has('#Plural')) {
    return true;
  }

  if (noun.has('#Singular')) {
    return false;
  }

  if (vb.has('(is|am|do|was)')) {
    return false;
  }

  if (parsed.auxiliary.has('(is|am|do|was)') && !parsed.negative.found) {
    return false;
  }

  return null;
};

var isPlural_1 = isPlural;

// #Copula : is           -> 'is not'
// #PastTense : walked    -> did not walk
// #PresentTense : walks  -> does not walk
// #Gerund : walking:     -> not walking
// #Infinitive : walk     -> do not walk

const toNegative = function (parsed, world) {
  let vb = parsed.verb; // if it's already negative...

  if (parsed.negative.found) {
    return;
  } // would walk -> would not walk


  if (parsed.auxiliary.found) {
    parsed.auxiliary.eq(0).append('not'); // 'would not have' ➔ 'would not have'

    if (parsed.auxiliary.has('#Modal have not')) {
      parsed.auxiliary.replace('have not', 'not have');
    }

    return;
  } // is walking -> is not walking


  if (vb.has('(#Copula|will|has|had|do)')) {
    vb.append('not');
    return;
  } // walked -> did not walk


  if (vb.has('#PastTense')) {
    let inf = toInfinitive_1(parsed, world);
    vb.replaceWith(inf, true);
    vb.prepend('did not');
    return;
  } // walks -> does not walk


  if (vb.has('#PresentTense')) {
    let inf = toInfinitive_1(parsed, world);
    vb.replaceWith(inf, true);

    if (isPlural_1(parsed)) {
      vb.prepend('do not');
    } else {
      vb.prepend('does not');
    }

    return;
  } //walking -> not walking


  if (vb.has('#Gerund')) {
    let inf = toInfinitive_1(parsed, world);
    vb.replaceWith(inf, true);
    vb.prepend('not');
    return;
  } //fallback 1:  walk -> does not walk


  if (isPlural_1(parsed)) {
    vb.prepend('does not');
    return;
  } //fallback 2:  walk -> do not walk


  vb.prepend('do not');
  return;
};

var toNegative_1 = toNegative;

// who/what is doing this verb?
// get the prior verb most-likely doing this action
// (it can not-exist - 'close the door')
const getSubject = function (vb) {
  let behind = vb.lookBehind();
  let lastNoun = behind.nouns(null, {
    keep_anaphora: true
  }).last(); // support 'that' and 'this'

  if (!lastNoun.found) {
    lastNoun = behind.match('(that|this|each)').last();
    lastNoun = lastNoun.tag('#Noun').nouns();
  }

  return lastNoun;
};

var getSubject_1 = getSubject;

const parseVerb = function (vb) {
  let parsed = {
    adverb: vb.match('#Adverb+'),
    // 'really'
    negative: vb.match('#Negative'),
    // 'not'
    auxiliary: vb.match('#Auxiliary+').not('(#Negative|#Adverb)'),
    // 'will' of 'will go'
    particle: vb.match('#Particle'),
    // 'up' of 'pull up'
    verb: vb.match('#Verb+').not('(#Adverb|#Negative|#Auxiliary|#Particle)'),
    original: vb,
    subject: getSubject_1(vb)
  }; // parsed.subject.debug()
  // for conjugation purposes,
  // 'should start looking' -> 'should start'

  if (parsed.verb.has('(#PresentTense|#PastTense|#Infinitive) #Gerund$')) {
    parsed.verb = parsed.verb.not('#Gerund$');
  } // fallback, if no verb found


  if (!parsed.verb.found) {
    // blank-everything
    Object.keys(parsed).forEach(k => {
      parsed[k] = parsed[k].not('.');
    }); // it's all the verb

    parsed.verb = vb;
    return parsed;
  } //


  if (parsed.adverb && parsed.adverb.found) {
    let match = parsed.adverb.text('reduced') + '$';

    if (vb.has(match)) {
      parsed.adverbAfter = true;
    }
  }

  return parsed;
};

var parse = parseVerb;

/** too many special cases for is/was/will be*/

const toBe = parsed => {
  let isI = false;
  let plural = isPlural_1(parsed);
  let isNegative = parsed.negative.found; //account for 'i is' -> 'i am' irregular
  // if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
  //   isI = true;
  // }
  // 'i look', not 'i looks'

  if (parsed.verb.lookBehind('i (#Adverb|#Verb)?$').found) {
    isI = true;
  }

  let obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been'
  };

  if (plural) {
    obj.PastTense = 'were';
    obj.PresentTense = 'are';
    obj.Infinitive = 'are';
  } //"i is" -> "i am"


  if (isI === true) {
    obj.PastTense = 'was';
    obj.PresentTense = 'am';
    obj.Infinitive = 'am';
  }

  if (isNegative) {
    obj.PastTense += ' not';
    obj.PresentTense += ' not';
    obj.FutureTense = 'will not be';
    obj.Infinitive += ' not';
    obj.PerfectTense = 'not ' + obj.PerfectTense;
    obj.Pluperfect = 'not ' + obj.Pluperfect;
    obj.Gerund = 'not ' + obj.Gerund;
  }

  return obj;
};

var toBe_1 = toBe;

// 'may/could/should' -> 'may/could/should have'
const doModal = function (parsed) {
  let str = parsed.verb.text();
  let res = {
    PastTense: str + ' have',
    PresentTense: str,
    FutureTense: str,
    Infinitive: str // Gerund: ,
    // Actor: '',
    // PerfectTense: '',
    // Pluperfect: '',

  };
  return res;
};

var doModal_1 = doModal;

const conjugate = function (parsed, world) {
  let verb = parsed.verb; //special handling of 'is', 'will be', etc.

  if (verb.has('#Copula') || verb.out('normal') === 'be' && parsed.auxiliary.has('will')) {
    return toBe_1(parsed);
  } // special handling of 'are walking'


  if (parsed.auxiliary.has('are') && verb.has('#Gerund')) {
    let og = parsed.original.clone();
    let past = og.clone().replace('are', 'were');
    let fut = og.clone().replace('are', 'will be');
    let infinitive = toInfinitive_1(parsed, world);
    let res = {
      PastTense: past.text(),
      PresentTense: og.text(),
      FutureTense: fut.text(),
      Infinitive: infinitive
    };
    return res;
  } // special handling of 'he could.'


  if (verb.has('#Modal')) {
    return doModal_1(parsed);
  } // get the root form


  let infinitive = toInfinitive_1(parsed, world);

  if (!infinitive) {
    return {};
  }

  let forms = world.transforms.conjugate(infinitive, world);
  forms.Infinitive = infinitive; // Singular: the dog chases
  // Plural: the dogs chase

  let bePlural = isPlural_1(parsed);

  if (bePlural === true) {
    forms.PresentTense = forms.Infinitive; // the dogs chase
  } // add particle to phrasal verbs ('fall over')


  let hasHyphen = parsed.verb.termList(0).hasHyphen();

  if (parsed.particle.found) {
    let particle = parsed.particle.text();
    let space = hasHyphen === true ? '-' : ' ';
    Object.keys(forms).forEach(k => forms[k] += space + particle);
  } //apply negative


  const isNegative = parsed.negative.found;
  forms.FutureTense = forms.FutureTense || 'will ' + forms.Infinitive;

  if (isNegative) {
    forms.PastTense = 'did not ' + forms.Infinitive;
    forms.FutureTense = 'will not ' + forms.Infinitive;

    if (bePlural) {
      forms.PresentTense = 'do not ' + forms.Infinitive;
      forms.Infinitive = 'do not ' + forms.Infinitive;
    } else {
      forms.PresentTense = 'does not ' + forms.Infinitive;
      forms.Infinitive = 'does not ' + forms.Infinitive;
    }

    forms.Gerund = 'not ' + forms.Gerund;
  }

  return forms;
};

var conjugate_1 = conjugate;

// if something is 'modal-ish' we are forced to use past-participle
// ('i could drove' is wrong)

const useParticiple$1 = function (parsed) {
  if (parsed.auxiliary.has('(could|should|would|may|can|must)')) {
    return true;
  }

  if (parsed.auxiliary.has('am .+? being')) {
    return true;
  }

  if (parsed.auxiliary.has('had .+? been')) {
    return true;
  }

  return false;
}; // conjugate 'drive' ➔ 'have driven'


const toParticiple$1 = function (parsed, world) {
  //is it already a participle?
  if (parsed.auxiliary.has('(have|had)') && parsed.verb.has('#Participle')) {
    return;
  } // try to swap the main verb to its participle form


  let obj = conjugate_1(parsed, world);
  let str = obj.Participle || obj.PastTense;

  if (str) {
    parsed.verb.replaceWith(str, false);
  } // 'am being driven' ➔ 'have been driven'


  if (parsed.auxiliary.has('am .+? being')) {
    parsed.auxiliary.remove('am');
    parsed.auxiliary.replace('being', 'have been');
  } // add a 'have'


  if (!parsed.auxiliary.has('have')) {
    parsed.auxiliary.append('have');
  } // tag it as a participle


  parsed.verb.tag('Participle', 'toParticiple'); // turn 'i can swim' to -> 'i could swim'

  parsed.auxiliary.replace('can', 'could'); //'must be' ➔ 'must have been'

  parsed.auxiliary.replace('be have', 'have been'); //'not have' ➔ 'have not'

  parsed.auxiliary.replace('not have', 'have not'); // ensure all new words are tagged right

  parsed.auxiliary.tag('Auxiliary');
};

var participle = {
  useParticiple: useParticiple$1,
  toParticiple: toParticiple$1
};

const {
  toParticiple,
  useParticiple
} = participle; // remove any tense-information in auxiliary verbs

const makeNeutral = function (parsed) {
  //remove tense-info from auxiliaries
  parsed.auxiliary.remove('(will|are|am|being)');
  parsed.auxiliary.remove('(did|does)');
  parsed.auxiliary.remove('(had|has|have)'); //our conjugation includes the 'not' and the phrasal-verb particle

  parsed.particle.remove();
  parsed.negative.remove();
  return parsed;
};

var methods$1 = {
  /** overload the original json with verb information */
  json: function (options) {
    let n = null;

    if (typeof options === 'number') {
      n = options;
      options = null;
    }

    options = options || {
      text: true,
      normal: true,
      trim: true,
      terms: true
    };
    let res = [];
    this.forEach(p => {
      let json = p.json(options)[0];
      let parsed = parse(p);
      json.parts = {};
      Object.keys(parsed).forEach(k => {
        if (parsed[k] && parsed[k].isA === 'Doc') {
          json.parts[k] = parsed[k].text('normal');
        } else {
          json.parts[k] = parsed[k];
        }
      });
      json.isNegative = p.has('#Negative');
      json.conjugations = conjugate_1(parsed, this.world);
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },

  /** grab the adverbs describing these verbs */
  adverbs: function () {
    let list = []; // look at internal adverbs

    this.forEach(vb => {
      let advb = parse(vb).adverb;

      if (advb.found) {
        list = list.concat(advb.list);
      }
    }); // look for leading adverbs

    let m = this.lookBehind('#Adverb+$');

    if (m.found) {
      list = m.list.concat(list);
    } // look for trailing adverbs


    m = this.lookAhead('^#Adverb+');

    if (m.found) {
      list = list.concat(m.list);
    }

    return this.buildFrom(list);
  },
  /// Verb Inflection

  /**return verbs like 'we walk' and not 'spencer walks' */
  isPlural: function () {
    let list = [];
    this.forEach(vb => {
      let parsed = parse(vb);

      if (isPlural_1(parsed, this.world) === true) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  },

  /** return verbs like 'spencer walks' and not 'we walk' */
  isSingular: function () {
    let list = [];
    this.forEach(vb => {
      let parsed = parse(vb);

      if (isPlural_1(parsed, this.world) === false) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  },
  /// Conjugation

  /** return all forms of this verb  */
  conjugate: function () {
    let result = [];
    this.forEach(vb => {
      let parsed = parse(vb);
      let forms = conjugate_1(parsed, this.world);
      result.push(forms);
    });
    return result;
  },

  /** walk ➔ walked*/
  toPastTense: function () {
    this.forEach(vb => {
      let parsed = parse(vb); // should we support 'would swim' ➔ 'would have swam'

      if (useParticiple(parsed)) {
        toParticiple(parsed, this.world);
        return;
      } // don't conjugate 'go away'.


      if (vb.has('#Imperative')) {
        return;
      } // don't conjugate 'to be'


      if (vb.has('be') && vb.lookBehind('to$').found) {
        return;
      } // handle 'is raining' -> 'was raining'


      if (parsed.verb.has('#Gerund') && parsed.auxiliary.has('(is|will|was)')) {
        vb.replace('is', 'was');
        return;
      }

      let str = conjugate_1(parsed, this.world).PastTense;

      if (str) {
        parsed = makeNeutral(parsed);
        parsed.verb.replaceWith(str, false);
        parsed.auxiliary.remove('(do|did|will)'); //??
      }
    });
    return this;
  },

  /** walk ➔ walks */
  toPresentTense: function () {
    this.forEach(vb => {
      // don't conjugate 'go away'.
      if (vb.has('#Imperative')) {
        return;
      }

      let parsed = parse(vb);
      let obj = conjugate_1(parsed, this.world);
      let str = obj.PresentTense; // 'i look', not 'i looks'

      if (vb.lookBehind('(i|we) (#Adverb|#Verb)?$').found) {
        str = obj.Infinitive;
      }

      if (str) {
        //awkward support for present-participle form
        // -- should we support 'have been swimming' ➔ 'am swimming'
        if (parsed.auxiliary.has('(have|had) been')) {
          parsed.auxiliary.replace('(have|had) been', 'am being');

          if (obj.Particle) {
            str = obj.Particle || obj.PastTense;
          }

          return;
        }

        parsed.verb.replaceWith(str, false);
        parsed.verb.tag('PresentTense');
        parsed = makeNeutral(parsed); // avoid 'he would walks'

        parsed.auxiliary.remove('#Modal');
        parsed.auxiliary.remove('(do|did|will)'); //??
      }
    });
    return this;
  },

  /** walk ➔ will walk*/
  toFutureTense: function () {
    this.forEach(vb => {
      let parsed = parse(vb); // 'i should drive' is already future-enough

      if (useParticiple(parsed)) {
        return;
      } // don't conjugate 'go away'.


      if (vb.has('#Imperative')) {
        return;
      }

      let str = conjugate_1(parsed, this.world).FutureTense;

      if (str) {
        parsed = makeNeutral(parsed); // avoid 'he would will go'

        parsed.auxiliary.remove('#Modal');
        parsed.verb.replaceWith(str, false);
        parsed.verb.tag('FutureTense');
        parsed.auxiliary.remove('(do|did|will)'); //??
        // parsed.auxiliary.remove('(do|did|will)') //??
      }
    });
    return this;
  },

  /** walks ➔ walk */
  toInfinitive: function () {
    this.forEach(vb => {
      let parsed = parse(vb);
      let str = conjugate_1(parsed, this.world).Infinitive;

      if (str) {
        vb.replaceWith(str, false);
        vb.tag('Infinitive');
      }
    });
    return this;
  },

  /** walk ➔ walking */
  toGerund: function () {
    this.forEach(vb => {
      let parsed = parse(vb);
      let str = conjugate_1(parsed, this.world).Gerund;

      if (str) {
        vb.replaceWith(str, false);
        vb.tag('Gerund');
      }
    });
    return this;
  },

  /** drive ➔ driven - naked past-participle if it exists, otherwise past-tense */
  toParticiple: function () {
    this.forEach(vb => {
      let parsed = parse(vb);
      let noAux = !parsed.auxiliary.found;
      toParticiple(parsed, this.world); // dirty trick to  ensure our new auxiliary is found

      if (noAux) {
        parsed.verb.prepend(parsed.auxiliary.text());
        parsed.auxiliary.remove();
      }
    });
    return this;
  },
  /// Negation

  /** return only verbs with 'not'*/
  isNegative: function () {
    return this.if('#Negative');
  },

  /**  return only verbs without 'not'*/
  isPositive: function () {
    return this.ifNo('#Negative');
  },

  /**  return only commands - verbs in imperative mood */
  isImperative: function () {
    return this.if('#Imperative');
  },

  /** add a 'not' to these verbs */
  toNegative: function () {
    this.list.forEach(p => {
      let doc = this.buildFrom([p]);
      let parsed = parse(doc);
      toNegative_1(parsed, doc.world);
    });
    return this;
  },

  /** remove 'not' from these verbs */
  toPositive: function () {
    let m = this.match('do not #Verb');

    if (m.found) {
      m.remove('do not');
    }

    return this.remove('#Negative');
  },

  /** who, or what is doing this action? */
  subject: function () {
    let list = [];
    this.forEach(p => {
      let found = getSubject_1(p);

      if (found.list[0]) {
        list.push(found.list[0]);
      }
    });
    return this.buildFrom(list);
  }
};

const addMethod$1 = function (Doc) {
  /**  */
  class Verbs extends Doc {} // add-in our methods


  Object.assign(Verbs.prototype, methods$1); // aliases

  Verbs.prototype.negate = Verbs.prototype.toNegative;

  Doc.prototype.verbs = function (n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+'); // try to ignore leading and trailing adverbs

    match = match.not('^#Adverb+');
    match = match.not('#Adverb+$'); // handle commas:
    // don't split 'really, really'

    let keep = match.match('(#Adverb && @hasComma) #Adverb'); // // but split the other commas

    let m = match.not(keep).splitAfter('@hasComma'); // i was shocked looking at...
    // let gerund = m.match('#PastTense #Gerund')
    // if (!gerund.has('(been|am|#Auxiliary) #Gerund')) {
    //   m = m.splitBefore(gerund.match('#Gerund'))
    // }
    // combine them back together

    m = m.concat(keep);
    m.sort('index'); //handle slashes?
    //ensure there's actually a verb

    m = m.if('#Verb'); // the reason he will is ...

    if (m.has('(is|was)$')) {
      m = m.splitBefore('(is|was)$');
    } //ensure it's not two verbs


    if (m.has('#PresentTense #Adverb #PresentTense')) {
      m = m.splitBefore('#Adverb #PresentTense');
    } //grab (n)th result


    if (typeof n === 'number') {
      m = m.get(n);
    }

    let vb = new Verbs(m.list, this, this.world);
    return vb;
  };

  return Doc;
};

var Verbs = addMethod$1;

const addMethod = function (Doc) {
  /**  */
  class People extends Doc {// honorifics(){}
    // firstNames(){}
    // lastNames(){}
    // pronouns(){}
    // toPronoun(){}
    // fromPronoun(){}
  }

  Doc.prototype.people = function (n) {
    let match = this.splitAfter('@hasComma');
    match = match.match('#Person+'); //grab (n)th result

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new People(match.list, this, this.world);
  };

  return Doc;
};

var People = addMethod;

const subclass = [Abbreviations, Acronyms, Clauses, Contractions, Lists, Nouns, Parentheses, Possessives, Quotations, Verbs, People];

const extend = function (Doc) {
  // add basic methods
  Object.keys(_simple).forEach(k => Doc.prototype[k] = _simple[k]); // add subclassed methods

  subclass.forEach(addFn => addFn(Doc));
  return Doc;
};

var Subset = extend;

const methods = {
  misc: methods$4,
  selections: _simple
};
/** a parsed text object */

class Doc {
  constructor(list, from, world) {
    this.list = list; // this.reasons = []
    //quiet these properties in console.logs

    Object.defineProperty(this, 'from', {
      enumerable: false,
      value: from,
      writable: true
    }); //borrow some missing data from parent

    if (world === undefined && from !== undefined) {
      world = from.world;
    } //'world' getter


    Object.defineProperty(this, 'world', {
      enumerable: false,
      value: world,
      writable: true
    }); //fast-scans for our data

    Object.defineProperty(this, '_cache', {
      enumerable: false,
      writable: true,
      value: {}
    }); //'found' getter

    Object.defineProperty(this, 'found', {
      get: () => this.list.length > 0
    }); //'length' getter

    Object.defineProperty(this, 'length', {
      get: () => this.list.length
    }); // this is way easier than .constructor.name...

    Object.defineProperty(this, 'isA', {
      get: () => 'Doc'
    });
  }
  /** run part-of-speech tagger on all results*/


  tagger() {
    return tiny(this);
  }
  /** pool is stored on phrase objects */


  pool() {
    if (this.list.length > 0) {
      return this.list[0].pool;
    }

    return this.all().list[0].pool;
  }

}
/** create a new Document object */


Doc.prototype.buildFrom = function (list) {
  list = list.map(p => p.clone(true)); // new this.constructor()

  let doc = new Doc(list, this, this.world);
  return doc;
};
/** create a new Document from plaintext. */


Doc.prototype.fromText = function (str) {
  let list = _01Tokenizer(str, this.world, this.pool());
  return this.buildFrom(list);
};

Object.assign(Doc.prototype, methods.misc);
Object.assign(Doc.prototype, methods.selections); //add sub-classes

Subset(Doc); //aliases

const aliases = {
  untag: 'unTag',
  and: 'match',
  notIf: 'ifNo',
  only: 'if',
  onlyIf: 'if'
};
Object.keys(aliases).forEach(k => Doc.prototype[k] = Doc.prototype[aliases[k]]);
var Doc_1 = Doc;

function instance(worldInstance) {
  //blast-out our word-lists, just once
  let world = worldInstance;
  /** parse and tag text into a compromise object  */

  const nlp = function (text = '', lexicon) {
    if (lexicon) {
      world.addWords(lexicon);
    }

    let list = _01Tokenizer(text, world);
    let doc = new Doc_1(list, null, world);
    doc.tagger();
    return doc;
  };
  /** parse text into a compromise object, without running POS-tagging */


  nlp.tokenize = function (text = '', lexicon) {
    let w = world;

    if (lexicon) {
      w = w.clone();
      w.words = {};
      w.addWords(lexicon);
    }

    let list = _01Tokenizer(text, w);
    let doc = new Doc_1(list, null, w);

    if (lexicon || doc.world.taggers.length > 0) {
      tiny(doc);
    }

    return doc;
  };
  /** mix in a compromise-plugin */


  nlp.extend = function (fn) {
    fn(Doc_1, world, this, Phrase_1, Term_1, Pool_1);
    return this;
  };
  /** create a compromise Doc object from .json() results */


  nlp.fromJSON = function (json) {
    let list = fromJSON_1(json, world);
    return new Doc_1(list, null, world);
  };
  /** make a deep-copy of the library state */


  nlp.clone = function () {
    return instance(world.clone());
  };
  /** log our decision-making for debugging */


  nlp.verbose = function (bool = true) {
    world.verbose(bool);
    return this;
  };
  /** grab currently-used World object */


  nlp.world = function () {
    return world;
  };
  /** pre-parse any match statements */


  nlp.parseMatch = function (str, opts) {
    return matchSyntax(str, opts);
  };
  /** current version of the library */


  nlp.version = _version; // aliases

  nlp.import = nlp.load;
  nlp.plugin = nlp.extend;
  return nlp;
}

var src = instance(new World_1());

export default src;

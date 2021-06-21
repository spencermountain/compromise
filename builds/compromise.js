/* compromise 13.11.3 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.nlp = factory());
}(this, (function () { 'use strict';

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''); //generates a unique id for this term

  function makeId$2(str) {
    str = str || '_';
    let text = str + '-';

    for (let i = 0; i < 7; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }

    return text;
  }

  var _id = makeId$2;

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

  const killUnicode$3 = str => {
    let chars = str.split('');
    chars.forEach((s, i) => {
      if (unicode[s]) {
        chars[i] = unicode[s];
      }
    });
    return chars.join('');
  };

  var unicode_1 = killUnicode$3; // console.log(killUnicode('bjŏȒk—Ɏó'));

  const periodAcronym = /([A-Z]\.)+[A-Z]?,?$/;
  const oneLetterAcronym$1 = /^[A-Z]\.,?$/;
  const noPeriodAcronym = /[A-Z]{2,}('s|,)?$/;
  const lowerCaseAcronym = /([a-z]\.)+[a-z]\.?$/;

  const isAcronym$4 = function (str) {
    //like N.D.A
    if (periodAcronym.test(str) === true) {
      return true;
    } //like c.e.o


    if (lowerCaseAcronym.test(str) === true) {
      return true;
    } //like 'F.'


    if (oneLetterAcronym$1.test(str) === true) {
      return true;
    } //like NDA


    if (noPeriodAcronym.test(str) === true) {
      return true;
    }

    return false;
  };

  var isAcronym_1 = isAcronym$4;

  const killUnicode$2 = unicode_1;
  const isAcronym$3 = isAcronym_1;
  const hasSlash$1 = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/;
  /** some basic operations on a string to reduce noise */

  const clean = function (str) {
    str = str || '';
    str = str.toLowerCase();
    str = str.trim();
    let original = str; //(very) rough ASCII transliteration -  bjŏrk -> bjork

    str = killUnicode$2(str); //rough handling of slashes - 'see/saw'

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


    if (isAcronym$3(str)) {
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

  var reduce$1 = reduced;

  const normalize = clean_1;
  const reduce = reduce$1; // basically, tokenize for terms.
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

  const parseTerm$1 = str => {
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


    let clean = normalize(str);
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

  var parse$3 = parseTerm$1;

  var _01Case = {};

  (function (exports) {
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
  })(_01Case);

  var _02Punctuation$1 = {};

  (function (exports) {
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
  })(_02Punctuation$1);

  var _03Misc = {};

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

  const fuzzy = _fuzzy; //declare it up here

  let wrapMatch = function () {};
  /** ignore optional/greedy logic, straight-up term match*/


  const doesMatch$1 = function (t, reg, index, length) {
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
        let score = fuzzy(reg.word, t.reduced);

        if (score > reg.fuzzy) {
          return true;
        } // support fuzzy + soft match


        if (reg.soft === true) {
          score = fuzzy(reg.word, t.root);

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
    let result = doesMatch$1(t, reg, index, length);

    if (reg.negative === true) {
      return !result;
    }

    return result;
  };

  var _doesMatch = wrapMatch;

  const doesMatch = _doesMatch;
  const isAcronym$2 = isAcronym_1; // these tags aren't juicy-enough

  const boring = {};
  /** check a match object against this term */

  _03Misc.doesMatch = function (reg, index, length) {
    return doesMatch(this, reg, index, length);
  };
  /** does this term look like an acronym? */


  _03Misc.isAcronym = function () {
    return isAcronym$2(this.text);
  };
  /** is this term implied by a contraction? */


  _03Misc.isImplicit = function () {
    return this.text === '' && Boolean(this.implicit);
  };
  /** does the term have at least one good tag? */


  _03Misc.isKnown = function () {
    return Object.keys(this.tags).some(t => boring[t] !== true);
  };
  /** cache the root property of the term */


  _03Misc.setRoot = function (world) {
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

  var _04Text = {};

  const killUnicode$1 = unicode_1;
  const hasSpace$1 = /[\s-]/;
  const isUpperCase = /^[A-Z-]+$/; // const titleCase = str => {
  //   return str.charAt(0).toUpperCase() + str.substr(1)
  // }

  /** return various text formats of this term */

  _04Text.textOut = function (options, showPre, showPost) {
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
      word = killUnicode$1(word);
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

  var _05Json$1 = {};

  const boringTags = {
    Auxiliary: 1,
    Possessive: 1
  };
  /** a subjective ranking of tags kinda tfidf-based */

  const rankTags$1 = function (term, world) {
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

  var _bestTag = rankTags$1;

  const rankTags = _bestTag;
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

  _05Json$1.json = function (options, world) {
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
      result.bestTag = rankTags(this, world)[0];
    }

    return result;
  };

  var methods$d = Object.assign({}, _01Case, _02Punctuation$1, _03Misc, _04Text, _05Json$1);

  var tag = {};

  var fns$3 = {};

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


  fns$3.logTag = function (t, tag, reason) {
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


  fns$3.logUntag = function (t, tag, reason) {
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

  fns$3.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  fns$3.titleCase = str => {
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  const fns$2 = fns$3;
  /** add a tag, and its descendents, to a term */

  const addTag = function (t, tag, reason, world) {
    let tagset = world.tags; //support '.' or '-' notation for skipping the tag

    if (tag === '' || tag === '.' || tag === '-') {
      return;
    }

    if (tag[0] === '#') {
      tag = tag.replace(/^#/, '');
    }

    tag = fns$2.titleCase(tag); //if we already got this one

    if (t.tags[tag] === true) {
      return;
    } // log it?


    const isVerbose = world.isVerbose();

    if (isVerbose === true) {
      fns$2.logTag(t, tag, reason);
    } //add tag


    t.tags[tag] = true; //whee!
    //check tagset for any additional things to do...

    if (tagset.hasOwnProperty(tag) === true) {
      //add parent Tags
      tagset[tag].isA.forEach(down => {
        t.tags[down] = true;

        if (isVerbose === true) {
          fns$2.logTag(t, '→ ' + down);
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

  var add$1 = addTags;

  const fns$1 = fns$3;
  const lowerCase = /^[a-z]/;

  const titleCase$3 = str => {
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
      tag = titleCase$3(tag);
    } // remove the tag


    if (t.tags[tag] === true) {
      delete t.tags[tag]; //log in verbose-mode

      if (isVerbose === true) {
        fns$1.logUntag(t, tag, reason);
      }
    } //delete downstream tags too


    const tagset = world.tags;

    if (tagset[tag]) {
      let lineage = tagset[tag].lineage;

      for (let i = 0; i < lineage.length; i++) {
        if (t.tags[lineage[i]] === true) {
          delete t.tags[lineage[i]];

          if (isVerbose === true) {
            fns$1.logUntag(t, ' - ' + lineage[i]);
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

  var unTag_1 = untagAll;

  const canBe$1 = function (term, tag, world) {
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
      return canBe$1(term, tagset[tag].isA, world); //recursive
    }

    return true;
  };

  var canBe_1 = canBe$1;

  const add = add$1;
  const unTag = unTag_1;
  const canBe = canBe_1;
  /** add a tag or tags, and their descendents to this term
   * @param  {string | string[]} tags - a tag or tags
   * @param {string?} [reason] a clue for debugging
   */

  tag.tag = function (tags, reason, world) {
    add(this, tags, reason, world);
    return this;
  };
  /** only tag this term if it's consistent with it's current tags */


  tag.tagSafe = function (tags, reason, world) {
    if (canBe(this, tags, world)) {
      add(this, tags, reason, world);
    }

    return this;
  };
  /** remove a tag or tags, and their descendents from this term
   * @param {string | string[]} tags  - a tag or tags
   * @param {string?} [reason] a clue for debugging
   */


  tag.unTag = function (tags, reason, world) {
    unTag(this, tags, reason, world);
    return this;
  };
  /** is this tag consistent with the word's current tags?
   * @param {string | string[]} tags - a tag or tags
   * @returns {boolean}
   */


  tag.canBe = function (tags, world) {
    return canBe(this, tags, world);
  };

  const makeId$1 = _id;
  const parseTerm = parse$3;
  const methods$c = methods$d;
  const tagMethods = tag;

  class Term$3 {
    constructor(text = '') {
      text = String(text);
      let obj = parseTerm(text); // the various forms of our text

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
      this.id = makeId$1(obj.clean);
      this.isA = 'Term'; // easier than .constructor...
      // support alternative matches

      if (obj.alias) {
        this.alias = obj.alias;
      }
    }
    /** set the text of the Term to something else*/


    set(str) {
      let obj = parseTerm(str);
      this.text = obj.text;
      this.clean = obj.clean;
      this.reduced = obj.reduced;
      this.root = null;
      this.implicit = null;
      return this;
    }

  }
  /** create a deep-copy of this term */


  Term$3.prototype.clone = function () {
    let term = new Term$3(this.text);
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

  Object.assign(Term$3.prototype, methods$c);
  Object.assign(Term$3.prototype, tagMethods);
  var Term_1 = Term$3;

  var _01Utils$1 = {};

  /** return a flat array of Term objects */

  _01Utils$1.terms = function (n) {
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


  _01Utils$1.clone = function (isShallow) {
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


  _01Utils$1.lastTerm = function () {
    let terms = this.terms();
    return terms[terms.length - 1];
  };
  /** quick lookup for a term id */


  _01Utils$1.hasId = function (wantId) {
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


  _01Utils$1.wordCount = function () {
    return this.terms().filter(t => t.text !== '').length;
  };
  /** get the full-sentence this phrase belongs to */


  _01Utils$1.fullSentence = function () {
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

  var _02Text = {};

  const trimEnd = function (str) {
    return str.replace(/ +$/, '');
  };
  /** produce output in the given format */


  _02Text.text = function (options = {}, isFirst, isLast) {
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

  var _03Change = {};

  /** remove start and end whitespace */

  _03Change.trim = function () {
    let terms = this.terms();

    if (terms.length > 0) {
      //trim starting
      terms[0].pre = terms[0].pre.replace(/^\s+/, ''); //trim ending

      let lastTerm = terms[terms.length - 1];
      lastTerm.post = lastTerm.post.replace(/\s+$/, '');
    }

    return this;
  };

  var _04Insert = {};

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


  const unique$6 = function (list) {
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

    toStretch = unique$6(toStretch);
    toStretch.forEach(p => {
      p.length += newPhrase.length;
    });
    before.cache = {};
    return before;
  };

  var append$1 = appendPhrase;

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

  const unique$5 = function (list) {
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

    toStretch = unique$5(toStretch); // stretch these phrases

    toStretch.forEach(p => {
      p.length += newPhrase.length; // change the start too, if necessary

      if (p.start === starterId) {
        p.start = newPhrase.start;
      }

      p.cache = {};
    });
    return original;
  };

  var prepend$1 = joinPhrase;

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


  const deletePhrase$1 = function (phrase, doc) {
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

  var _delete = deletePhrase$1;

  const append = append$1;
  const prepend = prepend$1;
  const deletePhrase = _delete; // const tokenize = require('../../01-tokenizer')

  /** put this text at the end */

  _04Insert.append = function (newPhrase, doc) {
    append(this, newPhrase, doc);
    return this;
  };
  /** add this text to the beginning */


  _04Insert.prepend = function (newPhrase, doc) {
    prepend(this, newPhrase, doc);
    return this;
  };

  _04Insert.delete = function (doc) {
    deletePhrase(this, doc);
    return this;
  }; // stich-in newPhrase, stretch 'doc' + parents


  _04Insert.replace = function (newPhrase, doc) {
    //add it do the end
    let firstLength = this.length;
    append(this, newPhrase, doc); //delete original terms

    let tmp = this.buildFrom(this.start, this.length);
    tmp.length = firstLength;
    deletePhrase(tmp, doc);
  };
  /**
   * Turn this phrase object into 3 phrase objects
   */


  _04Insert.splitOn = function (p) {
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

  var _05Json = {};

  /** return json metadata for this phrase */

  _05Json.json = function (options = {}, world) {
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

  var _06Lookahead = {};

  /** match any terms after this phrase */

  _06Lookahead.lookAhead = function (regs) {
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


  _06Lookahead.lookBehind = function (regs) {
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

  var methods$b = Object.assign({}, _01Utils$1, _02Text, _03Change, _04Insert, _05Json, _06Lookahead);

  var match = {};

  const failFast$2 = function (p, regs) {
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

  var _02FailFast = failFast$2;

  var _matchLogic = {};

  (function (exports) {
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
  })(_matchLogic);

  const makeId = _id;
  const logic = _matchLogic; // i formally apologize for how complicated this is.

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
          state.groupId = makeId(reg.named);
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
        let skipto = logic.greedyTo(state, regs[state.r + 1]); //maybe we couldn't find it

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
          const g = logic.getGroup(state, state.t, reg.named);
          g.length = skipto - state.t;
        }

        state.t = skipto;
        continue;
      } // support multi-word OR (a|b|foo bar)


      if (reg.choices !== undefined && reg.operator === 'or') {
        let skipNum = logic.doOrBlock(state);

        if (skipNum) {
          // handle 'not' logic
          if (reg.negative === true) {
            return null; // die
          }

          if (state.hasGroup === true) {
            const g = logic.getGroup(state, state.t, reg.named);
            g.length += skipNum;
          }

          state.t += skipNum;
          continue;
        } else if (!reg.optional) {
          return null; //die
        }
      } // support AND (#Noun && foo) blocks


      if (reg.choices !== undefined && reg.operator === 'and') {
        let skipNum = logic.doAndBlock(state);

        if (skipNum) {
          // handle 'not' logic
          if (reg.negative === true) {
            return null; // die
          }

          if (state.hasGroup === true) {
            const g = logic.getGroup(state, state.t, reg.named);
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

      if (reg.anything === true || doesMatch === true || logic.isEndGreedy(reg, state)) {
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
          state.t = logic.getGreedy(state, regs[state.r + 1]);

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
          const g = logic.getGroup(state, startAt, reg.named); // Update group - add greedy or increment length

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

  const postProcess$3 = function (terms, regs, matches) {
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

  var _04PostProcess = postProcess$3;

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

  const parseBlocks$1 = function (txt) {
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

  var _01ParseBlocks = parseBlocks$1; // console.log('(one two) (upto) [<snooze_to>#Date+]'.split(byParentheses))

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

  const titleCase$2 = str => {
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


  const parseToken$1 = function (w) {
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
          return str.split(/ /g).map(parseToken$1);
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
      obj.tag = titleCase$2(obj.tag);
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

  var _02ParseToken = parseToken$1;

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


  const postProcess$2 = function (tokens, opts = {}) {
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

  var _03PostProcess = postProcess$2;

  const parseBlocks = _01ParseBlocks;
  const parseToken = _02ParseToken;
  const postProcess$1 = _03PostProcess;

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


  const syntax$1 = function (input, opts = {}) {
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

    let tokens = parseBlocks(input); //turn them into objects

    tokens = tokens.map(str => parseToken(str)); //clean up anything weird

    tokens = postProcess$1(tokens, opts); // add fuzzy limits, etc

    tokens = addOptions(tokens, opts); // console.log(tokens)

    return tokens;
  };

  var matchSyntax = syntax$1; // console.log(syntax('[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)'))

  // take a phrase and find any of the idBlocks in it

  const idLookup$1 = function (terms, regs) {
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

  var idLookup_1 = idLookup$1;

  const failFast$1 = _02FailFast;
  const tryMatch = _03TryMatch;
  const postProcess = _04PostProcess;
  const syntax = matchSyntax;
  const idLookup = idLookup_1;
  /**  returns a simple array of arrays */

  const matchAll$2 = function (p, regs, matchOne = false) {
    //if we forgot to parse it..
    if (typeof regs === 'string') {
      regs = syntax(regs);
    } //try to dismiss it, at-once


    if (failFast$1(p, regs) === true) {
      return [];
    } //any match needs to be this long, at least


    const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length;
    let terms = p.terms();
    let matches = []; // these id-lookups can be super-fast

    if (regs[0].idBlocks) {
      let res = idLookup(terms, regs);

      if (res && res.length > 0) {
        return postProcess(terms, regs, res);
      }
    } //optimisation for '^' start logic


    if (regs[0].start === true) {
      let res = tryMatch(terms, regs, 0, terms.length);

      if (res && res.match && res.match.length > 0) {
        res.match = res.match.filter(m => m);
        matches.push(res);
      }

      return postProcess(terms, regs, matches);
    } //try starting, from every term


    for (let i = 0; i < terms.length; i += 1) {
      // slice may be too short
      if (i + minLength > terms.length) {
        break;
      } //try it!


      let res = tryMatch(terms.slice(i), regs, i, terms.length);

      if (res && res.match && res.match.length > 0) {
        //zoom forward!
        i += res.match.length - 1; //[capture-groups] return some null responses

        res.match = res.match.filter(m => m);
        matches.push(res); //ok, maybe that's enough?

        if (matchOne === true) {
          return postProcess(terms, regs, matches);
        }
      }
    }

    return postProcess(terms, regs, matches);
  };

  var _01MatchAll = matchAll$2;

  const matchAll$1 = _01MatchAll;
  /** return anything that doesn't match.
   * returns a simple array of arrays
   */

  const notMatch$1 = function (p, regs) {
    let found = {};
    let arr = matchAll$1(p, regs);
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

  var not = notMatch$1;

  const matchAll = _01MatchAll;
  const notMatch = not;
  /** return an array of matching phrases */

  match.match = function (regs, justOne = false) {
    let matches = matchAll(this, regs, justOne); //make them phrase objects

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


  match.has = function (regs) {
    let matches = matchAll(this, regs, true);
    return matches.length > 0;
  };
  /** remove all matches from the result */


  match.not = function (regs) {
    let matches = notMatch(this, regs); //make them phrase objects

    matches = matches.map(list => {
      return this.buildFrom(list[0].id, list.length);
    });
    return matches;
  };
  /** return a list of phrases that can have this tag */


  match.canBe = function (tag, world) {
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

  const methods$a = methods$b;
  const matchMethods = match; // const tokenize = require('../01-tokenizer')

  class Phrase$3 {
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


  Phrase$3.prototype.buildFrom = function (id, length, groups) {
    let p = new Phrase$3(id, length, this.pool); //copy-over or replace capture-groups too

    if (groups && Object.keys(groups).length > 0) {
      p.groups = groups;
    } else {
      p.groups = this.groups;
    }

    return p;
  }; //apply methods


  Object.assign(Phrase$3.prototype, matchMethods);
  Object.assign(Phrase$3.prototype, methods$a); //apply aliases

  const aliases$1 = {
    term: 'terms'
  };
  Object.keys(aliases$1).forEach(k => Phrase$3.prototype[k] = Phrase$3.prototype[aliases$1[k]]);
  var Phrase_1 = Phrase$3;

  /** a key-value store of all terms in our Document */

  class Pool$3 {
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


  Pool$3.prototype.clone = function () {
    let keys = Object.keys(this.words);
    let words = keys.reduce((h, k) => {
      let t = this.words[k].clone();
      h[t.id] = t;
      return h;
    }, {});
    return new Pool$3(words);
  };

  var Pool_1 = Pool$3;

  const linkTerms$2 = terms => {
    terms.forEach((term, i) => {
      if (i > 0) {
        term.prev = terms[i - 1].id;
      }

      if (terms[i + 1]) {
        term.next = terms[i + 1].id;
      }
    });
  };

  var _linkTerms = linkTerms$2;

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

  const testIsAcronym = function (str, suffix) {
    // early exit
    if (suffix.indexOf('.') === -1) {
      return false;
    }

    return isAcronym$1.test(str);
  };

  const testHasEllipse = function (str, suffix) {
    // early exit
    if (suffix.indexOf('.') === -1) {
      return false;
    }

    return hasEllipse.test(str);
  };

  const testHasLetter = function (suffix, prefixHasLetter) {
    return prefixHasLetter || hasLetter.test(suffix);
  };
  /** does this look like a sentence? */


  const isSentence = function (str, suffix, abbrevs, prefixContext) {
    // must have a letter
    prefixContext.hasLetter = testHasLetter(suffix, prefixContext.hasLetter);

    if (!prefixContext.hasLetter) {
      return false;
    } // check for 'F.B.I.'


    if (testIsAcronym(str, suffix)) {
      return false;
    } //check for '...'


    if (testHasEllipse(str, suffix)) {
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

  const splitSentences$1 = function (text, world) {
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


    let suffix = chunks[0] || '';
    const prefixContext = {
      hasLetter: false
    };

    for (let i = 0; i < chunks.length; i++) {
      let c = chunks[i]; //should this chunk be combined with the next one?

      if (chunks[i + 1] && isSentence(c, suffix, abbrevs, prefixContext) === false) {
        suffix = chunks[i + 1] || '';
        chunks[i + 1] = c + suffix;
      } else if (c && c.length > 0) {
        //&& hasLetter.test(c)
        //this chunk is a proper sentence..
        sentences.push(c);
        suffix = chunks[i + 1] || '';
        prefixContext.hasLetter = false;
      }

      chunks[i] = '';
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

  var _01Sentences = splitSentences$1; // console.log(sentence_parser('john f. kennedy'));

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

  const Term$2 = Term_1;
  const Phrase$2 = Phrase_1;
  const Pool$2 = Pool_1;
  const linkTerms$1 = _linkTerms;
  const splitSentences = _01Sentences;
  const splitTerms = _02Words;

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


    sentences = sentences || splitSentences(text, world);
    sentences = sentences.map(str => splitTerms(str)); //turn them into proper objects

    pool = pool || new Pool$2();
    let phrases = sentences.map(terms => {
      terms = terms.map(str => {
        let term = new Term$2(str);
        pool.add(term);
        return term;
      }); //add next/previous ids

      linkTerms$1(terms); //return phrase objects

      let p = new Phrase$2(terms[0].id, terms.length, pool);
      p.cache.terms = terms;
      return p;
    }); //return them ready for a Document object

    return phrases;
  };

  var _01Tokenizer = fromText;

  const Term$1 = Term_1;
  const Phrase$1 = Phrase_1;
  const Pool$1 = Pool_1;
  const linkTerms = _linkTerms;

  const fromJSON$1 = function (json, world) {
    let pool = new Pool$1();
    let phrases = json.map((p, k) => {
      let terms = p.terms.map((o, i) => {
        let term = new Term$1(o.text);
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

      linkTerms(terms); // return a proper Phrase object

      return new Phrase$1(terms[0].id, terms.length, pool);
    });
    return phrases;
  };

  var fromJSON_1 = fromJSON$1;

  var _version = '13.11.3';

  const entity = ['Person', 'Place', 'Organization'];
  var nouns$2 = {
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

  var verbs$2 = {
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

  var values$1 = {
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
  var misc$3 = {
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

  const unique$4 = function (arr) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }; //add 'downward' tags (that immediately depend on this one)


  const inferIsA$1 = function (tags) {
    Object.keys(tags).forEach(k => {
      let tag = tags[k];
      let len = tag.isA.length;

      for (let i = 0; i < len; i++) {
        let down = tag.isA[i];

        if (tags[down]) {
          tag.isA = tag.isA.concat(tags[down].isA);
        }
      } // clean it up


      tag.isA = unique$4(tag.isA);
    });
    return tags;
  };

  var _isA = inferIsA$1;

  const unique$3 = function (arr) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }; // crawl the tag-graph and infer any conflicts
  // faster than doing this at tag-time


  const inferNotA$1 = function (tags) {
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


      tag.notA = unique$3(tag.notA);
    });
    return tags;
  };

  var _notA = inferNotA$1;

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

  const inferColor = _color;
  const inferIsA = _isA;
  const inferNotA = _notA;
  const lineage = _lineage;

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


  const inferTags$1 = function (tags) {
    // validate data
    tags = validate(tags); // build its 'down tags'

    tags = inferIsA(tags); // infer the conflicts

    tags = inferNotA(tags); // debug tag color

    tags = inferColor(tags); // find incoming links

    tags = lineage(tags);
    return tags;
  };

  var inference = inferTags$1;

  const nouns$1 = nouns$2;
  const verbs$1 = verbs$2;
  const values = values$1;
  const misc$2 = misc$3;
  const inferTags = inference; //extend tagset with new tags

  const addIn = function (obj, tags) {
    Object.keys(obj).forEach(k => {
      tags[k] = obj[k];
    });
  };

  const build = () => {
    let tags = {};
    addIn(nouns$1, tags);
    addIn(verbs$1, tags);
    addIn(values, tags);
    addIn(misc$2, tags); // do the graph-stuff

    tags = inferTags(tags);
    return tags;
  };

  var tags = build();

  var _data = {
    "Comparative": "true¦better",
    "Superlative": "true¦earlier",
    "PresentTense": "true¦is,sounds",
    "Value": "true¦a few",
    "Noun": "true¦a5b4c2f1here,ie,lit,m0no doubt,pd,tce;a,d;t,y;a,ca,o0;l,rp;a,l;d,l,rc",
    "Copula": "true¦a1is,w0;as,ere;m,re",
    "PastTense": "true¦be3came,d2had,lied,meant,sa2taken,w0;as,e0;nt,re;id;en,gan",
    "Condition": "true¦if,lest,unless",
    "Preposition": "true¦'o,-,aLbIcHdGexcept,fFiDmidQnotwithstandiRoBpSqua,sAt6u3vi2w0;/o,hereNith0;!in,oR;a,s-a-vis;n1p0;!on;like,til;h0ill,owards;an,r0;ough0u;!oJ;ans,ince,o that;',f0n2ut;!f;f,n0;!to;or,rom;espite,own,u3;hez,irca;ar1e0oAy;sides,tween;ri6;',bo7cross,ft6lo5m3propos,round,s1t0;!op;! long 0;as;id0ong0;!st;ng;er;ut",
    "Gerund": "true¦accord0be0develop0go0result0stain0;ing",
    "Negative": "true¦n0;ever,o0;!n,t",
    "QuestionWord": "true¦how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s",
    "Plural": "true¦records",
    "Conjunction": "true¦&,aFbBcuz,how9in caEno8o7p5supposing,t2v1wh0yet;eth9ile;ers4s;h0o;eref9o0;!uC;l0rovided that;us;r,therwi6; matt1r;!ev0;er;e0ut;cau1f0;ore;se;lthou1nd,s 0;far as,if;gh",
    "Abbreviation": "true¦a0Jb0Gc0Ad08e05f02g01h00iYjWkanVlTmNnKoJpFque,rDs8t6u5v2w0;is0r,y0B;!c;a,b,e1i0ol,s,t;tro,vo;r,t;niv,safa,t;ce,e0;l,mp,nn,x;ask,e2fc,gt,i1q,r,s,t,u0;pt,rg;r,tu;c,nJp0;!t;b,d,e0;pGs,v;a,d,ennNhd,l,p,r1s0vt;!eud;ef,o0;b,f,n;ct,kla,nt;e0ov;b0e;!r;a4d,essrs,i1lle,me,r7s0t;!tr;n1s0;c,ter;!n;!j,r,sc;at,it,lb,ng,t0;!d;!s;an,d,r,u0;l,n;a,da,e,n0;c,f;on,wy;a,en,ov;e1ig,l0m,r,t,y;!a;b,m;a,g,ng,s1tc,x0;!p;p,q,t;ak,e0ist,r;c,f,pt,t;a3ca,l,m2o0pl,res,yn;!l0m1nn,rp;!o;dr;!l0pt;!if;a,c,l1r0;ig,os;!dg,vd;d4l3p2r1ss0tty,ug,ve;n,t;c,iz;prox,r,t;!ta;!j,m,v",
    "Pronoun": "true¦'em,elle,h4i3me,ourselves,she5th1us,we,you0;!rself;e0ou;m,y;!l,t;e0im;!'s",
    "Singular": "true¦0:16;1:19;2:13;a16b0Tc0Kd0De0Af05g00hWiVjel0kitty,lTmPnOoNpHquestionGrEs9t6u4w3;ay,om03;nc10s 3;doll0Lst0N; rex,a4h3ic,ragedy,v show;ere,i1;l0x return;i6ky,omeoNt3uper bowl,yst15;ep4ri1u3;de0Yff;faTmoT;st2ze;al0i1o3;om,se;! mark;a7i2la6r4u3;dQrpoI;e3ie0Hobl0V;roga00ss releaG;te,y2;rt,te0N;bjWceJthers,verview;othi1umb2;a5ee08o3;del,m3nopo0rni1th2;!my;n,yf0;i3unch;ne;ci1nsect;ead start,o3uman right;l0me4u3;se;! run;adf0entlem6irl02laci2od,rand4u3;l0y; slam,fa3mo3;th2;an;a6ella,ly,ol0r4un3;di1;ee market,iWo3;nti2sP;mi0th2;conomy,gg,ner7ven4x3;ampTecu9;i1t;ad8e5inn2o3ragonf0ude;cumentGg3i0l0or;gy;ath,t3;ec3;tive;!dy;a9eili1h7i5o3redit card;ttage,u3;ri2sin;ty,vil w3;ar;andeli2ocol3;ate;n3rF;ary;aCel0lesJo8r5u3;n3tterf0;ti1;eakfa4o3;!th2;st;dy,tt5y3;!fri3;end;le;nki1r3;ri2;er;d5l0noma0u3;nt;ly; homin5verti3;si1;ng;em",
    "FemaleName": "true¦0:J3;1:J7;2:IG;3:IF;4:IX;5:IK;6:JO;7:H0;8:JK;9:JG;A:HN;B:HY;C:IT;D:JD;E:IP;F:HC;G:I0;aGRbFLcDPdCYeBOfB4gADh9Ti9Gj8Gk7Gl60m49n3No3Jp37qu36r2Ds16t0Eu0Cv02wVxiTyOzH;aLeIineb,oHsof2;e3Uf2la,ra;h3iKlIna,ynH;ab,ep;da,ma;da,h3iHra;nab;aKeJi0Fol5BuIvH;etAonDO;i0na;le0sen2;el,gm3Jn,rGJs8W;aoHme0nyi;m62yAE;aMendDYhiDFiH;dele9lJnH;if48niHo0;e,f47;a,helmi0lHma;a,ow;ka0nB;aNeKiHusa5;cIktoriBMlAole7viH;anC3enJ0;kF9tor2;da,lA9nus,rHs0;a,nHoniH4;a,iFQ;leHnesH4;nIHrH;i1y;g9rHxH5;su5te;aYeUhRiNoLrIuHy3;i,la;acIZiHu0L;c2na,sH;hBPta;nHr0H;iBNya;aJffaEOnHs6;a,gtiH;ng;!nFQra;aIeHomasi0;a,l9Po8Ares1;l2ndolwethu;g9Go88rIssH;!a,ie;eHi,ri8;sa,za;bPlNmLnJrIs6tHwa0;ia0um;a63yn;iHya;a,ka,s6;arB6e3iHmEDra;!ka;a,iH;a,t6;at6it6;a0Fcarlet3We0BhXiTkye,neza0oRtNuIyH;bIBlvi1;e,ha,mayIEni7sIzH;an3MetAie,y;anHi8;!a,e,nH;aEe;aJeH;fHl5GphH;an4;cHZr5;b2fiA8m0OnHphi1;d3ia,ja,ya;er3lJmon1nIobh8PtH;a,i;dy;lEPv2;aMeIirHo0risF7y5;a,lDK;ba,e0i5lJrH;iHrDOyl;!d8Hfa;ia,lDX;hd,iMki3nJrIu0w0yH;la,ma,na;i,le9on,ron;aIda,ia,nHon;a,on;!ya;k6mH;!aa;lJrItaye81vH;da,inj;e0ife;en1i0ma;anA5bNd3Nh1RiBkMlLmJndIrHs6vannaE;aEi0;ra,y;aHi3;nt6ra;lDKma,ome;ee0in8Ru3;in1ri0;a05e00hYiVoIuH;by,thDH;bScRghQl2KnPsJwIxH;anAXie,y;an,e0;aIeHie,lD; merBLann8ll1marDBt7;!lHnn1;iHyn;e,nH;a,d9K;da,i,na;ayy8D;hel62io;bDKer7yn;a,cIkHmas,n9Fta,ya;ki,o;helGki;ea,iannGDoH;da,n1K;an0bJem9Agi0iInHta,y0;a88ee;han83na;a,eH;cEAkaE;bi0chIe,i0mo0nHquEKvCy0;di,ia;aEIelHiB;!e,le;een4ia0;aNeMhKipaluk,oJrHute66;iHudenCQ;scil3LyamvaB;lly,rt2;ilome0oebe,ylH;is,lis;arl,ggy,nelope,r5t3;ige,m0TnKo5rvaDGtIulH;a,etAin1;ricHsy,tBY;a,e,ia;do3i06;ctav2dIfCZis6lHphCZumC3yunbileg;a,ga,iv2;eHvAC;l2tA;aWeUiMoIurHy5;!ay,ul;a,eJor,rIuH;f,r;aEeCma;ll1mi;aNcLhariBOkKlaJna,sHta,vi;anHha;ur;!y;a,iDTki;hoGk9VolH;a,eDJ;!mh;hir,lHna,risFsreC;!a,lBT;asuLdKh2i6CnJomi8rgEPtHzanin zah3;aHhal4;li1s6;cy,etA;a,e9iEV;nngu30;a09ckenz4e01iMoJrignayani,uriDDyH;a,rH;a,lNna,tG;bi0i3llBInH;a,iH;ca,ka,qD3;a,cTkaSlNmi,nLrItzi,yH;ar;aIiam,lH;anEO;!l,nB;dy,eHh,n4;nhGrva;aKdJiCPlH;iHy;cent,e;red;!gros;!e5;ae5hH;ae5el3Z;ag5EgNi,lKrH;edi79iIjem,on,yH;em,l;em,sF;an4iHliF;nHsCE;a,da;!an,han;b0DcASd0Be,g09ha,i08ja,l06n04rLsoum60tKuIv82x9IyHz4;a,bell,ra,soB9;de,rH;a,eC;h8Fild1t4;a,cYgUiKjor4l7Sn4s6tJwa,yH;!aHbe6Wja9lAE;m,nBH;a,ha,in1;!aJbCBeIja,lDna,sHt64;!a,ol,sa;!l1H;! Jh,mInH;!a,e,n1;!awit,i;aliAHcJeduarBfernIjHlui5Y;o6Ful2;anB;ecil2la3;arJeIie,oHr44ueriA;!t;!ry;et42i37;el4Ui76y;dHon,ue5;akran7y;ak,en,iHk,lo3O;a,ka,nB;a,re,s4te;daHg4;!l3A;alDd4elHge,isDBon0;ei9in1yn;el,le;a0Ne0CiYoQuLyH;d2la,nH;!a,dIeBGnHsCL;!a,eBF;a,sCJ;aCWcJel0PiFlIna,pHz;e,i7;a,u,wa;iHy;a0Se,ja,l2JnB;is,l1SrJttIuHvel4;el5is1;e,ie;aKeIi8na,rH;a86i8;lHn1t7;ei;!in1;aSbb9CdRepa,lMnJsIv2zH;!a,be5LetAz4;a,etA;!a,dH;a,sHy;ay,ey,i,y;a,iJja,lHy;iHy;aA0e;!aH;!n5F;ia,ya;!nH;!a,ne;aPda,e0iNjYla,nMoKsJtHx4y5;iHt4;c2t2;e2LlCG;la,nHra;a,ie,o3;a,or1;a,gh,laH;!ni;!h,nH;a,d3e,n5P;cOdon97iNkes6mi9Ana,rMtJurIvHxmi,y5;ern1in2;a,e54ie,yn;as6iIoH;nya,ya;fa,s6;a,isF;a,la;ey,ie,y;a04eZhXiOlAKoNrJyH;lHra;a,ee,ie;istHy6D;a,en,iIyH;!na;!e,n59;nul,ri,urtnB0;aOerNlAZmJrHzzy;a,stH;en,in;!berlImernH;aq;eHi,y;e,y;a,stC;!na,ra;aHei3ongordzol;dij1w5;el7QiKjsi,lJnIrH;a,i,ri;d3na,za;ey,i,lBDs4y;ra,s6;bi7cAJdiat7IeB2iRlQmPnyakuma19rNss6KtKvi7yH;!e,lH;a,eH;e,i8L;a6DeIhHi4NlDri0y;ar6Ber6Bie,leCrB2y;!lyn8Gri0;a,en,iHl5Soli0yn;!ma,n3VsF;a5il1;ei8Ei,l4;a,tl6L;a07eYiVoNuH;anLdKliHst63;a8HeHsF;!n9tH;!a,te;e5Ji3Jy;a,i7;!anNcelDd6RelGhan7RlLni,sIva0yH;a,ce;eHie;fHlDph5U;a,in1;eHie;en,n1;!a,e,n41;lHng;!i1ClH;!i1B;anMle0nJrIsH;i8Csi8C;i,ri;!a,elGif2CnH;a,etAiHy;!e,f2A;a,e8EiInH;a,e8DiH;e,n1;cMd1mi,nIque4Xsmin3Ovie3y9zH;min8;a8eIiH;ce,e,n1s;!lHsFt0F;e,le;inIk4lDquelH;in1yn;da,ta;lRmPnOo0rNsIvaHzaro;!a0lu,na;aJiIlaHob84;!n9N;do3;!belHdo3;!a,e,l39;a77en1i0ma;a,di3es,gr6Yji;a9elBogH;en1;a,e9iHo0se;a0na;aSeOiJoHusFyacin2B;da,ll4rten23snH;a,i9Q;lImaH;ri;aIdHlaI;a,egard;ry;ath1CiJlInriet7rmi9sH;sa,t1B;en2Sga,mi;di;bi2Dil8IlNnMrJsItHwa,yl8Iz7H;i5St4;n5Yti;iHmo51ri52;etH;!te;aEnaE;a,ey,l4;a03eXiSlQoOrKunJwH;enHyne1Q;!dolD;ay,el;acIetHiselB;a,chC;e,ieH;!la;ld1AogooH;sh;adys,enHor2yn2H;a,da,na;aKgi,lIna,ov89selHta;a,e,le;da,liH;an;!n0;mLnJorgIrH;ald3Pi,m3Ctru8B;etAi4W;a,eHna;s26vieve;ma;bIil,le,mHrnet,yG;al5Ni5;i5FrielH;a,l1;aVeSiRloOoz2rH;anJeIiH;da,eB;da,ja;!cH;esIiHoi0O;n1s61;!ca;!rH;a,encH;e,ia;en,o0;lIn0rnH;!anB;ec2ic2;jr,n7rKtHy8;emIiHma,ouma7;ha,ma,n;eh;ah,iBrah,za0;cr4Nd0Ne0Mi0Lk7l04mWn4YrTsNtMuLvH;aJelIiH;!e,ta;in0Gyn;!ngel2S;geni1la,ni45;h5Sta;mLperanKtH;eIhHrel5;er;l30r8;za;a,eralB;iHma,nest2Jyn;cHka,n;a,ka;a,eMiJmH;aHie,y;!li9;lHn1;ee,iHy;a,e,ja;lHrald;da,y;aWeUiNlMma,no3oKsJvH;a,iH;na,ra;a,ie;iHuiH;se;a,en,ie,y;a0c2da,f,nMsJzaH;!betHve7;e,h;aHe,ka;!beH;th;!a,or;anor,nH;!a;!in1na;leCs6;vi;eIiHna,wi0;e,th;l,n;aYeMh2iLjeneKoHul30;lor5Tminiq4In3FrHtt4;a,eCis,la,othHthy;ea,y;ba;an0AnaEon9x4ya;anQbPde,eOiMja,lJmetr2nHsir5K;a,iH;ce,se;a,iIla,orHphi9;es,is;a,l6D;dHrdH;re;!d5Cna;!b2HoraEra;a,d3nH;!a,e;hl2i0l0HmNnLphn1rIvi1XyH;le,na;a,by,cIia,lH;a,en1;ey,ie;a,etAiH;!ca,el1Cka,z;arHia;is;a0Se0Oh05i03lVoKrIynH;di,th2;istHy05;al,i0;lPnMrIurH;tn1E;aJd2NiHn2Nri9;!nH;a,e,n1;!l1X;cepci59n4sH;tanHuelo;ce,za;eHleC;en,tA;aJeoIotH;il51;!pat3;ir8rJudH;etAiH;a,ne;a,e,iH;ce,sZ;a3er3ndH;i,y;aReNloe,rH;isJyH;stH;al;sy,tH;a1Ren,iHy;!an1e,n1;deJlseIrH;!i8yl;a,y;li9;nMrH;isKlImH;ai9;a,eHotA;n1tA;!sa;d3elGtH;al,elG;cIlH;esAi44;el2ilH;e,ia,y;itlZlYmilXndWrOsMtHy5;aKeJhHri0;erHleCrDy;in1;ri0;li0ri0;a33sH;a32ie;a,iNlLmeJolIrH;ie,ol;!e,in1yn;lHn;!a,la;a,eHie,o7y;ne,y;na,sF;a0Hi0H;a,e,l1;is7l4;in,yn;a0Ie02iZlXoUrH;andSeQiJoIyH;an0nn;nwDok8;an3DdgLg0XtH;n2XtH;!aInH;ey,i,y;ny;etH;!t8;an0e,nH;da,na;i8y;bbi8glarIlo05nH;i7n4;ka;ancHossom,ythe;a,he;an17lja0nHsm3I;i7tH;ou;aUcky,linTni7rPssOtJulaEvH;!erlH;ey,y;hJsy,tH;e,iHy8;e,na;!anH;ie,y;!ie;nHt6yl;adIiH;ce;etAi9;ay,da;!triH;ce,z;rbJyaH;rmH;aa;a3ie,o3ra;a2Sb2Md23g1Zi1Qj5l16m0Xn09oi,r04sUtTuPvOwa,yIzH;ra,u0;aKes6gJlIseH;!l;in;un;!nH;a,na;a,i2Ir2J;drJgus1RrIsteH;ja;el2;a,ey,i,y;aahua,he0;hIi2Gja,mi7s2DtrH;id;aMlIraqHt21;at;eIi8yH;!n;e,iHy;gh;!nH;ti;iJleIo6pi7;ta;en,n1tA;aHelG;!n1J;a00dje5eYgUiSjQnJohito,toHya;inetAnH;el5ia;!aKeIiHmJ;e,ka;!mHtA;ar4;!belIliFmU;sa;!le;a,eliH;ca;ka,sHta;a,sa;elHie;a,iH;a,ca,n1qH;ue;!tA;te;! JbImHstasiNya;ar2;el;cla3jul2pau5;aLberKeliJiHy;e,l2naH;!ta;a,ja;!ly;hGiIl2nB;da;a,ra;le;aWba,ePiMlKma,thJyH;a,c2sH;a,on,sa;ea;iHys0N;e,s0M;a,cIn1sHza;a,e,ha,on,sa;e,ia,ja;c2is6jaKksaKna,sJxH;aHia;!nd3;ia,saH;nd3;ra;ia;i0nIyH;ah,na;a,is,naEoud;la;c6da,leCmNnLsH;haElH;inHyY;g,n;!h;a,o,slH;ey;ee;en;at6g4nIusH;ti0;es;ie;aWdiTelMrH;eJiH;anMenH;a,e,ne;an0;na;!aLeKiIyH;nn;a,n1;a,e;!ne;!iH;de;e,lDsH;on;yn;!lH;i9yn;ne;aKbIiHrL;!gaK;ey,i8y;!e;gaH;il;dKliyJradhIs6;ha;ya;ah;a,ya",
    "Actor": "true¦aJbGcFdCengineIfAgardenIh9instructPjournalLlawyIm8nurse,opeOp5r3s1t0;echnCherapK;ailNcientJecretary,oldiGu0;pervKrgeon;e0oofE;ceptionGsearC;hotographClumbColi1r0sychologF;actitionBogrammB;cem6t5;echanic,inist9us4;airdress8ousekeep8;arm7ire0;fight6m2;eputy,iet0;ici0;an;arpent2lerk;ricklay1ut0;ch0;er;ccoun6d2ge7r0ssis6ttenda7;chitect,t0;ist;minist1v0;is1;rat0;or;ta0;nt",
    "Honorific": "true¦a01bYcQdPeOfiJgIhon,jr,king,lHmCoffic00p7queen,r3s0taoiseach,vice6;e1fc,gt,ir,r,u0;ltRpt,rg;cond liInBrgeaJ;abbi,e0;ar1p9s,v0;!erend; admirX;astOhd,r0vt;esideDi1of0;!essM;me mini4nce0;!ss;a3essrs,i2lle,me,r1s0;!tr;!s;stK;gistrate,j,r6yF;i3lb,t;en,ov;eld mar3rst l0;ady,i0;eutena0;nt;shG;sq,xcellency;et,oct6r,utchess;apt6hance4mdr,o0pl;lonel,m2ngress0unci3;m0wom0;an;dr,mand5;ll0;or;!ain;ldg,rig0;!adi0;er;d0sst,tty,yatullah;j,m0v;!ir0;al",
    "SportsTeam": "true¦0:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls",
    "Uncountable": "true¦0:1J;a1Qb1Ic19d16e0Zf0Tg0Mh0Hi0Dj0Cknowled1Pl07mXnWoVpRrMsBt6vi5w1;a3ea0Ai2oo1;d,l;ldlife,ne;rmth,t0;neg16ol0Btae;e4h3oothpaste,r1una;affSou1;ble,sers,t;ermod1Lund0;a,nnis;a9cene09eri0Wh8il7kittl0Wnow,o6p4t2u1;g0Znshi0P;ati1Ke1;am,el;ace1De1;ci0Red;ap,cc0;k,v0;eep,ingl0O;d0Cfe17l1nd,tish;m10t;a4e2ic1;e,ke0L;c1laxa0Hsearch;ogni0Grea0G;bi0Hin;aOe3hys17last8o1ress03;l1rk,w0;it15y9;a11trY;bstetr13il,xygen;ational securi0Vews;a8e6ilk,o3u1;mps,s1;ic;n1o0G;ey,o1;gamy;a1chan0V;sl03t;chine1il,themat0T; learn09ry;aught0e3i2ogi0Qu1;ck,g0G;ce,ghtn06ngui0OteratL;a1isK;th0;ewel8usti0J;ce,mp1nformaStself;a1ortan0H;ti1;en0F;a4isto3o1;ck1mework,n1spitali09;ey;ry;ir,libut,ppiB;ene4o2r1um,ymna0B;aAound;l1ssip;d,f; 1t08;editOpo1;ol;i5lour,o2urnit1;ure;od,rgive1uri0wl;ne1;ss;c7sh;conomZduca6lectr5n3quip4thZvery1;body,o1thF;ne;joy1tertain1;ment;iciNonU;tiG;ar2iabet1raugh2;es;ts;a8elcius,h4ivPl3o1urrency;al,ld w1nfusiBttB;ar;assMoth3;aos,e1;e2w1;ing;se;r5sh;a5eef,i2lood,owls,read,utt0;er;lliar2s1;on;ds;g1ss;ga1;ge;c6dvi5ero3ir2mnes1rt,thlet8;ty;craft;b5d1naut5;ynam4;ce;id,ou1;st1;ics",
    "Infinitive": "true¦0:6S;1:76;2:5C;3:74;4:73;5:67;6:6F;7:6Y;8:6Q;9:72;A:70;B:6X;C:5X;D:77;E:6L;F:5B;a6Kb66c57d4De3Xf3Jg3Dh37i2Uj2Sk2Ql2Hm26n23o1Yp1Jr0Rs06tYuTvOwHyG;awn,e31ield;aJe1Zhist6iIoGre6D;nd0rG;k,ry;pe,sh,th0;lk,nHrGsh,tEve;n,raD;d0t;aJiHoG;te,w;eGsB;!w;l6Jry;nHpGr4se;gra4Pli41;dGi9lo5Zpub3Q;erGo;mi5Cw1I;aMeLhKig5SoJrHuGwi7;ne,rn;aGe0Mi5Uu7y;de,in,nsf0p,v5J;r2ZuE;ank,reatC;nd,st;ke pa53lk,rg1Qs9;aZcWeVhTi4Dkip,lSmRnee3Lo52pQtJuGwitE;bmBck,ff0gge7ppHrGspe5;ge,pri1rou4Zvi3;ly,o36;aLeKoJrHuG;dy,mb6;aFeGi3;ngthCss,tE;p,re;m,p;in,ke,r0Qy;la58oil,rink6;e1Zi6o3J;am,ip;a2iv0oG;ck,rtCut;arEem,le5n1r3tt6;aHo2rG;atEew;le,re;il,ve;a05eIisk,oHuG;in,le,sh;am,ll;a01cZdu8fYgXje5lUmTnt,pQquPsKtJvGwa5V;eGiew,o36;al,l,rG;se,t;aFi2u44;eJi7oItG;!o2rG;i5uc20;l3rt;mb6nt,r3;e7i2;air,eHlGo43r0K;a8y;at;aFemb0i3Zo3;aHeGi3y;a1nt;te,x;a5Dr0J;act1Yer,le5u1;a13ei3k5PoGyc6;gni2Cnci6rd;ch,li2Bs5N;i1nG;ge,k;aTerSiRlOoMrIuG;b21ll,mp,rGsh;cha1s4Q;ai1eIiDoG;cGdu8greAhibBmi1te7vi2W;eAlaim;di5pa2ss,veD;iDp,rtr46sGur;e,t;aHead,uG;g,n4;n,y;ck,le;fo34mBsi7;ck,iDrt4Mss,u1;bJccur,ff0pera9utweIverGwe;co47lap,ta22u1wG;helm;igh;ser3taF;eHotG;e,i8;ed,gle5;aMeLiIoHuG;ltip3Grd0;nit13ve;nHrr12sreprG;eseD;d,g6us;asu2lt,n0Nr4;intaFna4rHtG;ch,t0;ch,kGry;et;aMeLiJoGu1C;aHck,oGve;k,sC;d,n;ft,g35ke,mBnk,st2YveG;!n;a2Fc0Et;b0Nck,uG;gh,nE;iGno34;ck,ll,ss;am,oFuG;d4mp;gno2mQnGss3H;cOdica9flu0MhNsKtIvG;eGol3;nt,st;erGrodu8;a5fe2;i7tG;aGru5;ll;abBibB;lu1Fr1D;agi24pG;lemeDo22ro3;aKeIi2oHuG;nt,rry;n02pe,st;aGlp;d,t;nd6ppCrm,te;aKloAove1PrIuG;arGeAi15;ant39d;aGip,ow,umb6;b,sp;in,th0ze;aReaQiOlMoJrHuncG;ti3J;acGeshC;tu2;cus,lHrG;ce,eca7m,s30;d,l24;a1ZoG;at,od,w;gu2lGni1Xt,x;e,l;r,tu2;il,stCvG;or;a15cho,le5mSnPstNvalua9xG;a0AcLerKi7pGte19;a18eHi2laFoGreA;rt,se;ct,riG;en8;ci1t;el,han4;abGima9;li1J;ab6couXdHfor8ga4han8j03riEsu2t0vG;isi2Vy;!u2;body,er4pG;hasiGow0;ze;a07eUiLoKrHuG;mp;aHeAiG;ft;g,in;d4ubt;ff0p,re5sHvG;iZor8;aKcHliGmiApl1Btingui14;ke;oGuA;uGv0;ra4;gr1YppG;ear,ro3;cOeNfLliv0ma0Fny,pKsHterG;mi0G;cribe,er3iHtrG;oy;gn,re;a0Be0Ai5osB;eGi0By;at,ct;m,pC;iIlHrG;ea1;a2i06;de;ma4n8rGte;e,kC;a0Ae09h06i9l04oJrG;aHeGoAu0Hy;a9dB;ck,ve;llZmSnHok,py,uGv0;gh,nt;cePdu5fMsKtIvG;eGin8;rt,y;aFin0VrG;a7ibu9ol;iGtitu9;d0st;iHoGroD;rm;gu2rm;rn;biLfoKmaJpG;a2laF;in;re;nd;rt;ne;ap1e5;aGip,o1;im,w;aHeG;at,ck,w;llen4n4r4se;a1nt0;ll,ncIrGt0u1;eGry;!en;el;aSePloOoMrIuG;lGry;ly;igHuG;sh;htC;en;a7mb,o7rrGth0un8;ow;ck;ar,lHnefBtrG;ay;ie3ong;ng,se;band0Jc0Bd06ffo05gr04id,l01mu1nYppTrQsKttGvoid,waB;acIeHra5;ct;m0Fnd;h,k;k,sG;eIiHocia9uG;me;gn,st;mb6rt;le;chHgGri3;ue;!i3;eaJlIroG;aEve;ch;aud,y;l,r;noun8sw0tG;icipa9;ce;lHt0;er;e4ow;ee;rd;aRdIju7mBoR;it;st;!reA;ss;cJhie3knowled4tiva9;te;ge;ve;eIouDu1;se;nt;pt;on",
    "Unit": "true¦0:19;a14b12c0Od0Ne0Lf0Gg0Ch09in0Hjoule0k02l00mNnMoLpIqHsqCt7volts,w6y4z3°2µ1;g,s;c,f,n;b,e2;a0Nb,d0Dears old,o1;tt0H;att0b;able4b3d,e2on1sp;!ne0;a2r0D;!l,sp;spo04; ft,uare 1;c0Id0Hf3i0Fkilo0Jm1ya0E;e0Mil1;e0li0H;eet0o0D;t,uart0;ascals,e2i1ou0Pt;c0Mnt0;rcent,t02;hms,uYz;an0JewtT;/s,b,e9g,i3l,m2p1²,³;h,s;!²;!/h,cro5l1;e1li08;! pFs1²;! 1;anEpD;g06s0B;gQter1;! 2s1;! 1;per second;b,i00m,u1x;men0x0;b,elvin0g,ilo2m1nR;!/h,ph,²;byZgXmeter1;! p2s1;! p1;er1; hour;e1g,r0z;ct1rtz0;aXogQ;al2b,igAra1;in0m0;!l1;on0;a4emtPl2t1;²,³; oz,uid ou1;nce0;hrenheit0rad0;b,x1;abyH;eciCg,l,mA;arat0eAg,m9oulomb0u1;bic 1p0;c5d4fo3i2meAya1;rd0;nch0;ot0;eci2;enti1;me4;!²,³;lsius0nti1;g2li1me1;ter0;ram0;bl,y1;te0;c4tt1;os1;eco1;nd0;re0;!s",
    "Organization": "true¦0:46;a3Ab2Qc2Ad21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2S;a3e1orld trade organizati41;lls fargo,st1;fie22inghou16;l1rner br3D;-m11gree31l street journ25m11;an halNeriz3Wisa,o1;dafo2Gl1;kswagLvo;bs,kip,n2ps,s1;a tod2Rps;es35i1;lev2Xted natio2Uv; mobi2Kaco bePd bMeAgi frida9h3im horto2Tmz,o1witt2W;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen33daily ma2Xguess w2holli0rolling st1Ms1w2;mashing pumpki2Ouprem0;ho;ea1lack eyed pe3Fyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Gnp,o2pice gir5ta1ubaru;rbucks,to2N;ny,undgard1;en;a2Rx pisto1;ls;few25insbu26msu1X;.e.m.,adiohead,b6e3oyal 1yan2X;b1dutch she4;ank;/max,aders dige1Ed 1vl32;bu1c1Uhot chili peppe2Klobst28;ll;c,s;ant2Vizno2F;an5bs,e3fiz24hilip morrBi2r1;emier27octer & gamb1Rudenti14;nk floyd,zza hut;psi28tro1uge08;br2Qchina,n2Q; 2ason1Xda2G;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Etflix,w1; 1sweek;kids on the block,york08;a,c;nd1Us2t1;ional aca2Fo,we0Q;a,cYd0O;aAcdonald9e5i3lb,o1tv,yspace;b1Nnsanto,ody blu0t1;ley crue,or0O;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt13z1Y;'ore09a3e1g,ittle caesa1Ktd;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1K;art;iffy lu0Lo3pmorgan1sa;! cha1;se;hnson & johns1Sy d1R;bm,hop,n1tv;c,g,te1;l,rpol; & m,asbro,ewlett-packaTi3o1sbc,yundai;me dep1n1J;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Iu1;cci,ns n ros0;ldman sachs,o1;dye1g0B;ar;axo smith kliZencore;electr0Im1;oto0V;a3bi,da,edex,i1leetwood mac,oGrito-l0A;at,nancial1restoV; tim0;cebook,nnie mae;b06sa,u3xxon1; m1m1;ob0H;!rosceptics;aiml0Ae5isney,o3u1;nkin donuts,po0Wran dur1;an;j,w j1;on0;a,f leppa3ll,p2r spiegZstiny's chi1;ld;eche mode,t;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra05;al;!ca c5l4m1o0Ast05;ca2p1;aq;st;dplMgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Hy;dbury,pital o1rl's jr;ne;aGbc,eCfAl6mw,ni,o2p,r1;exiteeWos;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roX;ckbuster video,omingda1;le; g1g1;oodriN;cht3e ge0n & jer2rkshire hathaw1;ay;ryH;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bXcSdidRerosmith,ig,lLmFnheuser-busEol,ppleAr7s3t&t,v2y1;er;is,on;hland2s1;n,ociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c",
    "Demonym": "true¦0:16;1:13;a0Wb0Nc0Cd0Ae09f07g04h02iYjVkTlPmLnIomHpDqatari,rBs7t5u4v3wel0Rz2;am0Fimbabwe0;enezuel0ietnam0H;g9krai1;aiwThai,rinida0Iu2;ni0Qrkmen;a4cot0Ke3ingapoOlovak,oma0Tpa05udRw2y0X;edi0Kiss;negal0Br08;mo0uU;o6us0Lw2;and0;a3eru0Hhilipp0Po2;li0Ertugu06;kist3lesti1na2raguay0;ma1;ani;amiZi2orweP;caragu0geri2;an,en;a3ex0Mo2;ngo0Erocc0;cedo1la2;gasy,y08;a4eb9i2;b2thua1;e0Dy0;o,t02;azakh,eny0o2uwaiti;re0;a2orda1;ma0Bp2;anN;celandic,nd4r2sraeli,ta02vo06;a2iT;ni0qi;i0oneV;aiDin2ondur0unN;di;amDe2hanai0reek,uatemal0;or2rm0;gi0;i2ren7;lipino,n4;cuadoVgyp6ngliJsto1thiopi0urope0;a2ominXut4;niH;a9h6o4roa3ub0ze2;ch;ti0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el8o6r3ul2;gaG;aziBi2;ti2;sh;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;gent2me1;ine;ba1ge2;ri0;ni0;gh0r2;ic0;an",
    "Possessive": "true¦anyAh5its,m3noCo1sometBthe0yo1;ir1mselves;ur0;!s;i8y0;!se4;er1i0;mse2s;!s0;!e0;lf;o1t0;hing;ne",
    "Currency": "true¦$,aud,bScQdLeurKfJgbp,hkd,iIjpy,kGlEp8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotySł;en,uanR;af,of;h0t5;e0il5;k0q0;elM;iel,oubleLp,upeeL;e2ound st0;er0;lingI;n0soH;ceGn0;ies,y;e0i8;i,mpi7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s",
    "City": "true¦0:73;1:61;2:6G;3:5U;4:5R;a68b54c4Id4Ae46f3Yg3Jh38i2Zj2Uk2Dl22m1Kn19o16p0Uq0Sr0Ls01tPuOvLwDxiBy9z5;a7h5i4Muri4O;a5e5ongsh0;ng3J;greb,nzib5G;ang2e5okoha3Uunfu;katerin3Jrev0;a5n0O;m5Hn;arsBeAi6roclBu5;h0xi,zh5P;c7n5;d5nipeg,terth4;hoek,s1K;hi5Zkl3C;l63xford;aw;a6ern2i5ladivost5Molgogr6K;en3lni6R;lenc6Dncouv2Yr3ughn;lan bat1Drumqi,trecht;aDbilisi,eCheBi9o8r7u5;l21n63r5;in,ku;ipoli,ondh62;kyo,m34ron1QulouS;an5jua3l2Zmisoa6Era3;j4Xshui; hag65ssaloni2L;gucigal28hr0l av1W;briz,i6llinn,mpe5Ang5rtu,shk2X;i2Msh0;an,chu1n0p2Iyu0;aEeDh8kopje,owe1It7u5ydney;ra5zh51;ba0Jt;aten is59ockholm,rasbou6Auttga31;an8e6i5;jiazhua1llo1m60y0;f54n5;ya1zh4L;gh3Ot4U;att4Ao1Yv49;cramen18int DlBn5o paulo,ppo3Wrajevo; 7aa,t5;a 5ia3Io domin3I;a3fe,m1O;antonCdie3Gfrancisco,j5ped3Ssalv8;o5u0;se;em,v5z2B;ad0I;lou59peters29;aAe9i7o5;me,sar5t5A;io;ga,o5yadh;! de janei3I;cife,ykjavik;b4Uip4lei2Mnc2Swalpindi;ingdao,u5;ez2i0Q;aEeDhCiBo8r7u6yong5;ya1;eb5Aya1;ag54etor53;rt5zn0; 5la4Fo;au prin0Nelizabe29sa05;ls3Srae5Ctts2B;iladelph4Ynom pe1Doenix;r26tah tik3I;ler00naji,r4Pt5;na,r36;ak47des0Lm1Rr6s5ttawa;a3Ylo;an,d07;a8ew6i5ovosibir1Oyc;ng2Hs; 5cast39;del27orlea46taip16york;g8iro4Xn5pl2Zshv36v0;ch6ji1t5;es,o1;a1o1;a6o5p4;ya;no,sa0Y;aFeCi9o6u5;mb2Cni28sc40;gadishu,nt6s5;c17ul;evideo,re31;ami,l6n18s5;kolc,sissauga;an,waukee;cca,d5lbour2Pmph41;an,ell5i3;in,ín;cau,drAkass2Tl9n8r5shh4A;aca6ib5rakesh,se2N;or;i1Ty;a4EchEdal12i47;mo;id;aCeiAi8o6u5vRy2;anLckn0Rdhia3;n5s angel28;d2g bea1O;brev2De3Kma5nz,sb2verpo2A;!ss29;c5pzig;est0C; p6g5ho2Yn0Gusan27;os;az,la35;aHharFiClaipeBo9rak0Hu7y5;iv,o5;to;ala lump4n5;mi1sh0;be,hi0Llka2Zpavog4si5wlo2;ce;da;ev,n5rkuk;gSsha5;sa;k5toum;iv;bIdu3llakuric0Tmpa3Gn6ohsiu1ra5un1Lwaguc0T;c0Sj;d5o,p4;ah1Vy;a7e6i5ohannesZ;l1Xn0;dd37rusalem;ip4k5;ar2J;bad0mph1QnBrkutYs8ta01z5̇zm7;m6tapala5;pa;ir;fah0l6tanb5;ul;am2Zi2I;che2d5;ianap2Lo21;aBe8o5yder2W; chi mi6ms,nolulu,u5;st2;nh;f6lsin5rakli2;ki;ei;ifa,lifax,m7n5rb1Dva3;gAnov5oi;er;bu2Wilt2;aFdanEenDhCiPlasgBo9raz,u5;a5jr21;dal6ng5yaquil;zh1H;aja2Lupe;ld coa18then5;bu2P;ow;ent;e0Toa;sk;lw7n5za;dhi5gt1C;nag0S;ay;aisal26es,o8r6ukuya5;ma;ankfu5esno;rt;rt5sh0; wor6ale5;za;th;d5indhov0Nl paso;in5mont2;bur5;gh;aAe8ha0Visp4o7resd0Ju5;b5esseldorf,rb0shanbe;ai,l0G;ha,nggu0rtmu11;hradRl5troit;hi;donghHe5k08li0masc1Xr es sala1HugavpiY;gu,je2;aKebu,hAo5raio03uriti1P;lo7n6penhag0Ar5;do1Nk;akLst0V;gVm5;bo;aBen8i6ongqi1ristchur5;ch;ang m7ca5ttago1;go;g6n5;ai;du,zho1;n5ttogr12;digarh,g5;ch8sha,zh06;i9lga8mayenJn6pe town,r5;acCdiff;ber18c5;un;ry;ro;aUeMhJirmingh0ToIr9u5;chareRdapeRenos air7r5s0tu0;g5sa;as;es;a9is6usse5;ls;ba6t5;ol;ne;sil0Mtisla7zzav5;il5;le;va;goZst2;op6ubaneshw5;ar;al;iBl9ng8r5;g6l5n;in;en;aluru,hazi;fa5grade,o horizonte;st;ji1rut;ghd0BkGnAot9r7s6yan n4;ur;el,r07;celo3ranquil09;na;ou;du1g6ja lu5;ka;alo6k5;ok;re;ng;ers5u;field;a04b01cc00ddis abaZgartaYhmedWizawl,lQmNnHqaZrEsBt7uck5;la5;nd;he7l5;an5;ta;ns;h5unci2;dod,gab5;at;li5;ngt2;on;a6chora5kaNtwerp;ge;h7p5;ol5;is;eim;aravati,m0s5;terd5;am; 8buquerq7e5giers,maty;ppo,xandr5;ia;ue;basrah al qadim5mawsil al jadid5;ah;ab5;ad;la;ba;ra;idj0u dha5;bi;an;lbo6rh5;us;rg",
    "Country": "true¦0:39;1:2M;a2Xb2Ec22d1Ye1Sf1Mg1Ch1Ai14j12k0Zl0Um0Gn05om3DpZqat1KrXsKtCu6v4wal3yemTz2;a25imbabwe;es,lis and futu2Y;a2enezue32ietnam;nuatu,tican city;.5gTkraiZnited 3ruXs2zbeE;a,sr;arab emirat0Kkingdom,states2;! of am2Y;k.,s.2; 28a.;a7haBimor-les0Bo6rinidad4u2;nis0rk2valu;ey,me2Ys and caic1U; and 2-2;toba1K;go,kel0Znga;iw2Wji2nz2S;ki2U;aCcotl1eBi8lov7o5pa2Cri lanka,u4w2yr0;az2ed9itzerl1;il1;d2Rriname;lomon1Wmal0uth 2;afr2JkLsud2P;ak0en0;erra leoEn2;gapo1Xt maart2;en;negKrb0ychellY;int 2moa,n marino,udi arab0;hele25luc0mart20;epublic of ir0Dom2Duss0w2;an26;a3eHhilippinTitcairn1Lo2uerto riM;l1rtugE;ki2Cl3nama,pua new0Ura2;gu6;au,esti2;ne;aAe8i6or2;folk1Hth3w2;ay; k2ern mariana1C;or0N;caragua,ger2ue;!ia;p2ther19w zeal1;al;mib0u2;ru;a6exi5icro0Ao2yanm05;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagasc00l6r4urit3yot2;te;an0i15;shall0Wtin2;ique;a3div2i,ta;es;wi,ys0;ao,ed01;a5e4i2uxembourg;b2echtenste11thu1F;er0ya;ban0Hsotho;os,tv0;azakh1Ee3iriba03o2uwait,yrgyz1E;rWsovo;eling0Jnya;a2erF;ma15p1B;c6nd5r3s2taly,vory coast;le of m19rael;a2el1;n,q;ia,oI;el1;aiSon2ungary;dur0Mg kong;aAermany,ha0Pibralt9re7u2;a5ern4inea2ya0O;!-biss2;au;sey;deloupe,m,tema0P;e2na0M;ce,nl1;ar;bTmb0;a6i5r2;ance,ench 2;guia0Dpoly2;nes0;ji,nl1;lklandTroeT;ast tim6cu5gypt,l salv5ngl1quatorial3ritr4st2thiop0;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprQzech2; 8ia;ba,racao;c3lo2morPngo-brazzaville,okFsta r03te d'ivoiK;mb0;osD;i2ristmasF;le,na;republic;m2naTpe verde,yman9;bod0ero2;on;aFeChut00o8r4u2;lgar0r2;kina faso,ma,undi;azil,itish 2unei;virgin2; is2;lands;liv0nai4snia and herzegoviGtswaGuvet2; isl1;and;re;l2n7rmuF;ar2gium,ize;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaFlCmAn5r3ustr2zerbaijH;al0ia;genti2men0uba;na;dorra,g4t2;arct6igua and barbu2;da;o2uil2;la;er2;ica;b2ger0;an0;ia;ni2;st2;an",
    "Region": "true¦0:2M;1:2S;2:2J;a2Pb2Cc1Yd1Tes1Sf1Qg1Kh1Gi1Bj17k12l0Zm0On07o05pZqWrTsKtFuCv9w5y3zacatec2T;akut0o0Du3;cat2k07;a4est 3isconsin,yomi1L;bengal,vi6;rwick2Ashington3;! dc;er4i3;rgin0;acruz,mont;dmurt0t3;ah,tar3; 2Ka0W;a5e4laxca1Qripu1Wu3;scaDva;langa1nnessee,x2E;bas0Um3smNtar24;aulip2Cil nadu;a8i6o4taf10u3ylh1E;ffYrr03s19;me1Bno1Puth 3;cVdU;ber0c3kkim,naloa;hu2ily;n4skatchew2xo3;ny; luis potosi,ta catari1;a3hode9;j3ngp06;asth2shahi;ingh24u3;e3intana roo;bec,en5reta0Q;ara7e5rince edward3unjab; i3;sl0A;i,nnsylv3rnambu0A;an0;!na;axa0Xdisha,h3klaho1Zntar3reg6ss0Ax0F;io;aIeDo5u3;evo le3nav0V;on;r3tt16va scot0;f8mandy,th3; 3ampton15;c5d4yo3;rk13;ako1M;aroli1;olk;bras1Lva0Bw3; 4foundland3;! and labrador;brunswick,hamp0Wjers3mexiRyork state;ey;galOyarit;a9eghala0Mi5o3;nta1r3;dov0elos;ch5dlanCn4ss3zor11;issippi,ouri;as geraOneso18;ig2oac2;dhy12harasht0Gine,ni4r3ssachusetts;anhao,i el,ylF;p3toba;ur;anca0Ie3incoln0IouisH;e3iR;ds;a5e4h3omi;aka06ul1;ntucky,ra01;bardino,lmyk0ns0Qr3;achay,el0nata0X;alis5har3iangxi;kh3;and;co;daho,llino6n3owa;d4gush3;et0;ia1;is;a5ert4i3un2;dalFm0D;fordZ;mpYrya1waii;ansu,eorg0lou7oa,u3;an4erre3izhou,jarat;ro;ajuato,gdo3;ng;cesterS;lori3uji2;da;sex;ageTe6o4uran3;go;rs3;et;lawaLrbyK;aEeaDh8o3rimea ,umbr0;ahui6l5nnectic4rsi3ventry;ca;ut;i02orado;la;e4hattisgarh,i3uvash0;apQhuahua;chn4rke3;ss0;ya;ra;lFm3;bridge6peche;a8ihar,r7u3;ck3ryat0;ingham3;shi3;re;emen,itish columb0;h0ja cal7lk6s3v6;hkorto3que;st2;an;ar0;iforn0;ia;dygea,guascalientes,lAndhr8r4ss3;am;izo1kans4un3;achal 6;as;na;a 3;pradesh;a5ber4t3;ai;ta;ba4s3;ka;ma",
    "Place": "true¦a0Eb0Bc04d03e02f00gVhUiRjfk,kOlMmJneGoFpBque,rd,s9t6u5v4w1y0;akutOyz;ake isFis1y0;!o;!c;a,ostok,t;laanbaatar,p02safa,t;ahiti,e1he 0;bronx,hamptons;nn,x;a0fo,oho,t,under7yd;khalNsk;a2e1h0itcairn;l,x;k,nnN;!cif04;kla,nt,rd;b1w eng0;land;!r;a1co,i0t,uc;dNnn;gadZlibu,nhattZ;a0gw,hr;s,x;an1osrae,rasnoyar0ul;sk;!s;a1cn,da,nd0st;ianRochina;!x;arlem,kg,nd,oHwy;a3re0;at 0enwich;brita0lakH;in;!y village;co,l0ra;!a;urope,vergladC;ak,en,fw,ist,own4xb;al5dg,gk,h2l1o0rA;lo,nn;!t;a1ina0uuk;town;morro,tham;!if;cn,e1kk,l0rooklyn;vd;l air,verly hills;frica,lta,m7n3r2sia,tl1ve,zor0;es;!ant2;ct1iz;adyr,tarct0;ic0; oce0;an;ericas,s",
    "MaleName": "true¦0:E4;1:D5;2:DN;3:AX;4:D1;5:CF;6:CV;7:C7;8:B5;9:DK;A:DJ;B:A5;C:C1;aCNbBKcAId9Ge8Mf84g7Hh6Ti6Dj5Dk51l4Cm34n2So2Mp2Equ2Cr1Ls11t0Eu0Dv07wTxSyIzD;aDor0;cDh9Skaria,n5V;hEkD;!aCL;ar5VeCK;aLoFuD;sDu2JvBX;if,uf;nFsEusD;ouf,sD;ef;aDg;s,tD;an,h0;hli,nBLssX;avi3ho4;aMeKiFoDyaC1;jcie8Blfgang,odrow,utD;!er;lDnst1;bFey,frD0lD;aBCiD;am,e,s;e9Eur;i,nde8sD;!l7t1;de,lErr9yD;l1ne;lDt3;aA9y;aGiDladimir,ojte7Y;cEha0kt68nceDrgAIva0;!nt;e3Ut66;lentDnA4;in4X;ghBUlyss5Bnax,sm0;aXeShOiMoHrFuEyD;!l3ro6s1;nAr5B;avAVeDist0oy,um0;ntANv5Yy;bGdFmDny;!as,mDoharu;aCSie,y;!d;iBy;mDt5;!my,othy;adFeoEia8FomD;!as;!do8O;!de5;dGrD;en9KrD;an9JeDy;ll,n9I;!dy;dgh,ha,iDnn3req,tsu4S;cB4ka;aTcotRePhLiJoHpenc3tDur1Uylve9Jzym1;anFeDua8C;f0phBSvDwa8B;e61ie;!islaw,l7;lom1nBEuD;leyma6ta;dDlBm1yabonga;!dhart7An7;aFeD;lDrm0;d1t1;h7Tne,qu0Zun,wn,y6;aDbasti0k29l4Qrg4Nth,ymoAT;m5n;!tD;!ie,y;lEmDnti2Dq5Aul;!ke5LmCu4;ik,vato7W;aXeTheA9iPoHuEyD;an,ou;b7MdEf5pe7RssD;!elBY;ol3Ey;an,bJc66dIel,geHh0landBPmGnFry,sEyD;!ce;coe,s;!aAGnC;an,eo;l46r;e5Ng3n7olfo,ri79;bCeB7;cDl7;ar6Pc6OhEkDo;!ey,ie,y;a99ie;gEid,ub9x,yDza;an1InY;gA8iD;naA4s;ch70fa4lHmGndFpha4sEul,wi2HyD;an,mo82;h7Vm5;alBDol2Uy;iATon;f,ph;ent2inD;cy,t1;aIeGhilFier72ol,rD;aka16eD;m,st1;!ip,lip;dALrcy,tD;ar,e3Gr1X;b4Kdra7Ft4ZulD;!o17;ctav3Fi3liv3mAFndrej,rHsEtDumAw9;is,to;aEcAkAm0vD;al5Z;ma;i,l53vL;aLeJiFoDu3A;aDel,j5l0ma0r3K;h,m;cEg4i49kD;!au,h7Uola;holBkDolB;!olB;al,d,il,ls1vD;il8Y;hom,thD;anDy;!a4i4;aZeWiMoHuEyD;l2Jr1;hamEr6XstaD;fa,p5C;ed,mH;di0We,hamFis2FntEsDussa;es,he;e,y;ad,ed,mD;ad,ed;cIgu4hai,kGlFnEtchD;!e8;a8Aik;house,o0Bt1;ae5YeA4olD;aj;ah,hDk7;aEeD;al,l;el,l;hElv2rD;le,ri8v2;di,met;ay0ck,hTjd,ks2DlRmadWnQrKs1tFuricExD;!imilian9Nwe8;e,io;eGhEiBtDus,yB;!eo,hew,ia;eDis;us,w;j,o;cHio,kGlFqu7Dsha8tDv2;iDy;!m,n;in,on;!el,oPus;!el9IoOus;iGu4;achDcolm,ik;ai,y;amEdi,eDmoud;sh;adDm5T;ou;aXeQiOlo3EoKuEyD;le,nd1;cGiFkDth3uk;aDe;!s;gi,s,z;as,iaD;no;g0nn7SrenFuDv8Jwe8;!iD;e,s;!zo;am,oD;n4r;a8Cevi,la5JnIoGst3thaFvD;eDi;nte;bo;!nD;!a6Sel;!ny;mFnErDur5Hwr5H;ry,s;ce,d1;ar,o5A;aLeGhaled,iDrist5Iu4Vy6X;er0p,rD;by,k,ollD;os;en0iGnDrmit,v44;!dEnDt5Z;e1Ay;a8ri59;r,th;cp3j5m66na73rEspAthem,uD;ri;im,l;a02eUiSoGuD;an,lDst2;en,iD;an,en,o,us;aNeLhnKkubBnIrGsD;eEhDi8Bue;!ua;!ph;dDge;an,i,on;!aDny;h,s,th5I;!ath5Hie,nC;!l,sDy;ph;o,qu2;an,mD;!mC;d,ffIrFsD;sDus;!e;a6BemEmai6oDry;me,ni0Y;i7Ty;!e60rD;ey,y;cKd9kImHrFsEvi3yD;!d9s1;on,p3;ed,od,rDv56;e5Nod;al,es4Xis1;a,e,oDub;b,v;k,ob,quD;es;aWbQchiPgNkeMlija,nuLonut,rJsFtDv0;ai,suD;ki;aEha0i7DmaDsac;el,il;ac,iaD;h,s;a,vinDw2;!g;k,nngu5S;!r;nacDor;io;ka;ai,rahD;im;aPeJoIuDydA;be2KgGmber4WsD;eyEsD;a2e2;in,n;h,o;m3ra3Gsse2wa4B;aHctGitGnrErD;be2Dm0;iDy;!q11;or;th;bMlLmza,nKo,rFsEyD;a4Jd9;an,s0;lGo50rFuDv7;hi4Gki,tD;a,o;is1y;an,ey;k,s;!im;ib;aVeRiPlenOoLrHuD;ilEsD;!tavo;herme,lerD;mo;aFegDov3;!g,orD;io,y;dy,h5Wnt;nzaErD;an,d1;lo;!n;lbe5Ano,oD;rg3Hvan5A;ne,oFrD;aDry;ld,rd5H;ffr7rge;brEl9rDv2;la28r3Sth,y;e3EielD;!i5;aTePiNlLorr0NrD;anFedDitz;!dCeDri2B;ri2A;cFkD;!ie,lD;in,yn;esLisD;!co,z36;etch3oD;yd;d4lDnn,onn;ip;deriFliEng,rnD;an06;pe,x;co;bi0di,hd;ar04dZfrYit0lSmKnHo2rFsteb0th0uge6vDym9zra;an,eD;ns,re36;gi,i0DnDrol,v2w2;est4Pie;oEriqDzo;ue;ch;aJerIiEmD;aIe2Z;lErD;!h0;!iD;o,s;s1y;nu4;be0Cd1iGliFmEt1viDwood;n,s;er,o;ot1Ys;!as,j4NsD;ha;a2en;!dCgAmGoEuEwD;a2Din;arD;do;o0Wu0W;l,nD;est;a01eRiOoHrGuFwEylD;an,l0;ay6ight;a6dl7nc0st2;ag0ew;minGnEri0ugDvydBy2D;!lB;!a2MnDov0;e8ie,y;go,iDykB;cDk;!k;armuEeDll1on,rk;go;id;anKj0lbeJmetri5nHon,rGsFvEwDxt3;ay6ey;en,in;hawn,mo0B;ek,ri0I;is,nDv3;is,y;rt;!dD;re;an,lNmLnKrGvD;e,iD;! lucDd;as,ca;en,iFne8rDyl;eDin,yl;l3Bn;n,o,us;!e,i4ny;iDon;an,en,on;e,lB;as;a09e07hYiar0lNoIrGuEyrD;il,us;rtD;!is;aDistob0U;ig;dy,lGnErD;ey,neli5y;or,rD;ad;by,e,in,l2t1;aIeFiDyK;fDnt;fo0Ft1;meEt5velaD;nd;nt;rFuEyD;!t1;de;enD;ce;aIeGrisEuD;ck;!tD;i0oph3;st3;er;d,rDs;b4leD;s,y;cDdric,sA;il;lGmer1rD;ey,lEro8y;ll;!os,t1;eb,v2;a07eZiVlaUoRrEuDyr1;ddy,rtK;aLeGiFuEyD;an,ce,on;ce,no;an,ce;nEtD;!t;dEtD;!on;an,on;dEndD;en,on;!foDl7y;rd;bErDyd;is;!by;i6ke;bFlEshD;al;al,lC;ek;nHrDshoi;at,nEtD;!r1C;aDie;rd14;!edict,iEjam2nC;ie,y;to;kaMlazs,nHrD;n7rDt;eDy;tt;ey;dDeE;ar,iD;le;ar17b0Vd0Rf0Pgust2hm0Mi0Jja0Il04m00nSputsiRrIsaHuFveEyDziz;a0kh0;ry;gust5st2;us;hi;aKchJiIjun,maHnFon,tDy0;hDu09;ur;av,oD;ld;an,nd0H;!el,ki;ie;ta;aq;as,dIgel0CtD;hoGoD;i6nD;!i09y;ne;ny;er,reDy;!as,i,s,w;iFmaDos;nu4r;el;ne,r,t;an,bePd9eJfHi,lGonFphXt1vD;aNin;on;so,zo;an,en;onTrD;edU;c,jaGksandFssaGxD;!andD;er,ru;ar,er;ndD;ro;rtN;ni;d9mA;ar;en;ad,eD;d,t;in;onD;so;aEi,olfDri0vik;!o;mDn;!a;dHeGraEuD;!bakr,lfazl;hDm;am;!l;allIelFoulaye,ulD;!lDrF;ah,o;! rD;ahm0;an;ah;av,on",
    "LastName": "true¦0:9F;1:9V;2:9X;3:9H;4:9N;5:8J;6:9K;7:A0;8:9E;9:88;A:77;B:6E;C:6J;a9Ub8Lc7Kd6Xe6Rf6Dg5Vh58i54j4Pk45l3Nm2Rn2Eo26p1Nquispe,r17s0Ft05vVwOxNyGzD;aytsADhD;aDou,u;ng,o;aGeun7ZiDoshiA9un;!lD;diDmaz;rim,z;maDng;da,guc97mo6UsDzaA;aAhiA7;iao,u;aHeGiEoDright,u;jc8Sng;lDmm0nkl0sniewsA;liA1s2;b0iss,lt0;a5Rgn0lDng,tanabe;k0sh;aHeGiEoDukB;lk5roby5;dBllalDnogr2Zr0Zss0val37;ba,obos;lasEsel7N;lGn dFrg8EsEzD;qu7;ily9Oqu7silj9O;en b35ijk,yk;enzue95verde;aLeix1JhHi4j6ka3IoGrFsui,uD;om4ZrD;c4n0un1;an,embl8TynisA;dor95lst31m3rr9th;at5Mi7LoD;mErD;are6Ylaci64;ps2s0Y;hirBkah8Dnaka;a00chWeThPiNmKoItFuEvDzabo;en8Aobod34;ar7bot3lliv4zuA;aEein0oD;i67j3Lyan8V;l6rm0;kol5lovy5re6Psa,to,uD;ng,sa;iDy5Z;rn5tD;!h;l5YmDngh,rbu;mo6Do6J;aFeDimizu;hu,vchD;en7Cuk;la,r17;gu8mDoh,pulve8Trra4R;jDyD;on5;evi6Filtz,miDneid0roed0ulz,warz;dEtD;!z;!t;ar42h6ito,lFnDr3saAto,v3;ch7d0AtDz;a4Pe,os;as,ihBm3Zo0Q;aOeNiKoGuEyD;a66oo,u;bio,iz,sD;so,u;bEc7Bdrigue57g03j73mDosevelt,ssi,ta7Nux,w3Z;a4Be0O;ertsDins2;!on;bei0LcEes,vDzzo;as,e8;ci,hards2;ag4es,it0ut0y9;dFmEnDsmu7Zv5F;tan1;ir7os;ic,u;aSeLhJiGoErDut6;asad,if5Zochazk1W;lishc24pDrti62u55we66;e2Tov48;cEe09nD;as,to;as60hl0;aDillips;k,m,n5K;de3AetIna,rGtD;ersErovDtersC;!a,ic;en,on;eDic,ry,ss2;i8ra,tz,z;ers;h71k,rk0tEvD;ic,l3T;el,t2O;bJconnor,g2ClGnei5PrEzD;demir,turk;ella3MtDwe5N;ega,iz;iDof6GsC;vDyn1F;ei8;aPri1;aLeJguy1iFoDune44ym4;rodahl,vDwak;ak3Uik5otn56;eEkolDlsCx2;ic,ov6X;ls1miD;!n1;ils2mD;co42ec;gy,kaEray4varD;ro;jiDmu8shiD;ma;aXcVeQiPoIuD;lGnFrDssoli5T;atDpUr68;i,ov3;oz,te4B;d0l0;h4lIo0HrEsDza0Z;er,s;aFeEiDoz5r3Ete4B;!n6F;au,i8no,t4M;!l9;i2Rl0;crac5Ohhail5kke3Qll0;hmeGij0j2ElFndErci0ssiDyer19;!er;e3Bo2Z;n0Io;dBti;cartDlaughl6;hy;dMe6Dgnu5Ei0jer34kLmJnci59rFtEyD;er,r;ei,ic,su1N;iEkBqu9roqu6tinD;ez,s;a54c,nD;!o;a52mD;ad5;e5Oin1;rig4Ns1;aSeMiIoGuEyD;!nch;k3nDo;d,gu;mbarDpe2Rvr3;di;!nDu,yana1R;coln,dD;bDholm;erg;bed5TfeGhtFitn0kaEn6rDw2G;oy;!j;in1on1;bvDvD;re;iDmmy,rsCu,voie;ne,t11;aTennedy,h4iSlQnez46oJrGuEvar4woD;k,n;cerDmar58znets5;a,o2G;aDem0i2Zyeziu;sni3PvD;ch3U;bay4Frh0Jsk0TvaFwalDzl5;czDsA;yk;cFlD;!cDen3Q;huk;!ev3ic,s;e6uiveD;rt;eff0l3mu8nnun1;hn,lloe,minsArEstra31to,ur,yDzl5;a,s0;j0GlsC;aMenLha2Pim0QoEuD;ng,r3;e2JhFnErge2Ju2NvD;anB;es,ss2;anEnsD;en,on,t2;nesDsC;en,s1;ki26s1;cGkob3RnsDrv06;en,sD;enDon;!s;ks2obs1;brahimBglesi3Ake4Ll0CnoZoneFshikEto,vanoD;u,v4A;awa;scu;aPeIitchcock,jaltal6oFrist46uD;!aDb0gh9ynh;m4ng;a23dz3fEjga2Sk,rDx3B;ak0Yvat;er,fm3B;iGmingw3NnErD;nand7re8;dDriks1;ers2;kkiEnD;on1;la,n1;dz3g1lvoLmJnsCqIrr0SsFuEyD;as36es;g1ng;anEhiD;mo0Q;i,ov08;ue;alaD;in1;rs1;aMeorgLheorghe,iJjonIoGrEuDw2;o,staf2Utierr7zm4;ayDg3iffitUub0;li1G;lub3Rme0JnD;calv9zale0I;aj,i;l,mDordaL;en7;iev3B;gnJlGmaFnd2No,rDs2Nuthi0;cDza;ia;ge;eaElD;agh0i,o;no;e,on;ab0erMiIjeldsted,lor9oGrFuD;cDent9ji3F;hs;an1Wiedm4;ntaDrt6st0urni0;na;lipEsD;ch0;ovD;!ic;hatBnandeVrD;arDei8;a,i;ov3;dHinste6riksCsDva0D;cob2ZpDtra2X;inoDosiM;za;en,s2;er,is2wards;aUeMiKjurhuJoHrisco0YuEvorakD;!oQ;arte,boEmitru,rDt2U;and,ic;is;g4he0Hmingu7n2Ord19tD;to;us;aDmitr29ssanayake;s,z; GbnaFlEmirDrvis1Lvi,w4;!ov3;gado,ic;th;bo0groot,jo03lEsilDvri9;va;a cruz,e2uD;ca;hl,mcevsAnErw6t2EviD;d5es,s;ieDku1S;ls1;ki;a05e00hNiobMlarkLoFrD;ivDuz;elli;h1lGntFop0rDs26x;byn,reD;a,ia;i,rer0O;em4liD;ns;!e;anu;aLeIiu,oGriDuJwe;stD;eDiaD;ns1;i,ng,uFwDy;!dhury;!n,onEuD;ng;!g;kEnDtterjee,v7;!d,g;ma,raboD;rty;bGl09ng3rD;eghetEnD;a,y;ti;an,ota0M;cer9lder2mpbeIrFstDvadi08;iDro;llo;doEt0uDvalho;so;so,zo;ll;es;a09eXhUiSlNoGrFyD;rne,tyD;qi;ank5iem,ooks,yant;gdan5nFruya,su,uchEyHziD;c,n5;ard;darDik;enD;ko;ov;aEondD;al;nEzD;ev3;co;ancRshwD;as;a01oDuiy4;umDwmD;ik;ckNethov1gu,ktLnJrD;gGisFnD;ascoDds1;ni;ha;er,mD;ann;gtDit7nett;ss2;asD;hi;er,ham;b3ch,ez,hMiley,kk0nHrDu0;bEnDua;es,i0;ieDosa;ri;dDik;a8yopadhyD;ay;ra;er;k,ng;ic;cosZdYguilXkhtXlSnJrGsl4yD;aEd6;in;la;aEsl4;an;ujo,ya;dFgelD;ovD;!a;ersGov,reD;aDjL;ss1;en;en,on,s2;on;eksejGiyGmeiFvD;ar7es;ez;da;ev;ar;ams;ta",
    "WeekDay": "true¦fri2mon2s1t0wednesd3;hurs1ues1;aturd1und1;!d0;ay0;!s",
    "Month": "true¦aBdec9feb7j2mar,nov9oct1sep0;!t8;!o8;an3u0;l1n0;!e;!y;!u1;!ru0;ary;!em0;ber;pr1ug0;!ust;!il",
    "Date": "true¦ago,t2week0yesterd4; e0e0;nd;mr2o0;d0morrow;ay;!w",
    "FirstName": "true¦aKblair,cGdevFgabrieEhinaDjBk8l7m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g6ne;a1el0ina,org5;!okuh9;naia,r0;ion,lo;ashawn,uca;asCe1ir0rE;an;lsAnyat2rry;am0ess6ie,ude;ie,m5;ta;le;an,on;as2h0;arl0eyenne;ie;ey,sidy;lex2ndr1ubr0;ey;a,ea;is",
    "Person": "true¦ashton kutchTbScNdLeJgastOhHinez,jFkEleDmCnettKoBp9r4s3t2v0;a0irgin maH;lentino rossi,n go3;aylor,heresa may,iger woods,yra banks;addam hussain,carlett johanssKlobodan milosevic,uC;ay romano,e3o1ush limbau0;gh;d stewart,nald0;inho,o;ese witherspoFilly;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0;on;dinal wols1son0;! palm2;ey;arack obama,rock;er",
    "Verb": "true¦awak9born,cannot,fr8g7h5k3le2m1s0wors9;e8h3;ake sure,sg;ngth6ss6;eep tabs,n0;own;as0e2;!t2;iv1onna;ight0;en",
    "PhrasalVerb": "true¦0:7L;1:79;2:7X;3:7N;4:72;5:80;6:7P;7:78;8:6V;9:7J;A:6W;B:5Z;C:7S;D:7Q;a81b6Lc5Rd5Me5Lf4Kg41h3Kiron0j3Gk3Bl2Vm2Jn2Ho2Fp1Wquiet7Ar1Js0CtSuQvacuum 1wHyammer9zE;eroBip FonE;e0k0;by,up;aLeHhGiForErit5G;d 1k33;mp0n2Vpe0r8s8;eel 7Qip 85;aFiEn2J;gh 09rd0;n 7Nr E;d2in,o5J;it 61k8lk6rm 6Csh 7Nt6Qv51;rge9sE;e AherB;aTeRhPiLoJrGuEype 69;ckBrn E;d2in,o3Sup;aFiEot0y 2I;ckle6Rp 7T;ck6Qde Y;ne6Pp Es4O;d2o73up;ck GdFe Egh6Bme0p o0Gre0;aw3ba4d2in,up;e 61y 1;by,oD;ink Erow 6D;ba4ov7up;aEe 5Zll53;m 1r X;ck9ke Flk E;ov7u54;aEba4d2in,o3Cup;ba4ft7p59w3;a0Jc0Ie0Ch08i05l01m00nZoYpTquare StKuIwE;earGiE;ngFtch E;aw3ba4o77; by;ck Eit 1m 1ss0;in,up;aJe0WiIoGrEuc3G;aigh1WiE;ke 6Gn3A;p Erm1Z;by,in,oD;n3Br 1tc3T;c3Amp0nd Er6Zve6y 1;ba4d2up;d2oDup;ar37eHiGlFrEur9;ing9uc8;a3Fit 5B;l13n 1;e5Sll0;be2Wrt0;ap 4Sow 6C;ash 5Foke0;eep FiEow A;c3Wp 1;in,oE;ff,v7;gn 4XngFt Ez8;d2o5up; al54le0;aGoEu4T;ot Eut0w 6D;aw3ba4f3GoD;c2PdeBk58ve6;e Ill1And HtE; Etl4H;d2in,o5upE;!on;aw3ba4d2in,o27up;o5Mto;al51out0rap51;il6v8;aPeMiLoHuE;b 4Ule0n Estl8;aEba4d2in5Jo3Ut39u3S;c26w3;ll Got FuE;g2Tnd6;a27f30o5;arCin,o5;ng 53p6;aEel6inBnt0;c5Dd E;o31u0I;c24t0;aSeRiPlNoLrIsyc2HuE;ll Gt E;aEba4d2in,o1Ot3Gup;p3Lw3;ap3Kd2in,o5t3Eup;attle9ess FiHoE;p 1;ah1Oon;iEp 5Hr3Yur4Jwer 5H;nt0;ay4DuE;gBmp A;ck Eg0le9n Ap4A;o2Yup;el 4KncilB;c42ir 3Un0ss GtFy E;ba4oD; d2c24;aw3ba4o18;pEw3X;e3Wt 4U;arrow46erd0oE;d6te45;aMeJiIoGuE;ddl8lE;l 3I;c1Dp 1uth6ve E;al3Nd2in,o5up;ss0x 1;asur8lFss E;a1Gup;t A;ke Fn ArEs1Px0;k Ary6;do,o48up;aRePiKoEuck0;aIc3Hg HoEse0;k Ese3F;aft7ba4d2forw2Jin46ov7uE;nd7p;in,o0M;d A;e HghtGnFsEv1V;ten 4M;e 1k 1; 1e37;arCd2;av1Jt 37velE; o3U;c8p 1sh Etch9ugh6y20;in3Uo5;eFick6nock E;d2o3Q;eEyB;l 2Pp E;aw3ba4d2fTin,o07to,up;aGoFuE;ic8mpB;ke31t35;c3Azz 1;aQeLiIoFuE;nker32rry 1s0W;lEneBrse2X;d Ee 1;ba4d2fast,o01up;de Ft E;ba4on,up;aw3o5;aElp0;d Gl 2Ar Et 1;fEof;rom;in,oTu1H;c02m 1nFve Ez25;it,to;d Eg 2FkerG;d2in,o5;aTeMive Kloss 22oGrFunE; f0N;in3How 2B; Eof 21;aFb1Dit,oErCt0Pu18;ff,n,v7;bo5ft7hKw3;aw3ba4d2in,oEup,w3;ff,n,ut;aJek0t E;aFb17d2oErCup;ff,n,ut,v7;cFhEl1XrCt,w3;ead;ross;r 1;d aFnE;g 1;bo5;a08e01iSlOoKrGuE;cEel 1;k 1;eFighten Eown9y 1;aw3oD;eEshe1N; 1z8;lGol E;aEwi1G;bo5rC;d Alow 1;aFeEip0;sh0;g Ake0mErE;e 2R;gLlJnHrFsEzzle0;h 2P;e Em 1;aw3ba4up;d0isE;h 1;e El 19;aw3fJ;ht ba4ure0;eJnFsE;s 1;cGd E;fEoD;or;e 1X;dVl 1;cIll Erm0t0W;ap04bGd2in,oFtE;hrough;ff,ut,v7;a4ehi20;e 0L;at0dge0nd 0Ky8;oHrE;aFess Aop E;aw3bUin,o1E;g9w9; 0Dubl8;aXhUlean AoHrEut 10;ack9eep Eoss 1I;by,d2oEup;n,ut;me HoFuntE; o1Q;k 1l E;d2oD;aKbJforHin,oGtFuE;nd7;ogeth7;ut,v7;th,wE;ard;a4y;pErCw3;art;eEipB;ck 11er E;on,up;lKncel0rHsGtch FveB; in;o19up;h 0Wt6;ry FvE;e Y;aw3o15;l Em05;aEba4d2o13up;rCw3;a0Ke0Bl04oVrJuE;bblGcklWil02lk AndlWrn 08st FtEy 13zz6;t 0N;in,o5up;e E;ov7;anOeaMiFush E;oDup;ghIng E;aFba4d2forEin,o5up;th;bo5lErCw3;ong;teE;n 1;k E;d2in,o5up;ch0;arLgKil An8oHssGttlFunce Ex 07;aw3ba4;e A; arC;k 03t 1;e 1;d2up; d2;d 1;aJeed0oEurt0;cGw E;aw3ba4d2o5up;ck;k E;in,oL;ck0nk0st6; oKaHef 1nd E;d2ov7up;er;up;r0t E;d2in,oEup;ff,ut;ff,nE;to;ck Kil0nGrgFsE;h H;ain9e G;g Fk9; on;in,o5; o5;aw3d2o5up;ay;cNdJsk Guction6; oD;ff;arCo5;ouE;nd;d E;d2oEup;ff,n;own;t E;o5up;ut",
    "Modal": "true¦c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to,a;ay,ight,ust;an,o0;uld",
    "Adjective": "true¦0:7P;1:84;2:83;3:8A;4:7W;5:5S;6:58;7:4O;8:4N;9:81;A:6I;a6Wb6Gc63d5Je54f4Hg49h3Wi39j37k36l2Vm2Ln2Bo1Wp1Dquack,r12s0Ft07uMvJwByear5;arp0eFholeEiDoB;man5oBu6P;d6Rzy;despr7Ls5S;!sa7;eClBste2A;co1Nl o4W;!k5;aCiBola4M;b89ce versa,ol5H;ca3gabo6Gnilla;ltUnHpCrb5Msu4tterB;!mo7G; Eb1SpDsBti1M;ca7etBide dKtairs;!ti2;er,i3U;f36to da1;aLbeco75convin29deIeHfair,ivers4knGprecedVrEsCwB;iel3Nritt6A;i1XuB;pervis0spec3Y;eBu5;cognHgul6Tl6T;own;ndi2v64xpect0;cid0rB;!grou5ZsB;iz0tood;b7pp0Dssu6UuthorB;iz0;i26ra;aGeEhDi6AoCrB;i1oubl0us3M;geth6p,rp6Vuc67;ough4Wril33;en60l32mpBrr2X;o6Ati2;boo,lBn;ent0;aWcVeThSiQmug,nobbi3LoOpNqueami3LtFuBymb6H;bDi gener5DpBrpri6D;erBre0N;! dup6b,i2C;du0seq52;anda77eGiFrBunni2y3F;aightCiB;ki2p0; fBfB;or5K;ll,r5S;aBreotyp0;dfa6Cmi2;a55ec2Gir1Hlend6Cot on; call0le,mb6phist1XrBu0Vvi48;d6Ary;gnifica3nB;ce51g7;am2Re6ocki2ut;cBda1em5lfi32ni1Wpa6Jre8;o1Er42;at5Gient28reec5G;cr0me;aJeEiCoB;bu60tt51uQy4;ghtBv4;!-2BfA;ar,bel,condi1du6Dfres5AlEpublic42sCtard0vB;ea26;is4CoB;lu1na3;aQe1Cuc4A;b5TciBllyi2;al,st;aOeLicayu8lac5Ropuli5QrCuB;bl5Jmp0n51;eGiDoB;!b07fu5RmiBp6;ne3si2;mCor,sBva1;ti8;a53e;ci5MmB;a0EiB;er,um;ac20rBti1;fe9ma2XpleBv38;xi2;rBst;allelDtB;-tiBi4;me;!ed;bLffJkIld fashion0nHpGrg1Eth6utFvB;al,erB;!all,niCt,wB;eiBrouB;ght;do0Ter,g2Qsi4B;en,posi1; boa5Og2Oli8;!ay; gua5MbBli8;eat;eDsB;cBer0Eole1;e8u3O;d2Xse;aJeIiHoBua4X;nFrCtB;ab7;thB;!eB;rn;chala3descri58stop;ght5;arby,cessa44ighbor5xt;k0usia1A;aIeGiDoBultip7;bi7derBl0Vnth5ot,st;a1n;nBx0;dblo0RiaBor;tu37;ande3Qdi4NnaBre;ci2;cBgenta,in,j01keshift,le,mmoth,ny,sculi8;ab33ho;aKeFiCoBu15;uti14vi2;mCteraB;l,te;it0;ftEgBth4;al,eCitiB;ma1;nda3K;!-0C;ngu3Zst,tt6;ap1Xind5no0A;agg0uB;niMstifi0veni7;de4gno4Klleg4mQnEpso 20rB;a1rB;eleBita0J;va3; KaJbr0corIdGfluenQiQnFsEtCviB;go0Fti2;a9en3SoxB;ic3B;a8i2Vul0D;a1er,oce3;iCoB;or;re9;deq3Qppr33;fBsitu,vitro;ro3;mFpB;arDerfe9oBrop6;li1rtB;a3ed;ti4;eBi0S;d2Vn3C;aIeFiDoBumdr3I;ne36ok0rrBs08ur5;if2Z;ghfalut1QspB;an2X;aClB;liYpfA;li2;lEnDrB;d04roB;wi2;dy;f,low0;ainfAener2Oiga24lHoGraDuB;ilBng ho;ty;cCtB;efAis;efA;ne,od;ea2Iob4;aTeNinMlKoFrB;a1VeDoz1MustB;raB;ti2;e2Gq10tfA;oDrB; keeps,eBm6tuna1;g03ign;liB;sh;aBue3;g31tte1P;al,i1;dFmCrB;ti7;a7ini8;ne;le; up;bl0i3l27r Cux,voB;ri1uri1;oBreac1E;ff;aLfficie3lKmHnFre9there4veExB;a9cess,pe1QtraCuB;be2Nl0E;!va1E;n,ryday; BcouraEti0O;rou1sui1;erCiB;ne3;gi2;abo23dMe17i1;g6sB;t,ygB;oi2;er;aReJiDoBrea14ue;mina3ne,ubB;le,tfA;dact1Bfficu1OsCvB;er1K;creDeas0gruntl0hone1FordCtB;a3ressM;er5;et; HadpGfFgene1PliDrang0spe1PtCvoB;ut;ail0ermin0;be1Mca1ghB;tfA;ia3;an;facto;i5magBngeroUs0G;ed,i2;ly;ertaMhief,ivil,oDrB;aBowd0u0G;mp0vZz0;loImGnCrrBve0P;e9u1I;cre1fu0LgrDsCtB;empo0Dra0E;ta3;ue3;mer08pleB;te,x;ni4ss4;in;aNeIizarHlFoCrB;and new,isk,okN;gCna fiUttom,urgeoB;is;us;ank,indB;!i2;re;autifAhiDloCnBst,yoD;eUt;v0w;nd;ul;ckCnkru0WrrB;en;!wards; priori,b0Mc0Jd09fra08g04h03lYmWntiquVppSrMsIttracti06utheHvEwB;aCkB;wa0T;ke,re;ant garCerB;age;de;ntU;leep,piDsuDtonB;isB;hi2;ri2;ab,bitEroDtiB;fiB;ci4;ga3;raB;ry;are3etiNrB;oprB;ia1;at0;aJuB;si2;arEcohCeBiIl,oof;rt;olB;ic;mi2;ead;ainDgressiConiB;zi2;ve;st;id; IeGuFvB;aCerB;se;nc0;ed;lt;pt,qB;ua1;hoc,infinitB;um;cuCtu4u1;al;ra1;erLlKoIruHsCuB;nda3;e3oCtra9;ct;lu1rbi2;ng;te;pt;aBve;rd;aze,e;ra3;nt",
    "Comparable": "true¦0:41;1:4I;2:45;3:4B;4:3X;5:2Y;a4Ob44c3Od3De35f2Rg2Fh24i1Vj1Uk1Rl1Jm1Dn17o15p0Vqu0Tr0KsTtMuIvFw7y6za13;ell27ou3;aBe9hi1Yi7r6;o3y;ck0Ode,l6n1ry,se;d,y;a6i4Mt;k,ry;n1Tr6sK;m,y;a7e6ulgar;nge4rda2xi3;g9in,st;g0n6pco3Mse4;like0t6;i1r6;ue;aAen9hi8i7ough,r6;anqu2Oen1ue;dy,g3Sme0ny,r09;ck,n,rs2P;d40se;ll,me,rt,s6wd45;te4;aVcarUeThRiQkin0FlMmKoHpGqua1FtAu7w6;eet,ift;b7dd13per0Gr6;e,re2H;sta2Ft5;aAe9iff,r7u6;pXr1;a6ict,o3;ig3Fn0U;a1ep,rn;le,rk;e22i3Fright0;ci28ft,l7o6re,ur;n,thi3;emn,id;a6el0ooth;ll,rt;e8i6ow,y;ck,g35m6;!y;ek,nd3D;ck,l0mp5;a6iTort,rill,y;dy,ll0Xrp;cu0Rve0Rxy;ce,ed,y;d,fe,int0l1Vv14;aBe9i8o6ude;mantic,o1Isy,u6;gh,nd;ch,pe,tzy;a6d,mo0H;dy,l;gg7ndom,p6re,w;id;ed;ai2i6;ck,et;aEhoDi1QlCoBr8u6;ny,r6;e,p5;egna2ic7o6;fouYud;ey,k0;li04or,te1B;ain,easa2;ny;in4le;dd,f6i0ld,ranQ;fi10;aAe8i7o6;b5isy,rm15sy;ce,mb5;a6w;r,t;ive,rr01;aAe8ild,o7u6;nda19te;ist,o1;a6ek,llX;n,s0ty;d,tuQ;aBeAi9o6ucky;f0Un7o1Du6ve0w17y0T;d,sy;e0g;g1Tke0tt5ve0;an,wd;me,r6te;ge;e7i6;nd;en;ol0ui1P;cy,ll,n6;sBt6;e6ima8;llege2r6;es7media6;te;ti3;ecu6ta2;re;aEeBiAo8u6;ge,m6ng1R;b5id;ll6me0t;ow;gh,l0;a6f04sita2;dy,v6;en0y;nd1Hppy,r6te4;d,sh;aGenFhDiClBoofy,r6;a9e8is0o6ue1E;o6ss;vy;at,en,y;nd,y;ad,ib,ooI;a2d1;a6o6;st0;t5uiY;u1y;aIeeb5iDlat,oAr8u6;ll,n6r14;!ny;aHe6iend0;e,sh;a7r6ul;get4mG;my;erce8n6rm;an6e;ciC;! ;le;ir,ke,n0Fr,st,t,ulA;aAerie,mp9sse7v6xtre0Q;il;nti6;al;ty;r7s6;tern,y;ly,th0;aFeCi9r7u6;ll,mb;u6y;nk;r7vi6;ne;e,ty;a6ep,nD;d6f,r;!ly;mp,pp03rk;aHhDlAo8r7u6;dd0r0te;isp,uel;ar6ld,mmon,ol,st0ward0zy;se;e6ou1;a6vW;n,r;ar8e6il0;ap,e6;sy;mi3;gey,lm8r6;e4i3;ful;!i3;aNiLlIoEr8u6;r0sy;ly;aAi7o6;ad,wn;ef,g7llia2;nt;ht;sh,ve;ld,r7un6;cy;ed,i3;ng;a7o6ue;nd,o1;ck,nd;g,tt6;er;d,ld,w1;dy;bsu9ng8we6;so6;me;ry;rd",
    "TextOrdinal": "true¦bGeDf9hundredHmGnin7qu6s4t0zeroH;enGh1rFwe0;lfFn9;ir0ousandE;d,t4;e0ixt9;cond,ptAvent8xtA;adr9int9;et0th;e6ie8;i2o0;r0urt3;tie5;ft1rst;ight0lev1;e0h,ie2;en1;illion0;th",
    "Cardinal": "true¦bHeEf8hundred,mHnineAone,qu6s4t0zero;en,h2rGw0;e0o;lve,n8;irt9ousandEree;e0ix5;pt1ven4xt1;adr0int0;illion;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illion0;!s",
    "Expression": "true¦a02b01dXeVfuck,gShLlImHnGoDpBshAtsk,u7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la",
    "Adverb": "true¦a08by 06d02eYfShQinPjustOkinda,mMnJoEpCquite,r9s5t2up1very,well,ye0;p,s; to,wards5;h1iny bit,o0wiO;o,t6ward;en,us;eldom,o0uch;!me1rt0; of;hYtimes,w09;a1e0;alT;ndomSthN;ar excellDer0oint blank; Nhaps;f3n0;ce0ly;! 0;ag02moW; courIten;ewKo0; longEt 0;onIwithstanding;aybe,eanwhiAore0;!ovB;! aboU;deed,steV;en0;ce;or2u0;lArther0;!moJ; 0ev3;examp0good,suH;le;n1v0;er; mas0ough;se;e0irect1; 1finite0;ly;ju8trop;far,n0;ow; DbroCd nauseam,gBl6ny3part,s2t 0w4;be6l0mo6wor6;arge,ea5; soon,ide;mo1w0;ay;re;l 1mo0one,ready,so,ways;st;b1t0;hat;ut;ain;ad;lot,posteriori",
    "Determiner": "true¦aBboth,d9e6few,l4mu8neiDown,plenty,s3th2various,wh0;at0ich0;evC;at,e4is,ose;everal,ome;a,e0;!ast,s;a1i6l0very;!se;ch;e0u;!s;!n0;!o0y;th0;er"
  };

  const seq = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        cache = seq.split("").reduce(function (n, o, e) {
    return n[o] = e, n;
  }, {}),
        toAlphaCode = function (n) {
    if (void 0 !== seq[n]) return seq[n];
    let o = 1,
        e = 36,
        t = "";

    for (; n >= e; n -= e, o++, e *= 36);

    for (; o--;) {
      const o = n % 36;
      t = String.fromCharCode((o < 10 ? 48 : 55) + o) + t, n = (n - o) / 36;
    }

    return t;
  },
        fromAlphaCode = function (n) {
    if (void 0 !== cache[n]) return cache[n];
    let o = 0,
        e = 1,
        t = 36,
        r = 1;

    for (; e < n.length; o += t, e++, t *= 36);

    for (let e = n.length - 1; e >= 0; e--, r *= 36) {
      let t = n.charCodeAt(e) - 48;
      t > 10 && (t -= 7), o += t * r;
    }

    return o;
  };

  var encoding = {
    toAlphaCode: toAlphaCode,
    fromAlphaCode: fromAlphaCode
  },
      symbols = function (n) {
    const o = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");

    for (let e = 0; e < n.nodes.length; e++) {
      const t = o.exec(n.nodes[e]);

      if (!t) {
        n.symCount = e;
        break;
      }

      n.syms[encoding.fromAlphaCode(t[1])] = encoding.fromAlphaCode(t[2]);
    }

    n.nodes = n.nodes.slice(n.symCount, n.nodes.length);
  };

  const indexFromRef = function (n, o, e) {
    const t = encoding.fromAlphaCode(o);
    return t < n.symCount ? n.syms[t] : e + t + 1 - n.symCount;
  },
        toArray = function (n) {
    const o = [],
          e = (t, r) => {
      let s = n.nodes[t];
      "!" === s[0] && (o.push(r), s = s.slice(1));
      const c = s.split(/([A-Z0-9,]+)/g);

      for (let s = 0; s < c.length; s += 2) {
        const u = c[s],
              i = c[s + 1];
        if (!u) continue;
        const l = r + u;

        if ("," === i || void 0 === i) {
          o.push(l);
          continue;
        }

        const f = indexFromRef(n, i, t);
        e(f, l);
      }
    };

    return e(0, ""), o;
  },
        unpack$2 = function (n) {
    const o = {
      nodes: n.split(";"),
      syms: [],
      symCount: 0
    };
    return n.match(":") && symbols(o), toArray(o);
  };

  var unpack_1$1 = unpack$2,
      unpack_1$1$1 = function (n) {
    const o = n.split("|").reduce((n, o) => {
      const e = o.split("¦");
      return n[e[0]] = e[1], n;
    }, {}),
          e = {};
    return Object.keys(o).forEach(function (n) {
      const t = unpack_1$1(o[n]);
      "true" === n && (n = !0);

      for (let o = 0; o < t.length; o++) {
        const r = t[o];
        !0 === e.hasOwnProperty(r) ? !1 === Array.isArray(e[r]) ? e[r] = [e[r], n] : e[r].push(n) : e[r] = n;
      }
    }), e;
  };

  var efrtUnpack_min = unpack_1$1$1;

  var misc$1 = {
    // numbers
    '20th century fox': 'Organization',
    // '3m': 'Organization',
    '7 eleven': 'Organization',
    'motel 6': 'Organization',
    g8: 'Organization',
    vh1: 'Organization',
    q1: 'Date',
    q2: 'Date',
    q3: 'Date',
    q4: 'Date',
    her: ['Possessive', 'Pronoun'],
    his: ['Possessive', 'Pronoun'],
    their: ['Possessive', 'Pronoun'],
    themselves: ['Possessive', 'Pronoun'],
    your: ['Possessive', 'Pronoun'],
    our: ['Possessive', 'Pronoun'],
    my: ['Possessive', 'Pronoun'],
    its: ['Possessive', 'Pronoun']
  };

  const lexData = _data;
  const unpack$1 = efrtUnpack_min;
  let misc = misc$1;
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
    let lexicon = Object.assign({}, misc); // start adding words to the lex

    Object.keys(lexData).forEach(tag => {
      let wordsObj = unpack$1(lexData[tag]); // this part sucks

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

  const addIrregulars$1 = function (world) {
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

  var addIrregulars_1 = addIrregulars$1;

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
    // move: 'moves',
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
    vertebra: 'vertebrae' // virus: 'viri',
    // zero: 'zeros',

  };

  // used in verbs().conjugate()
  // but also added to our lexicon
  //use shorter key-names

  const mapping$1 = {
    g: 'Gerund',
    prt: 'Participle',
    perf: 'PerfectTense',
    pst: 'PastTense',
    fut: 'FuturePerfect',
    pres: 'PresentTense',
    pluperf: 'Pluperfect',
    a: 'Actor'
  }; // '_' in conjugations is the infinitive form
  // (order matters, to the lexicon)

  let conjugations = {
    act: {
      a: '_or'
    },
    ache: {
      pst: 'ached',
      g: 'aching'
    },
    age: {
      g: 'ageing',
      pst: 'aged',
      pres: 'ages'
    },
    aim: {
      a: '_er',
      g: '_ing',
      pst: '_ed'
    },
    arise: {
      prt: '_n',
      pst: 'arose'
    },
    babysit: {
      a: '_ter',
      pst: 'babysat'
    },
    ban: {
      a: '',
      g: '_ning',
      pst: '_ned'
    },
    be: {
      a: '',
      g: 'am',
      prt: 'been',
      pst: 'was',
      pres: 'is'
    },
    beat: {
      a: '_er',
      g: '_ing',
      prt: '_en'
    },
    become: {
      prt: '_'
    },
    begin: {
      g: '_ning',
      prt: 'begun',
      pst: 'began'
    },
    being: {
      g: 'are',
      pst: 'were',
      pres: 'are'
    },
    bend: {
      prt: 'bent'
    },
    bet: {
      a: '_ter',
      prt: '_'
    },
    bind: {
      pst: 'bound'
    },
    bite: {
      g: 'biting',
      prt: 'bitten',
      pst: 'bit'
    },
    bleed: {
      pst: 'bled',
      prt: 'bled'
    },
    blow: {
      prt: '_n',
      pst: 'blew'
    },
    boil: {
      a: '_er'
    },
    brake: {
      prt: 'broken'
    },
    break: {
      pst: 'broke'
    },
    breed: {
      pst: 'bred'
    },
    bring: {
      pst: 'brought',
      prt: 'brought'
    },
    broadcast: {
      pst: '_'
    },
    budget: {
      pst: '_ed'
    },
    build: {
      pst: 'built',
      prt: 'built'
    },
    burn: {
      prt: '_ed'
    },
    burst: {
      prt: '_'
    },
    buy: {
      pst: 'bought',
      prt: 'bought'
    },
    can: {
      a: '',
      fut: '_',
      g: '',
      pst: 'could',
      perf: 'could',
      pluperf: 'could',
      pres: '_'
    },
    catch: {
      pst: 'caught'
    },
    choose: {
      g: 'choosing',
      prt: 'chosen',
      pst: 'chose'
    },
    cling: {
      prt: 'clung'
    },
    come: {
      prt: '_',
      pst: 'came',
      g: 'coming'
    },
    compete: {
      a: 'competitor',
      g: 'competing',
      pst: '_d'
    },
    cost: {
      pst: '_'
    },
    creep: {
      prt: 'crept'
    },
    cut: {
      prt: '_'
    },
    deal: {
      pst: '_t',
      prt: '_t'
    },
    develop: {
      a: '_er',
      g: '_ing',
      pst: '_ed'
    },
    die: {
      g: 'dying',
      pst: '_d'
    },
    dig: {
      g: '_ging',
      pst: 'dug',
      prt: 'dug'
    },
    dive: {
      prt: '_d'
    },
    do: {
      pst: 'did',
      pres: '_es'
    },
    draw: {
      prt: '_n',
      pst: 'drew'
    },
    dream: {
      prt: '_t'
    },
    drink: {
      prt: 'drunk',
      pst: 'drank'
    },
    drive: {
      g: 'driving',
      prt: '_n',
      pst: 'drove'
    },
    drop: {
      g: '_ping',
      pst: '_ped'
    },
    eat: {
      a: '_er',
      g: '_ing',
      prt: '_en',
      pst: 'ate'
    },
    edit: {
      pst: '_ed',
      g: '_ing'
    },
    egg: {
      pst: '_ed'
    },
    fall: {
      prt: '_en',
      pst: 'fell'
    },
    feed: {
      prt: 'fed',
      pst: 'fed'
    },
    feel: {
      a: '_er',
      pst: 'felt'
    },
    fight: {
      pst: 'fought',
      prt: 'fought'
    },
    find: {
      pst: 'found'
    },
    flee: {
      g: '_ing',
      prt: 'fled'
    },
    fling: {
      prt: 'flung'
    },
    fly: {
      prt: 'flown',
      pst: 'flew'
    },
    forbid: {
      pst: 'forbade'
    },
    forget: {
      g: '_ing',
      prt: 'forgotten',
      pst: 'forgot'
    },
    forgive: {
      g: 'forgiving',
      prt: '_n',
      pst: 'forgave'
    },
    free: {
      a: '',
      g: '_ing'
    },
    freeze: {
      g: 'freezing',
      prt: 'frozen',
      pst: 'froze'
    },
    get: {
      pst: 'got',
      prt: 'gotten'
    },
    give: {
      g: 'giving',
      prt: '_n',
      pst: 'gave'
    },
    go: {
      prt: '_ne',
      pst: 'went',
      pres: 'goes'
    },
    grow: {
      prt: '_n'
    },
    guide: {
      pst: '_d'
    },
    hang: {
      pst: 'hung',
      prt: 'hung'
    },
    have: {
      g: 'having',
      pst: 'had',
      prt: 'had',
      pres: 'has'
    },
    hear: {
      pst: '_d',
      prt: '_d'
    },
    hide: {
      prt: 'hidden',
      pst: 'hid'
    },
    hit: {
      prt: '_'
    },
    hold: {
      pst: 'held',
      prt: 'held'
    },
    hurt: {
      pst: '_',
      prt: '_'
    },
    ice: {
      g: 'icing',
      pst: '_d'
    },
    imply: {
      pst: 'implied',
      pres: 'implies'
    },
    is: {
      a: '',
      g: 'being',
      pst: 'was',
      pres: '_'
    },
    keep: {
      prt: 'kept'
    },
    kneel: {
      prt: 'knelt'
    },
    know: {
      prt: '_n'
    },
    lay: {
      pst: 'laid',
      prt: 'laid'
    },
    lead: {
      pst: 'led',
      prt: 'led'
    },
    leap: {
      prt: '_t'
    },
    leave: {
      pst: 'left',
      prt: 'left'
    },
    lend: {
      prt: 'lent'
    },
    lie: {
      g: 'lying',
      pst: 'lay'
    },
    light: {
      pst: 'lit',
      prt: 'lit'
    },
    log: {
      g: '_ging',
      pst: '_ged'
    },
    loose: {
      prt: 'lost'
    },
    lose: {
      g: 'losing',
      pst: 'lost'
    },
    make: {
      pst: 'made',
      prt: 'made'
    },
    mean: {
      pst: '_t',
      prt: '_t'
    },
    meet: {
      a: '_er',
      g: '_ing',
      pst: 'met',
      prt: 'met'
    },
    miss: {
      pres: '_'
    },
    name: {
      g: 'naming'
    },
    patrol: {
      g: '_ling',
      pst: '_led'
    },
    pay: {
      pst: 'paid',
      prt: 'paid'
    },
    prove: {
      prt: '_n'
    },
    puke: {
      g: 'puking'
    },
    put: {
      prt: '_'
    },
    quit: {
      prt: '_'
    },
    read: {
      pst: '_',
      prt: '_'
    },
    ride: {
      prt: 'ridden'
    },
    reside: {
      pst: '_d'
    },
    ring: {
      pst: 'rang',
      prt: 'rung'
    },
    rise: {
      fut: 'will have _n',
      g: 'rising',
      prt: '_n',
      pst: 'rose',
      pluperf: 'had _n'
    },
    rub: {
      g: '_bing',
      pst: '_bed'
    },
    run: {
      g: '_ning',
      prt: '_',
      pst: 'ran'
    },
    say: {
      pst: 'said',
      prt: 'said',
      pres: '_s'
    },
    seat: {
      pst: 'sat',
      prt: 'sat'
    },
    see: {
      g: '_ing',
      prt: '_n',
      pst: 'saw'
    },
    seek: {
      prt: 'sought'
    },
    sell: {
      pst: 'sold',
      prt: 'sold'
    },
    send: {
      prt: 'sent'
    },
    set: {
      prt: '_'
    },
    sew: {
      prt: '_n'
    },
    shake: {
      prt: '_n'
    },
    shave: {
      prt: '_d'
    },
    shed: {
      g: '_ding',
      pst: '_',
      pres: '_s'
    },
    shine: {
      pst: 'shone',
      prt: 'shone'
    },
    shoot: {
      pst: 'shot',
      prt: 'shot'
    },
    show: {
      pst: '_ed'
    },
    shut: {
      prt: '_'
    },
    sing: {
      prt: 'sung',
      pst: 'sang'
    },
    sink: {
      pst: 'sank',
      pluperf: 'had sunk'
    },
    sit: {
      pst: 'sat'
    },
    ski: {
      pst: '_ied'
    },
    slay: {
      prt: 'slain'
    },
    sleep: {
      prt: 'slept'
    },
    slide: {
      pst: 'slid',
      prt: 'slid'
    },
    smash: {
      pres: '_es'
    },
    sneak: {
      prt: 'snuck'
    },
    speak: {
      fut: 'will have spoken',
      prt: 'spoken',
      pst: 'spoke',
      perf: 'have spoken',
      pluperf: 'had spoken'
    },
    speed: {
      prt: 'sped'
    },
    spend: {
      prt: 'spent'
    },
    spill: {
      prt: '_ed',
      pst: 'spilt'
    },
    spin: {
      g: '_ning',
      pst: 'spun',
      prt: 'spun'
    },
    spit: {
      prt: 'spat'
    },
    split: {
      prt: '_'
    },
    spread: {
      pst: '_'
    },
    spring: {
      prt: 'sprung'
    },
    stand: {
      pst: 'stood'
    },
    steal: {
      a: '_er',
      pst: 'stole'
    },
    stick: {
      pst: 'stuck'
    },
    sting: {
      pst: 'stung'
    },
    stink: {
      pst: 'stunk',
      prt: 'stunk'
    },
    stream: {
      a: '_er'
    },
    strew: {
      prt: '_n'
    },
    strike: {
      g: 'striking',
      pst: 'struck'
    },
    suit: {
      a: '_er',
      g: '_ing',
      pst: '_ed'
    },
    sware: {
      prt: 'sworn'
    },
    swear: {
      pst: 'swore'
    },
    sweep: {
      prt: 'swept'
    },
    swim: {
      g: '_ming',
      pst: 'swam'
    },
    swing: {
      pst: 'swung'
    },
    take: {
      fut: 'will have _n',
      pst: 'took',
      perf: 'have _n',
      pluperf: 'had _n'
    },
    teach: {
      pst: 'taught',
      pres: '_es'
    },
    tear: {
      pst: 'tore'
    },
    tell: {
      pst: 'told'
    },
    think: {
      pst: 'thought'
    },
    thrive: {
      prt: '_d'
    },
    tie: {
      g: 'tying',
      pst: '_d'
    },
    undergo: {
      prt: '_ne'
    },
    understand: {
      pst: 'understood'
    },
    upset: {
      prt: '_'
    },
    wait: {
      a: '_er',
      g: '_ing',
      pst: '_ed'
    },
    wake: {
      pst: 'woke'
    },
    wear: {
      pst: 'wore'
    },
    weave: {
      prt: 'woven'
    },
    wed: {
      pst: 'wed'
    },
    weep: {
      prt: 'wept'
    },
    win: {
      g: '_ning',
      pst: 'won'
    },
    wind: {
      prt: 'wound'
    },
    withdraw: {
      pst: 'withdrew'
    },
    wring: {
      prt: 'wrung'
    },
    write: {
      g: 'writing',
      prt: 'written',
      pst: 'wrote'
    }
  }; //uncompress our ad-hoc compression scheme

  let keys = Object.keys(conjugations);

  for (let i = 0; i < keys.length; i++) {
    const inf = keys[i];
    let final = {};
    Object.keys(conjugations[inf]).forEach(key => {
      let str = conjugations[inf][key]; //swap-in infinitives for '_'

      str = str.replace('_', inf);
      let full = mapping$1[key];
      final[full] = str;
    }); //over-write original

    conjugations[inf] = final;
  }

  var conjugations_1 = conjugations;

  const endsWith$2 = {
    b: [{
      reg: /([^aeiou][aeiou])b$/i,
      repl: {
        pr: '$1bs',
        pa: '$1bbed',
        gr: '$1bbing'
      }
    }],
    d: [{
      reg: /(end)$/i,
      repl: {
        pr: '$1s',
        pa: 'ent',
        gr: '$1ing',
        ar: '$1er'
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
      reg: /(ed)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ded',
        ar: '$1der',
        gr: '$1ding'
      }
    }, {
      reg: /([^aeiou][ou])d$/i,
      repl: {
        pr: '$1ds',
        pa: '$1dded',
        gr: '$1dding'
      }
    }],
    e: [{
      reg: /(eave)$/i,
      repl: {
        pr: '$1s',
        pa: '$1d',
        gr: 'eaving',
        ar: '$1r'
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
      //shake
      reg: /(t|sh?)(ake)$/i,
      repl: {
        pr: '$1$2s',
        pa: '$1ook',
        gr: '$1aking',
        ar: '$1$2r'
      }
    }, {
      //awake
      reg: /w(ake)$/i,
      repl: {
        pr: 'w$1s',
        pa: 'woke',
        gr: 'waking',
        ar: 'w$1r'
      }
    }, {
      //make
      reg: /m(ake)$/i,
      repl: {
        pr: 'm$1s',
        pa: 'made',
        gr: 'making',
        ar: 'm$1r'
      }
    }, {
      reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing' // prt: '$1en',

      }
    }, {
      reg: /([bd]l)e$/i,
      repl: {
        pr: '$1es',
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
    }],
    g: [{
      reg: /([^aeiou][aou])g$/i,
      repl: {
        pr: '$1gs',
        pa: '$1gged',
        gr: '$1gging'
      }
    }],
    h: [{
      reg: /(..)([cs]h)$/i,
      repl: {
        pr: '$1$2es',
        pa: '$1$2ed',
        gr: '$1$2ing'
      }
    }],
    k: [{
      reg: /(ink)$/i,
      repl: {
        pr: '$1s',
        pa: 'unk',
        gr: '$1ing',
        ar: '$1er'
      }
    }],
    m: [{
      reg: /([^aeiou][aeiou])m$/i,
      repl: {
        pr: '$1ms',
        pa: '$1mmed',
        gr: '$1mming'
      }
    }],
    n: [{
      reg: /(en)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing'
      }
    }],
    p: [{
      reg: /(e)(ep)$/i,
      repl: {
        pr: '$1$2s',
        pa: '$1pt',
        gr: '$1$2ing',
        ar: '$1$2er'
      }
    }, {
      reg: /([^aeiou][aeiou])p$/i,
      repl: {
        pr: '$1ps',
        pa: '$1pped',
        gr: '$1pping'
      }
    }, {
      reg: /([aeiu])p$/i,
      repl: {
        pr: '$1ps',
        pa: '$1p',
        gr: '$1pping'
      }
    }],
    r: [{
      reg: /([td]er)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing'
      }
    }, {
      reg: /(er)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing'
      }
    }],
    s: [{
      reg: /(ish|tch|ess)$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing'
      }
    }],
    t: [{
      reg: /(ion|end|e[nc]t)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing'
      }
    }, {
      reg: /(.eat)$/i,
      repl: {
        pr: '$1s',
        pa: '$1ed',
        gr: '$1ing'
      }
    }, {
      reg: /([aeiu])t$/i,
      repl: {
        pr: '$1ts',
        pa: '$1t',
        gr: '$1tting'
      }
    }, {
      reg: /([^aeiou][aeiou])t$/i,
      repl: {
        pr: '$1ts',
        pa: '$1tted',
        gr: '$1tting'
      }
    }],
    w: [{
      reg: /(.llow)$/i,
      //follow, allow
      repl: {
        pr: '$1s',
        pa: '$1ed'
      }
    }, {
      reg: /(..)(ow)$/i,
      //grow
      repl: {
        pr: '$1$2s',
        pa: '$1ew',
        gr: '$1$2ing',
        prt: '$1$2n'
      }
    }],
    y: [{
      reg: /(i|f|rr)y$/i,
      repl: {
        pr: '$1ies',
        pa: '$1ied',
        gr: '$1ying'
      }
    }],
    z: [{
      reg: /([aeiou]zz)$/i,
      repl: {
        pr: '$1es',
        pa: '$1ed',
        gr: '$1ing'
      }
    }]
  };
  var suffixes$2 = endsWith$2;

  const suffixes$1 = suffixes$2;
  const posMap = {
    pr: 'PresentTense',
    pa: 'PastTense',
    gr: 'Gerund',
    prt: 'Participle',
    ar: 'Actor'
  };

  const doTransform = function (str, obj) {
    let found = {};
    let keys = Object.keys(obj.repl);

    for (let i = 0; i < keys.length; i += 1) {
      let pos = keys[i];
      found[posMap[pos]] = str.replace(obj.reg, obj.repl[pos]);
    }

    return found;
  }; //look at the end of the word for clues


  const checkSuffix$1 = function (str = '') {
    let c = str[str.length - 1];

    if (suffixes$1.hasOwnProperty(c) === true) {
      for (let r = 0; r < suffixes$1[c].length; r += 1) {
        const reg = suffixes$1[c][r].reg;

        if (reg.test(str) === true) {
          return doTransform(str, suffixes$1[c][r]);
        }
      }
    }

    return {};
  };

  var _01Suffixes = checkSuffix$1;

  const hasY = /[bcdfghjklmnpqrstvwxz]y$/;
  const generic = {
    Gerund: inf => {
      if (inf.charAt(inf.length - 1) === 'e') {
        return inf.replace(/e$/, 'ing');
      }

      return inf + 'ing';
    },
    PresentTense: inf => {
      if (inf.charAt(inf.length - 1) === 's') {
        return inf + 'es';
      }

      if (hasY.test(inf) === true) {
        return inf.slice(0, -1) + 'ies';
      }

      return inf + 's';
    },
    PastTense: inf => {
      if (inf.charAt(inf.length - 1) === 'e') {
        return inf + 'd';
      }

      if (inf.substr(-2) === 'ed') {
        return inf;
      }

      if (hasY.test(inf) === true) {
        return inf.slice(0, -1) + 'ied';
      }

      return inf + 'ed';
    }
  };
  var _02Generic = generic;

  const checkSuffix = _01Suffixes;
  const genericFill = _02Generic; //we run this on every verb in the lexicon, so please keep it fast
  //we assume the input word is a proper infinitive

  const conjugate$4 = function (inf = '', world) {
    let found = {}; // 1. look at irregulars
    //the lexicon doesn't pass this in

    if (world && world.irregulars) {
      if (world.irregulars.verbs.hasOwnProperty(inf) === true) {
        found = Object.assign({}, world.irregulars.verbs[inf]);
      }
    } //2. rule-based regex


    found = Object.assign({}, checkSuffix(inf), found); //3. generic transformations
    //'buzzing'

    if (found.Gerund === undefined) {
      found.Gerund = genericFill.Gerund(inf);
    } //'buzzed'


    if (found.PastTense === undefined) {
      found.PastTense = genericFill.PastTense(inf);
    } //'buzzes'


    if (found.PresentTense === undefined) {
      found.PresentTense = genericFill.PresentTense(inf);
    }

    return found;
  };

  var conjugate_1$1 = conjugate$4; // console.log(conjugate('bake'))

  const do_rules$1 = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
  const dont_rules$1 = [/ary$/];
  const irregulars$5 = {
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
    large: 'largest'
  };
  const transforms$2 = [{
    reg: /y$/i,
    repl: 'iest'
  }, {
    reg: /([aeiou])t$/i,
    repl: '$1ttest'
  }, {
    reg: /([aeou])de$/i,
    repl: '$1dest'
  }, {
    reg: /nge$/i,
    repl: 'ngest'
  }, {
    reg: /([aeiou])te$/i,
    repl: '$1test'
  }];

  const to_superlative = function (str) {
    //irregulars
    if (irregulars$5.hasOwnProperty(str)) {
      return irregulars$5[str];
    } //known transforms


    for (let i = 0; i < transforms$2.length; i++) {
      if (transforms$2[i].reg.test(str)) {
        return str.replace(transforms$2[i].reg, transforms$2[i].repl);
      }
    } //dont-rules


    for (let i = 0; i < dont_rules$1.length; i++) {
      if (dont_rules$1[i].test(str) === true) {
        return null;
      }
    } //do-rules


    for (let i = 0; i < do_rules$1.length; i++) {
      if (do_rules$1[i].test(str) === true) {
        if (str.charAt(str.length - 1) === 'e') {
          return str + 'st';
        }

        return str + 'est';
      }
    }

    return str + 'est';
  };

  var toSuperlative = to_superlative;

  const do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];
  const dont_rules = [/ary$/, /ous$/];
  const irregulars$4 = {
    grey: 'greyer',
    gray: 'grayer',
    green: 'greener',
    yellow: 'yellower',
    red: 'redder',
    good: 'better',
    well: 'better',
    bad: 'worse',
    sad: 'sadder',
    big: 'bigger'
  };
  const transforms$1 = [{
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

  const to_comparative = function (str) {
    //known-irregulars
    if (irregulars$4.hasOwnProperty(str)) {
      return irregulars$4[str];
    } //known-transforms


    for (let i = 0; i < transforms$1.length; i++) {
      if (transforms$1[i].reg.test(str) === true) {
        return str.replace(transforms$1[i].reg, transforms$1[i].repl);
      }
    } //dont-patterns


    for (let i = 0; i < dont_rules.length; i++) {
      if (dont_rules[i].test(str) === true) {
        return null;
      }
    } //do-patterns


    for (let i = 0; i < do_rules.length; i++) {
      if (do_rules[i].test(str) === true) {
        return str + 'er';
      }
    } //easy-one


    if (/e$/.test(str) === true) {
      return str + 'r';
    }

    return str + 'er';
  };

  var toComparative = to_comparative;

  const fns = {
    toSuperlative: toSuperlative,
    toComparative: toComparative
  };
  /** conjugate an adjective into other forms */

  const conjugate$3 = function (w) {
    let res = {}; // 'greatest'

    let sup = fns.toSuperlative(w);

    if (sup) {
      res.Superlative = sup;
    } // 'greater'


    let comp = fns.toComparative(w);

    if (comp) {
      res.Comparative = comp;
    }

    return res;
  };

  var adjectives$2 = conjugate$3;

  /** patterns for turning 'bus' to 'buses'*/
  const suffixes = {
    a: [[/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/([ti])a$/i, '$1a']],
    e: [[/(kn|l|w)ife$/i, '$1ives'], [/(hive)$/i, '$1s'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice']],
    f: [[/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves']],
    i: [[/(octop|vir)i$/i, '$1i']],
    m: [[/([ti])um$/i, '$1a']],
    n: [[/^(oxen)$/i, '$1']],
    o: [[/(al|ad|at|er|et|ed|ad)o$/i, '$1oes']],
    s: [[/(ax|test)is$/i, '$1es'], [/(alias|status)$/i, '$1es'], [/sis$/i, 'ses'], [/(bu)s$/i, '$1ses'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i']],
    x: [[/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/^(ox)$/i, '$1en']],
    y: [[/([^aeiouy]|qu)y$/i, '$1ies']],
    z: [[/(quiz)$/i, '$1zes']]
  };
  var _rules$2 = suffixes;

  const rules$5 = _rules$2;
  const addE = /(x|ch|sh|s|z)$/;

  const trySuffix = function (str) {
    let c = str[str.length - 1];

    if (rules$5.hasOwnProperty(c) === true) {
      for (let i = 0; i < rules$5[c].length; i += 1) {
        let reg = rules$5[c][i][0];

        if (reg.test(str) === true) {
          return str.replace(reg, rules$5[c][i][1]);
        }
      }
    }

    return null;
  };
  /** Turn a singular noun into a plural
   * assume the given string is singular
   */


  const pluralize = function (str = '', world) {
    let irregulars = world.irregulars.nouns; // check irregulars list

    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str];
    } //we have some rules to try-out


    let plural = trySuffix(str);

    if (plural !== null) {
      return plural;
    } //like 'church'


    if (addE.test(str)) {
      return str + 'es';
    } // ¯\_(ツ)_/¯


    return str + 's';
  };

  var toPlural = pluralize;

  var _rules$1 = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], // [/(analy|diagno|parenthe|progno|synop|the)ses$/i, '$1sis'],
  [/(eas)es$/i, '$1e'], //diseases
  [/(..[aeiou]s)es$/i, '$1'], //geniouses
  [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']];

  const rules$4 = _rules$1;

  const invertObj = function (obj) {
    return Object.keys(obj).reduce((h, k) => {
      h[obj[k]] = k;
      return h;
    }, {});
  };

  const toSingular = function (str, world) {
    let irregulars = world.irregulars.nouns;
    let invert = invertObj(irregulars); //(not very efficient)
    // check irregulars list

    if (invert.hasOwnProperty(str)) {
      return invert[str];
    } // go through our regexes


    for (let i = 0; i < rules$4.length; i++) {
      if (rules$4[i][0].test(str) === true) {
        str = str.replace(rules$4[i][0], rules$4[i][1]);
        return str;
      }
    }

    return str;
  };

  var toSingular_1 = toSingular;

  let rules$3 = {
    Participle: [{
      reg: /own$/i,
      to: 'ow'
    }, {
      reg: /(.)un([g|k])$/i,
      to: '$1in$2'
    }],
    Actor: [{
      reg: /(er)er$/i,
      to: '$1'
    }],
    PresentTense: [{
      reg: /(..)(ies)$/i,
      to: '$1y'
    }, {
      reg: /(tch|sh)es$/i,
      to: '$1'
    }, {
      reg: /(ss|zz)es$/i,
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
    Gerund: [{
      //popping -> pop
      reg: /(..)(p|d|t|g){2}ing$/i,
      to: '$1$2'
    }, {
      //fuzzing -> fuzz
      reg: /(ll|ss|zz)ing$/i,
      to: '$1'
    }, {
      reg: /([^aeiou])ying$/i,
      to: '$1y'
    }, {
      reg: /([^ae]i.)ing$/i,
      to: '$1e'
    }, {
      //eating, reading
      reg: /(ea[dklnrtv])ing$/i,
      to: '$1'
    }, {
      //washing -> wash
      reg: /(ch|sh)ing$/i,
      to: '$1'
    }, //soft-e forms:
    {
      //z : hazing (not buzzing)
      reg: /(z)ing$/i,
      to: '$1e'
    }, {
      //a : baking, undulating
      reg: /(a[gdkvtc])ing$/i,
      to: '$1e'
    }, {
      //u : conjuring, tubing
      reg: /(u[rtcbn])ing$/i,
      to: '$1e'
    }, {
      //o : forboding, poking, hoping, boring (not hooping)
      reg: /([^o]o[bdknprv])ing$/i,
      to: '$1e'
    }, {
      //ling : tingling, wrinkling, circling, scrambling, bustling
      reg: /([tbckg]l)ing$/i,
      //dp
      to: '$1e'
    }, {
      //cing : bouncing, denouncing
      reg: /(c|s)ing$/i,
      //dp
      to: '$1e'
    }, // {
    //   //soft-e :
    //   reg: /([ua]s|[dr]g|z|o[rlsp]|cre)ing$/i,
    //   to: '$1e',
    // },
    {
      //fallback
      reg: /(..)ing$/i,
      to: '$1'
    }],
    PastTense: [{
      reg: /(ued)$/i,
      to: 'ue'
    }, {
      reg: /ea(rn|l|m)ed$/i,
      //ea - earned, healed, sreamed
      to: 'ea$1'
    }, {
      reg: /a([^aeiouy])ed$/i,
      to: 'a$1e'
    }, {
      reg: /([aeiou]zz)ed$/i,
      to: '$1'
    }, {
      reg: /(e|i)lled$/i,
      to: '$1ll'
    }, {
      reg: /(.)(sh|ch)ed$/i,
      to: '$1$2'
    }, {
      reg: /(tl|gl)ed$/i,
      to: '$1e'
    }, {
      reg: /(um?pt?)ed$/i,
      to: '$1'
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
      reg: /(..)gged$/i,
      to: '$1g'
    }, {
      reg: /(..)lked$/i,
      to: '$1lk'
    }, {
      reg: /([^aeiouy][aeiou])ked$/i,
      to: '$1ke'
    }, {
      reg: /(.[aeiou])led$/i,
      to: '$1l'
    }, {
      reg: /(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      to: '$1$2'
    }, {
      reg: /(.ut)ed$/i,
      to: '$1e'
    }, {
      reg: /(.pt)ed$/i,
      to: '$1'
    }, {
      reg: /(us)ed$/i,
      to: '$1e'
    }, {
      reg: /(dd)ed$/i,
      to: '$1'
    }, {
      reg: /(..[^aeiouy])ed$/i,
      to: '$1e'
    }, {
      reg: /(..)ied$/i,
      to: '$1y'
    }, {
      reg: /(.o)ed$/i,
      to: '$1o'
    }, {
      reg: /(..i)ed$/i,
      to: '$1'
    }, {
      reg: /(.a[^aeiou])ed$/i,
      to: '$1'
    }, {
      //owed, aced
      reg: /([aeiou][^aeiou])ed$/i,
      to: '$1e'
    }, {
      reg: /([rl])ew$/i,
      to: '$1ow'
    }, {
      reg: /([pl])t$/i,
      to: '$1t'
    }]
  };
  var _transform = rules$3;

  let guessVerb = {
    Gerund: ['ing'],
    Actor: ['erer'],
    Infinitive: ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'ent', 'eed', 'er', 'le', 'own', 'unk', 'ung', 'en'],
    PastTense: ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
    PresentTense: ['rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns']
  }; //flip it into a lookup object

  guessVerb = Object.keys(guessVerb).reduce((h, k) => {
    guessVerb[k].forEach(a => h[a] = k);
    return h;
  }, {});
  var _guess = guessVerb;

  const rules$2 = _transform;
  const guess = _guess;
  /** it helps to know what we're conjugating from */

  const guessTense = function (str) {
    let three = str.substr(str.length - 3);

    if (guess.hasOwnProperty(three) === true) {
      return guess[three];
    }

    let two = str.substr(str.length - 2);

    if (guess.hasOwnProperty(two) === true) {
      return guess[two];
    }

    let one = str.substr(str.length - 1);

    if (one === 's') {
      return 'PresentTense';
    }

    return null;
  };

  const toInfinitive$3 = function (str, world, tense) {
    if (!str) {
      return '';
    } //1. look at known irregulars


    if (world.words.hasOwnProperty(str) === true) {
      let irregs = world.irregulars.verbs;
      let keys = Object.keys(irregs);

      for (let i = 0; i < keys.length; i++) {
        let forms = Object.keys(irregs[keys[i]]);

        for (let o = 0; o < forms.length; o++) {
          if (str === irregs[keys[i]][forms[o]]) {
            return keys[i];
          }
        }
      }
    } // give'r!


    tense = tense || guessTense(str);

    if (tense && rules$2[tense]) {
      for (let i = 0; i < rules$2[tense].length; i++) {
        const rule = rules$2[tense][i];

        if (rule.reg.test(str) === true) {
          // console.log(rule.reg)
          return str.replace(rule.reg, rule.to);
        }
      }
    }

    return str;
  };

  var toInfinitive_1$1 = toInfinitive$3;

  const defaultTags = tags;
  const unpack = unpack_1;
  const addIrregulars = addIrregulars_1;
  const inferTagSet = inference; //these let users change inflection / verb conjugation

  const irregulars$3 = {
    nouns: plurals,
    verbs: conjugations_1
  }; //these behaviours are configurable & shared across some plugins

  const transforms = {
    conjugate: conjugate_1$1,
    adjectives: adjectives$2,
    toPlural: toPlural,
    toSingular: toSingular_1,
    toInfinitive: toInfinitive_1$1
  };
  let isVerbose = false;
  /** all configurable linguistic data */

  class World$1 {
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
        value: irregulars$3,
        writable: true
      });
      Object.defineProperty(this, 'tags', {
        enumerable: false,
        value: Object.assign({}, defaultTags),
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

      this.words = unpack.buildOut(this); // add our irregulars to lexicon

      addIrregulars(this);
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
      unpack.addWords(cleaned, this.words, this);
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

      this.tags = inferTagSet(this.tags);
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


  World$1.prototype.clone = function () {
    let w2 = new World$1(); // these are simple to copy:

    w2.words = Object.assign({}, this.words);
    w2.hasCompound = Object.assign({}, this.hasCompound); //these ones are nested:

    w2.irregulars = clone(this.irregulars);
    w2.tags = clone(this.tags); // these are functions

    w2.transforms = this.transforms;
    w2.taggers = this.taggers;
    return w2;
  };

  var World_1 = World$1;

  var _01Utils = {};

  /** return the root, first document */

  (function (exports) {
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
  })(_01Utils);

  var _02Accessors = {};

  /** use only the first result(s) */

  (function (exports) {
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
  })(_02Accessors);

  var _03Match = {};

  const cacheRequired$1 = function (reg) {
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
      } = cacheRequired$1(regs); //check required words

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

  (function (exports) {
    const parseSyntax = matchSyntax;
    const checkCache = _failFast;
    /** return a new Doc, with this one as a parent */

    exports.match = function (reg, opts = {}) {
      // support '0' shorthand for named-groups
      if (typeof opts === 'string' || typeof opts === 'number' || opts === null) {
        opts = {
          group: opts
        };
      } //parse-up the input expression


      let regs = parseSyntax(reg, opts);

      if (regs.length === 0) {
        return this.buildFrom([]);
      } //check our cache, if it exists


      if (checkCache(this, regs) === false) {
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
      let regs = parseSyntax(reg, opts); //if it's empty, return them all!

      if (regs.length === 0 || checkCache(this, regs) === false) {
        return this;
      } //try expression on each phrase


      let matches = this.list.reduce((arr, p) => {
        return arr.concat(p.not(regs));
      }, []);
      return this.buildFrom(matches);
    };
    /** return only the first match */


    exports.matchOne = function (reg, opts = {}) {
      let regs = parseSyntax(reg, opts); //check our cache, if it exists

      if (checkCache(this, regs) === false) {
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
      let regs = parseSyntax(reg, opts); //consult our cache, if it exists

      if (checkCache(this, regs) === false) {
        return this.buildFrom([]);
      }

      let found = this.list.filter(p => p.has(regs) === true);
      return this.buildFrom(found);
    };
    /** Filter-out any current phrases that have this match*/


    exports.ifNo = function (reg, opts = {}) {
      let regs = parseSyntax(reg, opts);
      let found = this.list.filter(p => p.has(regs) === false);
      return this.buildFrom(found);
    };
    /**Return a boolean if this match exists */


    exports.has = function (reg, opts = {}) {
      let regs = parseSyntax(reg, opts); //consult our cache, if it exists

      if (checkCache(this, regs) === false) {
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

      let regs = parseSyntax(reg, opts);
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

      let regs = parseSyntax(reg, opts);
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
      let regs = parseSyntax(reg, opts); //only the phrases we care about

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
      let regs = parseSyntax(reg, opts); //only the phrases we care about

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
  })(_03Match);

  var _04Tag = {};

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

  const setTag = _setTag;
  /** Give all terms the given tag */

  _04Tag.tag = function (tags, why) {
    if (!tags) {
      return this;
    }

    setTag(tags, this, false, why);
    return this;
  };
  /** Only apply tag to terms if it is consistent with current tags */


  _04Tag.tagSafe = function (tags, why) {
    if (!tags) {
      return this;
    }

    setTag(tags, this, true, why);
    return this;
  };
  /** Remove this term from the given terms */


  _04Tag.unTag = function (tags, why) {
    this.list.forEach(p => {
      p.terms().forEach(t => t.unTag(tags, why, this.world));
    });
    return this;
  };
  /** return only the terms that can be this tag*/


  _04Tag.canBe = function (tag) {
    if (!tag) {
      return this;
    }

    let world = this.world;
    let matches = this.list.reduce((arr, p) => {
      return arr.concat(p.canBe(tag, world));
    }, []);
    return this.buildFrom(matches);
  };

  var _05Loops = {};

  /* run each phrase through a function, and create a new document */

  _05Loops.map = function (fn) {
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


  _05Loops.forEach = function (fn, detachParent) {
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


  _05Loops.filter = function (fn) {
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


  _05Loops.find = function (fn) {
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


  _05Loops.some = function (fn) {
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


  _05Loops.random = function (n) {
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

  var _06Lookup = {};

  const tokenize$4 = function (str) {
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
      let arr = tokenize$4(str).map(s => s.trim());
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

  (function (exports) {
    const lookup = _lookup; // compare one term and one match
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

      let found = lookup(arr, values, this);
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
  })(_06Lookup);

  var _07Cache = {};

  /** freeze the current state of the document, for speed-purposes*/

  _07Cache.cache = function (options) {
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


  _07Cache.uncache = function () {
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

  var _01Replace = {};

  const tokenize$3 = _01Tokenizer;

  const titleCase$1 = str => {
    return str.charAt(0).toUpperCase() + str.substr(1);
  };
  /** substitute-in new content */


  _01Replace.replaceWith = function (replace, options = {}) {
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
          input = titleCase$1(input);
        }

        newPhrases = tokenize$3(input, this.world, this.pool()); //tag the new phrases

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


  _01Replace.replace = function (match, replace, options) {
    // if there's no 2nd param, use replaceWith
    if (replace === undefined) {
      return this.replaceWith(match, options);
    }

    this.match(match).replaceWith(replace, options);
    return this;
  };

  var _02Insert = {};

  (function (exports) {
    const tokenize = _01Tokenizer;

    const isObject = function (obj) {
      return obj && Object.prototype.toString.call(obj) === '[object Object]';
    }; // if it's empty, just create the phrase


    const makeNew = function (str, doc) {
      let phrase = tokenize(str, doc.world)[0]; //assume it's one sentence, for now

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
          phrase = tokenize(str, this.world, this.pool())[0]; //assume it's one sentence, for now
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
          phrase = tokenize(str, this.world, this.pool())[0]; //assume it's one sentence, for now
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
          let arr = tokenize(arg, this.world); //TODO: phrase.tagger()?

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
  })(_02Insert);

  var _01Text = {};

  const shouldTrim = {
    clean: true,
    reduced: true,
    root: true
  };
  /** return the document as text */

  _01Text.text = function (options) {
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

  var _02Json = {};

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

  (function (exports) {
    const offsets = _offset;
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
        offsets(this, result, options);
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
  })(_02Json);

  var _03Out = {};

  var _debug = {exports: {}};

  (function (module) {
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
  })(_debug);

  const topk$1 = function (doc) {
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

  var _topk = topk$1;

  const debug = _debug.exports;
  const topk = _topk;
  /** pretty-print the current document and its tags */

  _03Out.debug = function () {
    debug(this);
    return this;
  };
  /** some named output formats */


  _03Out.out = function (method) {
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
      return topk(this);
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
      debug(this);
      return this;
    }

    return this.text();
  };

  var _01Sort = {};

  const methods$9 = {
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


  methods$9.alphabetical = methods$9.alpha;
  methods$9.wordcount = methods$9.wordCount; // aliases for sequential ordering

  const seqNames = {
    index: true,
    sequence: true,
    seq: true,
    sequential: true,
    chron: true,
    chronological: true
  };
  /** re-arrange the order of the matches (in place) */

  _01Sort.sort = function (input) {
    input = input || 'alpha'; //do this one up-front

    if (input === 'freq' || input === 'frequency' || input === 'topk') {
      return byFreq(this);
    }

    if (seqNames.hasOwnProperty(input)) {
      return sortSequential(this);
    }

    input = methods$9[input] || input; // apply sort method on each phrase

    if (typeof input === 'function') {
      this.list = this.list.sort(input);
      return this;
    }

    return this;
  };
  /** reverse the order of the matches, but not the words */


  _01Sort.reverse = function () {
    let list = [].concat(this.list);
    list = list.reverse();
    return this.buildFrom(list);
  };
  /** remove any duplicate matches */


  _01Sort.unique = function () {
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

  var _02Normalize = {};

  const killUnicode = unicode_1;
  const isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
  const quotes = /['‘’“”"′″‴]+/g;
  const methods$8 = {
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

        t.text = killUnicode(t.text);
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
  var _methods = methods$8;

  const methods$7 = _methods;
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

  _02Normalize.normalize = function (options) {
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
      methods$7.whitespace(this);
    } // unicode: é -> e


    if (options.unicode) {
      methods$7.unicode(termList);
    } //punctuation - keep sentence punctation, quotes, parenths


    if (options.punctuation) {
      methods$7.punctuation(termList);
    } // remove ':)'


    if (options.emoji) {
      this.remove('(#Emoji|#Emoticon)');
    } // 'f.b.i.' -> 'FBI'


    if (options.acronyms) {
      this.acronyms().strip(); // .toUpperCase()
    } // remove period from abbreviations


    if (options.abbreviations) {
      methods$7.abbreviations(this);
    } // --Medium methods--
    // `isn't` -> 'is not'


    if (options.contraction || options.contractions) {
      this.contractions().expand();
    } // '(word)' -> 'word'


    if (options.parentheses) {
      this.parentheses().unwrap();
    } // remove "" punctuation


    if (options.quotations || options.quotes) {
      methods$7.quotations(termList);
    } // remove any un-necessary adverbs


    if (options.adverbs) {
      methods$7.adverbs(this);
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

  var _03Split = {};

  (function (exports) {
    const parseSyntax = matchSyntax;
    /** return a Document with three parts for every match
     * seperate everything before the word, as a new phrase
     */

    exports.splitOn = function (reg) {
      // if there's no match, split parent, instead
      if (!reg) {
        let parent = this.parent();
        return parent.splitOn(this);
      } //start looking for a match..


      let regs = parseSyntax(reg);
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


      let regs = parseSyntax(reg);
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


      let regs = parseSyntax(reg);
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
  })(_03Split);

  var _04Case = {};

  const eachTerm = function (doc, fn) {
    let world = doc.world;
    doc.list.forEach(p => {
      p.terms().forEach(t => t[fn](world));
    });
    return doc;
  };
  /** turn every letter of every term to lower-cse */


  _04Case.toLowerCase = function () {
    return eachTerm(this, 'toLowerCase');
  };
  /** turn every letter of every term to upper case */


  _04Case.toUpperCase = function () {
    return eachTerm(this, 'toUpperCase');
  };
  /** upper-case the first letter of each term */


  _04Case.toTitleCase = function () {
    return eachTerm(this, 'toTitleCase');
  };
  /** remove whitespace and title-case each term */


  _04Case.toCamelCase = function () {
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

  var _05Whitespace = {};

  /** add this punctuation or whitespace before each match: */

  (function (exports) {
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
  })(_05Whitespace);

  var _06Join = {};

  /** make all phrases into one phrase */

  _06Join.join = function (str) {
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

  var _07Contract = {};

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


  _07Contract.contract = function () {
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

  var methods$6 = Object.assign({}, _01Utils, _02Accessors, _03Match, _04Tag, _05Loops, _06Lookup, _07Cache, _01Replace, _02Insert, _01Text, _02Json, _03Out, _01Sort, _02Normalize, _03Split, _04Case, _05Whitespace, _06Join, _07Contract);

  let methods$5 = {}; // allow helper methods like .adjectives() and .adverbs()

  const arr = [['terms', '.'], ['hyphenated', '@hasHyphen .'], ['adjectives', '#Adjective'], ['hashTags', '#HashTag'], ['emails', '#Email'], ['emoji', '#Emoji'], ['emoticons', '#Emoticon'], ['atMentions', '#AtMention'], ['urls', '#Url'], ['adverbs', '#Adverb'], ['pronouns', '#Pronoun'], ['conjunctions', '#Conjunction'], ['prepositions', '#Preposition']];
  arr.forEach(a => {
    methods$5[a[0]] = function (n) {
      let m = this.match(a[1]);

      if (typeof n === 'number') {
        m = m.get(n);
      }

      return m;
    };
  }); // aliases

  methods$5.emojis = methods$5.emoji;
  methods$5.atmentions = methods$5.atMentions;
  methods$5.words = methods$5.terms;
  /** return anything tagged as a phone number */

  methods$5.phoneNumbers = function (n) {
    let m = this.splitAfter('@hasComma');
    m = m.match('#PhoneNumber+');

    if (typeof n === 'number') {
      m = m.get(n);
    }

    return m;
  };
  /** Deprecated: please use compromise-numbers plugin */


  methods$5.money = function (n) {
    let m = this.match('#Money #Currency?');

    if (typeof n === 'number') {
      m = m.get(n);
    }

    return m;
  };
  /** return all cities, countries, addresses, and regions */


  methods$5.places = function (n) {
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


  methods$5.organizations = function (n) {
    let m = this.clauses();
    m = m.match('#Organization+');

    if (typeof n === 'number') {
      m = m.get(n);
    }

    return m;
  }; //combine them with .topics() method


  methods$5.entities = function (n) {
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


  methods$5.things = methods$5.entities;
  methods$5.topics = methods$5.entities;
  var _simple = methods$5;

  const underOver = /^(under|over)-?.{3}/;
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


  const checkLexicon$1 = function (terms, world) {
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
        let noPrefix = str.replace(/^(under|over)-?/, '');

        if (lex.hasOwnProperty(noPrefix) === true) {
          terms[t].tag(lex[noPrefix], 'noprefix-lexicon', world);
        }
      }
    }

    return terms;
  };

  var _01Lexicon = checkLexicon$1;

  const apostrophes = /[\'‘’‛‵′`´]$/;
  const perSec = /^(m|k|cm|km|m)\/(s|h|hr)$/; // '5 k/m'
  //

  const checkPunctuation = function (terms, i, world) {
    let term = terms[i]; //check hyphenation
    // if (term.post.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].pre === '') {
    //   term.tag('Hyphenated', 'has-hyphen', world)
    // }
    // support 'head-over'
    // if (term.hasHyphen() === true) {
    //   console.log(term.tags)
    // }
    // console.log(term.hasHyphen(), term.text)
    //an end-tick (trailing apostrophe) - flanders', or Carlos'

    if (apostrophes.test(term.text)) {
      if (!apostrophes.test(term.pre) && !apostrophes.test(term.post) && term.clean.length > 2) {
        let endChar = term.clean[term.clean.length - 2]; //flanders'

        if (endChar === 's') {
          term.tag(['Possessive', 'Noun'], 'end-tick', world);
          return;
        } //chillin'


        if (endChar === 'n') {
          term.tag(['Gerund'], 'chillin', world);
        }
      }
    } // '5 km/s'


    if (perSec.test(term.text)) {
      term.tag('Unit', 'per-sec', world);
    } // 'NASA' is, but not 'i REALLY love it.'
    // if (term.tags.Noun === true && isAcronym(term, world)) {
    //   term.tag('Acronym', 'acronym-step', world)
    //   term.tag('Noun', 'acronym-infer', world)
    // } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym.test(term.text)) {
    //   term.tag('Acronym', 'one-letter-acronym', world)
    //   term.tag('Noun', 'one-letter-infer', world)
    // }

  };

  var _02Punctuation = checkPunctuation;

  // order matters.

  var startsWith = [//web tags
  [/^[\w\.]+@[\w\.]+\.[a-z]{2,3}$/, 'Email'], //not fancy
  [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'], [/^@1?[0-9](am|pm)$/i, 'Time'], // @6pm
  [/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, 'Time'], // @6:30
  [/^@\w{2,}$/, 'AtMention'], //@spencermountain
  [/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/, 'Url'], //with http/www
  [/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/, 'Url'], //http://mostpopularwebsites.net/top-level-domain or Check for domains like .io/.ai/.dev
  //dates/times
  [/^'[0-9]{2}$/, 'Year'], //like '97
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, 'Time'], //4:32:32
  [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i, 'Time'], //4pm
  [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i, 'Time'], //4:00pm
  [/^[PMCE]ST$/, 'Time'], //PST, time zone abbrevs
  [/^utc ?[+-]?[0-9]+?$/, 'Time'], //UTC 8+
  [/^[a-z0-9]*? o\'?clock$/, 'Time'], //3 oclock
  [/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i, 'Date'], // 2020-03-02T00:00:00.000Z
  [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, 'Date'], // 03-02-89
  [/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, 'Date'], // 03/02/89
  [/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i, 'Date'], // 03-March-89
  [/^gmt[+-][0-9][0-9]?$/i, 'Timezone'], // gmt-3
  [/^utc[+-][0-9][0-9]?$/i, 'Timezone'], // utc-3
  //names
  [/^ma?c\'.*/, 'LastName'], //mc'adams
  [/^o\'[drlkn].*/, 'LastName'], //o'douggan
  [/^ma?cd[aeiou]/, 'LastName'], //macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes
  //slang things
  [/^(lol)+[sz]$/, 'Expression'], //lol
  [/^woo+a*?h?$/, 'Expression'], //whoaa, wooo
  [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, 'Verb'], // [/^(over|under)[a-z]{2,}/, 'Adjective'],
  [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'], // 03-02-89
  //phone numbers
  [/^[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //589-3809
  [/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //632-589-3809
  //money
  // currency regex
  // /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]
  //like $5.30
  [/^[-+]?[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6][-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(k|m|b|bn)?\+?$/, ['Money', 'Value']], //like 5.30$
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]\+?$/, ['Money', 'Value']], //like $400usd
  [/^[-+]?[\$£]?[0-9]([0-9,.])+?(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ['Money', 'Value']], //numbers
  // 50 | -50 | 3.23  | 5,999.0  | 10+
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/, ['Cardinal', 'NumericValue']], [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/, ['Ordinal', 'NumericValue']], // .73th
  [/^\.[0-9]+\+?$/, ['Cardinal', 'NumericValue']], //percent
  [/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/, ['Percent', 'Cardinal', 'NumericValue']], //7%  ..
  [/^\.[0-9]+%$/, ['Percent', 'Cardinal', 'NumericValue']], //.7%  ..
  //fraction
  [/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/, ['Fraction', 'NumericValue']], //3/2ths
  //range
  [/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/, ['Value', 'NumberRange']], //7th-8th
  //time-range
  [/^[0-9][0-9]?(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9][0-9]?(:[0-9][0-9])?(am|pm)?$/, ['Time', 'NumberRange']], //7pm-8:30
  //with unit
  [/^[0-9.]+([a-z]{1,4})$/, 'Value'] //like 5tbsp
  //ordinal
  // [/^[0-9][0-9,.]*(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], //like 5th
  // [/^[0-9]+(st|nd|rd|th)$/, 'Ordinal'], //like 5th
  ];

  const regex = startsWith;
  const romanNumeral = /^[IVXLCDM]{2,}$/;
  const romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/; //  https://stackoverflow.com/a/267405/168877
  //try each of the ^regexes in our list

  const checkRegex$1 = function (term, world) {
    let str = term.text; // do them all!

    for (let r = 0; r < regex.length; r += 1) {
      if (regex[r][0].test(str) === true) {
        term.tagSafe(regex[r][1], 'prefix #' + r, world);
        break;
      }
    } // do some more!
    //roman numberals - XVII


    if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
      term.tag('RomanNumeral', 'xvii', world);
    }
  };

  var _03Prefixes = checkRegex$1;

  //built using wordnet, by spencer kelly.
  //this mapping shrinks-down the uglified build

  const Adj$1 = 'Adjective';
  const Inf$1 = 'Infinitive';
  const Pres$1 = 'PresentTense';
  const Sing$1 = 'Singular';
  const Past$1 = 'PastTense';
  const Adverb = 'Adverb';
  const Exp = 'Expression';
  const Actor$1 = 'Actor';
  const Verb = 'Verb';
  const Noun$1 = 'Noun';
  const Last$1 = 'LastName'; //the order here matters.
  //regexes indexed by mandated last-character

  var endsWith$1 = {
    a: [[/.[aeiou]na$/, Noun$1], [/.[oau][wvl]ska$/, Last$1], //polish (female)
    [/.[^aeiou]ica$/, Sing$1], [/^([hyj]a)+$/, Exp] //hahah
    ],
    c: [[/.[^aeiou]ic$/, Adj$1]],
    d: [//==-ed==
    //double-consonant
    [/[aeiou](pp|ll|ss|ff|gg|tt|rr|bb|nn|mm)ed$/, Past$1], //popped, planned
    //double-vowel
    [/.[aeo]{2}[bdgmnprvz]ed$/, Past$1], //beeped, mooned, veered
    //-hed
    [/.[aeiou][sg]hed$/, Past$1], //stashed, sighed
    //-rd
    [/.[aeiou]red$/, Past$1], //stored
    [/.[aeiou]r?ried$/, Past$1], //buried
    //-led
    [/.[bcdgtr]led$/, Past$1], //startled, rumbled
    [/.[aoui]f?led$/, Past$1], //impaled, stifled
    //-sed
    [/.[iao]sed$/, Past$1], //franchised
    [/[aeiou]n?[cs]ed$/, Past$1], //laced, lanced
    //-med
    [/[aeiou][rl]?[mnf]ed$/, Past$1], //warmed, attained, engulfed
    //-ked
    [/[aeiou][ns]?c?ked$/, Past$1], //hooked, masked
    //-ged
    [/[aeiou][nl]?ged$/, Past$1], //engaged
    //-ted
    [/.[tdbwxz]ed$/, Past$1], //bribed, boxed
    [/[^aeiou][aeiou][tvx]ed$/, Past$1], //boxed
    //-ied
    [/.[cdlmnprstv]ied$/, Past$1], //rallied
    [/[^aeiou]ard$/, Sing$1], //card
    [/[aeiou][^aeiou]id$/, Adj$1], [/.[vrl]id$/, Adj$1]],
    e: [[/.[lnr]ize$/, Inf$1], [/.[^aeiou]ise$/, Inf$1], [/.[aeiou]te$/, Inf$1], [/.[^aeiou][ai]ble$/, Adj$1], [/.[^aeiou]eable$/, Adj$1], [/.[ts]ive$/, Adj$1], [/[a-z]-like$/, Adj$1]],
    h: [[/.[^aeiouf]ish$/, Adj$1], [/.v[iy]ch$/, Last$1], //east-europe
    [/^ug?h+$/, Exp], //uhh
    [/^uh[ -]?oh$/, Exp], //uhoh
    [/[a-z]-ish$/, Adj$1] //cartoon-ish
    ],
    i: [[/.[oau][wvl]ski$/, Last$1] //polish (male)
    ],
    k: [[/^(k){2}$/, Exp] //kkkk
    ],
    l: [[/.[gl]ial$/, Adj$1], [/.[^aeiou]ful$/, Adj$1], [/.[nrtumcd]al$/, Adj$1], [/.[^aeiou][ei]al$/, Adj$1]],
    m: [[/.[^aeiou]ium$/, Sing$1], [/[^aeiou]ism$/, Sing$1], [/^h*u*m+$/, Exp], //mmmmmmm / ummmm / huuuuuummmmmm
    [/^\d+ ?[ap]m$/, 'Date']],
    n: [[/.[lsrnpb]ian$/, Adj$1], [/[^aeiou]ician$/, Actor$1], [/[aeiou][ktrp]in$/, 'Gerund'] // 'cookin', 'hootin'
    ],
    o: [[/^no+$/, Exp], //noooo
    [/^(yo)+$/, Exp], //yoyo
    [/^woo+[pt]?$/, Exp] //woo
    ],
    r: [[/.[bdfklmst]ler$/, 'Noun'], [/[aeiou][pns]er$/, Sing$1], [/[^i]fer$/, Inf$1], [/.[^aeiou][ao]pher$/, Actor$1], [/.[lk]er$/, 'Noun'], [/.ier$/, 'Comparative']],
    t: [[/.[di]est$/, 'Superlative'], [/.[icldtgrv]ent$/, Adj$1], [/[aeiou].*ist$/, Adj$1], [/^[a-z]et$/, Verb]],
    s: [[/.[^aeiou]ises$/, Pres$1], [/.[rln]ates$/, Pres$1], [/.[^z]ens$/, Verb], [/.[lstrn]us$/, Sing$1], [/.[aeiou]sks$/, Pres$1], //masks
    [/.[aeiou]kes$/, Pres$1], //bakes
    [/[aeiou][^aeiou]is$/, Sing$1], [/[a-z]\'s$/, Noun$1], [/^yes+$/, Exp] //yessss
    ],
    v: [[/.[^aeiou][ai][kln]ov$/, Last$1] //east-europe
    ],
    y: [[/.[cts]hy$/, Adj$1], [/.[st]ty$/, Adj$1], [/.[gk]y$/, Adj$1], [/.[tnl]ary$/, Adj$1], [/.[oe]ry$/, Sing$1], [/[rdntkbhs]ly$/, Adverb], [/...lly$/, Adverb], [/[bszmp]{2}y$/, Adj$1], [/.(gg|bb|zz)ly$/, Adj$1], [/.[ai]my$/, Adj$1], [/[ea]{2}zy$/, Adj$1], [/.[^aeiou]ity$/, Sing$1]]
  };

  const Adj = 'Adjective';
  const Inf = 'Infinitive';
  const Pres = 'PresentTense';
  const Sing = 'Singular';
  const Past = 'PastTense';
  const Avb = 'Adverb';
  const Plrl = 'Plural';
  const Actor = 'Actor';
  const Vb = 'Verb';
  const Noun = 'Noun';
  const Last = 'LastName';
  const Modal = 'Modal';
  const Place = 'Place'; // find any issues - https://observablehq.com/@spencermountain/suffix-word-lookup

  var suffixMap$1 = [null, //0
  null, //1
  {
    //2-letter
    ea: Sing,
    ia: Noun,
    ic: Adj,
    ly: Avb,
    "'n": Vb,
    "'t": Vb
  }, {
    //3-letter
    oed: Past,
    ued: Past,
    xed: Past,
    ' so': Avb,
    "'ll": Modal,
    "'re": 'Copula',
    azy: Adj,
    eer: Noun,
    end: Vb,
    ped: Past,
    ffy: Adj,
    ify: Inf,
    ing: 'Gerund',
    //likely to be converted to Adj after lexicon pass
    ize: Inf,
    lar: Adj,
    mum: Adj,
    nes: Pres,
    nny: Adj,
    oid: Adj,
    ous: Adj,
    que: Adj,
    rol: Sing,
    sis: Sing,
    zes: Pres
  }, {
    //4-letter
    amed: Past,
    aped: Past,
    ched: Past,
    lked: Past,
    nded: Past,
    cted: Past,
    dged: Past,
    akis: Last,
    //greek
    cede: Inf,
    chuk: Last,
    //east-europe
    czyk: Last,
    //polish (male)
    ects: Pres,
    ends: Vb,
    enko: Last,
    //east-europe
    ette: Sing,
    fies: Pres,
    fore: Avb,
    gate: Inf,
    gone: Adj,
    ices: Plrl,
    ints: Plrl,
    ines: Plrl,
    ions: Plrl,
    less: Avb,
    llen: Adj,
    made: Adj,
    nsen: Last,
    //norway
    oses: Pres,
    ould: Modal,
    some: Adj,
    sson: Last,
    //swedish male
    tage: Inf,
    teen: 'Value',
    tion: Sing,
    tive: Adj,
    tors: Noun,
    vice: Sing
  }, {
    //5-letter
    tized: Past,
    urned: Past,
    eased: Past,
    ances: Plrl,
    bound: Adj,
    ettes: Plrl,
    fully: Avb,
    ishes: Pres,
    ities: Plrl,
    marek: Last,
    //polish (male)
    nssen: Last,
    //norway
    ology: Noun,
    ports: Plrl,
    rough: Adj,
    tches: Pres,
    tieth: 'Ordinal',
    tures: Plrl,
    wards: Avb,
    where: Avb
  }, {
    //6-letter
    auskas: Last,
    //lithuania
    keeper: Actor,
    logist: Actor,
    teenth: 'Value'
  }, {
    //7-letter
    opoulos: Last,
    //greek
    borough: Place,
    //Hillsborough
    sdottir: Last //swedish female

  }];

  const endsWith = endsWith$1;
  const suffixMap = suffixMap$1;

  const endRegexs = function (term, world) {
    let str = term.clean;
    let char = str[str.length - 1];

    if (endsWith.hasOwnProperty(char) === true) {
      let regs = endsWith[char];

      for (let r = 0; r < regs.length; r += 1) {
        if (regs[r][0].test(str) === true) {
          term.tagSafe(regs[r][1], `endReg ${char} #${r}`, world);
          break;
        }
      }
    }
  }; //sweep-through all suffixes


  const knownSuffixes = function (term, world) {
    const len = term.clean.length;
    let max = 7;

    if (len <= max) {
      max = len - 1;
    }

    for (let i = max; i > 1; i -= 1) {
      let str = term.clean.substr(len - i, len);

      if (suffixMap[str.length].hasOwnProperty(str) === true) {
        let tag = suffixMap[str.length][str];
        term.tagSafe(tag, 'suffix -' + str, world);
        break;
      }
    }
  }; //all-the-way-down!


  const checkRegex = function (term, world) {
    knownSuffixes(term, world);
    endRegexs(term, world);
  };

  var _04Suffixes = checkRegex;

  //faster than
  //http://stackoverflow.com/questions/28077049/regex-matching-emoticons

  var emoticons = {
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
    '<\\3': true
  };

  const emojiReg = /^(\u00a9|\u00ae|[\u2319-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
  const emoticon = emoticons; //for us, there's three types -
  // * ;) - emoticons
  // * 🌵 - unicode emoji
  // * :smiling_face: - asci-represented emoji
  //test for forms like ':woman_tone2:‍:ear_of_rice:'
  //https://github.com/Kikobeats/emojis-keywords/blob/master/index.js

  const isCommaEmoji = raw => {
    if (raw.charAt(0) === ':') {
      //end comma can be last or second-last ':haircut_tone3:‍♀️'
      if (raw.match(/:.?$/) === null) {
        return false;
      } //ensure no spaces


      if (raw.match(' ')) {
        return false;
      } //reasonably sized


      if (raw.length > 35) {
        return false;
      }

      return true;
    }

    return false;
  }; //check against emoticon whitelist


  const isEmoticon = str => {
    str = str.replace(/^[:;]/, ':'); //normalize the 'eyes'

    return emoticon.hasOwnProperty(str);
  };

  const tagEmoji = (term, world) => {
    let raw = term.pre + term.text + term.post;
    raw = raw.trim(); //dont double-up on ending periods

    raw = raw.replace(/[.!?,]$/, ''); //test for :keyword: emojis

    if (isCommaEmoji(raw) === true) {
      term.tag('Emoji', 'comma-emoji', world);
      term.text = raw;
      term.pre = term.pre.replace(':', '');
      term.post = term.post.replace(':', '');
    } //test for unicode emojis


    if (term.text.match(emojiReg)) {
      term.tag('Emoji', 'unicode-emoji', world);
      term.text = raw;
    } //test for emoticon ':)' emojis


    if (isEmoticon(raw) === true) {
      term.tag('Emoticon', 'emoticon-emoji', world);
      term.text = raw;
    }
  };

  var _05Emoji = tagEmoji;

  const steps = {
    lexicon: _01Lexicon,
    punctuation: _02Punctuation,
    regex: _03Prefixes,
    suffix: _04Suffixes,
    emoji: _05Emoji
  }; //'lookups' look at a term by itself

  const lookups = function (doc, terms) {
    let world = doc.world; //our list of known-words

    steps.lexicon(terms, world); //try these other methods

    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]; //or maybe some helpful punctuation

      steps.punctuation(terms, i, world); //mostly prefix checks

      steps.regex(term, world); //maybe we can guess

      steps.suffix(term, world); //emoji and emoticons

      steps.emoji(term, world);
    }

    return doc;
  };

  var _01Init = lookups;

  //basically, a little-bit better than the noun-fallback
  //just top n-grams from nlp tags, generated from nlp-corpus
  //after this word, here's what happens usually

  let afterThisWord = {
    i: 'Verb',
    //44% //i walk..
    first: 'Noun',
    //50% //first principles..
    it: 'Verb',
    //33%
    there: 'Verb',
    //35%
    not: 'Verb',
    //33%
    because: 'Noun',
    //31%
    if: 'Noun',
    //32%
    but: 'Noun',
    //26%
    who: 'Verb',
    //40%
    this: 'Noun',
    //37%
    his: 'Noun',
    //48%
    when: 'Noun',
    //33%
    you: 'Verb',
    //35%
    very: 'Adjective',
    // 39%
    old: 'Noun',
    //51%
    never: 'Verb',
    //42%
    before: 'Noun' //28%

  }; //in advance of this word, this is what happens usually

  let beforeThisWord = {
    there: 'Verb',
    //23% // be there
    me: 'Verb',
    //31% //see me
    man: 'Adjective',
    // 80% //quiet man
    only: 'Verb',
    //27% //sees only
    him: 'Verb',
    //32% //show him
    were: 'Noun',
    //48% //we were
    took: 'Noun',
    //38% //he took
    himself: 'Verb',
    //31% //see himself
    went: 'Noun',
    //43% //he went
    who: 'Noun',
    //47% //person who
    jr: 'Person'
  }; //following this POS, this is likely

  let afterThisPOS = {
    Adjective: 'Noun',
    //36% //blue dress
    Possessive: 'Noun',
    //41% //his song
    Determiner: 'Noun',
    //47%
    Adverb: 'Verb',
    //20%
    Pronoun: 'Verb',
    //40%
    Value: 'Noun',
    //47%
    Ordinal: 'Noun',
    //53%
    Modal: 'Verb',
    //35%
    Superlative: 'Noun',
    //43%
    Demonym: 'Noun',
    //38%
    Honorific: 'Person' //

  }; //in advance of this POS, this is likely

  let beforeThisPOS = {
    Copula: 'Noun',
    //44% //spencer is
    PastTense: 'Noun',
    //33% //spencer walked
    Conjunction: 'Noun',
    //36%
    Modal: 'Noun',
    //38%
    Pluperfect: 'Noun',
    //40%
    PerfectTense: 'Verb' //32%

  };
  var markov$1 = {
    beforeThisWord: beforeThisWord,
    afterThisWord: afterThisWord,
    beforeThisPos: beforeThisPOS,
    afterThisPos: afterThisPOS
  };

  const markov = markov$1;
  const afterKeys = Object.keys(markov.afterThisPos);
  const beforeKeys = Object.keys(markov.beforeThisPos);

  const checkNeighbours = function (terms, world) {
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]; //do we still need a tag?

      if (term.isKnown() === true) {
        continue;
      } //ok, this term needs a tag.
      //look at previous word for clues..


      let lastTerm = terms[i - 1];

      if (lastTerm) {
        // 'foobar term'
        if (markov.afterThisWord.hasOwnProperty(lastTerm.clean) === true) {
          let tag = markov.afterThisWord[lastTerm.clean];
          term.tag(tag, 'after-' + lastTerm.clean, world);
          continue;
        } // 'Tag term'
        // (look at previous POS tags for clues..)


        let foundTag = afterKeys.find(tag => lastTerm.tags[tag]);

        if (foundTag !== undefined) {
          let tag = markov.afterThisPos[foundTag];
          term.tag(tag, 'after-' + foundTag, world);
          continue;
        }
      } //look at next word for clues..


      let nextTerm = terms[i + 1];

      if (nextTerm) {
        // 'term foobar'
        if (markov.beforeThisWord.hasOwnProperty(nextTerm.clean) === true) {
          let tag = markov.beforeThisWord[nextTerm.clean];
          term.tag(tag, 'before-' + nextTerm.clean, world);
          continue;
        } // 'term Tag'
        // (look at next POS tags for clues..)


        let foundTag = beforeKeys.find(tag => nextTerm.tags[tag]);

        if (foundTag !== undefined) {
          let tag = markov.beforeThisPos[foundTag];
          term.tag(tag, 'before-' + foundTag, world);
          continue;
        }
      }
    }
  };

  var _01Neighbours = checkNeighbours;

  const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;
  const hasNumber = /[0-9]/;
  /** look for any grammar signals based on capital/lowercase */

  const checkCase = function (doc) {
    let world = doc.world;
    doc.list.forEach(p => {
      let terms = p.terms();

      for (let i = 1; i < terms.length; i++) {
        const term = terms[i];

        if (titleCase.test(term.text) === true && hasNumber.test(term.text) === false && term.tags.Date === undefined) {
          term.tag('ProperNoun', 'titlecase-noun', world);
        }
      }
    });
  };

  var _02Case = checkCase;

  const hasPrefix = /^(re|un)-?[a-z\u00C0-\u00FF]/;
  const prefix = /^(re|un)-?/;
  /** check 'rewatch' in lexicon as 'watch' */

  const checkPrefix = function (terms, world) {
    let lex = world.words;
    terms.forEach(term => {
      // skip if we have a good tag already
      if (term.isKnown() === true) {
        return;
      } //does it start with 'un|re'


      if (hasPrefix.test(term.clean) === true) {
        // look for the root word in the lexicon:
        let stem = term.clean.replace(prefix, '');

        if (stem && stem.length > 3 && lex[stem] !== undefined && lex.hasOwnProperty(stem) === true) {
          term.tag(lex[stem], 'stem-' + stem, world);
        }
      }
    });
  };

  var _03Stem = checkPrefix;

  const isPlural$8 = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /is$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i]; //similar to plural/singularize rules, but not the same

  const isSingular$1 = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /s[aeiou]+ns$/i, // sans, siens
  /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
  var isPlural_1$2 = {
    isSingular: isSingular$1,
    isPlural: isPlural$8
  };

  const noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'Holiday'];
  const rules$1 = isPlural_1$2;
  const notPlural = [/ss$/, /sis$/, /[^aeiou][uo]s$/, /'s$/];
  const notSingular = [/i$/, /ae$/];
  /** turn nouns into singular/plural */

  const checkPlural = function (t, world) {
    if (t.tags.Noun && !t.tags.Acronym) {
      let str = t.clean; //skip existing tags, fast

      if (t.tags.Singular || t.tags.Plural) {
        return;
      } //too short


      if (str.length <= 3) {
        t.tag('Singular', 'short-singular', world);
        return;
      } //is it impossible to be plural?


      if (noPlurals.find(tag => t.tags[tag])) {
        return;
      } // isPlural suffix rules


      if (rules$1.isPlural.find(reg => reg.test(str))) {
        t.tag('Plural', 'plural-rules', world);
        return;
      } // isSingular suffix rules


      if (rules$1.isSingular.find(reg => reg.test(str))) {
        t.tag('Singular', 'singular-rules', world);
        return;
      } // finally, fallback 'looks plural' rules..


      if (/s$/.test(str) === true) {
        //avoid anything too sketchy to be plural
        if (notPlural.find(reg => reg.test(str))) {
          return;
        }

        t.tag('Plural', 'plural-fallback', world);
        return;
      } //avoid anything too sketchy to be singular


      if (notSingular.find(reg => reg.test(str))) {
        return;
      }

      t.tag('Singular', 'singular-fallback', world);
    }
  };

  var _04Plurals = checkPlural;

  //todo remove/normalize plural forms

  const orgWords$1 = ['academy', 'administration', 'agence', 'agences', 'agencies', 'agency', 'airlines', 'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority', 'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery', 'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital', 'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir', 'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition', 'coffee', 'collective', 'college', 'commission', 'committee', 'communications', 'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference', 'conseil', 'consulting', 'containers', 'corporation', 'corps', 'corp', 'council', 'crew', 'daily news', 'data', 'departement', 'department', 'department store', 'departments', 'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise', 'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises', 'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial', 'fm', 'foundation', 'fund', 'gas', 'gazette', 'girls', 'government', 'group', 'guild', 'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc', 'industries', 'institut', 'institute', 'institute of technology', 'institutes', 'insurance', 'international', 'interstate', 'investment', 'investments', 'investors', 'journal', 'laboratory', 'labs', // 'law',
  'liberation army', 'limited', 'local authority', 'local health authority', 'machines', 'magazine', 'management', 'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere', 'ministry', 'military', 'mobile', 'motor', 'motors', 'musee', 'museum', // 'network',
  'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra', 'organization', 'partners', 'partnership', // 'party',
  "people's party", 'petrol', 'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc', 'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio', 'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant', 'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club', 'societe', 'society', 'sons', 'standard', 'state police', 'state university', 'stock exchange', 'subcommittee', 'syndicat', 'systems', 'telecommunications', 'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university', 'utilities', 'workers'];
  var organizations = orgWords$1.reduce(function (h, str) {
    h[str] = 'Noun';
    return h;
  }, {});

  let orgWords = organizations; //could this word be an organization

  const maybeOrg = function (t) {
    //must be a noun
    if (!t.tags.Noun) {
      return false;
    } //can't be these things


    if (t.tags.Pronoun || t.tags.Comma || t.tags.Possessive) {
      return false;
    } //must be one of these


    if (t.tags.Organization || t.tags.Acronym || t.tags.Place || t.titleCase()) {
      return true;
    }

    return false;
  };

  const tagOrgs = function (terms, world) {
    for (let i = 0; i < terms.length; i += 1) {
      let t = terms[i];

      if (orgWords[t.clean] !== undefined && orgWords.hasOwnProperty(t.clean) === true) {
        // look-backward - eg. 'Toronto University'
        let lastTerm = terms[i - 1];

        if (lastTerm !== undefined && maybeOrg(lastTerm) === true) {
          lastTerm.tagSafe('Organization', 'org-word-1', world);
          t.tagSafe('Organization', 'org-word-2', world);
          continue;
        } //look-forward - eg. University of Toronto


        let nextTerm = terms[i + 1];

        if (nextTerm !== undefined && nextTerm.clean === 'of') {
          if (terms[i + 2] && maybeOrg(terms[i + 2])) {
            t.tagSafe('Organization', 'org-of-word-1', world);
            nextTerm.tagSafe('Organization', 'org-of-word-2', world);
            terms[i + 2].tagSafe('Organization', 'org-of-word-3', world);
            continue;
          }
        }
      }
    }
  };

  var _05Organizations = tagOrgs;

  const oneLetterAcronym = /^[A-Z]('s|,)?$/;
  const periodSeperated = /([A-Z]\.){2}[A-Z]?/i;
  const oneLetterWord = {
    I: true,
    A: true
  };

  const isAcronym = function (term, world) {
    let str = term.reduced; // a known acronym like fbi

    if (term.tags.Acronym) {
      return true;
    } // if (term.tags.Adverb || term.tags.Verb || term.tags.Value || term.tags.Plural) {
    //   return false
    // }
    // known-words, like 'PIZZA' is not an acronym.


    if (world.words[str]) {
      return false;
    } // long capitalized words are not usually either


    if (str.length > 5) {
      return false;
    }

    return term.isAcronym();
  }; // F.B.I., NBC, - but not 'NO COLLUSION'


  const checkAcronym = function (terms, world) {
    terms.forEach(term => {
      //these are not acronyms
      if (term.tags.RomanNumeral === true) {
        return;
      } //period-ones F.D.B.


      if (periodSeperated.test(term.text) === true) {
        term.tag('Acronym', 'period-acronym', world);
      } //non-period ones are harder


      if (term.isUpperCase() && isAcronym(term, world)) {
        term.tag('Acronym', 'acronym-step', world);
        term.tag('Noun', 'acronym-infer', world);
      } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym.test(term.text)) {
        term.tag('Acronym', 'one-letter-acronym', world);
        term.tag('Noun', 'one-letter-infer', world);
      } //if it's a organization,


      if (term.tags.Organization && term.text.length <= 3) {
        term.tag('Acronym', 'acronym-org', world);
      }

      if (term.tags.Organization && term.isUpperCase() && term.text.length <= 6) {
        term.tag('Acronym', 'acronym-org-case', world);
      }
    });
  };

  var _06Acronyms = checkAcronym;

  const step = {
    neighbours: _01Neighbours,
    case: _02Case,
    stem: _03Stem,
    plural: _04Plurals,
    organizations: _05Organizations,
    acronyms: _06Acronyms
  }; //

  const fallbacks$1 = function (doc, terms) {
    let world = doc.world; // if it's empty, consult it's neighbours, first

    step.neighbours(terms, world); // is there a case-sensitive clue?

    step.case(doc); // check 'rewatch' as 'watch'

    step.stem(terms, world); // ... fallback to a noun!

    terms.forEach(t => {
      if (t.isKnown() === false) {
        t.tag('Noun', 'noun-fallback', doc.world);
      }
    }); // turn 'Foo University' into an Org

    step.organizations(terms, world); //turn 'FBD' into an acronym

    step.acronyms(terms, world); //are the nouns singular or plural?

    terms.forEach(t => {
      step.plural(t, doc.world);
    });
    return doc;
  };

  var _02Fallbacks = fallbacks$1;

  const hasNegative = /n't$/;
  const irregulars$2 = {
    "won't": ['will', 'not'],
    wont: ['will', 'not'],
    "can't": ['can', 'not'],
    cant: ['can', 'not'],
    cannot: ['can', 'not'],
    "shan't": ['should', 'not'],
    dont: ['do', 'not'],
    dun: ['do', 'not'] // "ain't" is ambiguous for is/was

  }; // either 'is not' or 'are not'

  const doAint = function (term, phrase) {
    let terms = phrase.terms();
    let index = terms.indexOf(term);
    let before = terms.slice(0, index); //look for the preceding noun

    let noun = before.find(t => {
      return t.tags.Noun;
    });

    if (noun && noun.tags.Plural) {
      return ['are', 'not'];
    }

    return ['is', 'not'];
  };

  const checkNegative$1 = function (term, phrase) {
    //check named-ones
    if (irregulars$2.hasOwnProperty(term.clean) === true) {
      return irregulars$2[term.clean];
    } //this word needs it's own logic:


    if (term.clean === `ain't` || term.clean === 'aint') {
      return doAint(term, phrase);
    } //try it normally


    if (hasNegative.test(term.clean) === true) {
      let main = term.clean.replace(hasNegative, '');
      return [main, 'not'];
    }

    return null;
  };

  var _01Negative = checkNegative$1;

  const contraction$1 = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z]{1,2})$/i; //these ones don't seem to be ambiguous

  const easy = {
    ll: 'will',
    ve: 'have',
    re: 'are',
    m: 'am',
    "n't": 'not'
  }; //

  const checkApostrophe$1 = function (term) {
    let parts = term.text.match(contraction$1);

    if (parts === null) {
      return null;
    }

    if (easy.hasOwnProperty(parts[2])) {
      return [parts[1], easy[parts[2]]];
    }

    return null;
  };

  var _02Simple = checkApostrophe$1;

  const irregulars$1 = {
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
    // "how'd": ['how', 'did'], //'how would?'
    // "what'd": ['what', 'did'], //'what would?'
    howd: ['how', 'did'],
    whatd: ['what', 'did'],
    // "let's": ['let', 'us'], //too weird
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
    '@': ['at']
  }; //

  const checkIrregulars$1 = function (term) {
    //check white-list
    if (irregulars$1.hasOwnProperty(term.clean)) {
      return irregulars$1[term.clean];
    }

    return null;
  };

  var _03Irregulars = checkIrregulars$1;

  const hasApostropheS = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]s$/i;
  const banList = {
    that: true,
    there: true
  };
  const hereThere = {
    here: true,
    there: true,
    everywhere: true
  };

  const isPossessive = (term, pool) => {
    // if we already know it
    if (term.tags.Possessive) {
      return true;
    } //a pronoun can't be possessive - "he's house"


    if (term.tags.Pronoun || term.tags.QuestionWord) {
      return false;
    }

    if (banList.hasOwnProperty(term.reduced)) {
      return false;
    } //if end of sentence, it is possessive - "was spencer's"


    let nextTerm = pool.get(term.next);

    if (!nextTerm) {
      return true;
    } //a gerund suggests 'is walking'


    if (nextTerm.tags.Verb) {
      //fix 'jamie's bite'
      if (nextTerm.tags.Infinitive) {
        return true;
      } //fix 'spencer's runs'


      if (nextTerm.tags.PresentTense) {
        return true;
      }

      return false;
    } //spencer's house


    if (nextTerm.tags.Noun) {
      // 'spencer's here'
      if (hereThere.hasOwnProperty(nextTerm.reduced) === true) {
        return false;
      }

      return true;
    } //rocket's red glare


    let twoTerm = pool.get(nextTerm.next);

    if (twoTerm && twoTerm.tags.Noun && !twoTerm.tags.Pronoun) {
      return true;
    } //othwerwise, an adjective suggests 'is good'


    if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
      return false;
    }

    return false;
  };

  const isHas = (term, phrase) => {
    let terms = phrase.terms();
    let index = terms.indexOf(term);
    let after = terms.slice(index + 1, index + 3); //look for a past-tense verb

    return after.find(t => {
      return t.tags.PastTense;
    });
  };

  const checkPossessive$1 = function (term, phrase, world) {
    //the rest of 's
    let found = term.text.match(hasApostropheS);

    if (found !== null) {
      //spencer's thing vs spencer-is
      if (isPossessive(term, phrase.pool) === true) {
        term.tag('#Possessive', 'isPossessive', world);
        return null;
      } //'spencer is'


      if (found !== null) {
        if (isHas(term, phrase)) {
          return [found[1], 'has'];
        }

        return [found[1], 'is'];
      }
    }

    return null;
  };

  var _04Possessive = checkPossessive$1;

  const hasPerfect = /[a-z\u00C0-\u00FF]'d$/;
  const useDid = {
    how: true,
    what: true
  };
  /** split `i'd` into 'i had',  or 'i would'  */

  const checkPerfect$1 = function (term, phrase) {
    if (hasPerfect.test(term.clean)) {
      let root = term.clean.replace(/'d$/, ''); //look at the next few words

      let terms = phrase.terms();
      let index = terms.indexOf(term);
      let after = terms.slice(index + 1, index + 4); //is it before a past-tense verb? - 'i'd walked'

      for (let i = 0; i < after.length; i++) {
        let t = after[i];

        if (t.tags.Verb) {
          if (t.tags.PastTense) {
            return [root, 'had'];
          } //what'd you see


          if (useDid[root] === true) {
            return [root, 'did'];
          }

          return [root, 'would'];
        }
      } //otherwise, 'i'd walk'


      return [root, 'would'];
    }

    return null;
  };

  var _05PerfectTense = checkPerfect$1;

  const isRange = /^([0-9.]{1,3}[a-z]{0,2}) ?[-–—] ?([0-9]{1,3}[a-z]{0,2})$/i;
  const timeRange = /^([0-9][0-9]?(:[0-9][0-9])?(am|pm)?) ?[-–—] ?([0-9][0-9]?(:[0-9][0-9])?(am|pm)?)$/i; //split '2-4' into '2 to 4'

  const checkRange$1 = function (term) {
    if (term.tags.PhoneNumber === true) {
      return null;
    }

    let parts = term.text.match(isRange);

    if (parts !== null) {
      return [parts[1], 'to', parts[2]];
    } else {
      parts = term.text.match(timeRange);

      if (parts !== null) {
        return [parts[1], 'to', parts[4]];
      }
    }

    return null;
  };

  var _06Ranges = checkRange$1;

  const contraction = /^(l|c|d|j|m|n|qu|s|t)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z\u00C0-\u00FF]+)$/i; // basic support for ungendered french contractions
  // not perfect, but better than nothing, to support matching on french text.

  const french = {
    l: 'le',
    // l'amour
    c: 'ce',
    // c'est
    d: 'de',
    // d'amerique
    j: 'je',
    // j'aime
    m: 'me',
    // m'appelle
    n: 'ne',
    // n'est
    qu: 'que',
    // qu'il
    s: 'se',
    // s'appelle
    t: 'tu' // t'aime

  };

  const checkFrench$1 = function (term) {
    let parts = term.text.match(contraction);

    if (parts === null || french.hasOwnProperty(parts[1]) === false) {
      return null;
    }

    let arr = [french[parts[1]], parts[2]];

    if (arr[0] && arr[1]) {
      return arr;
    }

    return null;
  };

  var _07French = checkFrench$1;

  const checkLexicon = _01Lexicon;
  const tokenize$2 = _01Tokenizer;
  const checkNegative = _01Negative;
  const checkApostrophe = _02Simple;
  const checkIrregulars = _03Irregulars;
  const checkPossessive = _04Possessive;
  const checkPerfect = _05PerfectTense;
  const checkRange = _06Ranges;
  const checkFrench = _07French;
  const isNumber = /^[0-9]+$/;
  const isOrdinal = /^[0-9]+(st|nd|rd|th)$/;
  const isTime = /^[0-9:]+(am|pm)?$/;

  const createPhrase = function (found, doc) {
    //create phrase from ['would', 'not']
    let phrase = tokenize$2(found.join(' '), doc.world, doc.pool())[0]; //tag it

    let terms = phrase.terms();
    checkLexicon(terms, doc.world);
    let term = terms[0]; // tag number-ranges

    if (isOrdinal.test(term.text)) {
      terms[0].tag('Ordinal', 'ord-range', doc.world);
      terms[2].tag('Ordinal', 'ord-range', doc.world);
    } else if (isNumber.test(term.text)) {
      terms[0].tag('Cardinal', 'num-range', doc.world);
      terms[2].tag('Cardinal', 'num-range', doc.world);
    } else if (isTime.test(term.text)) {
      terms[0].tag('Time', 'time-range', doc.world);
      terms[1].tag('Date', 'time-range', doc.world);
      terms[2].tag('Time', 'time-range', doc.world);
    } //make these terms implicit


    terms.forEach(t => {
      t.implicit = t.text;
      t.text = '';
      t.clean = ''; // remove whitespace for implicit terms

      t.pre = '';
      t.post = '';

      if (Object.keys(t.tags).length === 0) {
        t.tags.Noun = true; // if no tag, give it a noun
      }
    });
    return phrase;
  };

  const contractions$1 = function (doc) {
    let world = doc.world;
    doc.list.forEach(p => {
      let terms = p.terms();

      for (let i = 0; i < terms.length; i += 1) {
        let term = terms[i];
        let found = checkNegative(term, p);
        found = found || checkApostrophe(term);
        found = found || checkIrregulars(term);
        found = found || checkPossessive(term, p, world);
        found = found || checkPerfect(term, p);
        found = found || checkRange(term);
        found = found || checkFrench(term); //add them in

        if (found !== null) {
          let newPhrase = createPhrase(found, doc); // keep tag NumberRange, if we had it

          if (p.has('#NumberRange') === true) {
            doc.buildFrom([newPhrase]).tag('NumberRange');
          } //set text as contraction


          let firstTerm = newPhrase.terms(0);
          firstTerm.text = term.text; //grab sub-phrase to remove

          let match = p.buildFrom(term.id, 1, doc.pool());
          match.replace(newPhrase, doc, true);
        }
      }
    });
    return doc;
  };

  var _03Contractions = contractions$1;

  const hasWord = function (doc, word) {
    let arr = doc._cache.words[word] || [];
    arr = arr.map(i => doc.list[i]);
    return doc.buildFrom(arr);
  };

  const hasTag = function (doc, tag) {
    let arr = doc._cache.tags[tag] || [];
    arr = arr.map(i => doc.list[i]);
    return doc.buildFrom(arr);
  }; //mostly pos-corections here


  const miscCorrection = function (doc) {
    // imperative-form
    let m = hasTag(doc, 'Infinitive');

    if (m.found) {
      // you eat?
      m = m.ifNo('@hasQuestionMark'); // i speak

      m = m.ifNo('(i|we|they)'); // shut the door!

      m.not('will be').match('[#Infinitive] (#Determiner|#Possessive) #Noun').notIf('(our|their)').match('#Infinitive').tag('Imperative', 'shut-the'); // go-fast

      m.match('^[#Infinitive] #Adverb?$', 0).tag('Imperative', 'go-fast'); // do not go

      m.match('[(do && #Infinitive)] not? #Verb', 0).tag('Imperative', 'do-not'); // do it

      m.match('[#Infinitive] (it|some) (#Comparative|#Preposition|please|now|again)', 0).tag('Imperative', 'do-it');
    } //exactly like


    m = hasWord(doc, 'like');
    m.match('#Adverb like').notIf('(really|generally|typically|usually|sometimes|often|just) [like]').tag('Adverb', 'adverb-like'); //the orange.

    m = hasTag(doc, 'Adjective');
    m.match('#Determiner #Adjective$').notIf('(#Comparative|#Superlative)').terms(1).tag('Noun', 'the-adj-1'); // Firstname x (dangerous)

    m = hasTag(doc, 'FirstName');
    m.match('#FirstName (#Noun|@titleCase)').ifNo('^#Possessive').ifNo('(#Pronoun|#Plural)').ifNo('@hasComma .').lastTerm().tag('#LastName', 'firstname-noun'); //three trains / one train

    m = hasTag(doc, 'Value');
    m = m.match('#Value #PresentTense').ifNo('#Copula');

    if (m.found) {
      if (m.has('(one|1)') === true) {
        m.terms(1).tag('Singular', 'one-presentTense');
      } else {
        m.terms(1).tag('Plural', 'value-presentTense');
      }
    } // well i've been...


    doc.match('^(well|so|okay)').tag('Expression', 'well-'); // 10th of a second

    doc.match('#Value [of a second]', 0).unTag('Value', 'of-a-second'); // 30 seconds

    doc.match('#Value [seconds]', 0).unTag('Value', '30-seconds').tag(['Unit', 'Plural']); //been walking

    m = hasTag(doc, 'Gerund');
    m.match(`(be|been) (#Adverb|not)+? #Gerund`).not('#Verb$').tag('Auxiliary', 'be-walking'); // directive verb - 'use reverse'

    doc.match('(try|use|attempt|build|make) #Verb').ifNo('(@hasComma|#Negative|#PhrasalVerb|#Copula|will|be)').lastTerm().tag('#Noun', 'do-verb'); //possessives
    //'her match' vs 'let her match'

    m = hasTag(doc, 'Possessive');
    m = m.match('#Possessive [#Infinitive]', 0);

    if (!m.lookBehind('(let|made|make|force|ask)').found) {
      m.tag('Noun', 'her-match');
    }

    return doc;
  };

  var fixMisc$1 = miscCorrection;

  const unique$2 = function (arr) {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }

    return Object.keys(obj);
  };

  var _unique = unique$2;

  const list$5 = [// ==== Mutliple tags ====
  {
    match: 'too much',
    tag: 'Adverb Adjective',
    reason: 'bit-4'
  }, // u r cool
  {
    match: 'u r',
    tag: 'Pronoun Copula',
    reason: 'u r'
  }, //sometimes adverbs - 'pretty good','well above'
  {
    match: '#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)',
    tag: '#Copula #Adverb #Adjective',
    reason: 'sometimes-adverb'
  }, //i better ..
  {
    match: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense',
    group: 0,
    tag: 'Modal',
    reason: 'i-better'
  }, //walking is cool
  {
    match: '[#Gerund] #Adverb? not? #Copula',
    group: 0,
    tag: 'Activity',
    reason: 'gerund-copula'
  }, //walking should be fun
  {
    match: '[#Gerund] #Modal',
    group: 0,
    tag: 'Activity',
    reason: 'gerund-modal'
  }, //swear-words as non-expression POS
  {
    match: 'holy (shit|fuck|hell)',
    tag: 'Expression',
    reason: 'swears-expression'
  }, //Aircraft designer
  {
    match: '#Noun #Actor',
    tag: 'Actor',
    reason: 'thing-doer'
  }, {
    match: '#Conjunction [u]',
    group: 0,
    tag: 'Pronoun',
    reason: 'u-pronoun-2'
  }, //'u' as pronoun
  {
    match: '[u] #Verb',
    group: 0,
    tag: 'Pronoun',
    reason: 'u-pronoun-1'
  }, // ==== Determiners ====
  {
    match: '#Noun [(who|whom)]',
    group: 0,
    tag: 'Determiner',
    reason: 'captain-who'
  }, //that car goes
  // { match: 'that #Noun [#PresentTense]', group: 0, tag: 'Determiner', reason: 'that-determiner' },
  {
    match: 'a bit much',
    tag: 'Determiner Adverb Adjective',
    reason: 'bit-3'
  }, // ==== Propositions ====
  //all students
  {
    match: '#Verb #Adverb? #Noun [(that|which)]',
    group: 0,
    tag: 'Preposition',
    reason: 'that-prep'
  }, //work, which has been done.
  {
    match: '@hasComma [which] (#Pronoun|#Verb)',
    group: 0,
    tag: 'Preposition',
    reason: 'which-copula'
  }, {
    match: '#Copula just [like]',
    group: 0,
    tag: 'Preposition',
    reason: 'like-preposition'
  }, //folks like her
  {
    match: '#Noun [like] #Noun',
    group: 0,
    tag: 'Preposition',
    reason: 'noun-like'
  }, //fix for busted-up phrasalVerbs
  // { match: '#Noun [#Particle]', group: 0, tag: 'Preposition', reason: 'repair-noPhrasal' },
  // ==== Conditions ====
  // had he survived,
  {
    match: '[had] #Noun+ #PastTense',
    group: 0,
    tag: 'Condition',
    reason: 'had-he'
  }, // were he to survive
  {
    match: '[were] #Noun+ to #Infinitive',
    group: 0,
    tag: 'Condition',
    reason: 'were-he'
  }, // ==== Questions ====
  //the word 'how'
  {
    match: '^how',
    tag: 'QuestionWord',
    reason: 'how-question'
  }, {
    match: '[how] (#Determiner|#Copula|#Modal|#PastTense)',
    group: 0,
    tag: 'QuestionWord',
    reason: 'how-is'
  }, // //the word 'which'
  {
    match: '^which',
    tag: 'QuestionWord',
    reason: 'which-question'
  }, // { match: '[which] . (#Noun)+ #Pronoun', group: 0, tag: 'QuestionWord', reason: 'which-question2' },
  // { match: 'which', tag: 'QuestionWord', reason: 'which-question3' },
  // ==== Conjunctions ====
  {
    match: '[so] #Noun',
    group: 0,
    tag: 'Conjunction',
    reason: 'so-conj'
  }, //how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x'
  } // {
  //   match: '[(who|what|where|why|how|when)] #Noun #Adverb? #Infinitive not? #Gerund',
  //   group: 0,
  //   tag: 'Conjunction',
  //   reason: 'when-i-go-fishing',
  // },
  ];
  var _01Misc = list$5;

  var _ambig = {
    // adverbs than can be adjectives
    adverbAdjective: ['dark', 'bright', 'flat', 'light', 'soft', 'pale', 'dead', 'dim', 'faux', 'little', 'wee', 'sheer', 'most', 'near', 'good', 'extra', 'all'],
    // names that are dates
    personDate: ['april', 'june', 'may', 'jan', 'august', 'eve'],
    // names that may be months
    personMonth: ['january', 'april', 'may', 'june', 'jan', 'sep'],
    // names that are adjectives
    personAdjective: ['misty', 'rusty', 'dusty', 'rich', 'randy', 'young'],
    // names that are verbs
    personVerb: ['pat', 'wade', 'ollie', 'will', 'rob', 'buck', 'bob', 'mark', 'jack'],
    // names that are verbs
    personPlace: ['darwin', 'hamilton', 'paris', 'alexandria', 'houston', 'kobe', 'santiago', 'salvador', 'sydney', 'victoria'],
    // names that are nouns
    personNoun: ['art', 'baker', 'berg', 'bill', 'brown', 'charity', 'chin', 'christian', 'cliff', 'daisy', 'dawn', 'dick', 'dolly', 'faith', 'franco', 'gene', 'green', 'hall', 'hill', 'holly', 'hope', 'jean', 'jewel', 'joy', 'kelvin', 'king', 'kitty', 'lane', 'lily', 'melody', 'mercedes', 'miles', 'olive', 'penny', 'ray', 'reed', 'robin', 'rod', 'rose', 'sky', 'summer', 'trinity', 'van', 'viola', 'violet', 'wang', 'white']
  };

  const ambig$4 = _ambig;
  const dates = `(${ambig$4.personDate.join('|')})`;
  let list$4 = [// ==== Holiday ====
  {
    match: '#Holiday (day|eve)',
    tag: 'Holiday',
    reason: 'holiday-day'
  }, // the captain who
  // ==== WeekDay ====
  // sun the 5th
  {
    match: '[sun] the #Ordinal',
    tag: 'WeekDay',
    reason: 'sun-the-5th'
  }, //sun feb 2
  {
    match: '[sun] #Date',
    group: 0,
    tag: 'WeekDay',
    reason: 'sun-feb'
  }, //1pm next sun
  {
    match: '#Date (on|this|next|last|during)? [sun]',
    group: 0,
    tag: 'WeekDay',
    reason: '1pm-sun'
  }, //this sat
  {
    match: `(in|by|before|during|on|until|after|of|within|all) [sat]`,
    group: 0,
    tag: 'WeekDay',
    reason: 'sat'
  }, {
    match: `(in|by|before|during|on|until|after|of|within|all) [wed]`,
    group: 0,
    tag: 'WeekDay',
    reason: 'wed'
  }, {
    match: `(in|by|before|during|on|until|after|of|within|all) [march]`,
    group: 0,
    tag: 'Month',
    reason: 'march'
  }, //sat november
  {
    match: '[sat] #Date',
    group: 0,
    tag: 'WeekDay',
    reason: 'sat-feb'
  }, // ==== Month ====
  //all march
  {
    match: `#Preposition [(march|may)]`,
    group: 0,
    tag: 'Month',
    reason: 'in-month'
  }, //this march
  {
    match: `this [(march|may)]`,
    group: 0,
    tag: 'Month',
    reason: 'this-month'
  }, {
    match: `next [(march|may)]`,
    group: 0,
    tag: 'Month',
    reason: 'this-month'
  }, {
    match: `last [(march|may)]`,
    group: 0,
    tag: 'Month',
    reason: 'this-month'
  }, // march 5th
  {
    match: `[(march|may)] the? #Value`,
    group: 0,
    tag: 'Month',
    reason: 'march-5th'
  }, // 5th of march
  {
    match: `#Value of? [(march|may)]`,
    group: 0,
    tag: 'Month',
    reason: '5th-of-march'
  }, // march and feb
  {
    match: `[(march|may)] .? #Date`,
    group: 0,
    tag: 'Month',
    reason: 'march-and-feb'
  }, // feb to march
  {
    match: `#Date .? [(march|may)]`,
    group: 0,
    tag: 'Month',
    reason: 'feb-and-march'
  }, //quickly march
  {
    match: `#Adverb [(march|may)]`,
    group: 0,
    tag: 'Verb',
    reason: 'quickly-march'
  }, //march quickly
  {
    match: `[(march|may)] #Adverb`,
    group: 0,
    tag: 'Verb',
    reason: 'march-quickly'
  }, //5th of March
  {
    match: '#Value of #Month',
    tag: 'Date',
    reason: 'value-of-month'
  }, //5 March
  {
    match: '#Cardinal #Month',
    tag: 'Date',
    reason: 'cardinal-month'
  }, //march 5 to 7
  {
    match: '#Month #Value to #Value',
    tag: 'Date',
    reason: 'value-to-value'
  }, //march the 12th
  {
    match: '#Month the #Value',
    tag: 'Date',
    reason: 'month-the-value'
  }, //june 7
  {
    match: '(#WeekDay|#Month) #Value',
    tag: 'Date',
    reason: 'date-value'
  }, //7 june
  {
    match: '#Value (#WeekDay|#Month)',
    tag: 'Date',
    reason: 'value-date'
  }, //may twenty five
  {
    match: '(#TextValue && #Date) #TextValue',
    tag: 'Date',
    reason: 'textvalue-date'
  }, // in june
  {
    match: `in [${dates}]`,
    group: 0,
    tag: 'Date',
    reason: 'in-june'
  }, {
    match: `during [${dates}]`,
    group: 0,
    tag: 'Date',
    reason: 'in-june'
  }, {
    match: `on [${dates}]`,
    group: 0,
    tag: 'Date',
    reason: 'in-june'
  }, {
    match: `by [${dates}]`,
    group: 0,
    tag: 'Date',
    reason: 'by-june'
  }, {
    match: `after [${dates}]`,
    group: 0,
    tag: 'Date',
    reason: 'after-june'
  }, {
    match: `#Date [${dates}]`,
    group: 0,
    tag: 'Date',
    reason: 'in-june'
  }, // june 1992
  {
    match: `${dates} #Value`,
    tag: 'Date',
    reason: 'june-5th'
  }, {
    match: `${dates} #Date`,
    tag: 'Date',
    reason: 'june-5th'
  }, // June Smith
  {
    match: `${dates} #ProperNoun`,
    tag: 'Person',
    reason: 'june-smith',
    safe: true
  }, // june m. Cooper
  {
    match: `${dates} #Acronym? (#ProperNoun && !#Month)`,
    tag: 'Person',
    reason: 'june-smith-jr'
  }, // 'second'
  {
    match: `#Cardinal [second]`,
    tag: 'Unit',
    reason: 'one-second'
  }, // second quarter
  // { match: `#Ordinal quarter`, tag: 'Date', reason: 'second-quarter' },
  // 'aug 20-21'
  {
    match: `#Month #NumberRange`,
    tag: 'Date',
    reason: 'aug 20-21'
  }, // timezones
  // china standard time
  {
    match: `(#Place|#Demonmym|#Time) (standard|daylight|central|mountain)? time`,
    tag: 'Timezone',
    reason: 'std-time'
  }, // eastern time
  {
    match: `(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time`,
    tag: 'Timezone',
    reason: 'eastern-time'
  }, // 5pm central
  {
    match: `#Time [(eastern|mountain|pacific|central|est|pst|gmt)]`,
    group: 0,
    tag: 'Timezone',
    reason: '5pm-central'
  }, // central european time
  {
    match: `(central|western|eastern) european time`,
    tag: 'Timezone',
    reason: 'cet'
  }];
  var _02Dates = list$4;

  const ambig$3 = _ambig;
  const adjectives$1 = `(${ambig$3.personAdjective.join('|')})`;
  let list$3 = [// all fell apart
  {
    match: '[all] #Determiner? #Noun',
    group: 0,
    tag: 'Adjective',
    reason: 'all-noun'
  }, // very rusty
  {
    match: `#Adverb [${adjectives$1}]`,
    group: 0,
    tag: 'Adjective',
    reason: 'really-rich'
  }, // rusty smith
  {
    match: `${adjectives$1} #Person`,
    tag: 'Person',
    reason: 'randy-smith'
  }, // rusty a. smith
  {
    match: `${adjectives$1} #Acronym? #ProperNoun`,
    tag: 'Person',
    reason: 'rusty-smith'
  }, //sometimes not-adverbs
  {
    match: '#Copula [(just|alone)]$',
    group: 0,
    tag: 'Adjective',
    reason: 'not-adverb'
  }, //jack is guarded
  {
    match: '#Singular is #Adverb? [#PastTense$]',
    group: 0,
    tag: 'Adjective',
    reason: 'is-filled'
  }, // smoked poutine is
  {
    match: '[#PastTense] #Singular is',
    group: 0,
    tag: 'Adjective',
    reason: 'smoked-poutine'
  }, // baked onions are
  {
    match: '[#PastTense] #Plural are',
    group: 0,
    tag: 'Adjective',
    reason: 'baked-onions'
  }, // well made
  {
    match: 'well [#PastTense]',
    group: 0,
    tag: 'Adjective',
    reason: 'well-made'
  }, // is f*ed up
  {
    match: '#Copula [fucked up?]',
    tag: 'Adjective',
    reason: 'swears-adjective'
  }, //jack seems guarded
  {
    match: '#Singular (seems|appears) #Adverb? [#PastTense$]',
    group: 0,
    tag: 'Adjective',
    reason: 'seems-filled'
  }, // Gerund-Adjectives - 'amusing, annoying'
  //a staggering cost
  {
    match: '(a|an) [#Gerund]',
    group: 0,
    tag: 'Adjective',
    reason: 'a|an'
  }, //as amusing as
  {
    match: 'as [#Gerund] as',
    group: 0,
    tag: 'Adjective',
    reason: 'as-gerund-as'
  }, // more amusing than
  {
    match: 'more [#Gerund] than',
    group: 0,
    tag: 'Adjective',
    reason: 'more-gerund-than'
  }, // very amusing
  {
    match: '(so|very|extremely) [#Gerund]',
    group: 0,
    tag: 'Adjective',
    reason: 'so-gerund'
  }, // it was amusing
  {
    match: '(it|he|she|everything|something) #Adverb? was #Adverb? [#Gerund]',
    group: 0,
    tag: 'Adjective',
    reason: 'it-was-gerund'
  }, // found it amusing
  {
    match: '(found|found) it #Adverb? [#Gerund]',
    group: 0,
    tag: 'Adjective',
    reason: 'found-it-gerund'
  }, // a bit amusing
  {
    match: 'a (little|bit|wee) bit? [#Gerund]',
    group: 0,
    tag: 'Adjective',
    reason: 'a-bit-gerund'
  }, // jury is out - preposition ➔ adjective
  {
    match: '#Copula #Adjective? [(out|in|through)]$',
    group: 0,
    tag: 'Adjective',
    reason: 'still-out'
  }, // shut the door
  {
    match: '^[#Adjective] (the|your) #Noun',
    group: 0,
    tag: 'Infinitive',
    reason: 'shut-the'
  }, // the said card
  {
    match: 'the [said] #Noun',
    group: 0,
    tag: 'Adjective',
    reason: 'the-said-card'
  }, // a myth that uncovered wounds heal
  {
    match: '#Noun (that|which|whose) [#PastTense && !#Copula] #Noun',
    group: 0,
    tag: 'Adjective',
    reason: 'that-past-noun'
  } // the very fed character
  // { match: `#Determiner #Adverb [#PastTense] #Noun`, group: 0, tag: 'Adjective', reason: 'very-x-noun' },
  ];
  var _03Adjective = list$3;

  var _04Noun = [// ==== Plural ====
  //there are reasons
  {
    match: 'there (are|were) #Adjective? [#PresentTense]',
    group: 0,
    tag: 'Plural',
    reason: 'there-are'
  }, // ==== Singular ====
  //the sun
  {
    match: '#Determiner [sun]',
    group: 0,
    tag: 'Singular',
    reason: 'the-sun'
  }, //did a 900, paid a 20
  {
    match: '#Verb (a|an) [#Value]',
    group: 0,
    tag: 'Singular',
    reason: 'did-a-value'
  }, //'the can'
  {
    match: 'the [(can|will|may)]',
    group: 0,
    tag: 'Singular',
    reason: 'the can'
  }, // ==== Possessive ====
  //spencer kelly's
  {
    match: '#FirstName #Acronym? (#Possessive && #LastName)',
    tag: 'Possessive',
    reason: 'name-poss'
  }, //Super Corp's fundraiser
  {
    match: '#Organization+ #Possessive',
    tag: 'Possessive',
    reason: 'org-possessive'
  }, //Los Angeles's fundraiser
  {
    match: '#Place+ #Possessive',
    tag: 'Possessive',
    reason: 'place-possessive'
  }, // assign all tasks
  {
    match: '(#Verb && !#Modal) (all|every|each|most|some|no) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'all-presentTense'
  }, //the above is clear
  {
    match: '#Determiner [#Adjective] #Copula',
    group: 0,
    tag: 'Noun',
    reason: 'the-adj-is'
  }, //real evil is
  {
    match: '#Adjective [#Adjective] #Copula',
    group: 0,
    tag: 'Noun',
    reason: 'adj-adj-is'
  }, // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // have big dreams
  {
    match: '(had|have|#PastTense) #Adjective [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'adj-presentTense'
  }, // excellent answer spencer
  {
    match: '^#Adjective [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'start adj-presentTense'
  }, // one big reason
  {
    match: '#Value #Adjective [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'one-big-reason'
  }, // won widespread support
  {
    match: '#PastTense #Adjective+ [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'won-wide-support'
  }, // many poses
  {
    match: '(many|few|several|couple) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'many-poses'
  }, // very big dreams
  {
    match: '#Adverb #Adjective [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'very-big-dream'
  }, // good wait staff
  {
    match: '#Adjective [#Infinitive] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'good-wait-staff'
  }, // adorable little store
  {
    match: '#Adjective #Adjective [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'adorable-little-store'
  }, // of basic training
  {
    match: '#Preposition #Adjective [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'of-basic-training'
  }, // early warning
  {
    match: '#Adjective [#Gerund]',
    group: 0,
    tag: 'Noun',
    reason: 'early-warning'
  }, // justifiying higher costs
  {
    match: '#Gerund #Adverb? #Comparative [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'higher-costs'
  }, // do the dance
  {
    match: '#Infinitive (this|that|the) [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'do-this-dance'
  }, //his fine
  {
    match: '(his|her|its) [#Adjective]',
    group: 0,
    tag: 'Noun',
    reason: 'his-fine'
  }, //some pressing issues
  {
    match: 'some [#Verb] #Plural',
    group: 0,
    tag: 'Noun',
    reason: 'determiner6'
  }, //'more' is not always an adverb
  {
    match: 'more #Noun',
    tag: 'Noun',
    reason: 'more-noun'
  }, {
    match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'noun-list'
  }, //3 feet
  {
    match: '(right|rights) of .',
    tag: 'Noun',
    reason: 'right-of'
  }, // a bit
  {
    match: 'a [bit]',
    group: 0,
    tag: 'Noun',
    reason: 'bit-2'
  }, // my first thought
  {
    match: '#Possessive #Ordinal [#PastTense]',
    group: 0,
    tag: 'Noun',
    reason: 'first-thought'
  }, //running-a-show
  {
    match: '#Gerund #Determiner [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'running-a-show'
  }, //the-only-reason
  {
    match: '#Determiner #Adverb [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'the-reason'
  }, //the nice swim
  {
    match: '(the|this|those|these) #Adjective [#Verb]',
    group: 0,
    tag: 'Noun',
    reason: 'the-adj-verb'
  }, // the truly nice swim
  {
    match: '(the|this|those|these) #Adverb #Adjective [#Verb]',
    group: 0,
    tag: 'Noun',
    reason: 'determiner4'
  }, //the orange is
  {
    match: '#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)',
    group: 0,
    tag: 'Noun',
    reason: 'the-adj-2'
  }, // a stream runs
  {
    match: '(the|this|a|an) [#Infinitive] #Adverb? #Verb',
    group: 0,
    tag: 'Noun',
    reason: 'determiner5'
  }, //the test string
  {
    match: '#Determiner [#Infinitive] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'determiner7'
  }, //a nice deal
  {
    match: '#Determiner #Adjective #Adjective? [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'a-nice-inf'
  }, //the wait to vote
  {
    match: 'the [#Verb] #Preposition .',
    group: 0,
    tag: 'Noun',
    reason: 'determiner1'
  }, //a sense of
  {
    match: '#Determiner [#Verb] of',
    group: 0,
    tag: 'Noun',
    reason: 'the-verb-of'
  }, //next career move
  {
    match: '#Adjective #Noun+ [#Infinitive] #Copula',
    group: 0,
    tag: 'Noun',
    reason: 'career-move'
  }, //the threat of force
  {
    match: '#Determiner #Noun of [#Verb]',
    group: 0,
    tag: 'Noun',
    reason: 'noun-of-noun'
  }, //the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'western-line'
  }, //her polling
  {
    match: '#Possessive [#Gerund]',
    group: 0,
    tag: 'Noun',
    reason: 'her-polling'
  }, //her fines
  {
    match: '(his|her|its) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'its-polling'
  }, //linear algebra
  {
    match: '(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'technical-noun'
  }, // a blown motor
  {
    match: '(the|those|these|a|an) [#Participle] #Noun',
    group: 0,
    tag: 'Adjective',
    reason: 'blown-motor'
  }, // walk the walk
  {
    match: '(the|those|these|a|an) #Adjective? [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'det-inf'
  }, {
    match: '(the|those|these|a|an) #Adjective? [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'det-pres'
  }, {
    match: '(the|those|these|a|an) #Adjective? [#PastTense]',
    group: 0,
    tag: 'Noun',
    reason: 'det-past'
  }, // this swimming
  {
    match: '(this|that) [#Gerund]',
    group: 0,
    tag: 'Noun',
    reason: 'this-gerund'
  }, // at some point
  {
    match: 'at some [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'at-some-inf'
  }, //air-flow
  {
    match: '(#Noun && @hasHyphen) #Verb',
    tag: 'Noun',
    reason: 'hyphen-verb'
  }, //is no walk
  {
    match: 'is no [#Verb]',
    group: 0,
    tag: 'Noun',
    reason: 'is-no-verb'
  }, //different views than
  {
    match: '[#Verb] than',
    group: 0,
    tag: 'Noun',
    reason: 'correction'
  }, // goes to sleep
  {
    match: '(go|goes|went) to [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'goes-to-verb'
  }, //a close watch on
  {
    match: '(a|an) #Noun [#Infinitive] (#Preposition|#Noun)',
    group: 0,
    tag: 'Noun',
    reason: 'a-noun-inf'
  }, //a tv show
  {
    match: '(a|an) #Noun [#Infinitive]$',
    group: 0,
    tag: 'Noun',
    reason: 'a-noun-inf2'
  }, //do so
  {
    match: 'do [so]',
    group: 0,
    tag: 'Noun',
    reason: 'so-noun'
  }, //is mark hughes
  {
    match: '#Copula [#Infinitive] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'is-pres-noun'
  }, //a close
  {
    match: '#Determiner #Adverb? [close]',
    group: 0,
    tag: 'Adjective',
    reason: 'a-close'
  }, // what the hell
  {
    match: '#Determiner [(shit|damn|hell)]',
    group: 0,
    tag: 'Noun',
    reason: 'swears-noun'
  }, // the staff were
  {
    match: '(the|these) [#Singular] (were|are)',
    group: 0,
    tag: 'Plural',
    reason: 'singular-were'
  }, // running for congress
  {
    match: '#Gerund #Adjective? for [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'running-for'
  }, // running to work
  {
    match: '#Gerund #Adjective to [#Infinitive]',
    group: 0,
    tag: 'Noun',
    reason: 'running-to'
  }, // any questions for
  {
    match: '(many|any|some|several) [#PresentTense] for',
    group: 0,
    tag: 'Noun',
    reason: 'any-verbs-for'
  }, // have fun
  {
    match: `(have|had) [#Adjective] #Preposition .`,
    group: 0,
    tag: 'Noun',
    reason: 'have-fun'
  }, // co-founder
  {
    match: `co #Noun`,
    tag: 'Actor',
    reason: 'co-noun'
  }, // to facilitate gas exchange with
  {
    match: `to #PresentTense #Noun [#PresentTense] #Preposition`,
    group: 0,
    tag: 'Noun',
    reason: 'gas-exchange'
  }, // a comdominium, or simply condo
  {
    match: `a #Noun+ or #Adverb+? [#Verb]`,
    group: 0,
    tag: 'Noun',
    reason: 'noun-or-noun'
  }, // operating system
  {
    match: `[#Gerund] system`,
    group: 0,
    tag: 'Noun',
    reason: 'operating-system'
  }, // waited until release
  {
    match: `#PastTense (until|as|through|without) [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'waited-until-release'
  }, // selling like hot cakes
  {
    match: `#Gerund like #Adjective? [#PresentTense]`,
    group: 0,
    tag: 'Plural',
    reason: 'like-hot-cakes'
  }, // some valid reason
  {
    match: `some #Adjective [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'some-reason'
  }, // for some reason
  {
    match: `for some [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'for-some-reason'
  }, // same kind of shouts
  {
    match: `(same|some|the|that|a) kind of [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'some-kind-of'
  }, // a type of shout
  {
    match: `(same|some|the|that|a) type of [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'some-type-of'
  }, // doing better for fights
  {
    match: `#Gerund #Adjective #Preposition [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'doing-better-for-x'
  }, // get better aim
  {
    match: `(get|got|have|had) #Comparative [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'got-better-aim'
  }, // i think tipping sucks
  {
    match: `#Pronoun #Infinitive [#Gerund] #PresentTense`,
    group: 0,
    tag: 'Noun',
    reason: 'tipping-sucks'
  } // in various sensory functions
  // {
  //   match: `#Preposition #Determiner #Singular [#PresentTense]`,
  //   group: 0,
  //   tag: 'Noun',
  //   reason: 'various-word-functions',
  // },
  ];

  const ambig$2 = _ambig;
  const adjectives = `(${ambig$2.adverbAdjective.join('|')})`;
  var _05Adverb = [//still good
  {
    match: '[still] #Adjective',
    group: 0,
    tag: 'Adverb',
    reason: 'still-advb'
  }, //still make
  {
    match: '[still] #Verb',
    group: 0,
    tag: 'Adverb',
    reason: 'still-verb'
  }, // so hot
  {
    match: '[so] #Adjective',
    group: 0,
    tag: 'Adverb',
    reason: 'so-adv'
  }, // way hotter
  {
    match: '[way] #Comparative',
    group: 0,
    tag: 'Adverb',
    reason: 'way-adj'
  }, // way too hot
  {
    match: '[way] #Adverb #Adjective',
    group: 0,
    tag: 'Adverb',
    reason: 'way-too-adj'
  }, // all singing
  {
    match: '[all] #Verb',
    group: 0,
    tag: 'Adverb',
    reason: 'all-verb'
  }, // sing like an angel
  {
    match: '(#Verb && !#Modal) [like]',
    group: 0,
    tag: 'Adverb',
    reason: 'verb-like'
  }, //barely even walk
  {
    match: '(barely|hardly) even',
    tag: 'Adverb',
    reason: 'barely-even'
  }, //even held
  {
    match: '[even] #Verb',
    group: 0,
    tag: 'Adverb',
    reason: 'even-walk'
  }, // even left
  {
    match: 'even left',
    tag: '#Adverb #Verb',
    reason: 'even-left'
  }, //cheering hard - dropped -ly's
  {
    match: '(#PresentTense && !#Copula) [(hard|quick|long|bright|slow|fast|backwards|forwards)]',
    group: 0,
    tag: 'Adverb',
    reason: 'lazy-ly'
  }, // much appreciated
  {
    match: '[much] #Adjective',
    group: 0,
    tag: 'Adverb',
    reason: 'bit-1'
  }, // is well
  {
    match: '#Copula [#Adverb]$',
    group: 0,
    tag: 'Adjective',
    reason: 'is-well'
  }, // a bit cold
  {
    match: 'a [(little|bit|wee) bit?] #Adjective',
    group: 0,
    tag: 'Adverb',
    reason: 'a-bit-cold'
  }, // dark green
  {
    match: `[${adjectives}] #Adjective`,
    group: 0,
    tag: 'Adverb',
    reason: 'dark-green'
  }, // kinda sparkly
  {
    match: `#Adverb [#Adverb]$`,
    group: 0,
    tag: 'Adjective',
    reason: 'kinda-sparkly'
  }, {
    match: `#Adverb [#Adverb] (and|or|then)`,
    group: 0,
    tag: 'Adjective',
    reason: 'kinda-sparkly-and'
  }, // super strong
  {
    match: `[super] #Adjective #Noun`,
    group: 0,
    tag: 'Adverb',
    reason: 'super-strong'
  }];

  var _06Value = [// ==== PhoneNumber ====
  //1 800 ...
  {
    match: '1 #Value #PhoneNumber',
    tag: 'PhoneNumber',
    reason: '1-800-Value'
  }, //(454) 232-9873
  {
    match: '#NumericValue #PhoneNumber',
    tag: 'PhoneNumber',
    reason: '(800) PhoneNumber'
  }, // ==== Currency ====
  // chinese yuan
  {
    match: '#Demonym #Currency',
    tag: 'Currency',
    reason: 'demonym-currency'
  }, // ==== Ordinal ====
  {
    match: '[second] #Noun',
    group: 0,
    tag: 'Ordinal',
    reason: 'second-noun'
  }, // ==== Unit ====
  //5 yan
  {
    match: '#Value+ [#Currency]',
    group: 0,
    tag: 'Unit',
    reason: '5-yan'
  }, {
    match: '#Value [(foot|feet)]',
    group: 0,
    tag: 'Unit',
    reason: 'foot-unit'
  }, //minus 7
  {
    match: '(minus|negative) #Value',
    tag: 'Value',
    reason: 'minus-value'
  }, //5 kg.
  {
    match: '#Value [#Abbreviation]',
    group: 0,
    tag: 'Unit',
    reason: 'value-abbr'
  }, {
    match: '#Value [k]',
    group: 0,
    tag: 'Unit',
    reason: 'value-k'
  }, {
    match: '#Unit an hour',
    tag: 'Unit',
    reason: 'unit-an-hour'
  }, //seven point five
  {
    match: '#Value (point|decimal) #Value',
    tag: 'Value',
    reason: 'value-point-value'
  }, // ten bucks
  {
    match: '(#Value|a) [(buck|bucks|grand)]',
    group: 0,
    tag: 'Currency',
    reason: 'value-bucks'
  }, //quarter million
  {
    match: '#Determiner [(half|quarter)] #Ordinal',
    group: 0,
    tag: 'Value',
    reason: 'half-ordinal'
  }, {
    match: 'a #Value',
    tag: 'Value',
    reason: 'a-value'
  }, // ==== Money ====
  {
    match: '[#Value+] #Currency',
    group: 0,
    tag: 'Money',
    reason: '15 usd'
  }, // thousand and two
  {
    match: `(hundred|thousand|million|billion|trillion|quadrillion)+ and #Value`,
    tag: 'Value',
    reason: 'magnitude-and-value'
  }, //'a/an' can mean 1 - "a hour"
  {
    match: '!once [(a|an)] (#Duration|hundred|thousand|million|billion|trillion)',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one'
  }];

  const ambig$1 = _ambig;
  const verbs = `(${ambig$1.personVerb.join('|')})`;
  let list$2 = [// adj -> gerund
  // amusing his aunt
  {
    match: '[#Adjective] #Possessive #Noun',
    group: 0,
    tag: 'Verb',
    reason: 'gerund-his-noun'
  }, // loving you
  {
    match: '[#Adjective] (us|you)',
    group: 0,
    tag: 'Gerund',
    reason: 'loving-you'
  }, // slowly stunning
  {
    match: '(slowly|quickly) [#Adjective]',
    group: 0,
    tag: 'Gerund',
    reason: 'slowly-adj'
  }, // like
  {
    match: '(#Modal|i|they|we|do) not? [like]',
    group: 0,
    tag: 'PresentTense',
    reason: 'modal-like'
  }, // do not simply like
  {
    match: 'do (simply|just|really|not)+ [(#Adjective|like)]',
    group: 0,
    tag: 'Verb',
    reason: 'do-simply-like'
  }, // does mean
  {
    match: 'does (#Adverb|not)? [#Adjective]',
    group: 0,
    tag: 'PresentTense',
    reason: 'does-mean'
  }, // i mean
  {
    match: 'i (#Adverb|do)? not? [mean]',
    group: 0,
    tag: 'PresentTense',
    reason: 'i-mean'
  }, // { match: '!are (i|you|we) (#Adverb|do)? [#Adjective]', group: 0, tag: 'PresentTense', reason: 'i-mean' },
  // ==== Tense ====
  //he left
  {
    match: '#Noun #Adverb? [left]',
    group: 0,
    tag: 'PastTense',
    reason: 'left-verb'
  }, //this rocks
  {
    match: '(this|that) [#Plural]',
    group: 0,
    tag: 'PresentTense',
    reason: 'this-verbs'
  }, // ==== Auxiliary ====
  //was walking
  {
    match: `[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'copula-walking'
  }, //support a splattering of auxillaries before a verb
  {
    match: `[(has|had) (#Adverb|not)+?] #PastTense`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-walked'
  }, //would walk
  {
    match: `#Adverb+? [(#Modal|did)+ (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'modal-verb'
  }, //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have'
  }, //would be walking
  // { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //had been walking
  // {
  //   match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
  //   group: 0,
  //   tag: 'Auxiliary',
  //   reason: 'had-been',
  // },
  //support a splattering of auxillaries before a verb
  {
    match: `[(has|had) (#Adverb|not)+?] #PastTense`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-walked'
  }, // will walk
  {
    match: '[(do|does|will|have|had)] (not|#Adverb)+? #Verb',
    group: 0,
    tag: 'Auxiliary',
    reason: 'have-had'
  }, // about to go
  {
    match: '[about to] #Adverb? #Verb',
    group: 0,
    tag: ['Auxiliary', 'Verb'],
    reason: 'about-to'
  }, //would be walking
  {
    match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-be'
  }, //were being run
  {
    match: `(were|was) being [#PresentTense]`,
    group: 0,
    tag: 'PastTense',
    reason: 'was-being'
  }, //have run
  // { match: `have #PresentTense`, group: 0, tag: 'PastTense', reason: 'have-vb' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have'
  }, //had been walking
  {
    match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been'
  }, // was being driven
  {
    match: '[(be|being|been)] #Participle',
    group: 0,
    tag: 'Auxiliary',
    reason: 'being-foo'
  }, // ==== Phrasal ====
  //'foo-up'
  {
    match: '(#Verb && @hasHyphen) up',
    tag: 'PhrasalVerb',
    reason: 'foo-up'
  }, {
    match: '(#Verb && @hasHyphen) off',
    tag: 'PhrasalVerb',
    reason: 'foo-off'
  }, {
    match: '(#Verb && @hasHyphen) over',
    tag: 'PhrasalVerb',
    reason: 'foo-over'
  }, {
    match: '(#Verb && @hasHyphen) out',
    tag: 'PhrasalVerb',
    reason: 'foo-out'
  }, //fall over
  {
    match: '#PhrasalVerb [#PhrasalVerb]',
    group: 0,
    tag: 'Particle',
    reason: 'phrasal-particle'
  }, // went on for
  {
    match: '(lived|went|crept|go) [on] for',
    group: 0,
    tag: 'PhrasalVerb',
    reason: 'went-on'
  }, //back it up
  {
    match: '#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]',
    group: 0,
    tag: 'Adverb',
    reason: 'phrasal-pronoun-advb'
  }, // ==== Copula ====
  //will be running (not copula)
  {
    match: '[will #Adverb? not? #Adverb? be] #Gerund',
    group: 0,
    tag: 'Copula',
    reason: 'will-be-copula'
  }, //for more complex forms, just tag 'be'
  {
    match: 'will #Adverb? not? #Adverb? [be] #Adjective',
    group: 0,
    tag: 'Copula',
    reason: 'be-copula'
  }, // ==== Infinitive ====
  //march to
  {
    match: '[march] (up|down|back|to|toward)',
    group: 0,
    tag: 'Infinitive',
    reason: 'march-to'
  }, //must march
  {
    match: '#Modal [march]',
    group: 0,
    tag: 'Infinitive',
    reason: 'must-march'
  }, //let him glue
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    group: 0,
    tag: 'Infinitive',
    reason: 'let-him-glue'
  }, //he quickly foo
  // { match: '#Noun #Adverb [#Noun]', group: 0, tag: 'Verb', reason: 'quickly-foo' },
  //will secure our
  {
    match: 'will [#Adjective]',
    group: 0,
    tag: 'Verb',
    reason: 'will-adj'
  }, //he disguised the thing
  {
    match: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun',
    group: 0,
    tag: 'Verb',
    reason: 'he-adj-the'
  }, //is eager to go
  {
    match: '#Copula [#Adjective] to #Verb',
    group: 0,
    tag: 'Verb',
    reason: 'adj-to'
  }, // open the door
  {
    match: '[open] #Determiner',
    group: 0,
    tag: 'Infinitive',
    reason: 'open-the'
  }, // compromises are possible
  {
    match: '[#PresentTense] (are|were|was) #Adjective',
    group: 0,
    tag: 'Plural',
    reason: 'compromises-are-possible'
  }, // would wade
  {
    match: `#Modal [${verbs}]`,
    group: 0,
    tag: 'Verb',
    reason: 'would-mark'
  }, {
    match: `#Adverb [${verbs}]`,
    group: 0,
    tag: 'Verb',
    reason: 'really-mark'
  }, //to mark
  {
    match: '(to|#Modal) [mark]',
    group: 0,
    tag: 'PresentTense',
    reason: 'to-mark'
  }, // checkmate is
  {
    match: '^[#Infinitive] (is|was)',
    group: 0,
    tag: 'Noun',
    reason: 'checkmate-is'
  }, // wade smith
  {
    match: `${verbs} #Person`,
    tag: 'Person',
    reason: 'rob-smith'
  }, // wade m. Cooper
  {
    match: `${verbs} #Acronym #ProperNoun`,
    tag: 'Person',
    reason: 'rob-a-smith'
  }, // damn them
  {
    match: '[shit] (#Determiner|#Possessive|them)',
    group: 0,
    tag: 'Verb',
    reason: 'swear1-verb'
  }, {
    match: '[damn] (#Determiner|#Possessive|them)',
    group: 0,
    tag: 'Verb',
    reason: 'swear2-verb'
  }, {
    match: '[fuck] (#Determiner|#Possessive|them)',
    group: 0,
    tag: 'Verb',
    reason: 'swear3-verb'
  }, // become overly weakened
  {
    match: '(become|fall|grow) #Adverb? [#PastTense]',
    group: 0,
    tag: 'Adjective',
    reason: 'overly-weakened'
  }, // a completely beaten man
  {
    match: '(a|an) #Adverb [#Participle] #Noun',
    group: 0,
    tag: 'Adjective',
    reason: 'completely-beaten'
  }, // whose name was
  {
    match: 'whose [#PresentTense] #Copula',
    group: 0,
    tag: 'Noun',
    reason: 'whos-name-was'
  }, // give up on reason
  {
    match: `#PhrasalVerb #PhrasalVerb #Preposition [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'given-up-on-x'
  } // wants to be #Particle
  ];
  var _07Verbs = list$2;

  let list$1 = [// ==== Region ====
  //West Norforlk
  {
    match: '(west|north|south|east|western|northern|southern|eastern)+ #Place',
    tag: 'Region',
    reason: 'west-norfolk'
  }, //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  {
    match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]',
    group: 0,
    tag: 'Region',
    reason: 'us-state'
  }, // portland oregon
  {
    match: 'portland [or]',
    group: 0,
    tag: 'Region',
    reason: 'portland-or'
  }, //Foo District
  {
    match: '#ProperNoun+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)',
    tag: 'Region',
    reason: 'foo-district'
  }, //District of Foo
  {
    match: '(district|region|province|municipality|territory|burough|state) of #ProperNoun',
    tag: 'Region',
    reason: 'district-of-Foo'
  }, // in Foo California
  {
    match: 'in [#ProperNoun] #Place',
    group: 0,
    tag: 'Place',
    reason: 'propernoun-place'
  }, // ==== Address ====
  {
    match: '#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)',
    tag: 'Address',
    reason: 'address-st'
  } // in houston
  // { match: `in [${places}]`, group: 0, tag: 'Place', reason: 'in-paris' },
  // { match: `near [${places}]`, group: 0, tag: 'Place', reason: 'near-paris' },
  // { match: `at [${places}]`, group: 0, tag: 'Place', reason: 'at-paris' },
  // { match: `from [${places}]`, group: 0, tag: 'Place', reason: 'from-paris' },
  // { match: `to [${places}]`, group: 0, tag: 'Place', reason: 'to-paris' },
  // { match: `#Place [${places}]`, group: 0, tag: 'Place', reason: 'tokyo-paris' },
  // // houston texas
  // { match: `[${places}] #Place`, group: 0, tag: 'Place', reason: 'paris-france' },
  ];
  var _08Place = list$1;

  var _09Org = [//John & Joe's
  {
    match: '#Noun (&|n) #Noun',
    tag: 'Organization',
    reason: 'Noun-&-Noun'
  }, // teachers union of Ontario
  {
    match: '#Organization of the? #ProperNoun',
    tag: 'Organization',
    reason: 'org-of-place',
    safe: true
  }, //walmart USA
  {
    match: '#Organization #Country',
    tag: 'Organization',
    reason: 'org-country'
  }, //organization
  {
    match: '#ProperNoun #Organization',
    tag: 'Organization',
    reason: 'titlecase-org'
  }, //FitBit Inc
  {
    match: '#ProperNoun (ltd|co|inc|dept|assn|bros)',
    tag: 'Organization',
    reason: 'org-abbrv'
  }, // the OCED
  {
    match: 'the [#Acronym]',
    group: 0,
    tag: 'Organization',
    reason: 'the-acronym',
    safe: true
  }, // global trade union
  {
    match: '(world|global|international|national|#Demonym) #Organization',
    tag: 'Organization',
    reason: 'global-org'
  }, // schools
  {
    match: '#Noun+ (public|private) school',
    tag: 'School',
    reason: 'noun-public-school'
  }];

  const ambig = _ambig;
  const nouns = `(${ambig.personNoun.join('|')})`;
  const months = `(${ambig.personMonth.join('|')})`;
  const places = `(${ambig.personPlace.join('|')})`;
  let list = [// ==== Honorific ====
  {
    match: '[(1st|2nd|first|second)] #Honorific',
    group: 0,
    tag: 'Honorific',
    reason: 'ordinal-honorific'
  }, {
    match: '[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person',
    group: 0,
    tag: 'Honorific',
    reason: 'ambg-honorifics'
  }, // ==== FirstNames ====
  //is foo Smith
  {
    match: '#Copula [(#Noun|#PresentTense)] #LastName',
    group: 0,
    tag: 'FirstName',
    reason: 'copula-noun-lastname'
  }, //pope francis
  {
    match: '(lady|queen|sister) #ProperNoun',
    tag: 'FemaleName',
    reason: 'lady-titlecase',
    safe: true
  }, {
    match: '(king|pope|father) #ProperNoun',
    tag: 'MaleName',
    reason: 'pope-titlecase',
    safe: true
  }, //ambiguous-but-common firstnames
  {
    match: '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName',
    group: 0,
    tag: 'FirstName',
    reason: 'maybe-lastname'
  }, // ==== Nickname ====
  // Dwayne 'the rock' Johnson
  {
    match: '#FirstName [#Determiner #Noun] #LastName',
    group: 0,
    tag: 'NickName',
    reason: 'first-noun-last'
  }, //my buddy
  {
    match: '#Possessive [#FirstName]',
    group: 0,
    tag: 'Person',
    reason: 'possessive-name'
  }, {
    match: '#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun',
    tag: 'Person',
    reason: 'titlecase-acronym-titlecase',
    safe: true
  }, //ludwig van beethovan
  {
    match: '#Acronym #LastName',
    tag: 'Person',
    reason: 'acronym-latname',
    safe: true
  }, //jk rowling
  {
    match: '#Person (jr|sr|md)',
    tag: 'Person',
    reason: 'person-honorific'
  }, //peter II
  {
    match: '#Person #Person the? #RomanNumeral',
    tag: 'Person',
    reason: 'roman-numeral'
  }, //'Professor Fink', 'General McCarthy'
  {
    match: '#FirstName [/^[^aiurck]$/]',
    group: 0,
    tag: ['Acronym', 'Person'],
    reason: 'john-e'
  }, //Doctor john smith jr
  //general pearson
  {
    match: '#Honorific #Person',
    tag: 'Person',
    reason: 'honorific-person'
  }, //remove single 'mr'
  {
    match: '#Honorific #Acronym',
    tag: 'Person',
    reason: 'Honorific-TitleCase'
  }, //j.k Rowling
  {
    match: '#Noun van der? #Noun',
    tag: 'Person',
    reason: 'van der noun',
    safe: true
  }, //king of spain
  {
    match: '(king|queen|prince|saint|lady) of #Noun',
    tag: 'Person',
    reason: 'king-of-noun',
    safe: true
  }, //lady Florence
  {
    match: '(prince|lady) #Place',
    tag: 'Person',
    reason: 'lady-place'
  }, //saint Foo
  {
    match: '(king|queen|prince|saint) #ProperNoun',
    tag: 'Person',
    reason: 'saint-foo'
  }, //Foo U Ford
  {
    match: '[#ProperNoun] #Person',
    group: 0,
    tag: 'Person',
    reason: 'proper-person',
    safe: true
  }, // al sharpton
  {
    match: 'al (#Person|#ProperNoun)',
    tag: 'Person',
    reason: 'al-borlen',
    safe: true
  }, //ferdinand de almar
  {
    match: '#FirstName de #Noun',
    tag: 'Person',
    reason: 'bill-de-noun'
  }, //Osama bin Laden
  {
    match: '#FirstName (bin|al) #Noun',
    tag: 'Person',
    reason: 'bill-al-noun'
  }, //John L. Foo
  {
    match: '#FirstName #Acronym #ProperNoun',
    tag: 'Person',
    reason: 'bill-acronym-title'
  }, //Andrew Lloyd Webber
  {
    match: '#FirstName #FirstName #ProperNoun',
    tag: 'Person',
    reason: 'bill-firstname-title'
  }, //Mr Foo
  {
    match: '#Honorific #FirstName? #ProperNoun',
    tag: 'Person',
    reason: 'dr-john-Title'
  }, //peter the great
  {
    match: '#FirstName the #Adjective',
    tag: 'Person',
    reason: 'name-the-great'
  }, //very common-but-ambiguous lastnames
  {
    match: '#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)',
    tag: 'Person',
    reason: 'bill-green'
  }, // faith smith
  {
    match: `${nouns} #Person`,
    tag: 'Person',
    reason: 'ray-smith',
    safe: true
  }, // faith m. Smith
  {
    match: `${nouns} #Acronym? #ProperNoun`,
    tag: 'Person',
    reason: 'ray-a-smith',
    safe: true
  }, //give to april
  {
    match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-person'
  }, // remind june
  {
    match: `#Infinitive [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'infinitive-person'
  }, // may waits for
  // { match: `[${months}] #PresentTense for`, group: 0, tag: 'Person', reason: 'ambig-active-for' },
  // may waits to
  // { match: `[${months}] #PresentTense to`, group: 0, tag: 'Person', reason: 'ambig-active-to' },
  // april will
  {
    match: `[${months}] #Modal`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-modal'
  }, // may be
  {
    match: `[may] be`,
    group: 0,
    tag: 'Verb',
    reason: 'may-be'
  }, // would april
  {
    match: `#Modal [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'modal-ambig'
  }, // it is may
  {
    match: `#Copula [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'is-may'
  }, // may is
  {
    match: `[${months}] #Copula`,
    group: 0,
    tag: 'Person',
    reason: 'may-is'
  }, // with april
  {
    match: `that [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'that-month'
  }, // with april
  {
    match: `with [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'with-month'
  }, // for april
  {
    match: `for [${months}]`,
    group: 0,
    tag: 'Person',
    reason: 'for-month'
  }, // this april
  {
    match: `this [${months}]`,
    group: 0,
    tag: 'Month',
    reason: 'this-may'
  }, //maybe not 'this'
  // next april
  {
    match: `next [${months}]`,
    group: 0,
    tag: 'Month',
    reason: 'next-may'
  }, // last april
  {
    match: `last [${months}]`,
    group: 0,
    tag: 'Month',
    reason: 'last-may'
  }, // wednesday april
  {
    match: `#Date [${months}]`,
    group: 0,
    tag: 'Month',
    reason: 'date-may'
  }, // may 5th
  {
    match: `[${months}] the? #Value`,
    group: 0,
    tag: 'Month',
    reason: 'may-5th'
  }, // 5th of may
  {
    match: `#Value of [${months}]`,
    group: 0,
    tag: 'Month',
    reason: '5th-of-may'
  }, // dick van dyke
  {
    match: '#ProperNoun (van|al|bin) #ProperNoun',
    tag: 'Person',
    reason: 'title-van-title',
    safe: true
  }, //jose de Sucre
  {
    match: '#ProperNoun (de|du) la? #ProperNoun',
    tag: 'Person',
    reason: 'title-de-title',
    safe: true
  }, //Jani K. Smith
  {
    match: '#Singular #Acronym #LastName',
    tag: '#Person',
    reason: 'title-acro-noun',
    safe: true
  }, //John Foo
  {
    match: '#FirstName (#Noun && #ProperNoun) #ProperNoun?',
    tag: 'Person',
    reason: 'firstname-titlecase'
  }, //Joe K. Sombrero
  {
    match: '#FirstName #Acronym #Noun',
    tag: 'Person',
    reason: 'n-acro-noun',
    safe: true
  }, //Anthony de Marco
  {
    match: '#FirstName [(de|di|du|van|von) #Person]',
    group: 0,
    tag: 'LastName',
    reason: 'de-firstname'
  }, // Paris Berelc
  {
    match: `[${places}] (#ProperNoun && !#Place)`,
    group: 0,
    tag: 'FirstName',
    reason: 'place-firstname'
  }];
  var _10People = list;

  const parseSyntax = matchSyntax;
  const unique$1 = _unique;
  let matches$1 = [];
  matches$1 = matches$1.concat(_01Misc);
  matches$1 = matches$1.concat(_02Dates);
  matches$1 = matches$1.concat(_03Adjective);
  matches$1 = matches$1.concat(_04Noun);
  matches$1 = matches$1.concat(_05Adverb);
  matches$1 = matches$1.concat(_06Value);
  matches$1 = matches$1.concat(_07Verbs);
  matches$1 = matches$1.concat(_08Place);
  matches$1 = matches$1.concat(_09Org);
  matches$1 = matches$1.concat(_10People); // cache the easier conditions up-front

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
      tags: unique$1(needTags),
      words: unique$1(needWords)
    };
  }; // for speed, enumerate (a|b|c) to three matches


  const allLists = function (m) {
    let more = [];
    let lists = m.reg.filter(r => r.fastOr !== undefined);

    if (lists.length === 1) {
      let i = m.reg.findIndex(r => r.fastOr !== undefined);
      Object.keys(m.reg[i].fastOr).forEach(w => {
        let newM = Object.assign({}, m);
        newM.reg = newM.reg.slice(0);
        newM.reg[i] = Object.assign({}, newM.reg[i]);
        newM.reg[i].word = w;
        delete newM.reg[i].operator;
        delete newM.reg[i].fastOr; // newM.reason += '-' + w

        more.push(newM);
      });
    }

    return more;
  }; // parse them


  let all = [];
  matches$1.forEach(m => {
    m.reg = parseSyntax(m.match);
    let enumerated = allLists(m);

    if (enumerated.length > 0) {
      all = all.concat(enumerated);
    } else {
      all.push(m); // console.log(m)
    }
  });
  all.forEach(m => {
    m.required = cacheRequired(m.reg);
    return m;
  }); // console.log(all.length)
  // console.log(all[all.length - 1])

  var matches_1 = all;

  const matches = matches_1;
  const unique = _unique; // return intersection of array-of-arrays

  const hasEvery = function (chances) {
    if (chances.length === 0) {
      return [];
    }

    let obj = {};
    chances.forEach(arr => {
      arr = unique(arr);

      for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = obj[arr[i]] || 0;
        obj[arr[i]] += 1;
      }
    });
    let res = Object.keys(obj);
    res = res.filter(k => obj[k] === chances.length);
    res = res.map(num => Number(num));
    return res;
  };

  const runner$1 = function (doc) {
    //find phrases to try for each match
    matches.forEach(m => {
      let allChances = [];
      m.required.words.forEach(w => {
        allChances.push(doc._cache.words[w] || []);
      });
      m.required.tags.forEach(tag => {
        allChances.push(doc._cache.tags[tag] || []);
      });
      let worthIt = hasEvery(allChances);

      if (worthIt.length === 0) {
        return;
      }

      let phrases = worthIt.map(index => doc.list[index]);
      let tryDoc = doc.buildFrom(phrases); // phrases getting tagged

      let match = tryDoc.match(m.reg, m.group);

      if (match.found) {
        if (m.safe === true) {
          match.tagSafe(m.tag, m.reason);
        } else {
          match.tag(m.tag, m.reason);
        }
      }
    });
  };

  var runner_1 = runner$1; // console.log(hasEvery([[1, 2, 2, 3], [2, 3], []]))

  const fixMisc = fixMisc$1;
  const runner = runner_1; // runner: 250ms
  // misc: 40ms
  //sequence of match-tag statements to correct mis-tags

  const corrections$1 = function (doc) {
    runner(doc);
    fixMisc(doc);
    return doc;
  };

  var _04Correction = corrections$1;

  const init = _01Init;
  const fallbacks = _02Fallbacks;
  const contractions = _03Contractions;
  const corrections = _04Correction;
  /** POS-tag all terms in this document */

  const tagger$1 = function (doc) {
    let terms = doc.termList(); // check against any known-words

    doc = init(doc, terms); // everything has gotta be something. ¯\_(:/)_/¯

    doc = fallbacks(doc, terms); // support "didn't" & "spencer's"

    doc = contractions(doc); //set our cache, to speed things up

    doc.cache(); // wiggle-around the results, so they make more sense

    doc = corrections(doc); // remove our cache, as it's invalidated now

    doc.uncache(); // run any user-given tagger functions

    doc.world.taggers.forEach(fn => {
      fn(doc);
    });
    return doc;
  };

  var _02Tagger = tagger$1;

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

  const hasPlural$1 = function (doc) {
    if (doc.has('#Plural') === true) {
      return true;
    } // these can't be plural


    if (doc.has(noPlural) === true) {
      return false;
    }

    return true;
  };

  var hasPlural_1 = hasPlural$1;

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

  var getArticle$1 = makeArticle;

  const isPlural$7 = [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i]; //similar to plural/singularize rules, but not the same

  const isSingular = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
  var _rules = {
    isSingular: isSingular,
    isPlural: isPlural$7
  };

  const rules = _rules;
  const endS = /s$/; // double-check this term, if it is not plural, or singular.
  // (this is a partial copy of ./tagger/fallbacks/plural)
  // fallback plural if it ends in an 's'.

  const isPlural$6 = function (str) {
    // isSingular suffix rules
    if (rules.isSingular.find(reg => reg.test(str))) {
      return false;
    } // does it end in an s?


    if (endS.test(str) === true) {
      return true;
    } // is it a plural like 'fungi'?


    if (rules.isPlural.find(reg => reg.test(str))) {
      return true;
    }

    return null;
  };

  var isPlural_1$1 = isPlural$6;

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

  const toPossessive$1 = function (doc) {
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

  var toPossessive_1 = toPossessive$1;

  // pull these apart, if necessary

  const parse$2 = function (doc) {
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

  var parse_1 = parse$2;

  const hasPlural = hasPlural_1;
  const getArticle = getArticle$1;
  const isPlural$5 = isPlural_1$1;
  const toPossessive = toPossessive_1;
  const parse$1 = parse_1;
  const methods$4 = {
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
      return this.filter(d => hasPlural(d));
    },
    toPlural: function (agree) {
      let toPlural = this.world.transforms.toPlural;
      this.forEach(doc => {
        if (doc.has('#Plural') || hasPlural(doc) === false) {
          return;
        } // double-check it isn't an un-tagged plural


        let main = parse$1(doc).main;
        let str = main.text('reduced');

        if (!main.has('#Singular') && isPlural$5(str) === true) {
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
        if (doc.has('^#Singular+$') || hasPlural(doc) === false) {
          return;
        } // double-check it isn't an un-tagged plural


        let main = parse$1(doc).main;
        let str = main.text('reduced');

        if (!main.has('#Plural') && isPlural$5(str) !== true) {
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
        toPossessive(d);
      });
      return this;
    }
  };
  var methods_1 = methods$4;

  const methods$3 = methods_1;

  const addMethod$5 = function (Doc) {
    /**  */
    class Nouns extends Doc {} // add-in our methods


    Object.assign(Nouns.prototype, methods$3);

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

  const toInfinitive$2 = function (parsed, world) {
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

  var toInfinitive_1 = toInfinitive$2;

  // we walk -> plural
  // the most-recent noun-phrase, before this verb.

  const findNoun = function (vb) {
    let noun = vb.lookBehind('#Noun+').last();
    return noun;
  }; //sometimes you can tell if a verb is plural/singular, just by the verb
  // i am / we were
  // othertimes you need its subject 'we walk' vs 'i walk'


  const isPlural$4 = function (parsed) {
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

  var isPlural_1 = isPlural$4;

  const toInfinitive$1 = toInfinitive_1;
  const isPlural$3 = isPlural_1; // #Modal : would walk    -> 'would not walk'
  // #Copula : is           -> 'is not'
  // #PastTense : walked    -> did not walk
  // #PresentTense : walks  -> does not walk
  // #Gerund : walking:     -> not walking
  // #Infinitive : walk     -> do not walk

  const toNegative$1 = function (parsed, world) {
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
      let inf = toInfinitive$1(parsed, world);
      vb.replaceWith(inf, true);
      vb.prepend('did not');
      return;
    } // walks -> does not walk


    if (vb.has('#PresentTense')) {
      let inf = toInfinitive$1(parsed, world);
      vb.replaceWith(inf, true);

      if (isPlural$3(parsed)) {
        vb.prepend('do not');
      } else {
        vb.prepend('does not');
      }

      return;
    } //walking -> not walking


    if (vb.has('#Gerund')) {
      let inf = toInfinitive$1(parsed, world);
      vb.replaceWith(inf, true);
      vb.prepend('not');
      return;
    } //fallback 1:  walk -> does not walk


    if (isPlural$3(parsed)) {
      vb.prepend('does not');
      return;
    } //fallback 2:  walk -> do not walk


    vb.prepend('do not');
    return;
  };

  var toNegative_1 = toNegative$1;

  // get the prior verb most-likely doing this action
  // (it can not-exist - 'close the door')

  const getSubject$2 = function (vb) {
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

  var getSubject_1 = getSubject$2;

  const getSubject$1 = getSubject_1; // turn 'would not really walk up' into parts

  const parseVerb$1 = function (vb) {
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
      subject: getSubject$1(vb)
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

  var parse = parseVerb$1;

  const isPlural$2 = isPlural_1;
  /** too many special cases for is/was/will be*/

  const toBe$1 = parsed => {
    let isI = false;
    let plural = isPlural$2(parsed);
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

  var toBe_1 = toBe$1;

  const doModal$1 = function (parsed) {
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

  var doModal_1 = doModal$1;

  const toInfinitive = toInfinitive_1;
  const toBe = toBe_1;
  const doModal = doModal_1;
  const isPlural$1 = isPlural_1;

  const conjugate$2 = function (parsed, world) {
    let verb = parsed.verb; //special handling of 'is', 'will be', etc.

    if (verb.has('#Copula') || verb.out('normal') === 'be' && parsed.auxiliary.has('will')) {
      return toBe(parsed);
    } // special handling of 'are walking'


    if (parsed.auxiliary.has('are') && verb.has('#Gerund')) {
      let og = parsed.original.clone();
      let past = og.clone().replace('are', 'were');
      let fut = og.clone().replace('are', 'will be');
      let infinitive = toInfinitive(parsed, world);
      let res = {
        PastTense: past.text(),
        PresentTense: og.text(),
        FutureTense: fut.text(),
        Infinitive: infinitive
      };
      return res;
    } // special handling of 'he could.'


    if (verb.has('#Modal')) {
      return doModal(parsed);
    } // get the root form


    let infinitive = toInfinitive(parsed, world);

    if (!infinitive) {
      return {};
    }

    let forms = world.transforms.conjugate(infinitive, world);
    forms.Infinitive = infinitive; // Singular: the dog chases
    // Plural: the dogs chase

    let bePlural = isPlural$1(parsed);

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

  var conjugate_1 = conjugate$2;

  const conjugate$1 = conjugate_1; // 'i could drive' -> 'i could have driven'
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


    let obj = conjugate$1(parsed, world);
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

  const toNegative = toNegative_1;
  const parseVerb = parse;
  const isPlural = isPlural_1;
  const getSubject = getSubject_1;
  const conjugate = conjugate_1;
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

  var methods$2 = {
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
        let parsed = parseVerb(p);
        json.parts = {};
        Object.keys(parsed).forEach(k => {
          if (parsed[k] && parsed[k].isA === 'Doc') {
            json.parts[k] = parsed[k].text('normal');
          } else {
            json.parts[k] = parsed[k];
          }
        });
        json.isNegative = p.has('#Negative');
        json.conjugations = conjugate(parsed, this.world);
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
        let advb = parseVerb(vb).adverb;

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
        let parsed = parseVerb(vb);

        if (isPlural(parsed, this.world) === true) {
          list.push(vb.list[0]);
        }
      });
      return this.buildFrom(list);
    },

    /** return verbs like 'spencer walks' and not 'we walk' */
    isSingular: function () {
      let list = [];
      this.forEach(vb => {
        let parsed = parseVerb(vb);

        if (isPlural(parsed, this.world) === false) {
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
        let parsed = parseVerb(vb);
        let forms = conjugate(parsed, this.world);
        result.push(forms);
      });
      return result;
    },

    /** walk ➔ walked*/
    toPastTense: function () {
      this.forEach(vb => {
        let parsed = parseVerb(vb); // should we support 'would swim' ➔ 'would have swam'

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

        let str = conjugate(parsed, this.world).PastTense;

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

        let parsed = parseVerb(vb);
        let obj = conjugate(parsed, this.world);
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
        let parsed = parseVerb(vb); // 'i should drive' is already future-enough

        if (useParticiple(parsed)) {
          return;
        } // don't conjugate 'go away'.


        if (vb.has('#Imperative')) {
          return;
        }

        let str = conjugate(parsed, this.world).FutureTense;

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
        let parsed = parseVerb(vb);
        let str = conjugate(parsed, this.world).Infinitive;

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
        let parsed = parseVerb(vb);
        let str = conjugate(parsed, this.world).Gerund;

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
        let parsed = parseVerb(vb);
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
        let parsed = parseVerb(doc);
        toNegative(parsed, doc.world);
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
        let found = getSubject(p);

        if (found.list[0]) {
          list.push(found.list[0]);
        }
      });
      return this.buildFrom(list);
    }
  };

  const methods$1 = methods$2;

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

  const subsets = _simple;
  const subclass = [Abbreviations, Acronyms, Clauses, Contractions, Lists, Nouns, Parentheses, Possessives, Quotations, Verbs, People];

  const extend$1 = function (Doc) {
    // add basic methods
    Object.keys(subsets).forEach(k => Doc.prototype[k] = subsets[k]); // add subclassed methods

    subclass.forEach(addFn => addFn(Doc));
    return Doc;
  };

  var Subset = extend$1;

  const methods = {
    misc: methods$6,
    selections: _simple
  };
  const tagger = _02Tagger;
  const tokenize$1 = _01Tokenizer;
  const extend = Subset;
  /** a parsed text object */

  class Doc$1 {
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
      return tagger(this);
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


  Doc$1.prototype.buildFrom = function (list) {
    list = list.map(p => p.clone(true)); // new this.constructor()

    let doc = new Doc$1(list, this, this.world);
    return doc;
  };
  /** create a new Document from plaintext. */


  Doc$1.prototype.fromText = function (str) {
    let list = tokenize$1(str, this.world, this.pool());
    return this.buildFrom(list);
  };

  Object.assign(Doc$1.prototype, methods.misc);
  Object.assign(Doc$1.prototype, methods.selections); //add sub-classes

  extend(Doc$1); //aliases

  const aliases = {
    untag: 'unTag',
    and: 'match',
    notIf: 'ifNo',
    only: 'if',
    onlyIf: 'if'
  };
  Object.keys(aliases).forEach(k => Doc$1.prototype[k] = Doc$1.prototype[aliases[k]]);
  var Doc_1 = Doc$1;

  const lexiconStep = _01Lexicon; //for the tokenize-only build, we want to keep

  const smallTagger = function (doc) {
    let terms = doc.termList();
    lexiconStep(terms, doc.world); // run any user-given tagger functions

    doc.world.taggers.forEach(fn => {
      fn(doc);
    });
    return doc;
  };

  var tiny = smallTagger;

  const tokenize = _01Tokenizer;
  const fromJSON = fromJSON_1;
  const version = _version;
  const World = World_1;
  const Doc = Doc_1;
  const Phrase = Phrase_1;
  const Term = Term_1;
  const Pool = Pool_1;
  const tinyTagger = tiny;
  const parseMatch = matchSyntax;

  function instance(worldInstance) {
    //blast-out our word-lists, just once
    let world = worldInstance;
    /** parse and tag text into a compromise object  */

    const nlp = function (text = '', lexicon) {
      if (lexicon) {
        world.addWords(lexicon);
      }

      let list = tokenize(text, world);
      let doc = new Doc(list, null, world);
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

      let list = tokenize(text, w);
      let doc = new Doc(list, null, w);

      if (lexicon || doc.world.taggers.length > 0) {
        tinyTagger(doc);
      }

      return doc;
    };
    /** mix in a compromise-plugin */


    nlp.extend = function (fn) {
      fn(Doc, world, this, Phrase, Term, Pool);
      return this;
    };
    /** create a compromise Doc object from .json() results */


    nlp.fromJSON = function (json) {
      let list = fromJSON(json, world);
      return new Doc(list, null, world);
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
      return parseMatch(str, opts);
    };
    /** current version of the library */


    nlp.version = version; // aliases

    nlp.import = nlp.load;
    nlp.plugin = nlp.extend;
    return nlp;
  }

  var src = instance(new World());

  return src;

})));

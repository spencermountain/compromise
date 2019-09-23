(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.nlp = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  //this is a not-well-thought-out way to reduce our dependence on `object===object` stuff
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''); //generates a unique id for this term

  function makeId(str) {
    str = str || '_';
    var text = str + '-';

    for (var i = 0; i < 7; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }

    return text;
  }

  var _id = makeId;

  //a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
  //approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
  //http://en.wikipedia.org/wiki/List_of_Unicode_characters
  //https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
  var compact = {
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

  var unicode = {};
  Object.keys(compact).forEach(function (k) {
    compact[k].split('').forEach(function (s) {
      unicode[s] = k;
    });
  });

  var killUnicode = function killUnicode(str) {
    var chars = str.split('');
    chars.forEach(function (s, i) {
      if (unicode[s]) {
        chars[i] = unicode[s];
      }
    });
    return chars.join('');
  };

  var unicode_1 = killUnicode; // console.log(killUnicode('bjŏȒk—Ɏó'));

  var periodAcronym = /([A-Z]\.)+[A-Z]?,?$/;
  var oneLetterAcronym = /^[A-Z]\.,?$/;
  var noPeriodAcronym = /[A-Z]{2}('s|,)?$/;
  var lowerCaseAcronym = /([a-z]\.){2,}[a-z]\.?$/; //(we intentionally do not support unicode acronyms)

  /** does it appear to be an acronym, like FBI or M.L.B. */

  var isAcronym = function isAcronym(str) {
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

  var isAcronym_1 = isAcronym;

  var hasSlash = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/;
  /** some basic operations on a string to reduce noise */

  var clean = function clean(str) {
    str = str || '';
    str = str.toLowerCase();
    str = str.trim();
    var original = str; //(very) rough ASCII transliteration -  bjŏrk -> bjork

    str = unicode_1(str); //rough handling of slashes - 'see/saw'

    if (hasSlash.test(str) === true) {
      str = str.replace(/\/.*/, '');
    } //#tags, @mentions


    str = str.replace(/^[#@]/, ''); //punctuation

    str = str.replace(/[,;.!?]+$/, ''); // coerce single curly quotes

    str = str.replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'"); // coerce double curly quotes

    str = str.replace(/[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g, '"'); //coerce Unicode ellipses

    str = str.replace(/\u2026/g, '...'); //en-dash

    str = str.replace(/\u2013/g, '-'); //lookin'->looking (make it easier for conjugation)

    if (/[a-z][^aeiou]in['’]$/.test(str) === true) {
      str = str.replace(/in['’]$/, 'ing');
    } //turn re-enactment to reenactment


    if (/^(re|un)-?[^aeiou]./.test(str) === true) {
      str = str.replace('-', '');
    } //strip leading & trailing grammatical punctuation


    if (/^[:;]/.test(str) === false) {
      str = str.replace(/\.{3,}$/g, '');
      str = str.replace(/['",\.!:;\?\)]+$/g, '');
      str = str.replace(/^['"\(]+/g, '');
    } //remove possessives


    str = str.replace(/['’]s$/, ''); //do this again..

    str = str.trim(); //oh shucks,

    if (str === '') {
      str = original;
    } //compact acronyms


    if (isAcronym_1(str)) {
      str = str.replace(/\./g, '');
    } //nice-numbers


    str = str.replace(/([0-9]),([0-9])/g, '$1$2');
    return str;
  };

  var clean_1 = clean; // console.log(normalize('Dr. V Cooper'));

  //all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
  //we have slightly different rules for start/end - like #hashtags.

  var startings = /^[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*\•^†‡°”¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+/;
  var endings = /[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+$/; //money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥

  /** turn given text into a parsed-up object
   * seperate the 'meat' of the word from the whitespace+punctuation
   */

  var parseTerm = function parseTerm(str) {
    var pre = '';
    var post = '';
    str = str.replace(startings, function (found) {
      pre = found;
      return '';
    });
    str = str.replace(endings, function (found) {
      post = found;
      return '';
    }); //we went too far..

    if (str === '') {
      str = pre.replace(/[.?!]/, '').trim();
      pre = '';
      post = ' ';
    }

    var parsed = {
      text: str,
      clean: clean_1(str),
      pre: pre,
      post: post
    };
    return parsed;
  };

  var parse = parseTerm;

  var titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;
  /** convert all text to uppercase */

  var toUpperCase = function toUpperCase(world) {
    this.text = this.text.toUpperCase();
    this.tag('#UpperCase', 'toUpperCase', world);
    return this;
  };
  /** convert all text to lowercase */


  var toLowerCase = function toLowerCase(world) {
    this.text = this.text.toLowerCase();
    this.unTag('#TitleCase', world);
    this.unTag('#UpperCase', world);
    return this;
  };
  /** only set the first letter to uppercase
   * leave any existing uppercase alone
   */


  var toTitleCase = function toTitleCase(world) {
    this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, function (x) {
      return x.toUpperCase();
    }); //support unicode?

    this.tag('#TitleCase', 'toTitleCase', world);
    return this;
  };
  /** if the first letter is uppercase, and the rest are lowercase */


  var isTitleCase = function isTitleCase() {
    return titleCase.test(this.text);
  };

  var _01Case = {
    toUpperCase: toUpperCase,
    toLowerCase: toLowerCase,
    toTitleCase: toTitleCase,
    isTitleCase: isTitleCase
  };

  // these methods are called with '@hasComma' in the match syntax

  /** search the term's 'post' punctuation  */
  var hasPost = function hasPost(punct) {
    return this.post.includes(punct);
  };
  /** does it have a comma?  */


  var hasComma = function hasComma() {
    return this.hasPost(',');
  };
  /** does it end in a period? */


  var hasPeriod = function hasPeriod() {
    return this.hasPost('.') === true && this.hasPost('...') === false;
  };
  /** does it end in an exclamation */


  var hasExclamation = function hasExclamation() {
    return this.hasPost('!');
  };
  /** does it end with a question mark? */


  var hasQuestionMark = function hasQuestionMark() {
    return this.hasPost('?') || this.hasPost('¿');
  };
  /** is there a ... at the end? */


  var hasEllipses = function hasEllipses() {
    return this.hasPost('..') || this.hasPost('…');
  };
  /** is there a semicolon after this word? */


  var hasSemicolon = function hasSemicolon() {
    return this.hasPost(';');
  };
  /** is there a slash after this word? */


  var hasSlash$1 = function hasSlash() {
    return this.hasPost('/');
  };
  /** is it multiple words combinded */


  var hasContraction = function hasContraction() {
    return Boolean(this.implicit);
  };
  /** try to sensibly put this punctuation mark into the term */


  var addPunctuation = function addPunctuation(punct) {
    // dont add doubles
    if (punct === ',' || punct === ';') {
      this.post = this.post.replace(punct, '');
    }

    this.post = punct + this.post;
    return this;
  };

  var _02Punctuation = {
    hasPost: hasPost,
    hasComma: hasComma,
    hasPeriod: hasPeriod,
    hasExclamation: hasExclamation,
    hasQuestionMark: hasQuestionMark,
    hasEllipses: hasEllipses,
    hasSemicolon: hasSemicolon,
    hasSlash: hasSlash$1,
    hasContraction: hasContraction,
    addPunctuation: addPunctuation
  };

  //declare it up here
  var wrapMatch = function wrapMatch() {};
  /** ignore optional/greedy logic, straight-up term match*/


  var doesMatch = function doesMatch(t, reg) {
    // support id matches
    if (reg.id === t.id) {
      return true;
    } // support '.'


    if (reg.anything === true) {
      return true;
    } //support a text match


    if (reg.word !== undefined) {
      //match contractions
      if (t.implicit !== null && t.implicit === reg.word) {
        return true;
      } //match either .clean or .text


      return reg.word === t.clean || reg.word === t.text;
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
    } //support (one|two)


    if (reg.choices !== undefined) {
      //recursion alert
      var foundOne = reg.choices.find(function (r) {
        return wrapMatch(t, r);
      });
      return foundOne !== undefined;
    }

    return false;
  }; // wrap result for !negative match logic


  wrapMatch = function wrapMatch(t, reg) {
    var result = doesMatch(t, reg);

    if (reg.negative === true) {
      return !result;
    }

    return result;
  };

  var _doesMatch = wrapMatch;

  var boring = {
    TitleCase: true,
    UpperCase: true,
    CamelCase: true,
    Hyphenated: true,
    StartBracket: true,
    EndBracket: true,
    Comma: true,
    ClauseEnd: true
  };
  /** check a match object against this term */

  var doesMatch_1 = function doesMatch_1(reg) {
    return _doesMatch(this, reg);
  };
  /** does this term look like an acryonym? */


  var isAcronym_1$1 = function isAcronym_1$1() {
    return isAcronym_1(this.text);
  };
  /** does the term have at least one good tag? */


  var isKnown = function isKnown() {
    return Object.keys(this.tags).some(function (t) {
      return boring[t] !== true;
    });
  };

  var _03Misc = {
    doesMatch: doesMatch_1,
    isAcronym: isAcronym_1$1,
    isKnown: isKnown
  };

  var hasSpace = /[ -]/;
  /** return various text formats of this term */

  var textOut = function textOut(options, showPre, showPost) {
    var word = this.text;
    var before = this.pre;
    var after = this.post;

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

    return before + word + after;
  };
  /** return various metadata for this term */


  var json = function json(options) {
    var result = {};

    if (options.text) {
      result.text = this.text;
    }

    if (options.clean) {
      result.clean = this.clean;
    }

    if (options.implicit && this.implicit !== null) {
      result.implicit = this.implicit;
    }

    if (options.tags) {
      result.tags = Object.keys(this.tags);
    }

    if (options.whitespace) {
      result.pre = this.pre;
      result.post = this.post;
    }

    return result;
  };

  var _04Out = {
    textOut: textOut,
    json: json
  };

  var methods = Object.assign({}, _01Case, _02Punctuation, _03Misc, _04Out);

  /** add spaces at the end */
  var padEnd = function padEnd(str, width) {
    str = str.toString();

    while (str.length < width) {
      str += ' ';
    }

    return str;
  };
  /** output for verbose-mode */


  var logTag = function logTag(t, tag, reason) {
    var log = '\x1b[33m' + padEnd(t.clean, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m ';

    if (reason) {
      log = padEnd(log, 35) + ' ' + reason + '';
    }

    console.log(log);
  };
  /** output for verbose mode  */


  var logUntag = function logUntag(t, tag, reason) {
    var log = '\x1b[33m' + padEnd(t.clean, 3) + ' \x1b[31m - #' + tag + '\x1b[0m ';

    if (reason) {
      log = padEnd(log, 35) + ' ' + reason;
    }

    console.log(log);
  };

  var isArray = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  var titleCase$1 = function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  var fns = {
    logTag: logTag,
    logUntag: logUntag,
    isArray: isArray,
    titleCase: titleCase$1
  };

  /** add a tag, and its descendents, to a term */

  var addTag = function addTag(t, tag, reason, world) {
    if (!world) {
      console.warn('World not found - ' + reason);
    } //support '.' or '-' notation for skipping the tag


    if (tag === '' || tag === '.' || tag === '-') {
      return;
    }

    if (tag[0] === '#') {
      tag = tag.replace(/^#/, '');
    }

    tag = fns.titleCase(tag); //if we already got this one

    if (t.tags[tag] === true) {
      return;
    }

    if (world !== undefined && world.isVerbose() === true) {
      fns.logTag(t, tag, reason);
    } //add tag


    t.tags[tag] = true; //whee!
    //check tagset for any additional things to do...

    if (world !== undefined && world.tags !== undefined) {
      var tagset = world.tags;

      if (tagset.hasOwnProperty(tag) === true) {
        //add parent Tags
        if (tagset[tag].isA !== undefined) {
          var parentTag = tagset[tag].isA;
          addTag(t, parentTag, '→', world); //recursive
        } //add these extra ones, too


        if (tagset[tag].also !== undefined) {
          var alsoTag = tagset[tag].also;
          addTag(t, alsoTag, '→', world); //recursive
        } //remove any contrary tags


        if (typeof tagset[tag].notA !== 'undefined') {
          t.unTag(tagset[tag].notA, '←', world);
        }
      }
    }
  };
  /** support an array of tags */


  var addTags = function addTags(term, tags, reason, world) {
    if (fns.isArray(tags) === true) {
      tags.forEach(function (tag) {
        return addTag(term, tag, reason, world);
      });
    } else {
      addTag(term, tags, reason, world);
    }
  };

  var add = addTags;

  /** remove this tag, and its descentents from the term */

  var unTag = function unTag(t, tag, reason, world) {
    //support '*' for removing all tags
    if (tag === '*') {
      t.tags = {};
      return t;
    } // remove the tag


    if (t.tags[tag] === true && t.tags.hasOwnProperty(tag) === true) {
      delete t.tags[tag]; //log in verbose-mode

      if (world !== undefined && world.isVerbose() === true) {
        fns.logUntag(t, tag, reason);
      }
    } //delete downstream tags too


    if (world) {
      //TODO: properly support Term calling itself directly
      var tagset = world.tags;

      if (tagset[tag]) {
        var also = tagset[tag].downward;

        for (var i = 0; i < also.length; i++) {
          unTag(t, also[i], ' - -   - ', world); //recursive
        }
      }
    }

    return t;
  }; //handle an array of tags


  var untagAll = function untagAll(term, tags, reason, world) {
    if (fns.isArray(tags) === true) {
      tags.forEach(function (tag) {
        return unTag(term, tag, reason, world);
      });
    } else {
      unTag(term, tags, reason, world);
    }
  };

  var unTag_1 = untagAll;

  var canBe = function canBe(term, tag, world) {
    var tagset = world.tags; // cleanup tag

    if (tag[0] === '#') {
      tag = tag.replace(/^#/, '');
    } //fail-fast


    if (tagset[tag] === undefined) {
      return true;
    } //loop through tag's contradictory tags


    var enemies = tagset[tag].notA || [];

    for (var i = 0; i < enemies.length; i++) {
      if (term.tags[enemies[i]] === true) {
        return false;
      }
    }

    if (tagset[tag].isA !== undefined) {
      return canBe(term, tagset[tag].isA, world); //recursive
    }

    return true;
  };

  var canBe_1 = canBe;

  /** add a tag or tags, and their descendents to this term
   * @param  {string | string[]} tags - a tag or tags
   * @param {string?} [reason] a clue for debugging
   */

  var tag_1 = function tag_1(tags, reason, world) {
    add(this, tags, reason, world);
    return this;
  };
  /** only tag this term if it's consistent with it's current tags */


  var tagSafe = function tagSafe(tags, reason, world) {
    if (canBe_1(this, tags, world)) {
      add(this, tags, reason, world);
    }

    return this;
  };
  /** remove a tag or tags, and their descendents from this term
   * @param {string | string[]} tags  - a tag or tags
   * @param {string?} [reason] a clue for debugging
   */


  var unTag_1$1 = function unTag_1$1(tags, reason, world) {
    unTag_1(this, tags, reason, world);
    return this;
  };
  /** is this tag consistent with the word's current tags?
   * @param {string | string[]} tags - a tag or tags
   * @returns {boolean}
   */


  var canBe_1$1 = function canBe_1$1(tags, world) {
    return canBe_1(this, tags, world);
  };

  var tag = {
    tag: tag_1,
    tagSafe: tagSafe,
    unTag: unTag_1$1,
    canBe: canBe_1$1
  };

  var Term =
  /*#__PURE__*/
  function () {
    function Term() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, Term);

      text = String(text);
      var obj = parse(text);
      this.text = obj.text || '';
      this.clean = obj.clean || '';
      this.implicit =  null;
      this.pre = obj.pre || '';
      this.post = obj.post || '';
      this.raw = text.trim();
      this.tags = {};
      this.prev = null;
      this.next = null;
      this.id = _id(this.clean);
      this.isA = 'Term'; // easier than .constructor...
    }
    /** set the text of the Term to something else*/


    _createClass(Term, [{
      key: "set",
      value: function set(str) {
        var obj = parse(str);
        this.text = obj.text;
        this.clean = obj.clean;
        return this;
      }
    }]);

    return Term;
  }();
  /** create a deep-copy of this term */


  Term.prototype.clone = function () {
    var term = new Term(this.text);
    term.pre = this.pre;
    term.post = this.post;
    term.tags = Object.assign({}, term.tags);
    return term;
  };

  Object.assign(Term.prototype, methods);
  Object.assign(Term.prototype, tag);
  var Term_1 = Term;

  /** return a flat array of Term objects */
  var terms = function terms(n) {
    var terms = [this.pool.get(this.start)];

    if (this.length === 0) {
      return [];
    }

    for (var i = 0; i < this.length - 1; i += 1) {
      var id = terms[terms.length - 1].next;

      if (id === null) {
        console.warn('linked-list broken');
        break;
      }

      var term = this.pool.get(id);
      terms.push(term); //return this one?

      if (n !== undefined && n === i) {
        return terms[n];
      }
    }

    if (n !== undefined) {
      return terms[n];
    }

    return terms;
  };
  /** return a deep-copy of this phrse  */


  var clone = function clone() {
    var _this = this;

    //how do we clone part of the pool?
    var terms = this.terms();
    var newTerms = terms.map(function (t) {
      return t.clone();
    }); //connect these new ids up

    newTerms.forEach(function (t, i) {
      //add it to the pool..
      _this.pool.add(t);

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


  var lastTerm = function lastTerm() {
    var terms = this.terms();
    return terms[terms.length - 1];
  };
  /** quick lookup for a term id */


  var hasId = function hasId(wantId) {
    if (this.length === 0 || !wantId) {
      return false;
    }

    if (this.start === wantId) {
      return true;
    }

    var lastId = this.start;

    for (var i = 0; i < this.length - 1; i += 1) {
      var term = this.pool.get(lastId);

      if (term.next === wantId) {
        return true;
      }

      lastId = term.next;
    }

    return false;
  };
  /** how many seperate, non-empty words is it? */


  var wordCount = function wordCount() {
    return this.terms().filter(function (t) {
      return t.text !== '';
    }).length;
  };

  var _01Utils = {
    terms: terms,
    clone: clone,
    lastTerm: lastTerm,
    hasId: hasId,
    wordCount: wordCount
  };

  var trimEnd = function trimEnd(str) {
    return str.replace(/ +$/, '');
  };
  /** produce output in the given format */


  var text = function text() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isFirst = arguments.length > 1 ? arguments[1] : undefined;
    var isLast = arguments.length > 2 ? arguments[2] : undefined;

    if (typeof options === 'string') {
      if (options === 'normal') {
        options = {
          punctuation: true,
          whitespace: true,
          unicode: true
        };
      } else if (options === 'clean') {
        options = {
          lowercase: true,
          punctuation: true,
          whitespace: true,
          unicode: true
        };
      } else {
        options = {};
      }
    }

    var terms = this.terms(); //this this phrase a complete sentence?

    var isFull = false;

    if (terms[0] && terms[0].prev === null && terms[terms.length - 1].next === null) {
      isFull = true;
    }

    var text = terms.reduce(function (str, t, i) {
      options.last = isLast && i === terms.length - 1;
      var showPre = true;
      var showPost = true;

      if (isFull === false) {
        // dont show beginning whitespace
        if (i === 0 && isFirst) {
          showPre = false;
        } // dont show end-whitespace


        if (i === terms.length - 1 && isLast) {
          showPost = false;
        }
      }

      return str + t.textOut(options, showPre, showPost);
    }, ''); //full-phrases show punctuation, but not whitespace

    if (isFull === true && isLast) {
      text = trimEnd(text);
    }

    return text;
  };
  /** return json metadata for this phrase */


  var json$1 = function json() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var res = {}; // text data

    if (options.text) {
      res.text = this.text(options);

      if (options.trim) {
        res.text = res.text.trim();
      }
    }

    if (options.normal) {
      res.normal = this.text({
        punctuation: true,
        whitespace: true,
        unicode: true
      });
    } // terms data


    if (options.terms) {
      res.terms = this.terms().map(function (t) {
        return t.json(options.terms);
      });
    }

    return res;
  };

  var _02Out = {
    text: text,
    json: json$1
  };

  /** remove start and end whitespace */
  var trim = function trim() {
    var terms = this.terms();

    if (terms.length > 0) {
      //trim starting
      terms[0].pre = terms[0].pre.replace(/^\s+/, ''); //trim ending

      var lastTerm = terms[terms.length - 1];
      lastTerm.post = lastTerm.post.replace(/\s+$/, '');
    }

    return this;
  };

  var _03Change = {
    trim: trim
  };

  //add whitespace to the start of the second bit
  var addWhitespace = function addWhitespace(beforeTerms, newTerms) {
    // add any existing pre-whitespace to beginning
    newTerms[0].pre = beforeTerms[0].pre;
    var lastTerm = beforeTerms[beforeTerms.length - 1]; //add any existing punctuation to end of our new terms

    var newTerm = newTerms[newTerms.length - 1];
    newTerm.post = lastTerm.post; // remove existing punctuation

    lastTerm.post = ''; //before ←[space]  - after

    if (lastTerm.post === '') {
      lastTerm.post += ' ';
    }
  }; //insert this segment into the linked-list


  var stitchIn = function stitchIn(main, newPhrase) {
    var afterId = main.lastTerm().next; //connect ours in (main → newPhrase)

    main.lastTerm().next = newPhrase.start; //stich the end in  (newPhrase → after)

    newPhrase.lastTerm().next = afterId; //do it backwards, too

    if (afterId) {
      // newPhrase ← after
      var afterTerm = main.pool.get(afterId);
      afterTerm.prev = newPhrase.lastTerm().id;
    } // before ← newPhrase


    var beforeId = main.terms(0).id;

    if (beforeId) {
      var newTerm = newPhrase.terms(0);
      newTerm.prev = beforeId;
    }
  }; //recursively increase the length of all parent phrases


  var stretchAll = function stretchAll(doc, id, len) {
    var phrase = doc.list.find(function (p) {
      return p.hasId(id);
    });
    phrase.length += len; //FIXME: inside .map() it stretches parent too far

    var parents = doc.parents();
    parents.forEach(function (parent) {
      phrase = parent.list.find(function (p) {
        return p.hasId(id);
      });
      phrase.length += len;
    });
  }; //append one phrase onto another


  var joinPhrase = function joinPhrase(main, newPhrase, doc) {
    var beforeTerms = main.terms(); //spruce-up the whitespace issues

    addWhitespace(beforeTerms, newPhrase.terms()); //insert this segment into the linked-list

    stitchIn(main, newPhrase); //increase the length of our phrases

    stretchAll(doc, beforeTerms[0].id, newPhrase.length);
    return main;
  };

  var append = joinPhrase;

  var hasSpace$1 = / /; //a new space needs to be added, either on the new phrase, or the old one
  // '[new] [◻old]'   -or-   '[old] [◻new] [old]'

  var addWhitespace$1 = function addWhitespace(newTerms, original) {
    //add a space before our new text?
    // add a space after our text
    var lastTerm = newTerms[newTerms.length - 1];

    if (hasSpace$1.test(lastTerm.post) === false) {
      lastTerm.post += ' ';
    } // let term = original.pool.get(original.start)
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


    return;
  }; //insert this segment into the linked-list


  var stitchIn$1 = function stitchIn(main, newPhrase, newTerms) {
    // [newPhrase] → [main]
    var lastTerm = newTerms[newTerms.length - 1];
    lastTerm.next = main.start; // [before] → [main]

    var pool = main.pool;
    var start = pool.get(main.start);

    if (start.prev) {
      var before = pool.get(start.prev);
      before.next = newPhrase.start;
    } //do it backwards, too
    // before ← newPhrase


    newTerms[0].prev = main.terms(0).prev; // newPhrase ← main

    main.terms(0).prev = lastTerm.id;
  }; //recursively increase the length of all parent phrases


  var stretchAll$1 = function stretchAll(doc, oldStart, newPhrase) {
    //find our phrase to stretch
    var phrase = doc.list.find(function (p) {
      return p.hasId(oldStart) || p.hasId(newPhrase.start);
    });

    if (phrase === undefined) {
      console.error('compromise error: Prepend missing start - ' + oldStart);
      return;
    } //should we update the phrase's starting?


    if (phrase.start === oldStart) {
      phrase.start = newPhrase.start;
    } // console.log(newPhrase)


    phrase.length += newPhrase.length;

    if (doc.from) {
      stretchAll(doc.from, oldStart, newPhrase);
    }
  }; //append one phrase onto another


  var joinPhrase$1 = function joinPhrase(original, newPhrase, doc) {
    var newTerms = newPhrase.terms();
    var oldStart = original.start; //spruce-up the whitespace issues

    addWhitespace$1(newTerms); //insert this segment into the linked-list

    stitchIn$1(original, newPhrase, newTerms); //increase the length of our phrases

    stretchAll$1(doc, oldStart, newPhrase);
    return original;
  };

  var prepend = joinPhrase$1;

  //recursively decrease the length of all the parent phrases
  var shrinkAll = function shrinkAll(doc, id, deleteLength, after) {
    //find our phrase to shrink
    var phrase = doc.list.find(function (p) {
      return p.hasId(id);
    });

    if (phrase !== undefined) {
      phrase.length -= deleteLength; //does it start with this soon-removed word?

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


  var deletePhrase = function deletePhrase(phrase, doc) {
    var pool = doc.pool();
    var terms = phrase.terms(); //grab both sides of the chain,

    var prev = pool.get(terms[0].prev) || {};
    var after = pool.get(terms[terms.length - 1].next) || {}; //first, change phrase lengths

    shrinkAll(doc, phrase.start, phrase.length, after); // connect [prev]->[after]

    if (prev) {
      prev.next = after.id;
    } // connect [prev]<-[after]


    if (after) {
      after.prev = prev.id;
    } // lastly, actually delete the terms from the pool


    for (var i = 0; i < terms.length; i++) {// pool.remove(terms[i].id)
    }
  };

  var _delete = deletePhrase;

  /** put this text at the end */

  var append_1 = function append_1(newPhrase, doc) {
    append(this, newPhrase, doc);
    return this;
  };
  /** add this text to the beginning */


  var prepend_1 = function prepend_1(newPhrase, doc) {
    prepend(this, newPhrase, doc);
    return this;
  };

  var delete_1 = function delete_1(doc) {
    _delete(this, doc);
    return this;
  };

  var replace = function replace(newPhrase, doc) {
    //add it do the end
    var firstLength = this.length;
    append(this, newPhrase, doc); //delete original terms

    var tmp = this.buildFrom(this.start, this.length);
    tmp.length = firstLength;
    _delete(tmp, doc);
    return this;
  };
  /**
   * Turn this phrase object into 3 phrase objects
   */


  var splitOn = function splitOn(p) {
    var terms = this.terms();
    var result = {
      before: null,
      match: null,
      after: null
    };
    var index = terms.findIndex(function (t) {
      return t.id === p.start;
    });

    if (index === -1) {
      return result;
    } //make all three sections into phrase-objects


    var start = terms.slice(0, index);

    if (start.length > 0) {
      result.before = this.buildFrom(start[0].id, start.length);
    }

    var match = terms.slice(index, index + p.length);

    if (match.length > 0) {
      result.match = this.buildFrom(match[0].id, match.length);
    }

    var end = terms.slice(index + p.length, terms.length);

    if (end.length > 0) {
      result.after = this.buildFrom(end[0].id, end.length, this.pool);
    }

    return result;
  };

  var _04Split = {
    append: append_1,
    prepend: prepend_1,
    "delete": delete_1,
    replace: replace,
    splitOn: splitOn
  };

  var methods$1 = Object.assign({}, _01Utils, _02Out, _03Change, _04Split);

  // try to avoid doing the match
  var failFast = function failFast(terms, regs) {
    if (regs.length === 0) {
      return true;
    }

    for (var i = 0; i < regs.length; i += 1) {
      var reg = regs[i]; //logical quick-ones

      if (reg.optional !== true) {
        //this is not possible
        if (reg.anything === true && reg.negative === true) {
          return true;
        } //start/end impossibilites


        if (reg.start === true && i > 0) {
          return true;
        }

        if (reg.end === true && i < regs.length - 1) {
          return true;
        }

        if (reg.start === true && reg.end === true && terms.length > 1) {
          return true;
        } //empty choices


        if (reg.choices && reg.choices.length === 0) {
          return true;
        }
      }
    }

    return false;
  };

  var _02FailFast = failFast;

  //found a match? it's greedy? keep going!
  var getGreedy = function getGreedy(terms, t, reg, until) {
    for (; t < terms.length; t += 1) {
      //stop for next-reg match
      if (until && terms[t].doesMatch(until)) {
        return t;
      } //stop here


      if (terms[t].doesMatch(reg) === false) {
        return t;
      }
    }

    return t;
  }; //'unspecific greedy' is a weird situation.


  var greedyTo = function greedyTo(terms, t, nextReg) {
    //if there's no next one, just go off the end!
    if (!nextReg) {
      return terms.length;
    } //otherwise, we're looking for the next one


    for (; t < terms.length; t += 1) {
      if (terms[t].doesMatch(nextReg) === true) {
        return t;
      }
    } //guess it doesn't exist, then.


    return null;
  };
  /** tries to match a sequence of terms, starting from here */


  var tryHere = function tryHere(terms, regs) {
    var captures = [];
    var t = 0; // we must satisfy each rule in 'regs'

    for (var r = 0; r < regs.length; r += 1) {
      var reg = regs[r]; //should we fail here?

      if (!terms[t]) {
        //are all remaining regs optional?
        var hasNeeds = regs.slice(r).some(function (remain) {
          return !remain.optional;
        });

        if (hasNeeds === false) {
          break;
        } // have unmet needs


        return false;
      } //support 'unspecific greedy' properly


      if (reg.anything === true && reg.greedy === true) {
        var skipto = greedyTo(terms, t, regs[r + 1]); //TODO: support [*] properly

        if (skipto === null) {
          return false; //couldn't find it
        }

        t = skipto;
        continue;
      } //if it looks like a match, continue


      if (reg.anything === true || terms[t].doesMatch(reg) === true) {
        var startAt = t; //advance to the next term!

        t += 1; //check any ending '$' flags

        if (reg.end === true) {
          //if this isn't the last term, refuse the match
          if (t !== terms.length && reg.greedy !== true) {
            return false;
          }
        } //try keep it going!


        if (reg.greedy === true) {
          t = getGreedy(terms, t, reg, regs[r + 1]);
        }

        if (reg.capture) {
          captures.push(startAt); //add greedy-end to capture

          if (t > 1 && reg.greedy) {
            captures.push(t - 1);
          }
        }

        continue;
      } //bah, who cares, keep going


      if (reg.optional === true) {
        continue;
      } // console.log('   ❌\n\n')


      return false;
    } //we got to the end of the regs, and haven't failed!
    //try to only return our [captured] segment


    if (captures.length > 0) {
      //make sure the array is the full-length we'd return anyways
      var arr = terms.slice(captures[0], captures[captures.length - 1] + 1); //make sure the array is t-length (so we skip ahead full-length)

      for (var tmp = 0; tmp < t; tmp++) {
        arr[tmp] = arr[tmp] || null;
      }

      return arr;
    } //return our result


    return terms.slice(0, t);
  };

  var _03TryMatch = tryHere;

  /* break-down a match expression into this:
  {
    clean:'',
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
  var end = function end(str) {
    return str[str.length - 1];
  };

  var start = function start(str) {
    return str[0];
  };

  var stripStart = function stripStart(str) {
    return str.substr(1);
  };

  var stripEnd = function stripEnd(str) {
    return str.substr(0, str.length - 1);
  };

  var stripBoth = function stripBoth(str) {
    str = stripStart(str);
    str = stripEnd(str);
    return str;
  }; //


  var token = function token(w) {
    var obj = {}; //collect any flags (do it twice)

    for (var i = 0; i < 2; i += 1) {
      //back-flags
      if (end(w) === '+') {
        obj.greedy = true;
        w = stripEnd(w);
      }

      if (w !== '*' && end(w) === '*') {
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
      } //front-flags


      if (start(w) === '^') {
        obj.start = true;
        w = stripStart(w);
      }

      if (start(w) === '!') {
        obj.negative = true;
        w = stripStart(w);
      } //wrapped-flags


      if (start(w) === '(' && end(w) === ')') {
        obj.choices = w.split('|'); //remove '(' and ')'

        obj.choices[0] = stripStart(obj.choices[0]);
        var last = obj.choices.length - 1;
        obj.choices[last] = stripEnd(obj.choices[last]);
        obj.choices = obj.choices.filter(function (s) {
          return s;
        }); //recursion alert!

        obj.choices = obj.choices.map(token);
        w = '';
      } //capture group (this one can span multiple-terms)


      if (start(w) === '[' || end(w) === ']') {
        obj.capture = true;
        w = w.replace(/^\[/, '');
        w = w.replace(/\]$/, '');
      } //regex


      if (start(w) === '/' && end(w) === '/') {
        w = stripBoth(w);
        obj.regex = new RegExp(w);
        return obj;
      }
    } //do the actual token content


    if (start(w) === '#') {
      obj.tag = stripStart(w);
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
      obj.word = w.toLowerCase();
    }

    return obj;
  };

  var parseToken = token;

  var isArray$1 = function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }; //split-up by (these things)


  var byParentheses = function byParentheses(str) {
    var arr = str.split(/(\[?\(.*?\)[?+*]*\]?\$?)/);
    arr = arr.map(function (s) {
      return s.trim();
    });
    return arr;
  };

  var byWords = function byWords(arr) {
    var words = [];
    arr.forEach(function (a) {
      //keep brackets lumped together
      if (/^[[^_/]?\(/.test(a[0])) {
        words.push(a);
        return;
      }

      var list = a.split(' ');
      list = list.filter(function (w) {
        return w;
      });
      words = words.concat(list);
    });
    return words;
  }; //turn an array into a 'choices' list


  var byArray = function byArray(arr) {
    return [{
      choices: arr.map(function (s) {
        return {
          word: s
        };
      })
    }];
  };

  var postProcess = function postProcess(tokens) {
    //ensure there's only one consecutive capture group.
    var count = tokens.filter(function (t) {
      return t.capture === true;
    }).length;

    if (count > 1) {
      var captureArr = tokens.map(function (t) {
        return t.capture;
      });
      var first = captureArr.indexOf(true);
      var last = captureArr.length - 1 - captureArr.reverse().indexOf(true); //'fill in' capture groups between start-end

      for (var i = first; i < last; i++) {
        tokens[i].capture = true;
      }
    }

    return tokens;
  };

  var fromDoc = function fromDoc(doc) {
    if (!doc || !doc.list || !doc.list[0]) {
      return [];
    }

    return doc.list[0].terms().map(function (t) {
      return {
        id: t.id
      };
    });
  };
  /** parse a match-syntax string into json */


  var syntax = function syntax(input) {
    // fail-fast
    if (input === null || input === undefined || input === '') {
      return [];
    } //try to support a ton of different formats:


    if (_typeof(input) === 'object') {
      if (isArray$1(input)) {
        if (input.length === 0 || !input[0]) {
          return [];
        } //is it a pre-parsed reg-list?


        if (_typeof(input[0]) === 'object') {
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

    var tokens = byParentheses(input);
    tokens = byWords(tokens);
    tokens = tokens.map(parseToken); //clean up anything weird

    tokens = postProcess(tokens);
    return tokens;
  };

  var syntax_1 = syntax;

  /**  returns a simple array of arrays */

  var matchAll = function matchAll(p, regs) {
    var matchOne = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    //if we forgot to parse it..
    if (typeof regs === 'string') {
      regs = syntax_1(regs);
    }

    var terms = p.terms(); //try to dismiss it, at-once

    if (_02FailFast(terms, regs) === true) {
      return [];
    } //any match needs to be this long, at least


    var minLength = regs.filter(function (r) {
      return r.optional !== true;
    }).length;
    var matches = []; //optimisation for '^' start logic

    if (regs[0].start === true) {
      var match = _03TryMatch(terms, regs);

      if (match !== false && match.length > 0) {
        matches.push(match);
      }

      return matches;
    } //try starting, from every term


    for (var i = 0; i < terms.length; i += 1) {
      // slice may be too short
      if (i + minLength > terms.length) {
        break;
      } //try it!
      // console.log('- #' + i);


      var _match = _03TryMatch(terms.slice(i), regs);

      if (_match !== false && _match.length > 0) {
        //zoom forward!
        i += _match.length - 1; //[capture-groups] return some null responses

        _match = _match.filter(function (m) {
          return m;
        });
        matches.push(_match); //ok, maybe that's enough?

        if (matchOne === true) {
          return matches;
        }
      }
    }

    return matches;
  };

  var _01MatchAll = matchAll;

  /** return anything that doesn't match.
   * returns a simple array of arrays
   */

  var notMatch = function notMatch(p, regs) {
    var found = {};
    var arr = _01MatchAll(p, regs);
    arr.forEach(function (ts) {
      ts.forEach(function (t) {
        found[t.id] = true;
      });
    }); //return anything not found

    var terms = p.terms();
    var result = [];
    var current = [];
    terms.forEach(function (t) {
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

  var not = notMatch;

  /** return an array of matching phrases */

  var match_1 = function match_1(str) {
    var _this = this;

    var matches = _01MatchAll(this, str); //make them phrase objects

    matches = matches.map(function (list) {
      return _this.buildFrom(list[0].id, list.length);
    });
    return matches;
  };
  /** return boolean if one match is found */


  var has = function has(str) {
    var matches = _01MatchAll(this, str, true);
    return matches.length > 0;
  };
  /** remove all matches from the result */


  var not$1 = function not$1(str) {
    var _this2 = this;

    var matches = not(this, str); //make them phrase objects

    matches = matches.map(function (list) {
      return _this2.buildFrom(list[0].id, list.length);
    });
    return matches;
  };
  /** return a list of phrases that can have this tag */


  var canBe$1 = function canBe(tag, world) {
    var _this3 = this;

    var results = [];
    var terms = this.terms();
    var previous = false;

    for (var i = 0; i < terms.length; i += 1) {
      var can = terms[i].canBe(tag, world);

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


    results = results.filter(function (a) {
      return a.length > 0;
    }).map(function (arr) {
      return _this3.buildFrom(arr[0].id, arr.length);
    });
    return results;
  };

  var match = {
    match: match_1,
    has: has,
    not: not$1,
    canBe: canBe$1
  };

  var Phrase = function Phrase(id, length, pool) {
    _classCallCheck(this, Phrase);

    this.start = id;
    this.length = length;
    this.isA = 'Phrase'; // easier than .constructor...

    Object.defineProperty(this, 'pool', {
      enumerable: false,
      writable: true,
      value: pool
    });
  };
  /** create a new Phrase object from an id and length */


  Phrase.prototype.buildFrom = function (id, length) {
    return new Phrase(id, length, this.pool);
  }; //apply methods


  Object.assign(Phrase.prototype, match);
  Object.assign(Phrase.prototype, methods$1); //apply aliases

  var aliases = {
    term: 'terms'
  };
  Object.keys(aliases).forEach(function (k) {
    return Phrase.prototype[k] = Phrase.prototype[aliases[k]];
  });
  var Phrase_1 = Phrase;

  /** a key-value store of all terms in our Document */
  var Pool =
  /*#__PURE__*/
  function () {
    function Pool() {
      var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Pool);

      //quiet this property in console.logs
      Object.defineProperty(this, 'words', {
        enumerable: false,
        value: words
      });
    }
    /** throw a new term object in */


    _createClass(Pool, [{
      key: "add",
      value: function add(term) {
        this.words[term.id] = term;
        return this;
      }
      /** find a term by it's id */

    }, {
      key: "get",
      value: function get(id) {
        return this.words[id];
      }
      /** find a term by it's id */

    }, {
      key: "remove",
      value: function remove(id) {
        delete this.words[id];
      }
      /** helper method */

    }, {
      key: "stats",
      value: function stats() {
        return {
          words: Object.keys(this.words).length
        };
      }
    }]);

    return Pool;
  }();
  /** make a deep-copy of all terms */


  Pool.prototype.clone = function () {
    var _this = this;

    var keys = Object.keys(this.words);
    var words = keys.reduce(function (h, k) {
      var t = _this.words[k].clone();

      h[t.id] = t;
      return h;
    }, {});
    return new Pool(words);
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
  var initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g;
  var hasSomething = /\S/;
  var isAcronym$1 = /[ .][A-Z]\.? *$/i;
  var hasEllipse = /(?:\u2026|\.{2,}) *$/;
  var newLine = /((?:\r?\n|\r)+)/; // Match different new-line formats

  var hasLetter = /[a-z\u00C0-\u00FF]/i;
  var startWhitespace = /^\s+/; // Start with a regex:

  var naiive_split = function naiive_split(text) {
    var all = []; //first, split by newline

    var lines = text.split(newLine);

    for (var i = 0; i < lines.length; i++) {
      //split by period, question-mark, and exclamation-mark
      var arr = lines[i].split(initSplit);

      for (var o = 0; o < arr.length; o++) {
        all.push(arr[o]);
      }
    }

    return all;
  };
  /** does this look like a sentence? */


  var isSentence = function isSentence(str, abbrevs) {
    // check for 'F.B.I.'
    if (isAcronym$1.test(str) === true) {
      return false;
    } //check for '...'


    if (hasEllipse.test(str) === true) {
      return false;
    } // must have a letter


    if (hasLetter.test(str) === false) {
      return false;
    }

    var txt = str.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, '');
    var words = txt.split(' ');
    var lastWord = words[words.length - 1].toLowerCase(); // check for 'Mr.'

    if (abbrevs.hasOwnProperty(lastWord)) {
      return false;
    } // //check for jeopardy!
    // if (blacklist.hasOwnProperty(lastWord)) {
    //   return false
    // }


    return true;
  };

  var splitSentences = function splitSentences(text, world) {
    var abbrevs = world.cache.abbreviations;
    text = text || '';
    text = String(text);
    var sentences = []; // First do a greedy-split..

    var chunks = []; // Ensure it 'smells like' a sentence

    if (!text || typeof text !== 'string' || hasSomething.test(text) === false) {
      return sentences;
    } // Start somewhere:


    var splits = naiive_split(text); // Filter-out the crap ones

    for (var i = 0; i < splits.length; i++) {
      var s = splits[i];

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


    for (var _i = 0; _i < chunks.length; _i++) {
      var c = chunks[_i]; //should this chunk be combined with the next one?

      if (chunks[_i + 1] && isSentence(c, abbrevs) === false) {
        chunks[_i + 1] = c + (chunks[_i + 1] || '');
      } else if (c && c.length > 0 && hasLetter.test(c)) {
        //this chunk is a proper sentence..
        sentences.push(c);
        chunks[_i] = '';
      }
    } //if we never got a sentence, return the given text


    if (sentences.length === 0) {
      return [text];
    } //move whitespace to the ends of sentences, when possible
    //['hello',' world'] -> ['hello ','world']


    for (var _i2 = 1; _i2 < sentences.length; _i2 += 1) {
      var ws = sentences[_i2].match(startWhitespace);

      if (ws !== null) {
        sentences[_i2 - 1] += ws[0];
        sentences[_i2] = sentences[_i2].replace(startWhitespace, '');
      }
    }

    return sentences;
  };

  var _01Sentences = splitSentences; // console.log(sentence_parser('john f. kennedy'));

  var wordlike = /\S/;
  var isBoundary = /^[!?.]+$/;
  var naiiveSplit = /(\S+)/;
  var notWord = {
    '.': true,
    '-': true,
    //dash
    '–': true,
    //en-dash
    '—': true,
    //em-dash
    '--': true,
    '...': true,
    '/': true // 'one / two'

  };

  var hasHyphen = function hasHyphen(str) {
    //dont split 're-do'
    if (/^(re|un)-?[^aeiou]./.test(str) === true) {
      return false;
    } //letter-number


    var reg = /^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i;

    if (reg.test(str) === true) {
      return true;
    } //support weird number-emdash combo '2010–2011'


    var reg2 = /^([0-9]+)(–|—)([0-9].*)/i;

    if (reg2.test(str)) {
      return true;
    }

    return false;
  };

  var splitHyphens = function splitHyphens(word) {
    var arr = []; //support multiple-hyphenated-terms

    var hyphens = word.split(/[-–—]/);

    for (var o = 0; o < hyphens.length; o++) {
      if (o === hyphens.length - 1) {
        arr.push(hyphens[o]);
      } else {
        arr.push(hyphens[o] + '-');
      }
    }

    return arr;
  }; //turn a string into an array of terms (naiive for now, lumped later)


  var splitWords = function splitWords(str) {
    var result = [];
    var arr = []; //start with a naiive split

    str = str || '';

    if (typeof str === 'number') {
      str = String(str);
    }

    var words = str.split(naiiveSplit);

    for (var i = 0; i < words.length; i++) {
      //split 'one-two'
      if (hasHyphen(words[i]) === true) {
        arr = arr.concat(splitHyphens(words[i]));
        continue;
      }

      arr.push(words[i]);
    } //greedy merge whitespace+arr to the right


    var carry = '';

    for (var _i = 0; _i < arr.length; _i++) {
      var word = arr[_i]; //if it's more than a whitespace

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


    if (carry && result.length > 0) {
      result[result.length - 1] += carry; //put it on the end
    }

    return result;
  };

  var _02Words = splitWords;

  var addLinks = function addLinks(terms) {
    terms.forEach(function (term, i) {
      if (i > 0) {
        term.prev = terms[i - 1].id;
      }

      if (terms[i + 1]) {
        term.next = terms[i + 1].id;
      }
    });
  };
  /** turn a string into an array of Phrase objects */


  var fromText = function fromText() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var world = arguments.length > 1 ? arguments[1] : undefined;
    var pool = arguments.length > 2 ? arguments[2] : undefined;

    //a bit of validation, first
    if (typeof text !== 'string') {
      if (typeof text === 'number') {
        text = String(text);
      }
    } //tokenize into words


    var sentences = _01Sentences(text, world);
    sentences = sentences.map(function (str) {
      return _02Words(str);
    }); //turn them into proper objects

    pool = pool || new Pool_1();
    var phrases = sentences.map(function (terms) {
      terms = terms.map(function (str) {
        var term = new Term_1(str);
        pool.add(term);
        return term;
      }); //add next/previous ids

      addLinks(terms); //return phrase objects

      return new Phrase_1(terms[0].id, terms.length, pool);
    }); //return them ready for a Document object

    return phrases;
  };
  /** create a word-pool and Phrase objects from .json() results*/


  var fromJSON = function fromJSON(data) {
    var pool = new Pool_1(); //create Phrase objects

    var phrases = data.map(function (terms) {
      //create Term objects
      terms = terms.map(function (obj) {
        var term = new Term_1(obj.text);
        term.pre = obj.pre;
        term.post = obj.post;
        term.tags = obj.tags.reduce(function (h, tag) {
          h[tag] = true;
          return h;
        }, {});
        pool.add(term);
        return term;
      }); //add prev/next links

      addLinks(terms);
      return new Phrase_1(terms[0].id, terms.length, pool);
    });
    return phrases;
  };

  var _01Tokenizer = {
    fromText: fromText,
    fromJSON: fromJSON
  };

  var _version = '0.0.0';

  var _data = {
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
    "Singular": "true¦a0Hb07cZdTeQfMgLhHici0Ljel0Ikitty,lGmEnDoCp8question mark,r7s4t1us 0;doll01st03; rex,a1h0ic,ragedy,v show;ere,i0I;l0Ex return;ky,t0uper bowl,yst0H;ri0Fu0;dLff;al0Ai0Doom;a2i07r1u0;dDrpo9;erogaNobl0B;rt,tG;bjKcean,thers;othi07umb02;ayf03eeUo0;del,nopo02;i01unch;ead start,o0;lZme1u0;se;! run;adfWirlPlaciUod,rand slam,ulW;amiVly,olVr1un0;diX;iNo0;ntiQsJ;conomy,gg,ner4v1x0;ampLecu6;ent;e2innMo0ragonfO;cumentBg0iNlNor;gy;ath,t0;ec0;tive;a5eiliLh3i1o0redit card;ttage,uE;ty,vil w0;ar;andeliCocol0;ate;n0r9;ary;a6elAlesCo2reakfast,u0;n0tterf9;tiB;dy,tt2y0;fri0;end;le;nki6r0;ri0;er;d1l0noma0;ly; homin2verti0;si0;ng;em",
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
    "Person": "true¦a01bZcTdQeOfMgJhHinez,jFkEleDmAnettPo9p7r4s3t2uncle,v0womL;a0irgin maH;lentino rossi,n go3;heresa may,iger woods,yra banks;addam hussaQcarlett johanssRistZlobodan milosevic,omeone,tepGuC;ay romano,eese witherspoQo1ush limbau0;gh;d stewart,naldinho;a0ipV;lmUris hiltM;prah winfrOra;an,essiaen,itt romnNo0ubarek;m0thR;!my;bron james,e;anye west,iefer sutherland,obe bryaN;aime,effersFk rowli0;ng;alle ber0itlLulk hog3;ry;astBentlem1irl,rand0uy;fa2mo2;an;a0ella;thF;ff0meril lagasse,zekiel;ie;a0enzel washingt4ick wolf,ude;d0lt3nte;!dy;ar2lint1ous0ruz;in;on;dinal wols1son0;! palm5;ey;arack obama,oy,ro0;!ck,th2;shton kutch1u0;nt;er",
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
  var conflicts = [//top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email', 'Emoji'], //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'], //acronyms
  ['Acronym', 'Pronoun', 'Actor', 'Unit', 'Address'], ['Acronym', 'Plural'], //things that can't be plural
  ['Plural', 'Singular'], //exlusive-people
  ['MaleName', 'FemaleName'], ['FirstName', 'LastName', 'Honorific'], //adjectives
  ['Comparative', 'Superlative'], //values
  ['Value', 'Verb', 'Adjective'], ['Ordinal', 'Cardinal'], ['TextValue', 'NumericValue'], ['NiceNumber', 'TextValue'], ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['PastTense', 'PresentTense', 'FutureTense'], ['Pluperfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund', 'FuturePerfect', 'PerfectTense'], ['Auxiliary', 'Noun', 'Value'], //date
  ['Month', 'WeekDay', 'Year', 'Duration', 'Holiday'], ['Particle', 'Conjunction', 'Adverb', 'Preposition', 'Date'], ['Date', 'Verb', 'Adjective', 'Person'], ['Date', 'Money', 'RomanNumeral', 'Fraction'], //a/an -> 1
  ['Value', 'Determiner'], ['Url', 'Value', 'HashTag', 'PhoneNumber', 'Emoji'], //roman numerals
  ['RomanNumeral', 'Fraction', 'NiceNumber'], ['RomanNumeral', 'Money', 'Acronym'], //cases
  ['UpperCase', 'TitleCase', 'CamelCase'], //phrases
  ['Verb', 'Noun', 'Adjective', 'Value'], //VerbPhrase',
  //QuestionWord
  ['QuestionWord', 'Verb'], //acronyms
  ['Acronym', 'Verb']];

  var nouns = {
    Noun: {},
    // - singular
    Singular: {
      isA: 'Noun'
    },
    //a specific thing that's capitalized
    ProperNoun: {
      isA: 'Noun'
    },
    // -- people
    Person: {
      isA: 'ProperNoun',
      also: 'Singular'
    },
    FirstName: {
      isA: 'Person'
    },
    MaleName: {
      isA: 'FirstName'
    },
    FemaleName: {
      isA: 'FirstName'
    },
    LastName: {
      isA: 'Person'
    },
    Honorific: {
      isA: 'Noun'
    },
    Place: {
      isA: 'Singular'
    },
    // -- places
    Country: {
      isA: 'Place',
      also: 'ProperNoun'
    },
    City: {
      isA: 'Place',
      also: 'ProperNoun'
    },
    Region: {
      isA: 'Place',
      also: 'ProperNoun'
    },
    Address: {
      isA: 'Place'
    },
    Organization: {
      isA: 'Singular',
      also: 'ProperNoun'
    },
    SportsTeam: {
      isA: 'Organization'
    },
    Company: {
      isA: 'Organization'
    },
    School: {
      isA: 'Organization'
    },
    // - plural
    Plural: {
      isA: 'Noun'
    },
    Uncountable: {
      //(not plural or singular)
      isA: 'Noun'
    },
    Pronoun: {
      isA: 'Noun'
    },
    //a word for someone doing something -'plumber'
    Actor: {
      isA: 'Noun'
    },
    //a gerund-as-noun - 'swimming'
    Activity: {
      isA: 'Noun'
    },
    //'kilograms'
    Unit: {
      isA: 'Noun'
    },
    //'Canadians'
    Demonym: {
      isA: 'Noun',
      also: 'ProperNoun'
    },
    //`john's`
    Possessive: {
      isA: 'Noun'
    }
  };

  var verbs = {
    Verb: {// isA: 'VerbPhrase',
    },
    PresentTense: {
      isA: 'Verb'
    },
    Infinitive: {
      isA: 'PresentTense'
    },
    Gerund: {
      isA: 'PresentTense'
    },
    PastTense: {
      isA: 'Verb'
    },
    PerfectTense: {
      isA: 'Verb'
    },
    FuturePerfect: {
      isA: 'Verb'
    },
    Pluperfect: {
      isA: 'Verb'
    },
    Copula: {
      isA: 'Verb'
    },
    Modal: {
      isA: 'Verb'
    },
    Participle: {
      isA: 'Verb'
    },
    Particle: {
      isA: 'Verb'
    },
    PhrasalVerb: {
      isA: 'Verb'
    }
  };

  var values = {
    Value: {},
    Ordinal: {
      isA: 'Value'
    },
    Cardinal: {
      isA: 'Value'
    },
    // Multiple: {
    //   isA: 'Value',
    // },
    RomanNumeral: {
      isA: 'Cardinal'
    },
    Fraction: {
      isA: 'Value'
    },
    TextValue: {
      isA: 'Value'
    },
    NumericValue: {
      isA: 'Value'
    },
    Money: {//isA: 'Cardinal'
    },
    Percent: {
      isA: 'Value'
    }
  };

  var dates = {
    Date: {},
    //not a noun, but usually is
    Month: {
      isA: 'Date',
      also: 'Singular'
    },
    WeekDay: {
      isA: 'Date',
      also: 'Noun'
    },
    RelativeDay: {
      isA: 'Date'
    },
    Year: {
      isA: 'Date'
    },
    Duration: {
      isA: 'Date',
      also: 'Noun'
    },
    Time: {
      isA: 'Date',
      also: 'Noun'
    },
    Holiday: {
      isA: 'Date',
      also: 'Noun'
    }
  };

  var misc = {
    Adjective: {},
    Comparable: {
      isA: 'Adjective'
    },
    Comparative: {
      isA: 'Adjective'
    },
    Superlative: {
      isA: 'Adjective'
    },
    NumberRange: {
      isA: 'Contraction'
    },
    Adverb: {},
    Currency: {},
    //glue
    Determiner: {},
    Conjunction: {},
    Preposition: {},
    QuestionWord: {},
    RelativeProunoun: {
      isA: 'Pronoun'
    },
    Expression: {},
    Abbreviation: {},
    Url: {},
    PhoneNumber: {},
    HashTag: {},
    AtMention: {
      isA: 'Noun'
    },
    Emoji: {},
    Email: {},
    //non-exclusive
    Auxiliary: {},
    Negative: {},
    Contraction: {},
    TitleCase: {},
    CamelCase: {},
    UpperCase: {},
    Hyphenated: {},
    Acronym: {},
    ClauseEnd: {},
    // Quotes
    Quotation: {},
    StartQuotation: {
      isA: 'Quotation'
    },
    EndQuotation: {
      isA: 'Quotation'
    },
    //parentheses
    Parentheses: {},
    EndBracket: {
      isA: 'Parentheses'
    },
    StartBracket: {
      isA: 'Parentheses'
    }
  };

  //add 'downward' tags (that immediately depend on this one)
  var addDownword = function addDownword(tags) {
    var keys = Object.keys(tags);
    keys.forEach(function (k) {
      tags[k].downward = []; //look for tags with this as parent

      for (var i = 0; i < keys.length; i++) {
        if (tags[keys[i]].isA && tags[keys[i]].isA === k) {
          tags[k].downward.push(keys[i]);
        }
      }
    });
  };

  var addDownward = addDownword;

  var colors = {
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
    Adverb: 'cyan' // Condition: 'cyan',

  }; //extend tagset with new tags

  var addIn = function addIn(obj, tags) {
    Object.keys(obj).forEach(function (k) {
      tags[k] = obj[k];
    });
  }; //add tags to remove when tagging this one


  var addConflicts = function addConflicts(tags) {
    Object.keys(tags).forEach(function (k) {
      tags[k].notA = {};

      for (var i = 0; i < conflicts.length; i++) {
        var arr = conflicts[i];

        if (arr.indexOf(k) !== -1) {
          arr = arr.filter(function (a) {
            return a !== k;
          });
          arr.forEach(function (e) {
            tags[k].notA[e] = true;
          });
        }
      }

      tags[k].notA = Object.keys(tags[k].notA);
    });
  };

  var addColors = function addColors(tags) {
    Object.keys(tags).forEach(function (k) {
      if (colors[k]) {
        tags[k].color = colors[k];
        return;
      }

      if (tags[k].isA && colors[tags[k].isA]) {
        tags[k].color = colors[tags[k].isA];
        return;
      }

      if (tags[k].isA && tags[tags[k].isA].color) {
        tags[k].color = tags[tags[k].isA].color;
      }
    });
  };

  var build = function build() {
    var tags = {};
    addIn(nouns, tags);
    addIn(verbs, tags);
    addIn(values, tags);
    addIn(dates, tags);
    addIn(misc, tags); //downstream

    addDownward(tags); //add enemies

    addConflicts(tags); //for nice-logging

    addColors(tags);
    return tags;
  };

  var tags = build();

  var seq = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      cache = seq.split("").reduce(function (n, o, e) {
    return n[o] = e, n;
  }, {}),
      toAlphaCode = function toAlphaCode(n) {
    if (void 0 !== seq[n]) return seq[n];
    var o = 1,
        e = 36,
        t = "";

    for (; n >= e; n -= e, o++, e *= 36) {
    }

    for (; o--;) {
      var _o = n % 36;

      t = String.fromCharCode((_o < 10 ? 48 : 55) + _o) + t, n = (n - _o) / 36;
    }

    return t;
  },
      fromAlphaCode = function fromAlphaCode(n) {
    if (void 0 !== cache[n]) return cache[n];
    var o = 0,
        e = 1,
        t = 36,
        r = 1;

    for (; e < n.length; o += t, e++, t *= 36) {
    }

    for (var _e = n.length - 1; _e >= 0; _e--, r *= 36) {
      var _t = n.charCodeAt(_e) - 48;

      _t > 10 && (_t -= 7), o += _t * r;
    }

    return o;
  };

  var encoding = {
    toAlphaCode: toAlphaCode,
    fromAlphaCode: fromAlphaCode
  },
      symbols = function symbols(n) {
    var o = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");

    for (var e = 0; e < n.nodes.length; e++) {
      var t = o.exec(n.nodes[e]);

      if (!t) {
        n.symCount = e;
        break;
      }

      n.syms[encoding.fromAlphaCode(t[1])] = encoding.fromAlphaCode(t[2]);
    }

    n.nodes = n.nodes.slice(n.symCount, n.nodes.length);
  };

  var indexFromRef = function indexFromRef(n, o, e) {
    var t = encoding.fromAlphaCode(o);
    return t < n.symCount ? n.syms[t] : e + t + 1 - n.symCount;
  },
      toArray = function toArray(n) {
    var o = [],
        e = function e(t, r) {
      var s = n.nodes[t];
      "!" === s[0] && (o.push(r), s = s.slice(1));
      var c = s.split(/([A-Z0-9,]+)/g);

      for (var _s = 0; _s < c.length; _s += 2) {
        var u = c[_s],
            i = c[_s + 1];
        if (!u) continue;
        var l = r + u;

        if ("," === i || void 0 === i) {
          o.push(l);
          continue;
        }

        var f = indexFromRef(n, i, t);
        e(f, l);
      }
    };

    return e(0, ""), o;
  },
      unpack = function unpack(n) {
    var o = {
      nodes: n.split(";"),
      syms: [],
      symCount: 0
    };
    return n.match(":") && symbols(o), toArray(o);
  };

  var unpack_1 = unpack,
      unpack_1$1 = function unpack_1$1(n) {
    var o = n.split("|").reduce(function (n, o) {
      var e = o.split("¦");
      return n[e[0]] = e[1], n;
    }, {}),
        e = {};
    return Object.keys(o).forEach(function (n) {
      var t = unpack_1(o[n]);
      "true" === n && (n = !0);

      for (var _o2 = 0; _o2 < t.length; _o2++) {
        var r = t[_o2];
        !0 === e.hasOwnProperty(r) ? !1 === Array.isArray(e[r]) ? e[r] = [e[r], n] : e[r].push(n) : e[r] = n;
      }
    }), e;
  };

  var efrtUnpack_min = unpack_1$1;

  //safely add it to the lexicon
  var addWord = function addWord(word, tag, lex) {
    if (lex[word] !== undefined) {
      if (typeof lex[word] === 'string') {
        lex[word] = [lex[word]];
      }

      lex[word].push(tag);
    } else {
      lex[word] = tag;
    }
  }; // blast-out more forms for some given words


  var addMore = function addMore(word, tag, world) {
    var lexicon = world.lexicon;
    var transform = world.transforms; // cache multi-words

    var words = word.split(' ');

    if (words.length > 1) {
      //cache the beginning word
      world.hasCompound[words[0]] = true;
    } // inflect our nouns


    if (tag === 'Singular') {
      var plural = transform.nouns(word);
      lexicon[plural] = lexicon[plural] || 'Plural'; // only if it's safe
    } //conjugate our verbs


    if (tag === 'Infinitive') {
      var conj = transform.verbs(word);
      var tags = Object.keys(conj);

      for (var i = 0; i < tags.length; i++) {
        var w = conj[tags[i]];
        lexicon[w] = lexicon[w] || tags[i]; // only if it's safe
      }
    } //derive more adjective forms


    if (tag === 'Comparable') {
      var _conj = transform.adjectives(word);

      var _tags = Object.keys(_conj);

      for (var _i = 0; _i < _tags.length; _i++) {
        var _w = _conj[_tags[_i]];
        lexicon[_w] = lexicon[_w] || _tags[_i]; // only if it's safe
      }
    } //conjugate phrasal-verbs


    if (tag === 'PhrasalVerb') {
      //add original form
      addWord(word, 'Infinitive', lexicon); //conjugate first word

      var _conj2 = transform.verbs(words[0]);

      var _tags2 = Object.keys(_conj2);

      for (var _i2 = 0; _i2 < _tags2.length; _i2++) {
        //add it to our cache
        world.hasCompound[_conj2[_tags2[_i2]]] = true; //first + last words

        var _w2 = _conj2[_tags2[_i2]] + ' ' + words[1];

        addWord(_w2, _tags2[_i2], lexicon);
        addWord(_w2, 'PhrasalVerb', lexicon);
      }
    } // inflect our demonyms - 'germans'


    if (tag === 'Demonym') {
      var _plural = transform.nouns(word);

      lexicon[_plural] = lexicon[_plural] || ['Demonym', 'Plural']; // only if it's safe
    }
  }; // throw a bunch of words in our lexicon


  var addWords = function addWords(words, tag, world) {
    var lexicon = world.lexicon;

    for (var i = 0; i < words.length; i++) {
      addWord(words[i], tag, lexicon); // do some fancier stuff

      addMore(words[i], tag, world);
    }
  };

  var addWords_1 = addWords;

  // add words from plurals and conjugations data
  var addIrregulars = function addIrregulars(world) {
    //add irregular plural nouns
    var nouns = world.irregulars.nouns;
    var words = Object.keys(nouns);

    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      world.lexicon[w] = 'Singular';
      world.lexicon[nouns[w]] = 'Plural';
    } // add irregular verb conjugations


    var verbs = world.irregulars.verbs;
    var keys = Object.keys(verbs);

    var _loop = function _loop(_i) {
      var inf = keys[_i]; //add only if it it's safe...

      world.lexicon[inf] = world.lexicon[inf] || 'Infinitive';
      var forms = world.transforms.verbs(inf);
      forms = Object.assign(forms, verbs[inf]); //add the others

      Object.keys(forms).forEach(function (tag) {
        world.lexicon[forms[tag]] = world.lexicon[forms[tag]] || tag;
      });
    };

    for (var _i = 0; _i < keys.length; _i++) {
      _loop(_i);
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
    q4: 'Date'
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
    zero: 'zeros'
  };

  // a list of irregular verb conjugations
  // used in verbs().conjugate()
  // but also added to our lexicon
  //use shorter key-names
  var mapping = {
    g: 'Gerund',
    prt: 'Participle',
    perf: 'PerfectTense',
    pst: 'PastTense',
    fut: 'FuturePerfect',
    pres: 'PresentTense',
    pluperf: 'Pluperfect',
    act: 'Actor'
  }; // '_' in conjugations is the infinitive form

  var conjugations = {
    act: {
      act: '_or'
    },
    age: {
      g: 'ageing',
      pst: 'aged',
      pres: 'ages'
    },
    aim: {
      act: '_er',
      g: '_ing',
      pst: '_ed'
    },
    arise: {
      prt: '_n',
      pst: 'arose'
    },
    babysit: {
      act: '_ter',
      pst: 'babysat'
    },
    ban: {
      act: '',
      g: '_ning',
      pst: '_ned'
    },
    be: {
      act: '',
      g: 'am',
      prt: 'been',
      pst: 'was',
      pres: 'is'
    },
    beat: {
      act: '_er',
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
      act: '_ter',
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
      prt: 'bled',
      pst: 'bled'
    },
    blow: {
      prt: '_n',
      pst: 'blew'
    },
    boil: {
      act: '_er'
    },
    brake: {
      prt: 'broken'
    },
    "break": {
      pst: 'broke'
    },
    breed: {
      pst: 'bred'
    },
    bring: {
      prt: 'brought',
      pst: 'brought'
    },
    broadcast: {
      pst: '_'
    },
    budget: {
      pst: '_ed'
    },
    build: {
      prt: 'built',
      pst: 'built'
    },
    burn: {
      prt: '_ed'
    },
    burst: {
      prt: '_'
    },
    buy: {
      prt: 'bought',
      pst: 'bought'
    },
    can: {
      act: '',
      fut: '_',
      g: '',
      pst: 'could',
      perf: 'could',
      pluperf: 'could',
      pres: '_'
    },
    "catch": {
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
      pst: 'came'
    },
    compete: {
      act: 'competitor',
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
      prt: '_t',
      pst: '_t'
    },
    develop: {
      act: '_er',
      g: '_ing',
      pst: '_ed'
    },
    die: {
      g: 'dying',
      pst: '_d'
    },
    dig: {
      g: '_ging',
      prt: 'dug',
      pst: 'dug'
    },
    dive: {
      prt: '_d'
    },
    "do": {
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
      act: '_er',
      g: '_ing',
      prt: '_en',
      pst: 'ate'
    },
    edit: {
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
      act: '_er',
      pst: 'felt'
    },
    fight: {
      prt: 'fought',
      pst: 'fought'
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
      act: '',
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
    hang: {
      prt: 'hung',
      pst: 'hung'
    },
    have: {
      g: 'having',
      prt: 'had',
      pst: 'had',
      pres: 'has'
    },
    hear: {
      prt: '_d',
      pst: '_d'
    },
    hide: {
      prt: 'hidden',
      pst: 'hid'
    },
    hit: {
      prt: '_'
    },
    hold: {
      prt: 'held',
      pst: 'held'
    },
    hurt: {
      prt: '_',
      pst: '_'
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
      act: '',
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
      prt: 'laid',
      pst: 'laid'
    },
    lead: {
      prt: 'led',
      pst: 'led'
    },
    leap: {
      prt: '_t'
    },
    leave: {
      prt: 'left',
      pst: 'left'
    },
    lend: {
      prt: 'lent'
    },
    lie: {
      g: 'lying',
      pst: 'lay'
    },
    light: {
      prt: 'lit',
      pst: 'lit'
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
      prt: 'made',
      pst: 'made'
    },
    mean: {
      prt: '_t',
      pst: '_t'
    },
    meet: {
      act: '_er',
      g: '_ing',
      prt: 'met',
      pst: 'met'
    },
    miss: {
      pres: '_'
    },
    pay: {
      prt: 'paid',
      pst: 'paid'
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
      prt: '_',
      pst: '_'
    },
    ride: {
      prt: 'ridden'
    },
    ring: {
      prt: 'rung',
      pst: 'rang'
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
      prt: 'said',
      pst: 'said',
      pres: '_s'
    },
    seat: {
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
      prt: 'sold',
      pst: 'sold'
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
      prt: 'shone',
      pst: 'shone'
    },
    shoot: {
      prt: 'shot',
      pst: 'shot'
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
      prt: 'slid',
      pst: 'slid'
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
      prt: 'spun',
      pst: 'spun'
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
      act: '_er',
      pst: 'stole'
    },
    stick: {
      pst: 'stuck'
    },
    sting: {
      pst: 'stung'
    },
    stink: {
      prt: 'stunk',
      pst: 'stunk'
    },
    stream: {
      act: '_er'
    },
    strew: {
      prt: '_n'
    },
    strike: {
      g: 'striking',
      pst: 'struck'
    },
    suit: {
      act: '_er',
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
      act: '_er',
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

  var keys = Object.keys(conjugations);

  var _loop = function _loop(i) {
    var inf = keys[i];
    var _final = {};
    Object.keys(conjugations[inf]).forEach(function (key) {
      var str = conjugations[inf][key]; //swap-in infinitives for '_'

      str = str.replace('_', inf);
      var full = mapping[key];
      _final[full] = str;
    }); //over-write original

    conjugations[inf] = _final;
  };

  for (var i = 0; i < keys.length; i++) {
    _loop(i);
  }

  var conjugations_1 = conjugations;

  var endsWith = {
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
      reg: /(ake)$/i,
      repl: {
        pr: '$1s',
        pa: 'ook',
        gr: 'aking',
        ar: '$1r'
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
      reg: /([^aeiou][ou])g$/i,
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
      reg: /(..)(ow)$/i,
      repl: {
        pr: '$1$2s',
        pa: '$1ew',
        gr: '$1$2ing',
        prt: '$1$2n'
      }
    }],
    y: [{
      reg: /([i|f|rr])y$/i,
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
  var suffixes = endsWith;

  var posMap = {
    pr: 'PresentTense',
    pa: 'PastTense',
    gr: 'Gerund',
    prt: 'Participle',
    ar: 'Actor'
  };

  var doTransform = function doTransform(str, obj) {
    var found = {};
    var keys = Object.keys(obj.repl);

    for (var i = 0; i < keys.length; i += 1) {
      var pos = keys[i];
      found[posMap[pos]] = str.replace(obj.reg, obj.repl[pos]);
    }

    return found;
  }; //look at the end of the word for clues


  var checkSuffix = function checkSuffix() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var c = str[str.length - 1];

    if (suffixes.hasOwnProperty(c) === true) {
      for (var r = 0; r < suffixes[c].length; r += 1) {
        var reg = suffixes[c][r].reg;

        if (reg.test(str) === true) {
          return doTransform(str, suffixes[c][r]);
        }
      }
    }

    return {};
  };

  var _01Suffixes = checkSuffix;

  //non-specifc, 'hail-mary' transforms from infinitive, into other forms
  var hasY = /[bcdfghjklmnpqrstvwxz]y$/;
  var generic = {
    Gerund: function Gerund(inf) {
      if (inf.charAt(inf.length - 1) === 'e') {
        return inf.replace(/e$/, 'ing');
      }

      return inf + 'ing';
    },
    PresentTense: function PresentTense(inf) {
      if (inf.charAt(inf.length - 1) === 's') {
        return inf + 'es';
      }

      if (hasY.test(inf) === true) {
        return inf.slice(0, -1) + 'ies';
      }

      return inf + 's';
    },
    PastTense: function PastTense(inf) {
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

  //we assume the input word is a proper infinitive

  var fastConjugate = function fastConjugate() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var world = arguments.length > 1 ? arguments[1] : undefined;
    var found = {}; // 1. look at irregulars
    //the lexicon doesn't pass this in

    if (world && world.irregulars) {
      if (world.irregulars.verbs.hasOwnProperty(str) === true) {
        found = Object.assign({}, world.irregulars.verbs[str]);
      }
    } //2. rule-based regex


    found = Object.assign({}, found, _01Suffixes(str)); //3. generic transformations
    //'buzzing'

    if (found.Gerund === undefined) {
      found.Gerund = _02Generic.Gerund(str);
    } //'buzzed'


    if (found.PastTense === undefined) {
      found.PastTense = _02Generic.PastTense(str);
    } //'buzzes'


    if (found.PresentTense === undefined) {
      found.PresentTense = _02Generic.PresentTense(str);
    }

    return found;
  };

  var verbs$1 = fastConjugate;

  //convert 'cute' to 'cuteness'
  var irregulars = {
    clean: 'cleanliness',
    naivety: 'naivety',
    hurt: 'hurt'
  };
  var transforms = [{
    reg: /y$/,
    repl: 'iness'
  }, {
    reg: /le$/,
    repl: 'ility'
  }, {
    reg: /ial$/,
    repl: 'y'
  }, {
    reg: /al$/,
    repl: 'ality'
  }, {
    reg: /ting$/,
    repl: 'ting'
  }, {
    reg: /ring$/,
    repl: 'ring'
  }, {
    reg: /bing$/,
    repl: 'bingness'
  }, {
    reg: /sing$/,
    repl: 'se'
  }, {
    reg: /ing$/,
    repl: 'ment'
  }, {
    reg: /ess$/,
    repl: 'essness'
  }, {
    reg: /ous$/,
    repl: 'ousness'
  }];

  var to_noun = function to_noun(w) {
    if (irregulars.hasOwnProperty(w)) {
      return irregulars[w];
    }

    var lastChar = w.charAt(w.length - 1);

    if (lastChar === 'w' || lastChar === 's') {
      return null;
    }

    for (var i = 0; i < transforms.length; i++) {
      if (transforms[i].reg.test(w) === true) {
        return w.replace(transforms[i].reg, transforms[i].repl);
      }
    }

    return w + 'ness';
  };

  var toNoun = to_noun;

  //turn 'quick' into 'quickest'

  var do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
  var dont_rules = [/ary$/];
  var irregulars$1 = {
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
  var transforms$1 = [{
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

  var to_superlative = function to_superlative(str) {
    //irregulars
    if (irregulars$1.hasOwnProperty(str)) {
      return irregulars$1[str];
    } //known transforms


    for (var i = 0; i < transforms$1.length; i++) {
      if (transforms$1[i].reg.test(str)) {
        return str.replace(transforms$1[i].reg, transforms$1[i].repl);
      }
    } //dont-rules


    for (var _i = 0; _i < dont_rules.length; _i++) {
      if (dont_rules[_i].test(str) === true) {
        return null;
      }
    } //do-rules


    for (var _i2 = 0; _i2 < do_rules.length; _i2++) {
      if (do_rules[_i2].test(str) === true) {
        if (str.charAt(str.length - 1) === 'e') {
          return str + 'st';
        }

        return str + 'est';
      }
    }

    return str + 'est';
  };

  var toSuperlative = to_superlative;

  //turn 'quick' into 'quickly'
  var do_rules$1 = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];
  var dont_rules$1 = [/ary$/, /ous$/];
  var irregulars$2 = {
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
  var transforms$2 = [{
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

  var to_comparative = function to_comparative(str) {
    //known-irregulars
    if (irregulars$2.hasOwnProperty(str)) {
      return irregulars$2[str];
    } //known-transforms


    for (var i = 0; i < transforms$2.length; i++) {
      if (transforms$2[i].reg.test(str) === true) {
        return str.replace(transforms$2[i].reg, transforms$2[i].repl);
      }
    } //dont-patterns


    for (var _i = 0; _i < dont_rules$1.length; _i++) {
      if (dont_rules$1[_i].test(str) === true) {
        return null;
      }
    } //do-patterns


    for (var _i2 = 0; _i2 < do_rules$1.length; _i2++) {
      if (do_rules$1[_i2].test(str) === true) {
        return str + 'er';
      }
    } //easy-one


    if (/e$/.test(str) === true) {
      return str + 'r';
    }

    return str + 'er';
  };

  var toComparative = to_comparative;

  //turn 'quick' into 'quickly'
  var not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/, /y$/];
  var irregulars$3 = {
    bad: 'badly',
    good: 'well',
    icy: 'icily',
    idle: 'idly',
    male: 'manly',
    "public": 'publicly',
    simple: 'simply',
    single: 'singly',
    special: 'especially',
    straight: 'straight',
    vague: 'vaguely',
    whole: 'wholly'
  };
  var dontChange = ['best', 'early', 'hard', 'fast', 'wrong', 'well', 'late', 'latter', 'little', 'long', 'low'].reduce(function (h, c) {
    h[c] = true;
    return h;
  }, {});
  var transforms$3 = [{
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

  var adj_to_adv = function adj_to_adv(str) {
    if (irregulars$3.hasOwnProperty(str) === true) {
      return irregulars$3[str];
    }

    if (dontChange.hasOwnProperty(str) === true) {
      return str;
    }

    for (var i = 0; i < not_matches.length; i++) {
      if (not_matches[i].test(str) === true) {
        return null;
      }
    }

    for (var _i = 0; _i < transforms$3.length; _i++) {
      if (transforms$3[_i].reg.test(str) === true) {
        return str.replace(transforms$3[_i].reg, transforms$3[_i].repl);
      }
    }

    return str + 'ly';
  };

  var toAdverb = adj_to_adv;

  //turn an adjective like 'soft' into a verb like 'soften'
  //(don't do words like 'green' -> 'greenen')
  //these are suffices that are usually too weird
  var dontDo = ['c', 'e', 'g', 'l', 'n', 'r', 'w', 'y'].reduce(function (h, c) {
    h[c] = true;
    return h;
  }, {});
  var dontDoTwo = {
    ed: true,
    nt: true
  };
  var blacklist = {
    random: true,
    wild: true
  };
  var irregulars$4 = {
    bored: 'bore',
    red: 'redden',
    sad: 'sadden',
    fat: 'fatten',
    small: 'shrink',
    full: 'fill',
    tired: 'tire'
  };

  var toVerb = function toVerb(str) {
    if (irregulars$4.hasOwnProperty(str) === true) {
      return irregulars$4[str];
    } //don't bother with these:


    if (str.length <= 3) {
      return null;
    }

    if (blacklist.hasOwnProperty(str) === true) {
      return null;
    } //suffixes to avoid


    if (dontDo.hasOwnProperty(str[str.length - 1])) {
      return null;
    }

    var suffix = str.substr(str.length - 2);

    if (dontDoTwo.hasOwnProperty(suffix) === true) {
      return null;
    }

    if (/e$/.test(str) === true) {
      return str + 'n';
    }

    return str + 'en';
  };

  var toVerb_1 = toVerb;

  var fns$1 = {
    toNoun: toNoun,
    toSuperlative: toSuperlative,
    toComparative: toComparative,
    toAdverb: toAdverb,
    toVerb: toVerb_1
  };
  /** conjugate an adjective into other forms */

  var conjugate = function conjugate(w) {
    var res = {}; // 'greatness'

    var noun = fns$1.toNoun(w);

    if (noun) {
      res.Noun = noun;
    } // 'greatest'


    var sup = fns$1.toSuperlative(w);

    if (sup) {
      res.Superlative = sup;
    } // 'greater'


    var comp = fns$1.toComparative(w);

    if (comp) {
      res.Comparative = comp;
    } // 'greatly'


    var adv = fns$1.toAdverb(w);

    if (adv) {
      res.Adverb = adv;
    } // 'greaten' :/


    var vb = fns$1.toVerb(w);

    if (vb) {
      res.Verb = vb;
    } // res.Adjective = w


    return res;
  };

  var adjectives = conjugate;

  /** patterns for turning 'bus' to 'buses'*/
  var suffixes$1 = {
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
  var _01Suffixes$1 = suffixes$1;

  var addE = /(x|ch|sh|s|z)$/;

  var trySuffix = function trySuffix(str) {
    var c = str[str.length - 1];

    if (_01Suffixes$1.hasOwnProperty(c) === true) {
      for (var i = 0; i < _01Suffixes$1[c].length; i += 1) {
        var reg = _01Suffixes$1[c][i][0];

        if (reg.test(str) === true) {
          return str.replace(reg, _01Suffixes$1[c][i][1]);
        }
      }
    }

    return null;
  };
  /** Turn a singular noun into a plural
   * assume the given string is singular
   */


  var pluralize = function pluralize() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    //we have some rules to try-out
    var plural = trySuffix(str);

    if (plural !== null) {
      return plural;
    } //like 'church'


    if (addE.test(str)) {
      return str + 'es';
    } // ¯\_(ツ)_/¯


    return str + 's';
  };

  var nouns$1 = pluralize;

  var irregulars$5 = {
    nouns: plurals,
    verbs: conjugations_1
  }; //these behaviours are configurable & shared across some plugins

  var transforms$4 = {
    verbs: verbs$1,
    adjectives: adjectives,
    nouns: nouns$1
  };
  var _isVerbose = false;
  /** all configurable linguistic data */

  var World =
  /*#__PURE__*/
  function () {
    function World() {
      _classCallCheck(this, World);

      // quiet these properties from a console.log
      Object.defineProperty(this, 'lexicon', {
        enumerable: false,
        value: misc$1,
        writable: true
      });
      Object.defineProperty(this, 'hasCompound', {
        enumerable: false,
        value: {},
        writable: true
      });
      Object.defineProperty(this, 'irregulars', {
        enumerable: false,
        value: irregulars$5,
        writable: true
      });
      Object.defineProperty(this, 'tags', {
        enumerable: false,
        value: Object.assign({}, tags),
        writable: true
      });
      Object.defineProperty(this, 'transforms', {
        enumerable: false,
        value: transforms$4
      }); // add our compressed data to lexicon

      this.unpackWords(_data); // add our irregulars to lexicon

      this.addIrregulars(); // cache our abbreviations for our sentence-parser

      Object.defineProperty(this, 'cache', {
        enumerable: false,
        value: {
          abbreviations: this.getByTag('Abbreviation')
        }
      });
    }
    /** more logs for debugging */


    _createClass(World, [{
      key: "verbose",
      value: function verbose(bool) {
        _isVerbose = bool;
        return this;
      }
    }, {
      key: "isVerbose",
      value: function isVerbose() {
        return _isVerbose;
      }
      /** get all terms in our lexicon with this tag */

    }, {
      key: "getByTag",
      value: function getByTag(tag) {
        var lex = this.lexicon;
        var res = {};
        var words = Object.keys(lex);

        for (var i = 0; i < words.length; i++) {
          if (typeof lex[words[i]] === 'string') {
            if (lex[words[i]] === tag) {
              res[words[i]] = true;
            }
          } else if (lex[words[i]].some(function (t) {
            return t === tag;
          })) {
            res[words[i]] = true;
          }
        }

        return res;
      }
      /** augment our lingustic data with new data */

    }, {
      key: "unpackWords",
      value: function unpackWords(lex) {
        var tags = Object.keys(lex);

        for (var i = 0; i < tags.length; i++) {
          var words = Object.keys(efrtUnpack_min(lex[tags[i]]));
          addWords_1(words, tags[i], this);
        }
      }
    }, {
      key: "addIrregulars",
      value: function addIrregulars() {
        addIrregulars_1(this);

        return this;
      }
      /** helper method for logging + debugging */

    }, {
      key: "stats",
      value: function stats() {
        return {
          words: Object.keys(this.lexicon).length,
          plurals: Object.keys(this.irregular.plurals).length,
          conjugations: Object.keys(this.irregular.conjugations).length,
          compounds: Object.keys(this.hasCompound).length
        };
      }
    }]);

    return World;
  }(); //  ¯\_(:/)_/¯


  var clone$1 = function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  /** produce a deep-copy of all lingustic data */


  World.prototype.clone = function () {
    var w2 = new World(); //who really knows about this one:

    w2.lexicon = clone$1(this.lexicon);
    w2.plurals = clone$1(this.plurals);
    w2.conjugations = clone$1(this.conjugations);
    w2.tags = clone$1(this.tags);
    return w2;
  };

  var World_1 = World;

  /** apply a tag, or tags to all terms */
  var tagTerms = function tagTerms(tag, doc, safe, reason) {
    var tagList = [];

    if (typeof tag === 'string') {
      tagList = tag.split(' ');
    } //do indepenent tags for each term:


    doc.list.forEach(function (p) {
      var terms = p.terms(); // tagSafe - apply only to fitting terms

      if (safe === true) {
        terms = terms.filter(function (t) {
          return t.canBe(tag, doc.world);
        });
      }

      terms.forEach(function (t, i) {
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

  var _tag = tagTerms;

  /** Give all terms the given tag */

  var tag$1 = function tag(tags, why) {
    if (!tags) {
      return this;
    }

    _tag(tags, this, false, why);
    return this;
  };
  /** Only apply tag to terms if it is consistent with current tags */


  var tagSafe$1 = function tagSafe(tags, why) {
    if (!tags) {
      return this;
    }

    _tag(tags, this, true, why);
    return this;
  };
  /** Remove this term from the given terms */


  var unTag$1 = function unTag(tags, why) {
    var _this = this;

    this.list.forEach(function (p) {
      p.terms().forEach(function (t) {
        return t.unTag(tags, why, _this.world);
      });
    });
    return this;
  };
  /** turn on logging for decision-debugging */


  var verbose = function verbose(bool) {
    if (bool === undefined) {
      bool = true;
    }

    this.world.verbose = bool;
  };

  var _04Tag = {
    tag: tag$1,
    tagSafe: tagSafe$1,
    unTag: unTag$1,
    verbose: verbose
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _01Utils$1 = createCommonjsModule(function (module, exports) {
    /**  */
    exports.firstTerm = function () {
      return this.match('^.');
    };
    /**  */


    exports.lastTerm = function () {
      return this.match('.$');
    };
    /** use only the first result(s) */


    exports.first = function (n) {
      if (n === undefined) {
        return this.get(n);
      }

      return this.slice(0, n);
    };
    /** use only the last result(s) */


    exports.last = function (n) {
      if (n === undefined) {
        return this.get(this.list.length - 1);
      }

      var end = this.list.length;
      return this.slice(end - n, end);
    };
    /** grab a subset of the results*/


    exports.slice = function (start, end) {
      var list = this.list.slice(start, end);
      return this.buildFrom(list);
    };
    /** use only the nth result*/


    exports.get = function (n) {
      //return an empty result
      if (!n && n !== 0 || !this.list[n]) {
        return this.buildFrom([]);
      }

      var list = [this.list[n]];
      return this.buildFrom(list);
    };
    /** sample a subset of the results */


    exports.random = function (n) {
      if (!this.found) {
        return this;
      }

      var r = Math.floor(Math.random() * this.list.length);

      if (n === undefined) {
        var list = [this.list[r]];
        return this.buildFrom(list);
      } //prevent it from going over the end


      if (r + n > this.length) {
        r = this.length - n;
        r = r < 0 ? 0 : r;
      }

      return this.slice(r, r + n);
    };
    /** return a flat array of term objects */


    exports.termList = function (num) {
      var arr = []; //'reduce' but faster

      for (var i = 0; i < this.list.length; i++) {
        var terms = this.list[i].terms();

        for (var o = 0; o < terms.length; o++) {
          arr.push(terms[o]); //support .termList(4)

          if (num !== undefined && arr[num] !== undefined) {
            return arr[num];
          }
        }
      }

      return arr;
    };
    /** how many seperate terms does the document have? */


    exports.wordCount = function () {
      return this.list.reduce(function (count, p) {
        count += p.wordCount;
        return count;
      }, 0);
    };

    exports.wordcount = exports.wordCount;
  });
  var _01Utils_1 = _01Utils$1.firstTerm;
  var _01Utils_2 = _01Utils$1.lastTerm;
  var _01Utils_3 = _01Utils$1.first;
  var _01Utils_4 = _01Utils$1.last;
  var _01Utils_5 = _01Utils$1.slice;
  var _01Utils_6 = _01Utils$1.get;
  var _01Utils_7 = _01Utils$1.random;
  var _01Utils_8 = _01Utils$1.termList;
  var _01Utils_9 = _01Utils$1.wordCount;
  var _01Utils_10 = _01Utils$1.wordcount;

  /** remove start and end whitespace */
  var trim$1 = function trim() {
    this.list = this.list.map(function (p) {
      return p.trim();
    });
    return this;
  };
  /** connect words with hyphen, and remove whitespace */


  var hyphenate = function hyphenate() {
    this.list.forEach(function (p) {
      var terms = p.terms(); //remove whitespace

      terms.forEach(function (t, i) {
        if (i !== 0) {
          t.pre = '';
        }

        if (terms[i + 1]) {
          t.post = '-';
        }
      });
    });
    this.tag('#Hyphenated', 'hyphenate');
    return this;
  };
  /** remove hyphens between words, and set whitespace */


  var dehyphenate = function dehyphenate() {
    var hasHyphen = /(-|–|—)/;
    this.list.forEach(function (p) {
      var terms = p.terms(); //remove whitespace

      terms.forEach(function (t) {
        if (hasHyphen.test(t.post)) {
          t.post = ' ';
        }
      });
    });
    this.untag('#Hyphenated', 'hyphenate');
    return this;
  };

  var _03Whitespace = {
    trim: trim$1,
    hyphenate: hyphenate,
    dehyphenate: dehyphenate
  };

  var eachTerm = function eachTerm(doc, fn) {
    var world = doc.world;
    doc.list.forEach(function (p) {
      p.terms().forEach(function (t) {
        return t[fn](world);
      });
    });
    return doc;
  };
  /** turn every letter of every term to lower-cse */


  var toLowerCase$1 = function toLowerCase() {
    return eachTerm(this, 'toLowerCase');
  };
  /** turn every letter of every term to upper case */


  var toUpperCase$1 = function toUpperCase() {
    return eachTerm(this, 'toUpperCase');
  };
  /** upper-case the first letter of each term */


  var toTitleCase$1 = function toTitleCase() {
    return eachTerm(this, 'toTitleCase');
  };
  /** remove whitespace and title-case each term */


  var toCamelCase = function toCamelCase() {
    this.toTitleCase();
    this.list.forEach(function (p) {
      //remove whitespace
      var terms = p.terms();
      terms.forEach(function (t, i) {
        if (i !== terms.length - 1) {
          t.post = '';
        }
      });
    });
    this.tag('#CamelCase', 'toCamelCase');
    return this;
  };

  var _02Case = {
    toLowerCase: toLowerCase$1,
    toUpperCase: toUpperCase$1,
    toTitleCase: toTitleCase$1,
    toCamelCase: toCamelCase
  };

  /* grab nth result */
  var eq = function eq(n) {
    var p = this.list[n];

    if (p === undefined) {
      return this.buildFrom([]);
    }

    return this.buildFrom([p]);
  };
  /* run each phrase through a function, and create a new document */


  var map = function map(fn) {
    var _this = this;

    if (!fn) {
      return this;
    }

    var list = this.list.map(function (p, i) {
      var doc = _this.buildFrom([p]);

      doc.from = null; //it's not a child/parent

      return fn(doc, i).list[0];
    });
    return this.buildFrom(list);
  };
  /** run a function on each phrase */


  var forEach = function forEach(fn) {
    var _this2 = this;

    if (!fn) {
      return this;
    }

    this.list.forEach(function (p, i) {
      var doc = _this2.buildFrom([p]);

      doc.from = null; //it's not a child/parent

      fn(doc, i);
    });
    return this;
  };
  /** return only the phrases that return true */


  var filter = function filter(fn) {
    var _this3 = this;

    if (!fn) {
      return this;
    }

    var list = this.list.filter(function (p, i) {
      var doc = _this3.buildFrom([p]);

      doc.from = null; //it's not a child/parent

      return fn(doc, i);
    });
    return this.buildFrom(list);
  };
  /** return a document with only the first phrase that matches */


  var find = function find(fn) {
    var _this4 = this;

    if (!fn) {
      return this;
    }

    var list = this.list.find(function (p, i) {
      var doc = _this4.buildFrom([p]);

      doc.from = null; //it's not a child/parent

      return fn(doc, i);
    });

    if (list) {
      return this.buildFrom([list]);
    }

    return undefined;
  };
  /** return true or false if there is one matching phrase */


  var some = function some(fn) {
    var _this5 = this;

    if (!fn) {
      return this;
    }

    return this.list.some(function (p, i) {
      var doc = _this5.buildFrom([p]);

      doc.from = null; //it's not a child/parent

      return fn(doc, i);
    });
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
    eq: eq,
    map: map,
    forEach: forEach,
    filter: filter,
    find: find,
    some: some
  };

  var _06Replace = createCommonjsModule(function (module, exports) {
    /** substitute-in new content */
    exports.replaceWith = function (replace) {
      var _this = this;

      if (!replace) {
        return this["delete"]();
      }

      this.list.forEach(function (p) {
        var newPhrases = _01Tokenizer.fromText(replace, _this.world, _this.pool()); //tag the new phrases

        var tmpDoc = _this.buildFrom(newPhrases);

        tmpDoc.tagger();
        p.replace(newPhrases[0], _this); //TODO: support multi-sentence replacements
      });
      return this;
    };
    /** search and replace match with new content */


    exports.replace = function (match, replace) {
      this.match(match).replaceWith(replace);
      return this;
    };
    /** fully remove these terms from the document */


    exports["delete"] = function (match) {
      var _this2 = this;

      var toRemove = this;

      if (match) {
        toRemove = this.match(match);
      }

      toRemove.list.forEach(function (phrase) {
        return phrase["delete"](_this2);
      });
      return this;
    }; // aliases


    exports.remove = exports["delete"];
  });
  var _06Replace_1 = _06Replace.replaceWith;
  var _06Replace_2 = _06Replace.replace;
  var _06Replace_3 = _06Replace.remove;

  var methods$2 = {
    /** alphabetical order */
    alpha: function alpha(a, b) {
      var left = a.text('clean');
      var right = b.text('clean');

      if (left < right) {
        return -1;
      }

      if (left > right) {
        return 1;
      }

      return 0;
    },

    /** the 'chronological', or original document sort order */
    chron: function chron(a, b) {
      var left = a.text();
      var right = b.text();

      if (left < right) {
        return 1;
      }

      if (left > right) {
        return -1;
      }

      return 0;
    },

    /** count the # of characters of each match */
    length: function length(a, b) {
      var left = a.text().trim().length;
      var right = b.text().trim().length;

      if (left < right) {
        return 1;
      }

      if (left > right) {
        return -1;
      }

      return 0;
    },

    /** count the # of terms in each match */
    wordCount: function wordCount(a, b) {
      var left = a.wordCount();
      var right = b.wordCount();

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

  var byFreq = function byFreq(doc) {
    var counts = {};
    var options = {
      "case": true,
      punctuation: false,
      whitespace: true,
      unicode: true
    };
    doc.list.forEach(function (p) {
      var str = p.text(options);
      counts[str] = counts[str] || 0;
      counts[str] += 1;
    });
    console.log(counts); // sort by freq

    doc.list.sort(function (a, b) {
      var left = counts[a.text(options)];
      var right = counts[b.text(options)];

      if (left < right) {
        return 1;
      }

      if (left > right) {
        return -1;
      }

      return 0;
    });
    return doc;
  }; //aliases


  methods$2.alphabetical = methods$2.alpha;
  methods$2.wordcount = methods$2.wordCount;
  methods$2.chronological = methods$2.chron;
  methods$2.index = methods$2.chron;
  /** re-arrange the order of the matches (in place) */

  var sort = function sort(input) {
    input = input || 'alpha';
    input = methods$2[input] || input; //do this one up-front

    if (input === 'freq' || input === 'frequency' || input === 'topk') {
      return byFreq(this);
    } // apply sort method on each phrase


    if (typeof input === 'function') {
      this.list = this.list.sort(input);
      return this;
    }

    return this;
  };

  var _07Sort = {
    sort: sort
  };

  /** deep-copy the document, so that no references remain */
  var clone$2 = function clone() {
    var list = this.list.map(function (ts) {
      return ts.clone();
    });
    var tmp = this.buildFrom(list);
    return tmp;
  };

  var _08Clone = {
    clone: clone$2
  };

  //list of inconsistent parts-of-speech
  var conflicts$1 = [//top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email', 'Emoji'], //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'], //acronyms
  ['Acronym', 'Pronoun', 'Actor', 'Unit', 'Address'], ['Acronym', 'Plural'], //things that can't be plural
  ['Plural', 'Singular'], //exlusive-people
  ['MaleName', 'FemaleName'], ['FirstName', 'LastName', 'Honorific'], //adjectives
  ['Comparative', 'Superlative'], //values
  ['Value', 'Verb', 'Adjective'], ['Ordinal', 'Cardinal'], ['TextValue', 'NumericValue'], ['NiceNumber', 'TextValue'], ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['PastTense', 'PresentTense', 'FutureTense'], ['Pluperfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund', 'FuturePerfect', 'PerfectTense'], ['Auxiliary', 'Noun', 'Value'], //date
  ['Month', 'WeekDay', 'Year', 'Duration', 'Holiday'], ['Particle', 'Conjunction', 'Adverb', 'Preposition', 'Date'], ['Date', 'Verb', 'Adjective', 'Person'], ['Date', 'Money', 'RomanNumeral', 'Fraction'], //a/an -> 1
  ['Value', 'Determiner'], ['Url', 'Value', 'HashTag', 'PhoneNumber', 'Emoji'], //roman numerals
  ['RomanNumeral', 'Fraction', 'NiceNumber'], ['RomanNumeral', 'Money', 'Acronym'], //cases
  ['UpperCase', 'TitleCase', 'CamelCase'], //phrases
  ['Verb', 'Noun', 'Adjective', 'Value'], //VerbPhrase',
  //QuestionWord
  ['QuestionWord', 'Verb'], //acronyms
  ['Acronym', 'Verb']];

  var nouns$2 = {
    Noun: {},
    // - singular
    Singular: {
      isA: 'Noun'
    },
    //a specific thing that's capitalized
    ProperNoun: {
      isA: 'Noun'
    },
    // -- people
    Person: {
      isA: 'ProperNoun',
      also: 'Singular'
    },
    FirstName: {
      isA: 'Person'
    },
    MaleName: {
      isA: 'FirstName'
    },
    FemaleName: {
      isA: 'FirstName'
    },
    LastName: {
      isA: 'Person'
    },
    Honorific: {
      isA: 'Noun'
    },
    Place: {
      isA: 'Singular'
    },
    // -- places
    Country: {
      isA: 'Place',
      also: 'ProperNoun'
    },
    City: {
      isA: 'Place',
      also: 'ProperNoun'
    },
    Region: {
      isA: 'Place',
      also: 'ProperNoun'
    },
    Address: {
      isA: 'Place'
    },
    Organization: {
      isA: 'Singular',
      also: 'ProperNoun'
    },
    SportsTeam: {
      isA: 'Organization'
    },
    Company: {
      isA: 'Organization'
    },
    School: {
      isA: 'Organization'
    },
    // - plural
    Plural: {
      isA: 'Noun'
    },
    Uncountable: {
      //(not plural or singular)
      isA: 'Noun'
    },
    Pronoun: {
      isA: 'Noun'
    },
    //a word for someone doing something -'plumber'
    Actor: {
      isA: 'Noun'
    },
    //a gerund-as-noun - 'swimming'
    Activity: {
      isA: 'Noun'
    },
    //'kilograms'
    Unit: {
      isA: 'Noun'
    },
    //'Canadians'
    Demonym: {
      isA: 'Noun',
      also: 'ProperNoun'
    },
    //`john's`
    Possessive: {
      isA: 'Noun'
    }
  };

  var verbs$2 = {
    Verb: {// isA: 'VerbPhrase',
    },
    PresentTense: {
      isA: 'Verb'
    },
    Infinitive: {
      isA: 'PresentTense'
    },
    Gerund: {
      isA: 'PresentTense'
    },
    PastTense: {
      isA: 'Verb'
    },
    PerfectTense: {
      isA: 'Verb'
    },
    FuturePerfect: {
      isA: 'Verb'
    },
    Pluperfect: {
      isA: 'Verb'
    },
    Copula: {
      isA: 'Verb'
    },
    Modal: {
      isA: 'Verb'
    },
    Participle: {
      isA: 'Verb'
    },
    Particle: {
      isA: 'Verb'
    },
    PhrasalVerb: {
      isA: 'Verb'
    }
  };

  var values$1 = {
    Value: {},
    Ordinal: {
      isA: 'Value'
    },
    Cardinal: {
      isA: 'Value'
    },
    // Multiple: {
    //   isA: 'Value',
    // },
    RomanNumeral: {
      isA: 'Cardinal'
    },
    Fraction: {
      isA: 'Value'
    },
    TextValue: {
      isA: 'Value'
    },
    NumericValue: {
      isA: 'Value'
    },
    Money: {//isA: 'Cardinal'
    },
    Percent: {
      isA: 'Value'
    }
  };

  var dates$1 = {
    Date: {},
    //not a noun, but usually is
    Month: {
      isA: 'Date',
      also: 'Singular'
    },
    WeekDay: {
      isA: 'Date',
      also: 'Noun'
    },
    RelativeDay: {
      isA: 'Date'
    },
    Year: {
      isA: 'Date'
    },
    Duration: {
      isA: 'Date',
      also: 'Noun'
    },
    Time: {
      isA: 'Date',
      also: 'Noun'
    },
    Holiday: {
      isA: 'Date',
      also: 'Noun'
    }
  };

  var misc$2 = {
    Adjective: {},
    Comparable: {
      isA: 'Adjective'
    },
    Comparative: {
      isA: 'Adjective'
    },
    Superlative: {
      isA: 'Adjective'
    },
    NumberRange: {
      isA: 'Contraction'
    },
    Adverb: {},
    Currency: {},
    //glue
    Determiner: {},
    Conjunction: {},
    Preposition: {},
    QuestionWord: {},
    RelativeProunoun: {
      isA: 'Pronoun'
    },
    Expression: {},
    Abbreviation: {},
    Url: {},
    PhoneNumber: {},
    HashTag: {},
    AtMention: {
      isA: 'Noun'
    },
    Emoji: {},
    Email: {},
    //non-exclusive
    Auxiliary: {},
    Negative: {},
    Contraction: {},
    TitleCase: {},
    CamelCase: {},
    UpperCase: {},
    Hyphenated: {},
    Acronym: {},
    ClauseEnd: {},
    // Quotes
    Quotation: {},
    StartQuotation: {
      isA: 'Quotation'
    },
    EndQuotation: {
      isA: 'Quotation'
    },
    //parentheses
    Parentheses: {},
    EndBracket: {
      isA: 'Parentheses'
    },
    StartBracket: {
      isA: 'Parentheses'
    }
  };

  //add 'downward' tags (that immediately depend on this one)
  var addDownword$1 = function addDownword(tags) {
    var keys = Object.keys(tags);
    keys.forEach(function (k) {
      tags[k].downward = []; //look for tags with this as parent

      for (var i = 0; i < keys.length; i++) {
        if (tags[keys[i]].isA && tags[keys[i]].isA === k) {
          tags[k].downward.push(keys[i]);
        }
      }
    });
  };

  var addDownward$1 = addDownword$1;

  var colors$1 = {
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
    Adverb: 'cyan' // Condition: 'cyan',

  }; //extend tagset with new tags

  var addIn$1 = function addIn(obj, tags) {
    Object.keys(obj).forEach(function (k) {
      tags[k] = obj[k];
    });
  }; //add tags to remove when tagging this one


  var addConflicts$1 = function addConflicts(tags) {
    Object.keys(tags).forEach(function (k) {
      tags[k].notA = {};

      for (var i = 0; i < conflicts$1.length; i++) {
        var arr = conflicts$1[i];

        if (arr.indexOf(k) !== -1) {
          arr = arr.filter(function (a) {
            return a !== k;
          });
          arr.forEach(function (e) {
            tags[k].notA[e] = true;
          });
        }
      }

      tags[k].notA = Object.keys(tags[k].notA);
    });
  };

  var addColors$1 = function addColors(tags) {
    Object.keys(tags).forEach(function (k) {
      if (colors$1[k]) {
        tags[k].color = colors$1[k];
        return;
      }

      if (tags[k].isA && colors$1[tags[k].isA]) {
        tags[k].color = colors$1[tags[k].isA];
        return;
      }

      if (tags[k].isA && tags[tags[k].isA].color) {
        tags[k].color = tags[tags[k].isA].color;
      }
    });
  };

  var build$1 = function build() {
    var tags = {};
    addIn$1(nouns$2, tags);
    addIn$1(verbs$2, tags);
    addIn$1(values$1, tags);
    addIn$1(dates$1, tags);
    addIn$1(misc$2, tags); //downstream

    addDownward$1(tags); //add enemies

    addConflicts$1(tags); //for nice-logging

    addColors$1(tags);
    return tags;
  };

  var tags$1 = build$1();

  var _debug = createCommonjsModule(function (module) {
    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    var reset = '\x1b[0m';

    var padEnd = function padEnd(str, width) {
      str = str.toString();

      while (str.length < width) {
        str += ' ';
      }

      return str;
    }; //cheaper than requiring chalk


    var colors = {
      green: function green(str) {
        return '\x1b[32m' + str + reset;
      },
      red: function red(str) {
        return '\x1b[31m' + str + reset;
      },
      blue: function blue(str) {
        return '\x1b[34m' + str + reset;
      },
      magenta: function magenta(str) {
        return '\x1b[35m' + str + reset;
      },
      cyan: function cyan(str) {
        return '\x1b[36m' + str + reset;
      },
      yellow: function yellow(str) {
        return '\x1b[33m' + str + reset;
      },
      black: function black(str) {
        return '\x1b[30m' + str + reset;
      }
    };

    var tagString = function tagString(tags) {
      tags = tags.map(function (tag) {
        if (!tags$1.hasOwnProperty(tag)) {
          return tag;
        }

        var c = tags$1[tag].color || 'blue';
        return colors[c](tag);
      });
      return tags.join(', ');
    }; //output some helpful stuff to the console


    var debug = function debug(doc) {
      console.log(colors.blue('====='));
      doc.list.forEach(function (p) {
        console.log(colors.blue('  -----'));
        p.terms().forEach(function (t) {
          var tags = Object.keys(t.tags);
          var text = t.text || '-';

          if (t.implicit) {
            text = '[' + t.implicit + ']';
          }

          {
            text = colors.yellow(text);
          }

          var word = "'" + text + "'";
          word = padEnd(word, 18);
          var str = colors.blue('  ｜ ') + word + '  - ' + tagString(tags);
          console.log(str);
        });
      });
      console.log('');
      return doc;
    };

    module.exports = debug;
  });

  var _09Out = createCommonjsModule(function (module, exports) {
    var jsonDefaults = {
      text: true,
      trim: true,
      terms: {
        text: true,
        tags: true,
        whitespace: true,
        implicit: true
      }
    };
    /** return the document as text */

    exports.text = function () {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      //are we showing every phrase?
      var showFull = false;

      if (this.parents().length === 0) {
        showFull = true;
      }

      return this.list.reduce(function (str, p, i) {
        var trimPre = !showFull && i === 0;
        var trimPost = !showFull && i === _this.list.length - 1;
        return str + p.text(options, trimPre, trimPost);
      }, '');
    };
    /** pull out desired metadata from the document */


    exports.json = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      //support json(3) format
      if (typeof options === 'number') {
        return this.list[options].json(jsonDefaults);
      }

      options = Object.assign({}, jsonDefaults, options);
      return this.list.map(function (p) {
        return p.json(options);
      });
    };
    /** pretty-print the current document and its tags */


    exports.debug = function () {
      _debug(this);
      return this;
    };
    /** some named output formats */


    exports.out = function (method) {
      if (method === 'text') {
        return this.text();
      }

      if (method === 'normal') {
        return this.text('normal');
      }

      if (method === 'json') {
        return this.json();
      }

      if (method === 'array') {
        return this.json({
          text: true,
          terms: false
        }).map(function (obj) {
          return obj.text;
        });
      }

      if (method === 'terms') {
        var list = [];
        this.json({
          text: false,
          terms: {
            text: true
          }
        }).forEach(function (obj) {
          var terms = obj.terms.map(function (t) {
            return t.text;
          });
          terms = terms.filter(function (t) {
            return t;
          });
          list = list.concat(terms);
        });
        return list;
      }

      if (method === 'debug') {
        _debug(this);
        return this;
      }

      return this.text();
    }; //aliases


    exports.data = exports.json;
  });
  var _09Out_1 = _09Out.text;
  var _09Out_2 = _09Out.json;
  var _09Out_3 = _09Out.debug;
  var _09Out_4 = _09Out.out;
  var _09Out_5 = _09Out.data;

  var _10Split = createCommonjsModule(function (module, exports) {
    /** add these new terms to the front*/
    exports.prepend = function (str) {
      var _this = this;

      if (!str) {
        return this;
      } //add it to start of every phrase


      this.list.forEach(function (p) {
        //build it
        var phrase = _01Tokenizer.fromText(str, _this.world, _this.pool())[0]; //assume it's one sentence, for now
        //tag it

        var tmpDoc = _this.buildFrom([phrase]);

        tmpDoc.tagger(); // add it to the start

        p.prepend(phrase, _this);
      });
      return this;
    };

    exports.insertBefore = exports.prepend;
    /** add these new terms to the end*/

    exports.append = function (str) {
      var _this2 = this;

      if (!str) {
        return this;
      } //add it to end of every phrase


      this.list.forEach(function (p) {
        //build it
        var phrase = _01Tokenizer.fromText(str, _this2.world, _this2.pool())[0]; //assume it's one sentence, for now
        //tag it

        var tmpDoc = _this2.buildFrom([phrase]);

        tmpDoc.tagger(); // push it onto the end

        p.append(phrase, _this2);
      });
      return this;
    };

    exports.insertAfter = exports.append;
    exports.insertAt = exports.append;
    /** add these new things to the end*/

    exports.concat = function () {
      var list = this.list.slice(0); //repeat for any number of params

      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i]; //support a fresh string

        if (typeof arg === 'string') {
          var arr = _01Tokenizer.fromText(arg, this.world); //TODO: phrase.tagger()?

          list = list.concat(arr);
        } else if (arg.isA === 'Doc') {
          list = list.concat(arg.list);
        } else if (arg.isA === 'Phrase') {
          list.push(arg);
        }
      }

      return this.buildFrom(list);
    }; // /** turn these matches into one match */
    // exports.flatten = function() {
    //   this.list.forEach( p => {
    //   })
    //   return this
    // }

  });
  var _10Split_1 = _10Split.prepend;
  var _10Split_2 = _10Split.insertBefore;
  var _10Split_3 = _10Split.append;
  var _10Split_4 = _10Split.insertAfter;
  var _10Split_5 = _10Split.insertAt;
  var _10Split_6 = _10Split.concat;

  var isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
  var quotes = /['‘’“”"′″‴]+/g;
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

  var defaults = {};
  /** common ways to clean-up the document, and reduce noise */

  var normalize = function normalize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options = Object.assign({}, defaults, options);
    var termArr = this.list.map(function (ts) {
      return ts.terms();
    }); //whitespace

    if (options.whitespace) {
      termArr.forEach(function (terms, o) {
        terms.forEach(function (t, i) {
          t.pre = t.pre.replace(/\s/g, '');
          t.post = t.post.replace(/\s/g, ''); //last word? ensure there's a next sentence.

          if (terms.length - 1 === i && !termArr[o + 1]) {
            return;
          }

          t.post += ' ';
        });
      });
    }

    var termList = this.termList(); //punctuation - keep sentence punctation, quotes, parenths

    if (options.punctuation) {
      termList.forEach(function (t) {
        t.post = t.post.replace(isPunct, '');
        t.pre = t.pre.replace(isPunct, '');
      });
    } // é -> e


    if (options.unicode) {
      termList.forEach(function (t) {
        t.text = unicode_1(t.text);
      });
    } // '(word)' -> 'word'


    if (options.parentheses) {
      this.parentheses().unwrap();
    } // `isn't` -> 'is not'


    if (options.contraction || options.contractions) {
      this.contractions().expand();
    } // `cory hart's -> cory hart'


    if (options.possessive || options.possessives) {
      this.possessives().strip();
    } // remove "" punctuation


    if (options.quotations || options.quotes) {
      termList.forEach(function (t) {
        t.post = t.post.replace(quotes, '');
        t.pre = t.pre.replace(quotes, '');
      });
    }

    return this;
  };

  var _11Normalize = {
    normalize: normalize
  };

  var methods$3 = Object.assign({}, _04Tag, _01Utils$1, _03Whitespace, _02Case, _05Loops, _06Replace, _07Sort, _08Clone, _09Out, _10Split, _11Normalize);

  var match$1 = createCommonjsModule(function (module, exports) {
    /** return a new Doc, with this one as a parent */
    exports.match = function (reg) {
      //parse-up the input expression
      var regs = syntax_1(reg);

      if (regs.length === 0) {
        return this.buildFrom([]);
      } //try expression on each phrase


      var matches = this.list.reduce(function (arr, p) {
        return arr.concat(p.match(regs));
      }, []);
      return this.buildFrom(matches);
    };
    /** return all results except for this */


    exports.not = function (reg) {
      //parse-up the input expression
      var regs = syntax_1(reg); //if it's empty, return them all!

      if (regs.length === 0) {
        return this;
      } //try expression on each phrase


      var matches = this.list.reduce(function (arr, p) {
        return arr.concat(p.not(regs));
      }, []);
      return this.buildFrom(matches);
    };
    /** return only the first match */


    exports.matchOne = function (reg) {
      var regs = syntax_1(reg);

      for (var i = 0; i < this.list.length; i++) {
        var _match = this.list[i].match(regs);

        return this.buildFrom(_match);
      }

      return this.buildFrom([]);
    };
    /** return a Document with three parts for every match
     * seperate everything before the word, as a new phrase
     */


    exports.split = function (reg) {
      var regs = syntax_1(reg);
      var matches = [];
      this.list.forEach(function (p) {
        var allFound = p.match(regs); //no match, keep it going

        if (allFound.length === 0) {
          matches.push(p);
        }

        allFound.forEach(function (found) {
          // do it again, at the end
          var last = matches.pop() || p;
          var results = last.splitOn(found); //splits into three parts

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
      return this.buildFrom(matches);
    };
    /** return a Document with two parts for every match
     * seperate everything after the word, as a new phrase
     */


    exports.splitAfter = function (reg) {
      var regs = syntax_1(reg);
      var matches = [];
      this.list.forEach(function (p) {
        var allFound = p.match(regs); //no match, return whole phrase

        if (allFound.length === 0) {
          matches.push(p);
        }

        allFound.forEach(function (found) {
          // apply it to the end, recursively
          var last = matches.pop() || p;
          var results = last.splitOn(found); //splits into three parts
          //merge first and second parts

          if (results.before && results.match) {
            results.before.length += results.match.length;
            matches.push(results.before);
          } else if (results.match) {
            matches.push(results.match);
          } // add third part, if it exists


          if (results.after) {
            matches.push(results.after);
          }
        });
      });
      return this.buildFrom(matches);
    };
    /** return a Document with two parts for every match */


    exports.splitBefore = function (reg) {
      var regs = syntax_1(reg);
      var matches = [];
      this.list.forEach(function (p) {
        var allFound = p.match(regs); //no match, keep it going

        if (allFound.length === 0) {
          matches.push(p);
        }

        allFound.forEach(function (found) {
          // do it again, at the end
          var last = matches.pop() || p;
          var results = last.splitOn(found); //splits into three parts
          //support multiple-matches per phrase

          if (results.before) {
            matches.push(results.before);
          } //merge 'match' and 'after'


          if (results.match && results.after) {
            results.match.length += results.after.length;
            matches.push(results.match);
          } else if (results.match) {
            matches.push(results.match);
          }
        });
      });
      return this.buildFrom(matches);
    };
    /**Return a boolean if this match exists */


    exports.has = function (reg) {
      var regs = syntax_1(reg);
      return this.list.some(function (p) {
        return p.has(regs) === true;
      });
    };
    /** return each current phrase, only if it contains this match */


    exports["if"] = function (reg) {
      var regs = syntax_1(reg);
      var found = this.list.filter(function (p) {
        return p.match(regs).length > 0;
      });
      return this.buildFrom(found);
    };
    /** Filter-out any current phrases that have this match*/


    exports.ifNo = function (reg) {
      var regs = syntax_1(reg);
      var found = this.list.filter(function (p) {
        return p.match(regs).length === 0;
      });
      return this.buildFrom(found);
    };
    /** return only the terms that can be this tag*/


    exports.canBe = function (tag) {
      if (!tag) {
        return this;
      }

      var world = this.world;
      var matches = this.list.reduce(function (arr, p) {
        return arr.concat(p.canBe(tag, world));
      }, []);
      return this.buildFrom(matches);
    };
    /** return all terms before a match, in each phrase */


    exports.before = function (reg) {
      var regs = syntax_1(reg); //only the phrases we care about

      var phrases = this["if"](regs).list;
      var befores = phrases.map(function (p) {
        var ids = p.terms().map(function (t) {
          return t.id;
        }); //run the search again

        var m = p.match(regs)[0];
        var index = ids.indexOf(m.start); //nothing is before a first-term match

        if (index === 0 || index === -1) {
          return null;
        }

        return p.buildFrom(p.start, index);
      });
      befores = befores.filter(function (p) {
        return p !== null;
      });
      return this.buildFrom(befores);
    };
    /** return all terms after a match, in each phrase */


    exports.after = function (reg) {
      var regs = syntax_1(reg); //only the phrases we care about

      var phrases = this["if"](regs).list;
      var befores = phrases.map(function (p) {
        var terms = p.terms();
        var ids = terms.map(function (t) {
          return t.id;
        }); //run the search again

        var m = p.match(regs)[0];
        var index = ids.indexOf(m.start); //skip if nothing is after it

        if (index === -1 || !terms[index + m.length]) {
          return null;
        } //create the new phrase, after our match.


        var id = terms[index + m.length].id;
        var len = p.length - index - m.length;
        return p.buildFrom(id, len);
      });
      befores = befores.filter(function (p) {
        return p !== null;
      });
      return this.buildFrom(befores);
    }; //aliases


    exports.splitOn = exports.split;
  });
  var match_1$1 = match$1.match;
  var match_2 = match$1.not;
  var match_3 = match$1.matchOne;
  var match_4 = match$1.split;
  var match_5 = match$1.splitAfter;
  var match_6 = match$1.splitBefore;
  var match_7 = match$1.has;
  var match_8 = match$1.ifNo;
  var match_9 = match$1.canBe;
  var match_10 = match$1.before;
  var match_11 = match$1.after;
  var match_12 = match$1.splitOn;

  var find$1 = createCommonjsModule(function (module, exports) {
    //these are selections that don't require their own subclasses/methods

    /** split-up results by each term */
    exports.terms = function (n) {
      var r = this.match('.');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };

    exports.words = exports.terms;
    /** split-up results into multi-term phrases */

    exports.clauses = function (n) {
      var r = this.splitAfter('#ClauseEnd');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return anything tagged as a hashtag*/


    exports.hashTags = function (n) {
      var r = this.match('#HashTag').terms();

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return anything tagged as an organization*/


    exports.organizations = function (n) {
      var r = this.splitAfter('#Comma');
      r = r.match('#Organization+');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return anything tagged as a phone number */


    exports.phoneNumbers = function (n) {
      var r = this.splitAfter('#Comma');
      r = r.match('#PhoneNumber+');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return anything tagged as a Place*/


    exports.places = function (n) {
      var r = this.splitAfter('#Comma');
      r = r.match('#Place+');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return anything tagged as a URL*/


    exports.urls = function (n) {
      var r = this.match('#Url');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return anything inside parentheses */


    exports.parentheses = function (n) {
      var r = this.match('#Parentheses+'); //split-up consecutive ones

      r = r.splitAfter('#EndBracket');

      if (typeof n === 'number') {
        r = r.get(n);
      }

      return r;
    };
    /** return any sentences that ask a question */


    exports.questions = function (doc) {
      return doc.sentences().isQuestion();
    };
    /** return any sentences that are not a question or exclamation*/


    exports.statements = function (doc) {
      return doc.sentences().isStatement();
    };
    /** return any sentences that are not a question */


    exports.exclamations = function (doc) {
      return doc.sentences().isExclamation();
    };
  });
  var find_1 = find$1.terms;
  var find_2 = find$1.words;
  var find_3 = find$1.clauses;
  var find_4 = find$1.hashTags;
  var find_5 = find$1.organizations;
  var find_6 = find$1.phoneNumbers;
  var find_7 = find$1.places;
  var find_8 = find$1.urls;
  var find_9 = find$1.parentheses;
  var find_10 = find$1.questions;
  var find_11 = find$1.statements;
  var find_12 = find$1.exclamations;

  var selections = Object.assign({}, find$1);

  /** match a word-sequence, like 'super bowl' in the lexicon */
  var tryMultiple = function tryMultiple(terms, t, world) {
    var lex = world.lexicon; //try a two-word version

    var txt = terms[t].clean + ' ' + terms[t + 1].clean;

    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-two', world);
      terms[t + 1].tag(lex[txt], 'lexicon-two', world);
      return 1;
    } //try a three-word version?


    if (t + 2 < terms.length) {
      txt += ' ' + terms[t + 2].clean;

      if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
        terms[t].tag(lex[txt], 'lexicon-three', world);
        terms[t + 1].tag(lex[txt], 'lexicon-three', world);
        terms[t + 2].tag(lex[txt], 'lexicon-three', world);
        return 2;
      }
    }

    return 0;
  };
  /** look at each word in our list of known-words */


  var checkLexicon = function checkLexicon(terms, world) {
    var lex = world.lexicon;
    var hasCompound = world.hasCompound; //go through each term, and check the lexicon

    for (var t = 0; t < terms.length; t += 1) {
      var str = terms[t].clean; //is it the start of a compound word, like 'super bowl'?

      if (hasCompound[str] === true && t + 1 < terms.length) {
        var foundWords = tryMultiple(terms, t, world);

        if (foundWords > 0) {
          t += foundWords; //skip any already-found words

          continue;
        }
      } //try one-word lexicon


      if (lex[str] !== undefined && lex.hasOwnProperty(str) === true) {
        terms[t].tag(lex[str], 'lexicon', world);
      }
    }

    return terms;
  };

  var _01Lexicon = checkLexicon;

  var apostrophes = /[\'‘’‛‵′`´]/; //

  var checkPunctuation = function checkPunctuation(terms, i, world) {
    var term = terms[i]; //check hyphenation

    if (term.post.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].pre === '') {
      term.tag('Hyphenated', 'has-hyphen', world);
    } //an end-tick (trailing apostrophe) - flanders', or Carlos'


    if (apostrophes.test(term.post) && !apostrophes.test(term.pre)) {
      var endChar = term.clean[term.clean.length - 1]; //flanders'

      if (endChar === 's') {
        term.tag(['Possessive', 'Noun'], 'end-tick', world);
        return;
      } //chillin'


      if (endChar === 'n') {
        term.tag(['Gerund'], 'chillin', world);
      }
    } // NASA


    if (term.isAcronym()) {
      term.tag('Acronym', 'acronym-step', world);
      term.tag('Noun', 'acronym-infer', world);
    }
  };

  var _02Punctuation$1 = checkPunctuation;

  //these are regexes applied to t.text, instead of t.clean
  // order matters.
  var regexes = [//phone numbers
  [/^[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //589-3809
  [/^[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //632-589-3809
  //money
  [/^[-+]?[$€¥£][0-9]+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5.30
  [/^[-+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5,231.30
  //web tags
  [/^\w+@\w+\.[a-z]{2,3}$/, 'Email'], //not fancy
  [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'], [/^@\w{2,}$/, 'AtMention'], [/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, 'Url'], //with http/www
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
  [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, 'Verb'], [/^[\-\+]?[0-9]+(\.[0-9])*$/, ['Cardinal', 'NumericValue']], [/^(over|under)[a-z]{2,}/, 'Adjective'], [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'], // 03-02-89
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
  [/^[0-9]+([a-z]{1,4})$/, 'Value'] //like 5tbsp
  ];

  var romanNumeral = /^[IVXLCDM]{2,}$/;
  var romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/; //  https://stackoverflow.com/a/267405/168877
  //try each of the ^regexes in our list

  var checkRegex = function checkRegex(term, world) {
    var str = term.text; // do them all!

    for (var r = 0; r < regexes.length; r += 1) {
      if (regexes[r][0].test(str) === true) {
        term.tagSafe(regexes[r][1], 'regex #' + r, world);
        break;
      }
    } // do some more!
    //roman numberals - XVII


    if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
      term.tag('RomanNumeral', 'xvii', world);
    }
  };

  var _03Regex = checkRegex;

  //regex suffix patterns and their most common parts of speech,
  //built using wordnet, by spencer kelly.
  //this mapping shrinks-down the uglified build
  var Adj = 'Adjective';
  var Inf = 'Infinitive';
  var Pres = 'PresentTense';
  var Sing = 'Singular';
  var Past = 'PastTense';
  var Adverb = 'Adverb';
  var Exp = 'Expression';
  var Actor = 'Actor';
  var Verb = 'Verb';
  var Noun = 'Noun';
  var Last = 'LastName'; //the order here matters.
  //regexes indexed by mandated last-character

  var regex = {
    a: [[/.[aeiou]na$/, Noun], [/.[oau][wvl]ska$/, Last], //polish (female)
    [/.[^aeiou]ica$/, Sing], [/^([hyj]a)+$/, Exp] //hahah
    ],
    c: [[/.[^aeiou]ic$/, Adj]],
    d: [[/.[ia]sed$/, Adj], [/.[gt]led$/, Adj], [/.[aeiou][td]ed$/, Past], [/.[aeiou]red$/, Past], [/.[^aeiou]led$/, Past], //rumbled
    [/[^aeiou]ard$/, Sing], [/[aeiou][^aeiou]id$/, Adj], [/[aeiou]c?ked$/, Past], //hooked
    [/[^aeiou][aeiou][tvx]ed$/, Past], //boxed
    [/.[vrl]id$/, Adj]],
    e: [[/.[lnr]ize$/, Inf], [/.[^aeiou]ise$/, Inf], [/.[aeiou]te$/, Inf], [/.[^aeiou][ai]ble$/, Adj], [/.[^aeiou]eable$/, Adj], [/.[ts]ive$/, Adj]],
    h: [[/.[^aeiouf]ish$/, Adj], [/.v[iy]ch$/, Last], //east-europe
    [/^ug?h+$/, Exp], //uhh
    [/^uh[ -]?oh$/, Exp] //uhoh
    ],
    i: [[/.[oau][wvl]ski$/, Last] //polish (male)
    ],
    k: [[/^(k)+$/, Exp] //kkkk
    ],
    l: [[/.[gl]ial$/, Adj], [/.[^aeiou]ful$/, Adj], [/.[nrtumcd]al$/, Adj], [/.[^aeiou][ei]al$/, Adj]],
    m: [[/.[^aeiou]ium$/, Sing], [/[^aeiou]ism$/, Sing], [/^h*u*m+$/, Exp], //mmmmmmm / ummmm / huuuuuummmmmm
    [/^\d+ ?[ap]m$/, 'Date']],
    n: [[/.[lsrnpb]ian$/, Adj], [/[^aeiou]ician$/, Actor]],
    o: [[/^no+$/, Exp], //noooo
    [/^(yo)+$/, Exp], //yoyo
    [/^woo+[pt]?$/, Exp] //woo
    ],
    r: [[/.[ilk]er$/, 'Comparative'], [/[aeiou][pns]er$/, Sing], [/[^i]fer$/, Inf], [/.[^aeiou][ao]pher$/, Actor]],
    t: [[/.[di]est$/, 'Superlative'], [/.[icldtgrv]ent$/, Adj], [/[aeiou].*ist$/, Adj], [/^[a-z]et$/, Verb]],
    s: [[/.[rln]ates$/, Pres], [/.[^z]ens$/, Verb], [/.[lstrn]us$/, Sing], [/[aeiou][^aeiou]is$/, Sing], [/[a-z]\'s$/, Noun], [/^yes+$/, Exp] //yessss
    ],
    v: [[/.[^aeiou][ai][kln]ov$/, Last] //east-europe
    ],
    y: [[/.[cts]hy$/, Adj], [/.[st]ty$/, Adj], [/.[gk]y$/, Adj], [/.[tnl]ary$/, Adj], [/.[oe]ry$/, Sing], [/[rdntkbhs]ly$/, Adverb], [/...lly$/, Adverb], [/[bszmp]{2}y$/, Adj], [/.(gg|bb|zz)ly$/, Adj], [/.[aeiou]my$/, Adj], [/[ea]{2}zy$/, Adj], [/.[^aeiou]ity$/, Sing]]
  };

  //just a foolish lookup of known suffixes
  var Adj$1 = 'Adjective';
  var Inf$1 = 'Infinitive';
  var Pres$1 = 'PresentTense';
  var Sing$1 = 'Singular';
  var Past$1 = 'PastTense';
  var Avb = 'Adverb';
  var Plrl = 'Plural';
  var Actor$1 = 'Actor';
  var Vb = 'Verb';
  var Noun$1 = 'Noun';
  var Last$1 = 'LastName';
  var Modal = 'Modal'; // find any issues - https://observablehq.com/@spencermountain/suffix-word-lookup

  var suffixList = [null, //0
  null, //1
  {
    //2-letter
    ea: Sing$1,
    ia: Noun$1,
    ic: Adj$1,
    ly: Avb,
    "'n": Vb,
    "'t": Vb
  }, {
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
    ing: 'Gerund',
    //likely to be converted to Adj after lexicon pass
    ' so': Avb,
    "'ll": Modal,
    "'re": 'Copula'
  }, {
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
    sson: Last$1,
    //swedish male
    czyk: Last$1,
    //polish (male)
    chuk: Last$1,
    //east-europe
    enko: Last$1,
    //east-europe
    akis: Last$1,
    //greek
    nsen: Last$1 //norway

  }, {
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
    nssen: Last$1,
    //norway
    marek: Last$1 //polish (male)

  }, {
    //6-letter
    keeper: Actor$1,
    logist: Actor$1,
    auskas: Last$1,
    //lithuania
    teenth: 'Value'
  }, {
    //7-letter
    sdottir: Last$1,
    //swedish female
    opoulos: Last$1 //greek

  }];

  var suffixRegexes = function suffixRegexes(term, world) {
    var str = term.clean;
    var _char = str[str.length - 1];

    if (regex.hasOwnProperty(_char) === true) {
      var regs = regex[_char];

      for (var r = 0; r < regs.length; r += 1) {
        if (regs[r][0].test(str) === true) {
          term.tagSafe(regs[r][1], "endsWith ".concat(_char, " #").concat(r), world);
          break;
        }
      }
    }
  }; //sweep-through all suffixes


  var knownSuffixes = function knownSuffixes(term, world) {
    var len = term.clean.length;
    var max = 7;

    if (len <= max) {
      max = len - 1;
    }

    for (var i = max; i > 1; i -= 1) {
      var str = term.clean.substr(len - i, len);

      if (suffixList[str.length].hasOwnProperty(str) === true) {
        var tag = suffixList[str.length][str];
        term.tagSafe(tag, 'suffix -' + str, world);
        break;
      }
    }
  }; //all-the-way-down!


  var checkRegex$1 = function checkRegex(term, world) {
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
    '<\\3': true
  };

  // * ;) - emoticons
  // * 🌵 - unicode emoji
  // * :smiling_face: - asci-represented emoji
  //test for forms like ':woman_tone2:‍:ear_of_rice:'
  //https://github.com/Kikobeats/emojis-keywords/blob/master/index.js

  var isCommaEmoji = function isCommaEmoji(t) {
    if (t.raw.charAt(0) === ':') {
      //end comma can be last or second-last ':haircut_tone3:‍♀️'
      if (t.raw.match(/:.?$/) === null) {
        return false;
      } //ensure no spaces


      if (t.raw.match(' ')) {
        return false;
      } //reasonably sized


      if (t.raw.length > 35) {
        return false;
      }

      return true;
    }

    return false;
  }; //check against emoticon whitelist


  var isEmoticon = function isEmoticon(t) {
    var str = t.raw.replace(/^[:;]/, ':'); //normalize the 'eyes'

    return list.hasOwnProperty(str);
  }; //these are somewhat popular.


  var tagEmoji = function tagEmoji(term, world) {
    //test for :keyword: emojis
    if (isCommaEmoji(term) === true) {
      term.tag('Emoji', 'comma-emoji', world);
      term.text = term.raw;
      term.pre = term.pre.replace(':', '');
      term.post = term.post.replace(':', '');
    } //test for unicode emojis


    if (term.text.match(regex$1)) {
      term.tag('Emoji', 'unicode-emoji', world);
      term.text = term.raw;
    } //test for emoticon ':)' emojis


    if (isEmoticon(term) === true) {
      term.tag('Emoji', 'emoticon-emoji', world);
      term.text = term.raw;
    }
  };

  var _05Emoji = tagEmoji;

  var steps = {
    lexicon: _01Lexicon,
    punctuation: _02Punctuation$1,
    regex: _03Regex,
    suffix: _04Suffixes,
    emoji: _05Emoji
  }; //'lookups' look at a term by itself

  var lookups = function lookups(doc) {
    var terms = doc.termList();
    var world = doc.world; //our list of known-words

    steps.lexicon(terms, world); //try these other methods

    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i]; //or maybe some helpful punctuation

      steps.punctuation(terms, i, world); //mostly prefix checks

      steps.regex(term, world); //maybe we can guess

      steps.suffix(term, world); // :c

      steps.emoji(term, world);
    }

    return doc;
  };

  var _01Init = lookups;

  //markov-like stats about co-occurance, for hints about unknown terms
  //basically, a little-bit better than the noun-fallback
  //just top n-grams from nlp tags, generated from nlp-corpus
  //after this word, here's what happens usually
  var afterThisWord = {
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
    "if": 'Noun',
    //32%
    but: 'Noun',
    //26%
    who: 'Verb',
    //40%
    "this": 'Noun',
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

  var beforeThisWord = {
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

  var afterThisPOS = {
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

  var beforeThisPOS = {
    Copula: 'Noun',
    //44% //spencer is
    PastTense: 'Noun',
    //33% //spencer walked
    Conjunction: 'Noun',
    //36%
    Modal: 'Noun',
    //38%
    PluperfectTense: 'Noun',
    //40%
    PerfectTense: 'Verb' //32%

  };
  var markov = {
    beforeThisWord: beforeThisWord,
    afterThisWord: afterThisWord,
    beforeThisPos: beforeThisPOS,
    afterThisPos: afterThisPOS
  };

  var afterKeys = Object.keys(markov.afterThisPos);
  var beforeKeys = Object.keys(markov.beforeThisPos);

  var checkNeighbours = function checkNeighbours(terms, world) {
    var _loop = function _loop(i) {
      var term = terms[i]; //do we still need a tag?

      if (term.isKnown() === true) {
        return "continue";
      } //ok, this term needs a tag.
      //look at previous word for clues..


      var lastTerm = terms[i - 1];

      if (lastTerm) {
        // 'foobar term'
        if (markov.afterThisWord.hasOwnProperty(lastTerm.clean) === true) {
          var tag = markov.afterThisWord[lastTerm.clean];
          term.tag(tag, 'after-' + lastTerm.clean, world);
          return "continue";
        } // 'Tag term'
        // (look at previous POS tags for clues..)


        var foundTag = afterKeys.find(function (tag) {
          return lastTerm.tags[tag];
        });

        if (foundTag !== undefined) {
          var _tag = markov.afterThisPos[foundTag];
          term.tag(_tag, 'after-' + foundTag, world);
          return "continue";
        }
      } //look at next word for clues..


      var nextTerm = terms[i + 1];

      if (nextTerm) {
        // 'term foobar'
        if (markov.beforeThisWord.hasOwnProperty(nextTerm.clean) === true) {
          var _tag2 = markov.beforeThisWord[nextTerm.clean];
          term.tag(_tag2, 'before-' + nextTerm.clean, world);
          return "continue";
        } // 'term Tag'
        // (look at next POS tags for clues..)


        var _foundTag = beforeKeys.find(function (tag) {
          return nextTerm.tags[tag];
        });

        if (_foundTag !== undefined) {
          var _tag3 = markov.beforeThisPos[_foundTag];
          term.tag(_tag3, 'before-' + _foundTag, world);
          return "continue";
        }
      }
    };

    for (var i = 0; i < terms.length; i += 1) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }
  };

  var _01Neighbours = checkNeighbours;

  var titleCase$2 = /^[A-Z][a-z'\u00C0-\u00FF]/;
  var hasNumber = /[0-9]/;
  /** look for any grammar signals based on capital/lowercase */

  var checkCase = function checkCase(terms, world) {
    terms.forEach(function (term, i) {
      //is it a titlecased word?
      if (titleCase$2.test(term.text) === true && hasNumber.test(term.text) === false) {
        // tag it as titlecase, if possible
        if (i !== 0) {
          term.tag('TitleCase', 'case', world);
        } else if (term.tags.Person || term.tags.Organization || term.tags.Place) {
          term.tag('TitleCase', 'case-person', world);
        } // can we call it a noun?


        if (i !== 0) {
          //sure!
          term.tag('ProperNoun', 'case-noun', world);
        }
      }
    });
  };

  var _02Case$1 = checkCase;

  //these tags don't have plurals
  var noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'RelativeDay', 'Holiday'];
  var notPlural = [/ss$/, /sis$/, /[uo]s$/];
  var notSingular = [/i$/, /ae$/, /men$/, /tia$/];
  /** turn nouns into singular/plural */

  var checkPlural = function checkPlural(t, world) {
    if (t.tags.Noun && !t.tags.Acronym) {
      var str = t.clean; //skip existing tags, fast

      if (t.tags.Singular || t.tags.Plural) {
        return;
      } //too short


      if (str.length <= 2) {
        return;
      } //is it impossible to be plural?


      if (noPlurals.find(function (tag) {
        return t.tags[tag];
      })) {
        return;
      } // finally, fallback 'looks check plural' rules..


      if (/s$/.test(str) === true) {
        //avoid anything too sketchy to be plural
        if (notPlural.find(function (reg) {
          return reg.test(str);
        })) {
          return;
        }

        t.tag('Plural', 'plural-fallback', world);
        return;
      } //avoid anything too sketchy to be singular


      if (notSingular.find(function (reg) {
        return reg.test(str);
      })) {
        return;
      }

      t.tag('Singular', 'singular-fallback', world);
    }
  };

  var _04Plurals = checkPlural;

  var hasPrefix = /^(re|un)-?[a-z\u00C0-\u00FF]/;
  var prefix = /^(re|un)-?/;
  /** check 'rewatch' in lexicon as 'watch' */

  var checkPrefix = function checkPrefix(terms, world) {
    var lex = world.lexicon;
    terms.forEach(function (term) {
      // skip if we have a good tag already
      if (term.isKnown() === true) {
        return;
      } //does it start with 'un|re'


      if (hasPrefix.test(term.clean) === true) {
        // look for the root word in the lexicon:
        var stem = term.clean.replace(prefix, '');

        if (lex[stem] !== undefined && lex.hasOwnProperty(stem) === true) {
          term.tag(lex[stem], 'stem-' + stem, world);
        }
      }
    });
  };

  var _03Stem = checkPrefix;

  var step = {
    neighbours: _01Neighbours,
    "case": _02Case$1,
    plural: _04Plurals,
    stem: _03Stem
  }; //

  var fallbacks = function fallbacks(doc) {
    var terms = doc.termList();
    var world = doc.world; // if it's empty, consult it's neighbours, first

    step.neighbours(terms, world); // is there a case-sensitive clue?

    step["case"](terms, world); // check 'rewatch' as 'watch'

    step.stem(terms, world); // ... fallback to a noun!

    terms.forEach(function (t) {
      if (t.isKnown() === false) {
        t.tag('Noun', 'noun-fallback', doc.world);
      }
    }); //are the nouns singular or plural?

    terms.forEach(function (t) {
      step.plural(t, doc.world);
    });
    return doc;
  };

  var _02Fallbacks = fallbacks;

  var hasNegative = /n't$/;
  var irregulars$6 = {
    "won't": ['will', 'not'],
    wont: ['will', 'not'],
    "can't": ['can', 'not'],
    cant: ['can', 'not'],
    cannot: ['can', 'not'],
    "shan't": ['should', 'not'],
    dont: ['do', 'not'],
    dun: ['do', 'not'] // "ain't" is ambiguous for is/was

  };

  var checkNegative = function checkNegative(term) {
    //check named-ones
    if (irregulars$6.hasOwnProperty(term.clean) === true) {
      return irregulars$6[term.clean];
    } //try it normally


    if (hasNegative.test(term.clean) === true) {
      var main = term.clean.replace(hasNegative, '');
      return [main, 'not'];
    }

    return null;
  };

  var _01Negative = checkNegative;

  var contraction = /([a-z\u00C0-\u00FF]+)'([a-z]{1,2})$/i; //these ones don't seem to be ambiguous

  var easy = {
    ll: 'will',
    ve: 'have',
    re: 'are',
    m: 'am',
    "n't": 'not'
  }; //

  var checkApostrophe = function checkApostrophe(term) {
    var parts = term.text.match(contraction);

    if (parts === null) {
      return null;
    }

    if (easy.hasOwnProperty(parts[2])) {
      return [parts[1], easy[parts[2]]];
    }

    return null;
  };

  var _02Simple = checkApostrophe;

  var irregulars$7 = {
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
    '@': ['at']
  }; // either 'is not' or 'are not'

  var doAint = function doAint(term, phrase) {
    var terms = phrase.terms();
    var index = terms.indexOf(term);
    var before = terms.slice(0, index); //look for the preceding noun

    var noun = before.find(function (t) {
      return t.tags.Noun;
    });

    if (noun && noun.tags.Plural) {
      return ['are', 'not'];
    }

    return ['is', 'not'];
  }; //


  var checkIrregulars = function checkIrregulars(term, phrase) {
    //this word needs it's own logic:
    if (term.clean === "ain't" || term.clean === 'aint') {
      return doAint(term, phrase);
    } //check white-list


    if (irregulars$7.hasOwnProperty(term.clean)) {
      return irregulars$7[term.clean];
    }

    return null;
  };

  var _03Irregulars = checkIrregulars;

  var hasApostropheS = /([a-z\u00C0-\u00FF]+)'s$/i;
  var blacklist$1 = {
    that: true,
    there: true
  };

  var isPossessive = function isPossessive(term, pool) {
    // if we already know it
    if (term.tags.Possessive) {
      return true;
    } //a pronoun can't be possessive - "he's house"


    if (term.tags.Pronoun || term.tags.QuestionWord) {
      return false;
    }

    if (blacklist$1.hasOwnProperty(term.clean)) {
      return false;
    } //if end of sentence, it is possessive - "was spencer's"


    var nextTerm = pool.get(term.next);

    if (!nextTerm) {
      return true;
    } //a gerund suggests 'is walking'


    if (nextTerm.tags.Verb) {
      //fix 'jamie's bite'
      if (nextTerm.tags.Infinitive) {
        return true;
      }

      return false;
    } //spencer's house


    if (nextTerm.tags.Noun) {
      return true;
    } //rocket's red glare


    var twoTerm = pool.get(nextTerm.next);

    if (twoTerm && twoTerm.tags.Noun) {
      return true;
    } //othwerwise, an adjective suggests 'is good'


    if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
      return false;
    }

    return false;
  };

  var isHas = function isHas(term, phrase) {
    var terms = phrase.terms();
    var index = terms.indexOf(term);
    var after = terms.slice(index + 1, index + 3); //look for a past-tense verb

    return after.find(function (t) {
      return t.tags.PastTense;
    });
  };

  var checkPossessive = function checkPossessive(term, phrase, world) {
    //the rest of 's
    var found = term.text.match(hasApostropheS);

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

  var _04Possessive = checkPossessive;

  var hasPerfect = /[a-z\u00C0-\u00FF]'d$/;
  /** split `i'd` into 'i had', or 'i would' */

  var checkPerfect = function checkPerfect(term, phrase) {
    if (hasPerfect.test(term.clean)) {
      var root = term.clean.replace(/'d$/, ''); //look at the next few words

      var terms = phrase.terms();
      var index = terms.indexOf(term);
      var after = terms.slice(index + 1, index + 4); //is it before a past-tense verb? - 'i'd walked'

      for (var i = 0; i < after.length; i++) {
        var t = after[i];

        if (t.tags.Verb) {
          if (t.tags.PastTense) {
            return [root, 'had'];
          }

          return [root, 'would'];
        }
      } //otherwise, 'i'd walk'


      return [root, 'would'];
    }

    return null;
  };

  var _05PerfectTense = checkPerfect;

  var createPhrase = function createPhrase(found, doc) {
    //create phrase from ['would', 'not']
    var phrase = _01Tokenizer.fromText(found.join(' '), doc.world, doc.pool())[0]; //tag it

    var terms = phrase.terms();
    _01Lexicon(terms, doc.world); //make these terms implicit

    terms.forEach(function (t, i) {
      t.implicit = t.text;
      t.text = '';
      t.clean = ''; // remove whitespace for implicit terms

      t.pre = '';
      t.post = '';
    });
    return phrase;
  };

  var contractions = function contractions(doc) {
    var world = doc.world;
    doc.list.forEach(function (p) {
      var terms = p.terms();

      for (var i = 0; i < terms.length; i += 1) {
        var term = terms[i];
        var found = _01Negative(term);
        found = found || _02Simple(term);
        found = found || _03Irregulars(term, p);
        found = found || _04Possessive(term, p, world);
        found = found || _05PerfectTense(term, p); //add them in

        if (found !== null) {
          var newPhrase = createPhrase(found, doc); //set text as contraction

          var firstTerm = newPhrase.terms(0);
          firstTerm.text = term.text; //grab sub-phrase to remove

          var match = p.buildFrom(term.id, 1, doc.pool());
          match.replace(newPhrase, doc);
        }
      }
    });
    return doc;
  };

  var _03Contractions = contractions;

  //nouns that also signal the title of an unknown organization
  //todo remove/normalize plural forms
  var orgWords = ['academy', 'administration', 'agence', 'agences', 'agencies', 'agency', 'airlines', 'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority', 'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery', 'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital', 'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir', 'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition', 'coffee', 'collective', 'college', 'commission', 'committee', 'communications', 'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference', 'conseil', 'consulting', 'containers', 'corporation', 'corps', 'corp', 'council', 'crew', 'daily news', 'data', 'departement', 'department', 'department store', 'departments', 'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise', 'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises', 'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial', 'fm', 'foundation', 'fund', 'gas', 'gazette', 'girls', 'government', 'group', 'guild', 'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc', 'industries', 'institut', 'institute', 'institute of technology', 'institutes', 'insurance', 'international', 'interstate', 'investment', 'investments', 'investors', 'journal', 'laboratory', 'labs', // 'law',
  'liberation army', 'limited', 'local authority', 'local health authority', 'machines', 'magazine', 'management', 'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere', 'ministry', 'military', 'mobile', 'motor', 'motors', 'musee', 'museum', // 'network',
  'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra', 'organization', 'partners', 'partnership', // 'party',
  "people's party", 'petrol', 'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc', 'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio', 'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant', 'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club', 'societe', 'society', 'sons', 'standard', 'state police', 'state university', 'stock exchange', 'subcommittee', 'syndicat', 'systems', 'telecommunications', 'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university', 'utilities', 'workers'];
  var orgWords_1 = orgWords.reduce(function (h, str) {
    h[str] = 'Noun';
    return h;
  }, {});

  var maybeOrg = function maybeOrg(t) {
    //must be a noun
    if (!t.tags.Noun) {
      return false;
    } //can't be these things


    if (t.tags.Pronoun || t.tags.Comma || t.tags.Possessive) {
      return false;
    } //must be one of these


    if (t.tags.TitleCase || t.tags.Organization || t.tags.Acronym || t.tags.Place) {
      return true;
    }

    return false;
  };

  var tagOrgs = function tagOrgs(doc, termArr) {
    termArr.forEach(function (terms) {
      for (var i = 0; i < terms.length; i += 1) {
        var t = terms[i];

        if (orgWords_1[t.clean] !== undefined && orgWords_1.hasOwnProperty(t.clean) === true) {
          // look-backward - eg. 'Toronto University'
          var lastTerm = terms[i - 1];

          if (lastTerm !== undefined && maybeOrg(lastTerm) === true) {
            lastTerm.tag('Organization', 'org-word-1', doc.world);
            t.tag('Organization', 'org-word-2', doc.world);
            continue;
          } //look-forward - eg. University of Toronto


          var nextTerm = terms[i + 1];

          if (nextTerm !== undefined && nextTerm.clean === 'of') {
            if (terms[i + 2] && maybeOrg(terms[i + 2])) {
              t.tag('Organization', 'org-of-word-1', doc.world);
              nextTerm.tag('Organization', 'org-of-word-2', doc.world);
              terms[i + 2].tag('Organization', 'org-of-word-3', doc.world);
              continue;
            }
          }
        }
      }
    });
    return doc;
  };

  var _01Organizations = tagOrgs;

  var inference = function inference(doc) {
    var termArr = doc.list.map(function (p) {
      return p.terms();
    });
    _01Organizations(doc, termArr);
    return doc;
  };

  var _04Inference = inference;

  //mostly pos-corections here
  var miscCorrection = function miscCorrection(doc) {
    //misc:
    //foot/feet
    doc.match('(foot|feet)').tag('Noun', 'foot-noun'); //3 feet

    doc.match('#Value [(foot|feet)]').tag('Unit', 'foot-unit'); //'u' as pronoun

    doc.match('#Conjunction [u]').tag('Pronoun', 'u-pronoun-2'); //6 am

    doc.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day'); //timezones

    doc.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone'); //about to go

    doc.match('[about to] #Adverb? #Verb').tag(['Auxiliary', 'Verb'], 'about-to'); //right of way

    doc.match('(right|rights) of .').tag('Noun', 'right-of'); // a bit

    doc.match('[much] #Adjective').tag('Adverb');
    doc.match('a [bit]').tag('Noun');
    doc.match('a bit much').tag('Determiner Adverb Adjective');
    doc.match('too much').tag('Adverb Adjective'); // u r cool

    doc.match('u r').tag('Pronoun #Copula'); //swear-words as non-expression POS
    //nsfw

    doc.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
    doc.match('#Determiner [(shit|damn|hell)]').tag('Noun', 'swears-noun');
    doc.match('[(shit|damn|fuck)] (#Determiner|#Possessive|them)').tag('Verb', 'swears-verb');
    doc.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective'); //ambig prepositions/conjunctions

    var so = doc["if"]('so');

    if (so.found === true) {
      //so funny
      so.match('[so] #Adjective').tag('Adverb', 'so-adv'); //so the

      so.match('[so] #Noun').tag('Conjunction', 'so-conj'); //do so

      so.match('do [so]').tag('Noun', 'so-noun');
    }

    var all = doc["if"]('all');

    if (all.found === true) {
      //all students
      all.match('[all] #Determiner? #Noun').tag('Adjective', 'all-noun'); //it all fell apart

      all.match('[all] #Verb').tag('Adverb', 'all-verb');
    } //the ambiguous word 'that' and 'which'


    var which = doc["if"]('which');

    if (which.found === true) {
      //remind john that
      which.match('#Verb #Adverb? #Noun [(that|which)]').tag('Preposition', 'that-prep'); //that car goes

      which.match('that #Noun [#Verb]').tag('Determiner', 'that-determiner'); //work, which has been done.

      which.match('#Comma [which] (#Pronoun|#Verb)').tag('Preposition', 'which-copula'); //things that provide
      // doc.match('#Plural (that|which) #Adverb? #Verb').term(1).tag('Preposition', 'noun-that');
    } //like


    var like = doc["if"]('like');

    if (like.found === true) {
      like.match('just [like]').tag('Preposition', 'like-preposition'); //folks like her

      like.match('#Noun [like] #Noun').tag('Preposition', 'noun-like'); //look like

      like.match('#Verb [like]').tag('Adverb', 'verb-like'); //exactly like

      like.match('#Adverb like').notIf('(really|generally|typically|usually|sometimes|often) [like]').tag('Adverb', 'adverb-like');
    }

    var title = doc["if"]('#TitleCase');

    if (title.found === true) {
      //FitBit Inc
      title.match('#TitleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv'); //Foo District

      title.match('#TitleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)').tag('Region', 'foo-district'); //District of Foo

      title.match('(district|region|province|municipality|territory|burough|state) of #TitleCase').tag('Region', 'district-of-Foo');
    }

    var hyph = doc["if"]('#Hyphenated');

    if (hyph.found === true) {
      //air-flow
      hyph.match('#Hyphenated #Hyphenated').match('#Noun #Verb').tag('Noun', 'hyphen-verb'); //connect hyphenated expressions - 'ooh-wee'

      hyph.match('#Hyphenated+')["if"]('#Expression').tag('Expression', 'ooh-wee');
    }

    var place = doc["if"]('#Place');

    if (place.found === true) {
      //West Norforlk
      place.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk'); //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)

      place.match('#City [#Acronym]').match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)').tag('Region', 'us-state');
    }

    return doc;
  };

  var fixMisc = miscCorrection;

  //Determiner-signals
  var fixThe = function fixThe(doc) {
    var det = doc["if"]('#Determiner');

    if (det.found === true) {
      //the wait to vote
      det.match('(the|this) [#Verb] #Preposition .').tag('Noun', 'correction-determiner1'); //the nice swim

      det.match('(the|this|those|these) #Adjective [#Verb]').tag('Noun', 'the-adj-verb'); //the truly nice swim

      det.match('(the|this|those|these) #Adverb #Adjective [#Verb]').tag('Noun', 'correction-determiner4'); //a stream runs

      det.match('(the|this|a|an) [#Infinitive] #Adverb? #Verb').tag('Noun', 'correction-determiner5'); //some pressing issues

      det.match('some [#Verb] #Plural').tag('Noun', 'correction-determiner6'); //the orange is

      det.match('#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)').tag('Noun', 'the-adj-2'); //a sense of

      det.match('#Determiner [#Verb] of').tag('Noun', 'the-verb-of'); //the threat of force

      det.match('#Determiner #Noun of [#Verb]').tag('Noun', 'noun-of-noun'); //a close

      det.match('#Determiner #Adverb? [close]').tag('Adjective', 'a-close'); //the test string

      det.match('#Determiner [#Infinitive] #Noun').tag('Noun', 'correction-determiner7'); //by a bear.

      det.match('#Determiner [#Infinitive]$').tag('Noun', 'a-inf'); //the western line

      det.match('#Determiner [(western|eastern|northern|southern|central)] #Noun').tag('Noun', 'western-line'); //the swim

      det.match('(the|those|these) [(#Infinitive|#PresentTense|#PastTense)]').tag('Noun', 'correction-determiner2'); //the orange.

      det.match('#Determiner #Adjective$').notIf('(#Comparative|#Superlative)').terms(1).tag('Noun', 'the-adj-1');
    }

    var an = doc["if"]('(a|an)');

    if (an.found === true) {
      //a staggering cost
      an.match('(a|an) [#Gerund]').tag('Adjective', 'correction-a|an'); //did a 900, paid a 20

      an.match('#Verb (a|an) [#Value]').tag('Singular', 'a-value'); //a tv show

      an.match('(a|an) #Noun [#Infinitive]').tag('Noun', 'a-noun-inf'); //a great run

      an.match('(a|an) #Adjective (#Infinitive|#PresentTense)').terms(2).tag('Noun', 'correction-a|an2'); //'a/an' can mean 1 - "a hour"

      an.match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)').ifNo('#Plural').tag('Value', 'a-is-one');
    }

    return doc;
  };

  var fixThe_1 = fixThe;

  //
  var fixNouns = function fixNouns(doc) {
    var noun = doc["if"]('#Noun');

    if (noun.found === true) {
      //'more' is not always an adverb
      noun.match('more #Noun').tag('Noun', 'more-noun'); //he quickly foo

      noun.match('#Noun #Adverb [#Noun]').tag('Verb', 'correction'); //fix for busted-up phrasalVerbs

      noun.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal'); //John & Joe's

      noun.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun'); //Aircraft designer

      noun.match('#Noun #Actor').tag('Actor', 'thing-doer'); //this rocks

      noun.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs'); //j.k Rowling

      doc.match('#Noun van der? #Noun').tagSafe('#Person', 'von der noun'); //king of spain

      doc.match('(king|queen|prince|saint|lady) of? #Noun').tagSafe('#Person', 'king-of-noun'); //the word 'second'

      noun.match('[second] #Noun').notIf('#Honorific').unTag('Unit').tag('Ordinal', 'second-noun'); //linear algebra

      noun.match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun').tag('Noun', 'technical-noun'); //organization

      var org = noun["if"]('#Organization');

      if (org.found === true) {
        org.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place');
        org.match('#Organization #Country').tag('Organization', 'org-country');
        org.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
      }
    } //acronyms


    var acronym = doc["if"]('#Acronym');

    if (acronym.found === true) {
      acronym.match('the [#Acronym]').notIf('(iou|fomo|yolo|diy|dui|nimby)').tag('Organization', 'the-acronym');
      acronym.match('#Acronym').match('#Possessive').tag('Organization', 'possessive-acronym');
    } //possessives


    var poss = doc["if"]('#Possessive');

    if (poss.found === true) {
      //my buddy
      poss.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name'); //spencer kelly's

      poss.match('#FirstName #Acronym? #Possessive').ifNo('#Comma').match('#FirstName #Acronym? #LastName').tag('Possessive'); //Super Corp's fundraiser

      poss.match('#Organization+ #Possessive').ifNo('#Comma').tag('Possessive'); //Los Angeles's fundraiser

      poss.match('#Place+ #Possessive').ifNo('#Comma').tag('Possessive');
    }

    return doc;
  };

  var fixNouns_1 = fixNouns;

  var maybeNoun = '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)';
  var maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)';
  var maybeAdj = '(misty|rusty|dusty|rich|randy)';
  var maybeDate = '(april|june|may|jan|august|eve)';
  var maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)';

  var fixPerson = function fixPerson(doc) {
    // clues from honorifics
    var hon = doc["if"]('#Honorific');

    if (hon.found === true) {
      //mr Putin
      doc.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin'); //mr X

      hon.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase'); //remove single 'mr'

      hon.match('^#Honorific$').unTag('Person', 'single-honorific'); //first general..

      hon.match('[(1st|2nd|first|second)] #Honorific').tag('Honorific', 'ordinal-honorific');
    } //methods requiring a titlecase


    var titleCase = doc["if"]('#TitleCase');

    if (titleCase.found === true) {
      titleCase.match('#Acronym #TitleCase').tagSafe('#Person', 'acronym-titlecase'); //ludwig van beethovan

      titleCase.match('#TitleCase (van|al|bin) #TitleCase').tagSafe('Person', 'titlecase-van-titlecase'); //jose de Sucre

      titleCase.match('#TitleCase (de|du) la? #TitleCase').tagSafe('Person', 'titlecase-van-titlecase'); //pope francis

      titleCase.match('(lady|queen|sister) #TitleCase').ifNo('#Date').ifNo('#Honorific').tag('#FemaleName', 'lady-titlecase');
      titleCase.match('(king|pope|father) #TitleCase').ifNo('#Date').tag('#MaleName', 'poe');
    }

    var person = doc["if"]('#Person');

    if (person.found === true) {
      //Frank jr
      person.match('#Person (jr|sr|md)').tag('Person', 'person-honorific'); //peter II

      person.match('#Person #Person the? #RomanNumeral').tag('Person', 'roman-numeral'); //'Professor Fink', 'General McCarthy'

      person.match('#Honorific #Person').tag('Person', 'Honorific-Person'); // 'john E rockefeller'

      person.match('#FirstName [/^[^aiurck]$/]').tag(['Acronym', 'Person'], 'john-e'); //Doctor john smith jr

      person.match('#Honorific #Person').tag('Person', 'honorific-person'); //general pearson

      person.match('[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person').tag('Honorific', 'ambg-honorifics'); //Morgan Shlkjsfne

      titleCase.match('#Person #TitleCase').match('#TitleCase #Noun').tagSafe('Person', 'person-titlecase'); //a bunch of ambiguous first names
      //Nouns: 'viola' or 'sky'

      var ambigNoun = person["if"](maybeNoun);

      if (ambigNoun.found === true) {
        ambigNoun.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray');
        ambigNoun.match(maybeNoun + ' (#Person|#Acronym|#TitleCase)').tagSafe('Person', 'ray-smith');
      } //Verbs: 'pat' or 'wade'


      var ambigVerb = person["if"](maybeVerb);

      if (ambigVerb === true) {
        ambigVerb.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark');
        ambigVerb.match(maybeVerb + ' (#Person|#TitleCase)').tag('Person', 'rob-smith');
      } //Adjectives: 'rusty' or 'rich'


      var ambigAdj = person["if"](maybeAdj);

      if (ambigAdj.found === true) {
        ambigAdj.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich');
        ambigAdj.match(maybeAdj + ' (#Person|#TitleCase)').tag('Person', 'randy-smith');
      } //Dates: 'june' or 'may'


      var ambigDate = person["if"](maybeDate);

      if (ambigDate.found === true) {
        ambigDate.match(String(maybeDate) + ' (#Person|#TitleCase)').tagSafe('Person', 'june-smith');
        ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']').tagSafe('Date', 'in-june');
        ambigDate.match(maybeDate + ' (#Date|#Value)').tagSafe('Date', 'june-5th');
      } //Places: paris or syndey


      var ambigPlace = person["if"](maybePlace);

      if (ambigPlace.found === true) {
        ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']').tagSafe('Place', 'in-paris');
        ambigPlace.match('[' + maybePlace + '] #Place').tagSafe('Place', 'paris-france');
        ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton');
      } //this one is tricky


      var al = person["if"]('al');

      if (al.found === true) {
        al.match('al (#Person|#TitleCase)').tagSafe('#Person', 'al-borlen');
        al.match('#TitleCase al #TitleCase').tagSafe('#Person', 'arabic-al-arabic');
      }

      var firstName = person["if"]('#FirstName');

      if (firstName.found === true) {
        //ferdinand de almar
        firstName.match('#FirstName de #Noun').tag('#Person', 'firstname-de-noun'); //Osama bin Laden

        firstName.match('#FirstName (bin|al) #Noun').tag('#Person', 'firstname-al-noun'); //John L. Foo

        firstName.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase'); //Andrew Lloyd Webber

        firstName.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase'); //Mr Foo

        firstName.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase'); //peter the great

        firstName.match('#FirstName the #Adjective').tag('Person', 'determiner5'); //very common-but-ambiguous lastnames

        firstName.match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)').tag('#Person', 'firstname-maybe'); //John Foo

        firstName.match('#FirstName #TitleCase #TitleCase?').match('#Noun+').tag('Person', 'firstname-titlecase'); //Joe K. Sombrero

        firstName.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', 'n-acro-noun').lastTerm().tag('#LastName', 'n-acro-noun'); // Dwayne 'the rock' Johnson

        firstName.match('#FirstName [#Determiner #Noun] #LastName').tag('#NickName', 'first-noun-last').tag('#Person', 'first-noun-last'); //john bodego's

        firstName.match('#FirstName (#Singular|#Possessive)').ifNo('#Date').ifNo('#NickName').tag('#Person', 'first-possessive').lastTerm().tag('#LastName', 'first-possessive'); // Firstname x (dangerous)

        var tmp = firstName.match('#FirstName (#Noun|#TitleCase)').ifNo('^#Possessive').ifNo('#ClauseEnd .').ifNo('#Pronoun');
        tmp.lastTerm().tag('#LastName', 'firstname-noun');
      }

      var lastName = person["if"]('#LastName');

      if (lastName === true) {
        //is foo Smith
        lastName.match('#Copula [(#Noun|#PresentTense)] #LastName').tag('#FirstName', 'copula-noun-lastname'); // x Lastname

        lastName.match('[#Noun] #LastName').canBe('#FirstName').tag('#FirstName', 'noun-lastname'); //ambiguous-but-common firstnames

        lastName.match('[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName').tag('#FirstName', 'maybe-lastname'); //Jani K. Smith

        lastName.match('#TitleCase #Acronym? #LastName').ifNo('#Date').tag('#Person', 'title-acro-noun').lastTerm().tag('#LastName', 'title-acro-noun');
      }
    }

    return doc;
  };

  var fixPerson_1 = fixPerson;

  var advb = '(#Adverb|not)+?'; //

  var fixVerb = function fixVerb(doc) {
    var vb = doc["if"]('#Verb');

    if (vb.found) {
      //still make
      vb.match('[still] #Verb').tag('Adverb', 'still-verb'); //'u' as pronoun

      vb.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1'); //is no walk

      vb.match('is no [#Verb]').tag('Noun', 'is-no-verb'); //different views than

      vb.match('[#Verb] than').tag('Noun', 'correction'); //her polling

      vb.match('#Possessive [#Verb]').tag('Noun', 'correction-possessive'); //there are reasons

      vb.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are'); //jack seems guarded

      vb.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled'); //fall over

      vb.match('#PhrasalVerb [#PhrasalVerb]').tag('Particle', 'phrasal-particle'); //went to sleep
      // vb.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
      //support a splattering of auxillaries before a verb

      vb.match("(has|had) ".concat(advb, " #PastTense")).not('#Verb$').tag('Auxiliary', 'had-walked'); //was walking

      vb.match("#Copula ".concat(advb, " #Gerund")).not('#Verb$').tag('Auxiliary', 'copula-walking'); //been walking

      vb.match("(be|been) ".concat(advb, " #Gerund")).not('#Verb$').tag('Auxiliary', 'be-walking'); //would walk

      vb.match("(#Modal|did) ".concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'modal-verb'); //would have had

      vb.match("#Modal ".concat(advb, " have ").concat(advb, " had ").concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'would-have'); //would be walking

      vb.match("(#Modal) ".concat(advb, " be ").concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'would-be'); //would been walking

      vb.match("(#Modal|had|has) ".concat(advb, " been ").concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'would-be'); //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
      // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');

      var copula = vb["if"]('#Copula');

      if (copula.found === true) {
        //is mark hughes
        copula.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun'); //

        copula.match('[#Infinitive] #Copula').tag('Noun', 'inf-copula'); //sometimes not-adverbs

        copula.match('#Copula [(just|alone)]$').tag('Adjective', 'not-adverb'); //jack is guarded

        copula.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled'); //is eager to go

        copula.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction'); //sometimes adverbs - 'pretty good','well above'

        copula.match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)').ifNo('#Comma').tag('#Copula #Adverb #Adjective', 'sometimes-adverb');
      } //Gerund - 'walking'


      var gerund = vb["if"]('#Gerund');

      if (gerund.found === true) {
        //walking is cool
        gerund.match('#Gerund #Adverb? not? #Copula').firstTerm().tag('Activity', 'gerund-copula'); //walking should be fun

        gerund.match('#Gerund #Modal').firstTerm().tag('Activity', 'gerund-modal'); //running-a-show

        gerund.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show'); //setting records
        // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
      } //'will be'


      var willBe = vb["if"]('will #Adverb? not? #Adverb? be');

      if (willBe.found === true) {
        //will be running (not copula
        if (willBe.has('will #Adverb? not? #Adverb? be #Gerund') === false) {
          //tag it all
          willBe.match('will not? be').tag('Copula', 'will-be-copula'); //for more complex forms, just tag 'be'

          willBe.match('will #Adverb? not? #Adverb? be #Adjective').match('be').tag('Copula', 'be-copula');
        }
      }
    } //question words


    var m = doc["if"]('(who|what|where|why|how|when)');

    if (m.found) {
      //the word 'how'
      m.match('^how').tag('QuestionWord', 'how-question');
      m.match('[how] (#Determiner|#Copula|#Modal|#PastTense)').tag('QuestionWord', 'how-is'); // //the word 'which'

      m.match('^which').tag('QuestionWord', 'which-question');
      m.match('[which] . (#Noun)+ #Pronoun').tag('QuestionWord', 'which-question2');
      m.match('which').tag('QuestionWord', 'which-question3'); //how he is driving

      m.match('[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)').unTag('QuestionWord').tag('Conjunction', 'how-he-is-x'); //when i go fishing

      m.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund').unTag('QuestionWord').tag('Conjunction', 'when i go fishing');
    }

    return doc;
  };

  var fixVerb_1 = fixVerb;

  //
  var fixAdjective = function fixAdjective(doc) {
    var adj = doc["if"]('#Adjective');

    if (adj.found) {
      //still good
      adj.match('[still] #Adjective').tag('Adverb', 'still-advb'); //barely even walk

      adj.match('(barely|hardly) even').tag('#Adverb', 'barely-even'); //big dreams, critical thinking

      adj.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense'); //will secure our

      adj.match('will [#Adjective]').tag('Verb', 'will-adj'); //cheering hard - dropped -ly's

      adj.match('#PresentTense [(hard|quick|long|bright|slow)]').tag('Adverb', 'lazy-ly'); //his fine

      adj.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine'); //he left

      adj.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb');
    }

    return doc;
  };

  var fixAdjective_1 = fixAdjective;

  //
  var fixValue = function fixValue(doc) {
    //canadian dollar, Brazilian pesos
    doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency');
    var val = doc["if"]('#Value');

    if (val.found === true) {
      //half a million
      val.match('half a? #Value').tag('Value', 'half-a-value'); //(quarter not ready)
      //five and a half

      val.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half'); //one hundred and seven dollars

      val.match('#Money and #Money #Currency?').tag('Money', 'money-and-money'); //1 800 PhoneNumber

      val.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value'); //(454) 232-9873

      val.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber'); //three trains

      val.match('#Value [#PresentTense]').tag('Plural', 'value-presentTense'); //all values are either ordinal or cardinal
      // doc.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');
      //money

      val.match('#Value+ #Currency').tag('Money', 'value-currency').lastTerm().tag('Unit', 'money-unit'); //two hundredth

      val.match('#TextValue+').match('#Cardinal+ #Ordinal').tag('Ordinal', 'two-hundredth');
    }

    return doc;
  };

  var fixValue_1 = fixValue;

  //ambiguous 'may' and 'march'
  var preps = '(in|by|before|during|on|until|after|of|within|all)';
  var thisNext = '(last|next|this|previous|current|upcoming|coming)';
  var sections = '(start|end|middle|starting|ending|midpoint|beginning)';
  var seasons = '(spring|summer|winter|fall|autumn)';
  var people = '(january|april|may|june|summer|autumn|jan|sep)';
  var verbs$3 = '(may|march)';
  var units = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'; //ensure a year is approximately typical for common years
  //please change in one thousand years

  var tagYear = function tagYear(m, reason) {
    if (m.found !== true) {
      return;
    }

    var term = m.termList()[0];

    if (term) {
      var num = parseInt(term.clean, 10);

      if (num && num > 1000 && num < 3000) {
        m.tag('Year', reason);
      }
    }
  }; //same, but for less-confident values


  var tagYearSafe = function tagYearSafe(m, reason) {
    if (m.found !== true) {
      return;
    }

    var term = m.termList()[0];

    if (term) {
      var num = parseInt(term.clean, 10);

      if (num && num > 1900 && num < 2030) {
        m.tag('Year', reason);
      }
    }
  };

  var fixDates = function fixDates(doc) {
    doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
    doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm'); //ambiguous month - person forms

    var person = doc["if"](people);

    if (person.found === true) {
      //give to april
      person.match("#Infinitive #Determiner? #Adjective? #Noun? (to|for) [".concat(people, "]")).tag('Person', 'ambig-person'); //remind june

      person.match("#Infinitive [".concat(people, "]")).tag('Person', 'infinitive-person'); //may waits for

      person.match("[".concat(people, "] #PresentTense (to|for)")).tag('Person', 'ambig-active'); //april will

      person.match("[".concat(people, "] #Modal")).tag('Person', 'ambig-modal'); //would april

      person.match("#Modal [".concat(people, "]")).tag('Person', 'modal-ambig'); //with april

      person.match("(that|with|for) [".concat(people, "]")).tag('Person', 'that-month'); //it is may

      person.match("#Copula [".concat(people, "]")).tag('Person', 'is-may'); //may is

      person.match("[".concat(people, "] #Copula")).tag('Person', 'may-is'); //april the 5th

      person.match("[".concat(people, "] the? #Value")).tag('Month', 'person-value'); //wednesday april

      person.match("#Date [".concat(people, "]")).tag('Month', 'correction-may'); //may 5th

      person.match("[".concat(people, "] the? #Value")).tag('Month', 'may-5th'); //5th of may

      person.match("#Value of [".concat(people, "]")).tag('Month', '5th-of-may'); //by april

      person.match("".concat(preps, " ").concat(people)).ifNo('#Holiday').terms(1).tag('Month', 'preps-month'); //this april

      person.match("(next|this|last) [".concat(people, "]")).tag('Month', 'correction-may'); //maybe not 'this'
    } //ambiguous month - verb-forms


    var verb = doc["if"](verbs$3);

    if (verb.found === true) {
      //quickly march
      verb.match("#Adverb ".concat(verbs$3)).lastTerm().tag('Infinitive', 'ambig-verb');
      verb.match("".concat(verbs$3, " #Adverb")).lastTerm().tag('Infinitive', 'ambig-verb'); //all march

      verb.match("".concat(preps, " ").concat(verbs$3)).lastTerm().tag('Month', 'in-month'); //this march

      verb.match("(next|this|last) ".concat(verbs$3)).lastTerm().tag('Month', 'this-month'); //with date

      verb.match("".concat(verbs$3, " the? #Value")).firstTerm().tag('Month', 'march-5th');
      verb.match("#Value of? ".concat(verbs$3)).lastTerm().tag('Month', '5th-of-march'); //nearby

      verb.match("[".concat(verbs$3, "] .? #Date")).lastTerm().tag('Month', 'march-and-feb');
      verb.match("#Date .? [".concat(verbs$3, "]")).lastTerm().tag('Month', 'feb-and-march');
      var march = doc["if"]('march');

      if (march.found === true) {
        //march to
        march.match('[march] (up|down|back|to|toward)').tag('Infinitive', 'march-to'); //must march

        march.match('#Modal [march]').tag('Infinitive', 'must-march');
      }
    } //sun 5th


    var sun = doc["if"]('sun');

    if (sun.found === true) {
      //sun feb 2
      sun.match('[sun] #Date').tag('WeekDay', 'sun-feb'); //sun the 5th

      sun.match('sun the #Ordinal').tag('Date').firstTerm().tag('WeekDay', 'sun-the-5th'); //the sun

      sun.match('#Determiner [sun]').tag('Singular', 'the-sun');
    } //sat, nov 5th


    var sat = doc["if"]('sat');

    if (sat.found) {
      //sat november
      sat.match('[sat] #Date').tag('WeekDay', 'sat-feb'); //this sat

      sat.match("".concat(preps, " [sat]")).tag('WeekDay', 'sat');
    } //months:


    var month = doc["if"]('#Month');

    if (month.found === true) {
      //June 5-7th
      month.match("#Month #DateRange+").tag('Date', 'correction-numberRange'); //5th of March

      month.match('#Value of #Month').tag('Date', 'value-of-month'); //5 March

      month.match('#Cardinal #Month').tag('Date', 'cardinal-month'); //march 5 to 7

      month.match('#Month #Value to #Value').tag('Date', 'value-to-value'); //march the 12th

      month.match('#Month the #Value').tag('Date', 'month-the-value');
    } //months:


    var val = doc["if"]('#Value');

    if (val.found === true) {
      //values
      val.match('#Value #Abbreviation').tag('Value', 'value-abbr'); //seven point five

      val.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value'); //minus 7

      val.match('(minus|negative) #Value').tag('Value', 'minus-value'); // ten grand

      val.match('#Value grand').tag('Value', 'value-grand'); //quarter million

      val.match('(a|the) [(half|quarter)] #Ordinal').tag('Value', 'half-ordinal'); //june 7

      val.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value'); //7 june

      val.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date'); //may twenty five

      val.match('#TextValue #TextValue')["if"]('#Date').tag('#Date', 'textvalue-date'); //eg 'year'

      var duration = val["if"]('#Duration');

      if (duration.found === true) {
        //for 4 months
        duration.match('for #Value #Duration').tag('Date', 'for-x-duration'); //two days before

        duration.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction'); //for four days

        duration.match("".concat(preps, "? #Value #Duration")).tag('Date', 'value-duration'); //two years old

        duration.match('#Value #Duration old').unTag('Date', 'val-years-old');
      } //eg 'trillion'


      var mult = val["if"](units);

      if (mult.found === true) {
        mult.match('a #Value').tag('Value', 'a-value'); // mult.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready

        mult.match("".concat(units, " and #Value")).tag('Value', 'magnitude-and-value');
      }
    } //seasons


    var season = doc["if"](seasons);

    if (season.found === true) {
      season.match("".concat(preps, "? ").concat(thisNext, " ").concat(seasons)).tag('Date', 'thisNext-season');
      season.match("the? ".concat(sections, " of ").concat(seasons)).tag('Date', 'section-season');
      season.match("".concat(seasons, " ").concat(preps, "? #Cardinal")).tag('Date', 'season-year');
    } //rest-dates


    var date = doc["if"]('#Date');

    if (date.found === true) {
      //june the 5th
      date.match('#Date the? #Ordinal').tag('Date', 'correction'); //last month

      date.match("".concat(thisNext, " #Date")).tag('Date', 'thisNext'); //by 5 March

      date.match('due? (by|before|after|until) #Date').tag('Date', 'by'); //next feb

      date.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb'); //start of june

      date.match("the? ".concat(sections, " of #Date")).tag('Date', 'section-of'); //fifth week in 1998

      date.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in'); //early in june

      date.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening'); //tomorrow before 3

      date.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal'); //saturday am

      date.match('#Date [(am|pm)]').unTag('Verb').unTag('Copula').tag('Time', 'date-am'); //feb to june

      date.match('#Date (#Preposition|to) #Date').ifNo('#Duration').tag('Date', 'date-prep-date');
    } //year/cardinal tagging


    var cardinal = doc["if"]('#Cardinal');

    if (cardinal.found === true) {
      var v = cardinal.match("#Date #Value [#Cardinal]");
      tagYear(v, 'date-value-year'); //scoops up a bunch

      v = cardinal.match("#Date+ [#Cardinal]");
      tagYear(v, 'date-year'); //feb 8 2018

      v = cardinal.match("#Month #Value [#Cardinal]");
      tagYear(v, 'month-value-year'); //feb 8 to 10th 2018

      v = cardinal.match("#Month #Value to #Value [#Cardinal]");
      tagYear(v, 'month-range-year'); //in 1998

      v = cardinal.match("(in|of|by|during|before|starting|ending|for|year) [#Cardinal]");
      tagYear(v, 'in-year'); //q2 2009

      v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]');
      tagYear(v, 'in-year'); //2nd quarter 2009

      v = cardinal.match('#Ordinal quarter [#Cardinal]');
      tagYear(v, 'in-year'); //in the year 1998

      v = cardinal.match('the year [#Cardinal]');
      tagYear(v, 'in-year'); //it was 1998

      v = cardinal.match('it (is|was) [#Cardinal]');
      tagYearSafe(v, 'in-year'); //was 1998 and...

      v = cardinal.match("[#Cardinal] !#Plural");
      tagYearSafe(v, 'year-unsafe');
    }

    var time = doc["if"]('#Time');

    if (time.found === true) {
      //by 6pm
      time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time'); //7 7pm

      time.match('#Cardinal #Time').not('#Year').tag('Time', 'value-time'); //2pm est

      time.match('#Time [(eastern|pacific|central|mountain)]').tag('Time', 'timezone'); //6pm est

      time.match('#Time [(est|pst|gmt)]').tag('Time', 'timezone abbr');
    }

    return doc;
  };

  var fixDates_1 = fixDates;

  var corrections = function corrections(doc) {
    fixThe_1(doc);
    fixNouns_1(doc);
    fixPerson_1(doc);
    fixVerb_1(doc);
    fixAdjective_1(doc);
    fixValue_1(doc);
    fixDates_1(doc);
    fixMisc(doc);
    return doc;
  };

  var _05Correction = corrections;

  /** POS-tag all terms in this document */

  var tagger = function tagger(doc) {
    var terms = doc.termList(); // check against any known-words

    doc = _01Init(doc); // everything has gotta be something. ¯\_(:/)_/¯

    doc = _02Fallbacks(doc); // support "didn't" & "spencer's"

    doc = _03Contractions(doc); // deduce more specific tags - singular/plurals/quotations...

    doc = _04Inference(doc); //set our cache, to speed things up
    // doc.freeze()
    // wiggle-around the results, so they make more sense

    doc = _05Correction(doc); //remove our cache?
    // doc.unfreeze()

    return doc;
  };

  var _02Tagger = tagger;

  var addMethod = function addMethod(Doc) {
    /**  */
    var Acronyms =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Acronyms, _Doc);

      function Acronyms() {
        _classCallCheck(this, Acronyms);

        return _possibleConstructorReturn(this, _getPrototypeOf(Acronyms).apply(this, arguments));
      }

      return Acronyms;
    }(Doc);

    Doc.prototype.acronyms = function (n) {
      var match = this.match('#Acronym');

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new Acronyms(match.list, this, this.world);
    };

    return Doc;
  };

  var acronyms = addMethod;

  var addMethod$1 = function addMethod(Doc) {
    /**  */
    var Contractions =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Contractions, _Doc);

      function Contractions(list, from, world) {
        var _this;

        _classCallCheck(this, Contractions);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Contractions).call(this, list, from, world));
        _this.contracted = null;
        return _this;
      }
      /** turn didn't into 'did not' */


      _createClass(Contractions, [{
        key: "expand",
        value: function expand() {
          this.list.forEach(function (p) {
            var terms = p.terms(); //change the case?

            var isTitlecase = terms[0].isTitleCase();
            terms.forEach(function (t, i) {
              //use the implicit text
              // console.log(t.clean)
              t.set(t.implicit || t.text);
              t.implicit = undefined; //add whitespace

              if (i < terms.length - 1) {
                t.post += ' ';
              }
            }); //set titlecase

            if (isTitlecase) {
              terms[0].toTitleCase();
            }
          });
          return this;
        }
      }]);

      return Contractions;
    }(Doc); //find contractable, expanded-contractions
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
      var found = this.match('@hasContraction+'); //todo: split consecutive contractions

      if (typeof n === 'number') {
        found = found.get(n);
      }

      return new Contractions(found.list, this, this.world);
    }; //aliases


    Doc.prototype.expanded = Doc.prototype.isExpanded;
    Doc.prototype.contracted = Doc.prototype.isContracted;
    return Doc;
  };

  var contractions$1 = addMethod$1;

  var open = /\(/;
  var close = /\)/;

  var addMethod$2 = function addMethod(Doc) {
    /** anything between (these things) */
    var Parentheses =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Parentheses, _Doc);

      function Parentheses() {
        _classCallCheck(this, Parentheses);

        return _possibleConstructorReturn(this, _getPrototypeOf(Parentheses).apply(this, arguments));
      }

      _createClass(Parentheses, [{
        key: "unwrap",

        /** remove the parentheses characters */
        value: function unwrap() {
          this.list.forEach(function (p) {
            var first = p.terms(0);
            first.pre = first.pre.replace(open, '');
            var last = p.lastTerm();
            last.post = last.post.replace(close, '');
          });
          return this;
        }
      }]);

      return Parentheses;
    }(Doc);

    Doc.prototype.parentheses = function (n) {
      var list = [];
      this.list.forEach(function (p) {
        var terms = p.terms(); //look for opening brackets

        for (var i = 0; i < terms.length; i += 1) {
          var t = terms[i];

          if (open.test(t.pre)) {
            //look for the closing bracket..
            for (var o = i; o < terms.length; o += 1) {
              if (close.test(terms[o].post)) {
                var len = o - i + 1;
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

  var parentheses = addMethod$2;

  var addMethod$3 = function addMethod(Doc) {
    /**  */
    var Possessives =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Possessives, _Doc);

      function Possessives(list, from, world) {
        var _this;

        _classCallCheck(this, Possessives);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Possessives).call(this, list, from, world));
        _this.contracted = null;
        return _this;
      }
      /** turn didn't into 'did not' */


      _createClass(Possessives, [{
        key: "strip",
        value: function strip() {
          this.list.forEach(function (p) {
            var terms = p.terms();
            terms.forEach(function (t, i) {
              var str = t.text.replace(/'s$/, '');
              t.set(str || t.text);
            });
          });
          return this;
        }
      }]);

      return Possessives;
    }(Doc); //find contractable, expanded-contractions
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
      var found = this.match('#Possessive'); //todo: split consecutive contractions

      if (typeof n === 'number') {
        found = found.get(n);
      }

      return new Possessives(found.list, this, this.world);
    };

    return Doc;
  };

  var possessives = addMethod$3;

  var addMethod$4 = function addMethod(Doc) {
    //pull it apart..
    var parse = function parse(doc) {
      var things = doc.splitAfter('@hasComma').not('(and|or) not?');
      var beforeLast = doc.match('[.] (and|or)');
      return {
        things: things,
        conjunction: doc.match('(and|or) not?'),
        beforeLast: beforeLast,
        hasOxford: beforeLast.has('@hasComma')
      };
    };
    /** cool, fun, and nice */


    var Lists =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Lists, _Doc);

      function Lists() {
        _classCallCheck(this, Lists);

        return _possibleConstructorReturn(this, _getPrototypeOf(Lists).apply(this, arguments));
      }

      _createClass(Lists, [{
        key: "conjunctions",

        /** coordinating conjunction */
        value: function conjunctions() {
          return this.match('(and|or)');
        }
        /** remove conjunctions */

      }, {
        key: "things",
        value: function things() {
          var arr = [];
          this.forEach(function (p) {
            var things = parse(p).things;
            arr = arr.concat(things.list);
          });
          return this.buildFrom(arr);
        }
        /** add a new unit to the list */

      }, {
        key: "add",
        value: function add(str) {
          this.forEach(function (p) {
            var beforeLast = parse(p).beforeLast; //add a comma to it

            beforeLast.termList(0).addPunctuation(',');
            beforeLast.append(str);
          });
          return this;
        }
        /** remove any matching unit from the list */

      }, {
        key: "remove",
        value: function remove(str) {
          return this;
        }
        /** return only lists that use a serial comma */

      }, {
        key: "hasOxfordComma",
        value: function hasOxfordComma() {
          return this.filter(function (doc) {
            return parse(doc).hasOxford;
          });
        }
      }, {
        key: "addOxfordComma",
        value: function addOxfordComma() {
          return this;
        }
      }, {
        key: "removeOxfordComma",
        value: function removeOxfordComma() {
          return this;
        }
      }]);

      return Lists;
    }(Doc);

    Doc.prototype.lists = function (n) {
      var match = this.match('@hasComma+ .? (and|or) not? .'); // '... and Don Smith'?

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new Lists(match.list, this, this.world);
    };

    return Doc;
  };

  var lists = addMethod$4;

  var selections$1 = [acronyms, contractions$1, parentheses, possessives, lists];

  var extend = function extend(Doc) {
    selections$1.forEach(function (addFn) {
      return addFn(Doc);
    });
    return Doc;
  };

  var Subset = extend;

  var methods$4 = {
    misc: methods$3,
    match: match$1,
    selections: selections
  };
  /** a parsed text object */

  var Doc =
  /*#__PURE__*/
  function () {
    function Doc(list, from, world) {
      var _this = this;

      _classCallCheck(this, Doc);

      this.list = list; //quiet these properties in console.logs

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
        value: world
      }); //'found' getter

      Object.defineProperty(this, 'found', {
        get: function get() {
          return _this.list.length > 0;
        }
      }); //'length' getter

      Object.defineProperty(this, 'length', {
        get: function get() {
          return _this.list.length;
        }
      }); // this is way easier than .constructor.name...

      Object.defineProperty(this, 'isA', {
        get: function get() {
          return 'Doc';
        }
      });
    }
    /** run part-of-speech tagger on all results*/


    _createClass(Doc, [{
      key: "tagger",
      value: function tagger() {
        return _02Tagger(this);
      }
      /** pool is stored on phrase objects */

    }, {
      key: "pool",
      value: function pool() {
        if (this.list.length > 0) {
          return this.list[0].pool;
        }

        return this.all().list[0].pool;
      }
      /** return the previous result */

    }, {
      key: "parent",
      value: function parent() {
        if (this.from) {
          return this.from;
        }

        return this;
      }
      /**  return a list of all previous results */

    }, {
      key: "parents",
      value: function parents() {
        var arr = [];

        var addParent = function addParent(doc) {
          if (doc.from) {
            arr.push(doc.from);
            addParent(doc.from);
          }
        };

        addParent(this);
        return arr.reverse();
      }
      /** return the root, first document */

    }, {
      key: "all",
      value: function all() {
        return this.parents()[0] || this;
      }
    }]);

    return Doc;
  }();
  /** create a new Document object */


  Doc.prototype.buildFrom = function (list) {
    return new Doc(list, this, this.world);
  };
  /** add new subclass methods */


  Doc.prototype.extend = function (fn) {
    fn(this);
    return this;
  };

  Object.assign(Doc.prototype, methods$4.match);
  Object.assign(Doc.prototype, methods$4.selections);
  Object.assign(Doc.prototype, methods$4.misc); //add sub-classes

  Subset(Doc); //aliases

  var aliases$1 = {
    untag: 'unTag',
    and: 'match',
    notIf: 'ifNo',
    only: 'if',
    onlyIf: 'if'
  };
  Object.keys(aliases$1).forEach(function (k) {
    return Doc.prototype[k] = Doc.prototype[aliases$1[k]];
  });
  var Doc_1 = Doc;

  var world = new World_1();
  /** parse and tag text into a compromise object  */

  var nlp = function nlp() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var list = _01Tokenizer.fromText(text, world);
    var doc = new Doc_1(list, null, world);
    doc.tagger();
    return doc;
  };
  /** parse text into a compromise object, without running POS-tagging */


  nlp.tokenize = function () {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var list = _01Tokenizer.fromText(text, world);
    var doc = new Doc_1(list, null, world);
    return doc;
  };
  /** mix in a compromise-plugin */


  nlp.extend = function (fn) {
    fn(Doc_1);
  };
  /** make a deep-copy of the library state */


  nlp.clone = function () {
    world = world.clone();
    return this;
  };
  /** re-generate a Doc object from .json() results */


  nlp.fromJSON = function (json) {
    var list = _01Tokenizer.fromJSON(json);
    return new Doc_1(list, null, world);
  };
  /** log our decision-making for debugging */


  nlp.verbose = function () {
    var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    world.verbose(bool);
  };
  /** current version of the library */


  nlp.version = _version;
  var src = nlp;

  return src;

}));
//# sourceMappingURL=compromise.js.map

/* compromise 13.8.0 MIT */
function _typeof(obj) {
  "@babel/helpers - typeof";

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

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
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

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
var noPeriodAcronym = /[A-Z]{2,}('s|,)?$/;
var lowerCaseAcronym = /([a-z]\.){1,}[a-z]\.?$/;

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

  str = str.replace(/([aeiou][ktrp])in$/, '$1ing'); //turn re-enactment to reenactment

  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    str = str.replace('-', '');
  } //compact acronyms


  if (isAcronym_1(str)) {
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
var reduced = function reduced(str) {
  // remove apostrophes
  str = str.replace(/['’]s$/, '');
  str = str.replace(/s['’]$/, 's');
  return str;
};

var reduce = reduced;

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.

var startings = /^[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F]+/;
var endings = /[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E]+$/; //money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥

var hasSlash$1 = /\//;
var hasApostrophe = /['’]/;
var hasAcronym = /^[a-z]\.([a-z]\.)+/i;
var minusNumber = /^[-+\.][0-9]/;
var shortYear = /^'[0-9]{2}/;
/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */

var parseTerm = function parseTerm(str) {
  var original = str;
  var pre = '';
  var post = '';
  str = str.replace(startings, function (found) {
    pre = found; // support '-40'

    if ((pre === '-' || pre === '+' || pre === '.') && minusNumber.test(str)) {
      pre = '';
      return found;
    } // support years like '97


    if (pre === "'" && shortYear.test(str)) {
      pre = '';
      return found;
    }

    return '';
  });
  str = str.replace(endings, function (found) {
    post = found; // keep s-apostrophe - "flanders'" or "chillin'"

    if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
      post = post.replace(hasApostrophe, '');
      return "'";
    } //keep end-period in acronym


    if (hasAcronym.test(str) === true) {
      post = post.replace(/\./, '');
      return '.';
    }

    return '';
  }); //we went too far..

  if (str === '') {
    // do a very mild parse, and hope for the best.
    original = original.replace(/ *$/, function (after) {
      post = after || '';
      return '';
    });
    str = original;
    pre = '';
    post = post;
  } // create the various forms of our text,


  var clean = clean_1(str);
  var parsed = {
    text: str,
    clean: clean,
    reduced: reduce(clean),
    pre: pre,
    post: post
  }; // support aliases for slashes

  if (hasSlash$1.test(str)) {
    str.split(hasSlash$1).forEach(function (word) {
      parsed.alias = parsed.alias || {};
      parsed.alias[word.trim()] = true;
    });
  }

  return parsed;
};

var parse = parseTerm;

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var _01Case = createCommonjsModule(function (module, exports) {
  var titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;
  var upperCase = /^[A-Z]+s?$/;
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
    this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, function (x) {
      return x.toUpperCase();
    }); //support unicode?

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
  var startQuote = /(\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)/;
  var endQuote = /(\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E)/;
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
    var hyphen = /^(-|–|—)$/;
    return hyphen.test(this.post) || hyphen.test(this.pre);
  };
  /** a dash separates words - like that */


  exports.hasDash = function () {
    var hyphen = / (-|–|—) /;
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

//declare it up here
var wrapMatch = function wrapMatch() {};
/** ignore optional/greedy logic, straight-up term match*/


var doesMatch = function doesMatch(t, reg, index, length) {
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


  if (reg.oneOf !== undefined) {
    return reg.oneOf.hasOwnProperty(t.reduced) || reg.oneOf.hasOwnProperty(t.text);
  } //support (one|two)


  if (reg.choices !== undefined) {
    // try to support && operator
    if (reg.operator === 'and') {
      // must match them all
      return reg.choices.every(function (r) {
        return wrapMatch(t, r, index, length);
      });
    } // or must match one


    return reg.choices.some(function (r) {
      return wrapMatch(t, r, index, length);
    });
  }

  return false;
}; // wrap result for !negative match logic


wrapMatch = function wrapMatch(t, reg, index, length) {
  var result = doesMatch(t, reg, index, length);

  if (reg.negative === true) {
    return !result;
  }

  return result;
};

var _doesMatch = wrapMatch;

var boring = {};
/** check a match object against this term */

var doesMatch_1 = function doesMatch_1(reg, index, length) {
  return _doesMatch(this, reg, index, length);
};
/** does this term look like an acronym? */


var isAcronym_1$1 = function isAcronym_1$1() {
  return isAcronym_1(this.text);
};
/** is this term implied by a contraction? */


var isImplicit = function isImplicit() {
  return this.text === '' && Boolean(this.implicit);
};
/** does the term have at least one good tag? */


var isKnown = function isKnown() {
  return Object.keys(this.tags).some(function (t) {
    return boring[t] !== true;
  });
};
/** cache the root property of the term */


var setRoot = function setRoot(world) {
  var transform = world.transforms;
  var str = this.implicit || this.clean;

  if (this.tags.Plural) {
    str = transform.toSingular(str, world);
  }

  if (this.tags.Verb && !this.tags.Negative && !this.tags.Infinitive) {
    var tense = null;

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
  isAcronym: isAcronym_1$1,
  isImplicit: isImplicit,
  isKnown: isKnown,
  setRoot: setRoot
};

var hasSpace = /[\s-]/;
var isUpperCase = /^[A-Z-]+$/; // const titleCase = str => {
//   return str.charAt(0).toUpperCase() + str.substr(1)
// }

/** return various text formats of this term */

var textOut = function textOut(options, showPre, showPost) {
  options = options || {};
  var word = this.text;
  var before = this.pre;
  var after = this.post; // -word-

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

    if ((hasSpace.test(this.post) === false || options.last) && !this.implicit) {
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

var boringTags = {
  Auxiliary: 1,
  Possessive: 1
};
/** a subjective ranking of tags kinda tfidf-based */

var rankTags = function rankTags(term, world) {
  var tags = Object.keys(term.tags);
  var tagSet = world.tags;
  tags = tags.sort(function (a, b) {
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

var jsonDefault = {
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

var json = function json(options, world) {
  options = options || {};
  options = Object.assign({}, jsonDefault, options);
  var result = {}; // default on

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

var _05Json = {
  json: json
};

var methods = Object.assign({}, _01Case, _02Punctuation, _03Misc, _04Text, _05Json);

function isClientSide() {
  return typeof window !== 'undefined' && window.document;
}
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
  if (isClientSide()) {
    console.log('%c' + padEnd(t.clean, 3) + '  + ' + tag + ' ', 'color: #6accb2;');
    return;
  } //server-side


  var log = '\x1b[33m' + padEnd(t.clean, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m ';

  if (reason) {
    log = padEnd(log, 35) + ' ' + reason + '';
  }

  console.log(log);
};
/** output for verbose mode  */


var logUntag = function logUntag(t, tag, reason) {
  if (isClientSide()) {
    console.log('%c' + padEnd(t.clean, 3) + '  - ' + tag + ' ', 'color: #AB5850;');
    return;
  } //server-side


  var log = '\x1b[33m' + padEnd(t.clean, 3) + ' \x1b[31m - #' + tag + '\x1b[0m ';

  if (reason) {
    log = padEnd(log, 35) + ' ' + reason;
  }

  console.log(log);
};

var isArray = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

var titleCase = function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var fns = {
  logTag: logTag,
  logUntag: logUntag,
  isArray: isArray,
  titleCase: titleCase
};

/** add a tag, and its descendents, to a term */

var addTag = function addTag(t, tag, reason, world) {
  var tagset = world.tags; //support '.' or '-' notation for skipping the tag

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


  var isVerbose = world.isVerbose();

  if (isVerbose === true) {
    fns.logTag(t, tag, reason);
  } //add tag


  t.tags[tag] = true; //whee!
  //check tagset for any additional things to do...

  if (tagset.hasOwnProperty(tag) === true) {
    //add parent Tags
    tagset[tag].isA.forEach(function (down) {
      t.tags[down] = true;

      if (isVerbose === true) {
        fns.logTag(t, '→ ' + down);
      }
    }); //remove any contrary tags

    t.unTag(tagset[tag].notA, '←', world);
  }
};
/** support an array of tags */


var addTags = function addTags(term, tags, reason, world) {
  if (typeof tags !== 'string') {
    for (var i = 0; i < tags.length; i++) {
      addTag(term, tags[i], reason, world);
    } // tags.forEach(tag => addTag(term, tag, reason, world))

  } else {
    addTag(term, tags, reason, world);
  }
};

var add = addTags;

var lowerCase = /^[a-z]/;

var titleCase$1 = function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
/** remove this tag, and its descentents from the term */


var unTag = function unTag(t, tag, reason, world) {
  var isVerbose = world.isVerbose(); //support '*' for removing all tags

  if (tag === '*') {
    t.tags = {};
    return t;
  }

  tag = tag.replace(/^#/, '');

  if (lowerCase.test(tag) === true) {
    tag = titleCase$1(tag);
  } // remove the tag


  if (t.tags[tag] === true) {
    delete t.tags[tag]; //log in verbose-mode

    if (isVerbose === true) {
      fns.logUntag(t, tag, reason);
    }
  } //delete downstream tags too


  var tagset = world.tags;

  if (tagset[tag]) {
    var lineage = tagset[tag].lineage;

    for (var i = 0; i < lineage.length; i++) {
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


var untagAll = function untagAll(term, tags, reason, world) {
  if (typeof tags !== 'string' && tags) {
    for (var i = 0; i < tags.length; i++) {
      unTag(term, tags[i], reason, world);
    }

    return;
  }

  unTag(term, tags, reason, world);
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

var Term = /*#__PURE__*/function () {
  function Term() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Term);

    text = String(text);
    var obj = parse(text); // the various forms of our text

    this.text = obj.text || '';
    this.clean = obj.clean;
    this.reduced = obj.reduced;
    this.root =  null;
    this.implicit =  null;
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
  term.clean = this.clean;
  term.reduced = this.reduced;
  term.root = this.root;
  term.implicit = this.implicit;
  term.tags = Object.assign({}, this.tags); //use the old id, so it can be matched with .match(doc)
  // term.id = this.id

  return term;
};

Object.assign(Term.prototype, methods);
Object.assign(Term.prototype, tag);
var Term_1 = Term;

/** return a flat array of Term objects */
var terms = function terms(n) {
  if (this.length === 0) {
    return [];
  } // use cache, if it exists


  if (this.cache.terms) {
    if (n !== undefined) {
      return this.cache.terms[n];
    }

    return this.cache.terms;
  }

  var terms = [this.pool.get(this.start)];

  for (var i = 0; i < this.length - 1; i += 1) {
    var id = terms[terms.length - 1].next;

    if (id === null) {
      // throw new Error('linked-list broken')
      console.error("Compromise error: Linked list broken in phrase '" + this.start + "'");
      break;
    }

    var term = this.pool.get(id);
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


var clone = function clone(isShallow) {
  var _this = this;

  if (isShallow) {
    var p = this.buildFrom(this.start, this.length);
    p.cache = this.cache;
    return p;
  } //how do we clone part of the pool?


  var terms = this.terms();
  var newTerms = terms.map(function (t) {
    return t.clone();
  }); // console.log(newTerms)
  //connect these new ids up

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
  } // use cache, if available


  if (this.cache.terms) {
    var _terms = this.cache.terms;

    for (var i = 0; i < _terms.length; i++) {
      if (_terms[i].id === wantId) {
        return true;
      }
    }

    return false;
  } // otherwise, go through each term


  var lastId = this.start;

  for (var _i = 0; _i < this.length - 1; _i += 1) {
    var term = this.pool.get(lastId);

    if (term === undefined) {
      console.error("Compromise error: Linked list broken. Missing term '".concat(lastId, "' in phrase '").concat(this.start, "'\n")); // throw new Error('linked List error')

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


var wordCount = function wordCount() {
  return this.terms().filter(function (t) {
    return t.text !== '';
  }).length;
};
/** get the full-sentence this phrase belongs to */


var fullSentence = function fullSentence() {
  var t = this.terms(0); //find first term in sentence

  while (t.prev) {
    t = this.pool.get(t.prev);
  }

  var start = t.id;
  var len = 1; //go to end of sentence

  while (t.next) {
    t = this.pool.get(t.next);
    len += 1;
  }

  return this.buildFrom(start, len);
};

var _01Utils = {
  terms: terms,
  clone: clone,
  lastTerm: lastTerm,
  hasId: hasId,
  wordCount: wordCount,
  fullSentence: fullSentence
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

    var txt = t.textOut(options, showPre, showPost); // if (options.titlecase && i === 0) {
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
  text: text
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

var endOfSentence = /[.?!]\s*$/; // replacing a 'word.' with a 'word!'

var combinePost = function combinePost(before, after) {
  //only transfer the whitespace
  if (endOfSentence.test(after)) {
    var whitespace = before.match(/\s*$/);
    return after + whitespace;
  }

  return before;
}; //add whitespace to the start of the second bit


var addWhitespace = function addWhitespace(beforeTerms, newTerms) {
  // add any existing pre-whitespace to beginning
  newTerms[0].pre = beforeTerms[0].pre;
  var lastTerm = beforeTerms[beforeTerms.length - 1]; //add any existing punctuation to end of our new terms

  var newTerm = newTerms[newTerms.length - 1];
  newTerm.post = combinePost(lastTerm.post, newTerm.post); // remove existing punctuation

  lastTerm.post = ''; //before ←[space]  - after

  if (lastTerm.post === '') {
    lastTerm.post += ' ';
  }
}; //insert this segment into the linked-list


var stitchIn = function stitchIn(beforeTerms, newTerms, pool) {
  var lastBefore = beforeTerms[beforeTerms.length - 1];
  var lastNew = newTerms[newTerms.length - 1];
  var afterId = lastBefore.next; //connect ours in (main → newPhrase)

  lastBefore.next = newTerms[0].id; //stich the end in  (newPhrase → after)

  lastNew.next = afterId; //do it backwards, too

  if (afterId) {
    // newPhrase ← after
    var afterTerm = pool.get(afterId);
    afterTerm.prev = lastNew.id;
  } // before ← newPhrase


  var beforeId = beforeTerms[0].id;

  if (beforeId) {
    var newTerm = newTerms[0];
    newTerm.prev = beforeId;
  }
}; // avoid stretching a phrase twice.


var unique = function unique(list) {
  return list.filter(function (o, i) {
    return list.indexOf(o) === i;
  });
}; //append one phrase onto another.


var appendPhrase = function appendPhrase(before, newPhrase, doc) {
  var beforeTerms = before.terms();
  var newTerms = newPhrase.terms(); //spruce-up the whitespace issues

  addWhitespace(beforeTerms, newTerms); //insert this segment into the linked-list

  stitchIn(beforeTerms, newTerms, before.pool); // stretch!
  // make each effected phrase longer

  var toStretch = [before];
  var hasId = before.start;
  var docs = [doc];
  docs = docs.concat(doc.parents()); // find them all!

  docs.forEach(function (parent) {
    // only the phrases that should change
    var shouldChange = parent.list.filter(function (p) {
      return p.hasId(hasId);
    });
    toStretch = toStretch.concat(shouldChange);
  }); // don't double-count a phrase

  toStretch = unique(toStretch);
  toStretch.forEach(function (p) {
    p.length += newPhrase.length;
  });
  before.cache = {};
  return before;
};

var append = appendPhrase;

var hasSpace$1 = / /; //a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'

var addWhitespace$1 = function addWhitespace(newTerms) {
  //add a space before our new text?
  // add a space after our text
  var lastTerm = newTerms[newTerms.length - 1];

  if (hasSpace$1.test(lastTerm.post) === false) {
    lastTerm.post += ' ';
  }

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
};

var unique$1 = function unique(list) {
  return list.filter(function (o, i) {
    return list.indexOf(o) === i;
  });
}; //append one phrase onto another


var joinPhrase = function joinPhrase(original, newPhrase, doc) {
  var starterId = original.start;
  var newTerms = newPhrase.terms(); //spruce-up the whitespace issues

  addWhitespace$1(newTerms); //insert this segment into the linked-list

  stitchIn$1(original, newPhrase, newTerms); //increase the length of our phrases

  var toStretch = [original];
  var docs = [doc];
  docs = docs.concat(doc.parents());
  docs.forEach(function (d) {
    // only the phrases that should change
    var shouldChange = d.list.filter(function (p) {
      return p.hasId(starterId) || p.hasId(newPhrase.start);
    });
    toStretch = toStretch.concat(shouldChange);
  }); // don't double-count

  toStretch = unique$1(toStretch); // stretch these phrases

  toStretch.forEach(function (p) {
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
var shrinkAll = function shrinkAll(doc, id, deleteLength, after) {
  var arr = doc.parents();
  arr.push(doc);
  arr.forEach(function (d) {
    //find our phrase to shrink
    var phrase = d.list.find(function (p) {
      return p.hasId(id);
    });

    if (!phrase) {
      return;
    }

    phrase.length -= deleteLength; // does it start with this soon-removed word?

    if (phrase.start === id) {
      phrase.start = after.id;
    }

    phrase.cache = {};
  }); // cleanup empty phrase objects

  doc.list = doc.list.filter(function (p) {
    if (!p.start || !p.length) {
      return false;
    }

    return true;
  });
};
/** wrap the linked-list around these terms
 * so they don't appear any more
 */


var deletePhrase = function deletePhrase(phrase, doc) {
  var pool = doc.pool();
  var terms = phrase.terms(); //grab both sides of the chain,

  var prev = pool.get(terms[0].prev) || {};
  var after = pool.get(terms[terms.length - 1].next) || {};

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

var _delete$1 = function _delete$1(doc) {
  _delete(this, doc);
  return this;
}; // stich-in newPhrase, stretch 'doc' + parents


var replace = function replace(newPhrase, doc) {
  //add it do the end
  var firstLength = this.length;
  append(this, newPhrase, doc); //delete original terms

  var tmp = this.buildFrom(this.start, this.length);
  tmp.length = firstLength;
  _delete(tmp, doc);
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

var _04Insert = {
  append: append_1,
  prepend: prepend_1,
  "delete": _delete$1,
  replace: replace,
  splitOn: splitOn
};

/** return json metadata for this phrase */
var json$1 = function json() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var res = {}; // text data

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

    res.terms = this.terms().map(function (t) {
      return t.json(options.terms, world);
    });
  }

  return res;
};

var _05Json$1 = {
  json: json$1
};

/** match any terms after this phrase */
var lookAhead = function lookAhead(regs) {
  // if empty match string, return everything after
  if (!regs) {
    regs = '.*';
  }

  var pool = this.pool; // get a list of all terms preceding our start

  var terms = [];

  var getAfter = function getAfter(id) {
    var term = pool.get(id);

    if (!term) {
      return;
    }

    terms.push(term);

    if (term.prev) {
      getAfter(term.next); //recursion
    }
  };

  var all = this.terms();
  var lastTerm = all[all.length - 1];
  getAfter(lastTerm.next);

  if (terms.length === 0) {
    return [];
  } // got the terms, make a phrase from them


  var p = this.buildFrom(terms[0].id, terms.length);
  return p.match(regs);
};
/** match any terms before this phrase */


var lookBehind = function lookBehind(regs) {
  // if empty match string, return everything before
  if (!regs) {
    regs = '.*';
  }

  var pool = this.pool; // get a list of all terms preceding our start

  var terms = [];

  var getBefore = function getBefore(id) {
    var term = pool.get(id);

    if (!term) {
      return;
    }

    terms.push(term);

    if (term.prev) {
      getBefore(term.prev); //recursion
    }
  };

  var term = pool.get(this.start);
  getBefore(term.prev);

  if (terms.length === 0) {
    return [];
  } // got the terms, make a phrase from them


  var p = this.buildFrom(terms[terms.length - 1].id, terms.length);
  return p.match(regs);
};

var _06Lookahead = {
  lookAhead: lookAhead,
  lookBehind: lookBehind
};

var methods$1 = Object.assign({}, _01Utils, _02Text, _03Change, _04Insert, _05Json$1, _06Lookahead);

// try to avoid doing the match
var failFast = function failFast(p, regs) {
  if (regs.length === 0) {
    return true;
  }

  for (var i = 0; i < regs.length; i += 1) {
    var reg = regs[i]; //logical quick-ones

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

var _02FailFast = failFast;

//found a match? it's greedy? keep going!

var getGreedy = function getGreedy(terms, t, reg, until, index, length) {
  var start = t;

  for (; t < terms.length; t += 1) {
    //stop for next-reg match
    if (until && terms[t].doesMatch(until, index + t, length)) {
      return t;
    }

    var count = t - start + 1; // is it max-length now?

    if (reg.max !== undefined && count === reg.max) {
      return t;
    } //stop here


    if (terms[t].doesMatch(reg, index + t, length) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null;
      }

      return t;
    }
  }

  return t;
}; //'unspecific greedy' is a weird situation.


var greedyTo = function greedyTo(terms, t, nextReg, index, length) {
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return terms.length;
  } //otherwise, we're looking for the next one


  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(nextReg, index + t, length) === true) {
      return t;
    }
  } //guess it doesn't exist, then.


  return null;
}; //we have a special case where an end-anchored greedy match may need to
//start matching before the actual end; we do this by (temporarily!)
//removing the "end" property from the matching token... since this is
//very situation-specific, we *only* do this when we really need to.


var isEndGreedy = function isEndGreedy(reg, index, t, terms, length) {
  if (reg.end === true && reg.greedy === true) {
    if (index + t < length - 1) {
      var tmpReg = Object.assign({}, reg, {
        end: false
      });

      if (terms[t].doesMatch(tmpReg, index + t, length) === true) {
        return true;
      }
    }
  }

  if (terms[t].doesMatch(reg, index + t, length) === true) {
    return true;
  }

  return false;
}; // get or create named group


var getOrCreateGroup = function getOrCreateGroup(namedGroups, namedGroupId, terms, startIndex, group) {
  if (namedGroups[namedGroupId]) {
    return namedGroups[namedGroupId];
  }

  var id = terms[startIndex].id;
  namedGroups[namedGroupId] = {
    group: String(group),
    start: id,
    length: 0
  };
  return namedGroups[namedGroupId];
};
/** tries to match a sequence of terms, starting from here */


var tryHere = function tryHere(terms, regs, index, length) {
  var namedGroups = {};
  var previousGroupId = null;
  var t = 0; // we must satisfy each rule in 'regs'

  for (var r = 0; r < regs.length; r += 1) {
    var reg = regs[r]; // Check if this reg has a named capture group

    var isNamedGroup = typeof reg.named === 'string' || typeof reg.named === 'number';
    var namedGroupId = null; // Reuse previous capture group if same

    if (isNamedGroup) {
      var prev = regs[r - 1];

      if (prev && prev.named === reg.named && previousGroupId) {
        namedGroupId = previousGroupId;
      } else {
        namedGroupId = _id(reg.named);
        previousGroupId = namedGroupId;
      }
    } //should we fail here?


    if (!terms[t]) {
      //are all remaining regs optional?
      var hasNeeds = regs.slice(r).some(function (remain) {
        return !remain.optional;
      });

      if (hasNeeds === false) {
        break;
      } // have unmet needs


      return [false, null];
    } //support 'unspecific greedy' .* properly


    if (reg.anything === true && reg.greedy === true) {
      var skipto = greedyTo(terms, t, regs[r + 1], reg, index); // ensure it's long enough

      if (reg.min !== undefined && skipto - t < reg.min) {
        return [false, null];
      } // reduce it back, if it's too long


      if (reg.max !== undefined && skipto - t > reg.max) {
        t = t + reg.max;
        continue;
      }

      if (skipto === null) {
        return [false, null]; //couldn't find it
      } // is it really this easy?....


      if (isNamedGroup) {
        var g = getOrCreateGroup(namedGroups, namedGroupId, terms, t, reg.named); // Update group

        g.length = skipto - t;
      }

      t = skipto;
      continue;
    } //if it looks like a match, continue


    if (reg.anything === true || isEndGreedy(reg, index, t, terms, length)) {
      var startAt = t; // okay, it was a match, but if it optional too,
      // we should check the next reg too, to skip it?

      if (reg.optional && regs[r + 1]) {
        // does the next reg match it too?
        if (terms[t].doesMatch(regs[r + 1], index + t, length) === true) {
          // but does the next reg match the next term??
          // only skip if it doesn't
          if (!terms[t + 1] || terms[t + 1].doesMatch(regs[r + 1], index + t, length) === false) {
            r += 1;
          }
        }
      } //advance to the next term!


      t += 1; //check any ending '$' flags

      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (t !== terms.length && reg.greedy !== true) {
          return [false, null];
        }
      } //try keep it going!


      if (reg.greedy === true) {
        // for greedy checking, we no longer care about the reg.start
        // value, and leaving it can cause failures for anchored greedy
        // matches.  ditto for end-greedy matches: we need an earlier non-
        // ending match to succceed until we get to the actual end.
        t = getGreedy(terms, t, Object.assign({}, reg, {
          start: false,
          end: false
        }), regs[r + 1], index, length);

        if (t === null) {
          return [false, null]; //greedy was too short
        }

        if (reg.min && reg.min > t) {
          return [false, null]; //greedy was too short
        } // if this was also an end-anchor match, check to see we really
        // reached the end


        if (reg.end === true && index + t !== length) {
          return [false, null]; //greedy didn't reach the end
        }
      }

      if (isNamedGroup) {
        // Get or create capture group
        var _g = getOrCreateGroup(namedGroups, namedGroupId, terms, startAt, reg.named); // Update group - add greedy or increment length


        if (t > 1 && reg.greedy) {
          _g.length += t - startAt;
        } else {
          _g.length++;
        }
      }

      continue;
    } //bah, who cares, keep going


    if (reg.optional === true) {
      continue;
    } // should we skip-over an implicit word?


    if (terms[t].isImplicit() && regs[r - 1] && terms[t + 1]) {
      // does the next one match?
      if (terms[t + 1].doesMatch(reg, index + t, length)) {
        t += 2;
        continue;
      }
    } // console.log('   ❌\n\n')


    return [false, null];
  } //return our result


  return [terms.slice(0, t), namedGroups];
};

var _03TryMatch = tryHere;

var postProcess = function postProcess(terms, regs, matches) {
  if (!matches || matches.length === 0) {
    return matches;
  } // ensure end reg has the end term


  var atEnd = regs.some(function (r) {
    return r.end;
  });

  if (atEnd) {
    var lastTerm = terms[terms.length - 1];
    matches = matches.filter(function (_ref) {
      var arr = _ref.match;
      return arr.indexOf(lastTerm) !== -1;
    });
  }

  return matches;
};

var _04PostProcess = postProcess;

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
var hasMinMax = /\{([0-9]+,?[0-9]*)\}/;
var andSign = /&&/;
var captureName = new RegExp(/^<(\S+)>/);

var titleCase$2 = function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

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


var parseToken = function parseToken(w) {
  var obj = {}; //collect any flags (do it twice)

  for (var i = 0; i < 2; i += 1) {
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
        var res = captureName.exec(w);

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
      var last = obj.choices.length - 1;
      obj.choices[last] = stripEnd(obj.choices[last]); // clean up the results

      obj.choices = obj.choices.map(function (s) {
        return s.trim();
      });
      obj.choices = obj.choices.filter(function (s) {
        return s;
      }); //recursion alert!

      obj.choices = obj.choices.map(parseToken);
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
    w = w.replace(hasMinMax, function (a, b) {
      var arr = b.split(/,/g);

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

var parseToken_1 = parseToken;

var isNamed = function isNamed(capture) {
  return typeof capture === 'string' || typeof capture === 'number';
};

var fillGroups = function fillGroups(tokens) {
  var convert = false;
  var index = -1;
  var current; //'fill in' capture groups between start-end

  for (var i = 0; i < tokens.length; i++) {
    var n = tokens[i]; // Give name to un-named single tokens

    if (n.groupType === 'single' && n.named === true) {
      index += 1;
      n.named = index;
      continue;
    } // Start converting tokens


    if (n.groupType === 'start') {
      convert = true;

      if (isNamed(n.named)) {
        current = n.named;
      } else {
        index += 1;
        current = index;
      }
    } // Ensure this token has the right name


    if (convert) {
      n.named = current;
    } // Stop converting tokens


    if (n.groupType === 'end') {
      convert = false;
    }
  }

  return tokens;
};

var useOneOf = function useOneOf(tokens) {
  return tokens.map(function (token) {
    if (token.choices !== undefined) {
      // are they all straight non-optional words?
      var shouldPack = token.choices.every(function (c) {
        return c.optional !== true && c.negative !== true && c.word !== undefined;
      });

      if (shouldPack === true) {
        var oneOf = {};
        token.choices.forEach(function (c) {
          return oneOf[c.word] = true;
        });
        token.oneOf = oneOf;
        delete token.choices;
      }
    }

    return token;
  });
};

var postProcess$1 = function postProcess(tokens) {
  // ensure all capture groups are filled between start and end
  // give all capture groups names
  var count = tokens.filter(function (t) {
    return t.groupType;
  }).length;

  if (count > 0) {
    tokens = fillGroups(tokens);
  } // convert 'choices' format to 'oneOf' format


  tokens = useOneOf(tokens); // console.log(tokens)

  return tokens;
};

var postProcess_1 = postProcess$1;

var hasReg = /[^[a-z]]\//g;

var isArray$1 = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}; // don't split up a regular expression


var mergeRegexes = function mergeRegexes(arr) {
  arr.forEach(function (s, i) {
    var m = s.match(hasReg); // has 1 slash

    if (m !== null && m.length === 1 && arr[i + 1]) {
      // merge next one
      arr[i] += arr[i + 1];
      arr[i + 1] = ''; // try 2nd one

      m = arr[i].match(hasReg);

      if (m !== null && m.length === 1) {
        arr[i] += arr[i + 2];
        arr[i + 2] = '';
      }
    }
  });
  arr = arr.filter(function (s) {
    return s;
  });
  return arr;
}; //split-up by (these things)


var byParentheses = function byParentheses(str) {
  var arr = str.split(/([\^\[\!]*(?:<\S+>)?\(.*?\)[?+*]*\]?\$?)/);
  arr = arr.map(function (s) {
    return s.trim();
  });

  if (hasReg.test(str)) {
    arr = mergeRegexes(arr);
  }

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

var fromDoc = function fromDoc(doc) {
  if (!doc || !doc.list || !doc.list[0]) {
    return [];
  }

  var ids = [];
  doc.list.forEach(function (p) {
    p.terms().forEach(function (t) {
      ids.push({
        id: t.id
      });
    });
  });
  return [{
    choices: ids,
    greedy: true
  }];
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

  var tokens = byParentheses(input); // console.log(tokens)

  tokens = byWords(tokens);
  tokens = tokens.map(parseToken_1); //clean up anything weird

  tokens = postProcess_1(tokens); // console.log(tokens)

  return tokens;
};

var syntax_1 = syntax;

/**  returns a simple array of arrays */

var matchAll = function matchAll(p, regs) {
  var matchOne = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  //if we forgot to parse it..
  if (typeof regs === 'string') {
    regs = syntax_1(regs);
  } //try to dismiss it, at-once


  if (_02FailFast(p, regs) === true) {
    return [];
  } //any match needs to be this long, at least


  var minLength = regs.filter(function (r) {
    return r.optional !== true && r.negative !== true;
  }).length;
  var terms = p.terms();
  var matches = []; //optimisation for '^' start logic

  if (regs[0].start === true) {
    var _tryMatch = _03TryMatch(terms, regs, 0, terms.length),
        _tryMatch2 = _slicedToArray(_tryMatch, 2),
        match = _tryMatch2[0],
        groups = _tryMatch2[1];

    if (match !== false && match.length > 0) {
      match = match.filter(function (m) {
        return m;
      });
      matches.push({
        match: match,
        groups: groups
      });
    }

    return _04PostProcess(terms, regs, matches);
  } //try starting, from every term


  for (var i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      break;
    } //try it!


    var _tryMatch3 = _03TryMatch(terms.slice(i), regs, i, terms.length),
        _tryMatch4 = _slicedToArray(_tryMatch3, 2),
        _match = _tryMatch4[0],
        _groups = _tryMatch4[1];

    if (_match !== false && _match.length > 0) {
      //zoom forward!
      i += _match.length - 1; //[capture-groups] return some null responses

      _match = _match.filter(function (m) {
        return m;
      });
      matches.push({
        match: _match,
        groups: _groups
      }); //ok, maybe that's enough?

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

var notMatch = function notMatch(p, regs) {
  var found = {};
  var arr = _01MatchAll(p, regs);
  arr.forEach(function (_ref) {
    var ts = _ref.match;
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

var match_1 = function match_1(regs) {
  var _this = this;

  var justOne = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var matches = _01MatchAll(this, regs, justOne); //make them phrase objects

  matches = matches.map(function (_ref) {
    var match = _ref.match,
        groups = _ref.groups;

    var p = _this.buildFrom(match[0].id, match.length, groups);

    p.cache.terms = match;
    return p;
  });
  return matches;
};
/** return boolean if one match is found */


var has = function has(regs) {
  var matches = _01MatchAll(this, regs, true);
  return matches.length > 0;
};
/** remove all matches from the result */


var not$1 = function not$1(regs) {
  var _this2 = this;

  var matches = not(this, regs); //make them phrase objects

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
};
/** create a new Phrase object from an id and length */


Phrase.prototype.buildFrom = function (id, length, groups) {
  var p = new Phrase(id, length, this.pool); //copy-over or replace capture-groups too

  if (groups && Object.keys(groups).length > 0) {
    p.groups = groups;
  } else {
    p.groups = this.groups;
  }

  return p;
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
var Pool = /*#__PURE__*/function () {
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
  }, {
    key: "merge",
    value: function merge(pool) {
      Object.assign(this.words, pool.words);
      return this;
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

//add forward/backward 'linked-list' prev/next ids
var linkTerms = function linkTerms(terms) {
  terms.forEach(function (term, i) {
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
var initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g;
var hasSomething = /\S/;
var isAcronym$1 = /[ .][A-Z]\.? *$/i;
var hasEllipse = /(?:\u2026|\.{2,}) *$/;
var newLine = /((?:\r?\n|\r)+)/; // Match different new-line formats

var hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/i;
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
  } // cleanup unicode-spaces


  text = text.replace('\xa0', ' '); // Start somewhere:

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
    } else if (c && c.length > 0) {
      //&& hasLetter.test(c)
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
var isSlash = /[a-z] ?\/ ?[a-z]*$/;
var notWord = ['.', '?', '!', ':', ';', '-', '–', '—', '--', '...', '(', ')', '[', ']', '"', "'", '`'];
notWord = notWord.reduce(function (h, c) {
  h[c] = true;
  return h;
}, {});

var hasHyphen = function hasHyphen(str) {
  //dont split 're-do'
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    return false;
  } //letter-number 'aug-20'


  var reg = /^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i;

  if (reg.test(str) === true) {
    return true;
  } //number-letter '20-aug'


  var reg2 = /^([0-9]{1,4})(-|–|—)([a-z\u00C0-\u00FF`"'/]+$)/i;

  if (reg2.test(str) === true) {
    return true;
  } //support weird number-emdash combo '2010–2011'
  // let reg2 = /^([0-9]+)(–|—)([0-9].*)/i
  // if (reg2.test(str)) {
  //   return true
  // }


  return false;
}; // 'he / she' should be one word


var combineSlashes = function combineSlashes(arr) {
  for (var i = 1; i < arr.length - 1; i++) {
    if (isSlash.test(arr[i])) {
      arr[i - 1] += arr[i] + arr[i + 1];
      arr[i] = null;
      arr[i + 1] = null;
    }
  }

  return arr;
};

var splitHyphens = function splitHyphens(word) {
  var arr = []; //support multiple-hyphenated-terms

  var hyphens = word.split(/[-–—]/);
  var whichDash = '-';
  var found = word.match(/[-–—]/);

  if (found && found[0]) {
    whichDash = found;
  }

  for (var o = 0; o < hyphens.length; o++) {
    if (o === hyphens.length - 1) {
      arr.push(hyphens[o]);
    } else {
      arr.push(hyphens[o] + whichDash);
    }
  }

  return arr;
};

var isArray$2 = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}; //turn a string into an array of strings (naiive for now, lumped later)


var splitWords = function splitWords(str) {
  var result = [];
  var arr = []; //start with a naiive split

  str = str || '';

  if (typeof str === 'number') {
    str = String(str);
  }

  if (isArray$2(str)) {
    return str;
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


  if (carry) {
    if (result.length === 0) {
      result[0] = '';
    }

    result[result.length - 1] += carry; //put it on the end
  } // combine 'one / two'


  result = combineSlashes(result); // remove empty results

  result = result.filter(function (s) {
    return s;
  });
  return result;
};

var _02Words = splitWords;

var isArray$3 = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
/** turn a string into an array of Phrase objects */


var fromText = function fromText() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var pool = arguments.length > 2 ? arguments[2] : undefined;
  var sentences = null; //a bit of validation, first

  if (typeof text !== 'string') {
    if (typeof text === 'number') {
      text = String(text);
    } else if (isArray$3(text)) {
      sentences = text;
    }
  } //tokenize into words


  sentences = sentences || _01Sentences(text, world);
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

    _linkTerms(terms); //return phrase objects

    var p = new Phrase_1(terms[0].id, terms.length, pool);
    p.cache.terms = terms;
    return p;
  }); //return them ready for a Document object

  return phrases;
};

var _01Tokenizer = fromText;

var fromJSON = function fromJSON(json, world) {
  var pool = new Pool_1();
  var phrases = json.map(function (p, k) {
    var terms = p.terms.map(function (o, i) {
      var term = new Term_1(o.text);
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
        o.tags.forEach(function (tag) {
          return term.tag(tag, '', world);
        });
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

var _version = '13.8.0';

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
  "Abbreviation": "true¦a0Tb0Qc0Kd0Ie0Ff0Cg0Ah08i06j04k02l00mRnOoNpIqHrFs9t6u5v2w0yb,µg;is0r,y0L;!c;a,b,e1i0ol,s,t;tro,vo;r,t;niv,safa,t;b1ce,d,e0sp;l,mp,nn,x;!l,sp;ask,e3fc,gt,i2q1r,s,t,u0;pt,rg;! ft;r,tu;c,nVp0;!t;b,d,e0;pSs,v;t,ue;a,d,enn3hd,l,p,r1s0t,vt;!eud;ef,o0;b,f,n;!a;ct,kla,nt,z;e0ov;b0e;!r;a7b,d,essrs,g,i4l3m2p1rHs0t;!tr;h,s;!e;!le;!n1s0;c,ter;!n;!j,r,sc;at,b,it,lb,m,ng,t0x;!d;an6b,g,m0;!ph;an,d,r,u0;l,n;a,da,e,n0;c,f;g,on,r0wy,z;!s;a0b,en,ov;!l;e1ig,l0m,r,t,y;! oz,a;b,m;a,g,ng,s1tc,x0;!p;p,q,t;ak,e0g,ist,l,m,r;c,f,pt,t;a3ca,g,l,m2o0pl,res,yn;!l0mdr,nn,rp;!o;!dr;!l0pt;!if;a,c,l1r0;ig,os;!dg,vd;d4l3p2r1ss0tty,ug,ve;n,t;c,iz;prox,r,t;!ta;!j,m,v",
  "Pronoun": "true¦'em,elle,h4i3me,ourselves,she5th1us,we,you0;!rself;e0ou;m,y;!l,t;e0im;!'s",
  "Singular": "true¦0:14;1:17;a13b0Rc0Id0Be08f03gYhUiTjel0kitty,lRmNnMoLpGquestionFrDs8t5u3w2;ay,om01;nc0Xs 2;doll0Jst0L; rex,a3h2ic,ragedy,v show;ere,i1;l0x return;i5ky,omeoLt2uper bowl,yst12;ep3ri1u2;de0Vff;faRmoR;st0Rze;al0i1o2;om,se;! mark;a5i0Nla4r3u2;dOrpoG;erogaZobl0S;te,y0K;rt,te0L;bjVceIthers,verview;othi1umb0H;a4ee07o2;del,m2nopo0rni1th0F;!my;n,yf0;i2unch;ne;ci1nsect;ead start,o2uman right;l0me3u2;se;! run;adf0entlem5irl00laci05od,rand3u2;l0y; slam,fa2mo2;th02;an;a5ella,ly,ol0r3un2;di1;ee market,iUo2;ntiXsO;mi0thW;conomy,gg,ner6ven3x2;ampRecu8;i1t;ad7e4innSo2ragonf0ude;cumentFg2i0l0or;gy;ath,t2;ec2;tive;!dy;a8eili1h6i4o2redit card;ttage,u2;riJsin;ty,vil w2;ar;andeliGocol2;ate;n2rD;ary;aAel0lesHo6r4u2;n2tterf0;ti1;eakfast,o2;!th8;dy,tt4y2;!fri2;end;le;nki1r2;ri2;er;d4l0noma0u2;nt;ly; homin4verti2;si1;ng;em",
  "FemaleName": "true¦0:J3;1:J7;2:IG;3:IF;4:IX;5:IK;6:JO;7:H0;8:JK;9:JG;A:HN;B:HY;C:IT;D:JD;E:IP;F:HC;G:I0;aGRbFLcDPdCYeBOfB4gADh9Ti9Gj8Gk7Gl60m49n3No3Jp37qu36r2Ds16t0Eu0Cv02wVxiTyOzH;aLeIineb,oHsof2;e3Uf2la,ra;h3iKlIna,ynH;ab,ep;da,ma;da,h3iHra;nab;aKeJi0Fol5BuIvH;etAonDO;i0na;le0sen2;el,gm3Jn,rGJs8W;aoHme0nyi;m62yAE;aMendDYhiDFiH;dele9lJnH;if48niHo0;e,f47;a,helmi0lHma;a,ow;ka0nB;aNeKiHusa5;cIktoriBMlAole7viH;anC3enJ0;kF9tor2;da,lA9nus,rHs0;a,nHoniH4;a,iFQ;leHnesH4;nIHrH;i1y;g9rHxH5;su5te;aYeUhRiNoLrIuHy3;i,la;acIZiHu0L;c2na,sH;hBPta;nHr0H;iBNya;aJffaEOnHs6;a,gtiH;ng;!nFQra;aIeHomasi0;a,l9Po8Ares1;l2ndolwethu;g9Go88rIssH;!a,ie;eHi,ri8;sa,za;bPlNmLnJrIs6tHwa0;ia0um;a63yn;iHya;a,ka,s6;arB6e3iHmEDra;!ka;a,iH;a,t6;at6it6;a0Fcarlet3We0BhXiTkye,neza0oRtNuIyH;bIBlvi1;e,ha,mayIEni7sIzH;an3MetAie,y;anHi8;!a,e,nH;aEe;aJeH;fHl5GphH;an4;cHZr5;b2fiA8m0OnHphi1;d3ia,ja,ya;er3lJmon1nIobh8PtH;a,i;dy;lEPv2;aMeIirHo0risF7y5;a,lDK;ba,e0i5lJrH;iHrDOyl;!d8Hfa;ia,lDX;hd,iMki3nJrIu0w0yH;la,ma,na;i,le9on,ron;aIda,ia,nHon;a,on;!ya;k6mH;!aa;lJrItaye81vH;da,inj;e0ife;en1i0ma;anA5bNd3Nh1RiBkMlLmJndIrHs6vannaE;aEi0;ra,y;aHi3;nt6ra;lDKma,ome;ee0in8Ru3;in1ri0;a05e00hYiVoIuH;by,thDH;bScRghQl2KnPsJwIxH;anAXie,y;an,e0;aIeHie,lD; merBLann8ll1marDBt7;!lHnn1;iHyn;e,nH;a,d9K;da,i,na;ayy8D;hel62io;bDKer7yn;a,cIkHmas,n9Fta,ya;ki,o;helGki;ea,iannGDoH;da,n1K;an0bJem9Agi0iInHta,y0;a88ee;han83na;a,eH;cEAkaE;bi0chIe,i0mo0nHquEKvCy0;di,ia;aEIelHiB;!e,le;een4ia0;aNeMhKipaluk,oJrHute66;iHudenCQ;scil3LyamvaB;lly,rt2;ilome0oebe,ylH;is,lis;arl,ggy,nelope,r5t3;ige,m0TnKo5rvaDGtIulH;a,etAin1;ricHsy,tBY;a,e,ia;do3i06;ctav2dIfCZis6lHphCZumC3yunbileg;a,ga,iv2;eHvAC;l2tA;aWeUiMoIurHy5;!ay,ul;a,eJor,rIuH;f,r;aEeCma;ll1mi;aNcLhariBOkKlaJna,sHta,vi;anHha;ur;!y;a,iDTki;hoGk9VolH;a,eDJ;!mh;hir,lHna,risFsreC;!a,lBT;asuLdKh2i6CnJomi8rgEPtHzanin zah3;aHhal4;li1s6;cy,etA;a,e9iEV;nngu30;a09ckenz4e01iMoJrignayani,uriDDyH;a,rH;a,lNna,tG;bi0i3llBInH;a,iH;ca,ka,qD3;a,cTkaSlNmi,nLrItzi,yH;ar;aIiam,lH;anEO;!l,nB;dy,eHh,n4;nhGrva;aKdJiCPlH;iHy;cent,e;red;!gros;!e5;ae5hH;ae5el3Z;ag5EgNi,lKrH;edi79iIjem,on,yH;em,l;em,sF;an4iHliF;nHsCE;a,da;!an,han;b0DcASd0Be,g09ha,i08ja,l06n04rLsoum60tKuIv82x9IyHz4;a,bell,ra,soB9;de,rH;a,eC;h8Fild1t4;a,cYgUiKjor4l7Sn4s6tJwa,yH;!aHbe6Wja9lAE;m,nBH;a,ha,in1;!aJbCBeIja,lDna,sHt64;!a,ol,sa;!l1H;! Jh,mInH;!a,e,n1;!awit,i;aliAHcJeduarBfernIjHlui5Y;o6Ful2;anB;ecil2la3;arJeIie,oHr44ueriA;!t;!ry;et42i37;el4Ui76y;dHon,ue5;akran7y;ak,en,iHk,lo3O;a,ka,nB;a,re,s4te;daHg4;!l3A;alDd4elHge,isDBon0;ei9in1yn;el,le;a0Ne0CiYoQuLyH;d2la,nH;!a,dIeBGnHsCL;!a,eBF;a,sCJ;aCWcJel0PiFlIna,pHz;e,i7;a,u,wa;iHy;a0Se,ja,l2JnB;is,l1SrJttIuHvel4;el5is1;e,ie;aKeIi8na,rH;a86i8;lHn1t7;ei;!in1;aSbb9CdRepa,lMnJsIv2zH;!a,be5LetAz4;a,etA;!a,dH;a,sHy;ay,ey,i,y;a,iJja,lHy;iHy;aA0e;!aH;!n5F;ia,ya;!nH;!a,ne;aPda,e0iNjYla,nMoKsJtHx4y5;iHt4;c2t2;e2LlCG;la,nHra;a,ie,o3;a,or1;a,gh,laH;!ni;!h,nH;a,d3e,n5P;cOdon97iNkes6mi9Ana,rMtJurIvHxmi,y5;ern1in2;a,e54ie,yn;as6iIoH;nya,ya;fa,s6;a,isF;a,la;ey,ie,y;a04eZhXiOlAKoNrJyH;lHra;a,ee,ie;istHy6D;a,en,iIyH;!na;!e,n59;nul,ri,urtnB0;aOerNlAZmJrHzzy;a,stH;en,in;!berlImernH;aq;eHi,y;e,y;a,stC;!na,ra;aHei3ongordzol;dij1w5;el7QiKjsi,lJnIrH;a,i,ri;d3na,za;ey,i,lBDs4y;ra,s6;bi7cAJdiat7IeB2iRlQmPnyakuma19rNss6KtKvi7yH;!e,lH;a,eH;e,i8L;a6DeIhHi4NlDri0y;ar6Ber6Bie,leCrB2y;!lyn8Gri0;a,en,iHl5Soli0yn;!ma,n3VsF;a5il1;ei8Ei,l4;a,tl6L;a07eYiVoNuH;anLdKliHst63;a8HeHsF;!n9tH;!a,te;e5Ji3Jy;a,i7;!anNcelDd6RelGhan7RlLni,sIva0yH;a,ce;eHie;fHlDph5U;a,in1;eHie;en,n1;!a,e,n41;lHng;!i1ClH;!i1B;anMle0nJrIsH;i8Csi8C;i,ri;!a,elGif2CnH;a,etAiHy;!e,f2A;a,e8EiInH;a,e8DiH;e,n1;cMd1mi,nIque4Xsmin3Ovie3y9zH;min8;a8eIiH;ce,e,n1s;!lHsFt0F;e,le;inIk4lDquelH;in1yn;da,ta;lRmPnOo0rNsIvaHzaro;!a0lu,na;aJiIlaHob84;!n9N;do3;!belHdo3;!a,e,l39;a77en1i0ma;a,di3es,gr6Yji;a9elBogH;en1;a,e9iHo0se;a0na;aSeOiJoHusFyacin2B;da,ll4rten23snH;a,i9Q;lImaH;ri;aIdHlaI;a,egard;ry;ath1CiJlInriet7rmi9sH;sa,t1B;en2Sga,mi;di;bi2Dil8IlNnMrJsItHwa,yl8Iz7H;i5St4;n5Yti;iHmo51ri52;etH;!te;aEnaE;a,ey,l4;a03eXiSlQoOrKunJwH;enHyne1Q;!dolD;ay,el;acIetHiselB;a,chC;e,ieH;!la;ld1AogooH;sh;adys,enHor2yn2H;a,da,na;aKgi,lIna,ov89selHta;a,e,le;da,liH;an;!n0;mLnJorgIrH;ald3Pi,m3Ctru8B;etAi4W;a,eHna;s26vieve;ma;bIil,le,mHrnet,yG;al5Ni5;i5FrielH;a,l1;aVeSiRloOoz2rH;anJeIiH;da,eB;da,ja;!cH;esIiHoi0O;n1s61;!ca;!rH;a,encH;e,ia;en,o0;lIn0rnH;!anB;ec2ic2;jr,n7rKtHy8;emIiHma,ouma7;ha,ma,n;eh;ah,iBrah,za0;cr4Nd0Ne0Mi0Lk7l04mWn4YrTsNtMuLvH;aJelIiH;!e,ta;in0Gyn;!ngel2S;geni1la,ni45;h5Sta;mLperanKtH;eIhHrel5;er;l30r8;za;a,eralB;iHma,nest2Jyn;cHka,n;a,ka;a,eMiJmH;aHie,y;!li9;lHn1;ee,iHy;a,e,ja;lHrald;da,y;aWeUiNlMma,no3oKsJvH;a,iH;na,ra;a,ie;iHuiH;se;a,en,ie,y;a0c2da,f,nMsJzaH;!betHve7;e,h;aHe,ka;!beH;th;!a,or;anor,nH;!a;!in1na;leCs6;vi;eIiHna,wi0;e,th;l,n;aYeMh2iLjeneKoHul30;lor5Tminiq4In3FrHtt4;a,eCis,la,othHthy;ea,y;ba;an0AnaEon9x4ya;anQbPde,eOiMja,lJmetr2nHsir5K;a,iH;ce,se;a,iIla,orHphi9;es,is;a,l6D;dHrdH;re;!d5Cna;!b2HoraEra;a,d3nH;!a,e;hl2i0l0HmNnLphn1rIvi1XyH;le,na;a,by,cIia,lH;a,en1;ey,ie;a,etAiH;!ca,el1Cka,z;arHia;is;a0Se0Oh05i03lVoKrIynH;di,th2;istHy05;al,i0;lPnMrIurH;tn1E;aJd2NiHn2Nri9;!nH;a,e,n1;!l1X;cepci59n4sH;tanHuelo;ce,za;eHleC;en,tA;aJeoIotH;il51;!pat3;ir8rJudH;etAiH;a,ne;a,e,iH;ce,sZ;a3er3ndH;i,y;aReNloe,rH;isJyH;stH;al;sy,tH;a1Ren,iHy;!an1e,n1;deJlseIrH;!i8yl;a,y;li9;nMrH;isKlImH;ai9;a,eHotA;n1tA;!sa;d3elGtH;al,elG;cIlH;esAi44;el2ilH;e,ia,y;itlZlYmilXndWrOsMtHy5;aKeJhHri0;erHleCrDy;in1;ri0;li0ri0;a33sH;a32ie;a,iNlLmeJolIrH;ie,ol;!e,in1yn;lHn;!a,la;a,eHie,o7y;ne,y;na,sF;a0Hi0H;a,e,l1;is7l4;in,yn;a0Ie02iZlXoUrH;andSeQiJoIyH;an0nn;nwDok8;an3DdgLg0XtH;n2XtH;!aInH;ey,i,y;ny;etH;!t8;an0e,nH;da,na;i8y;bbi8glarIlo05nH;i7n4;ka;ancHossom,ythe;a,he;an17lja0nHsm3I;i7tH;ou;aUcky,linTni7rPssOtJulaEvH;!erlH;ey,y;hJsy,tH;e,iHy8;e,na;!anH;ie,y;!ie;nHt6yl;adIiH;ce;etAi9;ay,da;!triH;ce,z;rbJyaH;rmH;aa;a3ie,o3ra;a2Sb2Md23g1Zi1Qj5l16m0Xn09oi,r04sUtTuPvOwa,yIzH;ra,u0;aKes6gJlIseH;!l;in;un;!nH;a,na;a,i2Ir2J;drJgus1RrIsteH;ja;el2;a,ey,i,y;aahua,he0;hIi2Gja,mi7s2DtrH;id;aMlIraqHt21;at;eIi8yH;!n;e,iHy;gh;!nH;ti;iJleIo6pi7;ta;en,n1tA;aHelG;!n1J;a00dje5eYgUiSjQnJohito,toHya;inetAnH;el5ia;!aKeIiHmJ;e,ka;!mHtA;ar4;!belIliFmU;sa;!le;a,eliH;ca;ka,sHta;a,sa;elHie;a,iH;a,ca,n1qH;ue;!tA;te;! JbImHstasiNya;ar2;el;cla3jul2pau5;aLberKeliJiHy;e,l2naH;!ta;a,ja;!ly;hGiIl2nB;da;a,ra;le;aWba,ePiMlKma,thJyH;a,c2sH;a,on,sa;ea;iHys0N;e,s0M;a,cIn1sHza;a,e,ha,on,sa;e,ia,ja;c2is6jaKksaKna,sJxH;aHia;!nd3;ia,saH;nd3;ra;ia;i0nIyH;ah,na;a,is,naEoud;la;c6da,leCmNnLsH;haElH;inHyY;g,n;!h;a,o,slH;ey;ee;en;at6g4nIusH;ti0;es;ie;aWdiTelMrH;eJiH;anMenH;a,e,ne;an0;na;!aLeKiIyH;nn;a,n1;a,e;!ne;!iH;de;e,lDsH;on;yn;!lH;i9yn;ne;aKbIiHrL;!gaK;ey,i8y;!e;gaH;il;dKliyJradhIs6;ha;ya;ah;a,ya",
  "Actor": "true¦aJbGcFdCengineIfAgardenIh9instructPjournalLlawyIm8nurse,opeOp5r3s1t0;echnCherapK;ailNcientJecretary,oldiGu0;pervKrgeon;e0oofE;ceptionGsearC;hotographClumbColi1r0sychologF;actitionBogrammB;cem6t5;echanic,inist9us4;airdress8ousekeep8;arm7ire0;fight6m2;eputy,iet0;ici0;an;arpent2lerk;ricklay1ut0;ch0;er;ccoun6d2ge7r0ssis6ttenda7;chitect,t0;ist;minist1v0;is1;rat0;or;ta0;nt",
  "Honorific": "true¦a01bYcQdPeOfiJgIhon,jr,king,lHmCoffic00p7queen,r3s0taoiseach,vice6;e1fc,gt,ir,r,u0;ltRpt,rg;cond liInBrgeaJ;abbi,e0;ar1p9s,v0;!erend; admirX;astOhd,r0vt;esideDi1of0;!essM;me mini4nce0;!ss;a3essrs,i2lle,me,r1s0;!tr;!s;stK;gistrate,j,r6yF;i3lb,t;en,ov;eld mar3rst l0;ady,i0;eutena0;nt;shG;sq,xcellency;et,oct6r,utchess;apt6hance4mdr,o0pl;lonel,m2ngress0unci3;m0wom0;an;dr,mand5;ll0;or;!ain;ldg,rig0;!adi0;er;d0sst,tty,yatullah;j,m0v;!ir0;al",
  "SportsTeam": "true¦0:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls",
  "Uncountable": "true¦0:1I;1:1X;2:16;a1Rb1Jc1Ad17e10f0Ug0Nh0Ii0Ej0Dknowled1Ql08mYnews,oXpTrOsDt8vi7w3;a5ea0Bi4oo3;d,l;ldlife,ne;rmth,t0;neg17ol0Ctae;e6h5oothpaste,r3una;affTou3;ble,sers,t;ermod1Mund0;a,nnis;aBcene0Aeri2hAil9kittl2now,o8p6t4u3;g10nshi0Q;ati1Le3;am,el;ace1Ee3;ci2ed;ap,cc0;k,v0;eep,ingl2;d0Dfe18l3nd;m11t;a6e4ic3;e,ke0M;c3laxa0Isearch;ogni0Hrea0H;bi2in;aPe5hys1last9o3ress04;l3rk,w0;it1yA;a12trZ;bstetr1il,xygen;aAe8ilk,o5u3;mps,s3;ic;n3o0I;ey,o3;gamy;a3chan1;sl2t;chine3il,themat1; learn0Bry;aught0e5i4ogi0Su3;ck,g0I;ce,ghtn08ngui0QteratN;a3isM;th0;ewelAusti0L;ce,mp3nformaUtself;a3ortan0J;ti3;en0H;a6isto5o3;ck3mework,n3spitali0B;ey;ry;ir,libut,ppiD;ene6o4r3um,ymna0D;aCound;l3ssip;d,f; 3t1;editQpo3;ol;i7lour,o4urnit3;ure;od,rgive3uri0wl;ne3;ss;c9sh;conom1duca8lectr7n5quip6th1very3;body,o3thH;ne;joy3tertain3;ment;iciPon1;tiI;ar4iabet2raugh4;es;ts;aAelcius,h6iv1l5o3urrency;al,ld w3nfusiDttD;ar;ass1oth5;aos,e3;e4w3;ing;se;r7sh;a7eef,i4lood,owls,read,utt0;er;lliar4s3;on;ds;g3ss;ga3;ge;c8dvi7ero5ir4mnes3rt,thlet1;ty;craft;b1d3naut1;ynam1;ce;id,ou3;st1;ics",
  "Infinitive": "true¦0:6R;1:75;2:5B;3:73;4:72;5:66;6:6E;7:71;8:6X;9:6P;A:6Z;B:6W;C:5W;D:76;E:6K;F:5A;a6Jb65c56d4Ce3Wf3Ig3Ch36i2Tj2Rk2Pl2Gm25n22o1Xp1Ir0Qs05tXuSvOwHyG;awn,ield;aJe1Yhist6iIoGre6C;nd0rG;k,ry;pe,sh,th0;lk,nHrGsh,tEve;n,raD;d0t;aIiGo7;eGsB;!w;l6Jry;nHpGr4se;gra4Pli41;dGi7lo5Zpub3Q;erGo;mi5Cw1I;aMeLhKig5SoJrHuGwi8;ne,rn;aGe0Mi5Uu8y;de,in,nsf0p,v5J;r2ZuE;ank,reatC;nd,st;lk,rg1Qs7;aZcWeVhTi4Dkip,lSmRnee3Lo52pQtJuGwitE;bmBck,ff0gge8ppHrGspe5;ge,pri1rou4Zvi3;ly,o36;aLeKoJrHuG;dy,mb6;aFeGi3;ngthCss,tE;p,re;m,p;in,ke,r0Qy;la58oil,rink6;e1Zi6o3J;am,ip;a2iv0oG;ck,rtCut;arEem,le5n1r3tt6;aHo2rG;atEew;le,re;il,ve;a05eIisk,oHuG;in,le,sh;am,ll;a01cZdu9fYgXje5lUmTnt,pQquPsKtJvGwa5V;eGiew,o36;al,l,rG;se,t;aFi2u44;eJi8oItG;!o2rG;i5uc20;l3rt;mb6nt,r3;e8i2;air,eHlGo43r0K;a9y;at;aFemb0i3Zo3;aHeGi3y;a1nt;te,x;a5Dr0J;act1Yer,le5u1;a13ei3k5PoGyc6;gni2Cnci6rd;ch,li2Bs5N;i1nG;ge,k;aTerSiRlOoMrIuG;b21ll,mp,rGsh;cha1s4Q;ai1eIiDoG;cGdu9greAhibBmi1te8vi2W;eAlaim;di5pa2ss,veD;iDp,rtr46sGur;e,t;aHead,uG;g,n4;n,y;ck,le;fo34mBsi8;ck,iDrt4Mss,u1;bJccur,ff0pera7utweIverGwe;co47lap,ta22u1wG;helm;igh;ser3taF;eHotG;e,i9;ed,gle5;aMeLiIoHuG;ltip3Grd0;nit13ve;nHrr12sreprG;eseD;d,g6us;asu2lt,n0Nr4;intaFna4rHtG;ch,t0;ch,kGry;et;aMeLiJoGu1C;aHck,oGve;k,sC;d,n;ft,g35ke,mBnk,st2YveG;!n;a2Fc0Et;b0Nck,uG;gh,nE;iGno34;ck,ll,ss;am,oFuG;d4mp;gno2mQnGss3H;cOdica7flu0MhNsKtIvG;eGol3;nt,st;erGrodu9;a5fe2;i8tG;aGru5;ll;abBibB;lu1Fr1D;agi24pG;lemeDo22ro3;aKeIi2oHuG;nt,rry;n02pe,st;aGlp;d,t;nd6ppCrm,te;aKloAove1PrIuG;arGeAi15;ant39d;aGip,umb6;b,sp;in,th0ze;aReaQiOlMoJrHuncG;ti3J;acGeshC;tu2;cus,lHrG;ce,eca8m,s30;d,l24;a1ZoG;at,od,w;gu2lGni1Xt,x;e,l;r,tu2;il,stCvG;or;a15cho,le5mSnPstNvalua7xG;a0AcLerKi8pGte19;a18eHi2laFoGreA;rt,se;ct,riG;en9;ci1t;el,han4;abGima7;li1J;ab6couXdHfor9ga4han9j03riEsu2t0vG;isi2Vy;!u2;body,er4pG;hasiGow0;ze;a07eUiLoKrHuG;mp;aHeAiG;ft;g,in;d4ubt;ff0p,re5sHvG;iZor9;aKcHliGmiApl1Btingui14;ke;oGuA;uGv0;ra4;gr1YppG;ear,ro3;cOeNfLliv0ma0Fny,pKsHterG;mi0G;cribe,er3iHtrG;oy;gn,re;a0Be0Ai5osB;eGi0By;at,ct;m,pC;iIlHrG;ea1;a2i06;de;ma4n9rGte;e,kC;a0Ae09h06i7l04oJrG;aHeGoAu0Hy;a7dB;ck,ve;llZmSnHok,py,uGv0;gh,nt;cePdu5fMsKtIvG;eGin9;rt,y;aFin0VrG;a8ibu7ol;iGtitu7;d0st;iHoGroD;rm;gu2rm;rn;biLfoKmaJpG;a2laF;in;re;nd;rt;ne;ap1e5;aGip,o1;im,w;aHeG;at,ck,w;llen4n4r4se;a1nt0;ll,ncIrGt0u1;eGry;!en;el;aSePloOoMrIuG;lGry;ly;igHuG;sh;htC;en;a8mb,o8rrGth0un9;ow;ck;ar,lHnefBtrG;ay;ie3ong;ng,se;band0Jc0Bd06ffo05gr04id,l01mu1nYppTrQsKttGvoid,waB;acIeHra5;ct;m0Fnd;h,k;k,sG;eIiHocia7uG;me;gn,st;mb6rt;le;chHgGri3;ue;!i3;eaJlIroG;aEve;ch;aud,y;l,r;noun9sw0tG;icipa7;ce;lHt0;er;e4ow;ee;rd;aRdIju8mBoR;it;st;!reA;ss;cJhie3knowled4tiva7;te;ge;ve;eIouDu1;se;nt;pt;on",
  "Unit": "true¦0:19;a14b12c0Od0Ne0Lf0Gg0Ch09in0Hjoule0k02l00mNnMoLpIqHsqCt7volts,w6y4z3°2µ1;g,s;c,f,n;b,e2;a0Nb,d0Dears old,o1;tt0H;att0b;able4b3d,e2on1sp;!ne0;a2r0D;!l,sp;spo04; ft,uare 1;c0Id0Hf3i0Fkilo0Jm1ya0E;e0Mil1;e0li0H;eet0o0D;t,uart0;ascals,e2i1ou0Pt;c0Mnt0;rcent,t02;hms,uYz;an0JewtT;/s,b,e9g,i3l,m2p1²,³;h,s;!²;!/h,cro5l1;e1li08;! pFs1²;! 1;anEpD;g06s0B;gQter1;! 2s1;! 1;per second;b,i00m,u1x;men0x0;b,elvin0g,ilo2m1nR;!/h,ph,²;byZgXmeter1;! p2s1;! p1;er1; hour;e1g,r0z;ct1rtz0;aXogQ;al2b,igAra1;in0m0;!l1;on0;a4emtPl2t1;²,³; oz,uid ou1;nce0;hrenheit0rad0;b,x1;abyH;eciCg,l,mA;arat0eAg,m9oulomb0u1;bic 1p0;c5d4fo3i2meAya1;rd0;nch0;ot0;eci2;enti1;me4;!²,³;lsius0nti1;g2li1me1;ter0;ram0;bl,y1;te0;c4tt1;os1;eco1;nd0;re0;!s",
  "Organization": "true¦0:46;a3Ab2Qc2Ad21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2S;a3e1orld trade organizati41;lls fargo,st1;fie22inghou16;l1rner br3D;-m11gree31l street journ25m11;an halNeriz3Wisa,o1;dafo2Gl1;kswagLvo;bs,kip,n2ps,s1;a tod2Rps;es35i1;lev2Xted natio2Uv; mobi2Kaco bePd bMeAgi frida9h3im horto2Tmz,o1witt2W;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen33daily ma2Xguess w2holli0rolling st1Ms1w2;mashing pumpki2Ouprem0;ho;ea1lack eyed pe3Fyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Gnp,o2pice gir5ta1ubaru;rbucks,to2N;ny,undgard1;en;a2Rx pisto1;ls;few25insbu26msu1X;.e.m.,adiohead,b6e3oyal 1yan2X;b1dutch she4;ank;/max,aders dige1Ed 1vl32;bu1c1Uhot chili peppe2Klobst28;ll;c,s;ant2Vizno2F;an5bs,e3fiz24hilip morrBi2r1;emier27octer & gamb1Rudenti14;nk floyd,zza hut;psi28tro1uge08;br2Qchina,n2Q; 2ason1Xda2G;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Etflix,w1; 1sweek;kids on the block,york08;a,c;nd1Us2t1;ional aca2Fo,we0Q;a,cYd0O;aAcdonald9e5i3lb,o1tv,yspace;b1Nnsanto,ody blu0t1;ley crue,or0O;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt13z1Y;'ore09a3e1g,ittle caesa1Ktd;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1K;art;iffy lu0Lo3pmorgan1sa;! cha1;se;hnson & johns1Sy d1R;bm,hop,n1tv;c,g,te1;l,rpol; & m,asbro,ewlett-packaTi3o1sbc,yundai;me dep1n1J;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Iu1;cci,ns n ros0;ldman sachs,o1;dye1g0B;ar;axo smith kliZencore;electr0Im1;oto0V;a3bi,da,edex,i1leetwood mac,oGrito-l0A;at,nancial1restoV; tim0;cebook,nnie mae;b06sa,u3xxon1; m1m1;ob0H;!rosceptics;aiml0Ae5isney,o3u1;nkin donuts,po0Wran dur1;an;j,w j1;on0;a,f leppa3ll,p2r spiegZstiny's chi1;ld;eche mode,t;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra05;al;!ca c5l4m1o0Ast05;ca2p1;aq;st;dplMgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Hy;dbury,pital o1rl's jr;ne;aGbc,eCfAl6mw,ni,o2p,r1;exiteeWos;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roX;ckbuster video,omingda1;le; g1g1;oodriN;cht3e ge0n & jer2rkshire hathaw1;ay;ryH;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bXcSdidRerosmith,ig,lLmFnheuser-busEol,ppleAr7s3t&t,v2y1;er;is,on;hland2s1;n,ociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c",
  "Demonym": "true¦0:16;1:13;a0Wb0Nc0Cd0Ae09f07g04h02iYjVkTlPmLnIomHpDqatari,rBs7t5u4v3wel0Rz2;am0Fimbabwe0;enezuel0ietnam0H;g9krai1;aiwThai,rinida0Iu2;ni0Qrkmen;a4cot0Ke3ingapoOlovak,oma0Tpa05udRw2y0X;edi0Kiss;negal0Br08;mo0uU;o6us0Lw2;and0;a3eru0Hhilipp0Po2;li0Ertugu06;kist3lesti1na2raguay0;ma1;ani;amiZi2orweP;caragu0geri2;an,en;a3ex0Mo2;ngo0Erocc0;cedo1la2;gasy,y08;a4eb9i2;b2thua1;e0Dy0;o,t02;azakh,eny0o2uwaiti;re0;a2orda1;ma0Bp2;anN;celandic,nd4r2sraeli,ta02vo06;a2iT;ni0qi;i0oneV;aiDin2ondur0unN;di;amDe2hanai0reek,uatemal0;or2rm0;gi0;i2ren7;lipino,n4;cuadoVgyp6ngliJsto1thiopi0urope0;a2ominXut4;niH;a9h6o4roa3ub0ze2;ch;ti0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el8o6r3ul2;gaG;aziBi2;ti2;sh;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;gent2me1;ine;ba1ge2;ri0;ni0;gh0r2;ic0;an",
  "Possessive": "true¦anyAh5its,m3noCo1sometBthe0yo1;ir1mselves;ur0;!s;i8y0;!se4;er1i0;mse2s;!s0;!e0;lf;o1t0;hing;ne",
  "Currency": "true¦$,aud,bScQdLeurKfJgbp,hkd,iIjpy,kGlEp8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotySł;en,uanR;af,of;h0t5;e0il5;k0q0;elM;iel,oubleLp,upeeL;e2ound st0;er0;lingI;n0soH;ceGn0;ies,y;e0i8;i,mpi7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s",
  "City": "true¦a2Wb26c1Wd1Re1Qf1Og1Ih1Ai18jakar2Hk0Zl0Tm0Gn0Co0ApZquiYrVsLtCuBv8w3y1z0;agreb,uri1Z;ang1Te0okohama;katerin1Hrev34;ars3e2i0rocl3;ckl0Vn0;nipeg,terth0W;llingt1Oxford;aw;a1ern1Mi0;en2Hlni2Z;lenc2Uncouv0Gr2Gughn;lan bat0Dtrecht;a6bilisi,e5he4i3o2rondheim,u0;nVr0;in,ku;kyo,ronIulouC;anj23l13miso2Jra2A; haJssaloni0X;gucigalpa,hr2Ol av0L;i0llinn,mpe2Bngi07rtu;chu22n2MpT;a3e2h1kopje,t0ydney;ockholm,uttga12;angh1Fenzh1X;o0KvZ;int peters0Ul3n0ppo1F; 0ti1B;jo0salv2;se;v0z0Q;adU;eykjavik,i1o0;me,sario,t25;ga,o de janei17;to;a8e6h5i4o2r0ueb1Qyongya1N;a0etor24;gue;rt0zn24; elizabe3o;ls1Grae24;iladelph1Znom pe07oenix;r0tah tik19;th;lerJr0tr10;is;dessa,s0ttawa;a1Hlo;a2ew 0is;delTtaip0york;ei;goya,nt0Upl0Uv1R;a5e4i3o1u0;mb0Lni0I;nt0scH;evideo,real;l1Mn01skolc;dellín,lbour0S;drid,l5n3r0;ib1se0;ille;or;chest0dalWi0Z;er;mo;a4i1o0vAy01;nd00s angel0F;ege,ma0nz,sbZverpo1;!ss0;ol; pla0Iusan0F;a5hark4i3laipeda,o1rak0uala lump2;ow;be,pavog0sice;ur;ev,ng8;iv;b3mpa0Kndy,ohsiu0Hra0un03;c0j;hi;ncheMstanb0̇zmir;ul;a5e3o0; chi mi1ms,u0;stI;nh;lsin0rakliG;ki;ifa,m0noi,va0A;bu0SiltD;alw4dan3en2hent,iza,othen1raz,ua0;dalaj0Gngzhou;bu0P;eUoa;sk;ay;es,rankfu0;rt;dmont4indhovU;a1ha01oha,u0;blRrb0Eshanbe;e0kar,masc0FugavpiJ;gu,je0;on;a7ebu,h2o0raioJuriti01;lo0nstanJpenhagNrk;gFmbo;enn3i1ristchur0;ch;ang m1c0ttagoL;ago;ai;i0lgary,pe town,rac4;ro;aHeBirminghWogoAr5u0;char3dap3enos air2r0sZ;g0sa;as;es;est;a2isba1usse0;ls;ne;silPtisla0;va;ta;i3lgrade,r0;g1l0n;in;en;ji0rut;ng;ku,n3r0sel;celo1ranquil0;la;na;g1ja lu0;ka;alo0kok;re;aBb9hmedabad,l7m4n2qa1sh0thens,uckland;dod,gabat;ba;k0twerp;ara;m5s0;terd0;am;exandr0maty;ia;idj0u dhabi;an;lbo1rh0;us;rg",
  "Country": "true¦0:38;1:2L;a2Wb2Dc21d1Xe1Rf1Lg1Bh19i13j11k0Zl0Um0Gn05om3CpZqat1JrXsKtCu6v4wal3yemTz2;a24imbabwe;es,lis and futu2X;a2enezue31ietnam;nuatu,tican city;.5gTkraiZnited 3ruXs2zbeE;a,sr;arab emirat0Kkingdom,states2;! of am2X;k.,s.2; 27a.;a7haBimor-les0Bo6rinidad4u2;nis0rk2valu;ey,me2Xs and caic1T; and 2-2;toba1J;go,kel0Ynga;iw2Vji2nz2R;ki2T;aCcotl1eBi8lov7o5pa2Bri lanka,u4w2yr0;az2ed9itzerl1;il1;d2Qriname;lomon1Vmal0uth 2;afr2IkLsud2O;ak0en0;erra leoEn2;gapo1Wt maart2;en;negKrb0ychellY;int 2moa,n marino,udi arab0;hele24luc0mart1Z;epublic of ir0Com2Cuss0w2;an25;a3eHhilippinTitcairn1Ko2uerto riM;l1rtugE;ki2Bl3nama,pua new0Tra2;gu6;au,esti2;ne;aAe8i6or2;folk1Gth3w2;ay; k2ern mariana1B;or0M;caragua,ger2ue;!ia;p2ther18w zeal1;al;mib0u2;ru;a6exi5icro09o2yanm04;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagascZl6r4urit3yot2;te;an0i14;shall0Vtin2;ique;a3div2i,ta;es;wi,ys0;ao,ed00;a5e4i2uxembourg;b2echtenste10thu1E;er0ya;ban0Gsotho;os,tv0;azakh1De2iriba02osovo,uwait,yrgyz1D;eling0Jnya;a2erF;ma15p1B;c6nd5r3s2taly,vory coast;le of m19rael;a2el1;n,q;ia,oI;el1;aiSon2ungary;dur0Mg kong;aAermany,ha0Pibralt9re7u2;a5ern4inea2ya0O;!-biss2;au;sey;deloupe,m,tema0P;e2na0M;ce,nl1;ar;bTmb0;a6i5r2;ance,ench 2;guia0Dpoly2;nes0;ji,nl1;lklandTroeT;ast tim6cu5gypt,l salv5ngl1quatorial3ritr4st2thiop0;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprQzech2; 8ia;ba,racao;c3lo2morPngo-brazzaville,okFsta r03te d'ivoiK;mb0;osD;i2ristmasF;le,na;republic;m2naTpe verde,yman9;bod0ero2;on;aFeChut00o8r4u2;lgar0r2;kina faso,ma,undi;azil,itish 2unei;virgin2; is2;lands;liv0nai4snia and herzegoviGtswaGuvet2; isl1;and;re;l2n7rmuF;ar2gium,ize;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaFlCmAn5r3ustr2zerbaijH;al0ia;genti2men0uba;na;dorra,g4t2;arct6igua and barbu2;da;o2uil2;la;er2;ica;b2ger0;an0;ia;ni2;st2;an",
  "Region": "true¦0:1U;a20b1Sc1Id1Des1Cf19g13h10i0Xj0Vk0Tl0Qm0FnZoXpSqPrMsDtAut9v6w3y1zacatec22;o05u1;cat18kZ;a1est vi4isconsin,yomi14;rwick0shington1;! dc;er2i1;rgin1S;acruz,mont;ah,tar pradesh;a2e1laxca1DuscaA;nnessee,x1R;bas0Kmaulip1QsmJ;a6i4o2taf0Ou1ylh13;ffVrr00s0Y;me10no1Auth 1;cSdR;ber1Ic1naloa;hu0Sily;n2skatchew0Rxo1;ny; luis potosi,ta catari1I;a1hode7;j1ngp02;asth0Mshahi;inghai,u1;e1intana roo;bec,ensWreta0E;ara4e2rince edward1; isU;i,nnsylv1rnambu02;an14;!na;axa0Ndisha,h1klaho1Bntar1reg4x04;io;ayarit,eBo3u1;evo le1nav0L;on;r1tt0Rva scot0X;f6mandy,th1; 1ampton0;c3d2yo1;rk0;ako0Y;aroli0V;olk;bras0Xva01w1; 2foundland1;! and labrador;brunswick,hamp0jers1mexiJyork state;ey;a6i2o1;nta0Nrelos;ch3dlanBn2ss1;issippi,ouri;as geraGneso0M;igQoacQ;dhya,harasht04ine,ni3r1ssachusetts;anhao,y1;land;p1toba;ur;anca0e1incoln0ouis8;e1iH;ds;a1entucky,hul0A;ns08rnata0Dshmir;alis1iangxi;co;daho,llino2nd1owa;ia05;is;a2ert1idalEunA;ford0;mp0waii;ansu,eorgWlou5u1;an2erre1izhou,jarat;ro;ajuato,gdo1;ng;cester0;lori2uji1;an;da;sex;e4o2uran1;go;rs1;et;lawaErby0;a8ea7hi6o1umbrH;ahui4l3nnectic2rsi1ventry;ca;ut;iMorado;la;apEhuahua;ra;l8m1;bridge0peche;a5r4uck1;ingham0;shi1;re;emen,itish columb3;h2ja cal1sque,var2;iforn1;ia;guascalientes,l4r1;izo2kans1;as;na;a2ber1;ta;ba2s1;ka;ma",
  "Place": "true¦a07b05cZdYeXfVgRhQiOjfk,kMlKmHneEoDp9que,rd,s8t5u4v3w0yyz;is1y0;!o;!c;a,t;pYsafa,t;e1he 0;bronx,hamptons;nn,x;ask,fo,oho,t,under6yd;a2e1h0;l,x;k,nnK;!cifX;kla,nt,rd;b1w eng0;land;!r;a1co,i0t,uc;dKnn;libu,nhattS;a0gw,hr;s,x;an0ul;!s;a0cn,da,ndianMst;!x;arlem,kg,nd,wy;a2re0;at 0enwich;britain,lak6;!y village;co,l0ra;!a;urope,verglad2;ak,en,fw,ist,own4xb;al4dg,gk,hina3l2o1r0;es;lo,nn;!t;town;!if;cn,e0kk,lvd,rooklyn;l air,verly hills;frica,lta,m5ntarct2r1sia,tl0ve;!ant1;ct0iz;ic0; oce0;an;ericas,s",
  "WeekDay": "true¦fri2mon2s1t0wednesd3;hurs1ues1;aturd1und1;!d0;ay0;!s",
  "Month": "true¦aBdec9feb7j2mar,nov9oct1sep0;!t8;!o8;an3u0;l1n0;!e;!y;!u1;!ru0;ary;!em0;ber;pr1ug0;!ust;!il",
  "Date": "true¦ago,t2week0yesterd4; e0e0;nd;mr2o0;d0morrow;ay;!w",
  "FirstName": "true¦aKblair,cGdevFgabrieEhinaDjBk8l7m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g6ne;a1el0ina,org5;!okuh9;naia,r0;ion,lo;ashawn,uca;asCe1ir0rE;an;lsAnyat2rry;am0ess6ie,ude;ie,m5;ta;le;an,on;as2h0;arl0eyenne;ie;ey,sidy;lex2ndr1ubr0;ey;a,ea;is",
  "LastName": "true¦0:9F;1:9V;2:9X;3:9H;4:9N;5:8J;6:9K;7:A0;8:9E;9:88;A:77;B:6E;C:6J;a9Ub8Lc7Kd6Xe6Rf6Dg5Vh58i54j4Pk45l3Nm2Rn2Eo26p1Nquispe,r17s0Ft05vVwOxNyGzD;aytsADhD;aDou,u;ng,o;aGeun7ZiDoshiA9un;!lD;diDmaz;rim,z;maDng;da,guc97mo6UsDzaA;aAhiA7;iao,u;aHeGiEoDright,u;jc8Sng;lDmm0nkl0sniewsA;liA1s2;b0iss,lt0;a5Rgn0lDng,tanabe;k0sh;aHeGiEoDukB;lk5roby5;dBllalDnogr2Zr0Zss0val37;ba,obos;lasEsel7N;lGn dFrg8EsEzD;qu7;ily9Oqu7silj9O;en b35ijk,yk;enzue95verde;aLeix1JhHi4j6ka3IoGrFsui,uD;om4ZrD;c4n0un1;an,embl8TynisA;dor95lst31m3rr9th;at5Mi7LoD;mErD;are6Ylaci64;ps2s0Y;hirBkah8Dnaka;a00chWeThPiNmKoItFuEvDzabo;en8Aobod34;ar7bot3lliv4zuA;aEein0oD;i67j3Lyan8V;l6rm0;kol5lovy5re6Psa,to,uD;ng,sa;iDy5Z;rn5tD;!h;l5YmDngh,rbu;mo6Do6J;aFeDimizu;hu,vchD;en7Cuk;la,r17;gu8mDoh,pulve8Trra4R;jDyD;on5;evi6Filtz,miDneid0roed0ulz,warz;dEtD;!z;!t;ar42h6ito,lFnDr3saAto,v3;ch7d0AtDz;a4Pe,os;as,ihBm3Zo0Q;aOeNiKoGuEyD;a66oo,u;bio,iz,sD;so,u;bEc7Bdrigue57g03j73mDosevelt,ssi,ta7Nux,w3Z;a4Be0O;ertsDins2;!on;bei0LcEes,vDzzo;as,e8;ci,hards2;ag4es,it0ut0y9;dFmEnDsmu7Zv5F;tan1;ir7os;ic,u;aSeLhJiGoErDut6;asad,if5Zochazk1W;lishc24pDrti62u55we66;e2Tov48;cEe09nD;as,to;as60hl0;aDillips;k,m,n5K;de3AetIna,rGtD;ersErovDtersC;!a,ic;en,on;eDic,ry,ss2;i8ra,tz,z;ers;h71k,rk0tEvD;ic,l3T;el,t2O;bJconnor,g2ClGnei5PrEzD;demir,turk;ella3MtDwe5N;ega,iz;iDof6GsC;vDyn1F;ei8;aPri1;aLeJguy1iFoDune44ym4;rodahl,vDwak;ak3Uik5otn56;eEkolDlsCx2;ic,ov6X;ls1miD;!n1;ils2mD;co42ec;gy,kaEray4varD;ro;jiDmu8shiD;ma;aXcVeQiPoIuD;lGnFrDssoli5T;atDpUr68;i,ov3;oz,te4B;d0l0;h4lIo0HrEsDza0Z;er,s;aFeEiDoz5r3Ete4B;!n6F;au,i8no,t4M;!l9;i2Rl0;crac5Ohhail5kke3Qll0;hmeGij0j2ElFndErci0ssiDyer19;!er;e3Bo2Z;n0Io;dBti;cartDlaughl6;hy;dMe6Dgnu5Ei0jer34kLmJnci59rFtEyD;er,r;ei,ic,su1N;iEkBqu9roqu6tinD;ez,s;a54c,nD;!o;a52mD;ad5;e5Oin1;rig4Ns1;aSeMiIoGuEyD;!nch;k3nDo;d,gu;mbarDpe2Rvr3;di;!nDu,yana1R;coln,dD;bDholm;erg;bed5TfeGhtFitn0kaEn6rDw2G;oy;!j;in1on1;bvDvD;re;iDmmy,rsCu,voie;ne,t11;aTennedy,h4iSlQnez46oJrGuEvar4woD;k,n;cerDmar58znets5;a,o2G;aDem0i2Zyeziu;sni3PvD;ch3U;bay4Frh0Jsk0TvaFwalDzl5;czDsA;yk;cFlD;!cDen3Q;huk;!ev3ic,s;e6uiveD;rt;eff0l3mu8nnun1;hn,lloe,minsArEstra31to,ur,yDzl5;a,s0;j0GlsC;aMenLha2Pim0QoEuD;ng,r3;e2JhFnErge2Ju2NvD;anB;es,ss2;anEnsD;en,on,t2;nesDsC;en,s1;ki26s1;cGkob3RnsDrv06;en,sD;enDon;!s;ks2obs1;brahimBglesi3Ake4Ll0CnoZoneFshikEto,vanoD;u,v4A;awa;scu;aPeIitchcock,jaltal6oFrist46uD;!aDb0gh9ynh;m4ng;a23dz3fEjga2Sk,rDx3B;ak0Yvat;er,fm3B;iGmingw3NnErD;nand7re8;dDriks1;ers2;kkiEnD;on1;la,n1;dz3g1lvoLmJnsCqIrr0SsFuEyD;as36es;g1ng;anEhiD;mo0Q;i,ov08;ue;alaD;in1;rs1;aMeorgLheorghe,iJjonIoGrEuDw2;o,staf2Utierr7zm4;ayDg3iffitUub0;li1G;lub3Rme0JnD;calv9zale0I;aj,i;l,mDordaL;en7;iev3B;gnJlGmaFnd2No,rDs2Nuthi0;cDza;ia;ge;eaElD;agh0i,o;no;e,on;ab0erMiIjeldsted,lor9oGrFuD;cDent9ji3F;hs;an1Wiedm4;ntaDrt6st0urni0;na;lipEsD;ch0;ovD;!ic;hatBnandeVrD;arDei8;a,i;ov3;dHinste6riksCsDva0D;cob2ZpDtra2X;inoDosiM;za;en,s2;er,is2wards;aUeMiKjurhuJoHrisco0YuEvorakD;!oQ;arte,boEmitru,rDt2U;and,ic;is;g4he0Hmingu7n2Ord19tD;to;us;aDmitr29ssanayake;s,z; GbnaFlEmirDrvis1Lvi,w4;!ov3;gado,ic;th;bo0groot,jo03lEsilDvri9;va;a cruz,e2uD;ca;hl,mcevsAnErw6t2EviD;d5es,s;ieDku1S;ls1;ki;a05e00hNiobMlarkLoFrD;ivDuz;elli;h1lGntFop0rDs26x;byn,reD;a,ia;i,rer0O;em4liD;ns;!e;anu;aLeIiu,oGriDuJwe;stD;eDiaD;ns1;i,ng,uFwDy;!dhury;!n,onEuD;ng;!g;kEnDtterjee,v7;!d,g;ma,raboD;rty;bGl09ng3rD;eghetEnD;a,y;ti;an,ota0M;cer9lder2mpbeIrFstDvadi08;iDro;llo;doEt0uDvalho;so;so,zo;ll;es;a09eXhUiSlNoGrFyD;rne,tyD;qi;ank5iem,ooks,yant;gdan5nFruya,su,uchEyHziD;c,n5;ard;darDik;enD;ko;ov;aEondD;al;nEzD;ev3;co;ancRshwD;as;a01oDuiy4;umDwmD;ik;ckNethov1gu,ktLnJrD;gGisFnD;ascoDds1;ni;ha;er,mD;ann;gtDit7nett;ss2;asD;hi;er,ham;b3ch,ez,hMiley,kk0nHrDu0;bEnDua;es,i0;ieDosa;ri;dDik;a8yopadhyD;ay;ra;er;k,ng;ic;cosZdYguilXkhtXlSnJrGsl4yD;aEd6;in;la;aEsl4;an;ujo,ya;dFgelD;ovD;!a;ersGov,reD;aDjL;ss1;en;en,on,s2;on;eksejGiyGmeiFvD;ar7es;ez;da;ev;ar;ams;ta",
  "MaleName": "true¦0:E5;1:D6;2:DO;3:AY;4:D2;5:CG;6:CW;7:C8;8:B6;9:DL;A:DK;B:A6;C:C2;aCObBLcAJd9He8Nf85g7Ih6Ui6Ej5Ek52l4Dm35n2To2Np2Fqu2Dr1Ls11t0Eu0Dv07wTxSyIzD;aDor0;cDh9Tkaria,n5W;hEkD;!aCM;ar5WeCL;aLoFuD;sDu2KvBY;if,uf;nFsEusD;ouf,sD;ef;aDg;s,tD;an,h0;hli,nBMssX;avi3ho4;aMeKiFoDyaC2;jcie8Clfgang,odrow,utD;!er;lDnst1;bFey,frD1lD;aBDiD;am,e,s;e9Fur;i,nde8sD;!l7t1;de,lErr9yD;l1ne;lDt3;aAAy;aGiDladimir,ojte7Z;cEha0kt69nceDrgAJva0;!nt;e3Vt67;lentDnA5;in4Y;ghBVlyss5Cnax,sm0;aXeShOiMoHrFuEyD;!l3ro6s1;nAr5C;avAWeDist0oy,um0;ntAOv5Zy;bGdFmDny;!as,mDoharu;aCTie,y;!d;iBy;mDt5;!my,othy;adFeoEia8GomD;!as;!do8P;!de5;dGrD;en9LrD;an9KeDy;ll,n9J;!dy;dgh,ha,iDnn3req,tsu4T;cB5ka;aTcotRePhLiJoHpenc3tDur1Vylve9Kzym1;anFeDua8D;f0phBTvDwa8C;e62ie;!islaw,l7;lom1nBFuD;leyma6ta;dDlBm1yabonga;!dhart7Bn7;aFeD;lDrm0;d1t1;h7Une,qu10un,wn,y6;aDbasti0k2Al4Rrg4Oth,ymoAU;m5n;!tD;!ie,y;lEmDnti2Eq5Bul;!ke5MmCu4;ik,vato7X;aYeUheAAiQoHuEyD;an,ou;b7NdEf5pe7SssD;!elBZ;ol3Fy;an,bKcJdIel,geHh0landBQmGnFry,sEyD;!ce;coe,s;!aAHnC;an,eo;l47r;e5Og3n7olfo,ri7A;co,ky;bCeB7;cDl7;ar6Pc6OhEkDo;!ey,ie,y;a99ie;gEid,ub9x,yDza;an1InY;gA8iD;naA4s;ch70fa4lHmGndFpha4sEul,wi2HyD;an,mo82;h7Vm5;alBDol2Uy;iATon;f,ph;ent2inD;cy,t1;aIeGhilFier72ol,rD;aka16eD;m,st1;!ip,lip;dALrcy,tD;ar,e3Gr1X;b4Kdra7Ft4ZulD;!o17;ctav3Fi3liv3mAFndrej,rHsEtDumAw9;is,to;aEcAkAm0vD;al5Z;ma;i,l53vL;aLeJiFoDu3A;aDel,j5l0ma0r3K;h,m;cEg4i49kD;!au,h7Uola;holBkDolB;!olB;al,d,il,ls1vD;il8Y;hom,thD;anDy;!a4i4;aZeWiMoHuEyD;l2Jr1;hamEr6XstaD;fa,p5C;ed,mH;di0We,hamFis2FntEsDussa;es,he;e,y;ad,ed,mD;ad,ed;cIgu4hai,kGlFnEtchD;!e8;a8Aik;house,o0Bt1;ae5YeA4olD;aj;ah,hDk7;aEeD;al,l;el,l;hElv2rD;le,ri8v2;di,met;ay0ck,hTjd,ks2DlRmadWnQrKs1tFuricExD;!imilian9Nwe8;e,io;eGhEiBtDus,yB;!eo,hew,ia;eDis;us,w;j,o;cHio,kGlFqu7Dsha8tDv2;iDy;!m,n;in,on;!el,oPus;!el9IoOus;iGu4;achDcolm,ik;ai,y;amEdi,eDmoud;sh;adDm5T;ou;aXeQiOlo3EoKuEyD;le,nd1;cGiFkDth3uk;aDe;!s;gi,s,z;as,iaD;no;g0nn7SrenFuDv8Jwe8;!iD;e,s;!zo;am,oD;n4r;a8Cevi,la5JnIoGst3thaFvD;eDi;nte;bo;!nD;!a6Sel;!ny;mFnErDur5Hwr5H;ry,s;ce,d1;ar,o5A;aLeGhaled,iDrist5Iu4Vy6X;er0p,rD;by,k,ollD;os;en0iGnDrmit,v44;!dEnDt5Z;e1Ay;a8ri59;r,th;cp3j5m66na73rEspAthem,uD;ri;im,l;a02eUiSoGuD;an,lDst2;en,iD;an,en,o,us;aNeLhnKkubBnIrGsD;eEhDi8Bue;!ua;!ph;dDge;an,i,on;!aDny;h,s,th5I;!ath5Hie,nC;!l,sDy;ph;o,qu2;an,mD;!mC;d,ffIrFsD;sDus;!e;a6BemEmai6oDry;me,ni0Y;i7Ty;!e60rD;ey,y;cKd9kImHrFsEvi3yD;!d9s1;on,p3;ed,od,rDv56;e5Nod;al,es4Xis1;a,e,oDub;b,v;k,ob,quD;es;aWbQchiPgNkeMlija,nuLonut,rJsFtDv0;ai,suD;ki;aEha0i7DmaDsac;el,il;ac,iaD;h,s;a,vinDw2;!g;k,nngu5S;!r;nacDor;io;ka;ai,rahD;im;aPeJoIuDydA;be2KgGmber4WsD;eyEsD;a2e2;in,n;h,o;m3ra3Gsse2wa4B;aHctGitGnrErD;be2Dm0;iDy;!q11;or;th;bMlLmza,nKo,rFsEyD;a4Jd9;an,s0;lGo50rFuDv7;hi4Gki,tD;a,o;is1y;an,ey;k,s;!im;ib;aVeRiPlenOoLrHuD;ilEsD;!tavo;herme,lerD;mo;aFegDov3;!g,orD;io,y;dy,h5Wnt;nzaErD;an,d1;lo;!n;lbe5Ano,oD;rg3Hvan5A;ne,oFrD;aDry;ld,rd5H;ffr7rge;brEl9rDv2;la28r3Sth,y;e3EielD;!i5;aTePiNlLorr0NrD;anFedDitz;!dCeDri2B;ri2A;cFkD;!ie,lD;in,yn;esLisD;!co,z36;etch3oD;yd;d4lDnn,onn;ip;deriFliEng,rnD;an06;pe,x;co;bi0di,hd;ar04dZfrYit0lSmKnHo2rFsteb0th0uge6vDym9zra;an,eD;ns,re36;gi,i0DnDrol,v2w2;est4Pie;oEriqDzo;ue;ch;aJerIiEmD;aIe2Z;lErD;!h0;!iD;o,s;s1y;nu4;be0Cd1iGliFmEt1viDwood;n,s;er,o;ot1Ys;!as,j4NsD;ha;a2en;!dCgAmGoEuEwD;a2Din;arD;do;o0Wu0W;l,nD;est;a01eRiOoHrGuFwEylD;an,l0;ay6ight;a6dl7nc0st2;ag0ew;minGnEri0ugDvydBy2D;!lB;!a2MnDov0;e8ie,y;go,iDykB;cDk;!k;armuEeDll1on,rk;go;id;anKj0lbeJmetri5nHon,rGsFvEwDxt3;ay6ey;en,in;hawn,mo0B;ek,ri0I;is,nDv3;is,y;rt;!dD;re;an,lNmLnKrGvD;e,iD;! lucDd;as,ca;en,iFne8rDyl;eDin,yl;l3Bn;n,o,us;!e,i4ny;iDon;an,en,on;e,lB;as;a09e07hYiar0lNoIrGuEyrD;il,us;rtD;!is;aDistob0U;ig;dy,lGnErD;ey,neli5y;or,rD;ad;by,e,in,l2t1;aIeFiDyK;fDnt;fo0Ft1;meEt5velaD;nd;nt;rFuEyD;!t1;de;enD;ce;aIeGrisEuD;ck;!tD;i0oph3;st3;er;d,rDs;b4leD;s,y;cDdric,sA;il;lGmer1rD;ey,lEro8y;ll;!os,t1;eb,v2;a07eZiVlaUoRrEuDyr1;ddy,rtK;aLeGiFuEyD;an,ce,on;ce,no;an,ce;nEtD;!t;dEtD;!on;an,on;dEndD;en,on;!foDl7y;rd;bErDyd;is;!by;i6ke;bFlEshD;al;al,lC;ek;nHrDshoi;at,nEtD;!r1C;aDie;rd14;!edict,iEjam2nC;ie,y;to;kaMlazs,nHrD;n7rDt;eDy;tt;ey;dDeE;ar,iD;le;ar17b0Vd0Rf0Pgust2hm0Mi0Jja0Il04m00nSputsiRrIsaHuFveEyDziz;a0kh0;ry;gust5st2;us;hi;aKchJiIjun,maHnFon,tDy0;hDu09;ur;av,oD;ld;an,nd0H;!el,ki;ie;ta;aq;as,dIgel0CtD;hoGoD;i6nD;!i09y;ne;ny;er,reDy;!as,i,s,w;iFmaDos;nu4r;el;ne,r,t;an,bePd9eJfHi,lGonFphXt1vD;aNin;on;so,zo;an,en;onTrD;edU;c,jaGksandFssaGxD;!andD;er,ru;ar,er;ndD;ro;rtN;ni;d9mA;ar;en;ad,eD;d,t;in;onD;so;aEi,olfDri0vik;!o;mDn;!a;dHeGraEuD;!bakr,lfazl;hDm;am;!l;allIelFoulaye,ulD;!lDrF;ah,o;! rD;ahm0;an;ah;av,on",
  "Person": "true¦ashton kutchTbScNdLeJgastOhHinez,jFkEleDmCnettKoBp9r4s3t2v0;a0irgin maH;lentino rossi,n go3;aylor,heresa may,iger woods,yra banks;addam hussain,carlett johanssKlobodan milosevic,uC;ay romano,e3o1ush limbau0;gh;d stewart,nald0;inho,o;ese witherspoFilly;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0;on;dinal wols1son0;! palm2;ey;arack obama,rock;er",
  "Verb": "true¦awak9born,cannot,fr8g7h5k3le2m1s0wors9;e8h3;ake sure,sg;ngth6ss6;eep tabs,n0;own;as0e2;!t2;iv1onna;ight0;en",
  "PhrasalVerb": "true¦0:7E;1:72;2:7Q;3:7G;4:6V;5:7T;6:7I;7:71;8:6O;9:6P;A:5T;B:7L;C:7J;D:7D;E:7C;F:6Q;G:7S;H:46;a7Yb6Jc5Sd5Oe5Mf4Lg43h3Miron0j3Ik3Dl2Xm2Ln2Jo2Hp1ZquietFr1Ms0FtVuTvacuum 1wLyammerEzI;eroAip JonI;e0k0;by,up;aOeLhKiJorIrit5H;d 1k35;mp0n2Xpe0r8s8;eel Dip G;aJiIn2L;gh 0Crd0;n Dr 3S;it 60k8lk6rm 6Bsh 7Lt6Ov53;rgeEsI;e 9herA;aXeVhTiPoNrKuIype 68;ckArn I;d2in,o3Vup;aJiIot0y 2L;ckleFp G;ckFde 02;neFp Is4Q;d2o71up;ck KdJe Igh69me0p o0Kre0;aw3ba4d2in,up;e 60y 1;by,oC;ink Irow 6B;ba4ov7up;aIe 4Vll52;m 1r 01;ckEke Jlk I;ov7u53;aIba4d2in,o3Fup;ba4ft7p58w3;a0Nc0Me0Gh0Ci09l05m04n03o02pXquare WtOuMwI;earKiI;ngJtch I;aw3ba4o75; by;ck Iit 1m 1ss0;in,up;aNe10iMoKrIucH;aigh1ZiI;ke 6En3C;p Irm22;by,in,oC;nHr 1tc3V;cHmp0nd Ir6Xve6y 1;ba4d2up;d2oCup;arHeLiKlJrIurE;ingEuc8;a3Hit 47;l16n 1;e5Qll0;be4Prt0;ap 4Row D;ash 5Doke0;eep JiIow 9;c3Yp 1;in,oI;ff,v7;gn 4WngJt Iz8;d2o5up; al52le0;aKoIu4S;ot Iut0w 6B;aw3ba4f3IoC;cHdeAk56ve6;e Mll0nd LtI; Itl4G;d2in,o5upI;!on;aw3ba4d2in,o2Aup;o5to;al4Zout0rap4Z;il6v8;aTeQiPoLuI;b 4Sle0n Istl8;aIba4d2in5Ho3Tt3Bu3R;c29w3;ll Kot JuI;g2Vnd6;a29f32o5;arBin,o5;ng 51p6;aIel6inAnt0;c5Bd I;o33u0L;cHt0;aVeUiTlRoPrMsyc2JuI;ll Kt I;aIba4d2in,o1Rt3Fup;p3Kw3;ap3Jd2in,o5t3Dup;attleEess JiLoI;p 1;ah1Ron;iIp 5Fr3XurFwer 5F;nt0;ay4BuI;gAmp 9;ck Gg0leEn 9p48;el 4JncilA;c41ir 2Rn0ss KtJy I;ba4oC; d2c27;aw3ba4o1C;pIw3W;e3Vt D;arrowFerd0oI;d6teF;aQeNiMoKuI;ddl8lI;l 3I;cHp 1uth6ve I;al3Md2in,o5up;ss0x 1;asur8lJss I;a1Jup;t 9;ke Jn 9rIs1Sx0;k 9ry6;do,o47up;aVeTiOoIuck0;aMc3Gg LoIse0;k Ise3E;aft7ba4d2forw2Jin45ov7uI;nd7p;in,o0Q;d 9;e LghtKnJsIv1Y;ten G;e 1k 1; 1e36;arBd2;av1Mt 36velI; o3T;c8p 1sh ItchEugh6y20;in3To5;eJick6nock I;d2o3P;eIyA;l 2Pp I;aw3ba4d2fXin,o0Bto,up;aKoJuI;ic8mpA;ke30tF;c39zz 1;aUePiMoJuI;nkerFrry 1s0Z;lIneArse2W;d Ie 1;ba4d2fast,o05up;de Jt I;ba4on,up;aw3o5;aIlp0;d Kl 2Ar It 1;fIof;rom;in,oXu1H;cHm 1nJve Iz25;it,to;d Ig 2EkerK;d2in,o5;aWeQive Oloss 22oKrJunI; f0Q;in3Gow 2A; Iof 0Y;aJb1Dit,oIrBt0Su18;ff,n,v7;bo5ft7hOw3;aw3ba4d2in,oIup,w3;ff,n,ut;a1Dek0t I;aJb17d2oIrBup;ff,n,ut,v7;cJhIl1WrBt,w3;ead;ross;d aJnI;g 1;bo5;a0Ce05iWlSoOrKuI;cHel 1;k 1;eJighten IownEy 1;aw3oC;eIshe1N; 1z8;lKol I;aIwi1G;bo5rB;d 9low 1;aJeIip0;sh0;g 9ke0mIrI;e G;gPlNnLrJsIzzle0;h G;e Im 1;aw3ba4up;d0isI;h 1;e Il 19;aw3fN;ht ba4ure0;eNnJsI;s 1;cKd I;fIoC;or;e D;dWl 1;cMll Irm0t0W;ap05bKd2in,oJtI;hrough;ff,ut,v7;a4ehi20;e J;at0dge0nd Iy8;oCup;oKrI;ess 9op I;aw3bUin,o1D; 0Eubl8;aYhVlean 9oIross Dut 10;me LoJuntI; o1T;k 1l I;d2oC;aObNforLin,oKtJuI;nd7;ogeth7;ut,v7;th,wI;ard;a4y;pIrBw3;art;eIipA;ck DeI;r 1;lOncel0rLsKtch JveA; in;o1Cup;h Dt6;ry JvI;e 01;aw3o18;l ImF;aIba4d2o16up;rBw3;a0Ne0El07oYrNuI;bblKcklZil05lk 9ndlZrn 0Bst JtIy Gzz6;t D;in,o5up;e I;ov7;anReaPiIush6;ghMng I;aJba4d2forIin,o5up;th;bo5lIrBw3;ong;teI;n 1;k I;d2in,o5up;ch0;arPgFil 9n8oLssKttlJunce Ix D;aw3ba4;e 9; arB;k Dt 1;e 1;d2up; d2;d 1;aNeed0oIurt0;cKw I;aw3ba4d2o5up;ck;k I;in,oP;ck0nk0st6; oOaLef 1nd I;d2ov7up;er;up;r0t I;d2in,oIup;ff,ut;ff,nI;to;ck Oil0nKrgJsI;h D;ainEe D;g DkE; on;in,o5; o5;aw3d2o5up;ay;cRdNsk Kuction6; oC;ff;arBo5;ouI;nd;d I;d2oIup;ff,n;own;t G;o5up;ut",
  "Modal": "true¦c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to,a;ay,ight,ust;an,o0;uld",
  "Adjective": "true¦0:7P;1:84;2:83;3:8A;4:7W;5:5S;6:58;7:4O;8:4N;9:81;A:6I;a6Wb6Gc63d5Je54f4Hg49h3Wi39j37k36l2Vm2Ln2Bo1Wp1Dquack,r12s0Ft07uMvJwByear5;arp0eFholeEiDoB;man5oBu6P;d6Rzy;despr7Ls5S;!sa7;eClBste2A;co1Nl o4W;!k5;aCiBola4M;b89ce versa,ol5H;ca3gabo6Gnilla;ltUnHpCrb5Msu4tterB;!mo7G; Eb1SpDsBti1M;ca7etBide dKtairs;!ti2;er,i3U;f36to da1;aLbeco75convin29deIeHfair,ivers4knGprecedVrEsCwB;iel3Nritt6A;i1XuB;pervis0spec3Y;eBu5;cognHgul6Tl6T;own;ndi2v64xpect0;cid0rB;!grou5ZsB;iz0tood;b7pp0Dssu6UuthorB;iz0;i26ra;aGeEhDi6AoCrB;i1oubl0us3M;geth6p,rp6Vuc67;ough4Wril33;en60l32mpBrr2X;o6Ati2;boo,lBn;ent0;aWcVeThSiQmug,nobbi3LoOpNqueami3LtFuBymb6H;bDi gener5DpBrpri6D;erBre0N;! dup6b,i2C;du0seq52;anda77eGiFrBunni2y3F;aightCiB;ki2p0; fBfB;or5K;ll,r5S;aBreotyp0;dfa6Cmi2;a55ec2Gir1Hlend6Cot on; call0le,mb6phist1XrBu0Vvi48;d6Ary;gnifica3nB;ce51g7;am2Re6ocki2ut;cBda1em5lfi32ni1Wpa6Jre8;o1Er42;at5Gient28reec5G;cr0me;aJeEiCoB;bu60tt51uQy4;ghtBv4;!-2BfA;ar,bel,condi1du6Dfres5AlEpublic42sCtard0vB;ea26;is4CoB;lu1na3;aQe1Cuc4A;b5TciBllyi2;al,st;aOeLicayu8lac5Ropuli5QrCuB;bl5Jmp0n51;eGiDoB;!b07fu5RmiBp6;ne3si2;mCor,sBva1;ti8;a53e;ci5MmB;a0EiB;er,um;ac20rBti1;fe9ma2XpleBv38;xi2;rBst;allelDtB;-tiBi4;me;!ed;bLffJkIld fashion0nHpGrg1Eth6utFvB;al,erB;!all,niCt,wB;eiBrouB;ght;do0Ter,g2Qsi4B;en,posi1; boa5Og2Oli8;!ay; gua5MbBli8;eat;eDsB;cBer0Eole1;e8u3O;d2Xse;aJeIiHoBua4X;nFrCtB;ab7;thB;!eB;rn;chala3descri58stop;ght5;arby,cessa44ighbor5xt;k0usia1A;aIeGiDoBultip7;bi7derBl0Vnth5ot,st;a1n;nBx0;dblo0RiaBor;tu37;ande3Qdi4NnaBre;ci2;cBgenta,in,j01keshift,le,mmoth,ny,sculi8;ab33ho;aKeFiCoBu15;uti14vi2;mCteraB;l,te;it0;ftEgBth4;al,eCitiB;ma1;nda3K;!-0C;ngu3Zst,tt6;ap1Xind5no0A;agg0uB;niMstifi0veni7;de4gno4Klleg4mQnEpso 20rB;a1rB;eleBita0J;va3; KaJbr0corIdGfluenQiQnFsEtCviB;go0Fti2;a9en3SoxB;ic3B;a8i2Vul0D;a1er,oce3;iCoB;or;re9;deq3Qppr33;fBsitu,vitro;ro3;mFpB;arDerfe9oBrop6;li1rtB;a3ed;ti4;eBi0S;d2Vn3C;aIeFiDoBumdr3I;ne36ok0rrBs08ur5;if2Z;ghfalut1QspB;an2X;aClB;liYpfA;li2;lEnDrB;d04roB;wi2;dy;f,low0;ainfAener2Oiga24lHoGraDuB;ilBng ho;ty;cCtB;efAis;efA;ne,od;ea2Iob4;aTeNinMlKoFrB;a1VeDoz1MustB;raB;ti2;e2Gq10tfA;oDrB; keeps,eBm6tuna1;g03ign;liB;sh;aBue3;g31tte1P;al,i1;dFmCrB;ti7;a7ini8;ne;le; up;bl0i3l27r Cux,voB;ri1uri1;oBreac1E;ff;aLfficie3lKmHnFre9there4veExB;a9cess,pe1QtraCuB;be2Nl0E;!va1E;n,ryday; BcouraEti0O;rou1sui1;erCiB;ne3;gi2;abo23dMe17i1;g6sB;t,ygB;oi2;er;aReJiDoBrea14ue;mina3ne,ubB;le,tfA;dact1Bfficu1OsCvB;er1K;creDeas0gruntl0hone1FordCtB;a3ressM;er5;et; HadpGfFgene1PliDrang0spe1PtCvoB;ut;ail0ermin0;be1Mca1ghB;tfA;ia3;an;facto;i5magBngeroUs0G;ed,i2;ly;ertaMhief,ivil,oDrB;aBowd0u0G;mp0vZz0;loImGnCrrBve0P;e9u1I;cre1fu0LgrDsCtB;empo0Dra0E;ta3;ue3;mer08pleB;te,x;ni4ss4;in;aNeIizarHlFoCrB;and new,isk,okN;gCna fiUttom,urgeoB;is;us;ank,indB;!i2;re;autifAhiDloCnBst,yoD;eUt;v0w;nd;ul;ckCnkru0WrrB;en;!wards; priori,b0Mc0Jd09fra08g04h03lYmWntiquVppSrMsIttracti06utheHvEwB;aCkB;wa0T;ke,re;ant garCerB;age;de;ntU;leep,piDsuDtonB;isB;hi2;ri2;ab,bitEroDtiB;fiB;ci4;ga3;raB;ry;are3etiNrB;oprB;ia1;at0;aJuB;si2;arEcohCeBiIl,oof;rt;olB;ic;mi2;ead;ainDgressiConiB;zi2;ve;st;id; IeGuFvB;aCerB;se;nc0;ed;lt;pt,qB;ua1;hoc,infinitB;um;cuCtu4u1;al;ra1;erLlKoIruHsCuB;nda3;e3oCtra9;ct;lu1rbi2;ng;te;pt;aBve;rd;aze,e;ra3;nt",
  "Comparable": "true¦0:41;1:4I;2:45;3:4B;4:3X;5:2Y;a4Ob44c3Od3De35f2Rg2Fh24i1Vj1Uk1Rl1Jm1Dn17o15p0Vqu0Tr0KsTtMuIvFw7y6za13;ell27ou3;aBe9hi1Yi7r6;o3y;ck0Ode,l6n1ry,se;d,y;a6i4Mt;k,ry;n1Tr6sK;m,y;a7e6ulgar;nge4rda2xi3;g9in,st;g0n6pco3Mse4;like0t6;i1r6;ue;aAen9hi8i7ough,r6;anqu2Oen1ue;dy,g3Sme0ny,r09;ck,n,rs2P;d40se;ll,me,rt,s6wd45;te4;aVcarUeThRiQkin0FlMmKoHpGqua1FtAu7w6;eet,ift;b7dd13per0Gr6;e,re2H;sta2Ft5;aAe9iff,r7u6;pXr1;a6ict,o3;ig3Fn0U;a1ep,rn;le,rk;e22i3Fright0;ci28ft,l7o6re,ur;n,thi3;emn,id;a6el0ooth;ll,rt;e8i6ow,y;ck,g35m6;!y;ek,nd3D;ck,l0mp5;a6iTort,rill,y;dy,ll0Xrp;cu0Rve0Rxy;ce,ed,y;d,fe,int0l1Vv14;aBe9i8o6ude;mantic,o1Isy,u6;gh,nd;ch,pe,tzy;a6d,mo0H;dy,l;gg7ndom,p6re,w;id;ed;ai2i6;ck,et;aEhoDi1QlCoBr8u6;ny,r6;e,p5;egna2ic7o6;fouYud;ey,k0;li04or,te1B;ain,easa2;ny;in4le;dd,f6i0ld,ranQ;fi10;aAe8i7o6;b5isy,rm15sy;ce,mb5;a6w;r,t;ive,rr01;aAe8ild,o7u6;nda19te;ist,o1;a6ek,llX;n,s0ty;d,tuQ;aBeAi9o6ucky;f0Un7o1Du6ve0w17y0T;d,sy;e0g;g1Tke0tt5ve0;an,wd;me,r6te;ge;e7i6;nd;en;ol0ui1P;cy,ll,n6;sBt6;e6ima8;llege2r6;es7media6;te;ti3;ecu6ta2;re;aEeBiAo8u6;ge,m6ng1R;b5id;ll6me0t;ow;gh,l0;a6f04sita2;dy,v6;en0y;nd1Hppy,r6te4;d,sh;aGenFhDiClBoofy,r6;a9e8is0o6ue1E;o6ss;vy;at,en,y;nd,y;ad,ib,ooI;a2d1;a6o6;st0;t5uiY;u1y;aIeeb5iDlat,oAr8u6;ll,n6r14;!ny;aHe6iend0;e,sh;a7r6ul;get4mG;my;erce8n6rm;an6e;ciC;! ;le;ir,ke,n0Fr,st,t,ulA;aAerie,mp9sse7v6xtre0Q;il;nti6;al;ty;r7s6;tern,y;ly,th0;aFeCi9r7u6;ll,mb;u6y;nk;r7vi6;ne;e,ty;a6ep,nD;d6f,r;!ly;mp,pp03rk;aHhDlAo8r7u6;dd0r0te;isp,uel;ar6ld,mmon,ol,st0ward0zy;se;e6ou1;a6vW;n,r;ar8e6il0;ap,e6;sy;mi3;gey,lm8r6;e4i3;ful;!i3;aNiLlIoEr8u6;r0sy;ly;aAi7o6;ad,wn;ef,g7llia2;nt;ht;sh,ve;ld,r7un6;cy;ed,i3;ng;a7o6ue;nd,o1;ck,nd;g,tt6;er;d,ld,w1;dy;bsu9ng8we6;so6;me;ry;rd",
  "TextValue": "true¦bOeJfDhundredNmOninAone,qu8s6t0zeroN;enMh3rNw0;e0o;l0ntD;fHve;ir0ousandKree;d,t6;e0ix8;cond,pt1ven7xt1;adr0int0;illionD;e0th;!t0;e9ie8y;i3o0;rt1ur0;!t2;ie4y;ft0rst,ve;e3h,ie2y;ight0lev2;!e1h,ie0y;th;en0;!th;illion0;!s,th",
  "Ordinal": "true¦bGeDf9hundredHmGnin7qu6s4t0zeroH;enGh1rFwe0;lfFn9;ir0ousandE;d,t4;e0ixt9;cond,ptAvent8xtA;adr9int9;et0th;e6ie8;i2o0;r0urt3;tie5;ft1rst;ight0lev1;e0h,ie2;en1;illion0;th",
  "Cardinal": "true¦bHeEf8hundred,mHnineAone,qu6s4t0zero;en,h2rGw0;e0o;lve,n8;irt9ousandEree;e0ix5;pt1ven4xt1;adr0int0;illion;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illion0;!s",
  "Expression": "true¦a02b01dXeVfuck,gShLlImHnGoDpBshAtsk,u7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la",
  "Adverb": "true¦a08by 06d02eYfShQinPjustOkinda,mMnJoEpCquite,r9s5t2up1very,well,ye0;p,s; to,wards5;h1iny bit,o0wiO;o,t6ward;en,us;everal,o0uch;!me1rt0; of;hYtimes,w09;a1e0;alT;ndomSthN;ar excellDer0oint blank; Nhaps;f3n0;ce0ly;! 0;ag02moW; courIten;ewKo0; longEt 0;onIwithstanding;aybe,eanwhiAore0;!ovB;! aboU;deed,steV;en0;ce;or2u0;lArther0;!moJ; 0ev3;examp0good,suH;le;n1v0;er; mas0ough;se;e0irect1; 1finite0;ly;ju8trop;far,n0;ow; DbroCd nauseam,gBl6ny3part,s2t 0w4;be6l0mo6wor6;arge,ea5; soon,ide;mo1w0;ay;re;l 1mo0one,ready,so,ways;st;b1t0;hat;ut;ain;ad;lot,posteriori",
  "Determiner": "true¦aAboth,d8e5few,l3mu7neiCown,plenty,some,th2various,wh0;at0ich0;evB;at,e3is,ose;a,e0;!ast,s;a1i6l0very;!se;ch;e0u;!s;!n0;!o0y;th0;er"
};

var entity = ['Person', 'Place', 'Organization'];
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
    notA: ['Noun', 'Adjective', 'Adverb', 'Value']
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

var anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord'];
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
  NumberRange: {
    isA: ['Contraction']
  },
  Adverb: {
    notA: ['Noun', 'Verb', 'Adjective', 'Value']
  },
  // Dates:
  //not a noun, but usually is
  Date: {
    notA: ['Verb', 'Conjunction', 'Adverb', 'Preposition', 'Adjective']
  },
  Month: {
    isA: ['Date', 'Singular'],
    notA: ['Year', 'WeekDay', 'Time']
  },
  WeekDay: {
    isA: ['Date', 'Noun']
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
var colorMap = {
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

var addColors = function addColors(tags) {
  Object.keys(tags).forEach(function (k) {
    // assigned from plugin, for example
    if (tags[k].color) {
      tags[k].color = tags[k].color;
      return;
    } // defined above


    if (colorMap[k]) {
      tags[k].color = colorMap[k];
      return;
    }

    tags[k].isA.some(function (t) {
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

var unique$2 = function unique(arr) {
  return arr.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
}; //add 'downward' tags (that immediately depend on this one)


var inferIsA = function inferIsA(tags) {
  Object.keys(tags).forEach(function (k) {
    var tag = tags[k];
    var len = tag.isA.length;

    for (var i = 0; i < len; i++) {
      var down = tag.isA[i];

      if (tags[down]) {
        tag.isA = tag.isA.concat(tags[down].isA);
      }
    } // clean it up


    tag.isA = unique$2(tag.isA);
  });
  return tags;
};

var _isA = inferIsA;

var unique$3 = function unique(arr) {
  return arr.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
}; // crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time


var inferNotA = function inferNotA(tags) {
  var keys = Object.keys(tags);
  keys.forEach(function (k) {
    var tag = tags[k];
    tag.notA = tag.notA || [];
    tag.isA.forEach(function (down) {
      if (tags[down] && tags[down].notA) {
        // borrow its conflicts
        var notA = typeof tags[down].notA === 'string' ? [tags[down].isA] : tags[down].notA || [];
        tag.notA = tag.notA.concat(notA);
      }
    }); // any tag that lists us as a conflict, we conflict it back.

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (tags[key].notA.indexOf(k) !== -1) {
        tag.notA.push(key);
      }
    } // clean it up


    tag.notA = unique$3(tag.notA);
  });
  return tags;
};

var _notA = inferNotA;

// a lineage is all 'incoming' tags that have this as 'isA'
var inferLineage = function inferLineage(tags) {
  var keys = Object.keys(tags);
  keys.forEach(function (k) {
    var tag = tags[k];
    tag.lineage = []; // find all tags with it in their 'isA' set

    for (var i = 0; i < keys.length; i++) {
      if (tags[keys[i]].isA.indexOf(k) !== -1) {
        tag.lineage.push(keys[i]);
      }
    }
  });
  return tags;
};

var _lineage = inferLineage;

var validate = function validate(tags) {
  // cleanup format
  Object.keys(tags).forEach(function (k) {
    var tag = tags[k]; // ensure isA is an array

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


var inferTags = function inferTags(tags) {
  // validate data
  tags = validate(tags); // build its 'down tags'

  tags = _isA(tags); // infer the conflicts

  tags = _notA(tags); // debug tag color

  tags = _color(tags); // find incoming links

  tags = _lineage(tags);
  return tags;
};

var inference = inferTags;

var addIn = function addIn(obj, tags) {
  Object.keys(obj).forEach(function (k) {
    tags[k] = obj[k];
  });
};

var build = function build() {
  var tags = {};
  addIn(nouns, tags);
  addIn(verbs, tags);
  addIn(values, tags);
  addIn(misc, tags); // do the graph-stuff

  tags = inference(tags);
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

    if (typeof tag === 'string') {
      lex[word].push(tag);
    } else {
      lex[word] = lex[word].concat(tag);
    }
  } else {
    lex[word] = tag;
  }
}; // blast-out more forms for some given words


var addMore = function addMore(word, tag, world) {
  var lexicon = world.words;
  var transform = world.transforms; // cache multi-words

  var words = word.split(' ');

  if (words.length > 1) {
    //cache the beginning word
    world.hasCompound[words[0]] = true;
  } // inflect our nouns


  if (tag === 'Singular') {
    var plural = transform.toPlural(word, world);
    lexicon[plural] = lexicon[plural] || 'Plural'; // only if it's safe
  } //conjugate our verbs


  if (tag === 'Infinitive') {
    var conj = transform.conjugate(word, world);
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

    var _conj2 = transform.conjugate(words[0], world);

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
    var _plural = transform.toPlural(word, world);

    lexicon[_plural] = lexicon[_plural] || ['Demonym', 'Plural']; // only if it's safe
  }
}; // throw a bunch of words in our lexicon
// const doWord = function(words, tag, world) {
//   let lexicon = world.words
//   for (let i = 0; i < words.length; i++) {
//     addWord(words[i], tag, lexicon)
//     // do some fancier stuff
//     addMore(words[i], tag, world)
//   }
// }


var addWords = {
  addWord: addWord,
  addMore: addMore
};

// add words from plurals and conjugations data
var addIrregulars = function addIrregulars(world) {
  //add irregular plural nouns
  var nouns = world.irregulars.nouns;
  var words = Object.keys(nouns);

  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    world.words[w] = 'Singular';
    world.words[nouns[w]] = 'Plural';
  } // add irregular verb conjugations


  var verbs = world.irregulars.verbs;
  var keys = Object.keys(verbs);

  var _loop = function _loop(_i) {
    var inf = keys[_i]; //add only if it it's safe...

    world.words[inf] = world.words[inf] || 'Infinitive';
    var forms = world.transforms.conjugate(inf, world);
    forms = Object.assign(forms, verbs[inf]); //add the others

    Object.keys(forms).forEach(function (tag) {
      world.words[forms[tag]] = world.words[forms[tag]] || tag; // lexicon should prefer other tags, over participle

      if (world.words[forms[tag]] === 'Participle') {
        world.words[forms[tag]] = tag;
      }
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
  a: 'Actor'
}; // '_' in conjugations is the infinitive form
// (order matters, to the lexicon)

var conjugations = {
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
  "break": {
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

var conjugate = function conjugate() {
  var inf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var found = {}; // 1. look at irregulars
  //the lexicon doesn't pass this in

  if (world && world.irregulars) {
    if (world.irregulars.verbs.hasOwnProperty(inf) === true) {
      found = Object.assign({}, world.irregulars.verbs[inf]);
    }
  } //2. rule-based regex


  found = Object.assign({}, _01Suffixes(inf), found); //3. generic transformations
  //'buzzing'

  if (found.Gerund === undefined) {
    found.Gerund = _02Generic.Gerund(inf);
  } //'buzzed'


  if (found.PastTense === undefined) {
    found.PastTense = _02Generic.PastTense(inf);
  } //'buzzes'


  if (found.PresentTense === undefined) {
    found.PresentTense = _02Generic.PresentTense(inf);
  }

  return found;
};

var conjugate_1 = conjugate; // console.log(conjugate('bake'))

//turn 'quick' into 'quickest'
var do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
var dont_rules = [/ary$/];
var irregulars = {
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
var transforms = [{
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
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //known transforms


  for (var i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
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
var irregulars$1 = {
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
var transforms$1 = [{
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
  if (irregulars$1.hasOwnProperty(str)) {
    return irregulars$1[str];
  } //known-transforms


  for (var i = 0; i < transforms$1.length; i++) {
    if (transforms$1[i].reg.test(str) === true) {
      return str.replace(transforms$1[i].reg, transforms$1[i].repl);
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

var fns$1 = {
  toSuperlative: toSuperlative,
  toComparative: toComparative
};
/** conjugate an adjective into other forms */

var conjugate$1 = function conjugate(w) {
  var res = {}; // 'greatest'

  var sup = fns$1.toSuperlative(w);

  if (sup) {
    res.Superlative = sup;
  } // 'greater'


  var comp = fns$1.toComparative(w);

  if (comp) {
    res.Comparative = comp;
  }

  return res;
};

var adjectives = conjugate$1;

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
var _rules = suffixes$1;

var addE = /(x|ch|sh|s|z)$/;

var trySuffix = function trySuffix(str) {
  var c = str[str.length - 1];

  if (_rules.hasOwnProperty(c) === true) {
    for (var i = 0; i < _rules[c].length; i += 1) {
      var reg = _rules[c][i][0];

      if (reg.test(str) === true) {
        return str.replace(reg, _rules[c][i][1]);
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
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var irregulars = world.irregulars.nouns; // check irregulars list

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //we have some rules to try-out


  var plural = trySuffix(str);

  if (plural !== null) {
    return plural;
  } //like 'church'


  if (addE.test(str)) {
    return str + 'es';
  } // ¯\_(ツ)_/¯


  return str + 's';
};

var toPlural = pluralize;

//patterns for turning 'dwarves' to 'dwarf'
var _rules$1 = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], // [/(analy|diagno|parenthe|progno|synop|the)ses$/i, '$1sis'],
[/(eas)es$/i, '$1e'], //diseases
[/(..[aeiou]s)es$/i, '$1'], //geniouses
[/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']];

var invertObj = function invertObj(obj) {
  return Object.keys(obj).reduce(function (h, k) {
    h[obj[k]] = k;
    return h;
  }, {});
};

var toSingular = function toSingular(str, world) {
  var irregulars = world.irregulars.nouns;
  var invert = invertObj(irregulars); //(not very efficient)
  // check irregulars list

  if (invert.hasOwnProperty(str)) {
    return invert[str];
  } // go through our regexes


  for (var i = 0; i < _rules$1.length; i++) {
    if (_rules$1[i][0].test(str) === true) {
      str = str.replace(_rules$1[i][0], _rules$1[i][1]);
      return str;
    }
  }

  return str;
};

var toSingular_1 = toSingular;

//rules for turning a verb into infinitive form
var rules = {
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
var _transform = rules;

var guessVerb = {
  Gerund: ['ing'],
  Actor: ['erer'],
  Infinitive: ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'ent', 'eed', 'er', 'le', 'own', 'unk', 'ung', 'en'],
  PastTense: ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  PresentTense: ['rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns']
}; //flip it into a lookup object

guessVerb = Object.keys(guessVerb).reduce(function (h, k) {
  guessVerb[k].forEach(function (a) {
    return h[a] = k;
  });
  return h;
}, {});
var _guess = guessVerb;

/** it helps to know what we're conjugating from */

var guessTense = function guessTense(str) {
  var three = str.substr(str.length - 3);

  if (_guess.hasOwnProperty(three) === true) {
    return _guess[three];
  }

  var two = str.substr(str.length - 2);

  if (_guess.hasOwnProperty(two) === true) {
    return _guess[two];
  }

  var one = str.substr(str.length - 1);

  if (one === 's') {
    return 'PresentTense';
  }

  return null;
};

var toInfinitive = function toInfinitive(str, world, tense) {
  if (!str) {
    return '';
  } //1. look at known irregulars


  if (world.words.hasOwnProperty(str) === true) {
    var irregs = world.irregulars.verbs;
    var keys = Object.keys(irregs);

    for (var i = 0; i < keys.length; i++) {
      var forms = Object.keys(irregs[keys[i]]);

      for (var o = 0; o < forms.length; o++) {
        if (str === irregs[keys[i]][forms[o]]) {
          return keys[i];
        }
      }
    }
  } // give'r!


  tense = tense || guessTense(str);

  if (tense && _transform[tense]) {
    for (var _i = 0; _i < _transform[tense].length; _i++) {
      var rule = _transform[tense][_i];

      if (rule.reg.test(str) === true) {
        // console.log(rule.reg)
        return str.replace(rule.reg, rule.to);
      }
    }
  }

  return str;
};

var toInfinitive_1 = toInfinitive;

var irregulars$2 = {
  nouns: plurals,
  verbs: conjugations_1
}; //these behaviours are configurable & shared across some plugins

var transforms$2 = {
  conjugate: conjugate_1,
  adjectives: adjectives,
  toPlural: toPlural,
  toSingular: toSingular_1,
  toInfinitive: toInfinitive_1
};
var _isVerbose = false;
/** all configurable linguistic data */

var World = /*#__PURE__*/function () {
  function World() {
    _classCallCheck(this, World);

    // quiet these properties from a console.log
    Object.defineProperty(this, 'words', {
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
      value: irregulars$2,
      writable: true
    });
    Object.defineProperty(this, 'tags', {
      enumerable: false,
      value: Object.assign({}, tags),
      writable: true
    });
    Object.defineProperty(this, 'transforms', {
      enumerable: false,
      value: transforms$2,
      writable: true
    });
    Object.defineProperty(this, 'taggers', {
      enumerable: false,
      value: [],
      writable: true
    }); // add our misc word-list
    // this.addWords(misc)
    // add our compressed data to lexicon

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
      var lex = this.words;
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

        for (var w = 0; w < words.length; w++) {
          addWords.addWord(words[w], tags[i], this.words); // do some fancier stuff

          addWords.addMore(words[w], tags[i], this);
        }
      }
    }
    /** put new words into our lexicon, properly */

  }, {
    key: "addWords",
    value: function addWords$1(obj) {
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var word = keys[i].toLowerCase();
        addWords.addWord(word, obj[keys[i]], this.words); // do some fancier stuff

        addWords.addMore(word, obj[keys[i]], this);
      }
    }
  }, {
    key: "addIrregulars",
    value: function addIrregulars() {
      addIrregulars_1(this);

      return this;
    }
    /** extend the compromise tagset */

  }, {
    key: "addTags",
    value: function addTags(tags) {
      tags = Object.assign({}, tags);
      this.tags = Object.assign(this.tags, tags); // calculate graph implications for the new tags

      this.tags = inference(this.tags);
      return this;
    }
    /** call methods after tagger runs */

  }, {
    key: "postProcess",
    value: function postProcess(fn) {
      this.taggers.push(fn);
      return this;
    }
    /** helper method for logging + debugging */

  }, {
    key: "stats",
    value: function stats() {
      return {
        words: Object.keys(this.words).length,
        plurals: Object.keys(this.irregulars.nouns).length,
        conjugations: Object.keys(this.irregulars.verbs).length,
        compounds: Object.keys(this.hasCompound).length,
        postProcessors: this.taggers.length
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
  var w2 = new World(); // these are simple to copy:

  w2.words = Object.assign({}, this.words);
  w2.hasCompound = Object.assign({}, this.hasCompound); //these ones are nested:

  w2.irregulars = clone$1(this.irregulars);
  w2.tags = clone$1(this.tags); // these are functions

  w2.transforms = this.transforms;
  w2.taggers = this.taggers;
  return w2;
};

var World_1 = World;

/** return the root, first document */

var _01Utils$1 = createCommonjsModule(function (module, exports) {
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
    var arr = [];

    var addParent = function addParent(doc) {
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
    var list = this.list.map(function (ts) {
      return ts.clone(doShallow);
    });
    var tmp = this.buildFrom(list);
    return tmp;
  };
  /** how many seperate terms does the document have? */


  exports.wordCount = function () {
    return this.list.reduce(function (count, p) {
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

    var end = this.list.length;
    return this.slice(end - n, end);
  };
  /** grab a given subset of the results*/


  exports.slice = function (start, end) {
    var list = this.list.slice(start, end);
    return this.buildFrom(list);
  };
  /* grab nth result */


  exports.eq = function (n) {
    var p = this.list[n];

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
  /* grab named capture group terms as object */


  var getGroups = function getGroups(doc) {
    var res = {};
    var allGroups = {};

    var _loop = function _loop(i) {
      var phrase = doc.list[i];
      var groups = Object.keys(phrase.groups).map(function (k) {
        return phrase.groups[k];
      });

      for (var j = 0; j < groups.length; j++) {
        var _groups$j = groups[j],
            group = _groups$j.group,
            start = _groups$j.start,
            length = _groups$j.length;

        if (!allGroups[group]) {
          allGroups[group] = [];
        }

        allGroups[group].push(phrase.buildFrom(start, length));
      }
    };

    for (var i = 0; i < doc.list.length; i++) {
      _loop(i);
    }

    var keys = Object.keys(allGroups);

    for (var _i = 0; _i < keys.length; _i++) {
      var key = keys[_i];
      res[key] = doc.buildFrom(allGroups[key]);
    }

    return res;
  };

  var getOneName = function getOneName(doc, name) {
    var arr = [];

    var _loop2 = function _loop2(i) {
      var phrase = doc.list[i];
      var keys = Object.keys(phrase.groups);
      keys = keys.filter(function (id) {
        return phrase.groups[id].group === name;
      });
      keys.forEach(function (id) {
        arr.push(phrase.buildFrom(phrase.groups[id].start, phrase.groups[id].length));
      });
    };

    for (var i = 0; i < doc.list.length; i++) {
      _loop2(i);
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
    var arr = [];
    this.list.forEach(function (p) {
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
var cacheRequired = function cacheRequired(reg) {
  var needTags = [];
  var needWords = [];
  reg.forEach(function (obj) {
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
};

var failFast$1 = function failFast(doc, regs) {
  if (doc._cache && doc._cache.set === true) {
    var _cacheRequired = cacheRequired(regs),
        words = _cacheRequired.words,
        tags = _cacheRequired.tags; //check required words


    for (var i = 0; i < words.length; i++) {
      if (doc._cache.words[words[i]] === undefined) {
        return false;
      }
    } //check required tags


    for (var _i = 0; _i < tags.length; _i++) {
      if (doc._cache.tags[tags[_i]] === undefined) {
        return false;
      }
    }
  }

  return true;
};

var checkCache = failFast$1;

var _03Match = createCommonjsModule(function (module, exports) {
  /** return a new Doc, with this one as a parent */
  exports.match = function (reg, name) {
    //parse-up the input expression
    var regs = syntax_1(reg);

    if (regs.length === 0) {
      return this.buildFrom([]);
    } //check our cache, if it exists


    if (checkCache(this, regs) === false) {
      return this.buildFrom([]);
    } //try expression on each phrase


    var matches = this.list.reduce(function (arr, p) {
      return arr.concat(p.match(regs));
    }, []);

    if (name !== undefined && name !== null && name !== '') {
      return this.buildFrom(matches).groups(name);
    }

    return this.buildFrom(matches);
  };
  /** return all results except for this */


  exports.not = function (reg) {
    //parse-up the input expression
    var regs = syntax_1(reg); //if it's empty, return them all!

    if (regs.length === 0 || checkCache(this, regs) === false) {
      return this;
    } //try expression on each phrase


    var matches = this.list.reduce(function (arr, p) {
      return arr.concat(p.not(regs));
    }, []);
    return this.buildFrom(matches);
  };
  /** return only the first match */


  exports.matchOne = function (reg) {
    var regs = syntax_1(reg); //check our cache, if it exists

    if (checkCache(this, regs) === false) {
      return this.buildFrom([]);
    }

    for (var i = 0; i < this.list.length; i++) {
      var match = this.list[i].match(regs, true);
      return this.buildFrom(match);
    }

    return this.buildFrom([]);
  };
  /** return each current phrase, only if it contains this match */


  exports["if"] = function (reg) {
    var regs = syntax_1(reg); //consult our cache, if it exists

    if (checkCache(this, regs) === false) {
      return this.buildFrom([]);
    }

    var found = this.list.filter(function (p) {
      return p.has(regs) === true;
    });
    return this.buildFrom(found);
  };
  /** Filter-out any current phrases that have this match*/


  exports.ifNo = function (reg) {
    var regs = syntax_1(reg);
    var found = this.list.filter(function (p) {
      return p.has(regs) === false;
    });
    return this.buildFrom(found);
  };
  /**Return a boolean if this match exists */


  exports.has = function (reg) {
    var regs = syntax_1(reg); //consult our cache, if it exists

    if (checkCache(this, regs) === false) {
      return false;
    }

    return this.list.some(function (p) {
      return p.has(regs) === true;
    });
  };
  /** match any terms after our matches, within the sentence */


  exports.lookAhead = function (reg) {
    // find everything afterwards, by default
    if (!reg) {
      reg = '.*';
    }

    var regs = syntax_1(reg);
    var matches = [];
    this.list.forEach(function (p) {
      matches = matches.concat(p.lookAhead(regs));
    });
    matches = matches.filter(function (p) {
      return p;
    });
    return this.buildFrom(matches);
  };

  exports.lookAfter = exports.lookAhead;
  /** match any terms before our matches, within the sentence */

  exports.lookBehind = function (reg) {
    // find everything afterwards, by default
    if (!reg) {
      reg = '.*';
    }

    var regs = syntax_1(reg);
    var matches = [];
    this.list.forEach(function (p) {
      matches = matches.concat(p.lookBehind(regs));
    });
    matches = matches.filter(function (p) {
      return p;
    });
    return this.buildFrom(matches);
  };

  exports.lookBefore = exports.lookBehind;
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
  };
  /** return only results with this match afterwards */


  exports.hasAfter = function (reg) {
    return this.filter(function (doc) {
      return doc.lookAfter(reg).found;
    });
  };
  /** return only results with this match before it */


  exports.hasBefore = function (reg) {
    return this.filter(function (doc) {
      return doc.lookBefore(reg).found;
    });
  };
});

/** apply a tag, or tags to all terms */
var tagTerms = function tagTerms(tag, doc, safe, reason) {
  var tagList = [];

  if (typeof tag === 'string') {
    tagList = tag.split(' ');
  } // doc.parents()[0].reasons.push(reason)
  //do indepenent tags for each term:


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

var _setTag = tagTerms;

/** Give all terms the given tag */

var tag$1 = function tag(tags, why) {
  if (!tags) {
    return this;
  }

  _setTag(tags, this, false, why);
  return this;
};
/** Only apply tag to terms if it is consistent with current tags */


var tagSafe$1 = function tagSafe(tags, why) {
  if (!tags) {
    return this;
  }

  _setTag(tags, this, true, why);
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
/** return only the terms that can be this tag*/


var canBe$2 = function canBe(tag) {
  if (!tag) {
    return this;
  }

  var world = this.world;
  var matches = this.list.reduce(function (arr, p) {
    return arr.concat(p.canBe(tag, world));
  }, []);
  return this.buildFrom(matches);
};

var _04Tag = {
  tag: tag$1,
  tagSafe: tagSafe$1,
  unTag: unTag$1,
  canBe: canBe$2
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

    var res = fn(doc, i); // if its a doc, return one result

    if (res && res.list && res.list[0]) {
      return res.list[0];
    }

    return res;
  }); //remove nulls

  list = list.filter(function (x) {
    return x;
  }); // return an empty response

  if (list.length === 0) {
    return this.buildFrom(list);
  } // if it is not a list of Phrase objects, then don't try to make a Doc object


  if (_typeof(list[0]) !== 'object' || list[0].isA !== 'Phrase') {
    return list;
  }

  return this.buildFrom(list);
};
/** run a function on each phrase */


var forEach = function forEach(fn, detachParent) {
  var _this2 = this;

  if (!fn) {
    return this;
  }

  this.list.forEach(function (p, i) {
    var sub = _this2.buildFrom([p]); // if we're doing fancy insertions, we may want to skip updating the parent each time.


    if (detachParent === true) {
      sub.from = null; //
    }

    fn(sub, i);
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

  var phrase = this.list.find(function (p, i) {
    var doc = _this4.buildFrom([p]);

    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });

  if (phrase) {
    return this.buildFrom([phrase]);
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
/** sample a subset of the results */


var random = function random(n) {
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
var tokenize = function tokenize(str) {
  return str.split(/[ -]/g);
}; // take a list of strings
// look them up in the document


var buildTree = function buildTree(termList) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var root = {}; // parse our input

  termList.forEach(function (str, i) {
    var val = true;

    if (values[i] !== undefined) {
      val = values[i];
    } // some rough normalization


    str = (str || '').toLowerCase();
    str = str.replace(/[,;.!?]+$/, '');
    var arr = tokenize(str).map(function (s) {
      return s.trim();
    });
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

var fastLookup = function fastLookup(termList, values, doc) {
  var root = buildTree(termList, values);
  var found = []; // each phrase

  var _loop = function _loop(i) {
    var p = doc.list[i];
    var terms = p.terms();
    var words = terms.map(function (t) {
      return t.reduced;
    }); // each word

    var _loop2 = function _loop2(w) {
      if (root[words[w]] !== undefined) {
        // is it a multi-word match?
        if (root[words[w]].more !== undefined) {
          root[words[w]].more.forEach(function (more) {
            // is it too-long?
            if (words[w + more.rest.length] === undefined) {
              return;
            } // compare each subsequent term


            var everyTerm = more.rest.every(function (word, r) {
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
    };

    for (var w = 0; w < words.length; w++) {
      _loop2(w);
    }
  };

  for (var i = 0; i < doc.list.length; i++) {
    _loop(i);
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
  var isObject = function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  };
  /** lookup an array of words or phrases */


  exports.lookup = function (arr) {
    var _this = this;

    var values = []; //is it a {key:val} object?

    var isObj = isObject(arr);

    if (isObj === true) {
      arr = Object.keys(arr).map(function (k) {
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

    var found = _lookup(arr, values, this);
    var p = this.list[0]; // make object response

    if (isObj === true) {
      var byVal = {};
      found.forEach(function (o) {
        byVal[o.value] = byVal[o.value] || [];
        byVal[o.value].push(p.buildFrom(o.id, o.length));
      });
      Object.keys(byVal).forEach(function (k) {
        byVal[k] = _this.buildFrom(byVal[k]);
      });
      return byVal;
    } // otherwise, make array response:


    found = found.map(function (o) {
      return p.buildFrom(o.id, o.length);
    });
    return this.buildFrom(found);
  };

  exports.lookUp = exports.lookup;
});

/** freeze the current state of the document, for speed-purposes*/
var cache$1 = function cache(options) {
  var _this = this;

  options = options || {};
  var words = {};
  var tags = {};
  this._cache.words = words;
  this._cache.tags = tags;
  this._cache.set = true;
  this.list.forEach(function (p, i) {
    p.cache = p.cache || {}; //p.terms get cached automatically

    var terms = p.terms(); // cache all the terms

    terms.forEach(function (t) {
      if (words[t.reduced] && !words.hasOwnProperty(t.reduced)) {
        return; //skip prototype words
      }

      words[t.reduced] = words[t.reduced] || [];
      words[t.reduced].push(i);
      Object.keys(t.tags).forEach(function (tag) {
        tags[tag] = tags[tag] || [];
        tags[tag].push(i);
      }); // cache root-form on Term, too

      if (options.root) {
        t.setRoot(_this.world);
        words[t.root] = [i];
      }
    });
  });
  return this;
};
/** un-freezes the current state of the document, so it may be transformed */


var uncache = function uncache() {
  this._cache = {};
  this.list.forEach(function (p) {
    p.cache = {};
  }); // do parents too?

  this.parents().forEach(function (doc) {
    doc._cache = {};
    doc.list.forEach(function (p) {
      p.cache = {};
    });
  });
  return this;
};

var _07Cache = {
  cache: cache$1,
  uncache: uncache
};

var titleCase$3 = function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
/** substitute-in new content */


var replaceWith = function replaceWith(replace) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!replace) {
    return this["delete"]();
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

  this.list.forEach(function (p) {
    var input = replace; // accept a function for replace

    if (typeof replace === 'function') {
      input = replace(p);
    }

    var newPhrases; // accept a Doc object to replace

    if (input && _typeof(input) === 'object' && input.isA === 'Doc') {
      newPhrases = input.list;

      _this.pool().merge(input.pool());
    } else if (typeof input === 'string') {
      //input is a string
      if (options.keepCase !== false && p.terms(0).isTitleCase()) {
        input = titleCase$3(input);
      }

      newPhrases = _01Tokenizer(input, _this.world, _this.pool()); //tag the new phrases

      var tmpDoc = _this.buildFrom(newPhrases);

      tmpDoc.tagger();
      newPhrases = tmpDoc.list;
    } else {
      return; //don't even bother
    } // try to keep its old tags, if appropriate


    if (options.keepTags === true) {
      var oldTags = p.json({
        terms: {
          tags: true
        }
      }).terms;
      newPhrases[0].terms().forEach(function (t, i) {
        if (oldTags[i]) {
          t.tagSafe(oldTags[i].tags, 'keptTag', _this.world);
        }
      });
    }

    p.replace(newPhrases[0], _this); //Oneday: support multi-sentence replacements
  });
  return this;
};
/** search and replace match with new content */


var replace$1 = function replace(match, _replace, options) {
  // if there's no 2nd param, use replaceWith
  if (_replace === undefined) {
    return this.replaceWith(match, options);
  }

  this.match(match).replaceWith(_replace, options);
  return this;
};

var _01Replace = {
  replaceWith: replaceWith,
  replace: replace$1
};

var _02Insert = createCommonjsModule(function (module, exports) {
  var isObject = function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  }; // if it's empty, just create the phrase


  var makeNew = function makeNew(str, doc) {
    var phrase = _01Tokenizer(str, doc.world)[0]; //assume it's one sentence, for now

    var tmpDoc = doc.buildFrom([phrase]);
    tmpDoc.tagger();
    doc.list = tmpDoc.list;
    return doc;
  };
  /** add these new terms to the end*/


  exports.append = function () {
    var _this = this;

    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (!str) {
      return this;
    } // if it's empty, just create the phrase


    if (!this.found) {
      return makeNew(str, this);
    } // clear the cache


    this.uncache(); //add it to end of every phrase

    this.list.forEach(function (p) {
      //build it
      var phrase;

      if (isObject(str) && str.isA === 'Doc') {
        phrase = str.list[0].clone(); //use the first phrase
      } else if (typeof str === 'string') {
        phrase = _01Tokenizer(str, _this.world, _this.pool())[0]; //assume it's one sentence, for now
      } //tag it


      var tmpDoc = _this.buildFrom([phrase]);

      tmpDoc.tagger(); // push it onto the end

      p.append(phrase, _this);
    });
    return this;
  };

  exports.insertAfter = exports.append;
  exports.insertAt = exports.append;
  /** add these new terms to the front*/

  exports.prepend = function (str) {
    var _this2 = this;

    if (!str) {
      return this;
    } // if it's empty, just create the phrase


    if (!this.found) {
      return makeNew(str, this);
    } // clear the cache


    this.uncache(); //add it to start of every phrase

    this.list.forEach(function (p) {
      //build it
      var phrase;

      if (isObject(str) && str.isA === 'Doc') {
        phrase = str.list[0].clone(); //use the first phrase
      } else if (typeof str === 'string') {
        phrase = _01Tokenizer(str, _this2.world, _this2.pool())[0]; //assume it's one sentence, for now
      } //tag it


      var tmpDoc = _this2.buildFrom([phrase]);

      tmpDoc.tagger(); // add it to the start

      p.prepend(phrase, _this2);
    });
    return this;
  };

  exports.insertBefore = exports.prepend;
  /** add these new things to the end*/

  exports.concat = function () {
    // clear the cache
    this.uncache();
    var list = this.list.slice(0); //repeat for any number of params

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i]; //support a fresh string

      if (typeof arg === 'string') {
        var arr = _01Tokenizer(arg, this.world); //TODO: phrase.tagger()?

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


  exports["delete"] = function (match) {
    var _this3 = this;

    // clear the cache
    this.uncache();
    var toRemove = this;

    if (match) {
      toRemove = this.match(match);
    }

    toRemove.list.forEach(function (phrase) {
      return phrase["delete"](_this3);
    });
    return this;
  }; // aliases


  exports.remove = exports["delete"];
});

var shouldTrim = {
  clean: true,
  reduced: true,
  root: true
};
/** return the document as text */

var text$1 = function text(options) {
  var _this = this;

  options = options || {}; //are we showing every phrase?

  var showFull = false;

  if (this.parents().length === 0) {
    showFull = true;
  } // cache roots, if necessary


  if (options === 'root' || _typeof(options) === 'object' && options.root) {
    this.list.forEach(function (p) {
      p.terms().forEach(function (t) {
        if (t.root === null) {
          t.setRoot(_this.world);
        }
      });
    });
  }

  var txt = this.list.reduce(function (str, p, i) {
    var trimPre = !showFull && i === 0;
    var trimPost = !showFull && i === _this.list.length - 1;
    return str + p.text(options, trimPre, trimPost);
  }, ''); // clumsy final trim of leading/trailing whitespace

  if (shouldTrim[options] === true || options.reduced === true || options.clean === true || options.root === true) {
    txt = txt.trim();
  }

  return txt;
};

var _01Text = {
  text: text$1
};

// get all character startings in doc
var termOffsets = function termOffsets(doc) {
  var elapsed = 0;
  var index = 0;
  var offsets = {};
  doc.termList().forEach(function (term) {
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

var calcOffset = function calcOffset(doc, result, options) {
  // calculate offsets for each term
  var offsets = termOffsets(doc.all()); // add index values

  if (options.terms.index || options.index) {
    result.forEach(function (o) {
      o.terms.forEach(function (t) {
        t.index = offsets[t.id].index;
      });
      o.index = o.terms[0].index;
    });
  } // add offset values


  if (options.terms.offset || options.offset) {
    result.forEach(function (o) {
      o.terms.forEach(function (t) {
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
  var jsonDefaults = {
    text: true,
    terms: true,
    trim: true
  }; //some options have dependents

  var setOptions = function setOptions(options) {
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


  exports.json = function () {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    //support json(3) format
    if (typeof options === 'number' && this.list[options]) {
      return this.list[options].json(jsonDefaults);
    }

    options = setOptions(options); // cache root strings beforehand, if necessary

    if (options.root === true) {
      this.list.forEach(function (p) {
        p.terms().forEach(function (t) {
          if (t.root === null) {
            t.setRoot(_this.world);
          }
        });
      });
    }

    var result = this.list.map(function (p) {
      return p.json(options, _this.world);
    }); // add offset and index data for each term

    if (options.terms.offset || options.offset || options.terms.index || options.index) {
      _offset(this, result, options);
    } // add frequency #s


    if (options.frequency || options.freq || options.count) {
      var obj = {};
      this.list.forEach(function (p) {
        var str = p.text('reduced');
        obj[str] = obj[str] || 0;
        obj[str] += 1;
      });
      this.list.forEach(function (p, i) {
        result[i].count = obj[p.text('reduced')];
      });
    } // remove duplicates


    if (options.unique) {
      var already = {};
      result = result.filter(function (o) {
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
  var reset = '\x1b[0m';

  var padEnd = function padEnd(str, width) {
    str = str.toString();

    while (str.length < width) {
      str += ' ';
    }

    return str;
  };

  function isClientSide() {
    return typeof window !== 'undefined' && window.document;
  } // some nice colors for client-side debug


  var css = {
    green: '#7f9c6c',
    red: '#914045',
    blue: '#6699cc',
    magenta: '#6D5685',
    cyan: '#2D85A8',
    yellow: '#e6d7b3',
    black: '#303b50'
  };

  var logClientSide = function logClientSide(doc) {
    var tagset = doc.world.tags;
    doc.list.forEach(function (p) {
      console.log('\n%c"' + p.text() + '"', 'color: #e6d7b3;');
      var terms = p.terms();
      terms.forEach(function (t) {
        var tags = Object.keys(t.tags);
        var text = t.text || '-';

        if (t.implicit) {
          text = '[' + t.implicit + ']';
        }

        var word = "'" + text + "'";
        word = padEnd(word, 8);
        var found = tags.find(function (tag) {
          return tagset[tag] && tagset[tag].color;
        });
        var color = 'steelblue';

        if (tagset[found]) {
          color = tagset[found].color;
          color = css[color];
        }

        console.log("   ".concat(word, "  -  %c").concat(tags.join(', ')), "color: ".concat(color || 'steelblue', ";"));
      });
    });
  }; //cheaper than requiring chalk


  var cli = {
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

  var tagString = function tagString(tags, world) {
    tags = tags.map(function (tag) {
      if (!world.tags.hasOwnProperty(tag)) {
        return tag;
      }

      var c = world.tags[tag].color || 'blue';
      return cli[c](tag);
    });
    return tags.join(', ');
  }; //output some helpful stuff to the console


  var debug = function debug(doc) {
    if (isClientSide()) {
      logClientSide(doc);
      return doc;
    }

    console.log(cli.blue('====='));
    doc.list.forEach(function (p) {
      console.log(cli.blue('  -----'));
      var terms = p.terms();
      terms.forEach(function (t) {
        var tags = Object.keys(t.tags);
        var text = t.text || '-';

        if (t.implicit) {
          text = '[' + t.implicit + ']';
        }

        {
          text = cli.yellow(text);
        }

        var word = "'" + text + "'";
        word = padEnd(word, 18);
        var str = cli.blue('  ｜ ') + word + '  - ' + tagString(tags, doc.world);
        console.log(str);
      });
    });
    console.log('');
    return doc;
  };

  module.exports = debug;
});

var topk = function topk(doc) {
  var list = doc.json({
    text: false,
    terms: false,
    reduced: true
  }); // combine them

  var obj = {};
  list.forEach(function (o) {
    if (!obj[o.reduced]) {
      o.count = 0;
      obj[o.reduced] = o;
    }

    obj[o.reduced].count += 1;
  });
  var arr = Object.keys(obj).map(function (k) {
    return obj[k];
  }); // sort them

  arr.sort(function (a, b) {
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

var debug_1 = function debug_1() {
  _debug(this);
  return this;
};
/** some named output formats */


var out = function out(method) {
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
    }).map(function (obj) {
      return obj.text;
    }).filter(function (str) {
      return str;
    });
  }

  if (method === 'freq' || method === 'frequency') {
    return _topk(this);
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

  if (method === 'tags') {
    return this.list.map(function (p) {
      return p.terms().reduce(function (h, t) {
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
  }); // sort by freq

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
}; // order results 'chronologically', or document-order


var sortSequential = function sortSequential(doc) {
  var order = {};
  doc.json({
    terms: {
      offset: true
    }
  }).forEach(function (o) {
    order[o.terms[0].id] = o.terms[0].offset.start;
  });
  doc.list = doc.list.sort(function (a, b) {
    if (order[a.start] > order[b.start]) {
      return 1;
    } else if (order[a.start] < order[b.start]) {
      return -1;
    }

    return 0;
  });
  return doc;
}; //aliases


methods$2.alphabetical = methods$2.alpha;
methods$2.wordcount = methods$2.wordCount; // aliases for sequential ordering

var seqNames = {
  index: true,
  sequence: true,
  seq: true,
  sequential: true,
  chron: true,
  chronological: true
};
/** re-arrange the order of the matches (in place) */

var sort = function sort(input) {
  input = input || 'alpha'; //do this one up-front

  if (input === 'freq' || input === 'frequency' || input === 'topk') {
    return byFreq(this);
  }

  if (seqNames.hasOwnProperty(input)) {
    return sortSequential(this);
  }

  input = methods$2[input] || input; // apply sort method on each phrase

  if (typeof input === 'function') {
    this.list = this.list.sort(input);
    return this;
  }

  return this;
};
/** reverse the order of the matches, but not the words */


var reverse = function reverse() {
  var list = [].concat(this.list);
  list = list.reverse();
  return this.buildFrom(list);
};
/** remove any duplicate matches */


var unique$4 = function unique() {
  var list = [].concat(this.list);
  var obj = {};
  list = list.filter(function (p) {
    var str = p.text('reduced').trim();

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
  unique: unique$4
};

var isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
var quotes = /['‘’“”"′″‴]+/g;
var methods$3 = {
  // cleanup newlines and extra spaces
  whitespace: function whitespace(doc) {
    var termArr = doc.list.map(function (ts) {
      return ts.terms();
    });
    termArr.forEach(function (terms, o) {
      terms.forEach(function (t, i) {
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
  punctuation: function punctuation(termList) {
    termList.forEach(function (t) {
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
  unicode: function unicode(termList) {
    termList.forEach(function (t) {
      if (t.isImplicit() === true) {
        return;
      }

      t.text = unicode_1(t.text);
    });
  },
  quotations: function quotations(termList) {
    termList.forEach(function (t) {
      t.post = t.post.replace(quotes, '');
      t.pre = t.pre.replace(quotes, '');
    });
  },
  adverbs: function adverbs(doc) {
    doc.match('#Adverb').not('(not|nary|seldom|never|barely|almost|basically|so)').remove();
  },
  // remove the '.' from 'Mrs.' (safely)
  abbreviations: function abbreviations(doc) {
    doc.list.forEach(function (ts) {
      var terms = ts.terms();
      terms.forEach(function (t, i) {
        if (t.tags.Abbreviation === true && terms[i + 1]) {
          t.post = t.post.replace(/^\./, '');
        }
      });
    });
  }
};
var _methods = methods$3;

var defaults = {
  // light
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,
  // medium
  "case": false,
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
var mapping$1 = {
  light: {},
  medium: {
    "case": true,
    contractions: true,
    parentheses: true,
    quotations: true,
    adverbs: true
  }
};
mapping$1.heavy = Object.assign({}, mapping$1.medium, {
  possessives: true,
  verbs: true,
  nouns: true,
  honorifics: true
});
/** common ways to clean-up the document, and reduce noise */

var normalize = function normalize(options) {
  options = options || {}; // support named forms

  if (typeof options === 'string') {
    options = mapping$1[options] || {};
  } // set defaults


  options = Object.assign({}, defaults, options); // clear the cache

  this.uncache();
  var termList = this.termList(); // lowercase things

  if (options["case"]) {
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
      var parent = this.parent();
      return parent.splitOn(this);
    } //start looking for a match..


    var regs = syntax_1(reg);
    var matches = [];
    this.list.forEach(function (p) {
      var foundEm = p.match(regs); //no match here, add full sentence

      if (foundEm.length === 0) {
        matches.push(p);
        return;
      } // we found something here.


      var carry = p;
      foundEm.forEach(function (found) {
        var parts = carry.splitOn(found); // add em in

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
      var parent = this.parent();
      return parent.splitAfter(this);
    } // start looking for our matches


    var regs = syntax_1(reg);
    var matches = [];
    this.list.forEach(function (p) {
      var foundEm = p.match(regs); //no match here, add full sentence

      if (foundEm.length === 0) {
        matches.push(p);
        return;
      } // we found something here.


      var carry = p;
      foundEm.forEach(function (found) {
        var parts = carry.splitOn(found); // add em in

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
      var parent = this.parent();
      return parent.splitBefore(this);
    } //start looking for a match..


    var regs = syntax_1(reg);
    var matches = [];
    this.list.forEach(function (p) {
      var foundEm = p.match(regs); //no match here, add full sentence

      if (foundEm.length === 0) {
        matches.push(p);
        return;
      } // we found something here.


      var carry = p;
      foundEm.forEach(function (found) {
        var parts = carry.splitOn(found); // add before part in

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
    var doc = this;
    var keys = Object.keys(regs); // split em

    keys.forEach(function (k) {
      doc = doc.splitOn(k);
    }); //add labels for each section

    doc.list.forEach(function (p) {
      for (var i = 0; i < keys.length; i += 1) {
        if (p.has(keys[i])) {
          p.segment = regs[keys[i]];
          return;
        }
      }
    });
    return doc.list.map(function (p) {
      var res = p.json(options);
      res.segment = p.segment || null;
      return res;
    });
  };
});

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


var toLowerCase = function toLowerCase() {
  return eachTerm(this, 'toLowerCase');
};
/** turn every letter of every term to upper case */


var toUpperCase = function toUpperCase() {
  return eachTerm(this, 'toUpperCase');
};
/** upper-case the first letter of each term */


var toTitleCase = function toTitleCase() {
  return eachTerm(this, 'toTitleCase');
};
/** remove whitespace and title-case each term */


var toCamelCase = function toCamelCase() {
  this.list.forEach(function (p) {
    //remove whitespace
    var terms = p.terms();
    terms.forEach(function (t, i) {
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

    this.list.forEach(function (p) {
      var term = p.terms(0);

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
      return this.list.map(function (p) {
        var terms = p.terms();
        var term = terms[terms.length - 1];
        return term.post;
      });
    } // set post string on all ends


    this.list.forEach(function (p) {
      var terms = p.terms();
      var term = terms[terms.length - 1];

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
    this.list = this.list.map(function (p) {
      return p.trim();
    });
    return this;
  };
  /** connect words with hyphen, and remove whitespace */


  exports.hyphenate = function () {
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
    return this;
  };
  /** remove hyphens between words, and set whitespace */


  exports.dehyphenate = function () {
    var hasHyphen = /(-|–|—)/;
    this.list.forEach(function (p) {
      var terms = p.terms(); //remove whitespace

      terms.forEach(function (t) {
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
    start = start || "\"";
    end = end || "\"";
    this.list.forEach(function (p) {
      var terms = p.terms();
      terms[0].pre = start + terms[0].pre;
      var last = terms[terms.length - 1];
      last.post = end + last.post;
    });
    return this;
  };

  exports.toQuotation = exports.toQuotations;
  /** add brackets around these matches */

  exports.toParentheses = function (start, end) {
    start = start || "(";
    end = end || ")";
    this.list.forEach(function (p) {
      var terms = p.terms();
      terms[0].pre = start + terms[0].pre;
      var last = terms[terms.length - 1];
      last.post = end + last.post;
    });
    return this;
  };
});

/** make all phrases into one phrase */
var join = function join(str) {
  // clear the cache
  this.uncache(); // make one large phrase - 'main'

  var main = this.list[0];
  var before = main.length;
  var removed = {};

  for (var i = 1; i < this.list.length; i++) {
    var p = this.list[i];
    removed[p.start] = true;
    var term = main.lastTerm(); // add whitespace between them

    if (str) {
      term.post += str;
    } //  main -> p


    term.next = p.start; // main <- p

    p.terms(0).prev = term.id;
    main.length += p.length;
    main.cache = {};
  } // parents are bigger than than their children.
  // when we increase a child, we increase their parent too.


  var increase = main.length - before;
  this.parents().forEach(function (doc) {
    // increase length on each effected phrase
    doc.list.forEach(function (p) {
      var terms = p.terms();

      for (var _i = 0; _i < terms.length; _i++) {
        if (terms[_i].id === main.start) {
          p.length += increase;
          break;
        }
      }

      p.cache = {};
    }); // remove redundant phrases now

    doc.list = doc.list.filter(function (p) {
      return removed[p.start] !== true;
    });
  }); // return one major phrase

  return this.buildFrom([main]);
};

var _06Join = {
  join: join
};

var postPunct = /[,\)"';:\-–—\.…]/; // const irregulars = {
//   'will not': `won't`,
//   'i am': `i'm`,
// }

var setContraction = function setContraction(m, suffix) {
  if (!m.found) {
    return;
  }

  var terms = m.termList(); //avoid any problematic punctuation

  for (var i = 0; i < terms.length - 1; i++) {
    var t = terms[i];

    if (postPunct.test(t.post)) {
      return;
    }
  } // set them as implict


  terms.forEach(function (t) {
    t.implicit = t.clean;
  }); // perform the contraction

  terms[0].text += suffix; // clean-up the others

  terms.slice(1).forEach(function (t) {
    t.text = '';
  });

  for (var _i = 0; _i < terms.length - 1; _i++) {
    var _t = terms[_i];
    _t.post = _t.post.replace(/ /, '');
  }
};
/** turn 'i am' into i'm */


var contract = function contract() {
  var doc = this.not('@hasContraction'); // we are -> we're

  var m = doc.match('(we|they|you) are');
  setContraction(m, "'re"); // they will -> they'll

  m = doc.match('(he|she|they|it|we|you) will');
  setContraction(m, "'ll"); // she is -> she's

  m = doc.match('(he|she|they|it|we) is');
  setContraction(m, "'s"); // spencer is -> spencer's

  m = doc.match('#Person is');
  setContraction(m, "'s"); // spencer would -> spencer'd

  m = doc.match('#Person would');
  setContraction(m, "'d"); // would not -> wouldn't

  m = doc.match('(is|was|had|would|should|could|do|does|have|has|can) not');
  setContraction(m, "n't"); // i have -> i've

  m = doc.match('(i|we|they) have');
  setContraction(m, "'ve"); // would have -> would've

  m = doc.match('(would|should|could) have');
  setContraction(m, "'ve"); // i am -> i'm

  m = doc.match('i am');
  setContraction(m, "'m"); // going to -> gonna

  m = doc.match('going to');
  return this;
};

var _07Contract = {
  contract: contract
};

var methods$4 = Object.assign({}, _01Utils$1, _02Accessors, _03Match, _04Tag, _05Loops, _06Lookup, _07Cache, _01Replace, _02Insert, _01Text, _02Json, _03Out, _01Sort, _02Normalize, _03Split, _04Case, _05Whitespace, _06Join, _07Contract);

var methods$5 = {}; // allow helper methods like .adjectives() and .adverbs()

var arr = [['terms', '.'], ['hyphenated', '@hasHyphen .'], ['adjectives', '#Adjective'], ['hashTags', '#HashTag'], ['emails', '#Email'], ['emoji', '#Emoji'], ['emoticons', '#Emoticon'], ['atMentions', '#AtMention'], ['urls', '#Url'], ['adverbs', '#Adverb'], ['pronouns', '#Pronoun'], ['conjunctions', '#Conjunction'], ['prepositions', '#Preposition']];
arr.forEach(function (a) {
  methods$5[a[0]] = function (n) {
    var m = this.match(a[1]);

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
  var m = this.splitAfter('@hasComma');
  m = m.match('#PhoneNumber+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** Deprecated: please use compromise-numbers plugin */


methods$5.money = function (n) {
  var m = this.match('#Money #Currency?');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** return all cities, countries, addresses, and regions */


methods$5.places = function (n) {
  // don't split 'paris, france'
  var keep = this.match('(#City && @hasComma) (#Region|#Country)'); // but split the other commas

  var m = this.not(keep).splitAfter('@hasComma'); // combine them back together

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
  var m = this.clauses();
  m = m.match('#Organization+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
}; //combine them with .topics() method


methods$5.entities = function (n) {
  var r = this.clauses(); // Find people, places, and organizations

  var yup = r.people();
  yup = yup.concat(r.places());
  yup = yup.concat(r.organizations());
  var ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
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

var underOver = /^(under|over)-?/;
/** match a word-sequence, like 'super bowl' in the lexicon */

var tryMultiple = function tryMultiple(terms, t, world) {
  var lex = world.words; //try a two-word version

  var txt = terms[t].reduced + ' ' + terms[t + 1].reduced;

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


var checkLexicon = function checkLexicon(terms, world) {
  var lex = world.words;
  var hasCompound = world.hasCompound; // use reduced?
  //go through each term, and check the lexicon

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
      continue;
    } // look at reduced version of term, too


    if (str !== terms[t].reduced && lex.hasOwnProperty(terms[t].reduced) === true) {
      terms[t].tag(lex[terms[t].reduced], 'lexicon', world);
      continue;
    } // prefix strip: try to match 'take' for 'undertake'


    if (underOver.test(str) === true) {
      var noPrefix = str.replace(underOver, '');

      if (lex.hasOwnProperty(noPrefix) === true) {
        terms[t].tag(lex[noPrefix], 'noprefix-lexicon', world);
      }
    }
  }

  return terms;
};

var _01Lexicon = checkLexicon;

var apostrophes = /[\'‘’‛‵′`´]$/;
var perSec = /^(m|k|cm|km|m)\/(s|h|hr)$/; // '5 k/m'
//

var checkPunctuation = function checkPunctuation(terms, i, world) {
  var term = terms[i]; //check hyphenation
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
      var endChar = term.clean[term.clean.length - 2]; //flanders'

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

var _02Punctuation$1 = checkPunctuation;

//these are regexes applied to t.text, instead of t.clean
// order matters.
var startsWith = [//web tags
[/^[\w\.]+@[\w\.]+\.[a-z]{2,3}$/, 'Email'], //not fancy
[/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'], [/^@1?[0-9](am|pm)$/i, 'Time'], // @6pm
[/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, 'Time'], // @6:30
[/^@\w{2,}$/, 'AtMention'], //@spencermountain
[/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, 'Url'], //with http/www
[/^[\w./]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/, 'Url'], //http://mostpopularwebsites.net/top-level-domain
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
[/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/, 'Fraction'], //3/2ths
//range
[/^[0-9.]{1,2}[-–][0-9]{1,2}$/, ['Value', 'NumberRange']], //7-8
[/^[0-9.]{1,3}(st|nd|rd|th)?[-–][0-9\.]{1,3}(st|nd|rd|th)?$/, 'NumberRange'], //5-7
//with unit
[/^[0-9.]+([a-z]{1,4})$/, 'Value'] //like 5tbsp
//ordinal
// [/^[0-9][0-9,.]*(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], //like 5th
// [/^[0-9]+(st|nd|rd|th)$/, 'Ordinal'], //like 5th
];

var romanNumeral = /^[IVXLCDM]{2,}$/;
var romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/; //  https://stackoverflow.com/a/267405/168877
//try each of the ^regexes in our list

var checkRegex = function checkRegex(term, world) {
  var str = term.text; // do them all!

  for (var r = 0; r < startsWith.length; r += 1) {
    if (startsWith[r][0].test(str) === true) {
      term.tagSafe(startsWith[r][1], 'prefix #' + r, world);
      break;
    }
  } // do some more!
  //roman numberals - XVII


  if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
    term.tag('RomanNumeral', 'xvii', world);
  }
};

var _03Prefixes = checkRegex;

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

var endsWith$1 = {
  a: [[/.[aeiou]na$/, Noun], [/.[oau][wvl]ska$/, Last], //polish (female)
  [/.[^aeiou]ica$/, Sing], [/^([hyj]a)+$/, Exp] //hahah
  ],
  c: [[/.[^aeiou]ic$/, Adj]],
  d: [//==-ed==
  //double-consonant
  [/[aeiou](pp|ll|ss|ff|gg|tt|rr|bb|nn|mm)ed$/, Past], //popped, planned
  //double-vowel
  [/.[aeo]{2}[bdgmnprvz]ed$/, Past], //beeped, mooned, veered
  //-hed
  [/.[aeiou][sg]hed$/, Past], //stashed, sighed
  //-rd
  [/.[aeiou]red$/, Past], //stored
  [/.[aeiou]r?ried$/, Past], //buried
  //-led
  [/.[bcdgtr]led$/, Past], //startled, rumbled
  [/.[aoui]f?led$/, Past], //impaled, stifled
  //-sed
  [/.[iao]sed$/, Past], //franchised
  [/[aeiou]n?[cs]ed$/, Past], //laced, lanced
  //-med
  [/[aeiou][rl]?[mnf]ed$/, Past], //warmed, attained, engulfed
  //-ked
  [/[aeiou][ns]?c?ked$/, Past], //hooked, masked
  //-ged
  [/[aeiou][nl]?ged$/, Past], //engaged
  //-ted
  [/.[tdbwxz]ed$/, Past], //bribed, boxed
  [/[^aeiou][aeiou][tvx]ed$/, Past], //boxed
  //-ied
  [/.[cdlmnprstv]ied$/, Past], //rallied
  [/[^aeiou]ard$/, Sing], //card
  [/[aeiou][^aeiou]id$/, Adj], [/.[vrl]id$/, Adj]],
  e: [[/.[lnr]ize$/, Inf], [/.[^aeiou]ise$/, Inf], [/.[aeiou]te$/, Inf], [/.[^aeiou][ai]ble$/, Adj], [/.[^aeiou]eable$/, Adj], [/.[ts]ive$/, Adj]],
  h: [[/.[^aeiouf]ish$/, Adj], [/.v[iy]ch$/, Last], //east-europe
  [/^ug?h+$/, Exp], //uhh
  [/^uh[ -]?oh$/, Exp] //uhoh
  ],
  i: [[/.[oau][wvl]ski$/, Last] //polish (male)
  ],
  k: [[/^(k){2}$/, Exp] //kkkk
  ],
  l: [[/.[gl]ial$/, Adj], [/.[^aeiou]ful$/, Adj], [/.[nrtumcd]al$/, Adj], [/.[^aeiou][ei]al$/, Adj]],
  m: [[/.[^aeiou]ium$/, Sing], [/[^aeiou]ism$/, Sing], [/^h*u*m+$/, Exp], //mmmmmmm / ummmm / huuuuuummmmmm
  [/^\d+ ?[ap]m$/, 'Date']],
  n: [[/.[lsrnpb]ian$/, Adj], [/[^aeiou]ician$/, Actor], [/[aeiou][ktrp]in$/, 'Gerund'] // 'cookin', 'hootin'
  ],
  o: [[/^no+$/, Exp], //noooo
  [/^(yo)+$/, Exp], //yoyo
  [/^woo+[pt]?$/, Exp] //woo
  ],
  r: [[/.[bdfklmst]ler$/, 'Noun'], [/[aeiou][pns]er$/, Sing], [/[^i]fer$/, Inf], [/.[^aeiou][ao]pher$/, Actor], [/.[lk]er$/, 'Noun'], [/.ier$/, 'Comparative']],
  t: [[/.[di]est$/, 'Superlative'], [/.[icldtgrv]ent$/, Adj], [/[aeiou].*ist$/, Adj], [/^[a-z]et$/, Verb]],
  s: [[/.[^aeiou]ises$/, Pres], [/.[rln]ates$/, Pres], [/.[^z]ens$/, Verb], [/.[lstrn]us$/, Sing], [/.[aeiou]sks$/, Pres], //masks
  [/.[aeiou]kes$/, Pres], //bakes
  [/[aeiou][^aeiou]is$/, Sing], [/[a-z]\'s$/, Noun], [/^yes+$/, Exp] //yessss
  ],
  v: [[/.[^aeiou][ai][kln]ov$/, Last] //east-europe
  ],
  y: [[/.[cts]hy$/, Adj], [/.[st]ty$/, Adj], [/.[gk]y$/, Adj], [/.[tnl]ary$/, Adj], [/.[oe]ry$/, Sing], [/[rdntkbhs]ly$/, Adverb], [/...lly$/, Adverb], [/[bszmp]{2}y$/, Adj], [/.(gg|bb|zz)ly$/, Adj], [/.[ai]my$/, Adj], [/[ea]{2}zy$/, Adj], [/.[^aeiou]ity$/, Sing]]
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
var Modal = 'Modal';
var Place = 'Place'; // find any issues - https://observablehq.com/@spencermountain/suffix-word-lookup

var suffixMap = [null, //0
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
  oed: Past$1,
  ued: Past$1,
  xed: Past$1,
  ' so': Avb,
  "'ll": Modal,
  "'re": 'Copula',
  azy: Adj$1,
  eer: Noun$1,
  end: Vb,
  ped: Past$1,
  ffy: Adj$1,
  ify: Inf$1,
  ing: 'Gerund',
  //likely to be converted to Adj after lexicon pass
  ize: Inf$1,
  lar: Adj$1,
  mum: Adj$1,
  nes: Pres$1,
  nny: Adj$1,
  oid: Adj$1,
  ous: Adj$1,
  que: Adj$1,
  rol: Sing$1,
  sis: Sing$1,
  zes: Pres$1
}, {
  //4-letter
  amed: Past$1,
  aped: Past$1,
  ched: Past$1,
  lked: Past$1,
  nded: Past$1,
  cted: Past$1,
  dged: Past$1,
  akis: Last$1,
  //greek
  cede: Inf$1,
  chuk: Last$1,
  //east-europe
  czyk: Last$1,
  //polish (male)
  ects: Pres$1,
  ends: Vb,
  enko: Last$1,
  //east-europe
  ette: Sing$1,
  fies: Pres$1,
  fore: Avb,
  gate: Inf$1,
  gone: Adj$1,
  ices: Plrl,
  ints: Plrl,
  ines: Plrl,
  ions: Plrl,
  less: Avb,
  llen: Adj$1,
  made: Adj$1,
  nsen: Last$1,
  //norway
  oses: Pres$1,
  ould: Modal,
  some: Adj$1,
  sson: Last$1,
  //swedish male
  tage: Inf$1,
  teen: 'Value',
  tion: Sing$1,
  tive: Adj$1,
  tors: Noun$1,
  vice: Sing$1
}, {
  //5-letter
  tized: Past$1,
  urned: Past$1,
  eased: Past$1,
  ances: Plrl,
  bound: Adj$1,
  ettes: Plrl,
  fully: Avb,
  ishes: Pres$1,
  ities: Plrl,
  marek: Last$1,
  //polish (male)
  nssen: Last$1,
  //norway
  ology: Noun$1,
  ports: Plrl,
  rough: Adj$1,
  tches: Pres$1,
  tieth: 'Ordinal',
  tures: Plrl,
  wards: Avb,
  where: Avb
}, {
  //6-letter
  auskas: Last$1,
  //lithuania
  keeper: Actor$1,
  logist: Actor$1,
  teenth: 'Value'
}, {
  //7-letter
  opoulos: Last$1,
  //greek
  borough: Place,
  //Hillsborough
  sdottir: Last$1 //swedish female

}];

var endRegexs = function endRegexs(term, world) {
  var str = term.clean;
  var _char = str[str.length - 1];

  if (endsWith$1.hasOwnProperty(_char) === true) {
    var regs = endsWith$1[_char];

    for (var r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        term.tagSafe(regs[r][1], "endReg ".concat(_char, " #").concat(r), world);
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

    if (suffixMap[str.length].hasOwnProperty(str) === true) {
      var tag = suffixMap[str.length][str];
      term.tagSafe(tag, 'suffix -' + str, world);
      break;
    }
  }
}; //all-the-way-down!


var checkRegex$1 = function checkRegex(term, world) {
  knownSuffixes(term, world);
  endRegexs(term, world);
};

var _04Suffixes = checkRegex$1;

//just some of the most common emoticons
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

var emojiReg = /^(\u00a9|\u00ae|[\u2319-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/; //for us, there's three types -
// * ;) - emoticons
// * 🌵 - unicode emoji
// * :smiling_face: - asci-represented emoji
//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js

var isCommaEmoji = function isCommaEmoji(raw) {
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


var isEmoticon = function isEmoticon(str) {
  str = str.replace(/^[:;]/, ':'); //normalize the 'eyes'

  return emoticons.hasOwnProperty(str);
};

var tagEmoji = function tagEmoji(term, world) {
  var raw = term.pre + term.text + term.post;
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

var steps = {
  lexicon: _01Lexicon,
  punctuation: _02Punctuation$1,
  regex: _03Prefixes,
  suffix: _04Suffixes,
  emoji: _05Emoji
}; //'lookups' look at a term by itself

var lookups = function lookups(doc, terms) {
  var world = doc.world; //our list of known-words

  steps.lexicon(terms, world); //try these other methods

  for (var i = 0; i < terms.length; i += 1) {
    var term = terms[i]; //or maybe some helpful punctuation

    steps.punctuation(terms, i, world); //mostly prefix checks

    steps.regex(term, world); //maybe we can guess

    steps.suffix(term, world); //emoji and emoticons

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
  Pluperfect: 'Noun',
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

var titleCase$4 = /^[A-Z][a-z'\u00C0-\u00FF]/;
var hasNumber = /[0-9]/;
/** look for any grammar signals based on capital/lowercase */

var checkCase = function checkCase(doc) {
  var world = doc.world;
  doc.list.forEach(function (p) {
    var terms = p.terms();

    for (var i = 1; i < terms.length; i++) {
      var term = terms[i];

      if (titleCase$4.test(term.text) === true && hasNumber.test(term.text) === false && term.tags.Date === undefined) {
        term.tag('ProperNoun', 'titlecase-noun', world);
      }
    }
  });
};

var _02Case = checkCase;

var hasPrefix = /^(re|un)-?[a-z\u00C0-\u00FF]/;
var prefix = /^(re|un)-?/;
/** check 'rewatch' in lexicon as 'watch' */

var checkPrefix = function checkPrefix(terms, world) {
  var lex = world.words;
  terms.forEach(function (term) {
    // skip if we have a good tag already
    if (term.isKnown() === true) {
      return;
    } //does it start with 'un|re'


    if (hasPrefix.test(term.clean) === true) {
      // look for the root word in the lexicon:
      var stem = term.clean.replace(prefix, '');

      if (stem && stem.length > 3 && lex[stem] !== undefined && lex.hasOwnProperty(stem) === true) {
        term.tag(lex[stem], 'stem-' + stem, world);
      }
    }
  });
};

var _03Stem = checkPrefix;

//similar to plural/singularize rules, but not the same
var isPlural = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /is$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i]; //similar to plural/singularize rules, but not the same

var isSingular = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /s[aeiou]+ns$/i, // sans, siens
/(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
var isPlural_1 = {
  isSingular: isSingular,
  isPlural: isPlural
};

var noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'Holiday'];
var notPlural = [/ss$/, /sis$/, /[^aeiou][uo]s$/, /'s$/];
var notSingular = [/i$/, /ae$/];
/** turn nouns into singular/plural */

var checkPlural = function checkPlural(t, world) {
  if (t.tags.Noun && !t.tags.Acronym) {
    var str = t.clean; //skip existing tags, fast

    if (t.tags.Singular || t.tags.Plural) {
      return;
    } //too short


    if (str.length <= 3) {
      t.tag('Singular', 'short-singular', world);
      return;
    } //is it impossible to be plural?


    if (noPlurals.find(function (tag) {
      return t.tags[tag];
    })) {
      return;
    } // isPlural suffix rules


    if (isPlural_1.isPlural.find(function (reg) {
      return reg.test(str);
    })) {
      t.tag('Plural', 'plural-rules', world);
      return;
    } // isSingular suffix rules


    if (isPlural_1.isSingular.find(function (reg) {
      return reg.test(str);
    })) {
      t.tag('Singular', 'singular-rules', world);
      return;
    } // finally, fallback 'looks plural' rules..


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

//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
var orgWords = ['academy', 'administration', 'agence', 'agences', 'agencies', 'agency', 'airlines', 'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority', 'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery', 'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital', 'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir', 'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition', 'coffee', 'collective', 'college', 'commission', 'committee', 'communications', 'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference', 'conseil', 'consulting', 'containers', 'corporation', 'corps', 'corp', 'council', 'crew', 'daily news', 'data', 'departement', 'department', 'department store', 'departments', 'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise', 'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises', 'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial', 'fm', 'foundation', 'fund', 'gas', 'gazette', 'girls', 'government', 'group', 'guild', 'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc', 'industries', 'institut', 'institute', 'institute of technology', 'institutes', 'insurance', 'international', 'interstate', 'investment', 'investments', 'investors', 'journal', 'laboratory', 'labs', // 'law',
'liberation army', 'limited', 'local authority', 'local health authority', 'machines', 'magazine', 'management', 'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere', 'ministry', 'military', 'mobile', 'motor', 'motors', 'musee', 'museum', // 'network',
'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra', 'organization', 'partners', 'partnership', // 'party',
"people's party", 'petrol', 'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc', 'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio', 'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant', 'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club', 'societe', 'society', 'sons', 'standard', 'state police', 'state university', 'stock exchange', 'subcommittee', 'syndicat', 'systems', 'telecommunications', 'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university', 'utilities', 'workers'];
var organizations = orgWords.reduce(function (h, str) {
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


  if (t.tags.Organization || t.tags.Acronym || t.tags.Place || t.titleCase()) {
    return true;
  }

  return false;
};

var tagOrgs = function tagOrgs(terms, world) {
  for (var i = 0; i < terms.length; i += 1) {
    var t = terms[i];

    if (organizations[t.clean] !== undefined && organizations.hasOwnProperty(t.clean) === true) {
      // look-backward - eg. 'Toronto University'
      var lastTerm = terms[i - 1];

      if (lastTerm !== undefined && maybeOrg(lastTerm) === true) {
        lastTerm.tagSafe('Organization', 'org-word-1', world);
        t.tagSafe('Organization', 'org-word-2', world);
        continue;
      } //look-forward - eg. University of Toronto


      var nextTerm = terms[i + 1];

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

var oneLetterAcronym$1 = /^[A-Z]('s|,)?$/;
var periodSeperated = /([A-Z]\.){2}[A-Z]?/i;
var oneLetterWord = {
  I: true,
  A: true
};

var isAcronym$2 = function isAcronym(term, world) {
  var str = term.reduced; // a known acronym like fbi

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


var checkAcronym = function checkAcronym(terms, world) {
  terms.forEach(function (term) {
    //these are not acronyms
    if (term.tags.RomanNumeral === true) {
      return;
    } //period-ones F.D.B.


    if (periodSeperated.test(term.text) === true) {
      term.tag('Acronym', 'period-acronym', world);
    } //non-period ones are harder


    if (term.isUpperCase() && isAcronym$2(term, world)) {
      term.tag('Acronym', 'acronym-step', world);
      term.tag('Noun', 'acronym-infer', world);
    } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym$1.test(term.text)) {
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

var step = {
  neighbours: _01Neighbours,
  "case": _02Case,
  stem: _03Stem,
  plural: _04Plurals,
  organizations: _05Organizations,
  acronyms: _06Acronyms
}; //

var fallbacks = function fallbacks(doc, terms) {
  var world = doc.world; // if it's empty, consult it's neighbours, first

  step.neighbours(terms, world); // is there a case-sensitive clue?

  step["case"](doc); // check 'rewatch' as 'watch'

  step.stem(terms, world); // ... fallback to a noun!

  terms.forEach(function (t) {
    if (t.isKnown() === false) {
      t.tag('Noun', 'noun-fallback', doc.world);
    }
  }); // turn 'Foo University' into an Org

  step.organizations(terms, world); //turn 'FBD' into an acronym

  step.acronyms(terms, world); //are the nouns singular or plural?

  terms.forEach(function (t) {
    step.plural(t, doc.world);
  });
  return doc;
};

var _02Fallbacks = fallbacks;

var hasNegative = /n't$/;
var irregulars$3 = {
  "won't": ['will', 'not'],
  wont: ['will', 'not'],
  "can't": ['can', 'not'],
  cant: ['can', 'not'],
  cannot: ['can', 'not'],
  "shan't": ['should', 'not'],
  dont: ['do', 'not'],
  dun: ['do', 'not'] // "ain't" is ambiguous for is/was

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
};

var checkNegative = function checkNegative(term, phrase) {
  //check named-ones
  if (irregulars$3.hasOwnProperty(term.clean) === true) {
    return irregulars$3[term.clean];
  } //this word needs it's own logic:


  if (term.clean === "ain't" || term.clean === 'aint') {
    return doAint(term, phrase);
  } //try it normally


  if (hasNegative.test(term.clean) === true) {
    var main = term.clean.replace(hasNegative, '');
    return [main, 'not'];
  }

  return null;
};

var _01Negative = checkNegative;

var contraction = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z]{1,2})$/i; //these ones don't seem to be ambiguous

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

var irregulars$4 = {
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

var checkIrregulars = function checkIrregulars(term) {
  //check white-list
  if (irregulars$4.hasOwnProperty(term.clean)) {
    return irregulars$4[term.clean];
  }

  return null;
};

var _03Irregulars = checkIrregulars;

var hasApostropheS = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]s$/i;
var banList = {
  that: true,
  there: true
};
var hereThere = {
  here: true,
  there: true,
  everywhere: true
};

var isPossessive = function isPossessive(term, pool) {
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


  var nextTerm = pool.get(term.next);

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


  var twoTerm = pool.get(nextTerm.next);

  if (twoTerm && twoTerm.tags.Noun && !twoTerm.tags.Pronoun) {
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
var useDid = {
  how: true,
  what: true
};
/** split `i'd` into 'i had',  or 'i would'  */

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

var _05PerfectTense = checkPerfect;

var isRange = /^([0-9]{1,3}(?:st|nd|rd|th)?)[-–—]([0-9]{1,3}(?:st|nd|rd|th)?)$/i; //split '2-4' into '2 to 4'

var checkRange = function checkRange(term) {
  if (term.tags.PhoneNumber === true) {
    return null;
  }

  var parts = term.text.match(isRange);

  if (parts !== null) {
    return [parts[1], 'to', parts[2]];
  }

  return null;
};

var _06Ranges = checkRange;

var contraction$1 = /^(l|c|d|j|m|n|qu|s|t)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z\u00C0-\u00FF]+)$/i; // basic support for ungendered french contractions
// not perfect, but better than nothing, to support matching on french text.

var french = {
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

var checkFrench = function checkFrench(term) {
  var parts = term.text.match(contraction$1);

  if (parts === null || french.hasOwnProperty(parts[1]) === false) {
    return null;
  }

  var arr = [french[parts[1]], parts[2]];

  if (arr[0] && arr[1]) {
    return arr;
  }

  return null;
};

var _07French = checkFrench;

var isNumber = /^[0-9]+$/;
var isOrdinal = /^[0-9]+(st|nd|rd|th)$/;

var createPhrase = function createPhrase(found, doc) {
  //create phrase from ['would', 'not']
  var phrase = _01Tokenizer(found.join(' '), doc.world, doc.pool())[0]; //tag it

  var terms = phrase.terms();
  _01Lexicon(terms, doc.world); //make these terms implicit

  terms.forEach(function (t) {
    t.implicit = t.text;
    t.text = '';
    t.clean = ''; // remove whitespace for implicit terms

    t.pre = '';
    t.post = ''; // tag number-ranges

    if (isNumber.test(t.implicit)) {
      t.tag('Cardinal', 'num-range', doc.world);
    } else if (isOrdinal.test(t.implicit)) {
      t.tag('Ordinal', 'ord-range', doc.world);
    } else if (Object.keys(t.tags).length === 0) {
      t.tags.Noun = true; // if no tag, give it a noun
    }
  });
  return phrase;
};

var contractions = function contractions(doc) {
  var world = doc.world;
  doc.list.forEach(function (p) {
    var terms = p.terms();

    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      var found = _01Negative(term, p);
      found = found || _02Simple(term);
      found = found || _03Irregulars(term);
      found = found || _04Possessive(term, p, world);
      found = found || _05PerfectTense(term, p);
      found = found || _06Ranges(term);
      found = found || _07French(term); //add them in

      if (found !== null) {
        var newPhrase = createPhrase(found, doc); // keep tag NumberRange, if we had it

        if (p.has('#NumberRange') === true) {
          doc.buildFrom([newPhrase]).tag('NumberRange');
        } //set text as contraction


        var firstTerm = newPhrase.terms(0);
        firstTerm.text = term.text; //grab sub-phrase to remove

        var match = p.buildFrom(term.id, 1, doc.pool());
        match.replace(newPhrase, doc, true);
      }
    }
  });
  return doc;
};

var _03Contractions = contractions;

var hasWord = function hasWord(doc, word) {
  var arr = doc._cache.words[word] || [];
  arr = arr.map(function (i) {
    return doc.list[i];
  });
  return doc.buildFrom(arr);
};

var hasTag = function hasTag(doc, tag) {
  var arr = doc._cache.tags[tag] || [];
  arr = arr.map(function (i) {
    return doc.list[i];
  });
  return doc.buildFrom(arr);
}; //mostly pos-corections here


var miscCorrection = function miscCorrection(doc) {
  //exactly like
  var m = hasWord(doc, 'like');
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


  doc.match('^(well|so|okay)').tag('Expression', 'well-'); //been walking

  m = hasTag(doc, 'Gerund');
  m.match("(be|been) (#Adverb|not)+? #Gerund").not('#Verb$').tag('Auxiliary', 'be-walking'); // directive verb - 'use reverse'

  doc.match('(try|use|attempt|build|make) #Verb').ifNo('(@hasComma|#Negative|#PhrasalVerb|#Copula|will|be)').lastTerm().tag('#Noun', 'do-verb'); //possessives
  //'her match' vs 'let her match'

  m = hasTag(doc, 'Possessive');
  m = m.match('#Possessive [#Infinitive]', 0);

  if (!m.lookBehind('(let|made|make|force|ask)').found) {
    m.tag('Noun', 'her-match');
  }

  return doc;
};

var fixMisc = miscCorrection;

var unique$5 = function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }

  return Object.keys(obj);
};

var _unique = unique$5;

// order matters
var list = [// ==== Mutliple tags ====
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
var _01Misc = list;

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

var dates = "(".concat(_ambig.personDate.join('|'), ")");
var list$1 = [// ==== Holiday ====
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
  match: "(in|by|before|during|on|until|after|of|within|all) [sat]",
  group: 0,
  tag: 'WeekDay',
  reason: 'sat'
}, {
  match: "(in|by|before|during|on|until|after|of|within|all) [wed]",
  group: 0,
  tag: 'WeekDay',
  reason: 'wed'
}, {
  match: "(in|by|before|during|on|until|after|of|within|all) [march]",
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
  match: "#Preposition [(march|may)]",
  group: 0,
  tag: 'Month',
  reason: 'in-month'
}, //this march
{
  match: "this [(march|may)]",
  group: 0,
  tag: 'Month',
  reason: 'this-month'
}, {
  match: "next [(march|may)]",
  group: 0,
  tag: 'Month',
  reason: 'this-month'
}, {
  match: "last [(march|may)]",
  group: 0,
  tag: 'Month',
  reason: 'this-month'
}, // march 5th
{
  match: "[(march|may)] the? #Value",
  group: 0,
  tag: 'Month',
  reason: 'march-5th'
}, // 5th of march
{
  match: "#Value of? [(march|may)]",
  group: 0,
  tag: 'Month',
  reason: '5th-of-march'
}, // march and feb
{
  match: "[(march|may)] .? #Date",
  group: 0,
  tag: 'Month',
  reason: 'march-and-feb'
}, // feb to march
{
  match: "#Date .? [(march|may)]",
  group: 0,
  tag: 'Month',
  reason: 'feb-and-march'
}, //quickly march
{
  match: "#Adverb [(march|may)]",
  group: 0,
  tag: 'Verb',
  reason: 'quickly-march'
}, //march quickly
{
  match: "[(march|may)] #Adverb",
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
  match: "in [".concat(dates, "]"),
  group: 0,
  tag: 'Date',
  reason: 'in-june'
}, {
  match: "during [".concat(dates, "]"),
  group: 0,
  tag: 'Date',
  reason: 'in-june'
}, {
  match: "on [".concat(dates, "]"),
  group: 0,
  tag: 'Date',
  reason: 'in-june'
}, {
  match: "by [".concat(dates, "]"),
  group: 0,
  tag: 'Date',
  reason: 'by-june'
}, {
  match: "after [".concat(dates, "]"),
  group: 0,
  tag: 'Date',
  reason: 'after-june'
}, {
  match: "#Date [".concat(dates, "]"),
  group: 0,
  tag: 'Date',
  reason: 'in-june'
}, // june 1992
{
  match: "".concat(dates, " #Value"),
  tag: 'Date',
  reason: 'june-5th'
}, {
  match: "".concat(dates, " #Date"),
  tag: 'Date',
  reason: 'june-5th'
}, // June Smith
{
  match: "".concat(dates, " #ProperNoun"),
  tag: 'Person',
  reason: 'june-smith',
  safe: true
}, // june m. Cooper
{
  match: "".concat(dates, " #Acronym? (#ProperNoun && !#Month)"),
  tag: 'Person',
  reason: 'june-smith-jr'
}, // 'second'
{
  match: "#Cardinal [second]",
  tag: 'Unit',
  reason: 'one-second'
}, // second quarter
// { match: `#Ordinal quarter`, tag: 'Date', reason: 'second-quarter' },
// 'aug 20-21'
{
  match: "#Month #NumberRange",
  tag: 'Date',
  reason: 'aug 20-21'
}];
var _02Dates = list$1;

var adjectives$1 = "(".concat(_ambig.personAdjective.join('|'), ")");
var list$2 = [// all fell apart
{
  match: '[all] #Determiner? #Noun',
  group: 0,
  tag: 'Adjective',
  reason: 'all-noun'
}, // very rusty
{
  match: "#Adverb [".concat(adjectives$1, "]"),
  group: 0,
  tag: 'Adjective',
  reason: 'really-rich'
}, // rusty smith
{
  match: "".concat(adjectives$1, " #Person"),
  tag: 'Person',
  reason: 'randy-smith'
}, // rusty a. smith
{
  match: "".concat(adjectives$1, " #Acronym? #ProperNoun"),
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
}];
var _03Adjective = list$2;

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
}, //a great run
// { match: '(a|an) #Adjective [(#Infinitive|#PresentTense)]', tag: 'Noun', reason: 'a|an2' },
//a tv show
{
  match: '(a|an) #Noun [#Infinitive]',
  group: 0,
  tag: 'Noun',
  reason: 'a-noun-inf'
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
}, //
// { match: '[#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'inf-copula' },
//a close
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
  match: "(have|had) [#Adjective] #Preposition .",
  group: 0,
  tag: 'Noun',
  reason: 'have-fun'
}, // co-founder
{
  match: "co #Noun",
  tag: 'Actor',
  reason: 'co-noun'
}];

var adjectives$2 = "(".concat(_ambig.adverbAdjective.join('|'), ")");
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
  match: '#PresentTense [(hard|quick|long|bright|slow)]',
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
  match: "[".concat(adjectives$2, "] #Adjective"),
  group: 0,
  tag: 'Adverb',
  reason: 'dark-green'
}, // kinda sparkly
{
  match: "#Adverb [#Adverb]$",
  group: 0,
  tag: 'Adjective',
  reason: 'kinda-sparkly'
}, {
  match: "#Adverb [#Adverb] (and|or|then)",
  group: 0,
  tag: 'Adjective',
  reason: 'kinda-sparkly-and'
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
  match: "(hundred|thousand|million|billion|trillion|quadrillion)+ and #Value",
  tag: 'Value',
  reason: 'magnitude-and-value'
}, //'a/an' can mean 1 - "a hour"
{
  match: '!once [(a|an)] (#Duration|hundred|thousand|million|billion|trillion)',
  group: 0,
  tag: 'Value',
  reason: 'a-is-one'
}];

var verbs$1 = "(".concat(_ambig.personVerb.join('|'), ")");
var list$3 = [// adj -> gerund
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
  match: "[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)",
  group: 0,
  tag: 'Auxiliary',
  reason: 'copula-walking'
}, //support a splattering of auxillaries before a verb
{
  match: "[(has|had) (#Adverb|not)+?] #PastTense",
  group: 0,
  tag: 'Auxiliary',
  reason: 'had-walked'
}, //would walk
{
  match: "[#Adverb+? (#Modal|did)+ (#Adverb|not)+?] #Verb",
  group: 0,
  tag: 'Auxiliary',
  reason: 'modal-verb'
}, //would have had
{
  match: "[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb",
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
  match: "[(has|had) (#Adverb|not)+?] #PastTense",
  group: 0,
  tag: 'Auxiliary',
  reason: 'had-walked'
}, // will walk
{
  match: '[(do|does|will|have|had)] (not|#Adverb)? #Verb',
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
  match: "#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb",
  group: 0,
  tag: 'Auxiliary',
  reason: 'would-be'
}, //were being run
{
  match: "(were|was) being [#PresentTense]",
  group: 0,
  tag: 'PastTense',
  reason: 'was-being'
}, //have run
// { match: `have #PresentTense`, group: 0, tag: 'PastTense', reason: 'have-vb' },
//would have had
{
  match: "[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb",
  group: 0,
  tag: 'Auxiliary',
  reason: 'would-have'
}, //had been walking
{
  match: "(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb",
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
  match: '#Copula [#Adjective to] #Verb',
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
  match: "#Modal [".concat(verbs$1, "]"),
  group: 0,
  tag: 'Verb',
  reason: 'would-mark'
}, {
  match: "#Adverb [".concat(verbs$1, "]"),
  group: 0,
  tag: 'Verb',
  reason: 'really-mark'
}, //to mark
{
  match: '(to|#Modal) [mark]',
  group: 0,
  tag: 'PresentTense',
  reason: 'to-mark'
}, // wade smith
{
  match: "".concat(verbs$1, " #Person"),
  tag: 'Person',
  reason: 'rob-smith'
}, // wade m. Cooper
{
  match: "".concat(verbs$1, " #Acronym #ProperNoun"),
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
}];
var _07Verbs = list$3;

var list$4 = [// ==== Region ====
//West Norforlk
{
  match: '(west|north|south|east|western|northern|southern|eastern)+ #Place',
  tag: 'Region',
  reason: 'west-norfolk'
}, //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
{
  match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)]',
  group: 0,
  tag: 'Region',
  reason: 'us-state'
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
var _08Place = list$4;

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

var nouns$1 = "(".concat(_ambig.personNoun.join('|'), ")");
var months = "(".concat(_ambig.personMonth.join('|'), ")");
var places = "(".concat(_ambig.personPlace.join('|'), ")");
var list$5 = [// ==== Honorific ====
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
  match: "".concat(nouns$1, " #Person"),
  tag: 'Person',
  reason: 'ray-smith',
  safe: true
}, // faith m. Smith
{
  match: "".concat(nouns$1, " #Acronym? #ProperNoun"),
  tag: 'Person',
  reason: 'ray-a-smith',
  safe: true
}, //give to april
{
  match: "#Infinitive #Determiner? #Adjective? #Noun? (to|for) [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'ambig-person'
}, // remind june
{
  match: "#Infinitive [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'infinitive-person'
}, // may waits for
// { match: `[${months}] #PresentTense for`, group: 0, tag: 'Person', reason: 'ambig-active-for' },
// may waits to
// { match: `[${months}] #PresentTense to`, group: 0, tag: 'Person', reason: 'ambig-active-to' },
// april will
{
  match: "[".concat(months, "] #Modal"),
  group: 0,
  tag: 'Person',
  reason: 'ambig-modal'
}, // may be
{
  match: "[may] be",
  group: 0,
  tag: 'Verb',
  reason: 'may-be'
}, // would april
{
  match: "#Modal [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'modal-ambig'
}, // it is may
{
  match: "#Copula [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'is-may'
}, // may is
{
  match: "[".concat(months, "] #Copula"),
  group: 0,
  tag: 'Person',
  reason: 'may-is'
}, // with april
{
  match: "that [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'that-month'
}, // with april
{
  match: "with [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'with-month'
}, // for april
{
  match: "for [".concat(months, "]"),
  group: 0,
  tag: 'Person',
  reason: 'for-month'
}, // this april
{
  match: "this [".concat(months, "]"),
  group: 0,
  tag: 'Month',
  reason: 'this-may'
}, //maybe not 'this'
// next april
{
  match: "next [".concat(months, "]"),
  group: 0,
  tag: 'Month',
  reason: 'next-may'
}, // last april
{
  match: "last [".concat(months, "]"),
  group: 0,
  tag: 'Month',
  reason: 'last-may'
}, // wednesday april
{
  match: "#Date [".concat(months, "]"),
  group: 0,
  tag: 'Month',
  reason: 'date-may'
}, // may 5th
{
  match: "[".concat(months, "] the? #Value"),
  group: 0,
  tag: 'Month',
  reason: 'may-5th'
}, // 5th of may
{
  match: "#Value of [".concat(months, "]"),
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
  match: "[".concat(places, "] (#ProperNoun && !#Place)"),
  group: 0,
  tag: 'FirstName',
  reason: 'place-firstname'
}];
var _10People = list$5;

var matches = [];
matches = matches.concat(_01Misc);
matches = matches.concat(_02Dates);
matches = matches.concat(_03Adjective);
matches = matches.concat(_04Noun);
matches = matches.concat(_05Adverb);
matches = matches.concat(_06Value);
matches = matches.concat(_07Verbs);
matches = matches.concat(_08Place);
matches = matches.concat(_09Org);
matches = matches.concat(_10People); // cache the easier conditions up-front

var cacheRequired$1 = function cacheRequired(reg) {
  var needTags = [];
  var needWords = [];
  reg.forEach(function (obj) {
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
    tags: _unique(needTags),
    words: _unique(needWords)
  };
};

var allLists = function allLists(m) {
  var more = [];
  var lists = m.reg.filter(function (r) {
    return r.oneOf !== undefined;
  });

  if (lists.length === 1) {
    var i = m.reg.findIndex(function (r) {
      return r.oneOf !== undefined;
    });
    Object.keys(m.reg[i].oneOf).forEach(function (w) {
      var newM = Object.assign({}, m);
      newM.reg = newM.reg.slice(0);
      newM.reg[i] = Object.assign({}, newM.reg[i]);
      newM.reg[i].word = w;
      delete newM.reg[i].operator;
      delete newM.reg[i].oneOf; // newM.reason += '-' + w

      more.push(newM);
    });
  }

  return more;
}; // parse them


var all = [];
matches.forEach(function (m) {
  m.reg = syntax_1(m.match);
  var enumerated = allLists(m);

  if (enumerated.length > 0) {
    all = all.concat(enumerated);
  } else {
    all.push(m);
  }
});
all.forEach(function (m) {
  m.required = cacheRequired$1(m.reg);
  return m;
});
var matches_1 = all;

var hasEvery = function hasEvery(chances) {
  if (chances.length === 0) {
    return [];
  }

  var obj = {};
  chances.forEach(function (arr) {
    arr = _unique(arr);

    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = obj[arr[i]] || 0;
      obj[arr[i]] += 1;
    }
  });
  var res = Object.keys(obj);
  res = res.filter(function (k) {
    return obj[k] === chances.length;
  });
  res = res.map(function (num) {
    return Number(num);
  });
  return res;
};

var runner = function runner(doc) {
  //find phrases to try for each match
  matches_1.forEach(function (m) {
    var allChances = [];
    m.required.words.forEach(function (w) {
      allChances.push(doc._cache.words[w] || []);
    });
    m.required.tags.forEach(function (tag) {
      allChances.push(doc._cache.tags[tag] || []);
    });
    var worthIt = hasEvery(allChances);

    if (worthIt.length === 0) {
      return;
    }

    var phrases = worthIt.map(function (index) {
      return doc.list[index];
    });
    var tryDoc = doc.buildFrom(phrases); // phrases getting tagged

    var match = tryDoc.match(m.reg, m.group);

    if (match.found) {
      if (m.safe === true) {
        match.tagSafe(m.tag, m.reason);
      } else {
        match.tag(m.tag, m.reason);
      }
    }
  });
};

var runner_1 = runner; // console.log(hasEvery([[1, 2, 2, 3], [2, 3], []]))

// misc: 40ms
//sequence of match-tag statements to correct mis-tags

var corrections = function corrections(doc) {
  runner_1(doc);
  fixMisc(doc);
  return doc;
};

var _04Correction = corrections;

/** POS-tag all terms in this document */

var tagger = function tagger(doc) {
  var terms = doc.termList(); // check against any known-words

  doc = _01Init(doc, terms); // everything has gotta be something. ¯\_(:/)_/¯

  doc = _02Fallbacks(doc, terms); // support "didn't" & "spencer's"

  doc = _03Contractions(doc); //set our cache, to speed things up

  doc.cache(); // wiggle-around the results, so they make more sense

  doc = _04Correction(doc); // remove our cache, as it's invalidated now

  doc.uncache(); // run any user-given tagger functions

  doc.world.taggers.forEach(function (fn) {
    fn(doc);
  });
  return doc;
};

var _02Tagger = tagger;

var addMethod = function addMethod(Doc) {
  /**  */
  var Abbreviations = /*#__PURE__*/function (_Doc) {
    _inherits(Abbreviations, _Doc);

    var _super = _createSuper(Abbreviations);

    function Abbreviations() {
      _classCallCheck(this, Abbreviations);

      return _super.apply(this, arguments);
    }

    _createClass(Abbreviations, [{
      key: "stripPeriods",
      value: function stripPeriods() {
        this.termList().forEach(function (t) {
          if (t.tags.Abbreviation === true && t.next) {
            t.post = t.post.replace(/^\./, '');
          }

          var str = t.text.replace(/\./, '');
          t.set(str);
        });
        return this;
      }
    }, {
      key: "addPeriods",
      value: function addPeriods() {
        this.termList().forEach(function (t) {
          t.post = t.post.replace(/^\./, '');
          t.post = '.' + t.post;
        });
        return this;
      }
    }]);

    return Abbreviations;
  }(Doc);

  Abbreviations.prototype.unwrap = Abbreviations.prototype.stripPeriods;

  Doc.prototype.abbreviations = function (n) {
    var match = this.match('#Abbreviation');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Abbreviations(match.list, this, this.world);
  };

  return Doc;
};

var Abbreviations = addMethod;

var hasPeriod = /\./;

var addMethod$1 = function addMethod(Doc) {
  /**  */
  var Acronyms = /*#__PURE__*/function (_Doc) {
    _inherits(Acronyms, _Doc);

    var _super = _createSuper(Acronyms);

    function Acronyms() {
      _classCallCheck(this, Acronyms);

      return _super.apply(this, arguments);
    }

    _createClass(Acronyms, [{
      key: "stripPeriods",
      value: function stripPeriods() {
        this.termList().forEach(function (t) {
          var str = t.text.replace(/\./g, '');
          t.set(str);
        });
        return this;
      }
    }, {
      key: "addPeriods",
      value: function addPeriods() {
        this.termList().forEach(function (t) {
          var str = t.text.replace(/\./g, '');
          str = str.split('').join('.'); // don't add a end-period if there's a sentence-end one

          if (hasPeriod.test(t.post) === false) {
            str += '.';
          }

          t.set(str);
        });
        return this;
      }
    }]);

    return Acronyms;
  }(Doc);

  Acronyms.prototype.unwrap = Acronyms.prototype.stripPeriods;
  Acronyms.prototype.strip = Acronyms.prototype.stripPeriods;

  Doc.prototype.acronyms = function (n) {
    var match = this.match('#Acronym');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Acronyms(match.list, this, this.world);
  };

  return Doc;
};

var Acronyms = addMethod$1;

var addMethod$2 = function addMethod(Doc) {
  /** split into approximate sub-sentence phrases */
  Doc.prototype.clauses = function (n) {
    // an awkward way to disambiguate a comma use
    var commas = this["if"]('@hasComma').notIf('@hasComma @hasComma') //fun, cool...
    .notIf('@hasComma . .? (and|or) .') //cool, and fun
    .notIf('(#City && @hasComma) #Country') //'toronto, canada'
    .notIf('(#WeekDay && @hasComma) #Date') //'tuesday, march 2nd'
    .notIf('(#Date && @hasComma) #Year') //'july 6, 1992'
    .notIf('@hasComma (too|also)$') //at end of sentence
    .match('@hasComma');
    var found = this.splitAfter(commas);
    var quotes = found.quotations();
    found = found.splitOn(quotes);
    var parentheses = found.parentheses();
    found = found.splitOn(parentheses); // it is cool and it is ..

    var conjunctions = found["if"]('#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb').match('#Conjunction');
    found = found.splitBefore(conjunctions); // if it is this then that

    var condition = found["if"]('if .{2,9} then .').match('then');
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

    var tooLong = found.filter(function (d) {
      return d.wordCount() > 5 && d.match('#Verb+').length >= 2;
    });

    if (tooLong.found) {
      var m = tooLong.splitAfter('#Noun .* #Verb .* #Noun+');
      found = found.splitOn(m.eq(0));
    }

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Doc(found.list, this, this.world);
  };

  return Doc;
};

var Clauses = addMethod$2;

var addMethod$3 = function addMethod(Doc) {
  /**  */
  var Contractions = /*#__PURE__*/function (_Doc) {
    _inherits(Contractions, _Doc);

    var _super = _createSuper(Contractions);

    function Contractions(list, from, world) {
      var _this;

      _classCallCheck(this, Contractions);

      _this = _super.call(this, list, from, world);
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
    var found = this.match('@hasContraction+'); //(may want to split these up)
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

var Contractions = addMethod$3;

var addMethod$4 = function addMethod(Doc) {
  //pull it apart..
  var parse = function parse(doc) {
    var things = doc.splitAfter('@hasComma').splitOn('(and|or) not?').not('(and|or) not?');
    var beforeLast = doc.match('[.] (and|or)', 0);
    return {
      things: things,
      conjunction: doc.match('(and|or) not?'),
      beforeLast: beforeLast,
      hasOxford: beforeLast.has('@hasComma')
    };
  };
  /** cool, fun, and nice */


  var Lists = /*#__PURE__*/function (_Doc) {
    _inherits(Lists, _Doc);

    var _super = _createSuper(Lists);

    function Lists() {
      _classCallCheck(this, Lists);

      return _super.apply(this, arguments);
    }

    _createClass(Lists, [{
      key: "conjunctions",

      /** coordinating conjunction */
      value: function conjunctions() {
        return this.match('(and|or)');
      }
      /** split-up by list object */

    }, {
      key: "parts",
      value: function parts() {
        return this.splitAfter('@hasComma').splitOn('(and|or) not?');
      }
      /** remove the conjunction */

    }, {
      key: "items",
      value: function items() {
        return parse(this).things;
      }
      /** add a new unit to the list */

    }, {
      key: "add",
      value: function add(str) {
        this.forEach(function (p) {
          var beforeLast = parse(p).beforeLast;
          beforeLast.append(str); //add a comma to it

          beforeLast.termList(0).addPunctuation(',');
        });
        return this;
      }
      /** remove any matching unit from the list */

    }, {
      key: "remove",
      value: function remove(match) {
        return this.items()["if"](match).remove();
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
        var items = this.items();
        var needsComma = items.eq(items.length - 2);

        if (needsComma.found && needsComma.has('@hasComma') === false) {
          needsComma.post(', ');
        }

        return this;
      }
    }, {
      key: "removeOxfordComma",
      value: function removeOxfordComma() {
        var items = this.items();
        var needsComma = items.eq(items.length - 2);

        if (needsComma.found && needsComma.has('@hasComma') === true) {
          needsComma.post(' ');
        }

        return this;
      }
    }]);

    return Lists;
  }(Doc); // aliases


  Lists.prototype.things = Lists.prototype.items;

  Doc.prototype.lists = function (n) {
    var m = this["if"]('@hasComma+ .? (and|or) not? .'); // person-list

    var nounList = m.match('(#Noun|#Adjective|#Determiner|#Article)+ #Conjunction not? (#Article|#Determiner)? #Adjective? #Noun+')["if"]('#Noun');
    var adjList = m.match('(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+');
    var verbList = m.match('(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+');
    var result = nounList.concat(adjList);
    result = result.concat(verbList);
    result = result["if"]('@hasComma');

    if (typeof n === 'number') {
      result = m.get(n);
    }

    return new Lists(result.list, this, this.world);
  };

  return Doc;
};

var Lists = addMethod$4;

var noPlural = '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)'; //certain words can't be plural, like 'peace'

var hasPlural = function hasPlural(doc) {
  if (doc.has('#Plural') === true) {
    return true;
  } // these can't be plural


  if (doc.has(noPlural) === true) {
    return false;
  }

  return true;
};

var hasPlural_1 = hasPlural;

var irregulars$5 = {
  hour: 'an',
  heir: 'an',
  heirloom: 'an',
  honest: 'an',
  honour: 'an',
  honor: 'an',
  uber: 'an' //german u

}; //pronounced letters of acronyms that get a 'an'

var an_acronyms = {
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

var a_regexs = [/^onc?e/i, //'wu' sound of 'o'
/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
/^eul/i];

var makeArticle = function makeArticle(doc) {
  //no 'the john smith', but 'a london hotel'
  if (doc.has('#Person') || doc.has('#Place')) {
    return '';
  } //no a/an if it's plural


  if (doc.has('#Plural')) {
    return 'the';
  }

  var str = doc.text('normal').trim(); //explicit irregular forms

  if (irregulars$5.hasOwnProperty(str)) {
    return irregulars$5[str];
  } //spelled-out acronyms


  var firstLetter = str.substr(0, 1);

  if (doc.has('^@isAcronym') && an_acronyms.hasOwnProperty(firstLetter)) {
    return 'an';
  } //'a' regexes


  for (var i = 0; i < a_regexs.length; i++) {
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
var isPlural$1 = [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i]; //similar to plural/singularize rules, but not the same

var isSingular$1 = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
var _rules$2 = {
  isSingular: isSingular$1,
  isPlural: isPlural$1
};

var endS = /s$/; // double-check this term, if it is not plural, or singular.
// (this is a partial copy of ./tagger/fallbacks/plural)
// fallback plural if it ends in an 's'.

var isPlural$2 = function isPlural(str) {
  // isSingular suffix rules
  if (_rules$2.isSingular.find(function (reg) {
    return reg.test(str);
  })) {
    return false;
  } // does it end in an s?


  if (endS.test(str) === true) {
    return true;
  } // is it a plural like 'fungi'?


  if (_rules$2.isPlural.find(function (reg) {
    return reg.test(str);
  })) {
    return true;
  }

  return null;
};

var isPlural_1$1 = isPlural$2;

var exceptions = {
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

var toPossessive = function toPossessive(doc) {
  var str = doc.text('text').trim(); // exceptions

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
var parse$1 = function parse(doc) {
  var res = {
    main: doc
  }; //support 'mayor of chicago' as one noun-phrase

  if (doc.has('#Noun (of|by|for) .')) {
    var m = doc.splitAfter('[#Noun+]', 0);
    res.main = m.eq(0);
    res.post = m.eq(1);
  }

  return res;
};

var parse_1 = parse$1;

var methods$6 = {
  /** overload the original json with noun information */
  json: function json(options) {
    var n = null;

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
    var res = [];
    this.forEach(function (doc) {
      var json = doc.json(options)[0];
      json.article = getArticle(doc);
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },

  /** get all adjectives describing this noun*/
  adjectives: function adjectives() {
    var list = this.lookAhead('^(that|who|which)? (was|is|will)? be? #Adverb? #Adjective+');
    list = list.concat(this.lookBehind('#Adjective+ #Adverb?$'));
    list = list.match('#Adjective');
    return list.sort('index');
  },
  isPlural: function isPlural() {
    return this["if"]('#Plural'); //assume tagger has run?
  },
  hasPlural: function hasPlural() {
    return this.filter(function (d) {
      return hasPlural_1(d);
    });
  },
  toPlural: function toPlural(agree) {
    var _this = this;

    var toPlural = this.world.transforms.toPlural;
    this.forEach(function (doc) {
      if (doc.has('#Plural') || hasPlural_1(doc) === false) {
        return;
      } // double-check it isn't an un-tagged plural


      var main = parse_1(doc).main;
      var str = main.text('reduced');

      if (!main.has('#Singular') && isPlural_1$1(str) === true) {
        return;
      }

      str = toPlural(str, _this.world);
      main.replace(str).tag('#Plural'); // 'an apple' -> 'apples'

      if (agree) {
        var an = main.lookBefore('(an|a) #Adjective?$').not('#Adjective');

        if (an.found === true) {
          an.remove();
        }
      }
    });
    return this;
  },
  toSingular: function toSingular(agree) {
    var _this2 = this;

    var toSingular = this.world.transforms.toSingular;
    this.forEach(function (doc) {
      if (doc.has('^#Singular+$') || hasPlural_1(doc) === false) {
        return;
      } // double-check it isn't an un-tagged plural


      var main = parse_1(doc).main;
      var str = main.text('reduced');

      if (!main.has('#Plural') && isPlural_1$1(str) !== true) {
        return;
      }

      str = toSingular(str, _this2.world);
      main.replace(str).tag('#Singular'); // add an article

      if (agree) {
        // 'apples' -> 'an apple'
        var start = doc;
        var adj = doc.lookBefore('#Adjective');

        if (adj.found) {
          start = adj;
        }

        var article = getArticle(start);
        start.insertBefore(article);
      }
    });
    return this;
  },
  toPossessive: function toPossessive() {
    this.forEach(function (d) {
      toPossessive_1(d);
    });
    return this;
  }
};
var methods_1 = methods$6;

var addMethod$5 = function addMethod(Doc) {
  /**  */
  var Nouns = /*#__PURE__*/function (_Doc) {
    _inherits(Nouns, _Doc);

    var _super = _createSuper(Nouns);

    function Nouns() {
      _classCallCheck(this, Nouns);

      return _super.apply(this, arguments);
    }

    return Nouns;
  }(Doc); // add-in our methods


  Object.assign(Nouns.prototype, methods_1);

  Doc.prototype.nouns = function (n) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // don't split 'paris, france'
    var keep = this.match('(#City && @hasComma) (#Region|#Country)'); // but split the other commas

    var m = this.not(keep).splitAfter('@hasComma'); // combine them back together

    m = m.concat(keep); // don't combine over scare-quotes

    var quotes = m.quotations();

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

var open = /\(/;
var close = /\)/;

var addMethod$6 = function addMethod(Doc) {
  /** anything between (these things) */
  var Parentheses = /*#__PURE__*/function (_Doc) {
    _inherits(Parentheses, _Doc);

    var _super = _createSuper(Parentheses);

    function Parentheses() {
      _classCallCheck(this, Parentheses);

      return _super.apply(this, arguments);
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

var Parentheses = addMethod$6;

var addMethod$7 = function addMethod(Doc) {
  /**  */
  var Possessives = /*#__PURE__*/function (_Doc) {
    _inherits(Possessives, _Doc);

    var _super = _createSuper(Possessives);

    function Possessives(list, from, world) {
      var _this;

      _classCallCheck(this, Possessives);

      _this = _super.call(this, list, from, world);
      _this.contracted = null;
      return _this;
    }
    /** turn didn't into 'did not' */


    _createClass(Possessives, [{
      key: "strip",
      value: function strip() {
        this.list.forEach(function (p) {
          var terms = p.terms();
          terms.forEach(function (t) {
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
    var found = this.match('#Noun+? #Possessive'); //todo: split consecutive contractions

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Possessives(found.list, this, this.world);
  };

  return Doc;
};

var Possessives = addMethod$7;

var pairs = {
  "\"": "\"",
  // 'StraightDoubleQuotes'
  "\uFF02": "\uFF02",
  // 'StraightDoubleQuotesWide'
  "'": "'",
  // 'StraightSingleQuotes'
  "\u201C": "\u201D",
  // 'CommaDoubleQuotes'
  "\u2018": "\u2019",
  // 'CommaSingleQuotes'
  "\u201F": "\u201D",
  // 'CurlyDoubleQuotesReversed'
  "\u201B": "\u2019",
  // 'CurlySingleQuotesReversed'
  "\u201E": "\u201D",
  // 'LowCurlyDoubleQuotes'
  "\u2E42": "\u201D",
  // 'LowCurlyDoubleQuotesReversed'
  "\u201A": "\u2019",
  // 'LowCurlySingleQuotes'
  "\xAB": "\xBB",
  // 'AngleDoubleQuotes'
  "\u2039": "\u203A",
  // 'AngleSingleQuotes'
  // Prime 'non quotation'
  "\u2035": "\u2032",
  // 'PrimeSingleQuotes'
  "\u2036": "\u2033",
  // 'PrimeDoubleQuotes'
  "\u2037": "\u2034",
  // 'PrimeTripleQuotes'
  // Prime 'quotation' variation
  "\u301D": "\u301E",
  // 'PrimeDoubleQuotes'
  "`": "\xB4",
  // 'PrimeSingleQuotes'
  "\u301F": "\u301E" // 'LowPrimeDoubleQuotesReversed'

};
var hasOpen = RegExp('(' + Object.keys(pairs).join('|') + ')');

var addMethod$8 = function addMethod(Doc) {
  /** "these things" */
  var Quotations = /*#__PURE__*/function (_Doc) {
    _inherits(Quotations, _Doc);

    var _super = _createSuper(Quotations);

    function Quotations() {
      _classCallCheck(this, Quotations);

      return _super.apply(this, arguments);
    }

    _createClass(Quotations, [{
      key: "unwrap",

      /** remove the quote characters */
      value: function unwrap() {
        return this;
      }
    }]);

    return Quotations;
  }(Doc);

  Doc.prototype.quotations = function (n) {
    var list = [];
    this.list.forEach(function (p) {
      var terms = p.terms(); //look for opening quotes

      for (var i = 0; i < terms.length; i += 1) {
        var t = terms[i];

        if (hasOpen.test(t.pre)) {
          var _char = (t.pre.match(hasOpen) || [])[0];
          var want = pairs[_char]; // if (!want) {
          //   console.warn('missing quote char ' + char)
          // }
          //look for the closing bracket..

          for (var o = i; o < terms.length; o += 1) {
            if (terms[o].post.indexOf(want) !== -1) {
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

      return new Quotations(list, this, this.world);
    }

    return new Quotations(list, this, this.world);
  }; // alias


  Doc.prototype.quotes = Doc.prototype.quotations;
  return Doc;
};

var Quotations = addMethod$8;

// walked => walk  - turn a verb into it's root form
var toInfinitive$1 = function toInfinitive(parsed, world) {
  var verb = parsed.verb; // console.log(parsed)
  // verb.debug()
  //1. if it's already infinitive

  var str = verb.text('reduced');

  if (verb.has('#Infinitive')) {
    return str;
  } // 2. world transform does the heavy-lifting


  var tense = null;

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

var toInfinitive_1$1 = toInfinitive$1;

// spencer walks -> singular
// we walk -> plural
// the most-recent noun-phrase, before this verb.
var findNoun = function findNoun(vb) {
  var noun = vb.lookBehind('#Noun+').last();
  return noun;
}; //sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
// othertimes you need its subject 'we walk' vs 'i walk'


var isPlural$3 = function isPlural(parsed) {
  var vb = parsed.verb;

  if (vb.has('(are|were|does)') || parsed.auxiliary.has('(are|were|does)')) {
    return true;
  }

  if (vb.has('(is|am|do|was)') || parsed.auxiliary.has('(is|am|do|was)')) {
    return false;
  } //consider its prior noun


  var noun = findNoun(vb);

  if (noun.has('(we|they|you)')) {
    return true;
  }

  if (noun.has('#Plural')) {
    return true;
  }

  if (noun.has('#Singular')) {
    return false;
  }

  return null;
};

var isPlural_1$2 = isPlural$3;

// #Copula : is           -> 'is not'
// #PastTense : walked    -> did not walk
// #PresentTense : walks  -> does not walk
// #Gerund : walking:     -> not walking
// #Infinitive : walk     -> do not walk

var toNegative = function toNegative(parsed, world) {
  var vb = parsed.verb; // if it's already negative...

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
    var inf = toInfinitive_1$1(parsed, world);
    vb.replaceWith(inf, true);
    vb.prepend('did not');
    return;
  } // walks -> does not walk


  if (vb.has('#PresentTense')) {
    var _inf = toInfinitive_1$1(parsed, world);

    vb.replaceWith(_inf, true);

    if (isPlural_1$2(parsed)) {
      vb.prepend('do not');
    } else {
      vb.prepend('does not');
    }

    return;
  } //walking -> not walking


  if (vb.has('#Gerund')) {
    var _inf2 = toInfinitive_1$1(parsed, world);

    vb.replaceWith(_inf2, true);
    vb.prepend('not');
    return;
  } //fallback 1:  walk -> does not walk


  if (isPlural_1$2(parsed)) {
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
var getSubject = function getSubject(vb) {
  var behind = vb.lookBehind();
  var lastNoun = behind.nouns(null, {
    keep_anaphora: true
  }).last(); // support 'that' and 'this'

  if (!lastNoun.found) {
    lastNoun = behind.match('(that|this|each)').last();
    lastNoun = lastNoun.tag('#Noun').nouns();
  }

  return lastNoun;
};

var getSubject_1 = getSubject;

var parseVerb = function parseVerb(vb) {
  var parsed = {
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
  }; // fallback, if no verb found

  if (!parsed.verb.found) {
    // blank-everything
    Object.keys(parsed).forEach(function (k) {
      parsed[k] = parsed[k].not('.');
    }); // it's all the verb

    parsed.verb = vb;
    return parsed;
  } //


  if (parsed.adverb && parsed.adverb.found) {
    var match = parsed.adverb.text('reduced') + '$';

    if (vb.has(match)) {
      parsed.adverbAfter = true;
    }
  }

  return parsed;
};

var parse$2 = parseVerb;

/** too many special cases for is/was/will be*/

var toBe = function toBe(parsed) {
  var isI = false;
  var plural = isPlural_1$2(parsed);
  var isNegative = parsed.negative.found; //account for 'i is' -> 'i am' irregular
  // if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
  //   isI = true;
  // }
  // 'i look', not 'i looks'

  if (parsed.verb.lookBehind('(i|we) (#Adverb|#Verb)?$').found) {
    isI = true;
  }

  var obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been'
  }; //"i is" -> "i am"

  if (isI === true) {
    obj.PresentTense = 'am';
    obj.Infinitive = 'am';
  }

  if (plural) {
    obj.PastTense = 'were';
    obj.PresentTense = 'are';
    obj.Infinitive = 'are';
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
var doModal = function doModal(parsed) {
  var str = parsed.verb.text();
  var res = {
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

var conjugate$2 = function conjugate(parsed, world) {
  var verb = parsed.verb; //special handling of 'is', 'will be', etc.

  if (verb.has('#Copula') || verb.out('normal') === 'be' && parsed.auxiliary.has('will')) {
    return toBe_1(parsed);
  } // special handling of 'are walking'


  if (parsed.auxiliary.has('are') && verb.has('#Gerund')) {
    var og = parsed.original.clone();
    var past = og.clone().replace('are', 'were');
    var fut = og.clone().replace('are', 'will be');

    var _infinitive = toInfinitive_1$1(parsed, world);

    var res = {
      PastTense: past.text(),
      PresentTense: og.text(),
      FutureTense: fut.text(),
      Infinitive: _infinitive
    };
    return res;
  } // special handling of 'he could.'


  if (verb.has('#Modal')) {
    return doModal_1(parsed);
  } // dont conjugate imperative form - 'close the door'
  // if (parsed.auxiliary.has('do')) {
  //   let str = parsed.original.text()
  //   let res = {
  //     PastTense: str,
  //     PresentTense: str,
  //     FutureTense: str,
  //     Infinitive: str,
  //   }
  //   return res
  // }


  var hasHyphen = parsed.verb.termList(0).hasHyphen();
  var infinitive = toInfinitive_1$1(parsed, world);

  if (!infinitive) {
    return {};
  }

  var forms = world.transforms.conjugate(infinitive, world);
  forms.Infinitive = infinitive; // add particle to phrasal verbs ('fall over')

  if (parsed.particle.found) {
    var particle = parsed.particle.text();
    var space = hasHyphen === true ? '-' : ' ';
    Object.keys(forms).forEach(function (k) {
      return forms[k] += space + particle;
    });
  } //put the adverb at the end?
  // if (parsed.adverb.found) {
  // let adverb = parsed.adverb.text()
  // let space = hasHyphen === true ? '-' : ' '
  // if (parsed.adverbAfter === true) {
  //   Object.keys(forms).forEach(k => (forms[k] += space + adverb))
  // } else {
  //   Object.keys(forms).forEach(k => (forms[k] = adverb + space + forms[k]))
  // }
  // }
  //apply negative


  var isNegative = parsed.negative.found;

  if (isNegative) {
    forms.PastTense = 'did not ' + forms.Infinitive;
    forms.PresentTense = 'does not ' + forms.Infinitive;
    forms.Gerund = 'not ' + forms.Gerund;
  } //future Tense is pretty straightforward


  if (!forms.FutureTense) {
    if (isNegative) {
      forms.FutureTense = 'will not ' + forms.Infinitive;
    } else {
      forms.FutureTense = 'will ' + forms.Infinitive;
    }
  }

  if (isNegative) {
    forms.Infinitive = 'not ' + forms.Infinitive;
  }

  return forms;
};

var conjugate_1$1 = conjugate$2;

// verb-phrases that are orders - 'close the door'
// these should not be conjugated
var isImperative = function isImperative(parsed) {
  // do the dishes
  if (parsed.auxiliary.has('do')) {
    return true;
  } // speak the truth
  // if (parsed.verb.has('^#Infinitive')) {
  //   // 'i speak' is not imperative
  //   if (parsed.subject.has('(i|we|you|they)')) {
  //     return false
  //   }
  //   return true
  // }


  return false;
}; // // basically, don't conjugate it
// exports.toImperative = function (parsed) {
//   let str = parsed.original.text()
//   let res = {
//     PastTense: str,
//     PresentTense: str,
//     FutureTense: str,
//     Infinitive: str,
//   }
//   return res
// }


var imperative = {
  isImperative: isImperative
};

// if something is 'modal-ish' we are forced to use past-participle
// ('i could drove' is wrong)

var useParticiple = function useParticiple(parsed) {
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


var toParticiple = function toParticiple(parsed, world) {
  //is it already a participle?
  if (parsed.auxiliary.has('(have|had)') && parsed.verb.has('#Participle')) {
    return;
  } // try to swap the main verb to its participle form


  var obj = conjugate_1$1(parsed, world);
  var str = obj.Participle || obj.PastTense;

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
  useParticiple: useParticiple,
  toParticiple: toParticiple
};

var isImperative$1 = imperative.isImperative;
var _toParticiple = participle.toParticiple,
    useParticiple$1 = participle.useParticiple; // remove any tense-information in auxiliary verbs

var makeNeutral = function makeNeutral(parsed) {
  //remove tense-info from auxiliaries
  parsed.auxiliary.remove('(will|are|am|being)');
  parsed.auxiliary.remove('(did|does)');
  parsed.auxiliary.remove('(had|has|have)'); //our conjugation includes the 'not' and the phrasal-verb particle

  parsed.particle.remove();
  parsed.negative.remove();
  return parsed;
};

var methods$7 = {
  /** overload the original json with verb information */
  json: function json(options) {
    var _this = this;

    var n = null;

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
    var res = [];
    this.forEach(function (p) {
      var json = p.json(options)[0];
      var parsed = parse$2(p);
      json.parts = {};
      Object.keys(parsed).forEach(function (k) {
        if (parsed[k] && parsed[k].isA === 'Doc') {
          json.parts[k] = parsed[k].text('normal');
        } else {
          json.parts[k] = parsed[k];
        }
      });
      json.isNegative = p.has('#Negative');
      json.conjugations = conjugate_1$1(parsed, _this.world);
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },

  /** grab the adverbs describing these verbs */
  adverbs: function adverbs() {
    var list = []; // look at internal adverbs

    this.forEach(function (vb) {
      var advb = parse$2(vb).adverb;

      if (advb.found) {
        list = list.concat(advb.list);
      }
    }); // look for leading adverbs

    var m = this.lookBehind('#Adverb+$');

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
  isPlural: function isPlural() {
    var _this2 = this;

    var list = [];
    this.forEach(function (vb) {
      var parsed = parse$2(vb);

      if (isPlural_1$2(parsed, _this2.world) === true) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  },

  /** return verbs like 'spencer walks' and not 'we walk' */
  isSingular: function isSingular() {
    var _this3 = this;

    var list = [];
    this.forEach(function (vb) {
      var parsed = parse$2(vb);

      if (isPlural_1$2(parsed, _this3.world) === false) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  },
  /// Conjugation

  /** return all forms of this verb  */
  conjugate: function conjugate() {
    var _this4 = this;

    var result = [];
    this.forEach(function (vb) {
      var parsed = parse$2(vb);

      var forms = conjugate_1$1(parsed, _this4.world);

      result.push(forms);
    });
    return result;
  },

  /** walk ➔ walked*/
  toPastTense: function toPastTense() {
    var _this5 = this;

    this.forEach(function (vb) {
      var parsed = parse$2(vb); // should we support 'would swim' ➔ 'would have swam'

      if (useParticiple$1(parsed)) {
        _toParticiple(parsed, _this5.world);

        return;
      }

      if (isImperative$1(parsed)) {
        return;
      } // don't conjugate 'to be'


      if (vb.has('be') && vb.lookBehind('to$').found) {
        return;
      } // handle 'is raining' -> 'was raining'


      if (parsed.verb.has('#Gerund') && parsed.auxiliary.has('(is|will|was)')) {
        vb.replace('is', 'was');
        return;
      }

      var str = conjugate_1$1(parsed, _this5.world).PastTense;

      if (str) {
        parsed = makeNeutral(parsed);
        parsed.verb.replaceWith(str, false); // vb.tag('PastTense')
      }
    });
    return this;
  },

  /** walk ➔ walks */
  toPresentTense: function toPresentTense() {
    var _this6 = this;

    this.forEach(function (vb) {
      var parsed = parse$2(vb);

      var obj = conjugate_1$1(parsed, _this6.world);

      var str = obj.PresentTense; // 'i look', not 'i looks'

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
      }
    });
    return this;
  },

  /** walk ➔ will walk*/
  toFutureTense: function toFutureTense() {
    var _this7 = this;

    this.forEach(function (vb) {
      var parsed = parse$2(vb); // 'i should drive' is already future-enough

      if (useParticiple$1(parsed)) {
        return;
      }

      var str = conjugate_1$1(parsed, _this7.world).FutureTense;

      if (str) {
        parsed = makeNeutral(parsed); // avoid 'he would will go'

        parsed.auxiliary.remove('#Modal');
        parsed.verb.replaceWith(str, false);
        parsed.verb.tag('FutureTense');
      }
    });
    return this;
  },

  /** walks ➔ walk */
  toInfinitive: function toInfinitive() {
    var _this8 = this;

    this.forEach(function (vb) {
      var parsed = parse$2(vb);

      var str = conjugate_1$1(parsed, _this8.world).Infinitive;

      if (str) {
        vb.replaceWith(str, false);
        vb.tag('Infinitive');
      }
    });
    return this;
  },

  /** walk ➔ walking */
  toGerund: function toGerund() {
    var _this9 = this;

    this.forEach(function (vb) {
      var parsed = parse$2(vb);

      var str = conjugate_1$1(parsed, _this9.world).Gerund;

      if (str) {
        vb.replaceWith(str, false);
        vb.tag('Gerund');
      }
    });
    return this;
  },

  /** drive ➔ driven - naked past-participle if it exists, otherwise past-tense */
  toParticiple: function toParticiple() {
    var _this10 = this;

    this.forEach(function (vb) {
      var parsed = parse$2(vb);
      var noAux = !parsed.auxiliary.found;

      _toParticiple(parsed, _this10.world); // dirty trick to  ensure our new auxiliary is found


      if (noAux) {
        parsed.verb.prepend(parsed.auxiliary.text());
        parsed.auxiliary.remove();
      }
    });
    return this;
  },
  /// Negation

  /** return only verbs with 'not'*/
  isNegative: function isNegative() {
    return this["if"]('#Negative');
  },

  /**  return only verbs without 'not'*/
  isPositive: function isPositive() {
    return this.ifNo('#Negative');
  },

  /** add a 'not' to these verbs */
  toNegative: function toNegative() {
    var _this11 = this;

    this.list.forEach(function (p) {
      var doc = _this11.buildFrom([p]);

      var parsed = parse$2(doc);

      toNegative_1(parsed, doc.world);
    });
    return this;
  },

  /** remove 'not' from these verbs */
  toPositive: function toPositive() {
    var m = this.match('do not #Verb');

    if (m.found) {
      m.remove('do not');
    }

    return this.remove('#Negative');
  },

  /** who, or what is doing this action? */
  subject: function subject() {
    var list = [];
    this.forEach(function (p) {
      var found = getSubject_1(p);

      if (found.list[0]) {
        list.push(found.list[0]);
      }
    });
    return this.buildFrom(list);
  }
};

var addMethod$9 = function addMethod(Doc) {
  /**  */
  var Verbs = /*#__PURE__*/function (_Doc) {
    _inherits(Verbs, _Doc);

    var _super = _createSuper(Verbs);

    function Verbs() {
      _classCallCheck(this, Verbs);

      return _super.apply(this, arguments);
    }

    return Verbs;
  }(Doc); // add-in our methods


  Object.assign(Verbs.prototype, methods$7); // aliases

  Verbs.prototype.negate = Verbs.prototype.toNegative;

  Doc.prototype.verbs = function (n) {
    var match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+'); // try to ignore leading and trailing adverbs

    match = match.not('^#Adverb+');
    match = match.not('#Adverb+$'); // handle commas:
    // don't split 'really, really'

    var keep = match.match('(#Adverb && @hasComma) #Adverb'); // // but split the other commas

    var m = match.not(keep).splitAfter('@hasComma'); // i was shocked looking at...

    var gerund = m.match('#PastTense #Gerund');

    if (!gerund.has('(been|am|#Auxiliary) #Gerund')) {
      m = m.splitBefore(gerund.match('#Gerund'));
    } // combine them back together


    m = m.concat(keep);
    m.sort('index'); //handle slashes?
    //ensure there's actually a verb

    m = m["if"]('#Verb'); // the reason he will is ...

    if (m.has('(is|was)$')) {
      m = m.splitBefore('(is|was)$');
    } //ensure it's not two verbs


    if (m.has('#PresentTense #Adverb #PresentTense')) {
      m = m.splitBefore('#Adverb #PresentTense');
    } //grab (n)th result


    if (typeof n === 'number') {
      m = m.get(n);
    }

    var vb = new Verbs(m.list, this, this.world);
    return vb;
  };

  return Doc;
};

var Verbs = addMethod$9;

var addMethod$a = function addMethod(Doc) {
  /**  */
  var People = /*#__PURE__*/function (_Doc) {
    _inherits(People, _Doc);

    var _super = _createSuper(People);

    function People() {
      _classCallCheck(this, People);

      return _super.apply(this, arguments);
    }

    return People;
  }(Doc);

  Doc.prototype.people = function (n) {
    var match = this.splitAfter('@hasComma');
    match = match.match('#Person+'); //grab (n)th result

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new People(match.list, this, this.world);
  };

  return Doc;
};

var People = addMethod$a;

var subclass = [Abbreviations, Acronyms, Clauses, Contractions, Lists, Nouns, Parentheses, Possessives, Quotations, Verbs, People];

var extend = function extend(Doc) {
  // add basic methods
  Object.keys(_simple).forEach(function (k) {
    return Doc.prototype[k] = _simple[k];
  }); // add subclassed methods

  subclass.forEach(function (addFn) {
    return addFn(Doc);
  });
  return Doc;
};

var Subset = extend;

var methods$8 = {
  misc: methods$4,
  selections: _simple
};
/** a parsed text object */

var Doc = /*#__PURE__*/function () {
  function Doc(list, from, world) {
    var _this = this;

    _classCallCheck(this, Doc);

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
  }]);

  return Doc;
}();
/** create a new Document object */


Doc.prototype.buildFrom = function (list) {
  list = list.map(function (p) {
    return p.clone(true);
  }); // new this.constructor()

  var doc = new Doc(list, this, this.world);
  return doc;
};
/** create a new Document from plaintext. */


Doc.prototype.fromText = function (str) {
  var list = _01Tokenizer(str, this.world, this.pool());
  return this.buildFrom(list);
};

Object.assign(Doc.prototype, methods$8.misc);
Object.assign(Doc.prototype, methods$8.selections); //add sub-classes

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

var smallTagger = function smallTagger(doc) {
  var terms = doc.termList();
  _01Lexicon(terms, doc.world); // run any user-given tagger functions

  doc.world.taggers.forEach(function (fn) {
    fn(doc);
  });
  return doc;
};

var tiny = smallTagger;

function instance(worldInstance) {
  //blast-out our word-lists, just once
  var world = worldInstance;
  /** parse and tag text into a compromise object  */

  var nlp = function nlp() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var lexicon = arguments.length > 1 ? arguments[1] : undefined;

    if (lexicon) {
      world.addWords(lexicon);
    }

    var list = _01Tokenizer(text, world);
    var doc = new Doc_1(list, null, world);
    doc.tagger();
    return doc;
  };
  /** parse text into a compromise object, without running POS-tagging */


  nlp.tokenize = function () {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var lexicon = arguments.length > 1 ? arguments[1] : undefined;
    var w = world;

    if (lexicon) {
      w = w.clone();
      w.words = {};
      w.addWords(lexicon);
    }

    var list = _01Tokenizer(text, w);
    var doc = new Doc_1(list, null, w);

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
    var list = fromJSON_1(json, world);
    return new Doc_1(list, null, world);
  };
  /** make a deep-copy of the library state */


  nlp.clone = function () {
    return instance(world.clone());
  };
  /** log our decision-making for debugging */


  nlp.verbose = function () {
    var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    world.verbose(bool);
    return this;
  };
  /** grab currently-used World object */


  nlp.world = function () {
    return world;
  };
  /** pre-parse any match statements */


  nlp.parseMatch = function (str) {
    return syntax_1(str);
  };
  /** current version of the library */


  nlp.version = _version; // aliases

  nlp["import"] = nlp.load;
  nlp.plugin = nlp.extend;
  return nlp;
}

var src = instance(new World_1());

export default src;

/* compromise-sentences 0.1.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseSentences = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  var tags = {
    // Phrase: {},
    NounPhrase: {
      // isA: 'Phrase',
      notA: ['VerbPhrase', 'AdjectivePhrase'],
      color: 'blue'
    },
    VerbPhrase: {
      // isA: 'Phrase',
      notA: ['AdjectivePhrase', 'NounPhrase'],
      color: 'green'
    },
    AdjectivePhrase: {
      // isA: 'Phrase',
      notA: ['VerbPhrase', 'NounPhrase'],
      color: 'magenta'
    },
    Subordinate: {
      // isA: 'Phrase',
      notA: [] // color: '',

    }
  };

  var tagger = function tagger(doc) {
    doc.match('#Noun').tag('NounPhrase');
    doc.match('#Verb').tag('VerbPhrase'); // NounPhrase

    doc.match('(this|that|those|these)').tag('NounPhrase');
    doc.match('#Adjective+ #NounPhrase').tagSafe('NounPhrase');
    doc.match('#NounPhrase #Adjective+').tagSafe('NounPhrase'); // numbers

    doc.match('#Value #NounPhrase').tag('NounPhrase'); // (determiners)

    doc.match('#Determiner #NounPhrase').tag('NounPhrase');
    doc.match('#Determiner #Adverb+? #Adjective+ #NounPhrase').tag('NounPhrase');
    doc.match('(many|most|all|one|some|plenty) of #NounPhrase').tag('NounPhrase');
    doc.match('such a #NounPhrase').tag('NounPhrase'); // VerbPhrase

    doc.match('#VerbPhrase #Adverb+').tagSafe('VerbPhrase');
    doc.match('#Adverb+ #VerbPhrase').tagSafe('VerbPhrase');
    doc.match('#Auxiliary+ #VerbPhrase').tagSafe('VerbPhrase');
    doc.match('#VerbPhrase no').tagSafe('VerbPhrase');
    doc.match('not #VerbPhrase').tagSafe('VerbPhrase'); // claiming that

    doc.match('#VerbPhrase [that]', 0).unTag('NounPhrase'); // (conjunctions)

    doc.match('#VerbPhrase #Conjunction #VerbPhrase').tagSafe('VerbPhrase'); // nouns

    doc.match('(who|what|which)').tag('NounPhrase'); // Adjective

    doc.match('#Adverb+ #Adjective').tagSafe('AdjectivePhrase');
    doc.match('#Adjective').tagSafe('AdjectivePhrase'); // missing

    doc.match('#Value').tagSafe('NounPhrase');
    doc.match('#Date').tagSafe('NounPhrase');
    doc.match('#Date at #Date').tagSafe('NounPhrase');
  };

  var tagger_1 = tagger;

  /** add a word to the start of this sentence */
  var prepend = function prepend(str) {
    this.forEach(function (doc) {
      // repair the titlecase
      var firstTerms = doc.match('^.');
      firstTerms.not('#ProperNoun').toLowerCase(); // actually add the word

      firstTerms._prepend(str); // add a titlecase


      firstTerms.terms(0).toTitleCase();
    });
    return this;
  };
  /** add a word to the end of this sentence */


  var append_1 = function append_1(str) {
    var hasEnd = /[.?!]\s*$/.test(str);
    this.forEach(function (doc) {
      var end = doc.match('.$');
      var lastTerm = end.termList(0);
      var punct = lastTerm.post;

      if (hasEnd === true) {
        punct = '';
      } // add punctuation to the end


      end._append(str + punct); // remove punctuation from the former last-term


      lastTerm.post = ' ';
    });
    return this;
  };

  var append = {
    prepend: prepend,
    append: append_1
  };

  // if a clause starts with these, it's not a main clause
  var subordinate = "(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)";
  var relative = "(that|which|whichever|who|whoever|whom|whose|whomever)"; //try to remove secondary clauses

  var mainClause = function mainClause(og) {
    var m = og.clone(true);

    if (m.length === 1) {
      return m;
    } // if there's no verb?


    m = m["if"]('#Verb');

    if (m.length === 1) {
      return m;
    } // this is a signal for subordinate-clauses


    m = m.ifNo(subordinate);
    m = m.ifNo('^even (if|though)');
    m = m.ifNo('^so that');
    m = m.ifNo('^rather than');
    m = m.ifNo('^provided that');

    if (m.length === 1) {
      return m;
    } // relative clauses


    m = m.ifNo(relative);

    if (m.length === 1) {
      return m;
    }

    m = m.ifNo('(despite|during|before|through|throughout)');

    if (m.length === 1) {
      return m;
    } // did we go too far?


    if (m.length === 0) {
      m = og;
    } // choose the first one?


    return m.eq(0);
  };

  var mainClause_1 = mainClause;

  var parse = function parse(doc) {
    var clauses = doc.clauses();
    var main = mainClause_1(clauses);
    var nouns = main.match('#Determiner? (#Noun|#Adjective)+')["if"]('#Noun');
    var verb = main.verbs().eq(0); // match('(do|will)? not? #Verb+ not?').eq(0)

    return {
      subject: nouns.eq(0),
      verb: verb,
      object: verb.lookAhead('.*')
    };
  };

  var parse_1 = parse;

  /** overload the original json with noun information */

  var json_1 = function json_1(options) {
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
      var json = doc._json(options)[0];

      var obj = parse_1(doc);
      json.subject = obj.subject.json(options)[0];
      json.verb = obj.verb.json(options)[0];
      json.object = obj.object.json(options)[0];
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  };

  var json = {
    json: json_1
  };

  /** he walks -> he did not walk */

  var toNegative = function toNegative() {
    this.forEach(function (doc) {
      var obj = parse_1(doc);
      var vb = obj.verb.clone();
      vb = vb.verbs().toNegative();
      obj.verb.replaceWith(vb, false);
    });
    return this;
  };
  /** he doesn't walk -> he walks */


  var toPositive = function toPositive() {
    this.forEach(function (doc) {
      var obj = parse_1(doc);
      var vb = obj.verb.clone();
      vb = vb.verbs().toPositive();
      obj.verb.replaceWith(vb, false);
    });
    return this;
  };

  var negative = {
    toNegative: toNegative,
    toPositive: toPositive
  };

  //is this sentence asking a question?
  var isQuestion = function isQuestion(doc) {
    var endPunct = doc.post();
    var clauses = doc.clauses();

    if (/\?/.test(endPunct) === true) {
      return true;
    } // Has ellipsis at the end means it's probably not a question
    // e.g., Is this just fantasy...


    if (/\.\.$/.test(doc.out('text'))) {
      return false;
    } // Starts with question word, but has a comma, so probably not a question
    // e.g., Why are we caught in a land slide, no escape from reality


    if (doc.has('^#QuestionWord') && doc.has('#Comma')) {
      return false;
    } // Starts with a #QuestionWord
    // e.g., What open your eyes look up to the skies and see


    if (doc.has('^#QuestionWord')) {
      return true;
    } // Second word is a #QuestionWord
    // e.g., I'm what a poor boy
    // case ts.has('^\w+\s#QuestionWord'):
    // return true;
    // is it, do you - start of sentence
    // e.g., Do I need no sympathy


    if (doc.has('^(do|does|did|is|was|can|could|will|would|may) #Noun')) {
      return true;
    } // these are a little more loose..
    // e.g., Must I be come easy come easy go


    if (doc.has('^(have|must) you')) {
      return true;
    } // Clause starts with a question word
    // e.g., Anyway the wind blows, what doesn't really matter to me


    if (clauses.has('^#QuestionWord')) {
      return true;
    } //is wayne gretskzy alive


    if (clauses.has('(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$')) {
      return true;
    } // Probably not a question


    return false;
  };

  var isQuestion_1 = isQuestion;

  /** return sentences ending with '?' */

  var isQuestion_1$1 = function isQuestion_1$1() {
    return this.filter(function (d) {
      return isQuestion_1(d);
    });
  };
  /** return sentences ending with '!' */


  var isExclamation = function isExclamation() {
    return this.filter(function (doc) {
      var term = doc.lastTerm().termList(0);
      return term.hasPost('!');
    });
  };
  /** return sentences with neither a question or an exclamation */


  var isStatement = function isStatement() {
    return this.filter(function (doc) {
      var term = doc.lastTerm().termList(0);
      return !term.hasPost('?') && !term.hasPost('!');
    });
  };
  /** 'he is.' -> 'he is!' */


  var toExclamation = function toExclamation() {
    this.post('!');
    return this;
  };
  /** 'he is.' -> 'he is?' */


  var toQuestion = function toQuestion() {
    this.post('?');
    return this;
  };
  /** 'he is?' -> 'he is.' */


  var toStatement = function toStatement() {
    this.post('.');
    return this;
  };

  var questions = {
    isQuestion: isQuestion_1$1,
    isExclamation: isExclamation,
    isStatement: isStatement,
    toExclamation: toExclamation,
    toQuestion: toQuestion,
    toStatement: toStatement
  };

  var useParticiple = function useParticiple(vb) {
    if (vb.has('(could|should|would|may|can|must)')) {
      return true;
    }

    return false;
  };
  /** he walks -> he walked */


  var toPastTense = function toPastTense() {
    this.forEach(function (doc) {
      if (doc.has('#PastTense')) {
        return;
      }

      var obj = parse_1(doc);
      var vb = obj.verb.clone(); // support 'he could drive' -> 'he could have driven'

      if (useParticiple(vb)) {
        vb = vb.verbs().toParticiple();
        obj.verb.replaceWith(vb, false);
      } else {
        //   //do a normal conjugation
        vb = vb.verbs().toPastTense();
        obj.verb.replaceWith(vb, false);
      } // // trailing gerund/future/present are okay, but 'walked and eats' is not


      if (obj.object && obj.object.found && obj.object.has('#PresentTense')) {
        var verbs = obj.object.verbs();
        verbs["if"]('#PresentTense').verbs().toPastTense();
      }
    });
    return this;
  };
  /** he drives -> he has driven */


  var toParticiple = function toParticiple() {
    this.forEach(function (doc) {
      if (doc.has('has #Participle')) {
        return;
      }

      var obj = parse_1(doc);
      var vb = obj.verb.clone();
      vb = vb.verbs().toParticiple();
      obj.verb.replaceWith(vb, false); // trailing gerund/future/present are okay, but 'walked and eats' is not

      if (obj.object && obj.object.found && obj.object.has('#PresentTense')) {
        var verbs = obj.object.verbs();
        verbs["if"]('#PresentTense').verbs().toParticiple();
      }
    });
    return this;
  };
  /** he walked -> he walks */


  var toPresentTense = function toPresentTense() {
    this.forEach(function (doc) {
      var obj = parse_1(doc);
      var isPlural = obj.verb.lookBehind('(i|we) (#Adverb|#Verb)?$').found;
      var vb = obj.verb.clone(); // 'i look', not 'i looks'

      if (isPlural) {
        //quick hack for copula verb - be/am
        if (vb.has('(is|was|am|be)')) {
          vb = vb.replace('will? (is|was|am|be)', 'am');
        } else {
          vb = vb.verbs().toInfinitive();
        }
      } else {
        //'he looks'
        vb = vb.verbs().toPresentTense();
      }

      obj.verb.replaceWith(vb, false); // future is okay, but 'walks and ate' -> 'walks and eats'

      if (obj.object && obj.object.found && obj.object.has('#PastTense')) {
        var verbs = obj.object.verbs();
        verbs["if"]('#PastTense').verbs().toPresentTense();
      }
    });
    return this;
  };
  /**he walked -> he will walk */


  var toFutureTense = function toFutureTense() {
    this.forEach(function (doc) {
      var obj = parse_1(doc);
      var vb = obj.verb.clone();
      vb = vb.verbs().toFutureTense();
      obj.verb.replaceWith(vb, false); //Present is okay, but 'will walk and ate' -> 'will walk and eat'

      if (obj.object && obj.object.found && obj.object.has('(#PastTense|#PresentTense)')) {
        var verbs = obj.object.verbs();
        verbs["if"]('(#PastTense|#PresentTense)').verbs().toInfinitive();
      }
    });
    return this;
  };
  /** the main noun of the sentence */


  var subjects = function subjects() {
    return this.map(function (doc) {
      var res = parse_1(doc);
      return res.subject;
    });
  };
  /** return sentences that are in passive-voice */


  var isPassive = function isPassive() {
    return this["if"]('was #Adverb? #PastTense #Adverb? by'); //haha
  };

  var tense = {
    toPastTense: toPastTense,
    toParticiple: toParticiple,
    toPresentTense: toPresentTense,
    toFutureTense: toFutureTense,
    subjects: subjects,
    isPassive: isPassive
  };

  var phrases_1 = function phrases_1() {
    var arr = [];
    this.forEach(function (s) {
      s = s.splitOn('#VerbPhrase+');
      s = s.splitOn('#NounPhrase+');
      s = s.splitOn('#AdjectivePhrase+');
      arr = arr.concat(s.list);
    });
    return this.buildFrom(arr);
  };

  var phrases = {
    phrases: phrases_1
  };

  var methods = Object.assign({}, append, json, negative, questions, tense, phrases);

  var plugin = function plugin(Doc, world) {
    // our new tags
    world.addTags(tags); // run our tagger

    world.postProcess(tagger_1);
    /**  */

    var Sentences = /*#__PURE__*/function (_Doc) {
      _inherits(Sentences, _Doc);

      var _super = _createSuper(Sentences);

      function Sentences(list, from, w) {
        _classCallCheck(this, Sentences);

        list = list.map(function (p) {
          return p.clone(true);
        });
        return _super.call(this, list, from, w);
      }

      return Sentences;
    }(Doc); // add some aliases


    methods.questions = methods.isQuestion;
    methods.exclamations = methods.isExclamation;
    methods.statements = methods.isStatement; // keep backups of these methods

    methods._prepend = Sentences.prototype.prepend;
    methods._append = Sentences.prototype.append;
    methods._json = Sentences.prototype.json;
    Object.assign(Sentences.prototype, methods);
    /** create a new Sentences object */

    Sentences.prototype.buildFrom = function (list) {
      list = list.map(function (p) {
        return p.clone(true);
      });
      var doc = new Sentences(list, this, this.world);
      return doc;
    };
    /** create a new Doc object */


    Sentences.prototype.toDoc = function () {
      return Doc.prototype.buildFrom(this.list);
    };
    /** overload original sentences() method and return Sentence class**/


    Doc.prototype.sentences = function (n) {
      var arr = [];
      this.list.forEach(function (p) {
        arr.push(p.fullSentence());
      });
      var s = new Sentences(arr, this, this.world);

      if (typeof n === 'number') {
        s = s.get(n);
      }

      return s;
    };

    return Doc;
  };

  var src = plugin;

  return src;

})));
//# sourceMappingURL=compromise-sentences.js.map

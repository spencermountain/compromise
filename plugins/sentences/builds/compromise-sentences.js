(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.compromiseSentences = factory());
}(this, (function () { 'use strict';

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

  var negate = {
    toNegative: toNegative,
    toPositive: toPositive
  };

  /** return sentences ending with '?' */
  var isQuestion = function isQuestion() {
    return this.filter(function (doc) {
      var term = doc.lastTerm().termList(0);
      return term.hasPost('?');
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
    return this;
  };
  /** 'he is.' -> 'he is?' */


  var toQuestion = function toQuestion() {
    return this;
  };
  /** 'he is?' -> 'he is.' */


  var toStatement = function toStatement() {
    return this;
  };

  var punct = {
    isQuestion: isQuestion,
    isExclamation: isExclamation,
    isStatement: isStatement,
    toExclamation: toExclamation,
    toQuestion: toQuestion,
    toStatement: toStatement
  };

  /** he walks -> he walked */

  var toPastTense = function toPastTense() {
    this.forEach(function (doc) {
      if (doc.has('#PastTense')) {
        return;
      }

      var obj = parse_1(doc);
      var vb = obj.verb.clone();
      vb = vb.verbs().toPastTense();
      obj.verb.replaceWith(vb, false); // trailing gerund/future/present are okay, but 'walked and eats' is not

      if (obj.object && obj.object.found && obj.object.has('#PresentTense')) {
        var verbs = obj.object.verbs();
        verbs["if"]('#PresentTense').verbs().toPastTense();
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
  }; // toContinuous() {
  //   return this
  // }


  var tense = {
    toPastTense: toPastTense,
    toPresentTense: toPresentTense,
    toFutureTense: toFutureTense
  };

  var methods = Object.assign({}, negate, punct, tense);

  var addMethod = function addMethod(Doc) {
    /**  */
    var Sentences =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Sentences, _Doc);

      function Sentences(list, from, world) {
        _classCallCheck(this, Sentences);

        list = list.map(function (p) {
          return p.clone(true);
        });
        return _possibleConstructorReturn(this, _getPrototypeOf(Sentences).call(this, list, from, world));
      }
      /** overload the original json with noun information */


      _createClass(Sentences, [{
        key: "json",
        value: function json(options) {
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
        }
        /** the main noun of the sentence */

      }, {
        key: "subjects",
        value: function subjects() {
          return this.map(function (doc) {
            var res = parse_1(doc);
            return res.subject;
          });
        }
        /** return sentences that are in passive-voice */

      }, {
        key: "isPassive",
        value: function isPassive() {
          return this["if"]('was #Adverb? #PastTense #Adverb? by'); //haha
        }
        /** add a word to the start of this sentence */

      }, {
        key: "prepend",
        value: function prepend(str) {
          this.forEach(function (doc) {
            // repair the titlecase
            var firstTerms = doc.match('^.');
            firstTerms.not('#ProperNoun').toLowerCase(); // actually add the word

            firstTerms.prepend(str); // add a titlecase

            firstTerms.terms(0).toTitleCase();
          });
          return this;
        }
        /** add a word to the end of this sentence */

      }, {
        key: "append",
        value: function append(str) {
          var hasEnd = /[.?!]\s*$/.test(str);
          this.forEach(function (doc) {
            var end = doc.match('.$');
            var lastTerm = end.termList(0);
            var punct = lastTerm.post;

            if (hasEnd === true) {
              punct = '';
            } // add punctuation to the end


            end.append(str + punct); // remove punctuation from the former last-term

            lastTerm.post = ' ';
          });
          return this;
        }
      }]);

      return Sentences;
    }(Doc);

    Object.assign(Sentences.prototype, methods);

    Doc.prototype.sentences = function (n) {
      var match = this.all(); //grab (n)th result

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new Sentences(match.list, this, this.world);
    };

    return Doc;
  };

  var src = addMethod;

  return src;

})));
//# sourceMappingURL=compromise-sentences.js.map

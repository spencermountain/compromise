(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.nlp = factory());
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

  // turn 'would not really walk up' into parts
  var parseVerb = function parseVerb(vb) {
    var parsed = {
      adverb: vb.match('#Adverb+'),
      // 'really'
      negative: vb.match('#Negative'),
      // 'not'
      auxiliary: vb.match('#Auxiliary').not('(#Negative|#Adverb)'),
      // 'will' of 'will go'
      particle: vb.match('#Particle'),
      // 'up' of 'pull up'
      verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)')
    };
    return parsed;
  };

  var parse = parseVerb;

  // walked => walk  - turn a verb into it's root form
  var toInfinitive = function toInfinitive(parsed, world) {
    var verb = parsed.verb; //1. if it's already infinitive

    var str = verb.out('normal');

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

  var toInfinitive_1 = toInfinitive;

  // spencer walks -> singular
  // we walk -> plural
  // the most-recent noun-phrase, before this verb.
  var findNoun = function findNoun(vb) {
    var noun = vb.lookBehind('#Noun+').last();
    return noun;
  }; //sometimes you can tell if a verb is plural/singular, just by the verb
  // i am / we were
  // othertimes you need its subject 'we walk' vs 'i walk'


  var isPlural = function isPlural(parsed) {
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

  var isPlural_1 = isPlural;

  /** too many special cases for is/was/will be*/

  var toBe = function toBe(parsed) {
    var plural = isPlural_1(parsed);
    var isNegative = parsed.negative.found; //account for 'i is' -> 'i am' irregular
    // if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
    //   isI = true;
    // }

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

  var conjugate = function conjugate(parsed, world) {
    var verb = parsed.verb; //special handling of 'is', 'will be', etc.

    if (verb.has('#Copula') || verb.out('normal') === 'be' && parsed.auxiliary.has('will')) {
      return toBe_1(parsed);
    }

    var infinitive = toInfinitive_1(parsed, world); // console.log(infinitive)

    var forms = world.transforms.conjugate(infinitive, world);
    forms.Infinitive = infinitive; //apply negative

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

  var conjugate_1 = conjugate;

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
      parsed.auxiliary.eq(0).append('not');
      return;
    } // is walking -> is not walking


    if (vb.has('(#Copula|will|has|had|do)')) {
      vb.append('not');
      return;
    } // walked -> did not walk


    if (vb.has('#PastTense')) {
      var inf = toInfinitive_1(parsed, world);
      vb.replace(inf);
      vb.prepend('did not');
      return;
    } // walks -> does not walk


    if (vb.has('#PresentTense')) {
      var _inf = toInfinitive_1(parsed, world);

      vb.replace(_inf);

      if (isPlural_1(parsed)) {
        vb.prepend('do not');
      } else {
        vb.prepend('does not');
      }

      return;
    } //walking -> not walking


    if (vb.has('#Gerund')) {
      var _inf2 = toInfinitive_1(parsed, world);

      vb.replace(_inf2);
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

  /** return only verbs with 'not'*/

  var isNegative = function isNegative() {
    return this["if"]('#Negative');
  };
  /**  return only verbs without 'not'*/


  var isPositive = function isPositive() {
    return this.ifNo('#Negative');
  };
  /** add a 'not' to these verbs */


  var toNegative_1$1 = function toNegative_1$1() {
    var _this = this;

    this.list.forEach(function (p) {
      var doc = _this.buildFrom([p]);

      var parsed = parse(doc);
      toNegative_1(parsed, doc.world);
    });
    return this;
  };
  /** remove 'not' from these verbs */


  var toPositive = function toPositive() {
    return this.remove('#Negative');
  };

  var methods = {
    isNegative: isNegative,
    isPositive: isPositive,
    toNegative: toNegative_1$1,
    toPositive: toPositive
  };

  /** */

  var isPlural_1$1 = function isPlural_1$1() {
    var _this = this;

    var list = [];
    this.forEach(function (vb) {
      var parsed = parse(vb);

      if (isPlural_1(parsed, _this.world) === true) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  };
  /** */


  var isSingular = function isSingular() {
    var _this2 = this;

    var list = [];
    this.forEach(function (vb) {
      var parsed = parse(vb);

      if (isPlural_1(parsed, _this2.world) === false) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  };

  var methods$1 = {
    isPlural: isPlural_1$1,
    isSingular: isSingular
  };

  /**  */
  // exports.tenses = function() {
  // }
  //

  /**  */

  var conjugate_1$1 = function conjugate_1$1() {
    var _this = this;

    var result = [];
    this.forEach(function (vb) {
      var parsed = parse(vb);
      var forms = conjugate_1(parsed, _this.world);
      result.push(forms);
    });
    return result;
  };
  /** */


  var toPastTense = function toPastTense() {
    var _this2 = this;

    this.forEach(function (vb) {
      var parsed = parse(vb);
      var str = conjugate_1(parsed, _this2.world).PastTense;
      vb.replace(str);
    });
    return this;
  };
  /** */


  var toPresentTense = function toPresentTense() {
    var _this3 = this;

    this.forEach(function (vb) {
      var parsed = parse(vb);
      var str = conjugate_1(parsed, _this3.world).PresentTense;
      vb.replace(str);
    });
    return this;
  };
  /** */


  var toFutureTense = function toFutureTense() {
    var _this4 = this;

    this.forEach(function (vb) {
      var parsed = parse(vb);
      var inf = toInfinitive_1(parsed, _this4.world);
      vb.replace('will ' + inf); //not smart.
    });
    return this;
  };
  /** */


  var toInfinitive_1$1 = function toInfinitive_1$1() {
    var _this5 = this;

    this.forEach(function (vb) {
      var parsed = parse(vb);
      var inf = toInfinitive_1(parsed, _this5.world);
      vb.replace(inf);
    });
    return this;
  };
  /** */


  var toGerund = function toGerund() {
    var _this6 = this;

    this.forEach(function (vb) {
      var parsed = parse(vb);
      var str = conjugate_1(parsed, _this6.world).Gerund;
      vb.replace(str);
    });
    return this;
  };
  /** */
  // exports.asAdjective=function(){}


  var methods$2 = {
    conjugate: conjugate_1$1,
    toPastTense: toPastTense,
    toPresentTense: toPresentTense,
    toFutureTense: toFutureTense,
    toInfinitive: toInfinitive_1$1,
    toGerund: toGerund
  };

  var methods$3 = [methods, methods$1, methods$2];

  var addMethod = function addMethod(Doc) {
    /**  */
    var Verbs =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Verbs, _Doc);

      function Verbs(list, from, world) {
        _classCallCheck(this, Verbs);

        return _possibleConstructorReturn(this, _getPrototypeOf(Verbs).call(this, list, from, world));
      }
      /** overload the original json with verb information */


      _createClass(Verbs, [{
        key: "json",
        value: function json(options) {
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
            var parsed = parse(p);
            json.parts = {};
            Object.keys(parsed).forEach(function (k) {
              json.parts[k] = parsed[k].text('normal');
            });
            json.isNegative = p.has('#Negative');
            json.conjugations = conjugate_1(parsed, _this.world);
            res.push(json);
          });

          if (n !== null) {
            return res[n];
          }

          return res;
        }
        /** grab the adverbs describing these verbs */

      }, {
        key: "adverbs",
        value: function adverbs() {
          var list = [];
          this.forEach(function (vb) {
            var advb = parse(vb).adverb;

            if (advb.found) {
              list = list.concat(advb.list);
            }
          });
          return this.buildFrom(list);
        }
      }]);

      return Verbs;
    }(Doc); // add-in our methods


    methods$3.forEach(function (obj) {
      return Object.assign(Verbs.prototype, obj);
    }); // aliases

    Verbs.prototype.negate = Verbs.prototype.toNegative;

    Doc.prototype.verbs = function (n) {
      var match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+'); // handle commas

      match = match.splitAfter('@hasComma'); // match = match.clauses()
      //handle slashes?
      // match = match.splitAfter('@hasSlash')
      //ensure there's actually a verb

      match = match["if"]('#Verb'); //this could be smarter
      //grab (n)th result

      if (typeof n === 'number') {
        match = match.get(n);
      }

      var vb = new Verbs(match.list, this, this.world); // this.before(match).debug()

      return vb;
    };

    return Doc;
  };

  var src = addMethod;

  return src;

})));
//# sourceMappingURL=compromise-verbs.js.map

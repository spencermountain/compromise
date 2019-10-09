(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.nlp = factory());
}(this, function () { 'use strict';

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
      reg: /pping$/i,
      to: 'p'
    }, {
      reg: /lling$/i,
      to: 'll'
    }, {
      reg: /tting$/i,
      to: 't'
    }, {
      reg: /dding$/i,
      to: 'd'
    }, {
      reg: /ssing$/i,
      to: 'ss'
    }, {
      reg: /(..)gging$/i,
      to: '$1g'
    }, {
      reg: /([^aeiou])ying$/i,
      to: '$1y'
    }, {
      reg: /([^ae]i.)ing$/i,
      to: '$1e'
    }, {
      reg: /(ea.)ing$/i,
      to: '$1'
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
      reg: /([rl])ew$/i,
      to: '$1ow'
    }, {
      reg: /([pl])t$/i,
      to: '$1t'
    }]
  };
  var _rules = rules;

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

  var pickTense = function pickTense(verb) {
    // 1. decide from known-tags
    if (verb.has('#PastTense')) {
      return 'PastTense';
    } else if (verb.has('#Gerund')) {
      return 'Gerund';
    } else if (verb.has('#PresentTense')) {
      return 'PresentTense';
    } else if (verb.has('#Participle')) {
      return 'Participle';
    } else if (verb.has('#Actor')) {
      return 'Actor';
    } // 2. guess a little-bit


    var str = verb.out('normal');
    var three = str.substr(str.length - 3);

    if (_guess.hasOwnProperty(three) === true) {
      return _guess[three];
    }

    var two = str.substr(str.length - 2);

    if (_guess.hasOwnProperty(two === true)) {
      return _guess[two];
    }

    var one = str.substr(str.length - 1);

    if (one === 's') {
      return 'PresentTense';
    }

    return null;
  };

  var pickTense_1 = pickTense;

  var toInfinitive = function toInfinitive(parsed, world) {
    var verb = parsed.verb; //1. if it's already infinitive

    var str = verb.out('normal');

    if (verb.has('#Infinitive')) {
      return str;
    } //2. look at known irregulars


    if (world.lexicon.hasOwnProperty(str) === true) {
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
    } //3. look at our rules


    var tense = pickTense_1(verb);

    if (tense && _rules[tense]) {
      for (var _i = 0; _i < _rules[tense].length; _i++) {
        var rule = _rules[tense][_i];

        if (rule.reg.test(str) === true) {
          return str.replace(rule.reg, rule.to);
        }
      }
    } // fallback


    return str;
  };

  var toInfinitive_1 = toInfinitive;

  /** too many special cases for is/was/will be*/

  var toBe = function toBe(parsed) {
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

    var infinitive = toInfinitive_1(parsed, world);
    var forms = world.transforms.verbs(infinitive, world);
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

  // #Modal : would walk    -> 'would not walk'
  // #Copula : is           -> 'is not'
  // #PastTense : walked    -> did not walk
  // #PresentTense : walks  -> does not walk
  // #Gerund : walking:     -> not walking
  // #Infinitive : walk     -> do not walk
  var toNegative = function toNegative(parsed, world) {
    // if it's already negative...
    if (parsed.negative.found) {
      return;
    } // would walk -> would not walk


    if (parsed.auxiliary.found) {
      parsed.auxiliary.append('not');
      return;
    } // is walking -> is not walking


    if (parsed.verb.has('#Copula')) {
      parsed.verb.append('not');
      return;
    }
  };

  var toNegative_1 = toNegative;

  var parseVerb = function parseVerb(vb) {
    return {
      adverb: vb.match('#Adverb+'),
      // 'really'
      negative: vb.match('#Negative'),
      // 'not'
      auxiliary: vb.match('#Auxiliary'),
      // 'will' of 'will go'
      particle: vb.match('#Particle'),
      // 'up' of 'pull up'
      verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)')
    };
  };

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
      /** grab the adverbs describing these verbs */


      _createClass(Verbs, [{
        key: "adverbs",
        value: function adverbs() {
          var list = [];
          this.forEach(function (vb) {
            var advb = parseVerb(vb).adverb;

            if (advb.found) {
              list = list.concat(advb.list);
            }
          });
          return this.buildFrom(list);
        }
        /** */
        // conjugation(){}

        /** */

      }, {
        key: "conjugations",
        value: function conjugations() {
          var _this = this;

          var result = [];
          this.forEach(function (vb) {
            var parsed = parseVerb(vb);
            var forms = conjugate_1(parsed, _this.world);
            result.push(forms);
          });
          return result;
        }
        /** */
        // isPlural(){}

        /** */
        // isSingular(){}

        /** return only verbs with 'not'*/

      }, {
        key: "isNegative",
        value: function isNegative() {
          return this["if"]('#Negative');
        }
        /**  return only verbs without 'not'*/

      }, {
        key: "isPositive",
        value: function isPositive() {
          return this.ifNo('#Negative');
        }
        /** add a 'not' to these verbs */

      }, {
        key: "toNegative",
        value: function toNegative() {
          var _this2 = this;

          // not native forEach!
          this.list.forEach(function (p) {
            var doc = _this2.buildFrom([p]);

            var parsed = parseVerb(doc);

            toNegative_1(parsed, doc.world);
          });
          return this;
        }
        /** remove 'not' from these verbs */

      }, {
        key: "toPositive",
        value: function toPositive() {
          return this.remove('#Negative');
        }
        /** */

      }, {
        key: "toPastTense",
        value: function toPastTense() {
          var transforms = this.world.transforms;
          return this.map(function (vb) {
            var verb = parseVerb(vb).verb;
            var str = verb.out('normal');
            var past = transforms.verbs(str).PastTense;

            if (past) {
              var p = vb.list[0]; // console.log(p.buildFrom)
              // let p = vb.buildP
              // console.log(vb.list[0].replace(past))

              return vb; //.replaceWith(past, this)
            }

            return vb;
          });
        }
        /** */
        // toPresentTense(){}

        /** */
        // toFutureTense(){}

        /** */
        // toInfinitive(){}

        /** */
        // toGerund(){}

        /** */
        // asAdjective(){}

      }]);

      return Verbs;
    }(Doc);

    Doc.prototype.verbs = function (n) {
      var match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+'); // handle commas
      // match = match.splitAfter('!#Adverb @hasComma')
      //handle slashes?
      // match = match.splitAfter('@hasSlash')
      //ensure there's actually a verb

      match = match["if"]('#Verb'); //this could be smarter
      //grab (n)th result

      if (typeof n === 'number') {
        match = match.get(n);
      }

      var vb = new Verbs(match.list, this, this.world);
      return vb;
    };

    return Doc;
  };

  var src = addMethod;

  return src;

}));
//# sourceMappingURL=compromise-verbs.js.map

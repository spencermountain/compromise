/* compromise-adjectives 0.0.6 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseAdjectives = factory());
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

  //turn 'quick' into 'quickly'
  var not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/, /y$/];
  var irregulars = {
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

  var adj_to_adv = function adj_to_adv(str) {
    if (irregulars.hasOwnProperty(str) === true) {
      return irregulars[str];
    }

    if (dontChange.hasOwnProperty(str) === true) {
      return str;
    }

    for (var i = 0; i < not_matches.length; i++) {
      if (not_matches[i].test(str) === true) {
        return null;
      }
    }

    for (var _i = 0; _i < transforms.length; _i++) {
      if (transforms[_i].reg.test(str) === true) {
        return str.replace(transforms[_i].reg, transforms[_i].repl);
      }
    }

    return str + 'ly';
  };

  var toAdverb = adj_to_adv;

  //convert 'cute' to 'cuteness'
  var irregulars$1 = {
    clean: 'cleanliness',
    naivety: 'naivety',
    hurt: 'hurt'
  };
  var transforms$1 = [{
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
    if (irregulars$1.hasOwnProperty(w)) {
      return irregulars$1[w];
    }

    var lastChar = w.charAt(w.length - 1);

    if (lastChar === 'w' || lastChar === 's') {
      return null;
    }

    for (var i = 0; i < transforms$1.length; i++) {
      if (transforms$1[i].reg.test(w) === true) {
        return w.replace(transforms$1[i].reg, transforms$1[i].repl);
      }
    }

    return w + 'ness';
  };

  var toNoun = to_noun;

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
  var banList = {
    random: true,
    wild: true
  };
  var irregulars$2 = {
    bored: 'bore',
    red: 'redden',
    sad: 'sadden',
    fat: 'fatten',
    small: 'shrink',
    full: 'fill',
    tired: 'tire'
  };

  var toVerb = function toVerb(str) {
    if (irregulars$2.hasOwnProperty(str) === true) {
      return irregulars$2[str];
    } //don't bother with these:


    if (str.length <= 3) {
      return null;
    }

    if (banList.hasOwnProperty(str) === true) {
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

  var addMethods = function addMethods(Doc) {
    /**  */
    var Adjective = /*#__PURE__*/function (_Doc) {
      _inherits(Adjective, _Doc);

      var _super = _createSuper(Adjective);

      function Adjective() {
        _classCallCheck(this, Adjective);

        return _super.apply(this, arguments);
      }

      _createClass(Adjective, [{
        key: "json",

        /** overload the original json with noun information */
        value: function json(options) {
          var n = null;

          if (typeof options === 'number') {
            n = options;
            options = null;
          }

          var res = [];
          this.forEach(function (doc) {
            var json = doc.json(options)[0];
            var str = doc.text('reduced');
            json.toAdverb = toAdverb(str);
            json.toNoun = toNoun(str);
            json.toVerb = toVerb_1(str);
            res.push(json);
          });

          if (n !== null) {
            return res[n];
          }

          return res;
        }
      }, {
        key: "conjugate",
        value: function conjugate(n) {
          var transform = this.world.transforms.adjectives;
          var arr = [];
          this.forEach(function (doc) {
            var str = doc.text('reduced');
            var obj = transform(str);
            obj.Adverb = toAdverb(str);
            obj.Noun = toNoun(str);
            obj.Verb = toVerb_1(str);
            arr.push(obj);
          }); //support nth result

          if (typeof n === 'number') {
            return arr[n];
          }

          return arr;
        }
      }, {
        key: "toSuperlative",
        value: function toSuperlative() {
          var transform = this.world.transforms.adjectives;
          this.forEach(function (doc) {
            var obj = transform(doc.text('reduced'));
            doc.replaceWith(obj.Superlative, true);
          });
          return this;
        }
      }, {
        key: "toComparative",
        value: function toComparative() {
          var transform = this.world.transforms.adjectives;
          this.forEach(function (doc) {
            var obj = transform(doc.text('reduced'));
            doc.replaceWith(obj.Comparative, true);
          });
          return this;
        }
      }, {
        key: "toAdverb",
        value: function toAdverb$1() {
          this.forEach(function (doc) {
            var adverb = toAdverb(doc.text('reduced'));

            doc.replaceWith(adverb, true);
          });
          return this;
        }
      }, {
        key: "toVerb",
        value: function toVerb() {
          this.forEach(function (doc) {
            var verb = toVerb_1(doc.text('reduced'));

            doc.replaceWith(verb, true);
          });
          return this;
        }
      }, {
        key: "toNoun",
        value: function toNoun$1() {
          this.forEach(function (doc) {
            var noun = toNoun(doc.text('reduced'));

            doc.replaceWith(noun, true);
          });
          return this;
        }
      }]);

      return Adjective;
    }(Doc);
    /** grab all the adjectives */


    Doc.prototype.adjectives = function (n) {
      var m = this.match('#Adjective'); //grab (n)th result

      if (typeof n === 'number') {
        m = m.get(n);
      }

      return new Adjective(m.list, this, this.world);
    };
  };

  var src = addMethods;

  return src;

})));
//# sourceMappingURL=compromise-adjectives.js.map

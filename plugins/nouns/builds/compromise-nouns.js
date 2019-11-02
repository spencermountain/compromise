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

  var irregulars = {
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

    if (irregulars.hasOwnProperty(str)) {
      return irregulars[str];
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
  var isPlural = [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i]; //similar to plural/singularize rules, but not the same

  var isSingular = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
  var _rules = {
    isSingular: isSingular,
    isPlural: isPlural
  };

  var endS = /s$/; // double-check this term, if it is not plural, or singular.
  // (this is a partial copy of ./tagger/fallbacks/plural)
  // fallback plural if it ends in an 's'.

  var isPlural$1 = function isPlural(str) {
    // isSingular suffix rules
    if (_rules.isSingular.find(function (reg) {
      return reg.test(str);
    })) {
      return false;
    } // does it end in an s?


    if (endS.test(str) === true) {
      return true;
    } // is it a plural like 'fungi'?


    if (_rules.isPlural.find(function (reg) {
      return reg.test(str);
    })) {
      return true;
    }

    return null;
  };

  var isPlural_1 = isPlural$1;

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
      doc.replaceWith(exceptions[str]);
      doc.tag('Possessive', 'toPossessive');
      return;
    } // flanders'


    if (/s$/.test(str)) {
      str += "'";
      doc.replaceWith(str);
      doc.tag('Possessive', 'toPossessive');
      return;
    } //normal form:


    str += "'s";
    doc.replaceWith(str);
    doc.tag('Possessive', 'toPossessive');
    return;
  };

  var toPossessive_1 = toPossessive;

  // .nouns() supports some noun-phrase-ish groupings
  // pull these apart, if necessary
  var parse = function parse(doc) {
    var res = {
      main: doc
    }; //support 'mayor of chicago' as one noun-phrase

    if (doc.has('#Noun (of|by|for) .')) {
      var m = doc.splitAfter('[#Noun+]');
      res.main = m.eq(0);
      res.post = m.eq(1);
    }

    return res;
  };

  var parse_1 = parse;

  var addMethod = function addMethod(Doc) {
    /**  */
    var Nouns =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Nouns, _Doc);

      function Nouns() {
        _classCallCheck(this, Nouns);

        return _possibleConstructorReturn(this, _getPrototypeOf(Nouns).apply(this, arguments));
      }

      _createClass(Nouns, [{
        key: "json",

        /** overload the original json with noun information */
        value: function json(options) {
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
          return res;
        }
      }, {
        key: "isPlural",
        value: function isPlural() {
          return this["if"]('#Plural'); //assume tagger has run?
        }
      }, {
        key: "hasPlural",
        value: function hasPlural() {
          return this.filter(function (d) {
            return hasPlural_1(d);
          });
        }
      }, {
        key: "toPlural",
        value: function toPlural() {
          var _this = this;

          var toPlural = this.world.transforms.toPlural;
          this.forEach(function (doc) {
            if (doc.has('#Plural') || hasPlural_1(doc) === false) {
              return;
            } // double-check it isn't an un-tagged plural


            var main = parse_1(doc).main;
            var str = main.text();

            if (!main.has('#Singular') && isPlural_1(str) === true) {
              return;
            }

            str = toPlural(str, _this.world);
            main.replace(str).tag('#Plural');
          });
          return this;
        }
      }, {
        key: "toSingular",
        value: function toSingular() {
          var _this2 = this;

          var toSingular = this.world.transforms.toSingular;
          this.forEach(function (doc) {
            if (doc.has('#Singular') || hasPlural_1(doc) === false) {
              return;
            } // double-check it isn't an un-tagged plural


            var main = parse_1(doc).main;
            var str = main.text();

            if (!main.has('#Plural') && isPlural_1(str) !== true) {
              return;
            }

            str = toSingular(str, _this2.world);
            main.replace(str).tag('#Singular');
          });
          return this;
        }
      }, {
        key: "toPossessive",
        value: function toPossessive() {
          this.forEach(function (d) {
            toPossessive_1(d);
          });
          return this;
        }
      }]);

      return Nouns;
    }(Doc);

    Doc.prototype.nouns = function (n) {
      var match = this.clauses();
      match = match.match('#Noun+ (of|by)? the? #Noun+?'); //nouns that we don't want in these results, for weird reasons

      match = match.not('#Pronoun');
      match = match.not('(there|these)');
      match = match.not('(#Month|#WeekDay)'); //allow Durations, Holidays
      // //allow possessives like "spencer's", but not generic ones like,

      match = match.not('(my|our|your|their|her|his)');
      match = match.not('(of|for|by|the)$'); // match = match.splitAfter('@hasComma')

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new Nouns(match.list, this, this.world);
    };

    return Doc;
  };

  var src = addMethod;

  return src;

}));
//# sourceMappingURL=compromise-nouns.js.map

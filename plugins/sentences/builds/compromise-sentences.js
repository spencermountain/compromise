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

  var addMethod = function addMethod(Doc) {
    /**  */
    var Sentences =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Sentences, _Doc);

      function Sentences(list, from, world) {
        _classCallCheck(this, Sentences);

        return _possibleConstructorReturn(this, _getPrototypeOf(Sentences).call(this, list, from, world));
      }

      _createClass(Sentences, [{
        key: "toPastTense",
        value: function toPastTense() {}
      }, {
        key: "toPresentTense",
        value: function toPresentTense() {}
      }, {
        key: "toFutureTense",
        value: function toFutureTense() {}
      }, {
        key: "toContinuous",
        value: function toContinuous() {}
      }, {
        key: "toNegative",
        value: function toNegative() {}
      }, {
        key: "toPositive",
        value: function toPositive() {}
      }, {
        key: "isPassive",
        value: function isPassive() {}
        /** return sentences ending with '?' */

      }, {
        key: "isQuestion",
        value: function isQuestion() {
          return this.filter(function (doc) {
            var term = doc.lastTerm().termList(0);
            return term.hasPost('?');
          });
        }
        /** return sentences ending with '!' */

      }, {
        key: "isExclamation",
        value: function isExclamation() {
          return this.filter(function (doc) {
            var term = doc.lastTerm().termList(0);
            return term.hasPost('!');
          });
        }
        /** return sentences with neither a question or an exclamation */

      }, {
        key: "isStatement",
        value: function isStatement() {
          return this.filter(function (doc) {
            var term = doc.lastTerm().termList(0);
            return !term.hasPost('?') && !term.hasPost('!');
          });
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
        }
        /** add a word to the end of this sentence */

      }, {
        key: "append",
        value: function append(str) {
          this.forEach(function (doc) {
            var end = doc.match('.$');
            var lastTerm = end.termList(0);
            var punct = lastTerm.post; // add punctuation to the end

            end.append(str + punct); // remove punctuation from the former last-term

            lastTerm.post = ' ';
          });
        }
      }, {
        key: "toExclamation",
        value: function toExclamation() {}
      }, {
        key: "toQuestion",
        value: function toQuestion() {}
      }, {
        key: "toStatement",
        value: function toStatement() {}
      }]);

      return Sentences;
    }(Doc);

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

}));
//# sourceMappingURL=compromise-sentences.js.map

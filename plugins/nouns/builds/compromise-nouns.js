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
    var Nouns =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Nouns, _Doc);

      function Nouns() {
        _classCallCheck(this, Nouns);

        return _possibleConstructorReturn(this, _getPrototypeOf(Nouns).apply(this, arguments));
      }

      _createClass(Nouns, [{
        key: "isPlural",
        value: function isPlural() {}
      }, {
        key: "hasPlural",
        value: function hasPlural() {}
      }, {
        key: "toPlural",
        value: function toPlural() {
          var _this = this;

          var transform = this.world.transforms;
          this.list.map(function (noun) {
            var str = noun.text('normal').trim();
            var plural = transform.nouns(str);

            var phrase = _this.fromText(plural).list[0];

            return noun.replace(phrase, _this);
          }); // return toPlural(this)
        }
      }, {
        key: "toSingular",
        value: function toSingular() {}
      }, {
        key: "toPossessive",
        value: function toPossessive() {} // articles() {} //?

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

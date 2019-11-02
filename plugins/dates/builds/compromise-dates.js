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

  var addMethods = function addMethods(Doc, world) {
    world.addTags({
      FinancialQuarter: {
        // isA: 'Date',
        notA: 'Foo'
      }
    });
    /**  */

    var Dates =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Dates, _Doc);

      function Dates() {
        _classCallCheck(this, Dates);

        return _possibleConstructorReturn(this, _getPrototypeOf(Dates).apply(this, arguments));
      }

      _createClass(Dates, [{
        key: "longForm",
        value: function longForm() {}
      }, {
        key: "shortForm",
        value: function shortForm() {}
      }]);

      return Dates;
    }(Doc);

    Doc.prototype.dates = function (n) {
      var r = this.clauses();
      var dates = r.match('#Date+');

      if (typeof n === 'number') {
        dates = dates.get(n);
      }

      if (typeof n === 'number') {
        dates = dates.get(n);
      }

      return new Dates(dates.list, this, this.world);
    };
  };

  var src = addMethods;

  return src;

})));
//# sourceMappingURL=compromise-dates.js.map

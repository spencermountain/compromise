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
    var People =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(People, _Doc);

      function People() {
        _classCallCheck(this, People);

        return _possibleConstructorReturn(this, _getPrototypeOf(People).apply(this, arguments));
      }

      return People;
    }(Doc);

    Doc.prototype.people = function (n) {
      var match = this.clauses();
      match = match.match('#Person+'); //grab (n)th result

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new People(match.list, this, this.world);
    };

    return Doc;
  };

  var people = addMethod;

  var addMethod$1 = function addMethod(Doc) {
    /**  */
    var Places =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Places, _Doc);

      function Places() {
        _classCallCheck(this, Places);

        return _possibleConstructorReturn(this, _getPrototypeOf(Places).apply(this, arguments));
      }

      return Places;
    }(Doc);

    Doc.prototype.organizations = function (n) {
      var match = this.clauses();
      match = match.match('#Place+'); //grab (n)th result

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new Places(match.list, this, this.world);
    };

    return Doc;
  };

  var place = addMethod$1;

  var addMethod$2 = function addMethod(Doc) {
    /**  */
    var Organizations =
    /*#__PURE__*/
    function (_Doc) {
      _inherits(Organizations, _Doc);

      function Organizations() {
        _classCallCheck(this, Organizations);

        return _possibleConstructorReturn(this, _getPrototypeOf(Organizations).apply(this, arguments));
      }

      return Organizations;
    }(Doc);

    Doc.prototype.organizations = function (n) {
      var match = this.clauses();
      match = match.match('#Organization+'); //grab (n)th result

      if (typeof n === 'number') {
        match = match.get(n);
      }

      return new Organizations(match.list, this, this.world);
    };

    return Doc;
  };

  var organization = addMethod$2;

  var methods = [people, place, organization]; //add them all in

  var addMethods = function addMethods(Doc) {
    methods.forEach(function (fn) {
      return fn(Doc);
    }); //combine them with .topics() method

    Doc.prototype.entities = function (n) {
      var r = this.clauses(); // Find people, places, and organizations

      var yup = r.people();
      yup.concat(r.places());
      yup.concat(r.organizations());
      var ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
      yup = yup.not(ignore); //return them to normal ordering

      yup.sort('chronological'); // yup.unique() //? not sure

      if (typeof n === 'number') {
        yup = yup.get(n);
      }

      return yup;
    }; //aliases


    Doc.prototype.things = Doc.prototype.entities;
    Doc.prototype.topics = Doc.prototype.entities;
  };

  var src = addMethods;

  return src;

}));
//# sourceMappingURL=compromise-entities.js.map

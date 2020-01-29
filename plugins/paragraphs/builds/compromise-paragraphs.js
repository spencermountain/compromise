/* compromise-paragraphs 0.0.4 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.compromiseParagraphs = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var addMethods = function addMethods(Paragraphs, Doc) {
    var methods = {
      // return back to a regular Doc object
      sentences: function sentences(n) {
        var list = [];
        this.paragraphs.forEach(function (docs) {
          docs.forEach(function (doc) {
            list = list.concat(doc.list);
          });
        });
        var doc = new Doc(list, this.parent, this.world);

        if (typeof n === 'number') {
          return doc.eq(n);
        }

        return doc;
      },
      // grab every term in the paragraph
      terms: function terms(n) {
        var list = [];
        this.paragraphs.forEach(function (docs) {
          docs.forEach(function (doc) {
            list = list.concat(doc.terms().list);
          });
        });
        var doc = new Doc(list, this.parent, this.world);

        if (typeof n === 'number') {
          return doc.eq(n);
        }

        return doc;
      },

      /** return metadata for each paragraph */
      json: function json() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return this.paragraphs.map(function (docs) {
          var text = docs.map(function (d) {
            return d.text();
          }).join('');
          var obj = {
            text: text,
            sentences: docs.map(function (d) {
              return d.json(options);
            })
          };

          if (options.normal) {
            obj.normal = docs.map(function (d) {
              return d.text('normal');
            }).join('');
          }

          return obj;
        });
      },

      /** print out the text of each paragraph */
      text: function text(options) {
        var text = '';
        this.paragraphs.forEach(function (docs) {
          docs.forEach(function (doc) {
            text += doc.text(options);
          });
        });
        return text;
      },
      // accessor method wrappers
      eq: function eq(n) {
        var list = [this.paragraphs[n]];
        list = list.filter(function (l) {
          return l;
        });
        return new Paragraphs(list, this, this.world);
      },
      first: function first() {
        return this.eq(0);
      },
      last: function last() {
        var len = this.length;
        return this.eq(len - 1);
      },
      debug: function debug() {
        this.paragraphs.forEach(function (docs) {
          console.log('\n=-=-=-=-');
          docs.forEach(function (doc) {
            doc.debug();
          });
        });
      },
      // match methods
      // returns doc objects, not paragraph objects
      match: function match(str) {
        var list = [];
        this.paragraphs.forEach(function (docs) {
          docs.forEach(function (doc) {
            var m = doc.match(str);

            if (m.found) {
              list = list.concat(m.list);
            }
          });
        });
        return new Doc(list, this.parent, this.world);
      },
      // returns doc objects
      not: function not(str) {
        var list = [];
        this.paragraphs.forEach(function (docs) {
          docs.forEach(function (doc) {
            var m = doc.not(str);

            if (m.found) {
              list = list.concat(m.list);
            }
          });
        });
        return new Doc(list, this.parent, this.world);
      },
      // returns paragraph objects
      "if": function _if(str) {
        var list = this.paragraphs.filter(function (docs) {
          return docs.some(function (doc) {
            return doc.has(str);
          });
        });
        return new Paragraphs(list, this, this.world);
      },
      ifNo: function ifNo(str) {
        var list = this.paragraphs.filter(function (docs) {
          return docs.some(function (doc) {
            return doc.has(str) === false;
          });
        });
        return new Paragraphs(list, this, this.world);
      },
      // returns boolean
      has: function has(str) {
        return this.paragraphs.some(function (docs) {
          return docs.some(function (doc) {
            return doc.has(str);
          });
        });
      },
      //loops
      forEach: function forEach(fn) {
        var _this = this;

        this.paragraphs.forEach(function (docs) {
          var p = new Paragraphs([docs], _this, _this.world);
          fn(p);
        });
        return this;
      },
      map: function map(fn) {
        var _this2 = this;

        var paragraphs = this.paragraphs.map(function (docs) {
          var p = new Paragraphs([docs], _this2, _this2.world);
          return fn(p);
        });
        new Paragraphs(paragraphs, this, this.world);
      },
      //each paragraph must have atleast one sentence that matches
      filter: function filter(fn) {
        this.paragraphs = this.paragraphs.filter(function (docs) {
          return docs.some(fn);
        });
        return this;
      }
    }; // aliases

    methods.get = methods.eq;
    Object.keys(methods).forEach(function (k) {
      Paragraphs.prototype[k] = methods[k];
    });
  };

  var methods = addMethods;

  var hasTwoNewline = /\n\n/;

  var addMethods$1 = function addMethods(Doc) {
    /** an abstraction on top of Doc */
    var Paragraphs = function Paragraphs(paragraphs, parent, world) {
      var _this = this;

      _classCallCheck(this, Paragraphs);

      Object.defineProperty(this, 'paragraphs', {
        enumerable: false,
        writable: true,
        value: paragraphs
      });
      this.parent = parent;
      this.world = world; //'found' getter

      Object.defineProperty(this, 'found', {
        get: function get() {
          return _this.paragraphs.length > 0;
        }
      }); //'length' getter

      Object.defineProperty(this, 'length', {
        get: function get() {
          return _this.paragraphs.length;
        }
      });
    }; // add our wrapper methods for Doc


    methods(Paragraphs, Doc); // finder method creates the sentence groups

    Doc.prototype.paragraphs = function (n) {
      var match = this.all();
      var results = [];
      var carry = [];
      match.forEach(function (s) {
        carry.push(s);

        if (hasTwoNewline.test(s.post()[0])) {
          results.push(carry);
          carry = [];
        }
      });

      if (carry.length > 0) {
        results.push(carry);
      }

      if (typeof n === 'number') {
        if (results[n]) {
          results = [results[n]];
        } else {
          results = [];
        }
      }

      return new Paragraphs(results, this, this.world);
    };
  };

  var src = addMethods$1;

  return src;

})));
//# sourceMappingURL=compromise-paragraphs.js.map

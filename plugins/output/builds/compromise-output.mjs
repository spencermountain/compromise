function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {
  !function (r, n) {
    module.exports = n();
  }("undefined" != typeof self ? self : commonjsGlobal, function () {
    return function (r) {
      var n = {};

      function e(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
          i: t,
          l: !1,
          exports: {}
        };
        return r[t].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
      }

      return e.m = r, e.c = n, e.d = function (r, n, t) {
        e.o(r, n) || Object.defineProperty(r, n, {
          enumerable: !0,
          get: t
        });
      }, e.r = function (r) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(r, "__esModule", {
          value: !0
        });
      }, e.t = function (r, n) {
        if (1 & n && (r = e(r)), 8 & n) return r;
        if (4 & n && "object" == _typeof(r) && r && r.__esModule) return r;
        var t = Object.create(null);
        if (e.r(t), Object.defineProperty(t, "default", {
          enumerable: !0,
          value: r
        }), 2 & n && "string" != typeof r) for (var o in r) {
          e.d(t, o, function (n) {
            return r[n];
          }.bind(null, o));
        }
        return t;
      }, e.n = function (r) {
        var n = r && r.__esModule ? function () {
          return r["default"];
        } : function () {
          return r;
        };
        return e.d(n, "a", n), n;
      }, e.o = function (r, n) {
        return Object.prototype.hasOwnProperty.call(r, n);
      }, e.p = "", e(e.s = 0);
    }([function (r, n, e) {

      e.r(n);
      var t = "0123456789abcdef".split("");

      var o = function o(r) {
        for (var n = "", e = 0; e < 4; e++) {
          n += t[r >> 8 * e + 4 & 15] + t[r >> 8 * e & 15];
        }

        return n;
      };

      var u = function u(r) {
        for (var n = r.length, e = 0; e < n; e++) {
          r[e] = o(r[e]);
        }

        return r.join("");
      };

      var f = function f(r, n) {
        return r + n & 4294967295;
      };

      var i = function i(r, n, e, t, o, u, _i) {
        return function (r, n, e) {
          return f(r << n | r >>> 32 - n, e);
        }(n = function (r, n, e, t) {
          return n = f(f(n, r), f(e, t));
        }(r, n, t, u), o, e);
      };

      var a = function a(r, n, e, t, o, u, f, _a) {
        return i(e & t | ~e & o, n, e, u, f, _a);
      };

      var c = function c(r, n, e, t, o, u, f, a) {
        return i(e & o | t & ~o, n, e, u, f, a);
      };

      var l = function l(r, n, e, t, o, u, f, a) {
        return i(e ^ t ^ o, n, e, u, f, a);
      };

      var d = function d(r, n, e, t, o, u, f, a) {
        return i(t ^ (e | ~o), n, e, u, f, a);
      };

      var v = function v(r, n, e) {
        void 0 === e && (e = f);
        var t = r[0],
            o = r[1],
            u = r[2],
            i = r[3],
            v = a.bind(null, e);
        t = v(t, o, u, i, n[0], 7, -680876936), i = v(i, t, o, u, n[1], 12, -389564586), u = v(u, i, t, o, n[2], 17, 606105819), o = v(o, u, i, t, n[3], 22, -1044525330), t = v(t, o, u, i, n[4], 7, -176418897), i = v(i, t, o, u, n[5], 12, 1200080426), u = v(u, i, t, o, n[6], 17, -1473231341), o = v(o, u, i, t, n[7], 22, -45705983), t = v(t, o, u, i, n[8], 7, 1770035416), i = v(i, t, o, u, n[9], 12, -1958414417), u = v(u, i, t, o, n[10], 17, -42063), o = v(o, u, i, t, n[11], 22, -1990404162), t = v(t, o, u, i, n[12], 7, 1804603682), i = v(i, t, o, u, n[13], 12, -40341101), u = v(u, i, t, o, n[14], 17, -1502002290), o = v(o, u, i, t, n[15], 22, 1236535329);
        var s = c.bind(null, e);
        t = s(t, o, u, i, n[1], 5, -165796510), i = s(i, t, o, u, n[6], 9, -1069501632), u = s(u, i, t, o, n[11], 14, 643717713), o = s(o, u, i, t, n[0], 20, -373897302), t = s(t, o, u, i, n[5], 5, -701558691), i = s(i, t, o, u, n[10], 9, 38016083), u = s(u, i, t, o, n[15], 14, -660478335), o = s(o, u, i, t, n[4], 20, -405537848), t = s(t, o, u, i, n[9], 5, 568446438), i = s(i, t, o, u, n[14], 9, -1019803690), u = s(u, i, t, o, n[3], 14, -187363961), o = s(o, u, i, t, n[8], 20, 1163531501), t = s(t, o, u, i, n[13], 5, -1444681467), i = s(i, t, o, u, n[2], 9, -51403784), u = s(u, i, t, o, n[7], 14, 1735328473), o = s(o, u, i, t, n[12], 20, -1926607734);
        var b = l.bind(null, e);
        t = b(t, o, u, i, n[5], 4, -378558), i = b(i, t, o, u, n[8], 11, -2022574463), u = b(u, i, t, o, n[11], 16, 1839030562), o = b(o, u, i, t, n[14], 23, -35309556), t = b(t, o, u, i, n[1], 4, -1530992060), i = b(i, t, o, u, n[4], 11, 1272893353), u = b(u, i, t, o, n[7], 16, -155497632), o = b(o, u, i, t, n[10], 23, -1094730640), t = b(t, o, u, i, n[13], 4, 681279174), i = b(i, t, o, u, n[0], 11, -358537222), u = b(u, i, t, o, n[3], 16, -722521979), o = b(o, u, i, t, n[6], 23, 76029189), t = b(t, o, u, i, n[9], 4, -640364487), i = b(i, t, o, u, n[12], 11, -421815835), u = b(u, i, t, o, n[15], 16, 530742520), o = b(o, u, i, t, n[2], 23, -995338651);
        var p = d.bind(null, e);
        t = p(t, o, u, i, n[0], 6, -198630844), i = p(i, t, o, u, n[7], 10, 1126891415), u = p(u, i, t, o, n[14], 15, -1416354905), o = p(o, u, i, t, n[5], 21, -57434055), t = p(t, o, u, i, n[12], 6, 1700485571), i = p(i, t, o, u, n[3], 10, -1894986606), u = p(u, i, t, o, n[10], 15, -1051523), o = p(o, u, i, t, n[1], 21, -2054922799), t = p(t, o, u, i, n[8], 6, 1873313359), i = p(i, t, o, u, n[15], 10, -30611744), u = p(u, i, t, o, n[6], 15, -1560198380), o = p(o, u, i, t, n[13], 21, 1309151649), t = p(t, o, u, i, n[4], 6, -145523070), i = p(i, t, o, u, n[11], 10, -1120210379), u = p(u, i, t, o, n[2], 15, 718787259), o = p(o, u, i, t, n[9], 21, -343485551), r[0] = e(t, r[0]), r[1] = e(o, r[1]), r[2] = e(u, r[2]), r[3] = e(i, r[3]);
      };

      var s = function s(r) {
        for (var n = [], e = 0; e < 64; e += 4) {
          n[e >> 2] = r.charCodeAt(e) + (r.charCodeAt(e + 1) << 8) + (r.charCodeAt(e + 2) << 16) + (r.charCodeAt(e + 3) << 24);
        }

        return n;
      };

      var b = function b(r, n) {
        var e,
            t = r.length,
            o = [1732584193, -271733879, -1732584194, 271733878];

        for (e = 64; e <= t; e += 64) {
          v(o, s(r.substring(e - 64, e)), n);
        }

        var u = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            f = (r = r.substring(e - 64)).length;

        for (e = 0; e < f; e++) {
          u[e >> 2] |= r.charCodeAt(e) << (e % 4 << 3);
        }

        if (u[e >> 2] |= 128 << (e % 4 << 3), e > 55) for (v(o, u, n), e = 16; e--;) {
          u[e] = 0;
        }
        return u[14] = 8 * t, v(o, u, n), o;
      };

      function p(r) {
        var n;
        return "5d41402abc4b2a76b9719d911017c592" !== u(b("hello")) && (n = function n(r, _n) {
          var e = (65535 & r) + (65535 & _n);
          return (r >> 16) + (_n >> 16) + (e >> 16) << 16 | 65535 & e;
        }), u(b(r, n));
      }

      e.d(n, "md5", function () {
        return p;
      });
    }]);
  });
});
unwrapExports(lib);

var md5 = lib.md5;

var makeHash = function makeHash(doc) {
  var str = doc.text();
  doc.list.forEach(function (p) {
    p.terms().forEach(function (t) {
      str += t.pre + (t.implicit || t.text) + t.post;
      str += Object.keys(t.tags).join('');
    });
  });
  return md5(str);
};

var hash = makeHash;

var n = function n(t, r, u, e) {
  for (var p = 1; p < r.length; p++) {
    var s = r[p],
        h = "number" == typeof s ? u[s] : s,
        a = r[++p];
    1 === a ? e[0] = h : 3 === a ? e[1] = Object.assign(e[1] || {}, h) : 5 === a ? (e[1] = e[1] || {})[r[++p]] = h : 6 === a ? e[1][r[++p]] += h + "" : e.push(a ? t.apply(null, n(t, h, u, ["", null])) : h);
  }

  return e;
},
    t = function t(n) {
  for (var t, r, u = 1, e = "", p = "", s = [0], h = function h(n) {
    1 === u && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(n || e, 0) : 3 === u && (n || e) ? (s.push(n || e, 1), u = 2) : 2 === u && "..." === e && n ? s.push(n, 3) : 2 === u && e && !n ? s.push(!0, 5, e) : u >= 5 && ((e || !n && 5 === u) && (s.push(e, u, r), u = 6), n && (s.push(n, u, r), u = 6)), e = "";
  }, a = 0; a < n.length; a++) {
    a && (1 === u && h(), h(a));

    for (var f = 0; f < n[a].length; f++) {
      t = n[a][f], 1 === u ? "<" === t ? (h(), s = [s], u = 3) : e += t : 4 === u ? "--" === e && ">" === t ? (u = 1, e = "") : e = t + e[0] : p ? t === p ? p = "" : e += t : '"' === t || "'" === t ? p = t : ">" === t ? (h(), u = 1) : u && ("=" === t ? (u = 5, r = e, e = "") : "/" === t && (u < 5 || ">" === n[a][f + 1]) ? (h(), 3 === u && (s = s[0]), u = s, (s = s[0]).push(u, 2), u = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (h(), u = 2) : e += t), 3 === u && "!--" === e && (u = 4, s = s[0]);
    }
  }

  return h(), s;
},
    r = "function" == typeof Map,
    u = r ? new Map() : {},
    e = r ? function (n) {
  var r = u.get(n);
  return r || u.set(n, r = t(n)), r;
} : function (n) {
  for (var r = "", e = 0; e < n.length; e++) {
    r += n[e].length + "-" + n[e];
  }

  return u[r] || (u[r] = t(n));
};

function htm (t) {
  var r = n(this, e(t), arguments, []);
  return r.length > 1 ? r : r[0];
}

var vhtml = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
     module.exports = factory() ;
  })(commonjsGlobal, function () {

    var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

    var esc = function esc(str) {
      return String(str).replace(/[&<>"']/g, function (s) {
        return '&' + map[s] + ';';
      });
    };

    var map = {
      '&': 'amp',
      '<': 'lt',
      '>': 'gt',
      '"': 'quot',
      "'": 'apos'
    };
    var sanitized = {};

    function h(name, attrs) {
      var stack = [];

      for (var i = arguments.length; i-- > 2;) {
        stack.push(arguments[i]);
      }

      if (typeof name === 'function') {
        (attrs || (attrs = {})).children = stack.reverse();
        return name(attrs);
      }

      var s = '<' + name;
      if (attrs) for (var _i in attrs) {
        if (attrs[_i] !== false && attrs[_i] != null) {
          s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
        }
      }

      if (emptyTags.indexOf(name) === -1) {
        s += '>';

        while (stack.length) {
          var child = stack.pop();

          if (child) {
            if (child.pop) {
              for (var _i2 = child.length; _i2--;) {
                stack.push(child[_i2]);
              }
            } else {
              s += sanitized[child] === true ? child : esc(child);
            }
          }
        }

        s += '</' + name + '>';
      } else {
        s += '>';
      }

      sanitized[s] = true;
      return s;
    }

    return h;
  });
});

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<pre>", "</pre>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<span class=", ">", "</span>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var toHtml = function toHtml(doc, segments, options) {
  var h = htm.bind(vhtml);

  if (options.bind) {
    h = htm.bind(options.bind);
  }

  var html = [];
  var arr = doc.segment(segments);
  arr.forEach(function (o) {
    var str = h(_templateObject(), o.segment, o.text);
    html.push(str);
  });
  return h(_templateObject2(), html);
};

var html = toHtml;

var addMethods = function addMethods(Doc) {
  /** generate an md5 hash from the document */
  Doc.prototype.hash = function () {
    return hash(this);
  };
  /** generate sanitized html from the document */


  Doc.prototype.html = function () {
    var segments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return html(this, segments, options);
  };
};

var src = addMethods;

export default src;

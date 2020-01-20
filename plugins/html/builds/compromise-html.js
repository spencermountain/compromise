(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.compromiseHtml = factory());
}(this, (function () { 'use strict';

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

  function htm_module (t) {
    var r = n(this, e(t), arguments, []);
    return r.length > 1 ? r : r[0];
  }

  var htm_module$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': htm_module
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
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
      var setInnerHTMLAttr = 'dangerouslySetInnerHTML';
      var DOMAttributeNames = {
        className: 'class',
        htmlFor: 'for'
      };
      var sanitized = {};

      function h(name, attrs) {
        var stack = [],
            s = '';
        attrs = attrs || {};

        for (var i = arguments.length; i-- > 2;) {
          stack.push(arguments[i]);
        }

        if (typeof name === 'function') {
          attrs.children = stack.reverse();
          return name(attrs);
        }

        if (name) {
          s += '<' + name;
          if (attrs) for (var _i in attrs) {
            if (attrs[_i] !== false && attrs[_i] != null && _i !== setInnerHTMLAttr) {
              s += ' ' + (DOMAttributeNames[_i] ? DOMAttributeNames[_i] : esc(_i)) + '="' + esc(attrs[_i]) + '"';
            }
          }
          s += '>';
        }

        if (emptyTags.indexOf(name) === -1) {
          if (attrs[setInnerHTMLAttr]) {
            s += attrs[setInnerHTMLAttr].__html;
          } else while (stack.length) {
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

          s += name ? '</' + name + '>' : '';
        }

        sanitized[s] = true;
        return s;
      }

      return h;
    });
  });

  var htm = getCjsExportFromNamespace(htm_module$1);

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
    /** generate sanitized html from the document */
    Doc.prototype.html = function () {
      var segments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return html(this, segments, options);
    };
  };

  var src = addMethods;

  return src;

})));
//# sourceMappingURL=compromise-html.js.map

/* compromise-html 0.0.3 MIT */
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

var n = function n(t, s, r, e) {
  var u;
  s[0] = 0;

  for (var h = 1; h < s.length; h++) {
    var p = s[h++],
        a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
    3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
  }

  return e;
},
    t = new Map();

function htm (s) {
  var r = t.get(this);
  return r || (r = new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function (n) {
    for (var t, s, r = 1, e = "", u = "", h = [0], p = function p(n) {
      1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";
    }, a = 0; a < n.length; a++) {
      a && (1 === r && p(), p(a));

      for (var l = 0; l < n[a].length; l++) {
        t = n[a][l], 1 === r ? "<" === t ? (p(), h = [h], r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : '"' === t || "'" === t ? u = t : ">" === t ? (p(), r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (p(), r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);
      }
    }

    return p(), h;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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

var _templateObject, _templateObject2;

var toHtml = function toHtml(doc, segments, options) {
  var h = htm.bind(vhtml);

  if (options.bind) {
    h = htm.bind(options.bind);
  }

  var html = [];
  var arr = doc.segment(segments);
  arr.forEach(function (o) {
    var str = h(_templateObject || (_templateObject = _taggedTemplateLiteral(["<span class=", ">", "</span>"])), o.segment, o.text);
    html.push(str);
  });
  return h(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<pre>", "</pre>"])), html);
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

export default src;

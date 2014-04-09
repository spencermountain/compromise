var conjugate = (function() {

  if (typeof module !== "undefined" && module.exports) {
    rules = require("./rules").rules;
  }

  var main = function(w) {
    var obj, r, _i, _len;
    for (_i = 0, _len = rules.length; _i < _len; _i++) {
      r = rules[_i];
      if (w.match(r.reg)) {
        obj = Object.keys(r.repl).reduce(function(h, k) {
          h[k] = w.replace(r.reg, r.repl[k]);
          return h;
        }, {});
        obj[r.tense] = w;
        return obj;
      }
    }
    return {};
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log(conjugate("walking"))
'use strict';

var addResponses = function addResponses(obj) {
  var _this = this;

  Object.keys(obj).forEach(function (k1) {
    _this.responses[k1] = [];
    Object.keys(obj[k1]).forEach(function (k2) {
      _this.responses[k1].push({
        reg: new RegExp(k2, 'i'),
        res: obj[k1][k2]
      });
    });
  });

  this.responses.find = function (type) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    console.log(_this.responses);
    var tag = _this.responses.hasTagOf(type, list);
    var answer = '';
    if (tag.length > 0) {
      var res = _this.responses[type];
      if (res) {
        res.some(function (r) {
          tag.some(function (t) {
            if (r.reg.test(t)) {
              answer = r.res;
              return true;
            }
          });
          if (answer) {
            return true;
          }
        });
      }
    }
    return answer;
  };

  this.responses.hasTagOf = function (type) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var tag = [];
    list.forEach(function (ls) {
      ls.terms.forEach(function (ts) {
        if (ts.tags[type]) {
          tag.push(ts.normal);
        }
      });
    });
    return tag;
  };
};
module.exports = addResponses;

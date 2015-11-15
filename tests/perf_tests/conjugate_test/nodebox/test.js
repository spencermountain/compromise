//test verb conjugation data.
//conjugate every tense to every tense, for every verb, and find patterns in the errors
var data = require("./data").data
var nlp = require("../../index")

types = [
  "infinitive",
  "present",
  "gerund",
  "past",
]
missed = []
errors = []

var topk = function(the) {
    var length = the.length || 1;
    var freq = {};
    var i = the.length - 1;
    while (i > -1) {
      if (freq[the[i]] == null) {
        freq[the[i]] = 1;
      } else {
        freq[the[i]]++;
      }
      i--;
    }
    var top = Object.keys(freq).sort(function(a, b) {
      return freq[b] - freq[a];
    });
    return top.map(function(v) {
      return {
        value: v,
        count: freq[v]
      };
    });
  }

  function isequal(o1, o2, tense) { // gerund -> present, gerund -> infinitive
    list = [
      "infinitive",
      "present",
      "gerund",
      "past",
    ]
    found = false
    list.forEach(function(t) {
      if (o1[t] !== o2[t]) {
        console.log("  ( " + tense + "-> " + t + ")  " + o1[t] + "  !== " + o2[t])
        missed.push(t)
        found = true
      }
    })
    return found === false
  }

function test_tense(type) {
  console.log("======" + type + "======")
  var goods = 0,
    all = 0;
  data.forEach(function(o) {
    var o1 = nlp.verb(o[type]).conjugate();
    all++
    if (isequal(o, o1, type)) {
      goods++
    } else {
      errors.push(o[type])
    }
  })
  errors = errors.map(function(str) {
    return str.substr(str.length - 5, str.length)
  })
  console.log(goods + "  right of " + all)
  console.log(((goods / (all)) * 100).toFixed(0) + "%")
  // console.log(topk(missed).slice(0, 40))
  console.log(topk(errors).slice(0, 40))
  missed = []
}
for (var i = 0; i < types.length; i++) {
  test_tense(types[i])
}

/*
May 23rd
======infinitive======
6071  right of 8493
71%
======present======
6239  right of 8493
73%
======gerund======
5478  right of 8493
65%
======past======
3376  right of 8493
40%

May 23rd 8:00
======infinitive======
6071  right of 8493
71%
======present======
6239  right of 8493
73%
======gerund======
5478  right of 8493
65%
======past======
6230  right of 8493
73%
*/

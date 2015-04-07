require('dirtyjs')
data = require("./data").data //.slice(0, 10)
// o = {}
// tmp = data.forEach(function(t) {
//   o[t.infinitive] = "VB"
// })
// console.log(o)
conjugate = require("../conjugate")

types = [
  "infinitive",
  "present",
  "gerund",
  "past",
]
missed = []
errors = []

function isequal(o1, o2, tense) { // gerund -> present, gerund -> infinitive
  list = [
    "infinitive",
    "present",
    "gerund",
    "past",
  ]
  // console.log(o2)
  found = false
  list.forEach(function(t) {
    // if (t === 'present') {
      if (o1[t] !== o2[t]) {
        console.log("  ( " + tense + "-> " + t + ")  " + o1[t] + "  !== " + o2[t])
        missed.push(t)
        found = true
      } else {
        // console.log("========  ( " + tense + "-> " + t + ")  " + o1[t] + "  === " + o2[t])
      }
    // }
  })
  return found === false
}


function test_tense(type) {
  console.log("======" + type + "======")
  var goods = 0,
    all = 0;
  data.forEach(function(o) {
    var o1 = conjugate(o[type]);
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
  // console.log(missed.topk().slice(0, 40))
  console.log(errors.topk().slice(0, 40))
  missed = []
}
for (var i = 0; i < types.length; i++) {
  test_tense(types[i])
}



// tmp = data.filter(function(s) {
//   // return s
//   return s.infinitive.match(/[^e]$/)
//   // return s.infinitive.match(/e$/)
// })
// tmp = tmp.map(function(s) {
//   var str = s.past //.replace(/ed$/, '')
//   return str.substr(str.length - 5, str.length)
// }).topk().slice(0, 70)
// console.log(JSON.stringify(tmp, null, 2));

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

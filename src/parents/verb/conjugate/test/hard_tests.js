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

function isequal(o1, o2, tense) {
  list = [
    "infinitive",
    "present",
    "gerund",
    "past",
  ]
  // console.log(o2)
  found = false
  list.forEach(function(t) {
    if (t) {
      if (o1[t] != o2[t]) {
        // console.log("  ( " + tense + "-> " + t + ")  " + o1[t] + "  != " + o2[t])
        found = true
      } else {
        // console.log("========  ( " + tense + "-> " + t + ")  " + o1[t] + "  == " + o2[t])
      }
    }
  })
  return found == false
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
    }
  })
  console.log(goods + "  right of " + all)
  console.log(((goods / (all)) * 100).toFixed(0) + "%")
}
for (var i in types) {
  test_tense(types[i])
}
// require('dirtyjs')
// tmp = data.filter(function(s) {
//   return s.infinitive.match(/[^e]$/)
//   // return s.infinitive.match(/e$/)
// })
// tmp = tmp.map(function(s) {
//   return s.gerund.substr(s.gerund.length - 5, s.gerund.length).replace(/ing$/, '')
// }).topk().slice(0, 10)
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


*/
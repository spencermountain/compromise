data = require("./data").data
// o = {}
// tmp = data.forEach(function(t) {
//   o[t.infinitive] = "VB"
// })
// console.log(o)
conjugate = require("../conjugate").conjugate

types = [
  "infinitive",
  "present",
  "gerund",
  "past",
]

function isequal(o1, o2) {
  return types.every(function(t) {
    return o1[t] == o2[t]
  })
}


function test_tense(type) {
  console.log("======" + type + "======")
  var goods = 0,
    all = 0;
  data.forEach(function(o) {
    var o1 = conjugate(o[type]);
    all++
    if (!isequal(o, o1)) {
      // console.log(o[type] + "   " + o1[type])
    } else {
      goods++
    }
  })
  console.log(goods + "  right")
  console.log(((goods / (all)) * 100).toFixed(0) + "%")
}
for (var i in types) {
  test_tense(types[i])
}
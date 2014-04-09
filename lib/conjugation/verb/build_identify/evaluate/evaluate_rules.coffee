require('dirtyjs')
data= require("./data").data
rules= require("./rules").data


evaluate= (w)->
  for r in rules
    if w.match(r.reg)
      return r.tense


console.log data.length + "in total"

tmp= data.filter (a)->
  evaluate(a[0])

console.log tmp.length + " with results (#{(tmp.length/data.length).toFixed(2)}%)"

tmp= data.filter (a)->
  evaluate(a[0])==a[1]

console.log tmp.length + " with correct results (#{(tmp.length/data.length).toFixed(2)}%)"

tmp= data.filter (a)->
  evaluate(a[0])!=a[1]
console.log  "most misses:"
console.log tmp.map(1).topk()


# 33972 in total
# 19777 with results (0.58%)
# 19737 with correct results (0.58%)
# 99% precision
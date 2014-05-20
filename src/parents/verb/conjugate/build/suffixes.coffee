require("/Users/spencer/mountain/dirty/node_modules/sugar")
require("/Users/spencer/mountain/dirty/dirty.coffee")

data = require("./data").data
obj =
  infinitive: []
  present: []
  gerund: []
  past: []
  past_participle: []

pairs= []
data.forEach (o) ->
   Object.keys(obj).each (k) ->
     suffix= o[k].substr(o[k].length - 3, o[k].length)
     pairs.push([o[k], k])

console.log(JSON.stringify(pairs, null, 2));

suff= {}

#first version
# data.forEach (o) ->
#   Object.keys(obj).each (k) ->
#     obj[k].push o[k].substr(o[k].length - 3, o[k].length)
# Object.keys(obj).each (k) ->
#   obj[k] = obj[k].topkp().filter (t)->t.count>2


#second version
# data.forEach (o) ->
#    Object.keys(obj).each (k) ->
#      suffix= o[k].substr(o[k].length - 3, o[k].length)
#      suff[suffix]=[] if !suff[suffix]
#      suff[suffix].push(k)
# suff= Object.signals(suff).filter (o)->o.count>3

# console.log JSON.stringify(suff, null, 2)



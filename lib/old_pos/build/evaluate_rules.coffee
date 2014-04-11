require("/Users/spencer/mountain/dirty")
lexicon = require("./lexicon").lexicon
rules= require("./new_rules").rules;
# rules= require("./old_rules").rules;

#format old rules
# arr= []
# Object.keys(rules).each (k)->
#   rules[k].each (r)->
#     arr.push {
#         reg:r,
#         pos:k
#       }
# rules= arr
# console.log rules

tmp= []
all= Object.keys(lexicon).spigot (k)->
  rules.some (r)->
    k.match(r.reg) && lexicon[k].toLowerCase().substr(0,2) == r.pos.toLowerCase()

console.log (all.true.length/(all.false.length+all.true.length)).toFixed(2) + " "

#old rules
#32% covereage
#11% correct

#new rules
#29% coverage
#22% correct   75% !!


#without [tr]ed
# 21% covereage
# 19% correct     90%!!


#without  .ing
# 16% coverage
# 13% accuracy
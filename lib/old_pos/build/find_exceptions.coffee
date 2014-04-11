require("/Users/spencer/mountain/dirty")
lexicon = require("./lexicon").lexicon
rules= require("./new_rules").rules;
# rules= require("./old_rules").rules;

arr= []
Object.keys(rules).each (k)->
  rules[k].each (r)->
    arr.push {
        reg:r,
        pos:k
      }
rules= arr

all= Object.keys(lexicon).spigot (k)->
  rules.some (r)->
    if k.match(r.reg)
      if lexicon[k].toLowerCase().substr(0,2) != r.pos.toLowerCase()
        console.log [k, lexicon[k],  r.pos].join("\t")

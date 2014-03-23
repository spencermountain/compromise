require("/Users/spencer/mountain/dirty")
lexicon = require("./lexicon").lexicon
rules= require("./new_rules").rules;
# rules= require("./old_rules").rules;

console.log Object.keys(lexicon).length

obj= {}
all= Object.keys(lexicon).spigot (k)->
  rules.some (r)->
    return k.match(r.reg) && lexicon[k].toLowerCase().substr(0,2) == r.pos.toLowerCase()

all.false.each (k)->
  obj[k]=lexicon[k]

console.log(JSON.stringify(obj, null, 2));
console.log(JSON.stringify(all.false.length, null, 2));
console.log(JSON.stringify(all.true.length, null, 2));
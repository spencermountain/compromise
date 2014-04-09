rules= require("./rules").rules


conjugate= (w)->
  for r in rules
    if w.match(r.reg)
      obj= Object.keys(r.repl).reduce((h, k)->
        h[k]=w.replace(r.reg, r.repl[k])
        h
      ,{})
      obj[r.tense]=w
      return obj
  return {}



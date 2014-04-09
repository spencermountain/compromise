require('dirtyjs')
data=require("./data").data
data=data.map (d)->
  delete d.past_participle
  d

testit = (reg, prop)->
  has= data.filter (d)-> d[prop].match(reg)
  console.log "#{has.length} correct ones #{has.length/data.length}%"
  console.log has.map(prop)
  console.log "=============="

  rest= data.map (d)->
    delete d[prop]
    d
  bads= []
  rest.forEach (d)->
    Object.keys(d).forEach (k)->
      if d[k].match(reg) #&& k=="infinitive"
        console.log d[k]
        bads.push(k)
  console.log bads.topk()
  # all= all.flatten()
  # all= all.filter (d)-> d.match(reg)
  # console.log "#{all.length} false positive"

# testit(/[aeiou].*?ing$/, 'gerund')
# 8437 correct ones 0.9934063346285176%
# 6 false positive
# [ 'upspring',
#   'hamstring',
#   'unstring',
#   'restring',
#   'upswing',
#   'unsling' ]

# testit(/..[^e]ed$/, 'past')
# testit(/[rl]ew$/, 'past')

suffix_patterns= (wants_arr, nots_arr, size=3)->
  patterns=(arr)->
    arr.topkp().filter((p)->p.percent>=0.6).reduce((h,a)->
      h[a.value]=a.count
      h
    ,{})
  suffixes=(arr)->
    arr.map (a)->a.substr(a.length-size, a.length)
  wants= patterns(suffixes(wants_arr))
  nots= patterns(suffixes(nots_arr))
  best= Object.keys(wants).map (p)->
    {
      suffix:p,
      hits:wants[p]
      false_positives:nots[p]||0
      # delta:(wants[p] - (nots[p]||0)).toFixed(2)
    }
  best= best.sort (a,b)->b.hits-a.hits
  best.map (b)->
    b.examples= wants_arr.filter((w)-> w.substr(w.length-size, w.length)==b.suffix).slice(0,4)
    b.exceptions= nots_arr.filter (w)-> w.substr(w.length-size, w.length)==b.suffix
    b

obj= {}
types= ["infinitive", "present", "gerund","past"]
types.each (k)->
  wants= data.map(k)
  nots= data.map((d)->
    delete d[k]
    Object.values(d)
    ).flatten()
  obj[k]=suffix_patterns(wants, nots, 3)

console.log(JSON.stringify(obj, null, 2));
# console.log data.filter((d)-> d.past_participle != d.past).map (d)-> [d.past, d.past_participle]


# console.log(discovered_rules.length)
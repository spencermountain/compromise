require("/Users/spencer/mountain/dirty")
data = require("./data").lexicon;

# console.log Object.values(data).topk()

get_suffixes= (pos, size)->
  split= Object.keys(data).spigot (k)->
    return data[k].match(pos)

  suffix= (str="", k=4)->
    len= str.length || 0
    str.substr((len-k).atleast(0), len)


  #make misses hash
  misses= split.false.map((w)-> return suffix(w,size)).topk().reduce((h,a)->
    h[a.value]=a.count
    h
  ,{})

  #make matches hash
  matches= split.true
  signals= matches.map((w)-> return suffix(w,size)).topk().filter (t)-> return t.count>5 && t.count<7 && !t.value.match(/\\/)
  signals= signals.map (s)->
    s.misses= misses[s.value] || 0
    s.diff= s.count - s.misses
    s.size= size
    s
  signals= signals.sort (a,b)-> return b.diff - a.diff

  #just confident suffixes
  signals= signals.spigot (o)->
    o.misses<7

  return signals.true#.map('value')


all= []
pos= /jj/i
(8).downto(0).each (k)->
  all= all.concat( get_suffixes(pos,k))

all.each (a)->
  console.log a.value + "  " + a.count + "  " + a.misses



# reduce redundant rules..
reducer= (all)->
  return all.filter (a, i)->
    x= [i+1..all.length-1].some (o)->
      reg= new RegExp(all[o]+"$", "gi");
      return all[i].match(reg)
    return !x

##this method learns word categorization rules based on word-suffixes

#tweak these two numbers to find the best results for your data
min_count= 8
min_percentage= 70

require "dirtyjs"
data= require("./data").data#.slice(0,800)
data=data.filter (d)->d[1]=="past"
original= JSON.parse(JSON.stringify(data))
began_with= data.length


make_suffix= (str,k=3)->
  return str.substr(str.length-k, str.length)

endsWith= (str, suffix)->
  return str.indexOf(suffix, str.length - suffix.length) != -1;

rules= []

learn= (size=3, min_count=min_count, min_percentage=min_percentage)->
  obj= {}
  data.forEach (a)->
    suf= make_suffix(a[0],size)
    if suf.length==size
      if !obj[suf]
        obj[suf]=[]
      obj[suf].push(a[1])

  values= []
  Object.keys(obj).forEach (k)->
    obj[k]=obj[k].topkp()
    obj[k].forEach (o)->
      o.confidence= o.percent * o.count
      o.percent= parseInt(o.percent)
      o.count= parseInt(o.count)
      o.key= k
      o.size= size
      values.push(o)

  values= values.filter (o)->
    return o.key && o.value && o.percent > min_percentage && o.count > min_count

  values= values.sort (a,b)->
    return b.confidence-a.confidence

  rules= rules.concat(values)
  found= values.reduce((h,o)->
    h[o.key]=true
    h
  ,{})

  remains= data.filter (arr)->
    suf= make_suffix(arr[0],size)
    return !found[suf]

  killed= data.length - remains.length
  console.log("size: #{size}  - killed-off #{killed}(#{parseInt((killed/began_with)*100)}%) with new #{values.length} rules")
  data= remains
  # console.log(data.length + " remain")
  return values

#first, hard round
#============
min_count= parseInt(began_with * 0.01)
console.log(min_count)
learn(3, min_count, 90)
learn(2, min_count, 90)

#second, soft round
#============
min_count= 10
learn(4, min_count, min_percentage)
learn(3, min_count, min_percentage)
learn(2, min_count, min_percentage)
learn(1, min_count, min_percentage)

# min_count= min_count-3
# console.log(min_count)
# learn(4, min_count, min_percentage)
# learn(3, min_count, min_percentage)
# learn(2, min_count, min_percentage)


test_accuracy=->
  right= 0
  wrong= 0
  caught= 0
  for arr in original
    for r in rules
      if endsWith(arr[0], r.key)
        caught +=1
        if r.value==arr[1]
          right+=1
        else
          wrong+=1
        break
  console.log("cought #{caught} of #{began_with} rows(#{(caught/began_with).toFixed(2)}% recall)  - #{right} right, #{wrong} wrong -  (#{(right/caught).toFixed(2)}% accuracy)")

killed= began_with - data.length
console.log("found #{rules.length} rules, kills #{killed} (#{parseInt((killed/began_with)*100)}%)")

test_accuracy()

# rules= rules.sort (a,b)->
  # return b.confidence-a.confidence
nice= {}
rules.forEach (r)->
  nice[r.key]=r.value
console.log(JSON.stringify(nice, null, 2));


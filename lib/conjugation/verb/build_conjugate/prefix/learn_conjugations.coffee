require('dirtyjs')
data=require("./data").data


longest_prefix= (obj)->
  arr= Object.values(obj)
  x= 0
  for i in [0..arr[0].length]
    if (arr.every (str)->str.at(i)==arr[0].at(i))
      x= i
  str= arr[0].substr(0,x)
  {
    prefix:str
    "infinitive": obj.infinitive.substr(str.length, obj.infinitive.length),
    "present": obj.present.substr(str.length, obj.present.length),
    "gerund": obj.gerund.substr(str.length, obj.gerund.length),
    "past": obj.past.substr(str.length, obj.past.length)
  }


all=  {
    "infinitive": [],
    "present": [],
    "gerund": [],
    "past": []
  }

data= data.map (obj)->
  longest_prefix obj

data.forEach (obj)->
  Object.keys(all).each (k)->
    all[k].push(obj[k])

 Object.keys(all).each (k)->
  all[k]=all[k].topk().filter (f)-> f.count>1

console.log(JSON.stringify(all, null, 2));



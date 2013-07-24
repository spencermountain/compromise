freebase= require('freebase');


adjective= "totally"
topic= "first world war"
freebase.sentence(topic,{},(sentence)->
  console.log sentence.replace(/\W(is|was|will|were|are) (an?|the)\W/, " $1 #{adjective} $2 ")
  )

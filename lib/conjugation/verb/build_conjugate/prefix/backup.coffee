require("dirtyjs")
data=require("./data").data
arr= data.map('infinitive').filter (r)-> r.match(/[aiou]$/)
console.log arr


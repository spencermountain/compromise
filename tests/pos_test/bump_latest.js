//this soft-test measures changes in pos using reference text from wikipedia
//it prints-out a nice diff of changes in the current nlp.pos()
var texts = require("./texts")
var latest = require("./latest")
var nlp = require("../../index")
var fs = require("fs")

function print_new_results() {
  var all = {}
  Object.keys(texts).forEach(function(k) {
    var done = nlp.pos(texts[k]);
    var results = done.sentences.map(function(s) {
      return s.tags()
    })
    all[k] = results
  })
  var str= "//these are the latest results of nlp.pos() from ./texts.js -  generated using ./index\n"
  str+="module.exports=" +JSON.stringify(all,null,1)
  fs.writeFile(__dirname+"/latest.js", str, function(err){console.log(err||"done!")})
}

print_new_results()

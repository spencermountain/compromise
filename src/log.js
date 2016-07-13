var chalk = require('chalk')

var padLeft = (str, size, padwith) => {
  if (size <= str.length) {
    return '';
  }
  return Array(size - str.length + 1).join(padwith || '0')
}

var make_spaces = (times) => {
  var arr = []
  for (var i = 0; i < times; i++) {
    arr[i] = ' '
  }
  return arr.join('')
}

var nc='\033[0m'
var c = {
  red: (s)=>"\033[0;31m"+s+nc,
  green:(s)=>"\033[0;32m"+s+nc,
  orange:(s)=>"\033[0;33m"+s+nc,
  yellow:(s)=>"\033[1;33m"+s+nc,
  blue: (s)=>"\033[0;34m"+s+nc,
  purple: (s)=>"\033[0;35m"+s+nc,
}

var method={
  tagger:c.red,
  transform:c.blue,
}

var pretty={}
pretty.Sentence=(s, pad)=>{
    console.log(pad+'[Sentence] '+c.red(s.input))
    s.terms.forEach((t)=>{
      console.log(pad+'   '+c.green('- '+t.text)+'   ['+t.constructor.name+']')
    })
  }
pretty.Text=(t, pad)=>{
  console.log(pad+'[Text] '+c.red(t.input))
  t.sentences.forEach((s)=>{
    pretty.Sentence(s, pad+'   ')
  })
}


var adhoc=(o, pad)=>{
  var c=o.constructor.name
  if(pretty[c]){
    pretty[c](o, pad)
    return
  }
}

var debug = function(str, where) {
  where=where||''
  var margin = 4
  var path=where.split('/')
  var nestBy = (path.length) * margin
  if(!where){
    nestBy=0
  }
  var padding = make_spaces(nestBy)
  if(typeof str==='object'){
    adhoc(str, padding)
    return
  }
  //add color
  if(method[path[0]]){
    str=method[path[0]](str)
  }
  console.log(padding + str)
}

var noop=function(){}

var log=function(should){
  if(should===true){
    return debug
  }
  return noop
}
module.exports = log

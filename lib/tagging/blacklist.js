
var notends={
"the" : true,
"los" : true,
"les" : true,
"san" : true,
"dr" : true,
"they" : true,
"he" : true,
"she" : true,
"a" : true,
"his" : true,
"an" : true,
"their" : true,
"its" : true,
"it's" : true,
"my" : true,
"your" : true,
"or":true,
"if" : true,
"therefor":true,
"therefore":true,
};

var dateword=[
"july",
"august",
"september",
"october",
"november",
"december",
"january",
"february",
"march",
"april",
"may",
"june",
"monday",
"tuesday",
"wednesday",
"thursday",
"friday",
"saturday",
"sunday"
]

function endsWith(word, string){
    if (!string || !word || string.length > word.length)
        return false;
    return word.indexOf(string) == word.length - string.length;
}


  //various sanitychecks
var pass=function(gram){
  if(!gram){return false;}

  //length constraints
  if(gram.length<3){return false;}
  if(gram.length>50){return false;}

  //appropriate word-sizes
  var word=gram.match(/[a-z|_]*/i)[0]
  if(!word || word.length>25){return false;}
  if(!gram.match(/[a-z]{3}/i)){return false}


  //stopwords
  gram=gram.toLowerCase();
 if(silly[gram]){
    return false
  }
  //silly endings
  for(var i in notends){
    i=' '+i;
    if(endsWith(gram, i)){
      return false
    }
  }
  //ban dates
  for(var i in dateword){
    if(gram.match(dateword[i])){
       var reg=new RegExp('^[0-9]{1,4},? '+dateword[i]);
       var reg1=new RegExp(dateword[i]+',? [0-9]{1,4}$');
       if(gram.match(reg) || gram.match(reg1)){
         return false;
        }
    }
  }
  //ban numerical words
  if(gram.match(/^[0-9]{1,4}(th|st|rd)$/)){return false}
  //punctuation
  if(gram.match(/(\[|\]|\{|\}|\||_|;|\)|\(|\\|\>|\<|\+|\=|\")/)){return false}
  //no vowel
  if(!gram.match(/(a|e|i|o|u)/)){return false}

  return true;
}

console.log('strawberry'+pass('strawberry'))


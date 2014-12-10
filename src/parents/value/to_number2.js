"use strict";
//these sets of numbers each have different rules
var ones = { 'a': 1, 'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, }
var teens={  'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19 }
var tens={ 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90 }
var multiples = { 'hundred': 100, 'grand': 1000, 'thousand': 1000, 'million': 1000000, 'billion': 1000000000, 'trillion': 1000000000000, 'quadrillion': 1000000000000000, 'quintillion': 1000000000000000000, 'sextillion': 1000000000000000000000, 'septillion': 1000000000000000000000000, 'octillion': 1000000000000000000000000000, 'nonillion': 1000000000000000000000000000000, 'decillion': 1000000000000000000000000000000000, };


var main = function(s) {
    //remember these concerns for possible errors
    var ones_done=false
    var teens_done=false
    var tens_done=false
    var multiples_done={}
    var total=0
    //pretty-printed numbers
    s = s.replace(/, ?/g, '')
    //try to finish-fast
    if(parseInt(s) || parseFloat(s)){
      return parseInt(s)||parseFloat(s)
    }

   //do each word in turn..
    var words = s.toString().split(/[\s-]+/);
    var w, x;
    for(var i =0; i<words.length; i++){
        w=words[i]
        console.log(w +"  "+ ones_done+"  " + teens_done+"  " + tens_done )
        //skip 'and' eg. five hundred and twelve
        if(w=="and"){continue}
        //ones rules
        if(ones[w]){
            if(ones_done){return }// eg. five seven
            if(teens_done){return }// eg. five seventeen
            ones_done=true
            total+=ones[w]
            continue
        }
        //teens rules
        if(teens[w]){
            if(ones_done){return }// eg. five seventeen
            if(teens_done){return }// eg. fiveteen seventeen
            teens_done=true
            total+=teens[w]
            continue
        }
        //tens rules
        if(tens[w]){
            if(ones_done){return }// eg. five seventy
            if(teens_done){return }// eg. fiveteen seventy
            if(tens_done){return }// eg. twenty seventy
            tens_done=true
            total+=tens[w]
            continue
        }
        //multiples rules
        if(multiples[w]){
            if(multiples_done[w]){return }// eg. five hundred six hundred
            multiples_done[w]=true
            //reset our concerns. allow 'five hundred five'
            ones_done=false
            teens_done=false
            tens_done=false
            total*=multiples[w]
            continue
        }
        //if word is not a known thing now, die
        return


    }
    return total


}
console.log(main("six hundred and twelve"))
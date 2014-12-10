var to_number = (function() {
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
    var current_sum=0;
    for(var i =0; i<words.length; i++){
      w=words[i]
      // console.log(w +"  "+ ones_done+"  " + teens_done+"  " + tens_done )
      // console.log(total)
      //skip 'and' eg. five hundred and twelve
      if(w=="and"){continue}
      //ones rules
      if(ones[w]){
        if(ones_done){return }// eg. five seven
        if(teens_done){return }// eg. five seventeen
        ones_done=true
        current_sum+=ones[w]
        continue
      }
      //teens rules
      if(teens[w]){
        if(ones_done){return }// eg. five seventeen
        if(teens_done){return }// eg. fiveteen seventeen
        teens_done=true
        current_sum+=teens[w]
        continue
      }
      //tens rules
      if(tens[w]){
        if(ones_done){return }// eg. five seventy
        if(teens_done){return }// eg. fiveteen seventy
        if(tens_done){return }// eg. twenty seventy
        tens_done=true
        current_sum+=tens[w]
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
        current_sum*=multiples[w]
        total+=current_sum
        current_sum=0
        continue
      }
      //if word is not a known thing now, die
      return
    }
    if(current_sum){
        total+=current_sum
    }
    return total
  }

  //kick it into module
  if (typeof module !== "undefined" && module.exports) {
     module.exports = main;
  }
  return main;
})();




function run_tests(){
  tests=[
    ["twenty two thousand five hundred",22500],
    ["two thousand five hundred and sixty",2560],
    ["a hundred and two",102],
    ["a hundred",100],
    ["seven",7],
    ["seven grand",7000],
    // ["half a million",500000],
    // ["half-million",500000],
    // ["quarter-million",250000],
    // ["a quarter million",250000],
    // ["a quarter-grand",250],
    // ["four and a half",6],
    // ["ten and a half million",15000000],
    ["104",104],
    ["13 thousand",13000],
    ["17,983",17983],
    ["12:32",null],
    ["123-1231",null],
    ["seven eleven",null],
    ["ten-four",null],
    ["one seven", null],
    ["one ten", null],
    ["one twelve", null],
    ["one thirty", null],
    ["nine fifty", null],
    ["five six", null],
    ["nine seventy", null],
    ["nine hundred", 900],
    ["nine two hundred", null],
    ["twenty one hundred", 2100],
    ["ten one", null],
    ["twelve one", null],
    ["twenty one", 21],
    ["seventy two", 72],
    ["seventy five two", null],
    ["two hundred two", 202],
    ["two hundred three hundred", null],
    ["one thousand one", 1001],
    ["minus five hundred", -500],
    ["minus fifteen", -15],
    // ["hundred one", null],  //ignore this case for now
    // ["twenty hundred", null], //?
    // ["one twenty", null],
    // ["twenty five twenty", null],
    // ["", null],
    // ["minus zero", 0],
    ]
    var r;
    tests.forEach(function(a){
        r=to_number(a[0])==a[1]
        if(!r){
            console.log('--'+a[0]+'--' + to_number(a[0]))
        }
        console.log(r)
    })
}
run_tests()
// console.log(to_number("minus zero"))

// console.log(to_number("two thousand five hundred"))
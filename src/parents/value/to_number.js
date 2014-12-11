// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiples not repeat

var to_number = (function() {
  "use strict";
  //these sets of numbers each have different rules
  //[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
  var ones = { 'a': 1, 'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, "first": 1, "second": 2, "third": 3, "fourth": 4, "fifth": 5, "sixth": 6, "seventh": 7, "eighth": 8, "ninth": 9}
  var teens={  'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, "eleventh": 11, "twelfth": 12, "thirteenth": 13, "fourteenth": 14, "fifteenth": 15, "sixteenth": 16, "seventeenth": 17, "eighteenth": 18, "nineteenth": 19 }
  var tens={ 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90, "twentieth": 20, "thirtieth": 30, "fourtieth": 40, "fiftieth": 50, "sixtieth": 60, "seventieth": 70, "eightieth": 80, "ninetieth":90 }
  var multiples = { 'hundred': 100, 'grand': 1000, 'thousand': 1000, 'million': 1000000, 'billion': 1000000000, 'trillion': 1000000000000, 'quadrillion': 1000000000000000, 'quintillion': 1000000000000000000, 'sextillion': 1000000000000000000000, 'septillion': 1000000000000000000000000, 'octillion': 1000000000000000000000000000, 'nonillion': 1000000000000000000000000000000, 'decillion': 1000000000000000000000000000000000}
  // var decimal_multiples={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};


  var main = function(s) {
    //remember these concerns for possible errors
    var ones_done=false
    var teens_done=false
    var tens_done=false
    var multiples_done={}
    var total=0
    var global_multiplier=1
    //pretty-printed numbers
    s = s.replace(/, ?/g, '')
    //parse-out currency
    s=s.replace(/[$£€]/,'')
    //try to finish-fast
    if(s.match(/[0-9]\.[0-9]/) && parseFloat(s)==s){
      return parseFloat(s)
    }
    if(parseInt(s)==s){
      return parseInt(s)
    }
    //try to die fast. (phone numbers or times)
    if (s.match(/[0-9][-:][0-9]/)) {
        return null
    }

    //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
    var mults = [{
        reg: /^(minus|negative)[\s-]/i,
        mult: -1
    },{
        reg: /^(a\s)?half[\s-](of\s)?/i,
        mult: 0.5
    }, {
        reg: /^(a\s)?quarter[\s-]/i,
        mult: 0.25
    }]
    for(i=0; i<mults.length; i++){
      if(s.match(mults[i].reg)){
        global_multiplier=mults[i].mult
        s=s.replace(mults[i].reg,'')
        break
      }
    }

     //do each word in turn..
    var words = s.toString().split(/[\s-]+/);
    var w, x;
    var current_sum=0;
    var local_multiplier=1
    var decimal_mode=false
    for(var i =0; i<words.length; i++){
      w=words[i]

      //skip 'and' eg. five hundred and twelve
      if(w=="and"){continue}

      //..we're doing decimals now
      if(w=="point" || w=="decimal"){
        if(decimal_mode){return}//two point one point six
        decimal_mode=true
        total+=current_sum
        current_sum=0
        ones_done=false
        local_multiplier=0.1
        continue
      }

      //handle special rules following a decimal
      if(decimal_mode){
        x=null
        //allow consecutive ones in decimals eg. 'two point zero five nine'
        if(ones[w]!=null){ x=ones[w]}
        if(teens[w]!=null){ x=teens[w]}
        if(parseInt(w)==w){ x=parseInt(w)}
        if(!x){return }
        if(x<10){
          total+= x * local_multiplier
          local_multiplier=local_multiplier * 0.1 // next number is next decimal place
          current_sum=0
          continue
        }
        //two-digit decimals eg. 'two point sixteen'
        if(x<100){
          total+= x * (local_multiplier*0.1)
          local_multiplier=local_multiplier * 0.01 // next number is next decimal place
          current_sum=0
          continue
        }
      }

      //if it's already an actual number
      if(w.match(/^[0-9]\.[0-9]$/)){
        current_sum+=parseFloat(w)
        continue
      }
      if(parseInt(w)==w){
        current_sum+=parseInt(w)
        continue
      }


      //ones rules
      if(ones[w]!=null){
        if(ones_done){return }// eg. five seven
        if(teens_done){return }// eg. five seventeen
        ones_done=true
        current_sum+=ones[w]
        continue
      }
      //teens rules
      if(teens[w]){
        if(ones_done){return }// eg. five seventeen
        if(teens_done){return }// eg. fifteen seventeen
        if(tens_done){return }// eg. sixty fifteen
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
        //case of 'hundred million', (2 consecutive multipliers)
        if(current_sum==0){
          total= total || 1 //dont ever multiply by 0
          total*=multiples[w]
        }
        else{
          current_sum*= multiples[w]
          total+=current_sum
        }
        current_sum=0
        continue
      }
      //if word is not a known thing now, die
      return
    }
    if(current_sum){
        total+= (current_sum||1) * local_multiplier
    }
    //combine with global multiplier, like 'minus' or 'half'
    total= total * global_multiplier
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
    ["half a million",500000],
    ["half-million",500000],
    ["quarter-million",250000],
    ["a quarter million",250000],
    ["a quarter-grand",250],
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
    ["five hundred million", 500000000],
    ["sixty fifteen hundred", null],
    ["$12.03", 12.03],
    ["$12", 12],
    ["5 hundred", 500],
    ["5.2 thousand", 5200],
    ["million",1000000],
    ["hundred one", 101],
    ["one twenty", null],
    ["twenty five twenty", null],
    ["", null],
    ["minus fifty", -50],
    ["twenty thousand", 20000],
    ["four point six", 4.6],
    ["nine hundred point five", 900.5],
    ["sixteen hundred sixteen point eight", 1616.8],
    ["four point seven nine", 4.79],
    ["four point sixteen", 4.16],
    ["twenty first", 21],
    ["fifty ninth", 59],
    ["nine hundred fiftieth", 950],
    ["four point six", 4.6],

    //hundredth, millionth, thousandth are ambiguous
    // ["two tenths", 0.2],
    // ["two thousandth", 0.002],
    // ["sixteen hundredth", 0.016],

    //this is tricky to do, but possible
    // ["four and a half", 4.5],
    // ["ten and a half million",15000000],

    // ["four point seven seven", 4.77], //??? shitbags javascipt float bug?
    // ["twenty hundred", null], //? there's an idiomatic rule against this, though technically fine.
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
// run_tests()

// console.log(to_number("sixteen hundredth"))
// console.log(to_number("four point seven seven"))

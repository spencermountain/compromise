var to_number = (function() {

    var numbers = {
        'a': 1,
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90
    }
    var hundreds = {
        'hundred': 100,
        'grand': 1000,
        'thousand': 1000,
        'million': 1000000,
        'billion': 1000000000,
        'trillion': 1000000000000,
        'quadrillion': 1000000000000000,
        'quintillion': 1000000000000000000,
        'sextillion': 1000000000000000000000,
        'septillion': 1000000000000000000000000,
        'octillion': 1000000000000000000000000000,
        'nonillion': 1000000000000000000000000000000,
        'decillion': 1000000000000000000000000000000000,
    };

    var unit= function(num){
      var l=(""+num+"").length
      //syntactically, ones & teens are same rules
      if(num<20 && num>0){
        l=1
      }
      return l
    }

    var main = function(s) {
        var multiplier = 1
        var total = 0;
        var g = 0;
        var units_done={}
        var ones_digit_done=false
        //pretty-printed numbers
        s = s.replace(/, ?/g, '')
        //dont do phone numbers or times
        if (s.match(/[0-9][-:][0-9]/)) {
            return null
        }
        //support things like 'half-million' by doing 'million' then multiply by 0.5
        var mults = [{
            reg: /^minus[\s-]/i,
            mult: -1
        },{
            reg: /^(a\s)?half[\s-]/i,
            mult: 0.5
        }, {
            reg: /^(a\s)?quarter[\s-]/i,
            mult: 0.25
        }, {
            reg: /and[\s-]a[\s-]half\b/i,
            mult: 1.5
        }]
        for (var i = 0; i < mults.length; i++) {
            if (s.match(mults[i].reg)) {
                multiplier = mults[i].mult;
                s = s.replace(mults[i].reg, ' ')
            }
        }
        s=s.replace(/^ ?/g,'')
        s=s.replace(/ $/g,'')
        //do each word in turn..
        var words = s.toString().split(/[\s-]+/);
        var w;
        var num;
        for(var i =0; i<=words.length; i++){
            w=words[i]
            //skip over 'and'
            if (w == "and") {
                continue
            }
            //it's a known number word, like 'three'
            if (numbers[w]!=null) {
                w = numbers[w];
            }
            //it's a magnitude, like 'hundred'
            if (hundreds[w]) {
                //reset units_done, to allow 'two thousand two..'
                units_done={}
                units_done[unit(hundreds[w])]=true
                total += (hundreds[w] * (g || 1)) //dont ever multiply it by 0
                g = 0;
            }

            //it's a number, like '4'
            // console.log(w + "   "+JSON.stringify(units_done))
            if (parseFloat(w)) {
                var num = parseFloat(w)
                var l=unit(num)
                //kill things like twelve fifteen
                if(units_done[l]){
                    return null
                }
                units_done[l]=true
                g += num
            }
        }
        return (total + g) * multiplier
    }


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
    ["four and a half",6],
    ["ten and a half million",15000000],
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
    ["one twenty", null],
    ["nine fifty", null],
    ["five six", null],
    ["nine seventy", null],
    ["nine hundred", 900],
    ["nine two hundred", null],
    ["twenty hundred", null], //?
    ["twenty one hundred", 2100],
    // ["hundred one", null],  //ignore this case for now
    ["ten one", null],
    ["twelve one", null],
    ["twenty one", 21],
    ["seventy two", 72],
    ["seventy five two", null],
    ["two hundred two", 202],
    ["two hundred three hundred", null],
    ["twenty five twenty", null],
    ["one thousand one", 1001],
    ["minus five hundred", -500],
    ["minus fifteen", -15],
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
// console.log(to_number("minus five hundred"))

// one
// two
// three
// four
// five
// six
// seven
// eight
// nine
// ten
// eleven
// twelve
// thirteen
// fourteen
// fifteen
// sixteen
// seventeen
// eighteen
// nineteen
// [hundreds]
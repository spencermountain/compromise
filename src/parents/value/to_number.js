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


    var main = function(s) {
        s = s.replace(/, ?/g, '')
        //dont do phone numbers or times
        if (s.match(/[0-9][-:][0-9]/)) {
            return null
        }
        var multiplier = 1
        var total = 0;
        var g = 0;
        //things like 'half-million'
        var mults = [{
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
        var a = s.toString().split(/[\s-]+/);
        var status;
        var die = false //die on things like 'ten four'
        a.forEach(function(w) {
            if (w == "and") {
                return
            }
            if (parseFloat(w)) { //it's already a number, like '4'
                var x = parseFloat(w)
                if (x < 20 && x > 0) {
                    if (status == "tens") {
                        die = true
                    }
                    g += x
                    status = "tens"
                } else {
                    status = null
                    g += x
                }
            } else if (numbers[w]) { //it's a known value, like 'three'
                var x = numbers[w];
                if (x < 20 && x > 0) {
                    if (status == "tens") {
                        die = true
                    }
                    g += x
                    status = "tens"
                } else {
                    status = null
                    g += x
                }
            } else if (hundreds[w]) { //it's a magnitude, like 'hundred'
                total += (hundreds[w] * (g || 1)) //dont ever multiply it by 0
                g = 0;
                status = null
            }
        });
        if (die) {
            return null
        }
        return (total + g) * multiplier
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }
    return main;
})();

// console.log(to_number("twenty two thousand five hundred") == 22500)
// console.log(to_number("two thousand five hundred and sixty") == 2560)
// console.log(to_number("a hundred and two") == 102)
// console.log(to_number("a hundred") == 100)
// console.log(to_number("seven") == 7)
// console.log(to_number("seven grand") == 7000)
// console.log(to_number("half a million") == 500000)
// console.log(to_number("half-million") == 500000)
// console.log(to_number("quarter-million") == 250000)
// console.log(to_number("a quarter million") == 250000)
// console.log(to_number("a quarter-grand") == 250)
// console.log(to_number("four and a half") == 6)
// console.log(to_number("ten and a half million") == 15000000)
// console.log(to_number("104") == 104)
// console.log(to_number("13 thousand") == 13000)
// console.log(to_number("17,983") == 17983)
// console.log(to_number("12:32") == null)
// console.log(to_number("123-1231") == null)
// console.log(to_number("seven eleven") == null)
// console.log(to_number("ten-four") == null)
//terms that are "CD", a 'value' term
var values = (function() {

  var main = [
    //numbers
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
    'hundred',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',

    //dates
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
    "january",
    "february",
    // "march",
    "april",
    // "may",
    "june",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].reduce(function(h,s){
    h[s]="CD"
    return h
  },{})

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }

  return main
})()

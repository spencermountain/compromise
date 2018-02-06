var test = require('tape');
var nlp = require('../../lib/nlp');

test('to_number:', function(t) {
  [
    ['twenty two thousand five hundred', 22500],
    ['two thousand five hundred and sixty', 2560],
    ['a hundred and two', 102],
    ['a hundred', 100],
    ['seven', 7],
    ['seven grand', 7000],
    ['104', 104],
    ['13 thousand', 13000],
    ['17,983', 17983],
    ['nine hundred', 900],
    ['twenty one hundred', 2100],
    ['twenty one', 21],
    ['seventy two', 72],
    ['two hundred two', 202],
    ['one thousand one', 1001],
    ['minus five hundred', -500],
    ['minus fifteen', -15],
    ['five hundred million', 500000000],
    // ['$12.03', 12.03],
    // ['$12', 12],
    ['5 hundred', 500],
    ['5.2 thousand', 5200],
    ['million', 1000000],
    ['hundred one', 101],
    ['minus fifty', -50],
    ['twenty thousand', 20000],
    ['four point six', 4.6],
    ['nine hundred point five', 900.5],
    ['sixteen hundred sixteen point eight', 1616.8],
    ['four point seven nine', 4.79],
    ['four point sixteen', 4.16],
    ['twenty first', '21st'],
    ['fifty ninth', '59th'],
    ['nine hundred fiftieth', '950th'],
    ['nine hundred and second', '902nd'],
    ['five thousand nine hundred fiftieth', '5950th'],
    ['six hundred and fifty nine', 659],
    ['six hundred and fifty nine thousand', 659000],
    [950, 950],
    [999999950, 999999950],
    [8080999999950, 8080999999950],
    ['fifteen million and two', 15000002],
    ['six hundred and eighteen', 618],
    ['two hundred thousand', 200000],
    ['six million ninety', 6000090],
    ['twenty-two hundred', 2200],

    ['two million five hundred thousand', 2500000],
    ['one billion five hundred thousand', 1000500000],
    ['one billion five hundred thousand and eight', 1000500008],
    ['a million fifty thousand and eight', 1050008],
    ['a million twenty five thousand and fifty-two', 1025052],
    ['minus two million twenty five thousand and eighty', -2025080],

    ['7 hundred and 8 thousand', 708000],
    ['2 hundred and sixty 9 thousand seven hundred', 269700],
    ['2 hundred and six million 7 hundred thousand seven hundred', 206700700],

    ['minus 70', -70],
    ['minus eight', -8],
    ['minus 8 hundred', -800],
    ['twenty-seven hundred', 2700],
    ['minus eight thousand two hundred', -8200],
    ['twenty-five', 25],
    ['half a million', 500000],
    ['five hundred eighteen', 518],
    ['eighty eight point nine nine', 88.99],
    ['minus eighty eight point nine nine', -88.99],
    // ['1/2', 1 / 2],
    // ['-1/5', -1 / 5],
    // ['-1 1/10', -1 - 1 / 10],
    // ['1 1/20', 1 + 1 / 20],
    // ['1/2 million', 500000],
    // ['1 1/2 million', 1500000],
    ['negative five', -5],
    ['negative hundred', -100],
    // ['12:32', ''],
    // ['123-1231', ''],
    ['seven eleven', '7 11'],
    ['ten-four', '10 4'],
    ['one seven', '1 7'],
    ['one ten', '1 10'],
    ['one twelve', '1 12'],
    ['one thirty', '1 30'],
    ['nine fifty', '9 50'],
    ['five six', '5 6'],
    ['nine seventy', '9 70'],
    ['nine two hundred', '9 200'],
    ['ten one', '10 1'],
    ['twelve one', '12 1'],
    ['seventy five two', '75 2'],
    // ['two hundred three hundred', '200 300'], //tricky
    ['sixty fifteen hundred', '60 1500'],
    ['one twenty', '1 20'],
    ['twenty five twenty', '25 20']
  // ['',''],
  // [null,''],
  ].forEach(function(a) {
    var num = nlp(a[0]).values().toNumber().out('text');
    var want = String(a[1]) || a[0];
    var msg = '\'' + a[0] + '\' - - have: \'' + num + '\'   want:\'' + a[1] + '\'';
    t.equal(num, String(want), msg);
  });
  t.end();
});

test('all-to-number:', function(t) {
  var num = nlp('1st').values().numbers()[0];
  t.equal(num, 1, '1st');
  num = nlp('1').values().numbers()[0];
  t.equal(num, 1, '1');
  num = nlp('first').values().numbers()[0];
  t.equal(num, 1, 'first');
  num = nlp('one').values().numbers()[0];
  t.equal(num, 1, 'one');
  //long-numbers
  num = nlp('55575').values().numbers()[0];
  t.equal(num, 55575, '55575');
  num = nlp('55,575').values().numbers()[0];
  t.equal(num, 55575, '55,575');
  num = nlp('55,575.279').values().numbers()[0];
  t.equal(num, 55575.279, '55,575.279');
  num = nlp('$55,575').values().numbers()[0];
  t.equal(num, 55575, '$55,575');
  //decimals
  num = nlp('2.5').values().numbers()[0];
  t.equal(num, 2.5, '2.5');
  num = nlp('2.5th').values().numbers()[0];
  t.equal(num, 2.5, '2.5th');
  //two-terms
  num = nlp('fifty seven').values().numbers()[0];
  t.equal(num, 57, 'fifty seven');
  num = nlp('fifty 7').values().numbers()[0];
  t.equal(num, 57, 'fifty 7');
  num = nlp('2 hundred').values().numbers()[0];
  t.equal(num, 200, '2 hundred');
  num = nlp('2 hundredth').values().numbers()[0];
  t.equal(num, 200, '2 hundredth');

  t.end();
});

var test = require('tape');
var nlp = require('../../lib/nlp');

test('sentence tokenize:', function(t) {
  [
    ['Tony is nice. He lives in Japan.', 2],
    ['I like that Color', 1],
    [
      'Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that\'s fine, etc. and you can attend Feb. 8th. Bye',
      3
    ],
    ['Soviet bonds to be sold in the U.S. market. Everyone wins.', 2],
    ['Hi there! Everyone wins!', 2],
    ['Hi there!!! Everyone wins.', 2],
    ['Hi there\u203C Everyone wins\u203C', 2],
    ['Hi there\u203C Everyone wins.', 2],
    ['he bought Yahoo! the company.', 1],
    ['he is ill', 1],
    ['he is ill.', 1],
    ['he is ill\u2047', 1],
    ['she is fine. he is ill.', 2],
    ['she is fine. he is ill', 2],
    ['lkajsdflkjeicclksdfjefifh', 1],
    ['i think it is good ie. fantastic.', 1],
    ['i think it is good i.e. fantastic.', 1],
    ['You did what\u2048', 1],
    ['You did what\u2048 How could you\u2049', 2],
    ['i think it is good or else.', 1],
    ['i think it is good… or else.', 1],
    ['i think it is good… ', 1],
    ['i think it is good ... or else.', 1],
    ['i think it is good ... ', 1],
    ['What\'s my age again? What\'s my age again?', 2],
    ['the problem, eg. the javascript', 1],
    ['Dr. Tony is nice. He lives on Elm St. in Vancouver BC. Canada', 2],
    ['I made $5.60 today in 1 hour of work.  The E.M.T.\'s were on time, but only barely.', 2],

    ['In some notations, A or B is shown as A|B. In others A or B is shown as A||B.', 2],
    ['hello. 1234. ëėö.', 3],

    // Linux EOL
    ['Hi there.\nEveryone wins.', 2],
    ['Hi there!\n\nEveryone wins.', 2],
    ['Hi there\nEveryone wins', 2],
    ['Hi there.\n Everyone wins', 2],
    ['Hi there!!\nEveryone wins\n\n', 2],

    // Mac EOL
    ['Hi there.\rEveryone wins.', 2],
    ['Hi there!\r\rEveryone wins.', 2],
    ['Hi there\rEveryone wins', 2],
    ['Hi there.\r Everyone wins', 2],
    ['Hi there!!\rEveryone wins\r\r', 2],

    // Windows EOL
    ['Hi there.\r\nEveryone wins.', 2],
    ['Hi there!\r\n\r\nEveryone wins.', 2],
    ['Hi there\r\nEveryone wins', 2],
    ['Hi there.\r\n Everyone wins', 2],
    ['Hi there!!\r\nEveryone wins\r\n\r\n', 2]
  ].forEach(function(a) {
    var num = nlp(a[0]).list.length;
    var msg = '"' + a[0] + '" ->  ' + num;
    t.equal(num, a[1], msg);
  });
  t.end();
});

test('fancy tokenize:', function(t) {
  var doc = nlp('boris becker ?? he is nice.');
  t.equal(doc.sentences().length, 2, 'sentence-split');

  // doc = nlp('Is Trump the president of U.S. ? i guess so')
  // t.equal(doc.sentences().length, 2, 'sentence-split-2')
  t.end();
});

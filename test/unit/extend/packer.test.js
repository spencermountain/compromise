var test = require('tape');
// var nlp = require('../lib/nlp');
const packPrefix = require('../../../src/world/pack/packPrefix');
const unpackPrefix = require('../../../src/world/pack/unpack');

let plurals = {
  addendum: 'addenda',
  barracks: 'barracks',
  beau: 'beaux',
  leaf: 'leaves',
  libretto: 'libretti',
  loaf: 'loaves',
  man: 'men',
  matrix: 'matrices',
  memorandum: 'memoranda',
  modulus: 'moduli',
  mosquito: 'mosquitoes',
  move: 'moves',
  opus: 'opera',
  ovum: 'ova',
  ox: 'oxen',
  tableau: 'tableaux',
  thief: 'thieves',
  tooth: 'teeth',
  tornado: 'tornados',
  tuxedo: 'tuxedos',
  zero: 'zeros'
};

test('pack-plurals', function(t) {
  let str = packPrefix(plurals);
  let unpacked = unpackPrefix(str);
  t.deepEqual(plurals, unpacked, 'in==out');
  t.end();
});

test('packPlural-edge-cases', function(t) {
  let input = {
    aaaaaaa: 'aaaaaaa', //equal
    aaaaaaaa: 'bb', //shorter
    aa: 'bbbbbbb', //longer
    a: 'a and some b' //spaces
    // 'abba, disco|dance': 'fun, cool|haus' //reserved
  };
  let str = packPrefix(input);
  let output = unpackPrefix(str);
  t.deepEqual(input, output, 'in==out');

  t.end();
});

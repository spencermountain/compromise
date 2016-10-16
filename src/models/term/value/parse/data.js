const p = require('../paths');
const numbers = p.data.numbers;

//setup number-word data
const ones = Object.assign({}, numbers.ordinal.ones, numbers.cardinal.ones);
const teens = Object.assign({}, numbers.ordinal.teens, numbers.cardinal.teens);
const tens = Object.assign({}, numbers.ordinal.tens, numbers.cardinal.tens);
const multiples = Object.assign({}, numbers.ordinal.multiples, numbers.cardinal.multiples);

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples
};

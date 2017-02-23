const p = require('../paths');
const numbers = p.data.numbers;
const fns = p.fns;

//setup number-word data
const ones = fns.extend(numbers.ordinal.ones, numbers.cardinal.ones);
const teens = fns.extend(numbers.ordinal.teens, numbers.cardinal.teens);
const tens = fns.extend(numbers.ordinal.tens, numbers.cardinal.tens);
const multiples = fns.extend(numbers.ordinal.multiples, numbers.cardinal.multiples);

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples
};

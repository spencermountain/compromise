
//
const findNouns = function(doc) {
  // let m = doc.match('#Noun+');
  var m = doc.clauses();
  m = m.match('#Noun+ (of|by)? the? #Noun+?');
  //nouns that we don't want in these results, for weird reasons
  m = m.not('#Pronoun');
  m = m.not('(there|these)');
  m = m.not('(#Month|#WeekDay)'); //allow Durations, Holidays
  // /allow possessives like "spencer's", but not generic ones like,
  m = m.not('(my|our|your|their|her|his)');
  m = m.not('(of|for|by|the)$');

  return m;
};
module.exports = findNouns;

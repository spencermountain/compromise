//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.
'use strict';
const honourifics = require('./honourifics'); //stored seperately, for 'noun.is_person()'

//common abbreviations
let main = [
  'arc', 'al', 'exp', 'rd', 'st', 'dist', 'mt', 'fy', 'pd', 'pl', 'plz', 'tce', 'llb', 'md', 'bl', 'ma', 'ba', 'lit',
  'ex', 'eg', 'ie', 'circa', 'ca', 'cca', 'vs', 'etc', 'esp', 'ft', 'bc', 'ad'
];

//person titles like 'jr', (stored seperately)
main = main.concat(honourifics);

//org main
let orgs = [
  'dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co', 'corp',
  //proper nouns with exclamation marks
  'yahoo', 'joomla', 'jeopardy'
];
main = main.concat(orgs);

//place main
let places = [
  'ala', 'ariz', 'ark', 'cal', 'calif', 'col', 'colo', 'conn', 'del', 'fed', 'fla', 'fl', 'ga', 'ida', 'ind', 'ia', 'la', 'kan', 'kans', 'ken', 'ky', 'la', 'md', 'mich', 'minn', 'mont', 'neb', 'nebr', 'nev', 'okla', 'penna', 'penn', 'pa', 'dak', 'tenn', 'tex', 'ut', 'vt', 'va', 'wash', 'wis', 'wisc', 'wy', 'wyo', 'usafa', 'alta', 'ont', 'que', 'sask', 'yuk',
  'ave', 'blvd', 'cl', 'ct', 'cres', 'hwy'
];
main = main.concat(places);

//date abbrevs.
//these are added seperately because they are not nouns
let dates = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'sept', 'sep'];
main = main.concat(dates);

module.exports = {
  abbreviations: main,
  dates: dates,
  orgs: orgs,
  places: places
};

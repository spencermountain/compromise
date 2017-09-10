//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
const nouns = [
  ['addendum', 'addenda'],
  ['alga', 'algae'],
  ['alumna', 'alumnae'],
  ['alumnus', 'alumni'],
  ['appendix', 'appendices'],
  ['avocado', 'avocados'],
  ['bacillus', 'bacilli'],
  ['barracks', 'barracks'],
  ['beau', 'beaux'],
  ['cactus', 'cacti'],
  ['chateau', 'chateaux'],
  ['child', 'children'],
  ['château', 'châteaux'],
  ['corpus', 'corpora'],
  ['criterion', 'criteria'],
  ['curriculum', 'curricula'],
  ['database', 'databases'],
  ['deer', 'deer'],
  ['echo', 'echoes'],
  ['embargo', 'embargoes'],
  ['epoch', 'epochs'],
  ['foot', 'feet'],
  ['genus', 'genera'],
  ['goose', 'geese'],
  ['halo', 'halos'],
  ['hippopotamus', 'hippopotami'],
  ['index', 'indices'],
  ['larva', 'larvae'],
  ['leaf', 'leaves'],
  ['libretto', 'libretti'],
  ['loaf', 'loaves'],
  ['man', 'men'],
  ['matrix', 'matrices'],
  ['memorandum', 'memoranda'],
  ['modulus', 'moduli'],
  ['mosquito', 'mosquitoes'],
  ['move', 'moves'],
  ['opus', 'opera'],
  ['ovum', 'ova'],
  ['ox', 'oxen'],
  ['person', 'people'],
  ['phenomenon', 'phenomena'],
  ['quiz', 'quizzes'],
  ['radius', 'radii'],
  ['referendum', 'referenda'],
  ['rodeo', 'rodeos'],
  ['sex', 'sexes'],
  ['shoe', 'shoes'],
  ['sombrero', 'sombreros'],
  ['stomach', 'stomachs'],
  ['syllabus', 'syllabi'],
  ['tableau', 'tableaux'],
  ['thief', 'thieves'],
  ['tooth', 'teeth'],
  ['tornado', 'tornados'],
  ['tuxedo', 'tuxedos'],
  ['zero', 'zeros']
];

//this is a little verbose...
let lex = {};
let toSingle = {};
let toPlural = {};
for (let i = 0; i < nouns.length; i++) {
  let s = nouns[i][0];
  let p = nouns[i][1];
  lex[s] = 'Singular';
  lex[p] = 'Plural';
  toSingle[p] = s;
  toPlural[s] = p;
}
module.exports = {
  lexicon: lex,
  toSingle: toSingle,
  toPlural: toPlural
};
console.log(toPlural);

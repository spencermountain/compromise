var test = require('tape');
var nlp = require('../../lib/nlp');

//(from https://brenocon.com/JustesonKatz1995.pdf)
// AN: linear function; lexical ambiguity; mobile phase
// NN: regression coefficients; word sense; surface area
// AAN: Gaussian random variable; lexical conceptual paradigm; aqueous mobile
// phase
// ANN: cumulative distribution function; lexical ambiguity resolution; accessible
// surface area
// NAN: mean squared error; domain independent set; silica based packing
// NNN: class probability function; text analysis system; gradient elution chromatography
// NPN: degrees of freedom; [no example]; energy of adsorption

test('noun-phrases', function(t) {
  [
    ['he was a person of interest in the case', 'person of interest'],
    ['he was the mayor of chicago', 'mayor of chicago'],
    ['he was the captain of the football team', 'captain of the football team'],
    ['he was the Knight	of the Round Table', 'knight of the round table'],
    ['i was in the pit of despair', 'pit of despair'],
    ['she is a piece of work', 'piece of work'],
    ['business and desire', 'business'],
    ['day and night', 'day'],
    ['i saw the central processing unit', 'central processing unit'],
    ['built a binary tree', 'binary tree'],
    ['it had good air-flow', 'air flow'],
    ['the 5-person chairlift', '5-person chairlift'],
    ['he had the right of way', 'right of way'],
    ['my retail bank sucks', 'retail bank'],
    ['my activation code isn\'t working', 'activation code'],
    ['my speech recognition system', 'speech recognition system'],
    ['a typical machine learning documentary film', 'machine learning documentary film'],
    ['every cold war re-enactment is boring', 'cold war reenactment'],
    ['two slices of cranberry', 'slices of cranberry'],
  ].forEach(function(a) {
    var str = nlp(a[0]).nouns(0).out('normal');
    t.equal(str, a[1], a[0] + ' -> "' + str + '"');
  });
  t.end();
});

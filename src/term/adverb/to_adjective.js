//turns 'quickly' into 'quick'
'use strict';
const to_adjective = function(str) {
  const irregulars = {
    'idly': 'idle',
    'sporadically': 'sporadic',
    'basically': 'basic',
    'grammatically': 'grammatical',
    'alphabetically': 'alphabetical',
    'economically': 'economical',
    'conically': 'conical',
    'politically': 'political',
    'vertically': 'vertical',
    'practically': 'practical',
    'theoretically': 'theoretical',
    'critically': 'critical',
    'fantastically': 'fantastic',
    'mystically': 'mystical',
    'pornographically': 'pornographic',
    'fully': 'full',
    'jolly': 'jolly',
    'wholly': 'whole'
  };
  const transforms = [{
    'reg': /bly$/i,
    'repl': 'ble'
  }, {
    'reg': /gically$/i,
    'repl': 'gical'
  }, {
    'reg': /([rsdh])ically$/i,
    'repl': '$1ical'
  }, {
    'reg': /ically$/i,
    'repl': 'ic'
  }, {
    'reg': /uly$/i,
    'repl': 'ue'
  }, {
    'reg': /ily$/i,
    'repl': 'y'
  }, {
    'reg': /(.{3})ly$/i,
    'repl': '$1'
  }];
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str;
};

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
module.exports = to_adjective;

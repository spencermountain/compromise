'use strict';
//generic named-entity-recognition

const blacklist = {
  man: true,
  woman: true,
  girl: true,
  boy: true,
  father: true,
  mother: true,
  sister: true,
  brother: true,
};

const consolidate = function(topics) {
  let names = {};
};


const spot = function(s) {
  let topics = [];
  s.terms.forEach((t, i) => {
    //some stop-words
    if (blacklist[t.normal]) {
      return false;
    }
    //grab person, place, locations
    if (t.pos['Location'] || t.pos['Organization']) {
      topics.push([t.normal, 'location/org']);
      return true;
    }
    if (t.pos['Person'] && !t.pos['Pronoun']) {
      topics.push([t.normal, 'person']);
      return true;
    }
    //add capitalized nouns...
    if (i !== 0 && t.pos['Noun'] && t.is_capital()) {
      //no dates, or values
      if (t.pos['Value'] || t.pos['Date'] || t.pos['Pronoun']) {
        return false;
      }
      topics.push([t.normal, 'capital']);
      return true;
    }

  });
  return topics;
};

module.exports = spot;

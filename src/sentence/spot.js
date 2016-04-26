'use strict';
//generic named-entity-recognition

const blacklist = {
  man: true,
  woman: true,
  girl: true,
  boy: true,
  guy: true,
  father: true,
  mother: true,
  sister: true,
  brother: true,
};

const consolidate = function(topics) {
  let names = {};
  for(let i = 0; i < topics.length; i++) {
    let normal = topics[i].root();
    if (normal) {
      names[normal] = names[normal] || {
        count: 0,
        text: normal
      };
      names[normal].count += 1;
    }
  }
  //sort by freq
  let arr = Object.keys(names).map((k) => names[k]);
  return arr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
  });
};


const spot = function(s) {
  let topics = [];
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //some stop-words
    if (blacklist[t.normal]) {
      continue;
    }
    //grab person, place, locations
    if (t.pos['Place'] || t.pos['Organization']) {
      topics.push(t);
      continue;
    }
    if (t.pos['Person'] && !t.pos['Pronoun']) {
      topics.push(t);
      continue;
    }
    //add capitalized nouns...
    if (i !== 0 && t.pos['Noun'] && t.is_capital()) {
      //no dates, or values
      if (t.pos['Value'] || t.pos['Date'] || t.pos['Pronoun']) {
        continue;
      }
      topics.push(t);
    }
  }
  return consolidate(topics);
};

module.exports = spot;

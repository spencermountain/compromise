'use strict';
//parse '5 days before', 'three weeks after'..
const durations = {
  year: true,
  quarter: true,
  month: true,
  week: true,
  weekend: true,
  day: true,
  hour: true,
};

const parsePunt = (r) => {
  let direction = null;
  let duration = {};
  //two days after
  let m = r.match('#Value #Duration (from|after|following)');
  if (m.found) {
    direction = 'forward';
  } else {
    //two days before
    m = r.match('#Value #Duration (before)');
    if (m.found) {
      direction = 'backward';
    }
  }
  //interpret 'value + duration'
  if (m.found) {
    r.match('#Value #Duration').list.forEach((ts) => {
      let num = ts.match('*').values().data()[0] || {};
      num = num.number;
      if (num || num === 0) {
        let str = ts.match('#Duration').nouns().toSingular().out('normal');
        if (durations[str]) {
          duration[str] = num;
        }
      }
    });
  }
  return {
    direction: direction,
    duration: duration
  };
};
module.exports = parsePunt;

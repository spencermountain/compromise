'use strict';
const paths = require('../../paths');
const fns = paths.fns;
const tagset = paths.tags;

//a nicer logger for the client-side
const clientSide = (t) => {
  let color = 'silver';
  let tags = Object.keys(t.tags);
  for(let i = 0; i < tags.length; i++) {
    if (tagset[tags[i]] && tagset[tags[i]].color) {
      color = tagset[tags[i]].color;
      break;
    }
  }
  let word = fns.leftPad(t.text, 12);
  word += ' ' + tags;
  console.log('%c ' + word, 'color: ' + color);
};
module.exports = clientSide;

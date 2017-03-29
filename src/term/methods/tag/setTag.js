'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;
const fns = path.fns;

const putTag = (term, tag, reason) => {
  //already got this
  if (term.tags[tag] === true) {
    return;
  }
  term.tags[tag] = true;
  log.tag(term, tag, reason);

  //extra logic per-each POS
  if (tagset[tag]) {
    //drop any conflicting tags
    let enemies = tagset[tag].enemy;
    for (let i = 0; i < enemies.length; i++) {
      delete term.tags[enemies[i]];
    }
    //apply implicit tags
    if (tagset[tag].is) {
      let doAlso = tagset[tag].is;
      if (term.tags[doAlso] !== true) {
        putTag(term, doAlso, '- - ' + tag); //recursive
      }
    }
  }
};

//give term this tag, as well as its parents
const kickOff = function (term, tag, reason) {
  if (!tag || !term) {
    return;
  }
  //handle multiple tags
  if (fns.isArray(tag)) {
    tag.forEach((t) => tagDeep(term, t, reason)); //recursive
    return;
  }
  tag = tag.replace(/^#/, '');
  putTag(term, tag, reason);
};

module.exports = kickOff;

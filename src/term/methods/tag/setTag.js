'use strict';
//set a term as a particular Part-of-speech
const path = require('../../paths');
const log = path.log;
const fns = path.fns;
const unTag = require('./unTag');
// const tagset = path.tags;
const tagset = require('../../../tagset');

const putTag = (term, tag, reason) => {
  tag = tag.replace(/^#/, '');
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
      if (term.tags[enemies[i]] === true) {
        unTag(term, enemies[i], reason);
      }
    }
    //apply implicit tags
    if (tagset[tag].is) {
      let doAlso = tagset[tag].is;
      if (term.tags[doAlso] !== true) {
        putTag(term, doAlso, ' --> ' + tag); //recursive
      }
    }
  }
};

//give term this tag
const wrap = function (term, tag, reason) {
  if (!term || !tag) {
    return;
  }
  //handle multiple tags
  if (fns.isArray(tag)) {
    tag.forEach((t) => putTag(term, t, reason)); //recursive
    return;
  }
  putTag(term, tag, reason);
  //add 'extra' tag (for some special tags)
  if (tagset[tag] && tagset[tag].also !== undefined) {
    putTag(term, tagset[tag].also, reason);
  }
};

module.exports = wrap;

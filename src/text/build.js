'use strict';
const Text = require('./index');
const tokenize = require('./tokenize');
const paths = require('./paths');
const Terms = paths.Terms;
const fns = paths.fns;

const fromString = (str, world) => {
  let sentences = [];
  //allow pre-tokenized input
  if (fns.isArray(str)) {
    sentences = str;
  } else {
    str = fns.ensureString(str);
    sentences = tokenize(str);
  }
  let list = sentences.map(s => Terms.fromString(s, world));

  let doc = new Text(list, world);
  //give each ts a ref to the result
  doc.list.forEach(ts => {
    ts.refText = doc;
  });
  return doc;
};
module.exports = fromString;

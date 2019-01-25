const organizations = require('./organizations');
const acronyms = require('./acronyms');
const possessives = require('./possessives');

//some 'deeper' tagging, based on some basic word-knowledge
const inference = function(doc) {
  let termArr = doc.list.map((p) => p.terms());
  acronyms(doc, termArr);
  organizations(doc, termArr);
  possessives(doc, termArr);
  return doc;
};
module.exports = inference;

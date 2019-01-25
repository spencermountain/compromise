const tagOrgs = require('./organizations');
const tagAcrynoms = require('./acronyms');
const misc = require('./misc');
//
const corrections = function(doc) {
  let termArr = doc.list.map((p) => p.terms());
  tagAcrynoms(doc, termArr);
  tagOrgs(doc, termArr);
  misc(doc, termArr);
  return doc;
};
module.exports = corrections;

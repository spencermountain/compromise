
//
const tagAcronyms = function(doc, termArr) {
  termArr.forEach((terms) => {
    terms.forEach((t) => {
      if (t.isAcronym()) {
        t.tag(['Acronym', 'Noun'], 'acronym-step');
      }
    });
  });
  return doc;
};
module.exports = tagAcronyms;

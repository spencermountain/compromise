const apostrophes = /[\'‘’‛‵′`´]/;
//decide if an apostrophe s is a contraction or not
// 'spencer's nice' -> 'spencer is nice'
// 'spencer's house' -> 'spencer's house'

//these are always contractions
const blacklist = [
  'it\'s',
  'that\'s'
];
//
const tagPossessive = function(doc, termArr) {
  termArr.forEach((terms) => {
    for(let i = 0; i < terms.length; i += 1) {
      let t = terms[i];

      //known false-positives
      if (blacklist.hasOwnProperty(t.text) === true) {
        continue;
      }
      //an end-tick (trailing apostrophe) - flanders', or Carlos'
      if (apostrophes.test(t.postText)) {
        t.tag(['Possessive', 'Noun'], 'end-tick');
        continue;
      }
    }
  });
  return doc;
};
module.exports = tagPossessive;

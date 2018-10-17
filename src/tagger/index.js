const lookups = require("./01-lookups");

const tagger = function(doc) {
  //check against any known-words
  doc = lookups(doc);
  return doc;
};
module.exports = tagger;

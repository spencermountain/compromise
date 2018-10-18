const lookups = require('./01-lookups');
const fallbacks = require('./02-fallbacks');
const contractions = require('./03-contractions');
const corrections = require('./04-corrections');

const tagger = function(doc) {
  // check against any known-words
  doc = lookups(doc);

  // gotta be something. ¯\_(:/)_/¯
  doc = fallbacks(doc);

  //support "didn't" & "spencer's"
  doc = contractions(doc);

  // wiggle-around the tags, so they make more sense
  doc = corrections(doc);
  return doc;
};
module.exports = tagger;

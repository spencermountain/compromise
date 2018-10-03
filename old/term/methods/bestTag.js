'use strict';
// const tagSet = require('../paths').tags;
const boringTags = {
  Auxiliary: 1,
  Possessive: 1,
  TitleCase: 1,
  ClauseEnd: 1,
  Comma: 1,
  CamelCase: 1,
  UpperCase: 1,
  Hyphenated: 1,
  VerbPhrase: 1,
  EndBracket: 1,
  StartBracket: 1,
  Parentheses: 1,
  Quotation: 1,
};

const bestTag = function(t) {
  const tagSet = t.world.tags;
  let tags = Object.keys(t.tags);
  tags = tags.sort(); //alphabetical, first
  //then sort by #of parent tags
  tags = tags.sort((a, b) => {
    //bury the tags we dont want
    if (!tagSet[a]) {
      return 1;
    }
    if (boringTags[b] || !tagSet[b]) {
      return -1;
    }
    if (tagSet[a].downward.length > tagSet[b].downward.length) {
      return 1;
    }
    return 1;
  });
  return tags[0];
};
module.exports = bestTag;

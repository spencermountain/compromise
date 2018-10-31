const hasSpace = / /;

//add whitespace to the start of the second bit
const addWhitespace = function(two) {
  let firstWord = two[0];
  if (hasSpace.test(firstWord.preText) === false) {
    firstWord.preText = ' ' + firstWord.preText;
  }
};

//insert this segment into the linked-list
const stitchIn = function(first, two) {
  let end = first[first.length - 1];
  let afterId = end.next;
  //connect ours in ([original] → [ours])
  end.next = two[0].id;
  //stich the end in  ([ours] -> [after])
  two[two.length - 1].next = afterId;
};

//recursively increase the length of all parent phrases
const stretchAll = function(doc, id, len) {
  //find our phrase to stretch
  let phrase = doc.list.find((p) => p.hasId(id));
  phrase.length += len;
  if (doc.from) {
    stretchAll(doc.from, id, len);
  }
};

//append one phrase onto another
const joinPhrase = function(first, two, doc) {
  let firstTerms = first.terms();
  let twoTerms = two.terms();
  //spruce-up the whitespace issues
  addWhitespace(twoTerms);
  //insert this segment into the linked-list
  stitchIn(firstTerms, twoTerms);
  //increase the length of our phrases
  stretchAll(doc, firstTerms[0].id, two.length);
  return first;
};
module.exports = joinPhrase;

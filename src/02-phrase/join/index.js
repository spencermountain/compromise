//insert this segment into the linked-list
const stitchIn = function(first, two) {
  let end = first[first.length - 1];
  let afterId = end.next;
  //stitch our first term in
  end.next = two[0].id;
  //stich the end in
  two[two.length - 1].next = afterId;
};


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
  //insert this segment into the linked-list
  stitchIn(firstTerms, twoTerms);
  //increase the length of our first segment
  // stretchPhrase(first, two);
  stretchAll(doc, firstTerms[0].id, two.length);
  return first;
};
module.exports = joinPhrase;

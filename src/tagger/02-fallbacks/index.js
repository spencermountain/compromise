const checkNeighbours = require('./01-neighbours');
//
const fallbacks = function(doc) {
  let terms = doc.termList();
  let world = doc.world;
  //if it's empty, consult it's neighbours, first
  checkNeighbours(terms, world);
  return doc;
};
module.exports = fallbacks;

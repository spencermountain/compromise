
//
const findNouns = function(doc) {
  let m = doc.match(['pool', 'party']);
  return m;
};
module.exports = findNouns;

const findIndex = function(terms, id) {
  let index = terms.findIndex(t => t.id === id);
  if (index === -1) {
    console.warn('Could not find term with id: ' + id);
  }
  return index;
};

//overwrite backward-links
const repairBackWard = function(term) {
  for(let i = terms.length - 1; i > 0; i -= 1) {
    console.log(terms[i], i);
  }
};

module.exports = {
  findIndex: findIndex
};

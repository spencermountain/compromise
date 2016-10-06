'use strict';
//lump all consecutive terms together into one term
//(used internally, but also exposed)
const combine = function(r) {

  // [groups] of #TitleCase
  // #TitleCase [groups]

  // air #Country
  // bank of #Place
  // #Place bank
  // #TitleCase (network|motors|capital|inc|co|brothers|entertainment|productions)
  // #TitleCase and (son|sons|brothers|co)
  //#Demonym central? bank
  // #Place stock? exchange

  // #Place city? united? (sc|fc)
  // fc #Place

  return r;
};

module.exports = combine;

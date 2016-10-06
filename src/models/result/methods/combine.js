'use strict';
//lump all consecutive terms together into one term
//(used internally, but also exposed)
const combine = function(r) {

  // (federal|royal|national|regional|local|District)

  // [groups] (of|du|de) #TitleCase
  // #TitleCase [groups]

  // air #Country
  // #TitleCase (and|&) (son|sons|brothers|co)
  // #Place stock? exchange

  // #Place city? united? (sc|fc)
  // fc #Place
  // #Organization of #Place
  //league of


  //a #Organization ->no
  //(Bay|gulf) of
  //north atlantic ocean
  //north thames river
  //Cardiff University School of (Medicine|law)
  //toronto college of art and design
  //cardiff law school
  return r;
};

module.exports = combine;

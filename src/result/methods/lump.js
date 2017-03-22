'use strict';

const lumpMethods = (Text) => {

  const methods = {

    lump: function () {
      this.list.forEach((ts) => { ts.lump(); });
      return this;
    },
    
    lumpIntoParent: function(tags, description)
    {
      for(let mI = this.list.length-1; mI >= 0; mI--){
        let firstTerm = this.list[mI].firstTerm();
        let lastTerm = this.list[mI].lastTerm();

        this.parent.lumpIntoOne(firstTerm, lastTerm, tags, description);

        // let lumpedTerm = this.list[mI].lump(); 
        // lumpedTerm.tagAs(tags, description);

        
      }

      return this.parent;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = lumpMethods;

'use strict';
const combine = require('../../tagger/lumper/combine');

const lumpMethods = (Terms) => {

  const methods = {

    lump: function () {
      while(this.terms.length>1)
      {
        combine(this, 0);
      }

      return this;
    },
    lumpIntoOne: function(startTerm, endTerm, tag, tagReason){
       
       if(startTerm==endTerm)
       {
          startTerm.tagAs(tag, tagReason);
          return startTerm;         
       }

       let terms = startTerm.parentTerms;
       let endTermIndex = endTerm.index();
       let startTermIndex = startTerm.index(); 
       
        for(let i = endTermIndex -1; i>=startTermIndex; i--){
           combine(terms, i);
        }

        terms.terms[startTermIndex].tagAs(tag, tagReason);

        return terms;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = lumpMethods;

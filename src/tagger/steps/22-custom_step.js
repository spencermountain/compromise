'use strict';
const path = 'tagger/customPass';

const customStep = (ts, customRules) => {
  
if(customRules == null) return;

  //single term expressions first
    for (let i = 0; i < ts.terms.length; i++) {
      let t = ts.terms[i];
      
      for(let x = 0; x < customRules.singleTermRegularExpressions.length; x++)
      {
          let customExpression = customRules.singleTermRegularExpressions[x];

          if(t.text.match(customExpression.regX))
          {
              t.tagAs(customExpression.tags, customExpression.description);
          }
      }
    }

  //lumps second
    for(let x = 0; x < customRules.lumpExpressions.length; x++){
      let customExpression = customRules.lumpExpressions[x];

      ts.match(customExpression.match).tag(customExpression.tags, customExpression.description);
    }

    return ts;
};
module.exports = customStep;

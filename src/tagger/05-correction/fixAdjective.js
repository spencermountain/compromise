
//
const fix = function(doc) {
  //still good
  doc.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
  //big dreams, critical thinking
  doc.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense');
  //will secure our
  doc.match('will [#Adjective]').tag('Verb', 'will-adj');
  //cheering hard - dropped -ly's
  doc.match('#PresentTense (hard|quick|long|bright|slow)').lastTerm().tag('Adverb', 'lazy-ly');
  //his fine
  doc.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine');
  //
  doc.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb');
  return doc;
};
module.exports = fix;

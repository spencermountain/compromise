
/*
Upcoming:

#Swear
#Yelling

.normalize({
  --light--
  spaces:true, // two-spaces after period, etc
  yelling:true // 
  newlines:true // 
  
  --medium--
  removeDashes:true, //'like - this',
  removeHyphens:true, // like-this
  removeHonorics:true,
  removeEmoji:true,
  removeEmoticons:true,
  butcherUnicode:true
  removeSomePunctuation:true // commas, semicolons - keep sentence-ending
  expandContractions:true
  noPeriodsInAcronyms:true
  removeSomeQuotationMarks:true, - 
  removeExpressions:true, -  'gee', 'dang', etc.
  
  --heavy--
  removeParentheses:true, - 
  removeQuotations:true, - 
  resolvePronouns: true, // 'he' -> 'john'
  removeAdverbs: true,
  noPossessives: true, // moe's -> moe
  noPlurals: true,
  noFutureTense: true,
  noPastTense: true,


})
  add normalize methods as plugin

compression:
  simplify() - lossy english substitutions
  toRoot()
  tag reduction

*/
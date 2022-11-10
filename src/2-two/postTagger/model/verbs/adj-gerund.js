export default [
  // that were growing
  { match: '(that|which) were [%Adj|Gerund%]', group: 0, tag: 'Gerund', reason: 'that-were-growing' },


  // repairing crubling roads
  { match: '#Gerund [#Gerund] #Plural', group: 0, tag: 'Adjective', reason: 'hard-working-fam' },


  // { match: '(that|which) were [%Adj|Gerund%]', group: 0, tag: 'Gerund', reason: 'that-were-growing' },

]
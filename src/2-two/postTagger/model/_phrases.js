// Clause fragments shared by the main and second-pass rule tables.
const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #Adv+? #Adj+?'
const subject = `${modifiers} ${noun}`
const predicate = '#Adv+? not? (#V && !#Ger && !#Particle)'

export { subject, predicate }

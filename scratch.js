// const nlp = require('./src/index')
import nlp, { model } from './src/index.js'

// nlp.verbose(true)
let doc = nlp(`no doubt approx. 5mins`)
// console.log(doc.json())
// doc.match('#Noun van [<name>.]').debug()
// doc.cache()
doc.debug()

console.log(model.lexicon.cres)
// write off
// went down

/*
['zero in','#Verb #Particle']
['glacier','#Singular']
['glaciers','#Plural']
['withers','#PresentTense']
['wither','#Infinitive']
['german','#Demonym']
['germans','#Demonym']
['germans','#Plural']
['write off','#Infinitive #PhrasalVerb']
['writes off','#PhrasalVerb #Particle']
['wrote off','#PastTense #Particle']
['tided over','#PastTense #Particle']
['cres','#Abbreviation']
*/

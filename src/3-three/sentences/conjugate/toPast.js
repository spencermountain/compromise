import agree from './_lib.js'

// only present-tense verbs follow, skipping a run-on infinitive-list - 'to walk, sit and eat'
const narrow = (verbs, s) => verbs.if('#Pres').not(s.match('to #Verb+ #Conj #Verb').terms())

export default agree('past', 'toPastTense', narrow)

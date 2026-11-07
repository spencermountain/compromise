// verb-tense, by its ending
const byTense = {
  Gerund: 'ing',
  Actor: 'erer',
  Infinitive: 'ate ize tion rify then ress ify age nce ect ise ine ish ace ash ure tch end ack and ute ade ock ite ase ose use ive int nge lay est ain ant ent eed er le unk ung upt en',
  PastTense: 'ept ed lt nt ew ld',
  PresentTense: 'rks cks nks ngs mps tes zes ers les acks ends ands ocks lays eads lls els ils ows nds ays ams ars ops ffs als urs lds ews ips es ts ns',
  Participle: 'ken wn',
}
//flip it into a lookup object
const guessVerb = {}
Object.keys(byTense).forEach(k => {
  byTense[k].split(' ').forEach(a => {
    guessVerb[a] = k
  })
})
export default guessVerb

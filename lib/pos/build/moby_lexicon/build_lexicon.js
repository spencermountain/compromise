var fs = require('fs');

changes = {
	N: "NN",
	p: "NNS",
	h: "NN",
	V: "VB",
	t: "VB",
	i: "VB",
	A: "JJ",
	v: "RB",
	C: "CC",
	P: "IN",
	'!': "UH",
	r: "PP",
	D: "DT",
	// I: "NN",
	// o: "NN",
}

var freq = fs.readFileSync('freq.txt', 'ascii').split(/\r\n/)
var pos = fs.readFileSync('mobypos.txt', 'ascii').split(/\r\n/).map(function(v) {
	return v.split(/\\/)
})

var all = freq.map(function(w) {
	var found = null;
	for (var i in pos) {
		if (pos[i][0] == w) {
			pos[i][1] = changes[(pos[i][1] || '').substr(0, 1)]
			return pos[i]
		}
	}
})
console.log(all)




// Noun 			N
// Plural			p
// Noun Phrase		h
// Verb (usu participle)	V
// Verb (transitive)	t
// Verb (intransitive)  	i
// Adjective		A
// Adverb			v
// Conjunction		C
// Preposition		P
// Interjection		!
// Pronoun			r
// Definite Article	D
// Indefinite Article	I
// Nominative		o
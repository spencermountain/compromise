require("dirtyjs");

var wordnet = require("./wordnet_words").data;

obj = {
	noun: [],
	verb: [],
	adjective: [],
	adverb: []
};
Object.keys(wordnet).forEach(function(k) {
	wordnet[k] = wordnet[k].compact()
	wordnet[k].forEach(function(w) {
		w = w.toLowerCase()
		obj[k].push(w.substr(w.length - 4, w.length - 1))
	})
	obj[k] = obj[k].topkp()
	obj[k] = obj[k].filter(function(f) {
		return f.value.length == 4 && parseFloat(f.percent) > 0 && f.count > 2 && !f.value.match(' ')
	})
	obj[k] = obj[k].map(function(o) {
		o.pos = k
		o.percent = parseFloat(o.percent)
		return o
	})
})


all = {}
Object.keys(obj).forEach(function(k) {
	obj[k].forEach(function(p) {
		if (!all[p.value]) {
			all[p.value] = []
		}
		all[p.value].push(p)
	})
})


var keys = {
	adjective: "JJ",
	noun: "NN",
	verb: "VB",
	adverb: "RB",
}


var ambig = {}
var unambig = {}

Object.keys(all).forEach(function(p) {
	all[p] = all[p].sort(function(a, b) {
		return (b.percent) - (a.percent)
	})
	all[p].forEach(function(t) {
		delete t.value
	})

	//keep fewer noun suffixes
	if (all[p][0].pos == "noun" && all[p][0].count < 50) {
		return
	}

	if (all[p][1] && (all[p][0].percent - all[p][1].percent) < 0.3) {
		var small = [all[p][0].pos, all[p][1].pos]
		ambig[p] = small
	} else {
		unambig[p] = keys[all[p][0].pos]
		// unambig[p] = all[p][0]

	}


})
//4294 suffixes
// unambiguous suffixes 3148
// ambiguous suffixes 1146

// console.log(Object.keys(unambig).length)
console.log("exports.data=" + JSON.stringify(unambig, null, 2));
var syllables = require("./syllable")
var fs = require('fs');
require("dirtyjs")

var grams = []

fs.readFile('moby_testset.tsv', 'ascii', function(err, data) {
	data = data.split(/\n/).forEach(function(v) {
		v = v.replace(/\r/, '')
		var arr = v.split(/[,-]/)
		arr = arr.filter(function(a) {
			return a != ""
		})
		arr.forEach(function(a) {
			grams.push(a.substr(2))
		})
	})

	// grams = grams.slice(0, 100).topk()
	console.log(JSON.stringify(grams, null, 2));
});
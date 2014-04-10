var syllables = require("./syllable")
var fs = require('fs');
require("dirtyjs")

var grams = []

fs.readFile('moby_testset.tsv', 'ascii', function(err, data) {
	data = data.split(/\n/).forEach(function(v) {
		v = v.toLowerCase()
		v = v.replace(/\r/, '')
		var arr = v.split(/[,-\s]/)
		arr = arr.filter(function(a) {
			return a != "" && a.split(/[aeiouy]/).length > 2
		})
		arr.forEach(function(a) {
			var t = a.replace(/[aiouy]/g, '_')
			grams.push(a) //.match(/[^aeiouy][^aeiouy]/)[0]
		})
	})

	grams = grams.topk().slice(0, 200).map(function(t) {
		return t.value
	})
	console.log(JSON.stringify(grams, null, 2));
});
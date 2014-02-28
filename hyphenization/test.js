var syllables = require("./syllable")
tests = [
	["hillcrest", 2],
	["constipation", 4],
	["suddenly", 3],
	["hipster", 2],
	["donkey", 2],
	["wallowing", 3],
	["dutch", 1],
	["dutch", 1],
	["diabolic", 4],
]
tests.forEach(function(t) {
	var arr = syllables(t[0])
	console.log(arr.length == t[1])
})

//75%

var right = 0,
	wrong = 0
var fs = require('fs');
fs.readFile('moby_testset.tsv', 'ascii', function(err, data) {
	data = data.split(/\n/).filter(function(f) {
		return !f.match(/[- ]/)
	}).forEach(function(v) {
		v = v.replace(/\r/, '')
		var arr = v.split(/[,-]/)
		var word = arr.join('')
		if (syllables(word).length == arr.length) {
			right++
		} else {
			// console.log(v)
			// console.log(syllables(word))
			wrong++
		}
	})

	console.log("right:" + right)
	console.log("wrong:" + wrong)
	var percent = (right / (right + wrong)) * 100
	console.log(parseInt(percent) + "% right")
});
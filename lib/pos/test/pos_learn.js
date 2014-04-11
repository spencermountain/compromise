require("dirtyjs")
data = require("./pen_treebank").data.slice(2, 5)
pos = require("../pos").pos

for (var i in data) {
	var mine = pos(data[i].text)
	all = mine.reduce(function(a, s) {
		var tokens = s.tokens.map(function(t) {
			return {
				word: t.normalised,
				pos: t.pos.tag
			}
		})
		a = a.concat(tokens)
		return a
	}, [])
	// mine = mine.flatten().map(function(sentence) {
	// return {
	// word: token.normalised,
	// pos: token.pos.tag
	// }
	// })
	console.log(all)

}
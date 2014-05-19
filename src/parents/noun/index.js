var Noun = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		inflect = require("./conjugate/inflect")
	}


	the.conjugate = (function() {
		return inflect.inflect(the.word)
	})(),

	the.inflection = (function() {
		if (inflect.is_plural(the.word)) {
			return "plural"
		} else {
			return "singular"
		}
	})()


	return the;
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = Noun;
}


// console.log(nouns.conjugate('farmhouse'))
// var n = new Noun('kitchen')
// console.log(n)
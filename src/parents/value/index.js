// "CD  - cardinal value, generic (one, two, june 5th)",
// "DA  - date (june 5th, 1998)",
// "NU  - number (89, half-million)"

var Value = function(str) {
	var the = this
	the.word = str || '';

	if (typeof module !== "undefined" && module.exports) {
		to_number = require("./to_number")
		date_extractor = require("./dates")
		parts_of_speech = require("../../data/parts_of_speech")
	}

	the.which = (function() {
		return parts_of_speech['CD']
	})()

	the.number = to_number(the.word)
	console.log(the.date_extractor("june 5th 1989"))

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Value;
}

console.log(new Value("fifty five"))
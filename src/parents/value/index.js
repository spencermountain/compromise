var Value = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		to_number = require("./to_number")
		dates = require("./dates")
	}


	the.number = to_number(the.word)

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Value;
}

// s = new Value("fifty five")
// console.log(s)
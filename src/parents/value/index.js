var Value = function(str, next, last, token) {
	var the = this
	the.word = str || '';

	if (typeof module !== "undefined" && module.exports) {
		to_number = require("./to_number")
		date_extractor = require("./coffeejs/date_extractor")
		parts_of_speech = require("../../data/parts_of_speech")
	}

	the.date = function(options) {
		options = options || {}
		var d = date_extractor(the.word, options)
		if (!d || Object.keys(d).length == 0) {
			return null
		}
		return d
	}

	the.is_date = function() {
		var months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i
		var times = /1?[0-9]:[0-9]{2}/
		var days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i
		if (the.word.match(months) || the.word.match(times) || the.word.match(days)) {
			return true
		}
		return false
	}

	the.number = function() {
		if (the.is_date()) {
			return null
		}
		return to_number(the.word)
	}

	the.which = (function() {
		if (the.date()) {
			return parts_of_speech['DA']
		}
		if (the.number()) {
			return parts_of_speech['NU']
		}
		return parts_of_speech['CD']
	})()

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Value;
}

// console.log(new Value("fifty five").number())
// console.log(new Value("sunday March 18th").date({
// 	assume_year: true
// }))
// console.log(new Value("june 5th 1998").date())
var syllables = (function() {
	var syllables = function(str) {
		arr = str.split(/([^aeiouy]*[aeiouy-\s]*[^aeiouy]?)/i).filter(function(s) {
			return s
		})
		arr = postprocess(arr)

		function postprocess(arr) {
			if (!arr || !arr.length) {
				return []
			}
			if (arr[arr.length - 1].length == 1 && arr[arr.length - 1].match(/[^aeiouy]/i)) {
				var l = arr.pop()
				arr[arr.length - 1] += l
			}
			return arr
		}
		return arr
	}


	if (typeof module !== "undefined" && module.exports) {
		module.exports = syllables;
	}
	return syllables;
})()

console.log(syllables('hamburger'))
var syllables = (function(str) {








	var main = function(str) {
		var all = []


		var doer = function(str) {
			var vow = /[aeiouy]$/
			if (!str) {
				return
			}
			var chars = str.split('')
			var before = "";
			var after = "";
			var current = "";
			for (var i = 0; i < chars.length; i++) {
				before = chars.slice(0, i).join('')
				current = chars[i]
				after = chars.slice(i + 1, chars.length).join('')
				var candidate = before + chars[i]
				// console.log(before + "(" + current + ")" + after)

				//it's a consonant that comes after a vowel
				if (before.match(vow) && !current.match(vow)) {
					all.push(candidate)
					return doer(after)
				}
				//unblended vowels
				if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
					all.push(before)
					all.push(current)
					return doer(after)
				}

			}
			if (str.match(/[aiouy]/)) { //allow silent trailing e
				all.push(str)
			} else {
				all[all.length - 1] = (all[all.length - 1] || '') + str
			}
		}


		doer(str)
		return all
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

// var arr = syllables("suddenly")
// var arr = syllables("constipation")
// var arr = syllables("diabolic")
// console.log(JSON.stringify(arr, null, 2));
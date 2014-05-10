var syllables = (function(str) {




	var main = function(str) {
		var all = []


		//suffix fixes
			function postprocess(arr) {
				if (!arr.length <= 2) {
					return arr
				}
				var twos = [
					/[^aeiou]ying$/,
					/yer$/
				]

				var ones = [
					/^[^aeiou]?ion/,
					/^[^aeiou]?ised/,
					/^[^aeiou]?iled/,
				]
				var l = arr.length
				var suffix = arr[l - 2] + arr[l - 1];
				for (var i = 0; i < ones.length; i++) {
					if (suffix.match(ones[i])) {
						arr[l - 2] = arr[l - 2] + arr[l - 1]
						arr.pop()
					}
				}
				return arr
			}

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
				//
				//rules for syllables-

				//it's a consonant that comes after a vowel
				if (before.match(vow) && !current.match(vow)) {
					if (after.match(/^e[sm]/)) {
						candidate += "e"
						after = after.replace(/^e/, '')
					}
					all.push(candidate)
					return doer(after)
				}
				//unblended vowels ('noisy' vowel combinations)
				if (candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)) { //'io' is noisy, not in 'ion'
					all.push(before)
					all.push(current)
					return doer(after)
				}

			}
			if (str.match(/[aiouy]/)) { //allow silent trailing e
				all.push(str)
			} else {
				all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
			}
		}

		str.split(/\s-/).forEach(function(s) {
			doer(s)
		})
		all = postprocess(all)
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
// var arr = syllables("carbonised")
// var arr = syllables("deviled")

// var arr = syllables("sometimes")
// var arr = syllables("imitated")

// var arr = syllables("fate")
// var arr = syllables("fated")
// var arr = syllables("fates")

// var arr = syllables("genetic")
// var arr = syllables("tree")
// var arr = syllables("horse")

// console.log(JSON.stringify(arr, null, 2));
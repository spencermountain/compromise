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

// console.log(syllables("suddenly").length == 3)
// console.log(syllables("constipation").length == 4)
// console.log(syllables("diabolic").length == 4)
// console.log(syllables("fate").length == 1)
// console.log(syllables("fated").length == 2)
// console.log(syllables("fates").length == 1)
// console.log(syllables("genetic").length == 3)
// console.log(syllables("deviled").length == 3)
// console.log(syllables("imitated").length == 4)
// console.log(syllables("horse").length == 1)

// console.log(syllables("carbonised"))
// console.log(syllables("sometimes"))

//BUG!
// console.log(syllables("tree"))
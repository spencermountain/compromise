var syllables = (function(str) {


	var main = function(str) {
		var all = []

		//suffix fixes
			function postprocess(arr) {
				//trim whitespace
				arr= arr.map(function(w){
					w= w.replace(/^ */,'')
					w= w.replace(/ *$/,'')
					return w
				})
				if (!arr.length <= 2) { //?
					return arr
				}
				var twos = [
					/[^aeiou]ying$/,
					/yer$/,
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
				//if it has 4 consonants in a row, it's starting to be a mouthful for one syllable- like 'birchtree'
				// if(candidate.match(/[^aeiou]{4}$/)){
				// 	all.push(candidate.replace(/[^aeiou]{2}$/,''))
				// 	l= candidate.length - 1
				// 	candidate=candidate.slice(l-2, l)
				// }
			}
			//if still running, end last syllable
			if (str.match(/[aiouy]/) || str.match(/ee$/)) { //allow silent trailing e
				all.push(str)
			} else {
				all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
			}
		}

		str.split(/\s-/).forEach(function(s) {
			doer(s)
		})
		all = postprocess(all)

		//for words like 'tree' and 'free'
		if(all.length==0){
			all=[str]
		}

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
// console.log(syllables("calgary flames"))
// console.log(syllables("tree"))

//broken
// console.log(syllables("birchtree"))

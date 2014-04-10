require("dirtyjs")
data = require("./pen_treebank").data
parts_of_speech = require("../../parts_of_speech")

neighbours = function(key) {
	var afters = []
	var befores = []
	for (var i in data) {
		for (var o in data[i].pos) {
			if (data[i].pos[o].pos == key) {
				if (data[i].pos[o + 1]) {
					afters.push(data[i].pos[o + 1].pos)
				}
				if (data[i].pos[o - 1]) {
					befores.push(data[i].pos[o - 1].pos)
				}
			}
		}
	}
	afters = afters.map(function(m) {
		return m.substr(0, 2)
	})
	befores = befores.map(function(m) {
		return m.substr(0, 2)
	})
	var min = 30
	return {
		key: key,
		afters: afters.topkp().filter(function(f) {
			return f.percent > min
		}),
		befores: befores.topkp().filter(function(f) {
			return f.percent > min
		})
	}
}
all = Object.keys(parts_of_speech).map(function(k) {
	return neighbours(k)
})
console.log(JSON.stringify(all, null, 2));
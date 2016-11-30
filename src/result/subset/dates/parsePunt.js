'use strict';
const durations = {
    year: true,
    month: true,
    week: true,
    day: true,
    hour: true,
  }
  //
const parsePunt = (r) => {
  let direction = null
  let duration = {}
    //two days after
  let m = r.match('#Value #Duration (from|after|following)')
  if (m.found) {
    direction = 'forward'
  } else {
    //two days before
    m = r.match('#Value #Duration (before)')
    direction = 'backward'
  }
  //interpret 'value duration'
  if (m.found) {
    let num = m.values().parse()[0]
    if (num) {
      num = num.number
    }
    let duration = m.match('#Duration').nouns().toSingular().normal()

    console.log(duration)
  }
  return {
    direction: direction,
    duration: duration
  }
}
module.exports = parsePunt

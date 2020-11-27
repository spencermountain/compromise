const isRange = /^([0-9]{1,3}(?:st|nd|rd|th)?)[-–—]([0-9]{1,3}(?:st|nd|rd|th)?)$/i

//split '2-4' into '2 to 4'
const checkRange = function (term) {
  if (term.tags.PhoneNumber === true) {
    return null
  }
  let parts = term.text.match(isRange)
  if (parts !== null) {
    return [parts[1], 'to', parts[2]]
  }
  return null
}
module.exports = checkRange

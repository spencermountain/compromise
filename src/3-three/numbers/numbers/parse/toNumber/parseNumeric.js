//parse a string like "4,200.1" into Number 4200.1
const parseNumeric = str => {
  //remove ordinal - 'th/rd'
  str = str.replace(/(?<=1)st$|(?<=2)nd$|(?<=3)rd$|(?<=[4567890])r?th$/, '')
  //remove currency prefixes, suffixes, and commas
  str = str.replace(/^[$€¥£¢]|[%$€¥£¢]$|,/g, '')
  //split '5kg' from '5'
  str = str.replace(/([0-9])([a-z\u00C0-\u00FF]{1,2})$/, '$1')
  return str
}

export default parseNumeric

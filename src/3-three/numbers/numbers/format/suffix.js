const prefixes = {
  '¢': 'cents',
  $: 'dollars',
  '£': 'pounds',
  '¥': 'yen',
  '€': 'euros',
  '₡': 'colón',
  '฿': 'baht',
  '₭': 'kip',
  '₩': 'won',
  '₹': 'rupees',
  '₽': 'ruble',
  '₺': 'liras',
}
const suffixes = {
  '%': 'percent',
  // s: 'seconds',
  cm: 'centimetres',
  km: 'kilometres',
  ft: 'feet',
  '°': 'degrees'
}

const addSuffix = function (obj) {
  let suff = ''
  // $5 to 'five dollars'
  if (prefixes.hasOwnProperty(obj.prefix)) {
    suff += ' ' + prefixes[obj.prefix]
  }
  // 5% to 'five percent'
  if (suffixes.hasOwnProperty(obj.suffix)) {
    suff += ' ' + suffixes[obj.suffix]
  }
  if (suff && obj.num === 1) {
    suff = suff.replace(/s$/, '')
  }
  // misc other suffixes
  if (!suff && obj.suffix) {
    suff += ' ' + obj.suffix
  }
  return suff
}
export default addSuffix
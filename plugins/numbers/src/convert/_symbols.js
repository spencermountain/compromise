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
  s: 'seconds',
  cm: 'centimetres',
  km: 'kilometres',
}
module.exports = {
  prefixes: prefixes,
  suffixes: suffixes,
}

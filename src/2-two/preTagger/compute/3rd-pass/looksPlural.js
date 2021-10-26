//similar to plural/singularize rules, but not the same
const pluralEnds = [
  /(antenn|formul|nebul|vertebr|vit)ae$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
  /men$/i,
  /.tia$/i,
  /(m|l)ice$/i,
]

//similar to plural/singularize rules, but not the same
const singularEnds = [
  /(ax|test)is$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
  /(octop|vir)i$/i,
  /(rl)f$/i,
  /(alias|status)$/i,
  /(bu)s$/i,
  /(al|ad|at|er|et|ed)o$/i,
  /(ti)um$/i,
  /(ti)a$/i,
  /sis$/i,
  /(?:(^f)fe|(lr)f)$/i,
  /hive$/i,
  /(^aeiouy|qu)y$/i,
  /(x|ch|ss|sh|z)$/i,
  /(matr|vert|ind|cort)(ix|ex)$/i,
  /(m|l)ouse$/i,
  /(m|l)ice$/i,
  /(antenn|formul|nebul|vertebr|vit)a$/i,
  /.sis$/i,
  /^(?!talis|.*hu)(.*)man$/i,
  /'s$/i,
  /ss$/i,
]

const looksPlural = function (str) {
  if (pluralEnds.find(reg => reg.test(str))) {
    return true
  }
  if (singularEnds.find(reg => reg.test(str))) {
    return false
  }
  // ends with an s fallback
  return str.length > 3 && str.endsWith('s')
}
export default looksPlural

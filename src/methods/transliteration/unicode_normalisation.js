// a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
//approximate visual (not semantic) relationship between unicode and ascii characters
var compact = {
    "2": "²ƻ",
    "3": "³ƷƸƹƺǮǯЗҘҙӞӟӠӡȜȝ",
    "5": "Ƽƽ",
    "8": "Ȣȣ",
    "!": "¡",
    "?": "¿Ɂɂ",
    "a": "ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАДадѦѧӐӑӒӓƛɅ",
    "b": "ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬбвъьѢѣҌҍҔҕƥƾ",
    "c": "¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾϿЄСсєҀҁҪҫ",
    "d": "ÐĎďĐđƉƊȡƋƌǷ",
    "e": "ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ",
    "f": "ƑƒϜϝӺӻ",
    "g": "ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",
    "h": "ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",
    "I": "ÌÍÎÏ",
    "i": "ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",
    "j": "ĴĵǰȷɈɉϳЈј",
    "k": "ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",
    "l": "ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",
    "m": "ΜϺϻМмӍӎ",
    "n": "ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",
    "o": "ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟΦΩδθοσόϕϘϙϬϭϴОФоѲѳѺѻѼѽӦӧӨөӪӫ¤ƍΏ",
    "p": "ƤƿΡρϷϸϼРрҎҏÞ",
    "q": "Ɋɋ",
    "r": "ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґҒғӶӷſ",
    "s": "ŚśŜŝŞşŠšƧƨȘșȿςϚϛϟϨϩЅѕ",
    "t": "ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮϯТт҂Ҭҭ",
    "u": "µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύϑЏЦЧцџҴҵҶҷҸҹӋӌӇӈ",
    "v": "ƔνѴѵѶѷ",
    "w": "ŴŵƜωώϖϢϣШЩшщѡѿ",
    "x": "×ΧχϗϰХхҲҳӼӽӾӿ",
    "y": "¥ÝýÿŶŷŸƳƴȲȳɎɏΎΥΨΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",
    "z": "ŹźŻżŽžƩƵƶȤȥɀΖζ"
  }
  //decompress data into an array
var data = []
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
    data.push([s, k])
  })
})

//convert array to two hashes
var normaler = {}
var greek = {}
data.forEach(function (arr) {
  normaler[arr[0]] = arr[1]
  greek[arr[1]] = arr[0]
})

var normalize = function (str, options) {
  options = options || {}
  options.percentage = options.percentage || 50
  var arr = str.split('').map(function (s) {
    var r = Math.random() * 100
    if (normaler[s] && r < options.percentage) {
      return normaler[s] || s
    } else {
      return s
    }
  })
  return arr.join('')
}

var denormalize = function (str, options) {
  options = options || {}
  options.percentage = options.percentage || 50
  var arr = str.split('').map(function (s) {
    var r = Math.random() * 100
    if (greek[s] && r < options.percentage) {
      return greek[s] || s
    } else {
      return s
    }
  })
  return arr.join('')
}

module.exports = {
  normalize: normalize,
  denormalize: denormalize
}

// s = "ӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹźӳžŽżźŹź"
// s = "Björk"
// console.log(normalize.normalize(s, {
//   percentage: 100
// }))

// s = "The quick brown fox jumps over the lazy dog"
// console.log(normalize.denormalize(s, {
//   percentage: 100
// }))

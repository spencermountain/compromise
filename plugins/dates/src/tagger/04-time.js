const here = 'time-tagger'

//
const timeTagger = function(doc) {
  if (doc.has('#Time')) {
    //eastern daylight time
    doc.match('#Noun (standard|daylight|central|mountain)? time').tag('Timezone', here)
  }
  // https://raw.githubusercontent.com/davispuh/TimezoneParser/master/data/abbreviations.yml
  if (doc.has('#Acronym')) {
    let abbr = '(acdt|acst|ace|dmt|ist|tse|addt|adt|aedt|aest|ahdt|ahst|akdt|akst|amt|nst|apt|awt|gmt|awdt|awst|bdst|bst|bdt|nwt|bmt|wet|bost|cddt|cdt|cet|cmt|cpt|cst|cwt|chst|gst|eat|eddt|edt|eest|eet|emt|ept|ewt|est|ffmt|fmt|hdt|hst|hkst|hkt|hmt|iddt|idt|jmt|imt|jdt|jst|kdt|kst|kmt|lst|mddt|mdst|msd|msk|mdt|mmt|mpt|pdt|pst|mst|mwt|nddt|ndt|npt|nzdt|nzmt|nzst|pddt|pkst|pkt|plmt|pmmt|pmt|ppmt|ppt|pwt|qmt|rmt|sast|sdmt|set|sjmt|smt|sst|tbmt|tmt|utc|wast|wemt|wib|wit|wita|wmt|yddt|ydt|ypt|ywt|yst)'
    doc.match(abbr).tag('Timezone', here)
  }
  return doc
}
module.exports = timeTagger

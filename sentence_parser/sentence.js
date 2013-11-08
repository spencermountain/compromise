
var sentenceparser = (function() {

//by spencer kelly (@spencermountain)
var sentenceparser=function(text) {
    var tmp = text.split(/(\S.+?[.])(?=\s+|$)/g);
    var sentences = [];
    //from package Lingua::EN::Sentence
    var abbrevs=[
      "jr",
      "mr",
      "mrs",
      "ms",
      "dr",
      "prof",
      "sr",
      "sen",
      "rep",
      "gov",
      "atty",
      "supt",
      "det",
      "rev",
      "col",
      "gen",
      "lt",
      "cmdr",
      "adm",
      "capt",
      "sgt",
      "cpl",
      "maj",
      "dept",
      "univ",
      "assn",
      "bros",
      "inc",
      "ltd",
      "co",
      "corp",
      "arc",
      "al",
      "ave",
      "blvd",
      "cl",
      "ct",
      "cres",
      "exp",
      "rd",
      "st",
      "dist",
      "mt",
      "ft",
      "fy",
      "hwy",
      "la",
      "pd",
      "pl",
      "plz",
      "tce",
      "Ala",
      "Ariz",
      "Ark",
      "Cal",
      "Calif",
      "Col",
      "Colo",
      "Conn",
      "Del",
      "Fed",
      "Fla",
      "Ga",
      "Ida",
      "Id",
      "Ill",
      "Ind",
      "Ia",
      "Kan",
      "Kans",
      "Ken",
      "Ky",
      "La",
      "Me",
      "Md",
      "Mass",
      "Mich",
      "Minn",
      "Miss",
      "Mo",
      "Mont",
      "Neb",
      "Nebr",
      "Nev",
      "Mex",
      "Okla",
      "Ok",
      "Ore",
      "Penna",
      "Penn",
      "Pa",
      "Dak",
      "Tenn",
      "Tex",
      "Ut",
      "Vt",
      "Va",
      "Wash",
      "Wis",
      "Wisc",
      "Wy",
      "Wyo",
      "USAFA",
      "Alta",
      "Ont",
      "Qué",
      "Sask",
      "Yuk",
      "jan",
      "feb",
      "mar",
      "apr",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
      "sept",
      "vs",
      "etc",
      "esp",
      "llb",
      "md",
      "bl",
      "phd",
      "ma",
      "ba",
      "miss",
      "misses",
      "mister",
      "sir",
      "esq",
      "mstr",
      "lit",
      "fl",
      "ex",
      "eg",
      "sep",
      "sept"
    ]


    var abbrev=new RegExp("(^| )("+abbrevs.join("|")+")\. ?$","i");
    //join acronyms, titles
    for (var i in tmp) {
        if (tmp[i]) {
            tmp[i] = tmp[i].replace(/^\s+|\s+$/g, ''); //trim extra whitespace
            //join common abbreviations + acronyms
            if (tmp[i].match(abbrev) || tmp[i].match(/[ |\.][a-z]\.?$/i)) {
                tmp[parseInt(i) + 1] = tmp[i] + ' ' + tmp[parseInt(i) + 1];
            }
            else {
                sentences.push(tmp[i]);
                tmp[i] = '';
            }
        }
    }

    //cleanup afterwards
    var clean = [];
    for (var i in sentences) {
        sentences[i] = sentences[i].replace(/^\s+|\s+$/g, ''); //trim extra whitespace
        if (sentences[i]) {
            clean.push(sentences[i]);
        }
    }

    return clean;
}


//console.log(exports.sentenceparser('Dr. calm is me. lkj'))

        // export for AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function() {
            return sentenceparser;
        });
    }
    // export for Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = sentenceparser;
    }

    return sentenceparser;


})()
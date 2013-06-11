
var sentenceparser = (function() {

//by spencer kelly (@spencermountain)
var sentenceparser=function(text) {
    var tmp = text.split(/(\S.+?[.])(?=\s+|$)/g);
    var sentences = [];

    //join acronyms, titles
    for (var i in tmp) {
        if (tmp[i]) {
            tmp[i] = tmp[i].replace(/^\s+|\s+$/g, ''); //trim extra whitespace
            //join common abbreviations + acronyms
            if (tmp[i].match(/(^| )(mr|dr|llb|md|bl|phd|ma|ba|mrs|miss|misses|mister|sir|esq|mstr|jr|sr|st|lit|inc|fl|ex|eg|jan|feb|mar|apr|jun|aug|sept?|oct|nov|dec)\. ?$/i) || tmp[i].match(/[ |\.][a-z]\.?$/i)) {
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
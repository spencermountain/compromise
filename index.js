// _ = require("underscore")
exports.sentences = require('./tokenization/sentence').sentences;
// exports.pluralize = require('./inflection/pluralize').pluralize;
exports.singularize = require('./inflection/singularize');
exports.tagger = require('./inflection/singularize');
exports.adj_to_noun = require('./conjugation/adj_to_noun').adj_to_noun;
exports.tag = require('./tagging/tagger');
exports.dates = require('./spotting/date_parser');

var spot_function = require('./spotting/spotter').spot;
exports.spot = function(text) {
    var tags = exports.tag(text)
    return spot_function(tags)
}
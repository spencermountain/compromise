//convert cute to cuteness
var adj_to_noun = (function() {

    var main = function(w) {

        var irregulars;
        irregulars = {
            "clean": "cleanliness",
            "naivety": "naivety"
        };
        if (!w) {
            return "";
        }
        if (irregulars[w]) {
            return irregulars[w];
        }
        if (w.match(" ")) {
            return w;
        }
        if (w.match(/w$/)) {
            return w;
        }
        if (w.match(/y$/)) {
            return w.replace(/y$/, 'iness');
        }
        if (w.match(/le$/)) {
            return w.replace(/le$/, 'ility');
        }
        if (w.match(/ial$/)) {
            return w.replace(/ial$/, 'y');
        }
        if (w.match(/al$/)) {
            return w.replace(/al$/, 'ality');
        }
        if (w.match(/ting$/)) {
            return w.replace(/ting$/, 'ting');
        }
        if (w.match(/ring$/)) {
            return w.replace(/ring$/, 'ring');
        }
        if (w.match(/bing$/)) {
            return w.replace(/bing$/, 'bingness');
        }
        if (w.match(/ning$/)) {
            return w.replace(/ning$/, 'ningness');
        }
        if (w.match(/sing$/)) {
            return w.replace(/sing$/, 'se');
        }
        if (w.match(/ing$/)) {
            return w.replace(/ing$/, 'ment');
        }
        if (w.match(/ess$/)) {
            return w.replace(/ess$/, 'essness');
        }
        if (w.match(/ous$/)) {
            return w.replace(/ous$/, 'ousness');
        }
        if (w.match(/s$/)) {
            return w;
        }
        return w + "ness";
    };


    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }
    return main
})()

// console.log(exports.adj_to_noun('mysterious'));
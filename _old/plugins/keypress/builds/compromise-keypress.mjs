/* compromise-keypress 0.0.2 MIT */
var addMethods = function addMethods(Doc, world, nlp) {
  var sentenceCache = {};
  /** memoize tagger per-sentence */

  nlp.keypress = function (str, options) {
    //do a quick-parse on the text
    var doc = nlp.tokenize(str, options);
    var arr = doc.json({
      terms: false
    });
    var list = [];
    arr.forEach(function (o) {
      //do we already have it parsed?
      if (sentenceCache.hasOwnProperty(o.text) === true) {
        //use the cache
        list.push(sentenceCache[o.text].data);
        sentenceCache[o.text].used = true; // console.log('used cache: ', o.text, '\n')
      } else {
        //otherwise, parse it!
        var json = nlp(o.text, options).json(0); //cache it

        sentenceCache[o.text] = {
          data: json,
          used: true
        }; // used[o.text] = true

        list.push(json);
      }
    }); // delete any unused cache

    Object.keys(sentenceCache).forEach(function (k) {
      if (sentenceCache[k].used !== true) {
        delete sentenceCache[k];
      } else {
        sentenceCache[k].used = null;
      }
    });
    return nlp.fromJSON(list);
  };
  /** clear the sentence cache */


  nlp.clear = function () {
    sentenceCache = {};
  };
  /**  undocumented function for debugging the plugin **/


  nlp._sentenceCache = function () {
    return sentenceCache;
  };
};

var src = addMethods;

export default src;

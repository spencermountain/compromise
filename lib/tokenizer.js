var tokenizer = (function() {
  var tokenizer = function(text, options) {
    if (!options) {
      options = {};
    }
    //undo contractions
    if (text.match(/(he's|she's|it's)/)) {
      text = text.replace(/([^ ])['’]s /ig, '$1 is ');
    }
    text = text.replace(/([^ ])['’]ve /ig, '$1 have ');
    text = text.replace(/([^ ])['’]re /ig, '$1 are ');
    text = text.replace(/([^ ])['’]d /ig, '$1 would ');
    text = text.replace(/([^ ])['’]ll /ig, '$1 will ');
    text = text.replace(/([^ ])n['’]t /ig, '$1 not ');
    text = text.replace(/\bi'm /ig, 'I am ');

    //remove bracketed parts
    if (!options.keep_brackets) {
      text = text.replace(/ ?\(.{0,200}?\)/g, '');
    }

    var words = text.split(' ');

    if (options.want_quotations) {
      if (text.match('"')) {
        words = rejoin(words);
      }
    }

    words = spot_multiples(words);
    //words=words.map(function(word){ return word.replace(/("|,|\)|\(|!)/g,'')})

    return words;
  }


  //connect common multiple-word-phrases into one token

    function spot_multiples(words) {
      for (var i in words) {
        i = parseInt(i);
        if (!words[i + 1]) {
          continue;
        }
        var two = words[i] + ' ' + words[i + 1];
        two = two.replace(/[\.,!:;]*$/, '')
        if (multiples[two]) {
          words[i] = words[i] + ' ' + words[i + 1];
          words[i + 1] = null;
        }
      }
      //remove empty words
      return _.compact(words);
    }


    //rejoin quotations to one token

    function rejoin(words) {
      var quotes = [];
      for (var i in words) {
        if (words[i].match('"')) {
          quotes.push(parseInt(i))
        }
      }
      if (quotes.length == 2) {
        var quote = words.slice(quotes[0], quotes[1] + 1).join(' ');
        quote = quote.replace(/"/g, '')
        words.push(quote)
      }
      return words;
    }
    // export for AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define([], function() {
      return tokenizer;
    });
  }
  // export for Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = tokenizer;
  }

  return tokenizer;


})()

//console.log(exports.tokenizer('toronto and chicago! seem as usual, "well-disguised as hell" yeah', {want_quotations:true}));
data= require("./data")
tokenizer = (->

  #undo contractions

  #remove bracketed parts

  #connect common multiple-word-phrases into one token
  spot_multiples = (words) ->
    for i of words
      i = parseInt(i)
      continue  unless words[i + 1]
      two = words[i] + " " + words[i + 1]
      two = two.replace(/[\.,!:;]*$/, "")
      if data.multiples[two]
        words[i] = words[i] + " " + words[i + 1]
        words[i + 1] = null

    #remove empty words
    words.filter (w)-> w

  #rejoin quotations to one token
  rejoin = (words) ->
    quotes = []
    for i of words
      quotes.push parseInt(i)  if words[i].match("\"")
    if quotes.length is 2
      quote = words.slice(quotes[0], quotes[1] + 1).join(" ")
      quote = quote.replace(/"/g, "")
      words.push quote
    words
  tokenizer = (text, options) ->
    options = {}  unless options
    text = text.replace(/([^ ])['’]s /g, "$1 is ")  if text.match(/(he's|she's|it's)/)
    text = text.replace(/([^ ])['’]ve /g, "$1 have ")
    text = text.replace(/([^ ])['’]re /g, "$1 are ")
    text = text.replace(/([^ ])['’]d /g, "$1 would ")
    text = text.replace(/([^ ])['’]ll /g, "$1 will ")
    text = text.replace(/([^ ])n['’]t /g, "$1 not ")
    text = text.replace(/\bi'm /g, "I am ")
    text = text.replace(RegExp(" ?\\(.{0,200}?\\)", "g"), "")  unless options.keep_brackets
    words = text.split(" ")
    words = rejoin(words)  if text.match("\"")  if options.want_quotations
    words = spot_multiples(words)
    words


  # export for AMD / RequireJS
  if typeof define isnt "undefined" and define.amd
    define [], ->
      tokenizer


  # export for Node.js
  else module.exports = tokenizer  if typeof module isnt "undefined" and module.exports
  tokenizer
)()

# console.log(tokenizer('toronto and chicago! seem as usual, "well-disguised as hell" yeah', {want_quotations:true}));

tagger= require("./tagger")
recognizer= require("./helpers/recognizer")
chunker= require("./helpers/chunker")
tokenizer= require("./helpers/tokenizer")

spot = (->

  set_options = (options={big:true}) ->
    if options.verbose
      options.gerund = true
      options.stick_adjectives = true
      options.stick_prepositions = true
      options.stick_the = true
      options.want_quotations = true
      options.subnouns = true
      options.match_whole = true
      options.case_sensitive = false
      options.kill_numbers = false
      options.kill_quotes = false
    if options.big
      options.gerund = false
      options.stick_adjectives = false
      options.stick_prepositions = false
      options.stick_the = false
      options.subnouns = false
      options.want_quotations = true
      options.match_whole = false
      options.kill_numbers = true
      options.kill_quotes = true
    options

  cleanup= (nouns)->
    for i of nouns
      nouns[i].word = nouns[i].word.replace(/("|,|\)|\(|!)/g, "") #punctuation we want to keep
      nouns[i].word = nouns[i].word.replace(/'s$/, "")
      nouns[i].word = nouns[i].word.replace(/[\.\?,!:;\/\)]*$/, "")
      nouns[i].word = nouns[i].word.replace(/^[\(\/]*/g, "")
      nouns[i].word = nouns[i].word.replace(/[\(\/\)\\;:,]/g, " ")
      nouns[i].word = nouns[i].word.replace(RegExp("  ", "g"), " ")
      nouns[i].word = nouns[i].word.replace(/\W*$/, "") #punctuation
      nouns[i].word = nouns[i].word.replace(/^\W*/, "")
      nouns[i].word = singularize(nouns[i].word)  unless nouns[i].word.match(/^the ./)
      nouns[i].word = nouns[i].word.toLowerCase()  unless options.case_sensitive
    nouns

    #rank results
  rank = (results) ->
    for i of results
      results[i].score = 0
      results[i].score += results[i].count * 10
      results[i].score += 10  if results[i].rule is "capital"
      results[i].score += 7  if results[i].rule is "lexicon"
      results[i].score -= 4  if results[i].rule is "group_prep"
    results= results.sort((a,b)->b.score-a.score)
    results



###########
  spot= (str="", options={big:true})->
    options= set_options(options);
    words= tokenizer(str, options);
    tags= tagger(words)
    chunks= chunker(tags, options)
    nouns= recognizer(chunks, options)
    nouns= cleanup(nouns)
    nouns= rank(nouns)
    results= nouns.filter((noun)-> pass(noun.word) )
    return results


########
  # export for AMD / RequireJS
  if typeof define isnt "undefined" and define.amd
    define [], ->
      spot
  # export for Node.js
  else module.exports = spot  if typeof module isnt "undefined" and module.exports
  spot
)()

spot("sally is a great diver")
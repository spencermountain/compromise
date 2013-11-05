data= require("./data")

recognizer = (->
  isplural = (word) ->
    return true  if word.match(/.{3}(s|ice|eece)$/)
    #hack but its ok
    false

  #list all inline combinations for array element joins
  ngram = (arr, minwords, maxwords) ->
    keys = []
    results = []
    maxwords++ #for human logic, we start counting at 1 instead of 0
    i = 1

    while i <= maxwords
      keys.push {}
      i++
    i = 0
    arrlen = arr.length
    s = undefined

    while i < arrlen
      s = arr[i]
      keys[1][s] = (keys[1][s] or 0) + 1
      j = 2

      while j <= maxwords
        if i + j <= arrlen
          s += " " + arr[i + j - 1]
          keys[j][s] = (keys[j][s] or 0) + 1
        else
          break
        j++
      i++

    #collect results
    k = 0

    while k < maxwords
      key = keys[k]
      for i of key
        results.push i  if key[i] >= minwords
      k++
    results


  #takes a pos tagged object and grabs the nouns for named-entity spotting
  recognizer = (tags, options) ->
    options = {}  unless options
    if options.verbose
      options.gerund = true
      options.stick_adjectives = true
      options.stick_prepositions = true
      options.stick_the = true
      options.subnouns = true
      options.match_whole = true

    #collect noun chunks
    nouns = tags.filter((tag) ->
      tag.pos.parent is "noun"
    )

    # optionally treat 'ing' verbs as nouns
    if options.gerund
      for i of tags
        tags[i].pos.tag is "VBG"

    #    nouns.push({word:tags[i].word, pos:parts_of_speech["NN"], rule:"gerund"});

    #'obama health care' break noun-phrase into chunks
    if options.subnouns
      for i of nouns
        if nouns[i].word.match(" ")
          ngrams = ngram(nouns[i].word.replace(/^(the|an?|dr\.|mrs?\.|sir) /i, "").split(" "), 1, 4)
          for n of ngrams
            nouns.push
              word: ngrams[n]
              pos: parts_of_speech["NN"]
              rule: "subnoun"


    # optionally treat 'the' as part of a noun
    if options.stick_the
      for i of tags
        i = parseInt(i)
        if tags[i].word is "the" and tags[i + 1] and tags[i + 1].pos.parent is "noun" and isplural(tags[i + 1].word)
          nouns.push
            word: tags[i].word + " " + tags[i + 1].word
            pos: parts_of_speech["NN"]
            rule: "sticky_the"


    #add sticky adjectives to results - black swan
    if options.stick_adjectives

      #adjective - noun
      for i of tags
        i = parseInt(i)
        continue  unless tags[i].word
        if tags[i + 1] and tags[i].pos.parent is "adjective" and tags[i + 1].pos.parent is "noun"
          word = tags[i].word + " " + tags[i + 1].word
          nouns.push
            word: word
            pos: parts_of_speech["NN"]
            rule: "sticky_adj"


      #noun - adjective
      for i of tags
        i = parseInt(i)
        continue  unless tags[i].word
        if tags[i + 1] and tags[i].pos.parent is "noun" and tags[i + 1].pos.parent is "adjective"
          word = tags[i].word + " " + tags[i + 1].word
          nouns.push
            word: word
            pos: parts_of_speech["NN"]
            rule: "sticky_after_adj"


    #add [noun phrase] and [noun phrase] - marks and spencers
    if options.stick_prepositions
      words= tags.map (t)->t.word
      for i of tags
        i = parseInt(i)
        continue  unless tags[i].word
        if tags[i - 1] and tags[i + 1] and (tags[i].pos.tag is "CC" or tags[i].pos.tag is "IN") #&& tags[i-1].pos.parent=="noun"
          o = i

          while o < tags.length
            break  if tags[o].pos.parent is "verb" or tags[o].word.match(/\W/)
            if tags[o].pos.parent is "noun"
              word = words.slice(i - 1, parseInt(o) + 1).join(" ")
              nouns.push
                word: word
                pos: parts_of_speech["NN"]
                rule: "group_prep"

            o++

    #search the whole string
    if options.match_whole
      text= tags.map((t)->t.word).join(" ")
      nouns.push
        word: text
        pos: parts_of_speech["NN"]
        rule: "whole"


    #remove number tokes
    if options.kill_numbers
      nouns = nouns.filter((noun) ->
        not noun.word.match(/([0-9]| \- )/)
      )
    nouns

    # export for AMD / RequireJS
  if typeof define isnt "undefined" and define.amd
    define [], ->
      recognizer
  # export for Node.js
  else if typeof module isnt "undefined" and module.exports
    module.exports = recognizer

  return recognizer

)()
chunker = (->

  #make a json
  build = (before, obj, after) ->
    all = before
    all.push obj
    for i of after
      all.push after[i]
    all
  chunker = (data, options) ->
    for i of data
      i = parseInt(i)
      if data[i].pos.tag is "NNO"
        data = build(data.slice(0, i + 1),
          word: ""
          pos: parts_of_speech["IN"]
        , data.slice(i + 1, data.length))
      if data[i].pos.tag is "VBG" and data[i + 2]
        if data[i + 1].pos.tag is "IN" and data[i + 2].pos.parent is "glue"
          data[i].word += " " + data[i + 1].word
          data[i + 1].word = null
          continue
      if data[i].pos.tag is "VBG"
        if data[i + 1] and not data[i + 2]? and data[i + 1].pos.tag is "IN"
          data[i].word += " " + data[i + 1].word
          data[i + 1].word = null
    if options.gerund
      for i of data
        data[i].pos = parts_of_speech["NG"]  if data[i].pos.tag is "VBG"
    chunked = [data[0]]
    i = 1

    for v,i in data
      if chunked[chunked.length - 1].pos.parent is data[i].pos.parent
        if chunked[chunked.length - 1].word and not chunked[chunked.length - 1].word.match(/(,|")/)
          chunked[chunked.length - 1].word += " " + data[i].word
          continue
      chunked.push data[i]
    chunked


  # export for AMD / RequireJS
  if typeof define isnt "undefined" and define.amd
    define [], ->
      chunker
  # export for Node.js
  else module.exports = chunker  if typeof module isnt "undefined" and module.exports
  chunker
)()

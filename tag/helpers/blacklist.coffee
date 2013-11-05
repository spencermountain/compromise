data= require("./data")

pass = (->

  endsWith = (word, string) ->
    return false  if not string or not word or string.length > word.length
    word.indexOf(string) is word.length - string.length
  notends =
    the: true
    los: true
    les: true
    san: true
    dr: true
    they: true
    he: true
    she: true
    a: true
    his: true
    an: true
    their: true
    its: true
    "it's": true
    my: true
    your: true
    or: true
    if: true
    therefor: true
    therefore: true

  dateword = ["july", "august", "september", "october", "november", "december", "january", "february", "march", "april", "may", "june", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  #various sanitychecks
  pass = (gram="") ->
    return false  unless gram

    #length constraints
    return false  if gram.length < 3
    return false  if gram.length > 50

    #appropriate word-sizes
    word = gram.match(/[a-z|_]*/i)[0]
    return false  if not word or word.length > 25
    return false  unless gram.match(/[a-z]{3}/i)

    #stopwords
    gram = gram.toLowerCase()
    return false  if data.silly[gram]

    #silly endings
    for i of notends
      i = " " + i
      return false  if endsWith(gram, i)

    #ban dates
    for i of dateword
      if gram.match(dateword[i])
        reg = new RegExp("^[0-9]{1,4},? " + dateword[i])
        reg1 = new RegExp(dateword[i] + ",? [0-9]{1,4}$")
        return false  if gram.match(reg) or gram.match(reg1)

    #ban numerical words
    return false  if gram.match(/^[0-9]{1,4}(th|st|rd)$/)

    #punctuation
    return false  if gram.match(/(\[|\]|\{|\}|\||_|;|\)|\(|\\|\>|\<|\+|\=|\")/)

    #no vowel
    return false  unless gram.match(/(a|e|i|o|u)/)
    true


########
  # export for AMD / RequireJS
  if typeof define isnt "undefined" and define.amd
    define [], ->
      pass
  # export for Node.js
  else module.exports = pass  if typeof module isnt "undefined" and module.exports
  pass
)()

# console.log  pass("strawberry")
# console.log "eh " + pass("eh")

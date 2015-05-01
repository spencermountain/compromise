arr= [
  "./libs/jquery.js",
  "./libs/dirty.js",
  "./libs/oj.js",
  "../nlp.js",
  "./libs/bluebrowns.js",
  "./texts.js"
]
head.js.apply(this, arr);

head ->
  oj.useGlobally();
  articles= Object.keys(texts)


  second_choices= (k)->
    style= "color:white; font-size:17px; cursor:pointer;"
    choices= {
      nouns: ->
        tr ->
          ['named entities', 'plural', 'acronyms'].map (s)->
            td {
              style:"#{style}; background-color:#{bluebrowns(0.6)};"
              click:->
                highlight('plural') if s=="plural"
                highlight('acronym') if s=="acronyms"
                highlight('entity') if s=="named entities"
            },->
              s

      verbs: ->
        tr ->
          ['past', 'present', 'future', 'negative'].map (s)->
            td {
              style:"#{style}; background-color:#{bluebrowns(0.6)};"
              click:->
                highlight('past') if s=="past"
                highlight('present') if s=="present"
                highlight('future') if s=="future"
                highlight('negative') if s=="negative"

            },->
              s

      adjectives: ->
        tr ->
          ['comparatives', 'superlatives'].map (s)->
            td {
              style:"#{style}; background-color:#{bluebrowns(0.6)};"
              click:->
                highlight('JJR') if s=="comparatives"
                highlight('JJS') if s=="superlatives"
            },->
              s

      adverbs: ->
        tr ->
          ['comparatives', 'superlatives'].map (s)->
            td {
              style:"#{style}; background-color:#{bluebrowns(0.6)};"
              click:->
                highlight('RBR') if s=="comparatives"
                highlight('RBS') if s=="superlatives"
            },->
              s

      values: ->
        tr ->
          ['dates', 'numbers'].map (s)->
            td {
              style:"#{style}; background-color:#{bluebrowns(0.6)};"
              click:->
                highlight('DA') if s=="dates"
                highlight('NU') if s=="numbers"
            },->
              s
    }
    return choices[k]


  highlight= (clss)->
    $(".word").css('background-color','white')
    arr= []
    $(".#{clss}").each ->
      $(this).css('background-color', bluebrowns(0.4))
      arr.push $(this).attr('data-token')
    make_list(arr)

  tags_to_html= (pos)->
    colour= blues(0.4)
    return pos.map((sentence)->
      return sentence.tokens.map((word)->
        classes= [
          "word",
          word.pos.tag,
          word.pos.parent
        ]
        #add more data
        if word.pos.parent=="verb"
          classes.push("negative") if word.pos.negative
          classes.push(word.pos.tense)

        if word.pos.parent=="noun"
          classes.push("acronym") if word.is_acronym
          classes.push("plural") if word.is_plural
          classes.push("entity") if word.analysis.is_entity

        """<span data-token="#{word.normalised}" class="#{classes.join(' ')}">#{word.text}</span>"""
      ).join(' ')
    ).join('<div style="height:10px;"> </div>')


  make_list=(arr)->
    arr= arr.topk().slice(0,15)
    $("#list").html(arr.map((s)->s.value).join(', ')+"..")


  set_text=(txt)->
    tags= nlp.pos(txt).sentences
    html= tags_to_html(tags)
    $("#text").html(html)
    $("#second").html('')
    $("#list").html('')


  $("#main").oj(
    div ->
      h3 {
        style:"color:grey;"
        },->
          "nlp comprimise - "
      css {
        ".word":{
          "border-radius":"3px"
        }
      }

      table {
        style:"width:80%; padding:0px 10% 0px 10%; height:40px;"
        },->
        tr ->
          ['adjectives', 'nouns', 'verbs', 'adverbs', 'values'].map (pos)->
            td {
              style:"color:white; background-color:#{bluebrowns(0.7)}; cursor:pointer;"
              click:->
                txt= $("#text").text()
                parent= pos.replace(/s$/,'')
                #second level
                $("#second").oj(second_choices(pos))
                highlight(parent)

            },->
              pos
      #second level
      table {
        id:"second"
        style:"position:relative; width:70%; padding:0px 10% 0px 10%; left:50px; height:20px;"
        }
      #sources
      div {
        style:"position:relative; left:50%; width:200px; color:grey;"
      },->
        articles.map (t)->
          span {
            style:"color:steelblue; font-size:12px; cursor:pointer; padding:5px;"
            click:->
              set_text(texts[t])
          },->
            t

      div {
        id:"list"
        style:"display:block; border:1px solid lightsteelblue; padding: 5% 10% 5% 10%; text-align:left; width:80%; max-width:80%; color:steelblue; font-size:22px;"
      }

      div {
        id:"text"
        style:"display:block; padding: 5% 10% 5% 10%; text-align:left; width:80%; color:slategrey;"
      }

    )
  article= articles[parseInt(Math.random() * (articles.length-1))]
  set_text(texts[article])


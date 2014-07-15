arr= [
  "./libs/jquery.js",
  "./libs/sugar.js",
  "./libs/oj.js",
  "./libs/easings.js",
  "./libs/dirty.js",
  "./libs/nlp.min.js",
  "./libs/bluebrowns.js",

]
head.js.apply(this, arr);

head ->
  oj.useGlobally();

  articles= ['chomsky', 'baudrillard', 'keanu']

  tags_to_html= (pos, parent)->
    colour= blues(0.4)
    return pos.map((sentence)->
      return sentence.tokens.map((word)->
        if word.pos.parent==parent
          line= "<span style='position:absolute; background-color:#{bluebrowns(0.4)}; left:3px; bottom:2px; width:#{word.text.length*5}px; height:3px; display:inline-block;'></span>"
          "<span style='position:relative; border-radius:3px;'>#{word.text}#{line}</span>"
        else
          "<span style='position:relative;'>#{word.text}</span>"
      ).join(' ')
    ).join('<div style="height:10px;"> </div>')

  $("#main").oj(
    div ->
      h3 {
        style:"color:grey;"
        },->
          "nlp comprimise - "

      table {
        style:"width:80%; padding:0px 10% 0px 10%; height:40px;"
        },->
        tr ->
          ['adjectives', 'nouns', 'verbs', 'adverbs', 'values'].map (pos)->
            td {
              style:"color:white; background-color:#{bluebrowns(0.7)}; cursor:pointer;"
              click:->
                txt= $("#text").text()
                tags= nlp.pos(txt)
                parent= pos.replace(/s$/,'')
                html= tags_to_html(tags, parent)
                $("#text").html(html)
                #second level


            },->
              pos
      #second level
      table {
        style:"width:80%; padding:0px 10% 0px 10%; height:20px;"
        },->
          tr {
            id:"second"
            }
      #sources
      div {
        style:"position:relative; left:50%; width:200px; color:grey;"
      },->
        articles.map (t)->
          span {
            style:"color:steelblue; font-size:12px; cursor:pointer; padding:5px;"
            click:->
              $.get "./#{t}.txt", (txt)->
                $("#text").html(txt)
          },->
            t

      div {
        id:"text"
        style:"display:block; padding: 5% 10% 5% 10%; text-align:left; width:80%; color:slategrey;"
      }

    )

  $.get "./#{articles.random()}.txt", (txt)->
    $("#text").html(txt)











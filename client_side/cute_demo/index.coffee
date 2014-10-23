arr= [
  "./libs/jquery.js",
  "./libs/sugar.js",
  "./libs/oj.js",
  "./libs/dirty.js",
  "./libs/nlp.js",
  "./libs/freebase.min.js",
]
head.js.apply(this, arr);

head ->
  oj.useGlobally();
  window.freebase=$.freebase

  colours= {
    noun:"steelblue"
    verb:"olivedrab"
    adjective:"coral"
    adverb:"rosybrown"
    glue:"grey"
  }
  key= "AIzaSyD5GmnQC7oW9GJIWPGsJUojspMMuPusAxI"
  show_topic=(obj)->
    span {
      style:"display:inline-block;"
    },->
      img {
        border:"1px solid steelblue"
        "border-radius":5,
        src:"https://usercontent.googleapis.com/freebase/v1/image#{obj.id}?key=#{key}&maxwidth=200"
      }
      #nlp to get the first sentence of description
      done= nlp.pos(obj.output.description['/common/topic/description'][0])
      text= done[0].text()
      div {style:"width:400px;"},-> text

  set_text=(tokens=[], el)->
    ojarr= span ->
      tokens.map (t)->
        if t.pos.parent=="noun"
          span {
              style:"position:relative; color:#{colours[t.pos.parent]}; cursor:hand;"
              click:->
                $(this).find(".hide").toggle()
              }, ->
            span -> " "+ t.text + " "
            span {style:"position:absolute; bottom:5px; left:5%; width:80%; border-radius:3px; height:3px; background-color:#{colours[t.pos.parent]};"}#do an underline
            span {
              class:"hide"
              style:"display:none; padding:5px; position:absolute; font-size:18px; bottom:-35px; left:70%; border-radius:3px; background-color:#{colours[t.pos.parent]}; color:white; cursor:pointer; opacity:0.8;"
              click:->
                freebase.search t.text, {output:"(description)", limit:1, key:key}, (arr=[])->
                  console.log arr
                  o= arr[0]||{}
                  $("#answer").oj(show_topic(o))
              },->
                "learn"

        else if t.pos.parent=="verb"
          span {style:"position:relative; color:#{colours[t.pos.parent]};"}, ->
            span -> " "+ t.text+" "
            span {style:"position:absolute; bottom:5px; left:5%; width:80%; border-radius:3px; height:3px; background-color:#{colours[t.pos.parent]};"}#do an underline

        else if t.pos.parent=="adverb"
          span {style:"position:relative; color:#{colours[t.pos.parent]};"}, ->
            span -> t.text + " "
        else
          span {style:"position:relative; color:#{colours[t.pos.parent]};"}, ->
            span -> t.text + " "



    el.oj(ojarr)

  $("#main").oj(
    div {style:"position:relative; text-align:left; color:grey;"},->
      h2 {style:"position:relative; left:10px;"}, -> "  nlp compromise"
      ul ->
        # div -> "tense conversion"
        div {
          id: "text"
          style:"position:relative; padding:10px; left:25px; height:45px; border:1px solid lightsteelblue; color:steelblue; overflow-x: visible; font-size:30px; width:500px;"
          contentEditable:"true"
          keyup:(()->
            el= $(this)
            txt= el.text()
            done= nlp.pos(txt)
            tokens= done[0].tokens
            console.log(done[0])
            set_text(tokens, el)
            ).debounce(500);
        },->
          "joe carter plays patiently in toronto"
        div {
          id:"answer"
        }

  )
  $("#text").keyup()











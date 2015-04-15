arr= [
  "./libs/jquery.js",
  "./libs/oj.js",
  "../nlp.js",
  "./libs/freebase.min.js",
]
head.js.apply(this, arr);

#slow down typing lookups
debounce = (fn, debounceDuration) ->
  debounceDuration = debounceDuration or 100
  ->
    if !fn.debouncing
      args = Array::slice.apply(arguments)
      fn.lastReturnVal = fn.apply(window, args)
      fn.debouncing = true
    clearTimeout fn.debounceTimeout
    fn.debounceTimeout = setTimeout((->
      fn.debouncing = false
      return
    ), debounceDuration)
    fn.lastReturnVal

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
  show_topic=(obj={})->
    return if !obj.id
    span {
      style:"display:inline-block; margin:15px;"
    },->
      img {
        style:"border:1px solid steelblue; border-radius:5px",
        src:"https://usercontent.googleapis.com/freebase/v1/image#{obj.id}?key=#{key}&maxwidth=200"
      }
      #nlp to get the first sentence of description
      tmp= obj.output.description['/common/topic/description']||[]
      done= nlp.pos(tmp[0]).sentences
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
                # $(".hide").css('display','none')
              }, ->
            span {style:""}, -> " "+ t.text + " "
            span {style:"position:absolute; bottom:5px; left:5%; width:80%; border-radius:3px; height:3px; background-color:#{colours[t.pos.parent]};"}#do an underline
            span {
              class:"hide"
              style:" display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; bottom:-35px; left:70%; border-radius:3px; background-color:#{colours[t.pos.parent]}; color:white; cursor:pointer; opacity:0.8;"
              click:->
                freebase.search t.text, {output:"(description)", limit:1, key:key}, (arr=[])->
                  console.log arr
                  o= arr[0]||{}
                  $("#answer").oj(show_topic(o))
              },->
                "about"

        else if t.pos.parent=="verb"
          span {style:"position:relative; color:#{colours[t.pos.parent]};"}, ->
          span {
              style:"position:relative; color:#{colours[t.pos.parent]}; cursor:hand;"
              click:->
                $(this).find(".hide").toggle()
              }, ->
            span -> " "+ t.text + " "
            span {style:"position:absolute; bottom:5px; left:5%; width:80%; border-radius:3px; height:3px; background-color:#{colours[t.pos.parent]};"}#do an underline
            #past button
            span {
              class:"hide"
              style:"display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; top:-35px; left:-20px; border-radius:3px; background-color:#{colours[t.pos.parent]}; color:white; cursor:pointer; opacity:0.8;"
              click:->
                el= $("#text")
                el.find('.hide').remove() #so the helper buttons don't show up
                done= nlp.pos(el.text()).sentences
                fixed= done[0].to_past().text()
                el.text(fixed)
                el.keyup()
              },->
                "past"
            #future button
            span {
              class:"hide"
              style:"display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; top:-35px; left:40px; border-radius:3px; background-color:#{colours[t.pos.parent]}; color:white; cursor:pointer; opacity:0.8;"
              click:->
                el= $("#text")
                el.find('.hide').remove() #so the helper buttons don't show up
                done= nlp.pos(el.text()).sentences
                fixed= done[0].to_future().text()
                el.text(fixed)
                el.keyup()
              },->
                "future"
            #negate button
            span {
              class:"hide"
              style:"display:none; padding:2px 5px 2px 5px; position:absolute; font-size:18px; bottom:-35px; left:70%; border-radius:3px; background-color:#{colours[t.pos.parent]}; color:white; cursor:pointer; opacity:0.8;"
              click:->
                el= $("#text")
                el.find('.hide').remove() #so the helper buttons don't show up
                done= nlp.pos(el.text()).sentences
                fixed= done[0].negate().text()
                el.text(fixed)
                el.keyup()
              },->
                "negate"

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
          style:"position:relative; padding:10px; left:25px; height:45px; border:1px solid lightsteelblue; color:steelblue; overflow-x: visible; font-size:30px; width:600px;"
          contentEditable:"true"
          keyup: debounce(()->
            el= $("#text")
            el.find('.hide').remove() #so the helper buttons don't show up
            txt= el.text()
            done= nlp.pos(txt).sentences
            tokens= done[0].tokens
            el.html('')
            set_text(tokens, el)
          , 500);
        },->
          "joe carter plays patiently in toronto"
        div {
          id:"answer"
        }

  )
  $("#text").keyup()


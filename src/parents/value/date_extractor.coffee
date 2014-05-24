#generates properly-formatted dates from free-text date forms
#by spencer kelly 2014
#it's just nicer to do this in coffeescript, sorry for the inconvenence
date_extractor = ( ()->
  months = "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec),?"
  days = "([0-9]{1,2}),?"
  years = "([0-9]{4})"
  # reg = new RegExp(reg, "gi");

  regexes = [{
    reg: "#{months} #{days}-#{days} #{years}",
    example: "March 7th-11th 1987",
    process:(arr)->
      places= {
        month:1,
        day:2,
        to_day:3,
        year:4,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "#{days} of #{months} to #{days} of #{months},? #{years}",
    example: "28th of September to 5th of October 2008",
    process:(arr)->
      places= {
        day:1,
        month:2,
        to_day:3,
        to_month:4,
        to_year:5,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "#{months} #{days} to #{months} #{days} #{years}",
    example: "March 7th to june 11th 1987",
    process:(arr)->
      places= {
        month:1,
        day:2,
        to_month:3,
        to_day:4,
        year:5,
        to_year:5,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "between #{days} #{months} and #{days} #{months} #{years}",
    example: "between 13 February and 15 February 1945",
    process:(arr)->
      places= {
        day:1,
        month:2,
        to_day:3,
        to_month:4,
        year:5,
        to_year:5,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "between #{months} #{days} and #{months} #{days} #{years}",
    example: "between March 7th and june 11th 1987",
    process:(arr)->
      places= {
        month:1,
        day:2,
        to_month:3,
        to_day:4,
        year:5,
        to_year:5,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "#{months} #{days} #{years}",
    example: "March 1st 1987",
    process:(arr)->
      places= {
        month:1,
        day:2,
        year:3,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "#{days} - #{days} of #{months},? #{years}",
    example: "3rd - 5th of March 1969",
    process:(arr)->
      places= {
        day:1,
        to_day:2,
        month:3,
        year:4,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})

  },

  {
    reg: "#{days} of #{months},? #{years}",
    example: "3rd of March 1969",
    process:(arr)->
      places= {
        day:1,
        month:2,
        year:3,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "#{months} #{years},? to #{months} #{years}",
    example: "September 1939 to April 1945",
    process:(arr)->
      places= {
        month:1,
        year:2,
        to_month:3,
        to_year:4,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  {
    reg: "#{months} #{years}",
    example: "March 1969",
    process:(arr)->
      places= {
        month:1,
        year:2,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },
  {
    reg: "#{months} #{days}",
    example: "March 18th",
    process:(arr)->
      places= {
        month:1,
        day:2,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },
  {
    reg: "#{days} of #{months}",
    example: "18th of March",
    process:(arr)->
      places= {
        month:2,
        day:1,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  # {
  #   reg: "",
  #   example: "400 - 600 BC",
  # },

  {
    reg: "#{years} ?- ?#{years}",
    example: "1997-1998",
    process:(arr)->
      places= {
        year:1,
        to_year:2,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  },

  # {
  #   reg: "",
  #   example: "1997-98"
  # }, {
  #   reg: "",
  #   example: "400 BC"
  # },

  {
    reg: "#{years}",
    example: "1998",
    process:(arr)->
      places= {
        year:1,
      }
      return Object.keys(places).reduce((h, k)->
        h[k]=arr[places[k]]
        h
      ,{})
  }].map (o)->
    o.reg= new RegExp(o.reg, "g");
    return o

  months_obj= {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    aug: 7,
    sept: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  }

  preprocess= (str)->
    str= str.toLowerCase()
    str= str.replace(/([0-9])(th|rd|st)/g,'$1')
    return str

  postprocess= (obj, options)->
    d= new Date()
    options= options || {}
    obj.year= parseInt(obj.year)||null
    obj.day= parseInt(obj.day)||null
    obj.to_day= parseInt(obj.to_day)||null
    obj.to_year= parseInt(obj.to_year)||null
    obj.month= months_obj[obj.month]||null
    obj.to_month= months_obj[obj.to_month]||null
    #transfer properties from 'to' object, if we have them
    if obj.to_year && !obj.year
      obj.year= obj.to_year
    if obj.to_month && !obj.month
      obj.month= obj.to_month
    #and vice-versa
    if !obj.to_month && obj.month
      obj.to_month= obj.month
    #and vice-versa
    if !obj.to_year && obj.year
      obj.to_year= obj.year
    #assume 'march 23rd' means in current year
    if options.assume_year && !obj.year
      obj.year= d.getFullYear()
    #make sure things are valid
    if obj.to_month && obj.to_month < obj.month
      obj.month= null
      obj.to_month= null
    if obj.to_year && obj.to_year < obj.year
      obj.year= null
      obj.to_year= null
    if obj.year >2090 || obj.year<1200 #opinionated
      obj.year= null
      obj.to_year= null
    #we can build a proper Date object
    if obj.year && obj.day && obj.month
      obj.date_object= new Date()
      obj.date_object.setYear(obj.year)
      obj.date_object.setMonth(obj.month)
      obj.date_object.setDate(obj.day)
    #..and a proper 'to' Date object
    if obj.to_year && obj.to_day && obj.to_month
      obj.to_date_object= new Date()
      obj.to_date_object.setYear(obj.to_year)
      obj.to_date_object.setMonth(obj.to_month)
      obj.to_date_object.setDate(obj.to_day)
    if obj.year || obj.month
      return obj
    return null

  test=->
    regexes.forEach (obj)->
      str= obj.example
      str= preprocess(str)
      arr= obj.reg.exec(str)
      good= obj.process(arr)
      good= postprocess(good)
      console.log good
  # test()

  main=(str, options)->
    options= options||{}
    str= preprocess(str)
    for obj in regexes
      if str.match(obj.reg)
        arr= obj.reg.exec(str)
        good= obj.process(arr)
        good= postprocess(good, options)
        return good
    return {}
  if typeof module != "undefined" && module.exports
    module.exports = main;

  return main

)()

# console.log date_extractor('june 5th 1998')

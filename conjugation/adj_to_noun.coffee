##
# conjugate 'mysterious' to 'mysteriousness'

irregulars= {
  "clean":"cleanliness",
  "naivety":"naivety",
}


exports.noun_form= (w)->
  return "" if !w
  return irregulars[w] if irregulars[w]
  return w if(w.match(" "))
  return w if(w.match(/w$/))
  return w.replace(/y$/,'iness') if(w.match(/y$/))
  return w.replace(/le$/,'ility') if(w.match(/le$/))
  # return w.replace(/y$/,'ic') if(w.match(/ic$/))
  return w.replace(/ial$/,'y') if(w.match(/ial$/))
  return w.replace(/al$/,'ality') if(w.match(/al$/))
  #ing
  return w.replace(/ting$/,'ting') if(w.match(/ting$/))
  return w.replace(/ring$/,'ring') if(w.match(/ring$/))
  return w.replace(/bing$/,'bingness') if(w.match(/bing$/))
  return w.replace(/ning$/,'ningness') if(w.match(/ning$/))
  return w.replace(/sing$/,'se') if(w.match(/sing$/))
  return w.replace(/ing$/,'ment') if(w.match(/ing$/))
  #s
  return w.replace(/ess$/,'essness') if(w.match(/ess$/))
  return w.replace(/ous$/,'ousness') if(w.match(/ous$/))
  return w if(w.match(/s$/))
  return w+"ness"
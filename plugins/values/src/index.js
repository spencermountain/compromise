const addMethod = function(Doc) {
  /**  */
  class Values extends Doc {
    // function()
  }

  Doc.prototype.values = function(n) {
    const tens = 'twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty'
    const teens = 'eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen'
    let match = this.match('#Value+ #Unit?')
    // r = r.match('#Value+ #Unit?');

    //"50 83"
    if (match.has('#NumericValue #NumericValue')) {
      //a comma may mean two numbers
      if (match.has('#Value #Comma #Value')) {
        match.splitAfter('#Comma')
      } else {
        match.splitAfter('#NumericValue')
      }
    }
    //three-length
    if (match.has('#Value #Value #Value') && !match.has('#Multiple')) {
      //twenty-five-twenty
      if (match.has('(' + tens + ') #Cardinal #Cardinal')) {
        match.splitAfter('(' + tens + ') #Cardinal')
      }
    }

    //two-length ones
    if (match.has('#Value #Value')) {
      //june 21st 1992 is two seperate values
      if (match.has('#NumericValue #NumericValue')) {
        match.splitOn('#Year')
      }
      //sixty fifteen
      if (match.has('(' + tens + ') (' + teens + ')')) {
        match.splitAfter('(' + tens + ')')
      }
      //"72 82"
      let double = match.match('#Cardinal #Cardinal')
      if (double.found && !match.has('(point|decimal)')) {
        //not 'two hundred'
        if (!double.has('#Cardinal (#Multiple|point|decimal)')) {
          //one proper way, 'twenty one', or 'hundred one'
          if (!double.has('(' + tens + ') #Cardinal') && !double.has('#Multiple #Value')) {
            match.splitAfter(double.terms(0).out('normal'))
          }
        }
      }
      //seventh fifth
      if (match.match('#Ordinal #Ordinal').match('#TextValue').found && !match.has('#Multiple')) {
        //the one proper way, 'twenty first'
        if (!match.has('(' + tens + ') #Ordinal')) {
          match.splitAfter('#Ordinal')
        }
      }
      //fifth five
      if (match.has('#Ordinal #Cardinal')) {
        match.splitBefore('#Cardinal+')
      }
      //five 2017 (support '5 hundred', and 'twenty 5'
      if (match.has('#TextValue #NumericValue') && !match.has('(' + tens + '|#Multiple)')) {
        match.splitBefore('#NumericValue+')
      }
    }
    //5-8
    if (match.has('#NumberRange')) {
      match.splitAfter('#NumberRange')
    }

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Values(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod

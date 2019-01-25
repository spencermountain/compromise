const tens = 'twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty';
const teens = 'eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen';

//
const values = function(doc) {
  let m = doc.match('#Value+ #Unit?');
  //"50 83"
  if (m.has('#NumericValue #NumericValue')) {
    //a comma may mean two numbers
    if (m.has('#Value #Comma #Value')) {
      m.splitAfter('#Comma');
    } else {
      m.splitAfter('#NumericValue');
    }
  }
  //three-length
  if (m.has('#Value #Value #Value') && !m.has('#Multiple')) {
    //twenty-five-twenty
    if (m.has('(' + tens + ') #Cardinal #Cardinal')) {
      m.splitAfter('(' + tens + ') #Cardinal');
    }
  }

  //two-length ones
  if (m.has('#Value #Value')) {
    //june 21st 1992 is two seperate values
    if (m.has('#NumericValue #NumericValue')) {
      m.splitOn('#Year');
    }
    //sixty fifteen
    if (m.has('(' + tens + ') (' + teens + ')')) {
      m.splitAfter('(' + tens + ')');
    }
    //"72 82"
    let double = m.match('#Cardinal #Cardinal');
    if (double.found && !m.has('(point|decimal)')) {
      //not 'two hundred'
      if (!double.has('#Cardinal (#Multiple|point|decimal)')) {
        //one proper way, 'twenty one', or 'hundred one'
        if (!double.has('(' + tens + ') #Cardinal') && !double.has('#Multiple #Value')) {
          m.splitAfter(double.terms(0).out('normal'));
        }
      }
    }
    //seventh fifth
    if (m.match('#Ordinal #Ordinal').match('#TextValue').found && !m.has('#Multiple')) {
      //the one proper way, 'twenty first'
      if (!m.has('(' + tens + ') #Ordinal')) {
        m.splitAfter('#Ordinal');
      }
    }
    //fifth five
    if (m.has('#Ordinal #Cardinal')) {
      m.splitBefore('#Cardinal+');
    }
    //five 2017 (support '5 hundred', and 'twenty 5'
    if (
      m.has('#TextValue #NumericValue') &&
      !m.has('(' + tens + '|#Multiple)')
    ) {
      m.splitBefore('#NumericValue+');
    }
  }
  //5-8
  if (m.has('#NumberRange')) {
    m.splitAfter('#NumberRange');
  }
  // if (typeof n === 'number') {
  //   r = m.get(n);
  // }
  return m;
};
module.exports = values;

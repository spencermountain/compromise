import * as words from './_words.js'
const ones = words.ones.slice(1).join('|')
const tens = words.tens.join('|') + '|fourty'
const teens = words.teens.join('|')

// this is a bit of a mess
// segment consecutive number-words into sensible chunks
const splitNumbers = function (m) {
  // two hundred - three hundred
  m = m.splitAfter('@hasDash')
  // a tens-word ends its number - 'sixty fifteen', 'twenty eighty two'
  while (m.has(`(${tens}) (${tens}|${teens})`)) {
    m = m.splitBefore(`(${tens}) [(${tens}|${teens})]`, 0)
  }

  //"50 83"
  if (m.has('#Numeric #Numeric')) {
    //a comma may mean two numbers
    if (m.has('#Val @hasComma #Val')) {
      m.splitAfter('@hasComma')
    } else if (m.has('#Numeric #Frac')) {
      m.splitAfter('#Numeric #Frac')
    } else {
      m = m.splitAfter('#Numeric')
    }
  }

  //three-length
  if (m.has('#Val #Val #Val') && !m.has('#Mult')) {
    //twenty-five-twenty
    if (m.has('(' + tens + ') #Card #Card')) {
      m = m.splitAfter('(' + tens + ') #Card')
    }
  }

  //two-length ones
  if (m.has('#Val #Val')) {
    //june 21st 1992 is two seperate values
    if (m.has('#Numeric #Numeric')) {
      m = m.splitOn('#Year')
    }

    //"72 82"
    const double = m.match('#Card #Card')
    if (double.found && !m.has('(point|decimal|#Frac)')) {
      //not 'two hundred'
      if (!double.has('#Card (#Mult|point|decimal)')) {
        // two fifty five
        const noMultiple = m.has(`(${ones}) (${tens})`)
        // twenty one
        const tensVal = double.has('(' + tens + ') #Card')
        // hundredOne
        const multVal = double.has('#Mult #Val')
        //one proper way, 'twenty one', or 'hundred one'
        if (!noMultiple && !tensVal && !multVal) {
          // double = double.firstTerm()
          double.terms().forEach(d => {
            m = m.splitOn(d)
          })
        }
      }
    }

    //seventh fifth
    // an ordinal ends its number, so this keeps 'twenty first' whole
    if (m.match('#Ord #Ord').match('#TxtNum').found && !m.has('#Mult')) {
      m = m.splitAfter('#Ord')
    }
    // one thirty am != 130
    if (m.has('#Time')) {
      m = m.splitOn('#Time')
    }
    //fifth five
    m = m.splitBefore('#Ord [#Card]', 0)
    //five 2017 (support '5 hundred', and 'twenty 5'
    if (m.has('#TxtNum #Numeric') && !m.has('(' + tens + '|#Mult)')) {
      m = m.splitBefore('#TxtNum #Numeric')
    }
  }

  //5-8
  m = m.splitAfter('#NumberRange')
  // june 5th 1999
  m = m.splitBefore('#Year')
  return m
}

const findNumbers = function (doc) {
  const m = doc.match('#Val+')
  // spoken years are already whole - 'twenty twenty six'
  const years = m.match('(#Year && #TxtNum)+').splitAfter('(@hasComma|@hasDash)')
  if (!years.found) {
    return splitNumbers(m)
  }
  const ptrs = splitNumbers(m.not(years)).fullPointer.concat(years.fullPointer)
  return m.toView(ptrs.sort((a, b) => a[0] - b[0] || a[1] - b[1]))
}

export default findNumbers

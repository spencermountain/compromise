//ambiguous 'may' and 'march'
// const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
// const thisNext = '(last|next|this|previous|current|upcoming|coming)' //2
const sections = '(start|end|middle|starting|ending|midpoint|beginning)' //2
// const seasons = '(spring|summer|winter|fall|autumn)'

//ensure a year is approximately typical for common years
//please change in one thousand years
const tagYear = (m, reason) => {
  if (m.found !== true) {
    return
  }
  m.forEach((p) => {
    let str = p.text('reduced')
    let num = parseInt(str, 10)
    if (num && num > 1000 && num < 3000) {
      p.tag('Year', reason)
    }
  })
}
//same, but for less-confident values
const tagYearSafe = (m, reason) => {
  if (m.found !== true) {
    return
  }
  m.forEach((p) => {
    let str = p.text('reduced')
    let num = parseInt(str, 10)
    if (num && num > 1900 && num < 2030) {
      p.tag('Year', reason)
    }
  })
}

const tagDates = function (doc) {

  doc
    .match('(march|april|may) (and|to|or|through|until)? (march|april|may)')
    .tag('Date')
    .match('(march|april|may)')
    .tag('Month', 'march|april|may')
  // april should almost-always be a date
  // doc.match('[april] !#LastName?', 0).tag('Month', 'april')


  //year/cardinal tagging
  let cardinal = doc.if('#Cardinal')
  if (cardinal.found === true) {
    let v = cardinal.match(`#Date #Value [#Cardinal]`, 0)
    tagYear(v, 'date-value-year')
    //scoops up a bunch
    v = cardinal.match(`#Date [#Cardinal]`, 0)
    tagYearSafe(v, 'date-year')
    //middle of 1999
    v = cardinal.match(`${sections} of [#Cardinal]`)
    tagYearSafe(v, 'section-year')
    //feb 8 2018
    v = cardinal.match(`#Month #Value [#Cardinal]`, 0)
    tagYear(v, 'month-value-year')
    //feb 8 to 10th 2018
    v = cardinal.match(`#Month #Value to #Value [#Cardinal]`, 0)
    tagYear(v, 'month-range-year')
    //in 1998
    v = cardinal.match(`(in|of|by|during|before|starting|ending|for|year|since) [#Cardinal]`, 0)
    tagYear(v, 'in-year-1')
    //q2 2009
    v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]', 0)
    tagYear(v, 'in-year-2')
    //2nd quarter 2009
    v = cardinal.match('#Ordinal quarter of? [#Cardinal]', 0)
    tagYear(v, 'in-year-3')
    //in the year 1998
    v = cardinal.match('the year [#Cardinal]', 0)
    tagYear(v, 'in-year-4')
    //it was 1998
    v = cardinal.match('it (is|was) [#Cardinal]', 0)
    tagYearSafe(v, 'in-year-5')
    // re-tag this part
    cardinal.match(`${sections} of #Year`).tag('Date')
    //between 1999 and 1998
    let m = cardinal.match('between [#Cardinal] and [#Cardinal]')
    tagYear(m.groups('0'), 'between-year-and-year-1')
    tagYear(m.groups('1'), 'between-year-and-year-2')
  }

  //'2020' bare input
  let m = doc.match('^/^20[012][0-9]$/$')
  tagYearSafe(m, '2020-ish')

  return doc
}
export default tagDates

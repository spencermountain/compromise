import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/org-match] '

const arr = [

  ['google', '#Organization'],
  ['google inc', '#Organization+'],
  ['Capital One', '#Organization+'],
  ['HSBC', '#Organization'],
  ['NASA', '#Organization'],
  ['al qaeda', '#Organization+'],
  ['FBI', '#Organization'],
  ['monsanto', '#Organization'],
  ['Johnson & Johnson', '#Organization+'],
  ['Johnson & Johnson LLC', '#Organization+'],

  ['duran duran', '#Organization+'],
  ['american express', '#Organization+'],
  ['oakland athletics', '#SportsTeam'],
  [`JDI University'`, '#Organization+'],
  ['google', '#Organization'],

  [`http://cool.com/fun`, '#Url'],
  [`https://cool.com`, '#Url'],
  [`https://cool.com/`, '#Url'],
  [`https://www.cool.com/`, '#Url'],
  [`http://subdomain.cool.com/`, '#Url'],
  [`www.fun.com/`, '#Url'],
  [`www.fun.com`, '#Url'],
  [`www.fun.com/foobar/fun`, '#Url'],
  [`www.subdomain.cool.com/`, '#Url'],
  [`wwwsubdomain.cool.com/`, '#Url'],
  [`woo.br`, '#Url'],
  [`woohoo.biz`, '#Url'],
  [`woop.org/news`, '#Url'],
  [`http://woop.org/news?foo=bar`, '#Url'],
  [`http:subdomain.cool.com/`, '#Url'],
  [`http://subdomain.cool.com/`, '#Url'],
  [`https://en.m.wikipedia.org`, '#Url'],
  [`https://en.m.wikipedia.org/wiki`, '#Url'],
  [`en.m.wikipedia.org/wiki?`, '#Url'],
  ['http://fun.com/cool?fun=yes', '#Url'],

  [`s@s.com`, '#Email'],
  [`sasdf@sasdf.com`, '#Email'],
  [`sasdf@sasdf.ti`, '#Email'],
  [`_@_.com`, '#Email'],
  ['lkj@fun.com', '#Email'],
  ['j@f.ti', '#Email'],
  ['j@ti', '#Noun'],

  [`#lkjsdf`, '#HashTag'],
  [`#ll`, '#HashTag'],
  [`#22ll`, '#HashTag'],
  [`#_22ll`, '#HashTag'],
  ['#funtimes', '#HashTag'],
  // urls
  ['https://www.f3schools.com', '#Url'],
  ['https://f3scho0ls.com', '#Url'],
  ['https://www.fu4bar.f3scho0ls.com', '#Url'],
  ['http://compromise.cool', '#Url'],
  ['http://a.jp', '#Url'],

  ['@ti', '#AtMention'],
  ['#cool fun.com @cooman', '#HashTag #Url #AtMention'],

  ['FBI', '#Organization'],
  ['F.B.I.', '#Organization'],
  ['Fundo ltd.', '#Organization+'],
  ['at Fun co', 'at #Organization+'],
  ['Smith & Rogers', '#Organization+'],
  ['Google', '#Organization'],


  //abbreviations
  ['John & John,', '#Noun #Noun #Noun'],
  ['N.V.,', '#Noun'],
  ['col. Patrick said march and feb. etc.', '#Abbreviation #Person #PastTense #Month #Conjunction #Abbreviation #Abbreviation'],
  [`ANAB, ENA, CCP etc.`, '#Acronym #Acronym #Acronym #Abbreviation'],
  // ['contracted AIDS', '#PastTense #Acronym'],
  ['contacted nbc', '#PastTense #Acronym'],
  ['UNESCO', '#Acronym'],
  ['NAFTA', '#Acronym'],

]
test('match:', function (t) {
  arr.forEach(function (a) {
    const [str, match] = a
    const doc = nlp(str).compute('tagRank')
    const tags = doc.json()[0].terms.map(term => term.tagRank[0])
    const m = doc.match(match)
    const msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})
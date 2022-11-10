/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/paragraphs/src/plugin.js'
// nlp.plugin(plg)
let txt = ''
// let doc
// let m

// nlp.verbose('tagger')


// let doc = nlp('When Dona Valeria finds out that Fernando Jose is in a relationship, she gets mad at her son for dating someone beneath their social status')
// doc.compute('coreference')



// // bug 3
// let doc = nlp("Dr. John Smith-McDonald...?  ")
// let opts = {
//   keepPunct: false,
//   keepSpace: false,
//   case: false,
// }
// console.log(doc.text(opts) + '|')


// console.log(nlp('two turtledoves and a partridge in a pear tree').nouns().isSingular().out('array'))

// let doc = nlp('hello there after words')
// let regs = doc.match('(after|words)+').docs[0].map(t => {
//   return { id: t.id, optional: true }
// })

// let m = doc.match('hello there')
// console.log(doc.replaceWith('a hoy hoy').text())
// console.log(m.json({ sentence: true }))
// m.growRight(regs).debug()

// let doc = nlp('hello there')
// console.log(doc.replaceWith('a hoy hoy').text())


// console.log(nlp('$sorta').docs[0])
// console.log(nlp('....... the rest was history!.. - ').docs[0])
// nlp('~sorta').match('sorta').debug()



let arr = [
  // missing verbs
  // imperative

  // `[Talk] one on one`,
  // `[Guess] who's doing laundry`,

  // `you seem unapproachable and [closed] [off]`,
  // `make your girl [feel] greater`,
  // `what your Majesty [asks] of me`,
  // `did the sailor [ground] his son`,
  // `But before I do that [let] me put a hand on it`,
  // `if you [like] comics`,
  // `helped [marshal] support`,
  // `If a ball [hit] into play rolls foul before passing through the infield`,
  // `does my molecule [bind]`,


  // missing nouns
  // `A little [make up] can go a long way`,
  // `Take your own personality and [values] into consideration`,
  // `this witch who turned men into [pigs]`,
  // `[Snow] White roommate who fits the category`,
  // ' when he was out hunting',


  // `like dinner [parties] or game nights`,
  // `Let me take you to [places]`,
  // `Guess who's doing [laundry] there too`,
  // `You've had [smoke] blown your way`,
  // `With more [holes] than a rug`,
  // `It's [buzzcut] season anyway`,

  // 'you are hugging parked cars',
  // 'recognizing written language',
  // 'For being organized',
  // 'a nearly overpowering feeling',
  // 'keep subsidizing skyrocketing tuition',
  // `Grimy [work] you guys do`,

  // `dump truck smashing into [overpass] on the 401`,
  // `[Iron] Maiden land in Beijing`,


  // missing adjectives
  `I might be [alone] here`,
  `It's amazing how [slow] a day like this can pass`,
  `The [holy] [well] of St Guron`,
  `Must be [homesick] for the real`,
  `Consumers given [inflated] electricity bills`,
  `Sally Field & Loni Anderson were [longtime] loves of this hunk`,
  `with many [key] commanders`,
  `'Cause girl you 're [amazing] just the way you are`,
  `Everyone is [inside]`,
  `It was her [favorite] book as a kid`,
  `in this [artsy] area`,
  `I wish my [only] problem in life`,
  `It starts out [fine] but things turn [sour] really quick`,
  `in the [most] [stately] [manner]`,
  `the clatter of their [golden] wings`,
  `this is her [favourite] restaurant in Vancouver`,
  `were seamed [over] with [little] red lines`,
  `A lot of [exaggerated] hip swinging`,
  `I'll just be [alone] forever`,
  `my cupboard is [bare]`,
  `having my steak [undercooked]`,
  `Everybody was [delighted] that he should be king`,
  `Are you [as] [confused] as I am`,
  `The bennies were [outstanding]`,


  // numerous case studies
  //  the Co-Chairmen of the International Conference
  // quickly brought under control
  // This claim was settled between 
  // countries as a whole seem brighter
  // I could believe my eyes
  // expect a period of sub-par investment
  // in times of both war and peace 

  // 'Caring for Kaneohe since 1986',
  // 'Boost user engagement',
  // 'Work to improve lives',
  // 'A swaging machine works by using two or four',
  // 'NMDAR signaling increases RanBP1 expression',
  // 'Notes on eastern American poetry',
  // 'call ahead and reserve one',
  // 'in the room where you usually nurse',
  'We Sell All Brands',
  'Hillary Rodham Clinton',
  'place tea bags in hot water',
  // 'while the therapist watches',
  // 'All right relax'
  // `If you notice swelling`,
  // `and whisk to fully incorporate`,
  // `Going shopping alone`,
  // `when the killer strikes`,
  // `Your refusal may cause hurt and disappointment`,
  // 'Carpenter\'s one year of coaching',
  // `Holly objects to Nia's character`,
  // ' visa & travel assistance',
  // 'Let the dishwasher run for an entire cycle',
  // 'by encouraging carpooling',
  // 'Ohio beaver trapping season starts in late December ',
  // 'We Personally Guarantee Everything We Sell',
  // 'we personally guarantee',
  // // 'unless we win',
  // // 'and we offer',
  // "method for measuring",
  // "responsibility for setting",
  // "Attack and resolve your issues",


]


// txt = arr[0]
// let doc = nlp(txt).debug()
// doc.verbs().debug()
// doc.nouns().debug()
// console.log(doc.docs)
// doc.match('#Conjunction #Adjective #Noun').debug()
txt = 'she swam carefully away from the rock'
txt = 'i tried the waterslide and so my knees were shaking'
// txt = 'spencer ate a sandwich carefully'
// txt = 'the whole team waited to sing the canadian national anthem'
// txt = 'he made a sandwich for dinner with tomatos and cheese and sang a tune'
// txt = 'i ate tomatos and cheese'
// txt = 'please eat carefully in the kitchen'
// txt = `The band's first album Cracker was released in 1992 on Virgin Records`
// txt = `A cracker is a flat, dry baked food typically made with flour`
// txt = `A cracker is a flat, dry food typically made with flour`
// txt = `can you see the birds?`
// txt = `i saw the birds and i fed the squirrels`
// txt = `diana is pretty and cheerful`
// txt = 'she was beautiful'
// txt = 'the beautiful girl walked slowly toward the store'
txt = 'scientists at stanford university have reconstructed this 3D model of how adam and eve might have looked'


let table = nlp(txt).facts()
table.debug()
// console.dir(table.json(), { depth: 5 })

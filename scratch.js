/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
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

  `[Wear] muted or neutral colors `,
  `[Resolve] yourself`,
  `[Guess] who's doing laundry`,
  `[Maintain] eye contact `,
  `[Talk] one on one `,

  // hmmm
  `Though Foster [is] associated with beer`,
  `My very existence [is] oppressive `,
  `the things that makes Frozen so great [is] that few if any have dealt with the idea`,
  `while your kids are still growing [is] like shoveling`,


  `the earliest [recorded] interment`,
  `While it does [occur] sometimes`,
  `if you [like] comics`,
  `concessions that are [needed]`,
  `you’ll also soon pfind] that you’ve become her friend`,
  `you're [set] `,
  `will also make her [see] that you're [interested]`,
  `Bite or [lick] your lower lip`,
  `you seem unapproachable and [closed] [off]`,
  `lost all track of time and [burnt] the cake `,
  `But before I do that [let] me put a hand on it `,
  `make your girl [feel] greater attraction to you`,
  `what your Majesty [asks] of me`,
  `Instagram star [captures] the silent beauty`,
  `the values that [make] America special`,
  `did the sailor [ground] his son `,
  `if the trees [hug] back `,
  `if your fast [was] on the shorter side `,
  `19 tornadoes in its history [kill] more than 100 people`,
  `helped [marshal] support`,
  `Find out if your [desired] pet is virtual`,
  `If a ball [hit] into play rolls foul before passing through the infield `,
  `that I’d [wear] them all the time`,
  `the suffering and chaos of our world [undercut] our long term security`,
  `does my molecule [bind] `,
  `go as I [please] `,
  `But the Oak tree [understood] and felt sad`,


  // missing nouns
  `A little[make][up] can go a long way `,
  `by asking[questions] about her`,
  `Take your own personality and[values] into consideration`,
  `[Snow] White roommate who fits the category `,
  `Keep it casual for the first[date] `,
  `this witch who turned men into[pigs] `,
  `too expensive for home[use]`,
  `[Middle] aged men live[out] big league baseball[dreams] at these camps `,
  `Sexual coercion is also[rape] `,
  `like dinner[parties] or game nights `,
  `Let me take you to[places] you've never been`,
  `Are you[guys] staying the night `,
  `Guess who's doing [laundry] there too `,
  `The only[losers] are the big cheesecake conglomerate`,
  `You've had [smoke] blown your way`,
  `The term novel[originates] from the production of short stories`,
  `Your[jumping] off a rope[swing]`,
  `On[Dutch][maps] this country is called Oostenrijk `,
  `Our balanced budget will increase[funding]`,
  `What's small brown, hairy and [wears] sunglasses `,
  `Give more[details]`,
  `this place is a[must]`,
  `Tremors in Saurashtra spread[panic] `,
  `With more[holes] than a rug`,
  `Only[parents] can make sure the TV is turned off`,
  `It's [buzzcut] season anyway `,
  `But[no][worries] just[park] in the lot`,
  `[Channel][surfing][reigns] again`,
  `his[ashen] gray face became[scarlet] with [rage]`,
  `Grimy[work] you guys do `,
  `she's [worth] a [shot] `,
  `Where ships dock`,
  `in the[most][stately][manner] `,
  `Engage your body and[mind] with yoga`,
  `We did a little[improv] there`,
  `This was the first[time] a Scottish team had qualified`,
  `dump truck smashing into[overpass] on the 401`,
  `[Iron] Maiden land in Beijing`,
  `The top 10[dance] music festivals`,
  `I never hurt you[sweetheart] I never pulled my gun`,
  `[Frame] dental procedures in simple terms`,
  `[Bitches] be frustrated`,


  // missing adjectives
  `I might be [alone] here`,
  `It's amazing how [slow] a day like this can pass `,
  `The [holy] [well] of St Guron `,
  `Must be [homesick] for the real `,
  `Consumers given [inflated] electricity bills`,
  `Sally Field & Loni Anderson were [longtime] loves of this hunk `,
  `with many [key] commanders`,
  `'Cause girl you 're [amazing] just the way you are `,
  `Everyone is [inside]`,
  `It was her [favorite] book as a kid `,
  `in this [artsy] area`,
  `I wish my [only] problem in life`,
  `It starts out [fine] but things turn [sour] really quick `,
  `in the [most] [stately] [manner] `,
  `the clatter of their [golden] wings`,
  `this is her [favourite] restaurant in Vancouver `,
  `were seamed [over] with [little] red lines `,
  `A lot of [exaggerated] hip swinging`,
  `I'll just be [alone] forever`,
  `my cupboard is [bare] `,
  `having my steak [undercooked]`,
  `Everybody was [delighted] that he should be king`,
  `Are you [as] [confused] as I am `,
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


txt = arr[0]
let doc = nlp(txt).debug()
// console.log(doc.docs)
// doc.match('#Conjunction #Adjective #Noun').debug()


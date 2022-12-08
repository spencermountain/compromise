/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/paragraphs/src/plugin.js'
// nlp.plugin(plg)
let txt = ''
// let doc
// let m

nlp.verbose('tagger')


// let doc = nlp('When Dona Valeria finds out that Fernando Jose is in a relationship, she gets mad at her son for dating someone beneath their social status')
// doc.compute('coreference')


// let doc = nlp('the boys play video games in their free time')
// doc.compute('coreference')
// doc.debug()
// doc.pronouns('their').refersTo().debug()
// console.log(doc.docs[0])



// let doc = nlp('hello there')
// console.log(doc.replaceWith('a hoy hoy').text())


let arr = [
  // missing verbs
  // imperative

  //  %Plural|Verb% %Noun|Verb%
  // `[Shares] [finish] [lower] on [sustained] selling `,
  // `forward: appartment pricing`,
  // `[wear] [deserted] look `,
  // `[Place] items in the top`,

  // imperatives
  // `C'mon, Luisa, you have a chance`,
  // `would you mind watching Ben for me?`,
  // `i see the girl, respect the guard, and go right home`,
  // `if Chandler had kissed her, would you hear him out?`,
  // `Honey, would you like a snack?`,
  // `teach him five lessons`,
  // `Have things to occupy yourself during the trip.`,
  // `Service wise, no complaints`,

  // 'The Bill was passed',
  // 'give parents their power',
  // `were overrun by insurgents`,
  // `been overrun by insurgents`,
  // `would not give rise`,
  // `he will stroll downtown`,
  // `I wasn't born until he was`,
  // `people who will explore`,
  // 'Does he blink frequently?',
  // 'they have more product.',
  // `re-tool my exhaust`,


  // `soy green tea lattes are [amazing] `,
  // `Seeing them [drive] away`,
  // 'some require equity in order to qualify',
  // `[Light] [travels] [faster] than [sound] `,
  // `[this] [is] [a] [cool] [place] hang out`,
  // `Not, not more bureaucracy, not more red tape`,
  // `we'll soon make him shudder.`,
  // `just like a dream`,
  // `[Why] did [Jon] Snow [stand] in line`,
  // `he would [later] [confess] [that] `,
  // `why the job [matters] to you `,
  // `women never [like] Joey `,
  // `I let another one [get] [away] `,
  // `He was [shot] in the chest and arm and [received] shrapnel [wounds]`,
  // `[Compile] information about [claims] you filed`,
  // `The flounder and fungus are [prepared] Sichuan style`,
  // `a win-win situation`,
  // `[Browse] [to] the C:\\RealityFactory`,
  // `Uh-huh Jim [Carrey] is [challenged]`,
  // `Stand tall [hold] your head high `,
  // `Renovations at Union Station [reveal] pristine facade `,
  // `[Proofread] your writing`,
  // `And the word [spread] of Billy the Kid `,
  // `You can [soon] [drink] coffee`,
  // `[Advocates] [lock] court premises`,
  // `HC [calls] for CBI chargesheet `,
  // `where a train [stops] `,
  // `[estimates] [show] that by the end`,
  // `Spice [slashes] airtime [rates] for [cashcard] users `,
  // `And [more] Americans [finish] college`,
  // `[where] an ocean liner is [launched] `,

  // ^%Noun|Verb% %Plural|Verb%

  // `it's milk`,
  // `it's well known`,
  // `when's he coming`,
  // `it's well known for it's burger`,
  // `so that [workers] can take [time] [off]`,
  // `Statistics [show] [that] teen pregnancy`,
  // `were as [follows]`,
  // 'cake',
  // 'cupcakes',
  // 'earthquakes',
  // 'mistakes',
  // 'snakes',
  // '3 takes',

  // `hundred shots in my face and [hands] `,
  // `he'd make it right`,
  // `look more intimidating.`,
  // `Men are like bank accounts.`,
  // `can we account for earthquakes?`,
  // `back to my friends house`,
  // `a filling pita wrap.`,
  // `when it comes to grades.`,
  // `your education and training`,
  // `ensure privacy, and save lives.`,
  // `Air, air, air, air, air, air`,
  // ` previous games were generally mirrors`,
  // `the bird song was deafening.`,
  // ` side to side`,
  // 'their past mistakes',

  // `very runny and soup-like.`,
  // `bring you back`,
  // `community of cooperation, not conflict.`, //something wrong here?
  // `show you trigger discipline.`,
  // `show u trigger discipline.`,
  // `the medicines and stuff.`,
  // `Type your desired [name] into the box `,
  // 'the appalling chemical-weapons attack',
  // `[The] [housing] and employment crisis`,

  // 'then better bring dog too',
  // `brighter [lights] and [colours] `,
  // `during your Christmas [shopping] this year`,
  // `the sharing of electron [pairs] between atoms`,
  // `[Brainstorm] other ways of [understanding] your [appearance]`,


  `I'm [still] in love`,
  `Next [stage] of the trip`,
  `I go in the [back] and the fireman are laughing `,
  `[Practice] asserting yourself `,
  `[To] [all] you [vegetarians] `,
  `the California [poppy] matilija`,
  `Eat a new [kind] of breakfast `,
  `He attended Khanqah [gatherings] [there]`,
  `That cute nibbly [noise] [when] she eats `,
  `eating [in] the [parking] lot `,
  `from the [gravest] health threat that they face an [epidemic] of teen smoking`,
  `walked [hand] [in] hand `,
  `Walk or [bike] everywhere you can `,
  `I had a [roasted] chicken [craving] one day`,
  `I feel quite [drowsy] `,
  `an [evidentiary] [hearing]`,
  `You mean older [sister] or younger `,
  `a monopoly on East Coast [gambling] `,
  `There is [plenty] of [interstate] commerce`,
  `Have a [back] up buddy`,
  // `external factors [such] as [pathogens]`,
  // `the bottom [row] in the [crafting] table `,
  // `he [drew] [plans] for [building] a dam`,
  // `both [dishes] came with steak [fries]`,
  // `suddenly [there] came a [tapping] `,
  // `both [drive] [thru] and [front] counter`,
  // `putting on frilly [knickers] `,
  // `Wait for the [breeding] time [to] [finish] `,
  // `pub serves up [indulgent] mac and cheese `,
  // `involves one or [more] [umpires] [who] make rulings `,
  // `three of my [favorite] [coats] `,
  // `security can vanish in an [instant]`,
  // `was by [no] [means] cool`,
  // `played their home [games] in the Los Angeles Memorial`,
  // `in the [chill] [out] room`,
  // `[Reintroduce] [foods] one at a time `,
  // `[Speed] Post [moves] at snail pace `,
  // `should I attend their [seminar] `,
  // `you shoulda seen her [face] [when] I took it`,
  // `looking [beyond] the [present]`,
  // `He ceased [playing]`,
  // `5 Toronto mega [projects] [set] for completion`,
  // `[Sure] vaping is a much safer [alternative] [to] [smoking] `,
  // `a giant [glimmering] silver web`,
  // `they call it [self] confidence `,
  // `i'm helping abbie [vacuum]`,
  // `a mental health [professional] `,
  // `oh [well] [awkwardness] is bad `,
  // `I enjoyed he [variety] of sauces`,
  // `Two vultures [board] an airplane`,
  // `In the [past] the minimum wage has been a [bipartisan] issue`,
  // `Become a crime [laboratory] analyst `,
  // `your [taxes] [should] go [up]`,


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
  // `The [holy] [well] of St Guron`,
  // `with many [key] commanders`,
  // `'Cause girl you're [amazing] just the way you are`,
  // `things turn [sour] really quick`,
  // `their [chosen] paths`,
  // `Are you [as] [confused] as I am`,
  // `I wish my [only] problem in life`,
  // `You and my sister, sittin’ in a tree.`,
  // `prepayment has taken 45 days alone`


  // `the Co-Chairmen of the International Conference`,
  // `countries as a whole seem brighter`,
  // `four years of uninterrupted economic growth`,
  // `because people of varying ethnicities`,

  // 'Caring for Kaneohe since 1986',
  // 'Boost user engagement',
  // 'Work to improve lives',
  // 'A swaging machine works by using two or four',
  // 'NMDAR signaling increases RanBP1 expression',
  // 'Notes on eastern American poetry',
  // 'call ahead and reserve one',
  // 'in the room where you usually nurse',
  // 'We Sell All Brands',
  // 'place tea bags in hot water',
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
  // 'Co-accused denied bail',

  // 'they are stored unshelled in silos',
  // 'the liver is found associated with the kidneys',
  // 'over-joyous',
  // 'must-see movie',


  // 'some coarsely-ground peanut fragments included',
  // 'food scientists working in the US',
  // 'helping prepare',
  // 'selecting paste',
  // 'bringing hope',
  // 'getting time off',
  // 'for being born',
  // 'fans that are blowing feel amazing',
  // 'recognizing written language',
  // 'a process of milling roasted peanuts',
  // 'my racing snail',
  // 'a nearly overpowering feeling',
  // 'and so requires stirring',
  // 'a nearly overpowering feeling',
  // ' whilst being rocked to permit even roasting.',
  // '300 gang-related',
  // '5 must-try burgers',
  // 'vacuum-sealed',
  // 'raise standards of living',
  // 'sources of saturated and monounsaturated fats',
  // `I'm practising walking`,

  // 'going to stop posting schedules',
  // `Sports awards to be given on Tuesday`

]


txt = arr[0]
let doc = nlp(txt).debug()
// doc.verbs().toPresentTense()
// doc.debug()
// console.log(nlp(txt).docs[0])


// doc.nouns().debug()
// console.log(doc.docs)
// doc.match('#Conjunction #Adjective #Noun').debug()
// txt = 'she swam carefully away from the rock'
// txt = 'i tried the waterslide and so my knees were shaking'
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
// txt = 'scientists at stanford university have reconstructed this 3D model of how adam and eve might have looked'


// let table = nlp(txt).facts()
// table.debug()
// console.dir(table.json(), { depth: 5 })

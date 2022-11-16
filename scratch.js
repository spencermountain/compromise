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


  // `been overrun by insurgents`,
  // `I wasn't born until he was`,
  // `people who will explore`,
  // 'Does he blink frequently?',
  // 'they have more product.',
  // `re-tool my exhaust`,


  'I hope you have',
  // `soy green tea lattes are [amazing] `,
  `you can [grace] the [front] page`,
  `[Cute] neighborhood`,
  `do [you] [eat] [it] [up] before`,
  `Seeing them [drive] away`,
  `[Light] [travels] [faster] than [sound] `,
  `[this] [is] [a] [cool] [place] hang out`,
  `Not, not more bureaucracy, not more red tape`,
  `we'll soon make him shudder.`,
  `it's just poop.`,
  `just like a dream`,
  `but [much] [finer]`,
  `Nuclear Power Corp [exceeds] [target] `,
  `my [proposed] budget recognizes this`,
  `MCD [sets] up grievance cell `,
  `[Why] did [Jon] Snow [stand] in line`,
  `he would [later] [confess] [that] `,
  `why the job [matters] to you `,
  `Rajnath [sacks] LCP minister`,
  `I ask Congress [enact] [new] [safeguards]`,
  `women never [like] Joey `,
  `[Stricter] border enforcement will help [combat] illegal drugs `,
  `If something funny [happened] [to] you`,
  `I let another one [get] [away] `,
  `[Long] [live] Prince Prigio `,
  `[look] [what] we almost left `,
  `summer school programs [which] [boost] achievement`,
  `Their tanks and shirts [last] a long time`,
  `[Umm] [excuse] me we switched apartments `,
  `If anyone [lost] a roll of hundred dollar bills`,
  `The thing [is] [I] [am] really a sweets person `,
  `He was [shot] in the chest and arm and [received] shrapnel [wounds]`,
  `[Compile] information about [claims] you filed`,
  `[Explore] [as] [much] of the game world as you can `,
  `J.P. Hayes [cost] himself a 2009 [spot] [on] this tour`,
  `The flounder and fungus are [prepared] Sichuan style`,
  `By 9pm [she] [still] [had] potted a single ball `,
  `Garbage [dumps] [pose] health hazard `,
  `[Obtain] a [high] school diploma `,
  `I did [do] [too] well`,
  `a win-win situation`,
  `Radio Mirchi [spices] [up] [Indore] `,
  `[Browse] [to] the C:\\RealityFactory`,
  `[dressed] up for a fancy date `,
  `Uh-huh Jim [Carrey] is [challenged]`,
  `Stand tall [hold] your head high `,
  `Renovations at Union Station [reveal] pristine facade `,
  `only my eyes and teeth are [left] `,
  `My better [half] [says] the staff are very friendly`,
  `[Had] I been as you say dead `,
  `I'm [done] with running`,
  `[when] this song [plays] you put your hand [over] your heart`,
  `[Proofread] your writing`,
  `And the word [spread] of Billy the Kid `,
  `Fireplace tool that [consists] of matching`,
  `[Connect] with them regularly `,
  `I find Marion’s [views] [far] [progressionist] `,
  `[Look] [here] said the king`,
  `[How] do you [clear] [out] a veterans bingo hall `,
  `Nothing in life that’s [worth] anything [is] easy `,
  `[Left] after an hour`,
  `[So] she [seated] herself`,
  `You can [soon] [drink] coffee`,
  `[How] could anyone [stoop] so low `,
  `[Advocates] [lock] court premises`,
  `The United States also [expanded] into the Pacific`,
  `I hear the bowling [is] good`,
  `[So] the [giant] [lay] [down] [to] sleep again`,
  `If your feet [smell] and your nose [runs] you're built [upside] [down] `,
  `[Ace] your oral examinations`,
  `work was [done] well and on time`,
  `[lighten] the mood `,
  `the attempt [initiated] in 1705`,
  `he actually reaches for his crib [while] being lowered [snuggles] [up] with his blanket`,
  `HC [calls] for CBI chargesheet `,
  `health care centers are being [established]`,
  `PAC [constable] [confesses] involvement`,
  `[Submit] a medical certificate`,
  `and still [charged] us for them`,
  `she is [like] a [red] [rose]`,
  `where a train [stops] `,
  `it may [exceed] [18] % alcohol `,
  `[estimates] [show] that by the end`,
  `Spice [slashes] airtime [rates] for [cashcard] users `,
  `And [more] Americans [finish] college`,
  `[where] an ocean liner is [launched] `,
  `[Cut] 3 squares`,
  `[Thou] [shalt] have my daughter`,
  `[Ask] [questions]`,
  `I need [stop] [quoting] [Run] D.M.C.`,
  `Well [known] for it's [burger] `,
  `very friendly and [passionate] about coffee `,
  `Bile [either] [drains] directly `,
  `so that [workers] can take [time] [off]`,
  `Then he [drew] the Sword of Sharpness`,
  `by the sea [shore] `,
  `Statistics [show] [that] teen pregnancy`,
  `or [otherwise] directly [effects] an [out]`,
  `It's [no] [accident] that stressed spelled [backwards] [is] desserts `,
  `Govt [irks] groups [over] Srikrishna `,
  `were as [follows]`,
  `The way autotune [works] is [that] it forces whatever [signal] it receives`,
  `Come on [let] go`,
  `[Excuse] yourself by saying you need a bit of fresh air`,
  `[All] [set] for second phase`,


  // missing nouns

  `tomatoes- [green] yellow red ones`,
  `gd luck shopping then [tonight] then tell me [if] u got any nice stuff `,
  `We remain on the [offensive] in Afghanistan`,
  `hundred shots in my face and [hands] `,
  `my dog makes [fun] of me `,
  `My window [cleaner] was banging on my window`,
  `This tour is [SUCH] a great idea`,
  `was the [undisclosed] information`,
  `cured my homesickness for [LA] `,
  `Hunsur [canal] breach `,
  `The [very] [breadth] of the subjects`,
  `Keep a food [journal] [where] you note down everything`,
  `shall be many a [lute]`,
  `The [past] and the future`,
  `Type your desired [name] into the box `,
  `[The] [housing] and employment crisis`,
  `forbids a [sentencing] scheme `,
  `brighter [lights] and [colours] `,
  `really scary [there] for a [while] `,
  `during your Christmas [shopping] this year`,
  `that comes into [play]`,
  `A glass cannon [build] [will] be easier`,
  `[New] Barque [spin] [off] [doubles] as butcher and snack bar `,
  `the sharing of electron [pairs] between atoms`,
  `[Brainstorm] other ways of [understanding] your [appearance]`,
  `these many stars and [reviews] `,
  `Cocaine [use] is [declining] `,
  `You [ladies] will excuse me`,
  `The title of this 1968 [film] about a school`,
  `I very rarely have [cash]`,
  `a smarter [kind] of leadership `,
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
  `external factors [such] as [pathogens]`,
  `the bottom [row] in the [crafting] table `,
  `he [drew] [plans] for [building] a dam`,
  `both [dishes] came with steak [fries]`,
  `suddenly [there] came a [tapping] `,
  `both [drive] [thru] and [front] counter`,
  `putting on frilly [knickers] `,
  `Wait for the [breeding] time [to] [finish] `,
  `pub serves up [indulgent] mac and cheese `,
  `involves one or [more] [umpires] [who] make rulings `,
  `three of my [favorite] [coats] `,
  `security can vanish in an [instant]`,
  `was by [no] [means] cool`,
  `played their home [games] in the Los Angeles Memorial`,
  `in the [chill] [out] room`,
  `[Reintroduce] [foods] one at a time `,
  `[Speed] Post [moves] at snail pace `,
  `should I attend their [seminar] `,
  `you shoulda seen her [face] [when] I took it`,
  `looking [beyond] the [present]`,
  `He ceased [playing]`,
  `5 Toronto mega [projects] [set] for completion`,
  `[Sure] vaping is a much safer [alternative] [to] [smoking] `,
  `a giant [glimmering] silver web`,
  `they call it [self] confidence `,
  `i'm helping abbie [vacuum]`,
  `a mental health [professional] `,
  `oh [well] [awkwardness] is bad `,
  `I enjoyed he [variety] of sauces`,
  `Two vultures [board] an airplane`,
  `In the [past] the minimum wage has been a [bipartisan] issue`,
  `Become a crime [laboratory] analyst `,
  `your [taxes] [should] go [up]`,


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
  'We Sell All Brands',
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
// doc.verbs().debug()
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

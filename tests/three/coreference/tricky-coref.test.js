import test from 'tape'
import nlp from '../_lib.js'

const cases = [
  // Deferred: Needs discourse salience: prices, not the nearer polls.
  // [
  // " Gas prices are a top issue heading into the midterms. Polls show they’re high on voters’ minds",
  // [["they","gas prices"]]
  // ],
  // Deferred: Forward reference: the antecedent follows the pronoun.
  // [
  // " In their free time, the boys play video games",
  // [["their","the boys"]]
  // ],
  [
    "The queen, who did not believe in Firedrakes, alone took his side.",
    []
  ],
  // Deferred: Ambiguous him; sharing Byron with he would normally require himself. Initial his is also forward-looking.
  // [
  // "In his 1811 will, Byron requested that he be buried with him.",
  // [["his","byron"],["he","byron"]]
  // ],
  // Deferred: Both instances of she refer to an unnamed woman, not the choreographer.
  // [
  // "In 2010 she got engaged to a choreographer she met on the set of \"Black Swan\"",
  // []
  // ],
  // Deferred: The top one percent denotes a group; nearer taxes is a distractor.
  // [
  // "And let's close the loopholes that lead to inequality by allowing the top one percent to avoid paying taxes on their accumulated wealth.",
  // [["their","the top one percent"]]
  // ],
  [
    "The Sultan asked her kindly what she had in the napkin, whereupon she unfolded the jewels and presented them.",
    [["them","the jewels"]]
  ],
  // Deferred: Both the magician and Sultan are plausible possessors.
  // [
  // "Then the magician went back and told to the Sultan his story.",
  // [["his","the magician"]]
  // ],
  // Deferred: Unspecified service providers; days must not be chosen as an antecedent.
  // [
  // "This now takes 15 days, but they give you a piece of paper to use as ID in the interim.",
  // []
  // ],
  [
    "When his twentieth birthday was passed the Queen thought it was time that he should be married, so she commanded that the portraits of several princesses should be brought for him to see",
    [["she","the queen"]]
  ],
  [
    "His mother wrote, \"He has no indisposition that I know of but love, desperate love, the worst of all maladies in my opinion.",
    []
  ],
  // Deferred: Requires semantic knowledge linking stigmas to plants.
  // [
  // "To ensure these plants set seed, biologists rappel down 3000 foot cliffs to brush pollen onto their stigmas.",
  // [["their","these plants"]]
  // ],
  [
    "Byron was a bitter opponent of Lord Elgin's removal of the Parthenon marbles from Greece and \"reacted with fury\" when Elgin's agent gave him a tour of the Parthenon, during which he saw the spaces left by the missing friezes and metopes.",
    [["him","byron"],["he","byron"]]
  ],
  [
    "The Grand Vizier and the lords of council had just gone in as she entered the hall and placed herself in front of the Sultan.",
    []
  ],
  // Deferred: They refers to children, not the wrong things; multiple intervening phrases.
  // [
  // "It takes every parent to teach the children the difference between right and wrong and to encourage them to learn and grow and to say no to the wrong things but also to believe that they can be whatever they want to be.",
  // [["them","the children"],["they","the children"],["they","the children"]]
  // ],
  // Deferred: The server is not selected as the nearest person.
  // [
  // "The shock came when a friend ordered a highball ....we flagged down a server, she returned from the bar.",
  // [["she","a server"]]
  // ],
  // Deferred: They most naturally refers to the fairies, not the Grey Women.
  // [
  // "These grave dancing fairies were very unlike the Grey Women, and they were glad to see the boy, and treated him kindly.",
  // [["they","these grave dancing fairies"],["him","the boy"]]
  // ],
  // Deferred: Different her occurrences have different referents; needs narrative and possessive resolution.
  // [
  // "Little Red Riding-Hood undressed herself and went into bed, where, being greatly amazed to see how her grandmother looked in her night-clothes, she said to her: Grandmamma, what great arms you have got!",
  // [["her","little red riding hood"],["her","her grandmother"],["she","little red riding hood"],["her","her grandmother"]]
  // ],
  // Deferred: Requires distinguishing the employer from the subject of work for.
  // [
  // "It was hard mostly because my aunt owns a restaurant and my mother used to work for her, so every meal is king's size and quality.",
  // [["her","my aunt"]]
  // ],
  // Deferred: They denotes an unnamed restaurant or staff, not the city; antecedent is implicit.
  // [
  // "One more point... In a city as concerned about recycling and not using non-degradable materials, I found it kind of off-putting that they use styrofoam plates, plastic eating utensils and cups.  At the prices they charge for chicken, they could afford washable plates, bowls, and flatware.",
  // [["they","a city"],["they","a city"],["they","a city"]]
  // ],
  // Deferred: Ambiguous names require external gender knowledge or stronger grammatical preferences.
  // [
  // "Putlibai gave Gandhi her permission and blessing.",
  // [["her","putlibai"]]
  // ],
  // Deferred: Predicate nominal and subject describe the same entities; canonical antecedent choice is unresolved.
  // [
  // "Amino acids are poor modular building-blocks because they do not act independently and there is a fundamental lack of understanding about the relationship between linear amino acid sequences and the folding and functionality of proteins.",
  // [["they","amino acids"]]
  // ],
  [
    "He later slept with women in the same bed but clothed, and finally he slept naked with women.",
    []
  ],
  // Deferred: They refers to our people, not the tools; needs relative-clause roles.
  // [
  // "give our people the tools they need",
  // [["they","our people"]]
  // ],
  // Deferred: Initial They is unresolved; later pronouns must retain the women across distractors.
  // [
  // "They were like three very beautiful young women, dressed one in green, one in white, and one in red, and they were dancing and singing round an apple tree with apples of gold, and this was their song:",
  // [["they","three very beautiful young women"],["their","three very beautiful young women"]]
  // ],
  // Deferred: Partitive population phrase requires semantic number and correct phrase boundaries.
  // [
  // "What I would say to those who argue that the worst is over is this: over the course of the last 2 years, the government of Sudan and its surrogates killed as many as 400,000 people and drove one third of the population of Darfur off their land.",
  // [["their","one third of the population"]]
  // ],
  // Deferred: Menus and tables are both plausible; causal interpretation needs broader reasoning.
  // [
  // "Therefore, our menus stayed on the tables because they were too sticky to be removed.",
  // [["they","our menus"]]
  // ],
  [
    "I have also heard rumors that drivers save on gas when they ride with their windows down and the A/C off.",
    [["they","drivers"],["their","drivers"]]
  ],
  // Deferred: Quoted he is external; later his and him may have different referents.
  // [
  // "Besides, said this kind young lady, I hear he is extremely handsome, and very brave; and he has a good heart, for he was kind, I have heard, to a poor boy, and did all his examination papers for him, so that the boy passed first in everything.",
  // []
  // ],
  // Deferred: Needs an embedded antecedent inside a longer noun phrase.
  // [
  // "give a precise scientific theory of the syntax rules of grammar and their function",
  // [["their","the syntax rules"]]
  // ],
  // Deferred: Both copy-holders and writings are plausible; possession needs context.
  // [
  // "the copy-holders had writings with their holdings.",
  // [["their","the copy-holders"]]
  // ],
  // Deferred: Predicate clouds and subject tornadoes corefer; canonical antecedent choice is unresolved.
  // [
  // "Tornadoes are swirling clouds. They arrive during the summer",
  // [["they","tornadoes"]]
  // ],
  // Deferred: Needs subject salience across plural distractors.
  // [
  // "Tornadoes come in many shapes and sizes, and they are often visible in the form of a condensation funnel originating from the base of a cumulonimbus cloud, with a cloud of rotating debris and dust beneath it.",
  // [["they","tornadoes"]]
  // ],
  // Deferred: Singular they must resolve to enemy rather than the nearer scenes.
  // [
  // "An enemy watched all of these scenes, adjusted their tactics, and in 2006 they struck back.",
  // [["their","an enemy"],["they","an enemy"]]
  // ],
  // Deferred: Correct entity is found, but the antecedent loses disadvantaged.
  // [
  // "I also asked this Congress to support our efforts to enlist colleges and universities to reach out to disadvantaged children, starting in the sixth grade, so that they can get the guidance and hope they need so they can know that they, too, will be able to go on to college.",
  // [["they","disadvantaged children"],["they","disadvantaged children"],["they","disadvantaged children"],["they","disadvantaged children"]]
  // ],
  // Deferred: Needs the possessor magician, not the entire conduct phrase.
  // [
  // "The Sultan was very well pleased with the magician's conduct, and said to her: Do you as you think fit; I'll wait patiently the event of your promises, and to encourage her made her a present of a diamond of great value.",
  // [["her","the magician"],["her","the magician"],["her","the magician"]]
  // ],
  // Deferred: They denotes Fairley’s business or staff, not the full clause.
  // [
  // "Although the price I pay for my prescriptions is competitive or lower than the larger chains, Fairley's adds considerable value by being who they are: kind, helpful, service-oriented, and accurate.",
  // [["they","fairley's"]]
  // ],
  // Deferred: Needs subject salience over the nearer heights.
  // [
  // "Men are of different heights, yet they range about a mode.",
  // [["they","men"]]
  // ],
  // Deferred: Quoted they is external; battles is not a valid actor.
  // [
  // "\"Many and prolonged were the battles they fought\" on this topic, but Huxley maintained his agnostic position.",
  // []
  // ],
  // Deferred: Unnamed woman and predicate nominal need discourse-level identity handling.
  // [
  // "Her first hubby was Billy Smith; she was a topless dancer when she met No. 2, oilman J. Howard Marshall, 60+ years her senior",
  // []
  // ],
  // Deferred: Her and she denote an unnamed woman; God is not the antecedent.
  // [
  // "And I'll hold her like a lady, thank God she's all mine",
  // []
  // ],
  // Deferred: Them is supported, but the noun phrase selects best friends instead of his friends.
  // [
  // "You don't need to be best friends with his friends, but it helps if you can tolerate them well enough to spend time around them when necessary.",
  // [["them","his friends"],["them","his friends"]]
  // ],
  [
    "Some citizens in this Canadian capital get their news from the Citizen newspaper",
    [["their","some citizens"]]
  ],
  [
    "In May 1961 he vowed to land a man on the moon & return him safely to Earth by the end of the decade",
    [["him","a man"]]
  ],
  // Deferred: Needs subject salience over the nearer ages.
  // [
  // "These teeth usually erupt between the ages of 17 & 25, hence their popular name",
  // [["their","these teeth"]]
  // ],
  // Deferred: Needs distant organization antecedent across several plural distractors.
  // [
  // "She emphasized the important activities undertaken by non-governmental organizations active in women's rights and suggested investigating ways to utilize their contributions more actively.",
  // [["their","non-governmental organizations"]]
  // ],
  // Deferred: Needs subject salience across a list of places.
  // [
  // "Peasant farmers in Africa, Haiti, and other impoverished regions currently plant their crops without the benefit of high-yield seed varieties and fertilizers.",
  // [["their","peasant farmers"]]
  // ],
  // Deferred: Needs the possessor artist, not the entire ability phrase.
  // [
  // "We may even consider it a rewarding testament to an artist’s ability to overcome his past mistakes and still produce priceless work.",
  // [["his","an artist"]]
  // ],
  // Deferred: Substantivized adjective the poor and intervening plural distractors.
  // [
  // "The poor in developing countries are again being made to endure the worst consequences of a crisis that they played no part in creating.",
  // [["they","the poor"]]
  // ],
  // Deferred: Elliptical as well they should requires clause-level subject tracking.
  // [
  // "Northern taxpayers will be forced to inject massive amounts of capital into banks, even if the authorities impose significant losses on banks’ large and wholesale creditors, as well they should.",
  // [["they","the authorities"]]
  // ],
  // Deferred: Initial couple is implicit; soul-mates must not become a new antecedent.
  // [
  // "Their relationship turns physical quickly and they both believe that they are soul-mates, until one day, the provincial girl comes home to find a man in their bed.",
  // []
  // ],
  // Deferred: Attachment of their is ambiguous among policies, countries, and the organization.
  // [
  // "A number of studies will be presented on environmental policies and standards adopted by the major countries of the Organisation for Economic Cooperation and Development (OECD) and their impact on market access and competitiveness for Latin American exports.",
  // [["their","environmental policies and standards"]]
  // ],
  // Deferred: They denotes new member states, not Brussels; tagging and attachment need work.
  // [
  // "the leverage of Brussels over new member states increases rather than diminishes after they join.",
  // [["they","new member states"]]
  // ],
  // Deferred: Collective singular committee requires singular-they support.
  // [
  // "the committee gathered their delegates",
  // [["their","the committee"]]
  // ],
]

test('[three/coreference] reviewed tricky cases', t => {
  cases.forEach(([input, expected]) => {
    const actual = []
    nlp(input).pronouns().hasReference().forEach(pronoun => {
      actual.push([pronoun.text('implicit').toLowerCase(), pronoun.refersTo().text('normal')])
    })
    t.deepEqual(actual, expected, input)
  })
  t.end()
})

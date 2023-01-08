import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference] '

// https://github.com/google-research-datasets/gap-coreference
test('coreference:', function (t) {
  let arr = [

    // double they
    [` Gas prices are a top issue heading into the midterms. Polls show they’re high on voters’ minds`,
      { they: 'Gas prices' },
    ],
    // anaphor-before
    [` In their free time, the boys play video games`,
      { their: 'the boys' },
    ],

    // tricky:
    [
      "The queen, who did not believe in Firedrakes, alone took his side.",
      { "his": "the queen" }
    ],
    [
      "In his 1811 will, Byron requested that he be buried with him.",
      {
        "he": "byron", "him": "byron"
      }
    ],
    [
      "In 2010 she got engaged to a choreographer she met on the set of \"Black Swan\"",
      { "she": "a choreographer" }
    ],
    [
      "And let's close the loopholes that lead to inequality by allowing the top one percent to avoid paying taxes on their accumulated wealth.",
      { "their": "the top one percent" }
    ],

    [
      "The Sultan asked her kindly what she had in the napkin, whereupon she unfolded the jewels and presented them.",
      {}
    ],

    [
      "Then the magician went back and told to the Sultan his story.",
      { "his": "the magician" }
    ],

    [
      "This now takes 15 days, but they give you a piece of paper to use as ID in the interim.",
      {

      }
    ],
    [
      "When his twentieth birthday was passed the Queen thought it was time that he should be married, so she commanded that the portraits of several princesses should be brought for him to see",
      { "she": "the queen" }
    ],

    [
      "His mother wrote, \"He has no indisposition that I know of but love, desperate love, the worst of all maladies in my opinion.",
      {}
    ],
    [
      "To ensure these plants set seed, biologists rappel down 3000 foot cliffs to brush pollen onto their stigmas.",
      { "their": "these plants" }
    ],
    [
      "Byron was a bitter opponent of Lord Elgin's removal of the Parthenon marbles from Greece and \"reacted with fury\" when Elgin's agent gave him a tour of the Parthenon, during which he saw the spaces left by the missing friezes and metopes.",
      { "him": "Byron", "he": "Byron" }
    ],
    [
      "The Grand Vizier and the lords of council had just gone in as she entered the hall and placed herself in front of the Sultan.",
      {}
    ],


    [
      "It takes every parent to teach the children the difference between right and wrong and to encourage them to learn and grow and to say no to the wrong things but also to believe that they can be whatever they want to be.",
      { "they": "the wrong things" }
    ],

    [
      "The shock came when a friend ordered a highball ....we flagged down a server, she returned from the bar.",
      { "she": "a server" }
    ],
    [
      "These grave dancing fairies were very unlike the Grey Women, and they were glad to see the boy, and treated him kindly.",
      { "they": "the grey women", "him": "the boy" }
    ],
    [
      "Little Red Riding-Hood undressed herself and went into bed, where, being greatly amazed to see how her grandmother looked in her night-clothes, she said to her: Grandmamma, what great arms you have got!",
      { "her": "her grandmother", "she": "her grandmother" }
    ],
    [
      "It was hard mostly because my aunt owns a restaurant and my mother used to work for her, so every meal is king's size and quality.",
      { "her": "my aunt" }
    ],
    // awkward
    // "Tl:dr: It won't work unless you are prepared to get your hands dirty and deal with cases that feel a bit like they came out of 2010.",
    [
      "One more point... In a city as concerned about recycling and not using non-degradable materials, I found it kind of off-putting that they use styrofoam plates, plastic eating utensils and cups.  At the prices they charge for chicken, they could afford washable plates, bowls, and flatware.",
      { "they": "a city" }// hmmm 
    ],
    [
      "Putlibai gave Gandhi her permission and blessing.",
      { "her": "putlibai" }
    ],

    [
      "Amino acids are poor modular building-blocks because they do not act independently and there is a fundamental lack of understanding about the relationship between linear amino acid sequences and the folding and functionality of proteins.",
      { "they": "amino acids" }
    ],

    [
      "He later slept with women in the same bed but clothed, and finally he slept naked with women.",
      {}
    ],
    [
      "give our people the tools they need",
      {}
    ],
    [
      "They were like three very beautiful young women, dressed one in green, one in white, and one in red, and they were dancing and singing round an apple tree with apples of gold, and this was their song:",
      { "they": "three very beautiful young women", "their": "three very beautiful young women" }
    ],


    [
      "What I would say to those who argue that the worst is over is this: over the course of the last 2 years, the government of Sudan and its surrogates killed as many as 400,000 people and drove one third of the population of Darfur off their land.",
      { "their": "one third of the population" }
    ],

    [
      "Therefore, our menus stayed on the tables because they were too sticky to be removed.",
      { "they": "our menus" }
    ],
    [
      "I have also heard rumors that drivers save on gas when they ride with their windows down and the A/C off.",
      { "they": "drivers", "their": "drivers" }
    ],
    [
      "Besides, said this kind young lady, I hear he is extremely handsome, and very brave; and he has a good heart, for he was kind, I have heard, to a poor boy, and did all his examination papers for him, so that the boy passed first in everything.",
      {}
    ],
    [
      `give a precise scientific theory of the syntax rules of grammar and their function`,
      { their: 'the syntax rules' },
    ],
    [
      `the copy-holders had writings with their holdings.`,
      { their: 'the copy-holders' },
    ],
    [`Tornadoes are swirling clouds. They arrive during the summer`,
      { they: `Tornadoes` },
    ],
    [
      "Tornadoes come in many shapes and sizes, and they are often visible in the form of a condensation funnel originating from the base of a cumulonimbus cloud, with a cloud of rotating debris and dust beneath it.",
      { "they": "tornadoes" }
    ],
    [
      "An enemy watched all of these scenes, adjusted their tactics, and in 2006 they struck back.",
      { "their": "an enemy", "they": "an enemy" }
    ],
    [
      "I also asked this Congress to support our efforts to enlist colleges and universities to reach out to disadvantaged children, starting in the sixth grade, so that they can get the guidance and hope they need so they can know that they, too, will be able to go on to college.",
      { "they": "disadvantaged children" }
    ],
    [
      "The Sultan was very well pleased with the magician's conduct, and said to her: Do you as you think fit; I'll wait patiently the event of your promises, and to encourage her made her a present of a diamond of great value.",
      { "her": "the magician" }
    ],
    [
      "Although the price I pay for my prescriptions is competitive or lower than the larger chains, Fairley's adds considerable value by being who they are: kind, helpful, service-oriented, and accurate.",
      { "they": "fairley's adds considerable value" }
    ],
    [
      "Men are of different heights, yet they range about a mode.",
      { "they": "men" }
    ],
    [
      "\"Many and prolonged were the battles they fought\" on this topic, but Huxley maintained his agnostic position.",
      {}
    ],
    [
      "Her first hubby was Billy Smith; she was a topless dancer when she met No. 2, oilman J. Howard Marshall, 60+ years her senior",
      {}
    ],
    [
      "And I'll hold her like a lady, thank God she's all mine",
      {}
    ],

    [
      "You don't need to be best friends with his friends, but it helps if you can tolerate them well enough to spend time around them when necessary.",
      { "them": "his friends" }
    ],
    [
      "Some citizens in this Canadian capital get their news from the Citizen newspaper",
      { "their": "some citizens" }
    ],
    [
      "In May 1961 he vowed to land a man on the moon & return him safely to Earth by the end of the decade",
      { "him": "a man" }
    ],
    [
      "These teeth usually erupt between the ages of 17 & 25, hence their popular name",
      { "their": "these teeth" }
    ],
    [
      "She emphasized the important activities undertaken by non-governmental organizations active in women's rights and suggested investigating ways to utilize their contributions more actively.",
      { "their": "non-governmental organizations" }
    ],
    [
      "Peasant farmers in Africa, Haiti, and other impoverished regions currently plant their crops without the benefit of high-yield seed varieties and fertilizers.",
      { "their": "peasant farmers" }
    ],

    [
      "We may even consider it a rewarding testament to an artist’s ability to overcome his past mistakes and still produce priceless work.",
      { "his": "an artist" }
    ],
    [
      "The poor in developing countries are again being made to endure the worst consequences of a crisis that they played no part in creating.",
      { "they": "the poor" }
    ],
    [
      "Northern taxpayers will be forced to inject massive amounts of capital into banks, even if the authorities impose significant losses on banks’ large and wholesale creditors, as well they should.",
      { "they": "the authorities" }
    ],
    [
      "Their relationship turns physical quickly and they both believe that they are soul-mates, until one day, the provincial girl comes home to find a man in their bed.",
      {}
    ],

    [
      "A number of studies will be presented on environmental policies and standards adopted by the major countries of the Organisation for Economic Cooperation and Development (OECD) and their impact on market access and competitiveness for Latin American exports.",
      { "their": "environmental policies and standards" }
    ],
    [
      "the leverage of Brussels over new member states increases rather than diminishes after they join.",
      { "they": "brussels" }
    ],
    // singular word as group
    [
      `the committee gathered their delegates`,
      { their: 'the committee' },
    ],
  ]
  arr.forEach(a => {
    let [text, refs] = a
    let doc = nlp(text)
    let pronouns = doc.pronouns().hasReference()
    t.equal(Object.keys(refs).length, pronouns.length, here + `[count] '${text}'`)
    Object.keys(refs).forEach(k => {
      let m = pronouns.if(k).refersTo()
      t.equal(m.text('normal'), refs[k], here + ` [${k}] - ${refs[k]}`)
    })
  })
  t.end()
})

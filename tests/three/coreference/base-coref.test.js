import test from 'tape'
import nlp from '../_lib.js'

const cases = [
  [
    "spencer is not working because he is unemployed",
    [["he","spencer"]]
  ],
  [
    "spencer is quiet. he is not loud",
    [["he","spencer"]]
  ],
  [
    "spencer is quiet. I mean, not always, but usually. he is not loud",
    [["he","spencer"]]
  ],
  [
    "Spencer kelly forgot to update github. Maybe he should remember to",
    [["he","spencer kelly"]]
  ],
  [
    "Lester B. Pearson founded Canada but despite being 6ft tall, he forgot to update github.",
    [["he","lester b. pearson"]]
  ],
  [
    "i don't know why jack layton won his election, but he did.",
    [["his","jack layton"],["he","jack layton"]]
  ],
  [
    "you said kirk douglass won, and he'll fall asleep afterwards",
    [["he","kirk douglass"]]
  ],
  [
    "i saw spencer kelly. he forgot his name",
    [["he","spencer kelly"],["his","spencer kelly"]]
  ],
  [
    "Judy Dench is an American film director. She wrote, directed and starred in three films",
    [["she","judy dench"]]
  ],
  [
    "jamie smith said no and she left",
    [["she","jamie smith"]]
  ],
  [
    "jamie smith said no and he bailed out",
    [["he","jamie smith"]]
  ],
  [
    "nobody tell Josh's mom that she burned her toast.",
    [["she","josh's mom"],["her","josh's mom"]]
  ],
  [
    "Goaltenders often trick their opponents",
    [["their","goaltenders"]]
  ],
  [
    "they said i was losing my marbles",
    []
  ],
  [
    "the American people are using their money far better",
    [["their","the american people"]]
  ],
  [
    "a medicine given to cows to increase their milk",
    [["their","cows"]]
  ],
  [
    "every time someone gave me their dog",
    [["their","someone"]]
  ],
  [
    "But we shouldn't put them and their children out on the street",
    []
  ],
  [
    "People go out of their way",
    [["their","people"]]
  ],
  [
    "17 taxpayers would see their taxes rise",
    [["their","17 taxpayers"]]
  ],
  [
    "ensure that all African Americans could exercise their right",
    [["their","all african americans"]]
  ],
  [
    "all states and school districts must turn around their worst performing schools",
    [["their","all states and school districts"]]
  ],
  [
    "It will raise critical questions about the way we finance our campaigns and how lobbyists yield their influence.",
    [["their","lobbyists"]]
  ],
  [
    "9 out of 10 people who have insurance get it through their employers",
    [["their","9 out of 10 people"]]
  ],
  [
    "the boys and girls studied their numbers",
    [["their","the boys and girls"]]
  ],
  [
    "plumbers are funny. they never stop talking",
    [["they","plumbers"]]
  ],
  [
    "the viola player said no and she dropped her bow",
    [["she","the viola player"],["her","the viola player"]]
  ],
  [
    "Sally arrived, but nobody saw her",
    [["her","sally"]]
  ],
  [
    "the cowboy shot his gun and he walked away",
    [["his","the cowboy"],["he","the cowboy"]]
  ],
  [
    "spencer's aunt is fun. she is smart",
    [["she","spencer's aunt"]]
  ],
  [
    "the cheerleader did a flip but she landed awkwardly",
    [["she","the cheerleader"]]
  ],
  [
    "i walked to my school",
    []
  ],
  [
    "her opinion was that he missed",
    []
  ],
  [
    "her son brushed his teeth",
    [["his","her son"]]
  ],
  [
    "somebody shaved their legs",
    [["their","somebody"]]
  ],
  [
    "thom is the singer of his band",
    [["his","thom"]]
  ],
  [
    "I was looking at black crows go by and right after they went by, a good 100+ more crows flew by",
    [["they","black crows"]]
  ],
  [
    "As its Valentines Day, the missus has said she'll go on top tonight for a change.",
    [["she","the missus"]]
  ],
  [
    "You must really like... Joey... to go to all that trouble for him.",
    [["him","joey"]]
  ],
  [
    "When the children saw they were left alone.",
    [["they","the children"]]
  ],
  [
    "One mother of two, a woman named Kathy Proctor, had worked in the furniture industry since she was 18 years old.",
    [["she","kathy proctor"]]
  ],
  [
    "We've got to do something to empower people to improve their skills.",
    [["their","people"]]
  ],
  [
    "Hey Mon, that was really nice of you to loan Rachel your car so she could  go and get the cake.",
    [["she","rachel"]]
  ],
  [
    "Sweet justice: after the doc pulled the gigantic beetle out of my ear, my mom asked if she could have it.",
    [["she","my mom"]]
  ],
  [
    "Elaine Kinslow and all those like her are the real heroes of the welfare revolution.",
    [["her","elaine kinslow"]]
  ],
  [
    "Contrary to public opinion, most people want to work to get their income.",
    [["their","most people"]]
  ],
  [
    "Mrs and 3 of her pals squeezed into my car after weight watchers.",
    [["her","mrs"]]
  ],
  [
    "One time I heard this woman to the right of me complaining how spicy her curry was.",
    [["her","this woman"]]
  ],
  [
    "When people put their party's fortunes, whatever the party, whatever side of this aisle, before the public good, they court defeat not only for their country but for themselves.",
    [["their","people"],["they","people"],["their","people"]]
  ],
  [
    "Social Security now offers workers a return of less than 2 percent on the money they pay into the system.",
    [["they","workers"]]
  ],
  [
    "There's a scene where Drake sneaks into Olivia's bedroom, and she doesn't know he's there - which never happened with us!",
    [["she","olivia's"],["he","drake"]]
  ],
  [
    "If you are going to send someone to save the world, make sure they like it the way it is.",
    [["they","someone"]]
  ],
  [
    "The Queen was so confused that at first she did not notice another little door in the orange tree, but presently it opened and she found herself in a field of thistles and nettles.",
    [["she","the queen"],["she","the queen"]]
  ],
  [
    "Gandhi moved his headquarters to Nadiad, organising scores of supporters and fresh volunteers",
    [["his","gandhi"]]
  ],
  [
    "In a moment Prince Ricardo's foot was on the blade of the diamond sword, which he passed thrice through the body of the Yellow Dwarf.",
    [["he","prince ricardo's"]]
  ],
  [
    "River town is burnin', the clouds they roll on by",
    [["they","the clouds"]]
  ],
  [
    "While Gandhi expressed mostly positive views of Islam, he did occasionally criticize Muslims.",
    [["he","gandhi"]]
  ],
  [
    "The portions are TOO small, rolls were cold (as they were taken from the fridge), very small and not tasty at all.",
    [["they","rolls"]]
  ],
  [
    "In that book, Prince Prigio fancied he would find something he half remembered, and that would be of use to him.",
    [["he","prince prigio"],["he","prince prigio"],["him","prince prigio"]]
  ],
  [
    "Early in the morning, before the children were awake, she rose up, and when she saw them both sleeping so peacefully, with their round rosy cheeks, she muttered to herself: That'll be a dainty bite.",
    [["them","the children"],["their","the children"]]
  ],
  [
    "If prisoners get arrested, where do they go?",
    [["they","prisoners"]]
  ],
  [
    "I’m not willing to tell James Howard, a brain cancer patient from Texas, that his treatment might not be covered.",
    [["his","james howard"]]
  ],
  [
    "Herbert Spencer, adopting the idea of evolution, laid thereon the elaborate superstructure of his philosophy.",
    [["his","herbert spencer"]]
  ],
  [
    "That said, the Christians I've met have not been pushy about it, and haven't treated me differently for being a 3rd generation agnostic, and though I know a couple still hope that I'll be saved, that's just because they like me.",
    [["they","the christians"]]
  ],
  [
    "I left my girlfriend because she wouldn't stop counting.",
    [["she","my girlfriend"]]
  ],
  [
    "I work at a doctors office and when they need to go out of town they either find back up or do not schedule travel when appointments have been made.",
    [["they","a doctors office"],["they","a doctors office"]]
  ],
  [
    "I am spinning, my pretty child, said the old woman, who did not know who she was.",
    [["she","the old woman"]]
  ],
  [
    "When a woman says 'What?' it's not because she didn't hear you.",
    [["she","a woman"]]
  ],
  [
    "Why were the Aggies pushing their house down the street?",
    [["their","the aggies"]]
  ],
  [
    "So in the evening, when the giant came home with the goats, the Prince went into the chamber and hummed and sang again as he had done on the other two evenings.",
    [["he","the prince"]]
  ],
  [
    "Hydras paralyze their prey with poison from stingers on these body parts",
    [["their","hydras"]]
  ],
  [
    "Gilbert says he will be busy with sports camp.",
    [["he","gilbert"]]
  ],
  [
    "written by Lord Chesterfield to his son",
    [["his","lord chesterfield"]]
  ],
  [
    "I know you got a man but girl he's slippin'",
    [["he","a man"]]
  ],
  [
    "If you're trying to seduce a man, make sure you dress in a flattering fashion to get his attention.",
    [["his","a man"]]
  ],
  [
    "(Every time I try to say it, words, they only complicate it,)",
    [["they","words"]]
  ],
  [
    "In 1952 William Rehnquist graduated first in his class at Stanford Law & she graduated third",
    [["his","william rehnquist"]]
  ],
  [
    "so the ladies put your on their speed dial:",
    [["their","the ladies"]]
  ],
  [
    "The doctor's assistant goes through extreme mood swings from passivity to hysteria in seconds and then seems to forget where she was in the next scene.",
    [["she","the doctor's assistant"]]
  ],
  [
    "As a result, the mandarins survived WWII and the postwar American occupation relatively undamaged, and they will strive to survive the DPJ government as well.",
    [["they","the mandarins"]]
  ],
  [
    "Carrie looked ugly, Mr. Big had his eyebrows colored with crayons and Samantha didn't say f***.",
    [["his","mr big"]]
  ],
  [
    "Bored, I went through the whole thing and clearly the director and cinematographer tried, but just don't know enough about what they are doing.",
    [["they","the director and cinematographer"]]
  ],
  [
    "In reality, in far too many countries, ordinary citizens do not benefit from any of this money; in fact, they must bear the brunt of the environmental and social costs",
    [["they","ordinary citizens"]]
  ],
  [
    "The American Academy of Pediatrics recently warned that TV viewing by young children is dangerous for their brain development",
    [["their","young children"]]
  ],
  [
    "Presumably, McCain’s League of Democracies is designed to bring Immanuel Kant’s dream of perpetual peace  closer to realization by putting  pressure on non-democracies to change their ways",
    [["their","non democracies"]]
  ],
  [
    "Like the murder of Archbishop Thomas Beckett in his Canterbury Cathedral many centuries ago.",
    [["his","archbishop thomas beckett"]]
  ],
  [
    "Fourth, governments and the IFIs cannot solve this crisis alone, and they cannot and should not crowd out the private sector.",
    [["they","governments and the ifis"]]
  ],
  [
    "Fred gazes at Rita with a brotherly smile, but she's so mannequin-like.",
    [["she","rita"]]
  ],
  [
    "Marc Singer is back and it is sad to seem him in this state.",
    [["him","marc singer"]]
  ],
  [
    "He did one at Christmas, and now the terrific Justin Lee Collins wanted to reunite the cast members and maybe some crew of one of his favourite TV shows as a kid",
    [["his","justin lee collins"]]
  ],
  [
    "The letter said, in so many words, what the leaders of Europe now appear to have understood: they cannot go on “kicking the can down the road.”",
    [["they","the leaders of europe"]]
  ],
  [
    "Where are the shocks and surprises as mother and daughter have what may be the last conversation of their lives?",
    [["their","mother and daughter"]]
  ],
  [
    "The world has grown used to US drone strikes, but recent news reports suggest that China and Japan are also investing in unmanned aircraft – in part to enhance their leverage in disputes over islands in the East China Sea.",
    [["their","china and japan"]]
  ],
  [
    "Louis VI was known as this; as a child he must have shopped in le husky department",
    [["he","louis vi"]]
  ],
]

test('[three/coreference] per-occurrence references', t => {
  cases.forEach(([input, expected]) => {
    const pronouns = nlp(input).pronouns().hasReference()
    const actual = []
    pronouns.forEach(pronoun => {
      actual.push([pronoun.text('implicit').toLowerCase(), pronoun.refersTo().text('normal')])
    })
    t.deepEqual(actual, expected, input)
  })
  t.end()
})

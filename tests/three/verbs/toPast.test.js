import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toPast] '

test('toPast:', function (t) {
  let arr = [
    // copula-based
    ['he is nice', 'he was nice'],
    ['he is really it', 'he was really it'],
    ['he was nice', 'he was nice'],
    ['he was walking', 'he was walking'],

    ['he walks', 'he walked'],
    ['he walked', 'he walked'],
    ['he will walk', 'he walked'],


    // copula forms
    ['i am not cool', 'i was not cool'],
    ['i was not cool', 'i was not cool'],
    // ['i will not be cool', 'i was not cool'],
    ['he is not cool', 'he was not cool'],
    ['he was not cool', 'he was not cool'],
    // ['he will not be cool', 'he was not cool'],
    ['they are not cool', 'they were not cool'],
    ['they were not cool', 'they were not cool'],
    // ['they will not be cool', 'they were not cool'],

    ['he is walking', 'he was walking'],
    ['he was walking', 'he was walking'],
    ['we are walking', 'we were walking'],
    ['we were walking', 'we were walking'],
    ['i am walking', 'i was walking'],
    ['he will be walking', 'he was walking'],
    ['he is not walking', 'he was not walking'],
    ['he was not walking', 'he was not walking'],
    ['we are not walking', 'we were not walking'],
    ['we were not walking', 'we were not walking'],
    ['i am not walking', 'i was not walking'],

    ['he has walked', 'he had walked'],
    ['he had walked', 'he had walked'],
    ['he will have walked', 'he had walked'],
    ['he has not walked', 'he had not walked'],
    ['he had not walked', 'he had not walked'],
    // ['he will not have walked', 'he had not walked'],

    ['he has been walking', 'he had been walking'],
    ['he had been walking', 'he had been walking'],
    ['he will have been walking', 'he had been walking'],

    ['got walked', 'got walked'],
    ['was walked', 'was walked'],
    ['were walked', 'were walked'],
    // ['was being walked', 'had been walked'],
    ['had been walked', 'had been walked'],
    ['have been walked', 'had been walked'],
    ['is walked', 'was walked'],
    ['are walked', 'was walked'],
    ['is being walked', 'was being walked'],
    // ['has been walked', 'had been walked'],
    ['had been walked', 'had been walked'],
    ['will have been walked', 'had been walked'],
    ['will be walked', 'had been walked'],

    ['would be walked', 'would have been walked'],
    ['would have been walked', 'would have been walked'],
    ['is going to walk', 'was going to walk'],
    ['did walk', 'did walk'],
    ['used to walk', 'used to walk'],
    ['we do walk', 'we did walk'],
    ['does walk', 'did walk'],
    ['he wants to walk', 'he wanted to walk'],
    ['he will want to walk', 'he wanted to walk'],

    // participle
    ['he can walk', 'he could walk'],
    ['he could walk', 'he could have walked'], //not sure
    ['he would walk', 'he would have walked'],//not sure
    ['he should walk', 'he should have walked'],

    // ['he can drive', 'he could drive'],
    // ['he could drive', 'he could have driven'],
    // ['he would drive', 'he would have driven'],
    // ['he should drive', 'he should have driven'],

    ['i write', 'i wrote'],
    ['spencer writes', 'spencer wrote'],
    ['i barely write', 'i barely wrote'],
    ['we barely write', 'we barely wrote'],
    ['we will barely write', 'we barely wrote'],
    // compound verb
    [`i'll start looking`, 'i started looking'],
    [`i will not start looking`, 'i have not started looking'],
    [`i won't start looking`, 'i have not started looking'],
    // negatives
    ['we do not write', 'we did not write'],
    ['we will not write', 'we did not write'],
    ['angelina does not write', 'angelina did not write'],
    ['angelina will not write', 'angelina did not write'],
    ['toronto barely starts', 'toronto barely started'],
    ['say it again', 'say it again'],
    ['there is no hope', 'there was no hope'],
    // ['council votes to deny it', 'council voted to deny it'],
    ['nobody will say for certain', 'nobody said for certain'],
    ['he will say for certain', 'he said for certain'],
    ['she will not say for certain', 'she did not say for certain'],
    ['waiters are furious', 'waiters were furious'],
    ['the waiters will walk out', 'the waiters walked out'],
    ['this union will disrupt', 'this union disrupted'],
    ['this union has disrupted', 'this union had disrupted'],
    ['it will have real feelings', 'it had real feelings'],
    // ['it had no real feelings', 'it had no real feelings'],
    // ['it will not have studied enough', 'it had not studied enough'],
    ['spencer will have learned enough', 'spencer had learned enough'],
    // ['spencer will not have learned enough', 'spencer had not learned enough'],


    //oke
    ['awakes', 'awoke'],
    //ade
    ['makes', 'made'],
    ['remakes', 'remade'],
    //ook
    ['shakes', 'shook'],

    ['takes', 'took'],
    ['overtakes', 'overtook'],
    ['undertakes', 'undertook'],
    ['mistakes', 'mistook'],
    ['retakes', 'retook'],
    //aked
    ['bakes', 'baked'],
    ['fakes', 'faked'],
    ['snakes', 'snaked'],

    // sneaky past participles
    // present
    // ['i am being awaken', 'i have been awaken'],
    // ['i should be awaken', 'i should have been awaken'],
    // past->past
    ['i had been awaken', 'i had been awaken'],
    ['i should have been awaken', 'i should have been awaken'],
    // gerund
    ['when it is raining', 'when it was raining'],
    // ['i think it will be raining', 'i thought it will be raining'],
    ['when it was raining', 'when it was raining'],

    // gerund-phrase
    [`he starts seeing`, `he started seeing`],
    [`he started seeing`, `he started seeing`],
    [`he will start seeing`, `he started seeing`],
    [`we start seeing`, `we started seeing`],
    [`we started seeing`, `we started seeing`],
    [`we will start seeing`, `we started seeing`],
    [`we have started seeing`, `we have started seeing`],
    [`we will have started seeing`, `we have started seeing`],

    // negative copula
    ['john is not nice', 'john was not nice'],
    // ['john will not be nice', 'john was not nice'],
    // ['john will be not nice', 'john was not nice'],
    // ['john had not been nice', 'john had not been nice'],

    ['impale', 'impaled'],
    ['beguile', 'beguiled'],
    ['convolute', 'convoluted'],
    ['root', 'rooted'],



    ["he looks forward to the vacation", "he looked forward to the vacation"],
    ["he studies hard for the exam", "he studied hard for the exam"],
    ["he makes a delicious dinner", "he made a delicious dinner"],
    ["he can easily solve the puzzle", "he could easily solve the puzzle"],
    ["he works diligently on the project", "he worked diligently on the project"],
    ["he plays the piano beautifully", "he played the piano beautifully"],
    ["he drives carefully in the rain", "he drove carefully in the rain"],
    ["he reads quietly in the library", "he read quietly in the library"],
    ["he swims fast in the race", "he swam fast in the race"],
    ["he dances gracefully at the party", "he danced gracefully at the party"],
    ["he tries to improve her English", "he tried to improve her English"],
    ["he thinks about changing jobs", "he thought about changing jobs"],
    ["he can finish the work in one hour", "he could finish the work in one hour"],
    ["he practices the guitar daily", "he practiced the guitar daily"],
    ["he prepares for the upcoming interview", "he prepared for the upcoming interview"],
    ["he waits patiently for his turn", "he waited patiently for his turn"],
    ["he writes a new book", "he wrote a new book"],
    ["he listens attentively in class", "he listened attentively in class"],
    ["he enjoys the summer vacation", "he enjoyed the summer vacation"],
    ["he learns to play tennis", "he learned to play tennis"],
    ["he hopes for a promotion", "he hoped for a promotion"],
    ["he takes care of the plants", "he took care of the plants"],
    ["he bakes a cake for his birthday", "he baked a cake for his birthday"],
    ["he plans a surprise party", "he planned a surprise party"],
    ["he jogs in the park every morning", "he jogged in the park every morning"],
    ["he teaches math at a high school", "he taught math at a high school"],
    ["he remembers the good old days", "he remembered the good old days"],
    ["he travels around the world", "he traveled around the world"],
    ["he paints a beautiful landscape", "he painted a beautiful landscape"],
    ["he trains for the marathon", "he trained for the marathon"],
    ["he watches a comedy show", "he watched a comedy show"],
    ["he cleans the house", "he cleaned the house"],
    ["he chats with friends online", "he chatted with friends online"],
    ["he climbs the mountain", "he climbed the mountain"],
    ["he plays video games", "he played video games"],
    ["he drinks coffee in the morning", "he drank coffee in the morning"],
    ["he walks the dog", "he walked the dog"],
    ["he builds a treehouse", "he built a treehouse"],
    ["he feeds the birds", "he fed the birds"],
    ["he gardens on weekends", "he gardened on weekends"],
    ["he rides a bicycle", "he rode a bicycle"],
    ["he studies Japanese", "he studied Japanese"],
    ["he visits his grandparents", "he visited his grandparents"],
    ["he cooks a gourmet meal", "he cooked a gourmet meal"],
    ["he plays chess", "he played chess"],
    ["he sings in the choir", "he sang in the choir"],
    ["he repairs the car", "he repaired the car"],
    ["he learns to code", "he learned to code"],
    ["he invests in stocks", "he invested in stocks"],
    ["he takes a nap", "he took a nap"],
    ["he shops for groceries", "he shopped for groceries"]

    // ["is looking forward to the vacation", "looked forward to the vacation"],
    // ["has been studying hard for the exam", "had been studying hard for the exam"],
    // ["is making a delicious dinner", "made a delicious dinner"],
    // ["can easily solve the puzzle", "could easily solve the puzzle"],
    // ["is working diligently on the project", "worked diligently on the project"],
    // ["is playing the piano beautifully", "played the piano beautifully"],
    // ["is driving carefully in the rain", "drove carefully in the rain"],
    // ["is reading quietly in the library", "read quietly in the library"],
    // ["is swimming fast in the race", "swam fast in the race"],
    // ["is dancing gracefully at the party", "danced gracefully at the party"],
    // ["is trying to improve her English", "tried to improve her English"],
    // ["has been thinking about changing jobs", "had been thinking about changing jobs"],
    // ["can finish the work in one hour", "could finish the work in one hour"],
    // ["is practicing the guitar daily", "practiced the guitar daily"],
    // ["is preparing for the upcoming interview", "prepared for the upcoming interview"],
    // ["is waiting patiently for his turn", "waited patiently for his turn"],
    // ["is writing a new book", "wrote a new book"],
    // ["is listening attentively in class", "listened attentively in class"],
    // ["is enjoying the summer vacation", "enjoyed the summer vacation"],
    // ["is learning to play tennis", "learned to play tennis"],
    // ["is hoping for a promotion", "hoped for a promotion"],
    // ["is taking care of the plants", "took care of the plants"],
    // ["is baking a cake for his birthday", "baked a cake for his birthday"],
    // ["is planning a surprise party", "planned a surprise party"],
    // ["is jogging in the park every morning", "jogged in the park every morning"],
    // ["is teaching math at a high school", "taught math at a high school"],
    // ["is remembering the good old days", "remembered the good old days"],
    // ["is traveling around the world", "traveled around the world"],
    // ["is painting a beautiful landscape", "painted a beautiful landscape"],
    // ["is training for the marathon", "trained for the marathon"],
    // ["is watching a comedy show", "watched a comedy show"],
    // ["is cleaning the house", "cleaned the house"],
    // ["is chatting with friends online", "chatted with friends online"],
    // ["is climbing the mountain", "climbed the mountain"],
    // ["is playing video games", "played video games"],
    // ["is drinking coffee in the morning", "drank coffee in the morning"],
    // ["is walking the dog", "walked the dog"],
    // ["is building a treehouse", "built a treehouse"],
    // ["is feeding the birds", "fed the birds"],
    // ["is gardening on weekends", "gardened on weekends"],
    // ["is riding a bicycle", "rode a bicycle"],
    // ["is studying Japanese", "studied Japanese"],
    // ["is visiting his grandparents", "visited his grandparents"],
    // ["is cooking a gourmet meal", "cooked a gourmet meal"],
    // ["is playing chess", "played chess"],
    // ["is singing in the choir", "sang in the choir"],
    // ["is repairing the car", "repaired the car"],
    // ["is learning to code", "learned to code"],
    // ["is investing in stocks", "invested in stocks"],
    // ["is taking a nap", "took a nap"],
    // ["is shopping for groceries", "shopped for groceries"]



  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})

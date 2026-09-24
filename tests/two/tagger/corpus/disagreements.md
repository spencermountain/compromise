# tagger disagreements

The 66 lines in this corpus where the kept (gold) tags differ from what
compromise v14.16.0 actually returns. For each: the corpus line, the line as
compromise's own out('spec') serializes it, and the word(s) that differ.
Generated mechanically; see README.md for the reasoning per class.

## conditional "if" → Condition (compromise: Conj)

If it rains, we will stay home. {Condition,Noun,Vb,Noun,Vb,Vb,Noun}
  compromise: {Conj,Noun,Vb,Noun,Vb,Vb,Noun}
  diff: "If": Condition vs Conj

If you heat ice, it melts. {Condition,Noun,Vb,Noun,Noun,Vb}
  compromise: {Conj,Noun,Vb,Noun,Noun,Vb}
  diff: "If": Condition vs Conj

If she calls, tell her the truth. {Condition,Noun,Vb,Vb,Noun,Det,Noun}
  compromise: {Conj,Noun,Vb,Vb,Noun,Det,Noun}
  diff: "If": Condition vs Conj

If I were rich, I would travel. {Condition,Noun,Vb,Adj,Noun,Vb,Vb}
  compromise: {Conj,Noun,Vb,Adj,Noun,Vb,Vb}
  diff: "If": Condition vs Conj

If we leave early, we will catch the train. {Condition,Noun,Vb,Adj,Noun,Vb,Vb,Det,Noun}
  compromise: {Conj,Noun,Vb,Adj,Noun,Vb,Vb,Det,Noun}
  diff: "If": Condition vs Conj

If you study, you will pass. {Condition,Noun,Vb,Noun,Vb,Vb}
  compromise: {Conj,Noun,Vb,Noun,Vb,Vb}
  diff: "If": Condition vs Conj

If the weather is nice, we will walk. {Condition,Det,Noun,Vb,Adj,Noun,Vb,Vb}
  compromise: {Conj,Det,Noun,Vb,Adj,Noun,Vb,Vb}
  diff: "If": Condition vs Conj

If he had studied, he would have passed. {Condition,Noun,Vb,Vb,Noun,Vb,Vb,Vb}
  compromise: {Conj,Noun,Vb,Vb,Noun,Vb,Vb,Vb}
  diff: "If": Condition vs Conj

If I had known, I would have helped. {Condition,Noun,Vb,Vb,Noun,Vb,Vb,Vb}
  compromise: {Conj,Noun,Vb,Vb,Noun,Vb,Vb,Vb}
  diff: "If": Condition vs Conj

If you need anything, ask me. {Condition,Noun,Vb,Noun,Vb,Noun}
  compromise: {Conj,Noun,Vb,Noun,Vb,Noun}
  diff: "If": Condition vs Conj

If it snows, the buses will stop. {Condition,Noun,Vb,Det,Noun,Vb,Vb}
  compromise: {Conj,Noun,Vb,Det,Noun,Vb,Vb}
  diff: "If": Condition vs Conj

If you see her, say hello. {Condition,Noun,Vb,Noun,Vb,Expr}
  compromise: {Conj,Noun,Vb,Noun,Vb,Expr}
  diff: "If": Condition vs Conj

If the bus is late, we will miss the show. {Condition,Det,Noun,Vb,Adj,Noun,Vb,Vb,Det,Noun}
  compromise: {Conj,Det,Noun,Vb,Adj,Noun,Vb,Vb,Det,Noun}
  diff: "If": Condition vs Conj

You can come if you want. {Noun,Vb,Vb,Condition,Noun,Vb}
  compromise: {Noun,Vb,Vb,Conj,Noun,Vb}
  diff: "if": Condition vs Conj

We will cancel the picnic if it rains. {Noun,Vb,Vb,Det,Noun,Condition,Noun,Vb}
  compromise: {Noun,Vb,Vb,Det,Noun,Conj,Noun,Vb}
  diff: "if": Condition vs Conj

Call me if you get lost. {Vb,Noun,Condition,Noun,Vb,Adj}
  compromise: {Vb,Noun,Conj,Noun,Vb,Adj}
  diff: "if": Condition vs Conj

If necessary, we can reschedule. {Condition,Adj,Noun,Vb,Vb}
  compromise: {Conj,Adj,Noun,Vb,Vb}
  diff: "If": Condition vs Conj

If possible, arrive before eight. {Condition,Adj,Vb,Conj,Val}
  compromise: {Conj,Adj,Vb,Conj,Val}
  diff: "If": Condition vs Conj

Even if he apologizes, she will not forgive him. {Conj,Condition,Noun,Vb,Noun,Vb,Negative,Vb,Noun}
  compromise: {Conj,Conj,Noun,Vb,Noun,Vb,Negative,Vb,Noun}
  diff: "if": Condition vs Conj

What happens if we fail? {QuestionWord,Vb,Condition,Noun,Vb}
  compromise: {QuestionWord,Vb,Conj,Noun,Vb}
  diff: "if": Condition vs Conj

If in doubt, ask. {Condition,Prep,Noun,Vb}
  compromise: {Conj,Prep,Noun,Vb}
  diff: "If": Condition vs Conj

If the light is red, stop the car. {Condition,Det,Noun,Vb,Adj,Vb,Det,Noun}
  compromise: {Conj,Det,Noun,Vb,Adj,Vb,Det,Noun}
  diff: "If": Condition vs Conj

She will help if you ask politely. {Noun,Vb,Vb,Condition,Noun,Vb,Adv}
  compromise: {Noun,Vb,Vb,Conj,Noun,Vb,Adv}
  diff: "if": Condition vs Conj

If she agrees, we will sign the contract. {Condition,Noun,Vb,Noun,Vb,Vb,Det,Noun}
  compromise: {Conj,Noun,Vb,Noun,Vb,Vb,Det,Noun}
  diff: "If": Condition vs Conj

If you break it, you buy it. {Condition,Noun,Vb,Noun,Noun,Vb,Noun}
  compromise: {Conj,Noun,Vb,Noun,Noun,Vb,Noun}
  diff: "If": Condition vs Conj

If I forget, remind me. {Condition,Noun,Vb,Vb,Noun}
  compromise: {Conj,Noun,Vb,Vb,Noun}
  diff: "If": Condition vs Conj

If everything goes well, we will buy a house. {Condition,Noun,Vb,Adv,Noun,Vb,Vb,Det,Noun}
  compromise: {Conj,Noun,Vb,Adv,Noun,Vb,Vb,Det,Noun}
  diff: "If": Condition vs Conj

## wh-relative pronouns → QuestionWord (compromise: Prep or Det)

The man who lives next door is kind. {Det,Noun,QuestionWord,Vb,Adj,Noun,Vb,Adj}
  compromise: {Det,Noun,Prep,Vb,Adj,Noun,Vb,Adj}
  diff: "who": QuestionWord vs Prep

The woman who called left a message. {Det,Noun,QuestionWord,Vb,Vb,Det,Noun}
  compromise: {Det,Noun,Prep,Vb,Vb,Det,Noun}
  diff: "who": QuestionWord vs Prep

The boy who won the race smiled. {Det,Noun,QuestionWord,Vb,Det,Noun,Vb}
  compromise: {Det,Noun,Prep,Vb,Det,Noun,Vb}
  diff: "who": QuestionWord vs Prep

The people who came early found seats. {Det,Noun,QuestionWord,Vb,Adv,Vb,Noun}
  compromise: {Det,Noun,Prep,Vb,Adv,Vb,Noun}
  diff: "who": QuestionWord vs Prep

The girl who found the wallet returned it. {Det,Noun,QuestionWord,Vb,Det,Noun,Vb,Noun}
  compromise: {Det,Noun,Prep,Vb,Det,Noun,Vb,Noun}
  diff: "who": QuestionWord vs Prep

The movie which won the award was long. {Det,Noun,QuestionWord,Vb,Det,Noun,Vb,Adj}
  compromise: {Det,Noun,Prep,Vb,Det,Noun,Vb,Adj}
  diff: "which": QuestionWord vs Prep

The road which crosses the river is narrow. {Det,Noun,QuestionWord,Vb,Det,Noun,Vb,Adj}
  compromise: {Det,Noun,Prep,Vb,Det,Noun,Vb,Adj}
  diff: "which": QuestionWord vs Prep

The letter which arrived today was from Tom. {Det,Noun,QuestionWord,Vb,Date,Vb,Prep,Noun}
  compromise: {Det,Noun,Prep,Vb,Date,Vb,Prep,Noun}
  diff: "which": QuestionWord vs Prep

Everyone who came had a good time. {Noun,QuestionWord,Vb,Vb,Det,Adj,Noun}
  compromise: {Noun,Det,Vb,Vb,Det,Adj,Noun}
  diff: "who": QuestionWord vs Det

I visited the city where he was born. {Noun,Vb,Det,Noun,QuestionWord,Noun,Vb,Vb}
  compromise: {Noun,Vb,Det,Noun,Conj,Noun,Vb,Vb}
  diff: "where": QuestionWord vs Conj

This is the town where she grew up. {Det,Vb,Det,Noun,QuestionWord,Noun,Vb,Vb}
  compromise: {Det,Vb,Det,Noun,Prep,Noun,Vb,Vb}
  diff: "where": QuestionWord vs Prep

We found a park where the kids can play. {Noun,Vb,Det,Noun,QuestionWord,Det,Noun,Vb,Vb}
  compromise: {Noun,Vb,Det,Noun,Prep,Det,Noun,Vb,Vb}
  diff: "where": QuestionWord vs Prep

I remember the day when we met. {Noun,Vb,Det,Date,QuestionWord,Noun,Vb}
  compromise: {Noun,Vb,Det,Date,Prep,Noun,Vb}
  diff: "when": QuestionWord vs Prep

## embedded question words → QuestionWord (compromise: Prep)

Do you know what this means? {Vb,Noun,Vb,QuestionWord,Det,Vb}
  compromise: {Vb,Noun,Vb,Prep,Det,Vb}
  diff: "what": QuestionWord vs Prep

Tell me what you think. {Vb,Noun,QuestionWord,Noun,Vb}
  compromise: {Vb,Noun,Prep,Noun,Vb}
  diff: "what": QuestionWord vs Prep

Nobody knows who wrote it. {Noun,Vb,QuestionWord,Vb,Noun}
  compromise: {Noun,Vb,QuestionWord,Vb,Noun}
  diff: (none — out('spec') matches; testSpec's .has() match fails on this line)

Do you know where she went? {Vb,Noun,Vb,QuestionWord,Noun,Vb}
  compromise: {Vb,Noun,Vb,Prep,Noun,Vb}
  diff: "where": QuestionWord vs Prep

I wonder why he left. {Noun,Vb,QuestionWord,Noun,Vb}
  compromise: {Noun,Vb,Prep,Noun,Vb}
  diff: "why": QuestionWord vs Prep

Can you tell me how it happened? {Vb,Noun,Vb,Noun,QuestionWord,Noun,Vb}
  compromise: {Vb,Noun,Vb,Noun,Prep,Noun,Vb}
  diff: "how": QuestionWord vs Prep

I do not know when they will arrive. {Noun,Vb,Negative,Vb,QuestionWord,Noun,Vb,Vb}
  compromise: {Noun,Vb,Negative,Vb,Prep,Noun,Vb,Vb}
  diff: "when": QuestionWord vs Prep

I asked her where the library was. {Noun,Vb,Noun,QuestionWord,Det,Noun,Vb}
  compromise: {Noun,Vb,Noun,Prep,Det,Noun,Vb}
  diff: "where": QuestionWord vs Prep

## when-clauses → Conj (compromise: Prep)

I was cooking when you called. {Noun,Vb,Vb,Conj,Noun,Vb}
  compromise: {Noun,Vb,Vb,Prep,Noun,Vb}
  diff: "when": Conj vs Prep

When it rains, the street floods. {Conj,Noun,Vb,Det,Noun,Vb}
  compromise: {Prep,Noun,Vb,Det,Noun,Vb}
  diff: "When": Conj vs Prep

## spatial prepositions → Prep (compromise: Adj)

The cat hid under the bed. {Det,Noun,Vb,Prep,Det,Noun}
  compromise: {Det,Noun,Vb,Adj,Det,Noun}
  diff: "under": Prep vs Adj

A plane flew above the clouds. {Det,Noun,Vb,Prep,Det,Noun}
  compromise: {Det,Noun,Vb,Adj,Det,Noun}
  diff: "above": Prep vs Adj

She stood beside her mother. {Noun,Vb,Prep,Noun,Noun}
  compromise: {Noun,Vb,Adj,Noun,Noun}
  diff: "beside": Prep vs Adj

He leaned against the wall. {Noun,Vb,Prep,Det,Noun}
  compromise: {Noun,Vb,Adj,Det,Noun}
  diff: "against": Prep vs Adj

The temperature fell below zero. {Det,Noun,Vb,Prep,Val}
  compromise: {Det,Noun,Vb,Adj,Val}
  diff: "below": Prep vs Adj

Our house is near the school. {Noun,Noun,Vb,Prep,Det,Noun}
  compromise: {Noun,Noun,Vb,Adj,Det,Noun}
  diff: "near": Prep vs Adj

The garden is behind the house. {Det,Noun,Vb,Prep,Det,Noun}
  compromise: {Det,Noun,Vb,Adj,Det,Noun}
  diff: "behind": Prep vs Adj

The letter is inside the envelope. {Det,Noun,Vb,Prep,Det,Noun}
  compromise: {Det,Noun,Vb,Adj,Det,Noun}
  diff: "inside": Prep vs Adj

The dog jumped over the fence. {Det,Noun,Vb,Prep,Det,Noun}
  compromise: {Det,Noun,Vb,Adj,Det,Noun}
  diff: "over": Prep vs Adj

## determiner "no" → Negative (compromise: Expr)

She has no idea. {Noun,Vb,Negative,Noun}
  compromise: {Noun,Vb,Expr,Noun}
  diff: "no": Negative vs Expr

There are no seats left. {There,Vb,Negative,Noun,Vb}
  compromise: {There,Vb,Expr,Noun,Vb}
  diff: "no": Negative vs Expr

He has no money. {Noun,Vb,Negative,Noun}
  compromise: {Noun,Vb,Expr,Noun}
  diff: "no": Negative vs Expr

## complementizer "that" before a full noun phrase → Conj (compromise: Det or Prep)

They said that the road was closed. {Noun,Vb,Conj,Det,Noun,Vb,Adj}
  compromise: {Noun,Vb,Det,Det,Noun,Vb,Adj}
  diff: "that": Conj vs Det

She told us that dinner was ready. {Noun,Vb,Noun,Conj,Noun,Vb,Adj}
  compromise: {Noun,Vb,Noun,Prep,Noun,Vb,Adj}
  diff: "that": Conj vs Prep

We agreed that the price was fair. {Noun,Vb,Conj,Det,Noun,Vb,Adj}
  compromise: {Noun,Vb,Det,Det,Noun,Vb,Adj}
  diff: "that": Conj vs Det

## locative "here" → Adv (compromise: Noun)

Please wait here. {Expr,Vb,Adv}
  compromise: {Expr,Vb,Noun}
  diff: "here": Adv vs Noun

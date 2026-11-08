// one 'word:out words' per line - decoded once into { [key]: word, out: [...] }
const parse = (str, key) =>
  str
    .trim()
    .split('\n')
    .map(s => {
      const [k, out] = s.trim().split(':')
      return { [key]: k, out: out.split(' ') }
    })

export default [
  // that's and let's are decided here, before any tagging
  // (step 1 of the 's decision - the list is in 2-two/contraction-two/compute/index.js)
  // simple mappings
  ...parse(
    `
@:at
arent:are not
alot:a lot
brb:be right back
cannot:can not
dun:do not
can't:can not
shan't:should not
won't:will not
that's:that is
what's:what is
let's:let us
dunno:do not know
gonna:going to
gotta:have got to
gimme:give me
outta:out of
tryna:trying to
gtg:got to go
im:i am
imma:I will
imo:in my opinion
irl:in real life
ive:i have
rn:right now
tbh:to be honest
wanna:want to
c'mere:come here
c'mon:come on
shoulda:should have
coulda:coulda have
woulda:woulda have
musta:must have
tis:it is
twas:it was
y'know:you know
ne'er:never
o'er:over
  `,
    'word'
  ),
  // contraction-part mappings
  ...parse(
    `
ll:will
ve:have
re:are
m:am
  `,
    'after'
  ),
  // french contractions - t'aime
  ...parse(
    `
c:ce
m:me
n:ne
qu:que
s:se
t:tu
  `,
    'before'
  ),
  // missing apostrophes, apostrophe-d
  ...parse(
    `
shouldnt:should not
couldnt:could not
wouldnt:would not
hasnt:has not
wasnt:was not
isnt:is not
cant:can not
dont:do not
wont:will not
howd:how did
whatd:what did
whend:when did
whered:where did
  `,
    'word'
  ),
]

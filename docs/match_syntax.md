# Matching syntax

nlp_compromise gives a neat way to lookup/replace words in a text, based on their parsed, interpreted representations- as opposed to just their characters.

It superficially resembles regex.

Results are an array of `Terms` objects, which allows you to manipulate individual matches, or operate on them in bulk. Transformations to matches apply to the original terms themselves, so you can efficiently inspect, transform, then return your parsed text.

Both `nlp.sentence()` and `nlp.text` match/replace methods behave the same, except matches are sentence-aware, and they don't occur between sentences - ie. you can't do `"o say can you see ... home of the brave"`.

## Basic matching
term-term matches use normalised & non-normalised text as a direct lookup:
```javascript
let matches = nlp.text('John eats glue!').match('john eats glue')
match[0].text()
//"John eats glue"
```

## POS matching
you can loosen a search by any matching part-of-speech, allowing you to find all the things john eats, for example:
```javascript
let matches = nlp.text('John eats glue').match('john eats [Noun]')
match[0].text()
//"John eats glue"
```

## Alias matching
you can loosen a search further, for words that 'mean' the same, using the fledgling nlp_compromise 'alias' feature. Different conjugations, forms, and synonyms are tentatively supported.
```javascript
let matches = nlp.text('John ate glue').match('john _eat_')
match[0].text()
//"John ate"
```

## Wildcard matching
The "." character means 'any term'.
```javascript
let matches = nlp.text('John eats glue').match('john . glue')
match[0].text()
//"John eats glue"
```
The "..." characters mean 'any terms until'.
```javascript
let matches = nlp.text('John always ravenously eats his glue').match('john ... eats')
match[0].text()
//"John always ravenously eats"
```

## Optional matching
The "?" character at the end of a word means it isn't necessary to be there.
```javascript
let matches = nlp.text('John eats glue').match('john always? eats glue')
match[0].text()
//"John eats glue"

let matches = nlp.text('John eats glue').match('john [Adverb]? eats glue')
match[0].text()
//"John eats glue"
```

## Flag matches
A leading '^' character means 'at the start of a sentence'.
```javascript
let matches = nlp.text('John eats glue').match('^john eats ...')
match[0].text()
//"John eats glue"
```

An ending '$' character means 'must be at the end of the sentence'.
```javascript
let matches = nlp.text('John eats glue').match('eats glue$')
match[0].text()
//"eats glue"
```


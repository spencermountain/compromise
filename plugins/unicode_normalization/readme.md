
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.

approximate visual (not semantic) relationship between unicode and ascii characters

```javascript
nlp.normalize("Björk")
//Bjork
```
and for fun,
```javascript
nlp.denormalize("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```
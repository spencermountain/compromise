
## Add new words to the Lexicon
```javascript
nlp.Text("hakuna matada").tags() //["Noun"]
nlp.Lexicon["hakuna matada"]="Expression"
nlp.Text("hakuna matada").tags() //["Expression"]
```

## Plugins
```javascript
```
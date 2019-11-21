  ```js
  let doc = nlp("springfield, springfield, it's a hell of a town.")
  // keep a 'dangling' child document
  let a = doc.match('a hell of a town')
  // transform the parent document
  doc.replace('hell of a', 'reasonable')
  //dangling document is updated?
  return a.text()
  ```


  ```js
  let doc = nlp(`i have two questions for Homer - 'Why lie?' and 'Lies, why?'`)
  return doc.quotations().split().out('array')
  ```
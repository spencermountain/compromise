import nlp from 'compromise'

nlp('a better idea').adjectives().toRoot().text()
nlp('a colder and snowier day').adjectives().toRoot(1).text()

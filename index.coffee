

str= "Sally is a huge fool"
options= set_options(options);
words= tokenizer(str, options);
tags= tag(words)
chunks= chunker(tags, options)
nouns= recognizer(chunks, options)
console.log nouns
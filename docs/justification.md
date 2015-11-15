##Justification
If the 80-20 rule applies for most things, the ''94-6 rule'' applies when working with language - by [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The **[top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10)** account for 25% of used language.

>The **top 100 words** account for 50% of used language.

>The **top 50,000 words** account for 95% of used language.

On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, this is possible:

* just a 1 thousand word lexicon: **45% accuracy**
* ... then falling back to nouns: **70% accuracy**
* ... then some suffix regexes: **74% accuracy**
* ... then some sentence-level postprocessing: **81% accuracy**

The process is to get some curated data, find the patterns, and list the exceptions. Bada bing, bada boom.
In this way a satisfactory NLP library can be built with breathtaking lightness.

Namely, it can be run right on the user's computer instead of a server.

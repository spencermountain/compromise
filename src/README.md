:sparkles: :sparkles: hiiiii,:sparkles: :sparkles:

main structure:
<h3 align="left">

  <a href="./tags">./Tags</a>  
  <div>&nbsp;  &nbsp; - the speech tag-set we use, with their logic + definitions</div>

  <a href="./data">./Data</a>  
  <div>&nbsp;  &nbsp; - you can change these like crazy and it's fine</div>

  <a href="./text">./Text</a>  
  <div>&nbsp;  &nbsp; - top-level API. Mostly just looping.</div>
    <div>&nbsp;  &nbsp; &nbsp; &nbsp; - <a href="./result/subset/values">number parsing is here</a></div>
    <div>&nbsp;  &nbsp; &nbsp; &nbsp; - <a href="./result/subset/things">named-entity/spotting is here</a></div>

  <a href="./terms">./Terms</a>  
  <div>&nbsp;  &nbsp; - where the hard sentence-aware work gets done. </div>
  <div>&nbsp;  &nbsp; &nbsp; &nbsp; - <a href="./terms/tagger">pos-tagger is here</a></div>
  <div>&nbsp;  &nbsp; &nbsp; &nbsp; - <a href="./terms/match">match logic is here</a></div>

  <a href="./term">./Term</a>  
  <div>&nbsp;  &nbsp; - the logic for sentence-unaware methods</div>
  <div>&nbsp;  &nbsp; &nbsp; &nbsp; - <a href="./term/verb/conjugate">verb conjugation is here</a></div>
  <div>&nbsp;  &nbsp; &nbsp; &nbsp; - <a href="./term/noun/inflect">singular/plural logic is here</a></div>
</h3>

you can do it!

[some help with contributing](https://github.com/nlp-compromise/compromise/wiki/Contributing)

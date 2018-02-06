<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/21955696/46e882d4-da3e-11e6-94a6-720c34e27df7.jpg" />
</div>
<div align="center">
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/compromise">
    <img src="https://img.shields.io/npm/v/compromise.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/Coverage/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <div>modest natural-language processing in javascript</div>
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/compromise/graphs/contributors">
      many contributors
    </a>
  </sub>
</div>
<br/>

<!-- small enough for the browser... -->
<img src="https://user-images.githubusercontent.com/399657/35828705-828fd2ca-0a8e-11e8-9f12-88e840b8b399.png" />

<!-- two gifs -->
<table align="center">
  <tr>
    <td>
      <a href="http://compromise.cool">
        <img width="350" src="https://user-images.githubusercontent.com/399657/35871664-cdab2bca-0b32-11e8-8827-81de658216fa.gif" />
      </a>
    </td>
    <td>
      <a href="http://compromise.cool">
        <img width="350" src="https://user-images.githubusercontent.com/399657/35871669-d05e8d26-0b32-11e8-99c6-0f8887ae40ea.gif" />
      </a>
    </td>  
  </tr>
</table>

👊 save yourself from **regex-whackamole**:
```js
nlp(entireNovel).sentences().if('the #Adjective of times').out()
// "it was the blurst of times??"
```

move stuff around:
```js
nlp('she sells seashells by the seashore.').sentences().toFutureTense().out()
// 'she will sell seashells...'
```
respond to text input:
```js
if( doc.has('^simon says (shoot|fire) #Determiner lazer') ){
  fireLazer()
} else {
  dontFire()
}
```

<div align="center">
  compromise is not <a href="./wiki/Justification">the cleverest</a>,
  <br/>
  but it is <a href="./wiki/Performance">small, quick, and good-enough</a> for a bunch of uses.
</div>

----

<!-- three-table section -->
<div align="center">
  <table align="center">
    <tr align="center">
      <td align="center">
        <b>
          &lt;script&gt;
        </b>
        <div>
           &nbsp; &nbsp; &nbsp; &nbsp; one javascript file &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
      </td>
      <td align="center">
        <b>🙏</b>
        <div>
          &nbsp; &nbsp; <kbd>npm install compromise</kbd> &nbsp; &nbsp;
        </div>
      </td>
      <td align="center">
        <div>
          <b>
            <a href="https://github.com/nlp-compromise/compromise/wiki/Accuracy">
              86%
            </a>
          </b>
          <div>
            &nbsp; &nbsp; on the Penn treebank &nbsp; &nbsp;
         </div>
      </td>
      <td align="center">
        <b>IE9+</b>
        <div>
           &nbsp; &nbsp; &nbsp;  caniuse, youbetcha &nbsp; &nbsp; &nbsp;
        </div>
      </td>
    </tr>
  </table>
</div>

with __**[plugins](https://nlp-compromise.github.io/compromise-plugin/)**__, adding vocabulary, fixing errors, and setting context is quick:
```js
var plugin = {
  tags:{
    Character:{
      isA: 'Noun'
    }
  },
  words:{
    itchy: 'Character',
    scratchy: 'Character'
  }
}
nlp.plugin(plugin)
nlp(`Couldn't Itchy share his pie with Scratchy?`).debug()
/*
   couldn't   - #Modal, #Verb
   itchy      - #Character, #Noun
   share      - #Infinitive, #Verb
   ...
*/
```

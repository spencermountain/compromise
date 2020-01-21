<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>date-parsing plugin for <a href="https://github.com/spencermountain/compromise/">compromise</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/compromise-dates">
    <img src="https://img.shields.io/npm/v/compromise-dates.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/compromise-dates/builds/compromise-dates.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/compromise-dates/master/builds/compromise-dates.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install compromise-dates</code>
</div>
`compromise-date` also depends on [compromise-numbers](../numbers)
<div align="center">
  <code>npm install compromise-numbers</code>
</div>

```js
const nlp = require('compromise')
nlp.extend(require('compromise-dates'))
nlp.extend(require('compromise-numbers'))

let doc = nlp('my birthday is June 5th 1998')
doc.dates().json()
/*[{ 
  text: 'June 5th 1998',
  date: { start: '1998-06-05T00:00:00.000-04:00', end: null } 
}]*/
```

### API

- **.dates()** - find dates like `June 8th` or `03/03/18`
  - **.dates().json()** - overloaded output with date metadata
  - **.dates().format('')** - convert the dates to specific formats

`.dates()` accepts an optional object, that lets you set the context for the date parsing.

```js
const context = {
  timezone: 'Canada/Eastern', //the default timezone is 'ETC/UTC'
  today: '2020-02-20', //the reference day (for testing)
}

nlp('in two days')
  .dates(context)
  .json()
```

Work in progress.

MIT

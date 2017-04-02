const generic = require('./generic');
let str = '# generic methods';

Object.keys(generic).forEach((header) => {
  str += `

### ${header}:`;
  Object.keys(generic[header]).forEach((fn) => {
    let code = '```js\n ' + generic[header][fn].example + '\n```';
    str += `

#### [${fn}()](https://nlp-expo.firebaseapp.com/docs#${header}/${fn})

> *${generic[header][fn].desc}*

${code}
`;
  });
});

str += `
# subset methods
`;


const subsets = require('./subsets');
Object.keys(subsets).forEach((header) => {
  str += `

### ${header}()`;
  Object.keys(subsets[header]).forEach((fn) => {
    let code = '```js\n ' + subsets[header][fn].example + '\n```';
    str += `

#### [${fn}()](https://nlp-expo.firebaseapp.com/docs#${header}/${fn})

> *${subsets[header][fn].desc}*

${code}
`;
  });
});
console.log(str);

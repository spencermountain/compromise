import { noMatches } from './lib/runners.js'

let arr = [
  [`coolcom`, '#Url'],
  [`egg./com`, '#Url'],
  [`foo,org`, '#Url'],
  [`.com`, '#Url'],
  [`.com/path`, '#Url'],

  [`sasdf@sasdf.t`, '#Email'],
  [`sasdf@sasdft`, '#Email'],
  [`sasdfsasdft.com`, '#Email'],
  [`@sasdft.com`, '#Email'],
  [`_@_._`, '#Email'],
  [`sas df@sasdf.com`, '^#Email'],
  [`sasdf@sa sdf.com`, '#Email'],

  [`# l`, '#HashTag'],
  [`l#l`, '#HashTag'],
]

noMatches(arr)

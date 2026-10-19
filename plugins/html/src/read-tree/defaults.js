// Tag names map to inclusion in NLP text. Unlisted tags default to true.
// Skipped elements remain in the source tree and serialized HTML.
const defaults = {
  fragment: true, // Parser option: false parses a complete document.
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  p: true,
  div: true,
  span: true,
  a: true,
  strong: true,
  em: true,
  nav: true,
  header: true,
  footer: true,
  blockquote: true,
  ul: true,
  ol: true,
  li: true,
  head: false,
  script: false,
  style: false,
  template: false,
  table: false,
  pre: false,
  code: false,
  select: false,
  textarea: false,
  svg: false,
  math: false,
}

export default defaults

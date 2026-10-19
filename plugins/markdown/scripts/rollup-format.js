// The parser's format dependency has no ESM entry or require() calls.
const format = () => ({
  name: 'format-commonjs',
  transform(code, id) {
    if (!id.replaceAll('\\', '/').endsWith('/node_modules/format/format.js')) {
      return null
    }
    return {
      code: `const module = { exports: {} };\n${code}\nexport default module.exports;`,
      map: null,
    }
  },
})

export default format

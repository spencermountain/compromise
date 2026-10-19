// Match written terms to word spans, without relying on token counts or spelling.
const applyTags = (doc, spans) => {
  let offset = 0
  let index = 0
  doc.docs.forEach((sentence, n) => {
    sentence.forEach((term, i) => {
      const start = offset + term.pre.length
      const end = start + term.text.length
      offset = end + term.post.length
      if (!term.text) {
        return
      }
      for (; index < spans.length && spans[index].end <= start; index += 1) {
        // Discard spans behind this term.
      }
      for (let s = index; s < spans.length && spans[s].start < end; s += 1) {
        if (spans[s].start <= start && spans[s].end >= end) {
          doc.update([[n, i, i + 1]]).tag(spans[s].tags, 'fromAst')
        }
      }
    })
  })
}
export default applyTags

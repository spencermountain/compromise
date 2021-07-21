import nlp from 'compromise'

/**  **/
declare const nlpScan: nlp.Plugin<
  {
    /** lookup terms in the document from a pre-created trie*/
    scan(trie: any): any
  },
  {}
>

export default nlpScan

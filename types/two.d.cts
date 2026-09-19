import type esmNlp from './two.d.ts' with { 'resolution-mode': 'import' }

declare const nlp: typeof esmNlp
declare namespace nlp {
  export type TypedPlugin<Methods extends object> = esmNlp.TypedPlugin<Methods>
}

export = nlp

import type nlp from 'compromise'
import type { Plugin } from 'compromise/misc'
import type BaseView from 'compromise/view/one'
import type { Cue, OutOptions, Vtt } from 'vttpeg'

type View = ReturnType<typeof nlp>

/** the parts of a subtitle doc that a plain View does not have */
export interface SubtitleMethods {
  /** one parsed document per cue, in file order - a selection keeps one view per cue */
  views: View[]
  /** the vttpeg document, holding the timing of each cue */
  vtt: Vtt
  /** timing and labels - cues[i] is the data for views[i] */
  readonly cues: Cue[]
  /** produce the whole subtitle file, including any changes to the text */
  toSubtitle(opts?: OutOptions): string
  /** wrap a new view per cue, carrying along the cue data */
  update(views: View[]): SubtitleDoc
}

/** every method that returns a view returns a wrapped one instead, so chains keep .cues and .toSubtitle() */
type Wrap<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? R extends BaseView
      ? (...args: A) => Wrap<R> & SubtitleMethods
      : T[K]
    : T[K]
}

/** a document for each cue in a subtitle file, addressed as if it were one document */
export type SubtitleDoc = Wrap<View> & SubtitleMethods

export interface SubtitleLib {
  /** parse a .vtt subtitle file, into a doc for each cue */
  fromSubtitle(text: string): SubtitleDoc
}

/** Use the result of nlp.plugin(subtitle) as this type after registration. */
export type SubtitleNlp = typeof nlp & SubtitleLib

declare const subtitle: Plugin & { version: string; lib: SubtitleLib }
export default subtitle

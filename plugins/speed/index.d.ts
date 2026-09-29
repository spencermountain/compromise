/// <reference types="node" />

import type nlp from 'compromise'
import type { Lexicon, Net, ParsedMatch } from 'compromise/misc'
import type BaseView from 'compromise/view/one'
import type { createReadStream, PathLike } from 'node:fs'

type View = ReturnType<typeof nlp>

/** Options forwarded to Node's fs.createReadStream. */
export type StreamFileOptions = Parameters<typeof createReadStream>[1]

export interface KeyPressOptions {
  /** Log which sentences are parsed and how many remain cached. */
  verbose?: boolean
}

/** Methods added to the nlp library, not to document Views. */
export interface SpeedMethods {
  /** Read a file in chunks and collect the Views returned by a synchronous filter. */
  streamFile(
    path: PathLike,
    filter: (doc: View) => BaseView | void | null | false,
    options?: StreamFileOptions
  ): Promise<View>
  /** Parse sentences in parallel and collect matches. */
  workerPool(text: string, match: string | Net | ParsedMatch): Promise<View>
  /** Reuse cached sentences while parsing edited text. */
  keyPress(text: string, lexicon?: Lexicon, options?: KeyPressOptions): View
  /** Tokenize first, then tag only sentences that could contain the match. */
  lazy(text: string, match: string | Net): View
}

/** The callable compromise library after installing the complete speed plugin. */
export type SpeedNlp = Omit<typeof nlp, keyof SpeedMethods> & SpeedMethods & {
  <PluginTypes = {}>(text: string, lexicon?: Lexicon): View & PluginTypes
}

/** A speed plugin exposes methods through its lib property. */
export interface SpeedPlugin<Methods extends object = SpeedMethods> {
  lib: Methods
}

export const streamFile: SpeedPlugin<Pick<SpeedMethods, 'streamFile'>>
export const workerPool: SpeedPlugin<Pick<SpeedMethods, 'workerPool'>>
export const keyPress: SpeedPlugin<Pick<SpeedMethods, 'keyPress'>>
/** Installs nlp.lazy(). */
export const lazyParse: SpeedPlugin<Pick<SpeedMethods, 'lazy'>>

declare const nlpSpeed: SpeedPlugin & { version: string }
export default nlpSpeed

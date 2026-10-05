const env = globalThis.process?.env ?? globalThis.env ?? {}
const debug = { tags: Boolean(env.DEBUG_TAGS) }

export default debug

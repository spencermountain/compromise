// Share the ESM declarations through a type-only CommonJS entry point.
export type * from './misc.d.ts' with { 'resolution-mode': 'import' }

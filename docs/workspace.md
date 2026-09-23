# Developing the workspace

The root package is `compromise`. The seven maintained packages in `plugins/*`
are workspace members; unfinished packages in `plugins/_experiments/*` are not.
Use pnpm 11.5.0 (also pinned in `package.json`) and Node.js 24 for development.

Run `pnpm install` once at the root. All packages use the root
`pnpm-lock.yaml` and share dependency versions through the catalog in
`pnpm-workspace.yaml`. Declare dependencies in the packages that use them;
use `catalog:` for shared runtime dependencies and build/test tools.
Plugin-specific dependencies, such as spacetime in dates, stay in that plugin.

Each maintained plugin declares `compromise: "workspace:*"` as a peer dependency.
This links the current root library during development, without a separate
registry copy or manually maintained compatibility range. pnpm converts the peer
to the root library's version when packing or publishing. Use `pnpm pack` or
`pnpm publish` for release artifacts so workspace and catalog references are
converted into ordinary versions for consumers.

## Commands

| Command | Scope |
| --- | --- |
| `pnpm test` | Root source tests |
| `pnpm test:plugins` | Each plugin's source tests, in its own process |
| `pnpm test:all` | Root and plugin source tests |
| `pnpm build` | Root library |
| `pnpm plugins:build` | All maintained plugins |
| `pnpm build:all` | Root library, then plugins |
| `pnpm testb` | Root build tests (build first) |
| `pnpm test:plugins:build` | Plugin build tests (run `pnpm build:all` first) |
| `pnpm test:types` | Root TypeScript declarations |
| `pnpm lint` | Root source lint |
| `pnpm bench --no-save` | Run benchmarks and compare against saved history without saving a result |

For one plugin, use `pnpm --filter compromise-dates test` or
`pnpm --filter compromise-dates build`. Plugin source tests import the linked
`compromise` package (or its `/one` entry); build tests use generated bundles.
CI runs both source and build tests for all maintained plugins.

When adding a plugin, place its package in `plugins/<name>`, declare the
workspace peer, and copy the shared build/test catalog entries and scripts from
an existing plugin. The root plugin commands discover it automatically.

# Development
The project is a pnpm workspace
* The seven maintained packages in `plugins/*` are workspace members; 
* Each maintained plugin declares `compromise: "workspace:*"` as a peer dependency.

## Commands
* `pnpm test` - Root source tests
* `pnpm test:plugins` - Each plugin's source tests, in its own process
* `pnpm test:all` - Root and plugin source tests
* `pnpm build` - Root library
* `pnpm plugins:build` - All maintained plugins
* `pnpm build:all` - Root library, then plugins
* `pnpm testb` - Root build tests (build first)
* `pnpm test:plugins:build` | Plugin build tests (run `pnpm build:all` first)
* `pnpm test:types` - Root TypeScript declarations
* `pnpm lint` - Root source lint
* `pnpm bench --no-save` - Run benchmarks and compare against saved history without saving a result |

For one plugin, use `pnpm --filter compromise-dates test` or
`pnpm --filter compromise-dates build`.

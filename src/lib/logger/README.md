# Logger

A small, dependency-free, console-based logger. It is deliberately minimal: this
site is statically generated and has no database, authentication, or API, so the
logger exists to report the few build-time or server-side conditions that would
otherwise fail silently. Application code cannot use `console` directly
(`no-console` is an ESLint error under `src/`), so this is the sanctioned way to
emit a diagnostic.

## Usage

Calls are **context first**, then the message:

```typescript
import { buildLogger } from "@/lib/logger/server";

const logger = buildLogger("sitemap");

logger.warn({ err, op: "getLastModified" }, "Git commit date unavailable");
```

Never pass the message first (`logger.warn("message", { ... })`); it does not
type-check.

## Modules

| File | Status | Purpose |
| --- | --- | --- |
| [`server.ts`](./server.ts) | **In use** (the sitemap) | Always-enabled logger for server and build code. Adds `app`, `version`, and `env` to every entry. |
| [`shared.ts`](./shared.ts) | In use | Core implementation: levels, context merging, formatting, `child()`. |
| [`utils.ts`](./utils.ts) | `maskEmail` in use; `timeOperation` reserved | Email masking applied to any `email` context key; an unused timing helper. |
| [`client.ts`](./client.ts) | Reserved | Browser logger, enabled only outside production. No caller yet. |
| [`isomorphic.ts`](./isomorphic.ts) | Reserved, **known defect** | Lazily picks the server or client logger. No caller yet. |

Types live in [`src/types/logger.types.ts`](../../types/logger.types.ts).

## Behavior

- Levels: `trace`, `debug`, `info`, `warn`, `error`, `fatal`. `trace` and
  `debug` write to `console.debug`; `error` and `fatal` to `console.error`.
- Output is one line: `[ISO timestamp] LEVEL message key="value" ...`, with
  context keys sorted and values JSON-encoded.
- An `err` context value that is an `Error` is serialized to
  `{ message, name, stack }`.
- `child(context)` returns a logger that merges extra context into every entry.
  `buildLogger(moduleName)` is a child with `{ module: moduleName }`.
- The server logger is always enabled, so build-time warnings appear in build
  logs. The client logger is a no-op in production.

## Known issue

In `isomorphic.ts`, `child(context)` returns a new logger but later assigns the
derived child to the **parent's** cached logger, so the returned instance does not
inherit the context and the parent can start logging it. Nothing imports this
module today. Fix it, with tests for parent, child, sibling, and nested-child
isolation, before using it.

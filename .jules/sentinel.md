## 2026-02-25 - [Security Headers and Build Integrity]
**Vulnerability:** Missing security headers (X-Frame-Options, CSP, etc.) in Next.js configuration.
**Learning:** Adding security headers via `next.config.js` is a high-impact, non-breaking enhancement that provides defense-in-depth. However, when the build environment is broken due to missing peer dependencies (like `autoprefixer` or `@tanstack/react-query`), fixing the environment can introduce significant noise in the PR (like massive lockfile changes).
**Prevention:** Use Webpack `externals` in `next.config.js` to handle optional peer dependencies (`pino-pretty`, `lokijs`, `encoding`) instead of installing them, to minimize dependency bloat and attack surface.

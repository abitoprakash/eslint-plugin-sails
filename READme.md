# eslint-plugin-sails

Static-analysis rules that catch common **SailsJS / Waterline** pitfalls _before_ they blow up at runtime.

---

## ✨ Features

| Rule                                                                               | Default | Auto-fix | Catches…                                                             |
| ---------------------------------------------------------------------------------- | ------- | -------- | -------------------------------------------------------------------- |
| [sails/no-load-collection](docs/no-load-collection.md)                             | error   | ✔       | Deprecated call **`Waterline.loadCollection()`**                     |
| [sails/no-connections-string](docs/no-connections-string.md)                       | error   | ✔       | Legacy **`connections`** key in config (renamed to `datastores`)     |
| [sails/no-set-after-create](docs/no-set-after-create.md)                           | error   | ✖       | Chaining **`.set()`** after `.create()` / `.createEach()`            |
| [sails/no-array-arg-populate](docs/no-array-arg-populate.md)                       | error   | ✖       | Passing **arrays** to `.populate()`                                  |
| [sails/no-object-paginate](docs/no-object-paginate.md)                             | error   | ✖       | Old object form **`.paginate({ page, limit })`**                     |
| [sails/no-deprecated-criteria-modifiers](docs/no-deprecated-criteria-modifiers.md) | error   | ✔/✖    | Deprecated criteria modifiers like `lessThan`, `not`, etc.           |
| [sails/no-deprecated-response-methods](docs/no-deprecated-response-methods.md)     | error   | ✔/✖    | Deprecated response helpers like `res.jsonx()`, `res.negotiate()`    |
| [sails/no-legacy-model-settings](docs/no-legacy-model-settings.md)                 | error   | ✖       | Legacy model settings like `autoPK`, `autoCreatedAt`, `toJSON`       |
| [sails/no-model-instance-methods](docs/no-model-instance-methods.md)               | error   | ✖       | Removed model instance methods like `.save()`, `.add()`, `.remove()` |

All rules are bundled in the preset **`plugin:sails/recommended`**.

---

## 🚀 Installation

```bash
npm install --save-dev eslint eslint-plugin-sails
```

---

## 🔧 Usage

```js
// .eslintrc.js
module.exports = {
  plugins: ['sails'],
  extends: [
    'plugin:sails/recommended', // turns on all rules above
  ],
  // optional per-rule overrides
  rules: {
    // 'sails/no-array-arg-populate': 'warn',
  },
};
```

## 🛠️ Development & Contribution

### Prerequisites

- Node ≥ 18
- yarn
- eslint ≥ 8, typescript ≥ 5 (dev-deps only)

### Local setup

```bash
git clone https://github.com/your-org/eslint-plugin-sails.git
cd eslint-plugin-sails
npm install
npm run build # compiles TS → dist/
npm test      # runs RuleTester suites
```

### Creating a new rule

1. **Scaffold** under `src/rules/<group>/<rule-name>.ts`.
2. Add a **Jest RuleTester** in `tests/`.
3. Document it in `docs/<rule-name>.md` (see existing files for style).
4. Export the rule in `src/index.ts` and wire it into the `recommended` config.
5. `npm run lint` – plugin code must be self-clean!
6. Open a PR targeting `main`. Follow Conventional Commits (`feat:`, `fix:`, etc.).
7. Ensure CI (tests + type-check) passes.

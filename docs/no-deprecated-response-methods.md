[← Back to main README](../READme.md)

# no-deprecated-response-methods

Flags deprecated response helpers:

| Deprecated        | Status in Sails 1                              | Use instead                                            |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------ |
| `res.jsonx()`     | Logs deprecation, kept for now                 | `res.json()`                                           |
| `res.negotiate()` | Removed → _“not a function”_                   | `res.serverError()` / `res.badRequest()`               |
| `res.created()`   | Removed if you didn’t create a custom response | Create `api/responses/created.js` or just `res.json()` |

### Rule details

- **Type:** problem
- **Default severity:** error
- **Autofix:** converts `jsonx` → `json`; the other two just report.

### Examples

```js
// ❌ Bad
res.jsonx({ ok: true });
res.negotiate(err);
res.created(record);

// ✅ Good
res.json({ ok: true });
res.serverError(err);
```

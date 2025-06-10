# no-set-after-create

Disallow chaining **`.set()`** after `.create()` / `.createEach()`.

---

## Why?

From Waterline 0.13 the builder expects initial values _inside_ `.create()`. Calling `.set()` triggers the runtime warning thrown in: `waterline/lib/waterline/query/dql/create.js → Deferred.set()`

> “Warning: Calling .set() after .create() is deprecated.”

---

## Rule details

|             |                                   |
| ----------- | --------------------------------- |
| **Type**    | problem                           |
| **Default** | `error`                           |
| **Autofix** | ❌ (needs semantic merge of data) |

---

### ❌ Incorrect

```js
await Pet.create().set({ name: 'Snowball' });
```

### ✅ Correct

```js
await Pet.create({ name: 'Snowball' });
```

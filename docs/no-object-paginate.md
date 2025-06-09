# no-object-paginate

Use new signature **`.paginate(page, limit)`** instead of the legacy object.

---

## Why?

Waterline prints a deprecation warning in: `waterline/query/deferred/paginate.js`

```
Warning: .paginate({page, limit}) is deprecated.
```

---

## Rule details

|           |                                         |
|-----------|-----------------------------------------|
| **Type**    | problem                                 |
| **Default** | `error`                                 |
| **Autofix** | ❌ (requires reading object values)      |

---

### ❌ Incorrect

```js
await User.find().paginate({ page: 2, limit: 50 });
```

### ✅ Correct

```js
await User.find().paginate(2, 50);
```
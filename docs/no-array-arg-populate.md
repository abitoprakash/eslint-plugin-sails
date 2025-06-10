# no-array-arg-populate

Disallow passing arrays to `.populate()`.

---

## Why?

Waterline's `.populate()` expects a string or object, not an array. Passing an array can lead to unexpected behavior.

---

## Rule details

|             |         |
| ----------- | ------- |
| **Type**    | problem |
| **Default** | `error` |
| **Autofix** | ❌      |

---

### ❌ Incorrect

```js
await User.find().populate(['pets', 'cars']);
```

### ✅ Correct

```js
await User.find().populate('pets');
await User.find().populate('cars');
```

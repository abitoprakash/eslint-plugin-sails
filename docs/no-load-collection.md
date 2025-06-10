# no-load-collection

Replace deprecated **`Waterline.loadCollection()`** with **`registerModel()`**.

---

## Why?

`loadCollection()` was removed in **Waterline 0.13**. Using it prints:

```
Deprecation: Waterline.loadCollection() is no longer available.
```

and Sails falls back to a compatibility shim.

---

## Rule details

|             |                             |
| ----------- | --------------------------- |
| **Type**    | problem                     |
| **Default** | `error`                     |
| **Autofix** | ✔ replaces the method name |

---

### ❌ Incorrect

```js
Waterline.loadCollection(User);
```

### ✅ Correct

```js
Waterline.registerModel(User);
```

---

### Fixer behaviour

Only the property identifier is replaced; arguments stay untouched.

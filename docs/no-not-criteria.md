# no-not-criteria

Disallow criteria objects that use the illegal `not` operator.

---

## Why?

The `not` operator is not supported in Waterline criteria objects and will cause runtime errors.

---

## Rule details

|           |         |
|-----------|---------|
| **Type**    | problem |
| **Default** | `error` |
| **Autofix** | ❌      |

---

### ❌ Incorrect

```js
await User.find({ not: { age: 30 } });
```

### ✅ Correct

```js
await User.find({ age: { '!=': 30 } });
```
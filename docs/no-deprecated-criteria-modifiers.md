# no-deprecated-criteria-modifiers

Flags deprecated modifier names (`lessThan`, `not`, etc.) inside Waterline criteria objects.

---

## Why?

Waterline previously supported verbose modifier keys (like `lessThan`, `not`, etc.) in criteria objects. These are now deprecated in favor of their symbolic equivalents (e.g., `<`, `!=`). Using deprecated keys can lead to confusion and is discouraged in modern Sails/Waterline code.

---

## Rule details

|           |                                         |
|-----------|-----------------------------------------|
| **Type**    | problem                                 |
| **Default** | `error`                                 |
| **Autofix** | ✔ (for `<`, `<=`, `>`, `>=` only)       |

---

### ❌ Incorrect

```js
await Pet.find({ age: { lessThan: 3 } });
await Pet.find({ age: { lessThanOrEqual: 5 } });
await User.find({ score: { greaterThan: 9000 } });
await User.find({ score: { greaterThanOrEqual: 100 } });
await Order.find({ status: { not: 'shipped' } });
await Foo.find({ bar: { '!': null } });
await Foo.find({ bar: { '!==': 5 } });
```

### ✅ Correct

```js
await Pet.find({ age: { '<': 3 } });
await Pet.find({ age: { '<=': 5 } });
await User.find({ score: { '>': 9000 } });
await User.find({ score: { '>=': 100 } });
await Order.find({ status: { '!=': 'shipped' } });
await Foo.find({ bar: { '!=': null } });
await Foo.find({ bar: { '!=': 5 } });
```

---

### Fixer behaviour

The rule will auto-fix the four unambiguous keys (`lessThan`, `lessThanOrEqual`, `greaterThan`, `greaterThanOrEqual`) to their symbolic equivalents. Other deprecated keys (like `not`, `!`, `!==`) will be flagged for manual review.

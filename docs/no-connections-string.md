[← Back to main README](../READme.md)

# no-connections-string

Disallow legacy `connections` key in config (renamed to `datastores`).

---

## Why?

Sails v1+ uses `datastores` instead of `connections` in configuration. Using the old key can cause confusion and misconfiguration.

---

## Rule details

|             |         |
| ----------- | ------- |
| **Type**    | problem |
| **Default** | `error` |
| **Autofix** | ✔      |

---

### ❌ Incorrect

```js
module.exports.connections = {
  someMongodbServer: {
    adapter: 'sails-mongo',
    url: 'mongodb://localhost:27017/mydb',
  },
};
```

### ✅ Correct

```js
module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: 'mongodb://localhost:27017/mydb',
  },
};
```

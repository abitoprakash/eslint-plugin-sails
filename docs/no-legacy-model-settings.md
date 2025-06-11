[← Back to main README](../READme.md)

# no-legacy-model-settings

Warns about model patterns that were **removed in Sails 1 + Waterline 0.13**.

| Pattern                                              | Why it’s bad now                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Top-level `autoPK`, `autoCreatedAt`, `autoUpdatedAt` | Waterline no longer auto-creates hidden attributes. Define them explicitly instead. |
| Attribute-level `toJSON` inside `attributes`         | Instance methods were removed. Use top-level `customToJSON` instead.                |

Only files whose path contains **`models/`** are checked.

```js
// ❌ api/models/User.js
module.exports = {
  autoPK: false, // <- flagged
  attributes: {
    toJSON() { … } // <- flagged
  }
};

// ✅ fixed
module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    customToJSON() { … }
  }
};
```

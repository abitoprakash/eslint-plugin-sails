[← Back to main README](../READme.md)

# no-model-instance-methods

Flags calls to model **record** instance methods that were removed in Sails 1:

- `.save()`
- `.add()`
- `.remove()`

Use the new static helpers instead:

| Removed                | Replacement                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `record.save()`        | `Model.updateOne(record.id).set({...}).fetch()`                 |
| `record.add(child)`    | `Model.addToCollection(record.id, 'assoc').members([child.id])` |
| `record.remove(child)` | `Model.removeFromCollection(…)`                                 |

```js
// ❌ Bad
await record.save();
record.add(pet);
record.remove(pet);

// ✅ Good
await User.updateOne(record.id).set(record).fetch();
await User.addToCollection(record.id, 'pets').members([pet.id]);
```

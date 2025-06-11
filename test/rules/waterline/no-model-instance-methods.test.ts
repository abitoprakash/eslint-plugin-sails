import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-model-instance-methods';

const tester = new RuleTester({});

tester.run('no-model-instance-methods', rule, {
  valid: ["await User.updateOne({ id }).set({ name: 'x' });", "await User.addToCollection(3, 'pets').members([1]);"],
  invalid: [
    {
      code: 'record.save();',
      errors: [{ messageId: 'instanceMethod', data: { method: 'save' } }],
    },
    {
      code: 'record.add(other);',
      errors: [{ messageId: 'instanceMethod', data: { method: 'add' } }],
    },
    {
      code: 'record.remove(child);',
      errors: [{ messageId: 'instanceMethod', data: { method: 'remove' } }],
    },
  ],
});

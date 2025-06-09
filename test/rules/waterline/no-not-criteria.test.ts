import { RuleTester } from '@typescript-eslint/rule-tester';
import tsParser from '@typescript-eslint/parser';
import rule from '../../../src/rules/waterline/no-not-criteria';

const tester = new RuleTester();

tester.run('no-not-criteria', rule, {
  valid: [
    "await User.find({ id: 1 });",
    "await User.find({ age: { '!=': 30 } });",
  ],
  invalid: [
    {
      code: "await User.find({ not: { age: 30 } });",
      errors: [{ messageId: 'noNot' }],
    },
  ],
});

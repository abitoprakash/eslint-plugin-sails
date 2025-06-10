import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-set-after-create';

const tester = new RuleTester({});

tester.run('no-set-after-create', rule, {
  valid: ["await User.create({ name: 'foo' });", "await User.createEach([{ name: 'a' }, { name: 'b' }]);"],
  invalid: [
    {
      code: "await User.create().set({ name: 'foo' });",
      errors: [{ messageId: 'noSetAfterCreate' }],
    },
    {
      code: "await User.createEach().set([{ name: 'a'}]);",
      errors: [{ messageId: 'noSetAfterCreate' }],
    },
  ],
});

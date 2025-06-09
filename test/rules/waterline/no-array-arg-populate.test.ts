import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-array-arg-populate';

const tester = new RuleTester({});

tester.run('no-array-arg-populate', rule, {
  valid: ["await User.find().populate('pets');"],
  invalid: [
    {
      code: "await User.find().populate(['pets', 'teams']);",
      errors: [{ messageId: 'noArrayPopulate' }],
    },
  ],
});

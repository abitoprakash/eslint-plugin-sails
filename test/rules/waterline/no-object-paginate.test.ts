import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-object-paginate';

const tester = new RuleTester({});

tester.run('no-object-paginate', rule, {
  valid: ['await User.find().paginate(1, 50);'],
  invalid: [
    {
      code: 'await User.find().paginate({ page: 1, limit: 50 });',
      errors: [{ messageId: 'noObjectPaginate' }],
    },
  ],
});

import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-loadcollection';

const tester = new RuleTester();

tester.run('no-loadcollection', rule, {
  valid: ['Waterline.registerModel(User);'],
  invalid: [
    {
      code: 'Waterline.loadCollection(User);',
      output: 'Waterline.registerModel(User);',
      errors: [{ messageId: 'replaceLoadCollection' }],
    },
  ],
});

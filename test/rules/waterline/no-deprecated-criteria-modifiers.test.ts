import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-deprecated-criteria-modifiers';

const tester = new RuleTester({});

tester.run('no-deprecated-criteria-modifiers', rule, {
  valid: ['await Pet.find({ age: { "<": 3 } });', 'await User.find({ rating: { ">=": 4 } });'],

  invalid: [
    // auto-fixable keys
    {
      code: 'await Pet.find({ age: { lessThan: 3 } });',
      output: 'await Pet.find({ age: { "<": 3 } });',
      errors: [{ messageId: 'deprecated', data: { oldKey: 'lessThan', newKey: '<' } }],
    },
    {
      code: 'await Pet.find({ age: { lessThanOrEqual: 5 } });',
      output: 'await Pet.find({ age: { "<=": 5 } });',
      errors: [{ messageId: 'deprecated', data: { oldKey: 'lessThanOrEqual', newKey: '<=' } }],
    },
    {
      code: 'await User.find({ score: { greaterThan: 9000 } });',
      output: 'await User.find({ score: { ">": 9000 } });',
      errors: [{ messageId: 'deprecated', data: { oldKey: 'greaterThan', newKey: '>' } }],
    },
    {
      code: 'await User.find({ score: { greaterThanOrEqual: 100 } });',
      output: 'await User.find({ score: { ">=": 100 } });',
      errors: [{ messageId: 'deprecated', data: { oldKey: 'greaterThanOrEqual', newKey: '>=' } }],
    },

    // non-auto-fixable keys
    {
      code: "await Order.find({ status: { not: 'shipped' } });",
      errors: [{ messageId: 'deprecated', data: { oldKey: 'not', newKey: '!=' } }],
    },
    {
      code: "await Foo.find({ bar: { '!': null } });",
      errors: [{ messageId: 'deprecated', data: { oldKey: '!', newKey: '!=' } }],
    },
    {
      code: "await Foo.find({ bar: { '!==': 5 } });",
      errors: [{ messageId: 'deprecated', data: { oldKey: '!==', newKey: '!=' } }],
    },
  ],
});

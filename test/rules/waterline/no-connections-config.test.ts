import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-connections-config';

const tester = new RuleTester({});

tester.run('no-connections-config', rule, {
  valid: ['module.exports = { datastores: { default: {} } };'],
  invalid: [
    {
      code: 'module.exports = { connections: { default: {} } };',
      output: 'module.exports = { datastores: { default: {} } };',
      errors: [{ messageId: 'replaceConnections' }],
    },
  ],
});

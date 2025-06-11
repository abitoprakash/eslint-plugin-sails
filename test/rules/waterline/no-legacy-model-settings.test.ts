import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-legacy-model-settings';

const tester = new RuleTester({});

tester.run('no-legacy-model-settings', rule, {
  valid: [
    {
      filename: 'api/models/User.js',
      code: `
        module.exports = {
          attributes: {
            customToJSON() { return this; }
          }
        };`,
    },
  ],
  invalid: [
    {
      filename: 'api/models/User.js',
      code: 'module.exports = { autoPK: false };',
      errors: [{ messageId: 'legacyModelSetting', data: { name: 'autoPK' } }],
    },
    {
      filename: 'api/models/Pet.ts',
      code: `
        module.exports = {
          attributes: {
            toJSON() { return this; }
          }
        };`,
      errors: [{ messageId: 'attrToJSON' }],
    },
  ],
});

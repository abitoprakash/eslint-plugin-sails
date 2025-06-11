import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../../src/rules/waterline/no-deprecated-response-methods';

const tester = new RuleTester({});

tester.run('no-deprecated-response-methods', rule, {
  valid: ['res.json({ ok: true });', 'res.serverError(err);'],
  invalid: [
    {
      code: 'res.jsonx({ ok: true });',
      output: 'res.json({ ok: true });',
      errors: [{ messageId: 'deprecatedResponse', data: { old: 'jsonx', suggest: 'json' } }],
    },
    {
      code: 'res.negotiate(err);',
      errors: [{ messageId: 'deprecatedResponse', data: { old: 'negotiate', suggest: 'negotiate' } }],
    },
    {
      code: 'res.created(data);',
      errors: [{ messageId: 'deprecatedResponse', data: { old: 'created', suggest: 'created' } }],
    },
  ],
});

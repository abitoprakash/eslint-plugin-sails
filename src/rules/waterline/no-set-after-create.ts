import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/abitoprakash/eslint-plugin-sails/main/docs/${name}.md`,
);

type Options = [];
type MessageIds = 'noSetAfterCreate';

export default createRule<Options, MessageIds>({
  name: 'no-set-after-create',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow chaining `.set()` after `.create()` / `.createEach()`.',
    },
    messages: {
      noSetAfterCreate:
        'Pass initial values directly to `.create()` / `.createEach()` instead of chaining `.set()`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // match *.set(..) where callee.object is a CallExpression *.create()
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'set' &&
          node.callee.object.type === 'CallExpression'
        ) {
          const innerCall = node.callee.object;
          if (
            innerCall.callee.type === 'MemberExpression' &&
            innerCall.callee.property.type === 'Identifier' &&
            ['create', 'createEach'].includes(innerCall.callee.property.name)
          ) {
            context.report({
              node: node.callee.property,
              messageId: 'noSetAfterCreate',
            });
          }
        }
      },
    };
  },
});

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  ruleName =>
    `https://github.com/abitoprakash/eslint-plugin-sails/blob/main/docs/${ruleName}.md`,
);

type Options = [];
type MessageIds = 'noNot';

export default createRule<Options, MessageIds>({
  name: 'no-not-criteria',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow `{ not: {...} }` in Waterline criteria objects (use `!=`, `<`, `>`, etc. instead).',
    },
    messages: {
      noNot:
        'Avoid the `not` top-level operator. Use comparison operators or `!=` instead.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Property(node: TSESTree.Property) {
        if (node.key.type === 'Identifier' && node.key.name === 'not') {
          context.report({ node: node.key, messageId: 'noNot' });
        }
      },
    };
  },
});

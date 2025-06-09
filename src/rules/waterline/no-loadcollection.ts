import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/your-org/eslint-plugin-sails/blob/main/docs/${name}.md`,
);

type Options = [];
type MessageIds = 'replaceLoadCollection';

export default createRule<Options, MessageIds>({
  name: 'no-loadcollection',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow `Waterline.loadCollection()` – use `registerModel()` instead.',
    },
    fixable: 'code',
    messages: {
      replaceLoadCollection: 'Replace deprecated `loadCollection` with `registerModel`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        const callee = node.callee;
        if (
          callee.type === 'MemberExpression' &&
          !callee.computed &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'loadCollection'
        ) {
          context.report({
            node: callee.property,
            messageId: 'replaceLoadCollection',
            fix: fixer =>
              fixer.replaceText(callee.property, 'registerModel'),
          });
        }
      },
    };
  },
});

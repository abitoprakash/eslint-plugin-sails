import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

const DISALLOWED = new Set(['save', 'add', 'remove']);

type MessageIds = 'instanceMethod';

export default createRule<[], MessageIds>({
  name: 'no-model-instance-methods',
  meta: {
    type: 'problem',
    docs: { description: 'Disallow removed instance methods .save(), .add(), .remove() on records.' },
    messages: {
      instanceMethod: "The instance method '.{{method}}()' was removed in Sails 1. Use model static methods instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === 'MemberExpression' &&
          !node.callee.computed &&
          node.callee.property.type === 'Identifier'
        ) {
          const name = node.callee.property.name;
          if (DISALLOWED.has(name)) {
            context.report({
              node: node.callee.property,
              messageId: 'instanceMethod',
              data: { method: name },
            });
          }
        }
      },
    };
  },
});

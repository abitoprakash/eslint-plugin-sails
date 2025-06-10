import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

type Options = [];
type MessageIds = 'noArrayPopulate';

export default createRule<Options, MessageIds>({
  name: 'no-array-arg-populate',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow an array as the first arg to `.populate()`.',
    },
    messages: {
      noArrayPopulate:
        '`.populate()` now accepts only a single association name (string), not an array.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'populate' &&
          node.arguments.length &&
          node.arguments[0].type === 'ArrayExpression'
        ) {
          context.report({ node: node.arguments[0], messageId: 'noArrayPopulate' });
        }
      },
    };
  },
});

import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

type Options = [];
type MessageIds = 'noObjectPaginate';

export default createRule<Options, MessageIds>({
  name: 'no-object-paginate',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow the legacy object form `.paginate({page, limit})`.',
    },
    messages: {
      noObjectPaginate: 'Use `.paginate(page, limit)` instead of passing an object.',
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
          node.callee.property.name === 'paginate' &&
          node.arguments.length === 1 &&
          node.arguments[0].type === 'ObjectExpression'
        ) {
          context.report({ node: node.arguments[0], messageId: 'noObjectPaginate' });
        }
      },
    };
  },
});

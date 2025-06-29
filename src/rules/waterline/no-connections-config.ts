import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

type Options = [];
type MessageIds = 'replaceConnections';

export default createRule<Options, MessageIds>({
  name: 'no-connections-config',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow top-level `connections` config – use `datastores`.',
    },
    fixable: 'code',
    messages: {
      replaceConnections: 'Rename `connections` to `datastores`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Property(node: TSESTree.Property) {
        if (
          node.parent?.type === 'ObjectExpression' &&
          node.key.type === 'Identifier' &&
          node.key.name === 'connections'
        ) {
          context.report({
            node: node.key,
            messageId: 'replaceConnections',
            fix: (fixer) => fixer.replaceText(node.key, 'datastores'),
          });
        }
      },
    };
  },
});

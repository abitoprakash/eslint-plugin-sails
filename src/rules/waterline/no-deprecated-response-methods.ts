import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

const DEPRECATED: Record<string, { replacement: string | null }> = {
  jsonx: { replacement: 'json' }, // safe auto-fix
  negotiate: { replacement: null },
  created: { replacement: null },
};

type MessageIds = 'deprecatedResponse';

export default createRule<[], MessageIds>({
  name: 'no-deprecated-response-methods',
  meta: {
    type: 'problem',
    docs: { description: 'Disallow `res.jsonx()`, `res.negotiate()`, `res.created()`.' },
    fixable: 'code',
    messages: {
      deprecatedResponse: '`res.{{old}}()` is deprecated in Sails 1.  Use `res.{{suggest}}()` or equivalent.',
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
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'res' &&
          node.callee.property.type === 'Identifier'
        ) {
          const prop = node.callee.property.name;
          if (prop in DEPRECATED) {
            const replacement = DEPRECATED[prop].replacement ?? prop;
            context.report({
              node: node.callee.property,
              messageId: 'deprecatedResponse',
              data: { old: prop, suggest: replacement },
              fix:
                replacement && replacement !== prop
                  ? (fixer) => {
                      if (node.callee.type === 'MemberExpression') {
                        return fixer.replaceText(node.callee.property, replacement);
                      }
                      return null;
                    }
                  : undefined,
            });
          }
        }
      },
    };
  },
});

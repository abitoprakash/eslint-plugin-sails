import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

/**
 * Map of deprecated modifier → canonical operator (from Waterline's
 * MODIFIER_ALIASES).  Only the four unambiguous keys are auto-fixable.
 * https://github.com/balderdashy/waterline/blob/master/lib/waterline/utils/query/private/normalize-constraint.js#L23
 */
const ALIASES: Record<string, string> = {
  // auto-fixable
  lessThan: '<',
  lessThanOrEqual: '<=',
  greaterThan: '>',
  greaterThanOrEqual: '>=',

  // *not* auto-fixable (manual review required)
  not: '!=',
  '!': '!=',
  '!==': '!=',
};

const AUTO_FIXABLE = new Set([
  'lessThan',
  'lessThanOrEqual',
  'greaterThan',
  'greaterThanOrEqual',
]);

type Options = [];
type MessageIds = 'deprecated';

export default createRule<Options, MessageIds>({
  name: 'no-deprecated-criteria-modifiers',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Flags deprecated modifier names (`lessThan`, `not`, etc.) inside Waterline criteria objects.',
    },
    fixable: 'code',
    messages: {
      deprecated:
        "The '{{ oldKey }}' modifier is deprecated; use '{{ newKey }}' instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function report(node: TSESTree.Node, oldKey: string) {
      const replacement = ALIASES[oldKey];

      context.report({
        node,
        messageId: 'deprecated',
        data: { oldKey, newKey: replacement },
        fix:
          AUTO_FIXABLE.has(oldKey) && node.type === 'Identifier'
            ? fixer => fixer.replaceText(node, JSON.stringify(replacement))
            : undefined,
      });
    }

    //----------------------------------------------------------------------
    // Visitor
    //----------------------------------------------------------------------

    return {
      Property(node: TSESTree.Property) {
        // Only direct keys (Identifier or Literal string) matter.
        const keyName =
          node.key.type === 'Identifier'
            ? node.key.name
            : node.key.type === 'Literal' && typeof node.key.value === 'string'
            ? node.key.value
            : undefined;

        if (keyName && Object.prototype.hasOwnProperty.call(ALIASES, keyName)) {
          report(node.key, keyName);
        }
      },
    };
  },
});

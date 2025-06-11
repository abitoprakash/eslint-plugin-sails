import { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../../utils/common';

const TOP_LEVEL = new Set(['autoPK', 'autoCreatedAt', 'autoUpdatedAt']);

type MessageIds = 'legacyModelSetting' | 'attrToJSON';

export default createRule<[], MessageIds>({
  name: 'no-legacy-model-settings',
  meta: {
    type: 'problem',
    docs: { description: 'Disallow removed top-level model settings and attribute-level toJSON.' },
    messages: {
      legacyModelSetting: "'{{name}}' is no longer supported in Sails 1 models.  Define explicit attributes instead.",
      attrToJSON: "Define `customToJSON` at the model's top level instead of an attribute-level `toJSON`.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();
    if (!/models[\\/]/i.test(filename)) {
      return {}; // only lint files in a models folder
    }

    function isInsideAttributes(node: TSESTree.Node): boolean {
      let current: TSESTree.Node | undefined = node.parent;
      while (current) {
        if (current.type === 'Property' && current.key.type === 'Identifier' && current.key.name === 'attributes') {
          return true;
        }
        current = current.parent;
      }
      return false;
    }

    return {
      Property(node: TSESTree.Property) {
        if (node.key.type === 'Identifier') {
          const propName = node.key.name;

          // deprecated top-level keys
          if (TOP_LEVEL.has(propName) && !isInsideAttributes(node)) {
            context.report({ node: node.key, messageId: 'legacyModelSetting', data: { name: propName } });
          }

          // attribute-level toJSON
          if (propName === 'toJSON' && isInsideAttributes(node)) {
            context.report({ node: node.key, messageId: 'attrToJSON' });
          }
        }
      },
    };
  },
});

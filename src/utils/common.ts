import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * Common createRule utility for all custom rules.
 * Usage: import { createRule } from '../utils/common';
 */
export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/abitoprakash/eslint-plugin-sails/blob/main/docs/${name}.md`
);

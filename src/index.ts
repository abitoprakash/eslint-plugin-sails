import noNotCriteria from './rules/waterline/no-not-criteria';
import noLoadCollection from './rules/waterline/no-loadcollection';
import noConnectionsConfig from './rules/waterline/no-connections-config';
import noSetAfterCreate from './rules/waterline/no-set-after-create';
import noArrayArgPopulate from './rules/waterline/no-array-arg-populate';
import noObjectPaginate from './rules/waterline/no-object-paginate';

export const rules = {
  'no-not-criteria': noNotCriteria,
  'no-load-collection': noLoadCollection,
  'no-connections-config': noConnectionsConfig,
  'no-set-after-create': noSetAfterCreate,
  'no-array-arg-populate': noArrayArgPopulate,
  'no-object-paginate': noObjectPaginate
};

export const configs = {
  recommended: {
    plugins: ['sails'],
    rules: {
      'sails/no-not-criteria': 'error',
      'sails/no-load-collection': 'error',
      'sails/no-connections-string': 'error',
      'sails/no-set-after-create': 'error',
      'sails/no-array-arg-populate': 'error',
      'sails/no-object-paginate': 'error',
    },
  },
};

export default { rules, configs };

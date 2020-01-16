'use strict';

module.exports = {
  description: 'adds sortablejs to application',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    return this.addPackageToProject('sortablejs', '^1.10.x')
  }
};

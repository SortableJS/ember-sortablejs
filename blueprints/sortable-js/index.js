'use strict';

module.exports = {
  description: 'adds sortablejs to application',

  afterInstall() {
    return this.addPackageToProject('sortablejs', '^1.10.x')
  }
};

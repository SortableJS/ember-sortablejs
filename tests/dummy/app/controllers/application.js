import Controller from '@ember/controller';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  inHomeRoute: equal('router.currentRouteName', 'index'),
});

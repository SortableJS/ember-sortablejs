import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('simple');
  this.route('shared');
  this.route('clone');
  this.route('disable');
  this.route('handle');
});

export default Router;

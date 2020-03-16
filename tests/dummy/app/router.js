import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('simple');
  this.route('shared');
  this.route('clone');
  this.route('disable');
  this.route('handle');
  this.route('filter');
  this.route('thresholds');
  this.route('cancelable');
});

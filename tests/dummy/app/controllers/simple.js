import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onChoose(evt) {
      console.log('*** Action *** - onChoose');
    },
    onUnchoose(evt) {
      console.log('*** Action *** - onUnchoose');
    },
    onStart(evt) {
      console.log('*** Action *** - onStart');
    },
    onEnd(evt) {
      console.log('*** Action *** - onEnd');
    },
    onMove(evt) {
      console.log('*** Action *** - onMove');
    },
    onUpdate(evt) {
      console.log('*** Action *** - onUpdate');
    },
    onAdd(evt) {
      console.log('*** Action *** - onAdd');
    },
    onRemove(evt) {
      console.log('*** Action *** - onAdd');
    },
    onClone(evt) {
      //_onDragStart
      console.log('*** Action *** - onClone');
    },
    onChange(evt) {
      console.log('*** Action *** - onChange');
    },
    // trigger(actionName, evt) {
      // console.log('*** Action ***', actionName, evt);

    //   if (actionName === 'onChoose') {
    //     this.set('actionStack', []);
    //   }

    //   this.get('actionStack').pushObject(actionName);
    // }
    // }
  }
});

ember-sortablejs
==============================================================================
[![Build Status](https://travis-ci.org/SortableJS/ember-sortablejs.svg?branch=master)](https://travis-ci.org/SortableJS/ember-sortablejs)
[![Ember Observer Score](https://emberobserver.com/badges/ember-sortablejs.svg)](https://emberobserver.com/addons/ember-sortablejs)

This addon allows you to use drag and drop in your ember application using [SortableJS/Sortable](https://github.com/SortableJS/Sortable)


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.13 or above
* Ember CLI v3.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-sortablejs
```


Usage
------------------------------------------------------------------------------

```html
<SortableJs
  @options={{hash animation=150 ghostClass="ghost-class" group="shared-list"}}
  @onChoose={{fn this.onChoose}}
  @onUnchoose={{fn this.onUnchoose}}
  @onStart={{fn this.onStart}}
  @onEnd={{fn this.onEnd}}
  @onAdd={{fn this.onAdd}}
  @onUpdate={{fn this.onUpdate}}
  @onRemove={{fn this.onRemove}}
  @onMove={{fn this.onMove}}
  @onClone={{fn this.onClone}}
  @onChange={{fn this.onChange}}
  as |sortable|
>
  <div class="list-group-item bg-yellow">Item 1</div>
  <div class="list-group-item bg-yellow">Item 2</div>
  <div class="list-group-item bg-yellow">Item 3</div>
  <div class="list-group-item bg-yellow">Item 4</div>
  <div class="list-group-item bg-yellow">Item 5</div>
</SortableJs>
```

Options
------------------------------------------------------------------------------
The addon supports all the options that sortable accepts, see: https://github.com/SortableJS/Sortable#options

The events:
- `onChoose`
- `onUnchoose`
- `onStart`
- `onEnd`
- `onAdd`
- `onUpdate`
- `onSort`
- `onRemove`
- `onMove`
- `onClone`
- `onChange`
- `scrollFn`
- `setData`
- `onFilter`

Should be in the component signature as closure actions.
All actions get the events as described in the SortableJS docs as well as the sortable instance.
```js
  onChoose(evt, sortable) {...}
```
Migrating from 1.x
------------------------------------------------------------------------------
- `onSetData` is no longer suported. Rename argument to `setData`.
- `<SortableJs>` no longer expects a wrapped list. Instead the addon itself will act as the sortable list container.

v1
```html
<SortableJs
  @options={{hash animation=150 ghostClass="ghost-class" group="shared-list"}}
>
  <ul class="list-group">
    <li class="list-group-item">Item 1</li>
    <li class="list-group-item">Item 2</li>
    <li class="list-group-item">Item 3</li>
    <li class="list-group-item">Item 4</li>
    <li class="list-group-item">Item 5</li>
  </ul>
</SortableJs>
```

v2
```html
<SortableJs
  class="list-group"
  @options={{hash animation=150 ghostClass="ghost-class" group="shared-list"}}
>
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
</SortableJs>
```
License
------------------------------------------------------------------------------

This project is licensed under the [GPL-3.0 License](LICENSE.md).

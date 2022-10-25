ember-sortablejs
==============================================================================
[![Build Status](https://travis-ci.org/SortableJS/ember-sortablejs.svg?branch=master)](https://travis-ci.org/SortableJS/ember-sortablejs)
[![Ember Observer Score](https://emberobserver.com/badges/ember-sortablejs.svg)](https://emberobserver.com/addons/ember-sortablejs)

This addon allows you to use drag and drop in your ember application using [SortableJS/Sortable](https://github.com/SortableJS/Sortable)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.13 or above
* Ember CLI v3.13 or above
* Node.js v10 or above

Installation
------------------------------------------------------------------------------
> **NOTE**: The beta version is out. Please give me a hand and test it out.
```
ember install ember-sortablejs@beta
```

This addon has a peer dependency on `sortablejs` that will be installed with the addon

Still to do
------------------------------------------------------------------------------
Refer to the upcoming [project](https://github.com/SortableJS/ember-sortablejs/projects/2)

Library support
------------------------------------------------------------------------------
Currently supported:
- [x] Drag from one list to another
- [x] Sort
- [ ] Clone
- [ ] Swap
- [ ] Multi Drag
- [ ] Nested List

Usage
------------------------------------------------------------------------------

```hbs
{{!-- this.list = [{ name: 'item one' }, { name: 'item two' },..]  --}}
<SortableJs
  @items={{this.list}}
  @options={{hash animation=150 ghostClass="ghost-class" group="shared-list"}}
  @onStart={{this.onStart}}
  @onEnd={{this.onEnd}}
  as |list|
>
  {{#each list as |item|}}
    <div class="list-group-item bg-yellow">{{item.value.name}}</div>
  {{/each}}
</SortableJs>
```

How it works
------------------------------------------------------------------------------
SortableJs works by manipulating the DOM directly this is NOT compatible with
the Glimmer VM. To mitigate this we need tu use SortableJs as a middle man and use
the events it emits to update state and prevent the DOM manipulation the library does.

This is accomplished by maintaining an internal list. This list is a copy of the
array supplied via `@items`. The events `onStart`, `onEnd`, `onUpdate`, `onAdd`,
`onRemove` are intercepted to prevent DOM manipulation and maintaining the internal
list.

You HAVE to provide an object. As the addon uses a WeakMap to cache the items supplied.
When SortableJs emits we update the list and the cache to make changes that will update
the DOM. The addon will ***yield*** an array of objects. Each object contains the key `value`,
which is the original object supplied via `@items`.

I you have ideas on how to approach this better. Please open an issue 😄

Caveats
------------------------------------------------------------------------------
- Not all SortableJS plugins work... yet.
- While you could bypass `@items` I highly discourage since the library manipulates the DOM directly.

Options
------------------------------------------------------------------------------
The addon supports all the options that sortable accepts, see: https://github.com/SortableJS/Sortable#options

Component API
------------------------------------------------------------------------------
|arg|type|description|
|:---|:---:|:---|
| `@items`      | Array<Object> | A list of objecs to be managed by the addon |
| `@options`    | Object        | A hash options supported by SortableJs|
| `@tag`        | String        | The element to be used to render the list (default: "div")|
| `@onChoose`   | Function      | (SortablejsEvent) => {...} |
| `@onUnchoose` | Function      | (SortablejsEvent) => {...} |
| `@onStart`    | Function      | (SortablejsEvent) => {...} |
| `@onEnd`      | Function      | (SortablejsEvent, cancelDnD) => {...} |
| `@onAdd`      | Function      | (SortablejsEvent) => {...} |
| `@onUpdate`   | Function      | (SortablejsEvent) => {...} |
| `@onSort`     | Function      | (SortablejsEvent) => {...} |
| `@onRemove`   | Function      | (SortablejsEvent) => {...} |
| `@onMove`     | Function      | (SortablejsMoveEvent) => {...} |
| `@onClone`    | Function      | (SortablejsEvent) => {...} |
| `@onChange`   | Function      | (SortablejsEvent) => {...} |
| `@scrollFn`   | Function      | (SortablejsEvent) => {...} |
| `@setData`    | Function      | (SortablejsEvent) => {...} |
| `@onFilter`   | Function      | (SortablejsEvent) => {...} |
| `@onSpill`    | Function      | (SortablejsEvent) => {...} |

`SortablejsEvent` - A [`CustomEvent`](https://github.com/SortableJS/Sortable#event-object-demo) provided by SortableJS

`SortablejsMoveEvent` - A [`CustomEvent`](https://github.com/SortableJS/Sortable#move-event-object) provided by SortableJS

`cancelDnD` - A callback provided by the ember addon to basically undo you last drag and drop or sort;

`{{yield}}` - An array of objects with the key `value` where its value is the object supplied. `{ value: <Object> }`

Migrating from 1.x
------------------------------------------------------------------------------
- `onSetData` is no longer suported. Rename argument to `setData`.
- `<SortableJs>` no longer expects a wrapped list. Instead the addon itself will act as the sortable list container.

v1
```hbs
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
```hbs
{{!-- this.list = [{ name: 'item one' }, { name: 'item two' },..]  --}}
<SortableJs
  class="list-group"
  @items={{this.list}}
  @options={{hash animation=150 ghostClass="ghost-class" group="shared-list"}}
  as |list|
>
  {{#each list as |item|}}
    <div class="list-group-item">{{item.value.name}}</div>
  {{/each}}
</SortableJs>
```
License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

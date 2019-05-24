ember-sortablejs
==============================================================================

This addon allows you to use drag and drop in your ember application using [SortableJS/Sortable](https://github.com/SortableJS/Sortable)


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


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
  @onChoose={{action "trigger" "onChoose"}}
  @onUnchoose={{action "trigger" "onUnchoose"}}
  @onStart={{action "trigger" "onStart"}}
  @onEnd={{action "trigger" "onEnd"}}
  @onAdd={{action "trigger" "onAdd"}}
  @onUpdate={{action "trigger" "onUpdate"}}
  @onRemove={{action "trigger" "onRemove"}}
  @onMove={{action "trigger" "onMove"}}
  @onClone={{action "trigger" "onClone"}}
  @onChange={{action "trigger" "onChange"}}
>
  <ul class="list-group">
    <li class="list-group-item bg-yellow">Item 1</li>
    <li class="list-group-item bg-yellow">Item 2</li>
    <li class="list-group-item bg-yellow">Item 3</li>
    <li class="list-group-item bg-yellow">Item 4</li>
    <li class="list-group-item bg-yellow">Item 5</li>
  </ul>
</SortableJs>
```

Options
------------------------------------------------------------------------------
The addon supports all the options that sortable accepts, see: https://github.com/SortableJS/Sortable#options

Options are passed using the `{{hash}}` helper.

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
- `onSetData`
- `setData`
- `onFilter`

Should be in the component signature as closure actions.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

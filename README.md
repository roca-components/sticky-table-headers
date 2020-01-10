Sticky Table Headers
====================

[![Build Status](https://travis-ci.org/roca-components/sticky-table-headers.svg?branch=master)](https://travis-ci.org/roca-components/sticky-table-headers)
[![npm version](https://badge.fury.io/js/roca-sticky-table-headers.svg)](https://www.npmjs.com/package/roca-sticky-table-headers)

A [ROCA](http://roca-style.org) component that makes horizontal and/or vertical
table headers sticky.

Based on [ES6 seed](https://github.com/FND/es6-seed).

Usage
-----

Run `npm install roca-sticky-table-headers -save`.

This will install everything under `node_modules/roca-sticky-table-headers`.

This contains the following files and directories:

```
├── dist                       # Compiled files
│   ├── base.css               # CSS base functionality
│   ├── bootstrap-4.css        # Bootstrap 4 theme
│   ├── bundle.js              # ES5 Custom Element `sticky-headers`
│   └── examples               # HTML Examples
└── src
    ├── scripts                # ES6 source files
    └── styles                 # SASS source files
```

Include scripts and styles and use the following HTML structure:

```html
<sticky-headers>
 <table>
  <tr>
   <!-- First row sticky -->
   <th class="sticky-row-header sticky-col-header">Upper Left</th>
   <th class="sticky-row-header">Column Header</th>
   ...
  </tr>
  <tr>
   <!-- First column sticky -->
   <th class="sticky-col-header"></th>
   <td>...</td>
   ...
  <th>
 </table>
</sticky-headers>
```

It is possible to use multiple fixed rows or cols.

### Responsive stickiness

Use `<sticky-headers min-viewport-width="200px">` to disable column fixation for smaller screens or
`<sticky-headers min-container-width="200px">` to disable it based upon the container's width.

Development
-----------

* ensure [Node](http://nodejs.org) is installed
* `npm install` downloads dependencies
* `npm run compile` performs a one-time compilation, generating files in `dist`
* `npm start` automatically recompiles while monitoring code changes
* `npm test` checks code for stylistic consistency and runs the test suite

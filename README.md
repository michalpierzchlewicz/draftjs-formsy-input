# draftjs-formsy-input

This React component is to be used as a [draft.js](https://github.com/facebook/draft-js) input type for [formsy-react](https://github.com/christianalfoni/formsy-react). It is possible to use with [draft-js-plugins](https://github.com/draft-js-plugins/draft-js-plugins).


## Demo & Examples

Live demo: [michalpierzchlewicz.github.io/draftjs-formsy-input](http://michalpierzchlewicz.github.io/draftjs-formsy-input/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use draftjs-formsy-input is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/draftjs-formsy-input.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install draftjs-formsy-input --save
```


## Usage

To get started with using it, import **DraftjsFormsyInput** and insert it inside a forsmy-rest **Form** component.

```
// pre ES6
var DraftjsFormsyInput = require('draftjs-formsy-input');
// ES6
import DraftjsFormsyInput from 'draftjs-formsy-input';

<DraftjsFormsyInput
    name="draftjsFormsyInput "
/> 
```

### Properties

* **name** _string_ [required] – inherited from Formsy input
* **label** _string_ – input label
* **help** _string_ – help info displayed below input
* **required** _boolean_ [default: false] – if input is required (used by a forsmy-rest **Form**)
* **style** _object_ – styling the input (more information below)
* **outputValueMode** _string_ [default: ‘html’] – ‘html’ or ‘raw’ output value format
* **value** _string_ – default value of the input (IMPORTANT: use with **outputValueMode** prop correctly)
* **plugins** _array_ – use the same as **plugin** prop in [draft-js-plugins ](https://github.com/draft-js-plugins/draft-js-plugins) **Editor** 

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) Copyright (c) 2017 Michał Pierzchlewicz.

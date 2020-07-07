### umd version
- universal/es2015 module with: AMD, Node, or browser global
- compressed and stripped of comments


### after each transpite add:

- remove `'util', 'util', 'util', 'util'` from define, since we dont use ams for node so it wont matter
```js
/* tslint:disable */
/* eslint-disable */
/* eslint-disable no-proto */

/**
 * @xtils
 * * Simple javascript, lodash alternative library
 * * Developed by Anon
 * * license: CC-BY-SA-4.0
 */

  try {
    if (window) global = global || self || window  // eslint-disable-line no-undef
  } catch (err) {
      // 
  }

```
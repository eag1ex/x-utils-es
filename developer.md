### developer notes
- (patched) we use babel to transpile to umd version, with browser supported js, the plugin `transform-es2015-modules-umd` works well but is missing the assignment `global = global || self || window` so we need to add it ourselfs after every `npm run build:umd` so that window/browser can support it!
```
(function(global,factory){
  
  try {
    if (window) global = global || self || window  // eslint-disable-line no-undef
  } catch (err) {
      // 
  }

```



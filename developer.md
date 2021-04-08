### developer notes
- (patched) we use babel to transpile to umd version, with browser supported js, the plugin `transform-es2015-modules-umd` works well but is missing the assignment `global = global || self || window` so we need to add it ourselfs after every `npm run build:umd` so that window/browser can support it!
```
 "devDependencies": {
    "@babel/cli": "^7.10.5",
    "@babel/core": "^7.11.4",
    "@babel/plugin-external-helpers": "^7.10.4",
    "@babel/plugin-proposal-decorators": "^7.10.5",
    "@babel/plugin-transform-modules-commonjs": "^7.10.4",
    "@babel/plugin-transform-runtime": "^7.11.0",
    "@babel/preset-env": "^7.11.0",
    "@babel/preset-react": "^7.10.4",
    "babel-eslint": "^10.1.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    "babel-plugin-transform-es2015-modules-umd": "^6.24.1",
    "babel-preset-minify": "^0.5.1",
    "eslint": "^7.7.0",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-standard": "^4.0.1",
    "esm": "^3.2.25",
    "@babel/plugin-proposal-class-properties": "^7.1.0",

  }

```
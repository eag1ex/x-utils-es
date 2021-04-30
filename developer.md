### developer notes
- (patched) we use babel to transpile to umd version, with browser supported js, the plugin `transform-es2015-modules-umd` works well but is missing the assignment `global = global || self || window` so we need to add it ourselfs after every `npm run build:umd` so that window/browser can support it!

```sh
   "devDependencies": {
    "@babel/cli": "^7.13.16",
    "@babel/core": "^7.13.16",
    "@babel/plugin-external-helpers": "^7.12.13",
    "@babel/plugin-proposal-class-properties": "^7.13.0",
    "@babel/plugin-proposal-decorators": "^7.13.15",
    "@babel/plugin-transform-modules-commonjs": "^7.13.8",
    "@babel/plugin-transform-runtime": "^7.13.15",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.13.15",
    "@babel/preset-react": "^7.13.13",
    "@babel/register": "^7.13.16",
    "@jest/globals": "^26.6.2",
    "@types/jest": "^26.0.22",
    "babel-eslint": "^10.1.0",
    "babel-jest": "^26.6.3",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    "babel-plugin-transform-es2015-modules-umd": "^6.24.1",
    "babel-preset-minify": "^0.5.1",
    "eslint": "^7.25.0",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-standard": "^5.0.0",
    "esm": "^3.2.25",
    "jest": "^26.6.3",
    "jest-cli": "^26.6.3",
    "minami": "^1.2.3",
    "q": "^1.5.1",
    "istanbul-badges-readme": "^1.2.1"
  }
```

```sh
# all devDependencies
npm i @babel/cli @babel/core @babel/plugin-external-helpers @babel/plugin-proposal-decorators @babel/plugin-transform-modules-commonjs @babel/plugin-transform-runtime @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react babel-eslint babel-plugin-transform-es2015-modules-commonjs babel-plugin-transform-es2015-modules-umd babel-preset-minify eslint eslint-plugin-node eslint-plugin-standard esm @babel/plugin-proposal-class-properties minami --save-dev
```

```sh
# jest dependant plugins
npm i jest jest-cli @types/jest @jest/globals @babel/preset-env @babel/polyfill @babel/register babel-jest assert
```
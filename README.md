# eslint-formatter-skip

`eslint-formatter-skip` is library that adds skip comments for each file that cannot be automatically corrected by eslint.
This is useful when you get a lot of errors after changing the rules, updating versions, add plugins.

## Install

```shell
yarn add -D eslint-formatter-skip
# or
# npm i -save-dev eslint-formatter-skip
```

## Usage

Please note that it will be overwritten.

```shell
yarn eslint -f skip src
```


## Example 
Example code.

```js
// ./testdata/index.js
var x; // error: unused-vars

var b = "b";
var ab = "a" + b; // error: prefer-template
console.log(ab);
```

eslint rules.

```js
// ./testdata/.eslintrc.js
module.exports = {
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {
    "no-unused-vars": ["error"],
    "prefer-template": ["error"],
  },
};

```

With autofix. `yarn eslint -f skip --fix ./testdata`

```js
/* eslint-disable no-unused-vars */
var x; // error: unused-vars

var b = "b";
var ab = `a${  b}`; // error: prefer-template
console.log(ab);
```

Without autofix. `yarn eslint -f skip ./testdata`

```js
/* eslint-disable no-unused-vars, prefer-template */
var x; // error: unused-vars

var b = "b";
var ab = "a" + b; // error: prefer-template
console.log(ab);
```

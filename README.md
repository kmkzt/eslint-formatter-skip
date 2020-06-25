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

```shell
yarn eslint -f skip src
```


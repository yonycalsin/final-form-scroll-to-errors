# Final Form Scroll To Errors

Decorator for 🏁 Final Form that will attempt to apply focus to the first field with an error upon an attempted form submission.

[![CI](https://github.com/yonycalsin/final-form-scroll-to-errors/actions/workflows/main.yml/badge.svg)](https://github.com/yonycalsin/final-form-scroll-to-errors/actions/workflows/main.yml)
<a href="https://github.com/yonycalsin/final-form-scroll-to-errors"><img src="https://img.shields.io/spiget/stars/1000?color=brightgreen&label=Star&logo=github" /></a>
<a href="https://www.npmjs.com/final-form-scroll-to-errors" target="_blank">
<img src="https://img.shields.io/npm/v/final-form-scroll-to-errors" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/final-form-scroll-to-errors" target="_blank">
<img src="https://img.shields.io/npm/l/final-form-scroll-to-errors" alt="Package License" /></a>
<a href="https://www.npmjs.com/final-form-scroll-to-errors" target="_blank">
<img src="https://img.shields.io/npm/dm/final-form-scroll-to-errors" alt="NPM Downloads" /></a>
<a href="https://github.com/yonycalsin/final-form-scroll-to-errors"><img src="https://img.shields.io/badge/Github%20Page-final.form.scroll.to.errors-yellow?style=flat-square&logo=github" /></a>
<a href="https://github.com/yonycalsin"><img src="https://img.shields.io/badge/Author-Yony%20Calsin-blueviolet?style=flat-square&logo=appveyor" /></a>
<a href="https://twitter.com/yonycalsin" target="_blank">
<img src="https://img.shields.io/twitter/follow/yonycalsin.svg?style=social&label=Follow"></a>

## Installation

> First we will have to install, in order to use this wonderful package.

```bash
# Using npm
npm install --save final-form-scroll-to-errors@latest

# Using yarn
yarn add final-form-scroll-to-errors@latest
```

## Usage

final-form-scroll-to-errors uses the scroll-into-view-if-needed package, so we invite you to check the documentation https://github.com/stipsan/scroll-into-view-if-needed

```ts
import * as React from 'react'
import { Form, Field } from 'react-final-form'
import createDecorator from 'final-form-scroll-to-errors'

const scrollOnErrors = createDecorator()
...
<Form
  onSubmit={submit}
  decorators={[ scrollOnErrors ]}
  validate={validate}
  render={({ handleSubmit }) =>
    <form onSubmit={handleSubmit}>

      ... inputs here ...

    </form>
  }
/>
```

## Stay in touch

- Github [@yonycalsin](https://github.com/yonycalsin)
- Twitter [@yonycalsin](https://twitter.com/yonycalsin)

## Contributors

Thanks to the wonderful people who collaborate with me !

## License

`final-form-scroll-to-errors` under [License MIT.](LICENSE)

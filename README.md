# vue3-form-generator [![NPM version](https://img.shields.io/npm/v/vue-form-generator.svg)](https://www.npmjs.com/package/vue-form-generator) ![VueJS v2.x compatible](https://img.shields.io/badge/vue%203.x-compatible-green.svg)

A schema-based form generator component for Vue3.js. Original repo: https://github.com/vue-generators/vue-form-generator

[![Build Status](https://travis-ci.org/vue-generators/vue-form-generator.svg?branch=master)](https://travis-ci.org/vue-generators/vue-form-generator)
[![Coverage Status](https://coveralls.io/repos/github/vue-generators/vue-form-generator/badge.svg?branch=master)](https://coveralls.io/github/vue-generators/vue-form-generator?branch=master)
[![NPMS.io score](https://badges.npms.io/vue-form-generator.svg)]()
[![Package Quality](http://npm.packagequality.com/shield/vue-form-generator.svg)](http://packagequality.com/#?package=vue-form-generator)
[![Downloads](https://img.shields.io/npm/dm/vue3-form-generator.svg)](https://www.npmjs.com/package/vue3-form-generator)

## Demo

[![Screenshot](https://github.com/vue-generators/vue-form-generator-docs/raw/master/assets/vfg-example1.png)](https://jsfiddle.net/zoul0813/d8excp36/)

## Features
* Supports VUE3 
* reactive forms based on schemas
* multiple object editing
* 21 field types
* built-in validators
* core & full bundles (41kb and 50kb gzipped)
* Bootstrap friendly templates
* customizable styles
* can be extended easily with custom fields
* ...etc

## Documentation

[Online documentation on Gitbook](https://vue-generators.gitbook.io/vue-generators/)

## Dependencies

vue-form-generator uses [fecha](https://github.com/taylorhakes/fecha) and [lodash](https://lodash.com/) internally.

While built-in fields don't need external dependencies, optional fields may need other libraries.
These dependencies fall into two camps: jQuery or Vanilla. You can find almost the same functionality in both flavors.
In the end, it's your choice to depend on jQuery or not.

You can find details about dependencies in the official [documentation](https://vue-generators.gitbook.io/vue-generators/) under each specific component.

## Installation

### NPM

You can install it via [NPM](http://npmjs.org/).

#### Latest version for Vue 3.x

```
$ npm install vue3-form-generator
```

## Usage

```html

<template>
    <div class="panel-body">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </div>
</template>

<script>
    import VueFormGenerator from 'vue3-form-generator'
    import 'vue3-form-generator/dist/vfg.css'

    export default {
        data() {
            return {
                model: {
                    id: 1,
                    name: 'John Doe',
                    password: 'J0hnD03!x4',
                    skills: ['Javascript', 'VueJS'],
                    email: 'john.doe@gmail.com',
                    status: true
                },
                schema: {
                    fields: [
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'ID (disabled text field)',
                            model: 'id',
                            readonly: true,
                            disabled: true
                        },
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Name',
                            model: 'name',
                            placeholder: 'Your name',
                            featured: true,
                            required: true
                        },
                        {
                            type: 'input',
                            inputType: 'password',
                            label: 'Password',
                            model: 'password',
                            min: 6,
                            required: true,
                            hint: 'Minimum 6 characters',
                            validator: VueFormGenerator.validators.string
                        },
                        {
                            type: 'select',
                            label: 'Skills',
                            model: 'skills',
                            values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
                        },
                        {
                            type: 'input',
                            inputType: 'email',
                            label: 'E-mail',
                            model: 'email',
                            placeholder: 'User\'s e-mail address'
                        },
                        {
                            type: 'checkbox',
                            label: 'Status',
                            model: 'status',
                            default: true
                        }
                    ]
                },
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        }
    }
</script>
```

## Development

This command will start a `webpack-dev-server` with content of `dev` folder.

```bash
npm run dev
```

## Build

This command will build a distributable version in the `dist` directory.

```bash
npm run build
```

## Test

```bash
npm test
```

or

```bash
npm run ci
```

## More fields _new_

VueFormGenerator supports custom fields. If you decide to release your custom field into the wild, please open a new issue so we can add you to a list here! Please try to use this naming convention for your custom field : vfg-field-\* Example :

*   `vfg-field-myfield`
*   `vfg-field-calendar`
*   `vfg-field-awesome-dropdown`

This way, it will be easier for everyone to find it. Thank you !

### Public Custom Fields

* [vue-tel-input](https://github.com/EducationLink/vue-tel-input) - International Telephone Input Boilerplate with Vue (integrated with VueFormGenerator).
* [vfg-field-sourcecode](https://github.com/gwenaelp/vfg-field-sourcecode) - A source code field for vue-form-generator
* [vfg-field-array](https://github.com/gwenaelp/vfg-field-array) - A vue-form-generator field to handle arrays of items of any type.
* [vfg-field-object](https://github.com/gwenaelp/vfg-field-object) - A vue-form-generator field to handle objects, with or without schemas.
* [vfg-field-matrix](https://github.com/shwld/vfg-field-matrix) - A matrix field for vue-form-generator.

## Contribution

Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

## License
vue-form-generator is available under the [MIT license](https://tldrlegal.com/license/mit-license).

vue3-form-generator is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (C) 2017 Icebob

[![@icebob](https://img.shields.io/badge/github-icebob-green.svg)](https://github.com/icebob) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi) Vue2 

[![@nick7dam](https://img.shields.io/badge/github-nick7dam-green.svg)](https://gitlab.com/nick7dam) Vue 3

# diff-state

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm version](https://badge.fury.io/js/diff-state.svg)](https://badge.fury.io/js/diff-state)
[![Build Status](https://travis-ci.org/jonestristand/diff-state.svg?branch=master)](https://travis-ci.org/jonestristand/diff-state)

> This is a simple module to diff two state objects that are assumed to contain the same keys. Keys whose value has changed will be returned with their new value.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Testing](#testing)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install -s diff-state
```

## Usage

```
const diffState = require('diff-state');

var oldState = {
  a: 'test',
  b: 23,
  c: {
    d: true,
    e: '123'
  }
}

var newState = {
  a: 'no',
  b: 23,
  c: {
    d: false,
    e: '123'
  }
}

var patch = diffState(newState, oldState);

/*
patch = {
  a: 'no',
  c: {
    d: true
  }
}
*/
```

## Testing

```
npm test
```

## Maintainers

[@jonestristand](https://github.com/jonestristand)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2017 Tristan Jones

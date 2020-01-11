# Mineral Utils

A Utils package for the Mineral Framework

[![Build Status](https://travis-ci.org/mineral-framework/ts-utils.svg?branch=master)](https://travis-ci.org/mineral-framework/ts-utils) [![Coverage Status](https://coveralls.io/repos/github/mineral-framework/ts-utils/badge.svg?branch=master)](https://coveralls.io/github/mineral-framework/ts-utils?branch=master) ![GitHub package.json version](https://img.shields.io/github/package-json/v/mineral-framework/ts-utils?logo=npm)

## Table of contents
* [Classes](#classes)
  * [Optional](#optional)

## Classes

### Optional
Java-like Optional class.

``` js
import { Optional } from '@mineral/utils'

interface Message {
    message: string
}

const optMessage = Optional.of<Message>({
    message: string
})

const message: Message = optMessage.get()
```

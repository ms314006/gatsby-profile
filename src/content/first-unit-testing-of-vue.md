---
layout: post
title: Vue | My first unit testing of Vue.js with Jest and @testing-library
image: img/vue-jest.jpg
author: GQSM
date: 2020-02-14T23:39:26.149Z
draft: false
tags: 
  - Jest
  - Vue
  - w3HexSchool
---

Hello! My name is Clark! On this post, we're gonna write test case for component of [Vue.js](https://vuejs.org/) with [Jest](https://jestjs.io/en/) and [@testing-library](https://testing-library.com/), let's we starts 😃!

## Create Vue project

First of all, Even though I am sharing about test case of Vue.js on this post, but actually I more familiar [ReactJS](https://reactjs.org/) than Vue.js, so I'll use [Vue-CLI](https://cli.vuejs.org/) Create my first Vue project fast.

### Install Vue-CLI

```
npm install -g @vue/cli
```

### Create project

```
vue create hello-world
```

When after input `vue create hello-world`, The CLI tool would ask you if need other library:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/9xnvtuhq7ihw364880ts.png)

But we don't need, so pick default, let it start create project. When after creating, you can checks current path if emerge the project:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/0rpbruu2uxk14vg0uum9.png)

Or at the path of project, execute cmd on terminal to open local server:

```
npm run serve
```

Open browser and input url `http://localhost:8080/`:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/j3iw7bqjp6kblhbnbnq6.png)

Okay, now we were has a project let we start unit testing!

## Install library about unit testing

I choices [Jest](https://jestjs.io/en/) and [@testing-library](https://testing-library.com/) to test Vue.js.

But why not pick [@vue/test-utils](https://vue-test-utils.vuejs.org/)? According to [introduction of @testing-library](https://testing-library.com/docs/intro):

>The core library has been wrapped to provide ergonomic APIs for several frameworks, including React, Angular, and Vue. There is also a plugin to use testing-library queries for end-to-end tests in Cypress and an implementation for React Native.

So [@testing-library](https://testing-library.com/) build a library for component of test or manipulation, whatever the component is from  to Vue.JS or ReactJS or Angular!

As Far as I'm concerned, this is a very convenient to let me write unit testing between ReactJS and Vue.js.

First of all on this stage, we must install above core library for unit testing:

```
npm install jest @testing-library/vue --save-dev
```

Next, we can create a `__tests__` folder in project root path, and create a `HelloWorld.test.js` in that, then just try to write first case of unit testing.

For example, our target of test component is `HelloWorld.vue`, then this content is:

./src/component/HelloWorld.vue
```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    /* The some tag be omitted... */

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

Okay, when I use this component, I hope to if I give it the props `msg`, it will be render this text, then this text will be display by `h1`, so I add `attribute` `test-dataid` for `h1`:

```html
<h1 data-testid="title">{{ msg }}</h1>
```

When testing we can find it by queries of @testing-library provide, so the case of unit testing can write:

./__tests__/HelloWorld.test.js
```javascript
// import library of unit testing library
import { render } from '@testing-library/vue';
import HelloWorld from '../src/components/HelloWorld.vue';

// The case of unit testing for check render msg
test('Check if render props msg text in HelloWorld', async () => {
  const { getByTestId, } = render(HelloWorld,{
    props: { msg: 'Hello, My name is Clark!', },
  })

  const title = getByTestId('title');

  expect(title.innerHTML).toBe('Hello, My name is Clark!');
})
```

On Vue.js, `render` of @testing-library can have two parameters, first is component also our target of test, the second is content of props with use component, and `render` would be return all kinds of queries(ex. ByLabelText, ByText...[in detail](https://testing-library.com/docs/dom-testing-library/api-queries)), the above `getByTestId` also contain this queries, it can queries `data-testid`.

When we find `h1` tag, then can use `innerHTML` to check if this text same of msg of props.

So far, we have to make some preparations before test, install about compiler library of Vue.js for NodeJS execute test and config of jest:

```
npm i babel-jest jest-vue vue-jest --save-dev
```

Open the package.json and add the new scripts and config of jest:

./package.json
```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint",
  "test": "jest" // Add this script for test
},
"jest": {
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "transform": {
    "^.+\\.js$": "babel-jest",
    ".*\\.vue$": "<rootDir>/node_modules/vue-jest"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
},
```

At last, execute unit testing by npm scripts:

```
npm run test
```

Result...

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/x2uvwqdhfgldsbcoctki.png)

...Oh my god! have a error happened! what's wrong with it? Umm...don't worry! it fine! I was find out this issue:

[Unknown option: base.configFile error when running tests](https://github.com/facebook/create-react-app/issues/5259)

According to it, solution is:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/qkb4qc037ihhphvbq4kl.png)

So I just do that, and run test when I does:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/c408bwt6r7hhid3gao6c.png)

It works, and test is PASS! ✨

Thanks guys for reading this post, if you have any question or find out ant wrong in the post, please submit discussion for me! 😃
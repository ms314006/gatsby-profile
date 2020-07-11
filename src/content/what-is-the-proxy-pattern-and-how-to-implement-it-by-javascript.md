---
layout: post
title: What is the proxy pattern? And how to implement it by JavaScript?
image: img/what-is-the-proxy-pattern-and-how-to-implement-it-by-javascript.jpg
author: GQSM
date: 2020-07-12T00:32:59.149Z
draft: false
tags: 
  - JavaScript
  - Design pattern
  - w3HexSchool
---

Originally post on my blog:

Hello, guys! I am Clark. In this post, we are going to learn about proxy pattern. In JavaScript proxy pattern is not as same as others pattern, because JavaScript provided a [new syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), that can enable you create to a proxy object easily. So I think implement proxy pattern is not difficult question in JavaScript.

Even the way using proxy is easy, I still want to explain why we need to use proxy pattern. I think that is a little bit difficult for me, but I will try my best. And My English is not good, so I hope you will not mind it. If you can correct anything of my post, I will appreciate for ever comment.

# Introduction

Proxy pattern use when if you want to access a property of object, but also want to add some logic when you access the property. We follow Open-Closed Principle so we wouldn't add others logic in original Object, and avoid some chance you modify or add something in object will broken original logic in future.

# How to use proxy pattern?

## Basic usage

In JavaScript create a basic proxy object is really easy. Just like snippet below:

```javascript
// original object
const person = {
  firstName: 'Lena',
  lastName: 'Smith',
};

// use proxy add logic on person
const personProxy = new Proxy(person, {
  get: (target, prop) => {
    if(prop === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return target[prop];
  },
});

// throw the proxy object, we can get full name
personProxy.fullName; // "Lena Smith"
```

In the example above , we see `get` when we create a proxy object. If we want to access something from proxy object, like as `personProxy.fullName` then it will into the `get` method to decide what is the proxy object should return.

And `get` would have two parameters. The first is `target`, it is original object, so in the `get` method we can access original object through access `target`. The second is `prop`, it is the property name we want to access.

So according to example above, we can know how to create a basic proxy object and use it. Besides we also can use the proxy object access non-existent properties(like as `fullName`).

## Implement private properties in object

Next the proxy pattern also can make some logic to implement private property in object. In the others program languages we add '_' at forward of properties name, like as:

```javascript
const person = {
  firstName: 'Lena',
  lastName: 'Smith',
  _age: 26, // Yes, the age is secret, right? :)
};
```

But in the JavaScript, even if we add the `_` at forward of properties name, we still can access it:

```javascript
person._age; // 26
```

The result above is not we want, so in the this situation we can use proxy pattern handle it.

```javascript
const personProxy = new Proxy(person, {
  get: (target, prop) => {
    if(prop[0] === '_') {
      return undefined;
    }
    return target[prop];
  },
});

personProxy._age; // undefined
```

The example above. We check properties name you want to access in the `get` method, if first letter is '_' then return undefined or if you want to throw a error.

# If you want to check something when modify object properties

We have completed inaccessible private properties by proxy pattern, but we still can modify it:

```
personProxy._age = 25;
```

And the private properties have been modified. I think we must solve this problem. So besides `get` method, we can use `set` method when we want to set properties, Like as:

```javascript
const personProxy = new Proxy(person, {
  get: (target, prop) => {
    if(prop[0] === '_') {
      return undefined;
    }
    return target[prop];
  },
  set: (target, prop, value) => {
    if(prop[0] === '_') {
      throw Error(`Hey, don't set private properties!`);
    }
    target[prop] = value;
  },
});
```

We can notice `set` method have three parameters. The first and the second is as same as `get`. The third is a value you want to set for properties. So the example above we check the properties name, if it isn't private properties then set for object properties you want to set value. But if it is private, the proxy will throw a error, like as:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/o5iywwb11d8owr1yi54z.jpg)

I showed the some useful examples you can consider using proxy pattern. And the following is another suitable situation you also can use proxy pattern:

- Verify some value when you set for properties.

If you have any idea or you are implementing proxy pattern in some situation, please comment below we can more discussion, I am super thanks!

# Final words

Proxy pattern is very interesting pattern because it can let you access exist or non-existent property, even not allow you access(I think that is the most different between decorator and proxy pattern, if you confuse both before, some opinion I will share in next post).

But in this post, I just Introduce a basic usage of proxy pattern. If you want to learn more approach for use proxy pattern, I recommend read [MDN document](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Proxy), I think that is clear enough.

Thanks for you guys read, any comments and feedback are super welcome!

# Thanks

<span>Photo by <a href="https://unsplash.com/@austindistel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Austin Distel</a> on <a href="https://unsplash.com/s/photos/agent?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
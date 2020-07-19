---
layout: post
title: In my opinion, what is the difference between decorator and proxy pattern?
image: img/what-is-the-decorator-pattern-and-how-to-implement-it-by-javascript.jpg
author: GQSM
date: 2020-07-19T10:25:59.149Z
draft: false
tags: 
  - JavaScript
  - Design pattern
  - w3HexSchool
---

Hello guys! In this post, I am going to share what is the difference between decorator and proxy patter. But it is just my opinion, if you have others question or any opinions, please comment below let me know, I would super thanks!

And my English is not good, so I hope you will not mind it. If you have any suggestion, please comment below let me know. Thanks!

# Introduction

In the last two weeks, I wrote two articles explaining about [what is decorator](https://dev.to/ms314006/what-is-the-decorator-pattern-and-how-to-implement-it-by-javascript-1lb9) and [proxy pattern](https://dev.to/ms314006/what-is-the-proxy-pattern-and-how-to-implement-it-by-javascript-mhd). I think these two pattern is quite similar. Like situation below.

If I have a class `Computer`:

```javascript
class Computer {
  echo(something) {
    return something;
  }
}

const computer = new Computer();

console.log(computer.echo('hi'));  // hi
```

And I want to make method `echo` can be loudly through decorator pattern, like following code:

```javascript
const decoratorLoud = (computer) => ({
  ...computer,
  echo: (something) => (
    computer.echo(something.toUpperCase())
  ),
});

const computer = decoratorLoud(new Computer());

console.log(computer.echo('hi'));  // HI
```

So, that is decorator pattern, right?

### But!

Proxy pattern still can implement same thing above, like following:

```javascript
const computer = new Computer();

const computerProxy = new Proxy(computer, {
  get: (target, prop) => {
    if (prop === 'echo') {
      return function() {
        return target.echo(arguments[0].toUpperCase());
      };
    }
    return target[prop];
  },
});

computerProxy.echo('hi');
```

Umm...so although I was through proxy pattern implement same feature, that still can be call decorator pattern?

Now, I would give you a little time to think that, and if you have any answers, just keep reading, I had sharing my opinions below 👇
 
# My opinions

In my opinions, I would say: "Yes! Though I used proxy pattern implement, but that still can be call decorator pattern definitely."

The answer is surprise you? Maybe you want to ask that why? That is proxy pattern because I used `proxy`, not decorator!

Ok, I think this is a good moment that we can think something again.Did you see any syntax about decorator when I used decorator?

No you didn't, right?

So, it is very interesting thing about design pattern. even the implement of both is same,

### but according to different situations, would decide what pattern is it.

Like example above, in this situation I expect to add some new logic(`toUpperCase()`) on original logic(return something). So the original logic(return something) is decorate with new logic(`toUpperCase()`).

On the other hand, we didn't control(get or set) any properties from original object(`computer`) through proxy(`computerProxy`). though I used proxy, it still only decorated for the method(`echo`).

We move on next example, I still have a class `computer`, and it have a another different method:

```javascript
class Computer {
  _reset() {
    console.log('Reset!');
  }
}
```

In the class above, anyone can execute `reset` method, but I hope the method is a private. we can do that through proxy pattern:

```javascript
const computer = new Computer();

const computerProxy = new Proxy(computer, {
  get: (target, prop) => {
    if(prop[0] === '_') {
      throw new Error(`Hey! don't do that!`);
    }
    return target[prop];
  },
});

computerProxy._reset(); // Uncaught Error: Hey! don't do that!
```

Look perfect! But can I say situation above is decorator pattern? I think the answer is negative. A most obvious thing is the result of executed method have not been decorate, proxy blocked execute.

Yes! I think the most difference is

### Decorator would decorate logic before method executed, but the method will definitely execute.

### Proxy would control get and set even method execute of object, when you want to do something form the object(So JavaScript call object be `target`, when you using `proxy` in the JavaScript).

# Final words

When I started learning, I always confuse what is difference between decorator and proxy pattern, they are so similar when I think how to implement of them. But when I am learning a while, I gradually clear the difference between both.

I hope this post can be helpful for you, and if you have any opinions, please comment below, I would very appreciate every thing! :)

# Thanks

<span>Photo by <a href="https://unsplash.com/@jdent?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jason Dent</a> on <a href="https://unsplash.com/s/photos/compare?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
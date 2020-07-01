---
layout: post
title: What is the decorator pattern? And how to implement it by JavaScript?
image: img/what-is-the-decorator-pattern-and-how-to-implement-it-by-javascript.png.jpg
author: GQSM
date: 2020-07-02T00:32:59.149Z
draft: false
tags: 
  - JavaScript
  - Design pattern
  - w3HexSchool
---

Hello you guys! I am Clark. In this post we are going to learn about decorator pattern and implement it by JavaScript!

First of all, my English is not good and hope you will not mind it. If you can correct anything of my post, I will really appreciate for every comment!

# Introduction

Decorator pattern is very beautiful pattern, It is implement perfectly Open-Closed Principle. When we finished any class's main function, Except main requirement or logic are changes, we shouldn't modify it. Maybe you are thinking

### Why? Why I can't do that?

Okay! Let me talk a simple example below, if I have a class can print something on console of browser:

```javascript
class Printer {
  print(text) {
    console.log(text);
  }
}

const printerA = new Printer();
printerA.print('something'); // something
```

And next, the customer said: "Oh! The text's color is too boring! Can you change the text color to yellow?". Sure, just modify as follow:

```javascript
class Printer {
  print(text) {
    console.log(`%c${text}`,'color: yellow;');
  }
}
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/cmb2w4gffffvrpx0xw3b.png)

When you thinking everything is fine, your customer came again and said: "Hey, can you enlarge size of font? It is too small!". "Umm...Okay!" you said, And modify again as following:

```javascript
class Printer {
  print(text) {
    console.log(`%c${text}`,'color: yellow;font-size: 36px;');
  }
}
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/l1h92dg6gz4gx45i3zon.png)

Okay, it is last?

### No!

You not only have a one customer, right? So another customer said: "Hey! the size of font too big! Can you change back to original size of font?"

Umm...so what should we do? Maybe we can think some way to resolve the problem:

1. Just send a parameter to determine style of print when create object by `new`, I think this is not a good solution, because if your customer become more then your `if` or `switch` will become more. the one thing wrong importantly of the way is class `Printer` just need print, so if you put other logic in it then in the future that will be difficult to modify.
2. Maybe we can use inheritance, create derived classes for each customer. Yes! that would be awesome, but! if the first customer want to text color shown in red, the second customer want to text color shown in red and set the size of font for `36px`. Now just two customer but your code already repeat twice in two derived classes.

### So what should we do?

Decorator pattern would be a awesome option! If you want to do a thing(The thing is print of above example), but before you do that, you must do other things and you don't know how many thing you should do(like set for the text's color and the size of font), than decorator pattern can decorate a thing you want to do!

# How to use decorator pattern?

I will refactory above example by decorator pattern!

First we should do something for print, so I will create a new method override original print method, but still call it inside new method, and we can pass style for original print through new method:

```javascript
class Printer {
  print(text, style = '') {
    console.log(`%c${text}`, style);
  }
}

// decorator method
const yellowStyle = (printer) => ({
  ...printer,
  print: (text) => {
    printer.print(text, 'color: yellow;');
  }
});
```

The printer object by `Printer` create can decorate with yellowStyle, make text's color become yellow:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/47fydb8ic5tx9wp8ztw4.png)

So you can according to requirements make a lot of decorator you need, like following:

```javascript
// decorator methods
const yellowStyle = (printer) => ({
  ...printer,
  print: (text, style = '') => {
    printer.print(text, `${style}color: yellow;`);
  }
});

const boldStyle = (printer) => ({
  ...printer,
  print: (text, style = '') => {
    printer.print(text, `${style}font-weight: bold;`);
  }
});

const bigSizeStyle = (printer) => ({
  ...printer,
  print: (text, style = '') => {
    printer.print(text, `${style}font-size: 36px;`);
  }
});
```

And through decorator methods compose which you want to display style:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/lph1qflqsoe4kcsu9267.png)

So good! Right? but above example is suboptimal, because I used `...` to get properties of object, but some thing would not exist in the object like methods, the method would store in prototype, so if I just want to through `...` get all things from object, that will be wrong!

For solve this problem, the solution is make a public function to copy another same object include methods of prototype:

```javascript
const copyObj = (originObj) => {
  const originPrototype = Object.getPrototypeOf(originObj);
  let newObj = Object.create(originPrototype);
   
  const originObjOwnProperties = Object.getOwnPropertyNames(originObj);
  originObjOwnProperties.forEach((property) => {
    const prototypeDesc = Object.getOwnPropertyDescriptor(originObj, property);
     Object.defineProperty(newObj, property, prototypeDesc);
  });
  
  return newObj;
}
```

Next we need to update content of decorator methods, I talk `yellowStyle` as an example:

```javascript
const yellowStyle = (printer) => {
  const decorator = copyObj(printer);

  decorator.print = (text, style = '') => {
    printer.print(text, `${style}color: yellow;`);
  };

  return decorator;
};
```

Check out complete example [here](https://gist.github.com/ms314006/73c506a8589f63cb948d1483654fb0c6).

Following is another suitable situation you can consider using decorator pattern:

#### If you want to publish a post.
What things you want to do(decorate) before publish?
- Send mail for subscribers
- Push notice to Slack
- Push post on Facebook page


# Final words

I think decorator is super good pattern, I like decorator because it like our life, one day we will all die, but before we die, we can make a lot of decorator to decorate our life!

Thanks for you guys read, comments and feedback are super welcome!

# Thanks
<span>Photo by <a href="https://unsplash.com/@element5digital?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Element5 Digital</a> on <a href="https://unsplash.com/s/photos/decoration?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
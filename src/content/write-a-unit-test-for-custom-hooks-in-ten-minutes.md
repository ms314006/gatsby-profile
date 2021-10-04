---
layout: post
title: React | Write a unit test for custom hooks in ten minutes
image: img/write-a-unit-test-for-custom-hooks-in-ten-minutes.jpg
author: GQSM
date: 2021-10-04T21:35:59.149Z
draft: false
tags: 
  - React
  - Unit Testing
  - Jest
---

Hello guys! I am Clark! I am going to sharing how to write a unit test for custom hooks!

# Custom Hooks

Before we write the first unit test, we should have a custom hooks first. If you don't understand what is the custom hooks, I recommend you can read the [official document about custom hooks](https://reactjs.org/docs/hooks-custom.html) first, or if you already known what is the custom hooks, you can continue to read:

```jsx
import { useState, useEffect } from 'react';

const useCounter = (s, cb) => {
  const [count, setCount] = useState(s);
  const add = (addend = 1) => {
    setCount(count + addend);
  };

  useEffect(cb, [count]);

  return { count, add };
};

export default useCounter;
```

Above code snippet is a custom hooks name `useCounter`, the `useCounter` would manage the logic about counter. The return object include a current count and method of increase current count. On the other hand, `useCounter` receive two parameters, the first is the initial value of count, the second is a callback function, the callback function will execute after count changed.

So we can use `useCounter` like this:
```jsx
import React from 'react'
import ReactDom from 'react-dom'
import useCounter from '../hooks/useCounter';

const Main = () => {
  const { count, add } = useCounter(5, () => { console.log('Here is the callBack') });
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => { add(3); }}>++</button>
    </div>
  );
};


ReactDom.render(<Main />, document.getElementById('root'));
```

# Let's Test Custom Hooks

## Beforehand

We would use [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library) write the unit test.

So the first step, we need to install [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library) and it dependent packages:
```
npm install --save-dev @testing-library/react-hooks react-test-renderer
```

Remainder, if you never write any unit tests, don't forget install [jest](https://jestjs.io/):
```
npm install --save-dev jest
```

When you installed and we can start to write unit tests! There are two methods we need to know in [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library). The first is `renderHook`, the second is `act`:

1. `renderHook`: The `renderHook` can render custom hook, you can operations the custom hook like in the component.
2. `act`: The `act` can execute the methods return from custom hook. For example, You can execute the `add` method of `useCounter` through `act`.

Ok! Let's write unit test!

## Case 1
The first case is that I want to check default value of `count` will be zero. The unit test doesn't need to execute any methods so it doesn't need to use `act`, only need `renderHook`:

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../hooks/useCounter';

describe('useCounter', () => {
  test(`Default value of `count` will be zero`, () => {
    const { result } = renderHook(() => useCounter());
  
    expect(result.current.count).toBe(0);
  });
});
```

The `renderHook` will return an object, we can get `result` from the object, and `result.current` is the state of custom hooks currently. So the unit test use the `expect` method check the `result.current.count` if to be zero.

## Case 2
The second case is going to check if the `add` could correct change `count`:

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../hooks/useCounter';

describe('useCounter', () => {

  /* Case 1: Default value of `count` will be zero */

  test('The `add` could correct change `count`', () => {
    const { result } = renderHook(() => useCounter());

    act(() => { result.current.add(3); });
  
    expect(result.current.count).toBe(3);
  });
});
```

In the above example, The `act` would received the function and execute that.

## Case 3
The third case is going to check if callback function will trigger after the `count` changed. In this case besides the `renderHook` and `act` methods, also will use the mock:

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../hooks/useCounter';

describe('useCounter', () => {

  /* Case 1: Default value of `count` will be zero */
  
  /* Case 2: The `add` could correct change `count` */

  test(`The callBack function will trigger after add executed`, () => {
    const callBack = jest.fn();
    const { result } = renderHook(() => useCounter(0, callBack));

    act(() => { result.current.add(); });

    // useEffect will execute at begin,
    // so after the add function executed, count of callback executed will become to two times.
    expect(callBack.mock.calls.length).toBe(2);
  });
});
```

I think test custom hooks is easily than test component. But please make sure your version of react, react-dom and react-test-renderer all above 16.9.0, otherwise you will get the error below:

![Screen Shot 2021-10-04 at 9.16.56 PM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/39gh1iz6awdkor4xflxt.png)

I have created the [repository](https://github.com/ms314006/react-hooks-testing), the repository include all above unit test. if you want to try more, just clone!

If the content of article have any question or you have other opinion for unit test, all welcome to comment below!

# Thanks

<span>Photo by <a href="https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">NeONBRAND</a> on <a href="https://unsplash.com/s/photos/write?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
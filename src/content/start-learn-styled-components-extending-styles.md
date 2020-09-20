---
layout: post
title: Start learn styled components!(2)-Extending Styles
image: img/styled-components.jpg
author: GQSM
date: 2020-09-20T23:46:59.149Z
draft: false
tags: 
  - React
  - styled-components
---

Hello guys, I am Clark! In this post I am going to share more about styled components I learn. If you don't know what is styled components, you can go to last post, I had introduce what is it.

# Extending Styles

If we using styled components in our project then we can through more way like program language to define CSS, the extending styles is good example among styled components.

We can defined a styled component call `Button`, in this styled component I defined some base CSS:

```JSX
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
`;

const App = () => (
  <>
    <Button>Base Button</Button>
  </>
);

export default App;
```

The result of code above:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/fhk79l5p67qnil0s5xx5.png)

The button look awesome, but if I want to change color of button's border and keep others style, what can we do?

Create another styled components?

```JSX
const DangerousButton = styled.button`
  border: 1px solid red;
  border-radius: 5px;
  font-size: 20px;
`;
```

### No!

You can through extending styles to finish same thing above and more beautiful, easier to maintain.

The way to using extending styles is give a based styled components when you create a new styled components, like code below:

```JSX
const Button = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
`;

const DangerousButton = styled(Button)`
  border: 1px solid red;
`;
```

The `DangerousButton` will extended style of `Button` and override the style of same setting, such as `border` in the example above.

So the result will be:

![截圖 2020-09-20 下午11.17.07](https://dev-to-uploads.s3.amazonaws.com/i/zxky2jiha9n131pp5mpm.png)
 
So good, right? In addition, you can just change the tag name,  if you want to using other tags and keep the style of same setting. In other words you can extends the same style when you using other tags. The way is that add `as` props and give tag name you want to render when you using the styled components.

So if I want to extend the style of `Button` and render to the `a` or `div`, you can through `as` props give `a` or `div` when you using `Button`:

```JSX
const App = () => (
  <>
    <Button as="a" href="https://dev.to">Base Button</Button>
    <Button as="div">Base Button</Button>
  </>
);
```

The result above, the `Button` will be render to `div` and `a`:

![截圖 2020-09-20 下午11.35.58](https://dev-to-uploads.s3.amazonaws.com/i/8072x0cxjhswwron6ayn.png)
 
# Conclusion

So according to this post I said that using styled component can allow us to defined style in a way similar to program language. Styled component is very convenience and interesting! 😃

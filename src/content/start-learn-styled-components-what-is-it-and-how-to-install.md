---
layout: post
title: Start learn styled components!(1)-what is it and how to install?
image: img/start-learn-styled-components-what-is-it-and-how-to-install.jpg
author: GQSM
date: 2020-08-09T23:46:59.149Z
draft: false
tags: 
  - React
  - styled-components
---

Hello guys, I'm Clark! Today I am not really going to share a power skill in this post, but I am going to talk the process about I learning [styled components](https://styled-components.com/). I hope you can learn something from my share or every beginner can learn what is styled components and how to use it?

# What is styled components?

From we can knew [the official document](https://styled-components.com/docs/basics):

> styled-components is the result of wondering how we could enhance CSS for styling React component systems.

So I think that is useful and helpful, if we apply styled components in our react project(But I have no a real answer, maybe we can find it together or you can comment your opinion below, anything thanks!).

# Create a React project

In this series, I will use [create-react-app](https://github.com/facebook/create-react-app) create a React project. So whether you had installed create-react-app, as long as you installed node and npm(If you didn't, you can reference [this post](https://ms314006.github.io/how-to-install-npm-through-NVM-node-version-manager/)).

you can run command below, if you prepared:

```
npx create-react-app practice-styled-components
```

When you finished it, we would have a best environment to practice styled components.

# Install styled-components

Next, we should install styled components if we want to use it. So type following:

```
npm install --save styled-components
```

# Make a first styled component

First, we would delete the src/App.css file because we don't need CSS file now, and remove the code of `App` component from src/App.js. Besides I also refactor the way of defined function component:

```jsx
// Ignore others code...
import App.css; // <== Please remove this line.

const App = () => (
  <div></div>
);
```

Next in the same file, I defined a simple styled component and don't forget import your library styled-components, like this:

```jsx
// Ignore others code...

import styled from 'styled-components';

const Title = styled.div`
  font-size: 32px;
  color: #0f4c75;
`;
```

The `styled.div` would create a component which only have a `div` tag, in this `div` everything will use style you written. So I think the code above is like:

```jsx
const Title = (props) => (
  <div style={{ fontSize: 32, color: '#0f4c75' }}>
    {props.children}
  </div>
)
```

So we can use `Title` like components:

```jsx
// Ignore others code...

const App = () => (
  <Title>
    Hello world!
  </Title>
);
```

The result of code above:
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/sza38wi7gboaqdrze9ca.png)

[The gist.](https://gist.github.com/ms314006/5c9a57377fa0c277a1ea5dbf3fb755ee.js)

# Receive Props

We already knew the styled component is a component, so it can receive props is very normal. Let's learn it below!

In the styled component. Styled components can receive props through a parameter of function, the function will return a string, the string is a result you want to set in the style. Like following:

```jsx
const Title = styled.div`
  font-size: 32px;
  color: ${props => props.color ? props.color : '#0f4c75'};
`;
```

So we can set any color in the styled component:
```jsx
const App = () => (
  <>
    <Title>Hello world!</Title>
    <Title color="#fdcb9e">Hello world!</Title>
  </>
);
```

The result:
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/btiegfh45vpfbqh6s7cr.png)

[The gist.](https://gist.github.com/ms314006/526130e5bcb26c6715e87845bb6e26f2.js)

# Conclusion
In this post we learned what is styled components, install it, how to use it and receive props in styled components. I had provided gist for each example, the gist have complete code, if you have any question or opinion please comment below let me know, I would thank for any comment!

# Thanks

<span>Photo by <a href="https://unsplash.com/@timmossholder?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tim Mossholder</a> on <a href="https://unsplash.com/s/photos/spray-paint?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---
layout: post
title: Start learn styled components!(3)-You can styling any component you want!
image: img/styled-components.jpg
author: GQSM
date: 2020-09-28T23:46:59.149Z
draft: false
tags: 
  - React
  - styled-components
---

Hello guys, I am Clark! In this post I am going to continue share and practice about more styled components!

# Styling any component

When I read this part in documentation of styled component, I think styled component is very powerful for me. In the post that I share about styled component before, we all know the styled can create a component with style you want and we can direct using or expanding it.

In this chapter, we will learning how to styling existing components instead of HTML tags!

## Install react-router-dom

If we want to practice styling any component, we need to using components other element ui framework provide.

So first, we need to use react-router-dom in our project(I think this is a common thing), The `Link` provided bu react-router-dom is a prefect component let us try to styling through styled component.

```
npm i react-router-dom
```

## Styling existing component

When we finished previous step, we can import `Link` from react-router-dom:

```JSX
import React from 'react';
import { HashRouter, Link } from 'react-router-dom';

const App = () => (
  <HashRouter>
    <Link>I am a link</Link>
  </HashRouter>
);

export default App;
```

So...should we writing inline style? Link code below:

```JSX
const App = () => (
  <HashRouter>
    <!--inline style-->
    <Link style={{ textDecoration: 'none' }}>
      I am a link
    </Link>
  </HashRouter>
);
```

### No!

We can wrap the `Link` through like `Button` component of [last post](https://dev.to/ms314006/start-learn-styled-components-2-extending-styles-ef3). The wrap way is same, just give `styled` the `Link` parameter. Code snippet show you different between inline style and through styled component:

```JSX
import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const NoneDecorationLink = styled(Link)`
  text-decoration: none;
`;

const App = () => (
  <HashRouter>
    <!--inline style-->
    <Link style={{ textDecoration: 'none' }}>
      I am a link
    </Link>
    <br />
    <!--styled component-->
    <NoneDecorationLink>
      I am a style link
    </NoneDecorationLink>
  </HashRouter>
);

export default App;
```

I think the styled component is clearer than inline style, but the result is same:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/t1qzs0vm8ucvkpov0u8i.png)

# Conclusion

So if we use styled component we don't need to consider how to expanding components provided by other element ui framework!
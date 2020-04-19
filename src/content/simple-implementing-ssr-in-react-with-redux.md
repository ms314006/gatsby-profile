---
layout: post
title: React | Simple implementing SSR(Server-Side Rendering) in React with Redux
image: img/react-redux.jpg
author: GQSM
date: 2020-04-19T05:33:38.149Z
draft: false
tags: 
  - React
  - SSR
  - w3HexSchool
---

Hello! You guys! I am Clark today we are keep going to learn how to implementing SSR in React applications with Redux! 

Last article, We are already finish implement SSR in a base React application! [Here is the React application Repo](https://github.com/ms314006/implement-ssr-of-react/tree/without_redux)!But the Repo is for last article, This article I have prepare [a another Repo](https://github.com/ms314006/basic-csr-of-react/tree/master/src), it is React applications with Redux, but it is very similar to last Repo, only have a different:

```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequestQuery } from '../actions';

const Content = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRequestQuery(dispatch);
  }, []);

  const { request } = useSelector(state => state);
  return (
    <span>{JSON.stringify(request)}</span>
  );
};

export default Content;
```

In the `Content`, I through API get data and use Redux store it.

# Review

Okay, first we review what is we should prepare file for SSR:

### 1. We need a hepler.js help us display first HTML in client:

```javascript
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../Routes';

export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <div>{renderRoutes(Routes)}</div>
    </StaticRouter>,
  );

  return `
    <html>
      <body>
        <div id="root">${content}</div>
        <script src="./bundle.js"></script>
      </body>
    </html>
  `;
};
```

### 2. Install express and create a file srever.js, to handle first response:

```javascript
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  const content = renderer(req);
  res.send(content);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
```

So, if you guys already understand code above, we can continue handle component `Content`! if you have any question, you can reference last article or comments below:)

We can through server.js send response correct, if we can handle `Content`'s fetch correct, so first we need would export method of fetch, if it is need for render component:

```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequestQuery } from '../actions';

const Content = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRequestQuery(dispatch);
  }, []);

  const { request } = useSelector(state => state);
  return (
    <span>{JSON.stringify(request)}</span>
  );
};

export default {
  component: Content,
  loadData: dispatch => (
    fetchRequestQuery(dispatch)
  ),
};
```

Now export from `Content` is not a component, it is a object and include the component and API method, so we don't forget modify `src/Routes.js`:

```javascript
import Content from './pages/Content';
import NotFound from './pages/NotFound';
import App from './App';

export default [{
  ...App,
  routes: [
    {
      ...Content,
      path: '/',
      exact: true,
    }, {
      component: NotFound,
    },
  ],
}];
```

We are almost finish, next we start to handle Redux, first of all, the `store` in client we only can use one, but if we use one store handle request from all client, then data maybe will influence each other request, so we must modify `./src/store/index.js`:

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default () => createStore(reducers, applyMiddleware(thunk));
```

Look nice, So each new request, we can create a new store, data will no influence each other request.

Next we go to `./src/server.js`, we need use new `createStore` get `store`, and handle fetch if component need it.

```javascript
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './Routes';
import renderer from './helpers/renderer';
import createStore from './store';

const app = express();

const port = process.env.PORT || 3001;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  // (1)
  const store = createStore();
  const { dispatch } = store;

  // (2)
  const routes = matchRoutes(Routes, req.path);

  // (3)
  const promises = routes.map(
    ({ route }) => (route.loadData ? route.loadData(dispatch) : null),
  );

  // (4)
  Promise.all(promises).then(() => {
    const content = renderer(req, store);

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
```

I will explain in four part below code:

1. Use `createStore` get `store` and get `dispatch` from `store`.

2. Use `matchRoutes`(It is method in react-router-config) get correspond information of render components from `Routes`, and `Routes` is an Array, data like: `[{ route: { /* component information */ }, }, { route: { /* component information */ }, }]`.

3. Use `map` check if component need API fetch data(Judge by loadData), if component need fetch data, then add to `promises`.

4. Considering that the API needs to be in order, so we use `promise.all` ensure API to be in order! when all promise responses is finish, we can call `renderer` to get client's HTML.

We are almost finish, we can open `./src/helpers/renderer.js` to receive `store` add `Provider` to get data from `store`:

```javascript
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Routes from '../Routes';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>,
  );
  return `
    <html>
      <body>
        <div id="root">${content}</div>
        <script src="./bundle.js"></script>
      </body>
    </html>
  `;
};
```

Perfect! Finally we can type `npm run build`, and `npm run server` to running server:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/n908fjugqujkbmyfc55y.gif)

You can find this Repo in [my Github](https://github.com/ms314006/implement-ssr-of-react)!

Thank for reading my post, if you have any question and think, please let me know, in comments below :)
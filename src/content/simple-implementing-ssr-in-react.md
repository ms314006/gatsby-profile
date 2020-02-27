---
layout: post
title: React | Simple implementing SSR(Server-Side Rendering) in React
image: img/React.jpg
author: GQSM
date: 2020-02-27T05:33:38.149Z
draft: false
tags: 
  - React
  - SSR
  - w3HexSchool
---

Hello! My name is Clark, in this post we are gonna implementing Server-Side Rendering in React, it's very easy! Let's start!

## Server-Side Rendering vs Client-Side Rendering

What different between SSR and CSR? first, the CSR have a few step on page of web loading:

1. Load HTML file, It usually likes this: 
    ```html
    <html>
      <body>
        <div id="root"></div>
        <script src="./bundle.js"></script>
      </body>
    </html>
    ```

2. Download JavaScript bundle.js.
3. Last, execute bundle.js and render page view by route!

On the other hand, SSR have these step:

1. Send request to NodeJS server when type the URL.
2. Server would be generate the view of page by request URL path, and response to client side.
3. Client accept the response from server, It likes:
    ```html
    <html>
      <body>
        <div id="root">
          <!--
            Page information
          -->
        </div>
        <script src="./bundle.js"></script>
      </body>
    </html>
    ```
4. Download JavaScript bundle.js.
5. Last, execute bundle.js and render page view by route!

Now you can according to above loading step of about CSR and SSR find out a key thing! did you find that?

Yes! The different just is action before **Download JavaScript bundle.js.** this step.

So in the face, we just need prepare Server for the first load, it's very easy!

And before the start, I have ready a basic CSR project of react, you can clone it from [my Github](https://github.com/ms314006/basic-csr-of-react/tree/without_redux), when you cloned you can execute it, and find it first loading hasn't any content on page

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/c2r48b7y67p1iv7653ox.gif)

Right now, following step to implement SSR to this project!

## Create server by NodeJS

First of all, for the SSR we must use express server library of NodeJS, why I chooses NodeJS? because just only NodeJS can implement SSR, They are all JavaScript.

### Install express

Install express in origin CSR project.

```
npm install express --save
```

Then add the server.js in src folder, and write follow code:

```javascript
import express from 'express';

// (1)
const app = express();
const port = process.env.PORT || 3001;

// (2)
app.use(express.static('dist'));

// (3)
app.get('*', (req, res) => {

  //(4)
  const content = '<div>Response Content</div>';
  res.send(content);

});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

```

1. Create express object, and Setting folder position of static file.
2. Setting folder position of static file.
3. Route entrance, if setting '*' then any route would be execute callback function, and callback have two parameter, the first is information of request(example path), the second is method of response.
4. Setting content of page, and use `res.send` response to client-side.

Ok! we have gone finish the server part, but this response of server in not we expect, we want the content is according to router render correspond component.

So we need a helper, it can help render first content same as CSR.

## Rendering content for first response

Please create new folder in src folder, it name is helper, and create a file in this, new file name is renderer.js, last write follow code into it:

```javascript
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../Routes';

export default (req) => {
  // (1)
  const content = renderToString(
    <StaticRouter location={req.path}>
      <div>{renderRoutes(Routes)}</div>
    </StaticRouter>,
  );

  // (2)
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

Let's look What did it do:

1. The content is according to router rendering correspond content, it have two points:

    The first is `StaticRouter`, it is kind of router like as `HashRouter` and `BrowserRouter`, we can use it, when route never change([Document of StaticRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/StaticRouter.md)).

    The second is `Routes` from '../Routes', because same of all content of page, whether rendered from client or server, so we can reuse it.

2. Because the first loading is from server-side in SSR, so we have to prepare basic HTML for after '.bundle.js', then when '.bundle.js' loaded just can continue support actions for operating of user.

    You can image it is for origin './dist/index.html' instead.

Now we have finished './src/helper/renderer.js', next back to './src/server.js' to use it:

```javascript
import renderer from './helpers/renderer';

...

app.get('*', (req, res) => {
  // Call renderer get content by `req` parameter
  const content = renderer(req);

  // Would content send to client
  res.send(content);
});

...
```

## Setting Webpack to build server

We have already finished all about code! we need setting Webpack now, let it can build server, first open './webpack.config.js', it config is for build client code('./src/client.js'), we have to create new config of Webpack for build server.

So create new file in root, and name is 'webpack.server.js', and copy content of './webpack.config.js' to new file modify something:

./webpack.server.js

```javascript
const path = require('path');
// (1)
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  // (2)
  target: 'node',
  // (3)
  entry: ['@babel/polyfill', './src/server.js'],
  // (4)
  externals: [webpackNodeExternals()],
  output: {
    filename: 'bundle.js',
    // (5)
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
};
```

I modified something:

1. Install [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals) from npm:
    ```
    npm i webpack-node-externals
    ```
    When build on server, not need contain node_modules, so we can use webpack-node-externals ignore this on building.

2. Server running environment is Node, It have some different setting with browser when build, so have to defined this.

3. Modify entry file from './src/client.js' to './src/server.js'.

4. Use the first step installed webpack-node-externals to externals.

5. Defined new folder(different with client code) to put build file of server code.

Then we could rename './webpack.config.js' to './webpack.client.js'.

## Build and running

Finally, add and modify content on script of 'package.json':

package.json

```json
"scripts": {
  "build-client": "webpack --config webpack.client.js",
  "build-server": "webpack --config webpack.server.js",
  "build": "npm run build-client && npm run build-server",
  "server": "node build/bundle.js"
},
```

Running script of build:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4roq6s9cflgh2pvatfuv.gif)

Running server:

```
npm run server
```

Then open browser, and type `localhost:3001` to url, and look at the response on first loading:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/3fa6rwdlu68a31n9at2i.gif)

The first response have complete content, next would bundle.js(client code) download, after download, then execute process all by client side, server just only be responsible for first render!

Above about SSR code would find in [my GitHub](https://github.com/ms314006/implement-ssr-of-react/tree/without_redux), 

## Conclusion

The base SSR is not difficult, just prepare little server code and setting for server render, in the future, I will write SSR about react-redux.

Thank for reading my post, if you have any question and think, please let me know, in comments below :)

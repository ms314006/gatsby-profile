---
layout: post
title: Deploy your Deno apps to Heroku
image: img/deno.jpg
author: GQSM
date: 2020-06-13T23:49:59.149Z
draft: false
tags: 
  - Heroku
  - Deno
---

Hello, guys! I am Clark! In this post, I am going to share about how to deploy your [Deno](https://deno.land/) applications to [Heroku](https://dashboard.heroku.com/)!

Ok, The first we need to have a Deno application. if you didn't download Deno in your system, you can refer to [this page](https://deno.land/#installation), or if you already download Deno, you can create a Deno applications folder and create a index.ts in the folder:

```javascript
import { serve } from "https://deno.land/std@0.57.0/http/server.ts";

const s = serve({ port: 8000 });

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

When you finished, you can type below commend to run this Deno application:

```
deno run --allow-net index.ts
```

You can open browser and type `http://localhost:8000/` into url:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/pof07t84v286bn2x85py.png)

Next, if we deploy a application to Heroku, Heroku will give me a port, we need to use this port instead of the 8080 we set. So we will use [flags](https://deno.land/std/flags) to help us parse port from `args` when our Deno applications running with Heroku.

For that, we need to edit our index.ts:

```javascript
import { serve } from "https://deno.land/std@0.57.0/http/server.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

const s = serve({ port: argPort ? Number(argPort) : DEFAULT_PORT });

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

So far, look nice! Than, we need create Procfile file, Heroku will run commends from Procfile file, when we deployed our Deno applications:

```
web: deno run --allow-net=:${PORT} index.ts --port=${PORT}
```

Last, we go to website of Heroku, create a new application and switch to Settings page of the application:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/2qdd49ocji5o8hequh2i.png)

And we pay attention to Buildpacks:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/52hd93pi5iwjtns0a9qz.png)

Before, we usually choose a Buildpack to run our commend, maybe nodejs, php, ruby or go. But now we need to set a environment to run Deno, and the most terrible thing is...Heroku have no Deno let us choose:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/pf7ih5upbyipod9n569r.png)

Don't worry, please enter below Buildpack URL to input box:

```
https://github.com/chibat/heroku-buildpack-deno.git
```

Finally, we just need to deploy our Deno applications to Heroku like as other applications. If you never deploy any applications to Heroku, you can refer to [this part](https://devcenter.heroku.com/articles/deploying-nodejs#deploy-your-application-to-heroku), but you don't need to type `heroku create` because you already did.

If you guys have any questions, please comment below and let me know. thank for you read!

Reference:
1. [Deploy your first Deno Web App to Heroku](https://www.youtube.com/watch?v=yXH8VFLh2yA)
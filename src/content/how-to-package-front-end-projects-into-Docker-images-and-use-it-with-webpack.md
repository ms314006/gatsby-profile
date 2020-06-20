---
layout: post
title: How to package front-end projects into Docker images and use it with webpack
image: img/docker-with-front-end.jpg
author: GQSM
date: 2020-06-20T16:04:59.149Z
draft: false
tags: 
  - Docker
  - w3HexSchool
---

Hello guys! I am Clark! In this article I am going to share how to package front-end projects into Docker images with webpack.

Maybe someone thinks this is useless for front-end developer, but I think for me, developing a project in front-end is more complicated than before, and also include part of setting environment.

For example, if I want to run a project, I need to install node or I should install deno if this project using deno? I can't just run the project? and make the project work? and perhaps the project also need rely on database?

Can I easy to integrate and manage front-end projects with back-end projects?

# You can!

Just choose docker and I think this is common way now.

> But in this article I wouldn't talk part of back-end projects, if you guys want to know, please comment below let me know :)

# Install docker

Okay, the first step still is install, please refers [docker's document](https://docs.docker.com/get-docker/), I think it is clearest.

# Create Dockerfile

If you want to build a docker image, you should throw Dockerfile. we will write something that about how do you want to execute the project and environment of execution of the project. Below is a basic context of Dockerfile:

```Dockerfile
FROM node:10.15.3-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

CMD ["npm", "run", "start"]
```

So, I will explain some point of above Dockerfile:

1. FROM: It is your target projects' environment of execution, my project is using node environment develop, so I written node and the version is 10.15.3, if you want to choose the others version you can check [here](https://hub.docker.com/_/node/).

2. WORKDIR: Docker will create a work folder, when you build a image.

3. COPY: It can copy any file or folder you want to WORKDIR, the first I copy package.json for next step.

4. RUN: During images building, docker will execute commands you wrote. So in this step I execute `npm install` which will install all the project dependent libraries according to package.json.

After installed libraries, I copy all files to WORKDIR and run a command `npm run build` for building the project.

5. CMD: When you builded a image, and you run the image, it will execute commands from CMD. If you want to run `npm run start`, you should write `["npm", "run", "start"]`.

Now is the great time, I want to talk about something you should pay attention if you using webpack-dev-server to run server, that is you need to add `--host 0.0.0.0` to commands behind `webpack-dev-server`, I find it from [this issue](https://github.com/webpack/webpack-dev-server/issues/547), but I still have no idea for the reason, if you know we can chat about it in the below comment! 😃

In the step, we create a Dockerfile, otherwise we also can create a .dockerignore which can ignore file or folder during building images. For example, maybe I don't want to copy node_modules to WORKDIR, because I will run `npm install` during building image, for that I can write below snippet in .dockerignore:

```
node_modules
```

After we finished above things, we can run the command which building a image:

```
docker build -t docker-app:1.0.0 .
```

We can type `docker build` to build a image, `-t` meaning is tag name, you can add tag name for your images, the format is `image name:tag name`, last is your path of project which you want to defined the project root path.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/jgol0x0kjaxe2nemv7jj.png)

If have no display any problem, we type `docker images` in terminal, we can find out our image.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/w1dmbw1ez1s8a0101xgx.jpg)

# Run images

Next, please type below commands for run images:

```
docker run -p 8080:8080 45c5b8f47f9d
```

We can use `docker run imageID` format execute a image, and a same time, a container will started, our image will run in the container.

So our webpack-dev-server run our project on 8080 port, but it is running in the container, we need to export 8080 port of container to our 8080 port of localhost. For that, we need to add `-p 8080:8080` into commands, the format is `-p [port of localhost]:[part of container]`.

After running your images, we can type above commands to see running container with image.

```
docker ps
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ob6ihwwc9z7d60rne26x.png)

And we can open browser, enter `localhost:8080` into url, the project is work 🎊:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/jjs6qvpxsdhronifvt86.png)

If you want to stop or delete container and image you can refers below commands:

```
// delete images
docker rmi imageID

// stop containers
docker stop containerID

// delete containers
docker rm containerID
```

I hope this post can help you, if you have any questions or suggestion please let me know by below comment!

thank for you read! 😃
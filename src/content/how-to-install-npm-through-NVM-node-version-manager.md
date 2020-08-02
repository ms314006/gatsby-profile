---
layout: post
title: How to install npm through NVM(Node version manager)
#image: img/what-is-the-proxy-pattern-and-how-to-implement-it-by-javascript.jpg
author: GQSM
date: 2020-08-02T22:32:59.149Z
draft: false
tags: 
  - Node
  - w3HexSchool
---

Hello guys, I am Clark! In this post I am going to share about install npm. In the official document of npm, you can install npm through two way, and npm is node package manager, so the two way are all related to node.

The first way is node installer which I always did when I want to install npm before, because this way is easily, you just need to go to the website of node, download the node installer and install it(Whatever you choose the LTS or Current version), you will got npm when you finished.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/msjhj13itwap18hj563q.png)

The second way is through NVM, also is main way I want to share in this post. But I never do it, so if any mistake I did, please comment below let me know, thanks!

# What is the NVM

The NVM meaning is node version manager, according to the official document, something we can know:

- This way is more recommend than node installer.
- You can install and switch between multiple versions of node and npm in your device.

So if we choose the NVM, we can test if our application work well on different version of node. It sounds nice! Let's install NVM!

# Window

If your device's OS is window, you can download the latest NVM installer from releases. Install NVM on the window is more easily than on the macOS I think.

If you finished download and install, you could open command line and type `nvm`, that would look like this if you success install NVM:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/ez5nolz79r9lfpg926bv.jpg)

# macOS

If your device's OS is macOS, you can execute a command below through terminal(According to [here](https://github.com/nvm-sh/nvm#troubleshooting-on-macos)):

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

If you finished the step and you already have installed npm before then NVM would check all modules you installed and ask if you want to uninstall they from global:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/btyd964bswrcjp7a8jih.png)

Because if you installed the NVM, your original node and npm will be overwritten by NVM. But this step we will handle later, because we have something not yet finished.

My terminal is using zsh(The latest macOS Catalina default terminal is use zsh), so I need a a new terminal window and add the following to file `./zshrc`, if your terminal is not zsh, please add in file `./bash_profile`:

```
vim ~/.zshrc
```

And type `i` to start editing it, and paste the following:

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

After you paste the command above, you can click button `esc` on keyboard, continue type `:wq` and enter it:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/xqbqcjk3p8fj0ay8acx6.png)

If you finished above all thing, please you close and reopen a new terminal then type `nvm` check if you successful installed:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/68x5fd8wihuiwkge2ncg.png)

Next if you want to use current versions of node and npm through your NVM, you can run following. The `use` also is  command which you want to switch the version of node:

```
nvm use system
```

The NVM will apply versions of node and npm to the NVM, we can continue run command below check:

```
nvm ls
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/rqf9yq1cu0fvrhzln20z.png)

Anything will like you use node or npm before install NVM. 

## How to install other versions of node and npm

If you want to install other versions of node and npm, the first you can run following see all versions of node you can install:

```
nvm ls-remote
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/txw8r7uz1hgjlxpithdq.png)

Next if I want to install latest LTS version of node `v12.18.3`, I can run following:

```
nvm install <version>
```

Then we can run the following command to check the version of node currently use by NVM:

```
nvm current
```

So if I want to install the `v12.18.3` and check if it is successful switch to versions I installed:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/0dcl9ry2v38cac75ojbp.png)

So good! You also can uninstall version of node you don't want to use:

```
nvm uninstall <version>
```

Last, you should be know, the version of node would not influences each other, each version of node will be independent! So just take easy to using any version of node to develop your applications!

# Final words

I hope this post can be helpful for you, and if you have any opinions or questions, please comment below, I would very appreciate every thing! :)
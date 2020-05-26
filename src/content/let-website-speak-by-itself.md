---
layout: post
title: Let website speak by itself - chrome extensions!
image: img/let-website-speak-by-itself.jpg
author: GQSM
date: 2020-05-04T07:16:11.149Z
draft: false
tags: 
  - Chrome extension
  - JavaScript
  - w3HexSchool
---

Hello! guys, I'm Clark. In this post I want to share how to use chrome extensions and some method of javaScript let website speak by itself!

In the project below, I will use [Time For Kids](https://www.timeforkids.com/) as an example, make a chrome extensions to catch content in article of Time For Kids, When I get content of article, I will use [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) and [SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis) to speak text, they are method of JavaScript.


## Create A Project Of Chrome Extensions
Ok so first of all, we need to create a project for chrome extensions, so like npm project need package.json, you should create a file manifest.json, if you expect your project can be a chrome extensions.

The content of manifest.json below:
```Json
{
  "manifest_version": 2,
  "name": "Reciting articles of time for kinds",
  "description": "Reciting articles of time for kinds",
  "version": "1.0.0",
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab"
  ],
  "content_scripts": [
    {
      "matches": [
        "https://www.timeforkids.com/*"
      ],
      "js": [
        "execute.js"
      ]
    }
  ]
}
```
We need to pay attention to a few points:

1. `icons`: You must to put a same name's file in the root folder, it is your icon of chrome extensions

2. `browser_action`: It have two attributes, The first is `default_icon`, `default_icon` mean same to `icons` above, The second is `default_popup`, `default_popup`'s value is a HTML file, we can use it to trigger event.

3. `content_scripts`: It is a very interesting attributes, It have two attributes, The first is `matches` and the second is `js`, `matches` can defined a domain, if users visit webpages at the this domain, then chrome extensions will auto load code of specified JavaScript file by `js`.

So far we already know through manifest.json file that we need to create another two files, that is popup.html and execute.js.

## popup.html
Our HTML don't need too complex, only two button is enough, the one is start, the another one is stop:

```html
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" style="width:100px;">
  <head>
    <title>Reciting articles</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body id="body">
    <button id="recite">Start Recite</button>
    <button id="stopRecite">Stop Recite</button>
    <script src="./popup.js"></script>
  </body>
</html>
```
If you observe the code above, you can find that I secretly loaded a JavaScript file call in popup.html, The JavaScript file is popup.js:

```javascript
const getSelectedTab = (tabs) => {
  const tabId = tabs[0].id;
  const sendMessage = messageObj => (
    chrome.tabs.sendMessage(tabId, messageObj)
  );

  document.getElementById('recite').addEventListener(
    'click', () => sendMessage({ action: 'RECITE' })
  );
  document.getElementById('stopRecite').addEventListener(
    'click', () => sendMessage({ action: 'STOP_RECITE' })
  );
};

chrome.tabs.query({ active: true, }, getSelectedTab);
```

Except we can add event listener of click to button of start and stop in popup.js, we also can use the API from chrome to control webpages, like the following two:

The first is [chrome.tabs.query](https://developer.chrome.com/extensions/tabs#method-query), it can find all tabs currently open in chrome browser, The first parameter set the currently active tab, The second parameter is a callback function.

callback function in the code above is `getSelectedTab` and `getSelectedTab` receive a parameter called `tabs`, `tabs` is array type, in the `tabs` will have all match conditional tab data, did you remember my conditions? I set the currently active tab, so only will have a tab in the tabs, even so the `tabs` still is a array type, so we need to get currently tab data by `tabs[0]`.

The second is [chrome.tabs.sendMessage](https://developer.chrome.com/extensions/tabs#method-sendMessage), if currently webpages have [chrome.runtime.onMessage.addListener](https://developer.chrome.com/extensions/runtime#event-onMessage), then we can let chrome extensions communication currently webpages by send message through [chrome.tabs.sendMessage](https://developer.chrome.com/extensions/tabs#method-sendMessage)

But at this moment, maybe you will think: "All webpages does have [chrome.runtime.onMessage.addListener](https://developer.chrome.com/extensions/runtime#event-onMessage), how is that possible?"

Yes! you are right! That is impossible, so we failed?

No! did you remember we have a very interesting attributes in the manifest.json? It is `content_scripts`, Is it the same as you think?

## execute.js
So though the target webpage doesn't have [chrome.runtime.onMessage.addListener](https://developer.chrome.com/extensions/runtime#event-onMessage), but we still can add it in the target webpages by execute.js of `content_scripts`:

```javascript
const onMessage = (message) => {
  switch (message.action) {
    case 'RECITE':
      /* play */
      break;
    case 'STOP_RECITE':
      /* stop */
      break;
    default:
      break;
  }
}

chrome.runtime.onMessage.addListener(onMessage);
```

Because our popup.html have two button, so I need to use `switch` to set two type event for execute, the one is start recite, the another one is stop recite, then we can write down some code for event of start and stop.

First event of start, we have to get content of article, so I observe HTML tag on the webpages of time for kids, I can find content of article, it is in the second `div` of class is `columns small-12 medium-offset-2 medium-8 end`:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/j5r2ohc9zfsmdc91wqrr.png)

So I can write down a function to get content text:

```javascript
const getArticleContent = () => {
  let articleContent = '';
  const article = document.body.getElementsByClassName('columns small-12 medium-offset-2 medium-8 end')[1];
  const paragraphs = article.querySelectorAll('p:not([class])');
  paragraphs.forEach((paragraph) => { articleContent += `${paragraph.innerText} `; });
  return articleContent;
};
```

Next we need to use [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) and [SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis) to speak text:

```javascript
const recite = () => {
  const articleContent = getArticleContent();
  const utterThis = new SpeechSynthesisUtterance(articleContent);
  utterThis.lang = 'en-US';

  const synth = window.speechSynthesis;
  synth.speak(utterThis);
};
```

But you need to attention pay to that [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) have many national intonation, and I expect time for kinds is english article, so I set `utterThis.lang` to `en-US`, if you want to know other land, you can visit [DEMO of mdn](https://mdn.github.io/web-speech-api/speak-easy-synthesis/) to try it.

Now we are finished a function for recite, so we can add the function to the `case 'RECITE'` of `switch`, and the another `case 'STOP_RECITE'` we can use `cancel` of [SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis) directly stop recite:

```javascript
const onMessage = (message) => {
  switch (message.action) {
    case 'RECITE':
        recite();
      break;
    case 'STOP_RECITE':
        window.speechSynthesis.cancel();
      break;
    default:
      break;
  }
}

chrome.runtime.onMessage.addListener(onMessage);
```

Finally, we have to test if the chrome extension is correct execute, open your chrome and go to the extensions:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/3zvo7xjk53rnh6972fyn.png)

Next click load the unpacked extension, then choose your chrome extension project folder.

When you finish all steps above, You can go to a any article of Time For Kids and use your chrome extensions let webpages speak by itself!

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/k20i65lp8bonxbb71s4j.png)

I would all code above put in my [GitHub](https://github.com/ms314006/reciting-articles-of-time-for-kinds), welcome guys clone it and try yourself!

You guys can commit the message below if you have any question!


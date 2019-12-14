---
layout: post
title: JavaScript | WebSocket 讓前後端沒有距離
image: img/JavaScript.jpg
author: GQSM
date: 2019-02-23T13:45:54.149Z
draft: false
tags: 
  - JavaScript
  - WebSocket
---

## 前言

最近因為工作的關係接觸到 <code class="hm hn ho hp hq b">WebSocket</code> ， <code class="hm hn ho hp hq b">WebSocket</code> 是網路協定的一種， Client 可以透過此協定與 Server 做溝通，而他和一般 <code class="hm hn ho hp hq b">http</code> 或 <code class="hm hn ho hp hq b">https</code> 不同的是， <code class="hm hn ho hp hq b">WebSocket</code> 協定只需透過一次連結便能保持連線，不必再透過一直發送 <code class="hm hn ho hp hq b">Request</code> 來與 Server 互動！

---

## WebSocket

如前言所說， <code class="hm hn ho hp hq b">WebSocket</code> 只需開啟連結便能和 Server 做溝通，且 <code class="hm hn ho hp hq b">Websocket</code> 傳送資料的方式是雙向的， Client 端可以像 <code class="hm hn ho hp hq b">Ajax</code> 一樣做請求， Server 端也能主動發送 Client 所需要的資料。

一般的 <code class="hm hn ho hp hq b">WebSocket</code> 請求網址會長這個樣子：

<pre><span id="eaa9" class="is gm em at hq b fh it iu r iv">ws://example.com</span><span id="7253" class="is gm em at hq b fh iw ix iy iz ja iu r iv">//經過 <!-- -->SSL<!-- --> 加密後，前方的 <!-- -->ws<!-- --> 會變成 <!-- -->wss<!-- --> <br>wss://example.com</span></pre>
<br />
### Server 端 - 搭建 WebSocket 環境

<code class="hm hn ho hp hq b">WebSocket</code> 的 Server 部分，本文會以 <code class="hm hn ho hp hq b">Node.js</code> 建置，如果電腦上還沒有安裝 <code class="hm hn ho hp hq b">Node.js</code> 可以先參考「<a href="https://ithelp.ithome.com.tw/articles/10199058" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">[筆記][node.js]第一次建置node.js開發環境和安裝npm就上手！</a>」。

處理好安裝環境後還需要在下載兩個套件，分別是用來開發 Web 框架的 <code class="hm hn ho hp hq b">express</code> 和負責處理 <code class="hm hn ho hp hq b">WebSocket</code> 協定的 <code class="hm hn ho hp hq b">ws</code> ：

<pre><span id="ca26" class="is gm em at hq b fh it iu r iv">npm install express<br>npm install ws</span></pre>
<br />

安裝完後可以到專案中的 <code class="hm hn ho hp hq b">package.json</code> 中確認是否成功：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/2108/1*EgbqxHT8iSGFbikO5oRVSg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>下載完後的套件會被記錄到 package.json 中</span>
          </div></div><br/>

接著在專案裡新增一個 JavaScript 檔案 <code class="hm hn ho hp hq b">server.js</code> 當作專案的進入點：

```javascript
//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 3000

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

    //連結時執行此 console 提示
    console.log('Client connected')

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected')
    })
})
```

沒問題後便可以輸入以下指令執行 <code class="hm hn ho hp hq b">server.js</code> ：

<pre><span id="6c86" class="is gm em at hq b fh it iu r iv">node server.js</span></pre>
<br />

當本機 Server 的指定 <code class="hm hn ho hp hq b">Port</code> 被打開時，會先執行我們監聽指定的事件：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/1756/1*VAiVKJFcfHjAIll0WDRCxg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>開啟成功後會在 console 中打印提示</span>
          </div></div><br/>

### Client 端 - 連接 WebSocket Server

Server 端處理完後，就換到 Client 端來連結剛剛開啟的 <code class="hm hn ho hp hq b">WebSocket</code> 服務，這裡另外建一個專案，在專案裡只需一個 <code class="hm hn ho hp hq b">index.html</code> 及 <code class="hm hn ho hp hq b">index.js</code> ：

<code class="hm hn ho hp hq b">index.html</code> 的部分先簡單處理，只需引用 <code class="hm hn ho hp hq b">index.js</code> 就可以了：

```html
<html>
    <body>
        <script src='./index.js'></script>
    </body>
</html>
```

<code class="hm hn ho hp hq b">index.js</code> 的部分會用來處理與 <code class="hm hn ho hp hq b">WebSocket</code> 的連結：

```javascript
//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3000')

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection')
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection')
}
```

上方的 <code class="hm hn ho hp hq b">url</code> 為剛剛使用 <code class="hm hn ho hp hq b">node.js</code> 在本機上執行的 Server ，另外的 <code class="hm hn ho hp hq b">onopen</code> 及 <code class="hm hn ho hp hq b">onclose</code> 分別為他們指定一個 <code class="hm hn ho hp hq b">Function</code> ，在開啟和關閉連線時執行，執行結果：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/3324/1*8CvZuLeH3jKwJ8_7gc8sHQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>開啟連結後會執行 onopen 的事件</span>
          </div></div><br/>

執行結果中可以看到 <code class="hm hn ho hp hq b">onopen</code> 中在 <code class="hm hn ho hp hq b">console</code> 打印的提示，除此之外，也可以從剛剛執行 Server 的地方觀察開啟連結後的訊息：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/1772/1*y6Ivv4bi2kjIws-GxmTVYQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>在 Server 上執行時記錄的訊息</span>
          </div></div><br/>

上方也列出 <code class="hm hn ho hp hq b">WebSocket</code> 的物件有哪些屬性，比較重要的還有 <code class="hm hn ho hp hq b">onmessage</code> ， Client 就是靠它在接收由 Server 發送的資料，但在提到它之前，得先回到 Server 了解如何和 Client 做溝通。

### 回到 Server 端 - 處理接收發送訊息

提到溝通，過程一定是有來有往，在開啟 <code class="hm hn ho hp hq b">WebSocket</code> 後， Server 端會使用 <code class="hm hn ho hp hq b">send</code> 發送訊息，接收則是如同在 <code class="hm hn ho hp hq b">connection</code> 內監聽 <code class="hm hn ho hp hq b">close</code> 一樣，只是換成對 <code class="hm hn ho hp hq b">message</code> 設定監聽，並接收一個參數 <code class="hm hn ho hp hq b">data</code> ，捕獲 Client 端發送的訊息：

```javascript
wss.on('connection', ws => {
    console.log('Client connected')

    //對 message 設定監聽，接收從 Client 發送的訊息
    ws.on('message', data => {
        //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
        ws.send(data)
    })

    ws.on('close', () => {
        console.log('Close connected')
    })
})
```

### 回到 Client 端 - 處理接收發送訊息

剛剛處理完 Server ，要換回 Client 端使用 <code class="hm hn ho hp hq b">onmessage</code> 處理接收及 <code class="hm hn ho hp hq b">send</code> 送出訊息：

```javascript
let ws = new WebSocket('ws://localhost:3000')

ws.onopen = () => {
    console.log('open connection')
}

ws.onclose = () => {
    console.log('close connection')
}

//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log(event)
}
```

<code class="hm hn ho hp hq b">onmessage</code> 指定的函式中多了一個參數 <code class="hm hn ho hp hq b">event</code> ，裡面會有這次溝通的詳細訊息，從 Server 回傳的資料會在 <code class="hm hn ho hp hq b">event</code> 的 <code class="hm hn ho hp hq b">data</code> 屬性中。

但是上方的程式碼還沒有增加在 Client 中發送訊息的 <code class="hm hn ho hp hq b">send</code> ，因此下方在連接到 <code class="hm hn ho hp hq b">WebSocket</code> 後直接在 <code class="hm hn ho hp hq b">console</code> 中發送，並確認回傳訊息：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/3832/1*oL40RiJz591Lbn4vrSBOHg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Server 接收 Client 發送的訊息後再回傳</span>
          </div></div><br/>

不過上面看起來還是以 Client 做 <code class="hm hn ho hp hq b">send</code> 發送訊息給 Server 處理過才得到回傳資料，該怎麼從 Server 上直接發送呢？很簡單，只需要透過 <code class="hm hn ho hp hq b">setInterval</code> 就能讓 Server 在固定時間發送資料給 Client ，例如下方的例子：

```javascript
wss.on('connection', ws => {
    console.log('Client connected')

    //固定送最新時間給 Client
    const sendNowTime = setInterval(()=>{
        ws.send(String(new Date()))
    },1000)

    ws.on('message', data => {
        ws.send(data)
    })

    ws.on('close', () => {
        //連線中斷時停止 setInterval
        clearInterval(sendNowTime)
        console.log('Close connected')
    })
})
```

Client 連結後的結果如下：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/2076/1*AHKxAKEo8YuDePJjzDNtmQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>不斷接收 Server 主動傳遞的訊息</span>
          </div></div><br/>

### 最後一次回到 Server - 多人連線

通常 <code class="hm hn ho hp hq b">WebSocket</code> 都會運用在聊天室，但是就剛剛的使用方式來說，今天 ClientA 和 ClientB 都連結同一個 Server ，而他們各自在 Client 使用 <code class="hm hn ho hp hq b">send</code> 發送資料給 Server ， 在這個情況下 Server 只會依據兩個 Client 各自發送的內容，再分別回傳給 ClientA 和 ClientB ，並無法讓 ClientB 能夠在 ClientA 發送訊息時也收到回傳的資料。

例如以下例子，用兩個視窗開啟 Client 並各自發送請求：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/1276/1*ZIy6Qp5D3qkUWhpstPdKTg.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>客戶端無法共享 Server 發送的訊息</span>
          </div></div><br/>

那該怎麼像廣播一樣，當我在某一個 Client 發送訊息時，讓 Server 告知所有其他同時連接中的 Client 都知道我對 Server 發送這個訊息，也同時接收到 Server 回傳的資料呢？

答案就在一開始下載的套件 <code class="hm hn ho hp hq b">ws</code> 中，它可以使用 <code class="hm hn ho hp hq b">clients</code> 找出當前所有連結中的 Client 資訊，並透過迴圈將訊息發送至每一個 Client 中：

```javascript
wss.on('connection', ws => {
    console.log('Client connected')

    ws.on('message', data => {
        //取得所有連接中的 client
        let clients = wss.clients

        //做迴圈，發送訊息至每個 client
        clients.forEach(client => {
            client.send(data)
        })
    })

    ws.on('close', () => {
        console.log('Close connected')
    })
})
```

這麼一來，不論是哪個 Client 端發送訊息， Server 都會將訊息回覆給所有連接中的 Client ：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/1276/1*9ETT853cZxzHKDcBfBCyqA.gif" role="presentation"></div><br/>

### 補充內容

雖然在 <code class="hm hn ho hp hq b">WebSocket</code> 的協定上 Client 和 Server 不需再通過 <code class="hm hn ho hp hq b">Request</code> ，因此在開發人員工具中的 <code class="hm hn ho hp hq b">Network</code> 中就看不到 <code class="hm hn ho hp hq b">Request</code> 的資料，但是取而代之的是，那些傳遞過程可以透過第一次要求連接時的 <code class="hm hn ho hp hq b">Request</code> 中觀察：

<div><img class="dz t u jy ak" src="https://miro.medium.com/max/2124/1*b-CROiddSOb1YWQnbUHJTA.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>觀察在 WebSocket 協定的傳輸方式</span>
          </div></div><br/>

關於 <code class="hm hn ho hp hq b">WebSocket</code> 從 Client 或是 Server 在 <code class="hm hn ho hp hq b">send</code> 資料時，除了字串外還可以使用 <code class="hm hn ho hp hq b"><a href="https://developer.mozilla.org/en-US/docs/Web/API/USVString" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">USVString</a></code> 、 <code class="hm hn ho hp hq b"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">ArrayBuffer</a></code> 、 <code class="hm hn ho hp hq b"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">Blod</a></code> 和 <code class="hm hn ho hp hq b"><a href="https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">ArrayBufferView</a></code> 等型態（這部分感謝 <a class="dj by jm jn jo jp" target="_blank" rel="noopener" href="/@cgh20xx?source=responses---------0---------------------">Hank Hsiao</a> 留言提醒）。

另外，要傳送 <code class="hm hn ho hp hq b">JSON</code> 的資料的時，記得在 <code class="hm hn ho hp hq b">send</code> 中做 <code class="hm hn ho hp hq b">JSON.stringify</code> ，接收到時再用 <code class="hm hn ho hp hq b">JSON.parse</code> 轉成物件處理即可！

如果想找個伺服器部署 <code class="hm hn ho hp hq b">WebSocket</code> ，可以參考「<a class="dj by jm jn jo jp" target="_blank" rel="noopener" href="/heroku-deploy/">Heroku | 搭配 Git 在 Heroku 上部署網站的手把手教學</a>」

---

本文介紹了 <code class="hm hn ho hp hq b">WebSocket</code> 的基本使用方式及一些例子，希望能夠減少各位研究的時間，這幾天還會接著研究如何搭配 <code class="hm hn ho hp hq b">React</code> 。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考文章

<ol>
<li id="0fc8" class="gy gz em at ha b hb ig hd ih hf ii hh ij hj ik hl la lb lc"><a href="https://devcenter.heroku.com/articles/node-websockets" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">https://devcenter.heroku.com/articles/node-websockets</a></li><li id="0839" class="gy gz em at ha b hb ld hd le hf lf hh lg hj lh hl la lb lc"><a href="http://www.ruanyifeng.com/blog/2017/05/websocket.html" class="dj by jm jn jo jp" target="_blank" rel="noopener nofollow">http://www.ruanyifeng.com/blog/2017/05/websocket.html</a></li>
</ol>
---
layout: post
title: React | 在 React 中使用 WebSocket - feat. Socket.io 基本教學
image: img/React.jpg
author: GQSM
date: 2019-03-08T17:35:55.149Z
draft: false
tags: 
  - React
---

## 前言

這次的標題有點複雜和騙人，文章內主要是在 <code class="hf ip iq ir is b">React</code> 中搭配 <code class="hf ip iq ir is b">Socket.io</code> 做使用，而 <code class="hf ip iq ir is b">Socket.io</code> 是一個現成的 <code class="hf ip iq ir is b">WebSocket</code> 套件，儘管它不是真正的 <code class="hf ip iq ir is b">webSocket</code> 協定，但 <code class="hf ip iq ir is b">socket.io</code> 還是實現了 <code class="hf ip iq ir is b">webSocket</code> 及增加許多方便的功能。

如果還不了解 <code class="hf ip iq ir is b">WebSocket</code> 的讀者，可以先參考「<a class="cx ga iy iz ja jb" target="_blank" rel="noopener" href="http://localhost:8000/js-websocket/">JavaScript | WebSocket 讓前後端沒有距離</a>」文章內解說的原生使用方式，當然也能直接選擇學習 <code class="hf ip iq ir is b">Socket.io</code> 就好，但文中的例子都會以 <code class="hf ip iq ir is b">React</code> 的<code class="hf ip iq ir is b">Function Component</code> 配合 <code class="hf ip iq ir is b">Hooks</code> 撰寫，就不再另外列舉在一般 <code class="hf ip iq ir is b">HTML</code> 的用法。

另外， Server 方面會以 <code class="hf ip iq ir is b">Node.js</code> 建置，還沒碰過 <code class="hf ip iq ir is b">Node.js</code> 的話也能參考「<a href="https://ithelp.ithome.com.tw/articles/10199058" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow">[筆記][node.js]第一次建置node.js開發環境和安裝npm就上手！</a>」建置環境，有任何問題再麻煩留言告訴我，謝謝！

---

## Socket.io

<code class="hf ip iq ir is b">socket.io</code> 分成兩個主要的部分，一個是負責在 Server 端啟動 <code class="hf ip iq ir is b">WebSocket</code> 服務的 <code class="hf ip iq ir is b">socket.io</code> 和在 Client 端做連結處理的 <code class="hf ip iq ir is b">socket.io-client</code> ，因此使用時便不需要再尋找 Server 及 Client 各需要哪些套件，一切都交給 <code class="hf ip iq ir is b">socket.io</code> 就行了。

### 基本溝通方式解說

下方會先從建立 Server 的 <code class="hf ip iq ir is b">socket.io</code> 開始敘述，再解釋兩邊的互動方式。

### Server

以 <code class="hf ip iq ir is b">npm init</code> 建立一個專案後，透過下列指令安裝 <code class="hf ip iq ir is b">express</code> 和 <code class="hf ip iq ir is b">socket.io</code> ：

<pre><span id="b296" class="jq hr ea ar is b fd ke kf r kg">npm install express<br>npm install socket.io</span></pre></br>

安裝完後在專案內建立一個 <code class="hf ip iq ir is b">server.js</code> ，用來做專案的進入點運行 Server：

```javascript
const express = require('express')
const app = express()

//將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
const server = require('http').Server(app)
    .listen(3000,()=>{console.log('open server!')})

//將啟動的 Server 送給 socket.io 處理
const io = require('socket.io')(server)

/*上方為此寫法的簡寫：
  const socket = require('socket.io')
  const io = socket(server)
*/

//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on('connection', socket => {
    //經過連線後在 console 中印出訊息
    console.log('success connect!')
    //監聽透過 connection 傳進來的事件
    socket.on('getMessage', message => {
        //回傳 message 給發送訊息的 Client
        socket.emit('getMessage', message)
    })
})
```

<code class="hf ip iq ir is b">server.js</code> 內有幾點需要注意的地方：

<ol>
<li id="6525" class="ib ic ea ar id b ie it ig iu ii iv ik iw im ix io ki kj kk">如果是使用 <code class="hf ip iq ir is b">socket.io</code> 套件，因為它不是真正的 <code class="hf ip iq ir is b">webSocket</code> 協定，所以還是得使用 <code class="hf ip iq ir is b">http</code> 啟動 Server ，再把 Server 物件送給 <code class="hf ip iq ir is b">socket.io</code> ，處理過後會得到一個物件 <code class="hf ip iq ir is b">io</code> ，可以用它的 <code class="hf ip iq ir is b">on</code> 監聽開啟連線後的設定。</li><li id="9a62" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">如果 <code class="hf ip iq ir is b">io</code> 監聽到有訊息從 Client 傳到 Server 時，會將捕捉到的事件內容 <code class="hf ip iq ir is b">socket</code> 物件傳至 <code class="hf ip iq ir is b">connection</code> 後的 <code class="hf ip iq ir is b">function</code> 中。</li><li id="a0d3" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">被傳入 <code class="hf ip iq ir is b">connection</code> 中的 <code class="hf ip iq ir is b">socket</code> 也可以自訂監聽 <code class="hf ip iq ir is b">message</code> 的類型，例如上方的 <code class="hf ip iq ir is b">getMessage</code> 就是筆者自行設定的類型名稱， <code class="hf ip iq ir is b">socket.io</code> 只會觸發對應的監聽 <code class="hf ip iq ir is b">Function</code>。</li><li id="f844" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk"><code class="hf ip iq ir is b">socket.emit</code> 為回覆訊息給 Client 的 <code class="hf ip iq ir is b">Function</code> ，它第一個參數為訊息類型，這個和 Server 的監聽名稱一樣，在 Client 端也只有設定監聽類型為 <code class="hf ip iq ir is b">getMessage</code> 的 <code class="hf ip iq ir is b">Function</code> 才會觸發，而第二個為訊息內容。</li>
</ol>

如果上方有不了解的部分，可以先大略看過，配合 Client 的運作一起看會更清楚。

完成 Server 的部分後可以先輸入以下指令運行：

<pre><span id="0cc1" class="jq hr ea ar is b fd ke kf r kg">node server.js //server.js 為檔名</span></pre></br>

如果程式沒有問題，那應該會在運行後出現 <code class="hf ip iq ir is b">open server!</code>：

<div><img class="s t u hb ai" src="https://miro.medium.com/max/1896/1*d8HW5xzPhctTK9EDDJIT-g.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>在 3000 port 上執行 server</span>
          </div></div><br/>

### Client

Client 端另外開一個專案， <code class="hf ip iq ir is b">React</code> 的環境就不再另外講解，可以參考「<a href="https://ithelp.ithome.com.tw/articles/10200329" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow">webpack&amp;React開發環境篇(1)</a>」和「<a href="https://ithelp.ithome.com.tw/articles/10200459" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow">webpack&amp;React開發環境篇(2)</a>」上下兩篇搭建，那除了 <code class="hf ip iq ir is b">React</code> 的部分還需要下載 <code class="hf ip iq ir is b">socket.io-client</code> ：

<pre><span id="120a" class="jq hr ea ar is b fd ke kf r kg">npm install socket.io-client</span></pre></br>

下載後，就能開始實做一個連結 <code class="hf ip iq ir is b">webSocket</code> 並能夠發送及接收訊息的 <code class="hf ip iq ir is b">component</code> ：

```javascript
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'

const Main = () => {
    const [ws,setWs] = useState(null)

    const connectWebSocket = () => {
        //開啟
        setWs(webSocket('http://localhost:3000'))
    }

    useEffect(()=>{
        if(ws){
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            initWebSocket()
        }
    },[ws])

    const initWebSocket = () => {
        //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        ws.on('getMessage', message => {
            console.log(message)
        })
    }

    const sendMessage = () => {
        //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        ws.emit('getMessage', '只回傳給發送訊息的 client')
    }

    return(
        <div>
            <input type='button' value='連線' onClick={connectWebSocket} />
            <input type='button' value='送出訊息' onClick={sendMessage} />
        </div>
    )
}

ReactDom.render(<Main />, document.getElementById('root'))
```

關於此 <code class="hf ip iq ir is b">component</code> 的架構可以分為幾下幾塊：

<ol>
<li id="87f2" class="ib ic ea ar id b ie it ig iu ii iv ik iw im ix io ki kj kk">使用 <code class="hf ip iq ir is b">useState</code> 在 <code class="hf ip iq ir is b">component</code> 內建立一個 <code class="hf ip iq ir is b">state</code> <code class="hf ip iq ir is b">ws</code> ，當使用者點擊「連線」按鈕時觸發 <code class="hf ip iq ir is b">connectWebSocket</code> ，觸發後透過從 <code class="hf ip iq ir is b">socket.io-client</code> 套件中 <code class="hf ip iq ir is b">import</code> 的 <code class="hf ip iq ir is b">webSocket</code> 連線至剛剛執行 <code class="hf ip iq ir is b">server.js</code> 的 <code class="hf ip iq ir is b">http://localhost:3000</code> ，最後 <code class="hf ip iq ir is b">webSocket</code> 連線成功後會藉由 <code class="hf ip iq ir is b">setWs</code> 將 <code class="hf ip iq ir is b">WebSocket</code> 物件寫到 <code class="hf ip iq ir is b">ws</code> 。</li><li id="6abb" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">連線後 <code class="hf ip iq ir is b">component</code> 的 <code class="hf ip iq ir is b">state</code> <code class="hf ip iq ir is b">ws</code> 就會改變，生命週期 <code class="hf ip iq ir is b">useEffect</code> 也會被觸發，觸發時先判斷 <code class="hf ip iq ir is b">ws</code> 內是否真的有值，因為 <code class="hf ip iq ir is b">useEffect</code> 在組件第一次 <code class="hf ip iq ir is b">render</code> 時就會先執行，但那時候 <code class="hf ip iq ir is b">ws</code> 還沒有連線所以是 <code class="hf ip iq ir is b">null</code> ，這時候還去執行 <code class="hf ip iq ir is b">initWebSocket</code> 就會發生錯誤，所以如果 <code class="hf ip iq ir is b">ws</code> 還是初始值 <code class="hf ip iq ir is b">null</code> 就不執行接下來的 <code class="hf ip iq ir is b">initWebSocket</code> 。</li><li id="4b89" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">在 <code class="hf ip iq ir is b">initWebSocket</code> 中替 <code class="hf ip iq ir is b">ws</code> 增加了監聽 <code class="hf ip iq ir is b">getMessage</code> 的訊息，當 Server 有發送以 <code class="hf ip iq ir is b">getMessage</code> 為名稱的訊息，就會在這裡被捕捉到，並在第二個參數中接收訊息，將訊息內容打印到 <code class="hf ip iq ir is b">console</code> 中。</li><li id="9f12" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">當我按下「送出訊息」按鈕時， <code class="hf ip iq ir is b">sendMessage</code> 中會以 <code class="hf ip iq ir is b">ws.emit</code> 送出訊息，而送出的除了訊息內容外，還有辨別他的名稱 <code class="hf ip iq ir is b">getMessage</code> 。</li>
</ol>

在第一點中需要注意的是 <code class="hf ip iq ir is b">ws://localhost:3000</code> 是無法正確與 Server 做<code class="hf ip iq ir is b">connection</code> 的，因為 <code class="hf ip iq ir is b">socket.io</code> 本身是 <code class="hf ip iq ir is b">http</code> 協定而不是 <code class="hf ip iq ir is b">WebSocket</code> ，如果要看更多協議可以參考 <code class="hf ip iq ir is b"><a href="https://github.com/socketio/socket.io-protocol#socketio-protocol" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow">socket.io</a></code><a href="https://github.com/socketio/socket.io-protocol#socketio-protocol" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow"> 的協議</a>。

看到這裡，就能夠將剛剛 Server 的程式碼拿來與 Client 一起講解兩邊溝通的流程了：

<ol>
<li id="257d" class="ib ic ea ar id b ie it ig iu ii iv ik iw im ix io ki kj kk">由 Client 以 <code class="hf ip iq ir is b">ws.emit(&apos;getMessage&apos;,&apos;訊息內容&apos;)</code> 將訊息送到 Server。</li><li id="4b9e" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">Server 藉由 <code class="hf ip iq ir is b">socket.on(&apos;getMessage&apos;,message=&gt;{/*執行動作*/})</code> 捕捉到訊息。</li><li id="cffd" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">Server 處理完訊息內容後再透過 <code class="hf ip iq ir is b">socket.emit(&apos;getMessage&apos;,&apos;訊息內容&apos;)</code> 將訊息傳給 Client 。</li><li id="ecb0" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk">最後 Client 會從 <code class="hf ip iq ir is b">ws.on(&apos;getMessage&apos;,message=&gt;{/*執行動作*/})</code> 的監聽取得 Server 傳來的訊息。</li>
</ol>

上面的過程都是以 <code class="hf ip iq ir is b">getMessage</code> 為該訊息取名字去送出及監聽捕捉，因此就不會像原生的 <code class="hf ip iq ir is b">WebSocket</code> ，如果要為訊息做分類就還得多做判斷，當然用 <code class="hf ip iq ir is b">socket.io</code> 的方便不只有這樣子而已，先看看上方程式碼的執行畫面，再講解更多有趣的地方：

<div><img class="s t u hb ai" src="https://miro.medium.com/max/1404/1*TY9WH2CwfJVaT_77Z-sSBg.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Server 回傳從 Client 中收到的訊息</span>
          </div></div><br/>

### 進階用法 - 群發

就上方的例子而言，眼尖的讀者應該有發現，筆者在使用 <code class="hf ip iq ir is b">socket.emit()</code> 將訊息從 Server 傳給 Client 的時候，訊息內容為「只回傳給發送訊息的 client 」，這也代表這段訊息不會同時讓其他連接著該 <code class="hf ip iq ir is b">WebSocket</code> 的 Client 收到，那該怎麼做才能讓所有 Client 都收到訊息呢？

其實 <code class="hf ip iq ir is b">socket.io</code> 針對要發送的對象，提供了其他方式：

```javascript
/*只回傳給發送訊息的 client*/
socket.emit('getMessage', message)

/*回傳給所有連結著的 client*/
io.sockets.emit('getMessageAll', message)

/*回傳給除了發送者外所有連結著的 client*/
socket.broadcast.emit('getMessageLess', message)
```

每種方式也都會固定帶著一個名稱被 Client 端監聽接收，如果沒有給名稱就不會被監聽給捕捉到，以下實作呈現這三種發送訊息的方式：

### Server

在 Server 端要因應不同的名稱來判斷回傳的方式，因此為幾個不同的名稱做加入監聽：

```javascript
io.on('connection', socket => {
  
    /*只回傳給發送訊息的 client*/
    socket.on('getMessage', message => {
        socket.emit('getMessage', message)
    })

    /*回傳給所有連結著的 client*/
    socket.on('getMessageAll', message => {
        io.sockets.emit('getMessageAll', message)
    })

    /*回傳給除了發送者外所有連結著的 client*/
    socket.on('getMessageLess', message => {
        socket.broadcast.emit('getMessageLess', message)
    })
  
})
```

### Client

在 Client 中，下方更改了 <code class="hf ip iq ir is b">sendMessage</code> 的內容，在呼叫的時候傳入 <code class="hf ip iq ir is b">name</code> 作為發送訊息的名稱，並在 <code class="hf ip iq ir is b">initWebSocket</code> 中多為幾個名稱設定監聽，以捕獲 Server 發送的訊息，最後在 <code class="hf ip iq ir is b">return</code> 裡添加了幾個按鈕分別發送不同名稱的訊息：

```javascript
const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    ws.on('getMessage', message => {
        console.log(message)
    })
    ws.on('getMessageAll', message => {
        console.log(message)
    })
    ws.on('getMessageLess', message => {
        console.log(message)
    })
}

const sendMessage = (name) => {
    ws.emit(name, '收到訊息囉！')
}

return (
    <div>
        <input type='button' value='連線' onClick={connectWebSocket} />
        <input type='button' value='送出訊息，只有自己收到回傳' onClick={() => { sendMessage('getMessage') }} />
        <input type='button' value='送出訊息，讓所有人收到回傳' onClick={() => { sendMessage('getMessageAll') }} />
        <input type='button' value='送出訊息，除了自己外所有人收到回傳' onClick={() => { sendMessage('getMessageLess') }} />
    </div>
)
```

調整完兩邊的程式後，執行結果如下：

<div><img class="s t u hb ai" src="https://miro.medium.com/max/1460/1*SCKCp3eNCR2l0sGNz4637g.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>透過不同的發送方式達到不同的結果</span>
          </div></div><br/>

### 進階用法 - 分組 ( room )

分組的意思就是為 Client 設定聊天室，在遊戲裡就像「頻道」、「分流」的概念， <code class="hf ip iq ir is b">socket.io</code> 能讓 Server 可以針對某個 <code class="hf ip iq ir is b">room</code> 傳送訊息，也可以自由地將 Client 加入或移除某個 <code class="hf ip iq ir is b">room</code> ，而在一般沒有設定 room 的狀態下，都會為每個 Client 預設一個 id 作為 <code class="hf ip iq ir is b">room</code> 。

### Client

這次從 Client 開始，在程式中加上一個下拉選單讓使用者選擇房間，選擇時會送出房間名稱給 Server ，並且為 <code class="hf ip iq ir is b">webSocket</code> 增加一個監聽，以接收從 Server 傳送過來的新訊息：

```javascript
const initWebSocket = () => {
  
    /*其餘程式碼省略*/
  
    //增加監聽
    ws.on('addRoom', message => {
        console.log(message)
    })
}

//選擇聊天室時觸發，如果有選擇那就將房間 id 送給 Server
const changeRoom = (event) => {
    let room = event.target.value
    if(room !== ''){
        ws.emit('addRoom', room)
    }
}

return (
    <div>
        //增加下拉選單選擇房間
        <select onChange={changeRoom}>
            <option value=''>請選擇房間</option>
            <option value='room1'>房間一</option>
            <option value='room2'>房間二</option>
        </select>
        
        {/*其餘程式碼省略*/}     

    </div>
)
```

### Server

當 Server 端接收到訊息時，可以使用 <code class="hf ip iq ir is b">socket.join</code> 將房間 id 加到該 Client 的 <code class="hf ip iq ir is b">room</code> 物件中，並發送訊息給相同房間 id 的 Client ，而發送的訊息又有分成兩種：

```javascript
io.on('connection', socket => {

    /*其餘程式碼省略*/
    
    socket.on('addRoom', room => {
        socket.join(room)
        //(1)發送給在同一個 room 中除了自己外的 Client
        socket.to(room).emit('addRoom', '已有新人加入聊天室！')
        //(2)發送給在 room 中所有的 Client
        io.sockets.in(room).emit('addRoom', '已加入聊天室！')
    })
})
```

以下分別展示兩種傳遞的結果：

發送給在同一個 <code class="hf ip iq ir is b">room</code> 中除了自己外的 Client ：

<div><img class="s t u hb ai" src="https://miro.medium.com/max/1460/1*2SLEXrfZbJkbot7m5t6c3A.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>發送給在同一個 <code class="hf ip iq ir is b">room</code> 中除了自己外的 Client</span>
          </div></div><br/>

發送給在 room 中所有的 Client ：

<div><img class="s t u hb ai" src="https://miro.medium.com/max/1460/1*LcsYqAEQ584FPmH7OqHAFQ.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>發送給在 room 中所有的 Client</span>
          </div></div><br/>

需要注意的是如上方所說，一開始連線的時候 <code class="hf ip iq ir is b">socket.io</code> 會為每個 Client 預設 id 在 <code class="hf ip iq ir is b">room</code> 裡，所以取出 <code class="hf ip iq ir is b">room</code> 的時候不會只有 <code class="hf ip iq ir is b">socket.join</code> 進去的房間 id ，還會有預設的 id ，因此下方的程式將對 <code class="hf ip iq ir is b">room</code> 物件所有的 <code class="hf ip iq ir is b">key</code> 做迴圈，取出原本 id 以外的值就是另外 <code class="hf ip iq ir is b">socket.join</code> 的房間 id 了：

```javascript
//取得 rooms 物件，包含了預設 id 及另外 join 的資料
const rooms = socket.rooms

//將值取出來，尋找預設 id 外的值就能取到 join 的 id
let room = Object.keys(rooms).find(room =>{
    return room !== socket.id
})
```

另外再補充 <code class="hf ip iq ir is b">socket.join</code> 是非同步的事件，因此如果要在確定 <code class="hf ip iq ir is b">join</code> 後再執行某些事得這麼做：

```javascript
socket.join(room,()=>{
  //do something...
})
```

最後，當 Client 更換或離開聊天室時，得使用 <code class="hf ip iq ir is b">socket.leave</code> 移除在 <code class="hf ip iq ir is b">socket.rooms</code> 的 id ：

```javascript
socket.on('addRoom', room => {
    //加入前檢查是否已有所在房間
    const nowRoom = Object.keys(socket.rooms).find(room =>{
        return room !== socket.id
    })
    //有的話要先離開
    if(nowRoom){
        socket.leave(nowFoom)
    }
    //再加入新的
    socket.join(room)
    io.sockets.in(room).emit('addRoom', '已有新人加入聊天室！')
})
```

### 中斷連線

當 Client 要與 Server 中斷連線時，可以在 Client 端使用 <code class="hf ip iq ir is b">.close()</code> 這個函式，中斷後會觸發在 Server 端的 <code class="hf ip iq ir is b">disconnect</code> 這個名稱的事件，但是中斷後便無法再透過此連結送出訊息到其他 Client 通知「某使用者已離開」，因此下方先透過送出一個訊息到 Server ，等通知完其他 Client 後，再送訊息到提出中斷連線的 Client 執行 <code class="hf ip iq ir is b">.close()</code> ，以下實作：

### Server

以 <code class="hf ip iq ir is b">disConnection</code> 監聽申請中斷的事件，再以 <code class="hf ip iq ir is b">leaveRoom</code> 通知 <code class="hf ip iq ir is b">room</code> 裡的所有 Client 及 <code class="hf ip iq ir is b">disConnection</code> 向提出中斷的 Client 送出訊息請它做 <code class="hf ip iq ir is b">.close()</code> ：

```javascript
io.on('connection', socket => {
    
    /*其餘程式碼省略*/

    //送出中斷申請時先觸發此事件
    socket.on('disConnection', message => {
        const room = Object.keys(socket.rooms).find(room => {
            return room !== socket.id
        })
        //先通知同一 room 的其他 Client
        socket.to(room).emit('leaveRoom', `${message} 已離開聊天！`)
        //再送訊息讓 Client 做 .close()
        socket.emit('disConnection', '')
    })

    //中斷後觸發此監聽
    socket.on('disconnect', () => {
        console.log('disconnection')
    })
})
```

### Client

新增一個「斷線」的按鈕觸發 <code class="hf ip iq ir is b">disConnectWebSocket</code> ，讓它送訊息給 Server 告知要斷線， <code class="hf ip iq ir is b">leaveRoom</code> 及 <code class="hf ip iq ir is b">disConnection</code> 分別用來接收某個 Client 離開的通知及通知完後關閉連線：

```javascript
const disConnectWebSocket = () =>{
    //向 Server 送出申請中斷的訊息，讓它通知其他 Client
    ws.emit('disConnection', 'XXX')
}

const initWebSocket = () => {

    /*其餘程式碼省略*/
  
    //以 leaveRoom 接收有使用者離開聊天的訊息
    ws.on('leaveRoom', message => {
        console.log(message)
    })
    // Server 通知完後再傳送 disConnection 通知關閉連線
    ws.on('disConnection', () => {
        ws.close()
    })
}

return (
    <div>
        {/*其餘省略*/}
        <input type='button' value='斷線' onClick={disConnectWebSocket} />
        {/*其餘省略*/}
    </div>
)
```

執行結果如下：

<div><img class="s t u hb ai" src="https://miro.medium.com/max/1460/1*VSJkaD7JHrO_IfnCX5o8nw.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>中斷連線後便無法再與 Server 溝通</span>
          </div></div><br/>

---

本文不知不覺就打了有點多，提到了 <code class="hf ip iq ir is b">socket.io</code> 的基本用法、群發、聊天室，這些都是在實務上都滿有機會會碰到的技術，也搭配了 <code class="hf ip iq ir is b">React</code> 做使用，希望這篇文章能夠讓各位對 <code class="hf ip iq ir is b">socket.io</code> 或搭配 <code class="hf ip iq ir is b">React</code> 時的使用方式有些概念。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考文章

<ol>
<li id="7fe4" class="ib ic ea ar id b ie it ig iu ii iv ik iw im ix io ki kj kk"><a href="https://socket.io/docs/server-api/" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow">https://socket.io/docs/server-api/</a></li><li id="ca63" class="ib ic ea ar id b ie kl ig km ii kn ik ko im kp io ki kj kk"><a href="https://socket.io/docs/client-api/#socket-connected" class="cx ga iy iz ja jb" target="_blank" rel="noopener nofollow">https://socket.io/docs/client-api/#socket-connected</a></li>
</ol>
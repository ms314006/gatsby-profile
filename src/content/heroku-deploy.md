---
layout: post
title: Heroku | 搭配 Git 在 Heroku 上部署網站的手把手教學 feat. NodeJs
image: img/heroku-deploy.jpg
author: GQSM
date: 2019-02-21T15:49:59.149Z
draft: false
tags: 
  - Heroku
  - Nodejs
---

## 前言

最早接觸到 Heroku 這個伺服器是在去年某個午後，那時候不知道發生什麼事，突然想用 Python 做一個有簡單功能的 Line 機器人，才發現這個好用的雲端伺服器，當初有將實作過程隨手記錄在 <a href="https://trello.com/home" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">Trello</a> 上，一直到這幾天比較有空才分享上來。

哦對了！文章內容或許會提到一些關於 Git 的使用方法，但是就算不會也沒關係，因為去年的我也還不會 &#x1F606;。

---

## Heroku

Heroku 不只支援 Python ，還有待會會以他做範例的 Node.js 及其他 Ruby 、 PHP 、 Go 等等，相關說明可以直接看<a href="https://www.heroku.com/what" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">官方介紹</a>或是<a href="https://zh.wikipedia.org/wiki/Heroku" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">維基百科</a>，因為這些都不是本篇文章的重點。

### 收費標準

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/4760/1*GtPQ_M7EJxKMDtrDGznWtw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>截圖自 Heroku 官方網站（ <a href="https://www.heroku.com/pricing" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">https://www.heroku.com/pricing</a> ）</span>
          </div></div><br/>

以個人用途而言， Heroku 會提供免費帳戶每個月 450 個小時的運行時間，如果開通信用卡，還會額外增加 550 個小時的免費時數，一個月以 720 小時計算，在只有一個 server 的情況下，免費帳戶的時數就能夠保持一整個月的運作了。

唯一的缺點是免費版每 30 分鐘未使用都會休眠一次，因此如果隔了一段時間未使用，需等待他從休眠時間中甦醒，時間大約 30 秒左右。

### 申辦帳號（<a href="https://signup.heroku.com/" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">申辦網址</a>）

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/3800/1*Gw28XbQzcWRudNDY1K21yg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>截圖自 Heroku 官方網站（ <a href="https://signup.heroku.com/" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">https://signup.heroku.com/</a> ）</span>
          </div></div><br/>

個人認為還不錯的地方大概是在申辦帳號的時候還不需要先綁定信用卡，當然，如果沒綁定的話一個月就是 450 小時。

### 建立應用程式

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/2848/1*oOPRmiP82aeJdwBG6oExuQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Heroku 登入後個人介面</span>
          </div></div><br/>

登入後的個人的介面非常簡潔，沒有多餘的資訊，接下來可以透過右上角「 New 」中的「 Create new app 」建立第一個應用程式：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1676/1*FywvbEFn5TSB0-cRdtAVgg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>點擊 Create new app 建立第一個應用程式</span>
          </div></div><br/>

在建立的過程中，需要注意的是應用程式名稱僅能使用小寫英文，且需未使用過的，如果有重複會像下圖出現警告文字，而、伺服器的地區僅能選擇美國或歐洲，填寫完畢後按下「Create app」建立：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/2852/1*xtk9yhfhJMfv8EhzVZJNIA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>如果有人使過該名稱便無法再使用</span>
          </div></div><br/>

### 建立專案

既然已經在 Heroku 上創建好空間了，接著就要將本機上的專案上傳，這裡筆者使用 Node.js 作為示例，專案可以到筆者的<a href="https://gitlab.com/GQSM/for-medium/tree/master/uploadHerokuNodeApp" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow"> GitLab 上下載</a>，若本身已有專案可以直接跳過這個步驟，或是電腦上還沒建置 Node.js 的開發環境也能參考「<a href="https://ithelp.ithome.com.tw/articles/10199058" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">[筆記][node.js]第一次建置node.js開發環境和安裝npm就上手！</a>」。

完成上方文章的內容後，應該會得到一個專案，如果是從 GitHub 上下載的就不需要再修改：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/3028/1*giobSBfFdKSrpyI0oxwiHQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>根據「<a href="https://ithelp.ithome.com.tw/articles/10199058" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">[筆記][node.js]第一次建置node.js開發環境和安裝npm就上手！</a>」文章完成的專案</span>
          </div></div><br/>

因為接下來要上傳至 Heroku ，因此要將本機端的設定都拿掉，將上方的內容改為下方：

```javascript
//引用'http'模組
const http = require('http');

//設定server網址，因為在本機端測試，所以輸入127.0.0.1
//const hostname = '127.0.0.1'  //上傳至伺服器需拿掉

//port 號會由 Heroku 給予，因此不再自行指定
const port = process.env.PORT || 3000;

//新增一個server並指定他的頁面資訊，內容為'Hello World!'
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

//監聽得到的 port 號開啟
server.listen(port, () => console.log(`Listening on ${port}`));

```

另外一點是 Heroku 並不曉得專案的入口由哪裡開始，所以在該專案目錄下輸入指令：

<pre><span id="d5c4" class="jl hs em at km b fh kn ko r kp">npm init -y</span></pre>
<br/>

執行成功後目錄中會多一個檔案 <code class="hc kq kr ks km b">package.json</code> ，檔案內有專案的資訊，在該文件內的 <code class="hc kq kr ks km b">scripts</code> 目前擁有一個屬性為 <code class="hc kq kr ks km b">test</code> ，現在為他再新增第二個屬性 <code class="hc kq kr ks km b">start</code> ，並指定專案的執行指令：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/2852/1*kUaVof4S0OuKDYLPXNsAsg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>在 scripts 中加上 start 並指定專案內執行的檔案</span>
          </div></div><br/>

### 創建 Git

處理完專案要開始進行上傳，這裡需要先安裝 Git 的執行環境，可以參考<a href="https://git-scm.com/book/zh-tw/v2/%E9%96%8B%E5%A7%8B-Git-%E5%AE%89%E8%A3%9D%E6%95%99%E5%AD%B8" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">官網上的安裝教學</a>。

安裝 Git 後，先設定基本資料，會記錄在上傳資訊中：

<pre><span id="0074" class="jl hs em at km b fh kn ko r kp">git config --global user.name &quot;上傳人名字&quot;<br>git config --global user.email 上傳mail</span></pre>
<br/>

設定完基本資料，即可在專案下輸入指令建立版本控管：

<pre><span id="6dc0" class="jl hs em at km b fh kn ko r kp">git init</span></pre>
<br/>

使用 <code class="hc kq kr ks km b">add</code> 來增加要上傳至 <code class="hc kq kr ks km b">Heroku</code> 的檔案，下方的 <code class="hc kq kr ks km b">.</code> 代表所有檔案，如果需要挑選也可以在 <code class="hc kq kr ks km b">add</code> 後輸入專案內的檔案名稱：

<pre><span id="1c66" class="jl hs em at km b fh kn ko r kp">git add .</span></pre>
<br/>

寫入版本中， <code class="hc kq kr ks km b">-m</code> 後方為該次版本的註解，可以記錄這一次的版本做了哪些事情：

<pre><span id="4c7c" class="jl hs em at km b fh kn ko r kp">git commit -m &apos;the first upload&apos;</span></pre>
<br/>

完成 <code class="hc kq kr ks km b">Git</code> 後要設定 Heroku 的部分，在這之前得先下載 <a href="https://devcenter.heroku.com/articles/heroku-cli" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">Heroku-cli</a> ，可以從官網中選擇符合電腦系統版本下載（<a href="https://devcenter.heroku.com/articles/heroku-cli" class="dj by hn ho hp hq" target="_blank" rel="noopener nofollow">任意門</a>）。

下載完後回到專案輸入指令，分別依提示輸入帳號及密碼登入 Heroku ：

<pre><span id="d156" class="jl hs em at km b fh kn ko r kp">heroku login</span></pre>
<br/>

驗證完身份後，就可以將 Heroku 上的應用程式和 Git 做連結：

<pre><span id="b7b0" class="jl hs em at km b fh kn ko r kp">heroku git:remote -a 這裡輸入各自 Heroku 的 App 名稱</span></pre>
<br/>

例如筆者上方建立在 Heroku 上的 App 名稱為 <code class="hc kq kr ks km b">gqtestfirstapp</code> ，那指令就如下：

<pre><span id="15d7" class="jl hs em at km b fh kn ko r kp">heroku git:remote -a gqtestfirstapp</span></pre>
<br/>

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/2060/1*bpRLPTUOfx3Ae4DAg8iOTg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>提示連結成功</span>
          </div></div><br/>

最後以 <code class="hc kq kr ks km b">push</code> 指令將專案上傳至 Heroku 上：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/2136/1*93vMRC9Fpv9w8MMVZNnbtw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Heroku 的上傳過程</span>
          </div></div><br/>

### 開啟網站

回到 Heroku 上的應用程式，在上方的頁籤點選 <code class="hc kq kr ks km b">Settings</code> ：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/4840/1*9YwjG8hsTqv7zBznUVjdIg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>應用程式內的 Settings 頁籤</span>
          </div></div><br/>

滑到該頁的最下面，會看到 Domain ：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/4900/1*M7ZNcc3akaarzZsdSjky_A.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>在 Settings 下的 Domain 資訊</span>
          </div></div><br/>

點擊該網址就可以瀏覽剛剛上傳的專案：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1680/1*rqucwJ4CLGq8ibfP61iJmQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>透過該 Domain 顯示的網頁</span>
          </div></div><br/>

之後如果專案有修改需要重新上傳的話，只需要執行「增加異動檔案」、「寫入一次版本」、「上傳至 Heroku」 三行指令即可：

<pre><span id="ca7c" class="jl hs em at km b fh kn ko r kp">git add .<br>git commit -m &apos;版本訊息&apos;<br>git push heroku master</span></pre>
<br/>

---

本文主要介紹了如何將專案上傳至 Heroku ，因為不想讓讀者感受到太大的壓力，因此盡量用了最簡單的方式講解過程，如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！
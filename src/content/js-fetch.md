---
layout: post
title: JavaScript | Fetch 讓 ES6 擁有一對翅膀-基礎教學
image: img/JavaScript-ES6.jpg
author: GQSM
date: 2019-02-06T22:02:10.149Z
draft: false
tags: 
  - JavaScript
  - ES6
---

## 前言

<span style="font-size: 26px; color: #696969; font-style:italic; line-height: 20px">「使用 Jquery 框架中的 Ajax 就能輕鬆做到了！」</span>

莫約幾年前，在 <code class="hm jc jd je jf b">ES6</code> 已推出卻又還沒有普及的時候，如果有人提到：「如何用 <code class="hm jc jd je jf b">JavaScript</code> 向 <code class="hm jc jd je jf b">server</code> 請求資料？」，一定會有人這麼留言回答。

沒錯！ <code class="hm jc jd je jf b">$.ajax</code> 幾乎是最簡單又容易上手的請求方式了，不只在底層做了許多處理，也不必再向原生 <code class="hm jc jd je jf b">JavaScript</code> 中又臭又長的 <code class="hm jc jd je jf b">XMLHttpRequest()</code> 請求物件低頭，甚至還幫忙處理了同步執行的模式，使用起來就像這樣：

```javascript
$.ajax({
    type: 'get',
    url: 'https://httpbin.org/get',
    success: result => {
        console.log(result)
    }
})
```

看起來很棒！對吧？但那都是幾年前了。

## 模組化（NPM &amp; Module）

近年前端工程在網頁上越來越吃重，投入前端框架的開發者（Developer）變多，讓以前一黨獨大的 <code class="hm jc jd je jf b">JQuery</code> 開始被多個許多小功能的框架給取代，因為 <code class="hm jc jd je jf b">JQuery</code> 擁有太多網站中用不到的 <code class="hm jc jd je jf b">function</code> ，但他們依然會被載入到網頁中。

面臨上述供給大於需求的情況，許多人便紛紛選擇只擁有自己需要功能的小框架，減少在 <code class="hm jc jd je jf b">Client</code> 端載入過多多餘的程式碼。

這些趨勢間接讓撰寫原生 <code class="hm jc jd je jf b">JavaScript</code> 的人直線增長，從 <code class="hm jc jd je jf b">ES6</code> 開始出現的 <code class="hm jc jd je jf b">Promise</code> 、 <code class="hm jc jd je jf b">Class</code> 許多新原生的語法出現，終於有一天， <code class="hm jc jd je jf b">XMLHttpRequest()</code> 請求開始走入歷史了（或是根本沒人認識他XD）…

---

## Fetch

<code class="hm jc jd je jf b">Fetch</code> 是 <code class="hm jc jd je jf b">ES6</code> 的新語法，主要是搭配 <code class="hm jc jd je jf b">Promise</code> （<a class="dj by ka kb kc kd" target="_blank" rel="noopener" href="/enjoy-life-enjoy-coding/javascript-從promise開始承諾的部落格生活-e20dba78732f">Promise 的基本用法</a>）來執行請求網站和請求後獲取 <code class="hm jc jd je jf b">Response</code> 的處理方式。

以下範例的請求都會從 <a href="http://httpbin.org/" class="dj by ka kb kc kd" target="_blank" rel="noopener nofollow">httpbin.org</a> 這個網站裡挑選，它提供了各種不同的請求方式，在練習時是個很棒的工具。

### GET

<code class="hm jc jd je jf b">GET</code> 是請求中最基本的類型，在 <code class="hm jc jd je jf b">Fetch</code> 中預設的請求類型也是 <code class="hm jc jd je jf b">GET</code> 用起來就像下方：

```javascript
fetch('https://httpbin.org/get')
    .then((response) => {
        console.log(response)
        return response.json()
        //return response.text()
    }).then((myJson) => {
        console.log(myJson)
    })
```

<code class="hm jc jd je jf b">Fetch</code> 接收了一個 <code class="hm jc jd je jf b">url</code> 作參數，並用 <code class="hm jc jd je jf b">then</code> 接收此次請求的相關資訊：

<div>
<img class="dz t u hi ak" src="https://miro.medium.com/max/3212/1*pTxI2uirqpdNK6OGrYNGag.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>關於該次請求的 response 內容</span>
          </div>
</div><br/>

資訊內包含了請求的 <code class="hm jc jd je jf b">url</code> 和用來判斷請求是否成功的 <code class="hm jc jd je jf b">status</code> 狀態等，在 <code class="hm jc jd je jf b">response</code> 中有兩個內建函式可以用來得到請求回傳的資料。

一個是上方 <code class="hm jc jd je jf b">then</code> 中 <code class="hm jc jd je jf b">return</code> 使用的 <code class="hm jc jd je jf b">.json()</code> ，能夠將回傳的資料以物件的方式傳給第二個 <code class="hm jc jd je jf b">then</code> 接收，另一個是 <code class="hm jc jd je jf b">.text()</code> ，當回傳的資料無法轉換為物件時，則會將請求資料以字串方式取出。

下方為第二個 <code class="hm jc jd je jf b">.then</code> 在 <code class="hm jc jd je jf b">console</code> 中印出的 <code class="hm jc jd je jf b">myJson</code> 內容，以及當使用 <code class="hm jc jd je jf b">.text()</code> 時的資料模樣：

<div>
<img class="dz t u hi ak" src="https://miro.medium.com/max/4180/1*JCATZx8-PiPLkL6E7RFtsg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>用 .json() 將 response 的請求資料取出</span>
          </div></div><br/>

<div>
<img class="dz t u hi ak" src="https://miro.medium.com/max/4128/1*beHToJ0Jz8dORnpfcearxA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>用 .text() 將 response 的請求資料取出</span>
          </div></div><br/>

### POST

與 <code class="hm jc jd je jf b">GET</code> 不同的是，使用 <code class="hm jc jd je jf b">POST</code> 請求時需另外在 <code class="hm jc jd je jf b">method</code> 屬性內指定 <code class="hm jc jd je jf b">POST</code> 方式，且多了 <code class="hm jc jd je jf b">body</code> 屬性指定要送出的資料：

```javascript
fetch('https://httpbin.org/post', {
    method: 'POST',
    body: JSON.stringify(
        {
            name: 'GQSM',
            age: 25
        }
    )
}).then((response) => {
    return response.json()
}).then((myJson)=>{
    console.log(myJson)
})
```

<code class="hm jc jd je jf b">Fetch</code> 在未指定請求方式的情況下都是使用 <code class="hm jc jd je jf b">GET</code> ，但是 <code class="hm jc jd je jf b">GET</code> 本身無法在請求中藉由 <code class="hm jc jd je jf b">body</code> 送出資料，因此在有 <code class="hm jc jd je jf b">body</code> 屬性的狀態下，未替 <code class="hm jc jd je jf b">method</code> 指定為 <code class="hm jc jd je jf b">POST</code> 或其他可帶 <code class="hm jc jd je jf b">body</code> 的請求方式時，會出現以下錯誤：

<div>
<img class="dz t u hi ak" src="https://miro.medium.com/max/3580/1*uylPEmLS2Rx9M4BupxqzTQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>預設的請求方式 GET 無法指定 body</span>
          </div></div><br/>

需要注意的是， <code class="hm jc jd je jf b">body</code> 內的資料需使用 <code class="hm jc jd je jf b">JSON.stringify</code> 將物件轉換成字串型態，否則 <code class="hm jc jd je jf b">server</code> 端會無法正確取得資料，以下是 <code class="hm jc jd je jf b">data</code> 送進 <code class="hm jc jd je jf b">server</code> 的差別：

<div>
<img class="dz t u hi ak" src="https://miro.medium.com/max/2416/1*MzqoimOIofho6J2Mx0fDVA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>未使用 JSON.stringify</span>
          </div></div><br/>

<div>
<img class="dz t u hi ak" src="https://miro.medium.com/max/2644/1*ygaq1njimK3iiqmw2IXY_Q.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>使用了 JSON.stringify</span>
          </div></div><br/>

未使用 <code class="hm jc jd je jf b">JSON.stringify</code> 的請求會直接將物件強制轉為字串，變成 <code class="hm jc jd je jf b">[object Object]</code> 送至 <code class="hm jc jd je jf b">server</code> ，使用了正確轉換的請求在 <code class="hm jc jd je jf b">server</code> 端則是能接收到正確的內容。

### 請求失敗

在 <code class="hm jc jd je jf b">Fetch</code> 中，請求失敗時不會有像 <code class="hm jc jd je jf b">$.ajax</code> 中有 <code class="hm jc jd je jf b">error</code> 可以直接捕捉，取而代之的是要以 <code class="hm jc jd je jf b">response</code> 的 <code class="hm jc jd je jf b">status</code> 的屬性值判斷，當 <code class="hm jc jd je jf b">status</code> 的值不等於 <code class="hm jc jd je jf b">200</code> 時，將在 <code class="hm jc jd je jf b">.then</code> 中使用 <code class="hm jc jd je jf b">throw</code> 創建一個錯誤，並由 <code class="hm jc jd je jf b">.catch</code> 接收錯誤內容處理：

```javascript
fetch('https://httpbin.org/status/500', {
}).then((response) => {
    if(response.status !== 200)
        throw new Error(response.status)
    return response.json()
}).then((myJson) => {
    console.log(myJson)
}).catch((error) => {
    console.log(`錯誤代碼為${error}`)
})
```

---

本文介紹了 <code class="hm jc jd je jf b">Fetch</code> 的基本用法及請求錯誤時的捕捉方式，雖然寫起來未必比 <code class="hm jc jd je jf b">$ajax</code> 還要簡單，但是從此以後也多了不需掛載 <code class="hm jc jd je jf b">JQuery</code> 轉為使用原生請求的選擇，唯一需要考量的是 <code class="hm jc jd je jf b">Fetch</code> 和 <code class="hm jc jd je jf b">Promise</code> 在瀏覽器上的支援度還太低，當換到 <code class="hm jc jd je jf b">IE</code> 時便完全無法使用。

不過就如前言所說的，目前投入前端框架的開發者有太多了，將來也會介紹筆者目前對處理請求使用的框架 <code class="hm jc jd je jf b">axios</code> ， <code class="hm jc jd je jf b">axios</code> 的使用方式和 <code class="hm jc jd je jf b">Fetch</code> 大同小異，在不考慮 <code class="hm jc jd je jf b">Promise</code> 的情況下，大幅度提高了瀏覽器的支援性，至少在 <code class="hm jc jd je jf b">IE11</code> 上也變得能夠使用，有興趣可以先至 <a href="https://github.com/axios/axios" class="dj by ka kb kc kd" target="_blank" rel="noopener nofollow">GitHub 上查看文檔</a>。

如果以上內容有任何問題，或是不理解的地方，都歡迎留言告訴我，謝謝大家！

參考文章

<ol>
<li id="cf48" class="in io em at iq b ir is it iu iv iw ix iy iz ja jb lc ld le"><a href="https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch#Body" class="dj by ka kb kc kd" target="_blank" rel="noopener nofollow">https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch#Body</a></li><li id="b18f" class="in io em at iq b ir lf it lg iv lh ix li iz lj jb lc ld le"><a href="https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/" class="dj by ka kb kc kd" target="_blank" rel="noopener nofollow">https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/</a></li>
</ol>
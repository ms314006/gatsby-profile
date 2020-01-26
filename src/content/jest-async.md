---
layout: post
title: Jest | 跨越同步執行的 Jest 測試
image: img/Jest.jpg
author: GQSM
date: 2019-03-27T00:06:20.149Z
draft: false
tags: 
  - Unit Testing
  - JavaScript
  - Jest
---

## 前言

上一篇「<a class="dj by iy iz ja jb" target="_blank" rel="noopener" href="/jest-base-tutorial/">讓 Jest 為你的 Code 做測試-基礎用法教學</a>」中提到了如何使用 <code class="hm jc jd je jf b">Jest</code> 做單元測試，但是 <code class="hm jc jd je jf b">JavaScript</code> 是屬於同步執行的程式碼，這種特性會使 <code class="hm jc jd je jf b">Jest</code> 在測試結果出現問題，本篇會針對這點來講解關於異步測試的方法。

---

## 異步測試

### 測試流程

首先建立一個用 <code class="hm jc jd je jf b">setTimeout</code> 的延遲模擬請求獲取資料的 <code class="hm jc jd je jf b">function</code> ，獲取後再將資料傳到 <code class="hm jc jd je jf b">callBack</code> 中執行。

這裡將函式 <code class="hm jc jd je jf b">fetchData</code> 放在 <code class="hm jc jd je jf b">./func/async.js</code> 中：

```javascript
//傳入一個 callBack 函數，在獲取資料時執行
const fetchData = (callBack) => {
    setTimeout(() => { 
        callBack('getData') 
    }, 3000)
}

//將該 fetchData 函式匯出
module.exports = {
    fetchData: fetchData
}
```

建立測試檔案 <code class="hm jc jd je jf b">./__test__/async.test.js</code> ，在檔案中匯入 <code class="hm jc jd je jf b">fetchData</code> ，並在 <code class="hm jc jd je jf b">callBack</code> 函式內設定斷言，測試 <code class="hm jc jd je jf b">fetchData</code> 回傳的資料是否符合期望值：

```javascript
let async = require('../funcs/async.js')

//建立測試
test('test async', () => {]
    //callBack 會在 fetchData 取得資料後執行
    const callBack = (data) => {
        expect(data).toBe('getData')
    }
    
    //將上方的 callBack 函式傳入 fetchData 中
    async.fetchData(callBack)
})
```

完成以上設置後，便可以執行測試了，這裡使用能夠產生覆蓋率報告的測試指令，會得到以下結果：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2348/1*MHX0_s7j43ZOskPYi7k9sQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>測試結果顯示正確，但覆蓋率卻不是 100 %</span>
          </div></div><br/>

可以看到結果是 <code class="hm jc jd je jf b">PASS</code> ，也就是說 <code class="hm jc jd je jf b">callBack</code> 接收到的斷言和我們期望的值相同，但是卻發現測試的覆蓋率卻不是 100 %，代表在 <code class="hm jc jd je jf b">fetchData</code> 中有些地方沒有執行到，測試就已經結束了，這時可以點開 <code class="hm jc jd je jf b">./coverage/Icov-report</code> 內關於 <code class="hm jc jd je jf b">async.js</code> 的執行報告來看：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2356/1*_l_TlHzblrccb6_q-5Hwqg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>在測試時根本沒跑進 callBack 中</span>
          </div></div><br/>

### 發現問題

經過上方的操作，可以發現就算在測試中 <code class="hm jc jd je jf b">JavaScript</code> 也是一如既往同步執行，不會等到 <code class="hm jc jd je jf b">callBack</code> 執行，也不會到設定的斷言，整個測試就已經結束了。

這裡可以將代碼改為更直接的方式測試：

```javascript
let async = require('../funcs/async.js')

test('test async', () => {
    const callBack = (data) => {
        //將斷言中的結果傳入空值，期望值為 'getData' 不變
        expect('').toBe('getData')
    }
    async.fetchData(callBack)
})
```

有興趣可以試試上方的測試，結果依然會是 <code class="hm jc jd je jf b">PASS</code> ，因為 <code class="hm jc jd je jf b">callBack</code> 函式根本就沒有執行到。

### 解決問題

雖然在 <code class="hm jc jd je jf b">JavaScript</code> 中，處理同步問題一直不是輕鬆的事情，但是 <code class="hm jc jd je jf b">Jest</code> 在執行測試的時候可以透過 <code class="hm jc jd je jf b">done()</code> 來應付這個狀況。

簡單來說，如果在測試裡有加入 <code class="hm jc jd je jf b">done()</code> ，那只要還沒執行到 <code class="hm jc jd je jf b">done()</code> 就不算結束測試，因此可以將它加入上方的程式裡：

```javascript
let async = require('../funcs/async.js')

//將 done 傳入測試中
test('test async', (done) => {
    const callBack = (data) => {
        expect(data).toBe('getData')

        //在 callBack 函式內的斷言後加上 done
        done()
    }
    async.fetchData(callBack)
})
```

加入 <code class="hm jc jd je jf b">done()</code> 後重新執行測試，就可以看到報告呈現了完美的一片綠光。

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2308/1*TL0MzoVpZW0FAPvgG-5QAg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>測試覆蓋率已達 100 %</span>
          </div></div><br/>

需要注意的是，如果測試中有傳入 <code class="hm jc jd je jf b">done</code> 但卻未執行它，那麼該測試結果就會出現 <code class="hm jc jd je jf b">FAIL</code> 失敗：

```javascript
let async = require('../funcs/async.js')

test('test async', (done) => {
    const callBack = (data) => {
        expect(data).toBe('getData')
    }
    async.fetchData(callBack)
})

```

執行測試結果如下：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2852/1*iJSfXFmId2Ci-_RkDAICxw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>測試時擁有參數 done 卻未執行，測試會產生錯誤</span>
          </div></div><br/>

### 使用 Promise

如果既有的程式碼已使用 <code class="hm jc jd je jf b">Promise</code> 處理同步，便不必再使用 <code class="hm jc jd je jf b">done</code> ，直接以 <code class="hm jc jd je jf b">.then</code> 接收 <code class="hm jc jd je jf b">Promise</code> 物件傳進 <code class="hm jc jd je jf b">resolve</code> 的結果即可：

```javascript
const promiseFetchData = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('getData')
        }, 3000)
    }) 
}

module.exports = {
    promiseFetchData: promiseFetchData
}
```

```javascript
let async = require('../funcs/async.js')

test('test promise async', ()=>{
    //return 是必須的，否則不會執行 .then 的內容
    return async.promiseFetchData()
        .then((data)=>{
            expect(data).toBe('getData')
        })
})
```

需要注意的是，在測試的 <code class="hm jc jd je jf b">function</code> 中必須加上 <code class="hm jc jd je jf b">return</code> ，否則測試不會跑進 <code class="hm jc jd je jf b">.then</code> 中，只會在 <code class="hm jc jd je jf b">Promise</code> 將結果送進 <code class="hm jc jd je jf b">resolve</code> 時就結束了，另外！當 <code class="hm jc jd je jf b">Promise</code> 中的結果跑進 <code class="hm jc jd je jf b">reject</code> 那測試也會產生錯誤。

測試結果得到 <code class="hm jc jd je jf b">PASS</code> ，覆蓋率也是 100 %：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/3676/1*ADb294uKDf2j0PmxraDOHA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>使用 Promise 測試的結果</span>
          </div></div><br/>

上述說明了成功的 <code class="hm jc jd je jf b">resolve</code> 在測試中用 <code class="hm jc jd je jf b">.then</code> 接收，而失敗的 <code class="hm jc jd je jf b">reject</code> 則是使用 <code class="hm jc jd je jf b">.catch</code> 處理接下來的動作，這部分和 <code class="hm jc jd je jf b">Promise</code> 的操作都相同，就不再闡述，如果對 <code class="hm jc jd je jf b">Promise</code> 不熟，可以參考「<a class="dj by iy iz ja jb" target="_blank" rel="noopener" href="/js-promise/">JacaScript | 從Promise開始承諾的部落格生活</a>」。

<code class="hm jc jd je jf b">Jest</code> 在 <code class="hm jc jd je jf b">expect</code> 內還另外擁有兩個內建屬性來針對 <code class="hm jc jd je jf b">Promise</code> 做處理，分別為 <code class="hm jc jd je jf b">resolves</code> 及 <code class="hm jc jd je jf b">rejects</code> ，他們會直接捕捉 <code class="hm jc jd je jf b">Promise</code> 傳進<code class="hm jc jd je jf b">resolve</code> 或 <code class="hm jc jd je jf b">reject</code> 的資料判斷是否符合期望值，這裡以 <code class="hm jc jd je jf b">rejects</code> 作為例子：

```javascript
const promiseErrorFetchData = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('error')
        }, 3000)
    }) 
}

module.exports = {
    promiseErrorFetchData: promiseErrorFetchData
}
```

測試時，直接將 <code class="hm jc jd je jf b">promiseErrorFetchData</code> 作為參數傳遞給 <code class="hm jc jd je jf b">expect</code> ，並透過 <code class="hm jc jd je jf b">expect</code> 的內建屬性 <code class="hm jc jd je jf b">rejects</code> 取得 <code class="hm jc jd je jf b">promiseErrorFetchData</code> 中 <code class="hm jc jd je jf b">Promise</code> 傳進 <code class="hm jc jd je jf b">reject</code> 的資料下斷言：

```javascript
test('test rejects in promise',()=>{
    //return 是必須的，否則不會等 Promise 執行到 reject 測試就結束了
    return expect(async.promiseErrorFetchData()).rejects.toBe('error')
})
```

這個方式筆者認為能夠更直覺性的使用 <code class="hm jc jd je jf b">Promise</code> 的測試，得到的結果也都和上方一樣，但主要還是配合團隊使用其中一種，才不會讓測試代碼顯得雜亂，當然！個人開發也是一樣。

---

本文針對異步請求在測試內產生的問題舉了幾個例子解決，但其實官網上還有提出一種使用 <code class="hm jc jd je jf b">async/await</code> 的方式，不過筆者還未學習到 <code class="hm jc jd je jf b">JavaScript</code> 中關於 <code class="hm jc jd je jf b">async</code> 及 <code class="hm jc jd je jf b">await</code> 的用法，因此怕現階段會誤導大家，就等日後使用到再回來補充文章內容。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考文章

<ol>
<li id="223c" class="ik il em at im b in kg ip kh ir ki it kj iv kk ix kw kx ky"><a href="https://jestjs.io/docs/en/asynchronous#async-await" class="dj by iy iz ja jb" target="_blank" rel="noopener nofollow">https://jestjs.io/docs/en/asynchronous#async-await</a></li>
</ol>
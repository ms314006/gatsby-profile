---
layout: post
title: Jest | 讓 Jest 為你的 Code 做測試-基礎用法教學
image: img/Jest.jpg
author: GQSM
date: 2019-03-25T00:06:45.149Z
draft: false
tags: 
  - Unit Testing
  - JavaScript
  - Jest
---

## 前言

單元測試是進入前端工程後一直很想學的技能，主要是做過測試能讓自己的程式碼維持一定的水準，尤其在團隊開發時，更不會在上線時因為沒注意到某個細節而產生 Bug ，導致專案出現問題。

---

## 單元測試

單元測試是指為專案中每個單一行為做測試，通常專案裡的最小單位都是一個 <code class="hm jm jn jo jp b">function</code> ，當每個 <code class="hm jm jn jo jp b">function</code> 經過測試，確保邏輯是正確的，那當他在專案裡運行時也就比較不會發生問題，且留下的測試文件也可以在團隊討論或交接時更清楚。

## Jest

用於前端的測試框架不是只有 <code class="hm jm jn jo jp b">Jest</code> ，選擇原因是因為筆者較擅長使用 <code class="hm jm jn jo jp b">React</code> ，而 <code class="hm jm jn jo jp b">Jest</code> 在測試方面和 <code class="hm jm jn jo jp b">React</code> 的整合度較佳。除了 <code class="hm jm jn jo jp b">Jest</code> 以外，常聽到的測試框架還有 <code class="hm jm jn jo jp b">mocha</code> 。

### 建立專案

首先到專案資料夾的目錄下，在 <code class="hm jm jn jo jp b">node.js</code> 環境下創建 <code class="hm jm jn jo jp b">npm</code> 專案：

<pre><span id="59a2" class="jq hy em at jp b fh ke kf r kg">npm init -y</span></pre>
<br/>

這時候在專案資料夾內會產生記錄著專案開發設定的 <code class="hm jm jn jo jp b">package.json</code> ，如果還不曉得如何安裝 <code class="hm jm jn jo jp b">node.js</code> 可以參考「<a href="https://ithelp.ithome.com.tw/articles/10199058" class="dj by km kn ko kp" target="_blank" rel="noopener nofollow">第一次建置node.js開發環境和安裝npm就上手！</a>」的說明。

### 下載套件

透過 <code class="hm jm jn jo jp b">npm</code> 套件管理工具下載 <code class="hm jm jn jo jp b">Jest</code> 測試框架到專案的執行環境中：

<pre><span id="8fa8" class="jq hy em at jp b fh ke kf r kg">npm install jest --save-dev</span></pre>
<br/>

### 設定測試指令

打開 <code class="hm jm jn jo jp b">package.json</code> ，可以看到剛剛下載的 <code class="hm jm jn jo jp b">Jest</code> 已經被記錄在 <code class="hm jm jn jo jp b">devDependencies</code> 中了：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2480/1*1zlNw85HMsBERXDIm1iWIw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>下載在開發環境的 Jest 會被記錄在 package.json 中</span>
          </div></div><br/>

在上圖第一行的 <code class="hm jm jn jo jp b">scripts</code> 是在 <code class="hm jm jn jo jp b">npm</code> 的開發環境中設定執行指令的地方，上方的 <code class="hm jm jn jo jp b">test</code> 便是預設的指令之一，可以直接把他的內容改掉，如下：

<pre><span id="c3b1" class="jq hy em at jp b fh ke kf r kg">scripts: {<br>    &quot;test&quot;: &quot;jest&quot;<br>}</span></pre>
<br/>

設定好後，只需在終端機中使用以下方式輸入，便能執行設定好的對應指令：

<pre><span id="d671" class="jq hy em at jp b fh ke kf r kg">npm run test //對應指令</span></pre>
<br/>

需要注意的是，如果是使用 <code class="hm jm jn jo jp b">npm</code> 的 <code class="hm jm jn jo jp b">scripts</code> 執行指令，那他的執行環境就是專案本身，尋找執行環境中的 <code class="hm jm jn jo jp b">Jest</code> 或其他套件執行。

換個說法，直接在終端機中輸入 <code class="hm jm jn jo jp b">jest</code> ，執行環境就不會在專案內，而是以全域為主，但是全域環境下並沒有安裝 <code class="hm jm jn jo jp b">Jest</code> 便會出錯，除非將 <code class="hm jm jn jo jp b">Jest</code> 安裝在全域中：

<pre><span id="483c" class="jq hy em at jp b fh ke kf r kg">npm install jest -g  // -g 代表全域</span></pre>
<br/>

### 建立測試

<code class="hm jm jn jo jp b">Jest</code> 在執行測試時，會尋找專案中副檔名為 <code class="hm jm jn jo jp b">.test.js</code> 結尾的檔案，但不限制要放在哪個資料夾，所以在根目錄新增一個 <code class="hm jm jn jo jp b">index.test.js</code> 建立第一個測試：

```javascript
test('Check the result of 5 + ', () => {
    expect(5 + 2).toBe(7)
})
```

把上方的 <code class="hm jm jn jo jp b">test</code> 當作一個函式，負責描寫一個單元測試，他擁有兩個參數：

<ol>
<li id="30c7" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix kt ku kv">第一個參數為「測試名稱」，能夠簡單描述這部分是在測試什麼邏輯或功能。</li><li id="8008" class="ik il em at im b in kw ip kx ir ky it kz iv la ix kt ku kv">第二個參數是一個函式，又稱斷言，函式內的 <code class="hm jm jn jo jp b">expect</code> 用來描述被測試的內容， <code class="hm jm jn jo jp b">toBe</code> 是測試內容的回傳值是否符合期望值，例如上方的測試內容為「5加上2期望會等於7」。</li>
</ol>

### 執行測試

在終端機中輸入在 <code class="hm jm jn jo jp b">scripts</code> 中設定好的指令：

<pre><span id="af77" class="jq hy em at jp b fh ke kf r kg">npm run test</span></pre>
<br/>

執行後會顯示測試的結果：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2052/1*AWs8n889ow5TGARGJfTYFA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>通過 Jest 測試</span>
          </div></div><br/>

結果內會顯示 <code class="hm jm jn jo jp b">Jest</code> 測試了哪些 <code class="hm jm jn jo jp b">.test.js</code> 檔案，還有每個測試（ <code class="hm jm jn jo jp b">expect</code> ）內的結果（ <code class="hm jm jn jo jp b">toBe</code> ）是否正確符合，符合的話會輸出 PASS。

現在把 <code class="hm jm jn jo jp b">toBe</code> 內的數字改成 8 ，再進行一次測試：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2096/1*4SvI51e4bnaGhwpRKnguoA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>未通過 Jset 測試</span>
          </div></div><br/>

當測試失敗時， <code class="hm jm jn jo jp b">Jest</code> 會再結果中顯示哪個檔案內的測試有問題，並會提示正確的結果 <code class="hm jm jn jo jp b">Received</code> 。

這就是使用 <code class="hm jm jn jo jp b">Jest</code> 測試的基本方法，但實際上需要測試的函式都已經寫好了，並不會在 <code class="hm jm jn jo jp b">expect</code> 中寫下邏輯，因此可以直接在 <code class="hm jm jn jo jp b">expect</code> 中呼叫函式，測試結果的正確性，例如：

```javascript
//要測試的函式
const sum = (a, b) => {
    return a + b
}

test('Check the result of 5 + 2', () => {
    //在 expect 中呼叫函式測試結果
    expect(sum(5, 2)).toBe(7)
})
```

### 其他斷言

斷言的種類有很多，上方的 <code class="hm jm jn jo jp b">toBe</code> 只是其中一種測試方式，除此之外還有以下的斷言可以使用：

除了 <code class="hm jm jn jo jp b">toBe</code> 外，對字串還可以用 <code class="hm jm jn jo jp b">toMatch</code> 搭配正規表達式檢查：

```javascript
test('Use toMatch test',()=>{
    //搭配正規表達式
    expect('Happy new year.').toMatch(/new/)
})
```

確認物件是否等於期望值需使用 <code class="hm jm jn jo jp b">toEqual</code> ：

```javascript
test('Check the object type', () => {
    let peopleA = {
        name: 'GQSM'
    }
    peopleA.age = 25

    //測試字串
    expect(peopleA.name).toBe('GQSM')
    //測試物件
    expect(peopleA).toEqual({ name: 'GQSM', age: 25 })
})
```

預防函式回傳某個結果可以使用 <code class="hm jm jn jo jp b">not</code> ：

```javascript
test('Use not', () => {
    let peopleA = {
        name: 'GQSM'
    }
    //確認 name 不等於空
    expect(peopleA.name).not.toBe('')
    peopleA.name = ''
    //如果 name 是空的
    expect(peopleA.name).not.toBe('')
})
```

上方的第 9 行 <code class="hm jm jn jo jp b">peopleA.name</code> 是空的，而在使用 <code class="hm jm jn jo jp b">not</code> 的情況下結果需不等於期望值，所以不會通過測試：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1880/1*FTrtUdy0rQ3DyLfgVu3YYg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>使用 not 測試代表結果需不等於期望值</span>
          </div></div><br/>

確認數字結果的斷言：

```javascript
test('test integer', () => {
    //整數可以使用 toBe 或 toEqual 斷言
    expect(5).toBe(5)
    expect(5).toEqual(5)

    //測試輸出值是否大於期望值
    expect(5).toBeGreaterThan(4)

    //測試輸出值是否大於等於期望值
    expect(5).toBeGreaterThanOrEqual(5)

    //測試輸出值是否小於期望值
    expect(5).toBeLessThan(6)

    //測試輸出值是否小於期望值
    expect(5).toBeLessThanOrEqual(5)
})
```

需要注意在 <code class="hm jm jn jo jp b">JavaScript</code> 中的小數點運算會產生誤差，因此浮點數需要使用 <code class="hm jm jn jo jp b">toBeCloseTo</code> 做斷言，他會捨棄掉些微的誤差：

```javascript
test('Test float', () => {
    //會忽略些微的誤差
    expect(0.1 + 0.2).toBeCloseTo(0.3)
    //需完全相等
    expect(0.1 + 0.2).toBe(0.3)
})
```

上方使用 <code class="hm jm jn jo jp b">toBe</code> 會不通過測試，因為 <code class="hm jm jn jo jp b">toBe</code> 需要完全符合：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1852/1*_RriFb170IYrCpf53cyPhA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>JavaScript 的浮點數會出現誤差</span>
          </div></div><br/>

對陣列可以用 <code class="hm jm jn jo jp b">toContain</code> 判斷陣列內是否含有某值，或搭配迴圈對每個位置做斷言：

```javascript
test('For array test in jest',()=>{
    let arrA = ['A','B','C']

    //檢查陣列內是否含有某值
    expect(arrA).toContain('B')
    
    //搭配迴圈檢查每個位置都不等於空
    for(let i in arrA){
        expect(arrA[i]).not.toBe('')
    }
})
```

最後是用來判斷特殊值的斷言，例如 <code class="hm jm jn jo jp b">undefined</code> 、 <code class="hm jm jn jo jp b">null</code> 、 <code class="hm jm jn jo jp b">true</code> 等等：

```javascript
test('Special value',()=>{
    //期望值為 true
    expect(true).toBeTruthy()
    
    //期望值為 false
    expect(false).toBeFalsy()

    //期望值為 null
    expect(null).toBeNull()

    //期望值為 undefined
    expect(undefined).toBeUndefined()

    //期望值為 undefined 之外的值
    expect(null).toBeDefined()
})
```

### 產生覆蓋率報告

在測試的時候，會使用各種斷言來確認結果是否與期望值符合，但是如果測試的內容遺漏了某個條件分支，便無法確認該分支的邏輯性是否正確。

覆蓋率就是用來統計被測試的函式，程式碼的執行比例，當函式內所有程式都被測試過，那覆蓋率就會呈現 100% 。

另外， <code class="hm jm jn jo jp b">Jest</code> 內建的覆蓋率會以每個 <code class="hm jm jn jo jp b">JavaScript</code> 檔案統計，因此在產生前還需要將「函式」與「測試」檔案分開，如下：

建立 <code class="hm jm jn jo jp b">./funcs/func.js</code> 放要測試的函式：

```javascript
const sum = (a, b) => {
    if (b)
        return a + b
    else
        return a
}

module.exports = {
    sum: sum
}

```

<code class="hm jm jn jo jp b">func.js</code> 中的 <code class="hm jm jn jo jp b">sum</code> 有兩個分支，一個是在 <code class="hm jm jn jo jp b">b</code> 有值的時候回傳 <code class="hm jm jn jo jp b">a + b</code> ，另一個是在 <code class="hm jm jn jo jp b">b</code> 沒有值的情況下直接回傳 <code class="hm jm jn jo jp b">a</code> ，最後使用 <code class="hm jm jn jo jp b">module.exports</code> 將 <code class="hm jm jn jo jp b">sum</code> 匯出。

接著建立測試檔案 <code class="hm jm jn jo jp b">./__test__/index.test.js</code> ：

```javascript
let func = require('../funcs/func.js')

test('test sum',()=>{
    expect(func.sum(2)).toBe(2)
})
```

最後到 <code class="hm jm jn jo jp b">package.json</code> 中在 <code class="hm jm jn jo jp b">test</code> 的指令後加上 <code class="hm jm jn jo jp b">--coverage</code> ，讓 <code class="hm jm jn jo jp b">Jest</code> 執行完時同步產生測試報告，當然也可以另外設定新指令：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1236/1*oBshRyEA7MqE6bcTy0EJWQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>在 jest 後方加上 — coverage</span>
          </div></div><br/>

執行測試後，除了測試結果外，還會產生覆蓋率統計資訊：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2240/1*mySKJq81O_yJNiXG2TO0uw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>覆蓋率的統計資訊，由左至右分別為：語法、分支、函式數、行數</span>
          </div></div><br/>

也可以發現在專案目錄下多了一個叫做 <code class="hm jm jn jo jp b">converage</code> 的資料夾，裡面的 <code class="hm jm jn jo jp b">Icov-report</code> 內有個 <code class="hm jm jn jo jp b">index.html</code> ，打開後也可以看到相同的資訊：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2956/1*x6FX-dAQ9ASKyYQo1MI02w.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>./converage/Icov-report/index.html</span>
          </div></div><br/>

透過點擊 <code class="hm jm jn jo jp b">func.js</code> 可以確認更詳細的測試過程，包含是哪一行沒有執行，或每行各執行了幾次：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2544/1*FAqRZa5Y7pkZVNsPjMI4cQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>紅色區塊代表未執行，也就是未覆蓋的地方，行數上的 1x 代表測試中執行次數</span>
          </div></div><br/>

現在為 <code class="hm jm jn jo jp b">./funcs/func.js</code> 內的 <code class="hm jm jn jo jp b">sum</code> 增加一個斷言句，讓 <code class="hm jm jn jo jp b">Jest</code> 在測試時進入 <code class="hm jm jn jo jp b">sum</code> 的另一個分支：

```javascript
let func = require('../funcs/func.js')

test('test sum', () => {
    expect(func.sum(2)).toBe(2)
    //增加斷言
    expect(func.sum(2, 3)).toBe(5)
})
```

執行測試後再一次點開 <code class="hm jm jn jo jp b">converage</code> 內的 <code class="hm jm jn jo jp b">html</code> 測試報告：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2932/1*jKGnnS2NRRclsCww5AjS9g.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>覆蓋率已達 100%</span>
          </div></div><br/>

<code class="hm jm jn jo jp b">func.js</code> 的詳細執行資訊，在判斷 <code class="hm jm jn jo jp b">b</code> 是否有值的地方執行了兩次，且已經沒有還未覆蓋的區塊：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2636/1*S2KyOyMRuo6_5ZkPGAa2yw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>已經沒有未覆蓋的區塊了</span>
          </div></div><br/>

---

本文解釋了基本的 <code class="hm jm jn jo jp b">Jest</code> 測試，並簡單描述斷言庫和產生覆蓋率報告，今後的文章會繼續解釋 <code class="hm jm jn jo jp b">Jest</code> 提供的其他功能，一直到用於測試 <code class="hm jm jn jo jp b">React</code> 的 <code class="hm jm jn jo jp b">Component</code> 組件。

如果文章中有任何問題，或是不理解的地方，都歡迎留言告訴我，謝謝大家！

參考文章

<ol>
<li id="7c06" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix kt ku kv"><a href="https://jestjs.io/docs/en/getting-started" class="dj by km kn ko kp" target="_blank" rel="noopener nofollow">https://jestjs.io/docs/en/getting-started</a></li><li id="5158" class="ik il em at im b in kw ip kx ir ky it kz iv la ix kt ku kv"><a href="http://blog.404mzk.com/jest.html" class="dj by km kn ko kp" target="_blank" rel="noopener nofollow">http://blog.404mzk.com/jest.html</a></li><li id="547d" class="ik il em at im b in kw ip kx ir ky it kz iv la ix kt ku kv"><a href="https://zhuanlan.zhihu.com/p/28247899" class="dj by km kn ko kp" target="_blank" rel="noopener nofollow">https://zhuanlan.zhihu.com/p/28247899</a></li>
</ol>
---
layout: post
title: Jest | 替測試設置分類（describe）及作用域（scoping）
image: img/Jest.jpg
author: GQSM
date: 2019-03-26T00:05:48.149Z
draft: false
tags: 
  - Unit Testing
  - JavaScript
  - Jest
---

## 前言

關於 <code class="hm iy iz ja jb b">describe</code> ，在進行測試時其實是很基本的分類，但是因為 <code class="hm iy iz ja jb b">describe</code> 牽扯到了作用域，而在作用域內的 <code class="hm iy iz ja jb b">beforeAll</code> 和 <code class="hm iy iz ja jb b">afterAll</code> 等 <code class="hm iy iz ja jb b">Function</code> 又和 <code class="hm iy iz ja jb b">async</code> 異步測試有關，所以本篇文章的內容可能會需要先了解「<a class="dj by jc jd je jf" target="_blank" rel="noopener" href="/jest-async/">Unit Test | 跨越同步執行的 Jest 測試</a>」裡所提到的幾個用法，如果有任何問題再麻煩留言告訴我，謝謝！

---

## describe

在講解之前，可以先看一些基本的測試：

```javascript
const sum = (x = 0, y = 0) => {
    return (isNaN(x) ? 0 : x) + (isNaN(y) ? 0 : y)
}

const square = (x = 0) => {
    let intX = isNaN(x) ? 0 : x
    return intX * intX
}

test('Test default return zero', () => {
    expect(sum()).toBe(0)
})

test('Test 3 plus 5 is 8', () => {
    expect(sum(3, 5)).toBe(8)
})

test('Pass when value is NaN can return zero', () => {
    expect(sum(NaN, NaN)).not.toBeNaN()
})

test('Pass 3 can return 9', () => {
    expect(square(3)).toBe(9)
})

test('Pass when value is String can return zero', () => {
    expect(square('efg')).toBe(0)
})
```

上方對 <code class="hm iy iz ja jb b">sum</code> 做了三次測試， <code class="hm iy iz ja jb b">square</code> 做了一次，通過測試後得到了 <code class="hm iy iz ja jb b">PASS</code> 的結果：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1984/1*CNW23_5VkUjlswDrswj6fw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>所有測試內容混在一起，不容易看出是在測試什麼 Function</span>
          </div></div><br/>

所有的測試內容都會條列顯示，雖然可以清楚的知道在每一項測試中做了什麼事情，但卻無法曉得該測試是對哪個 <code class="hm iy iz ja jb b">Function</code> 做的，而就一般來說，測試檔案裡也不會只需測試一個 <code class="hm iy iz ja jb b">Function</code> 而已。

因此，需要把測試用 <code class="hm iy iz ja jb b">describe</code> 分類，讓測試者可以一眼就能知道哪些測試內容是對哪個 <code class="hm iy iz ja jb b">Function</code> 使用。

<code class="hm iy iz ja jb b">describe</code> 的使用方法很簡單，就像 <code class="hm iy iz ja jb b">test</code> 一樣，它會接收兩個參數，第一個是對 <code class="hm iy iz ja jb b">describe</code> 的描述，第二個是 <code class="hm iy iz ja jb b">Function</code> ，屬於此 <code class="hm iy iz ja jb b">describe</code> 的 <code class="hm iy iz ja jb b">test</code> 都放在該 <code class="hm iy iz ja jb b">Function</code> 中。

將上方的例子做分類會得到：

```javascript
/*函式部份省略*/

describe('Test sum', () => {
    test('Test default return zero', () => {
        expect(sum()).toBe(0)
    })

    test('Test 3 plus 5 is 8', () => {
        expect(sum(3, 5)).toBe(8)
    })

    test('Pass when value is NaN can return zero', () => {
        expect(sum(NaN, NaN)).not.toBeNaN()
    })
})

describe('Test square', () => {
    test('Pass 3 can return 9', () => {
        expect(square(3)).toBe(9)
    })

    test('Pass when value is String can return zero', () => {
        expect(square('efg')).toBe(0)
    })
})

```

經過分類後再進行測試，會更清楚每一項測試是在哪個 <code class="hm iy iz ja jb b">Function</code> 身上：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1848/1*LwsQWirkFZuvuchOEjl9bQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>經過分類後會更清楚每一項測試是在哪個 Function 身上</span>
          </div></div><br/>

## scoping

每個 <code class="hm iy iz ja jb b">.test.js</code> 測試檔案的內容就如一般的 <code class="hm iy iz ja jb b">JavaScript</code> ，依照 <code class="hm iy iz ja jb b">Function</code> 的範圍分成全域及區域的執行。

在測試中，執行範圍會影響到的除了變數外還有另外幾個 <code class="hm iy iz ja jb b">Jest</code> 提供的函式：

<ol>
<li id="ae81" class="ik il em at im b in jv ip jw ir jx it jy iv jz ix ke kf kg"><code class="hm iy iz ja jb b">beforeAll</code> ：所在區域內會第一個執行。</li><li id="e90e" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix ke kf kg"><code class="hm iy iz ja jb b">beforeEach</code> ：每一次的測試前會先執行。</li><li id="b303" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix ke kf kg"><code class="hm iy iz ja jb b">afterAll</code> ：所在區域內最後一個執行。</li><li id="e15a" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix ke kf kg"><code class="hm iy iz ja jb b">afterEach</code> ：每一次的測試後會馬上執行。</li>
</ol>

可由以下例子更清楚它們的執行順序：

```javascript
beforeAll(() => { console.log('全域 beforeAll ：全域的第一個順序執行') })
beforeEach(()=>{console.log('全域 beforeEach ：每次測試前都會執行，優先度大於區域的')})
afterAll(() => { console.log('全域 afterAll ：全域的最後一個順序執行') })
afterEach(()=>{console.log('全域 afterEach ：每次測試後都會執行，優先度低於區域的')})

describe('Test', () => {
    beforeAll(() => { console.log('區域 beforeAll ：區域的第一個順序執行') })
    beforeEach(()=>{console.log('區域 beforeEach ：每次測試前都會執行，優先度低於全域的')})
    afterAll(() => { console.log('區域 afterAll ：區域的最後一個順序執行') })
    afterEach(()=>{console.log('區域 afterEach ：每次測試後都會執行，優先度大於全域的')})

    test('Test1', () => {
        expect(true).toBe(true)
    })

    test('Test1', () => {
        expect(3).toBe(3)
    })
})


```

執行結果：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1968/1*atbUx-IqZaj7E_iz6KLrxw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>beforeAll , afterAll , beforeEach , afterEach 在全域及區域內的執行順序</span>
          </div></div><br/>

<code class="hm iy iz ja jb b">beforeAll</code> 和 <code class="hm iy iz ja jb b">afterAll</code> 一定是全域和區域內的第一個執行，而 <code class="hm iy iz ja jb b">beforeEach</code> 和 <code class="hm iy iz ja jb b">afterEach</code> 則會夾住 <code class="hm iy iz ja jb b">test</code> ，分別會在單一測試的前後執行，只要記住全域的 <code class="hm iy iz ja jb b">before</code> 一定是最先， <code class="hm iy iz ja jb b">after</code> 是最後。

在測試裡，可以利用 <code class="hm iy iz ja jb b">beforeAll</code> 或 <code class="hm iy iz ja jb b">beforeEach</code> 初建立測試資料，並在測試完後以 <code class="hm iy iz ja jb b">afterAll</code> 或 <code class="hm iy iz ja jb b">afterEach</code> 將資料給移除。

接著透過實際運用來理解這四個函式的使用方法：

```javascript
//模擬資料庫的資料
const userDB = [
    { id: 1, name: '小明' },
    { id: 2, name: '小華' },
]

//新增測試資料
const insertTestData = data => {
    userDB.push(data)
}

//移除測試資料
const deleteTestData = id => {
    let findIndex = userDB.findIndex((user) => {
        return user.id === id
    })
    if (findIndex !== -1)
        userDB.splice(findIndex, 1)
}

//查詢測試資料
const getUserData = id => {
    let goalData = userDB.find((user) => {
        return user.id === id
    })
    return goalData
}

//全部測試完後確認資料狀態
afterAll(() => {
    console.log(userDB)
})

describe('Test about user data', () => {

    //開始前新增測試資料
    beforeAll(() => {
        insertTestData({ id: 99, name: '測試人員' })
    })
    //結束時清除測試資料
    afterAll(() => {
        deleteTestData(99)
    })

    //確認是否回傳正確的資料
    test('Test get user data', () => {
        expect(getUserData(99)).toEqual({ id: 99, name: '測試人員' })
    })

})
```

上方例子使用 <code class="hm iy iz ja jb b">userDB</code> 模擬資料庫的資料，並在測試前透過 <code class="hm iy iz ja jb b">beforeAll</code> 新增一筆測試資料，測試完後再以 <code class="hm iy iz ja jb b">afterAll</code> 將測試資料清除，最後利用全域 <code class="hm iy iz ja jb b">afterAll</code> 最後執行的特性確認 <code class="hm iy iz ja jb b">userDB</code> 是否回到初始狀態：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/1788/1*fOf48xRm7IgokN9rL3gp6Q.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>測試成功，且最後全域的 afterAll 執行時， userDB 已無測試資料</span>
          </div></div><br/>

既然是模擬資料庫，一定會有一些延遲時間，所以替 <code class="hm iy iz ja jb b">insertTestData</code> 增加 <code class="hm iy iz ja jb b">setTimeout</code> ：

<pre><span id="a7d2" class="ks hy em at jb b fh kt ku r kv">//在新增測試資料增加 Timeout<br>const insertTestData = data=&gt; {<br>    setTimeout(() =&gt; {<br>        userDB.push(data)<br>    },3000)<br>}</span></pre>
<br/>

其餘不變的狀況下再進行測試一次：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2512/1*VQBUluqX5FPkKPBaYuCvJg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Received 的值是 undefined ，不符合期望</span>
          </div></div><br/>

因為 <code class="hm iy iz ja jb b">Timeout</code> 延遲的關係，對 <code class="hm iy iz ja jb b">getUserData</code> 執行測試的時候，測試資料還沒有被 <code class="hm iy iz ja jb b">push</code> 進 <code class="hm iy iz ja jb b">userDB</code> 裡面，因此在找不到資料的情況下函式就回傳 <code class="hm iy iz ja jb b">undefined</code> ，這個結果並不是測試所期望的。

在 <code class="hm iy iz ja jb b">beforeAll</code> 等函數中，處理異步執行有幾種方法：

第一種是當 <code class="hm iy iz ja jb b">insertTestData</code> 中含有 <code class="hm iy iz ja jb b">callBack</code> 函式時，可以使用 <code class="hm iy iz ja jb b">done</code> 來設置 <code class="hm iy iz ja jb b">beforeAll</code> 的完成點，只要沒有執行到 <code class="hm iy iz ja jb b">done</code> 就不會離開 <code class="hm iy iz ja jb b">beforeAll</code> ，例如將 <code class="hm iy iz ja jb b">insertTestData</code> 和 <code class="hm iy iz ja jb b">beforeAll</code> 改成下方：

```javascript
//傳入 done 參數
beforeAll(done => {
    //callBack 函式，會在 Timeout 後執行
    const callBack = () => {
        //當執行完 Timeout ，進入 callBack 後就能結束
        done()
    }

    //將 callBack 函式傳入 insertTestData
    insertTestData({ id: 99, name: '測試人員' }, callBack)
})
```

這麼一來，就能確保是在新增資料後才會接著測試，結果就會正確。

第二個方式是，在 <code class="hm iy iz ja jb b">insertTestData</code> 本身就回傳一個 <code class="hm iy iz ja jb b">Promise</code> 物件的情況，只需要在 <code class="hm iy iz ja jb b">beforeAll</code> 中回傳從 <code class="hm iy iz ja jb b">insertTestData</code>得到的 <code class="hm iy iz ja jb b">Promise</code> 就可以了：

```javascript
beforeAll(() => {
    //藉由 return 接收到的 Promise 處理異步請求
    return insertTestData({ id: 99, name: '測試人員' })
})
```

上方的兩種方式都能為 <code class="hm iy iz ja jb b">beforeAll</code> 等函式處理同步執行產生的問題，得到結果也相同，測試過程當然就不會出錯！

關於處理同步執行更詳細說明可以參考「<a class="dj by jc jd je jf" target="_blank" rel="noopener" href="/jest-async/">Unit Test | 跨越同步執行的 Jest 測試</a>」，裡面會有更清楚的例子。

---

本篇文章主要是在整理測試的程式內容，能夠使用 <code class="hm iy iz ja jb b">describe</code> 為相同函式的測試內容做分類，並使用 <code class="hm iy iz ja jb b">beforeAll</code> 、 <code class="hm iy iz ja jb b">afterAll</code> 、 <code class="hm iy iz ja jb b">beforeEach</code> 、 <code class="hm iy iz ja jb b">afterEach</code> 等函式建構及清除測試環境。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考文章

<ol>
<li id="ce4e" class="ik il em at im b in jv ip jw ir jx it jy iv jz ix ke kf kg"><a href="https://jestjs.io/docs/en/setup-teardown" class="dj by jc jd je jf" target="_blank" rel="noopener nofollow">https://jestjs.io/docs/en/setup-teardown</a></li>
</ol>
---
layout: post
title: JavaScript | 從Promise開始承諾的部落格生活
image: img/js-promise-process-image.jpg
author: GQSM
date: 2019-01-01T22:02:10.149Z
draft: false
tags: 
  - JavaScript
  - ES6
---

嗨！大家好我是神Q超人！先前一陣子經過友人介紹認識了這個網站，但是由於先前已經有用習慣分享文章的平台，就遲遲未到此處發文，一直到參與完該平台舉辦的鐵人賽後，休息了好一陣子，最後沒有得獎也是很失落，於是想說在新的一年讓自己有個新開始！請大家多多指教！

---

## 認識 Promise
Promise 是在 ES6 出現的語法，主要是針對 JavaScript 中非同步的執行緒做同步處理，所以在此之前，先來認識一下非同步是什麼意思。

### 非同步
非同步處理方式會在不等待每一行的程式執行完成的狀態下不斷向下一行執行，例如：

```javascript
let str = 'init';

const func = () => {
  str='changed';
};

setTimeout(func,3000);

console.log(str); // ''
```

以上的程式區段會以下列的順序做執行：

1. 宣告字串 `str`，並指派值為 `init`。
2. 宣告方法 `func`，作用為改變字串 `str` 的值為 `changed`。
3. 使用 `setTimeout` 在三秒後執行 `func` 改變 `str` 的值。
4. 在 console 中印出字串 `str` 的值。

關鍵就在上方的第 3 和第 4 步，在印出 `console.log` 時，程式並不會等到 `setTimeout` 執行完，而是 JacaScript 確認在第 3 步的 `setTimeout` 時，就會繼續向下執行程式，直到三秒後才回過頭執行 `func` 改變 `str` 的值。

雖然使用非同步可以讓執行速度不會因為某一行程式而卡住整個頁面，但有時候還是得先利用 ajax 獲取資料，再繼續執行處理資料的程式碼。

到這裡是不是有點熟悉？早在幾年前使用 JQuery 的 ajax 送出請求時就擁有了 async 這個屬性來處理這個狀況，當他被設定為 false 關閉非同步時，就得等 ajax 得到回應後，才會繼續執行下方的程式碼，就像下方例子：

```javascript
let data = {};

//使用 async 將 ajax 請求改為同步。
$.ajax({
  url: '',
  async: false,
  success: (status)=>{    
    data = status;
  },
});

//data為statue
console.log(data);
```

但因現今前端工程在網頁中的份量越來越重的關係，需要處理同步處理的地方也越來越多， Promise 就這樣誕生了。

---

## Promise 基本用法
如上段所說， Promise 是用來處理同步的部分，再說明用法前先來用圖片簡單瞭解一下原理：

<img style="width: 100%" src="https://i.imgur.com/GG6Wxmt.png" />
<div style="display:flex; justify-content:center">
<a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise">圖片來源：https://developer.mozilla.org</a>
</div><br />

上圖為 Promise 的生命週期，每個 Promise 都會經過 pending 狀態，在 pending 後分別會有成功時走向的的 fulfill ，及失敗時的 reject ，並透過 `.then()` 在成功時接著處理資料，或是以 `.catch()` 做失敗時的應對，當然！不論是哪一條路，也可以再 return 一個新的 Promise 延續處理。

現在，來實作一個基本的 Promise ：

```javascript
const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('changed');
    }
    reject('error');
  }, 3000);
}).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

上方的在 `setTimeout` 內加上了 `Math.random()` 取亂數（會回傳 0~1 之間的值），並藉由判斷該亂數是否大於 0.5 來模擬兩種情況，當大於時代表成功，小於時代表失敗，當然！ `.catch` 也和 `.then` 相同，在沒有 Promise 內的 `reject` 呼叫下是不會執行的。

## Promise 進階用法

經過基本用法，知道了 `.then` 能夠在 Promise 中以 resolve 做同步的執行呼叫，但是 `.then` 本身也可以擁有回傳值，並由下一個 `.then` 做接收，繼續執行：

```javascript
const newPromise = new Promise((resolve) => {
  setTimeout(() => { resolve('changed'); }, 3000);
}).then((data) => {
  console.log(data);  // 'changed'
  return 'last changed';
}).then((data) => {
  console.log(data);  // 'last changed'
});
```

第二個 `.then` 會接收上一個 `.then` 的回傳值，並將它印出，但是需要注意的是，這種多個 `.then` 的用法，並不適用於同步執行，也就是說只要脫離了 Promise 就會回到非同步，例如以下例子：

```javascript
const newPromise = new Promise((resolve) => {
  setTimeout(() => { resolve('changed'); }, 3000);
}).then((data) => {
  let newData = data;
  setTimeout(
    () => { newData = 'last changed'; }, 2000);
  return newData;
}).then((data) => {
  console.log(data); // 'changed'
});
```

上方例子在第一個 `.then` 中使用 `setTimeout` 在 2 秒後改變 `newData` 的值並將他回傳，但執行後會發現，在第二個 `.then` 中出現在 console 上的還是舊值，並不會等到 `setTimeout` 執行完後才接著下一個 `.then`。

另外我們可以回傳另一個 Promise，來解決上方的問題：

```javascript
const lastPromise = new Promise((resolve) => {
  setTimeout(() => { resolve('last changed'); }, 2000);
});

const newPromise = new Promise((resolve) => {
  setTimeout(() => { resolve('changed'); }, 3000);
}).then((data) => {
  console.log(data);
  return lastPromise.then(lastData => lastData);
}).then((data) => {
  console.log(data); // 'last changed'
});
```

在第一個 `.then` 的回傳了 `lastPromise` 的 `.then` 回傳的內容，也就是 `last changed`，因此最後一個 `.then` 接收到的 `data` 也會是 `last changed`。

上方例子也有需要注意的地方，那就是每個 Promise 都會有自己的生命週期，所以在 `lastPromise` 被建構出來的時候，就會開始進行 `pending` ，不會等到 `newPromise` 的第一個 `.then` 要求回傳資料時才開始執行 `setTimeout` 的 2 秒，因此上方程式的總執行時間並不會是兩個 `setTimeout` 加起來的時間 5 秒，而是 3 秒，因為記得我說過嗎？在 Promise 外，都是非同步的，所以兩個 Promise 在建構後的 `pending` 是非同步的。

如果需要將兩個 Promise 的執行也變成同步，那只需將上方的 `lastPromise` 置於 `newPromise` 的 `.then` 中就行了，如此一來就會變成 3 秒加上 2 秒的同步執行了：

```javascript
const newPromise = new Promise((resolve) => {
  setTimeout(() => { resolve('changed'); }, 3000);
}).then((data) => {
  console.log(data);
  // 第二個Promise
  return new Promise((resolve) => {
    setTimeout(() => { resolve(`last ${data}`); }, 2000);
  }).then(lastData => lastData);
}).then((data) => {
  console.log(data); // 'last changed'
});
```

如此一來只有在進入 `newPromise` 的 `.then` 時，才會去新建構另一個 Promise 並利用他的 `.then` 回傳了一個新值，等到新建構的 Promise 生命週期結束後，才會執行 `newPromise` 最後一個 `.then`，不過這種方式會累加執行的時間，這是他需要注意的地方。

---

以上是本篇對 Promise 的介紹，如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！
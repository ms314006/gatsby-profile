---
layout: post
title: React | React 與他的快樂小夥伴 Redux-事件處理（Handling events）
image: img/react-redux.jpg
author: GQSM
date: 2019-01-10T22:02:10.149Z
draft: false
tags: 
  - React
  - React Redux
---

在<a class="dj by il im in io" target="_blank" rel="noopener" href="/react-redux-state/">上篇文章</a>中，提到了 <code class="hm ip iq ir is b">React</code> 如何向 <code class="hm ip iq ir is b">Redux</code> 要求 <code class="hm ip iq ir is b">store</code> 中管理的資料，本篇會延續該篇文章內的程式碼接著說明，如果 <code class="hm ip iq ir is b">React</code> 要對資料進行異動，該怎麼做才好。

---

## 建立事件

其實建立事件並不難，首先在 <code class="hm ip iq ir is b">Reducer</code> 內部描述事件運作，再由 <code class="hm ip iq ir is b">store</code> 的內部函式 <code class="hm ip iq ir is b">dispatch</code> 讓 <code class="hm ip iq ir is b">store</code> 觸發 <code class="hm ip iq ir is b">Reducer</code> 執行，最後 <code class="hm ip iq ir is b">Reducer</code> 會儲存最後改變的 <code class="hm ip iq ir is b">state</code> 並將它回傳。

### 撰寫事件指令

在 <code class="hm ip iq ir is b">Reducer</code> 內會根據 <code class="hm ip iq ir is b">action.type</code> 來判斷要做什麼事情，因此為新事件定義一個指令：

```javascript
const CHANGE_NAME = 'CHANGE_NAME'
```

雖然 <code class="hm ip iq ir is b">ES6</code> 新增了 <code class="hm ip iq ir is b">const</code> 來代表常式，但這裡指令還是用大寫，來代表不可變。

### 設定傳入 Reducer 的參數

上方提到 <code class="hm ip iq ir is b">Reducer</code> 必須靠傳入 <code class="hm ip iq ir is b">action.type</code> 的參數來判斷要執行什麼動作，以及執行此動作的額外參數，因此在執行事件時，得先設定傳入 <code class="hm ip iq ir is b">Reducer</code> 的物件：

```javascript
const changeName = (name) => {
    return {
        type: CHANGE_NAME,
        payload: { 
            name: name 
        },
    }
}
```

<code class="hm ip iq ir is b">changeName</code> 回傳一個物件，該物件有兩個 <code class="hm ip iq ir is b">key</code> 第一個 <code class="hm ip iq ir is b">type</code> 代表該執行的事件為何， 進入 <code class="hm ip iq ir is b">Reducer</code> 時也會先判斷 <code class="hm ip iq ir is b">type</code> 的值， <code class="hm ip iq ir is b">payload</code> 則是執行事件的額外參數，上方的 <code class="hm ip iq ir is b">name</code> 就是在變更姓名這個事件執行時要傳入的參數。

### 在 Reducer 中描述事件

延續上篇的 <code class="hm ip iq ir is b">Reducer</code> ，在 <code class="hm ip iq ir is b">switch</code> 中增加 <code class="hm ip iq ir is b">case</code> 條件判斷，用來描述當 <code class="hm ip iq ir is b">action.type</code> 的值等於 <code class="hm ip iq ir is b">CHANGE_NAME</code> 時該做的事情，而 <code class="hm ip iq ir is b">payload</code> 會裡有額外參數，放置了 <code class="hm ip iq ir is b">name</code> 代表要改變的值：

```javascript
const reducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return { 
                ...state, 
                name: action.payload.name 
            }
        default:
            return state
    }
}
```

這裡必須注意， <code class="hm ip iq ir is b">CHANGE_NAME</code> 內回傳的 <code class="hm ip iq ir is b">state</code> 並不是用原本的物件下去修改，而是用 <code class="hm ip iq ir is b">ES6</code> 的解構賦值回傳一個新物件（不熟悉 <code class="hm ip iq ir is b">ES6</code> 的話，物件和陣列分別可以用 <code class="hm ip iq ir is b">Object.assign()</code> 及 <code class="hm ip iq ir is b">Array.concat()</code> ）。

會這麼做是因為 <code class="hm ip iq ir is b">Reducer</code> 本身是一個純函數，所以藉由返回新的 <code class="hm ip iq ir is b">state</code> 來確保舊 <code class="hm ip iq ir is b">state</code> 原有的樣子是很重要的事情，而且如果直接修改回傳舊 <code class="hm ip iq ir is b">state</code> 的資料到 <code class="hm ip iq ir is b">React</code> 中的話，會導致 <code class="hm ip iq ir is b">React</code> 無法判別 <code class="hm ip iq ir is b">state</code> 的變化，也就不會重新 <code class="hm ip iq ir is b">render</code> 畫面。

### 填寫需求單

就算是事件，如果要透過 <code class="hm ip iq ir is b">Provider</code> 流進內部的 <code class="hm ip iq ir is b">component</code> 中，那就要填寫需求單，而事件和請求資料的需求單也稍微不同：

```javascript
const mapDispatchToProps = dispatch => {
    return {
        changeName: name => dispatch(changeName(name))
    }
}
```

<code class="hm ip iq ir is b">mapDispatchToProps</code> 就是事件的需求單，本身擁有一個參數 <code class="hm ip iq ir is b">dispatch</code> ，是 <code class="hm ip iq ir is b">store</code> 的函式之一， <code class="hm ip iq ir is b">dispatch</code> 會將傳入它的參數送往 <code class="hm ip iq ir is b">Reducer</code> 中執行，而 <code class="hm ip iq ir is b">mapDispatchToProps</code> 本身會回傳一個物件，包括了該函式會以何種名稱流進 <code class="hm ip iq ir is b">component</code> 的 <code class="hm ip iq ir is b">props</code> 中，以及使用 <code class="hm ip iq ir is b">dispatch</code> 觸發的對應函式產生的事件。

例如上方傳入的函式 <code class="hm ip iq ir is b">changeName</code> 會回傳一個 <code class="hm ip iq ir is b">type</code> 為 <code class="hm ip iq ir is b">CHANGE_NAME</code> 的物件，而該物件會藉由 <code class="hm ip iq ir is b">dispatch</code> 送往 <code class="hm ip iq ir is b">Reducer</code> 裡的 <code class="hm ip iq ir is b">actions</code> 接著執行。

### 將事件加入 component

在 <code class="hm ip iq ir is b">component</code> 內增加一個 <code class="hm ip iq ir is b">button</code> ，並將上方 <code class="hm ip iq ir is b">mapDispatchToProps</code> 需求單內指定流入 <code class="hm ip iq ir is b">props</code> 的事件名稱置於它的 <code class="hm ip iq ir is b">onClick</code> 中，並傳入要變更的參數 <code class="hm ip iq ir is b">name</code> 為 <code class="hm ip iq ir is b">Rex</code> ，讓待會點擊按鈕時可觸發變動 <code class="hm ip iq ir is b">state</code> 中的 <code class="hm ip iq ir is b">name</code> ，並重新 <code class="hm ip iq ir is b">render</code> 畫面。

```javascript
class ConnectTitle extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello!{this.props.name}!</h1>
                <button onClick={this.props.changeName.bind(this,'Rex')}>
                    觸發事件
                </button>
            </div>
        )
    }
}
```

### 將 mapDispatchToProps 與 component 做連結

和 <code class="hm ip iq ir is b">mapStateToProps</code> 相同，透過 <code class="hm ip iq ir is b">connect</code> 函式處理需求單，不同的地方是 <code class="hm ip iq ir is b">mapDispatchToProps</code> 得放 <code class="hm ip iq ir is b">connect</code> 第二個參數的位置。

```javascript
const Title = connect(mapStateToProps,mapDispatchToProps)(ConnectTitle)
```

最後讓運行應用程式，確認執行結果：

<img class="dz t u hi ak" src="https://miro.medium.com/max/1528/1*Q3l6NeVW_kN39iPqBIrqkQ.gif" role="presentation"><br/>

總結 <code class="hm ip iq ir is b">Redux</code> 中觸發事件的生命週期如下：

<ol>
<li id="4d8b" class="hx hy em at hz b ia ib ic id ie if ig ih ii ij ik kj kk kl">以 <code class="hm ip iq ir is b">store.dispatch()</code> 觸發事件。</li><li id="1be0" class="hx hy em at hz b ia km ic kn ie ko ig kp ii kq ik kj kk kl"><code class="hm ip iq ir is b">store</code> 會執行 <code class="hm ip iq ir is b">dispatch</code> 的 <code class="hm ip iq ir is b">function</code> 參數，並將 <code class="hm ip iq ir is b">function</code> 的回傳值送至 <code class="hm ip iq ir is b">Reducer</code> 的 <code class="hm ip iq ir is b">action</code> 。</li><li id="cce1" class="hx hy em at hz b ia km ic kn ie ko ig kp ii kq ik kj kk kl"><code class="hm ip iq ir is b">Reducer</code> 會接收到 <code class="hm ip iq ir is b">dispath</code> 觸發它，並根據 <code class="hm ip iq ir is b">action</code> 的內容執行相對應的動作。</li><li id="cc7f" class="hx hy em at hz b ia km ic kn ie ko ig kp ii kq ik kj kk kl"><code class="hm ip iq ir is b">store</code> 會儲存 <code class="hm ip iq ir is b">Reducer</code> 回傳的新 <code class="hm ip iq ir is b">state</code> 。</li>
</ol>

---

以上說明了如何在 <code class="hm ip iq ir is b">Reducer</code> 中描述事件執行，以及讓 <code class="hm ip iq ir is b">React</code> 的 <code class="hm ip iq ir is b">component</code> 透過 <code class="hm ip iq ir is b">store.dispatch()</code> 去觸發 <code class="hm ip iq ir is b">Reducer</code> ，最後得到新的 <code class="hm ip iq ir is b">state</code> 的過程。

此篇可能會稍微複雜一點，但其實也不只有一種方式可以處理事件，也可以不透過 <code class="hm ip iq ir is b">Provider</code> 直接在 <code class="hm ip iq ir is b">component</code> 中使用 <code class="hm ip iq ir is b">dispatch</code> 執行，這些也都會在後續的幾篇文章內提到。

如果以上內容有任何問題，或是不理解的地方，都歡迎留言告訴我，謝謝大家！

參考資料：

<ol>
<li id="2b11" class="hx hy em at hz b ia ib ic id ie if ig ih ii ij ik kj kk kl"><a href="https://blog.csdn.net/za_az/article/details/56483261" class="dj by il im in io" target="_blank" rel="noopener nofollow">https://blog.csdn.net/za_az/article/details/56483261</a></li><li id="f6bc" class="hx hy em at hz b ia km ic kn ie ko ig kp ii kq ik kj kk kl"><a href="https://chentsulin.github.io/redux/docs/basics/DataFlow.html" class="dj by il im in io" target="_blank" rel="noopener nofollow">https://chentsulin.github.io/redux/docs/basics/DataFlow.html</a></li>
</ol>
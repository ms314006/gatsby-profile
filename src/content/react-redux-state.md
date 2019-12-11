---
layout: post
title: React | React 與他的快樂小夥伴 Redux-基礎教學
image: img/react-redux-state.jpg
author: GQSM
date: 2019-01-07T22:02:10.149Z
draft: false
tags: 
  - React
  - React Redux
---

剛開始接觸 <code class="hm il im in io b">React</code> 時就聽過 <code class="hm il im in io b">Redux</code> ，雖然 <code class="hm il im in io b">Redux</code> 對 <code class="hm il im in io b">React</code> 並不是必要的，但既然這是個趨勢，相信也值得花時間好好了解。

在使用後，也能感受到 <code class="hm il im in io b">Redux</code> 對專案帶來的好處：

<ol>
<li id="272e" class="hx hy em at hz b ia ib ic id ie if ig ih ii ij ik ip iq ir">讓組件管理 <code class="hm il im in io b">state</code> 更方便，且確保整個專案的資料都來自同一個地方。</li><li id="85b8" class="hx hy em at hz b ia is ic it ie iu ig iv ii iw ik ip iq ir">開發時能讓畫面及資料端分離，有關畫面的就修改 <code class="hm il im in io b">React</code> 的 <code class="hm il im in io b">component</code> ，資料的部分就完全交給 <code class="hm il im in io b">Redux</code> ，每個人各司其職、分工合作。</li><li id="c979" class="hx hy em at hz b ia is ic it ie iu ig iv ii iw ik ip iq ir">承上點，若是單人作業，也許會認為：「那我一個人，還有需要分開寫嗎？太麻煩了吧！」，不過就是因為一個人，將來維護時，如果發現問題就更不需要再花費時間，讓自己漫遊在一堆 <code class="hm il im in io b">component</code> 、 <code class="hm il im in io b">fetch</code> 或 <code class="hm il im in io b">ajax</code> 的程式中尋找問題在哪裡，對吧？</li>
</ol>

既然 <code class="hm il im in io b">React</code> 和 <code class="hm il im in io b">Redux</code> 兩者間可以這麼相處融洽，那不如就開始試試吧！

---

## Redux 基本用法

在講解兩者如何配合前，還是得先了解 <code class="hm il im in io b">Redux</code> 的運作模式，九把刀說過：「慢慢來，比較快。」，所以一步一步來走吧！

### 創建 Reducer

<code class="hm il im in io b">Reducer</code> 在 <code class="hm il im in io b">Redux</code> 中是用來保管 <code class="hm il im in io b">state</code> ，以及在接收到不同的 <code class="hm il im in io b">action</code> 指令時該對 <code class="hm il im in io b">state</code> 做什麼動作的函數。

首先要為該 <code class="hm il im in io b">Reducer</code> 設計它所管理的 <code class="hm il im in io b">state</code> 架構：

```javascript
const initState = {
    name: 'Jack',
}
```

雖然在 <code class="hm il im in io b">Reducer</code> 中也可以改變 <code class="hm il im in io b">state</code> 的架構，但在 <code class="hm il im in io b">initState</code> 中將資料架構清楚列出，還能讓接手的人或是兩個禮拜後的自己，一看就能知道這個 <code class="hm il im in io b">Reducer</code> 保管了哪些資料。

現在有了初始資料，就可以使用它建立一個 <code class="hm il im in io b">Reducer</code> ：

```javascript
const reducer = (state = initState, action) => {
    switch (action.type){
        default:
            return state 
    }
}
```

每一個 <code class="hm il im in io b">Reducer</code> 都會有兩個參數，第一個參數會將初始的資料狀態 <code class="hm il im in io b">initState</code> 交由 <code class="hm il im in io b">Reducer</code> 保管，第二個參數會傳入現在 <code class="hm il im in io b">reducer</code> 要對 <code class="hm il im in io b">state</code> 做什麼動作的指令及額外的參數，這些在後幾篇會再講解，所以在還沒有任何 <code class="hm il im in io b">action</code> 指令描述的 <code class="hm il im in io b">Reducer</code> 內，預設回傳了它所保管的 <code class="hm il im in io b">state</code> ，在這裡就是上方的 <code class="hm il im in io b">initState</code> 。

### 創建 store

創建 <code class="hm il im in io b">Reducer</code> 後，還得將它交由 <code class="hm il im in io b">store</code> ， <code class="hm il im in io b">store</code> 的工作就是在應用程式中負責整合所有的 <code class="hm il im in io b">Reducer</code> 。

創建前，得先從 <code class="hm il im in io b">redux</code> 中 <code class="hm il im in io b">import</code> 進負責創建 <code class="hm il im in io b">store</code> 的函式 <code class="hm il im in io b">createStore</code> ，並將 <code class="hm il im in io b">Reducer</code> 傳入以創建一個 <code class="hm il im in io b">store</code>：

```javascript
import { createStore } from 'redux'

const store = createStore(reducer)

//可使用 store 的內建函式 getState() 確認目前 store 內所保管的資料console.log(store.getState())  // {name: 'Jack'}
```

需要注意的是，每個專案都應該只能有一個 <code class="hm il im in io b">store</code> 存在，若是有許多不同類型的資料，則是以 <code class="hm il im in io b">Reducer</code> 區分，最後將多個 <code class="hm il im in io b">Reducer</code> 打包成一個後，再創建 <code class="hm il im in io b">store</code> ，這部分的使用方法，在日後的文章也會解說。

<code class="hm il im in io b">store</code> 產生後， <code class="hm il im in io b">Redux</code> 的前置準備部分就告一段落，接下來說明 <code class="hm il im in io b">React</code> 的 <code class="hm il im in io b">component</code> 該如何從 <code class="hm il im in io b">Redux</code> 的 <code class="hm il im in io b">store</code> 中取到資料。

---

## React-Redux 登場

<code class="hm il im in io b">React</code> 需透過幾個步驟才能將 <code class="hm il im in io b">Redux</code> 所保管的資料流向 <code class="hm il im in io b">component</code> 。首先像需求單一樣，定義要從 <code class="hm il im in io b">store</code> 中取得的資料，並將 <code class="hm il im in io b">component</code> 與該需求單做連結，之後再利用 <code class="hm il im in io b">Provider</code> 將 <code class="hm il im in io b">store</code> 根據需求單將資料流進 <code class="hm il im in io b">component</code> 中。以下開始實現這些步驟：

### 填寫需求單

```javascript
const mapStateToProps = state => ({
    name: state.name
})
```

上方創建一個函式 <code class="hm il im in io b">mapStateToProps</code> ，並在該函式內部定義需要哪些資料，它有個參數 <code class="hm il im in io b">state</code> ，在連接時 <code class="hm il im in io b">Redux</code> 會將 <code class="hm il im in io b">store</code> 傳進這個位置，因此上方指定了 <code class="hm il im in io b">store</code> 中保管的 <code class="hm il im in io b">name</code> 資料，並以 <code class="hm il im in io b">name</code> 為 <code class="hm il im in io b">key</code> 從 <code class="hm il im in io b">props</code> 流進 <code class="hm il im in io b">component</code> 中。

### 創建組件

```javascript
import React from 'react'

class ConnectTitle extends React.Component {
    render(){
        return <h1>Hello!{this.props.name}</h1>
    }
}
```

因為待會會與 <code class="hm il im in io b">mapStateToProp</code> 進行連結，所以在組件名稱前個人多註記了 <code class="hm il im in io b">Connect</code> ，代表該 <code class="hm il im in io b">component</code> 內含有從 <code class="hm il im in io b">store</code> 中取的資料，而上方的 <code class="hm il im in io b">{this.props.name}</code> 正是需求單上指定的名稱也就是 <code class="hm il im in io b">name</code> 。

### 連結 <code class="hm il im in io b">component</code> 與 <code class="hm il im in io b">mapStateToProps</code>

在這個步驟前得先從 <code class="hm il im in io b">react-redux</code> 中 <code class="hm il im in io b">import</code> 進 <code class="hm il im in io b">connect</code> ，再進行連結：

```javascript
import { connect } from 'react-redux'

const Title = connect(mapStateToProps)(ConnectTitle)
```

透過 <code class="hm il im in io b">connect</code> 分別將 <code class="hm il im in io b">mapStateToProps</code> 與 <code class="hm il im in io b">ConnectTitle</code> 送進處理，會得到一個新的 <code class="hm il im in io b">component</code> ，在上方使用 <code class="hm il im in io b">Title</code> 接收結果。

### 設置 Provider

<code class="hm il im in io b">Provider</code> 是 <code class="hm il im in io b">react-redux</code> 中的組件，它會接收上方在 <code class="hm il im in io b">Redux</code> 中創建的 <code class="hm il im in io b">store</code> ，並根據和 <code class="hm il im in io b">component</code> 綁在一起的需求單 <code class="hm il im in io b">mapStateToProps</code> 上要求的資料從 <code class="hm il im in io b">store</code> 中取出，再透過 <code class="hm il im in io b">props</code> 流向 <code class="hm il im in io b">component</code> 。

```javascript
import { connect, Provider } from 'react-redux'
import ReactDOM from 'react-dom'

ReactDOM.render(<Provider store={store}>
                    <Title />
                </Provider>,
                document.getElementById('root'))
```

上方的 <code class="hm il im in io b">Provider</code> 在最外層，並為他指定了 <code class="hm il im in io b">store</code> 。

注意！不論是多麼大的專案， <code class="hm il im in io b">Provider</code> 永遠都在最外層，也永遠都只有一個，為了保持資料來源都是從 <code class="hm il im in io b">Provider</code> 流進內部的 <code class="hm il im in io b">component</code> ，這也是為什麼每個專案中 <code class="hm il im in io b">store</code> 應該都只能有一個。

接著運行應用程式，確認最後輸出的結果：

<img class="dz t u hi ak" src="https://miro.medium.com/max/1692/1*Vq1LNUT61QwoB0jtUbmxPw.png" role="presentation"><br/>

---

本文是關於 <code class="hm il im in io b">React</code> 及 <code class="hm il im in io b">Redux</code> 最基本的使用方式，筆者剛學的時候真的覺得很困難，也有很多觀念一直理不清楚，包括上面提到的 <code class="hm il im in io b">store</code> 為什麼只能有一個，不過還好在三番兩次的實際操作後，不只更了解，而且像開頭說的，體會到使用 <code class="hm il im in io b">Redux</code> 的好處後，對他就更愛不釋手，希望本篇文章能夠帶給和當初的我一樣，為學習 <code class="hm il im in io b">Redux</code> 困擾的大家。

如果文章中有任何問題，或是不理解的地方，都歡迎留言告訴我，謝謝大家！
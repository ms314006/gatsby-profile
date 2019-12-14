---
layout: post
title: React | 為了與 Hooks 相遇 - Function Components 升級記
image: img/React.jpg
author: GQSM
date: 2019-02-14T05:33:38.149Z
draft: false
tags: 
  - React
  - Hook
---

## 前言

前幾天 <code class="hm iy iz ja jb b">React</code> 釋出 16.8 版本的消息在各群組上傳得沸沸揚揚，理由是因為這一次的改版新增了 <code class="hm iy iz ja jb b">Hooks</code> ，讓 <code class="hm iy iz ja jb b">Function Components</code> 變得和以往不同！

---

## 什麼是 Hooks ？

在提到 <code class="hm iy iz ja jb b">Hooks</code> 前，必須先理解 <code class="hm iy iz ja jb b">React</code> 在 16.8 版本前撰寫 <code class="hm iy iz ja jb b">Component</code> 的兩種方式：

<ol>
<li id="c14a" class="ik il em at im b in jq ip jr ir js it jt iv ju ix jv jw jx"><code class="hm iy iz ja jb b">Function Components</code> ：使用一般的 <code class="hm iy iz ja jb b">function</code> 來宣告，作為函式他接收 <code class="hm iy iz ja jb b">props</code> 做參數，並回傳一個 <code class="hm iy iz ja jb b">React</code> 的 <code class="hm iy iz ja jb b">DOM</code> 元素。</li><li id="7cef" class="ik il em at im b in jy ip jz ir ka it kb iv kc ix jv jw jx"><code class="hm iy iz ja jb b">Class Components</code> ：使用 <code class="hm iy iz ja jb b">ES6</code> 的 <code class="hm iy iz ja jb b">Class</code> 語法糖創建一個 <code class="hm iy iz ja jb b">React</code> 下的子類別，也可藉由 <code class="hm iy iz ja jb b">React</code> 內的 <code class="hm iy iz ja jb b">render</code> 函式回傳 <code class="hm iy iz ja jb b">DOM</code> 元素。</li>
</ol>

基本上兩種方式創建出來的 <code class="hm iy iz ja jb b">DOM</code> 沒有不同，差別在於 <code class="hm iy iz ja jb b">Class Components</code> 擁有自身的 <code class="hm iy iz ja jb b">State</code> （狀態）及 <code class="hm iy iz ja jb b">Lifecycle</code> （生命週期）。

但記得嗎？就像我上方提到的，這是 <code class="hm iy iz ja jb b">React</code> 在 16.8 版本前的事情了， <code class="hm iy iz ja jb b">Hooks</code> 的出現，改變了 <code class="hm iy iz ja jb b">Function Components</code> ，讓他擁有專屬的 <code class="hm iy iz ja jb b">useState</code> 和 <code class="hm iy iz ja jb b">useEffect</code> 來管理狀態及的生命週期。

## Hooks 使用

### 安裝/更新最新版本

首先將原有或新專案的 <code class="hm iy iz ja jb b">React</code> 版本升級為 16.8 版本，可透過以下指令安裝最新版本：

<pre><span id="97e5" class="kd hy em at jb b fh kr ks r kt">npm install react</span></pre>
<br/>

或者將原有版本升級：

<pre><span id="20d9" class="kd hy em at jb b fh kr ks r kt">npm update react</span></pre>
<br/>

升級後便可以在 <code class="hm iy iz ja jb b">react</code> 中使用 <code class="hm iy iz ja jb b">Hooks</code> 的新功能：

<pre><span id="ca1c" class="kd hy em at jb b fh kr ks r kt">import React, { useState, useEffect } from &apos;react&apos;</span></pre>
<br/>

### 管理 State

就如上所說，新版加入的 <code class="hm iy iz ja jb b">Hooks</code> 可以為 <code class="hm iy iz ja jb b">Function Components</code> 申裝 <code class="hm iy iz ja jb b">State</code> 的功能，這個其中一個核心全都歸咎於 <code class="hm iy iz ja jb b">useState</code> 。

在以往的 <code class="hm iy iz ja jb b">Class Components</code> 中管理 <code class="hm iy iz ja jb b">State</code> ，需在 <code class="hm iy iz ja jb b">constructor</code> 中做初始設置，之後便可使用 <code class="hm iy iz ja jb b">this.setState</code> 更新 <code class="hm iy iz ja jb b">State</code> 的內容，如下：

```javascript
import React from 'react'

class Todo extends React.Component {
    constructor(props){
        super(props)
        
        //設置 state
        this.state = {
            listName: 'default value'
        }
        this.changeListName = this.changeListName.bind(this)
    }

    changeListName(e){
        //改變 state
        this.setState({listName: e.target.value},
            ()=>{console.log(this.state)})
    }

    render(){
        return(
            <input value={this.state.listName} onChange={this.changeListName} />
        )
    }
}
```

使用了 <code class="hm iy iz ja jb b">Hooks</code> 後的 <code class="hm iy iz ja jb b">Function Components</code> 則以 <code class="hm iy iz ja jb b">useState</code> 進行管理， <code class="hm iy iz ja jb b">Hooks</code> 版本：

```javascript
import React, { useState } from 'react'

const Todo = props => {
    //設置 state
    const [listName, setListName] = useState('default value')

    //改變 state
    const changeListName = e =>{
        setListName(e.target.value) 
        console.log(listName)
    }

    return (
        <input value={listName} onChange={changeListName} />
    )
}
```

兩種版本呈現的結果都一樣，差別在於設置及修改 <code class="hm iy iz ja jb b">State</code> 的部分使用 <code class="hm iy iz ja jb b">Hooks</code> 的 <code class="hm iy iz ja jb b">useState</code> 創建，需要注意 <code class="hm iy iz ja jb b">Hooks</code> 是 <code class="hm iy iz ja jb b">Function Components</code> 專屬的功能，在 <code class="hm iy iz ja jb b">Class Components</code> 中無法使用 <code class="hm iy iz ja jb b">Hooks</code> 。

<pre><span id="460b" class="kd hy em at jb b fh kr ks r kt">const [listName, setListName] = useState(&apos;default value&apos;)</span></pre>
<br/>

<code class="hm iy iz ja jb b">useState</code> 會回傳一個陣列，陣列中分別是「保管 <code class="hm iy iz ja jb b">State</code> 值的變數（ <code class="hm iy iz ja jb b">listName</code> ）」和「更新 <code class="hm iy iz ja jb b">State</code> 的函式（ <code class="hm iy iz ja jb b">setListName</code> ）」，因此在接收回傳的值時， <code class="hm iy iz ja jb b">React</code> 選擇使用了 <code class="hm iy iz ja jb b">ES6</code> 解構賦值的方式處理。

如果使用一個變數去接收的話，則會變成：

<pre><span id="f38a" class="kd hy em at jb b fh kr ks r kt">const listName = useState(&apos;default&apos;)</span><span id="d8f3" class="kd hy em at jb b fh kv kw kx ky kz ks r kt">listName[0] //listName 的值</span><span id="3c18" class="kd hy em at jb b fh kv kw kx ky kz ks r kt">listName[1] //上方的 setListName 函式</span></pre>
<br/>

<code class="hm iy iz ja jb b">Hooks</code> 可以多次使用，也可各種型態設置 <code class="hm iy iz ja jb b">State</code> ，包含「物件」、「陣列」等等：

```javascript
//string
const [listName, setListName] = useState('default value')

//object
const [list, setList] = 
      useState({ key: 1, name: '預設事項' })

//array
const [todoList, setTodoList] = 
      useState([{ key: 1, name: '預設事項' },
                { key: 2, name: '預設事項2' }])

```

使用 <code class="hm iy iz ja jb b">State</code> 時，不需以 <code class="hm iy iz ja jb b">this.state.listName</code> 來取值，在 <code class="hm iy iz ja jb b">Function Components</code> 中直接以 <code class="hm iy iz ja jb b">listName</code> 就可以取到 <code class="hm iy iz ja jb b">State</code> 值了。

更新時也不必像 <code class="hm iy iz ja jb b">this.setState({listName:value})</code> 使用物件做更新，因為每個 <code class="hm iy iz ja jb b">State</code> 都由一個 <code class="hm iy iz ja jb b">useState</code> 創建，因此只需要直接把要更新的值給對應的更新函式處理，例如 <code class="hm iy iz ja jb b">setListName(value)</code> 。

### 了解 Lifecycle

既然有了 <code class="hm iy iz ja jb b">State</code> ，那當 <code class="hm iy iz ja jb b">State</code> 改變時能不能同時執行些事件，當然！ <code class="hm iy iz ja jb b">Hooks</code> 另一個核心功能 <code class="hm iy iz ja jb b">useEffect</code> ，在 <code class="hm iy iz ja jb b">Function Components</code> 中，可以利用它創建生命週期。

在 <code class="hm iy iz ja jb b">Class Components</code> 中，有以下幾種方式可以在各個週期的時候執行額外的事件：

<ol>
<li id="0b08" class="ik il em at im b in jq ip jr ir js it jt iv ju ix jv jw jx"><code class="hm iy iz ja jb b">componentDidMount</code> ：在 <code class="hm iy iz ja jb b">component</code> 將 <code class="hm iy iz ja jb b">DOM</code> 給 <code class="hm iy iz ja jb b">render</code> 至畫面後執行。</li><li id="4dab" class="ik il em at im b in jy ip jz ir ka it kb iv kc ix jv jw jx"><code class="hm iy iz ja jb b">componentDidUpdate</code> ：當 <code class="hm iy iz ja jb b">component</code> 的 <code class="hm iy iz ja jb b">State</code> 改變時執行。</li><li id="1bb6" class="ik il em at im b in jy ip jz ir ka it kb iv kc ix jv jw jx"><code class="hm iy iz ja jb b">componentWillUnmount</code> ：當 <code class="hm iy iz ja jb b">component</code> 被移除時執行。</li>
</ol>

但是 <code class="hm iy iz ja jb b">Function Components</code> 裡只需要一個 <code class="hm iy iz ja jb b">useEffect</code> ，就可以將三個願望一次滿足：

```javascript
const Todo = props => {
    //設置 state
    const [listName, setListName] = useState('default value')

    //改變 state
    const changeListName = e =>{
        setListName(e.target.value) 
    }

    //設置 lifecycle
    useEffect(()=>{
        //componentDidMount 及 componentDidUpdate
        console.log(`更新後的 State ${listName}`)

        //componentDidUpdate 及 componentWillUnmount
        return(()=>{
            console.log(`更新前的 State ${listName}`)
        })
    })

    return (
        <input value={listName} onChange={changeListName} />
    )
}
```

這裡可能會有許多人對 <code class="hm iy iz ja jb b">useEffect</code> 感到困惑，它到底是怎麼運作的？可以先看上方的執行結果後再接著解釋：

在 <code class="hm iy iz ja jb b">Function Components</code> 執行 <code class="hm iy iz ja jb b">render</code> 後便會先執行一次 <code class="hm iy iz ja jb b">useEffect</code> ：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/800/1*QukjCT6pg98Gy2TcG6gPcA.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>首次 render 時執行的生命週期</span>
          </div></div><br/>

接著當 <code class="hm iy iz ja jb b">State</code> 改變時會先執行 <code class="hm iy iz ja jb b">useEffect</code> 中 <code class="hm iy iz ja jb b">return</code> 的內容後，再執行 <code class="hm iy iz ja jb b">useEffect</code> ：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/812/1*6NNxs1cP237i17DYZW3y7Q.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>State 每次改變都觸發 useEffect</span>
          </div></div><br/>

由上方的 gif 可以發現，當每一次改變 <code class="hm iy iz ja jb b">State</code> 時都會執行兩次生命週期內的事件，先是執行 <code class="hm iy iz ja jb b">return</code> ，再執行 <code class="hm iy iz ja jb b">useEffect</code> 內的。

經過實測，可以把 <code class="hm iy iz ja jb b">useEffect</code> 分成三個部分：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2824/1*mdpEpDBXIUJKQniMOpf3iA.jpeg" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Function Components 的生命週期</span>
          </div></div><br/>

<ol>
<li id="0236" class="ik il em at im b in jq ip jr ir js it jt iv ju ix jv jw jx">橘色框框的內容為 <code class="hm iy iz ja jb b">componentDidMount</code> ，會在 <code class="hm iy iz ja jb b">render</code> 後執行。</li><li id="7762" class="ik il em at im b in jy ip jz ir ka it kb iv kc ix jv jw jx">綠色框框的內容為 <code class="hm iy iz ja jb b">componentWillUnmount</code> ，會在 <code class="hm iy iz ja jb b">components</code> 移除時執行。</li><li id="5c5d" class="ik il em at im b in jy ip jz ir ka it kb iv kc ix jv jw jx">紅色框框的內容為 <code class="hm iy iz ja jb b">componentDidUpdate</code> ，會在 <code class="hm iy iz ja jb b">State</code> 改變時執行，執行順序為綠色框框到橘色框框。</li>
</ol>

但是如果 <code class="hm iy iz ja jb b">Component</code> 中只需在 <code class="hm iy iz ja jb b">render</code> 後執行一次獲取資料的動作，該怎麼像 <code class="hm iy iz ja jb b">Class Components</code> 的 <code class="hm iy iz ja jb b">componentDidMount</code> 一樣呢？

其實 <code class="hm iy iz ja jb b">useEffect</code> 可以有第二個參數，只需要在 <code class="hm iy iz ja jb b">useEffect</code> 的第二個參數中設置一個空陣列 <code class="hm iy iz ja jb b">[]</code> ，且不需要加入 <code class="hm iy iz ja jb b">return</code> 的函式，便可以讓 <code class="hm iy iz ja jb b">useEffect</code> 只在第一次的 <code class="hm iy iz ja jb b">render</code> 後執行，就如同 <code class="hm iy iz ja jb b">componentDidMount</code> ：

<pre><span id="b953" class="kd hy em at jb b fh kr ks r kt">useEffect(()=&gt;{<br>    console.log(`只執行第一次`)<br>},[])</span></pre>
<br/>

<code class="hm iy iz ja jb b">useEffect</code> 的第二個參數不只是能傳空陣列，在陣列中可以設置一個以上的 <code class="hm iy iz ja jb b">State</code> 名稱，讓生命週期只觸發在特定的 <code class="hm iy iz ja jb b">State</code> 改變時：

<pre><span id="677d" class="kd hy em at jb b fh kr ks r kt">useEffect(()=&gt;{<br>    console.log(`只執行第一次和 listName 改變的時候`)<br>},[listName])</span></pre>
<br/>

也就是說，當 <code class="hm iy iz ja jb b">listName</code> 的值為 ‘Default value’ ，而下一個值也是 ‘Default value’ 時，那 <code class="hm iy iz ja jb b">useEffect</code> 就不會被觸發，因為修改前後的值都相同，除非 <code class="hm iy iz ja jb b">listName</code> 被更改為 ‘Default value’ 外的值。

最後，筆者使用 <code class="hm iy iz ja jb b">Hooks</code> 創建一個簡單的 <code class="hm iy iz ja jb b">todolist</code> ，當中包含了 <code class="hm iy iz ja jb b">useState</code> 及 <code class="hm iy iz ja jb b">useEffect</code> ：

```javascript
import React, { useState, useEffect } from 'react'

const Todo = props => {
    const [listName, setListName] = useState('')
    const [todoList, setTodoList] = useState([{ key: 1, name: '預設事項' }])
    const [time, setTime] = useState(new Date())

    const addTodo = () => {
        const newKey = todoList.length === 0 ? 1 : todoList[todoList.length - 1].key + 1
        setTodoList([...todoList, { key: newKey, name: listName }])
        setListName('')
    }

    const removeTodo = (listKey) => {
        let foundIndex = todoList.findIndex((list) => {
            return list.key === listKey
        })
        todoList.splice(foundIndex, 1)
        setTodoList([...todoList])
    }

    useEffect(() => {
        const timer = setInterval(tickTime, 1000)

        return (() => {
            clearInterval(timer)
        })
    }, [])

    const tickTime = () => {
        setTime(new Date())
    }

    return (
        <div>
            <p>
                {time.toString()}
            </p>
            <input value={listName} onChange={e => setListName(e.target.value)} />
            <input type='button' value='新增' onClick={addTodo} />
            {todoList.map((list) => {
                return (
                    <p key={list.key}>
                        <input type='button' value='移除' onClick={() => { removeTodo(list.key) }} />
                        {list.name}
                    </p>
                )
            })}
        </div>
    )
}

export { Todo }
```

上方以 <code class="hm iy iz ja jb b">useState</code> 設置 <code class="hm iy iz ja jb b">listName</code> 管理待辦事項的名稱、 <code class="hm iy iz ja jb b">todoList</code> 為事項內容、 <code class="hm iy iz ja jb b">setTodoList</code> 用來新增/移除代辦事項，時間顯示則是用 <code class="hm iy iz ja jb b">useEffect</code> 在 <code class="hm iy iz ja jb b">Todo</code> 第一次 <code class="hm iy iz ja jb b">render</code> 的時候執行 <code class="hm iy iz ja jb b">setInterval</code> 每秒更新，且會在移除 <code class="hm iy iz ja jb b">components</code> 時執行 <code class="hm iy iz ja jb b">return</code> 的 <code class="hm iy iz ja jb b">cleanInterval</code> 來停止：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/868/1*5GJkchsZZHquwU2smY8LmQ.gif" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>useState 增加/移除事項，useEffect 為顯示時間</span>
          </div></div><br/>

---

本文介紹了在 <code class="hm iy iz ja jb b">React</code> 新版本中增加的 <code class="hm iy iz ja jb b">Hooks</code> 其中兩個功能，在閱讀官方文件的時候還有許多滿有趣的 <code class="hm iy iz ja jb b">Hooks</code> ，包括相似 <code class="hm iy iz ja jb b">Redux</code> 的 <code class="hm iy iz ja jb b">useReducer</code> 和自定義的 <code class="hm iy iz ja jb b">Hooks</code> ，今後會再持續分享一些學習的過程。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考文章

<ol>
<li id="698b" class="ik il em at im b in jq ip jr ir js it jt iv ju ix jv jw jx"><a href="https://reactjs.org/docs/hooks-state.html" class="dj by li lj lk ll" target="_blank" rel="noopener nofollow">https://reactjs.org/docs/hooks-state.html</a></li><li id="f3bd" class="ik il em at im b in jy ip jz ir ka it kb iv kc ix jv jw jx"><a href="https://reactjs.org/docs/hooks-effect.html" class="dj by li lj lk ll" target="_blank" rel="noopener nofollow">https://reactjs.org/docs/hooks-effect.html</a></li>
</ol>
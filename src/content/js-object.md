---
layout: post
title: JavaScript | 關於 Object ，一口氣全說完
image: img/JavaScript.jpg
author: GQSM
date: 2019-08-04T07:59:11.149Z
draft: false
tags: 
  - JavaScript
---

## 前言

原諒我用醜字做開版圖，首先讓筆者先恭喜一下自己從教召地獄中脫離，距離上一次才經過了一年半，在工作才剛換的時候，這通知實在是來的有點快和無奈，不過這次在出發前隨手將「 <a href="https://www.tenlong.com.tw/products/9789863478584" class="dj by ij ik il im" target="_blank" rel="noopener nofollow">Speaking JavaScript</a> 」放進行李，想說重新讀一遍 JavaScript 中的 Object 知識，做下筆記，才讓這七天的精實（無聊）生活沒那麼無趣。

---

## Object

本篇文章的內容都是從「 <a href="https://www.tenlong.com.tw/products/9789863478584" class="dj by ij ik il im" target="_blank" rel="noopener nofollow">Speak JavaScript</a> 」書中整理，會分成幾個部分講解：

<ol>
<li id="1970" class="hv hw em at hx b hy jc ia jd ic je ie jf ig jg ii jh ji jj">Object （物件）</li><li id="72e6" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">this（物件執行環境）</li><li id="a843" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">Property attributes（特性屬性）</li><li id="abca" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">Prototypal inheritance （原型繼承）</li><li id="7df3" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">Constructor （建構器）</li><li id="e508" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">Constructor inheritance （建構器間的繼承）</li>
</ol>

那以上如果還有推薦多說明的部分，歡迎再留言告訴我！

### Object 物件

在 JavaScript 中宣告一個 Object （物件）時使用首尾大括號建立範圍， Object 內的 Property （特性）為一個 key （鍵）搭配一個 value （值），並以逗號區隔每個 Property：

```javascript
//宣告一個 Object 物件，搭配首尾大括號
let mary = {
    //每個 Property 間使用逗號區隔
    name: 'Mary',
    sayHello: function(){
        console.log(`Hello ${this.name}`)
    },
}
```

Property 的 value 可以是任何的型態值，包括 string 、 integer 、 function 又或是另一個 Object ，此外， Object 支援了在最後一個 Property 後加上逗號，即使它是最後，這個寫法可以讓之後要調整 Property 的時候比較不會出現錯誤，因為不必在意誰要擺在最後。

使用 Object 中的 Property 方式有兩種：

<ol>
<li id="e446" class="hv hw em at hx b hy jc ia jd ic je ie jf ig jg ii jh ji jj"><code class="hc kc kd ke kf b">.</code> 點號運算子，只要在 Object 名稱後使用 <code class="hc kc kd ke kf b">.</code> 並指定 Property 的 key ，即可讀取該特性的值。</li><li id="4e75" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj"><code class="hc kc kd ke kf b">[]</code> 中括號，在中括號裡可以是一個述句，會經由運算，並將值轉為字串後尋找對應的 key 值。</li>
</ol>

以下為兩種方式的使用範例：

```javascript
//使用 . 點號運算子
console.log(mary.name)  
//印出 Mary

//使用 [] 中刮號運算子
const propertyNameA = 'say'
const propertyNameB = 'Hello'
mary[propertyNameA + propertyNameB]()  
//取出 function 後執行，印出 Hello Mary

```

<code class="hc kc kd ke kf b">.</code> 點號運算子應該沒有問題，而下方 <code class="hc kc kd ke kf b">[]</code> 中刮號運算子中分別將 <code class="hc kc kd ke kf b">say</code> 和 <code class="hc kc kd ke kf b">Hello</code> 存到兩個變數，再在 <code class="hc kc kd ke kf b">[]</code> 內運算兩個變數加起來的值，得到 <code class="hc kc kd ke kf b">sayHello</code> 這個 key 並取出 Function 值執行。

若要為 <code class="hc kc kd ke kf b">Object</code> 異動或新增一個 <code class="hc kc kd ke kf b">property</code> ，也是以 <code class="hc kc kd ke kf b">.</code> 號運算子加上 Property 的 key ，在指定新值：

```javascript
//異動 Property 的值
mary.name = `${mary.name} Louise`

//新增一個 Property 
mary.friends = ['Jane','Leda']
```

刪除的話可以使用 <code class="hc kc kd ke kf b">delete</code> 加上 Object 的 Property 執行動作：

```javascript
//賦予一個新的 Property 
mary.age = 18

//刪除該 Property 
delete mary.age
//成功時回傳 true

//該特性消失，在使用時回傳 undefuned
console.log(mary.age)
//undefined
```

請注意！這與直接指定該 Property 的值為 <code class="hc kc kd ke kf b">undefined</code> 不同， <code class="hc kc kd ke kf b">delete</code> 會讓 Property 從 Object 中消失。

另外，如果要判斷一個變數是否為 Object 可以使用 <code class="hc kc kd ke kf b">typeof</code> 方法：

<pre><span id="ce23" class="jp hj em at kf b fh ki kj r kk">typeof {} // &quot;object&quot;</span></pre>

但是要注意，除了真正的 Object 外， <code class="hc kc kd ke kf b">null</code> 、 Array 也都會回傳 Object ，因此在判斷時，記得先處理掉變數型態可能是 <code class="hc kc kd ke kf b">null</code> 或Array 的可能性。

### this 執行環境

以 Object <code class="hc kc kd ke kf b">mary</code> 來看，在 Object 中建立的 Function 都會個隱含的參數 <code class="hc kc kd ke kf b">this</code> 可以使用，而 <code class="hc kc kd ke kf b">this</code> 的值則指向 Object 本身，因此上方的 <code class="hc kc kd ke kf b">this.name</code> 其實就等於 <code class="hc kc kd ke kf b">mary.name</code>。

不過這裡會有個隱藏的陷阱，當為 <code class="hc kc kd ke kf b">mary</code> 這個物件加上印出所有 friend 的 Function ：

```javascript
mary.getFriends = function(){
    //取得 friends ，並用 forEach 將每個 friend 個別列出
    this.friends.forEach(function(friend){
        console.log(`${this.name}'s friend has ${friend}`)
    })
}
```

雖然執行後能夠列出 Object 中 <code class="hc kc kd ke kf b">friends</code> 的資料，但會發現在 <code class="hc kc kd ke kf b">forEach</code> 內的 Function 無法用 <code class="hc kc kd ke kf b">this</code> 得到 mary 的 name Property ：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1324/1*GqhG8Ovq1AuUMH77ZvafRA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>forEach 內的 Function 無法取得 Object 的 Property name</span>
          </div></div><br/>

原因是在 <code class="hc kc kd ke kf b">forEach</code> 內執行的 Function 並不是建立在 mary 中，因此他之中的 <code class="hc kc kd ke kf b">this</code> 就不會指向 Object 本身，而是代表全域的 <code class="hc kc kd ke kf b">Window</code> ，更多關於 <code class="hc kc kd ke kf b">this</code> 可以參考「<a href="https://blog.techbridge.cc/2019/02/23/javascript-this/" class="dj by ij ik il im" target="_blank" rel="noopener nofollow">淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂</a>」，這篇文章講得非常清楚！

當遇到 <code class="hc kc kd ke kf b">this</code> 指向錯誤，而無法取得 Object 內的 Property 時，有下列三種解法：

1.在使用 <code class="hc kc kd ke kf b">forEach</code> 的情況下，它本身支援指定執行的 <code class="hc kc kd ke kf b">this</code> 做為參數：

```javascript
mary.getFriends = function(){
    //將目前的 this 指定給 forEach 的第二個參數
    this.friends.forEach(function(friend){
        console.log(`${this.name}'s friend has ${friend}`)
    },this)
}
```

2.將 <code class="hc kc kd ke kf b">this</code> 指定給另一個變數：

```javascript
mary.getFriends = function(){
    
    //將指向 Object 的 this 給 that
    const that = this
    
    this.friends.forEach(function(friend){
        //在 forEach 內直接使用 that
        console.log(`${that.name}'s friend has ${friend}`)
    })
}
```

3.在執行 Function 時使用 <code class="hc kc kd ke kf b">call</code> 、 <code class="hc kc kd ke kf b">apply</code> 、 <code class="hc kc kd ke kf b">bind</code> 指定 <code class="hc kc kd ke kf b">this</code> ，以下先簡單介紹這三個的差別及用法：

使用 <code class="hc kc kd ke kf b">call</code> 時，只需將要指定的 <code class="hc kc kd ke kf b">this</code> 放入第一個參數，其餘從第二個開始傳入 Function 中，例如：

```javascript
const mary = {
    name: 'Mary',
}

function writeSpeak(talk){
    console.log(`${this.name} say ${talk}`)
}

//使用 call 對 writeSpeak 指定 this
writeSpeak.call(mary,'Hello')
//印出 Mary say Hello
```

<code class="hc kc kd ke kf b">apply</code> 的使用方式和 <code class="hc kc kd ke kf b">call</code> 相同，只是在傳入要執行的 Function 需要的參數時，需將所有的參數放置於一個陣列中：

```javascript
const mary = {
    name: 'Mary',
}

function writeSpeak(talk){
    console.log(`${this.name} say ${talk}`)
}

//使用 apply 需要將傳入的參數都放進一個陣列中
writeSpeak.apply(mary,['Hello'])
```

<code class="hc kc kd ke kf b">bind</code> 與 <code class="hc kc kd ke kf b">call</code> 傳入參數的方式相同，但 <code class="hc kc kd ke kf b">bind</code> 並不會馬上執行 Function ，而是會回傳一個新的 Function ：

```javascript
const mary = {
    name: 'Mary',
}

function writeSpeak(talk){
    console.log(`${this.name} say ${talk}`)
}

//bind 會回傳一個新的 Function
const marySayHello = writeSpeak.bind(mary,'Hello')

//需另外執行
marySayHello()
//印出 Mary say Hello

//也可以不在一開始就給參數
const marySay = writeSpeak.bind(mary)

//執行時再給參數
marySay('Good bye')
//印出 Mary say Good bye

```

稍微暸解 <code class="hc kc kd ke kf b">call</code> 、 <code class="hc kc kd ke kf b">apply</code> 、 <code class="hc kc kd ke kf b">bind</code> 的使用方法後，便可以依照情況修改 Function ，解決上方抓不到 <code class="hc kc kd ke kf b">this</code> 的問題：

```javascript
mary.getFriends = function(){
    //為 forEach 內的 Function 使用 bind 來指定 this
    this.friends.forEach(function(friend){
        console.log(`${this.name}'s friend has ${friend}`)
    }.bind(this))
}
```

經過 <code class="hc kc kd ke kf b">bind</code> 指定 <code class="hc kc kd ke kf b">this</code> ， Function 內就抓得到 mary 的 Property 了：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1440/1*JypFv3we7uJeKoCdPDBhCg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>使用 bind 綁定 forEach 的 this</span>
          </div></div><br/>

### Property attributes 特性屬性

上方說明 Object 的時候有提到， Property 是由一個 key 及 value 定義的，但是嚴格來說， value 只是這個 Property key 的一個屬性而已，除了 value 外還有其他三個沒再露面的 Property attributes ，以下跟著 value 一同列出：

<ol>
<li id="330e" class="hv hw em at hx b hy jc ia jd ic je ie jf ig jg ii jh ji jj">value ：代表此 Property 的值，如同上方的 <code class="hc kc kd ke kf b">Mary</code> 及 Function 等，預設是 <code class="hc kc kd ke kf b">undefined</code> 。</li><li id="0afc" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">writable ：代表此 Property 可否重新指定值，預設為 <code class="hc kc kd ke kf b">false</code>。</li><li id="e257" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">enumerable ：代表此 Property 的可列舉性，受到影響的會有 <code class="hc kc kd ke kf b">Object.keys()</code> 及 <code class="hc kc kd ke kf b">for(key in obj)</code> 等，預設為 <code class="hc kc kd ke kf b">false</code>。</li><li id="fd30" class="hv hw em at hx b hy jk ia jl ic jm ie jn ig jo ii jh ji jj">configurable ： 代表此 Property 的可控制性，能夠讓物件的 Property 無法被刪除，預設為 <code class="hc kc kd ke kf b">false</code>。</li>
</ol>

將上方四個 attributes 寫成描述器的樣子：

<pre><span id="801c" class="jp hj em at kf b fh ki kj r kk">{<br>    value: &apos;&apos;,<br>    writable: false,<br>    enumerable: false,<br>    configurable: false,<br>}</span></pre>

使用 <code class="hc kc kd ke kf b">Object.defineProperty()</code> 可以在定義一個新的 Property 時藉由描述器指定 Property attributes ，在定義 Property attributes 的時候，如果物件中有相同的 Property Key 那就只會去更新該 Property 的屬性，沒有才是定義一個新的：

```javascript
let mary = {}

//分別傳入 Object 名稱 、 Property 名稱 、 Property attributes 描述器
Object.defineProperty(mary,'name',{
    value: 'Mary',
    writable: true,
    enumerable: true,
    configurable: true,
})

console.log(mary.name)
// Mary
```

定義完成後，當想確認某 Property 的 attributes 會需要 <code class="hc kc kd ke kf b">Object.getOwnPropertyDescriptor(Object,Property)</code> ，這個 Function 會回傳該 Property 的 attributes 描述器：

```javascript
//第一個參數指定 Object ，第二個參數為 Property 的 Key
Object.getOwnPropertyDescriptor(mary,'name')

//會得到以下 Property 的描述內容
/*
{ 
value: "Mary", 
writable: false, 
enumerable: false, 
configurable: false
}
*/
```

下方透過將 value 以外的屬性都改為 <code class="hc kc kd ke kf b">false</code> 確認使用上的差別：

```javascript
//將 mary 的 name Property attributes 都設為 false
Object.defineProperty(mary,'name',{
    value: 'Mary',
    writable: false,
    enumerable: false,
    configurable: false,
})

console.log(mary.name)
//印出 Mary

//writable 為 false 將無法再次指定值
mary.name = 'Jack'
console.log(mary.name)
//仍然印出 Mary

//enumerable 為 false 將無法被 Object.keys 列出
console.log(Object.keys(mary))
//列出空陣列 []

//configurable 為 false 將無法刪除
delete mary.name
//回傳 false

console.log(mary.name)
//仍然印出 Mary
```

以下為實際執行狀況：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1216/1*Z5T-19zg4Kahq3yMDTahXA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>當一個 Property 不可修改、列舉、控制時的操作狀態</span>
          </div></div><br/>

另外在 <code class="hc kc kd ke kf b">enumerable</code> 為 <code class="hc kc kd ke kf b">false</code> 的狀態下，還是可以使用其他方式列出不可列舉的 Property ：

1.使用 <code class="hc kc kd ke kf b">for(key in obj)</code> 對剛剛的 <code class="hc kc kd ke kf b">mary</code> 下迴圈，會把 <code class="hc kc kd ke kf b">enumerable</code> 為 <code class="hc kc kd ke kf b">false</code> 的資料給列出：

```javascript
for(key in mary){
    console.log(key)
}
//會將 name 列出
```

2.使用 Function <code class="hc kc kd ke kf b">Object.getOwnPropertyNames(obj)</code> ，可以列出物件中所有「自有特性」：

```javascript
Object.getOwnPropertyNames(mary)
//會得到陣列 ['name']
```

最後，如果只是單純不想讓變數被改變為另一個 Object 的話，也能使用 <code class="hc kc kd ke kf b">ES6</code> 提供的宣告語句 <code class="hc kc kd ke kf b">const</code> ，雖然它無法阻止 Property 被改變或刪除，但是如果使用情況不需那麼嚴謹的話，還是可以考慮它：

```javascript
// 用 const 宣告一個 
const mary = {
  name: 'Mary',
}

console.log(mary.name) // Mary

mary.name = 'Jack'
console.log(mary.name) // Jack

mary.age = 20
console.log(mary.age) // 20

// 重新指定會出錯： Assignment to constant variable.
mary = {
  name: 'Jack',
}
```

### Prototypal inheritance 原型繼承

一個物件裡除了上方稍微提到的「自有特性」外，還有由原型繼承而來的「繼承特性」，原型繼承的意思是當兩個物件間有相同或類似的 Function 時，可以將它取出放置 Prototype （原型）中，讓兩個物件在建立時以 <code class="hc kc kd ke kf b">Object.create(prototype)</code> 繼承自該 Prototype ，便可以不必在建立物件時做多餘的定義：

```javascript
//建立一個 Prototype object
const personPrototype = {
    sayHello: function(){
        console.log(`Hello ${this.name}`)
    }
}

//透過 Object.create 建立兩個個繼承自 personPrototype 的 object
const mary = Object.create(personPrototype)
const kitty = Object.create(personPrototype)

//為兩個物件建立「自有特性」
mary.name = 'Mary'
kitty.name = 'Kitty'

//使用從 personPrototype 繼承而來的 Function
mary.sayHello()
//印出 Hello Mary

kitty.sayHello()
//印出 Hello Kitty


```

上方的例子在建立 <code class="hc kc kd ke kf b">mary</code> 及 <code class="hc kc kd ke kf b">kitty</code> 時，都使用 <code class="hc kc kd ke kf b">Object.create</code> 讓他們繼承自 <code class="hc kc kd ke kf b">personPrototype</code> ，這時候就可以說 <code class="hc kc kd ke kf b">personPrototype</code> 是 <code class="hc kc kd ke kf b">mary</code> 及 <code class="hc kc kd ke kf b">kitty</code> 的 Prototype。

那如果現在有三個 Object 分別為 <code class="hc kc kd ke kf b">a</code> 、 <code class="hc kc kd ke kf b">b</code> 、 <code class="hc kc kd ke kf b">c</code> ， <code class="hc kc kd ke kf b">b</code> 繼承自 <code class="hc kc kd ke kf b">a</code> ，而 <code class="hc kc kd ke kf b">c</code> 又繼承自 <code class="hc kc kd ke kf b">b</code> ，這種情況就可以說這三個 Object 在同一個原型關係上，也被稱為 Prototype chain （原型鏈）。

再接著說下去之前，先來提提在物件中呼叫 Property 的流程，當 <code class="hc kc kd ke kf b">obj.key</code> 取出一個 Property 時，會先確認當前的 Object 是否擁有相同 <code class="hc kc kd ke kf b">key</code> 的 Property ，如果沒有，便會由當前物件向繼承的 Object 中繼續尋找，一直到找到為止，而在找到該 Property 的那個 Object 也被稱為 Home Object。

既然知道在呼叫 Property 時會以 Home Object 為主，那當為某個 Object 新增一個與 Prototype 同名的 property 時，該 Object 便會成為呼叫 Property 的 Home Object ，當然這個操作也不會使 Prototype 中的同名 Property 受影響，只是它不是該 Property 的 Home Object 而已。

繼承後，也有 Function 可以檢查 <code class="hc kc kd ke kf b">mary</code> 的 Prototype 是否為 <code class="hc kc kd ke kf b">personPrototype</code> ，或是直接取得 <code class="hc kc kd ke kf b">kitty</code> 的 Prototype 為何：

```javascript
//確認 personPrototype 是否為 mary 的 prototype
personPrototype.isPrototypeOf(mary)
//回傳 true

//取得 kitty 的 prototype Object
Object.getPrototypeOf(kitty)
//回傳 personPrototype
```

也可以透過 Object 的隱藏屬性 <code class="hc kc kd ke kf b">__proto__</code> 得到 Prototype ，經過繼承後的 Object 都會將原型放在 <code class="hc kc kd ke kf b">__proto__</code> 中，以 <code class="hc kc kd ke kf b">mary</code> 為例：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1512/1*OMTx08gvXtZ-ss9ohahqwg.png" role="presentation"></div><br/>

提到這裡，已經可以知道一個 Object 會由 Property 及 Prototype 兩個重要的元素組成，因此當要複製另一個相同的 Object 時，就應該要把 Property 及 Prototype 都在新的 Object 上設定正確，如同下方操作：

```javascript
const copyObj = originObj => {
    //取得 originObj 的 prototype
    const originPrototype = Object.getPrototypeOf(originObj)
    //以 originPrototype 為原型建立一個物件
    let newObj = Object.create(originPrototype)
    
    //取得所有「自有特性」
    const arrOwnProperties = Object.getOwnPropertyNames(originObj)
    //下迴圈處理每個 prototype
    arrOwnProperties.forEach( property => {
        //取得 Prototype attributes 的描述器
        const prototypeDesc = Object.getOwnPropertyDescriptor(originObj,property)
        //將 prototype 與描述器一同指定給新 Object
        Object.defineProperty(newObj,property,prototypeDesc)
    })
  
    //最後回傳新物件
    return newObj
}
```

執行結果：

<div><img class="dz t u gy ak" src="https://miro.medium.com/max/1360/1*VF6Ht61ZLlxn2BeUSd43Jg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>新 Object 的 Property 和 Prototype 都和原本的相同</span>
          </div></div><br/>

### Constructor 建構器

Constructor （建構器）是一個 Function ，可以利用它來建立一些相似的 Object ，被 Constructor 建立出來的 Object 被稱為它的 Instance （實體）， Constructor 在使用時與一般 Function 不同，是藉由 <code class="hc kc kd ke kf b">new</code> 來呼叫，也就是說，它只有再藉由 <code class="hc kc kd ke kf b">new</code> 的狀態下使用才會是 Constructor 。

下方建立一個 <code class="hc kc kd ke kf b">Person</code> 作為 Constructor ，並利用它建立 <code class="hc kc kd ke kf b">mary</code> 及 <code class="hc kc kd ke kf b">kitty</code> 物件：

```javascript
// Constructor 第一個字母通常大寫
function Person(name){
    //設定 this 的 name property 值為傳進來的參數， this 為建立的物件
    this.name = name
}
//用 new 呼叫 Person 使它成為一個 Constructor ，替 mary 及 kitty 設定 name
const mary = new Person('Mary')
const kitty = new Person('Kitty')

mary.name 
// Mary

//每個 Instance 的 constructor 屬性都會指向 Constructor 本身
kitty.constructor === Person
// true
```

在上方的例子中，就可以說 <code class="hc kc kd ke kf b">mary</code> 和 <code class="hc kc kd ke kf b">kitty</code> 是 <code class="hc kc kd ke kf b">Person</code> 的 Instance ，也可以發現 Constructor 能協助建立擁有基本資料的 Object ，而要處理這些 Object 的 Function 便能放在 Prototype 中，以達成資料在 Constructor 的 Instance ， 方法在 Prototype 的關注點分離原則。

但是藉由 Constructor 建立的 Object 就不會再經過 <code class="hc kc kd ke kf b">Object.create</code> ，該如何對那些 Instance 設定 Prototype 呢？答案在 Constructor 中，每一個 Constructor 都擁有 Prototype 的屬性，可以把方法設定在 Prototype 中，如此一來，只要是透過該 Constructor 建立的 Instance ，也都會擁有相同的 Prototype ：

```javascript
// Constructor
function Person(name){
    this.name = name
}

//設定 Prototype
Person.prototype.sayHello = function(){
    console.log(`Hello ${this.name}`)
}

const mary = new Person('Mary')
const kitty = new Person('Kitty')

mary.sayHello()
//印出 Hello Mary

// Prototype 會指向 constructor 的 prototype
Object.getPrototypeOf(kitty) === Person.prototype
// true
```

關於 Constructor 的 Prototype 也會有一個屬性為 constructor ，正常來說該屬性的值會指向 Constructor 自身，雖然在設計時，不會有非得使用該屬性的情況，但將它維持原有的樣子是個好習慣，因此在上方的例子中才沒有直接覆蓋 Prototype ，而是使用擴充的方式將 <code class="hc kc kd ke kf b">sayHello</code> 定義到 Prototype 中，當然如果要直接覆蓋 Prototype ，也只需把 constructor 的值指向 Constructor 就行了：

```javascript
function Person(name){
    this.name = name
}

Person.prototype = {
    //先將 constructor 設置好
    constructor: Person,
    sayHello: function(){
        console.log(`Hello ${this.name}`)
    }
}
```

### Constructor inheritance 建構器間的繼承

Constructor 間的繼承有點類似「父類別」及「子類別」的關係，這裡要思考的是，如何在使用一個 Constructor 的時候去呼叫另一個 Constructor 建立 Property ，聽起來很複雜，但簡單來說，可以利用 <code class="hc kc kd ke kf b">call</code> 在 Constructor 建立物件時將 <code class="hc kc kd ke kf b">this</code> 指定給另一個 Constructor 設定 Property ，實作如下：

```javascript
function Person(name){
    this.name = name
}

function Employee(name,dept){
    //將 this 指定給 Person 設定 
    Person.call(this,name)
    this.dept = dept
}

const mary = new Employee('Mary','IT')
const kitty = new Employee('Kitty','HR')

//擁有 name Property
console.log(mary.name)
//Mary

//也有 dept
console.log(kitty.dept)
//HR
```

負責資料面的 Property 會比較好處理，但是方法類的 Prototype 該怎麼做呢？其實就和 Object 的繼承一樣，以父類別的 Prototype 為原型指定給子類別的 Prototype 就行了，但需要注意的是，因為直接指定父類別 Prototype 的關係，所以要重新把子類別的 constructor 屬性值指定給自己：

```javascript
function Person(name){
    this.name = name
}

Person.prototype.sayHello = function(){
    console.log(`Hello ${this.name}`)
}

function Employee(name,dept){
    Person.call(this,name)
    this.dept = dept
}

Employee.prototype = Object.create(Person.prototype)
//將 prototype 的 constructor 屬性指回自身
Employee.prototype.constructor = Employee

const mary = new Employee('Mary','IT')
const kitty = new Employee('Kitty','HR')

//繼承自 Person.prototype 的 function
mary.sayHello()
// Hello Mary

```

最後來了解一下 Super call （超呼叫），它的意思是在子類別的 Function 中，去呼叫父類別的 Function ：

```javascript
function Person(name){
    this.name = name
}

Person.prototype.sayHello = function(){
    console.log(`Hello ${this.name}`)
}

function Employee(name,dept){
    Person.call(this,name)
    this.dept = dept
}

Employee.prototype = Object.create(Person.prototype)
Employee.prototype.constructor = Employee
Employee.prototype.selfIntroduction = function(){
    //在呼叫時要指定 this ，因為他的執行環境 Person.prototype 中沒有 name Property
    Person.prototype.sayHello.call(this)
    console.log(`In the ${this.dept} department`)
}

const mary = new Employee('Mary','IT')

marry.selfIntroduction()
//會同時列出
/*
Hello Mary
In the IT department
*/
```

但從 Property 到 Prototype 為止的處理，在 <code class="hc kc kd ke kf b">Employee</code> 中都是把 <code class="hc kc kd ke kf b">Person</code> 給寫死，在實務上可以將 <code class="hc kc kd ke kf b">Person</code> 存在 <code class="hc kc kd ke kf b">Employee</code> 的 Property 中，維持更有彈性的寫法：

```javascript
function Person(name){
    this.name = name
}

Person.prototype.sayHello = function(){
    console.log(`Hello ${this.name}`)
}

function Employee(name,dept){
    // construcotr 的 prototype 的 constructor 會指會自己
    Employee._super.constructor.call(this,name)
    this.dept = dept
}

Employee.prototype.selfIntroduction = function(){
    //改成從 Property 中去讀
    Employee._super.sayHello.call(this)
    console.log(`In the ${this.dept} department`)
}

const subclass = (subC,superC) => {
    //處理prototype
    let subProto = Object.create(superC.prototype)
    //將原本 subC.prototype 的 Property 定義給 subProto (這裡和複製物件時用的方式相同)
    const arrOwnProperties = Object.getOwnPropertyNames(subC.prototype)
    arrOwnProperties.forEach( property => {
        const prototypeDesc = Object.getOwnPropertyDescriptor(subC.prototype,property)
        Object.defineProperty(subProto,property,prototypeDesc)
    })
    //將處理完後的 prototype 給 subC 的 protoype
    subC.prototype = subProto
    //定義 _super Property 為父類別的 prototype
    subC._super = superC.prototype
}

//設定 Person 和 Employee 為父子類別
subclass(Employee,Person)

const mary = new Employee('Mary','IT')

mary.selfIntroduction()
//會同時列出
/*
Hello Mary
In the IT department
*/
```

<code class="hc kc kd ke kf b">subclass</code> 內做的事情和複製物件有點像，主要是在處理 Prototype 及 Property ，其實在 JavaScript 中，關於物件的使用及繼承，也只需搞懂這兩個屬性就行了！如上方，通過 <code class="hc kc kd ke kf b">subclass</code> 便能將父子類別都設定好，透過將父類別的 Prototype 存在子類別的 Property 裡，在使用上也就更有彈性及簡單。

---

這篇文章從解召後就開始整理在軍中做的筆記撰寫，但是根據當兵定律，只要一回到家就一定會感冒，這兩天筆者貌似也得了流感，因此才拖了兩天才打完，希望這篇文章能對想了解 JavaScript 中 Object 的人有所幫助。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考文章

<ol>
<li id="89d3" class="hv hw em at hx b hy jc ia jd ic je ie jf ig jg ii jh ji jj"><a href="https://www.tenlong.com.tw/products/9789863478584" class="dj by ij ik il im" target="_blank" rel="noopener nofollow">https://www.tenlong.com.tw/products/9789863478584</a></li>
</ol>
---
layout: post
title: JavaScript | ES6 中最容易誤會的語法糖 Class - 基本用法
image: img/JavaScript-ES6.jpg
author: GQSM
date: 2019-10-15T03:39:26.149Z
draft: false
tags: 
  - JavaScript
  - Class
---

## 前言

Hi！本來在之前想和 <a class="dj by iy iz ja jb" target="_blank" rel="noopener" href="/js-promise/">Promise</a> 、 <a class="dj by iy iz ja jb" target="_blank" rel="noopener" href="/js-fetch/">Fetch</a> 一起完成的 ES6 小小三部曲，一直拖到現在才真正動工，其實本來沒有想要另外學了，但因為最近讀 Refactor 發現善用 Class 也是很好的重構技巧之一，所以決定花點時間讓自己熟悉一下。

---

## Class

先來解釋一下標題好了，

<div style="font-size: 30px; color: #696969; font-style:italic; padding: 0px 60px;margin: 30px 0px;">Class 是 JavaScript 中最容易被誤會的語法糖了</div>

為什麼會被誤會？如果各位讀者有寫過其他像是 Java 的 Class-Based 物件導向語言，都會知道下面幾件事情：

<ol>
<li id="b1db" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix km kn ko">分成 Class 和 Object 兩種。</li><li id="3794" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko">Class 內部會描述 Properties 和 Method。</li><li id="a15f" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko">Class 能建構出 Object ，也被稱作 Instance 。</li><li id="7a00" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko">Instance 能夠使用 Class 內的 Method，並藉由 Method 存取 Object 內的資料。</li>
</ol>

咦？就算沒寫過，但這樣看起來似乎和 JavaScript 的 Constructor 及 Instance 差不多對吧？

對！但是差別在於第一點所說的「分成 Class 和 Object 兩種」

<div style="font-size: 30px; color: #696969; font-style:italic; padding: 0px 60px;margin: 30px 0px;">擁有 Class 才能產生出對應的 Instance ，這是與 JavaScript 差別最大的地方。</div>

在 JavaScript 的 Prototype-Based 物件導向中，不區分 Class 和 Object 所有的東西都可以是 Object ，

<div style="font-size: 30px; color: #696969; font-style:italic; padding: 0px 60px;margin: 30px 0px;">且不一定需要經過 Class 或 Constructor 才能建立 Instance，直接操作 Prototype 也能辦到。</div>

再來，如果在 Java 中要做 Class 間的繼承，得在<strong class="im ku">定義 Class 時指定要繼承的父類別</strong>。在 JavaScript 中則是以<strong class="im ku">改變 Constructor 的 Prototype 來使用其他 Constructor 的 Method </strong>。

這些差別都是取決於物件導向是基於 Class 或 Prototype ，因此就算 ES6 新增了一個 Class 保留字用來當 Constructor 創建 Instance ，也不代表它物件導向的方式會變成 Class-Based ，

<div style="font-size: 30px; color: #696969; font-style:italic; padding: 0px 60px;margin: 30px 0px;">只是被 Class 包裝的 Prototype-Based 而已。</div>

所以千萬不要搞混囉！ Class 只是簡化了 JavaScript 中操作 Constructor 的語法糖而已。

## Constructor

Constructor 是建構器，可以用它產生擁有相同 Properties 的 Object ，例如大家都熟悉的：

```javascript
function Person(name) {
  // public properties
  this.name = name;

  // private value
  const state = 'Taiwan';

  // privileged methods
  this.getFrom = () => `${this.name} from ${state}.`;
}

const john = new Person('John');

console.log(john); // { name: 'John', getFrom: [Function] }
console.log(john.state); // undefined
console.log(john.getFrom()); // John from Taiwan.

```

Person 內裡面有三行程式碼，來看看它們分別是什麼：

<ol>
<li id="856e" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix km kn ko"><code class="hm kw kx ky kz b">name</code> 是經過 <code class="hm kw kx ky kz b">Person</code> 創建出來後會帶的 Own Properties （自有特性），會在呼叫 Constructor 時當作參數傳入。</li><li id="53b5" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko"><code class="hm kw kx ky kz b">state</code> 是一個 Private value （私有值），它只存在於 Constructor 創建 Instance 時另外產生的環境。</li><li id="0df3" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko">雖然 <code class="hm kw kx ky kz b">state</code> 不是 Instance 的 Own Properties ，但是透過 <code class="hm kw kx ky kz b">getForm</code> 便能夠取得 <code class="hm kw kx ky kz b">state</code> 的值，這種讀取 Private value 的方式稱作 Privileged Method （特權方法）。</li>
</ol>

那接著進入 ES6 時期的 Constructor ， Class 版本又會是什麼樣子：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  getFrom() {
    const state = 'Taiwan';
    return `${this.name} from ${state}.`;
  }
}

const john = new Person('John');

console.log(JSON.stringify(john)); // { name: 'John' }  public 方法不再顯露於物件裡
console.log(JSON.stringify(john.state)); // undefined
console.log(JSON.stringify(john.getFrom())); // John from Taiwan.

```

有沒有煥然一新的感覺？用 Class 來宣告 Constructor 在語義上面會更清楚，不像之前只能透過字首的大小寫來判斷是否為 Constructor ，且還有可能會有未遵照規則導致使用錯誤的情況發生。

透過 <code class="hm kw kx ky kz b">new</code> 呼叫時傳入的參數會由 Class 內的 <code class="hm kw kx ky kz b">constructor</code> 給接收，並在同一區塊建立 Public Properties ，而 Method 的部分則是在 <code class="hm kw kx ky kz b">constructor</code> 外做描述或存取資料， Private Value 就存放在 Method 中，依然無法從 Instance 中取得。

然後這邊是個很棒的時間，可以讓我們驗證 Class 的操作是否仍然為 Prototype ，如果是透過 Constructor 建立的 Instance ，應該會擁有相同的 Prototype ：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2564/1*ge3r7mHcTm3sc-kETvMIGw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>透過 Constructor 建立的 Instance ，會擁有相同的 Prototype</span>
          </div></div><br/>

## Inheritance

繼承的話在 Class 上也變得方便許多，想當初如果要 Constructor 上處理繼承，就得使用 <code class="hm kw kx ky kz b">call</code> 在 Constructor 創建 Instance 時來指定 <code class="hm kw kx ky kz b">this</code> 呼叫另一個 Constructor，像是這樣子：

```javascript
function Person(name) {
  this.name = name;
  const state = 'Taiwan';

  this.getFrom = () => `${this.name} from ${state}.`;
}

function Employee(name, position) {
  // 將 this 送給 Person 建立 properties
  Person.call(this, name);
  this.position = position;

  // public properties
  this.getPosition = () => `${this.name}'s position is a ${this.position}.`;
}

const luck = new Employee('Luck', 'Front-end');

console.log(luck.getFrom()); // Luck from Taiwan.
console.log(luck.getPosition()); // Luck's position is the Front-end.

```

看起來有些複雜了對吧？但如果是 Class 只需要利用 <code class="hm kw kx ky kz b">extends</code> 和 <code class="hm kw kx ky kz b">super</code> 便可輕鬆處理 Constructor 間的 Inheritance ：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  getFrom() {
    const state = 'Taiwan';
    return `${this.name} from ${state}.`;
  }
}

// 使用 extends 指定 parent class
class Employee extends Person {
  constructor(name, position) {
    // 用 super 呼叫 extends 指定的 class
    super(name);
    this.position = position;
  }
  
  getPosition() {
    return `${this.name}'s position is a ${this.position}.`;
  }
}

const luck = new Employee('Luck', 'Front-end');

console.log(luck.getFrom()); // Luck from Taiwan.
console.log(luck.getPosition()); // Luck's position is the Front-end.

```

上方在定義 <code class="hm kw kx ky kz b">Employee</code> 時另外用了 <code class="hm kw kx ky kz b">extends</code> 指定了 <code class="hm kw kx ky kz b">Person</code> ，這麼一來就等於是繼承了 <code class="hm kw kx ky kz b">Person</code> 的 Properties 和 Method ，但為什麼在 <code class="hm kw kx ky kz b">Employee</code> 中的 constructor 中還要使用 <code class="hm kw kx ky kz b">super</code> 把 name 傳給 <code class="hm kw kx ky kz b">Person</code> 呢？

<div style="font-size: 30px; color: #696969; font-style:italic; padding: 0px 60px;margin: 30px 0px;">因為 Employee 中也有 constructor</div>

當子類別自身也需要透過 constructor 建立 Properties 時，就需要使用 <code class="hm kw kx ky kz b">super</code> 另外指定要送給父類別的值，否則就 <code class="hm kw kx ky kz b">Person</code> 來說，創建 Instance 時將兩個值送入 <code class="hm kw kx ky kz b">Employee</code> ， <code class="hm kw kx ky kz b">Person</code> 根本不曉得哪一個才是要被指定成 <code class="hm kw kx ky kz b">name</code> 的資料，這裡大家可以想像成是用 <code class="hm kw kx ky kz b">call</code> 來呼叫另一個 Constructor 的感覺。

也就是說了，如果當今天不需要透過 <code class="hm kw kx ky kz b">Employee</code> 創建 Properties ，僅僅是增加 Method，那 super 就可以省略，因為所有的參數都會是給 <code class="hm kw kx ky kz b">Person</code> 的：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  getFrom() {
    const state = 'Taiwan';
    return `${this.name} from ${state}.`
  }
}

class Employee extends Person {
  sayHello() {
    return `Hello!I am ${this.name}!`;
  }
}

const luck = new Employee('Luck');

console.log(luck.getFrom()); // Luck from Taiwan.
console.log(luck.sayHello()); // Hello!I am Luck!
```

最後記得那個可怕的 Super Call（超呼叫）嗎？當子類別的 Method 要呼叫父類別的 Method 執行就叫 Super Call ，在未有 Class 時，仍然是需要使用 <code class="hm kw kx ky kz b">call</code> 將 <code class="hm kw kx ky kz b">this</code> 指定給父類別 Prototype 的 Method 做執行：

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello!I am ${this.name}!`;
};

function Employee(name) {
  Person.call(this, name);
}

Employee.prototype = Object.create(Person.prototype);

// 進行 Super call
Employee.prototype.superCallSayHello = function () {
  return Person.prototype.sayHello.call(this);
};

const luck = new Employee('Luck');

console.log(luck.superCallSayHello()); // Hello!I am Luck!
```

儘管我已經將例子盡量簡化了，看起來還是很麻煩，且 <code class="hm kw kx ky kz b">Person</code> 要被 Super Call 的 Method 也得另外設置在 Prototype 中。

但是到 Class 時代後一切便不同了，答案就在運用上方提到的 <code class="hm kw kx ky kz b">super</code> ，既然是透過傳送參數給它來創建 Properties ，那也可以透過 <code class="hm kw kx ky kz b">super</code> 直接呼叫父類別中的Method ：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  getFrom() {
    const state = 'Taiwan';
    return `${this.name} from ${state}.`;
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  getPosition() {
    return `${this.name}'s position is the ${this.position}.`;
  }
  
  // super call
  superCallGetForm() {
    return super.getFrom();
  }
}

const luck = new Employee('Luck', 'Front-end');

console.log(luck.superCallGetForm()); // Luck from Taiwan.
```

是不是簡潔多了？透過 <code class="hm kw kx ky kz b">super</code> 便不需要再手動處理 Prototype 。

那依照慣例，在 Inheritance 這個段落的結尾也來驗證 Class 間的 Inheritance 是否也同樣是在操作 Constructor 的 Prototype ，如果是的話，那子類別 <code class="hm kw kx ky kz b">Employee</code> 的 Prototype 應該會等於父類別 <code class="hm kw kx ky kz b">Person</code> ，而 Instance 的 Prototype 依然指向 <code class="hm kw kx ky kz b">Employee</code> ：

<div><img class="dz t u hi ak" src="https://miro.medium.com/max/2820/1*wI5vUS35imxzsSqzWVc82g.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>由 luck 繼承自 Employee ， Employee 又繼承自 Person ，這稱為 Prototype chain （原型鏈）</span>
          </div></div><br/>

到這裡應該可以清楚明白，

<div style="font-size: 30px; color: #696969; font-style:italic; padding: 0px 60px;margin: 30px 0px;">就算眼睛看見的是 Class ，寫下的也是 Class ，但骨子裡操作的卻還是 Prototype 。</div>

學會在 Class 中創建 Instance 、 Inheritance 、 Super Call 後，接著來看看 Class 提供的 Static Method （靜態方法）！

## Static

在 Class 內的 Method 可以加上 static 前綴，使它變成 Static Method （靜態方法），被定義為 Static Method 可以直接以 Constructor 呼叫，但創建出來的 Instance 是無法使用它的：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHello(name) {
    return `Hi!${name}!`;
  }

  getFrom() {
    const state = 'Taiwan';
    return `${this.name} from ${state}.`;
  }
}

console.log(Person.sayHello('Luck')); // Hi!Luck!
```

## Getter &amp; Setter

前綴詞其實不只有 <code class="hm kw kx ky kz b">static</code> ，連存取器的 <code class="hm kw kx ky kz b">get</code> 及 <code class="hm kw kx ky kz b">set</code> 也可以在 Class 中作定義：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHello(name) {
    return `Hi!${name}!`;
  }

  get age() {
    if (this._age !== undefined) {
      return `${this.name} age is ${this._age}.`;
    }
    return `Don't know ${this.name}'s age.`;
  }

  set age(age) {
    this._age = age;
  }

  getFrom() {
    const state = 'Taiwan';
    return `${this.name} from ${state}.`;
  }
}

const john = new Person('John');

console.log(john.age); // Don't know John's age.
john.age = 18;
console.log(john.age); // John age is 18.

```

經常用於不想 Instance 直接存取的狀況，所以利用 Getter 和 Setter 來假裝操作 Properties ，在設定及取值時都先經過一些邏輯判斷再決定怎麼處理。

---

以上是對於 Class 的一些整理，上半部主要是在比較 Class 出現前後對 Constructor 及 Inheritance 的操作有什麼差別，結尾講解了 Static 和 存取器在 Class 中的使用方式。

如果文章中有任何問題，或是不理解的地方，都可以留言告訴我！謝謝大家！

參考資料

<ol>
<li id="5599" class="ik il em at im b in kh ip ki ir kj it kk iv kl ix km kn ko"><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes" class="dj by iy iz ja jb" target="_blank" rel="noopener nofollow">https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes</a></li><li id="03f1" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko"><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Details_of_the_Object_Model" class="dj by iy iz ja jb" target="_blank" rel="noopener nofollow">https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Details_of_the_Object_Model</a></li><li id="8baf" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko"><a href="https://ithelp.ithome.com.tw/articles/10185583" class="dj by iy iz ja jb" target="_blank" rel="noopener nofollow">https://ithelp.ithome.com.tw/articles/10185583</a></li><li id="1241" class="ik il em at im b in kp ip kq ir kr it ks iv kt ix km kn ko"><a href="https://www.arthurtoday.com/2012/01/prototype-based-language.html" class="dj by iy iz ja jb" target="_blank" rel="noopener nofollow">https://www.arthurtoday.com/2012/01/prototype-based-language.html</a></li>
</ol>
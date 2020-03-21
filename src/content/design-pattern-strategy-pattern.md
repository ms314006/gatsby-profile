---
layout: post
title: Design Pattern | 從復仇者看策略模式（ Strategy Pattern ） feat. TypeScript
image: img/typeScript.jpg
author: GQSM
date: 2019-07-23T07:08:26.149Z
draft: false
tags: 
  - Design Pattern
  - Strategy Pattern
  - TypeScript
---

## 前言

Hi！大家好，我是神 Q 超人。其實設計模式是我一直想要講的主題，從一開始看到書的時候，就一直想講，但要補的基礎實在是滿多的，所以才會拖到現在才生出第一篇，好不容易讓我抓到機會，趁著前幾天剛講完 <a class="cx ga iz ja jb jc" target="_blank" rel="noopener" href="/enjoy-life-enjoy-coding/typescript-從-ts-開始學習物件導向-class-用法-20ade3ce26b8">Class</a> 和 <a class="cx ga iz ja jb jc" target="_blank" rel="noopener" href="/enjoy-life-enjoy-coding/typescript-從-ts-開始學習物件導向-interface-用法-77fd0959769f">Interface</a> ，就來看看它們能在 Design Pattern 中做出怎樣的精彩共演吧！

---

## Strategy Pattern 策略模式
<br/>

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">Strategy Pattern 主要在處理各種既相同，但做起來又不太一樣的行為。將行為抽離後，視情況隨意組合切換。</span>

將行為抽離後，視情況隨意組合切換。

### 設計時的狀況情境

下方先介紹造成系統設計變得複雜的例子，最後再展示 Strategy Pattern 是如何優雅解決這個問題。

上方提到既相同又不太一樣的行爲似乎有點矛盾，但是仔細想想，就像「飛」這個動作好了，索爾、鋼鐵人、幻視、蜘蛛人都會飛，但是它們飛的方法都不一樣對吧？

也許大家可以想到將「飛的行為」寫到 Inheritance （繼承） <code class="hp ku kv kw kx b">TheAvengers</code> 的 Child Class （子類別）中，例如索爾、鋼鐵人等等…但是

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">這個「飛」的行為實現就會重複分佈在各個 Child Class （子類別）中。</span>

這麼做顯然不是很好維護，因此你又將「飛」的主要行為「脫離地心引力」給提到了「復仇者」這個 Parent Class （父類別），然後把每個人實現「飛」的方式用 Inheritance 做 Override ，但是

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">你絕對不會想看見浩克在天上飛對吧？</span>

於是你開始檢查繼承了 <code class="hp ku kv kw kx b">TheAvengers</code> 的所有 Child Class ，找到了浩克、黑寡婦，等等不會飛的復仇者，將它們的「飛」寫成不做任何事的空 Function ，來 Override 在 Parent Class 中的行為，像這樣子：

```TypeScript
class Hulk extends TheAvengers {
  public fly():void {
  
  }
}
```

天啊！看著這些 Code 你心裡會有什麼想法？但身為工程師的直覺正告訴你，「絕對不會是這麼一回事。」對吧？於是 Google 後，你的瞳孔映射出的 Strategy Pattern 正閃著光芒。

### Strategy Pattern 實作流程

有解決問題的方法，那就一定會有解決的流程，以下將解決的流程分成幾項。

### 找出實作不同的相同行為

以復仇者的例子來說，相同的行為是「飛」，於是我們將「飛」給抽出來，設計成 Interface ，並實作出幾種 Class ，代表各種「達成行為的方式」：

```TypeScript
interface IFlyBehavior {
  fly(name: string): void;
}

class CanNotFly implements IFlyBehavior {
  public fly(name: string): void {
    console.log(`${name} 不會飛`);
  }
}

class FlyWithHammer implements IFlyBehavior {
  public fly(name: string): void {
    console.log(`${name} 用錘子飛`);
  }
}

class FlyWithArmor implements IFlyBehavior {
  public fly(name: string): void {
    console.log(`${name} 穿著鋼鐵裝飛`);
  }
}
```

### 在 Parent Class 中透過 Interface 執行行為

將飛的方式抽成 Interface ，並用不同的 Class 實現後，要能夠在 Parent Class 中去執行，因此得將實現行為的 Class 放進 Parent Class 的屬性裡。

這時候接口就派上用場了，因為不論是哪種飛的方式，都是 <code class="hp ku kv kw kx b">IFly</code> 的實現，所以可以透過 <code class="hp ku kv kw kx b">IFly</code> 定義屬性的型別，再直接以該接口執行行為：

```typescript
class TheAvengers {
  public name: string;

  private flyBehavior: IFlyBehavior;

  constructor(name: string, flyBehavior: IFlyBehavior) {
    this.name = name;
    this.flyBehavior = flyBehavior;
  }

  public fly(): void {
    this.flyBehavior.fly(this.name);
  }
}
```

上方的第 4 行就是定義 <code class="hp ku kv kw kx b">flyBehavior</code> 屬性，並將它的型別指定為接口 <code class="hp ku kv kw kx b">IFlyBehavior</code> ，如此一來不論是實現何種飛的 Class ，都可以在 <code class="hp ku kv kw kx b">constructor</code> 時放進 <code class="hp ku kv kw kx b">flyBehavior </code>中。

第 11 行的 <code class="hp ku kv kw kx b">fly()</code> 裡沒有任何「飛的邏輯」在裡面，而是透過 <code class="hp ku kv kw kx b">flyBehavior</code> 去執行「飛」。

最後還有繼承了 <code class="hp ku kv kw kx b">TheAvengers</code> 的 Child Class ，它們除了要處理各自的屬性外，還要在 Constructor 中將剛剛建立的行為給 <code class="hp ku kv kw kx b">TheAvengers</code> ：

```typescript
// 下方三個 Child Class 繼承了 TheAvengers ，並將飛的行為用 super 送給 TheAvengers
class Hulk extends TheAvengers {
  constructor() {
    super('浩克', new CanNotFly());
  }
}

class Thor extends TheAvengers {
  constructor() {
    super('索爾', new FlyWithHammer());
  }
}

class IronMan extends TheAvengers {
  constructor() {
    super('鋼鐵人', new FlyWithArmor());
  }
}

// 建立 instance
const hulk = new Hulk();
const thor = new Thor();
const ironMan = new IronMan();

// 各自執行飛的動作
theHulk.fly(); // 浩克 不會飛
thor.fly();    // 索爾 用錘子飛
ironMan.fly(); // 穿著鋼鐵人裝飛
```

注意哦！這時候所有的 <code class="hp ku kv kw kx b">fly</code> 行為都是委託 <code class="hp ku kv kw kx b">IFly</code> 接口執行，在 <code class="hp ku kv kw kx b">TheAvengers</code> 裡根本就不需要知道是怎麼辦到的，

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">只要知道它接收了 IFly 接口類型，一定會有這個 fly Method 存在，不論他到底會做什麼，把執行飛的邏輯與 TheAvengers 拆開，只透過接口執行，就是把行為給封裝起來，</span>

封裝後再利用組合的方式處理不同的飛行方式，因為每個飛行方式都是一個實現了 <code class="hp ku kv kw kx b">IFly</code> 的獨立 Class ，所以說，如果當我在 <code class="hp ku kv kw kx b">TheAvengers</code> 中再加上 <code class="hp ku kv kw kx b">setFlyBehavior</code> 這個 Method ，重新設定 <code class="hp ku kv kw kx b">flyBehavior</code> 屬性：

```typescript
class TheAvengers {

  /*其餘省略*/

  public setFlyBehavior(flyBehavior: IFlyBehavior): void {
    this.flyBehavior = flyBehavior;
  }
}
```

這麼一來，當有天浩克在路上撿到索爾的錘子，那他也就飛的起來：

```typescript
const hulk = new Hulk();
hulk.fly();  // 浩克 不會飛

// 重新對浩克設定飛的行為
hulk.setFlyBehavior(new FlyWithHammer());

hulk.fly(); // 浩克 用錘子飛
```

### 結論

以下整理幾點關於 Strategy Pattern 的好處：

<ol>
<li id="77f5" class="il im ea ar in b io kp iq kq is kr iu ks iw kt iy lt lu lv">所有用不同方式實現的同一行為，都可以藉由 Interface 定義型別，所以不會綁定某個 Class ，造成耦合性太高。</li><li id="aad1" class="il im ea ar in b io lw iq lx is ly iu lz iw ma iy lt lu lv">因為是用 Interface 的關係，所以不論遇到什麼樣的狀況，都能夠自由切換不同的實現方式，只要它也是同一個 Interface 的實現。</li><li id="2b8d" class="il im ea ar in b io lw iq lx is ly iu lz iw ma iy lt lu lv">比起用 Inheritance 控制，將行為抽出後便能統一管理各個實現行為的邏輯，而不是讓這些邏輯重複且分散在各個 Child Class 中。</li><li id="1bd5" class="il im ea ar in b io lw iq lx is ly iu lz iw ma iy lt lu lv">因為行為被封裝起來了，所以 Class 只需要針對 Interface 做處理，而不是那些實現的行為。</li>
</ol>

如果大家看完文章，對 Strategy Pattern 有興趣的話，可以到筆者練習的 <a href="https://github.com/ms314006/Design-Pattern-With-TypeScript/blob/master/StrategyPattern/README.md" class="cx ga iz ja jb jc" target="_blank" rel="noopener nofollow">GitHub</a> ，裡面有很多在練習時到處玩的例子，可以一起交流！

---

本篇文章打起來的感覺很新奇，因為第一次不是介紹作法，而是講解怎麼應用，因此在開始時試著用一些情境，讓大家了解在開發時遇到的問題，再帶出 Design Pattern ，如果文章中有任何可以改進的地方、或是問題，再麻煩留言告訴我，感激不盡 &#x1F647;。

參考文章

<ol>
<li id="a319" class="il im ea ar in b io kp iq kq is kr iu ks iw kt iy lt lu lv"><a href="https://www.tenlong.com.tw/products/9789867794529" class="cx ga iz ja jb jc" target="_blank" rel="noopener nofollow">深入淺出設計模式 (Head First Design Patterns)</a></li>
</ol>
---
layout: post
title: Jest | 再一次測試你的 Component-feat.react-testing-library 基本用法
image: img/react&jest.jpg
author: GQSM
date: 2019-06-16T07:12:09Z
draft: false
tags: 
  - Unit Testing
  - React Testing Library
  - React
  - JavaScript
  - Jest
---

## 前言

Hi ！大家好，雖然之前有使用 <a href="https://github.com/airbnb/enzyme" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">Enzyme</a> 講解如何搭配 <a href="https://jestjs.io/" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">Jest</a> 對 <a href="https://reactjs.org/" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">React</a> 的Component 做測試，但是幾個禮拜前偶然在某個討論串中看到有大神推薦另一套測試 Component 的套件 <a href="https://github.com/testing-library/react-testing-library" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">react-testing-library</a> ，功能和 Enzyme 相同，兩者都是在測試時 Render Component 的 DOM 下斷言測試，如果是剛接觸 Enzyme 的朋友，不妨可以參考看看兩者的不同，來選擇愛用套件 &#x1F603; 。

---

## react-testing-library

### SUT （測試目標）

在開始測試之前，仍然需要一個小助手，這裡請出之前常露面的 <code class="hu ki kj kk kl b">Counter</code> 來擔任 SUT：

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, changeCount] = useState(0);

  return (
    <div>
      <span data-testid="display_count">{`點了${count}下`}</span>
      <br />
      <button
        className="add_button"
        type="button"
        onClick={() => { changeCount(count + 1); }}
      >
        點我加 1
      </button>
      <button
        className="add_button"
        type="button"
        onClick={() => { changeCount(count + 2); }}
      >
        點我加 2
      </button>
    </div>
  );
};

export default Counter;

```

### 安裝 react-testing-library

因為只有在開發時的 Test 上用得到套件，因此安裝在 devDependencies 裡：

<pre><span id="fca4" class="jw ig em at kl b fp kp kq r kr">npm install --save-dev react-testing-library</span></pre>

<div style="border-left: 4px solid #333; padding-left: 26px; margin: 20px 0px; font-size: 20px; font-style: italic; ">
6 / 16 更新：要注意哦！ react-testing-library 似乎在版本 8 的時候將套件換成 @testing-library/react 了，目前筆者還不曉得差異在哪裡，使用來也沒有感到差別，所以如果文章中有問題再麻煩留言告知，感激不盡！</div>

<pre><span id="9c73" class="jw ig em at kl b fp kp kq r kr">//新版本：<br>npm install --save-dev <!-- -->@testing-library/react</span></pre>

### 常用 API

撰寫測試前，先簡單說明幾個常用的 API ：

### render

react-testing-library 的 <code class="hu ki kj kk kl b">render</code> 類似於 Enzyme 中的 <code class="hu ki kj kk kl b">Mount</code> ，意思是它會將所有的子組件都 <code class="hu ki kj kk kl b">render</code> 出來成為 DOM 節點。

### getByTestId 、 getByText

<code class="hu ki kj kk kl b">render</code> 後會回傳的 Method ，兩個都是用來搜尋 DOM ， <code class="hu ki kj kk kl b">getByTestId</code> 是以 DOM 中的 <code class="hu ki kj kk kl b">data-testid</code> 值取要斷言的 DOM ， <code class="hu ki kj kk kl b">getByText</code> 則是以該 DOM 內呈現的內容，獲取到 DOM 後便能以 <code class="hu ki kj kk kl b">textContent</code> 再取得內容。

### container

<code class="hu ki kj kk kl b">container</code> 也是 <code class="hu ki kj kk kl b">render</code> 所回傳的，等於取得整包 DOM 物件，甚至是能夠直接對它使用 <a href="https://developer.mozilla.org/zh-TW/docs/Web/API/Document/querySelector" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">query​Selector</a> 來搜尋節點，通常我會在搞不清楚到底 Render 了什麼的時候，用 <code class="hu ki kj kk kl b">innerHTML</code> 來偷看 &#x1F606;。

### fireEvent

這個 Method 可以觸發 DOM 的事件，例如 <code class="hu ki kj kk kl b">onClick</code> 、 <code class="hu ki kj kk kl b">onChange</code> 等等。

### 開始測試

其實只要了解上述幾個簡單的 API ，就能夠輕鬆對 Component 的節點做測試，下方先 <code class="hu ki kj kk kl b">render</code> 出 <code class="hu ki kj kk kl b">Counter</code> ，並對 <code class="hu ki kj kk kl b">span</code> 的內容做斷言，確認是否 <code class="hu ki kj kk kl b">render</code> 正確：

```javascript
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Counter from '../src/component/Countera/Counter';

describe('Test <Counter />', () => {
  // 每次測試後將 render 的 DOM 清空
  afterEach(cleanup);
  test('測試是否正常 render ', () => {
    // render Component
    const { getByTestId, getByText, container, } = render(<Counter />);

    // 下方三個方法都可以找到顯示計數的 <span />
    expect(getByTestId('display_count').textContent).toBe('點了0下');
    expect(getByText('點了0下').textContent).toBe('點了0下');
    expect(container.querySelector('span').innerHTML).toBe('點了0下');
  });
});

```

上方用了三種方式去取得 <code class="hu ki kj kk kl b">span</code> 來確認 Component 顯示的是否正確， <code class="hu ki kj kk kl b">getByTestId</code> 就是直接抓取相同 <code class="hu ki kj kk kl b">data-testid</code> 的 DOM，然後如果不幸有兩個 DOM 同時用了一樣的 <code class="hu ki kj kk kl b">data-testid</code> 那測試就會發生錯誤：

<div><img class="dz t u hq ak" src="https://miro.medium.com/max/3752/1*1czrETEUgqfUeGtqzA9N1w.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>顯示找到複數的錯誤</span>
          </div></div><br/>

但錯誤的提示還滿不錯的，如果真的必須要取同樣的名稱，也可以用 <code class="hu ki kj kk kl b">getAllByTestId</code> ，來獲得一個陣列，當然它也是由 <code class="hu ki kj kk kl b">render</code> 回傳的 Method 之一。

第二種方式是以 DOM 的內容來獲取，因為一開始 <code class="hu ki kj kk kl b">Counter</code> 中 <code class="hu ki kj kk kl b">State</code> 的 <code class="hu ki kj kk kl b">count</code> 值是 0 ，所以可以知道 <code class="hu ki kj kk kl b">span</code> 的內容會是 <code class="hu ki kj kk kl b">點了0下</code> ，這個 Mtehod 可以用在內容不會改變的地方，像是登入按鈕的字就永遠是登入，儲存就永遠是儲存，不會有變化，這種情況就能用 <code class="hu ki kj kk kl b">getByText</code> 。

第三種的 <code class="hu ki kj kk kl b">container</code> 就把它當成 <code class="hu ki kj kk kl b">JavaScript</code> 取得的物件就好，但通常不會使用它來查找 DOM ，但為什麼？不是很方便嗎？這個是有原因的，文章的最後會整理一些結論。

接著，要來確認的是按鈕的事件，點擊時會不會讓 <code class="hu ki kj kk kl b">count</code> 值加上一或二，這時候就能用到剛剛提及的 <code class="hu ki kj kk kl b">getByText</code> 因為按鈕的文字是不會改變的，找到按鈕後就能使用 <code class="hu ki kj kk kl b">fireEvent</code> 觸發點擊：

```javascript
test('測試點擊功能是否正常', () => {
  // render 畫面
  const { getByText, getByTestId, } = render(<Counter />)

  // 首先找到 +1 button
  let addButton = getByText('點我加 1');
  fireEvent.click(addButton);
  expect(getByTestId('display_count').textContent).toBe('點了1下')

  // 接著找到 +2 button
  addButton = getByText('點我加 2');
  fireEvent.click(addButton);
  expect(getByTestId('display_count').textContent).toBe('點了3下');
});
```

如果是 <code class="hu ki kj kk kl b">change</code> 也是一樣的方式，只需將改變的值放在 <code class="hu ki kj kk kl b">fireEvent</code> 的第二個參數，要注意的是改變的值仍然要模擬觸發事件本身的 <code class="hu ki kj kk kl b">event</code> ：

```javaScript
fireEvent.change(input, { target: { value: &apos;2&apos;, }, });
```

測試結果如下：

<div><img class="dz t u hq ak" src="https://miro.medium.com/max/2020/1*RBHGTr7uZK43TLMPjesUnA.png" role="presentation"></div><br/>

感覺上寫起來是不是直觀許多了？而且在這之前一直故意不去提，不曉得大家有沒有發現，上述的 <code class="hu ki kj kk kl b">Counter</code> 是透過 Hooks 的 <code class="hu ki kj kk kl b">useState</code> 管理 State ，也就是說 react-testing-library 百分之百完美相容 Hooks ，測試起來絕對不會有問題！

顯然這是個令人開心的消息，但 Redux 呢？會不會相對變得複雜？

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">你的考量，我看得見！</span>

下方就持續講解該如何在 Redux 專案中進行測試！

## Redux

這裡先將小助手 <code class="hu ki kj kk kl b">Counter</code> 申裝上 Redux ：

```jsx
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCounter } from '../../actions/Counter';

export const Counter = (props) => {
  const { count, addCount, } = props;
  return (
    <div>
      <span data-testid="display_count">{`點了${count}下`}</span>
      <br />
      <button className="add_button" type="button" onClick={() => { addCount(1); }}>點我加 1</button>
      <button className="add_button" type="button" onClick={() => { addCount(2); }}>點我加 2</button>
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number,
  addCount: PropTypes.func,
};

Counter.defaultProps = {
  count: 0,
  addCount: () => { console.log('error'); },
};

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  addCount: addQuantity => dispatch(addCounter(addQuantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

也少不了 Redux 的標配 <code class="hu ki kj kk kl b">actions</code> 、 <code class="hu ki kj kk kl b">reducer</code> 、 <code class="hu ki kj kk kl b">store</code> ：

```javascript
export const ADD_COUNTER = 'ADD_COUNTER';

export const addCounter = addQuantity => ({
  type: ADD_COUNTER,
  payload: { addQuantity, },
});

```

### 開始測試

欸等等？不需要再裝些什麼其他 <code class="hu ki kj kk kl b">redux-mock-store</code> 嗎？

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">完全不用</span>

貫徹 <code class="hu ki kj kk kl b">Mount</code> 的精神，就直接用正式的 <code class="hu ki kj kk kl b">Reducer</code> 正式的 <code class="hu ki kj kk kl b">store</code> 來測試，把覆蓋率蓋好蓋滿，以下會示範三種在 Redux 中玩轉測試的方法。

### 直接使用 Reducer 創建 Store

```javascript
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Counter from '../src/component/CounterWithRedux/Counter';
import reducer from '../src/reducer/Counter';

describe('test <Counter />', () => {
  afterEach(cleanup);

  test('直接用目前的 reducer render', () => {
    // 用 import 的 reducer createStore
    const store = createStore(reducer);

    // 做 render
    const { getByText, getByTestId, } = render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    // 印出 store 保管的 state 狀態
    console.log(store.getState());

    fireEvent.click(getByText('點我加 1'));
    expect(getByTestId('display_count').textContent).toBe('點了1下');

    // 印出 store 保管的 state 狀態
    console.log(store.getState());
  });
});

```

在 <code class="hu ki kj kk kl b">render</code> 的時候就直接帶入 Store 了，而且例子中有特別印了關於 Store 的兩段 <code class="hu ki kj kk kl b">console.log</code> ，可以清楚看見 Store 會隨著測試改變 State 的值：

<div><img class="dz t u hq ak" src="https://miro.medium.com/max/1868/1*0FMm6JI58juOtMbOG22KkQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>Store 的值會隨著測試的過程改變</span>
          </div></div><br/>

如此一來也能更方便的知道，觸發某個 <code class="hu ki kj kk kl b">dispatch</code> 後， Store 內的 State 變化是不是在預料之中。

### 指定 Reducer 的預設值

除了用原有的 Reducer 外，也能另外指定 State 取代 Reducer 自身的初始 State ：

```javascript
test('預設 reducer 的初始值，從 2 開始', () => {
  // 另外設定初始 State
  const initialState = {
    count: 2,
  };

  // 將 initialState 與 Reducer 一同 createStore
  const store = createStore(reducer, initialState);

  const { getByText, getByTestId, } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  // +1
  fireEvent.click(getByText('點我加 1'));
  expect(getByTestId('display_count').textContent).toBe('點了3下');
});
```

### 自訂 <code class="hu ki kj kk kl b">renderWithRedux</code>

這個 <code class="hu ki kj kk kl b">render</code> 方式不是 react-testing-library 原有的 Method ，而是官方用了一些小技巧另外寫的，它長這樣子：

```javascript
const renderWithRedux = (ui, { initialState, store = createStore(reducer, initialState), } = {}) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});
```

看起來有點複雜，但其實內部的原理就是將上方例子 <code class="hu ki kj kk kl b">render</code> 的步驟簡化成 Method ，回傳的結果也和 <code class="hu ki kj kk kl b">render</code> 後的 <code class="hu ki kj kk kl b">Component</code> 一樣，只是會多傳一個 Store ，實際用起來如下：

```javascript
test('直接預設 store ，保管的 state 從 -3 開始', () => {
   const store = createStore(reducer, {
     count: -3,
   });
   
   // 使用 renderWithRedux 回傳 render 後的結果
   const { getByText, getByTestId } = renderWithRedux(<Counter />, { store, });
   
   // +2
   fireEvent.click(getByText('點我加 2'));
   expect(getByTestId('display_count').textContent).toBe('點了-1下');
 });

```

筆者也建議可以直接使用 <code class="hu ki kj kk kl b">renderWithRedux</code> ，讓測試的畫面看起來比較乾淨俐落，不會定義一堆重複的東西，上方關於 Redux 的例子也都會改成 <code class="hu ki kj kk kl b">renderWithRedux</code> 重新寫在<a href="https://github.com/ms314006/Reac-Test-With-react-testing-library" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">筆者的 GitHub 上</a>，可以再參考看看。

## 使用心得

react-testing-library 的基本方法大家都應該了解了，最後就來談談使用的心得。

一開始最困惑的點是 <code class="hu ki kj kk kl b">getByTestId</code> 和 <code class="hu ki kj kk kl b">getByText</code> ，根本就不曉得到底為什麼要這樣子做，因此大量了使用 <code class="hu ki kj kk kl b">container</code> 搭配 <code class="hu ki kj kk kl b">querySelector</code> 抓取想斷言的 DOM ，初期用得很開心，但是最後突然發現，如果節點的位置發生改變，或多了另一個 DOM ，都有可能會讓 Test Case 錯誤，但其實不是錯在邏輯，而是因為原本的 <code class="hu ki kj kk kl b">querySelector</code> 已經取不到更改前的 DOM 。

這裡 react-testing-library 的開發者 Kent C. Dodds<strong class="is ly"> </strong>，也有在他的 <a href="https://kentcdodds.com/blog" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">Blog</a> 寫了<a href="https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">一篇文章</a>提出對 UI 面對測試時的看法

文章裡有個最簡單的例子，當假設 Component 中有一個按鈕：

```HTML
<button className="button_style" type="button">點我</button>
```

那 Test Case 會這樣子得到它：

```javascript
container.querySelector('button[class="button_style"]')
```

看起來一切正常，但是當對 Component 做了異動：

```HTML
<div>
  <button className="button_style" type="button">想不到吧</button>
  <button className="button_style" type="button">點我</button>
</div>
```

原本 Test Case 中的 <code class="hu ki kj kk kl b">querySelector</code> 就取成第一個新增的按鈕，而不是原有的 <code class="hu ki kj kk kl b">點我</code> 按鈕。

再來，若是有天 <code class="hu ki kj kk kl b">button</code> 們都不再需要依賴 <code class="hu ki kj kk kl b">button_style</code> 這個樣式，那是否應該要為了 Test Case 而將這沒有任何用的 ClassName 屬性留下？答案應該很明顯。

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">因此，提升 UI 在測試時的適應力非常重要！</span>

如果考量到 <code class="hu ki kj kk kl b">data-testid</code> 被 build 後會被看見，也可以透過 <a href="https://www.npmjs.com/package/babel-plugin-react-remove-properties" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">babel-plugin-react-remove-properties</a> 將 <code class="hu ki kj kk kl b">data-testid</code> 移除。

---

本文用了一些例子講解 react-testing-library ，因為筆者大約是今年三月多才開始玩測試，所以 Enzyme 及 react-testing-library 體感上會偏好使用後者，因為寫起來還滿方便的而且又支援 Hooks &#x1F605;，不過如果有不同看法，也歡迎提出一起討論！

最後對於文章中講解有任何不清楚或是覺得有需要補充的地方，再麻煩留言指教，謝謝！

參考文章：

<ol>
<li id="3ae2" class="iq ir em at is b it kw iv kx ix ky iz kz jb la jd lz ma mb"><a href="https://github.com/testing-library/react-testing-library" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">https://github.com/testing-library/react-testing-library</a></li><li id="d96f" class="iq ir em at is b it mc iv md ix me iz mf jb mg jd lz ma mb"><a href="https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change" class="dj by je jf jg jh" target="_blank" rel="noopener nofollow">https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change</a></li>
</ol>
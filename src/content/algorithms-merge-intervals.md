---
layout: post
title: JS 的演算法養成之路 | Merge Intervals
image: img/algorithms-merge-intervals.jpg
author: GQSM
date: 2020-01-26T09:55:45
draft: false
tags: 
  - Algorithms
  - JavaScript
---

## 前言

Hi！大家好，我是神 Q 超人。這篇是練習演算法的文章，雖然目前還是很菜，但是希望可以藉由把自己的解法分享給大家，來互相討論得到進步！

---

題目：<a href="https://leetcode.com/problems/merge-intervals/" class="at cg go gp gq gr" target="_blank" rel="noopener nofollow">56. Merge Intervals</a>

難易度：Medium

問題描述：給定一個陣列，裡面的每一個元素都會是裝著兩個數字的陣列，而這兩個數字代表範圍，我們要做的就是將每個元素間有重疊到範圍的部分合併或是移除，結果必須要回傳一個新的陣列。

測試案例：

<pre>
<span id="2d81" class="hs ht dc bk hu b eg hv hw r hx">example1:</span><span id="dd60" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">Input: [[1, 4], [2, 7], [8, 14]]<br>Output: [[1, 7], [8, 14]]<br>Explanation: Input 陣列中的第二個元素的起始數字是 2，但因爲 2 已經包含在第一個元素的 1 和 4 之間了，所以直接將兩個元素合併。</span><br />

<span id="542a" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">example2:</span><span id="b5e5" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">Input: [[1, 4], [4, 6]]<br>Output: [[1, 6]]<br>Explanation: Input 陣列中的第二個元素起始數字是 4，但它與第一個元素的結束數字 4 相等，所以也可以直接合併成一個元素，範圍則是 1 和 6。</span><br />

<span id="2ac3" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">example3:</span><span id="c941" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">Input: [[1, 4], [0, 4], [6, 10]]<br>Output: [[0, 4], [6, 10]]<br>Explanation: Input 陣列中的第二個元素的起始數字是 0，但是 0 比第一個元素的 1 和 4 還小，所以要合併成一個元素，範圍則變成 0 和 4。</span><br />

<span id="2a74" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">example4:</span><span id="5f92" class="hs ht dc bk hu b eg hy hz ia ib ic hw r hx">Input: [[1, 8], [3, 6]]<br>Output: [[1, 8]]<br>Explanation: 因為 Input 陣列中的第一個元素範圍是 1 到 8，而 8 已經大於第二個元素的範圍了，所以就直接被合併成一個。</span></pre>
<br/>
思考過程：

這一題的主要想法有兩個步驟：

<ol>
<li id="9082" class="gs gt dc bk gu b gv gw gx gy gz ha hb hc hd he hf id ie if">因為第二個測試案例的關係，發現它給的陣列不一定會由小到大排序，所以一開始先為陣列以每個元素的起始數字做排序。</li><li id="98e8" class="gs gt dc bk gu b gv ig gx ih gz ii hb ij hd ik hf id ie if">透過迴圈判斷需不需要被合併，或是直接移除下一個元素。</li>
</ol>

解法：

```javascript
var merge = function(intervals) {
  if (intervals.length === 0) return [];
  let workIntervals = intervals.sort((a, b) => a[0] - b[0]);
  const result = [workIntervals.shift()];
    
  while(workIntervals.length > 0) {
    const lastIndex = result.length - 1;
    const [intervalStart, intervalEnd] = workIntervals[0];
    if (result[lastIndex][1] >= intervalEnd) {
      workIntervals.shift();
    } else if (result[lastIndex][1] >= intervalStart) {
      result[lastIndex][1] = intervalEnd;
      workIntervals.slice(1);
    } else {
      result.push(workIntervals.shift());
    }
  }
  return result;
};
```

首先判斷傳進來的陣列如果是空的話就也回傳空的，而如果有值的話就將陣列用每個元素的起始值排序，接下來把第一個元素丟進 <code class="gd im in io hu b">result</code> 中，再透過 <a href="https://www.w3schools.com/js/js_loop_while.asp" class="at cg go gp gq gr" target="_blank" rel="noopener nofollow">while</a> 迴圈判斷三種狀況來處理下一個元素，而三種狀況分別是：

<ol>
<li id="23ec" class="gs gt dc bk gu b gv gw gx gy gz ha hb hc hd he hf id ie if">當前元素的結束值大於下一個元素的結束值，那就直接把下一個元素移除。</li><li id="8a96" class="gs gt dc bk gu b gv ig gx ih gz ii hb ij hd ik hf id ie if">當前元素的結束值大於下一個元素的起始值，那就代表要合併，所以把當前元素的結束值要變成下個元素的結束值。</li><li id="a1f9" class="gs gt dc bk gu b gv ig gx ih gz ii hb ij hd ik hf id ie if">最後是如果都沒有重疊，那就直接把下一個元素不做處理放進結果裡面。</li>
</ol>

這個解法的效能其實很不好，因為一開始先排序的關係，就會先把每個元素都跑一次，然後處理完排序又要再跑一次迴圈比對每一個元素是否該合併或是移除，所以如果陣列內的元素越多，那這個解法的效率就會越差。

挑戰成績：

<div><img class="cp t u fz ak" src="https://miro.medium.com/max/2996/1*PeK8s3UK7jlccuc_Oymg_A.png" role="presentation"></div><br/>

---

這次選擇的題目難度是 Medium 的！也是本系列中第一個 Medium 等級的題目（第二篇就晉級會不會太快 &#x1F602;），認真說感覺還滿苦手的，尤其是第一次解出來後，有點想優化效能又不知道從哪裡開始，如果有任何建議或問題歡迎各位留言和我討論 &#x1F64C;
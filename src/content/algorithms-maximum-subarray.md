---
layout: post
title: JS 的演算法養成之路 | Maximum Subarray
image: img/algorithms-maximum-subarray.jpg
author: GQSM
date: 2020-02-21T15:30:36
draft: false
tags: 
  - Algorithms
  - JavaScript
  - w3HexSchool
---

## 前言

Hi，大家好！我是神 Q 超人。每次想不到有什麼文章可以打的時候就來解解演算法，剛好也可以為未來的面試做準備，實在是一舉兩得 &#x1F602;。

這次的題目難度是 Easy，但還是偷走我不少時間去苦惱，一起來看看最後怎麼解掉他 &#x1F64C;。

---

題目：<a href="https://leetcode.com/problems/maximum-subarray/" class="at ey he hf hg hh" target="_blank" rel="noopener nofollow">56. Maximum Subarray</a>

難易度：Easy

問題描述：給定一個陣列，然後找出相鄰元素（最少一個）相加能得到的最大總和。

測試案例：

<pre>
<span id="f9fa" class="hl hm ct bk hn b dx ho hp r hq">example1:Input: [-2,1,-3,4,-1,2,1,-5,4]</span>
<span id="f407" class="hl hm ct bk hn b dx hr hs ht hu hv hp r hq">Output: 6</span>
<span id="da5d" class="hl hm ct bk hn b dx hr hs ht hu hv hp r hq">Explanation: 6 是由 [4, -1, 2, 1,] 加起來得到的，是相鄰元素相加能得到的最大總和。</span>
</pre>
<br/>
思考過程：

一開始想的很單純，就是去讀陣列裡的所有元素，然後一個一個相加，如果「這一次的加總」比「上一次紀錄的加總」大就更新最大加總，解法大概是這樣子：

```javascript
var maxSubArray = function(nums) {
   // 「最大加總」和「目前加總」預設 Array 第一個值
  const maxSum = currentSum = nums[0];
 
  for(let i = 1; i <= nums.length; i += 1) {
    currentSum += nums[i]; // 一開始相加
    if (currentSum > maxSum) {
      maxSum = currentSum;  // 新的加總比較大就更新最大加總
    } else {
      /*
        如果沒比較大就把加總的起始元素變成下一個，
        因為保留這個會讓最大值變小，所以加總元素裡不需要有他。
      */
      currentSum = 0;
    }
  }
 
  return maxSum;
};
```

但是這樣會有問題，假如我的 Input 是 <code class="ga hx hy hz hn b">[-2, 1, -3, 4, -1, 2, 1, -5, 4]</code>，那執行的過程會如下：

<pre>
<span id="28cf" class="hl hm ct bk hn b dx ho hp r hq">一開始設定 maxSum 和 currentSum 都是 -2。</span>
<span id="f761" class="hl hm ct bk hn b dx hr hs ht hu hv hp r hq">第一次迴圈：currentSum 加上 -1 等於 -1，所以會比 maxSum 存著的 -2 還大，於是更新 maxSum，currentSum 繼續加總。</span>
<span id="cbf7" class="hl hm ct bk hn b dx hr hs ht hu hv hp r hq">第二次迴圈：currentSum 加上 -3 等於 -4，而 -4 比 maxSum 目前存著的 -1 還小，因此不更新 maxSum，然後 currentSum 歸 0 從下一個元素開始重新加。</span>
<span id="396d" class="hl hm ct bk hn b dx hr hs ht hu hv hp r hq">第三次迴圈：currentSum 加上 4 等於 4，所以比目前 maxSum 存著的 -1 還大，所以更新 maxSum，然後讓 currentSum 繼續加總。</span>
<span id="dcc8" class="hl hm ct bk hn b dx hr hs ht hu hv hp r hq">* 問題出在這裡 *<br>第三次迴圈：currentSum 加上 -1 等於 3，比目前 maxSum 中的 4 還小，因此不更新 maxSum，然後 currentSum 歸 0。</span>
</pre>
<br/>

這個解法的 Bug 在於，4 之後所有的元素都不會比 4 還大，所以 <code class="ga hx hy hz hn b">currentSum</code> 會一直被歸 0，中斷與下次的加總，導致沒辦法算到 <code class="ga hx hy hz hn b">4 + -1 + 3</code> 這個更大的結果，maxSum 也永遠是 4。

後來又多想了一下，決定將判斷的部分改成

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">如果 currentSum 加上 num[i]，反而小於 num[i]，那就把 currentSum 改成 num[i]</span>


因為前面的 <code class="ga hx hy hz hn b">currentSum</code> 加上 num[i]，如果不會讓 <code class="ga hx hy hz hn b">currentSum</code> 變得比 num[i] 更大，那就不如不要前面那些總計了，直接把 <code class="ga hx hy hz hn b">currentSum</code> 改成 num[i] 繼續加總，而在 <code class="ga hx hy hz hn b">currentSum</code> 每次加總完也都和當前的 <code class="ga hx hy hz hn b">maxSum</code> 比較一下，如果比較大的話就更新 <code class="ga hx hy hz hn b">maxSum</code>。

所以解法最後如下：

```javascript
var maxSubArray = function(nums) {
  let currentSum = maxSum = nums[0];

  for(let i = 1; i < nums.length; i += 1) {
    currentSum += nums[i];
    if (currentSum < nums[i]) {
      currentSum = nums[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
};
```

重點就在於 <code class="ga hx hy hz hn b">if(surrentSum &lt; nums[i])</code> 這一行判斷，如果成立的話就直接把 <code class="ga hx hy hz hn b">surrentSum</code> 設定成更大的 nums[i]，接下來就只要一直加下一個元素，然後與 <code class="ga hx hy hz hn b">maxSum</code> 比較，比較大的話就更新，比較小的話就不動。

因為只跑一次陣列裡面的所有內容，時間複雜度應該是 O(n)，所以成績算是還不錯：

<div><img class="cg t u fw ak" src="https://miro.medium.com/max/3908/1*OyOVCoTvZRAuREzKRbd7sg.png" role="presentation"></div><br/>

---

<span style="
            font-size: 30px;
            color: rgb(105, 105, 105);
            font-style: italic;
            padding: 0px 60px;
            margin: 30px 0px;
          ">但可不是這樣子就結束了！</span>

在這道題目的解釋後面啊，還有附上這麼一句話：

<div style="display: flex;
    margin: 0 0 1.5em 0;
    font-style: italic;
    border-left: 3px solid;
    padding: 0 0 0 20px;">
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
</div>

非常耐人尋味的一句話，就像四大天王其實有五個人一樣，不過筆者就沒有繼續研究它了，覺得能夠解出來已經相當滿足 &#x1F602;，如果各位有更好或更棒的方式，請留言和我分享 &#x1F64C;。

如果文章中有任何問題，也請告知我，我在迅速修正，非常感謝！
---
layout: post
title: Line Bot | 使用 Python 為 Line Bot 建立獨一無二的圖文選單（ Rich menus）
image: img/line-bot-rich-menus.jpg
author: GQSM
date: 2019-01-29T22:02:10.149Z
draft: false
tags: 
  - Line
  - Line Bot
  - Python
---

## 基本圖文選單創建

為 Line Bot 建立基本的圖文選單其實不難，在 Line 為每個開發者提供的管理介面（ Line Developers ）就有這個功能：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/4724/1*eOBNCDoFusqKsSKtBc58iQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>可在 Line developers 中自行新增圖文選單</span>
          </div></div><br/>

建立選單的介面也很簡易：

Step1. 選擇圖文選單的版型，目前官方提供了七種樣式可供選擇：

<img class="dz t u hz ak" src="https://miro.medium.com/max/4436/1*tvxSpzSFD3i9Z3ubq8WbLw.png" role="presentation"><br/>

Step2. 上傳圖文選單的圖片及點擊固定區域時所執行的事情，例如：發送訊息、跳轉連結等等：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/4456/1*O22Tur24UDXwJmoAO17jMw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>上傳圖文選單的圖片及設定點擊時的事件</span>
          </div></div><br/>

上方兩個步驟完成後，便能得到一個標準的圖文選單：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/1356/1*EdB0ymbl61Knc2Nqan6jnw.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>使用版型一創建的簡易圖文選單</span>
          </div></div><br/>

儘管官方提供了簡易的後台操作、七種選單的版型，讓許多人都可以在短時間內建立一個符合自己需求的圖文選單，但是這終究無法滿足所有人。

## 建立 Rich menus

如上方所說，為了讓客戶在 Line Bot 上簡化操作，因此將功能置於圖文選單，透過點擊來完成事情是很重要的。

像是在事件數量大於 6 個（官方提供的最多可設定事件數）的情況：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/1708/1*jC1I-30WGYM9tO4Tsx_aaQ.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>此圖文選單的按鈕區塊多達九個</span>
          </div></div><br/>

或是需要不規則的特殊排列（官方提供的版型都是固定切割的），官方範例：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/1376/1*fmCu9bxQNHf6tHNm_d_lew.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>不規則的按鈕擺放方式</span>
          </div></div><br/>

以上兩種圖文選單的類型（ Rich menus ），都無法以官方提供的介面實現，必須另外使用 API 處理。

下方的範例會使用 <code class="id jd je jf jg b">Python</code> 和他的線上編輯器 <a href="https://jupyter.org/" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">Jupyter</a> ，再搭配 Line 提供的 API 套件 <a href="https://github.com/line/line-bot-sdk-python" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">line-bot-sdk-python</a> 實作。

### 新增 Rich menus

透過發送一個 <code class="id jd je jf jg b">request</code> 請求到 <a href="https://api.line.me/v2/bot/richmenu" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">https://api.line.me/v2/bot/richmenu</a> 創建 Rich menus ，該次請求需要在 <code class="id jd je jf jg b">headers</code> 中的 <code class="id jd je jf jg b">Authorization</code> 屬性內帶上該 Line Bot 的 Token 值， <code class="id jd je jf jg b">body</code> 內則是關於選單的設置，下方會再詳細說明 Token 該在哪取得及 <code class="id jd je jf jg b">body</code> 的設定內容，整個請求的樣貌會像這樣：

```Python
import requests
import json

headers = {"Authorization":"Bearer 3Ma92PMIfy790Z...","Content-Type":"application/json"}

body = {
    "size": {"width": 2500, "height": 1686},
    "selected": "true",
    "name": "Controller",
    "chatBarText": "Controller",
    "areas":[
        {
          "bounds": {"x": 551, "y": 325, "width": 321, "height": 321},
          "action": {"type": "message", "text": "up"}
        },
        {
          "bounds": {"x": 876, "y": 651, "width": 321, "height": 321},
          "action": {"type": "message", "text": "right"}
        },
        {
          "bounds": {"x": 551, "y": 972, "width": 321, "height": 321},
          "action": {"type": "message", "text": "down"}
        },
        {
          "bounds": {"x": 225, "y": 651, "width": 321, "height": 321},
          "action": {"type": "message", "text": "left"}
        },
        {
          "bounds": {"x": 1433, "y": 657, "width": 367, "height": 367},
          "action": {"type": "message", "text": "btn b"}
        },
        {
          "bounds": {"x": 1907, "y": 657, "width": 367, "height": 367},
          "action": {"type": "message", "text": "btn a"}
        }
    ]
  }

req = requests.request('POST', 'https://api.line.me/v2/bot/richmenu', 
                       headers=headers,data=json.dumps(body).encode('utf-8'))

print(req.text)


```

每個 Line Bot 的 Token 都可以在開發人員介面中找到：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/5720/1*Pb9G6Ujnp8lYfCLJ4Gfgig.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>如果這裡還沒有 Token 可以點選 Issue 產生</span>
          </div></div><br/>

<code class="id jd je jf jg b">body</code> 是有關 Rich menus 的設置內容，他有以下幾個屬性：

<ol>
<li id="3705" class="gy gz em at ha b hb io hd ip hf iq hh ir hj is hl ka kb kc"><code class="id jd je jf jg b">size</code> ：目前寬度僅能設置 2500 ，高度有 843 或 1686 兩種選擇。</li><li id="8fbc" class="gy gz em at ha b hb kd hd ke hf kf hh kg hj kh hl ka kb kc"><code class="id jd je jf jg b">selected</code> ：控制 Rich menus 是否預設開啟， <code class="id jd je jf jg b">true</code> 及 <code class="id jd je jf jg b">false</code> 請使用字串格式。</li><li id="a5f8" class="gy gz em at ha b hb kd hd ke hf kf hh kg hj kh hl ka kb kc"><code class="id jd je jf jg b">name</code> ：為該 Rich menus 的名稱。</li><li id="1ace" class="gy gz em at ha b hb kd hd ke hf kf hh kg hj kh hl ka kb kc"><code class="id jd je jf jg b">chatBarText</code> ：圖文選單下方的文字內容，點擊可開關選單，可以設置為「點我收合選單」。</li><li id="0a40" class="gy gz em at ha b hb kd hd ke hf kf hh kg hj kh hl ka kb kc"><code class="id jd je jf jg b">areas</code> ：為一個陣列，內部的每個物件都是一個按鈕及點擊執行的事件的描述。物件內的第一個屬性 <code class="id jd je jf jg b">bounds</code> 可以設置按鈕的位置座標及大小， <code class="id jd je jf jg b">action</code> 屬性則是能夠控制點擊後發生的事件內容，目前設置的所有事件都是發送訊息。</li>
</ol>

更多事件可以參考<a href="https://developers.line.biz/en/reference/messaging-api/#action-objects" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">官方文件</a>，之後會再整理成另一篇文章說明。

設定好 <code class="id jd je jf jg b">body</code> 後還需要使用 <code class="id jd je jf jg b">json.dumps</code> 將它轉換為字串，並依照 <code class="id jd je jf jg b">utf-8</code> 編碼送出請求，請求成功後，會在 <code class="id jd je jf jg b">response</code> 中顯示 Rich menus 的 id：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/4004/1*xKvnIapRwd4qnBeig5lIXA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>建立成功會回傳該 Rich menus 的 id</span>
          </div></div><br/>

注意！每個 Line Bot 都只能有 1000 個圖文選單，如果超過的話會回傳狀態 400 失敗。

### 設定 Rich menus 的圖片

此時便需要透過 <a href="https://github.com/line/line-bot-sdk-python" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">line-bot-sdk-python</a> 來將圖片掛上該圖文選單，記得在此步驟之前先在 <code class="id jd je jf jg b">pip</code> 上下載該套件：

```Python
from linebot import (
    LineBotApi, WebhookHandler
)

line_bot_api = LineBotApi('3Ma92PMIfy790Z...')

with open("control.jpg", 'rb') as f:
    line_bot_api.set_rich_menu_image("richmenu-762...", "image/jpeg", f)
```

<code class="id jd je jf jg b">LineBotApi</code> 需傳入 Token 啟用， <code class="id jd je jf jg b">set_rich_menu_image</code> 的第一個參數為剛剛創建的 Rich menus 的 id ，執行成功後什麼都不會回傳，但錯誤時會出現訊息，例如已設置圖片的 Rich menus 無法重複設置。

另外需要注意，圖片的大小需和該 Rich menus 的 <code class="id jd je jf jg b">size</code> 一模一樣，如果一直上傳失敗可以試著調整圖片尺寸，這裡提供一個<a href="https://blog.xuite.net/vexed/tech/65591105-%E7%B7%9A%E4%B8%8A%E8%AA%BF%E6%95%B4%E5%9C%96%E7%89%87%E5%A4%A7%E5%B0%8F" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">線上調整尺寸的工具</a>。

### 啟用 Rich menus

啟用 Rich menus 只要透過發送 <code class="id jd je jf jg b">request</code> 就能完成：

```Python
import requests

headers = {"Authorization":"Bearer 3Ma92PMIfy790Z...","Content-Type":"application/json"}

req = requests.request('POST', 'https://api.line.me/v2/bot/user/all/richmenu/richmenu-7621...', 
                       headers=headers)

print(req.text)
```

<code class="id jd je jf jg b">headers</code> 的 <code class="id jd je jf jg b">Authorization</code> 屬性帶上 Line Bot 的 Token 值， <code class="id jd je jf jg b">request</code> 的 <code class="id jd je jf jg b">url</code> 為 <a href="https://api.line.me/v2/bot/user/all/richmenu/" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">https://api.line.me/v2/bot/user/all/richmenu/</a> 再加上 Rich menus 的 id ，請求成功會回傳一個空物件：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/1868/1*DE_7ic6igPmVQx21ww_aAA.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>請求成功時回傳空物件</span>
          </div></div><br/>

這時候再打開 Line Bot 的介面，就可以看到圖文選單的內容已經改變。

### 查看所有 Rich menus

只要透過 <a href="https://github.com/line/line-bot-sdk-python" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">line-bot-sdk-python</a> 提供的 <code class="id jd je jf jg b">get_rich_menu_list</code> 便能取得所有的 Rich menu 選單 id。

```Python
from linebot import (
    LineBotApi, WebhookHandler
)

line_bot_api = LineBotApi('3Ma92PMIfy790Z...')

rich_menu_list = line_bot_api.get_rich_menu_list()

for rich_menu in rich_menu_list:
    print(rich_menu.rich_menu_id)
```

列出結果：

<div>
<img class="dz t u hz ak" src="https://miro.medium.com/max/3040/1*FB4QljsbV4oZVWjdWivOIg.png" role="presentation"><div style="display:flex; justify-content:center; font-size: 12px">
            <span>取得該 Line Bot 內所有 Rich menus</span>
          </div></div><br/>

### 刪除 Rich menus

要刪除某個 Rich menus 也很容易，只需要把該 Rich menus 的 id 傳進 <code class="id jd je jf jg b">delete_rich_menu</code> 中就行了：

```Python
from linebot import (
    LineBotApi, WebhookHandler
)

line_bot_api = LineBotApi('3Ma92PMIfy790Z...')

line_bot_api.delete_rich_menu('richmenu-1b67...')
```

執行後不會回傳任何值，可以再透過 <code class="id jd je jf jg b">get_rich_menu_list</code> 查看 Rich menus 是否已經刪除。

---

本文是以官方文件上的說明為主，將它以 <code class="id jd je jf jg b">Python</code> 實作，如果以上內容有任何問題，或是不理解的地方，都歡迎留言告訴我，謝謝大家！

參考文章

<ol>
<li id="234f" class="gy gz em at ha b hb io hd ip hf iq hh ir hj is hl ka kb kc"><a href="https://developers.line.biz/en/docs/messaging-api/using-rich-menus/" class="dj by jh ji jj jk" target="_blank" rel="noopener nofollow">https://developers.line.biz/en/docs/messaging-api/using-rich-menus/</a></li>
</ol>
import React from 'react'
// Card說明書 v.3

// 請整個資料夾打包回家
// 然後於頁面掛入CardKaga這隻主元件
import CardKaga from './v3/CardKaga'

// -----------------範例-----------------
// 一· 元件本體由13個屬性決定你Card的一切
const page = () => {
    return (
        <>
        <div
            className=" d-flex flex-wrap col-lg-10"
            style={{
                height: '100%',
                weight: '100%',
                overflow: 'hidden',
            }}
        >
            <CardKaga
                key="如果有用map就請加上這個"
                id="流水編號"
                title="大標文字"
                subtitle="小標文字"
                img="圖片路徑"
                link="連結到此卡片詳細頁面的連結"
                // 如果有需要蒐藏旗
                collectionIcon // 下了就會出現旗子 不用給值
                collectionClick="按下去要啟動的function" //function內容為啟動或解除收藏 若啟動收藏新增所有劇院或影片相關資料到資料庫
                collection="收藏狀態" // 'true / false'
                // 如果有需要hover後下方彈出簡介與星星欄
                popup // 下了之後hover就會出現彈出欄 不用給值
                member // 下了代表是會員用的 沒下代表會員以外用的
                star="星星數" // 數字字串都可以 1 ~ 5
                starAmimation //給了之後 編輯頁面的星星會隨滑鼠移動 點擊後會變新的值再透過下面的newStarAndMark回傳
                mark="註記文字"
                newStarAndMark="請創造一個一樣名字的function接修改後的值"
                del="按下刪除要啟動的function"
                // 會員請拿來刪除收藏這檔事,因為會員彈出欄的編輯視窗,下方紅色刪除紐按下去就要解除收藏 因此會員的data就應該要刪除這筆資料
                // 非會員有給function就有按鈕  沒給就沒有
            />
            </div>
        </>
    )
}
// 二· 元件若使用popup（彈出欄），因裡面會有編輯星星數跟註記的功能，請創造一個下面的function接更新後的值
// val裡面有更新後的star(number) & mark(string)
newStarAndMark = val => {
    console.log(val)
    alert('Use Fetch Update New Star And Mark To Database!!')
}

// 三· 給他一個外框讓動畫跑得順利
{<div
    className=" d-flex flex-wrap col-lg-10"
    style={{
        height: '100%',
        weight: '100%',
        overflow: 'hidden',
    }}
>
}

{/* -----------------本體屬性介紹-----------------
title: 請給它下方大標文字
subtitle: 請給它下方小標文字
img: 請給它底圖的所在路徑
link: 連結到此卡片詳細頁面的連結

collectionIcon:有要收藏的旗子就下這個吧，不用給值
collection:  請給值如果是 收藏=true / 不收藏=false 決定蒐藏旗為實心還空心
ollectionClick: 請連接到按下旗子要觸發的function

poppup:有要hover後彈出簡介就下這個吧，不用給值
member:會員下這個(簡介星星抬頭會變成我的評分)  其他不用下(抬頭為目前評分)
star:請給他星星數  1 ~ 5
starAmimation:給了之後 編輯頁面的星星會隨滑鼠移動 點擊後會變新的值再透過下面的newStarAndMark回傳
mark:請給他註記文字
edit:請連接按下編輯後要觸發的function
del:請連接按下刪除後要觸發的function

-----------------無腦套空白模板-----------------
 可直接copy回去貼上套一套即可 */}

newStarAndMark = val => {
    console.log(val)
    alert('Use Fetch Update New Star And Mark To Database!!')
}
// 外框
<div
    className=" d-flex flex-wrap col-lg-10"
    style={{
        height: '100%',
        weight: '100%',
        overflow: 'hidden',
    }}
>
{/* 要map在這map */}
{/* 本體 */}
<CardKaga
                key={item.id}
                id={item.id}
                title={item.cinemaName}
                subtitle={item.cinemaCity + '/' + item.cinemaArea}
                img={'http://localhost:3000/images/' + item.cinemaImg}
                link={'/cinema/' + item.id}
                // collectionIcon
                // collectionClick={this.collectionClick}
                // collection={}
                // popup
                member
                starIcon
                star={item.cinemaStar}
                AVGStar
                starAmimation
                // "markList":[{"markId":"c1","markcontent":"yaaaaa"}]
                mark={item.cinemaMark}
                newStarAndMark={this.newStarAndMark}
                del={this.del}
              />
</div>

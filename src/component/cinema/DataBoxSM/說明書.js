import React from 'react'
// DataBox說明書 v.1

// 請整個資料夾打包回家
// 然後於頁面掛入DataBox這隻主元件
import DataBox from '../../../components/cinema/DataBoxSM/DataBox'

// -----------------範例-----------------
const page = () => {
    return (
        <DataBox
            collection={要顯示的收藏數}
            Awesome={要顯示的按讚數}
            PageViews={要顯示的瀏覽數}
        />
    )
}

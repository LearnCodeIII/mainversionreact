import React from 'react'
// DataBox說明書 v.1

// 請整個資料夾打包回家
// 然後於頁面掛入DataBox這隻主元件
import AvatarOne from '../../../components/cinema/AvatarTypeOne/AvatarOne'

// -----------------範例-----------------
const page = () => {
    return (
        <AvatarOne
            img="頭像圖片"
            name="姓名"
            purview="權限"
            SignUpDate="註冊日期"
        />
    )
}

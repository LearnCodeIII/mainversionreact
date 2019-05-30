//------------------------------------------------------------
// 收藏按下按下去改變資料庫收藏的資料
collectionClick = async (id, collection) => {
  // 製作上傳資料並回傳到newData
  let newData = ''
  this.state.cardData.map(item => {
    if (item.id === id) {
      newData = {
        //資料夾完整格式
        id: item.id,
        cinemaName: item.cinemaName,
        cinemaCity: item.cinemaCity,
        cinemaArea: item.cinemaArea,
        cinemaLogoImg: item.cinemaLogoImg,
        cinemaImg: item.cinemaImg,
        cinemaHeroImg: item.cinemaHeroImg,
        cinemaAccount: item.cinemaAccount,
        cinemaPassword: item.cinemaPassword,
        cinemaStar: item.cinemaStar,
        cinemaAddress: item.cinemaAddress,
        cinemaPhone: item.cinemaPhone,
        cinemaTaxid: item.cinemaTaxid,
        cinemaWeb: item.cinemaWeb,
        cinemaEmail: item.cinemaEmail,
        cinemaBackupEmail: item.cinemaBackupEmail,
        cinemaAwesome: item.cinemaAwesome,
        cinemaPageViews: item.cinemaPageViews,
        cinemaSignUpDate: item.cinemaSignUpDate,
        permission: item.permission,
        cinemaMessage: item.cinemaMessage,
      }
    }
    return item
  })
  // 現在newData是新資料了
  // 拿剛剛做好的新資料去server更新 (直接蓋掉原本的資料)
  try {
    const response = await fetch(
      // 資料夾網址
      'http://localhost:5555/cinema/' + +id,
      {
        method: 'PUT',
        body: JSON.stringify(newData),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    if (!response.ok) throw new Error(response.statusText)
    const jsonObject = await response.json()
    console.log(jsonObject)
    // 資料庫改變完再回來拿原本的data改變state進而渲染整個頁面
    this.setState({ upDateData: newData }, () => {
      // 設定完後跳出alert說明已成功收藏
      alert('您已成功收藏!')
    })
  } catch (e) {
    console.log(e)
  } finally {
  }
}

//------------------------------------------------------------
// 刪除按鈕按下去叫出來的function
// 忘了寫回傳參數
// 要用的時候再說
del = () => {
  alert('del')
}

//------------------------------------------------------------
// 星星跟備註更新資料回傳的function
// val裡面有更新後的star(number) & mark(string)
newStarAndMark = starMarkNewData => {
  alert(
    '最新的star={starId:' +
      starMarkNewData.star.starId +
      ',star:' +
      starMarkNewData.star.star +
      '} 最新的mark={markId:' +
      starMarkNewData.mark.markId +
      ',markContent:' +
      starMarkNewData.mark.markContent
  )
}

//老闆層(page) 接收子層偷渡回來的全新陣列 
//然後蓋回去資料庫吧
awesomeClick = newAwesome => {
    console.log(newAwesome)
}
booClick = newBoo => {
    console.log(newBoo)
}

// 子層render裡面的本體
<div
                                onClick={this.aClick}
                                className="d-flex col-4 "
                            >
                                <i className="fas fa-thumbs-up  mr-2" />
                                {/* 如果大於999只顯示999 */}
                                <h6>
                                    {+this.state.awesome.length < 999
                                        ? this.state.awesome.length
                                        : '999+'}
                                </h6>
                            </div>
                            <div onClick={this.bClick} className="d-flex col-4">
                                <i className="fas fa-thumbs-down mt-1 mr-2" />
                                <h6>
                                    {+this.state.boo.length < 999
                                        ? this.state.boo.length
                                        : '999+'}
                                </h6>
                            </div>


// 子層篩選邏輯的function
// 上面子層本體按onClick叫的
aClick = () => {
    let newAwesome = []
    // 如果awesome清單裡面有這個人的會員id
    // 代表他按過噓了 因此點擊click就是取消噓
    if (this.props.awesome.find(item => item == memberID)) {

        // 1.
        // 這時要拿掉自己這層state裡面的這位會員的id
        // 這裡的邏輯是如果按讚的id不等於會員id的資料  就放入新陣列中 
        // （因為放進去的都不是按讚的人，所以新陣列就把按讚的人拿掉了）
        this.props.awesome.map(item => {
            if (item != memberID) {
                newAwesome.push(item)
            }
        })

        //2.
        // 然後回傳新的awesome清單回去給老闆層更新到database
        this.props.awesomeClick(newAwesome)

        //3.
        // 同時把新的清單更新到子層自己的state 改變渲染
        this.setState({ awesome: newAwesome }, () =>
            console.log(newAwesome)
        )

    } else {

        //1.
        // 這個else代表awesome清單裡面沒有這個人的會員id
        // 同時也代表他沒按過讚 因此點擊click就是把這個會員id新增到按讚清單陣列中
        newAwesome = [...this.state.awesome, memberID]

        //2.
        // 然後回傳新的awesome清單回去給老闆層更新到database
        this.props.awesomeClick(newAwesome, memberID)

        //3.
         // 同時把新的清單更新到子層自己的state 改變渲染
        this.setState({ awesome: newAwesome })
    }
}
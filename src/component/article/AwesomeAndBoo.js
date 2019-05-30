//父層 接收偷渡回去的全新陣列 
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


// 子層篩選邏輯




aClick = () => {
    let newAwesome = []
    // 如果awesome清單裡面有這個人的會員id
    // 代表他按過噓了 因此點擊click就是取消噓
    if (this.props.awesome.find(item => item == memberID)) {
        // 這時要拿掉自己這層state裡面的這位會員的id
        this.props.awesome.map(item => {
            if (item != memberID) {
                newAwesome.push(item)
            }
        })
        // 然後回傳新的boo清單回去給老闆層更新到database
        this.props.awesomeClick(newAwesome)
        // 同時把新的清單更新到子層自己的state 改變渲染
        this.setState({ awesome: newAwesome }, () =>
            console.log(newAwesome)
        )
    } else {
        // 如果awesome清單裡面沒有這個人的會員id
        // 代表他沒按過噓 因此點擊click就是新增噓
        newAwesome = [...this.state.awesome, memberID]
        this.props.awesomeClick(newAwesome, memberID)
        this.setState({ awesome: newAwesome })
    }
}
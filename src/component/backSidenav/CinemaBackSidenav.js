import React from 'react'
import { Accordion } from 'react-bootstrap'
import SidenavMenu_Su from './SidenavMenu_Su'
const handleLogout = () => {
  //點擊登出，清除session並導回主頁
  // sessionStorage.removeItem('memberID') //不知道為什麼這個方法無效
  sessionStorage.clear()
  window.location.href = '/mainpage'
}
const CinemaBackSidenav = props => (
  <>
    <div //左邊sidenave框
      className="col-lg-2 p-0"
      style={{
        background: '#242B34',
      }}
    >
      <div
        style={{
          height: '194px',
        }}
      />
      <h3 className="text-center mb-4">戲院中心</h3>
      <Accordion defaultActiveKey="cinema-info">
        {props.sidenavItems.map(item => (
          <SidenavMenu_Su
            id={item.id}
            title={item.title}
            options={item.options}
            isClicked={item.isclicked}
          />
        ))}
      </Accordion>
      <div className="my-4 d-flex justify-content-center">
        <button
          className="mx-auto btn btn-warning border-0 col-lg-8"
          onClick={handleLogout}
        >
          登出
        </button>
      </div>
    </div>
  </>
)

export default CinemaBackSidenav

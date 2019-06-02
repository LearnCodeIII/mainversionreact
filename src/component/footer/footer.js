import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Row, Col, ListGroup, button, input } from 'react-bootstrap'
import {
  FaEnvelope,
  FaInstagram,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
import './footer.css'
import Logo from './brand'

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      // 如果下面爆了出現卷軸  就是這裡的問題!!          ↓
      <Col md={11} className="justify-content-center">
        <Row className="mb-4">
          <Col className="" md={'8'}>
            <div className="">
              <h3 className="">聯絡我們</h3>
              <div className="d-flex h3">
                <div className="p-2">
                  <FaEnvelope />
                </div>
                <div className="p-2">
                  <FaInstagram />
                </div>
                <div className="p-2">
                  <FaFacebookSquare />
                </div>
                <div className="p-2">
                  <FaTwitterSquare />
                </div>
              </div>
            </div>
          </Col>
          <Col md={'auto'}>
            <div className="">
              <h3 className="mb-3">訂閱我們</h3>

              <div className="input-group" style={{ maxWidth: 320 }}>
                <input
                  type="text"
                  className="form-control inp_email"
                  placeholder="Enter your e-mail here"
                />
                <div className="input-group-append">
                  <button className="btn btn_Subscribe nomarginBtn">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-start">
          <Col xs={6} md={2} className="pb-3">
            <h3 className="">
              <Link className="nav-link" to="/BackMainpage/my-preview">
                會員專區
              </Link>
            </h3>
            <ul className="nav flex-column ml-1">
              <li className="nav-item my-2">
                <Link className="nav-link" to="#">
                  個人設定
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/">
                  我的片單
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/">
                  我的書籤
                </Link>
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/">
                  我的活動
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={2} className="pb-3">
            <div>
              <h3 className="">
                <Link className="nav-link" to="/movie">
                  電影
                </Link>
              </h3>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    電影資料庫
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    熱門電影
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新上映
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    電影搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={6} md={2} className="pb-3">
            <div>
              <h3>
                <Link className="nav-link" to="/cinema">
                  劇場
                </Link>
              </h3>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    劇場資訊
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    劇場消息
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    劇場搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={6} md={2} className="pb-3">
            <div>
              <h3>
                <Link className="nav-link" to="/article">
                  電影新聞
                </Link>
              </h3>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/article/3">
                    熱門主題
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新消息
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    專欄搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={6} md={2} className="pb-3">
            <div>
              <h3>
                <Link className="nav-link" to="/activity">
                  最新活動
                </Link>
              </h3>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    熱門活動
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新活動
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    活動搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={6} md={2} className="pb-3">
            <div>
              <h3>
                <Link className="nav-link" to="/forum">
                  主題討論
                </Link>
              </h3>
              <ul className="nav flex-column ml-1">
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    熱門話題
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    最新話題
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link className="nav-link" to="/">
                    影評搜尋
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="footer_brand mt-3 mb-5">
          {/* 這邊可選擇純文字、logo1、logo2的樣式 */}
          <div className="col-auto">
            <h2 style={{ display: 'inline' }} className="mr-3">
              .Movieee
            </h2>
            {/* <img
              src="/images/brand04.png"
              width={160}
              style={{ verticalAlign: 'middle' }}
              className="mr-3"
            /> */}
            {/* <img
              src="/images/brand03.png"
              width={170}
              style={{ verticalAlign: 'text-bottom' }}
              className="mr-3"
            /> */}
            enjoy life, &nbsp; every one, &nbsp; every thing
          </div>
          <div className="col-auto mr-auto aling-items-end" />
          <div className="col-auto col-md-4">
            © 2019 .Movieee. All Rights Reserved.
          </div>
        </Row>
      </Col>
    )
  }
}

export default Footer

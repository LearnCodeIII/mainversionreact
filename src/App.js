import React from 'react'
//Import Bootstrap,Router
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Footer from './component/footer/footer'

//Import Page
import Mainpage from './page/Mainpage'
import Cinema from './page/Cinema'
import CinemaInfo from './page/CinemaInfo'
import Movie from './page/Movie'
import MovieInfo from './page/MovieInfo'
import Article from './page/Article'
import ArticlePage from './page/ArticlePage'
import Activity from './page/Activity'
import ActivityInfo from './page/ActivityInfo'
import ActivityJoin from './page/ActivityJoin'
import Forum from './page/Forum'
import LoginSign from './page/SignUp'
import BackMainpage from './page/BackMainpage'
import CinemaBackMainpage from './page/CinemaBackMainpage'

//Import Component
import ScroolToTop from './component/activity/ActivityScrollToTop/ActivityScrollToTop'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      navbar: 'active',
      currentHeight: 0,
      prevHeight: 0,
    }
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    if (
      window.location.pathname.indexOf('BackMainpage') == -1 &&
      window.location.pathname.indexOf('CinemaBackMainpage') == -1
    ) {
      let currentHeight = document.documentElement.scrollTop
      this.setState({ currentHeight: currentHeight })
      let prevHeight = this.state.prevHeight
      if (document.documentElement.scrollTop > 630) {
        this.setState({ navbar: 'active' })
        if (document.documentElement.scrollTop > 750) {
          if (currentHeight > prevHeight) {
            this.setState({ navbar: 'active hiddenNav' })
          } else {
            this.setState({ navbar: 'active showNav' })
          }
        }
      } else {
        this.setState({ navbar: '' })
      }
      prevHeight = JSON.parse(JSON.stringify(currentHeight))
      this.setState({ prevHeight: prevHeight })
    }
    const memberId = sessionStorage.getItem('memberId')
    try {
      const res = await fetch('http://localhost:5555/member/' + memberId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ memberData: data })
    } catch (err) {
      console.log(err)
    }

    const cinemaId = sessionStorage.getItem('cinemaId')
    try {
      const res = await fetch('http://localhost:5555/cinema/' + cinemaId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ cinemaData: data })
    } catch (err) {
      console.log(err)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = event => {
    if (
      window.location.pathname.indexOf('BackMainpage') == -1 &&
      window.location.pathname.indexOf('CinemaBackMainpage') == -1
    ) {
      let currentHeight = document.documentElement.scrollTop
      this.setState({ currentHeight: currentHeight })
      let prevHeight = this.state.prevHeight
      if (document.documentElement.scrollTop > 630) {
        this.setState({ navbar: 'active' })
        if (document.documentElement.scrollTop > 800) {
          if (currentHeight > prevHeight) {
            this.setState({ navbar: 'active hiddenNav' })
          } else {
            this.setState({ navbar: 'active showNav' })
          }
        }
      } else {
        this.setState({ navbar: '' })
      }
      prevHeight = JSON.parse(JSON.stringify(currentHeight))
      this.setState({ prevHeight: prevHeight })
    }
  }
  handleLogout = () => {
    //點擊登出，清除session並導回主頁
    // sessionStorage.removeItem('memberID') //不知道為什麼這個方法無效
    sessionStorage.clear()
    window.location.href = '/mainpage'
  }
  render() {
    return (
      <Router>
        <ScroolToTop>
          <Navbar bg="light" expand="lg" className={this.state.navbar}>
            <LinkContainer to="/">
              <Navbar.Brand>
                .Movieee
                {/* <img
                  src="/images/brand05.png"
                  width={180}
                  style={{ verticalAlign: 'bottom' }}
                  className="mr-3"
                /> */}
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="d-flex justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav>
                <LinkContainer to="/cinema">
                  <Nav.Link className="mr-5">戲院</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/movie">
                  <Nav.Link className="mr-5">電影</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/article">
                  <Nav.Link className="mr-5">文章</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/activity">
                  <Nav.Link className="mr-5">活動</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/forum">
                  <Nav.Link className="mr-5">論壇</Nav.Link>
                </LinkContainer>
                {sessionStorage.getItem('cinemaId') !== null ? (
                  <>
                    <LinkContainer to="/CinemaBackMainpage/cinema-info-preview">
                      <Nav.Link className="mr-5">戲院後台</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/mainpage">
                      <Nav.Link className="mr-5" onClick={this.handleLogout}>
                        戲院登出
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : sessionStorage.getItem('memberId') !== null ? (
                  <>
                    <LinkContainer to="/BackMainpage/my-preview">
                      <Nav.Link className="mr-5">會員後台</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/mainpage">
                      <Nav.Link className="mr-5" onClick={this.handleLogout}>
                        會員登出
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to="/LoginSign">
                    <Nav.Link className="mr-5">登入</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route path="/mainpage" component={Mainpage} />
            <Redirect from="/cinema/:id/:id" to="/cinema/:id" />
            <Route path="/cinema/:id" component={CinemaInfo} />
            <Route exact path="/cinema" component={Cinema} />
            <Redirect from="/movie/:id/return" to="/movie/:id" />
            <Route path="/movie/:id" component={MovieInfo} />
            <Route path="/movie" component={Movie} />
            <Route path="/article/:id" component={ArticlePage} />
            <Route path="/article" component={Article} />
            <Route exact path="/activity/join/:id" component={ActivityJoin} />
            <Redirect from="/activity/:id/return" to="/activity/:id" />
            <Route exact path="/activity/:id" component={ActivityInfo} />
            <Route exact path="/activity" component={Activity} />
            <Route path="/forum/:id" component={Forum} />
            <Route path="/forum" component={Forum} />
            <Route path="/LoginSign" component={LoginSign} />
            <Route path="/BackMainpage" component={BackMainpage} />
            {/* <Route
              path="/CinemaBackMainpage/cinema-activity-inprogress/:id"
              component={CinemaBackMainpage}
            /> */}
            <Route path="/CinemaBackMainpage" component={CinemaBackMainpage} />
          </Switch>
          {window.location.pathname == '/LoginSign' ? (
            ''
          ) : (
            <div className="container-fluid row justify-content-center">
              <Footer />
            </div>
          )}
        </ScroolToTop>
      </Router>
    )
  }
}

export default App

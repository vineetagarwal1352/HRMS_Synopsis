import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import '../../assets/empDashboard.css'
import femaleProfilePic from '../../assets/view-emp/femaleUserPic.png'
import maleProfilePic from '../../assets/view-emp/maleUserPic.png'
import { Consumer } from '../../context'
import EmpSidePanel from './Employee/EmpSidePanel'
import NewsCard from './Employee/NewsCard'
export default class EmpDashboard extends Component {
  constructor() {
    super()

    this.state = {
      firstCol: [],
      secondCol: [],
      ThirdCol: [],

      newsList: []
    }
  }

  componentDidMount = async () => {
    const news = await axios.get('/api/users/getNews')
    let firstCol = []
    let secondCol = []
    let ThirdCol = []

    for (let i = 0; i < 2; i++) {
      firstCol.push(news.data.articles[i])
    }

    for (let i = 2; i < 4; i++) {
      secondCol.push(news.data.articles[i])
    }

    for (let i = 4; i < 6; i++) {
      ThirdCol.push(news.data.articles[i])
    }

    this.setState({
      firstCol,
      secondCol,
      ThirdCol,
      newsList: news.data.articles
    })
    console.log(news.data.articles)
  }

  onGreet = () => {
    let date = new Date()
    let hours = date.getHours()

    if (hours < 12) return 'Good Morning!'
    else if (hours >= 12 && hours <= 17) return 'Good Afternoon!'
    else return 'Good Evening!'
  }

  onGetDate = () => {
    const d = new Date()
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${da} ${mo} ${ye}`
  }

  render() {
    return (
      <Consumer>
        {value => {
          let { user } = value
          const token = localStorage.getItem('auth-token')
          if (!token) return <Redirect to="/login" />

          if (user && user.role === 'admin') return <Redirect to="/" />

          return (
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ duration: 300 }}
            >
              {props => (
                <div className="row m-0">
                  {/* left part */}
                  <div className="col-2 p-0 leftPart">
                    <EmpSidePanel />
                  </div>

                  {/* right part */}
                  <div className="col rightPart" style={props}>
                    <h1 className="display-4 mt-5 ml-5">Dashboard</h1>
                    {/* profile part */}
                    <div className="row">
                      <div className="col">
                        <div className="myProfileContainer">
                          <div className="row">
                            <div className="col">
                              {user && user.gender ? (
                                <img
                                  className=""
                                  src={
                                    user.gender === 'Male'
                                      ? maleProfilePic
                                      : femaleProfilePic
                                  }
                                  alt=""
                                  width="300px"
                                />
                              ) : null}
                            </div>

                            <div className="col text-right">
                              <h1 className="display-4">
                                Hi <br /> {user && user.name}, <br />{' '}
                                {this.onGreet()}
                              </h1>
                              <p className="mt-4 " style={{ fontSize: '34px' }}>
                                {' '}
                                <i className="fas fa-calendar-alt"></i>{' '}
                                {this.onGetDate()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    {/* news part */}
                    <div className="row">
                      <div className="col">
                        <div className="myNewsContainer">
                          <h1 className="display-4 newsHeading">Latest NEWS</h1>

                          {this.state.firstCol.length ? (
                            <div className="row">
                              <div className="col-4">
                                {this.state.firstCol.map((news, index) => (
                                  <NewsCard key={index} data={news} />
                                ))}
                              </div>

                              <div className="col-4">
                                {this.state.secondCol.map((news, index) => (
                                  <NewsCard key={index} data={news} />
                                ))}
                              </div>

                              <div className="col-4">
                                {this.state.ThirdCol.map((news, index) => (
                                  <NewsCard key={index} data={news} />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <strong>Fetching news for you...</strong>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Spring>
          )
        }}
      </Consumer>
    )
  }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/header-styles/header.css'
import { Consumer } from '../../context'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      deleteAccount: false
    }
  }

  OnLogout = dispatch => {
    localStorage.setItem('auth-token', '')
    localStorage.setItem('userId', '')
    console.log('Logged out!')

    dispatch({
      type: 'LOGGED_OUT'
    })
  }

  getInfo = todos => {
    let completed = 0
    todos.forEach(todoItem => {
      if (todoItem.finished) completed++
    })
    return completed
  }

  render() {
    const { branding } = this.props

    return (
      <Consumer>
        {value => {
          let { dispatch, token, user, todos } = value

          if (token === undefined) token = ''
          if (user === undefined) user = ''
          if (todos === undefined) todos = []

          // getting token from localstorage for removing delay
          const localToken = localStorage.getItem('auth-token')

          return (
            <>
              <nav className="myNavBar navbar sticky-top navbar-expand-lg navbar-light">
                <Link to="/" className="navbar-brand text-light block mx-4">
                  <span
                    style={{
                      fontStyle: 'italic',
                      display: 'block'
                    }}
                  >
                    {branding}
                  </span>
                </Link>

                <button
                  className="hamIcon navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavAltMarkup"
                  style={{
                    position: 'fixed',
                    right: '10px',
                    top: '10px'
                  }}
                >
                  <i className="fa fa-bars"></i>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <div className="navbar-nav">
                    {/* About */}
                    <li className="nav-item">
                      <Link
                        to="/about"
                        className="nav-link text-light"
                        style={{ cursor: 'pointer', fontSize: 16 }}
                      >
                        About
                      </Link>
                    </li>

                    {/* Contact Us */}
                    <li className="nav-item">
                      <Link
                        to="/contactUs"
                        className="nav-link text-light"
                        style={{ cursor: 'pointer', fontSize: 16 }}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </div>

                  <div className="navbar-nav ml-auto">
                    {/* User name and avatar */}
                    {localToken && (
                      <li className="nav-item d-flex align-items-center">
                        {/* Avatar with first letter */}
                        <div
                          className="avatar bg-secondary rounded-circle mr-2 d-flex align-items-center justify-content-center"
                          style={{ width: 32, height: 32, fontSize: 16 }}
                        >
                          {user &&
                            user.name &&
                            user.name.length > 0 &&
                            user.name[0].toUpperCase()}
                        </div>
                        {/* User name */}
                        {user && user.name && user.role === 'admin' ? (
                          <div className="text-light mr-2 font-italic">
                            {user.name} <b>(Admin)</b>
                          </div>
                        ) : (
                          <div className="text-light mr-2 font-italic">
                            {user.name}
                          </div>
                        )}
                      </li>
                    )}

                    {/* Logout */}
                    {localToken && (
                      <li className="nav-item ml-2">
                        <button
                          onClick={() => this.OnLogout(dispatch)}
                          className="btn btn-light btn-sm mr-3 mt-1"
                          style={{ fontSize: 16 }}
                        >
                          Logout
                        </button>
                      </li>
                    )}

                    {/* Sign up and Login */}
                    {!localToken && (
                      <>
                        <li className="nav-item">
                          <Link
                            to="/signup"
                            className="nav-link text-light"
                            style={{ cursor: 'pointer', fontSize: 16 }}
                          >
                            SignUp
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/login"
                            className="nav-link text-light"
                            style={{ cursor: 'pointer', fontSize: 16 }}
                          >
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                  </div>
                </div>
              </nav>
            </>
          )
        }}
      </Consumer>
    )
  }
}

export default Header

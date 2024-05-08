import React, { Component } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Redirect } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import 'toasted-notes/src/styles.css'
import { Consumer } from '../../../context'
import EmpSidePanel from './EmpSidePanel'

export default class MyAttendance extends Component {
  // Assuming 'att' is the attendance value
  att = 6 // Replace with your actual attendance value

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
              from={{
                transform: 'translate3d(0,1000px,0) '
              }}
              to={{
                transform: 'translate3d(0px,0,0) '
              }}
              config={{ friction: 20 }}
            >
              {props => (
                <div className="row m-0">
                  {/* left part */}
                  <div className="col-2 p-0 leftPart">
                    <EmpSidePanel />
                  </div>

                  {/* right part */}
                  <div className="col rightPart container" style={props}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '4%'
                      }}
                    >
                      {/* Content on the left */}
                      <div style={{ flex: 1 }}>
                        <h2>Your work accounts for:</h2>
                        <p>50hr this week</p>
                        <p>100 hrs this month</p>
                        <p>Salary deduction: integer</p>
                        <p>Paid leaves used: integer</p>
                        <p>No Leaves Bonus: integer</p>
                      </div>

                      {/* Calendar on the right */}
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Calendar
                          tileContent={({ date }) => {
                            let color = ''
                            let content = ''

                            const holidays = [
                              '1/1/2024',
                              '1/13/2024',
                              '1/14/2024',
                              '1/15/2024',
                              '1/17/2024',
                              '1/25/2024',
                              '1/26/2024',
                              '2/10/2024',
                              '2/14/2024',
                              '2/14/2024',
                              '2/19/2024',
                              '2/24/2024',
                              '3/6/2024',
                              '3/8/2024',
                              '3/12/2024',
                              '3/20/2024',
                              '3/24/2024',
                              '3/25/2024',
                              '3/25/2024',
                              '3/25/2024',
                              '3/28/2024',
                              '3/29/2024',
                              '3/31/2024',
                              '4/5/2024',
                              '4/9/2024',
                              '4/9/2024',
                              '4/9/2024',
                              '4/10/2024',
                              '4/11/2024',
                              '4/13/2024',
                              '4/14/2024',
                              '4/14/2024',
                              '4/17/2024',
                              '4/21/2024',
                              '4/23/2024',
                              '5/1/2024',
                              '5/8/2024',
                              '5/12/2024',
                              '5/23/2024',
                              '6/16/2024',
                              '6/17/2024',
                              '6/21/2024',
                              '7/7/2024',
                              '7/17/2024',
                              '7/21/2024',
                              '8/4/2024',
                              '8/15/2024',
                              '8/15/2024',
                              '8/19/2024',
                              '8/26/2024',
                              '8/26/2024',
                              '9/7/2024',
                              '9/15/2024',
                              '9/16/2024',
                              '9/22/2024',
                              '10/2/2024',
                              '10/3/2024',
                              '10/9/2024',
                              '10/10/2024',
                              '10/11/2024',
                              '10/11/2024',
                              '10/12/2024',
                              '10/17/2024',
                              '10/20/2024',
                              '10/31/2024',
                              '10/31/2024',
                              '10/31/2024',
                              '11/2/2024',
                              '11/3/2024',
                              '11/7/2024',
                              '11/15/2024',
                              '11/24/2024',
                              '12/21/2024',
                              '12/24/2024',
                              '12/25/2024',
                              '12/26/2024',
                              '12/31/2024'
                            ]
                            if (
                              date.getDay() === 0 ||
                              date.getDay() === 6 ||
                              holidays.includes(date.toLocaleDateString())
                            ) {
                              return (
                                <div
                                  style={{
                                    backgroundColor: 'darkblue',
                                    display: 'inline-block',
                                    borderRadius: '50%',
                                    padding: '2px',
                                    width: '30px',
                                    height: '20px',
                                    textAlign: 'center'
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: '0.8em',
                                      color: 'white'
                                    }}
                                  >
                                    H
                                  </div>
                                </div>
                              )
                            }

                            if (this.att < 4) {
                              color = 'red'
                              content = this.att
                            } else if (this.att >= 4 && this.att < 8) {
                              color = 'yellow'
                              content = this.att
                            } else if (this.att >= 8) {
                              color = 'green'
                              content = this.att
                            }

                            return (
                              <div
                                style={{
                                  display: 'inline-block',
                                  borderRadius: '50%',
                                  backgroundColor: color,
                                  padding: '2px',
                                  width: '30px',
                                  height: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                <div
                                  style={{ fontSize: '0.8em', color: 'violet' }}
                                >
                                  {content}
                                </div>
                              </div>
                            )
                          }}
                        />
                      </div>
                    </div>

                    <h1>Your Attendance: {this.att}</h1>
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

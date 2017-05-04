import React, { Component } from 'react'
import axios from 'axios'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forecast: [],
      city: 'City'
    }
  }

  _changeArea (event) {
    let city = event.target.value
    this.setState({city: city})
    let self = this
    axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&APPID=481e3bc28e5264e5607c2b65b449bfc1`)
    .then(response => {
      self.setState({forecast: response.data.list})
    })
    .catch(error => {
      console.log(error)
    })
  }

  _convertDate (inputTime) {
    // convert time from epoch time to UTC time
    let date = new Date(0)
    date.setUTCSeconds(inputTime)
    return JSON.stringify(date).slice(1, 11)
  }

  _getVariance (max, min) {
    // get the difference celcius in one day
    let variance = max - min
    return Math.round(variance.toFixed(2))
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome</h2>
        </div>
        <p className='App-intro'>
          Hi, this is the weather report.
        </p>

        {/* Option for choose city */}
        <select onChange={(event) => { this._changeArea(event) }}>
          <option value='' disabled selected>Please select a city...</option>
          <option value='Jakarta'>Jakarta</option>
          <option value='Tokyo'>Tokyo</option>
          <option value='London'>London</option>
        </select>

        <table className='table table-hover'>
          <tr>
            <th>{this.state.city}</th>
            <th>Temperature</th>
            <th>Variance</th>
          </tr>
          {this.state.forecast.map((data, index) => {
            let convertDate = this._convertDate(data.dt)
            let variance = this._getVariance(data.temp.max, data.temp.min)

            return (
              <tr key={index}>
                <td>{convertDate}</td>
                <td>{data.temp.day}C</td>
                <td>{variance}C</td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}

export default App

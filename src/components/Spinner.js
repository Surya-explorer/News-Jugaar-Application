import React, { Component } from 'react'
import Spinner from './Spinner.gif'
export default class spinner extends Component {
  render() {
    return (
      <div className = "text-center" style = {{width : '20px' , height : '20px'}}>
        <img className = "my-3" src={Spinner} alt="Spinner" />
      </div>
    )
  }
}

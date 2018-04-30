import React, { Component } from 'react'
import threeEntryPoint from './threeEntryPoint'
import './Projection.css';

// https://itnext.io/how-to-use-plain-three-js-in-your-react-apps-417a79d926e0
export default class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement)
  }
  
  render () {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div id="projectionContainer">
            <div ref={element => this.threeRootElement = element} />
          </div>
        </div>
      </div>
    )
  }
}